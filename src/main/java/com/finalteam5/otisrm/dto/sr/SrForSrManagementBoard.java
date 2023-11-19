package com.finalteam5.otisrm.dto.sr;

import java.util.Date;

import lombok.Data;

@Data
public class SrForSrManagementBoard {
	private String srRqstNo;
	private String srTtl;
	private String sysNm;
	private String reqstrNm;
	private String reqstrInstNm;
	private Date srRqstRegDt;
	private String srRqstSttsNm;
	private String srTrnsfYn;
}
