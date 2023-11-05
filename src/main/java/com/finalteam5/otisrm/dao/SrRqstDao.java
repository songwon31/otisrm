package com.finalteam5.otisrm.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;

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
	
	//작성자: 이현주
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
	
}