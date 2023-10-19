package com.finalteam5.otisrm.dto.user;

import lombok.Data;

@Data
public class Login {
	private String usrNo;			//사용자 번호
	private String usrNm;			//사용자 이름
	private String usrAuthrtNo;		//사용자권한번호
	private String usrAuthrtNM;		//사용자권한이름
	private String usrId;			//사용자 아이디
	private String usrPswd;			//사용자 비밀번호
	private String usrSttsNo;		//사용자상태번호
	private byte[] rprsImg;			//대표이미지
	private String usrEcdImg;		//base64로 인코딩 된 이미지
}
