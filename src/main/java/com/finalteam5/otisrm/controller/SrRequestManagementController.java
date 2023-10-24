package com.finalteam5.otisrm.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/srManagement")
public class SrRequestManagementController {

	
	
	@RequestMapping("/requestManagement")
	public String requestManagement() {
		return "/srManagement/requestManagement/requestManagement";
	}
	
}
