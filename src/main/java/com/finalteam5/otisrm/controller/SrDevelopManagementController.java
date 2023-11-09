package com.finalteam5.otisrm.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
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
public class SrDevelopManagementController {
	
	@Autowired
	private SrRqstService srRqstService;
	@Autowired
	private UsrService usrService;
	@Autowired
	private InstService instService;

	@RequestMapping("/developManagement")
	public String developManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			
			//전체 시스템 이름 가져오기
			List<String> totalSystemList = srRqstService.getTotalSysNm();
			model.addAttribute("totalSystemList", totalSystemList);
			
			//관할기관 개발부서 목록 가져오기
			String instNo = "SB";
			List<Dept> deptList = usrService.getDeptListByInstNo(instNo);
			model.addAttribute("deptList", deptList);
			
			//기관목록 가져오기(외부업체 제외)
			List<Inst> NoOutsrcInstList = instService.getNoOutsrcInstList();
			model.addAttribute("NoOutsrcInstList", NoOutsrcInstList);
			
			return "/srManagement/developManagement/developManagement";
		} else {
			return "redirect:/";
		}
	}
	
	@PostMapping("/getDevelopManagementList")
	@ResponseBody
	public Map<String, Object> getDevelopManagementList(
			@RequestParam String developManagementPageNo,
			@RequestParam(required=false)String startDate, 
			@RequestParam(required=false)String endDate, 
			@RequestParam(required=false)String sysNm, 
			@RequestParam(required=false)String status, 
			@RequestParam(required=false)String usr, 
			@RequestParam(required=false)String instNo, 
			@RequestParam(required=false)String deptNo, 
			@RequestParam(required=false)String searchTarget, 
			@RequestParam(required=false)String keyword) {

		//파라미터 전달을 위한 map
		Map<String, String> paramsForCount = new HashMap<>();
		Map<String, Object> paramsForPaging = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		
		paramsForCount.put("startDate", startDate);
		paramsForCount.put("endDate", endDate);
		paramsForCount.put("sysNm", sysNm);
		paramsForCount.put("status", status);
		paramsForCount.put("usr", usr);
		paramsForCount.put("instNo", instNo);
		paramsForCount.put("deptNo", deptNo);
		paramsForCount.put("searchTarget", searchTarget);
		paramsForCount.put("keyword", keyword);

		//검색조건에 따른 SR개수 가져오기
		int totalRows = srRqstService.getCountSrRqstForDevelopManagement(paramsForCount);
		
 		int intDevelopManagementPageNo = Integer.parseInt(developManagementPageNo);
		Pager developManagementPager = new Pager(10, 5, totalRows, intDevelopManagementPageNo);
		
		paramsForPaging.put("startDate", startDate);
		paramsForPaging.put("endDate", endDate);
		paramsForPaging.put("sysNm", sysNm);
		paramsForPaging.put("status", status);
		paramsForPaging.put("usr", usr);
		paramsForPaging.put("instNo", instNo);
		paramsForPaging.put("deptNo", deptNo);
		paramsForPaging.put("searchTarget", searchTarget);
		paramsForPaging.put("keyword", keyword);
		paramsForPaging.put("startRowNo", developManagementPager.getStartRowNo());
		paramsForPaging.put("endRowNo", developManagementPager.getEndRowNo());	
		
		//페이지 별 요청 목록 가져오기
		List<SrRqstForSearchList> list = srRqstService.getSrRqstForDevelopManagementByPage(paramsForPaging);
		
		data.put("list", list);
		data.put("pager", developManagementPager);
		
		return data;
	}
	
}
