package com.finalteam5.otisrm.dto.inq.inq;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class Inq {
	private String inqNo;		//문의 번호	
	private String usrNo;		//등록자
	private String usrNm;		//등록자 이름
	private String inqTtl;		//문의 제목
	private String inqConts;	//문의 내용
	private Date inqWrtDt;		//문의 작성일
	private Date inqMdfcnDt;	//문의 수정일
	private String inqPrvtYn;	//문의 비밀글 여부	
	private String inqAns;		//문의 답변
	private String inqAnsYn;    //답변 여부
	
	//첨부파일 
	private List<InqAtch> inqAtchList;
}
