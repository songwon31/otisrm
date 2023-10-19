package com.finalteam5.otisrm.controller;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.service.usr.UsrService;
import com.finalteam5.otisrm.service.usr.UsrService.LoginResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CommonController {

	@Autowired
	private UsrService usrService;

	@RequestMapping("/")
	public String home() {
		return "redirect:/login";
	}
	
	//로그인 폼 불러오기
	@GetMapping("/login")
	public String login(String msg, Model model) {
		model.addAttribute("msg", msg);
		return "common/login";
	}
		
	//로그인 요청
	@PostMapping("/login")
	public String login(Login usr, Model model, HttpSession session, HttpServletRequest request, HttpServletResponse response) {
		String redirectUrl = (String) session.getAttribute("redirectUrl");
		LoginResult result = usrService.login(usr);
		log.info(result+"로그인 상태");
		if(result == LoginResult.FAIL_UID) {
			String error1 = "가입된 ID가 없습니다.";
			model.addAttribute("error1", error1);
		} else if(result == LoginResult.FAIL_ENABLED) {
			String error2 = "ID가 비활성화 되어 있습니다";
			model.addAttribute("error2", error2);
		} else if(result == LoginResult.FAIL_PASSWORD) {
			String error3 = "비밀번호가 틀립니다";
			model.addAttribute("error3", error3);
		} else {
			log.info("로그인에 성공하였습니다");
			Login savedUsr = usrService.getUsr(usr.getUsrId());
			session.setAttribute("loginIng", savedUsr);
			
			Login login = (Login) session.getAttribute("loginIng");
			model.addAttribute("loginIng", login);
			
			if(session.getAttribute("redirectUrl") == null) {
				session.removeAttribute("redirectUrl");
				return "redirect:/";
			}else {
				session.removeAttribute("redirectUrl");
				return "redirect:" + redirectUrl;				
			}
		}
		return "/systemManagement/userManagement/userManagement";
	}
	
	//로그아웃 요청
	@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
	    return "redirect:/";
	}
	
	@GetMapping("/join/join")
	public String join(Model model) {
		//소속기관 목록 불러오기
	    List<Inst> instList = usrService.getInstList();
	    model.addAttribute("instOptions", instList);
	    
	    //가입 권한 목록 불러오기
	    List<UsrAuthrt> usetAuthrtList = usrService.getUserAuthrtList();
	    log.info(usetAuthrtList.toString());
	    model.addAttribute("usetAuthrtOptions", usetAuthrtList);
		
	    return "common/join/join";
	}

	@RequestMapping("join/joinDetail")
	public String joinDetail() {
		return "common/join/joinDetail";
	}
	
	@RequestMapping("/alerts")
	public String alerts() {
		return "header/alerts";
	}
	
	
}
