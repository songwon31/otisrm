package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;

@Mapper
public interface SrDao {
	public int countSr();
	
	public int countTotalTransferedSrNumByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrId(String usrId);
	public List<SrForDeveloperHomeBoard> selectSrForDeveloperHomeBoardListByUsrIdAndPager(
			@Param("usrId") String usrId, @Param("pager") Pager pager);
}
