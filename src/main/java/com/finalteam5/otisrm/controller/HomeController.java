package com.finalteam5.otisrm.controller;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class HomeController {

	@RequestMapping("/home")
	public String developManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			log.info("usr" + usr);
		} 
		return "/home/customerHome";
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