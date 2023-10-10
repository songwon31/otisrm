<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%-- 
1) header.jsp의 소스 코드를 복사해서 붙여넣기 
2) 절대경로/는 웹애플리케이션의 로컬루트(WebContent 폴더)
--%>
<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/manager/mainM.css"/>
		<div id="sideMenu" class="container">
	        <div class="row">
	            <div class="col-3">
	                <div class="menu-group nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"> 
                    	<a class="menu-home nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                		<div id="menu-group-name1">SR 관리</div>	                	
	                    <a class="nav-link" id="v-pills-requires-tab" data-toggle="pill" href="#v-pills-requires" role="tab" aria-controls="v-pills-requires" aria-selected="false">SR 요청관리</a>
	                    <a class="nav-link" id="v-pills-reviews-tab" data-toggle="pill" href="#v-pills-reviews" role="tab" aria-controls="v-pills-reviews" aria-selected="false">SR 검토 관리</a>
	                    <a class="nav-link" id="v-pills-develop-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">SR 개발 관리</a>
	                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">SR 진척 관리</a>
                		<div id="menu-group-name2">게시판</div>	                	
	                    <a class="nav-link" id="v-pills-require-tab" data-toggle="pill" href="#v-pills-require" role="tab" aria-controls="v-pills-profile" aria-selected="false">공지사항</a>
	                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">QnA 게시판</a>
	                </div>
	            </div>
	            <div class="menuContent col-9">
	                <div class="tab-content" id="v-pills-tabContent">
	                    <div class="menuitem tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
	                        <h3>메뉴 1 내용</h3>
	                        <p>이곳에 메뉴 1의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-requires" role="tabpanel" aria-labelledby="v-pills-requires-tab">
	                        <h3>요청관리</h3>
	                        <p>이곳에 메뉴 2의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-reviews" role="tabpanel" aria-labelledby="v-pills-reviews-tab">
	                        <h3>검토관리</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
	                        <h3>메뉴 4 내용</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
	                        <h3>메뉴 5 내용</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
	                        <h3>메뉴 6 내용</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
	                        <h3>메뉴 7 내용</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
