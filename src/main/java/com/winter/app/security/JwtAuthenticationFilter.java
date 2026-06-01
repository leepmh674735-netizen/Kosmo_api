package com.winter.app.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import java.io.IOException;

public class JwtAuthenticationFilter extends BasicAuthenticationFilter {

    private JwtTokenManger jwtTokenManger;

    public JwtAuthenticationFilter(AuthenticationManager manager, JwtTokenManger jwtTokenManger){
        super(manager);
        this.jwtTokenManger=jwtTokenManger;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token= request.getHeader("Authorization");//Bearer asfsad23423

        if(token != null) {
            //String[] ar = token.split(" ");
            token = token.substring(token.indexOf(" ") + 1);

            try {
                Authentication authentication = this.jwtTokenManger.getAuthenticationByToken(token);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }

        }
        chain.doFilter(request, response);
    }
}