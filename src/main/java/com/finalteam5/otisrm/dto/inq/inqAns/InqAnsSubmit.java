package com.finalteam5.otisrm.dto.inq.inqAns;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class InqAnsSubmit {
	private String inqAnsNo;		//문의답변 번호
	private String inqNo;			//문의답변 번호
	private String usrNo;			//등록자
	private String inqAnsTtl;		//문의답변 제목
	private String inqAnsConts;		//문의답변 내용
	private Date inqAnsWrtDt;		//문의답변 작성일
	private Date inqAnsMdfcnDt;		//문의답변 수정일
	
	//첨부파일
	private MultipartFile[] file;
}
