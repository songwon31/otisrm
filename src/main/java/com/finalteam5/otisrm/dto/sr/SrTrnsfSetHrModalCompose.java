package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;

import lombok.Data;

@Data
public class SrTrnsfSetHrModalCompose {
	private String deptNm;
	private String analysisPicNm;
	private String designPicNm;
	private String implementPicNm;
	private String testPicNm;
	private String applyRequestPicNm;
}
