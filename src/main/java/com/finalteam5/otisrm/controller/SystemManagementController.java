package com.finalteam5.otisrm.controller;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearchForm;
import com.finalteam5.otisrm.service.usr.UsrService;
import com.finalteam5.otisrm.validator.UsrManagementSearchValidator;

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
	
	@InitBinder("usrManagementSearchForm")
	public void UsrManagementSearchFormValidator(WebDataBinder binder) {
		binder.setValidator(new UsrManagementSearchValidator());
	}
	
	@RequestMapping("/usrManagement")
	public String usrManagement(Model model, HttpSession session, @Valid UsrManagementSearchForm usrManagementSearchForm, Errors errors) {
		UsrManagementPageConfigure usrManagementPageConfigure = usrService.getUsrManagementPageConfigureData();
		model.addAttribute("usrManagementPageConfigure", usrManagementPageConfigure);
		
		return "/systemManagement/usrManagement/usrManagement";
	}
	
	@RequestMapping("/usrManagement2")
	public String usrManagement2(Model model, HttpSession session, @Valid UsrManagementSearchForm usrManagementSearchForm, Errors errors) {
		UsrManagementPageConfigure usrManagementPageConfigure = usrService.getUsrManagementPageConfigureData();
		model.addAttribute("usrManagementPageConfigure", usrManagementPageConfigure);
		
		return "/systemManagement/usrManagement/usrManagement2";
	}
	
}
