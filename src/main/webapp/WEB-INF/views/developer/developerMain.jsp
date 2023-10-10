<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>개발자화면</title>

<!-- BootStrap을 사용하기 위한 외부 라이브러리 가져오기 -->
<link rel="stylesheet"
	href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
<script
	src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
<script
	src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>
	<!-- 헤더 -->
	<%@ include file="/WEB-INF/views/common/header.jsp"%>
	
	<!-- 메뉴 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/manager/mainM.css" />
	<div id="sideMenu" class="container">
		<div class="row">
			<div class="col-3">
				<div class="menu-group nav flex-column nav-pills" id="v-pills-tab"
					role="tablist" aria-orientation="vertical">
					<a class="menu-home nav-link active" id="v-pills-home-tab"
						data-toggle="pill" href="#v-pills-home" role="tab"
						aria-controls="v-pills-home" aria-selected="true">Home</a>
					<div id="menu-group-name1">SR 관리</div>
					<a class="nav-link" id="v-pills-requires-tab" data-toggle="pill"
						href="#v-pills-requires" role="tab"
						aria-controls="v-pills-requires" aria-selected="false">SR 요청관리</a>
					<a class="nav-link" id="v-pills-reviews-tab" data-toggle="pill"
						href="#v-pills-reviews" role="tab" aria-controls="v-pills-reviews"
						aria-selected="false">SR 검토 관리</a> <a class="nav-link"
						id="v-pills-develop-tab" data-toggle="pill"
						href="#v-pills-messages" role="tab"
						aria-controls="v-pills-messages" aria-selected="false">SR 개발
						관리</a> <a class="nav-link" id="v-pills-messages-tab"
						data-toggle="pill" href="#v-pills-messages" role="tab"
						aria-controls="v-pills-messages" aria-selected="false">SR 진척
						관리</a>
					<div id="menu-group-name2">게시판</div>
					<a class="nav-link" id="v-pills-require-tab" data-toggle="pill"
						href="#v-pills-require" role="tab" aria-controls="v-pills-profile"
						aria-selected="false">공지사항</a> <a class="nav-link"
						id="v-pills-messages-tab" data-toggle="pill"
						href="#v-pills-messages" role="tab"
						aria-controls="v-pills-messages" aria-selected="false">QnA 게시판</a>
				</div>
			</div>
			<div class="menuContent col-9">
				<div class="tab-content" id="v-pills-tabContent">
					<div class="menuitem tab-pane fade show active" id="v-pills-home"
						role="tabpanel" aria-labelledby="v-pills-home-tab">
						<!-- 목록 -->
						<div class="card shadow my-3">
							<div class="card-header py-3">
								<h6 class="m-0 font-weight-bold text-primary">요청목록</h6>
							</div>
							<div class="card-body">
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
						</div>

						<!-- 개발일정 -->
						<div class="card shadow mb-4">
							<div class="card-header py-3">
								<h6 class="m-0 font-weight-bold text-primary">개발일정</h6>
							</div>
							<div class="card-body">
								<h4 class="small font-weight-bold">
									분석<span class="float-right">20%</span>
								</h4>
								<div class="progress mb-4">
									<div class="progress-bar bg-danger" role="progressbar"
										style="width: 20%" aria-valuenow="20" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
								<h4 class="small font-weight-bold">
									설계<span class="float-right">40%</span>
								</h4>
								<div class="progress mb-4">
									<div class="progress-bar bg-warning" role="progressbar"
										style="width: 40%" aria-valuenow="40" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
								<h4 class="small font-weight-bold">
									구현<span class="float-right">60%</span>
								</h4>
								<div class="progress mb-4">
									<div class="progress-bar" role="progressbar" style="width: 60%"
										aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
								</div>
								<h4 class="small font-weight-bold">
									테스트<span class="float-right">80%</span>
								</h4>
								<div class="progress mb-4">
									<div class="progress-bar bg-info" role="progressbar"
										style="width: 80%" aria-valuenow="80" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
								<h4 class="small font-weight-bold">
									완료요청<span class="float-right">Complete!</span>
								</h4>
								<div class="progress">
									<div class="progress-bar bg-success" role="progressbar"
										style="width: 100%" aria-valuenow="100" aria-valuemin="0"
										aria-valuemax="100"></div>
								</div>
							</div>
						</div>

					</div>
					<div class="menuitem tab-pane fade" id="v-pills-requires"
						role="tabpanel" aria-labelledby="v-pills-requires-tab">
						<h3>요청관리</h3>
						<p>이곳에 메뉴 2의 내용을 작성하세요.</p>
					</div>
					<div class="menuitem tab-pane fade" id="v-pills-reviews"
						role="tabpanel" aria-labelledby="v-pills-reviews-tab">
						<h3>검토관리</h3>
						<p>이곳에 메뉴 3의 내용을 작성하세요.</p>
					</div>
					<div class="menuitem tab-pane fade" id="v-pills-messages"
						role="tabpanel" aria-labelledby="v-pills-messages-tab">
						<h3>메뉴 4 내용</h3>
						<p>이곳에 메뉴 3의 내용을 작성하세요.</p>
					</div>
					<div class="menuitem tab-pane fade" id="v-pills-messages"
						role="tabpanel" aria-labelledby="v-pills-messages-tab">
						<h3>메뉴 5 내용</h3>
						<p>이곳에 메뉴 3의 내용을 작성하세요.</p>
					</div>
					<div class="menuitem tab-pane fade" id="v-pills-messages"
						role="tabpanel" aria-labelledby="v-pills-messages-tab">
						<h3>메뉴 6 내용</h3>
						<p>이곳에 메뉴 3의 내용을 작성하세요.</p>
					</div>
					<div class="menuitem tab-pane fade" id="v-pills-messages"
						role="tabpanel" aria-labelledby="v-pills-messages-tab">
						<h3>메뉴 7 내용</h3>
						<p>이곳에 메뉴 3의 내용을 작성하세요.</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>