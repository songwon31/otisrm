package com.finalteam5.otisrm.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForDevelopManagement;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;

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
    
	
	//작성자: 이현주
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
	
	//개발관리 진행상태 승인이상 요청수 가져오기
	public int getCountSrRqstForDevelopManagement(Map<String, String> params);
	
	//개발관리 목록 가져오기
		public List<SrRqstForDevelopManagement> getSrRqstForDevelopManagementByPage(Map<String, Object> params);

}
