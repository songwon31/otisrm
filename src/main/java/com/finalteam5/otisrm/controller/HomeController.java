package com.finalteam5.otisrm.controller;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {

	@RequestMapping("/home")
	public String developManagement() {
		return "/systemManagement/usrManagement/usrManagement";
		/*boolean a = true;
		if (a) {
			return null;
		} else if (a) {
			return null;
		} else if (a) {
			return null;
		} else if (a) {
			return null;
		} else {
			return null;
		}*/
	}
	
	
}