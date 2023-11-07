package com.finalteam5.otisrm.dto.usr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.sr.SrNoAndTtl;

import lombok.Data;

@Data
public class UsrEditConfigure {
	private String usrId;
	private String usrNm;
	private String usrEml;
	private String usrTelno;
	private String deptNo;
	private String roleNo;
	private String ibpsNo;
	List<Dept> deptList;
	List<Role> roleList;
	List<Ibps> ibpsList;
}
