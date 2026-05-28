package com.winter.app.member;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/member/*")
public class MemberController {
	
	@GetMapping("join")
	public void join() throws Exception{
	   System.out.println("join");
	}
}
