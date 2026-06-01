package com.winter.app.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winter.app.member.MemberDTO;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class JwtLoginFilter extends UsernamePasswordAuthenticationFilter {

    private ObjectMapper objectMapper = new ObjectMapper();

    private JwtTokenManger jwtTokenManger;

    private AuthenticationManager manager;

    public JwtLoginFilter(AuthenticationManager manager, JwtTokenManger jwtTokenManger){
        this.setFilterProcessesUrl("/member/login");
        this.manager=manager;
        this.jwtTokenManger=jwtTokenManger;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            MemberDTO memberDTO = objectMapper.readValue(request.getInputStream(), MemberDTO.class);
            UsernamePasswordAuthenticationToken token =
                    new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());
            return manager.authenticate(token);

        } catch (IOException e) {
            //throw new RuntimeException(e);
        }
        return null;
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        System.out.println("로그인 성공");
        String accessToken = jwtTokenManger.createAccessToken(authResult);
        String refrshToken = jwtTokenManger.createRefreshToken(authResult);

        //응답 헤더 설정 및 바디 설정
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setStatus(HttpServletResponse.SC_OK);

        //응답 데이터를 JSON 구조로 만들기
        Map<String, Object> map = new HashMap<>();
        map.put("accessToken", accessToken);
        map.put("refreshToken", refrshToken);

        //응답 전송
        response.getWriter().write(objectMapper.writeValueAsString(map));
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        System.out.println("로그인 실패");
    }
}