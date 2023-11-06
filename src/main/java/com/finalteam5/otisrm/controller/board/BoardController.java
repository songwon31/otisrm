package com.finalteam5.otisrm.controller.board;
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
import org.springframework.web.multipart.MultipartFile;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.ntc.NtcSubmit;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.BoardService;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/boardManagement")
public class BoardController {
	@Autowired
	private UsrService usrService;
	@Autowired
	private BoardService boardService;
	
	@GetMapping("/ntc")
	public String home(
			Authentication authentication, 
			String ntcPageNo, 
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword,
			Model model, 
			HttpSession session) {
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			model.addAttribute("usr", usr);
			
			// usrAuthrtNo가 SYS_MANAGER인 경우만 버튼을 표시
	        if ("SYS_MANAGER".equals(usr.getUsrAuthrtNo())) {
	            model.addAttribute("showButton", true);
	        } else {
	            model.addAttribute("showButton", false);
	        }
	        
	        //권한목록 담기(공개 대상 선택을 위함)
	        List<UsrAuthrt> list =  usrService.getUsrAuthrtList();
	        model.addAttribute("usrAuthrts", list);
	        
	       //SR요청 목록 페이징  
			if(ntcPageNo == null) {
				 //세션에 저장되어 있는지 확인
		         if(session.getAttribute("ntcPageNo") == null || session.getAttribute("ntcPageNo") == "") {
		        	 ntcPageNo = "1";  
		         }else {
		        	 ntcPageNo =  (String) session.getAttribute("ntcPageNo");
		         }
			}
			//세션에 현재 sr요청 페이지번호 저장
			session.setAttribute("ntcPageNo", String.valueOf(ntcPageNo));
			
			//문자열을 정수로 변환
			Map<String, Object>map = new HashMap<>();
			int intnctPageNo = Integer.parseInt(ntcPageNo);
			//총 행수 구하기
			map.put("searchTarget", searchTarget);
			map.put("keyword", keyword);
			int totalRows = boardService.totalNumOfNct(map);
			
			Pager ntcPager = new Pager(12, 5, totalRows, intnctPageNo);
			map.put("startRowNo", ntcPager.getStartRowNo());
			map.put("endRowNo", ntcPager.getEndRowNo());

			model.addAttribute("ntcPager", ntcPager);
			
			return "boardManagement/ntc/ntc";
		} else {
			return "redirect:/login";
		}
	}
	
	@GetMapping("/filedownloadOfNtc")
	public void filedownload(String ntcAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
	    // ntcAtchNo에 해당하는 ntcAtch 객체를 가져옴
	    NtcAtch ntcAtch = boardService.getNtcAtchByNtcAtchNo(ntcAtchNo);
	    
	    String fileOriginalName = ntcAtch.getNtcAtchNm();
	    
	    //응답 헤드에 Content-Type 추가
	    String mimeType = ntcAtch.getNtcAtchMimeType();
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
	   os.write(ntcAtch.getNtcAtchData());
	   os.flush();
	   os.close();    
	}
	
	//공지사항 등록하기
	@PostMapping("writeNtc")
	public String writeNtc(NtcSubmit ntcSubmit) throws Exception{
		boardService.writeNtc(ntcSubmit);
	    
		//첨부파일이 있다면 첨부파일 업로드
		MultipartFile[] files = ntcSubmit.getFile();
		
		for(MultipartFile file : files) {
			NtcAtch ntcAtch = new NtcAtch();
			if(!file.isEmpty()) {
				//첨부파일을 업로드한 sr요청 번호 
				String ntcPk = boardService.getAddNtcPk();
				ntcAtch.setNtcNo(ntcPk);
	    		//브라우저에서 선택한 파일 이름 설정
				ntcAtch.setNtcAtchNm(file.getOriginalFilename());
	    		//파일의 형식(MIME타입)을 설정
				ntcAtch.setNtcAtchMimeType(file.getContentType());
	    		//올린 파일 설정
				ntcAtch.setNtcAtchData(file.getBytes());
	    		//파일 크기 설정
				ntcAtch.setNtcAtchSize(file.getSize());
	    		
	    		//업로드
	    		boardService.uploadNtcAtch(ntcAtch);
			}
	    }
	    return "redirect:/boardManagement/ntc";
	}
	
}