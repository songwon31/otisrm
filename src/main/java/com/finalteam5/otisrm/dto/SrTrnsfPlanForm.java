package com.finalteam5.otisrm.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SrTrnsfPlanForm {
	private String srNo;
	private String deptNm;
	private String usrNm;
	private String srTrgtBgngDt;
	private String srTrgtCmptnDt;
	private String srTrnsfNote;
}
