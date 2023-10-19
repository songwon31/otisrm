package com.finalteam5.otisrm.service.usr;

import java.util.List;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;

public interface UsrService {
	//회원가입
	public enum JoinResult {
		SUCCESS,
		FAIL_DUPLICATED_UID,
		FAIL_DUPLICATED_EMAIL,
		FAIL_DUPLICATED_TEL
	}
	
	public JoinResult join(Usr usr);
	public List<Inst> getInstList();						//기관 목록불러오기
	public List<UsrAuthrt> getUserAuthrtList();				//가입 권한 목록 불러오기
	public List<Dept> getDeptListByInstNo(String instNo);	//기관에 따른 개발부서 목록 불러오기
	
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

	/**
	 * @author 송원석
	 * 사용자 관리 페이지 구성 데이터를 가져오는 메서드
	 */
	public UsrManagementPageConfigure getUsrManagementPageConfigureData();
	List<UsrAuthrt> getUsrAuthrtList();
}
