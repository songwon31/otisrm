package com.finalteam5.otisrm.service;

import java.util.List;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForm;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPrgrsPic;
import com.finalteam5.otisrm.dto.sr.SrTrnsfSetHrModalCompose;
import com.finalteam5.otisrm.dto.usr.Dept;

public interface SrService {
	/**
	 * 작성자: 송원석
	 * 개발자 홈 구성을 위한 메서드
	 */
	public int getTotalTransferedSrNumByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrIdAndPager(String usrId, Pager pager);
	
	public SrTrnsfInfoForDeveloperHome getSrTrnsfInfoForDeveloperHome(String srNo);
	public SrRequestDetailForDeveloperHome getSrRequestDetailForDeveloperHome(String srNo);
	public SrTableElementsForDeveloperHome getSrTableElementsForDeveloperHome(String usrId, String srPrgrsSttsNo, int page);
	
	//SR계획정보 모달 구성
	public SrTrnsfPlanModalCompose getSrTrnsfPlanModalComposeBySrNoAndUsrId(String usrId, String srNo);
	
	//담당자 선택 모달
	public List<Dept> getDeptListByUsrId(String usrId);
	//담당자 선택 모달 테이블 구성
	public SrTrnsfFindPicModalCompose getSrTrnsfFindPicModalCompose(String usrId, String deptNo, String usrNm, int pageNo);
	
	//sr이관 계획 정보 수정
	public int editSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm);
	
	//sr HR 선택 모달 구성
	public SrTrnsfSetHrModalCompose getSrTrnsfSetHrModalCompose(String srNo);
	
	//HR Pic 선택 모달 구성
	public String getDeptNoByDeptNm(String deptNm, String srNo);
	
	//HR PIC 업데이트
	public int updateSrPrgrs(SrTrnsfPrgrsPic srTrnsfPrgrsPic);
	
	//SR 이관 진행률 업데이트
	public int updateSrTrnsfPrgrs(SrPrgrsForm srPrgrsForm);
}
