package com.finalteam5.otisrm.dto.sr;

import java.util.Date;
import java.util.List;

import com.finalteam5.otisrm.dto.Pager;

import lombok.Data;

@Data
public class SrTableElementsForDeveloperHome {
	private String tableFilter;						//테이블 탭 필터 정보
	private int totalNum;
	private int requestNum;
	private int analysisNum;
	private int receiptNum;
	private int designNum;
	private int implementNum;
	private int testNum;
	private int applyNum;
	private List<SrForDeveloperHomeBoard> srList;	//테이블 본문에 적용될 정보
	private Pager pager;							//Pager 정보
}
