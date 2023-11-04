<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<!DOCTYPE html>
<html>
   <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="${pageContext.request.contextPath}/resources/yuimg/favicon.png" type="image/x-icon">
      <title>OtiSRM</title>
      
      <!-- Bootstrap을 사용하기 위한 외부 라이브러리 가져오기 -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   	  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
      
      <!-- loading-overlay를 사용하기 위한 라이브러리 -->
      <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
      
      <!-- 엑셀다운로드를 위한 라이브러리 -->
      <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
      
      <!-- javascript 코드 -->
      <script src="${pageContext.request.contextPath}/resources/javascript/common/header.js"></script>
      
      <!-- css 코드 -->
      <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/header.css"/>
   
	  <!-- 아이콘 사용을 위한 라이브러리 -->
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
	  
   </head>
   
   
   <body>
	<div id="bodyDiv" class="shadow">
	   	<nav id="header-bar" class="shadow navbar-expand navbar-light">
		    <div id="logo">		    	
				<img id="logo-img" src="${pageContext.request.contextPath}/resources/images/logo2.png" alt=""/>
				<span id="logo-gap"></span>	    
		    	<span id="logo-text">SRM</span>
		    </div>
	
		    <!-- Topbar Navbar -->
		    <div id="header-list">
		        <!-- Nav Item - Alerts -->
		        <div class="dropdown">
		            <a class="dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
		            	style="padding:0.9rem 0rem; font-size:2rem; 0rem; display:flex; flex-direction:row; align-items:center;">
		                <i class="fas fa-bell fa-fw"></i>
		                <div style="width:0.5rem;"></div>
		                <!-- Counter - Alerts -->
		                <span class="badge badge-danger badge-counter" style="font-size: 1.5rem;">3+</span>
		                <div style="width:0.5rem;"></div>
		            </a>
		            <!-- Dropdown - Alerts -->
		            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" 
		            	style="font-size:2rem; color: white; " aria-labelledby="alertsDropdown">
		                <div class="dropdown-header" style="font-size:2rem;">
		                    Alerts Center
		                </div>
		                <a class="dropdown-item d-flex align-items-center" href="#">
		                    <div class="mr-3">
		                        <div class="icon-circle bg-success">
		                            <i class="fas fa-file-alt text-white"></i>
		                        </div>
		                    </div>
		                    <div>
		                        <div class="small text-gray-500">December 12, 2019</div>
		                        <span class="font-weight-bold">A new monthly report is ready to download!</span>
		                    </div>
		                </a>
		                <a class="dropdown-item d-flex align-items-center" href="#">
		                    <div class="mr-3">
		                        <div class="icon-circle bg-success">
		                            <i class="fas fa-donate text-white"></i>
		                        </div>
		                    </div>
		                    <div>
		                        <div class="small text-gray-500">December 7, 2019</div>
		                        $290.29 has been deposited into your account!
		                    </div>
		                </a>
		                <a class="dropdown-item d-flex align-items-center" href="#">
		                    <div class="mr-3">
		                        <div class="icon-circle bg-warning">
		                            <i class="fas fa-exclamation-triangle text-white"></i>
		                        </div>
		                    </div>
		                    <div>
		                        <div class="small text-gray-500">December 2, 2019</div>
		                        Spending Alert: We've noticed unusually high spending for your account.
		                    </div>
		                </a>
		                <a class="dropdown-item text-center small text-gray-500" href="${pageContext.request.contextPath}/alerts">Show All Alerts</a>
		            </div>
		        </div>
		
				<div style="width:3rem;"></div>
		
		        <!-- Nav Item - User Information -->
		        <div class="dropdown" style="height:4rem;">
		            <a class="dropdown-toggle p-0" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
		            	style="font-size: 2rem; display:flex; flex-direction:row; align-items:center;">
		                <img class="img-profile rounded-circle" src="https://themewagon.github.io/stisla-1/assets/img/avatar/avatar-1.png" style="height:4rem; width:4rem; margin-right:1rem;">
		                <span id="profile_name" class="d-none d-lg-inline text-gray-600 small" style="font-size:1.7rem; margin-right:0.7rem;">${usr.usrNm}</span>
		                <span id="profile_authority" class="d-none d-lg-inline text-gray-600 small" style="font-size:1.7rem; margin-right:0.7rem;">(${usr.usrAuthrtNm})</span>
		            </a>
		            <!-- Dropdown - User Information -->
		            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown"
		            	style="font-size:2rem;">
		                <a class="dropdown-item" href="#">
		                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
		                    Profile
		                </a>
		                <a class="dropdown-item" href="#">
		                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
		                    Settings
		                </a>
		                <div class="dropdown-divider"></div>
		                <form class="dropdown-item" action="${pageContext.request.contextPath}/logout">
		                	<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}"/>
		                	<button style="background-color: transparent; border: none;">
		                		<i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
		                    	Logout
		                	</button>
		                </form>
		            </div>
		        </div>   
		    </div>
		</nav>	
    	<div id="background">
        	<div style="display:flex; flex-direction:row;">
				<%-- 
				1) menu.jsp의 소스 코드를 복사해서 붙여넣기 
				2) 절대경로/ 웹애플리케이션의 로컬루트(WebContent 폴더)
				--%>
                <%@ include file="/WEB-INF/views/common/menu.jsp" %>
	
	            <div style="height: 88rem; width:85%; padding-left:2rem;">

               
	  
