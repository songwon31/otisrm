package com.finalteam5.otisrm.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class LoginCheckInterceptor implements HandlerInterceptor {
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HandlerMethod handlerMethod = (HandlerMethod) handler;
		Login login = handlerMethod.getMethodAnnotation(Login.class);
		if(login != null) {

			//@Login 붙어 있을 경우
			HttpSession session = request.getSession();
			Login usr = (Login) session.getAttribute("loginIng");
			//로그인이 되었다면
			if(usr != null) {
				return true;
			}else {
				session.setAttribute("redirectUrl", request.getRequestURL().toString());
				response.sendRedirect(request.getContextPath() + "/login");
				return false;
			}	
		} else {
			//@Login이 붙어 있지 않다면
			return true;
			
		}
	}
}
