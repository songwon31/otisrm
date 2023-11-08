package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;

import lombok.Data;

@Data
public class SrRqstForDevelopManagement {
	private String srRqstNo;
	private String srTtl;
	private String sysNm;
	private String usrNm;
	private String instNm;
	private Date srRqstRegDt;
	private Date srCmptnPrnmntDt;
	private String srRqstSttsNm;
	private String srRqstEmrgYn;
	private String srTrnsfYn;
}
