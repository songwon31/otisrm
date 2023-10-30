package com.finalteam5.otisrm.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;

@Mapper
public interface SrRqstDao {
	//작성자: 성유진
	//요청등록폼
	//개발부서에 따른 관련시스템 불러오기
	public List<Sys> selectSysByDeptNo(String deptNo);	
	//요청등록하기
	public int insertSrRqst(SrRqst srRqst);
	
	//요청목록 불러오기
	//페이지별로 요청 불러오기(고객사 홈)
	public List<SrRqst> selectSrRqstListByPage(Map<String, Object> map);
	//전체 요청 수
	public int countSrRqst();
	
	//요청에 해당하는 상세 정보 불러오기
	public SrRqst selectSrRqstBySrRqstNo(String srRqstNo);
	
	//등록한 요청 수정하기
	public void updateSrRqst(String srRqstNo);
	
	//작성자: 이현주
	//페이지별로 요청 불러오기(검토자 홈)
	public List<SrRqstForReviewerHomeBoard> selectSrRqstForReviewerHomeBoardListByPage(Pager pager);
	
	//전체 시스템 이름 가져오기
	public List<String> selectTotalSysNm();
}