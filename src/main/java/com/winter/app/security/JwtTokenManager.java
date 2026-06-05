package com.winter.app.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.winter.app.member.MemberRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenManager {

	// application.properties의 하이픈(-) 표기법과 일치하도록 매핑
	@Value("${jwt.access-valid-time}")
	private Long accessValidTime;

	@Value("${jwt.refresh-valid-time}")
	private Long refreshValidTime;

	@Value("${jwt.issuer}")
	private String issuer;

	@Value("${jwt.secret-key}")
	private String secretKey;

	private SecretKey key;

	private final MemberRepository memberRepository;

	public JwtTokenManager(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@PostConstruct
	public void init() {
		this.key = Keys.hmacShaKeyFor(this.secretKey.getBytes(StandardCharsets.UTF_8));
	}
	
	// 1. Access Token을 생성하는 메서드
	public String createAccessToken(Authentication authentication) {
		return this.createToken(authentication, accessValidTime);
	}
	
	// 2. Refresh Token을 생성하는 메서드
	public String createRefreshToken(Authentication authentication) {
		return this.createToken(authentication, refreshValidTime);
	}
	
	// 3. 내부 토큰 생성 공통 메서드
	private String createToken(Authentication authentication, Long validTime) {
		String authorities = authentication.getAuthorities().stream()
				.map(GrantedAuthority::getAuthority)
				.collect(Collectors.joining(","));

		return Jwts.builder()
				.subject(authentication.getName())
				.claim("role", authorities)
				.issuedAt(new Date())
				.expiration(new Date(System.currentTimeMillis() + validTime))
				.issuer(this.issuer)
				.signWith(this.key)
				.compact();
	}

	// 4. 토큰 검증 및 복호화 메서드
	public Claims getClaimsByToken(String token) throws Exception {
		return Jwts.parser()
				.verifyWith(this.key)
				.build()
				.parseSignedClaims(token)
				.getPayload();
	}

	// 5. 토큰을 이용한 Authentication 객체 반환 메서드
	public Authentication getAuthenticationByToken(String token) {
		try {
			Claims claims = getClaimsByToken(token);
			UserDetails memberDTO = memberRepository.findById(claims.getSubject())
					.orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + claims.getSubject()));

			return new UsernamePasswordAuthenticationToken(memberDTO, null, memberDTO.getAuthorities());
		} catch (Exception e) {
			throw new IllegalArgumentException("유효하지 않은 토큰입니다.", e);
		}
	}
}