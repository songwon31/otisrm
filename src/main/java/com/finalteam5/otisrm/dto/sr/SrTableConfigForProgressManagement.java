package com.finalteam5.otisrm.dto.sr;

import java.util.List;

import com.finalteam5.otisrm.dto.Pager;

import lombok.Data;

@Data
public class SrTableConfigForProgressManagement {
	private List<SrForProgressManagementBoard> srList;	//테이블 본문에 적용될 정보
	private Pager pager;							//Pager 정보
}
