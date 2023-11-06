package com.finalteam5.otisrm.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.ntc.Ntc;
import com.finalteam5.otisrm.dto.ntc.NtcAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/boardManagement")
@Slf4j
public class BoardRestController {
	@Autowired
	private BoardService boardService;
	
	@PostMapping("getNtcByPageNo")
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
		Pager ntcPager = new Pager(12, 5, totalRows, intNtcPageNo);
		
		map.put("startRowNo", ntcPager.getStartRowNo());
		map.put("endRowNo", ntcPager.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<Ntc> list = boardService.getNtcListByPage(map);
	
		return list;
	}
	
	//상태에 따른 sr요청 총 행수 불러오기
	@GetMapping("getCountNtcBySearch")
	public int countSRRequestsByStatus(
			@RequestParam String ntcPageNo, 
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword
			) {
		//파라미터로 전달받은 값 전달
		Map<String, Object> map = new HashMap<>();
		map.put("searchTarget", searchTarget);
		map.put("keyword", keyword);
		// status에 따른 총 행 수를 가져오는 쿼리 실행
	    int totalRows = boardService.totalNumOfNct(map);
	    
	    return totalRows;
	}
	
	//요청에 해당하는 상세정보 불러오기
	@GetMapping("getNtcByNtcNo")
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
}
