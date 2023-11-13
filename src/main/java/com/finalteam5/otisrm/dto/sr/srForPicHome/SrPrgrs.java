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
