package com.finalteam5.otisrm.service;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam5.otisrm.dao.SrDao;
import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrPrgrs;
import com.finalteam5.otisrm.dto.SrPrgrsOtpt;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearch;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearchCompose;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrForProgressManagementBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForm;
import com.finalteam5.otisrm.dto.sr.SrPrgrsPicForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableConfigForProgressManagement;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalUsrInfo;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPrgrsPic;
import com.finalteam5.otisrm.dto.sr.SrTrnsfSetHrModalCompose;
import com.finalteam5.otisrm.dto.usr.Dept;

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
		//요청 상태인지 확인
		String status = srDao.checkStatusBySrNo(srNo);
		
		if (status.equals("RQST")) {
			return srDao.selectSrTrnsfInfoForDeveloperHomeBySrNoRqst(srNo);
		} else {
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
		int receiptNum = 0;
		int designNum = 0;
		int implementNum = 0;
		int testNum = 0;
		int applyNum = 0;
		for (SrForDeveloperHomeBoard sr : totalSrList) {
			if (sr.getSrPrgrsSttsNm().equals("요청")) {
				requestNum++;
			} else if (sr.getSrPrgrsSttsNm().equals("접수")) {
				receiptNum++;
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
		srTableElementsForDeveloperHome.setReceiptNum(receiptNum);
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
		//요청 상태인지 확인
		String status = srDao.checkStatusBySrNo(srNo);
		
		if (status.equals("RQST")) {
			return srDao.getCurrentSrTrnsfPlanInfoRqst(srNo);
		} else {
			return  srDao.getCurrentSrTrnsfPlanInfo(srNo);
		}
		
		
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
		List<SrTrnsfFindPicModalUsrInfo> usrList = srDao.selectSrTrnsfFindPicModalCompose(usrId, deptNo, usrNm, pager);
		srTrnsfFindPicModalCompose.setPager(pager);
		srTrnsfFindPicModalCompose.setUsrList(usrList);
		return srTrnsfFindPicModalCompose;
	}
	
	//sr이관 계획 정보 수정
	@Override
	public int editSrTrnsfPlan(SrTrnsfPlanForm srTrnsfPlanForm) {
		SrTrnsfPlan srTrnsfPlan = new SrTrnsfPlan();
		srTrnsfPlan.setSrNo(srTrnsfPlanForm.getSrNo());
		srTrnsfPlan.setDeptNo(srDao.selectDeptNoByDeptNmAndSrNo(srTrnsfPlanForm.getDeptNm(), srTrnsfPlanForm.getSrNo()));
		srTrnsfPlan.setUsrNo(srDao.selectUsrNoByUsrNm(srTrnsfPlanForm.getUsrNm()));
		
		 // SimpleDateFormat을 사용하여 문자열을 Date로 변환
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        
        try {
        	srTrnsfPlan.setSrTrgtBgngDt(dateFormat.parse(srTrnsfPlanForm.getSrTrgtBgngDt()));
        	srTrnsfPlan.setSrTrgtCmptnDt(dateFormat.parse(srTrnsfPlanForm.getSrTrgtCmptnDt()));
        } catch(Exception e) {
        	e.printStackTrace();
        }
        srTrnsfPlan.setSrTrnsfNote(srTrnsfPlanForm.getSrTrnsfNote());
        
        //sr 이관 상태가 요청이었을 경우 필수 내용이 모두 들어가면 '접수'상태로 변경하면서 prgrs row들 생성
        //요청 상태인지 확인
      	String status = srDao.checkStatusBySrNo(srTrnsfPlanForm.getSrNo());
      	if (status.equals("RQST")) {
      		if (srTrnsfPlanForm.getDeptNm() != null && !srTrnsfPlanForm.getDeptNm().equals("") 
      			&& srTrnsfPlanForm.getUsrNm() != null && !srTrnsfPlanForm.getUsrNm().equals("")
      			&& srTrnsfPlanForm.getSrTrgtBgngDt() != null && !srTrnsfPlanForm.getSrTrgtBgngDt().equals("")
      			&& srTrnsfPlanForm.getSrTrgtCmptnDt() != null && !srTrnsfPlanForm.getSrTrgtCmptnDt().equals("")) {
      			srDao.insertAnalysisPrgrs(srTrnsfPlanForm.getSrNo());
      			srDao.insertDesignPrgrs(srTrnsfPlanForm.getSrNo());
      			srDao.insertImplementPrgrs(srTrnsfPlanForm.getSrNo());
      			srDao.insertTestPrgrs(srTrnsfPlanForm.getSrNo());
      			srDao.insertApplyRequestPrgrs(srTrnsfPlanForm.getSrNo());
      			srDao.updateSttsToReceipt(srTrnsfPlanForm.getSrNo());
      		}
      	}
        
		return srDao.updateSrTrnsfPlan(srTrnsfPlan);
	}
	
	//sr HR 선택 모달 구성
	@Override
	public SrTrnsfSetHrModalCompose getSrTrnsfSetHrModalCompose(String srNo) {
		SrTrnsfSetHrModalCompose srTrnsfSetHrModalCompose = new SrTrnsfSetHrModalCompose();
		srTrnsfSetHrModalCompose.setDeptNm(srDao.selectDeptNmBySrNo(srNo));
		srTrnsfSetHrModalCompose.setAnalysisPicNm(srDao.selectAnalysisPicNm(srNo));
		srTrnsfSetHrModalCompose.setDesignPicNm(srDao.selectDesignPicNm(srNo));
		srTrnsfSetHrModalCompose.setImplementPicNm(srDao.selectImplementPicNm(srNo));
		srTrnsfSetHrModalCompose.setTestPicNm(srDao.selectTestPicNm(srNo));
		srTrnsfSetHrModalCompose.setApplyRequestPicNm(srDao.selectApplyRequestPicNm(srNo));
		return srTrnsfSetHrModalCompose;
	}
	
	//HR pic 선택 모달 구성
	@Override
	public String getDeptNoByDeptNm(String deptNm, String srNo) {
		return srDao.selectDeptNoByDeptNmAndSrNo(deptNm, srNo);
	}
	
	//HR PIC 업데이트
	@Override
	public int updateSrPrgrs(SrTrnsfPrgrsPic srTrnsfPrgrsPic) {
		if (srTrnsfPrgrsPic.getAnalysisPicNm() != null) {
			srDao.updateAnalysisPicNm(srTrnsfPrgrsPic.getSrNo(), srTrnsfPrgrsPic.getAnalysisPicNm());
		}
		if (srTrnsfPrgrsPic.getDesignPicNm() != null) {
			srDao.updateDesignPicNm(srTrnsfPrgrsPic.getSrNo(), srTrnsfPrgrsPic.getDesignPicNm());
		}
		if (srTrnsfPrgrsPic.getImplementPicNm() != null) {
			srDao.updateImplementPicNm(srTrnsfPrgrsPic.getSrNo(), srTrnsfPrgrsPic.getImplementPicNm());
		}
		if (srTrnsfPrgrsPic.getTestPicNm() != null) {
			srDao.updateTestPicNm(srTrnsfPrgrsPic.getSrNo(), srTrnsfPrgrsPic.getTestPicNm());
		}
		if (srTrnsfPrgrsPic.getApplyRequestPicNm() != null) {
			srDao.updateApplyRequestPicNm(srTrnsfPrgrsPic.getSrNo(), srTrnsfPrgrsPic.getApplyRequestPicNm());
		}
		
		return 1;
	}
	
	//SR 이관 진행률 업데이트
	@Override
	public int updateSrTrnsfPrgrs(SrPrgrsForm srPrgrsForm) {
		SrPrgrsForm pastSrPrgrsForm = new SrPrgrsForm();
		pastSrPrgrsForm.setAnalysisPrgrs(srDao.selectAnalysisPrgrs(srPrgrsForm.getSrNo()));
		pastSrPrgrsForm.setDesignPrgrs(srDao.selectDesignPrgrs(srPrgrsForm.getSrNo()));
		pastSrPrgrsForm.setImplementPrgrs(srDao.selectImplementPrgrs(srPrgrsForm.getSrNo()));
		pastSrPrgrsForm.setTestPrgrs(srDao.selectTestPrgrs(srPrgrsForm.getSrNo()));
		pastSrPrgrsForm.setApplyRequestPrgrs(srDao.selectApplyRequestPrgrs(srPrgrsForm.getSrNo()));
		
		log.info(""+pastSrPrgrsForm);
		log.info(""+srPrgrsForm);
		
		//Analysis
		if (srPrgrsForm.getAnalysisPrgrs() != null) {
			SrPrgrs analysisSrPrgrs = new SrPrgrs();
			analysisSrPrgrs.setSrPrgrsNo(srPrgrsForm.getSrNo() + "_analysis");
			//기존값이 존재하지 않았을 경우
			if (pastSrPrgrsForm.getAnalysisPrgrs() == null) {
				//새로운 값이 0초과 10 미만이라면
				if (0 < srPrgrsForm.getAnalysisPrgrs() && srPrgrsForm.getAnalysisPrgrs() < 10) {
					//작업 시작일을 오늘로 지정
					analysisSrPrgrs.setSrPrgrsBgngDt(new Date());
					//진행도를 새로운 값으로 갱신
					analysisSrPrgrs.setSrPrgrs(srPrgrsForm.getAnalysisPrgrs());
					srDao.updateSrPrgrs(analysisSrPrgrs);
					return 1;
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getAnalysisPrgrs() == 10) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					analysisSrPrgrs.setSrPrgrsBgngDt(new Date());
					analysisSrPrgrs.setSrPrgrsCmptnDt(new Date());
					analysisSrPrgrs.setSrPrgrs(srPrgrsForm.getAnalysisPrgrs());
					srDao.updateSrPrgrs(analysisSrPrgrs);
				}
				srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "ANALYSIS");
			//기본값이 존재했을 경우
			} else if (0 < pastSrPrgrsForm.getAnalysisPrgrs() && pastSrPrgrsForm.getAnalysisPrgrs() < 10) {
				//새로운 값이 기존값보다 클 경우
				if (pastSrPrgrsForm.getAnalysisPrgrs() < srPrgrsForm.getAnalysisPrgrs()) {
					//새로운 값이 최대값일 경우
					if (srPrgrsForm.getAnalysisPrgrs() == 10) {
						//오늘을 작업 완료일로 지정하고 진행도를 최대값으로 갱신
						analysisSrPrgrs.setSrPrgrsCmptnDt(new Date());
						analysisSrPrgrs.setSrPrgrs(srPrgrsForm.getAnalysisPrgrs());
						srDao.updateSrPrgrs(analysisSrPrgrs);
					} else {
						//진행도만 현재 진행도로 갱신
						analysisSrPrgrs.setSrPrgrs(srPrgrsForm.getAnalysisPrgrs());
						srDao.updateSrPrgrs(analysisSrPrgrs);
					}
				}
			}
		}
		
		//Design
		if (srPrgrsForm.getDesignPrgrs() != null) {
			SrPrgrs designSrPrgrs = new SrPrgrs();
			designSrPrgrs.setSrPrgrsNo(srPrgrsForm.getSrNo() + "_design");
			//기존값이 존재하지 않았을 경우
			if (pastSrPrgrsForm.getDesignPrgrs() == null) {
				//새로운 값이 10초과 20 미만이라면
				if (10 < srPrgrsForm.getDesignPrgrs() && srPrgrsForm.getDesignPrgrs() < 20) {
					//작업 시작일을 오늘로 지정
					designSrPrgrs.setSrPrgrsBgngDt(new Date());
					//진행도를 새로운 값으로 갱신
					designSrPrgrs.setSrPrgrs(srPrgrsForm.getDesignPrgrs());
					srDao.updateSrPrgrs(designSrPrgrs);
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getDesignPrgrs() == 20) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					designSrPrgrs.setSrPrgrsBgngDt(new Date());
					designSrPrgrs.setSrPrgrsCmptnDt(new Date());
					designSrPrgrs.setSrPrgrs(srPrgrsForm.getDesignPrgrs());
					srDao.updateSrPrgrs(designSrPrgrs);
				}
				srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "DESIGN");
			//기본값이 존재했을 경우
			} else if (10 < pastSrPrgrsForm.getDesignPrgrs() && pastSrPrgrsForm.getDesignPrgrs() < 20) {
				//새로운 값이 기존값보다 클 경우
				if (pastSrPrgrsForm.getDesignPrgrs() < srPrgrsForm.getDesignPrgrs()) {
					//새로운 값이 최대값일 경우
					if (srPrgrsForm.getDesignPrgrs() == 20) {
						//오늘을 작업 완료일로 지정하고 진행도를 최대값으로 갱신
						designSrPrgrs.setSrPrgrsCmptnDt(new Date());
						designSrPrgrs.setSrPrgrs(srPrgrsForm.getDesignPrgrs());
						srDao.updateSrPrgrs(designSrPrgrs);
					} else {
						//진행도만 현재 진행도로 갱신
						designSrPrgrs.setSrPrgrs(srPrgrsForm.getDesignPrgrs());
						srDao.updateSrPrgrs(designSrPrgrs);
					}
				}
			}
		}
			
		//Implement
		if (srPrgrsForm.getImplementPrgrs() != null) {
			SrPrgrs implementSrPrgrs = new SrPrgrs();
			implementSrPrgrs.setSrPrgrsNo(srPrgrsForm.getSrNo() + "_implement");
			//기존값이 존재하지 않았을 경우
			if (pastSrPrgrsForm.getImplementPrgrs() == null) {
				//새로운 값이 20초과 70 미만이라면
				if (20 < srPrgrsForm.getImplementPrgrs() && srPrgrsForm.getImplementPrgrs() < 70) {
					//작업 시작일을 오늘로 지정
					implementSrPrgrs.setSrPrgrsBgngDt(new Date());
					//진행도를 새로운 값으로 갱신
					implementSrPrgrs.setSrPrgrs(srPrgrsForm.getImplementPrgrs());
					srDao.updateSrPrgrs(implementSrPrgrs);	
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getImplementPrgrs() == 70) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					implementSrPrgrs.setSrPrgrsBgngDt(new Date());
					implementSrPrgrs.setSrPrgrsCmptnDt(new Date());
					implementSrPrgrs.setSrPrgrs(srPrgrsForm.getImplementPrgrs());
					srDao.updateSrPrgrs(implementSrPrgrs);
				}
				srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "IMPLEMENT");
			//기본값이 존재했을 경우
			} else if (20 < pastSrPrgrsForm.getImplementPrgrs() && pastSrPrgrsForm.getImplementPrgrs() < 70) {
				//새로운 값이 기존값보다 클 경우
				if (pastSrPrgrsForm.getImplementPrgrs() < srPrgrsForm.getImplementPrgrs()) {
					//새로운 값이 최대값일 경우
					if (srPrgrsForm.getImplementPrgrs() == 70) {
						//오늘을 작업 완료일로 지정하고 진행도를 최대값으로 갱신
						implementSrPrgrs.setSrPrgrsCmptnDt(new Date());
						implementSrPrgrs.setSrPrgrs(srPrgrsForm.getImplementPrgrs());
						srDao.updateSrPrgrs(implementSrPrgrs);
					} else {
						//진행도만 현재 진행도로 갱신
						implementSrPrgrs.setSrPrgrs(srPrgrsForm.getImplementPrgrs());
						srDao.updateSrPrgrs(implementSrPrgrs);
					}
				}
			}
		}
		
		//Test
		if (srPrgrsForm.getTestPrgrs() != null) {
			SrPrgrs testSrPrgrs = new SrPrgrs();
			testSrPrgrs.setSrPrgrsNo(srPrgrsForm.getSrNo() + "_test");
			//기존값이 존재하지 않았을 경우
			if (pastSrPrgrsForm.getTestPrgrs() == null) {
				//새로운 값이 70초과 90 미만이라면
				if (70 < srPrgrsForm.getTestPrgrs() && srPrgrsForm.getTestPrgrs() < 90) {
					//작업 시작일을 오늘로 지정
					testSrPrgrs.setSrPrgrsBgngDt(new Date());
					//진행도를 새로운 값으로 갱신
					testSrPrgrs.setSrPrgrs(srPrgrsForm.getTestPrgrs());
					srDao.updateSrPrgrs(testSrPrgrs);
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getTestPrgrs() == 90) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					testSrPrgrs.setSrPrgrsBgngDt(new Date());
					testSrPrgrs.setSrPrgrsCmptnDt(new Date());
					testSrPrgrs.setSrPrgrs(srPrgrsForm.getTestPrgrs());
					srDao.updateSrPrgrs(testSrPrgrs);
				}
				srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "TEST");
			//기본값이 존재했을 경우
			} else if (70 < pastSrPrgrsForm.getTestPrgrs() && pastSrPrgrsForm.getTestPrgrs() < 90) {
				//새로운 값이 기존값보다 클 경우
				if (pastSrPrgrsForm.getTestPrgrs() < srPrgrsForm.getTestPrgrs()) {
					//새로운 값이 최대값일 경우
					if (srPrgrsForm.getTestPrgrs() == 90) {
						//오늘을 작업 완료일로 지정하고 진행도를 최대값으로 갱신
						testSrPrgrs.setSrPrgrsCmptnDt(new Date());
						testSrPrgrs.setSrPrgrs(srPrgrsForm.getTestPrgrs());
						srDao.updateSrPrgrs(testSrPrgrs);
					} else {
						//진행도만 현재 진행도로 갱신
						testSrPrgrs.setSrPrgrs(srPrgrsForm.getTestPrgrs());
						srDao.updateSrPrgrs(testSrPrgrs);
					}
				}
			}
		}
		
		//Apply Request
		if (srPrgrsForm.getApplyRequestPrgrs() != null) {
			SrPrgrs applyRequestSrPrgrs = new SrPrgrs();
			applyRequestSrPrgrs.setSrPrgrsNo(srPrgrsForm.getSrNo() + "_apply_request");
			//기존값이 존재하지 않았을 경우
			if (pastSrPrgrsForm.getApplyRequestPrgrs() == null) {
				//새로운 값이 90초과 100 미만이라면
				if (90 < srPrgrsForm.getApplyRequestPrgrs() && srPrgrsForm.getApplyRequestPrgrs() < 100) {
					//작업 시작일을 오늘로 지정
					applyRequestSrPrgrs.setSrPrgrsBgngDt(new Date());
					//진행도를 새로운 값으로 갱신
					applyRequestSrPrgrs.setSrPrgrs(srPrgrsForm.getApplyRequestPrgrs());
					srDao.updateSrPrgrs(applyRequestSrPrgrs);
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getApplyRequestPrgrs() == 100) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					applyRequestSrPrgrs.setSrPrgrsBgngDt(new Date());
					applyRequestSrPrgrs.setSrPrgrsCmptnDt(new Date());
					applyRequestSrPrgrs.setSrPrgrs(srPrgrsForm.getApplyRequestPrgrs());
					srDao.updateSrPrgrs(applyRequestSrPrgrs);
				}
				srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "APPLY_REQUEST");
			//기본값이 존재했을 경우
			} else if (90 < pastSrPrgrsForm.getApplyRequestPrgrs() && pastSrPrgrsForm.getApplyRequestPrgrs() < 100) {
				//새로운 값이 기존값보다 클 경우
				if (pastSrPrgrsForm.getApplyRequestPrgrs() < srPrgrsForm.getApplyRequestPrgrs()) {
					//새로운 값이 최대값일 경우
					if (srPrgrsForm.getApplyRequestPrgrs() == 100) {
						//오늘을 작업 완료일로 지정하고 진행도를 최대값으로 갱신
						applyRequestSrPrgrs.setSrPrgrsCmptnDt(new Date());
						applyRequestSrPrgrs.setSrPrgrs(srPrgrsForm.getApplyRequestPrgrs());
						srDao.updateSrPrgrs(applyRequestSrPrgrs);
					} else {
						//진행도만 현재 진행도로 갱신
						applyRequestSrPrgrs.setSrPrgrs(srPrgrsForm.getApplyRequestPrgrs());
						srDao.updateSrPrgrs(applyRequestSrPrgrs);
					}
				}
			}
		}
		
		return 1;
	}
	
	//산출물 업로드
	@Override
	public int addSrPrgrsOtpt(SrPrgrsOtpt srPrgrsOtpt) {
		MultipartFile file = srPrgrsOtpt.getSrPrgrsOtptData();
		srPrgrsOtpt.setSrPrgrsOtptNo(srPrgrsOtpt.getSrPrgrsNo() + "_" + srPrgrsOtpt.getSrPrgrsOtptNm());
		srPrgrsOtpt.setSrPrgrsOtptMimeType(file.getContentType());
		try {
			srPrgrsOtpt.setSrPrgrsOtptDataByteArray(srPrgrsOtpt.getSrPrgrsOtptData().getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		srPrgrsOtpt.setSrPrgrsOtptSize(file.getSize());
		srPrgrsOtpt.setSrPrgrsOtptFileNm(file.getOriginalFilename());
		srPrgrsOtpt.setSrPrgrsOtptRegDt(new Date());
	
		srDao.insertSrPrgrsOtpt(srPrgrsOtpt);
		
		return 1;
	}
	
	//산출물 리스트 출력
	@Override
	public List<SrPrgrsOtpt> getSrPrgrsOtpts(String srPrgrsNo) {
		return srDao.selectSrPrgrsOtpt(srPrgrsNo);
	}
	
	//산출물 다운로드
	@Override
	public SrPrgrsOtpt getSrPrgrsOtptBySrPrgrsOtptNo(String srPrgrsOtptNo) {
		SrPrgrsOtpt srPrgrsOtpt = srDao.selectSrPrgrsOtptBySrPrgrsOtptNo(srPrgrsOtptNo);
		/*
		try {
			srPrgrsOtpt.setSrPrgrsOtptDataByteArray(srPrgrsOtpt.getSrPrgrsOtptData().getBytes());
		} catch(Exception e) {
			e.printStackTrace();
		}
		*/
		/*
		log.info(""+srPrgrsOtpt.getSrPrgrsOtptData());
		log.info(""+srPrgrsOtpt.getSrPrgrsOtptDataByteArray());
		*/
		return srPrgrsOtpt;
	}
	
	//산출물 삭제
	@Override
	public int deleteSelectedOtptList(List<String> srPrgrsOtptNoList) {
		for (String srPrgrsOtptNo : srPrgrsOtptNoList) {
			srDao.deleteSrPrgrsOtpt(srPrgrsOtptNo);
		}
		return 1;
	}
	
	//--------------------------------------------------------------------------------------------------
	//SR진척관리 옵션 select구성
	@Override
	public ProgressManagementSearchCompose getProgressManagementSearchCompose() {
		ProgressManagementSearchCompose progressManagementSearchCompose = new ProgressManagementSearchCompose();
		progressManagementSearchCompose.setSysList(srDao.selectSysList());
		progressManagementSearchCompose.setTaskList(srDao.selectTaskList());
		progressManagementSearchCompose.setInstList(srDao.selectInstList());
		progressManagementSearchCompose.setSrPrgrsSttsList(srDao.selectSrPrgrsSttsList());
		return progressManagementSearchCompose;
	}
	
	//deptSelect 구성
	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		return srDao.selectDeptListByInstNo(instNo);
	}
	
	//mainTable 구성
	@Override
	public SrTableConfigForProgressManagement getProgressManagementMainTableConfig(String usrNo, String jsonData) {
		log.info(""+jsonData);
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			ProgressManagementSearch progressManagementSearch = new ProgressManagementSearch();
			Integer pageNo;
        
            // JSON 문자열을 Map으로 파싱
            Map<String, Object> jsonMap = objectMapper.readValue(jsonData, Map.class);
            String innerJson = (String) jsonMap.get("progressManagementSearch");
            progressManagementSearch = objectMapper.readValue(innerJson, ProgressManagementSearch.class);
            pageNo = (Integer) jsonMap.get("pageNo");
            
            // 결과 출력
            log.info("ProgressManagementSearch: " + progressManagementSearch);
            log.info("pageNo: " + pageNo);
            
       
	        int totalSrForProgressManagementBoardNum = srDao.countSrForProgressManagementBoard(progressManagementSearch, usrNo);
	        Pager pager = new Pager(10, 5, totalSrForProgressManagementBoardNum, pageNo);
	        
	        
	        SrTableConfigForProgressManagement srTableConfigForProgressManagement = new SrTableConfigForProgressManagement();
	        srTableConfigForProgressManagement.setSrList(srDao.selectSrForProgressManagementBoard(progressManagementSearch, usrNo, pager));
	        srTableConfigForProgressManagement.setPager(pager);
	        
	        for (SrForProgressManagementBoard srForProgressManagementBoard : srTableConfigForProgressManagement.getSrList()) {
	        	if (srForProgressManagementBoard.getSrPrgrsSttsNm().equals("요청") || srForProgressManagementBoard.getSrPrgrsSttsNm().equals("접수")) {
	        		srForProgressManagementBoard.setSrRqustSttsNm(srForProgressManagementBoard.getSrPrgrsSttsNm());
	        		srForProgressManagementBoard.setSrPrgrsSttsNm("");
	        	} else {
	        		srForProgressManagementBoard.setSrRqustSttsNm("접수");
	        	}
	        }
	        
			return srTableConfigForProgressManagement;
		} catch (IOException e) {
			e.printStackTrace();
			return null;
		}
	}
}
