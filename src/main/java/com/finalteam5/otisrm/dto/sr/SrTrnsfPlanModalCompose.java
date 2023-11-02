package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;

import lombok.Data;

@Data
public class SrTrnsfPlanModalCompose {
	//sr값
	private String srTaskNm;
	
	//기존값(존재할 경우0
	private String srDmndNm;
	private String deptNm;
	private String usrNm;
	private Date srTrgtBgngDt;
	private Date srTrgtCmptnDt;
	private String srTrnsfNote;
}