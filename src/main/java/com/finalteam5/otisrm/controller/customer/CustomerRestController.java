package com.finalteam5.otisrm.controller.customer;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/")
@Slf4j
public class CustomerRestController {
	@Autowired
    private SrRqstService srRqstService;
	
	//페이지 번호를 가져오기 위함
	@GetMapping("getPageNo")
	  public Map<String, Object> getSRRequests(@RequestParam(required = false, defaultValue = "1") int srRqstPageNo) {
        Map<String, Object> response = new HashMap<>();
        
        int totalRows = srRqstService.totalSrRqst();
        Pager srRqstpager = new Pager(5, 5, totalRows, srRqstPageNo);
        Map<String, Object> map = new HashMap<>();
        map.put("startRowNo", srRqstpager.getStartRowNo());
        map.put("endRowNo", srRqstpager.getEndRowNo());

        List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
        response.put("srRqstpager", srRqstpager);
        response.put("srRqsts", list);
        
        return response;
    }
	
	@GetMapping("getSRRequestsByPageNo")
	public List<SrRqst> getSRRequests(
			@RequestParam String srRqstPageNo, 
			@RequestParam(name="status", required=false)String status, 
			HttpSession session) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
		map.put("status", status);
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
		
		map.put("startRowNo", srRqstpager.getStartRowNo());
		map.put("endRowNo", srRqstpager.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
		return list;
	}
	
	//요청에 해당하는 상세정보 불러오기
	@GetMapping("getSrRqstBySrRqstNo")
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo) {
		SrRqst srRqst = srRqstService.getSrRqstBySrRqstNo(srRqstNo);
		
		return srRqst;
	}
}
