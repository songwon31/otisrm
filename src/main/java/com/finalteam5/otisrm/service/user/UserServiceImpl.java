package com.finalteam5.otisrm.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UserDao;
import com.finalteam5.otisrm.dto.user.Dept;
import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.UsrAuthrt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao userDao;
	
	@Override
	public List<Inst> getInstList() {
		List<Inst> list = userDao.selectInstList();
		for(int i=0; i < list.size(); i++) {
			if(list.get(i).getOutsrcYn().equals("Y")) {
				list.get(i).setInstNm(list.get(i).getInstNm() + "(외부)");
			}
		}
		log.info(list.toString());
		return list;
	}

	@Override
	public List<UsrAuthrt> getUserAuthrtList() {
		List<UsrAuthrt> list = userDao.selectUserAuthrtList();
		return list;
	}

	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		List<Dept> list = userDao.selectDeptListByInstNo(instNo);
		return list;
	}
	
}
