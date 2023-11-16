package com.finalteam5.otisrm.service;

import java.util.List;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.InstTableConfigForInstManagement;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrEditConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementModalConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearchConfigure;
import com.finalteam5.otisrm.dto.usr.UsrTableConfigForUsrManagement;

public interface UsrService {
	//회원가입
	public enum JoinResult {
		SUCCESS,
		FAIL_DUPLICATED_UID
	}
	
	public JoinResult join(Usr usr);						//회원가입
	
	//회원가입 폼
	public List<Inst> getInstList();						//기관 목록불러오기
	public List<UsrAuthrt> getUsrAuthrtList();				//가입 권한 목록 불러오기
	public List<Dept> getDeptListByInstNo(String instNo);	//기관에 따른 개발부서 목록 불러오기
	public List<Ibps> getIbpsListByInstNo(String instNo);	//기관에 따른 직위 목록 불러오기
	public List<Role> getRoleListByInstNo(String instNo);	//기관에 따른 역할 목록 불러오기
	public int getNumOfOverlapUsrId(String usrId);			//아이디 중복검사
	
	//로그인/로그아웃
	public enum LoginResult {
		SUCCESS,
		FAIL_UID,
		FAIL_PASSWORD,
		FAIL_ENABLED
	}
	public LoginResult login(Login loginUsr);
	
	//로그인
	public Login getUsr(String usrId);
	
	//로그아웃
	public void logout(String uid);
	
	//로그인한 회원정보 불러오기
	public Usr getUsrDetailByUsrId(String usrId);
	
	//로그인 한 회원에 해당하는 업무부서이름
	public String getDeptNmByDeptNo(String deptNo);
	
	//아아디 찾기
	public int checkUsrNmAndEml(Usr usr);				//회원이름과 이메일에 해당하는 회원
	public String getMyId(Usr usr);					//회원이름과 이메일에 해당하는 회원
	

	/**
	 * @author 송원석
	 * 사용자 관리 페이지 구성 데이터를 가져오는 메서드
	 */
	public UsrManagementSearchConfigure getUsrManagementPageConfigureData();
	public List<Dept> getDeptSelectConfig(String instNo);
	public UsrTableConfigForUsrManagement getUsrManagementMainTableConfig(String jsonData);
	
	//사용자 상태 변경(승인 대기, 일반, 탈퇴)
	public int batchApproval(List<String> usrNoList);
	public int batchWithdrawl(List<String> usrNoList);
	
	//사용자 상세 모달 구성
	public UsrManagementModalConfigure getUsrDetailModalConfig(String usrNo);
	
	//개인정보수정 모달 구성
	public UsrEditConfigure getUsrEditConfigure(String usrNo);
	
	//아이디 수정
	public int editUsrId(String usrNo, String newUsrId);
	
	//비밀번호 수정
	public int editUsrPassword(String usrNo, String newUsrPassword);
	
	//이름 수정
	public int editUsrNm(String usrNo, String newUsrNm);
	
	//이메일 수정
	public int editUsrEml(String usrNo, String newUsrEml);
	
	//전화번호 수정
	public int editUsrTelno(String usrNo, String newUsrTelno);
	
	//부서 수정
	public int editUsrDept(String usrNo, String newDeptNo);
	
	//직책 수정
	public int editUsrRole(String usrNo, String newRoleNo);
	
	//직위 수정
	public int editUsrIbps(String usrNo, String newIbpsNo);
	
	//회원 탈퇴
	public int usrWhdwl(String usrNo);
	
	//권한 수정
	public int editUsrAuthrt(String usrNo, String newUsrAuthrtNo);
	
	//기업관리페이지 메인 테이블 구성
	public InstTableConfigForInstManagement getInstTableConfigForInstManagement(String jsonData);
	
	//기업 상세정보
	public InstDetail getDetailInstInfo(String instNo);
}
