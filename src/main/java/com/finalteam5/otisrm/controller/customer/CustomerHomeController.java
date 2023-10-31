package com.finalteam5.otisrm.controller.customer;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/")
public class CustomerHomeController {
	@Autowired
	private SrRqstService srRqstService;
	
	@GetMapping("home")
	public String customerHome(Authentication authentication, String srRqstPageNo, Model model, HttpSession session) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			session.setAttribute("loginUsrNo", usr.getUsrNo());
		} 
		//SR요청 목록 페이징  
		if(srRqstPageNo == null) {
			 //세션에 저장되어 있는지 확인
	         if(session.getAttribute("srRqstPageNo") == null || session.getAttribute("srRqstPageNo") == "") {
	        	 srRqstPageNo = "1";  
	         }else {
	        	 srRqstPageNo =  (String) session.getAttribute("srRqstPageNo");
	         }
		}
		//세션에 현재 sr요청 페이지번호 저장
		session.setAttribute("srRqstPageNo", String.valueOf(srRqstPageNo));
		
		//문자열을 정수로 변환
		int intSrRqstPageNo = Integer.parseInt(srRqstPageNo);
		int totalRows = srRqstService.totalSrRqst();
		Pager srRqstpager = new Pager(5, 5, totalRows, intSrRqstPageNo);
		Map<String, Object>map = new HashMap<>();
		map.put("startRowNo", srRqstpager.getStartRowNo());
		map.put("endRowNo", srRqstpager.getEndRowNo());

		model.addAttribute("srRqstpager", srRqstpager);
		
		return "/home/customerHome";
	}
	
	//고객사 홈 페이지에서 요청등록 모달에 소속부서에 해당하는 관련시스템 목록불러오기
	@GetMapping("getSysByDeptNo")
	@ResponseBody
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}

	//고객사 홈 페이지에서 요청등록하기
	@PostMapping("writeSrRqst")
	public String writeSrRqst(SrRqstSubmit srRqstSubmit) throws Exception{
		log.info("등록 실행: " + srRqstSubmit);
		srRqstService.writeSrRqst(srRqstSubmit);
		log.info("등록 실행2");
	    
		//첨부파일이 있다면 첨부파일 업로드
		MultipartFile[] files = srRqstSubmit.getFile();
		
		for(MultipartFile file : files) {
			SrRqstAtch srRqstAtch = new SrRqstAtch();
			if(!file.isEmpty()) {
				//첨부파일을 업로드한 sr요청 번호 
	    		srRqstAtch.setSrRqstNo(srRqstSubmit.getSrRqstNo());
	    		//브라우저에서 선택한 파일 이름 설정
	    		srRqstAtch.setSrRqstAtchNm(file.getOriginalFilename());
	    		//파일의 형식(MIME타입)을 설정
	    		srRqstAtch.setSrRqstAtchMimeType(file.getContentType());
	    		//올린 파일 설정
	    		srRqstAtch.setSrRqstAtchData(file.getBytes());
	    		//파일 크기 설정
	    		srRqstAtch.setSrRqstAtchSize(file.getSize());
	    		
	    		//업로드
	    		srRqstService.uploadSrRqstAtch(srRqstAtch);
			}
	    }
	
	    return "redirect:/home";
	}
	
	
	//고객사 홈 페이지에서 요청 수정하기
	@PostMapping("modifySrRqst")
	public String modifySrRqst(SrRqstSubmit srRqstSubmit) {
	    srRqstService.modifySrRqst(srRqstSubmit);
	   
	    return "redirect:/home";
	}
	
}