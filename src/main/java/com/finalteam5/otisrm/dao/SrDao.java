package com.finalteam5.otisrm.dao;

import java.util.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrPrgrs;
import com.finalteam5.otisrm.dto.SrPrgrsOtpt;
import com.finalteam5.otisrm.dto.SrPrgrsStts;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.DatesForScheduleChangeRequest;
import com.finalteam5.otisrm.dto.sr.ManageChangeScheduleRequestModalConfig;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearch;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrForProgressManagementBoard;
import com.finalteam5.otisrm.dto.sr.SrForSrManagementBoard;
import com.finalteam5.otisrm.dto.sr.SrManagementSearch;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalUsrInfo;
import com.finalteam5.otisrm.dto.sr.SrTrnsfHr;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Usr;

@Mapper
public interface SrDao {
	public int countSr();
	
	public int countTotalTransferedSrNumByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrId(@Param("usrNo") String usrNo, @Param("instNo") String instNo);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrIdAndPager(
			@Param("usrId") String usrId, @Param("pager") Pager pager);
	public SrTrnsfInfoForDeveloperHome selectSrTrnsfInfoForDeveloperHomeBySrNo(String srNo);
	public SrTrnsfInfoForDeveloperHome selectSrTrnsfInfoForDeveloperHomeBySrNoRqst(String srNo);
	public List<SrPrgrsForDeveloperHome> selectSrPrgrsForDeveloperHomeList(String srNo);
	public List<SrTrnsfHr> selectSrTrnsfHrList(String srNo);
	public SrRequestDetailForDeveloperHome selectSrRequestDetailForDeveloperHome(String srNo);
	public List<SrAtch> selectSrAtchList(String srNo);
	public SrAtch selectSrAtchBySrAtchNo(String srAtchNo);
	
	public String checkStatusBySrNo(String srNo);
	
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndStts(
			@Param("usrNo") String usrNo, @Param("srPrgrsSttsNo") String srPrgrsSttsNo, @Param("instNo") String instNo);
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndSttsAndPager(
			@Param("usrNo") String usrNo, @Param("srPrgrsSttsNo") String srPrgrsSttsNo, @Param("instNo") String instNo, @Param("pager") Pager pager);
	
	public List<SrTaskClsf> selectTaskList();
	public List<Dept> selectDeptListByUsrId(String usrId);
	public List<Usr> selectUsrListByUsrId(String usrId);
	
	//SR계획정보 모달 구성
	public SrTrnsfPlanModalCompose getCurrentSrTrnsfPlanInfo(String srNo);
	public SrTrnsfPlanModalCompose getCurrentSrTrnsfPlanInfoRqst(String srNo);
	public List<SrDmndClsf> selectDmndList();
	
	//담당자 선택 모달 구성
	public int countSrTrnsfFindPicModalCompose(
			@Param("usrNo") String usrNo, @Param("deptNo") String deptNo, @Param("usrNm") String usrNm);
	public List<SrTrnsfFindPicModalUsrInfo> selectSrTrnsfFindPicModalCompose(
			@Param("usrNo") String usrNo, @Param("deptNo") String deptNo, @Param("usrNm") String usrNm, @Param("pager") Pager pager);
	
	//HR 추가
	public int checkHr(@Param("srNo") String srNo, @Param("usrNo") String usrNo);
	public int insertHr(@Param("srNo") String srNo, @Param("usrNo") String usrNo);
	
	//공수 저장
	public int updateSrTrnsfHr(SrTrnsfHr srTrnsfHr);
	
	//자원 삭제
	public int deleteSrTrnsfHr(SrTrnsfHr srTrnsfHr);
	
	//sr 이관 계획 수정
	public String selectDeptNoByDeptNmAndSrNo(@Param("deptNm") String deptNm, @Param("srNo") String srNo);
	public String selectUsrNoByUsrNm(String usrNm);
	public int updateSrTrnsfPlan(SrTrnsfPlan srTrnsfPlan);
	
	//요청 상태이고 필요 데이터가 모두 포함되어있으면 접수 상태로 변경
	public int insertAnalysisPrgrs(String srNo);
	public int insertDesignPrgrs(String srNo);
	public int insertImplementPrgrs(String srNo);
	public int insertTestPrgrs(String srNo);
	public int insertApplyRequestPrgrs(String srNo);
	public int updateSttsToReceipt(String srNo);
	
