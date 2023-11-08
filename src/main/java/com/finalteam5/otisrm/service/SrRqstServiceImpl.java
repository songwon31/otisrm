package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrRqstDao;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForDevelopManagement;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
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
	public int totalSrRqst(Map<String, Object> map) {
		int NumOfTotalSrRqst = srRqstDao.countSrRqst(map);
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
	
	@Override
	public List<SrRqstStts> getSrRqstStts() {
		List<SrRqstStts> list = srRqstDao.selectSrRqstStts();
		return list;
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
	
	//검토자 상세모달로 SR정보 가져오기
	@Override
	public SrRqstForReviewerModal getSrRqstForReviewerModal(String selectedSrRqstNo) {
		return srRqstDao.selectSrRqstForReviewerModal(selectedSrRqstNo);
	}
	
	//검토자 홈 진행현황으로 SR정보 가져오기
	@Override
	public SrRqstForReviewerHomeProgress getSrRqstForReviewerHomeProgress(String selectedSrRqstNo) {
		return srRqstDao.selectSrRqstForReviewerHomeProgress(selectedSrRqstNo);
	}
	
	//진행상태 업데이트
	@Override
	public void saveSrRqstStts(Map<String, String> params) {
		srRqstDao.updateSrRqstStts(params);
	}
	
	//검토의견 업데이트
	@Override
	public void saveSrRqstRvwRsn(Map<String, String> params) {
		srRqstDao.updateSrRqstRvwRsn(params);
	}
	
	//전체 시스템 이름 가져오기
	@Override
	public List<String> getTotalSysNm() {
		return srRqstDao.selectTotalSysNm();
	}
	
	//개발관리 진행상태 승인이상 요청수 가져오기
	@Override
	public int getCountSrRqstForDevelopManagement(Map<String, String> params) {
		return srRqstDao.countSrRqstForDevelopManagement(params);
	}
	
	//개발관리 목록 가져오기
	@Override
	public List<SrRqstForDevelopManagement> getSrRqstForDevelopManagementByPage(Map<String, Object> params) {
		return srRqstDao.selectSrRqstForDevelopManagementByPage(params);
	}

}
