package com.finalteam5.otisrm.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.finalteam5.otisrm.dto.user.Dept;
import com.finalteam5.otisrm.dto.user.Ibps;
import com.finalteam5.otisrm.dto.user.Inst;
import com.finalteam5.otisrm.dto.user.Role;
import com.finalteam5.otisrm.dto.user.UserAuthrt;

@Mapper
public interface UserDao {
	public List<Inst> selectInstList();
	public List<Dept> selectDeptList(String instNo);
	public List<Ibps> selectIbpsList(String instNo);
	public List<Role> selectRoleList(String instNo);
	public List<UserAuthrt> selectUserAuthrtList();
}
