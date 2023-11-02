package com.finalteam5.otisrm.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SrPrgrs {
	private String srPrgrsNo;
	private String srNo;
	private String srPrgrsSttsNo;
	private Date srPrgrsBgngDt;
	private Date srPrgrsCmptnDt;
	private Integer srPrgrs;
	private String usrNo;
}
