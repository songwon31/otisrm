package com.finalteam5.otisrm.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {
	@Override
	public void onLogoutSuccess(
			HttpServletRequest request, 
			HttpServletResponse response, 
			Authentication authentication) throws IOException, ServletException {
		
		log.info("실행");
		
		//로그아웃 성공시 리다이렉트로 이동할 경로
		//생략: 컨텍스트 루트 경로(/index.jsp)로 리다이렉트 , 지정: defaultTargetUrl로 리다이렉트
		//setDefaultTargetUrl("/ch17/content");
		
		super.onLogoutSuccess(request, response, authentication);
	}
}

