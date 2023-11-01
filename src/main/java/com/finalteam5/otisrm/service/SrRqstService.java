package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
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
	public int totalSrRqst();

	//sr요청에 해당하는 상세 정보 불러오기
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo);
	
	//sr요청 상세정보에 해당하는 첨부파일 불러오기
	public List<SrRqstAtch> getSrRqstAtchBySrRqstNo(String srRqstNo);
	
	//sr첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	public SrRqstAtch getSrRqstAtchBySrRqstAtchNo(String srRqstAtchNo);
	
	//등록한 sr요청 수정하기
	public void modifySrRqst(SrRqstSubmit srRqstSubmit);
    
	
	//작성자: 이현주
	//요청목록불러오기(검토자 홈)
	public List<SrRqstForReviewerHomeBoard> getSrRqstForReviewerHomeBoardListByPage(Pager pager);
	
	//전체 시스템 이름 가져오기
	public List<String> getTotalSysNm();
}
