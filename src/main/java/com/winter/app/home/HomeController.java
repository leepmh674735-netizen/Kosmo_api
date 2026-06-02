package com.winter.app.home;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("apiHomeController")
public class HomeController {
	
	@GetMapping("/")
	@ResponseBody
	public String home() {
		return "Hello";
	}

}
