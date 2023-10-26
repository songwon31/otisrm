package com.finalteam5.otisrm.service;

import java.util.List;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;

public interface SrRqstService {
	//요청등록폼
	//개발부서에 따른 관련시스템 불러오기
	public List<Sys> getSysByDeptNo(String deptNo);
	public int writeSrRqst(SrRqst srRqst);
}
