package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.user.Dept;
import com.finalteam5.otisrm.dto.user.Ibps;
import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.Role;
import com.finalteam5.otisrm.dto.user.UsrAuthrt;

@Mapper
public interface UserDao {
	//회원가입
	public List<Inst> selectInstList();							//기관 목록 불러오기
	public List<UsrAuthrt> selectUserAuthrtList();				//가입권한 목록 불러오기
	public List<Dept> selectDeptListByInstNo(String instNo);	//개발부서 목속 불러오기
	public List<Ibps> selectIbpsList(String instNo);
	public List<Role> selectRoleList(String instNo);
	
	//로그인
	
	
}
