package com.finalteam5.otisrm.dto.sr;

import java.util.List;

import com.finalteam5.otisrm.dto.SrPrgrsStts;
import com.finalteam5.otisrm.dto.SrTaskClsf;
import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.usr.Inst;

import lombok.Data;

@Data
public class ProgressManagementSearchCompose {
	private List<Sys> sysList;
	private List<SrTaskClsf> taskList;
	private List<SrPrgrsStts> srPrgrsSttsList;
	private List<Inst> instList;
}
