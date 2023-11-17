package com.finalteam5.otisrm.dto.inq.inq;

import lombok.Data;

@Data
public class InqAtch {
	private String inqAtchNo;		//문의게시판 첨부파일 번호
	private String inqNo;			//문의게시판 번호
	private String inqAtchNm;		//문의게시판 이름
	private String inqAtchMimeType;	//문의게시판 타입
	private byte[] inqAtchData;		//문의게시판 데이터
	private long inqAtchSize;		//문의게시판 크기
}
