package com.finalteam5.otisrm.dto.usr;

import java.util.Date;

import lombok.Data;

@Data
public class UsrForUsrManagementBoard {
	private String usrNo;
	private String usrNm;
	private String usrTelno;
	private String usrEml;
	private String instNm;
	private String deptNm;
	private String roleNm;
	private String usrAuthrtNm;
	private String usrSttsNm;
	private Date usrJoinDt;
}
