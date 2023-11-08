package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.usr.Inst;

@Mapper
public interface InstDao {
	public int countInst();
	
	//외부업체 제외 기관목록 가져오기
	public List<Inst> selectNoOutsrcInstList();
}
