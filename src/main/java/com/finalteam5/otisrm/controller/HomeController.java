package com.finalteam5.otisrm.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class HomeController {
	@Autowired
	private SrRqstService srRqstService;

	@GetMapping("home")
	public String developManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
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
	
	//고객사 홈 페이지에서 요청등록 모달에 소속부서에 해당하는 관련시스템 목록불러오기
	@GetMapping("/getSysByDeptNo")
	@ResponseBody
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}
	
	//고객사 홈 페이지에서 요청등록하기
	@PostMapping("/writeSrRqst")
	@ResponseBody
	public void writeSrRqst(SrRqst srRqst) {
		srRqstService.writeSrRqst(srRqst);
	}	
	@GetMapping("/writeSrRqst")
	public String submitSrRqst() {
		return "redirect:/home";
	}
}