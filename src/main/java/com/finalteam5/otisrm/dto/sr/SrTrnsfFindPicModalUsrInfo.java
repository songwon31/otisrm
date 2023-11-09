package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.SrDmndClsf;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Usr;

import lombok.Data;

@Data
public class SrTrnsfFindPicModalUsrInfo {
	private String deptNm;
	private String roleNm;
	private String ibpsNm;
	private String usrNm;
	private String usrNo;
}
