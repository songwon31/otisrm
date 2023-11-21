<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- css 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/statisticsManagement/statisticsManagement.css" />
<!-- javascript 연결 -->
<script src="${pageContext.request.contextPath}/resources/javascript/srManagement/statisticsManagement.js"></script>

<div id="statisticsManagementDiv" class="shadow">
	<div id="statisticsManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 1rem;">SR통계관리</span>
		</div>
	</div>
	<div id="statisticsManagementSearchDiv" class="shadow" style="height:9rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
		<input type="hidden" id="loginPic" value="${usr.usrNo}">
		<div class="d-flex" style="height:3rem;">
			<!-- 조회기간 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">조회기간</span>
			</div>
			<div style="width: 22.57%; display:flex; align-items:center;">
				<input id="startDate" style="width: 45%;" name="startDate" type="date">
				<div style="width: 10%; margin: 0 1rem; font-size:1.5rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
				<input id="endDate" style="width: 45%;" name="endDate" type="date">
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 통계기준 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">통계기준</span>
			</div>
			<div style="width: 9.59%;">
				<select style="width:100%;" id="selectStandard" name="selectStandard">
					<option selected>관련시스템별</option>
					<option>등록부서별</option>
				</select>
			</div>

			<!-- 검색버튼 -->
			<button id="searchBtn" style="width: 5.79%;" class="ml-auto d-inline-flex flex-row-reverse align-items-center justify-content-center searchBtn"  
				onclick="loadStatisticsList()">
				검색
			</button>
		</div>
	</div>
	<div id="statisticsManagementBoardDiv" class="shadow" 
		style="height:67rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR통계목록</span>
			<button id="excelDownloadBtn" onclick="downloadExcelOnStatisticsManagement()">엑셀 다운로드</button>
		</div>
		<div style="height:58.7rem; margin:0.75rem 0rem; background-color: #f9fafe;">
			<table id="statisticsManagementMainTable" style="width: 100%; margin:0.75rem 0rem; table-layout: fixed;">
				<colgroup>
					<col width="9%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
				</colgroup>
				<thead>
					<tr style="height: 4.7rem; font-size: 1.5rem; font-weight: 700;">
						<th id="selectStandardTitle" scope="col">관련시스템</th>
						<th scope="col">요청</th>
						<th scope="col">승인대기</th>
						<th scope="col">승인재검토</th>
						<th scope="col">승인반려</th>
						<th scope="col">승인</th>
						<th scope="col">접수대기</th>
						<th scope="col">접수재검토</th>
						<th scope="col">접수반려</th>
						<th scope="col">접수</th>
						<th scope="col">개발중</th>
						<th scope="col">테스트</th>
						<th scope="col">완료요청</th>
						<th scope="col">개발완료</th>
						<th scope="col">합계</th>
					</tr>
				</thead>
				<tbody id="statisticsList"></tbody>
			</table>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>