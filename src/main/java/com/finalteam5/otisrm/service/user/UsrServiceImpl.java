package com.finalteam5.otisrm.service.user;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UserDao;
import com.finalteam5.otisrm.dto.user.Dept;
import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.Login;
import com.finalteam5.otisrm.dto.user.Usr;
import com.finalteam5.otisrm.dto.user.UsrAuthrt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsrServiceImpl implements UsrService{
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
		List<UsrAuthrt> list = userDao.selectUsrAuthrtList();
		return list;
	}

	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		List<Dept> list = userDao.selectDeptListByInstNo(instNo);
		return list;
	}

	@Override
	public JoinResult join(Usr usr) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public LoginResult login(Login loginUsr) {
		Login usr = userDao.selectByUsrId(loginUsr.getUsrId());
		if(usr.equals(null)) {
			return LoginResult.FAIL_UID;
		}
		/*PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		if(passwordEncoder!= null) {			
			if(passwordEncoder.matches(usr.getUsrPswd(), usr.getUsrPswd())) {
				if(usr.getUsrSttsNo().equals("US_STTS_02")) {
					return LoginResult.SUCCESS;
				} else {
					return LoginResult.FAIL_ENABLED;
				}
			} else {
				return LoginResult.FAIL_PASSWORD;
			}                                      
		}else{
			
			
		}*/
		if(usr.getUsrPswd().equals(loginUsr.getUsrPswd())) {
			return LoginResult.SUCCESS;
		}else {
			return LoginResult.FAIL_PASSWORD;
		}
	}
	
	@Override
	public Login getUsr(String usrId) {
		Login usr = userDao.selectByUsrId(usrId);
		// 등록한 이미지가 있다면 base64로 인코딩
		if(usr.getRprsImg() != null) {
			String base64Img = Base64.getEncoder().encodeToString(usr.getRprsImg());
			usr.setUsrEcdImg(base64Img);
		}
		return usr;
	}

	@Override
	public void logout(String uid) {
		// TODO Auto-generated method stub
		
	}
	
}
