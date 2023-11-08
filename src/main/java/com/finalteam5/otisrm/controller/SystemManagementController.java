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

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrManagementModalConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearchConfigure;
import com.finalteam5.otisrm.dto.usr.UsrTableConfigForUsrManagement;
import com.finalteam5.otisrm.security.UsrDetails;
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
	
	//기업 관리 페이지
	@RequestMapping("/instManagement")
	public String instManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			return "/systemManagement/instManagement";
		} else {
			return "/systemManagement/usrManagement";
		}
	}
}
