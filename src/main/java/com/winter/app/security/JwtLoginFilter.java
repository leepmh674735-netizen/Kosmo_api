package com.winter.app.security;

import java.io.IOException;
import java.util.HashMap; // [추가] Map 사용을 위한 임포트
import java.util.Map;     // [추가] Map 사용을 위한 임포트

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winter.app.member.MemberDTO;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    
    private final AuthenticationManager authenticationManager;
    private final JwtTokenManger jwtTokenManger;
    private final ObjectMapper objectMapper = new ObjectMapper();

    // 생성자 주입
    public JwtLoginFilter(AuthenticationManager authenticationManager, JwtTokenManger jwtTokenManger) {
         this.authenticationManager = authenticationManager;
         this.jwtTokenManger = jwtTokenManger;
         this.setFilterProcessesUrl("/member/login"); 
    }
    
    // 1. 로그인 인증 시도 단계
    @Override     
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("=== [JwtLoginFilter] 로그인 인증 시도 ===");
        
        try {
            MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);
            
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    memberDTO.getUsername(), 
                    memberDTO.getPassword()
            );
            
            return authenticationManager.authenticate(authenticationToken);
            
        } catch (IOException e) {
            System.out.println("로그인 요청 JSON 파싱 실패: " + e.getMessage());
            throw new RuntimeException(e);
        }
    }
    
    // 2. 로그인 인증 성공 단계 (Access Token & Refresh Token 발급 및 응답)
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        System.out.println("=== [JwtLoginFilter] 로그인 성공 ===");
        
        // 1) 토큰 생성
        String accessToken = jwtTokenManger.makeToken(authResult);
        String refreshToken = jwtTokenManger.makeRefreshToken(authResult); 
        
        // 2) Access Token은 전역 표준대로 'Authorization' 헤더에 담기
        response.addHeader("Authorization", "Bearer " + accessToken);
        
        // 3) Refresh Token은 보안을 위해 HttpOnly 쿠키에 담기
        Cookie refreshCookie = new Cookie("refreshToken", refreshToken);
        refreshCookie.setHttpOnly(true); 
        refreshCookie.setSecure(false);  
        refreshCookie.setPath("/");      
        refreshCookie.setMaxAge(14 * 24 * 60 * 60); // 2주 수명
        response.addCookie(refreshCookie);
        
        // 4) [고도화] 응답 설정 및 ObjectMapper를 이용한 JSON 바디 작성
        response.setContentType("application/json; charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);
        
        // 데이터 포맷을 Map으로 예쁘게 묶어줍니다.
        Map<String, Object> map = new HashMap<>();
        map.put("message", "로그인 성공");
        map.put("accessToken", accessToken);
        // 필요 시 응답 바디에도 refresh-token을 내려줄 수 있습니다. (현재는 주석 유지 혹은 필요시 해제)
        // map.put("refreshToken", refreshToken);
        
        // ObjectMapper를 사용하여 Map 객체를 순식간에 JSON 문자열로 변환 후 전송합니다.
        String jsonResponse = objectMapper.writeValueAsString(map);
        response.getWriter().write(objectMapper.writeValueAsString(map));
    }

    // 3. 로그인 인증 실패 단계
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        System.out.println("=== [JwtLoginFilter] 로그인 실패: " + failed.getMessage() + " ===");
        
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED); 
        response.setContentType("application/json; charset=UTF-8");
        response.getWriter().write("{\"message\": \"로그인 실패: 아이디 또는 비밀번호를 확인하세요.\"}");
    }
}