package com.finalteam5.otisrm.controller;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
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
		
		//요청 목록 페이징  
		if(reviewerHomeBoardPageNo == null) {
			 //세션에 저장되어 있는지 확인
	         if(session.getAttribute("reviewerHomeBoardPageNo") == null || session.getAttribute("reviewerHomeBoardPageNo") == "") {
	        	 reviewerHomeBoardPageNo = "1";  
	         }else {
	        	 reviewerHomeBoardPageNo = (String) session.getAttribute("reviewerHomeBoardPageNo");
	         }
		}
		//문자열을 정수로 변환
		int intReviewerHomeBoardPageNo = Integer.parseInt(reviewerHomeBoardPageNo);
		//세션에 현재 페이지번호 저장
		session.setAttribute("reviewerHomBoardPageNo", String.valueOf(reviewerHomeBoardPageNo));
		
		int totalRows = srRqstService.totalSrRqst();
		Pager reviewerHomeBoardPager = new Pager(5, 5, totalRows, intReviewerHomeBoardPageNo);
		
		//페이지 별 요청 목록 불러오기
		List<SrRqstForReviewerHomeBoard> list = srRqstService.getSrRqstForReviewerHomeBoardListByPage(reviewerHomeBoardPager);
		model.addAttribute("reviewerHomeBoardPager", reviewerHomeBoardPager);
		model.addAttribute("reviewerHomeBoardList", list);
		
		//전체 시스템 이름 가져오기
		List<String> totalSytemList = srRqstService.getTotalSysNm();
		model.addAttribute("totalSytemList", totalSytemList);
		
		return "/home/reviewerHome";
	}

}