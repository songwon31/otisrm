package com.finalteam5.otisrm.controller.pic;

import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.SrRqstService;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;
@Slf4j
@Controller
@RequestMapping("/")
public class PicHomeController {
	
	@Autowired
	private UsrService usrService;
	@Autowired
	private SrRqstService srRqstService;
	
	@RequestMapping("picHome")
	public String developManagement(Authentication authentication, Model model) {
		if (authentication != null && authentication.isAuthenticated()) {
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			//로그인 한 회원의 부서번호에 해당하는 부서이름 불러오기
			String deptNm = usrService.getDeptNmByDeptNo(usr.getDeptNo());
			usr.setDeptNm(deptNm);
			model.addAttribute("usr", usr);
			
			//담당자 sr개발부서 폼: 이관기관 부서 목록 불러오기
			List<Inst> instList = srRqstService.getInstByOutsrcY();
			model.addAttribute("instByOutsrcYList", instList);
			
			//담당자 sr개발부서 폼: sr요청구분 불러오기
			List<SrDmndClsf> srDmndClsfList = srRqstService.getSrDmndClsf();
			model.addAttribute("srDmndClsfList", srDmndClsfList);
			
			//담당자 폼 sr개발정보: sr업무구분 가져오기
			List<SrTaskClsf> srTaskClsfList = srRqstService.getSrTaskClsf();
			model.addAttribute("srTaskClsfList", srTaskClsfList);
			
			return "/home/picHome";
		} else {
			return "/home/login";
		}
	}
	
	//담당자 홈 페이지에서 요청등록하기
	@PostMapping("writeSrRqstForPicHome")
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
				String srRqstPk = srRqstService.getAddSrRqstPk();
	    		srRqstAtch.setSrRqstNo(srRqstPk);
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
	
	    return "redirect:/customerHome";
	}
	
	@GetMapping("filedownloadForPicHome")
	public void filedownloadSrRqstAtch(String srRqstAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
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
	
	@GetMapping("filedownloadSrAtchForPicHome")
	public void filedownloadSrAtch(String srAtchNo, HttpServletRequest request, HttpServletResponse response) throws Exception {
		// 요청된 SrRqstAtchNo에 해당하는 SrRqstAtch 객체를 가져옴
		SrAtch srAtch = srRqstService.getSrAtchBySrAtchNo(srAtchNo);
		
		String fileOriginalName = srAtch.getSrAtchNm();
		
		//응답 헤드에 Content-Type 추가
		String mimeType = srAtch.getSrAtchMimeType();
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
		os.write(srAtch.getSrAtchData());
		os.flush();
		os.close();    
	}
	
	//담당자 홈 페이지에서 요청 수정하기
	@PostMapping("modifySrRqstForPicHome")
	public String modifySrRqst(SrRqstSubmit srRqstSubmit) {
	    srRqstService.modifySrRqst(srRqstSubmit);
	    return "redirect:/customerHome";
	}
	
	//담당자 홈 페이지에서 요청 삭제하기
	@PostMapping("removeSrRqstForPicHome")
	public String removeSrRqst(String srRqstNo) {
		srRqstService.removeSrRqst(srRqstNo);
		return "redirect:/customerHome";
	}
	
	
}
