package com.finalteam5.otisrm.dto.sr;

import java.util.Date;

import lombok.Data;

@Data
public class SrPrgrsForDeveloperHome {
	private String srPrgrsSttsNm;	//진척 관리 이름(분석, 설계, ...)
	private Date srPrgrsBgngDt;		//진척 시작일
	private Date srPrgrsCmptnDt;	//진척 완료일
	private int srPrgrs;			//진척률(%)
}
