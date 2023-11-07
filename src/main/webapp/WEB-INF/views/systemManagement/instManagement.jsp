<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<head>
	<!--  css style 코드 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/instManagementStyle.css" />
	
	<!-- javascript 코드 -->
	<script src="${pageContext.request.contextPath}/resources/javascript/systemManagement/instManagement.js"></script>
	
	<!-- 아이콘 -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
</head>

<div id="instManagementDiv" class="shadow">
	<div id="instManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">settings</i>
			<span style="margin-left: 9.5px;">기업관리</span>
		</div>
	</div>
	<div id="instManagementBodyDiv" style="display:flex; flex-direction:row;">
		<div style="width:50%;">
			<div id="instManagementSearchDiv" class="shadow" 
				style="height:5rem; margin:2rem 0rem; padding:1rem; background-color:white; border-radius:10px;">
				<form id="searchForm" method="get" action="usrManagement">
					<div style="height:3rem; display:flex; align-items:center;">
						<div style="width:60%;" class="d-inline-flex flex-row align-items-center">
							<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
								<div style="width:20%; display:flex; align-items:center;">
									<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
									<span style="font-size:1.6rem; font-weight:700;">키워드</span>
								</div>
								<div style="width:80%; display:flex; align-items:center;">
									<div style="width:35%; font-size:1.6rem;">
										<select id="keywordCategoty" name="keywordCategoty" style="width:100%">
											<option value="usrNm" selected>기업명</option>
											<option value="usrTelno">기업코드</option>
										</select>
									</div>
									<div style="width:2%"></div>
									<div class="p-0 m-0" style="width:63%">
										<input type="text" id="keywordContent" name="keywordContent" style="width:100%;"/>
									</div>
								</div>
							</div>
						</div>
						<div style="flex-grow:1; display:flex; flex-direction:row; justify-content:flex-end;">
							<button type="button" id="initBtn" onclick="mainTableSearchReset()"
									style="border: none; font-size: 1.6rem; font-weight:700; color: white; background-color: #868E96; border-radius: 5px; height: 3rem; width: 10rem;">
								초기화
							</button>
							<button type="button" id="initBtn" onclick="mainTableSearchReset()"
									style="border: none; font-size: 1.6rem; font-weight:700; color: white; background-color: #222E3C; border-radius: 5px; height: 3rem; width: 8rem; margin-left:0.5rem;">
								검색
							</button>
						</div>
					</div>
				</form>
			</div>
			<div id="instManagementBoardDiv" class="shadow" 
				style="height:71rem; background-color:white; border-radius:10px; padding:2rem;">
				<div style="display:flex; flex-direction:row; align-items:center;">
					<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">기업목록</div>
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
				
				<div class="" style="height:59.5rem; margin:0.75rem 0rem; background-color:#f9fafe;">
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
					페이징
				</div>
			</div>
		</div>
		<div style="width:2rem;"></div>
		<div style="width: 50%;">
			<div id="instDetailDiv" class="shadow" 
				style="height:78rem; padding:2rem; margin-top:2rem; background-color:white; border-radius:10px;">
				<div style="display:flex; flex-direction:row; align-items:center;">
					<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">기업상세정보</div>
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
				<div style="height: 4rem; display: flex; flex-direction: row;">
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">요청구분</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalDmndInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
					</div>
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">업무구분</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalTaskInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
					</div>
				</div>
				<div style="height: 4rem; display: flex; flex-direction: row;">
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">처리팀</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalDeptInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
					</div>
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">담당자</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalPicInput" type="text" disabled style="width:62%; height:3rem; margin:0 0 0 0.5rem;">
						<div style="width:3%"></div>
						<a data-toggle="modal" data-target="#srPlanInfoFindPicModal" onclick="composeFindPicModal()" class="srProgressBtn srPlanBtn" href="javascript:void(0)" 
							style="height: 3rem; width: 15%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
							display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
					</div>
				</div>
				<div style="height: 4rem; display: flex; flex-direction: row;">
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">목표시작일</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalTrgtBgngDt" type="date" style="width:80%; height:3rem; margin:0rem 0.5rem;">
					</div>
					<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">목표완료일</div>
					<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
						<input id="srPlanModalTrgtCmptnDt" type="date" style="width:80%; height:3rem; margin:0rem 0.5rem;">
					</div>
				</div>
				<div style="height: 15rem; display: flex; flex-direction: row;">
					<div style="height: 15rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; border-radius: 0px 0px 0px 10px;">검토내용</div>
						<textarea id="srPlanModalTrnsfNote" style="width:85%; resize:none; margin:0.5rem;">
						</textarea>
					</div>
				<div style="height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-end;">
					<a href="javascript:void(0)" data-dismiss="modal" onclick="editSrTrnsfPlan()"
						style="height: 3rem; width: 5rem; border-radius: 5px; background-color:#222e3c; color:white; font-weight:700; margin-right:0.5rem;
						display: flex; flex-direction: row; justify-content: center; align-items: center;">저장</a>
					<a href="javascript:void(0)" data-dismiss="modal"
						style="height: 3rem; width: 5rem; border-radius: 5px; background-color:red; color:white; font-weight:700; margin-right:0.5rem;
						display: flex; flex-direction: row; justify-content: center; align-items: center; cursor: pointer;">닫기</a>
				</div>
			</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>