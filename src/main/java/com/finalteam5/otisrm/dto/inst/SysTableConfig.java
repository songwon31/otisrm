package com.finalteam5.otisrm.dto.inst;

import java.util.List;

import com.finalteam5.otisrm.dto.Pager;
import com.finalteam5.otisrm.dto.Sys;

import lombok.Data;

@Data
public class SysTableConfig {
	private List<Sys> sysList;	//테이블 본문에 적용될 정보
	private Pager pager;							//Pager 정보
}
