package com.finalteam5.otisrm.controller.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.inq.inq.Inq;
import com.finalteam5.otisrm.dto.ntc.Ntc;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.BoardService;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/")
@Slf4j
public class CustomerRestController {
	@Autowired
    private SrRqstService srRqstService;
	@Autowired
	private BoardService boardService;
	
	@Value("${file.upload.dir}")
	private String fileUploadDir;
	
	//페이지 번호를 가져오기 위함
	@GetMapping("getPageNo")
	  public Map<String, Object> getSRRequests(
			  Authentication authentication, 
			  @RequestParam(required = false, defaultValue = "1") int srRqstPageNo,
			  @RequestParam(name="status", required=false)String status,
			  HttpSession session) {
		
		Map<String, Object> response = new HashMap<>();
        
        Map<String, Object> map = new HashMap<>();
        if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			map.put("usr", usr.getUsrNo());
        }
        map.put("status", status);
        
        //총 행수 구하기
        int totalRows = srRqstService.totalSrRqst(map);
        Pager srRqstpager = new Pager(5, 5, totalRows, srRqstPageNo);
        map.put("startRowNo", srRqstpager.getStartRowNo());
        map.put("endRowNo", srRqstpager.getEndRowNo());

        List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
        response.put("srRqstpager", srRqstpager);
        response.put("srRqsts", list);
        
        return response;
    }
	
	@GetMapping("getSRRequestsByPageNo")
	public List<SrRqst> getSRRequests(
			Authentication authentication, 
			@RequestParam String srRqstPageNo, 
			@RequestParam(name="status", required=false)String status, 
			HttpSession session) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
		map.put("status", status);
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			map.put("usr", usr.getUsrNo());
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
		int totalRows = srRqstService.totalSrRqst(map);
		Pager srRqstpager = new Pager(5, 5, totalRows, intSrRqstPageNo);
		
		map.put("startRowNo", srRqstpager.getStartRowNo());
		map.put("endRowNo", srRqstpager.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
		return list;
	}
	
	//상태에 따른 sr요청 총 행수 불러오기
	@GetMapping("getCountSRRequestsByStatus")
	public int countSRRequestsByStatus(
			Authentication authentication,
			@RequestParam(name="status") String status) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
		map.put("status", status);
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			map.put("usr", usr.getUsrNo());
		} 
		// status에 따른 총 행 수를 가져오는 쿼리 실행
	    int totalRows = srRqstService.totalSrRqst(map);
	    
	    return totalRows;
	}
	
	//요청에 해당하는 상세정보 불러오기
	@GetMapping("getSrRqstBySrRqstNo")
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo, Model model, HttpSession session) {
		SrRqst srRqst = srRqstService.getSrRqstBySrRqstNo(srRqstNo);
		List<SrRqstAtch> list = srRqstService.getSrRqstAtchBySrRqstNo(srRqstNo);
		srRqst.setSrRqstAtchList(list);
		model.addAttribute("srRqstNo", srRqstNo);
		return srRqst;
	}
	
	//고객사 홈 페이지에서 요청등록 모달에 소속부서에 해당하는 관련시스템 목록불러오기
	@GetMapping("getSysByDeptNo")
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}
	
	//공지사항 목록 불러오기
	@PostMapping("getNtcByPageNoForCustomerHome")
	public List<Ntc> getSRRequests(
			@RequestParam String ntcPageNo,
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword, 
			HttpSession session) {
		//파라미터로 받은 값 전달
		Map<String, Object>map = new HashMap<>();
        map.put("searchTarget", searchTarget);
        map.put("keyword", keyword);
      
		///SR요청 목록 페이징  
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
		int intNtcPageNo = Integer.parseInt(ntcPageNo);
		int totalRows = boardService.totalNumOfNct(map);
		Pager ntcPager = new Pager(5, 5, totalRows, intNtcPageNo);
		
		map.put("startRowNo", ntcPager.getStartRowNo());
		map.put("endRowNo", ntcPager.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<Ntc> list = boardService.getNtcListByPage(map);
	
		return list;
	}
	
	//공지에 해당하는 상세정보 불러오기
	@GetMapping("getNtcByNtcNoForCustomerHome")
	public Ntc getNtcByNtcNo(String ntcNo, Model model, HttpSession session) {
		
		Ntc ntc = boardService.getNtcByNtcNo(ntcNo);
		List<NtcAtch> list = boardService.getNtcAtchByNtcNo(ntcNo);
		ntc.setNtcAtchList(list);
		int updateNtcInqCnt = ntc.getNtcInqCnt() + 1;
		ntc.setNtcInqCnt(updateNtcInqCnt);
		
		//조회수 업데이트
		boardService.addNtcInqCnt(ntc);
		model.addAttribute("ntcOfModiFy", ntc.getNtcNo());
		return ntc;
	}
	
	//문의게시판 목록 불러오기: 페이지에 해당하는 문의 목록 불러오기
	@PostMapping("getInqByPageNoForCustomer")
	public List<Inq> getInqByPageNo(
			@RequestParam String inqPageNo,
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword, 
			HttpSession session) {
		//파라미터로 받은 값 전달
		Map<String, Object>map = new HashMap<>();
        map.put("searchTarget", searchTarget);
        map.put("keyword", keyword);
      
		///문의 목록 페이징  
        if(inqPageNo == null) {
			 //세션에 저장되어 있는지 확인
	         if(session.getAttribute("inqPageNo") == null || session.getAttribute("inqPageNo") == "") {
	        	 inqPageNo = "1";  
	         }else {
	        	 inqPageNo =  (String) session.getAttribute("inqPageNo");
	         }
		}
		//세션에 현재 sr요청 페이지번호 저장
		session.setAttribute("inqPageNo", String.valueOf(inqPageNo));
		
		//문자열을 정수로 변환
		int intInqPageNo = Integer.parseInt(inqPageNo);
		int totalRows = boardService.totalNumOfNct(map);
		Pager inqPager = new Pager(5, 5, totalRows, intInqPageNo);
		
		map.put("startRowNo", inqPager.getStartRowNo());
		map.put("endRowNo", inqPager.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<Inq> list = boardService.getInqListByPage(map);
	
		return list;
	}	
	
}
