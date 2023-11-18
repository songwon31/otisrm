package com.finalteam5.otisrm.dto.sr;

import java.util.List;

import com.finalteam5.otisrm.dto.Sys;
import com.finalteam5.otisrm.dto.srRequest.SrRqstStts;
import com.finalteam5.otisrm.dto.usr.Dept;
import com.finalteam5.otisrm.dto.usr.Inst;

import lombok.Data;

@Data
public class SrManagementSearchConfig {
	List<Sys> sysList;
	List<Inst> reqstrInstList;
	List<Dept> deptList;
	List<SrRqstStts> srRqstSttsList;
}
