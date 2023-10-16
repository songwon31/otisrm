package com.finalteam5.otisrm.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {

	@RequestMapping("/")
	public String home() {
		log.info("home 실행");
		return "login";
	}
	@RequestMapping("/alerts")
	public String alerts() {
		log.info("home 실행");
		return "header/alerts";
	}
	
	
}
