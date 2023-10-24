<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>

<style>
	body {
	    background-color: #f1f1f1;
	    font-family: Arial, sans-serif;
	}
	
	.error-container {
	    text-align: center;
	    padding: 50px;
	    margin-top: 100px;
	    background-color: #fff;
	    border-radius: 5px;
	}
	
	h1 {
	    font-size: 36px;
	    color: #333;
	}
	
	p {
	    font-size: 18px;
	    color: #777;
	    margin-bottom: 20px;
	}
	
	a {
	    font-size: 18px;
	    color: #007bff;
	    text-decoration: none;
	}
	
	a:hover {
	    text-decoration: underline;
	}
</style>

<%@ include file="/WEB-INF/views/common/header.jsp"%>

<div class="error-container">
	<h1>404 - Not Found</h1>
	<p>Sorry, the page you are looking for does not exist.</p>
	<a href="${pageContext.request.contextPath}/">Go back to the homepage</a>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>