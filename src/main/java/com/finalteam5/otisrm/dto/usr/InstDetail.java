package com.finalteam5.otisrm.dto.usr;

import java.util.List;

import lombok.Data;

@Data
public class InstDetail {
	String instNo;			//기관 코드
	String instNm;			//기관 이름
	String outsrcYn;		//외부회사여부
	List<Ibps> ibpsList;
	List<Role> roleList;
	List<Dept> deptList;
}
