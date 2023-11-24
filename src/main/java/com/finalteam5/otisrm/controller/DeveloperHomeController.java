package com.finalteam5.otisrm.controller;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.SrPrgrsOtpt;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.DatesForScheduleChangeRequest;
import com.finalteam5.otisrm.dto.sr.ManageChangeScheduleRequestModalConfig;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForm;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfHr;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPrgrsPic;
import com.finalteam5.otisrm.dto.sr.SrTrnsfSetHrModalCompose;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.usr.Dept;
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
			
			log.info(""+usr);
			return "/home/developerHome";
		} else {
			return "redirect:/";
		}
	}
	
	@PostMapping("/getSrTransferInfo")
	@ResponseBody
	public SrTrnsfInfoForDeveloperHome getSrTransferInfo(Authentication authentication, @RequestParam("srNo") String srNo) {
		return srService.getSrTrnsfInfoForDeveloperHome(srNo);
	}
	
	@PostMapping("/getSrDetailInfo")
	@ResponseBody
	public SrRequestDetailForDeveloperHome getSrDetailInfo(@RequestParam("srNo") String srNo) {
		return srService.getSrRequestDetailForDeveloperHome(srNo);
	}
	
	@GetMapping("/srAtchDownloadForDeveloperHome")
	public void srAtchDownloadForDeveloperHome(String srAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    SrAtch srAtch = srService.getSrAtchBySrAtchNo(srAtchNo);
	    
	    String fileOriginalName = srAtch.getSrAtchNm();
	    
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
	
	@PostMapping("/getTableInfo")
	@ResponseBody
	public SrTableElementsForDeveloperHome getFilteredTableInfo(
			Authentication authentication, 
			@RequestParam("filterType") String filterType, 
			@RequestParam("page") int page) {
		
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			
			return srService.getSrTableElementsForDeveloperHome(usr.getUsrNo(), filterType, page);
		} else {
			return null;
		}
	}
	
	//SR계획정보 모달 구성
	@PostMapping("/getSrPlanModalCompose")
	@ResponseBody
	public SrTrnsfPlanModalCompose getSrPlanModalCompose(Authentication authentication, @RequestParam("srNo") String srNo) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return srService.getSrTrnsfPlanModalComposeBySrNoAndUsrId(usr.getUsrId(), srNo);
	}
	
	//담당자 선택 모달 dept select 구성
	@PostMapping("/getFindPicModalDeptSelectList")
	@ResponseBody
	public List<Dept> getFindPicModalDeptSelectList(Authentication authentication) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return srService.getDeptListByUsrId(usr.getUsrId());
	}
	
	//담당자 선택 모달 테이블 구성
	@PostMapping("/getFindPicModalCompose")
	@ResponseBody
	public SrTrnsfFindPicModalCompose getFindPicModalCompose(
			Authentication authentication, 
			@RequestParam("deptNo") String deptNo,
			@RequestParam("usrNm") String usrNm,
			@RequestParam("pageNo") int pageNo) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		if (deptNo.equals("")) {
			deptNo = null;
		}
		if (usrNm.equals("")) {
			usrNm = null;
		}
		return srService.getSrTrnsfFindPicModalCompose(usr.getUsrNo(), deptNo, usrNm, pageNo);
	}
	
	@PostMapping("/addHr")
	@ResponseBody
	public int addHr(String srNo, String usrNo) {
		return srService.addHr(srNo, usrNo);
	}
	//공수 저장
	@PostMapping("/saveHrInfo")
	@ResponseBody
	public int saveHrInfo(@RequestBody String jsonData) {
		srService.saveHrInfo(jsonData);
		return 0;
	}
	
	//자원 삭제
	@PostMapping("/deleteHrInfo")
	@ResponseBody
	public int deleteHrInfo(@RequestBody String jsonData) {
		log.info(jsonData);
		srService.deleteHrInfo(jsonData);
		return 0;
	}
	
	@PostMapping("/editSrTrnsfPlan")
	@ResponseBody
	public String editSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm) {
		if (srService.editSrTrnsfPlan(srTrnsfPlanForm) == 1) {
			return "success";
		} else {
			return "fail";
		}
		
		
	}
	
	//자원관리 모달 구성
	@PostMapping("/showSetHrModal")
	@ResponseBody
	public SrTrnsfSetHrModalCompose showSetHrModal(@RequestParam("srNo") String srNo) {
		return srService.getSrTrnsfSetHrModalCompose(srNo);
	}
	
	@PostMapping("/getDeptNoByDeptNm")
	@ResponseBody
	public String getDeptNoByDeptNm(@RequestParam("deptNm") String deptNm, @RequestParam("srNo") String srNo) {
		return srService.getDeptNoByDeptNm(deptNm, srNo);
	}
	
	@PostMapping("/updateSrPrgrs")
	@ResponseBody
	public String updateSrPrgrs(SrTrnsfPrgrsPic srTrnsfPrgrsPic) {
		if (srTrnsfPrgrsPic.getAnalysisPicNm().equals("")) {
			srTrnsfPrgrsPic.setAnalysisPicNm(null);
		} 
		if (srTrnsfPrgrsPic.getDesignPicNm().equals("")) {
			srTrnsfPrgrsPic.setDesignPicNm(null);
		}
		if (srTrnsfPrgrsPic.getImplementPicNm().equals("")) {
			srTrnsfPrgrsPic.setImplementPicNm(null);
		}
		if (srTrnsfPrgrsPic.getTestPicNm().equals("")) {
			srTrnsfPrgrsPic.setTestPicNm(null);
		}
		if (srTrnsfPrgrsPic.getApplyRequestPicNm().equals("")) {
			srTrnsfPrgrsPic.setApplyRequestPicNm(null);
		}
		log.info(""+srTrnsfPrgrsPic);
		srService.updateSrPrgrs(srTrnsfPrgrsPic);
		return "success";
	}
	
	@PostMapping("/updateSrTrnsfPrgrs")
	@ResponseBody
	public String updateSrTrnsfPrgrs(SrPrgrsForm srPrgrsForm) {
		srService.updateSrTrnsfPrgrs(srPrgrsForm);
		return "success";
	}
	
	//산출물 등록
	@PostMapping("/addSrPrgrsOtpt")
	@ResponseBody
	public String addSrPrgrsOtpt(Authentication authentication, SrPrgrsOtpt srPrgrsOtpt) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		srPrgrsOtpt.setUsrNo(usr.getUsrNo());
		srService.addSrPrgrsOtpt(srPrgrsOtpt);
		return "success";
	}
	
	//산출물 목록 출력
	@PostMapping("/getSrPrgrsOtpts")
	@ResponseBody
	public List<SrPrgrsOtpt> getSrPrgrsOtpts(String srPrgrsNo) {
		return srService.getSrPrgrsOtpts(srPrgrsNo);
	}
	
	//산출물 다운로드
	@GetMapping("/srPrgrsOtptDownload")
	public void filedownload(String srPrgrsOtptNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    SrPrgrsOtpt srPrgrsOtpt = srService.getSrPrgrsOtptBySrPrgrsOtptNo(srPrgrsOtptNo);
	    
	    String fileOriginalName = srPrgrsOtpt.getSrPrgrsOtptFileNm();
	    
	    String mimeType = srPrgrsOtpt.getSrPrgrsOtptMimeType();
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
	   os.write(srPrgrsOtpt.getSrPrgrsOtptDataByteArray());
	   os.flush();
	   os.close();
	}
	
	@PostMapping("/deleteSelectedOtpt")
	@ResponseBody
	public String deleteSelectedOtpt(@RequestBody List<String> srPrgrsOtptNoList) {
		log.info("" + srPrgrsOtptNoList);
		srService.deleteSelectedOtptList(srPrgrsOtptNoList);
		
		return "success";
	}
	
	//SR실적등록 모달 구성
	@PostMapping("/getUsrCapacity")
	@ResponseBody
	public List<SrTrnsfHr> getUsrCapacity(Authentication authentication) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return srService.getSrTrnsfHrListByUsrNo(usr.getUsrNo());
	}
	
	//당일 SR실적등록
	@PostMapping("/registerHrInfo")
	@ResponseBody
	public int registerHrInfo(@RequestBody String jsonData) {
		return srService.registerHrInfo(jsonData);
	}
	
	//SR일정변경요청 모달 구성(현재 완료요청일)
	@PostMapping("/getSrCmptnPrnmntDt")
	@ResponseBody
	public DatesForScheduleChangeRequest getSrTrgtCmptnDt(String srNo) {
		return srService.getSrCmptnPrnmntDtBySrNo(srNo);
	}
	
	//SR일정변경요청
	@PostMapping("/requestSrScheduleChange")
	@ResponseBody
	public String requestSrScheduleChange(String srNo, String srSchdlChgRqstDt) {
		log.info("" + srNo + " " + srSchdlChgRqstDt);
		if (srSchdlChgRqstDt == null) {
			return "fail";
		} else {
	        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	        try {
	            Date date = dateFormat.parse(srSchdlChgRqstDt);
	            srService.requestSrScheduleChange(srNo, date);
	        } catch (Exception e) {
	            e.printStackTrace();
	        }
			return "success";
		}
		
	}
	
	//일정변경요청 내역 리스트
	@PostMapping("/getManageChangeScheduleRequestModalConfig")
	@ResponseBody
	public List<ManageChangeScheduleRequestModalConfig> getManageChangeScheduleRequestModalConfig() {
		return srService.getManageChangeScheduleRequestModalConfig();
	}
	
	//일정변경요청 결과 확인
	@PostMapping("/srScheduleChangeRequestResultCheck")
	@ResponseBody
	public String srScheduleChangeRequestResultCheck(String srNo) {
		if (srService.srScheduleChangeRequestResultCheck(srNo) == 1) {
			return "success";
		} else {
			return "fail";
		}
		
	}
	
	//완료 요청일 가져오기
	@PostMapping("/getCmptnPrnmntDt")
	@ResponseBody
	public Date getSrCmptnPrnmntDt(String srNo) {
		return srService.getSrCmptnPrnmntDt(srNo);
	}
	
	@PostMapping("/gerUsrInfo")
	@ResponseBody
	public Usr gerUsrInfo(Authentication authentication) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			return usr;
		} else {
			return null;
		}
	}
	
	@PostMapping("/checkSavePrgrs")
	@ResponseBody
	public String checkSavePrgrs(Authentication authentication, String srNo) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			return srService.checkSavePrgrs(usr.getUsrNo(), srNo);
		} else {
			return null;
		}
	}
	
	@PostMapping("/checkSavePlan")
	@ResponseBody
	public String checkSavePlan(Authentication authentication, String srNo) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			return srService.checkSavePlan(usr.getUsrNo(), srNo);
		} else {
			return null;
		}
	}
	
	@PostMapping("/checkSrPrgrsSttsNo")
	@ResponseBody
	public String checkSrPrgrsSttsNo(String srNo) {
		return srService.checkSrPrgrsSttsNo(srNo);
	}
}

