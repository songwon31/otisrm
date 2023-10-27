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
			model.addAttribute("pager", pager);
			
			List<SrForDeveloperHomeBoard> srList = srService.getSrForDeveloperHomeBoardListByUsrIdAndPager(usr.getUsrId(), pager);
			model.addAttribute("srList", srList);
			
			List<SrForDeveloperHomeBoard> totalSrList = srService.getSrForDeveloperHomeBoardListByUsrId(usr.getUsrId());
			
			int requestNum = 0;
			int analysisNum = 0;
			int designNum = 0;
			int implementNum = 0;
			int testNum = 0;
			int applyNum = 0;
			for (SrForDeveloperHomeBoard sr : totalSrList) {
				if (sr.getSrPrgrsSttsNm().equals("요청")) {
					requestNum++;
				} else if (sr.getSrPrgrsSttsNm().equals("분석")) {
					analysisNum++;
				} else if (sr.getSrPrgrsSttsNm().equals("설계")) {
					designNum++;
				} else if (sr.getSrPrgrsSttsNm().equals("구현")) {
					implementNum++;
				} else if (sr.getSrPrgrsSttsNm().equals("시험")) {
					testNum++;
				} else if (sr.getSrPrgrsSttsNm().equals("반영요청")) {
					applyNum++;
				}
			}
			model.addAttribute("requestNum", requestNum);
			model.addAttribute("analysisNum", analysisNum);
			model.addAttribute("designNum", designNum);
			model.addAttribute("implementNum", implementNum);
			model.addAttribute("testNum", testNum);
			model.addAttribute("applyNum", applyNum);
			
			return "/home/developerHome";
		} else {
			return "/home/developerHome";
		}
	}
	
	
}