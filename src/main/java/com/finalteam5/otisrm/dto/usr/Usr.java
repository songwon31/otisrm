package com.finalteam5.otisrm.dto.usr;

import java.util.Date;

import lombok.Data;

@Data
public class Usr {
	String usrNo;			//사용자 번호
	String usrId;			//사용자 아이디
	String usrPswd;		//사용자 비밀번호
	String usrNm;			//사용자 이름
	String usrRrnm;		//사용자 주민번호
	String usrTelno;		//사용자 전화번호
	String usrEml;			//사용자 이메일
	String instNo;			//기관번호
	String deptNo;			//부서번호
	String roleNo;			//역할번호
	String usrAuthrtNo;	//사용자권한번호
	String usrSttsNo;		//사용자상태번호
	String lgnFailCnt;		//로그인 실패 횟수
	String rprsImg;			//대표이미지
	Date usrJoinDt;		//가입일
	Date usrWhdwlDt;		//탈퇴일	
}
