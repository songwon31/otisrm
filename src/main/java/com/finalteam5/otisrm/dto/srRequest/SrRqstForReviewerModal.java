package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;

import lombok.Data;

@Data
public class SrRqstForReviewerModal {
	//SR요청정보
	private String srRqstNo;
	private String srRqstSttsNo;
	private String srReqstrNm;
	private String reqstrInstNm;
	private Date srRqstRegDt;
	private String sysNm;
	private String srTtl;
	private String srConts;
	private String srRqstRvwRsn;
	private String srRqstEmrgYn;
	
	//요청 첨부파일
	private List<SrRqstAtch> srRqstAtchList;
	
	//SR개발정보
	private String srNo;
	private String srPicUsrNm;
	private String srTrnsfYn;
	private String srTrnsfInstNm;
	private String srTaskNm;
	private int srReqBgt;
	private String srDmndNm;
	private String srPri;
	private Date srCmptnPrnmntDt;
	private String srDvlConts;
	
	//SR 첨부파일
	private List<SrAtch> srAtchList;
}
