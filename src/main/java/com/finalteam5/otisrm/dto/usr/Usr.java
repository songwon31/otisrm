package com.finalteam5.otisrm.dto.usr;

import java.util.Date;

import lombok.Data;

@Data
public class Usr {
	private String usrNo;			//사용자 번호
	private String usrId;			//사용자 아이디
	private String usrPswd;			//사용자 비밀번호
	private String usrNm;			//사용자 이름
	private String usrRrno;			//사용자 주민번호
	private String usrTelno;		//사용자 전화번호
	private String usrEml;			//사용자 이메일
	private String instNo;			//기관번호
	private String instNm;			//기관이름
	private String deptNo;			//부서번호
	private String roleNo;			//역할번호
	private String ibpsNo;			//직위번호
	private String usrAuthrtNo;		//사용자권한번호
	private String usrAuthrtNm;		//사용자권한이름
	private String usrSttsNo;		//사용자상태번호
	private String lgnFailCnt;		//로그인 실패 횟수
	private String rprsImg;			//대표이미지
	private Date usrJoinDt;			//가입일
	private Date usrWhdwlDt;		//탈퇴일	
}
