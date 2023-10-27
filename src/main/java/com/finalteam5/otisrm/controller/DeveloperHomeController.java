package com.finalteam5.otisrm.controller;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrServiceImpl;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class DeveloperHomeController {
	
	@Resource
	private SrServiceImpl srService;

	@RequestMapping("/developerHome")
	public String developManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			
			int totalTransferedSrNum = srService.getTotalTransferedSrNumByUsrId(usr.getUsrId());
			Pager pager = new Pager(5, 5, totalTransferedSrNum, 1);
			
			List<SrForDeveloperHomeBoard> srList = srService.getSrForDeveloperHomeBoardListByUsrIdAndPager(usr.getUsrId(), pager);
			model.addAttribute("srList", srList);
			
			return "/home/developerHome";
		} else {
			return "/home/developerHome";
		}
	}
	
	
}