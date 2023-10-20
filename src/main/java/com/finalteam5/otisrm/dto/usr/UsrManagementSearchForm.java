package com.finalteam5.otisrm.dto.usr;

import java.util.List;

import lombok.Data;

@Data
public class UsrManagementSearchForm {
	private String usrAuthrt;
	private String usrStts;
	private String keywordCategory;
	private String keywordContent;
	private String usrInst;
	private String usrDept;
	private String joinDateStart;
	private String joinDateEnd;
}
