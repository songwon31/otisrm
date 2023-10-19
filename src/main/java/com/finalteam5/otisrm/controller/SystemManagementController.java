package com.finalteam5.otisrm.controller;
import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;
import com.finalteam5.otisrm.service.usr.UsrService;

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
	
	@RequestMapping("/usrManagement")
	public String usrManagement(Model model, HttpSession session) {
		UsrManagementPageConfigure usrManagementPageConfigure = usrService.getUsrManagementPageConfigureData();
		model.addAttribute("usrManagementPageConfigure", usrManagementPageConfigure);
		
		return "/systemManagement/usrManagement/usrManagement";
	}
	
}
