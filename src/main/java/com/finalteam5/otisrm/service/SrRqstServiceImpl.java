package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrRqstDao;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SrRqstServiceImpl implements SrRqstService{
	@Autowired
	private SrRqstDao srRqstDao;
	
	//개발부서에 따른 관련시스템 불러오기
	@Override
	public List<Sys> getSysByDeptNo(String deptNo) {
		List<Sys> list = srRqstDao.selectSysByDeptNo(deptNo);
		return list;
	}
	//요청등록하기
	@Override
	public int writeSrRqst(SrRqst srRqst) {
		int numOfInsert = srRqstDao.insertSrRqst(srRqst);
		return numOfInsert;
	}
	//요청목록 불러오기
	@Override
	public List<SrRqst> getSrRqstListByPager(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectSrRqstListByPage(map);
		return list;
	}
	//전체 요청 수
	@Override
	public int totalSrRqst() {
		int NumOfTotalSrRqst = srRqstDao.countSrRqst();
		return NumOfTotalSrRqst;
	}
	
}
