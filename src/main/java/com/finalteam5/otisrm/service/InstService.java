package com.finalteam5.otisrm.service;

import java.util.List;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.inst.SysTableConfig;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;

public interface InstService {
	//작성자: 이현주
	//외부업체 제외 기관목록 가져오기
	public List<Inst> getNoOutsrcInstList();
	
	//기업 상세정보
	public InstDetail getDetailInstInfo(String instNo);
	
	//기업명 저장
	public String updateInstNm(String instNo, String instNm);
	
	//기업분류 저장
	public String updateInstClsf(String instNo, String instClsf);
	
	//기업 등록
	public String registInst(Inst inst);
	
	//기업 삭제
	public String deleteInst(List<String> instNoList);
	
	//직위 삭제
	public String deleteIbps(String ibpsNo);
	
	//직위 저장
	public String saveIbps(String jsonData);
	
	//역할 삭제
	public String deleteRole(String roleNo);
	
	//역할 저장
	public String saveRole(String jsonData);
	
	//부서 삭제
	public String deleteDept(String deptNo);
	
	//부서 저장
	public String saveDept(String jsonData);
	
	//시스템 관리 모달 테이블 데이터 구성
	public SysTableConfig getSystemTableConfig(String jsonData);
	
	//시스템 정보 수정
	public String editSystem(Sys sys);
	
	//시스템 등록
	public String registSys(Sys sys);
	
	//시스템 삭제
	public String deleteSys(List<String> sysNoList);
}
