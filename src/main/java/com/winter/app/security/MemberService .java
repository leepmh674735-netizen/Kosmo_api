package com.winter.app.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper; // ObjectMapper 임포트 필요

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {
    
    private final ObjectMapper objectMapper = new ObjectMapper();

    public JwtLoginFilter() {
        
        this.setFilterProcessesUrl("/member/login");
    }
    
    @Override     
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
            throws AuthenticationException {
        System.out.println("로그인 시도");
        
        try {

            MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);
            
            
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                    memberDTO.getUsername(), 
                    memberDTO.getPassword()
            );
            
            
            return this.getAuthenticationManager().authenticate(token);
            
        } catch (IOException e) {
            // [수정] 예외 발생 시 throws가 아니라 throw new를 사용해야 합니다.
            throw new RuntimeException("로그인 데이터 파싱 실패", e);
        }
    }
    
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
            Authentication authResult) throws IOException, ServletException {
        System.out.println("로그인 성공");
        
       
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException failed) throws IOException, ServletException {
        System.out.println("로그인 실패: " + failed.getMessage());
        
        super.unsuccessfulAuthentication(request, response, failed);
    }
}