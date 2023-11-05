package com.finalteam5.otisrm.controller;
import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearch;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearchCompose;
import com.finalteam5.otisrm.dto.sr.SrTableConfigForProgressManagement;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/srManagement")
public class SrProgressManagementController {
	@Resource
	private SrServiceImpl srService;

	@RequestMapping("/progressManagement")
	public String progressManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			return "/srManagement/progressManagement/progressManagement";
		}else {
			return "redirect:/";
		}
	}
	
	@PostMapping("/getProgressManagementSearchConfig")
	@ResponseBody
	public ProgressManagementSearchCompose getProgressManagementSearchConfig() {
		ProgressManagementSearchCompose progressManagementSearchCompose = srService.getProgressManagementSearchCompose();
		return progressManagementSearchCompose;
	}
	
	@PostMapping("/getDeptSelectConfig")
	@ResponseBody
	public List<Dept> getDeptSelectCompose(@RequestParam("instNo") String instNo) {
		return srService.getDeptListByInstNo(instNo);
	}
	
	@PostMapping("/getProgressManagementMainTableConfig")
	@ResponseBody
	public SrTableConfigForProgressManagement getProgressManagementMainTableConfig(Authentication authentication, @RequestBody String jsonData) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		SrTableConfigForProgressManagement srTableConfigForProgressManagement = srService.getProgressManagementMainTableConfig(usr.getUsrNo(), jsonData);
		return srTableConfigForProgressManagement;
	}
}
