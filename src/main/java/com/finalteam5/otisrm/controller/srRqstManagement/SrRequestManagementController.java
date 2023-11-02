package com.finalteam5.otisrm.controller.srRqstManagement;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/srManagement")
public class SrRequestManagementController {
	@Autowired
	private SrRqstService srRqstService;
	
	@RequestMapping("/requestManagement")
	public String requestManagement(
			Authentication authentication, 
			String srRqstMngPageNo, 
			@RequestParam(name="status", required=false)String status,
			Model model,
			HttpSession session) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			
			//SR요청 목록 페이징  
			if(srRqstMngPageNo == null) {
				 //세션에 저장되어 있는지 확인
		         if(session.getAttribute("srRqstMngPageNo") == null || session.getAttribute("srRqstMngPageNo") == "") {
		        	 srRqstMngPageNo = "1";  
		         }else {
		        	 srRqstMngPageNo =  (String) session.getAttribute("srRqstMngPageNo");
		         }
			}
			//세션에 현재 sr요청 페이지번호 저장
			session.setAttribute("srRqstMngPageNo", String.valueOf(srRqstMngPageNo));
			
			//문자열을 정수로 변환
			int intSrRqstMngPageNo = Integer.parseInt(srRqstMngPageNo);
			int totalRows = srRqstService.totalSrRqst(status);
			Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, intSrRqstMngPageNo);
			Map<String, Object>map = new HashMap<>();
			map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
			map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());

			model.addAttribute("srRqstpagerOfMng", srRqstpagerOfMng);
			
			return "/srManagement/requestManagement/requestManagement";
		}else {
			return "redirect:/login";
		}
	}
}
