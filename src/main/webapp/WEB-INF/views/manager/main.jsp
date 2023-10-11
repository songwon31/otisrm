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
	                    <a class="nav-link" id="v-pills-develop-tab" data-toggle="pill" href="#v-pills-develop" role="tab" aria-controls="v-pills-develop" aria-selected="false">SR 개발 관리</a>
	                    <a class="nav-link" id="v-pills-process-tab" data-toggle="pill" href="#v-pills-process" role="tab" aria-controls="v-pills-process" aria-selected="false">SR 진척 관리</a>
                		<div id="menu-group-name2">게시판</div>	                	
	                    <a class="nav-link" id="v-pills-board-tab" data-toggle="pill" href="#v-pills-require" role="tab" aria-controls="v-pills-profile" aria-selected="false">공지사항</a>
	                    <a class="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">QnA 게시판</a>
	                </div>
	            </div>
	            <div class="menuContent col-9">
	                <div class="tab-content" id="v-pills-tabContent">
	                    <div class="menuitem tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
	                        <div>
	                        	<select id="s-options"  class="form-control">
	                        		<option>전체</option>
	                        		<option>요청</option>
	                        		<option>검토중</option>
	                        		<option>접수</option>
	                        		<option>개발중</option>
	                        		<option>완료요청</option>
	                        		<option>개발완료</option>
	                        		<option>반려</option>
	                        		<option>재검토</option>
	                        		<option>개발계획</option>
	                        		<option>개발 조정</option>
	                        	</select>
	                        </div>
	                       	<table class="table">
								<thead class="thead-light">
									<tr>
										<th>요청번호</th>
										<th>제목</th>
										<th>관련 시스템</th>
										<th>상태</th>
										<th>완료 예정일</th>
										<th>진척도</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>OTI_SR_000001</td>
										<td>SRM 시스템 구축 요청</td>
										<td>오티아이SRM</td>
										<td>구현</td>
										<td>2023-11-10</td>
										<td>
											<div class="progress mb-4">
												<div class="progress-bar bg-warning" role="progressbar"
													style="width: 40%" aria-valuenow="40" aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</td>
									</tr>
									<tr>
										<td>OTI_SR_000001</td>
										<td>SRM 시스템 구축 요청</td>
										<td>오티아이SRM</td>
										<td>구현</td>
										<td>2023-11-10</td>
										<td>
											<div class="progress mb-4">
												<div class="progress-bar bg-warning" role="progressbar"
													style="width: 40%" aria-valuenow="40" aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</td>
									</tr>
									<tr>
										<td>OTI_SR_000001</td>
										<td>SRM 시스템 구축 요청</td>
										<td>오티아이SRM</td>
										<td>분석</td>
										<td>2023-11-10</td>
										<td>
											<div class="progress mb-4">
												<div class="progress-bar bg-danger" role="progressbar"
													style="width: 20%" aria-valuenow="20" aria-valuemin="0"
													aria-valuemax="100"></div>
											</div>
										</td>
									</tr>
								</tbody>
							</table>
	                    </div>    
							 
					    <div class="notice_box">
							<h3><b class="float_lf">공지사항</b><a onclick="morePopup()" title="더보기" class="float_rg more"><span id="plus" class="hidden">더보기</span></a></h3>
							<ul class="article">
								<li><span><a class="d-flex justify-content-start" onclick="noticeLink('9616')">[공문]오티아이 '23년 기본계약서 체결 요청의 건</a></span><span class="d-flex justify-content-end">2023-09-22</span></li>
							
								<li><span><a onclick="noticeLink('9609')">2023년 하반기 SRM 교육 관련 수요도 조사</a></span><span class="d-flex justify-content-end">2023-09-19</span></li>
							
								<li><span><a onclick="noticeLink('9600')">협력업체 품질관리 강화 요청 건(수신 : 오티아이 협력업체)</a></span><span class="d-flex justify-content-end">2023-09-11</span></li>
							
								<li><span><a onclick="noticeLink('9591')">품질 관리 및 기술문서 관리 강화 요청의 건 </a></span><span class="d-flex justify-content-end">2023-08-31</span></li>
							</ul>
						</div>
						
	                    <div class="menuitem tab-pane fade" id="v-pills-requires" role="tabpanel" aria-labelledby="v-pills-requires-tab">
	                        <h3>요청관리</h3>
	                        <p>이곳에 메뉴 2의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-reviews" role="tabpanel" aria-labelledby="v-pills-reviews-tab">
	                        <h3>검토관리</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-develop" role="tabpanel" aria-labelledby="v-pills-develop-tab">
	                        <h3>개발관리</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
	                    </div>
	                    <div class="menuitem tab-pane fade" id="v-pills-process" role="tabpanel" aria-labelledby="v-pills-process-tab">
	                        <h3>진척관리</h3>
	                        <p>이곳에 메뉴 3의 내용을 작성하세요.</p>
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
