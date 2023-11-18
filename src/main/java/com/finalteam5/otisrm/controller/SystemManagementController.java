package com.finalteam5.otisrm.controller;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.inst.SysTableConfig;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.InstTableConfigForInstManagement;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrManagementModalConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearchConfigure;
import com.finalteam5.otisrm.dto.usr.UsrTableConfigForUsrManagement;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.InstService;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;

/**
 * @author 송원석
 *
 */

@Slf4j
@Controller
@RequestMapping("/systemManagement")
public class SystemManagementController {
	@Resource
	UsrService usrService;
	@Resource
	InstService instService;
	
	//사용자 관리 페이지
	@RequestMapping("/usrManagement")
	public String usrManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			return "/systemManagement/usrManagement";
		} else {
			return "/systemManagement/usrManagement";
		}
	}
	
	@PostMapping("/usrManagement/getUsrManagementSearchConfig")
	@ResponseBody
	public UsrManagementSearchConfigure getUsrManagementSearchConfig() {
		return usrService.getUsrManagementPageConfigureData();
	}
	
	@PostMapping("/usrManagement/getDeptSelectConfig")
	@ResponseBody
	public List<Dept> getDeptSelectConfig(String instNo) {
		return usrService.getDeptSelectConfig(instNo);
	}
	
	@PostMapping("/usrManagement/getUsrManagementMainTableConfig")
	@ResponseBody
	public UsrTableConfigForUsrManagement getUsrManagementMainTableConfig(@RequestBody String jsonData) {
		UsrTableConfigForUsrManagement usrTableConfigForUsrManagement = usrService.getUsrManagementMainTableConfig(jsonData);
		return usrTableConfigForUsrManagement;
	}
	
	@PostMapping("/usrManagement/batchApproval")
	@ResponseBody
	public int batchApproval(@RequestBody List<String> usrNoList) {
		return usrService.batchApproval(usrNoList);
	}
	
	@PostMapping("/usrManagement/batchWithdrawl")
	@ResponseBody
	public int batchWithdrawl(@RequestBody List<String> usrNoList) {
		return usrService.batchWithdrawl(usrNoList);
	}
	
	@PostMapping("/usrManagement/getUsrDetailModalConfig")
	@ResponseBody
	public UsrManagementModalConfigure getUsrDetailModalConfig(String usrNo) {
		return usrService.getUsrDetailModalConfig(usrNo);
	}
	
	//권한 수정
	@RequestMapping("/usrManagement/editUsrAuthrt")
	@ResponseBody
	public int editUsrAuthrt(String usrNo, String newUsrAuthrtNo) {
		return usrService.editUsrAuthrt(usrNo, newUsrAuthrtNo);
	}
	
	@RequestMapping("/usrManagement/editUsrDept")
	@ResponseBody
	public int editUsrDept(String usrNo, String newUsrDeptNo) {
		return usrService.editUsrDept(usrNo, newUsrDeptNo);
	}
	
	@RequestMapping("/usrManagement/editUsrIbps")
	@ResponseBody
	public int editUsrIbps(String usrNo, String newUsrIbpsNo) {
		return usrService.editUsrIbps(usrNo, newUsrIbpsNo);
	}
	
	@RequestMapping("/usrManagement/editUsrRole")
	@ResponseBody
	public int editUsrRole(String usrNo, String newUsrRoleNo) {
		return usrService.editUsrRole(usrNo, newUsrRoleNo);
	}
	
	//기업 관리 페이지
	@RequestMapping("/instManagement")
	public String instManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			return "/systemManagement/instManagement";
		} else {
			return "/systemManagement/instManagement";
		}
	}
	
	//기업 관리 페이지 메인 테이블 구성
	@RequestMapping("/instManagement/getInstManagementMainTableConfig")
	@ResponseBody
	public InstTableConfigForInstManagement getInstManagementMainTableConfig(@RequestBody String jsonData) {
		return usrService.getInstTableConfigForInstManagement(jsonData);
	}
	
	//기업 상세 정보 구성
	@RequestMapping("/instManagement/getDetailInstInfo")
	@ResponseBody
	public InstDetail getDetailInstInfo(String instNo) {
		return instService.getDetailInstInfo(instNo);
	}
	
	//기업 등록
	@RequestMapping("/instManagement/registInst")
	@ResponseBody
	public String registInst(Inst inst) {
		return instService.registInst(inst);
	}
	
	//기업 삭제
	@RequestMapping("/instManagement/deleteInst")
	@ResponseBody
	public String deleteInst(@RequestBody List<String> instNoList) {
		return instService.deleteInst(instNoList);
	}
	
	//기업명 저장
	@RequestMapping("/instManagement/saveNm")
	@ResponseBody
	public String saveNm(String instNo, String instNm) {
		return instService.updateInstNm(instNo, instNm);
	}
	
	//기업분류 저장
	@RequestMapping("/instManagement/saveClsf")
	@ResponseBody
	public String saveClsf(String instNo, String instClsf) {
		return instService.updateInstClsf(instNo, instClsf);
	}
	
	//직위 삭제
	@RequestMapping("/instManagement/deleteIbps")
	@ResponseBody
	public String deleteIbps(String ibpsNo) {
		return instService.deleteIbps(ibpsNo);
	}
	
	//직위 저장
	@RequestMapping("/instManagement/saveIbps")
	@ResponseBody
	public String saveIbps(@RequestBody String jsonData) {
		return instService.saveIbps(jsonData);
	}
	
	//역할 삭제
	@RequestMapping("/instManagement/deleteRole")
	@ResponseBody
	public String deleteRole(String roleNo) {
		return instService.deleteRole(roleNo);
	}
	
	//역할 저장
	@RequestMapping("/instManagement/saveRole")
	@ResponseBody
	public String saveRole(@RequestBody String jsonData) {
		return instService.saveRole(jsonData);
	}
	
	//부서 삭제
	@RequestMapping("/instManagement/deleteDept")
	@ResponseBody
	public String deleteDept(String deptNo) {
		return instService.deleteDept(deptNo);
	}
	
	//부서 저장
	@RequestMapping("/instManagement/saveDept")
	@ResponseBody
	public String saveDept(@RequestBody String jsonData) {
		return instService.saveDept(jsonData);
	}
	
	
	//시스템 관리 모달 메인 테이블 구성
	@RequestMapping("/instManagement/getSystemTableConfig")
	@ResponseBody
	public SysTableConfig getSystemTableConfig(@RequestBody String jsonData) {
		return instService.getSystemTableConfig(jsonData);
	}
	
	//시스템 정보 수정
	@RequestMapping("/instManagement/editSystem")
	@ResponseBody
	public String editSystem(Sys sys) {
		return instService.editSystem(sys);
	}
	
	//시스템 등록
	@RequestMapping("/instManagement/registSys")
	@ResponseBody
	public String registSys(Sys sys) {
		return instService.registSys(sys);
	}
	
	//시스템 삭제
	@RequestMapping("/instManagement/deleteSys")
	@ResponseBody
	public String deleteSys(@RequestBody List<String> sysNoList) {
		return instService.deleteSys(sysNoList);
	}
}
