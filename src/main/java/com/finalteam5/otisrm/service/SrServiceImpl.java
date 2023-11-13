package com.finalteam5.otisrm.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.StringReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.InputSource;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.finalteam5.otisrm.dao.SrDao;
import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrPrgrs;
import com.finalteam5.otisrm.dto.SrPrgrsOtpt;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.SrTrnsfPlanForm;
import com.finalteam5.otisrm.dto.sr.DatesForScheduleChangeRequest;
import com.finalteam5.otisrm.dto.sr.ManageChangeScheduleRequestModalConfig;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearch;
import com.finalteam5.otisrm.dto.sr.ProgressManagementSearchCompose;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrForProgressManagementBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForm;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTableConfigForProgressManagement;
import com.finalteam5.otisrm.dto.sr.SrTableElementsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalCompose;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalUsrInfo;
import com.finalteam5.otisrm.dto.sr.SrTrnsfHr;
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
		//log.info(""+srNo);
		//요청 상태인지 확인
		String status = srDao.checkStatusBySrNo(srNo);
		
		if (status.equals("RQST")) {
			return srDao.selectSrTrnsfInfoForDeveloperHomeBySrNoRqst(srNo);
		} else {
			SrTrnsfInfoForDeveloperHome srTrnsfInfoForDeveloperHome = srDao.selectSrTrnsfInfoForDeveloperHomeBySrNo(srNo);
			List<SrPrgrsForDeveloperHome> srPrgrsList = srDao.selectSrPrgrsForDeveloperHomeList(srNo);
			srTrnsfInfoForDeveloperHome.setSrPrgrsList(srPrgrsList);
			List<SrTrnsfHr> srTrnsfHrList = srDao.selectSrTrnsfHrList(srNo);
			srTrnsfInfoForDeveloperHome.setSrTrnsfHrList(srTrnsfHrList);
			
			return srTrnsfInfoForDeveloperHome;
		}
	}
	
	@Override
	public SrRequestDetailForDeveloperHome getSrRequestDetailForDeveloperHome(String srNo) {
		return srDao.selectSrRequestDetailForDeveloperHome(srNo);
	}
	
	@Override
	public SrTableElementsForDeveloperHome getSrTableElementsForDeveloperHome(String usrNo, String srPrgrsSttsNo, int page) {
		SrTableElementsForDeveloperHome srTableElementsForDeveloperHome = new SrTableElementsForDeveloperHome();
		srTableElementsForDeveloperHome.setTableFilter(srPrgrsSttsNo);
		
		if (srPrgrsSttsNo.equals("TOTAL")) {
			srPrgrsSttsNo = null;
		}
		
		List<SrForDeveloperHomeBoard> totalFilteredSrList = srDao.selectSrListForDeveloperHomeBoardByUsrIdAndStts(usrNo, srPrgrsSttsNo);
		Pager pager = new Pager(5, 5, totalFilteredSrList.size(), page);
		srTableElementsForDeveloperHome.setPager(pager);
		List<SrForDeveloperHomeBoard> srList = srDao.selectSrListForDeveloperHomeBoardByUsrIdAndSttsAndPager(usrNo, srPrgrsSttsNo, pager);
		srTableElementsForDeveloperHome.setSrList(srList);
		
		List<SrForDeveloperHomeBoard> totalSrList = srDao.selectSrForDeveloperHomeBoardListByUsrId(usrNo);
		
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
	public SrTrnsfFindPicModalCompose getSrTrnsfFindPicModalCompose(String usrNo, String deptNo, String usrNm, int pageNo) {
		SrTrnsfFindPicModalCompose srTrnsfFindPicModalCompose = new SrTrnsfFindPicModalCompose();
		int totalUsrNum = srDao.countSrTrnsfFindPicModalCompose(usrNo, deptNo, usrNm);
		Pager pager = new Pager(5, 5, totalUsrNum, pageNo);
		List<SrTrnsfFindPicModalUsrInfo> usrList = srDao.selectSrTrnsfFindPicModalCompose(usrNo, deptNo, usrNm, pager);
		srTrnsfFindPicModalCompose.setPager(pager);
		srTrnsfFindPicModalCompose.setUsrList(usrList);
		return srTrnsfFindPicModalCompose;
	}
	
	//---------------------------------------------------------------------------------------------------------------
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
      	
      	//공수 계산
      	List<Date> holidayList = new ArrayList<>();
      	Date startDate = srTrnsfPlan.getSrTrgtBgngDt(); //시작일
        Date endDate = srTrnsfPlan.getSrTrgtCmptnDt();	//마감일
        
        //시작달 ~ 끝달 공휴일 계산
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        calendar.set(Calendar.DAY_OF_MONTH, 1);
        while (calendar.getTime().compareTo(endDate) <= 0) {
        	String currentYear = Integer.toString(calendar.get(Calendar.YEAR));
        	String currentMonth = Integer.toString(calendar.get(Calendar.MONTH) + 1);
            
            try {
          		StringBuilder urlBuilder = new StringBuilder("http://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo"); /*URL*/
                urlBuilder.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=dPpQQRqNlLErLNLuIH6W%2BghYtwJoEUgbN%2Fmm%2F5h7V%2BLJrpEdhwa7yGFrBsuIyXsaMxpw6GXxFTSTkQYQpaT2Nw%3D%3D"); /*Service Key*/
                urlBuilder.append("&" + URLEncoder.encode("solYear","UTF-8") + "=" + URLEncoder.encode(currentYear, "UTF-8")); /*연*/
                urlBuilder.append("&" + URLEncoder.encode("solMonth","UTF-8") + "=" + URLEncoder.encode(currentMonth, "UTF-8")); /*월*/
                URL url = new URL(urlBuilder.toString());
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/json");
                System.out.println("Response code: " + conn.getResponseCode());
                BufferedReader rd;
                if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                    rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
                } else {
                    rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
                }
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = rd.readLine()) != null) {
                    sb.append(line);
                }
                rd.close();
                conn.disconnect();
                
                holidayList.addAll(extractLocdateDates(sb.toString()));
          	} catch(Exception e) {
          		e.printStackTrace();
          	}
  
            calendar.add(Calendar.MONTH, 1); // 다음 월로 이동
        }
        
        int totalCapacity = (int) calculateBusinessDays(startDate, endDate, holidayList);
        srTrnsfPlan.setTotalBusinessDt(totalCapacity);
        /*
        // 시드 값을 설정하여 다양한 랜덤 값을 생성
        long seed = System.currentTimeMillis();
        Random random = new Random(seed);

        if (srTrnsfPlanForm.getSrDmndNo().equals("버그수정")) {
        	totalCapacity = (int)(totalCapacity * (1 + random.nextDouble()));
        } else {
        	totalCapacity = (int)(totalCapacity * (2 + random.nextDouble()));
        }
        log.info("" + totalCapacity);
        */
        
        if (srTrnsfPlanForm.getSrDmndNo().equals("버그수정")) {
        	totalCapacity = (int)(totalCapacity * 1.5);
        } else {
        	totalCapacity = (int)(totalCapacity * 2);
        }
        srTrnsfPlan.setTotalCapacity(totalCapacity);

        log.info("srTrnsfPlan: "+srTrnsfPlan);
		return srDao.updateSrTrnsfPlan(srTrnsfPlan);
	}
	
	// 주말과 공휴일을 제외한 평일(비즈니스 데이) 계산
    private int calculateBusinessDays(Date startDate, Date endDate, List<Date> holidayList) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(startDate);
        int businessDays = 0;

        while (calendar.getTime().compareTo(endDate) <= 0) {
            int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);

            // 주말 (토요일 또는 일요일)인 경우 제외
            if (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY) {
            	calendar.add(Calendar.DAY_OF_MONTH, 1);
                continue;
            }
            
            boolean isHoliday = false;
            for (Date holiday : holidayList) {
            	if (holiday.compareTo(calendar.getTime()) == 0) {
            		isHoliday = true;
            	}
            }
            if (isHoliday) {
            	calendar.add(Calendar.DAY_OF_MONTH, 1);
            	continue;
            }

            businessDays++;
            calendar.add(Calendar.DAY_OF_MONTH, 1);
        }

        return businessDays;
    }
	
	// XML 데이터에서 <locdate> 정보 추출하여 Date 객체로 반환
    private List<Date> extractLocdateDates(String xmlData) {
        List<Date> locdateList = new ArrayList<>();
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            Document doc = dBuilder.parse(new InputSource(new StringReader(xmlData)));

            doc.getDocumentElement().normalize();

            NodeList itemList = doc.getElementsByTagName("item");
            for (int i = 0; i < itemList.getLength(); i++) {
                Node itemNode = itemList.item(i);
                if (itemNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element itemElement = (Element) itemNode;
                    String locdateStr = itemElement.getElementsByTagName("locdate").item(0).getTextContent();
                    Date locdate = getDate(locdateStr);
                    locdateList.add(locdate);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return locdateList;
    }
	
	// 날짜 문자열을 Date 객체로 변환하는 유틸리티 메서드
    private Date getDate(String dateStr) {
        try {
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
            return dateFormat.parse(dateStr);
        } catch (Exception e) {
            return null;
        }
    }

    // 주말(토요일 또는 일요일) 여부를 확인
    private boolean isWeekend(Date date) {
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(date);
        int dayOfWeek = calendar.get(Calendar.DAY_OF_WEEK);
        return (dayOfWeek == Calendar.SATURDAY || dayOfWeek == Calendar.SUNDAY);
    }
	//---------------------------------------------------------------------------------------------------------------
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
		
		String srTrnsfPrgrs = "RECEIPT";
		
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
				//새로운 값이 최대값이라면
				} else if (srPrgrsForm.getAnalysisPrgrs() == 10) {
					//작업 시작일과 완료일을 모두 오늘로 지정하고 진행도를 최대값으로 갱신
					analysisSrPrgrs.setSrPrgrsBgngDt(new Date());
					analysisSrPrgrs.setSrPrgrsCmptnDt(new Date());
					analysisSrPrgrs.setSrPrgrs(srPrgrsForm.getAnalysisPrgrs());
					srDao.updateSrPrgrs(analysisSrPrgrs);
				}
				
				//개발중으로 상태 변경
				srDao.updateSrRqstPrgrs(srPrgrsForm.getSrNo());
				//srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "ANALYSIS");
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
			//srTrnsfPlan 상태 갱신
			srTrnsfPrgrs = "ANALYSIS";
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
			srTrnsfPrgrs = "DESIGN";
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
				//srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "IMPLEMENT");
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
			srTrnsfPrgrs = "IMPLEMENT";
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
				//srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "TEST");
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
			srTrnsfPrgrs = "TEST";
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
				//srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), "APPLY_REQUEST");
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
			srTrnsfPrgrs = "APPLY_REQUEST";
		}
		
		//srTrnsfPlan 상태 갱신
		srDao.updateSrTrnsfStts(srPrgrsForm.getSrNo(), srTrnsfPrgrs);
		
		return 1;
	}
	
	//HR 추가
	@Override
	public int addHr(String srNo, String usrNo) {
		if (srDao.checkHr(srNo, usrNo) > 0) {
			return 0;
		} else {
			srDao.insertHr(srNo, usrNo);
			return 1;
		}
	}
	
	//공수 저장
	@Override
	public int saveHrInfo(String jsonData) {
		try {
			JSONArray jsonArray = new JSONArray(jsonData);
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				SrTrnsfHr srTrnsfHr = new SrTrnsfHr();
				srTrnsfHr.setSrNo(jsonObject.getString("srNo"));
				srTrnsfHr.setUsrNo(jsonObject.getString("usrNo"));
				srTrnsfHr.setPlanCapacity(jsonObject.getInt("planCapacity"));
				srTrnsfHr.setPerformanceCapacity(jsonObject.getInt("performanceCapacity"));
				srDao.updateSrTrnsfHr(srTrnsfHr);
			}
	        
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}
	
	//HR 삭제
	@Override
	public int deleteHrInfo(String jsonData) {
		try {
			JSONArray jsonArray = new JSONArray(jsonData);
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				SrTrnsfHr srTrnsfHr = new SrTrnsfHr();
				srTrnsfHr.setSrNo(jsonObject.getString("srNo"));
				srTrnsfHr.setUsrNo(jsonObject.getString("usrNo"));
				srDao.deleteSrTrnsfHr(srTrnsfHr);
			}
	        
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
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
	
	//SR진척등록
	@Override
	public List<SrTrnsfHr> getSrTrnsfHrListByUsrNo(String usrNo) {
		List<SrTrnsfHr> srTrnsfHrList = srDao.selectSrTrnsfHrListByUsrNo(usrNo);
		for (SrTrnsfHr srTrnsfHr : srTrnsfHrList) {
			if (srTrnsfHr.getLastRegDt() != null) {
				Calendar calendar = Calendar.getInstance();
				calendar.setTime(srTrnsfHr.getLastRegDt());
				LocalDate date1 = LocalDate.of(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, calendar.get(Calendar.DAY_OF_MONTH));
				LocalDate date2 = LocalDate.now();
				if (date1.compareTo(date2) != 0) {
					srTrnsfHr.setLastRegCapacity(0);
				}
			} else {
				srTrnsfHr.setLastRegCapacity(0);
			}
		}
		return srTrnsfHrList;
	}
	
	//SR 금일 진척 등록
	@Override
	public int registerHrInfo(String jsonData) {
		try {
			log.info(jsonData);
			JSONArray jsonArray = new JSONArray(jsonData);
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				SrTrnsfHr srTrnsfHr = new SrTrnsfHr();
				srTrnsfHr.setSrNo(jsonObject.getString("srNo"));
				srTrnsfHr.setUsrNo(jsonObject.getString("usrNo"));
				int lastRegCapacity = jsonObject.getInt("lastRegCapacity");
				SrTrnsfHr originalSrTrnsfHr = srDao.getSrTrnsfHrBySrNoAndUsrNo(srTrnsfHr.getSrNo(), srTrnsfHr.getUsrNo());
				
				if (originalSrTrnsfHr.getLastRegDt() == null) {
					originalSrTrnsfHr.setLastRegDt(new Date());
					originalSrTrnsfHr.setLastRegCapacity(lastRegCapacity);
					originalSrTrnsfHr.setPerformanceCapacity(originalSrTrnsfHr.getPerformanceCapacity() + lastRegCapacity);
				} else {
					Calendar calendar = Calendar.getInstance();
					calendar.setTime(originalSrTrnsfHr.getLastRegDt());
					LocalDate date1 = LocalDate.of(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH) + 1, calendar.get(Calendar.DAY_OF_MONTH));
					LocalDate date2 = LocalDate.now();
							
					//오늘 최초 등록
					if (date1.compareTo(date2) != 0) {
						originalSrTrnsfHr.setLastRegDt(new Date());
						originalSrTrnsfHr.setLastRegCapacity(lastRegCapacity);
						originalSrTrnsfHr.setPerformanceCapacity(originalSrTrnsfHr.getPerformanceCapacity() + lastRegCapacity);
					//오늘 등록한적이 있음
					} else if (date1.compareTo(date2) == 0) {
						//기존에 등록한 값만큼 실적공수에서 뺌
						originalSrTrnsfHr.setPerformanceCapacity(originalSrTrnsfHr.getPerformanceCapacity() - originalSrTrnsfHr.getLastRegCapacity());
						originalSrTrnsfHr.setLastRegCapacity(lastRegCapacity);
						originalSrTrnsfHr.setPerformanceCapacity(originalSrTrnsfHr.getPerformanceCapacity() + lastRegCapacity);
					}
				}
				
				srDao.updateSrTrnsfHr(originalSrTrnsfHr);
			}
	        
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
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
	
	
	//현재 완료 요청일 
	@Override
	public DatesForScheduleChangeRequest getSrCmptnPrnmntDtBySrNo(String srNo) {
		return srDao.selectSrCmptnPrnmntDtBySrNo(srNo);
	}
	
	//일정변경요청
	@Override
	public int requestSrScheduleChange(String srNo, Date srSchdlChgRqstDt) {
		srDao.updateSrSchdlChgRqst(srNo, srSchdlChgRqstDt);
		return 1;
	}
	
	//일정변경요청 내역 관리
	@Override
	public List<ManageChangeScheduleRequestModalConfig> getManageChangeScheduleRequestModalConfig() {
		List<ManageChangeScheduleRequestModalConfig> configList = srDao.selectManageChangeScheduleRequestModalConfigList();
		for (ManageChangeScheduleRequestModalConfig config : configList) {
			if (config.getSrSchdlChgRqstAprvYn() == null) {
				config.setStatus("요청");
			} else {
				if (config.getSrSchdlChgRqstAprvYn().equals("Y")) {
					config.setStatus("승인");
				} else if (config.getSrSchdlChgRqstAprvYn().equals("N")) {
					config.setStatus("반려");
				}
			}
		}
		return configList;
	}
	
	//일정변경요청 결과 확인
	@Override
	public int srScheduleChangeRequestResultCheck(String srNo) {
		return srDao.updateSrScheduleChangeRequestResultCheck(srNo);
	}
	
}
