package com.finalteam5.otisrm.dto.sr.srForPicHome;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.SrDmndClsf;

import lombok.Data;

@Data
public class SrPrgrs {
	private String srPrgrsNo;		//sr진척률 번호
	private String srNo;			//sr 번호
	private String srPrgrsSttsNo;	//sr 진척률 상태 상태번호	
	private String srPrgrsSttsNm;	//sr 진척률 상태 상태	
	private Date srPrgrsBgngNo;		//작업 시작일	
	private Date srPrgrsCmptnNo;	//작업 종료일	
	
	//sr 요청
	private String srRqstNo;		//sr요청 번호
	private String srRqstSttsNo;	//sr요청 상태 번호
}

/*SR_PRGRS_NO	VARCHAR2(50 BYTE)	No		1	
SR_NO	VARCHAR2(20 BYTE)	No		2	
SR_PRGRS_STTS_NO	VARCHAR2(20 BYTE)	No		3	
SR_PRGRS_BGNG_DT	DATE	Yes		4	
SR_PRGRS_CMPTN_DT	DATE	Yes		5	
SR_PRGRS	NUMBER	Yes		6	*/