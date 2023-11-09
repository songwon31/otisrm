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
	private Integer planCapacity;
	private Integer performanceCapacity;
	private Date lastRegDt;
	private Integer lastRegCapacity;
	private Date srTrgtBgngDt;
	private Date srTrgtCmptnDt;
}
