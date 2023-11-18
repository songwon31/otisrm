package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.Role;

@Mapper
public interface InstDao {
	public int countInst();
	
	//외부업체 제외 기관목록 가져오기
	public List<Inst> selectNoOutsrcInstList();
	
	//기업 상세 정보
	public InstDetail selectInstDetail(String instNo);
	public List<Dept> selectDeptListByInstNo(String instNo);	//기관에 해당하는 개발부서 목록 불러오기
	public List<Ibps> selectIbpsListByInstNo(String instNo);	//기관에 해당하는 직위 목록 불러오기
	public List<Role> selectRoleListByInstNo(String instNo);	//기관에 해당하는 역할 목록 불러오기
	
	//기업 등록
	public int checkInstExist(String instNo);
	public int insertInst(Inst inst);
	
	//기업 삭제
	public int checkInstUsr(String instNo);
	public int deleteInstByInstNo(String instNo);
	
	//기업명 저장
	public int updateInstNm(@Param("instNo") String instNo, @Param("instNm") String instNm);
	
	//기업분류 저장
	public int checkInstSr(String instNo);
	public int updateInstClsf(@Param("instNo") String instNo, @Param("instClsf") String instClsf);
	
	//직위 삭제
	public int checkIbpsUsrExist(String ibpsNo);
	public int deleteIbps(String ibpsNo);
	
	//직위 저장
	public int checkIbps(String ibpsNo);
	public int updateIbps(Ibps ibps);
	public int insertIbps(Ibps ibps);
	
	//역할 삭제
	public int checkRoleUsrExist(String roleNo);
	public int deleteRole(String roleNo);
	
	//역할 저장
	public int checkRole(String roleNo);
	public int updateRole(Role role);
	public int insertRole(Role role);
	
	//부서 삭제
	public int checkDeptUsrExist(String deptNo);
	public int deleteDept(String deptNo);
	
	//부서 저장
	public int checkDept(String deptNo);
	public int updateDept(Dept dept);
	public int insertDept(Dept dept);
}
