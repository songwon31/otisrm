package com.finalteam5.otisrm.dto.srRequest;

import lombok.Data;

@Data
public class SrRqstAtch {
	private String srRqstAtchNo;
	private String srRqstNo;
	private String srRqstAtchNm;
	private String srRqstAtchMimeType;
	private byte[] srRqstAtchData;
	private  int srRqstAtchSize;
}
