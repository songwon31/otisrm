package com.finalteam5.otisrm.controller.pic;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.security.UsrDetails;
import com.finalteam5.otisrm.service.BoardService;
import com.finalteam5.otisrm.service.SrRqstService;

import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/")
@Slf4j
public class PicHomeRestController {
	@Autowired
    private SrRqstService srRqstService;
	
	@Value("${file.upload.dir}")
	private String fileUploadDir;
	
	//페이지 번호를 가져오기 위함
	@GetMapping("getPageNoForPicHome")
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
			//map.put("usr", usr.getUsrNo());
			map.put("pic", usr.getUsrNo());
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
	
	@GetMapping("getSRRequestsByPageNoForPicHome")
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
			//map.put("usr", usr.getUsrNo());
			map.put("pic", usr.getUsrNo());
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
	
	//처리항목 페이지별 목록 불러오기
	@GetMapping("getToDoItemsByPageNoForPicHome")
	public List<SrRqst> getToDoItems(
			Authentication authentication, 
			@RequestParam String srRqstPageNo, 
			@RequestParam(name="item", required=false)String item, 
			HttpSession session) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
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
		
		//처리항목목록1: 승인 요청처리할 항목
		if(item.equals("itemOfAprvRqst")) {
			List<SrRqst> list = srRqstService.getToDoItemOfAprvRqst(map);
			return list;
		//처리항목 목록2: 승인 요청 처리할 sr
		}else if(item.equals("itemOfRcptRqst")) {
			List<SrRqst> list = srRqstService.getToDoItemOfRcptRqst(map);
			return list;
		//처리항목 목록3: 접수된 sr
		}else if(item.equals("itemOfRcpt")) {
			List<SrRqst> list = srRqstService.getToDoItemOfRcpt(map);
			return list;
		//처리항목 목록4: 이관된 sr
		}else if(item.equals("itemOfTrnsfY")) {
			List<SrRqst> list = srRqstService.getToDoItemOfTrnsfY(map);
			return list;
		//처리항목 목록5: 개발 반영요청
		}else if(item.equals("itemOfApplyRqst")) {
			List<SrRqst> list = srRqstService.getToDoItemOfApplyRqst(map);
			return list;
		//처리항목 목록6: 계획 변경 요청
		}else {
			List<SrRqst> list = srRqstService.getToDoItemOfSchdlChg(map);
			return list;
		}
	}
	
	//상태에 따른 처리항목 총 행수 불러오기
	@GetMapping("getCountTodoByitemForPicHome")
	public int getCountTodoByitemForPicHome(
			Authentication authentication,
			@RequestParam(name="item") String item) {
		//파라미터로 전달받은 값 전달
		Map<String, Object>map = new HashMap<>();
		if (authentication != null && authentication.isAuthenticated()) {
			//로그인한 회원의 정보
			UsrDetails usrDetails = (UsrDetails) authentication.getPrincipal();
			Usr usr = usrDetails.getUsr();
			map.put("usr", usr.getUsrNo());
		} 
		
		//처리항목목록1: 승인 요청처리할 항목
		if(item.equals("itemOfAprvRqst")) {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfAprvRqst();
			return totalRows;
		//처리항목 목록2: 승인 요청 처리할 sr
		}else if(item.equals("itemOfRcptRqst")) {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfRcptRqst();
			return totalRows;
		//처리항목 목록3: 접수된 sr
		}else if(item.equals("itemOfRcpt")) {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfRcpt(map);
			return totalRows;
		//처리항목 목록4: 이관된 sr
		}else if(item.equals("itemOfTrnsfY")) {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfTrnsfY(map);
			return totalRows;
		//처리항목 목록5: 개발 반영요청
		}else if(item.equals("itemOfApplyRqst")) {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfApplyRqst(map);
			return totalRows;
		//처리항목 목록6: 계획 변경 요청
		}else {
			//item 에 따른 총 행 수를 가져오는 쿼리 실행
		    int totalRows = srRqstService.getTotalToDoItemOfSchdlChg(map);
			return totalRows;
		}
	}
	
	//상태에 따른 sr요청 총 행수 불러오기
	@GetMapping("getCountSRRequestsByStatusForPicHome")
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
			//map.put("usr", usr.getUsrNo());
			map.put("pic", usr.getUsrNo());
		} 
		// status에 따른 총 행 수를 가져오는 쿼리 실행
	    int totalRows = srRqstService.totalSrRqst(map);
	    
	    return totalRows;
	}
	
	//sr요청에 해당하는 상세정보 불러오기
	@GetMapping("getSrRqstBySrRqstNoForPicHome")
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo, Model model, HttpSession session) {
		SrRqst srRqst = srRqstService.getSrRqstBySrRqstNo(srRqstNo);
		List<SrRqstAtch> list = srRqstService.getSrRqstAtchBySrRqstNo(srRqstNo);
		srRqst.setSrRqstAtchList(list);
		model.addAttribute("srRqstNo", srRqstNo);
		return srRqst;
	}
	
	
	//담당자 홈 페이지에서 요청등록 모달에 소속부서에 해당하는 관련시스템 목록불러오기
	@GetMapping("getSysByDeptNoForPicHome")
	public List<Sys> getSysByDeptNo(String deptNo){
		List<Sys> list = srRqstService.getSysByDeptNo(deptNo);
		return list;
	}
	
	//요청 상태 불러오기
	@GetMapping("getSrRqstSttsForPicHome")
	public List<SrRqstStts> getSrRqstStts(Model model) {
		List<SrRqstStts> list = srRqstService.getSrRqstStts();
		model.addAttribute("srRqstSttsList", list);
		return list;
	}
	
	//sr에 해당하는 상세정보 불러오기
	@GetMapping("getSrBySrRqstNoForPicHome")
	public Sr getSrBySrRqstNo(String srRqstNo, Model model, HttpSession session) {
		Sr sr = srRqstService.getSrBySrRqstNo(srRqstNo);
		if(sr != null) {			
			List<SrAtch> list = srRqstService.getSrAtchBySrNo(sr.getSrNo());		
			sr.setSrAtchList(list);
			model.addAttribute("srRqstNo", srRqstNo);
			model.addAttribute("srNo", sr.getSrNo());
		}
		return sr;
	}
	
	//sr요청번호에 해당하는 sr개발정보가 있는지 여부 확인
	@GetMapping("checkIfSrInformationPresent")
	public int checkIfSrInformationPresent(String srRqstNo) {
		int countSrBySrRqstNo = srRqstService.checkIfSrInformationPresent(srRqstNo);
		return countSrBySrRqstNo;
	}
}
