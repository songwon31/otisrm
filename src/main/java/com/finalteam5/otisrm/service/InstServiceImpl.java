package com.finalteam5.otisrm.service;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.finalteam5.otisrm.dao.InstDao;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Ibps;
import com.finalteam5.otisrm.dto.usr.Inst;
import com.finalteam5.otisrm.dto.usr.InstDetail;
import com.finalteam5.otisrm.dto.usr.Role;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class InstServiceImpl implements InstService{
	@Autowired
	private InstDao instDao;
	
	//작성자: 이현주
	//외부업체 제외 기관목록 가져오기
	@Override
	public List<Inst> getNoOutsrcInstList() {
		return instDao.selectNoOutsrcInstList();
	}
	
	//기업 상세정보
	@Override
	public InstDetail getDetailInstInfo(String instNo) {
		InstDetail instDetail = instDao.selectInstDetail(instNo);
		instDetail.setIbpsList(instDao.selectIbpsListByInstNo(instNo));
		// 직위 코드에서 기업 코드 제거
		for (Ibps ibps : instDetail.getIbpsList()) {
			ibps.setIbpsNo(ibps.getIbpsNo().replace(instNo + "_", ""));
		}
		instDetail.setRoleList(instDao.selectRoleListByInstNo(instNo));
		// 역할 코드에서 기업 코드 제거
		for (Role role : instDetail.getRoleList()) {
			role.setRoleNo(role.getRoleNo().replace(instNo + "_", ""));
		}
		instDetail.setDeptList(instDao.selectDeptListByInstNo(instNo));
		// 부서 코드에서 기업 코드 제거
		for (Dept dept : instDetail.getDeptList()) {
			dept.setDeptNo(dept.getDeptNo().replace(instNo + "_", ""));
		}
		return instDetail;
	}
	
	//기업명 저장
	@Override
	public String updateInstNm(String instNo, String instNm) {
		if (instDao.updateInstNm(instNo, instNm) > 0) {
			return "success";
		} else {
			return "fail";
		}
	}
	
	//기업분류 저장
	@Override
	public String updateInstClsf(String instNo, String instClsf) {
		if (instDao.checkInstSr(instNo) > 0) {
			return "fail";
		} else {
			instDao.updateInstClsf(instNo, instClsf);
			return "success";
		}
	}
	
	//기업 등록
	@Override
	public String registInst(Inst inst) {
		if (instDao.checkInstExist(inst.getInstNo()) > 0) {
			return "fail";
		} else {
			instDao.insertInst(inst);
			return "success";
		}
	}
	
	//기업 삭제
	@Override
	public String deleteInst(List<String> instNoList) {
		int totalNum = instNoList.size();
		int deletedNum = 0;
		for (String instNo : instNoList) {
			if (instDao.checkInstUsr(instNo) == 0) {
				instDao.deleteInstByInstNo(instNo);
				deletedNum++;
			}
		}
		if (totalNum == deletedNum) {
			return "success";
		} else {
			return "fail";
		}
		
	}
	
	//직위 삭제
	@Override
	public String deleteIbps(String ibpsNo) {
		if (instDao.checkIbpsUsrExist(ibpsNo) > 0) {
			return "ibpsFailUsrExist";
		} else {
			if (instDao.deleteIbps(ibpsNo) == 0) {
				return "ibpsFailDelete";
			} else {
				return "success";
			}
		}
	}
	
	//직위 저장
	@Override
	public String saveIbps(String jsonData) {
		log.info(""+jsonData);
		try {
			JSONArray jsonArray = new JSONArray(jsonData);
			int arrayLength = jsonArray.length();
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				Ibps ibps = new Ibps();
				ibps.setIbpsNm(jsonObject.getString("ibpsNm"));
				ibps.setIbpsNo(jsonObject.getString("ibpsNo"));
				ibps.setInstNo(jsonObject.getString("instNo"));
				
				if (instDao.checkIbps(ibps.getIbpsNo()) > 0) {
					//기존에 ibpsNo가 존재하는 경우 수정
					instDao.updateIbps(ibps);
				} else {
					//기존에 없을 경우 삽입
					instDao.insertIbps(ibps);
				}
			}
	        
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	//역할 삭제
	@Override
	public String deleteRole(String roleNo) {
		if (instDao.checkRoleUsrExist(roleNo) > 0) {
			return "roleFailUsrExist";
		} else {
			if (instDao.deleteRole(roleNo) == 0) {
				return "roleFailDelete";
			} else {
				return "success";
			}
		}
	}
	
	//역할 저장
	@Override
	public String saveRole(String jsonData) {
		try {
			JSONArray jsonArray = new JSONArray(jsonData);
			int arrayLength = jsonArray.length();
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				Role role = new Role();
				role.setRoleNm(jsonObject.getString("roleNm"));
				role.setRoleNo(jsonObject.getString("roleNo"));
				role.setInstNo(jsonObject.getString("instNo"));
				role.setRoleSeq(jsonObject.getInt("roleSeq"));
				
				if (instDao.checkRole(role.getRoleNo()) > 0) {
					//기존에 ibpsNo가 존재하는 경우 수정
					instDao.updateRole(role);
				} else {
					//기존에 없을 경우 삽입
					instDao.insertRole(role);
				}
			}
	        
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	
	//부서 삭제
	@Override
	public String deleteDept(String deptNo) {
		if (instDao.checkDeptUsrExist(deptNo) > 0) {
			return "deptFailUsrExist";
		} else {
			if (instDao.deleteDept(deptNo) == 0) {
				return "deptFailDelete";
			} else {
				return "success";
			}
		}
	}
	
	//부서 저장
	@Override
	public String saveDept(String jsonData) {
		log.info(""+jsonData);
		try {
			JSONArray jsonArray = new JSONArray(jsonData);
			int arrayLength = jsonArray.length();
			for (int i=0; i<jsonArray.length(); ++i) {
				JSONObject jsonObject = jsonArray.getJSONObject(i);
				Dept dept = new Dept();
				dept.setDeptNm(jsonObject.getString("deptNm"));
				dept.setDeptNo(jsonObject.getString("deptNo"));
				dept.setInstNo(jsonObject.getString("instNo"));
				
				if (instDao.checkDept(dept.getDeptNo()) > 0) {
					//기존에 deptNo가 존재하는 경우 수정
					instDao.updateDept(dept);
				} else {
					//기존에 없을 경우 삽입
					instDao.insertDept(dept);
				}
			}
	        
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
}
