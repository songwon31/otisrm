package com.finalteam5.otisrm.dto.inq.inqAns;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class InqAns {
	private String inqAnsNo;		//문의 답변 번호	
	private String inqNo;			//문의 번호	
	private String usrNo;			//등록자
	private String usrNm;			//등록자 이름
	private String inqAnsTtl;		//문의답변 제목
	private String inqAnsConts;		//문의답변 내용
	private Date inqAnsWrtDt;		//문의답변 작성일
	private Date inqAnsMdfcnDt;		//문의답변 수정일
	
	//첨부파일 
	private List<InqAnsAtch> inqAnsAtchList;
}
