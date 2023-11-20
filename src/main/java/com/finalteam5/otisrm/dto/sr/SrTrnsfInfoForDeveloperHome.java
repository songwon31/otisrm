package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class SrTrnsfInfoForDeveloperHome {
	private String srDmndNm;			//요청 구분
	private String srTaskNm;			//업무 구분
	private String instNm;				//요청사
	private String deptNm;				//요청팀
	private String usrNo;
	private String usrNm;				//요청사 담당자명
	private Date srTrgtBgngDt;			//목표시작일
	private Date srTrgtCmptnDt;			//목표종료일
	private String srTrnsfNote;			//참고사항
	private Integer totalCapacity;		//총 계획공수
	
	private List<SrPrgrsForDeveloperHome> srPrgrsList;	//진척 단계별 상세
	
	private List<SrTrnsfHr> srTrnsfHrList;	//인적자원 표시용 리스트
}
