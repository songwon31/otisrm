package com.finalteam5.otisrm.dto.sr;

import java.util.List;

import com.finalteam5.otisrm.dto.Pager;

import lombok.Data;

@Data
public class SrTrnsfFindPicModalCompose {
	List<SrTrnsfFindPicModalUsrInfo> usrList;
	Pager pager;
}
