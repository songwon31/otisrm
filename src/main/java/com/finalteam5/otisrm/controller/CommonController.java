package com.finalteam5.otisrm.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrEditConfigure;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.UsrService;
import com.finalteam5.otisrm.service.UsrService.JoinResult;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class CommonController {

	@Autowired
	private UsrService usrService;
	
	@RequestMapping("/")
	public String home(Authentication authentication) {
	    if (authentication != null && authentication.isAuthenticated()) {
	    	//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
            if (usr.getUsrAuthrtNo().equals("CUSTOMER")) {
                return "redirect:/customerHome";
            } else if (usr.getUsrAuthrtNo().equals("REVIEWER")) {
                return "redirect:/reviewerHome";
            } else if (usr.getUsrAuthrtNo().equals("DEVELOPER")) {
                return "redirect:/developerHome";
            } else if (usr.getUsrAuthrtNo().equals("PIC")) {
                return "redirect:/picHome";
            }else {	            	
            	// 여기까지 도달하면 어떤 권한에도 해당하지 않는 경우
            	return "redirect:/systemManagement/usrManagement";
            }
	    } else {
	        return "redirect:/login";
	    }
	}
	
	//로그인 폼 불러오기
	@GetMapping("/login")
	public String login(String msg, Model model) {
		model.addAttribute("msg", msg);
		return "common/login";
	}
	
	//아이디 찾기 모달 폼
	@PostMapping("login/getMyid")
	@ResponseBody
	public String getMyId(@RequestParam(name="usrNm") String usrNm, @RequestParam(name="usrEml") String usrEml) {
		Usr usr = new Usr();
		usr.setUsrNm(usrNm);
		usr.setUsrEml(usrEml);
		String id = usrService.getMyId(usr);
		return id;
	}
	
	//비밀번호 찾기 모달 폼 - 계정 유효성
	@PostMapping("login/getUsrNoforChgPswd")
	@ResponseBody
	public String getUsrNoforChgPswd(@RequestParam(name="usrId") String usrId, @RequestParam(name="usrEml") String usrEml) {
		Usr usr = new Usr();
		usr.setUsrId(usrId);
		usr.setUsrEml(usrEml);
		String usrNo = usrService.getUsrNoforChgPswd(usr);
		return usrNo;
	}
	
	//비밀번호 찾기
	@RequestMapping("login/editUsrPasswordForFindId")
	@ResponseBody
	public int editUsrPassword(@RequestParam(name="usrNo") String usrNo, @RequestParam(name="usrPswd") String usrPswd) {
		return usrService.editUsrPassword(usrNo, usrPswd);
	}
	
		
	//로그인 요청
	/*
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
				return "/systemManagement/usrManagement/usrManagement";
			}else {
				session.removeAttribute("redirectUrl");
				return "redirect:" + redirectUrl;				
			}
		}
		return "common/login";
	}
	*/
	//로그아웃 요청
	/*@GetMapping("/logout")
	public String logout(HttpSession session) {
		session.invalidate();
	    return "redirect:/";
	}*/
	
	//회원가입 폼
	@GetMapping("/join/join")
	public String join (Model model) {
		//소속기관 목록 불러오기
	    List<Inst> instList = usrService.getInstList();
	    log.info("instList: " + instList);
	    model.addAttribute("instOptions", instList);
	    
	    //가입 권한 목록 불러오기
	    List<UsrAuthrt> usrAuthrtList = usrService.getUsrAuthrtList();
	    log.info(usrAuthrtList.toString());
	    model.addAttribute("usrAuthrtOptions", usrAuthrtList);
	    
	    return "common/join/join";
	}
	
	@PostMapping("/join/join")
	public String submitJoin(Usr usr, Model model) {
	    JoinResult result = usrService.join(usr);
	    if (result == JoinResult.FAIL_DUPLICATED_UID) {
	        String error1 = "이미 가입된 아이디입니다.";
	        model.addAttribute("error1", error1);
	        return "join/joinForm";
	    } else {
	        return "redirect:/login";
	    }
	}
	//회원가입 상세내용 불러오기
	@RequestMapping("join/joinDetail")
	public String joinDetail() {
		return "common/join/joinDetail";
	}
	//소속기관에 해당하는 개발부서 목록 불러오기
	@GetMapping("/join/getDepartments")
    @ResponseBody
    public List<Dept> getDepartments(@RequestParam("instNo") String instNo) {
        // instNo를 기반으로 해당 소속기관에 속한 부서 데이터를 가져오기
        List<Dept> depts = usrService.getDeptListByInstNo(instNo);
      
        return depts;
    }
	//소속기관에 해당하는 직위 목록 불러오기
	@GetMapping("/join/getPositions")
	@ResponseBody
	public List<Ibps> getPositions(@RequestParam("instNo") String instNo) {
		// instNo를 기반으로 해당 소속기관에 속한 부서 데이터를 가져오기
		List<Ibps> ibps = usrService.getIbpsListByInstNo(instNo);
		
		return ibps;
	}
	//소속기관에 해당하는 역할 목록 불러오기
	@GetMapping("/join/getRoles")
	@ResponseBody
	public List<Role> getRoles(@RequestParam("instNo") String instNo) {
		// instNo를 기반으로 해당 소속기관에 속한 부서 데이터를 가져오기
		List<Role> roles = usrService.getRoleListByInstNo(instNo);
		
		return roles;
	}
	//아이디 중복검사
	@GetMapping("/join/getNumOfOverlapUsrId")
	@ResponseBody
	public int getNumOfOverlapUsrId(@RequestParam("usrId") String usrId) {
		int numOfOverlapUsrId = usrService.getNumOfOverlapUsrId(usrId);
		return numOfOverlapUsrId;
	}
	
	@RequestMapping("/alerts")
	public String alerts() {
		return "header/alerts";
	}
	

	//개인정보수정 모달
	@RequestMapping("/checkPassword")
	@ResponseBody
	public boolean checkPassword(Authentication authentication, String password) {
		//로그인한 회원의 정보
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();

		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		if(passwordEncoder.matches(password, usr.getUsrPswd())) {
			return true;
		}else {
			return false;
		}
	}
	
	@RequestMapping("/getEditPersonalInfoConfig")
	@ResponseBody
	public UsrEditConfigure getEditPersonalInfoConfig(Authentication authentication) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.getUsrEditConfigure(usr.getUsrNo());
	}
	
	//아이디 수정
	@RequestMapping("/editUsrId")
	@ResponseBody
	public int editUsrId(Authentication authentication, String newUsrId) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrId(usr.getUsrNo(), newUsrId);
	}
	
	//비밀번호 수정
	@RequestMapping("/editUsrPassword")
	@ResponseBody
	public int editUsrPassword(Authentication authentication, String newUsrPassword) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrPassword(usr.getUsrNo(), newUsrPassword);
	}
	
	//비밀번호 수정
	@RequestMapping("/editUsrNm")
	@ResponseBody
	public int editUsrNm(Authentication authentication, String newUsrNm) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrNm(usr.getUsrNo(), newUsrNm);
	}
	
	//이메일 수정
	@RequestMapping("/editUsrEml")
	@ResponseBody
	public int editUsrEml(Authentication authentication, String newUsrEml) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrEml(usr.getUsrNo(), newUsrEml);
	}
	
	//전화번호 수정
	@RequestMapping("/editUsrTelno")
	@ResponseBody
	public int editUsrTelno(Authentication authentication, String newUsrTelno) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrTelno(usr.getUsrNo(), newUsrTelno);
	}
	
	//부서 수정
	@RequestMapping("/editUsrDept")
	@ResponseBody
	public int editUsrDept(Authentication authentication, String newDeptNo) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrDept(usr.getUsrNo(), newDeptNo);
	}
	
	//직책 수정
	@RequestMapping("/editUsrRole")
	@ResponseBody
	public int editUsrRole(Authentication authentication, String newRoleNo) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrRole(usr.getUsrNo(), newRoleNo);
	}
	
	//직위 수정
	@RequestMapping("/editUsrIbps")
	@ResponseBody
	public int editUsrIbps(Authentication authentication, String newIbpsNo) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.editUsrIbps(usr.getUsrNo(), newIbpsNo);
	}
	
	//회원 탈퇴
	@RequestMapping("/usrWhdwl")
	@ResponseBody
	public int usrWhdwl(Authentication authentication) {
		UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
		Usr usr = usrDetails.getUsr();
		return usrService.usrWhdwl(usr.getUsrNo());
	}
}