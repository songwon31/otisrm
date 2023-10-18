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
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
      
      <!-- loading-overlay를 사용하기 위한 라이브러리 -->
      <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
   </head>
   <script src="${pageContext.request.contextPath}/resources/js/mainM.js"></script>
   <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/header.css"/>
   <!-- logo -->
   <style>
   	@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&display=swap');
	#logo-text{
		font-family: 'Archivo Black', sans-serif;
	}
   </style>
   
   <!-- 아이콘 사용을 위한 라이브러리 -->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
   
   <body>
	<div id="bodyDiv" class="d-flex flex-column vh-100"> 
	   	<nav class="navbar navbar-expand navbar-light topbar static-top shadow">
			<a class="font-sans-serif text-primary" href="#">
			    <div id="logo-header" class="d-flex">
			    	<div>			    	
						<img class="mt-1 me-2" src="${pageContext.request.contextPath}/resources/images/srmlogo.png" alt="" width="40">
			    	</div>			    
			    	<div id="logo-text" class="text-primary">SRM</div>
			    </div>
			</a>
		    <!-- Sidebar Toggle (Topbar) -->
		    <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
		        <i class="fa fa-bars"></i>
		    </button>
		
		    <!-- Topbar Navbar -->
		    <ul class="navbar-nav ml-auto">
		
		        <!-- Nav Item - Search Dropdown (Visible Only XS) -->
		        <li class="nav-item dropdown no-arrow d-sm-none">
		            <a class="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <i class="fas fa-search fa-fw"></i>
		            </a>
		            <!-- Dropdown - Messages -->
		            <div class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
		                <form class="form-inline mr-auto w-100 navbar-search">
		                    <div class="input-group">
		                        <input type="text" class="form-control bg-light border-0 small" placeholder="Search for..." aria-label="Search" aria-describedby="basic-addon2">
		                        <div class="input-group-append">
		                            <button class="btn btn-primary" type="button">
		                                <i class="fas fa-search fa-sm"></i>
		                            </button>
		                        </div>
		                    </div>
		                </form>
		            </div>
		        </li>
		
		        <!-- Nav Item - Alerts -->
		        <li class="nav-item dropdown no-arrow mx-1">
		            <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <i class="fas fa-bell fa-fw"></i>
		                <!-- Counter - Alerts -->
		                <span class="badge badge-danger badge-counter">3+</span>
		            </a>
		            <!-- Dropdown - Alerts -->
		            <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" style="color: white; " aria-labelledby="alertsDropdown">
		                <h6 class="dropdown-header">
		                    Alerts Center
		                </h6>
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
		        </li>
		
		        <!-- Nav Item - User Information -->
		        <li class="nav-item dropdown no-arrow">
		            <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		                <img class="img-profile rounded-circle" src="https://themewagon.github.io/stisla-1/assets/img/avatar/avatar-1.png" width="25">
		                <span id="profile_name" class="mr-2 d-none d-lg-inline text-gray-600 small">송원석</span>
		                <span id="profile_authority" class="mr-2 d-none d-lg-inline text-gray-600 small">(SR유지보수)</span>
		            </a>
		            <!-- Dropdown - User Information -->
		            <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby="userDropdown">
		                <a class="dropdown-item" href="#">
		                    <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
		                    Profile
		                </a>
		                <a class="dropdown-item" href="#">
		                    <i class="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
		                    Settings
		                </a>
		                <div class="dropdown-divider"></div>
		                <a class="dropdown-item" href="#" data-toggle="modal" data-target="#logoutModal">
		                    <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
		                    Logout
		                </a>
		            </div>
		        </li>
		
		    </ul>
		</nav>	
    	<div id="background" class="flex-grow-1 container-fluid px-3 py-3">
            <div class="ml-2 row h-100">
               <div id="side-menu" class="col-md-2 p-3">
                  <div class="h-100 d-flex flex-column">
                     <div  class="flex-grow-1" style="height: 0px; overflow-y: auto; overflow-x: hidden;">
					<%-- 
					1) menu.jsp의 소스 코드를 복사해서 붙여넣기 
					2) 절대경로/ 웹애플리케이션의 로컬루트(WebContent 폴더)
					--%>
                    <%@ include file="/WEB-INF/views/common/menu.jsp" %>
                  </div>
               </div>
            </div>

            <div class="col-md-10 pl-3 pr-0">
                  <div class=" h-100 d-flex flex-column">
                     <div class="flex-grow-1 overflow-auto" style="height: 0px">

               
	  