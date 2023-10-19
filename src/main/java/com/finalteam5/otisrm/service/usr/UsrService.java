package com.finalteam5.otisrm.service.usr;

import java.util.List;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;

public interface UsrService {
	public List<Inst> getInstList();						//기관 목록불러오기
	public List<UsrAuthrt> getUsrAuthrtList();			//가입 권한 목록 불러오기
	public List<Dept> getDeptListByInstNo(String instNo);	//기관에 따른 개발부서 목록 불러오기
	
	/**
	 * @author 송원석
	 * 사용자 관리 페이지 구성 데이터를 가져오는 메서드
	 */
	public UsrManagementPageConfigure getUsrManagementPageConfigureData();
}
