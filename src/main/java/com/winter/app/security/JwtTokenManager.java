package com.winter.app.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenManager {

	@Value("${jwt.access-valid-time}")
	private Long accessValidTime;

	@Value("${jwt.refresh-valid-time}")
	private Long refreshValidTime;

	@Value("${jwt.issuer}")
	private String issuer;

	@Value("${jwt.secret-key}")
	private String secretKey;

	private SecretKey key;

	@PostConstruct
	public void init() {
		this.key = Keys.hmacShaKeyFor(this.secretKey.getBytes(StandardCharsets.UTF_8));
	}

	public String createToken(Authentication authentication, Long validTime) {
		String authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		return Jwts.builder().subject(authentication.getName()).claim("role", authorities).issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + validTime)).issuer(this.issuer).signWith(this.key)
				.compact();
	}

	// 토큰 검증하는 메서드
	public void getAuthenticationByToken(String token) throws Exception {
		Claims claim = Jwts
				.parser()
				.verifyWith(this.key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
		// 검증 실패 하면 Exception 발생

	}
}