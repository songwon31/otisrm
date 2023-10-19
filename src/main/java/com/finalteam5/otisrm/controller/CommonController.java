package com.finalteam5.otisrm.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.UserAuthrt;
import com.finalteam5.otisrm.service.user.UserService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CommonController {
	@Autowired
	private UserService userService;

	@RequestMapping("/")
	public String home() {
		return "redirect:/login";
	}
	
	@RequestMapping("/login")
	public String login() {
		return "common/login";
	}
	
	@GetMapping("/join/join")
	public String join(Model model) {
		//소속기관 목록 불러오기
	    List<Inst> instList = userService.getInstList();
	    model.addAttribute("instOptions", instList);
	    
	    //가입 권한 목록 불러오기
	    List<UserAuthrt> usetAuthrtList = userService.getUserAuthrtList();
	    log.info(usetAuthrtList.toString());
	    model.addAttribute("usetAuthrtOptions", usetAuthrtList);
		
	    return "common/join/join";
	}

	@RequestMapping("join/joinDetail")
	public String joinDetail() {
		return "common/join/joinDetail";
	}
	
	@RequestMapping("/alerts")
	public String alerts() {
		return "header/alerts";
	}
	
	
}
