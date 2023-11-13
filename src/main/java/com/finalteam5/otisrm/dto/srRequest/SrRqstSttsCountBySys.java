package com.finalteam5.otisrm.dto.srRequest;

import lombok.Data;

@Data
public class SrRqstSttsCountBySys {
	private String sysNm;
	private int rqstCount;
	private int aprvWaitCount;
	private int aprvReexamCount;
	private int aprvReturnCount;
	private int aprvCount;
	private int rcptWaitCount;
	private int rcptReexamCount;
	private int rcptReturnCount;
	private int rcptCount;
	private int depIngCount;
	private int testCount;
	private int cmptnRqstCount;
	private int depCmptnCount;
}
