package com.finalteam5.otisrm.controller;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/boardManagement")
public class boardController {
	
	@GetMapping("/ntc")
	public String home(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			return "boardManagement/ntc/ntc";
		} else {
			return "redirect:/login";
		}
	}	
	
}