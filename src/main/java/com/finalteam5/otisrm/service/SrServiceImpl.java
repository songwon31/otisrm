package com.finalteam5.otisrm.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.SrDao;
import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.sr.SrForDeveloperHomeBoard;
import com.finalteam5.otisrm.dto.sr.SrPrgrsForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrPrgrsPicForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrRequestDetailForDeveloperHome;
import com.finalteam5.otisrm.dto.sr.SrTrnsfInfoForDeveloperHome;

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
	
}
