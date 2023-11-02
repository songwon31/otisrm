package com.finalteam5.otisrm.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrDao;
import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrPrgrsPicForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalUsrInfo;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class SrServiceImpl implements SrService{
	@Autowired
	private SrDao srDao;
	
	@Override
	public int getTotalTransferedSrNumByUsrId(String usrId) {
		return srDao.countTotalTransferedSrNumByUsrId(usrId);
	}
	
	@Override
	public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrId(String usrId) {
		return srDao.selectSrForDeveloperHomeBoardListByUsrId(usrId);
	}
	
	@Override
	public List<SrForDeveloperHomeBoard> getSrForDeveloperHomeBoardListByUsrIdAndPager(String usrId, Pager pager) {
		return srDao.selectSrForDeveloperHomeBoardListByUsrIdAndPager(usrId, pager);
	}
	
	@Override
	public SrTrnsfInfoForDeveloperHome getSrTrnsfInfoForDeveloperHome(String srNo) {
		SrTrnsfInfoForDeveloperHome srTrnsfInfoForDeveloperHome = srDao.selectSrTrnsfInfoForDeveloperHomeBySrNo(srNo);
		List<SrPrgrsForDeveloperHome> srPrgrsList = srDao.selectSrPrgrsForDeveloperHomeList(srNo);
		srTrnsfInfoForDeveloperHome.setSrPrgrsList(srPrgrsList);
		List<SrPrgrsPicForDeveloperHome> srPrgrsHrList = new ArrayList<SrPrgrsPicForDeveloperHome>();
		for (SrPrgrsForDeveloperHome srPrgrsForDeveloperHome : srPrgrsList) {
			String currentUsrNo = srPrgrsForDeveloperHome.getUsrNo();
			boolean isUsrExist = false;
			for (SrPrgrsPicForDeveloperHome srPrgrsPicForDeveloperHome : srPrgrsHrList) {
				//이미 등록된 사용자일 경우 담당 작업 추가
				if (currentUsrNo.equals(srPrgrsPicForDeveloperHome.getUsrNo())) {
					srPrgrsPicForDeveloperHome.getSttsList().add(srPrgrsForDeveloperHome.getSrPrgrsSttsNm());
					isUsrExist = true;
				}
			}
			//처음 등록되는 사용자일 경우 SrPrgrsPicForDeveloperHome 객체 생성하여 추가
			if (isUsrExist == false) {
				SrPrgrsPicForDeveloperHome srPrgrsPicForDeveloperHome = new SrPrgrsPicForDeveloperHome();
				srPrgrsPicForDeveloperHome.setUsrNo(srPrgrsForDeveloperHome.getUsrNo());
				srPrgrsPicForDeveloperHome.setUsrNm(srPrgrsForDeveloperHome.getUsrNm());
				srPrgrsPicForDeveloperHome.setRoleNm(srPrgrsForDeveloperHome.getRoleNm());
				List<String> sttsList = new ArrayList<String>();
				sttsList.add(srPrgrsForDeveloperHome.getSrPrgrsSttsNm());
				srPrgrsPicForDeveloperHome.setSttsList(sttsList);
				srPrgrsHrList.add(srPrgrsPicForDeveloperHome);
			}
		}
		srTrnsfInfoForDeveloperHome.setSrPrgrsHrList(srPrgrsHrList);
		
		return srTrnsfInfoForDeveloperHome;
	}
	
	@Override
	public SrRequestDetailForDeveloperHome getSrRequestDetailForDeveloperHome(String srNo) {
		return srDao.selectSrRequestDetailForDeveloperHome(srNo);
	}
	
	@Override
	public SrTableElementsForDeveloperHome getSrTableElementsForDeveloperHome(String usrId, String srPrgrsSttsNo, int page) {
		SrTableElementsForDeveloperHome srTableElementsForDeveloperHome = new SrTableElementsForDeveloperHome();
		srTableElementsForDeveloperHome.setTableFilter(srPrgrsSttsNo);
		
		if (srPrgrsSttsNo.equals("TOTAL")) {
			srPrgrsSttsNo = null;
		}
		
		List<SrForDeveloperHomeBoard> totalFilteredSrList = srDao.selectSrListForDeveloperHomeBoardByUsrIdAndStts(usrId, srPrgrsSttsNo);
		Pager pager = new Pager(5, 5, totalFilteredSrList.size(), page);
		srTableElementsForDeveloperHome.setPager(pager);
		List<SrForDeveloperHomeBoard> srList = srDao.selectSrListForDeveloperHomeBoardByUsrIdAndSttsAndPager(usrId, srPrgrsSttsNo, pager);
		srTableElementsForDeveloperHome.setSrList(srList);
		
		List<SrForDeveloperHomeBoard> totalSrList = srDao.selectSrForDeveloperHomeBoardListByUsrId(usrId);
		
		int totalNum = totalSrList.size();
		int requestNum = 0;
		int analysisNum = 0;
		int designNum = 0;
		int implementNum = 0;
		int testNum = 0;
		int applyNum = 0;
		for (SrForDeveloperHomeBoard sr : totalSrList) {
			if (sr.getSrPrgrsSttsNm().equals("요청")) {
				requestNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("분석")) {
				analysisNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("설계")) {
				designNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("구현")) {
				implementNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("시험")) {
				testNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("반영요청")) {
				applyNum++;
			}
		}
		srTableElementsForDeveloperHome.setTotalNum(totalNum);
		srTableElementsForDeveloperHome.setRequestNum(requestNum);
		srTableElementsForDeveloperHome.setAnalysisNum(analysisNum);
		srTableElementsForDeveloperHome.setDesignNum(designNum);
		srTableElementsForDeveloperHome.setImplementNum(implementNum);
		srTableElementsForDeveloperHome.setTestNum(testNum);
		srTableElementsForDeveloperHome.setApplyNum(applyNum);
		
		return srTableElementsForDeveloperHome;
	}
	
	//SR계획정보 모달 구성
	@Override
	public SrTrnsfPlanModalCompose getSrTrnsfPlanModalComposeBySrNoAndUsrId(String usrId, String srNo) {
		return  srDao.getCurrentSrTrnsfPlanInfo(srNo);
	}
	
	//담당자 선택 dept select 구성
	@Override
	public List<Dept> getDeptListByUsrId(String usrId) {
		return srDao.selectDeptListByUsrId(usrId);
	}
	
	//담당자 선택 모달 구성
	@Override
	public SrTrnsfFindPicModalCompose getSrTrnsfFindPicModalCompose(String usrId, String deptNo, String usrNm, int pageNo) {
		SrTrnsfFindPicModalCompose srTrnsfFindPicModalCompose = new SrTrnsfFindPicModalCompose();
		int totalUsrNum = srDao.countSrTrnsfFindPicModalCompose(usrId, deptNo, usrNm);
		Pager pager = new Pager(5, 5, totalUsrNum, pageNo);
		log.info(""+pager);
		List<SrTrnsfFindPicModalUsrInfo> usrList = srDao.selectSrTrnsfFindPicModalCompose(usrId, deptNo, usrNm, pager);
		srTrnsfFindPicModalCompose.setPager(pager);
		srTrnsfFindPicModalCompose.setUsrList(usrList);
		return srTrnsfFindPicModalCompose;
	}
}
