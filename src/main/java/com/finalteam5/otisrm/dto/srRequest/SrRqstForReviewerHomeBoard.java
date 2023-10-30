package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;

import lombok.Data;

@Data
public class SrRqstForReviewerHomeBoard {
	private String srRqstNo;
	private String srTtl;
	private String sysNm;
	private String usrNm;
	private String instNm;
	private String srRqstSttsNm;
	private Date srRqstRegDt;
	private Date srCmptnPrnmntDt;
}
