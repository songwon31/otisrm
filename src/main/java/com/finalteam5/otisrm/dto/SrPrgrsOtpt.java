package com.finalteam5.otisrm.dto;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class SrPrgrsOtpt {
	private String srPrgrsOtptNo;
	private String srPrgrsNo;
	private String srPrgrsOtptNm;
	private String srPrgrsOtptMimeType;
	private byte[] srPrgrsOtptDataByteArray;
	private MultipartFile srPrgrsOtptData;
	private Long srPrgrsOtptSize;
	private String srPrgrsOtptFileNm;
	private Date srPrgrsOtptRegDt;
	private String usrNo;
	private String usrNm;
}
