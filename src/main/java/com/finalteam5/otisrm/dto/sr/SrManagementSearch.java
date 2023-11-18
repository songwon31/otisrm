package com.finalteam5.otisrm.dto.sr;

import lombok.Data;

@Data
public class SrManagementSearch {
	private String sysNo;
	private String rqstInstNo;
	private String dvlDeptNo;
	private String srRqstSttsNo;
	private String regDateStart;
	private String regDateEnd;
	private String keywordCategory;
	private String keywordContent;
	private String dvlCmptnSrCheck;
}
