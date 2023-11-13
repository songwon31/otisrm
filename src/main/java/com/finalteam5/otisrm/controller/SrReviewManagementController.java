package com.finalteam5.otisrm.controller;
import java.io.OutputStream;
import java.net.URLEncoder;
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
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
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
public class SrReviewManagementController {
	@Autowired
	private SrRqstService srRqstService;
	
	@Autowired
	private UsrService usrService;
	
	@Autowired
	private InstService instService;
	
	@RequestMapping("/reviewManagement")
	public String reviewManagement(Authentication authentication, Model model) {
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
			
			//전체 상태 가져오기
			List<SrRqstStts> sttsList = srRqstService.getSrRqstStts();
			model.addAttribute("sttsList", sttsList);
			
			return "/srManagement/reviewManagement/reviewManagement";
		}else {
			return "redirect:/home";
		}
	}
	
	@PostMapping("/getReviewManagementList")
	@ResponseBody
	public Map<String, Object> getReviewManagementList(
			@RequestParam String reviewManagementPageNo,
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
		int totalRows = srRqstService.getCountSrRqstForReviewManagement(paramsForCount);
		
 		int intReviewManagementPageNo = Integer.parseInt(reviewManagementPageNo);
		Pager reviewManagementPager = new Pager(10, 5, totalRows, intReviewManagementPageNo);
		
		paramsForPaging.put("startDate", startDate);
		paramsForPaging.put("endDate", endDate);
		paramsForPaging.put("sysNm", sysNm);
		paramsForPaging.put("status", status);
		paramsForPaging.put("usr", usr);
		paramsForPaging.put("instNo", instNo);
		paramsForPaging.put("deptNo", deptNo);
		paramsForPaging.put("searchTarget", searchTarget);
		paramsForPaging.put("keyword", keyword);
		paramsForPaging.put("startRowNo", reviewManagementPager.getStartRowNo());
		paramsForPaging.put("endRowNo", reviewManagementPager.getEndRowNo());	
		
		//페이지 별 요청 목록 가져오기
		List<SrRqstForSearchList> list = srRqstService.getSrRqstForReviewpManagementByPage(paramsForPaging);
		
		data.put("list", list);
		data.put("pager", reviewManagementPager);
		
		return data;
	}
	
	@PostMapping("/reviewManagement/getSrRqstForModal")
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
	
	@GetMapping("/reviewManagement/srRqstAtchDownload")
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
	
	@GetMapping("/reviewManagement/srAtchDownload")
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
	
	@PostMapping("/reviewManagement/saveApproveResult")
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
	
	@PostMapping("/reviewManagement/saveReceptionResult")
	@ResponseBody
	public void saveReceptionResult(@RequestParam String selectedSrRqstNo, @RequestParam String srRqstSttsNo) {
		//접수 상태 변경
		Map<String, String> sttsParams = new HashMap<>();
		sttsParams.put("selectedSrRqstNo", selectedSrRqstNo);
		sttsParams.put("srRqstSttsNo", srRqstSttsNo);
		srRqstService.saveSrRqstStts(sttsParams);
	}
	
	@PostMapping("/reviewManagement/saveCompletionResult")
	@ResponseBody
	public void saveCompletionResult(@RequestParam String selectedSrRqstNo) {
		//개발 완료 처리
		Map<String, String> sttsParams = new HashMap<>();
		sttsParams.put("selectedSrRqstNo", selectedSrRqstNo);
		sttsParams.put("srRqstSttsNo", "DEP_CMPTN");
		srRqstService.saveSrRqstStts(sttsParams);
	}
	
	@PostMapping("/reviewManagement/exportExcelReviewManagementList")
	@ResponseBody
	public List<SrRqstForSearchList> exportExcelReviewManagementList(
			@RequestParam(required=false)String startDate, 
			@RequestParam(required=false)String endDate, 
			@RequestParam(required=false)String sysNm, 
			@RequestParam(required=false)String status, 
			@RequestParam(required=false)String usr, 
			@RequestParam(required=false)String instNo, 
			@RequestParam(required=false)String deptNo, 
			@RequestParam(required=false)String searchTarget, 
			@RequestParam(required=false)String keyword) {
		
		Map<String, String> params = new HashMap<>();

		params.put("startDate", startDate);
		params.put("endDate", endDate);
		params.put("sysNm", sysNm);
		params.put("status", status);
		params.put("usr", usr);
		params.put("instNo", instNo);
		params.put("deptNo", deptNo);
		params.put("searchTarget", searchTarget);
		params.put("keyword", keyword);
		
		List<SrRqstForSearchList> list = srRqstService.getSrRqstForReviewManagementForExport(params);

		return list;
	}
}
