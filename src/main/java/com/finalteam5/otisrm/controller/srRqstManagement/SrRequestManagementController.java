package com.finalteam5.otisrm.controller.srRqstManagement;
import java.io.OutputStream;
import java.net.URLEncoder;
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

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
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
			log.info(srRqstMngPageNo);
			//세션에 현재 sr요청 페이지번호 저장
			session.setAttribute("srRqstMngPageNo", String.valueOf(srRqstMngPageNo));
			
			//문자열을 정수로 변환
			Map<String, Object>map = new HashMap<>();
			int intSrRqstMngPageNo = Integer.parseInt(srRqstMngPageNo);
			//총 행수 구하기
			map.put("status", status);
			map.put("usr", usr.getUsrNo());
			int totalRows = srRqstService.totalSrRqst(map);
			
			Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, intSrRqstMngPageNo);
			map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
			map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());

			model.addAttribute("srRqstpagerOfMng", srRqstpagerOfMng);
			
			return "/srManagement/requestManagement/requestManagement";
		}else {
			return "redirect:/login";
		}
	}
	

	@GetMapping("/filedownloadOfMng")
	public void filedownload(String srRqstAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
}
