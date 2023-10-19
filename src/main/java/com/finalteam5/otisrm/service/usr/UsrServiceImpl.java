package com.finalteam5.otisrm.service.usr;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UsrDao;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsrServiceImpl implements UsrService{
	@Autowired
	private UsrDao usrDao;
	
	@Override
	public List<Inst> getInstList() {
		List<Inst> list = usrDao.selectInstList();
		for(int i=0; i < list.size(); i++) {
			if(list.get(i).getOutsrcYn().equals("Y")) {
				list.get(i).setInstNm(list.get(i).getInstNm() + "(외부)");
			}
		}
		log.info(list.toString());
		return list;
	}

	@Override
	public List<UsrAuthrt> getUsrAuthrtList() {
		List<UsrAuthrt> list = usrDao.selectUsrAuthrtList();
		return list;
	}

	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		List<Dept> list = usrDao.selectDeptListByInstNo(instNo);
		return list;
	}
	
	/**
	 * @author 송원석
	 * 사용자 관리 페이지 구성 데이터를 가져오는 메서드
	 */
	@Override
	public UsrManagementPageConfigure getUsrManagementPageConfigureData() {
		UsrManagementPageConfigure usrManagementPageConfigure = new UsrManagementPageConfigure();
		
		usrManagementPageConfigure.setUsrAuthrtList(usrDao.selectUsrAuthrtList());
		usrManagementPageConfigure.setUsrSttsList(usrDao.selectUsrSttsList());
		usrManagementPageConfigure.setInstList(usrDao.selectInstList());
		usrManagementPageConfigure.setDeptList(usrDao.selectDeptListByInstNo(null));
		
		return usrManagementPageConfigure;
	}
	
}
