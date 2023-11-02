package com.finalteam5.otisrm.dto.sr;

import java.util.Date;

import lombok.Data;

@Data
public class SrForDeveloperHomeBoard {
	private String srNo;
	private String sysNm;
	private String srTaskNm;
	private String srTtl;
	private String usrNm;
	private Date srCmptnPrnmntDt;
	private Date srTrgtCmptnDt;
	private String srPrgrsSttsNm;
}
