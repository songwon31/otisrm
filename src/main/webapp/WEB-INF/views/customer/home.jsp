<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/customer/home.css"/>
	<div id="sideMenu">
        <div style="display:flex; height:calc(100vh - 4.375rem);">
            <div class="col-2">
                <div class="menu-group nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical"> 
                   	<a class="menu-home nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Home</a>
                		<div id="menu-group-name1">SR 관리</div>	                	
	                    <a class="nav-link" id="v-pills-requires-tab" data-toggle="pill" href="#v-pills-requires" role="tab" aria-controls="v-pills-requires" aria-selected="false">SR 요청관리</a>
                		<div id="menu-group-name2">게시판</div>	                	
	                    <a class="nav-link" id="v-pills-board-tab" data-toggle="pill" href="#v-pills-require" role="tab" aria-controls="v-pills-profile" aria-selected="false">공지사항</a>
	                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">QnA 게시판</a>
                </div>
            </div>
            <div class="menuContent col-10" style="overflow-y: auto; flex-grow: 1;">
                <div class="tab-content" id="v-pills-tabContent">
                    <div class="menuitem tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
	                        <h3>Home</h3>
	                        <p>이곳에 메뉴 1의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-requires" role="tabpanel" aria-labelledby="v-pills-requires-tab">
	                        <h3>요청관리</h3>
	                        <p>이곳에 메뉴 2의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
	                        <h3>공지사항</h3>
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
	
</body>
</html>