package com.finalteam5.otisrm.dto;

import java.util.Date;

import lombok.Data;

@Data
public class SrTrnsfPlan {
	private String srNo;			
	private String usrNo;		
	private String srDmndNo;		
	private String deptNo;			
	private Date srTrgtBgngDt;	
	private Date srTrgtCmptnDt;
	private String instNo;			
	private String srTrnsfNote;		
	private String srPrgrsSttsNo;
	private Float totalCapacity;
	private Integer totalBusinessDt;
}
