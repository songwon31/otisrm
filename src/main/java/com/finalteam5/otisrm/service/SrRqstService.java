package com.finalteam5.otisrm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrPrgrs;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrSubmit;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
import com.finalteam5.otisrm.dto.usr.Inst;

public interface SrRqstService {	
	//작성자: 성유진
	//sr요청등록폼: 개발부서에 따른 관련시스템 불러오기
	public List<Sys> getSysByDeptNo(String deptNo);
	
	//sr요청등록폼: 요청등록하기
	public int writeSrRqst(SrRqstSubmit srRqstSubmit);
	
	//sr요청등록폼: 첨부파일 업로드
	public int uploadSrRqstAtch(SrRqstAtch srRqstAtch);
	
	//sr요청등록폼: 삽입한 요청 PK가져오기(첨부파일 업로드를 위함)
	public String getAddSrRqstPk();
	
	//sr요청목록불러오기
	public List<SrRqst> getSrRqstListByPager(Map<String, Object> map);

	//전체 sr요청 수
	public int totalSrRqst(Map<String, Object> map);

	//sr요청에 해당하는 상세 정보 불러오기
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo);
	
	//sr요청 상세정보에 해당하는 첨부파일 불러오기
	public List<SrRqstAtch> getSrRqstAtchBySrRqstNo(String srRqstNo);
	
	//sr첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public SrRqstAtch getSrRqstAtchBySrRqstAtchNo(String srRqstAtchNo);
	
	//등록한 sr요청 수정하기
	public void modifySrRqst(SrRqstSubmit srRqstSubmit);
	
	//sr요청 관리 검색창: sr요청 상태 불러오기
	public List<SrRqstStts> getSrRqstStts();
    
	//sr요청 삭제하기
	public void removeSrRqst(String srRqstNo);
	//담당자홈=====================================================================
	//담당자 폼 sr개발정보: 이관기관 가져오기
	public List<Inst> getInstByOutsrcY();
	
	//담당자 폼 sr개발정보: sr요청구분 가져오기
    public List<SrDmndClsf> getSrDmndClsf();
	
	//담당자 폼 sr개발정보- sr업무구분 가져오기
	public List<SrTaskClsf> getSrTaskClsf();
	
	//srRqstNo에 해당하는 sr 상세 내용 가져오기
	public Sr getSrBySrRqstNo(String SrRqstNo);
	
	//sr 상세정보에 해당하는 첨부파일 불러오기
	public List<SrAtch> getSrAtchBySrNo(String srNo);
	
	//sr첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public SrAtch getSrAtchBySrAtchNo(String srAtchNo);
	
	//sr 정보 입력하기
	public int writeSr (SrSubmit srSubmit);
	
	//최근 삽입한 sr pk 불러오기(첨부파일 등록을 위함)
	public String getAddSrPk();
	
	//sr 등록 첨부파일 업로드	
	public int uploadSrAtch(SrAtch srAtch);
	
	//최근 삽입한 이관된 sr pk불러오기(이관된 sr계획 정보 등록을 위함)
	public String getAddSrPkByTrnsf();
	
	//최근 삽입한 이관된 sr에 해당하는 sr이관계획 등록
	public int writeSrTrnsfPlan(SrTrnsfPlan srTrnsfPlan);
	
	//sr 개발정보 수정하기
	public void modifySr(SrSubmit srSubmit);
	
	//해당 sr요청에 대한 sr정보가 있는지 확인
	public int checkIfSrInformationPresent(String srRqstNo);
	
	//sr에 해당하는 sr진척률 불러오기
	public List<SrPrgrs> getSrPrgrsBySrNo(String srNo);
	
	//처리항목목록1: 승인 요청처리할 항목
	public List<SrRqst> getToDoItemOfAprvRqst(Map<String, Object> map);
	public int getTotalToDoItemOfAprvRqst();
	
	//처리항목 목록2: 승인 요청 처리할 sr
	public List<SrRqst> getToDoItemOfRcptRqst(Map<String, Object> map);
	public int getTotalToDoItemOfRcptRqst();
	
	//처리항목 목록3: 접수된 담당 sr
	public List<SrRqst> getToDoItemOfRcpt(Map<String, Object> map);
	public int getTotalToDoItemOfRcpt(Map<String, Object> map);
	
	//처리항목 목록4: 이관된 sr
	public List<SrRqst> getToDoItemOfTrnsfY(Map<String, Object> map);
	public int getTotalToDoItemOfTrnsfY(Map<String, Object> map);
	
	//처리항목 목록5: 개발 반영요청
	public List<SrRqst> getToDoItemOfApplyRqst(Map<String, Object> map);
	public int getTotalToDoItemOfApplyRqst(Map<String, Object> map);
	
	//처리항목 목록6: 계획 변경 요청
	public List<SrRqst> getToDoItemOfSchdlChg(Map<String, Object> map);
	public int getTotalToDoItemOfSchdlChg(Map<String, Object> map);
	
	//작성자: 이현주=================================================================
	//요청목록불러오기(검토자 홈)
	public List<SrRqstForReviewerHomeBoard> getSrRqstForReviewerHomeBoardListByPage(Map<String, Object> params);
	
	//상태별 요청 수(검토자 홈)
	public int getCountSrRqstBySttsNm(String srRqstSttNm);
	
	//검토자 상세모달로 SR정보 가져오기
	public SrRqstForReviewerModal getSrRqstForReviewerModal(String selectedSrRqstNo);
	
	//검토자 홈 진행현황으로 SR정보 가져오기
	public SrRqstForReviewerHomeProgress getSrRqstForReviewerHomeProgress(String selectedSrRqstNo);
	
	//진행상태 업데이트
	public void saveSrRqstStts(Map<String, String> params);
	
	//검토의견 업데이트
	public void saveSrRqstRvwRsn(Map<String, String> params);
	
	//전체 시스템 이름 가져오기
	public List<String> getTotalSysNm();
	
	//개발관리(진행상태 승인이상) 요청수 가져오기
	public int getCountSrRqstForDevelopManagement(Map<String, String> params);
	
	//개발관리(진행상태 승인이상) 목록 가져오기
	public List<SrRqstForSearchList> getSrRqstForDevelopManagementByPage(Map<String, Object> params);

	//검토관리 요청수 가져오기
	public int getCountSrRqstForReviewManagement(Map<String, String> params);
		
	//검토관리 목록 가져오기
	public List<SrRqstForSearchList> getSrRqstForReviewpManagementByPage(Map<String, Object> params);
}
