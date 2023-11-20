package com.finalteam5.otisrm.controller;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountByDept;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountBySys;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.InstService;
import com.finalteam5.otisrm.service.SrRqstService;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/srManagement")
public class SrStatisticsManagementController {
	@Autowired
	private SrRqstService srRqstService;
	
	@RequestMapping("/statisticsManagement")
	public String reviewManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);

			return "/srManagement/statisticsManagement/statisticsManagement";
		}else {
			return "redirect:/home";
		}
	}
	
	@PostMapping("/getStatisticsList")
	@ResponseBody
	public List<?> getStatisticsList(
			@RequestParam(required=false)String startDate, 
			@RequestParam(required=false)String endDate, 
			@RequestParam(required=false)String statisticsStandard ) {
		
		List<?> sttsCountList = null;
		Map<String, String> paramsForCount = new HashMap<>();
		paramsForCount.put("startDate", startDate);
		paramsForCount.put("endDate", endDate);
		
		if(statisticsStandard.equals("관련시스템별")) {
			//시스템별 상태개수  리스트
			sttsCountList = srRqstService.getSttsCountBySysNm(paramsForCount);
		} else if(statisticsStandard.equals("등록부서별")) {
			//등록부서별 상태개수  리스트
			sttsCountList = srRqstService.getSttsCountByDeptNm(paramsForCount);
		}

		return sttsCountList;
	}
}
