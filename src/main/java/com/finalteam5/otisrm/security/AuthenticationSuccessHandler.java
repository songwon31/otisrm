package com.finalteam5.otisrm.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SavedRequestAwareAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

/*
SimpleUrlAuthenticationSuccessHandler
	로그인 성공후에 무조건 defaultTartUrl으로 이동
SavedRequestAwareAuthenticationSuccessHandler
	로그인 성공후에 사용자가 접근하고자 했던 페이지로 이동
*/

//@Component
@Slf4j
//public class Ch17AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler  {
public class AuthenticationSuccessHandler extends SavedRequestAwareAuthenticationSuccessHandler {
	@Override
	public void onAuthenticationSuccess(
			HttpServletRequest request, 
			HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		
		log.info("실행");
		
		//로그인 성공후 리다이렉트로 이동할 경로
		//false(기본)-요청 경로로 리다이렉트, true-defaultTargetUrl로 리다이렉트
		/*setAlwaysUseDefaultTargetUrl(true);
		setDefaultTargetUrl("/");*/
		
		super.onAuthenticationSuccess(request, response, authentication);
	}
	
}

