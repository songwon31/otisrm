package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;

public interface SrRqstService {
	//요청등록폼
	//개발부서에 따른 관련시스템 불러오기
	public List<Sys> getSysByDeptNo(String deptNo);
	//요청등록하기
	public int writeSrRqst(SrRqst srRqst);

	//요청목록불러오기
	public List<SrRqst> getSrRqstListByPager(Map<String, Object> map);
	//전체 요청 수
	public int totalSrRqst();
}
