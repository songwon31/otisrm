package com.finalteam5.otisrm.dto.usr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.sr.SrNoAndTtl;

import lombok.Data;

@Data
public class UsrManagementModalConfigure {
	private String usrNo;
	private String usrNm;
	private String usrRrno;
	private String usrTelno;
	private String usrEml;
	private String instNm;
	private String deptNm;
	private String ibpsNm;
	private String roleNm;
	private String usrAuthrtNm;
	private String usrSttsNm;
	private Date usrJoinDt;
	private Date usrWhdwlDt;
	List<SrNoAndTtl> srInfo;
}
