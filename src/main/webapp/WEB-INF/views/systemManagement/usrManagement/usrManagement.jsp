<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<head>
	<!--  css style 코드 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/usrManagementStyle.css" />
	
	<!-- javascript 코드 -->
	<script src="${pageContext.request.contextPath}/resources/javascript/systemManagement/usrManagement.js"></script>
	
	<!-- 아이콘 -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div id="userManagementDiv" class="shadow">
	<div id="userManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">settings</i>
			<span style="margin-left: 9.5px;">사용자관리</span>
		</div>
	</div>
	<div id="userManagementSearchDiv" class="shadow" 
		style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:10px;">
		<form id="searchForm" method="get" action="usrManagement">
			<div class="p-0 container-fluid d-inline-flex flex-row" style="height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">권한</span>
						</div>
						<div style="width:70%;">
							<select id="authrtSelect" name="authrtSelect" style="width:100%">
								<option value="" selected>전체</option>
								
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">상태</span>
						</div>
						<div style="width:70%;">
							<select id="sttsSelect" name="sttsSelect" style="width:100%">
								<option value="" selected>전체</option>
								
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:20%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">키워드</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div style="width:35%; font-size:1.6rem;">
								<select id="keywordCategoty" name="keywordCategoty" style="width:100%">
									<option value="usrNm" selected>이름</option>	
									<option value="usrTelno">전화번호</option>
									<option value="usrEml">이메일</option>
								</select>
							</div>
							<div style="width:2%"></div>
							<div class="p-0 m-0" style="width:63%">
								<input type="text" id="keywordContent" name="keywordContent" style="width:100%;"/>
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<button type="button" id="initBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="mainTableSearchReset()">
						초기화
					</button>
				</div>
			</div>
			<div class="p-0 container-fluid d-inline-flex flex-row" style="margin-top:1.2rem; height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">소속</span>
						</div>
						<div style="width:70%;">
							<select id="instSelect" name="instSelect" style="width:100%">
								<option value="" selected>전체</option>
								
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
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
				<div style="width:7%;"></div>
				<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:20%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">가입일</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div class="d-inline-flex" style="width:100%; flex-direction:row; align-items:center">
								<input id ="joinDateStart" name="joinDateStart" style="width:45%;" type="date">
								<div style="width:10%; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
								<input id ="joinDateEnd" name="joinDateEnd" style="width:45%;" type="date">
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<button type="button" id="searchBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="mainTableSearch()">
						검색
					</button>
				</div>	
			</div>
		</form>
	</div>
	<div id="userManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:10px; padding:2rem;">
		<div style="display:flex; flex-direction:row; align-items:center;">
			<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">사용자목록</div>
			<div style="flex-grow:1;"></div>
			<div style="display:flex; flex-direction:row; align-items:center;">
				<button type="button" onclick="batchApproval()"
						style="height:3rem; border:none; border-radius:5px; background-color: #2c7be4; color:white; font-weight:700;">
					일괄 승인/복구
				</button>
				<button type="button" onclick="batchWithdrawal()"
						style="height:3rem; border:none; border-radius:5px; background-color: red; color:white; font-weight:700; margin-left:0.5rem;">
					일괄 탈퇴처리
				</button>
			</div>
		</div>
		
		<div class="" style="height:52rem; margin:0.75rem 0rem; background-color:#f9fafe;">
			<table id="mainTable" style="width:100%;">
				<colgroup>
					<col width="3%"/>
					<col width="7%"/>
					<col width="7%"/>
					<col width="15%"/>
					<col width="15%"/>
					<col width="7%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="6%"/>
				</colgroup>
				<thead>
					<tr style="height:5rem; font-size:1.6rem; font-weight:700;">
						<th scope="col"><input id="batchCheck" type="checkbox" class="checkbox" style="vertical-align: middle;"></th>
						<th scope="col">번호</th>
						<th scope="col">이름</th>
						<th scope="col">전화번호</th>
						<th scope="col">이메일</th>
						<th scope="col">소속</th>
						<th scope="col">부서</th>
						<th scope="col">직책</th>
						<th scope="col">권한</th>
						<th scope="col">가입일</th>
						<th scope="col">상태</th>
					</tr>
				</thead>
				<tbody>
					
				</tbody>
			</table>
		</div>
		<div id="mainTablePagingDiv" style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>