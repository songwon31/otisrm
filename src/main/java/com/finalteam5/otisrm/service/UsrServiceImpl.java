package com.finalteam5.otisrm.service;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam5.otisrm.dao.UsrDao;
import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.InstManagementSearch;
import com.finalteam5.otisrm.dto.usr.InstTableConfigForInstManagement;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrEditConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementModalConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearch;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearchConfigure;
import com.finalteam5.otisrm.dto.usr.UsrTableConfigForUsrManagement;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsrServiceImpl implements UsrService{
	@Autowired
	private UsrDao usrDao;
	
	//회원가입
	@Override
	public JoinResult join(Usr usr) {
		int numOfOverLapUsrId = usrDao.selectNumOfOverlapUsrId(usr.getUsrId());
		if(numOfOverLapUsrId != 0) {
			return JoinResult.FAIL_DUPLICATED_UID;
		} else {
			PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
			usr.setUsrPswd(passwordEncoder.encode(usr.getUsrPswd()));
			usrDao.insertUsr(usr);		
			return JoinResult.SUCCESS;
		}
	}
	//회원가입 폼
	//기관 목록 불러오기
	@Override
	public List<Inst> getInstList() {
		List<Inst> list = usrDao.selectInstList();
		for(int i=0; i < list.size(); i++) {
			if(list.get(i).getOutsrcYn().equals("Y")) {
				list.get(i).setInstNm(list.get(i).getInstNm() + "(외부)");
			}
		}
		return list;
	}
	//권한 목록 불러오기
	@Override
	public List<UsrAuthrt> getUsrAuthrtList() {
		List<UsrAuthrt> list = usrDao.selectUsrAuthrtList();
		return list;
	}
	//기관에 해당하는 개발 부서 불러오기
	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		List<Dept> list = usrDao.selectDeptListByInstNo(instNo);
		return list;
	}
	//기관에 해당하는 직위 목록 불러오기
	@Override
	public List<Ibps> getIbpsListByInstNo(String instNo) {
		List<Ibps> list = usrDao.selectIbpsListByInstNo(instNo);
		return list;
	}
	//기관에 해당하는 역할 목록 불러오기
	@Override
	public List<Role> getRoleListByInstNo(String instNo) {
		List<Role> list = usrDao.selectRoleListByInstNo(instNo);
		return list;
	}
	//아이디 중복검사
	@Override
	public int getNumOfOverlapUsrId(String usrId) {
		int numOfOverlapUsrId = usrDao.selectNumOfOverlapUsrId(usrId);
		return numOfOverlapUsrId;
	}

	
	//로그인
	@Override
	public LoginResult login(Login loginUsr) {
		Login dbUsr = usrDao.selectByUsrId(loginUsr.getUsrId());
		if(dbUsr == null) {
			return LoginResult.FAIL_UID;
		}
		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		if(passwordEncoder.matches(loginUsr.getUsrPswd(), dbUsr.getUsrPswd())) {
			if(dbUsr.getUsrSttsNo().equals("NORMAL")) {
				return LoginResult.SUCCESS;
			}else {
				return LoginResult.FAIL_ENABLED;
			}
		}else {
			return LoginResult.FAIL_PASSWORD;
		}
	}

	@Override
	public Login getUsr(String usrId) {
		Login usr = usrDao.selectByUsrId(usrId);
		// 등록한 이미지가 있다면 base64로 인코딩
		if(usr.getRprsImg() != null) {
			String base64Img = Base64.getEncoder().encodeToString(usr.getRprsImg());
			usr.setUsrEcdImg(base64Img);
		}
		return usr;
	}

	@Override
	public void logout(String uid) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public Usr getUsrDetailByUsrId(String usrId) {
		Usr loginUsr = usrDao.selectUsrDetailsByUsrId(usrId);
		if(loginUsr.getUsrSttsNo().equals("PENDING")||loginUsr.getUsrSttsNo().equals("WITHDRAWL")){
			loginUsr.setEnabled(false);
		}else {
			loginUsr.setEnabled(true);
		}
		return loginUsr;
	}
	
	@Override
	public String getDeptNmByDeptNo(String deptNo) {
		String deptNm = usrDao.selectDeptNmByDeptNo(deptNo);
		return deptNm;
	}
	
	//계정 정보 유효성 체크
	@Override
	public int checkUsrNmAndEml(Usr usr) {
		int checkmyInfo = usrDao.countByUsrNmAndEml(usr);
		return checkmyInfo;
	}
	
	//아이디 불러오기
	@Override
	public String getMyId(Usr usr) {
		int isMyInfo = usrDao.countByUsrNmAndEml(usr);
		if(isMyInfo == 1) {
			String myId = usrDao.selectMyId(usr);	
			return myId;
		}
		
		return "fail";
	}
	
	
	/**
	 * @author 송원석
	 * 사용자 관리 페이지 구성 데이터를 가져오는 메서드
	 */
	@Override
	public UsrManagementSearchConfigure getUsrManagementPageConfigureData() {
		UsrManagementSearchConfigure usrManagementPageConfigure = new UsrManagementSearchConfigure();
		
		usrManagementPageConfigure.setUsrAuthrtList(usrDao.selectUsrAuthrtList());
		usrManagementPageConfigure.setUsrSttsList(usrDao.selectUsrSttsList());
		usrManagementPageConfigure.setInstList(usrDao.selectInstList());
		
		return usrManagementPageConfigure;
	}
	
	@Override
	public List<Dept> getDeptSelectConfig(String instNo) {
		return usrDao.selectDeptListByInstNo(instNo);
	}
	
	@Override
	public UsrTableConfigForUsrManagement getUsrManagementMainTableConfig(String jsonData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			UsrManagementSearch usrManagementSearch = new UsrManagementSearch();
			Integer pageNo;
        
            // JSON 문자열을 Map으로 파싱
            Map<String, Object> jsonMap = objectMapper.readValue(jsonData, Map.class);
            String innerJson = (String) jsonMap.get("usrManagementSearch");
            usrManagementSearch = objectMapper.readValue(innerJson, UsrManagementSearch.class);
            pageNo = (Integer) jsonMap.get("pageNo");
            
            // 결과 출력
            log.info("usrManagementSearch: " + usrManagementSearch);
            log.info("pageNo: " + pageNo);
            
       
            int totalUsrForUsrManagementBoardNum = usrDao.countUsrForUsrManagementBoard(usrManagementSearch);
            log.info(""+totalUsrForUsrManagementBoardNum);
	        Pager pager = new Pager(10, 5, totalUsrForUsrManagementBoardNum, pageNo);
	        
	        UsrTableConfigForUsrManagement usrTableConfigForUsrManagement = new UsrTableConfigForUsrManagement();
	        usrTableConfigForUsrManagement.setUsrList(usrDao.selectUsrForUsrManagementBoard(usrManagementSearch, pager));
	        usrTableConfigForUsrManagement.setPager(pager);
	        log.info(""+usrTableConfigForUsrManagement);

	        
			return usrTableConfigForUsrManagement;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//일괄 승인
	@Override
	public int batchApproval(List<String> usrNoList) {
		for (String usrNo : usrNoList) {
			usrDao.updateUsrSttsToNormal(usrNo);
		}
		return 1;
	}
	
	@Override
	public int batchWithdrawl(List<String> usrNoList) {
		int usrNoListLength = usrNoList.size();
		int result = 0;
		for (String usrNo : usrNoList) {
			if (usrDao.selectSrInfoByUsrNo(usrNo).size() == 0) {
				usrDao.updateUsrSttsToWithdrawl(usrNo);
				result++;
			}
		}
		if (usrNoListLength == result) {
			return 1;
		} else {
			return 0;
		}
	}
	
	//사용자 상세 정보 모달 구성
	@Override
	public UsrManagementModalConfigure getUsrDetailModalConfig(String usrNo) {
		UsrManagementModalConfigure usrManagementModalConfigure = usrDao.selectUsrInfoByUsrNo(usrNo);
		usrManagementModalConfigure.setSrInfo(usrDao.selectSrInfoByUsrNo(usrNo));
		String instNo = usrDao.selectInstNoByUsrNo(usrNo);
		usrManagementModalConfigure.setDeptList(usrDao.selectDeptListByInstNo(instNo));
		usrManagementModalConfigure.setIbpsList(usrDao.selectIbpsListByInstNo(instNo));
		usrManagementModalConfigure.setRoleList(usrDao.selectRoleListByInstNo(instNo));
		return usrManagementModalConfigure;
	}
	
	//개인정보수정 모달 구성
	@Override
	public UsrEditConfigure getUsrEditConfigure(String usrNo) {
		UsrEditConfigure usrEditConfigure = usrDao.selectUsrEditConfigureByUsrNo(usrNo);
		String instNo = usrDao.selectInstNoByUsrNo(usrNo);
		usrEditConfigure.setDeptList(usrDao.selectDeptListByInstNo(instNo));
		usrEditConfigure.setRoleList(usrDao.selectRoleListByInstNo(instNo));
		usrEditConfigure.setIbpsList(usrDao.selectIbpsListByInstNo(instNo));
		log.info(""+usrEditConfigure.getDeptList());
		log.info(""+usrEditConfigure.getRoleList());
		log.info(""+usrEditConfigure.getIbpsList());
		return usrEditConfigure;
	}
	
	//아이디 수정
	@Override
	public int editUsrId(String usrNo, String newUsrId) {
		return usrDao.updateUsrId(usrNo, newUsrId);
	}
	
	//비밀번호 수정
	@Override
	public int editUsrPassword(String usrNo, String newUsrPassword) {
		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		String encodedNewUsrPassword = passwordEncoder.encode(newUsrPassword);
		return usrDao.updateUsrPassword(usrNo, encodedNewUsrPassword);
	}
	
	//이름 수정
	@Override
	public int editUsrNm(String usrNo, String newUsrNm) {
		return usrDao.updateUsrNm(usrNo, newUsrNm);
	}
	
	//이메일 수정
	@Override
	public int editUsrEml(String usrNo, String newUsrEml) {
		return usrDao.updateUsrEml(usrNo, newUsrEml);
	}
	
	//전화번호 수정
	@Override
	public int editUsrTelno(String usrNo, String newUsrTelno) {
		return usrDao.updateUsrTelno(usrNo, newUsrTelno);
	}
	
	//부서 수정
	@Override
	public int editUsrDept(String usrNo, String newDeptNo) {
		if (usrDao.selectSrInfoByUsrNo(usrNo).size() > 0) {
			return 0;
		} else {
			return usrDao.updateUsrDept(usrNo, newDeptNo);
		}
	}
	
	//직책 수정
	@Override
	public int editUsrRole(String usrNo, String newRoleNo) {
		return usrDao.updateUsrRole(usrNo, newRoleNo);
	}
	
	//직위 수정
	@Override
	public int editUsrIbps(String usrNo, String newIbpsNo) {
		return usrDao.updateUsrIbps(usrNo, newIbpsNo);
	}
	
	//회원 탈퇴
	@Override
	public int usrWhdwl(String usrNo) {
		if (usrDao.selectSrInfoByUsrNo(usrNo).size() > 0) {
			return 0;
		} else {
			return usrDao.updateUsrSttsToWhdwl(usrNo);
		}
	}
	
	//권한 수정
	@Override
	public int editUsrAuthrt(String usrNo, String newUsrAuthrtNo) {
		if (usrDao.selectSrInfoByUsrNo(usrNo).size() > 0) {
			return 0;
		} else {
			return usrDao.updateUsrAuthrt(usrNo, newUsrAuthrtNo);
		}
	}
	
	//기업관리페이지 메인테이블 구성
	@Override
	public InstTableConfigForInstManagement getInstTableConfigForInstManagement(String jsonData) {
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			InstManagementSearch instManagementSearch = new InstManagementSearch();
			Integer pageNo;
        
            // JSON 문자열을 Map으로 파싱
            Map<String, Object> jsonMap = objectMapper.readValue(jsonData, Map.class);
            String innerJson = (String) jsonMap.get("instManagementSearch");
            instManagementSearch = objectMapper.readValue(innerJson, InstManagementSearch.class);
            pageNo = (Integer) jsonMap.get("pageNo");
            
            // 결과 출력
            /*
            log.info("instManagementSearch: " + instManagementSearch);
            log.info("pageNo: " + pageNo);
            */
       
            int totalInstForInstManagementBoardNum = usrDao.countInstForInstManagementBoard(instManagementSearch);
            log.info(""+totalInstForInstManagementBoardNum);
	        Pager pager = new Pager(10, 5, totalInstForInstManagementBoardNum, pageNo);
	        
	        InstTableConfigForInstManagement instTableConfigForUsrManagement = new InstTableConfigForInstManagement();
	        instTableConfigForUsrManagement.setInstList(usrDao.selectInstForInstManagementBoard(instManagementSearch, pager));
	        instTableConfigForUsrManagement.setPager(pager);
	        log.info(""+instTableConfigForUsrManagement);

	        
			return instTableConfigForUsrManagement;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	//기업 상세정보
	@Override
	public InstDetail getDetailInstInfo(String instNo) {
		InstDetail instDetail = usrDao.selectInstDetail(instNo);
		instDetail.setIbpsList(usrDao.selectIbpsListByInstNo(instNo));
		instDetail.setRoleList(usrDao.selectRoleListByInstNo(instNo));
		instDetail.setDeptList(usrDao.selectDeptListByInstNo(instNo));
		return null;
	}
	

}
