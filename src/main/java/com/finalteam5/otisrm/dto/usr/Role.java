package com.finalteam5.otisrm.dto.usr;

import lombok.Data;

@Data
public class Role {
	String roleNo;		//역할번호
	String roleNm;		//역할이름
	String instNo;		//소속기관번호
	int roleSeq;
}
