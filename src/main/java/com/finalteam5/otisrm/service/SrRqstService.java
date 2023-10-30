package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;

public interface SrRqstService {	
	//작성자: 성유진
	//요청등록폼
	//개발부서에 따른 관련시스템 불러오기
	public List<Sys> getSysByDeptNo(String deptNo);
	//요청등록하기
	public int writeSrRqst(SrRqst srRqst);

	//요청목록불러오기
	public List<SrRqst> getSrRqstListByPager(Map<String, Object> map);
	//전체 요청 수
	public int totalSrRqst();
	

	//요청에 해당하는 상세 정보 불러오기
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo);

	//등록한 요청 수정하기
	public void modifySrRqst(String srRqstNo);
    
	
	//작성자: 이현주
	//요청목록불러오기(검토자 홈)
	public List<SrRqstForReviewerHomeBoard> getSrRqstForReviewerHomeBoardListByPage(Pager pager);
	
	//전체 시스템 이름 가져오기
	public List<String> getTotalSysNm();
}
