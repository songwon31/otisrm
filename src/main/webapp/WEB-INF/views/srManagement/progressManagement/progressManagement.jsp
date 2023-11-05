<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<head>
	<!--  css style 코드 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/progressManagement/progressManagementStyle.css" />
	
	<!-- javascript 코드 -->
	<script src="${pageContext.request.contextPath}/resources/javascript/srManagement/progressManagement.js"></script>
	
	<!-- 아이콘 -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>


<div id="progressManagementDiv" class="shadow">
	<div id="progressManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 9.5px;">SR진척관리</span>
		</div>
	</div>
	
	<div id="progressManagementSearchDiv" class="shadow" 
		style="height:13rem; margin:1rem 0rem; padding:3rem 2rem; background-color:white; border-radius:10px;">
		<form id="searchForm" method="get" action="usrManagement">
			<div class="p-0 container-fluid d-inline-flex flex-row" style="height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">시스템</span>
						</div>
						<div style="width:70%;">
							<select id="systemSelect" name="systemSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">업무</span>
						</div>
						<div style="width:70%;"> 
							<select id="taskSelect" name="taskSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">접수 상태</span>
						</div>
						<div style="width:70%;">
							<select id="srRqstSttsSelect" name="srRqstSttsSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">진행 상태</span>
						</div>
						<div style="width:70%;">
							<label style="display:none;" for="userStts"></label> 
							<select id="srPrgrsSttsSelect" name="userStts" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:6%;" class="d-flex flex-row-reverse align-items-center">
					<!-- <button id="resetSearchBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="searchReset()">
						초기화
					</button> -->
					<a href="javascript:void(0)" onclick="mainTableSearchReset()"
							style="height: 3rem; width: 8rem; border-radius: 5px; background-color:#868E96; color:white; font-size:1.6rem; font-weight:700;
							display: flex; flex-direction: row; justify-content: center; align-items: center; text-decoration:none;">초기화</a>
				</div>
			</div>
			<!-- -------------------------------------------------------------------------------------------------------- -->
			<div class="p-0 container-fluid d-inline-flex flex-row" style="margin-top:1.2rem; height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">협력사</span>
						</div>
						<div style="width:70%;">
							<select id="instSelect" name="instSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">부서</span>
						</div>
						<div style="width:70%;">
							<select id="deptSelect" name="deptSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:30%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:20%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">키워드</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div style="width:35%; font-size:1.5rem;">
								<label style="display:none;" for="keywordCategory"></label> 
								<select id="keywordCategoty" name="keywordCategoty" style="width:100%">
									<option value="srTitle" selected>SR제목</option>	
									<option value="rqstr">요청자</option>
									<option value="pic">담당자</option>
								</select>
							</div>
							<div style="width:2%"></div>
							<div class="p-0 m-0" style="width:63%">
								<label style="display:none;" for="keywordContent"></label>
								<input type="text" id="keywordContent" name="keywordContent" style="width:100%;"/>
							</div>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:10%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%; justify-content:flex-end;" class="p-0 d-inline-flex flex-row align-items-center">
						<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
						<span style="font-size:1.6rem; font-weight:700;">내 처리 건만</span>
						<input id="mySrCheck" type="checkbox" style="margin:0 0 0 1rem;">
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:6%;" class="d-flex flex-row-reverse align-items-center">
					<!-- 
					<button id="searchBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="search()">
						검색
					</button>
					 -->
					<a href="javascript:void(0)" onclick="mainTableSearch()"
							style="height: 3rem; width: 8rem; border-radius: 5px; background-color:#222E3C; color:white; font-size:1.6rem; font-weight:700;
							display: flex; flex-direction: row; justify-content: center; align-items: center; text-decoration:none;">검색</a>
				</div>	
			</div>
		</form>
	</div>
	<div id="progressManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:10px; padding:2rem;">
		<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR처리 목록</div>
		<div class="" style="height:52rem; margin:0.75rem 0rem; background-color:#f9fafe;">
			<table id="mainTable" style="width:100%;">
				<colgroup>
					<col width="15%"/>
					<col width="5%"/>
					<col width="5%"/>
					<col width="25%"/>
					<col width="5%"/>
					<col width="10%"/>
					<col width="5%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
				</colgroup>
				<thead>
					<tr style="height:5rem; font-size:1.5rem; font-weight:700;">
						<th scope="col">SR번호</th>
						<th scope="col">시스템</th>
						<th scope="col">업무</th>
						<th scope="col">SR제목</th>
						<th scope="col">요청자</th>
						<th scope="col">완료요청일</th>
						<th scope="col">협력사</th>
						<th scope="col">완료예정일</th>
						<th scope="col">접수상태</th>
						<th scope="col">진행상태</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		<div id="mainTablePagingDiv" style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>