package com.finalteam5.otisrm.dto.sr;

import java.util.Date;

import lombok.Data;

@Data
public class SrForProgressManagementBoard {
	private String srNo;
	private String sysNm;
	private String srTaskNm;
	private String srTtl;
	private String rqstrNm;	
	private Date srCmptnPrnmntDt;
	private String instNm;
	private Date srTrgtCmptnDt;
	private String srRqustSttsNm;
	private String srPrgrsSttsNm;
}
