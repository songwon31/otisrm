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
		style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
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
		style="height:63rem; background-color:white; border-radius:10px; padding:2rem;">
		<div style="display:flex; flex-direction:row; align-items:center;">
			<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">사용자목록</div>
			<div style="flex-grow:1;"></div>
			<div style="display:flex; flex-direction:row; align-items:center;">
				<button id="downloadExcelButton" class="btn-1" onclick="downloadExcel()"
					style="background-color:#222E3C; height:3rem; margin-right:0.5rem; font-size:1.5rem;">엑셀 다운로드</button>
				<button type="button" onclick="batchApproval()" class="btn-1"
						style="height:3rem; margin-right:0.5rem; font-size:1.5rem;">
					일괄 승인/복구
				</button>
				<button type="button" onclick="batchWithdrawal()" class="btn-1"
						style="height:3rem; background-color:red; font-size:1.5rem;">
					일괄 탈퇴처리
				</button>
			</div>
		</div>
		
		<div class="" style="height:52rem; margin:0.75rem 0rem; background-color:#f9fafe;">
			<table id="mainTable" style="width:100%;">
				<colgroup>
					<col width="3%"/>
					<col width="4%"/>
					<col width="5%"/>
					<col width="7%"/>
					<col width="10%"/>
					<col width="15%"/>
					<col width="5%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="8%"/>
					<col width="10%"/>
					<col width="5%"/>
					<col width="8%"/>
				</colgroup>
				<thead style="background-color:#edf2f8">
					<tr style="height:5rem; font-size:1.6rem; font-weight:700;">
						<th scope="col"><input id="batchCheck" type="checkbox" class="checkbox" style="vertical-align: middle;"></th>
						<th scope="col"></th>
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
						<th scope="col">상세정보</th>
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

<!-- 사용자 상세 정보 -->
<div id="usrDetailModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div id="usrDetailModalContent" class="modal-content">
			<div class="modal-header" style="background-color:#222E3C; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">사용자 상세정보</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srRqstInfo">
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">번호</div>
						<div id="modalUsrNo" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">이름</div>
						<div id="modalUsrNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">주민등록번호</div>
						<div id="modalUsrRrno" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">가입일</div>
						<div id="modalUsrJoinDt" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">전화번호</div>
						<div id="modalUsrTelno" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">이메일</div>
						<div id="modalUsrEml" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">소속</div>
						<div id="modalInstNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">부서</div>
						<div id="modalDeptNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
							<select id="modalUsrDept" name="modalUsrDept" style="width:60%; padding:3px;">
								
							</select>
							<button type="button" onclick="editUsrDeptModal()" class="btn-1" style="height:3rem; margin-left:1rem;">
								저장
							</button>
						</div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">직위</div>
						<div id="modalIbpsNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
							<select id="modalUsrIbps" name="modalUsrIbps" style="width:60%; padding:3px;">
								
							</select>
							<button type="button" onclick="editUsrIbpsModal()" class="btn-1" style="height:3rem; margin-left:1rem;">
								저장
							</button>
						</div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">직책</div>
						<div id="modalRoleNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
							<select id="modalUsrRole" name="modalUsrRole" style="width:60%; padding:3px;">
								
							</select>
							<button type="button" onclick="editUsrRoleModal()" class="btn-1" style="height:3rem; margin-left:1rem;">
								저장
							</button>
						</div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">권한</div>
						<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						 	<select id="modalUsrAuthrt" name="modalUsrAuthrtNm" style="width:60%; padding:3px;">
								<option value="CUSTOMER">고객사</option>
								<option value="PIC">담당자</option>
								<option value="DEVELOPER">개발자</option>
								<option value="REVIEWER">검토자</option>
								<option value="SYS_MANAGER">시스템 관리자</option>
							</select>
							<button type="button" onclick="editUsrAuthrt()" class="btn-1" style="height:3rem; margin-left:1rem;">
								저장
							</button>
						</div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">상태</div>
						<div id="modalUsrSttsNm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:11rem; display:flex; flex-direction:row;">
						<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">담당중인 SR</div>
						<div id="srList" style="height:11rem; width:85%; padding-left:0.5rem; display:flex; flex-direction: column; overflow:auto">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div id="wraningModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:red; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="wraningModalContent" style="height:11rem; font-size:1.7rem; fnt-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<div id="alertModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#2c7be4; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="alertModalContent" style="height:11rem; font-size:1.7rem; fnt-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>


<%@ include file="/WEB-INF/views/common/footer.jsp"%>