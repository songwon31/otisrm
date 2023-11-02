package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrPrgrs;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.SrTrnsfPlan;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfFindPicModalUsrInfo;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfPlanModalCompose;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;

@Mapper
public interface SrDao {
	public int countSr();
	
	public int countTotalTransferedSrNumByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrIdAndPager(
			@Param("usrId") String usrId, @Param("pager") Pager pager);
	public SrTrnsfInfoForDeveloperHome selectSrTrnsfInfoForDeveloperHomeBySrNo(String srNo);
	public SrTrnsfInfoForDeveloperHome selectSrTrnsfInfoForDeveloperHomeBySrNoRqst(String srNo);
	public List<SrPrgrsForDeveloperHome> selectSrPrgrsForDeveloperHomeList(String srNo);
	public SrRequestDetailForDeveloperHome selectSrRequestDetailForDeveloperHome(String srNo);
	
	public String checkStatusBySrNo(String srNo);
	
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndStts(
			@Param("usrId") String usrId, @Param("srPrgrsSttsNo") String srPrgrsSttsNo);
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndSttsAndPager(
			@Param("usrId") String usrId, @Param("srPrgrsSttsNo") String srPrgrsSttsNo, @Param("pager") Pager pager);
	
	public List<SrTaskClsf> selectTaskList();
	public List<Dept> selectDeptListByUsrId(String usrId);
	public List<Usr> selectUsrListByUsrId(String usrId);
	
	//SR계획정보 모달 구성
	public SrTrnsfPlanModalCompose getCurrentSrTrnsfPlanInfo(String srNo);
	public SrTrnsfPlanModalCompose getCurrentSrTrnsfPlanInfoRqst(String srNo);
	public List<SrDmndClsf> selectDmndList();
	
	//담당자 선택 모달 구성
	public int countSrTrnsfFindPicModalCompose(
			@Param("usrId") String usrId, @Param("deptNo") String deptNo, @Param("usrNm") String usrNm);
	public List<SrTrnsfFindPicModalUsrInfo> selectSrTrnsfFindPicModalCompose(
			@Param("usrId") String usrId, @Param("deptNo") String deptNo, @Param("usrNm") String usrNm, @Param("pager") Pager pager);
	
	//sr 이관 계획 수정
	public String selectDeptNoByDeptNmAndSrNo(@Param("deptNm") String deptNm, @Param("srNo") String srNo);
	public String selectUsrNoByUsrNm(String usrNm);
	public int updateSrTrnsfPlan(SrTrnsfPlan srTrnsfPlan);
	
	//요청 상태이고 필요 데이터가 모두 포함되어있으면 접수 상태로 변경
	public int insertAnalysisPrgrs(String srNo);
	public int insertDesignPrgrs(String srNo);
	public int insertImplementPrgrs(String srNo);
	public int insertTestPrgrs(String srNo);
	public int insertApplyRequestPrgrs(String srNo);
	public int updateSttsToReceipt(String srNo);
	
	//HR설정 모달 구성
	public String selectDeptNmBySrNo(String srNo);
	public String selectAnalysisPicNm(String srNo);
	public String selectDesignPicNm(String srNo);
	public String selectImplementPicNm(String srNo);
	public String selectTestPicNm(String srNo);
	public String selectApplyRequestPicNm(String srNo);
	
	//HR PIC 업데이트
	public int updateAnalysisPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateDesignPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateImplementPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateTestPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	public int updateApplyRequestPicNm(@Param("srNo") String srNo, @Param("picNm") String picNm);
	
	//SR 이관 진행률 업데이트
	public Integer selectAnalysisPrgrs(String srNo);
	public Integer selectDesignPrgrs(String srNo);
	public Integer selectImplementPrgrs(String srNo);
	public Integer selectTestPrgrs(String srNo);
	public Integer selectApplyRequestPrgrs(String srNo);
	
	public int updateSrPrgrs(SrPrgrs srPrgrs);
	public int updateSrTrnsfStts(@Param("srNo") String srNo, @Param("srPrgrsSttsNo") String srPrgrsSttsNo);
}
