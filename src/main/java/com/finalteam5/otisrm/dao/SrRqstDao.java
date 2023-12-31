package com.finalteam5.otisrm.dao;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrPrgrs;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrSubmit;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountByDept;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSttsCountBySys;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
import com.finalteam5.otisrm.dto.usr.Inst;

@Mapper
public interface SrRqstDao {
	//작성자: 성유진
	
	//sr요청등록폼: 개발부서에 따른 관련시스템 불러오기
	public List<Sys> selectSysByDeptNo(String deptNo);	
	
	//sr요청등록폼: sr요청등록하기
	public int insertSrRqst(SrRqstSubmit srRqstSubmit);
	
	//sr요청등록폼: sr요청 등록 첨부파일 업로드
	public int insertSrRqstAtch(SrRqstAtch srRqstAtch);
	
	//sr요청등록폼: 삽입한 요청 PK가져오기(첨부파일 업로드를 위함)
	public String selectAddSrRqstPk();
	
	//sr요청목록 불러오기: 페이지별로 sr요청 불러오기(고객사 홈)
	public List<SrRqst> selectSrRqstListByPage(Map<String, Object> map);
	
	//전체 sr요청목록 불러오기: 요청 수(페이징 처리를 위함)
	public int countSrRqst(Map<String, Object> map);
	
	//sr요청에 해당하는 상세 정보 불러오기
	public SrRqst selectSrRqstBySrRqstNo(String srRqstNo);
	
	//sr요청 상세정보에 해당하는 첨부파일 불러오기
	public List<SrRqstAtch> selectSrRqstAtchBySrRqstNo(String srRqstNo); 
	
	//sr첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public SrRqstAtch selectSrRqstAtchBySrRqstAtchNo(String srRqstAtchNo);
	
	//등록한 sr요청 수정하기
	public void updateSrRqst(SrRqstSubmit srRqstSubmit);
	
	//sr요청 상태 불러오기(시퀀스 오름차순으로)
	public List<SrRqstStts> selectSrRqstStts();
	
	//sr요청 삭제하기
	public void deleteSrRqst(String srRqstNo);
	
	//담당자홈=====================================================================
	
	//담당자 폼 sr개발정보: 이관기관 가져오기
	public List<Inst> selectInstByOutsrcY();
	
	//담당자 폼 sr개발정보: sr요청구분 가져오기
	public List<SrDmndClsf> selectSrDmndClsf();
	
	//담당자 폼 sr개발정보: sr업무구분 가져오기   
	public List<SrTaskClsf> selectSrTaskClsf();
	
	//srRqstNo에 해당하는 sr 상세 내용 가져오기
	public Sr selectSrBySrRqstNo(String SrRqstNo);
	
	//sr 상세에 해당하는 첨부파일 불러오기 
	public List<SrAtch> selectSrAtchBySrNo(String srNo);
	
	//sr 첨부파일 번호에 해당하는 첨부파일 불러오기
	public SrAtch selectSrAtchBySrAtchNo(String srAtchNo);
	
	//sr 정보 입력하기
	public int insertSr (SrSubmit srSubmit);
	
	//최근 삽입한 sr pk 불러오기(첨부파일 등록을 위함)
	public String selectAddSrPk();
	
	//sr 등록 첨부파일 업로드	
	public int insertSrAtch(SrAtch srAtch);
	
	//최근 삽입한 이관된 sr pk불러오기(이관된 sr계획 정보 등록을 위함)
	public String selectAddSrPkByTrnsf();
	
