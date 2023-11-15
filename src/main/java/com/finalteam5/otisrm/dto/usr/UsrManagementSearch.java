package com.finalteam5.otisrm.dto.usr;

import lombok.Data;

@Data
public class UsrManagementSearch {
	private String usrAuthrt;
	private String usrStts;
	private String keywordCategory;
	private String keywordContent;
	private String usrInst;
	private String usrDept;
	private String joinDateStart;
	private String joinDateEnd;
	private String whdwlUsrCheck;
}
