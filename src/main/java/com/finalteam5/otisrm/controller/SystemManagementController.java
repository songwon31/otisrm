package com.finalteam5.otisrm.controller;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

/**
 * @author 송원석
 *
 */

@Slf4j
@Controller
@RequestMapping("/systemManagement")
public class SystemManagementController {
	
	
	
	@RequestMapping("/userManagement")
	public String userManagement(Model model, HttpSession session) {
		return "/systemManagement/userManagement/userManagement";
	}
	
}
