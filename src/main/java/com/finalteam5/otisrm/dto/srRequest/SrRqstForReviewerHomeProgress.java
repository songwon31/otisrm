package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;

import lombok.Data;

@Data
public class SrRqstForReviewerHomeProgress {
	private String srRqstNo;
	private String srRqstSttsNm;
	private String srReqstrNm;
	private Date srRqstRegDt;
	private String srTrnsfYn;
	private String deptNm;
	private String srTrnsfInstNm;
	private Date srCmptnPrnmntDt;
	private String srTtl;
	private String srConts;
	private String srRqstRvwRsn;
}
