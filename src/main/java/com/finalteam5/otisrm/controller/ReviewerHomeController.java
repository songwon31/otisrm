package com.finalteam5.otisrm.controller;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountBySys;
import com.finalteam5.otisrm.dto.usr.Inst;
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
			
			//이관기관목록 가져오기
			List<Inst> outsrcInstList = srRqstService.getInstByOutsrcY();
			model.addAttribute("outsrcInstList", outsrcInstList);
			
			//요청구분 가져오기
			List<SrDmndClsf> dmndClsfList = srRqstService.getSrDmndClsf();
			model.addAttribute("dmndClsfList", dmndClsfList);
			
			//업무구분 가져오기
			List<SrTaskClsf> taskClsfList = srRqstService.getSrTaskClsf();
			model.addAttribute("taskClsfList", taskClsfList);
			
			return "/home/reviewerHome";
		} else {
			return "redirect:/";
		}
		
	}
	
	@PostMapping("/getReviewerHomeCountBoard")
	@ResponseBody
	public Map<String, Integer> getReviewerHomeCountBoard() {
		int allUnprocessedCount = srRqstService.getCountUnprocessSrRqst();
		int aprvWaitCount = srRqstService.getCountSrRqstBySttsNm("승인대기");
		int rcptWaitCount = srRqstService.getCountSrRqstBySttsNm("접수대기");
		int cmptnRqstCount = srRqstService.getCountSrRqstBySttsNm("완료요청");
		
		Map<String, Integer> data = new HashMap<>();
		data.put("allUnprocessedCount", allUnprocessedCount);
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
		List<SrRqstSttsCountBySys> sttsCountList = srRqstService.getSttsCountBySysNmForChart();

		return sttsCountList;
	}
	
	@PostMapping("/reviewerHome/getSrRqstForModal")
	@ResponseBody
	public SrRqstForReviewerModal getSrRqstForReviewerModal(@RequestParam String selectedSrRqstNo) {
		//상세모달에 SR정보 표시
		SrRqstForReviewerModal data = srRqstService.getSrRqstForReviewerModal(selectedSrRqstNo);
		
		//srRqstAtch 가져오기
		List<SrRqstAtch> srRqstAtchList = srRqstService.getSrRqstAtchBySrRqstNo(selectedSrRqstNo);
		data.setSrRqstAtchList(srRqstAtchList);
		
		//srAtch 가져오기
		String srNo = data.getSrNo();
		List<SrAtch> srAtchList = null;
		
		if(srNo != null) {
			srAtchList = srRqstService.getSrAtchBySrNo(srNo);
		}
		data.setSrAtchList(srAtchList);
		
		return data;
	}
	
	@GetMapping("/reviewerHome/srRqstAtchDownload")
	public void srRqstAtchDownload(String srRqstAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    // 요청된 SrRqstAtchNo에 해당하는 SrRqstAtch 객체를 가져옴
	    SrRqstAtch srRqstAtch = srRqstService.getSrRqstAtchBySrRqstAtchNo(srRqstAtchNo);
	    String fileOriginalName = srRqstAtch.getSrRqstAtchNm();
	    
	    //응답 헤드에 Content-Type 추가
	    String mimeType = srRqstAtch.getSrRqstAtchMimeType();
	    response.setContentType(mimeType);
	    
	   //응답 헤드에 한글 이름의 파일명을 ISO-8859-1 문자셋으로 인코딩해서 추가
	   String userAgent = request.getHeader("User-Agent");
	   if(userAgent.contains("Trident")|| userAgent.contains("MSIE")) {
		   //IE
		   fileOriginalName = URLEncoder.encode(fileOriginalName,"UTF-8");
	   }else {
		   //Chrome, Edge, FireFox, Safari 
		   fileOriginalName = new String(fileOriginalName.getBytes("UTF-8"),"ISO-8859-1");
	   }
	   //response.setHeader가 없으면 브라우저에 바로 보여줄 수 있으면 보여줌	
	   // 바로 보여줄 수 없으면 파일이 다운로드됨
	   response.setHeader("Content-Disposition", "attachment; fileName=\"" + fileOriginalName + "\"" );
	   
	   //응답 본문에 파일데이터 싣기
	   OutputStream os = response.getOutputStream();
	   os.write(srRqstAtch.getSrRqstAtchData());
	   os.flush();
	   os.close();    
	}
	
	@GetMapping("/reviewerHome/srAtchDownload")
	public void srAtchDownload(String srAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    // 요청된 SrRqstAtchNo에 해당하는 SrRqstAtch 객체를 가져옴
	    SrAtch srAtch = srRqstService.getSrAtchBySrAtchNo(srAtchNo);
	    String fileOriginalName = srAtch.getSrAtchNm();
	    
	    //응답 헤드에 Content-Type 추가
	    String mimeType = srAtch.getSrAtchMimeType();
	    response.setContentType(mimeType);
	    
	   //응답 헤드에 한글 이름의 파일명을 ISO-8859-1 문자셋으로 인코딩해서 추가
	   String userAgent = request.getHeader("User-Agent");
	   if(userAgent.contains("Trident")|| userAgent.contains("MSIE")) {
		   //IE
		   fileOriginalName = URLEncoder.encode(fileOriginalName,"UTF-8");
	   }else {
		   //Chrome, Edge, FireFox, Safari 
		   fileOriginalName = new String(fileOriginalName.getBytes("UTF-8"),"ISO-8859-1");
	   }
	   //response.setHeader가 없으면 브라우저에 바로 보여줄 수 있으면 보여줌	
	   // 바로 보여줄 수 없으면 파일이 다운로드됨
	   response.setHeader("Content-Disposition", "attachment; fileName=\"" + fileOriginalName + "\"" );
	   
	   //응답 본문에 파일데이터 싣기
	   OutputStream os = response.getOutputStream();
	   os.write(srAtch.getSrAtchData());
	   os.flush();
	   os.close();    
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
	public void saveReceptionResult(@RequestParam String selectedSrRqstNo, 
									@RequestParam String srRqstSttsNo, 
									@RequestParam String srTrnsfYn,
									@RequestParam String srNo,
									@RequestParam String srTrnsfInstNo,
									@RequestParam String srDmndNo) {
		//이관개발 접수할 경우
		if(srRqstSttsNo.equals("RCPT") && srTrnsfYn.equals("Y")) {
			//이관계획 저장
            SrTrnsfPlanForm srTrnsfPlanForm = new SrTrnsfPlanForm();
            srTrnsfPlanForm.setSrNo(srNo);
            srTrnsfPlanForm.setInstNo(srTrnsfInstNo);
            srTrnsfPlanForm.setSrDmndNo(srDmndNo);
            srTrnsfPlanForm.setSrPrgrsSttsNo("RQST");
            srRqstService.writeSrTrnsfPlan(srTrnsfPlanForm);
            
            //이관일 저장
            Date srTrnsfDt = new Date();
            srRqstService.saveSrTrnsfDt(srNo, srTrnsfDt);
		}
		
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