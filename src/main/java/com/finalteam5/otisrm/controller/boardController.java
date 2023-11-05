package com.finalteam5.otisrm.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/boardManagement")
public class boardController {
	@Autowired
	private UsrService usrService;
	
	@GetMapping("/ntc")
	public String home(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			
			// usrAuthrtNo가 SYS_MANAGER인 경우만 버튼을 표시
	        if ("SYS_MANAGER".equals(usr.getUsrAuthrtNo())) {
	            model.addAttribute("showButton", true);
	        } else {
	            model.addAttribute("showButton", false);
	        }
	        
	        //권한목록 담기(공개 대상 선택을 위함)
	        List<UsrAuthrt> list =  usrService.getUsrAuthrtList();
	        model.addAttribute("usrAuthrts", list);
			
			return "boardManagement/ntc/ntc";
		} else {
			return "redirect:/login";
		}
	}	
	
}