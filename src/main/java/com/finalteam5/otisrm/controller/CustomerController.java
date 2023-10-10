package com.finalteam5.otisrm.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/customer")
public class CustomerController {

	@RequestMapping("/home")
	public String main() {
		return "customer/home";
	}
}
