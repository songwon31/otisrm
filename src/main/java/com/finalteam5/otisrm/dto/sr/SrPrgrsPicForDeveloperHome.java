package com.finalteam5.otisrm.dto.sr;

import java.util.List;

import lombok.Data;

@Data
public class SrPrgrsPicForDeveloperHome {
	private String usrNo;
	private String usrNm;
	private String roleNm;
	private List<String> sttsList;
}
