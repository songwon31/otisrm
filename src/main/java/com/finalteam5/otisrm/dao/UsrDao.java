package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.sr.SrNoAndTtl;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.InstForInstManagementBoard;
import com.finalteam5.otisrm.dto.usr.InstManagementSearch;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrEditConfigure;
import com.finalteam5.otisrm.dto.usr.UsrForUsrManagementBoard;
import com.finalteam5.otisrm.dto.usr.UsrManagementModalConfigure;
import com.finalteam5.otisrm.dto.usr.UsrManagementSearch;
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
	
	//Spring Security 로그인
	public Usr selectUsrDetailsByUsrId(String usrId);
	
	//로그인 한 회원에 해당하는 업무부서 이름
	public String selectDeptNmByDeptNo(String deptNo);
	
	//usrManagement 페이지 구성
	public int countUsrForUsrManagementBoard(UsrManagementSearch usrManagementSearch);
	public List<UsrForUsrManagementBoard> selectUsrForUsrManagementBoard(
			@Param("usrManagementSearch") UsrManagementSearch usrManagementSearch, 
			@Param("pager") Pager pager);
	//사용자 승인
	public int updateUsrSttsToNormal(String usrNo);
	//사용자 탈퇴
	public int updateUsrSttsToWithdrawl(String usrNo);
	//사용자 모달 구성
	public UsrManagementModalConfigure selectUsrInfoByUsrNo(String usrNo);
	public List<SrNoAndTtl> selectSrInfoByUsrNo(String usrNo);
	
	//개인정보 수정 모달 구성
	public UsrEditConfigure selectUsrEditConfigureByUsrNo(String usrNo);
	public String selectInstNoByUsrNo(String usrNo);
	
	//아이디 수정
	public int updateUsrId(@Param("usrNo") String usrNo, @Param("usrId") String usrId);
	//비밀번호 수정
	public int updateUsrPassword(@Param("usrNo") String usrNo, @Param("usrPassword") String usrPassword);
	//이름 수정
	public int updateUsrNm(@Param("usrNo") String usrNo, @Param("usrNm") String usrNm);
	//이메일 수정
	public int updateUsrEml(@Param("usrNo") String usrNo, @Param("usrEml") String usrEml);
	//전화번호 수정
	public int updateUsrTelno(@Param("usrNo") String usrNo, @Param("usrTelno") String usrTelno);
	//부서 수정
	public int updateUsrDept(@Param("usrNo") String usrNo, @Param("deptNo") String deptNo);
	//직책 수정
	public int updateUsrRole(@Param("usrNo") String usrNo, @Param("roleNo") String roleNo);
	//직위 수정
	public int updateUsrIbps(@Param("usrNo") String usrNo, @Param("ibpsNo") String ibpsNo);
	//회원 탈퇴
	public int updateUsrSttsToWhdwl(String usrNo);
	//권한 수정
	public int updateUsrAuthrt(@Param("usrNo") String usrNo, @Param("authrtNo") String authrtNo);
	
	//기업관리
	public int countInstForInstManagementBoard(InstManagementSearch instManagementSearch);
	public List<InstForInstManagementBoard> selectInstForInstManagementBoard(
			@Param("instManagementSearch") InstManagementSearch instManagementSearch, 
			@Param("pager") Pager pager);
	
	//기업 상세 정보
	public InstDetail selectInstDetail(String instNo);
}