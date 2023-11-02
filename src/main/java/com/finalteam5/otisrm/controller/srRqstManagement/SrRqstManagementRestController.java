package com.finalteam5.otisrm.controller.srRqstManagement;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/srManagement")
@Slf4j
public class SrRqstManagementRestController {
	@Autowired
    private SrRqstService srRqstService;
	
	@Value("${file.upload.dir}")
	private String fileUploadDir;
	
	//페이지 번호를 가져오기 위함
	@GetMapping("getPageNoOfMng")
	  public Map<String, Object> getSRRequests(
			  @RequestParam(required = false, defaultValue = "1") int srRqstMngPageNo,
			  @RequestParam(name="status", required=false)String status) {
        Map<String, Object> response = new HashMap<>();
        
        int totalRows = srRqstService.totalSrRqst(status);
        Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, srRqstMngPageNo);
        Map<String, Object> map = new HashMap<>();
        map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
        map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());

        List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
        response.put("srRqstpagerOfMng", srRqstpagerOfMng);
        response.put("srRqsts", list);
        
        return response;
    }
	
	@GetMapping("getSRRequestsByPageNoOfMng")
	public List<SrRqst> getSRRequests(
			@RequestParam String srRqstMngPageNo, 
			@RequestParam(name="status", required=false)String status, 
			HttpSession session) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
		map.put("status", status);
		//SR요청 목록 페이징  
		if(srRqstMngPageNo == null) {
			 //세션에 저장되어 있는지 확인
	         if(session.getAttribute("srRqstMngPageNo") == null || session.getAttribute("srRqstMngPageNo") == "") {
	        	 srRqstMngPageNo = "1";  
	         }else {
	        	 srRqstMngPageNo =  (String) session.getAttribute("srRqstPageMngNo");
	         }
		}
		
		//세션에 현재 sr요청 페이지번호 저장
		session.setAttribute("srRqstMngPageNo", String.valueOf(srRqstMngPageNo));
		
		//문자열을 정수로 변환
		int intSrRqstMngPageNo = Integer.parseInt(srRqstMngPageNo);
		int totalRows = srRqstService.totalSrRqst(status);
		Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, intSrRqstMngPageNo);
		
		map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
		map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
		return list;
	}
	
	//상태에 따른 sr요청 총 행수 불러오기
	@GetMapping("getCountSRRequestsByStatus")
	public int countSRRequestsByStatus(@RequestParam(name="status") String status) {
	    // status에 따른 총 행 수를 가져오는 쿼리 실행
	    int totalRows = srRqstService.totalSrRqst(status);
	    
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
}
