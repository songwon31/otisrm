package com.finalteam5.otisrm.service;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrPrgrsOtpt;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.DatesForScheduleChangeRequest;
import com.finalteam5.otisrm.dto.sr.ManageChangeScheduleRequestModalConfig;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearchCompose;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForm;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableConfigForProgressManagement;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfHr;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPrgrsPic;
import com.finalteam5.otisrm.dto.sr.SrTrnsfSetHrModalCompose;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.usr.Dept;

public interface SrService {
	/**
	 * 작성자: 송원석
	 * 개발자 홈 구성을 위한 메서드
	 */
	public int getTotalTransferedSrNumByUsrId(String usrId);
	//public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrIdAndPager(String usrId, Pager pager);
	
	public SrTrnsfInfoForDeveloperHome getSrTrnsfInfoForDeveloperHome(String srNo);
	public SrRequestDetailForDeveloperHome getSrRequestDetailForDeveloperHome(String srNo);
	public SrAtch getSrAtchBySrAtchNo(String srAtchNo);
	
	//개발자 홈 메인 테이블 구성
	public SrTableElementsForDeveloperHome getSrTableElementsForDeveloperHome(String usrNo, String srPrgrsSttsNo, int page);
	
	//SR계획정보 모달 구성
	public SrTrnsfPlanModalCompose getSrTrnsfPlanModalComposeBySrNoAndUsrId(String usrId, String srNo);
	
	//담당자 선택 모달
	public List<Dept> getDeptListByUsrId(String usrId);
	//담당자 선택 모달 테이블 구성
	public SrTrnsfFindPicModalCompose getSrTrnsfFindPicModalCompose(String usrNo, String deptNo, String usrNm, int pageNo);
	//공수 저장
	public int saveHrInfo(String jsonData);
	//HR 삭제
	public int deleteHrInfo(String jsonData);
	
	//sr이관 계획 정보 수정
	public int editSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm);
	
	//sr HR 선택 모달 구성
	public SrTrnsfSetHrModalCompose getSrTrnsfSetHrModalCompose(String srNo);
	
	//HR Pic 선택 모달 구성
	public String getDeptNoByDeptNm(String deptNm, String srNo);
	
	//HR PIC 업데이트
	public int updateSrPrgrs(SrTrnsfPrgrsPic srTrnsfPrgrsPic);
	
	public int addHr(String srNo, String usrNo);
	
	//SR 이관 진행률 업데이트
	public int updateSrTrnsfPrgrs(SrPrgrsForm srPrgrsForm);
	
	//산출물 업로드
	public int addSrPrgrsOtpt(SrPrgrsOtpt srPrgrsOtpt);
	
	//산출물 목록 
	public List<SrPrgrsOtpt> getSrPrgrsOtpts(String srPrgrsNo);
	
	//산출물 파일 다운로드
	public SrPrgrsOtpt getSrPrgrsOtptBySrPrgrsOtptNo(String srPrgrsOtptNo);
	
	//산출물 삭제
	public int deleteSelectedOtptList(List<String> srPrgrsOtptNoList);
	
	//--------------------------------------------------------------------------------------------------
	//SR진척관리 옵션 select구성
	public ProgressManagementSearchCompose getProgressManagementSearchCompose();
	
	//deptSelect 구성
	public List<Dept> getDeptListByInstNo(String instNo);
	
	//mainTable 구성
	public SrTableConfigForProgressManagement getProgressManagementMainTableConfig(String usrNo, String jsonData);
	
	//SR진척등록
	public List<SrTrnsfHr> getSrTrnsfHrListByUsrNo(String usrNo);
	
	//SR금일 진척 등록
	public int registerHrInfo(String jsonData);
	
	//현재 완료 요청일
	public DatesForScheduleChangeRequest getSrCmptnPrnmntDtBySrNo(String srNo);
	
	//일정 변경 요청
	public int requestSrScheduleChange(String srNo, Date srSchdlChgRqstDt);
	
	//일정 변경 요청 내역 관리
	public List<ManageChangeScheduleRequestModalConfig> getManageChangeScheduleRequestModalConfig();
	
	//일정변경요청 결과 확인
	public int srScheduleChangeRequestResultCheck(String srNo);
}
