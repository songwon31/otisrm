package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrStts;

@Mapper
public interface UsrDao {
	//회원가입
	public List<Inst> selectInstList();							//기관 목록 불러오기
	public List<UsrAuthrt> selectUsrAuthrtList();				//가입권한 목록 불러오기
	public List<Dept> selectDeptListByInstNo(String instNo);	//기관에 해당하는 개발부서 목록 불러오기
	public List<Ibps> selectIbpsListByInstNo(String instNo);	//기관에 해당하는 직위 목록 불러오기
	public List<Role> selectRoleListByInstNo(String instNo);	//기관에 해당하는 역할 목록 불러오기
	public int selectNumOfOverlapUsrId(String usrId);			//아이디 중복검사
	public int insertUsr(Usr usr);								//회원가입
	
	//로그인
	public Login selectByUsrId(String usrId);
	public List<UsrStts> selectUsrSttsList();
}
