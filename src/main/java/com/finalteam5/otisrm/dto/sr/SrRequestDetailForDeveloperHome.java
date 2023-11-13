package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.sr.srForPicHome.SrAtch;

import lombok.Data;

@Data
public class SrRequestDetailForDeveloperHome {
	private String srNo;				//sr번호
	private String srRqstNo;			//sr요청번호
	private String sysNm;				//시스템 구분
	private String srTaskNm;			//업무 구분
	private String srTtl;				//sr제목
	private String srPrps;				//sr목적
	private String deptNm;				//요청팀
	private String usrNm;				//요청자
	private Date srRqstRegDt;			//요청일
	private Date srCmptnPrnmntDt;		//완료 요청일
	private Date srTrnsfDt;				//유지보수 이관일
	private String InstNm;				//협력사
	private String srConts;				//sr요청내용
	private String srDvlConts;			//sr개발내용
	List<SrAtch> srAtchList;
}
