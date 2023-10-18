package com.finalteam5.otisrm.service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UserDao;
import com.finalteam5.otisrm.dto.user.Inst;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UserServiceImpl implements UserService{
	@Autowired
	private UserDao userDao;
	
	@Override
	public List<Inst> getInstList() {
		log.info("실행");
		List<Inst> list = userDao.selectInstList();
		if(list == null) {
			log.info("list is null");
		} else {
			log.info(String.valueOf(list.size()));
			log.info("목록: " + list.toString());
			
		}
		

		for(int i=0; i < list.size(); i++) {
			if(list.get(i).getOutsrcYn().equals("Y")) {
				list.get(i).setInstNm(list.get(i).getInstNm() + "(외부)");
			}
		}
		return list;
	}
	
}
