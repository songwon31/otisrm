package com.finalteam5.otisrm.service.user;

import java.util.List;

import com.finalteam5.otisrm.dto.user.Dept;
import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.UsrAuthrt;

public interface UserService {
	public List<Inst> getInstList();						//기관 목록불러오기
	public List<UsrAuthrt> getUserAuthrtList();			//가입 권한 목록 불러오기
	public List<Dept> getDeptListByInstNo(String instNo);	//기관에 따른 개발부서 목록 불러오기
}
