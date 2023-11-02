package com.finalteam5.otisrm.controller;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
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
			return "/home/developerHome";
		} else {
			return "/home/developerHome";
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
	
	@PostMapping("/getTableInfo")
	@ResponseBody
	public SrTableElementsForDeveloperHome getFilteredTableInfo(
			Authentication authentication, 
			@RequestParam("filterType") String filterType, 
			@RequestParam("page") int page) {
		
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			
			return srService.getSrTableElementsForDeveloperHome(usr.getUsrId(), filterType, page);
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
		log.info("in");
		return srService.getSrTrnsfFindPicModalCompose(usr.getUsrId(), deptNo, usrNm, pageNo);
	}
	
	@PostMapping("/editSrTrnsfPlan")
	@ResponseBody
	public String editSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm) {
		srService.editSrTrnsfPlan(srTrnsfPlanForm);
		return "success";
	}
	
	//자원관리 모달 구성
	@PostMapping("/showSetHrModal")
	@ResponseBody
	public String showSetHrModal(@RequestParam("srNo") String srNo) {
		return "success";
	}
	
}