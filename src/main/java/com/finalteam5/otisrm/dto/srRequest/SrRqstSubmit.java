package com.finalteam5.otisrm.dto.srRequest;

import java.io.Serializable;
import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@SuppressWarnings("serial")
@Data
public class SrRqstSubmit implements Serializable{
	private String srRqstNo;		//sr요청번호
	private String srTtl;			//sr제목
	private String srPrps;			//sr목적
	private String srReqstrNo;		//사용자 번호(요청자)
	private String srConts;			//sr내용
	private Date srRqstRegDt;		//sr요청 등록일
	private Date srRqstMdfcnDt; 	//sr요청 최종수정일
	private String srRqstSttsNo;	//상태번호
	private String sysNo;			//시스템번호
	private String srRqstEmrgYn;	//중요여부
	private String srRqstRvwRsn;	//검토사유
	private String srRqstVldYn;		//sr요청 유효성(삭제여부)
	//첨부파일
	private MultipartFile[] file;
}
