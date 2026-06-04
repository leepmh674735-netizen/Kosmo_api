package com.winter.app.security;

import java.io.IOException;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.winter.apip.member.MemberDTO;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

	private final ObjectMapper mapper = new ObjectMapper();

	public JwtAuthenticationFilter(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		this.setAuthenticationManager(authenticationConfiguration.getAuthenticationManager());
		this.setFilterProcessesUrl("/member/login");
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		try {
			MemberDTO memberDTO = mapper.readValue(request.getInputStream(), MemberDTO.class);
			
			UsernamePasswordAuthenticationToken token =
					new UsernamePasswordAuthenticationToken(memberDTO.getUsername(), memberDTO.getPassword());
			
			return this.getAuthenticationManager().authenticate(token);
			
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authResult) throws IOException, ServletException {
		
		super.successfulAuthentication(request, response, chain, authResult);
	}
}