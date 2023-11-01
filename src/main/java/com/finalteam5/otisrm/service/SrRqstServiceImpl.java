package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrRqstDao;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SrRqstServiceImpl implements SrRqstService{
	@Autowired
	private SrRqstDao srRqstDao;
	
	//작성자: 성유진 
	//개발부서에 따른 관련시스템 불러오기
	@Override
	public List<Sys> getSysByDeptNo(String deptNo) {
		List<Sys> list = srRqstDao.selectSysByDeptNo(deptNo);
		return list;
	}
	//sr요청등록하기
	@Override
	public int writeSrRqst(SrRqstSubmit srRqstSubmit) {
		int numOfInsert = srRqstDao.insertSrRqst(srRqstSubmit);
		return numOfInsert;
	}
	//sr요청 첨부파일 업로드
	@Override
	public int uploadSrRqstAtch(SrRqstAtch srRqstAtch) {
		int numOfInsert = srRqstDao.insertSrRqstAtch(srRqstAtch);
		return numOfInsert;
	}
	
	//삽입한 요청 PK가져오기(첨부파일 업로드를 위함)
	@Override
	public String getAddSrRqstPk() {
		String addSrRqstPk = srRqstDao.selectAddSrRqstPk();
		return addSrRqstPk;
	}
	
	//sr요청목록 불러오기
	@Override
	public List<SrRqst> getSrRqstListByPager(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectSrRqstListByPage(map);
		return list;
	}
	//전체 sr요청 수
	@Override
	public int totalSrRqst() {
		int NumOfTotalSrRqst = srRqstDao.countSrRqst();
		return NumOfTotalSrRqst;
	}
	//sr요청에 해당하는 상세 요청
	@Override
	public SrRqst getSrRqstBySrRqstNo(String srRqstNo) {
		SrRqst srRqst = srRqstDao.selectSrRqstBySrRqstNo(srRqstNo);
		return srRqst;
	}
	
	//sr요청 상세 정보에 해당하는 첨부파일 불러오기
	@Override
	public List<SrRqstAtch> getSrRqstAtchBySrRqstNo(String srRqstNo) {
		List<SrRqstAtch> list = srRqstDao.selectSrRqstAtchBySrRqstNo(srRqstNo);
		return list;
	}
	
	@Override
	public SrRqstAtch getSrRqstAtchBySrRqstAtchNo(String srRqstAtchNo) {
		SrRqstAtch srRqstAtch = srRqstDao.selectSrRqstAtchBySrRqstAtchNo(srRqstAtchNo);
		return srRqstAtch;
	}
	
	//등록한 sr요청 수정하기
	@Override
	public void modifySrRqst(SrRqstSubmit srRqstSubmit) {
		srRqstDao.updateSrRqst(srRqstSubmit);
	}
	
	//작성자: 이현주 
	//요청목록 불러오기(검토자 홈)
	@Override
	public List<SrRqstForReviewerHomeBoard> getSrRqstForReviewerHomeBoardListByPage(Map<String, Object> params) {
		return srRqstDao.selectSrRqstForReviewerHomeBoardListByPage(params);
	}
	//상태별 요청수
	@Override
	public int getCountSrRqstBySttsNm(String srRqstSttNm) {
		return srRqstDao.countSrRqstBySttsNm(srRqstSttNm);
	}
	
	//전체 시스템 이름 가져오기
	@Override
	public List<String> getTotalSysNm() {
		return srRqstDao.selectTotalSysNm();
	}
	
}
