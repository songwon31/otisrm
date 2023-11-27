package com.finalteam5.otisrm.controller;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrSubmit;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
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
			
			//전체 상태 가져오기
			List<SrRqstStts> sttsList = srRqstService.getSrRqstStts();
			model.addAttribute("sttsList", sttsList);
			
			//관할기관 개발부서 목록 가져오기
			String instNo = "SB";
			List<Dept> deptList = usrService.getDeptListByInstNo(instNo);
			model.addAttribute("deptList", deptList);
			
			//기관목록 가져오기(외부업체 제외)
			List<Inst> NoOutsrcInstList = instService.getNoOutsrcInstList();
			model.addAttribute("NoOutsrcInstList", NoOutsrcInstList);
			
			//이관기관 부서 목록 불러오기
			List<Inst> instList = srRqstService.getInstByOutsrcY();
			model.addAttribute("instByOutsrcYList", instList);
			
			//sr요청구분 불러오기
			List<SrDmndClsf> srDmndClsfList = srRqstService.getSrDmndClsf();
			model.addAttribute("srDmndClsfList", srDmndClsfList);
			
			//sr업무구분 가져오기
			List<SrTaskClsf> srTaskClsfList = srRqstService.getSrTaskClsf();
			model.addAttribute("srTaskClsfList", srTaskClsfList);
			
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
	
	@PostMapping("/developManagement/exportExcelDevelopManagementList")
	@ResponseBody
	public List<SrRqstForSearchList> exportExcelDevelopManagementList(
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
		
		List<SrRqstForSearchList> list = srRqstService.getSrRqstForDevelopManagementForExport(params);

		return list;
	}
	
	//sr요청에 해당하는 상세정보 불러오기
	@GetMapping("/developManagement/getSrRqstBySrRqstNo")
	@ResponseBody
	public SrRqst getSrRqstBySrRqstNo(@RequestParam(name="srRqstNo") String srRqstNo, Model model, HttpSession session) {
		SrRqst srRqst = srRqstService.getSrRqstBySrRqstNo(srRqstNo);
		List<SrRqstAtch> list = srRqstService.getSrRqstAtchBySrRqstNo(srRqstNo);
		srRqst.setSrRqstAtchList(list);
		model.addAttribute("srRqstNo", srRqstNo);
		return srRqst;
	}
	
	
	//요청등록 모달에 소속부서에 해당하는 관련시스템 목록불러오기
	@GetMapping("/developManagement/getSysByDeptNo")
	@ResponseBody
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}
	
	//요청 상태 불러오기
	@GetMapping("/developManagement/getSrRqstStts")
	@ResponseBody
	public List<SrRqstStts> getSrRqstStts() {
		List<SrRqstStts> list = srRqstService.getSrRqstStts();
		return list;
	}
	
	//sr에 해당하는 상세정보 불러오기
	@GetMapping("/developManagement/getSrBySrRqstNo")
	@ResponseBody
	public Sr getSrBySrRqstNo(@RequestParam(name="srRqstNo") String srRqstNo, Model model, HttpSession session) throws Exception{
		Sr sr = srRqstService.getSrBySrRqstNo(srRqstNo);
		if(sr != null) {			
			List<SrAtch> list = srRqstService.getSrAtchBySrNo(sr.getSrNo());		
			sr.setSrAtchList(list);
			model.addAttribute("srRqstNo", srRqstNo);
			model.addAttribute("srNo", sr.getSrNo());
		}
		return sr;
	}
	
	//sr요청 첨부파일 다운로드
	@GetMapping("/developManagement/filedownload")
	@ResponseBody
	public void filedownloadSrRqstAtch(String srRqstAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
	
	//sr 첨부파일 다운로드
	@GetMapping("/developManagement/filedownloadSrAtch")
	@ResponseBody
	public void filedownloadSrAtch(String srAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
	
	//sr요청번호에 해당하는 sr개발정보가 있는지 여부 확인
	@GetMapping("/developManagement/checkIfSrInformationPresent")
	@ResponseBody
	public int checkIfSrInformationPresent(String srRqstNo) {
		int countSrBySrRqstNo = srRqstService.checkIfSrInformationPresent(srRqstNo);
		return countSrBySrRqstNo;
	}
	
	//sr 요청 수정하기
	@PostMapping("/developManagement/modifySrRqst")
	@ResponseBody
	public String modifySrRqst(SrRqstSubmit srRqstSubmit) {
	    srRqstService.modifySrRqst(srRqstSubmit);
	    return "redirect:/developManagement";
	}
	
	// sr 요청 삭제하기
	@PostMapping("removeSrRqstForPicHome")
	@ResponseBody
	public String removeSrRqst(String srRqstNo) {
		srRqstService.removeSrRqst(srRqstNo);
		return "redirect:/developManagement";
	}
	
	//sr 개발계획 등록 또는 수정 하기
	@PostMapping("/developManagement/writeOrModifySr")
	@ResponseBody
	public String writeSr(SrSubmit srSubmit) throws Exception{
		
		//srRqstNo에 해당하는 sr정보가 있는지 확인
		int countOfSr = srRqstService.checkIfSrInformationPresent(srSubmit.getSrRqstNo());
	
		//sr정보가 없을 경우 insert(등록)
		if(countOfSr != 0) {
			log.info("수정");
			srRqstService.modifySr(srSubmit);
			
			//상태 변경
			SrRqstSubmit srRqstSubmit = new SrRqstSubmit();
			srRqstSubmit.setSrRqstSttsNo("RCPT_WAIT");
			srRqstService.modifySrRqst(srRqstSubmit);

			
			//변경요청 승인 시 이관계획에 목표완료일도 변경
			if(srSubmit.getSrSchdlChgRqstAprvYn() == "Y") {
				SrTrnsfPlanForm srTrnsfPlanForm = new SrTrnsfPlanForm();
				srTrnsfPlanForm.setSrNo(srSubmit.getSrNo());
				srTrnsfPlanForm.setSrDmndNo(srSubmit.getSrDmndNo());
				srTrnsfPlanForm.setSrTrgtCmptnDt(srSubmit.getSrCmptnPrnmntDt());
				srRqstService.modifySrTrnsfPlan(srTrnsfPlanForm);
			}
			
			//첨부파일이 있다면 첨부파일 업로드
			MultipartFile[] files = srSubmit.getFile();
			
			for(MultipartFile file : files) {
				SrAtch srAtch = new SrAtch();
				if(!file.isEmpty()) {
					//첨부파일을 업로드한 sr요청 번호 
		    		srAtch.setSrNo(srSubmit.getSrNo());
		    		//브라우저에서 선택한 파일 이름 설정
		    		srAtch.setSrAtchNm(file.getOriginalFilename());
		    		//파일의 형식(MIME타입)을 설정
		    		srAtch.setSrAtchMimeType(file.getContentType());
		    		//올린 파일 설정
		    		srAtch.setSrAtchData(file.getBytes());
		    		//파일 크기 설정
		    		srAtch.setSrAtchSize(file.getSize());
		    		
		    		//업로드
		    		srRqstService.uploadSrAtch(srAtch);
				}
		    }
			
			
		//해당 sr정보가 있을 경우 update(수정)
		}else {
			srRqstService.writeSr(srSubmit);
			
			//첨부파일이 있다면 첨부파일 업로드
			MultipartFile[] files = srSubmit.getFile();
			//첨부파일을 업로드한 sr 번호 
			String srPk = srRqstService.getAddSrPk();
			log.info("등록");
			for(MultipartFile file : files) {
				SrAtch srAtch = new SrAtch();
				if(!file.isEmpty()) {
					srAtch.setSrNo(srSubmit.getSrNo());
					//브라우저에서 선택한 파일 이름 설정
					srAtch.setSrAtchNm(file.getOriginalFilename());
					//파일의 형식(MIME타입)을 설정
					srAtch.setSrAtchMimeType(file.getContentType());
					//올린 파일 설정
					srAtch.setSrAtchData(file.getBytes());
					//파일 크기 설정
					srAtch.setSrAtchSize(file.getSize());
					
					//업로드
					srRqstService.uploadSrAtch(srAtch);
				}
			}
		}	
	    return "redirect:/developManagement";
	}
	
}


