package com.finalteam5.otisrm.dto.user;

import lombok.Data;

@Data
public class Login {
	String userNo;			//사용자 번호
	String userId;			//사용자 아이디
	String userPswd;		//사용자 비밀번호
}
