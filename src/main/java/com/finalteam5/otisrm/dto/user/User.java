package com.finalteam5.otisrm.dto.user;

import java.util.Date;

import lombok.Data;

@Data
public class User {
	String userNo;			//사용자 번호
	String userId;			//사용자 아이디
	String userPswd;		//사용자 비밀번호
	String userNm;			//사용자 이름
	String userRrnm;		//사용자 주민번호
	String userTelno;		//사용자 전화번호
	String userEml;			//사용자 이메일
	String instNo;			//기관번호
	String deptNo;			//부서번호
	String roleNo;			//역할번호
	String userAuthrtNo;	//사용자권한번호
	String userSttsNo;		//사용자상태번호
	String lgnFailCnt;		//로그인 실패 횟수
	String rprsImg;			//대표이미지
	Date userJoinDt;		//가입일
	Date userWhdwlDt;		//탈퇴일	
}