	//최근 삽입한 이관된 sr에 해당하는 sr이관계획 등록
	public int insertSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm);
	
	//sr 개발정보 수정하기
	public void updateSr(SrSubmit srSubmit);
	
	//해당 sr요청에 대한 sr정보가 있는지 확인
	public int countSrInformationPresent(String srRqstNo);
	
	//sr에 해당하는 sr진척률 가져오기
	public List<SrPrgrs> selectSrPrgrsBySrNo(String srNo);
	
	//처리항목목록1: 승인 요청처리할 항목
	public List<SrRqst> selectToDoItemOfAprvRqst(Map<String, Object> map);
	public int countToDoItemOfAprvRqst();
	
	//처리항목 목록2: 승인 요청 처리할 sr
	public List<SrRqst> selectToDoItemOfRcptRqst(Map<String, Object> map);
	public int countToDoItemOfRcptRqst();
	
	//처리항목 목록3: 접수된 sr
	public List<SrRqst> selectToDoItemOfRcpt(Map<String, Object> map);
	public int countToDoItemOfRcpt(Map<String, Object> map);
	
	//처리항목 목록4: 이관된 sr
	public List<SrRqst> selectToDoItemOfTrnsfY(Map<String, Object> map);
	public int countToDoItemOfTrnsfY(Map<String, Object> map);
	
	//처리항목 목록5: 개발 반영요청
	public List<SrRqst> selectToDoItemOfApplyRqst(Map<String, Object> map);
	public int countToDoItemOfApplyRqst(Map<String, Object> map);
	
	//처리항목 목록6: 계획 변경 요청
	public List<SrRqst> selectToDoItemOfSchdlChg(Map<String, Object> map);
	public int countToDoItemOfSchdlChg(Map<String, Object> map);
	
	//계획 변경 요청 승인 시 sr이관계확 목표완료일도 업데이트
	public void updateSrTrnsfPlan(SrTrnsfPlanForm srTransfPlanForm);
	
	//작성자: 이현주 ====================================================================
	//미처리 요청수 가져오기
	public int countUnprocessSrRqst();
	
	//검토자 홈 미처리 요청목록 불러오기
	public List<SrRqstForReviewerHomeBoard> selectUnprocessSrRqstByPage(Pager pager);
	
	//페이지별로 요청 불러오기(검토자 홈)
	public List<SrRqstForReviewerHomeBoard> selectSrRqstForReviewerHomeBoardListByPage(Map<String, Object> params);
	
	//상태별 요청수 가져오기
	public int countSrRqstBySttsNm(String srRqstSttNm);
	
	//검토자 상세모달로 SR정보 가져오기
	public SrRqstForReviewerModal selectSrRqstForReviewerModal(String selectedSrRqstNo);
	
	//검토자 홈 진행현황으로 SR정보 가져오기
	public SrRqstForReviewerHomeProgress selectSrRqstForReviewerHomeProgress(String selectedSrRqstNo);
	
	//진행상태 업데이트
	public void updateSrRqstStts(Map<String, String> params);
	
	//검토의견 업데이트
	public void updateSrRqstRvwRsn(Map<String, String> params);
	
	//전체 시스템 이름 가져오기
	public List<String> selectTotalSysNm();
	
	//시스템별 상태개수 가져오기(검토자 홈 차트)
	public List<SrRqstSttsCountBySys> selectSttsCountBySysNmForChart();
	
	//시스템별 상태개수 가져오기
	public List<SrRqstSttsCountBySys> selectSttsCountBySysNm(Map<String, String> params);
	
	//등록부서별 상태개수 가져오기
	public List<SrRqstSttsCountByDept> selectSttsCountByDeptNm(Map<String, String> params);
	
	//개발관리 요청수 가져오기
	public int countSrRqstForDevelopManagement(Map<String, String> params);

	//개발관 목록 가져오기
	public List<SrRqstForSearchList> selectSrRqstForDevelopManagementByPage(Map<String, Object> params);
	
	//개발관리 엑셀다운로드를 위한 목록 가져오기
	public List<SrRqstForSearchList> selectSrRqstForDevelopManagementForExport(Map<String, String> params);
	
	//검토관리 요청수 가져오기
	public int countSrRqstForReviewManagement(Map<String, String> params);
	
	//검토관리 목록 가져오기
	public List<SrRqstForSearchList> selectSrRqstForReviewManagementByPage(Map<String, Object> params);
	
	//검토관리 엑셀다운로드를 위한 목록 가져오기
	public List<SrRqstForSearchList> selectSrRqstForReviewManagementForExport(Map<String, String> params);

	//이관날짜 저장
	public void updateSrTrnsfDt(@Param("srNo")String srNo, @Param("srTrnsfDt")Date srTrnsfDt);
}