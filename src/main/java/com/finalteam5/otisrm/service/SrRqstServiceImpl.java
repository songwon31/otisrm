package com.finalteam5.otisrm.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrRqstDao;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.sr.srForPicHome.Sr;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrPrgrs;
import com.finalteam5.otisrm.dto.sr.srForPicHome.SrSubmit;
import com.finalteam5.otisrm.dto.srRequest.SrRqst;
import com.finalteam5.otisrm.dto.srRequest.SrRqstAtch;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForSearchList;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeBoard;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerHomeProgress;
import com.finalteam5.otisrm.dto.srRequest.SrRqstForReviewerModal;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.srRequest.SrRqstSubmit;
import com.finalteam5.otisrm.dto.usr.Inst;

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
	
	//sr요청 상태 목록 불러오기
	@Override
	public List<SrRqstStts> getSrRqstStts() {
		List<SrRqstStts> list = srRqstDao.selectSrRqstStts();
		return list;
	}
	
	//sr요청 삭제
	@Override
	public void removeSrRqst(String srRqstNo) {
		srRqstDao.deleteSrRqst(srRqstNo);
	}
	
	//담당자홈=====================================================================
	//담당자 폼 sr개발정보: 이관기관 가져오기
	@Override
	public List<Inst> getInstByOutsrcY() {
		List<Inst> list = srRqstDao.selectInstByOutsrcY();
		return list;
	}
	
	//담당자 폼 sr개발정보: sr요청구분 가져오기
	@Override
	public List<SrDmndClsf> getSrDmndClsf() {
		List<SrDmndClsf> list = srRqstDao.selectSrDmndClsf();
		return list;
	}
	
	//담당자 폼 sr개발정보: sr업무구분 가져오기
	@Override
	public List<SrTaskClsf> getSrTaskClsf() {
		List <SrTaskClsf> list = srRqstDao.selectSrTaskClsf();
		return list;
	}
	
	//srRqstNo에 해당하는 sr 상세 내용 가져오기
	@Override
	public Sr getSrBySrRqstNo(String SrRqstNo) {
		Sr sr = srRqstDao.selectSrBySrRqstNo(SrRqstNo);
		return sr;
	}
	
	//sr 상세정보에 해당하는 첨부파일 불러오기
	@Override
	public List<SrAtch> getSrAtchBySrNo(String srNo) {
		List<SrAtch> list = srRqstDao.selectSrAtchBySrNo(srNo);
		return list;
	}
	
	//sr첨부파일 번호에 해당하는 첨부파일 가져오기(파일 다운로드를 위함)
	@Override
	public SrAtch getSrAtchBySrAtchNo(String srAtchNo) {
		SrAtch srAtch = srRqstDao.selectSrAtchBySrAtchNo(srAtchNo);
		return srAtch;
	}
	
	//sr 정보 입력하기
	@Override
	public int writeSr(SrSubmit srSubmit) {
		int numOfInsert = srRqstDao.insertSr(srSubmit);
		return numOfInsert;
	}
	
	//최근 삽입한 sr pk 불러오기(첨부파일 등록을 위함)
	@Override
	public String getAddSrPk() {
		String pk = srRqstDao.selectAddSrPk();
		return pk;
	}
	
	//sr 등록 첨부파일 업로드	
	@Override
	public int uploadSrAtch(SrAtch srAtch) {
		int numOfInsert = srRqstDao.insertSrAtch(srAtch);
		return numOfInsert;
	}
	
	//최근 삽입한 이관된 sr pk불러오기(이관된 sr계획 정보 등록을 위함)
	@Override
	public String getAddSrPkByTrnsf() {
		String pk = srRqstDao.selectAddSrPkByTrnsf();
		return pk;
	}
	
	//최근 삽입한 이관된 sr에 해당하는 sr이관계획 등록
	@Override
	public int writeSrTrnsfPlan(SrTrnsfPlan srTrnsfPlan) {
		int numOfInsert = srRqstDao.insertSrTrnsfPlan(srTrnsfPlan);
		return numOfInsert;
	}
	
	//sr 개발정보 수정하기
	@Override
	public void modifySr(SrSubmit srSubmit) {
		srRqstDao.updateSr(srSubmit);
	}
	
	//해당 sr요청에 대한 sr정보가 있는지 확인
	@Override
	public int checkIfSrInformationPresent(String srRqstNo) {
		int numOfSrBySrRqstNo = srRqstDao.countSrInformationPresent(srRqstNo);
		return numOfSrBySrRqstNo;
	}
	
	//sr에 해당하는 sr진척률
	@Override
	public List<SrPrgrs> getSrPrgrsBySrNo(String srNo) {
		List<SrPrgrs> list = srRqstDao.selectSrPrgrsBySrNo(srNo);
		return list;
	}
	
	//처리항목목록1: 승인 요청처리할 항목
	@Override
	public List<SrRqst> getToDoItemOfAprvRqst(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfAprvRqst(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfAprvRqst() {
		int totalRows = srRqstDao.countToDoItemOfAprvRqst();
		return totalRows;
	}
	
	//처리항목 목록2: 승인 요청 처리할 sr
	@Override
	public List<SrRqst> getToDoItemOfRcptRqst(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfRcptRqst(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfRcptRqst() {
		int totalRows = srRqstDao.countToDoItemOfRcptRqst();
		return totalRows;
	}
	
	
	//처리항목 목록3: 접수된 담당sr
	@Override
	public List<SrRqst> getToDoItemOfRcpt(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfRcpt(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfRcpt(Map<String, Object> map) {
		int totalRows = srRqstDao.countToDoItemOfRcpt(map);
		return totalRows;
	}
	
	//처리항목 목록4: 이관된 sr
	@Override
	public List<SrRqst> getToDoItemOfTrnsfY(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfTrnsfY(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfTrnsfY(Map<String, Object> map) {
		int totalRows = srRqstDao.countToDoItemOfTrnsfY(map);
		return totalRows;
	}
	
	//처리항목 목록5: 개발 반영요청
	@Override
	public List<SrRqst> getToDoItemOfApplyRqst(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfApplyRqst(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfApplyRqst(Map<String, Object> map) {
		int totalRows = srRqstDao.countToDoItemOfApplyRqst(map);
		return totalRows;
	}
	
	//처리항목 목록6: 계획 변경 요청
	@Override
	public List<SrRqst> getToDoItemOfSchdlChg(Map<String, Object> map) {
		List<SrRqst> list = srRqstDao.selectToDoItemOfSchdlChg(map);
		return list;
	}
	@Override
	public int getTotalToDoItemOfSchdlChg(Map<String, Object> map) {
		int totalRows = srRqstDao.countToDoItemOfSchdlChg(map);
		return totalRows;
	}	
	
	//작성자: 이현주 =================================================================== 
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
	//개발관리 요청수 가져오기
	@Override
	public int getCountSrRqstForDevelopManagement(Map<String, String> params) {
		return srRqstDao.countSrRqstForDevelopManagement(params);
	}
	
	//개발관리 목록 가져오기
	@Override
	public List<SrRqstForSearchList> getSrRqstForDevelopManagementByPage(Map<String, Object> params) {
		return srRqstDao.selectSrRqstForDevelopManagementByPage(params);
	}

	//검토관리 요청수 가져오기
	@Override
	public int getCountSrRqstForReviewManagement(Map<String, String> params) {
		return srRqstDao.countSrRqstForReviewManagement(params);
	}
	
	//검토관리 목록 가져오기
	@Override
	public List<SrRqstForSearchList> getSrRqstForReviewpManagementByPage(Map<String, Object> params) {
		return srRqstDao.selectSrRqstForReviewManagementByPage(params);
	}
	

}
