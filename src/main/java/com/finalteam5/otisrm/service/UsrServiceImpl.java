package com.finalteam5.otisrm.service;

import java.util.Base64;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.UsrDao;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.Login;
import com.finalteam5.otisrm.dto.usr.Role;
import com.finalteam5.otisrm.dto.usr.Usr;
import com.finalteam5.otisrm.dto.usr.UsrAuthrt;
import com.finalteam5.otisrm.dto.usr.UsrManagementPageConfigure;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class UsrServiceImpl implements UsrService{
	@Autowired
	private UsrDao usrDao;
	
	//회원가입
	@Override
	public JoinResult join(Usr usr) {
		int numOfOverLapUsrId = usrDao.selectNumOfOverlapUsrId(usr.getUsrId());
		if(numOfOverLapUsrId != 0) {
			return JoinResult.FAIL_DUPLICATED_UID;
		} else {
			PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
			usr.setUsrPswd(passwordEncoder.encode(usr.getUsrPswd()));
			usrDao.insertUsr(usr);		
			return JoinResult.SUCCESS;
		}
	}
	//회원가입 폼
	//기관 목록 불러오기
	@Override
	public List<Inst> getInstList() {
		List<Inst> list = usrDao.selectInstList();
		for(int i=0; i < list.size(); i++) {
			if(list.get(i).getOutsrcYn().equals("Y")) {
				list.get(i).setInstNm(list.get(i).getInstNm() + "(외부)");
			}
		}
		return list;
	}
	//권한 목록 불러오기
	@Override
	public List<UsrAuthrt> getUsrAuthrtList() {
		List<UsrAuthrt> list = usrDao.selectUsrAuthrtList();
		return list;
	}
	//기관에 해당하는 개발 부서 불러오기
	@Override
	public List<Dept> getDeptListByInstNo(String instNo) {
		List<Dept> list = usrDao.selectDeptListByInstNo(instNo);
		return list;
	}
	//기관에 해당하는 직위 목록 불러오기
	@Override
	public List<Ibps> getIbpsListByInstNo(String instNo) {
		List<Ibps> list = usrDao.selectIbpsListByInstNo(instNo);
		return list;
	}
	//기관에 해당하는 역할 목록 불러오기
	@Override
	public List<Role> getRoleListByInstNo(String instNo) {
		List<Role> list = usrDao.selectRoleListByInstNo(instNo);
		return list;
	}
	//아이디 중복검사
	@Override
	public int getNumOfOverlapUsrId(String usrId) {
		int numOfOverlapUsrId = usrDao.selectNumOfOverlapUsrId(usrId);
		return numOfOverlapUsrId;
	}

	
	//로그인
	@Override
	public LoginResult login(Login loginUsr) {
		Login dbUsr = usrDao.selectByUsrId(loginUsr.getUsrId());
		if(dbUsr == null) {
			return LoginResult.FAIL_UID;
		}
		PasswordEncoder passwordEncoder = PasswordEncoderFactories.createDelegatingPasswordEncoder();
		if(passwordEncoder.matches(loginUsr.getUsrPswd(), dbUsr.getUsrPswd())) {
			if(dbUsr.getUsrSttsNo().equals("NORMAL")) {
				return LoginResult.SUCCESS;
			}else {
				return LoginResult.FAIL_ENABLED;
			}
		}else {
			return LoginResult.FAIL_PASSWORD;
		}
	}

	@Override
	public Login getUsr(String usrId) {
		Login usr = usrDao.selectByUsrId(usrId);
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
