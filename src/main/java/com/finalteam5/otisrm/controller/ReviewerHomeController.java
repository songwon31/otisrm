package com.finalteam5.otisrm.controller;
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
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountBySys;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ReviewerHomeController {
	
	@Autowired
	private SrRqstService srRqstService;
	
	@RequestMapping("/reviewerHome")
	public String reviewerHome(Authentication authentication, String reviewerHomeBoardPageNo, Model model, HttpSession session) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
		}
		
		return "/home/reviewerHome";
	}
	
	@PostMapping("/getReviewerHomeCountBoard")
	@ResponseBody
	public Map<String, Integer> getReviewerHomeCountBoard() {
		int aprvWaitCount = srRqstService.getCountSrRqstBySttsNm("승인대기");
		int rcptWaitCount = srRqstService.getCountSrRqstBySttsNm("접수대기");
		int cmptnRqstCount = srRqstService.getCountSrRqstBySttsNm("완료요청");
		
		Map<String, Integer> data = new HashMap<>();
		data.put("aprvWaitCount", aprvWaitCount);
		data.put("rcptWaitCount", rcptWaitCount);
		data.put("cmptnRqstCount", cmptnRqstCount);
		
		return data;
	}
	
	@PostMapping("/getUnprocessedListAll")
	@ResponseBody
	public Map<String, Object> getUnprocessedListAll(
			@RequestParam String reviewerHomeBoardPageNo) {

		//파라미터 전달을 위한 map
		Map<String, Object> params = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		
		//상태에 따른 SR개수 가져오기
 		int totalRows = srRqstService.getCountUnprocessSrRqst();
 		int intReviewerHomeBoardPageNo = Integer.parseInt(reviewerHomeBoardPageNo);
		Pager reviewerHomeBoardPager = new Pager(5, 5, totalRows, intReviewerHomeBoardPageNo);
		
		//페이지 별 요청 목록 가져오기
		List<SrRqstForReviewerHomeBoard> list = srRqstService.getUnprocessSrRqstByPage(reviewerHomeBoardPager);
		
		data.put("list", list);
		data.put("pager", reviewerHomeBoardPager);
		
		return data;
	}
	
	@PostMapping("/getUnprocessedListByStts")
	@ResponseBody
	public Map<String, Object> getUnprocessedListByStts(
			@RequestParam String reviewerHomeBoardPageNo,
			@RequestParam(required=false) String srRqstSttNm) {

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
	
	@PostMapping("/getSrRqstForProgressInfo")
	@ResponseBody
	public SrRqstForReviewerHomeProgress getSrRqstForProgressInfo(@RequestParam String selectedSrRqstNo) {
		//진행상태에 SR정보 표시
		SrRqstForReviewerHomeProgress data = srRqstService.getSrRqstForReviewerHomeProgress(selectedSrRqstNo);
		return data;
	}
	
	@PostMapping("/getReviewerHomeChartBySys")
	@ResponseBody
	public List<SrRqstSttsCountBySys> getReviewerHomeChartBySys() {
		//시스템별 상태개수  리스트
		List<SrRqstSttsCountBySys> sttsCountList = srRqstService.getSttsCountBySysNm();

		return sttsCountList;
	}
	
	@PostMapping("/reviewerHome/getSrRqstForModal")
	@ResponseBody
	public SrRqstForReviewerModal getSrRqstForReviewerModal(@RequestParam String selectedSrRqstNo) {
		//상세모달에 SR정보 표시
		SrRqstForReviewerModal data = srRqstService.getSrRqstForReviewerModal(selectedSrRqstNo);
		return data;
	}
	
	@PostMapping("/reviewerHome/saveApproveResult")
	@ResponseBody
	public void saveApproveResult(@RequestParam String selectedSrRqstNo, @RequestParam String srRqstSttsNo, @RequestParam(required=false) String srRqstRvwRsn) {
		//승인 상태 변경
		Map<String, String> sttsParams = new HashMap<>();
		sttsParams.put("selectedSrRqstNo", selectedSrRqstNo);
		sttsParams.put("srRqstSttsNo", srRqstSttsNo);
		srRqstService.saveSrRqstStts(sttsParams);
		
		//검토의견 업데이트
		if(srRqstRvwRsn != null || srRqstRvwRsn != "") {
			Map<String, String> rvwRsnParams = new HashMap<>();
			rvwRsnParams.put("selectedSrRqstNo", selectedSrRqstNo);
			rvwRsnParams.put("srRqstRvwRsn", srRqstRvwRsn);
			srRqstService.saveSrRqstRvwRsn(rvwRsnParams);
		}
	}
	
	@PostMapping("/reviewerHome/saveReceptionResult")
	@ResponseBody
	public void saveReceptionResult(@RequestParam String selectedSrRqstNo, @RequestParam String srRqstSttsNo) {
		//접수 상태 변경
		Map<String, String> sttsParams = new HashMap<>();
		sttsParams.put("selectedSrRqstNo", selectedSrRqstNo);
		sttsParams.put("srRqstSttsNo", srRqstSttsNo);
		srRqstService.saveSrRqstStts(sttsParams);
	}
	
	@PostMapping("/reviewerHome/saveCompletionResult")
	@ResponseBody
	public void saveCompletionResult(@RequestParam String selectedSrRqstNo) {
		//개발 완료 처리
		Map<String, String> sttsParams = new HashMap<>();
		sttsParams.put("selectedSrRqstNo", selectedSrRqstNo);
		sttsParams.put("srRqstSttsNo", "DEP_CMPTN");
		srRqstService.saveSrRqstStts(sttsParams);
	}

}