package com.finalteam5.otisrm.dto.ntc;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class NtcSubmit {
	private String ntcNo;			//공지사항 번호
	private String usrNo;			//등록자 번호
	private String ntcTtl;			//제목
	private String ntcConts;		//내용	
	private Date ntcWrtDt;			//등록일
	private Date ntcMdfcnDt;		//수정일	
	private int ntcInqCnt;			//조회수		
	private String ntcEmrgYn;		//중요여부(중요일 경우 상단 고정을 위함)	
	//첨부파일
	private MultipartFile[] file;
}
