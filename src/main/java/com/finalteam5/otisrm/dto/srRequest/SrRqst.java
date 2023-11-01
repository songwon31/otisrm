package com.finalteam5.otisrm.dto.srRequest;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class SrRqst {
	private String srRqstNo;		//sr요청번호
	private String srTtl;			//sr제목
	private String srPrps;			//sr목적
	private String srReqstrNo;		//사용자 번호(요청자)
	private String usrNm;			//사용자 이름(요청자)
	private String instNm;			//소속기관
	private String srConts;			//sr내용
	private Date srRqstRegDt;		//sr요청 등록일
	private Date srRqstMdfcnDt; 	//sr요청 최종수정일
	private String srRqstSttsNo;	//상태번호
	private String srRqstSttsNm;	//상태
	private String sysNo;			//시스템번호
	private String sysNm;			//시스템 이름
	private String srRqstEmrgYn;	//중요여부
	private String srRqstRvwRsn;	//검토사유
	private String srRqstVldYn;		//sr요청 유효성(삭제여부)
	
	//첨부파일 
	private List<SrRqstAtch> srRqstAtchList;
}