	//HR설정 모달 구성
	public String selectDeptNmBySrNo(String srNo);
	public String selectAnalysisPicNm(String srNo);
	public String selectDesignPicNm(String srNo);
	public String selectImplementPicNm(String srNo);
	public String selectTestPicNm(String srNo);
	public String selectApplyRequestPicNm(String srNo);
	
	//HR PIC 업데이트
	public int updateAnalysisPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateDesignPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateImplementPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateTestPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateApplyRequestPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	
	//SR 이관 진행률 업데이트
	public Integer selectAnalysisPrgrs(String srNo);
	public Integer selectDesignPrgrs(String srNo);
	public Integer selectImplementPrgrs(String srNo);
	public Integer selectTestPrgrs(String srNo);
	public Integer selectApplyRequestPrgrs(String srNo);
	
	public int updateSrPrgrs(SrPrgrs srPrgrs);
	public int updateSrTrnsfStts(@Param("srNo") String srNo, @Param("srPrgrsSttsNo") String srPrgrsSttsNo);
	
	public int updateSrRqstPrgrs(String srNo);
	
	//산출물 업로드
	public int insertSrPrgrsOtpt(SrPrgrsOtpt srPrgrsOtpt);
	
	//산출물 목록 출력
	public List<SrPrgrsOtpt> selectSrPrgrsOtpt(String srPrgrsNo);
	
	//산출물 다운로드
	public SrPrgrsOtpt selectSrPrgrsOtptBySrPrgrsOtptNo(String srPrgrsOtptNo);
	
	//산출물 삭제
	public int deleteSrPrgrsOtpt(String srPrgrsOtptNo);
	
	//SR진척 등록
	public List<SrTrnsfHr> selectSrTrnsfHrListByUsrNo(String usrNo);
	
	//금일 SR진척등록
	public SrTrnsfHr getSrTrnsfHrBySrNoAndUsrNo(@Param("srNo") String srNo, @Param("usrNo") String usrNo);
	
	//--------------------------------------------------------------------------------------------------
	//SR진척관리 옵션 select구성
	public List<Sys> selectSysList();
	/*public List<SrTaskClsf> selectTaskList();*/
	public List<Inst> selectInstList();
	public List<SrPrgrsStts> selectSrPrgrsSttsList();
	public List<Dept> selectDeptListByInstNo(String instNo);
	
	//메인 테이블 구성
	public int countSrForProgressManagementBoard(
			@Param("progressManagementSearch") ProgressManagementSearch progressManagementSearch, 
			@Param("usrNo") String usrNo);
	public List<SrForProgressManagementBoard> selectSrForProgressManagementBoard(
			@Param("progressManagementSearch") ProgressManagementSearch progressManagementSearch, 
			@Param("usrNo") String usrNo,
			@Param("pager") Pager pager);

	//현재 완료 요청일
	public DatesForScheduleChangeRequest selectSrCmptnPrnmntDtBySrNo(String srNo);
	
	//일정 변경 요청
	public int updateSrSchdlChgRqst(
			@Param("srNo") String srNo, 
			@Param("srSchdlChgRqstDt") Date srSchdlChgRqstDt);
	
	//일정변경요청 내역 관리
	public List<ManageChangeScheduleRequestModalConfig> selectManageChangeScheduleRequestModalConfigList();
	
	//일정변경요청 결과 확인
	public int updateSrScheduleChangeRequestResultCheck(String srNo);
	
	public String selectInstNoByUsrNo(String usrNo);
	
	//요청 가능한 기업 리스트
	public List<Inst> selectRqstInstList();
	
	//sr요청 상태 리스트
	public List<SrRqstStts> selectSrRqstSttsList();
	
	public List<Dept> selectMainDeptList();
	
	//sr관리 메인 테이블 구성
	public int countSrForSrManagementBoard(SrManagementSearch srManagementSearch);
	public List<SrForSrManagementBoard> selectSrForSrManagementBoard(
			@Param("srManagementSearch") SrManagementSearch srManagementSearch, 
			@Param("pager") Pager pager);
	public int checkSrExist(String srRqstNo);
	public String getSrTrnsfYnBySrRqstNo(String srRqstNo);
	
	public int checkPrgrs(@Param("usrNo") String usrNo, @Param("srNo") String srNo);
	public int checkIfPic(@Param("usrNo") String usrNo, @Param("srNo") String srNo);
	public int checkIfInstAndStts(@Param("instNo") String instNo, @Param("srNo") String srNo);
	public String selectSrPrgrsSttsBySrNo(String srNo);
}
