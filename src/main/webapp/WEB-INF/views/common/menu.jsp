<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/menu.css"/>

<div class="menu-group-nm nav-link dropdown-indicator collapsed">
	<div class="d-flex align-items-center">
	  	<div class="mr-2">
	  		<span class="nav-link-icon" class="nav-link-icon mr-2">
	  			<svg class="svg-inline--fa fa-user fa-w-14"
	  			 aria-hidden="true" focusable="false" width="20"
	  			 data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" 
	  			 viewBox="0 0 448 512" data-fa-i2svg="">
	  			 <path fill="currentColor" 
	  			 d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 
	  			 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 
	  			 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z">
	  			 </path></svg></span>
	  	</div>
	  	<div>My Potal</div>
  </div>
</div>
<ul class="mt-3 ml-3 nav flex-column">
  <li class="nav-item mb-3">
     <a href="#">나의 할일</a>
  </li> 
</ul>

<div class="menu-group-nm nav-link dropdown-indicator collapsed">
  <div class="d-flex align-items-center">
	  <div>  
		  <span id="menu-group-icon1" class="nav-link-icon mr-2">
			  <svg class="svg-inline--fa fa-chart-pie fa-w-17" 
				  aria-hidden="true" data-prefix="fas" width="20"
				  data-icon="chart-pie" role="img" xmlns="http://www.w3.org/2000/svg" 
				  viewBox="0 0 544 512" data-fa-i2svg="">
				  <path fill="currentColor" 
				  d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 
				  1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 
				  16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 
				  280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z">
				  </path>
				</svg></span>
	  </div>
	  <div>SR 관리</div>
  </div>
</div>
<ul class="mt-3 ml-3 nav flex-column">
   <li class="nav-item mb-3">
      <a href="#">SR요청관리</a>
   </li>         
   <li class="nav-item mb-3">
      <a href="#">SR검토관리</a>
   </li>              
   <li class="nav-item mb-3">
      <a href="#">SR개발관리</a>
   </li>              
   <li class="nav-item mb-3">
      <a href="#">SR진척관리</a>
   </li> 
</ul>
<div class="menu-group-nm nav-link dropdown-indicator collapsed mt-3">
	<div class="d-flex align-items-center">
	  <div>  
		  <span id="menu-group-icon2" class="nav-link-icon">
		  	<svg class="svg-inline--fa fa-table fa-w-16" 
		  	aria-hidden="true" data-prefix="fas" width="20"
		  	data-icon="table" role="img" xmlns="http://www.w3.org/2000/svg" 
		  	viewBox="0 0 544 512" data-fa-i2svg="">
		  	<path fill="currentColor" d="M464 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zM224 
		  	416H64v-96h160v96zm0-160H64v-96h160v96zm224 160H288v-96h160v96zm0-160H288v-96h160v96z">
		  	</path></svg></span><span class="nav-link-text ps-1"></span>
	  </div>
	  <div>게시판</div>
	</div>
</div>
<ul class="mt-2 ml-3 nav flex-column">   
 <li class="nav-item mt-2 mb-3">
    <a href="${pageContext.request.contextPath}/ch05/content">공지사항</a>
 </li>              
 <li class="nav-item mb-3">
    <a href="#">문의게시판</a>
 </li>                                     
</ul>                           