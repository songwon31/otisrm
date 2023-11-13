package com.finalteam5.otisrm.dto.usr;

import java.util.List;

import com.finalteam5.otisrm.dto.Pager;

import lombok.Data;

@Data
public class InstTableConfigForInstManagement {
	private List<InstForInstManagementBoard> instList;	//테이블 본문에 적용될 정보
	private Pager pager;							//Pager 정보
}
