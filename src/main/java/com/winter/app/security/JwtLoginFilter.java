package com.winter.app.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winter.app.member.MemberDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

	private final ObjectMapper objectMapper;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenManager jwtTokenManager;

	// 생성자를 통해 의존성 주입 (Manager와 TokenManager를 필터 등록 시점에 주입받음)
	public JwtLoginFilter(AuthenticationManager authenticationManager, JwtTokenManager jwtTokenManager) {
		this.authenticationManager = authenticationManager;
		this.jwtTokenManager = jwtTokenManager;
		this.objectMapper = new ObjectMapper();
		
		// 로그인 요청을 처리할 URL 설정
		this.setFilterProcessesUrl("/member/login");
	}

	// 1. 로그인 인증 시도 (요청 바디의 JSON을 읽어 인증 토큰 생성 후 검증)
	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {

		try {
			// request의 InputStream에서 JSON 데이터를 읽어 MemberDTO 객체로 변환
			MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);
			
			// 인증용 토큰 객체 생성
			UsernamePasswordAuthenticationToken authenticationToken = 
					new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());
			
			// AuthenticationManager에게 인증 처리를 위임
			return this.authenticationManager.authenticate(authenticationToken);

		} catch (IOException e) {
			// JSON 파싱 실패 등 예외 발생 시 세큐리티 예외로 던져 unsuccessfulAuthentication 유도
			throw new RuntimeException("로그인 요청 데이터 파싱 실패", e);
		}
	}

	// 2. 로그인 성공 시 실행되는 메서드 (JWT 생성 및 JSON 응답 반환)
	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		// 토큰 생성
		String accessToken = jwtTokenManager.createAccessToken(authResult);
		String refreshToken = jwtTokenManager.createRefreshToken(authResult);

		// 응답 헤더 및 인코딩 설정
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.setStatus(HttpServletResponse.SC_OK);

		// 응답 바디 데이터 구성
		Map<String, Object> map = new HashMap<>();
		map.put("accessToken", accessToken);
		map.put("refreshToken", refreshToken);

		// JSON 문자열로 변환하여 클라이언트에 전송
		response.getWriter().write(objectMapper.writeValueAsString(map));
	}

	// 3. 로그인 실패 시 실행되는 메서드
	@Override
	protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException failed) throws IOException, ServletException {
		
		System.out.println("로그인 실패: " + failed.getMessage());
		
		// 필요 시 실패 응답(401 Unauthorized)을 JSON으로 내려주는 로직을 추가할 수 있습니다.
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write("{\"error\": \"Login Failed\", \"message\": \"" + failed.getMessage() + "\"}");
	}
}
