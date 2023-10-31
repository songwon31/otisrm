package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;

@Mapper
public interface SrDao {
	public int countSr();
	
	public int countTotalTransferedSrNumByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrIdAndPager(
			@Param("usrId") String usrId, @Param("pager") Pager pager);
	public SrTrnsfInfoForDeveloperHome selectSrTrnsfInfoForDeveloperHomeBySrNo(String srNo);
	public List<SrPrgrsForDeveloperHome> selectSrPrgrsForDeveloperHomeList(String srNo);
	public SrRequestDetailForDeveloperHome selectSrRequestDetailForDeveloperHome(String srNo);
	
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndStts(
			@Param("usrId") String usrId, @Param("srPrgrsSttsNo") String srPrgrsSttsNo);
	public List<SrForDeveloperHomeBoard> selectSrListForDeveloperHomeBoardByUsrIdAndSttsAndPager(
			@Param("usrId") String usrId, @Param("srPrgrsSttsNo") String srPrgrsSttsNo, @Param("pager") Pager pager);
}
