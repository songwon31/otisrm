package com.finalteam5.otisrm.dto.ntc;

import lombok.Data;

@Data
public class NtcAtch {
	private String ntcAtchNo;		//공지사항 첨부파일 번호
	private String ntcNo;			//공지사항 번호
	private String ntcAtchNm;		//첨부파일 이름
	private String ntcAtchMimeType;	//첨부파일 타입
	private byte[] ntcAtchData;		//첨부파일 데이터
	private long ntcAtchSize;		//첨부파일 크기
}
