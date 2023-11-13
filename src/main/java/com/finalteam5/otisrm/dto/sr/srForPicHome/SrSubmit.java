package com.finalteam5.otisrm.dto.sr.srForPicHome;

import java.util.Date;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class SrSubmit {
	private String srNo;			//sr 번호
	private String srRqstNo;		//sr 요청 번호
	private String picUsrNo;		//sr 담당자 번호
	private String srCmptnPrnmntDt;	//완료 예정일
	private int srReqBgt;			//sr 소요예산(이관할 경우)
	private String srPri;			//우선 순위(상,중,하)
	private String srDvlConts;		//sr 개발 내용
	private String srTrnsfYn;		//sr 이관여부
	private Date srRegDt;			//sr 개발계획 등록일
	private Date srMdfcnDt;			//sr 개발계획 최종 수정일
	private String srVldYn;			//sr 개발계획 유효성
	private String srTaskNo;		//업무번호
	private String srTaskNm;		//업무이름
	private String srTrnsfInstNo;	//이관 기관번호
	private Date srTrnsfDt;			//이관 날짜
	
	//완료예정일 변경 요청
	private String srSchdlChgRqstYn; //완료예정일 변경요청  승인여부
	private String srSchdlChgRqstDt; //변경 요청일 
	private String srSchdlChgAprvYn; //요청 승인 여부
	
	//요청 구분번호
	private String srDmndNo;		
	//첨부파일
	private MultipartFile[] file;
	
} 
