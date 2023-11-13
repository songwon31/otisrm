package com.finalteam5.otisrm.dto;

import lombok.Data;

@Data
public class SrTrnsfPlanForm {
	private String srNo;
	private String deptNm;
	private String usrNm;
	private String srTrgtBgngDt;
	private String srTrgtCmptnDt;
	private String instNo;	
	private String srTrnsfNote;
	private String srDmndNo;
	private Integer totalCapacity;
	private Integer totalBusinessDt;
	
	
	private String usrNo;				
	private String deptNo;							
	private String srPrgrsSttsNo;
}
