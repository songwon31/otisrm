package com.finalteam5.otisrm.dto.inq.inqAns;

import lombok.Data;

@Data
public class InqAnsAtch {
	private String inqAnsAtchNo;		//문의답변 첨부파일 번호
	private String inqAnsNo;			//문의답변 번호
	private String inqAnsAtchNm;		//문의답변 첨부파일 이름
	private String inqAnsAtchMimeType;	//문의답변 첨부파일 타입
	private byte[] inqAnsAtchData;		//문의답변 첨부파일 데이터
	private long inqAnsAtchSize;		//문의답변 첨부파일 크기
}
