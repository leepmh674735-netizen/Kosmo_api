package com.winter.app.security;

import com.winter.app.member.MemberRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtTokenManager {

    @Value("${jwt.accessValidTime}")
    private Long accessValidTime;

    @Value("${jwt.refreshValidTime}")
    private Long refreshValidTime;

    @Value("${jwt.issuer}")
    private String issuer;

    @Value("${jwt.secretKey}")
    private String secretKey;

    private SecretKey key;

    private final MemberRepository memberRepository;

    public JwtTokenManager(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secretKey.getBytes());
    }

    public String createAccessToken(Authentication authentication) {
        return this.createToken(authentication, accessValidTime);
    }

    public String createRefreshToken(Authentication authentication) {
        return this.createToken(authentication, refreshValidTime);
    }

    private String createToken(Authentication authentication, Long validTime) {
        return Jwts.builder()
                .subject(authentication.getName())
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + validTime))
                .issuer(this.issuer)
                .signWith(this.key)
                .compact();
    }

    public Authentication getAuthenticationByToken(String token) throws Exception {
        Claims claims = Jwts.parser()
                .verifyWith(this.key)
                .build()
                .parseSignedClaims(token)
                .getPayload();

        UserDetails memberDTO = memberRepository.findById(claims.getSubject())
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다: " + claims.getSubject()));

        return new UsernamePasswordAuthenticationToken(memberDTO, null, memberDTO.getAuthorities());
    }
}