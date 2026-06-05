package com.winter.app.security;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class JwtAuthDTO {
	
	/**
	 * 이클래스는 토큰을 발급하고
	 * 여기에 담아서 응답으로 보내는 클래스
	*/
	private String accessToken;
	private String refreshToken;
	private String username;
	
}
