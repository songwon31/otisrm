package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;

@Mapper
public interface SrRqstDao {
	public int countSrRqst();
	//요청등록폼
	//개발부서에 따른 관련시스템 불러오기
	public List<Sys> selectSysByDeptNo(String deptNo);	
	//요청등록하기
	public int insertSrRqst(SrRqst srRqst);
}
