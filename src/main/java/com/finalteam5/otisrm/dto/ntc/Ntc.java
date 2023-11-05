package com.finalteam5.otisrm.dto.ntc;

import java.util.Date;

import lombok.Data;

@Data
public class Ntc {
	String ntcNo;		//공지사항 번호
	String usrNo;		//등록자 번호
	String usrNm;		//등록자 이름
	String ntcTtl;		//제목
	String ntcConts;	//내용	
	Date ntcWrtDt;		//등록일
	Date ntcMdfcnDt;	//수정일	
	int ntcInqCnt;		//조회수		
	int ntcEmrgYn;		//중요여부(중요일 경우 상단 고정을 위함)		
}
