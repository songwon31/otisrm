<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/customer/home.css"/>
	<div id="sideMenu" class="container">
        <div class="row">
            <div class="col-3">
                <div class="menu-group nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"> 
                   	<a class="menu-home nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
               		<div id="menu-group-name">SR 관리</div>	                	
                    <a class="nav-link" id="v-pills-require-tab" data-toggle="pill" href="#v-pills-require" role="tab" aria-controls="v-pills-profile" aria-selected="false">SR 요청관리</a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">메뉴 3</a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">메뉴 3</a>
                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">메뉴 3</a>
                </div>
            </div>
            <div class="menuContent col-9">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="menuitem tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                        <h3>메뉴 1 내용</h3>
                        <p>이곳에 메뉴 1의 내용을 작성하세요.</p>
                    </div>
                    <div class="menuitem tab-pane fade" id="v-pills-require" role="tabpanel" aria-labelledby="v-pills-require-tab">
                        <h3>메뉴 2 내용</h3>
                        <p>이곳에 메뉴 2의 내용을 작성하세요.</p>
                    </div>
                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                        <h3>메뉴 3 내용</h3>
                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>