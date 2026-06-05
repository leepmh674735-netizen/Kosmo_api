package com.winter.app.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winter.app.member.MemberDTO; // 1. 패키지 경로 오타 수정 (apip -> app)

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final ObjectMapper mapper = new ObjectMapper();
	private final JwtTokenManager jwtTokenManager; // 2. 토큰 매니저 의존성 선언

	// 3. 생성자 주입 방식으로 매니저와 토큰 매니저를 함께 주입받음 (@AllArgsConstructor 제거)
	public JwtAuthenticationFilter(AuthenticationConfiguration authenticationConfiguration, JwtTokenManager jwtTokenManager) throws Exception {
		this.jwtTokenManager = jwtTokenManager;
		this.setAuthenticationManager(authenticationConfiguration.getAuthenticationManager());
		this.setFilterProcessesUrl("/member/login"); // 로그인 엔드포인트 지정
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			// request의 JSON 바디를 읽어 MemberDTO로 변환
			MemberDTO memberDTO = mapper.readValue(request.getInputStream(), MemberDTO.class);
			
			// 시큐리티 인증용 미완성 토큰 생성
			UsernamePasswordAuthenticationToken token =
					new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());
			
			// 실제 인증 처리 위임
			return this.getAuthenticationManager().authenticate(token);
			
		} catch (Exception e) {
			throw new RuntimeException("로그인 인증 시도 중 에러 발생", e);
		}
	}

	// 4. 로그인 성공 시 JWT를 생성하고 JSON으로 응답하는 메서드
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		// ⚠️ 주의: super.successfulAuthentication()를 호출하면 기본 세션 로그인 동작이나 
		// 다른 리다이렉트가 수행되어 REST API 환경에서 응답이 꼬일 수 있으므로 주석 처리하거나 제거합니다.
		// super.successfulAuthentication(request, response, chain, authResult);
		
		// 토큰 매니저를 통해 Access / Refresh 토큰 생성
		String accessToken = jwtTokenManager.createAccessToken(authResult);
		String refreshToken = jwtTokenManager.createRefreshToken(authResult);
		
		// 생성해 둔 DTO 객체에 토큰 세팅
		JwtAuthDTO jwtAuthDTO = new JwtAuthDTO();
		jwtAuthDTO.setAccessToken(accessToken);
		jwtAuthDTO.setRefreshToken(refreshToken);
		
		// DTO를 JSON 문자열로 변환
		String result = mapper.writeValueAsString(jwtAuthDTO); // writerValueAsString -> writeValueAsString 오타 수정
		
		// HTTP 응답 헤더 및 바디 설정
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(result); // getWriter(result) -> getWriter().write(result) 수정
	}
}