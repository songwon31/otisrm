package com.finalteam5.otisrm.controller.srRqstManagement;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.service.SrRqstService;
import com.finalteam5.otisrm.service.UsrService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/srManagement")
@Slf4j
public class SrRqstManagementRestController {
	@Autowired
    private SrRqstService srRqstService;
	@Autowired
	private UsrService usrService;
	
	@Value("${file.upload.dir}")
	private String fileUploadDir;
	
	//페이지 번호를 가져오기 위함
	@GetMapping("getPageNoOfMng")
	  public Map<String, Object> getSRRequests(
			  @RequestParam(required = false, defaultValue = "1") int srRqstMngPageNo,
			  @RequestParam(name="status", required=false)String status) {
        Map<String, Object> response = new HashMap<>();
        
        Map<String, Object> map = new HashMap<>();
        //파라미터로 받은 값 전달
        map.put("status", status);
        int totalRows = srRqstService.totalSrRqst(map);
        Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, srRqstMngPageNo);
        map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
        map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());

        List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
        response.put("srRqstpagerOfMng", srRqstpagerOfMng);
        response.put("srRqsts", list);
        
        return response;
    }
	
	@PostMapping("getSRRequestsByPageNoOfMng")
	public List<SrRqst> getSRRequests(
			@RequestParam String srRqstMngPageNo, 
			@RequestParam(name="instNo", required=false)String instNo, 
			@RequestParam(name="deptNo", required=false)String deptNo, 
			@RequestParam(name="status", required=false)String status, 
			@RequestParam(name="usr", required=false)String usr, 
			@RequestParam(name="startDate", required=false)String startDate, 
			@RequestParam(name="endDate", required=false)String endDate, 
			@RequestParam(name="sysNo", required=false)String sysNo, 
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword, 
			HttpSession session) {
		//파라미터로 받은 값 전달
		Map<String, Object>map = new HashMap<>();
		map.put("status", status);
		map.put("instNo", instNo);
		log.info("파라미터 확인 instNo: " + map.get("instNo"));
		map.put("deptNo", deptNo);
		map.put("usr", usr);
        map.put("startDate", startDate);
        map.put("endDate", endDate);
        map.put("sysNo", sysNo);
        map.put("searchTarget", searchTarget);
        map.put("keyword", keyword);
      
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
		int totalRows = srRqstService.totalSrRqst(map);
		Pager srRqstpagerOfMng = new Pager(10, 5, totalRows, intSrRqstMngPageNo);
		
		map.put("startRowNo", srRqstpagerOfMng.getStartRowNo());
		map.put("endRowNo", srRqstpagerOfMng.getEndRowNo());
		
		//페이지 별 요청 목록 불러오기
		List<SrRqst> list = srRqstService.getSrRqstListByPager(map);
	
		return list;
	}
	
	//상태에 따른 sr요청 총 행수 불러오기
	@GetMapping("getCountSRRequestsByStatus")
	public int countSRRequestsByStatus(
			@RequestParam String srRqstMngPageNo, 
			@RequestParam(name="instNo", required=false)String instNo, 
			@RequestParam(name="deptNo", required=false)String deptNo, 
			@RequestParam(name="status", required=false)String status, 
			@RequestParam(name="usr", required=false)String usr, 
			@RequestParam(name="startDate", required=false)String startDate, 
			@RequestParam(name="endDate", required=false)String endDate, 
			@RequestParam(name="sysNo", required=false)String sysNo, 
			@RequestParam(name="searchTarget", required=false)String searchTarget, 
			@RequestParam(name="keyword", required=false)String keyword
			) {
		//파라미터로 전달받은 값 전달
		Map<String, Object> map = new HashMap<>();
		map.put("status", status);
		map.put("instNo", instNo);
		map.put("deptNo", deptNo);
		map.put("usr", usr);
		map.put("startDate", startDate);
		map.put("endDate", endDate);
		map.put("sysNo", sysNo);
		map.put("searchTarget", searchTarget);
		map.put("keyword", keyword);
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
	
	//등록 소속기관 불러오기
	@GetMapping("getInstListOfMng")
	public List<Inst> getInstListForMng(){
		List<Inst> list = usrService.getInstList();
		return list;
	}
	
	//등록 소속기관에 따른 개발 부서 불러오기
	@GetMapping("getDeptListOfMng")
	public List<Dept> getInstListForMng(String instNo){
		List<Dept> list = usrService.getDeptListByInstNo(instNo);
		return list;
	}
	
	//개발 부서에 따른 관련 시스템 불러오기
	@GetMapping("getSysByDeptNoOfMng")
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}
	
	//요청 상태 불러오기
	@GetMapping("getSrRqstSttsOfMng")
	public List<SrRqstStts> getSrRqstStts() {
		List<SrRqstStts> list = srRqstService.getSrRqstStts();
		return list;
	}
}
