package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;

import lombok.Data;

@Data
public class SrRqstForReviewerModal {
	//SR요청정보
	private String srRqstNo;
	private String srReqstrNm;
	private String reqstrInstNm;
	private Date srRqstRegDt;
	private String sysNm;
	private String srTtl;
	private String srConts;
	private String srRqstRvwRsn;
	
	//SR개발정보
	private String srPicUsrNm;
	private String deptNm;
	private String srTrnsfYn;
	private String srTrnsfInstNm;
	private int srReqBgt;
	private Date srCmptnPrnmntDt;
	private String srDvlConts;
}
