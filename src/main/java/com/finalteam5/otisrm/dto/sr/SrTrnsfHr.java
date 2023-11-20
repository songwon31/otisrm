package com.finalteam5.otisrm.dto.sr;

import java.util.Date;

import lombok.Data;

@Data
public class SrTrnsfHr {
	private String srTrnsfHrNo;
	private String srNo;
	private String usrNo;
	private String usrNm;
	private String roleNm;
	private Float planCapacity;
	private Float performanceCapacity;
	private Date lastRegDt;
	private Float lastRegCapacity;
	private Date srTrgtBgngDt;
	private Date srTrgtCmptnDt;
}
