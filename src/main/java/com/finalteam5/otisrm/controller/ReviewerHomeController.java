package com.finalteam5.otisrm.controller;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ReviewerHomeController {
	
	@Autowired
	private SrRqstService srRqstService;
	
	@GetMapping("/reviewerHome")
	public String reviewerHome(Authentication authentication, String reviewerHomeBoardPageNo, Model model, HttpSession session) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
		}
		
		//전체 시스템 이름 가져오기
		List<String> totalSytemList = srRqstService.getTotalSysNm();
		model.addAttribute("totalSytemList", totalSytemList);
		
		return "/home/reviewerHome";
	}
	
	@GetMapping("/getReviewerHomeBoardList")
	@ResponseBody
	public Map<String, Object> getReviewerHomeBoardList(
			@RequestParam String reviewerHomeBoardPageNo,
			@RequestParam String srRqstSttNm) {

		//파라미터 전달을 위한 map
		Map<String, Object> params = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		
		//상태에 따른 SR개수 가져오기
 		int totalRows = srRqstService.getCountSrRqstBySttsNm(srRqstSttNm);
 		int intReviewerHomeBoardPageNo = Integer.parseInt(reviewerHomeBoardPageNo);
		Pager reviewerHomeBoardPager = new Pager(5, 5, totalRows, intReviewerHomeBoardPageNo);
		
		params.put("startRowNo", reviewerHomeBoardPager.getStartRowNo());
		params.put("endRowNo", reviewerHomeBoardPager.getEndRowNo());	
		params.put("srRqstSttNm", srRqstSttNm);
		
		//페이지 별 요청 목록 가져오기
		List<SrRqstForReviewerHomeBoard> list = srRqstService.getSrRqstForReviewerHomeBoardListByPage(params);
		
		data.put("list", list);
		data.put("pager", reviewerHomeBoardPager);
		
		return data;
	}
	
	@GetMapping("/getSrRqstForReviewerModal")
	@ResponseBody
	public SrRqstForReviewerModal getSrRqstForReviewerModal(@RequestParam String selectedSrRqstNo) {
		SrRqstForReviewerModal data =srRqstService.getSrRqstForReviewerModal(selectedSrRqstNo);
		log.info("" + data);
		return data;
	}

}