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
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center; align-items:center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">settings</i>
			<span style="margin-left: 9.5px;">기업관리</span>
			<div style="flex-grow:1;"></div>
			<button type="button" data-toggle="modal" data-target="#sysManageModal" onclick="sysManageModalTableConfig(1)" class="btn-1"
					style="font-size: 1.6rem; font-weight:700; background-color: #222E3C; height: 3rem; margin-right:0.5rem;">
				시스템 관리
			</button>
		</div>
	</div>
	<div id="instManagementBodyDiv" style="display:flex; flex-direction:row;">
		<div style="width:50%;">
			<div id="instManagementSearchDiv" class="shadow" 
				style="height:5rem; margin:2rem 0rem; padding:1rem; background-color:white; border-radius:10px;">
				<form id="searchForm" method="get" action="instManagement">
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
											<option value="instNm" selected>기업명</option>
											<option value="instNo">기업코드</option>
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
							<button type="button" id="searchBtn" onclick="mainTableSearch()"
									style="border: none; font-size: 1.6rem; font-weight:700; color: white; background-color: #222E3C; border-radius: 5px; height: 3rem; width: 8rem;">
								검색
							</button>
							<button type="button" id="initBtn" onclick="mainTableSearchReset()"
									style="border: none; font-size: 1.6rem; font-weight:700; color: white; background-color: #868E96; border-radius: 5px; height: 3rem; width: 10rem; margin-left:0.5rem;">
								초기화
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
					<button type="button" data-toggle="modal" data-target="#registInstModal" onclick="registInstModalConfig()" class="btn-1"
							style="font-size: 1.6rem; font-weight:700; background-color: #222E3C; height: 3rem; width: 8rem; margin-right:0.5rem;">
						추가
					</button>
					<button type="button" class="btn-1" onclick="deleteInst()"
							style="font-size: 1.6rem; font-weight:700; background-color: red; height: 3rem; width: 8rem;">
						삭제
					</button>
				</div>
				
				<div class="" style="height:59.5rem; margin:0.75rem 0rem; background-color:#f9fafe;">
					<table id="mainTable" style="width:100%;">
						<colgroup>
							<col width="6%"/>
							<col width="5%"/>
							<col width="32%"/>
							<col width="32%"/>
							<col width="25%"/>
						</colgroup>
						<thead>
							<tr style="height:5rem; font-size:1.6rem; font-weight:700;">
								<th scope="col"><input id="batchCheck" type="checkbox" class="checkbox" style="vertical-align: middle;"></th>
								<th scope="col"></th>
								<th scope="col">이름</th>
								<th scope="col">코드</th>
								<th scope="col">분류</th>
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
		<div style="width:2rem;"></div>
		<div style="width:50%;">
			<div id="instDetailDiv" class="shadow" 
				style="height:78rem; padding:2rem; margin-top:2rem; background-color:white; border-radius:10px;">
				<div style="display:flex; flex-direction:row; align-items:center;">
					<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">기업상세정보</div>
					<div style="flex-grow:1;"></div>
					<!-- 
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
					 -->
				</div>
				<div style="height:1rem;"></div>
				<div style="height: 4rem; display: flex; flex-direction: row;">
					<div style="width:50%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">기업명</div>
						<div id="instDetailNm" style="height: 4rem; flex-grow:1; display: flex; align-items: center; margin: 0rem 0.5rem;">
							
						</div>
					</div>
					<div style="width:50%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">기업코드</div>
						<div id="instDetailNo" style="height: 4rem; flex-grow:1; display: flex; align-items: center; margin: 0rem 0.5rem;">
							
						</div>
					</div>
				</div>
				<div style="height: 4rem; display: flex; flex-direction: row;">
					<div style="width:50%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe;">분류</div>
						<div id="instDetailClsf" style="height: 4rem; flex-grow:1; display: flex; align-items: center; margin: 0rem 0.5rem;">
							
						</div>
					</div>
					<div style="width:50%"></div>
				</div>
				<div style="height:1rem;"></div>
				<div style="height: 4rem; font-size:1.7rem; font-weight:700; display: flex; flex-direction: row; align-items:center;">
					<span>직위</span>
					<span style="flex-grow:1;"></span>
					<button type="button" onclick="addIbps()" class="btn-1" style="height:3rem; width:8rem;">
						추가
					</button>
					<button type="button" onclick="saveIbps()" class="btn-1"
							style="height:3rem; width:8rem; margin-left:0.5rem; background-color: #222E3C;">
						저장
					</button>
				</div>
				<div style="height: 15rem; display: flex; flex-direction: row;">
					<div style="height: 15rem; width: 100%; background-color:#f9fafe;">
						<div style="height:4rem; width:100%; display:flex; align-items:center;">
							<div style="width:10%; display:flex; justify-content:center; align-items:center;"></div>
							<div style="width:35%; display:flex; justify-content:center; align-items:center; font-weight:700;">이름</div>
							<div style="width:35%; display:flex; justify-content:center; align-items:center; font-weight:700;">코드</div>
							<div style="width:20%;"></div>
							<div id="instDetailIbpsTableHeaderGap" style="width:17px;"></div>
						</div>
						<div id="instDetailIbpsTableDiv" style="height: 11rem; width: 100%; overflow-y:auto;">
							<table id="instDetailIbpsTable" style="width:100%; text-align: center;">
								<colgroup>
									<col width="10%"/>
									<col width="35%"/>
									<col width="35%"/>
									<col width="20%"/>
								</colgroup>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div style="height:1rem;"></div>
				<div style="height: 4rem; font-size:1.7rem; font-weight:700; display: flex; flex-direction: row; align-items:center;">
					<span>직책</span>
					<span style="flex-grow:1;"></span>
					<button type="button" onclick="addRole()" class="btn-1" style="height:3rem; width:8rem;">
						추가
					</button>
					<button type="button" onclick="saveRole()" class="btn-1"
							style="height:3rem; width:8rem; margin-left:0.5rem; background-color: #222E3C;">
						저장
					</button>
				</div>
				<div style="height: 15rem; display: flex; flex-direction: row;">
					<div style="height: 15rem; width: 100%; background-color:#f9fafe;">
						<div style="height:4rem; width:100%; display:flex; align-items:center;">
							<div style="width:10%; display:flex; justify-content:center; align-items:center;"></div>
							<div style="width:30%; display:flex; justify-content:center; align-items:center; font-weight:700;">이름</div>
							<div style="width:30%; display:flex; justify-content:center; align-items:center; font-weight:700;">코드</div>
							<div style="width:10%; display:flex; justify-content:center; align-items:center; font-weight:700;">시퀀스</div>
							<div style="width:20%;"></div>
							<div id="instDetailRoleTableHeaderGap" style="width:17px;"></div>
						</div>
						<div id="instDetailRoleTableDiv" style="height: 11rem; width: 100%; overflow-y:auto;">
							<table id="instDetailRoleTable" style="width:100%; text-align: center;">
								<colgroup>
									<col width="10%"/>
									<col width="30%"/>
									<col width="30%"/>
									<col width="10%"/>
									<col width="20%"/>
								</colgroup>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div style="height:1rem;"></div>
				<div style="height: 4rem; font-size:1.7rem; font-weight:700; display: flex; flex-direction: row; align-items:center;">
					<span>부서</span>
					<span style="flex-grow:1;"></span>
					<button type="button" onclick="addDept()" class="btn-1" style="height:3rem; width:8rem;">
						추가
					</button>
					<button type="button" onclick="saveDept()" class="btn-1"
							style="height:3rem; width:8rem; margin-left:0.5rem; background-color: #222E3C;">
						저장
					</button>
				</div>
				<div style="height: 15rem; display: flex; flex-direction: row;">
					<div style="height: 15rem; width: 100%; background-color:#f9fafe;">
						<div style="height:4rem; width:100%; display:flex; align-items:center;">
							<div style="width:10%; display:flex; justify-content:center; align-items:center;"></div>
							<div style="width:35%; display:flex; justify-content:center; align-items:center; font-weight:700;">이름</div>
							<div style="width:35%; display:flex; justify-content:center; align-items:center; font-weight:700;">코드</div>
							<div style="width:20%;"></div>
							<div id="instDetailDeptTableHeaderGap" style="width:17px;"></div>
						</div>
						<div id="instDetailDeptTableDiv" style="height: 11rem; width: 100%; overflow-y:auto;">
							<table id="instDetailDeptTable" style="width:100%; text-align: center;">
								<colgroup>
									<col width="10%"/>
									<col width="35%"/>
									<col width="35%"/>
									<col width="20%"/>
								</colgroup>
								<tbody>
									
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 기업 등록 모달 -->
<div id="registInstModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#222E3C; color:white; display:flex; align-items:center;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">기업 추가</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="registInstModalDiv" style="display:flex; flex-direction:column; align-items:center;">
					<div style="width:100%; display:flex; align-items:center;">
						<div style="width:40%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							기업명
						</div>
						<div style="width:60%; display:flex; align-items:center; padding:0.5rem;">
							<input type="text" id="registInstModalInstNm" style="width:100%; height:3rem;">
						</div>
					</div>
					<div style="width:100%; display:flex; align-items:center;">
						<div style="width:40%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							기업코드
						</div>
						<div style="width:60%; display:flex; align-items:center; padding:0.5rem;">
							<input type="text" id="registInstModalInstNo" style="width:100%; height:3rem;">
						</div>
					</div>
					<div style="width:100%; display:flex; align-items:center;">
						<div style="width:40%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							분류
						</div>
						<div style="width:60%; display:flex; align-items:center; padding:0.5rem;">
							<select id="registInstModalInstClsf" name="registInstModalInstClsf" style="width:100%; height:3rem;">
								<option value="N">본사</option>
								<option value="Y">협력사</option>
								<option value="C">고객사</option>
							</select>
						</div>
					</div>
					
					<div style="width:100%; display: flex; flex-direction: row; justify-content:flex-end; margin-right:1rem;">
						<div style="height: 4rem; padding-left: 0.5rem; display: flex; align-items: center;">
							<button type="button" onclick="registInst()" class="btn-1" style="height:3rem;">
								등록
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 시스템 관리 모달 -->
<div id="sysManageModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#222E3C; color:white; display:flex; align-items:center;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">시스템 관리</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="setHrFindPicModalCallerInputId" style="display:none;"></div>
				<div id="srPlanInfoFindPic">
					<div id="srPlanInfoFindPicSearchDiv" style="margin:0.5rem; padding:0.5rem; border: 1px solid #222e3c; border-radius:5px;">
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 10%; padding-left: 0.5rem; display: flex; align-items: center;">
								<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
								<span style="font-size:1.6rem; font-weight:700;">키워드</span>
							</div>
							<div style="width:50%; display:flex; align-items:center;">
								<div style="width:35%; font-size:1.6rem;">
									<select id="systemKeywordCategoty" name="systemKeywordCategoty" style="width:100%">
										<option value="instNm" selected>시스템명</option>
										<option value="instNo">시스템코드</option>
									</select>
								</div>
								<div style="width:2%"></div>
								<div class="p-0 m-0" style="width:63%">
									<input type="text" id="systemKeywordContent" name="systemKeywordContent" style="width:100%;"/>
								</div>
							</div>
							<div style="flex-grow:1;"></div>
							<div style="height:4rem; flex-grow:1; display:flex; justify-content:flex-end; align-items:center;">
								<button class="btn-1" onclick="composeSetHrFindPicModalTable(1)"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">검색</button>
								<button data-toggle="modal" data-target="#addSrOutputModal" class="btn-1"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">추가</button>
								<button class="btn-1" onclick="deleteSystem()"
									style="height: 3rem; width: 5rem; margin-right:0.5rem; background-color:red;">삭제</button>
								<button class="btn-1" onclick="saveSystem()"
									style="height: 3rem; width: 5rem; margin-right:0.5rem; background-color:#222E3C;">저장</button>
							</div>
						</div>
					</div>
					<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0 0 0.5rem;">
						<span style="font-size:1.6rem; font-weight:700;">조회결과</span>
						<div style="height:27rem; background-color:#F9FAFE; margin:0.5rem;">
							<table id="setHrFindPicModalTable" style="width: 100%; text-align: center; border-radius:5px;">
								<colgroup>
									<col width="5%"/>
									<col width="5%"/>
									<col width="30%"/>
									<col width="30%"/>
									<col width="30%"/>
								</colgroup>
								<thead style="background-color:#edf2f8">
									<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700;">
										<th scope="col"><input id="sysBatchCheck" type="checkbox" class="checkbox" style="vertical-align: middle;"></th>
										<th scope="col"></th>
										<th scope="col">시스템명</th>
										<th scope="col">코드</th>
										<th scope="col">담당 부서</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
						<div id="setHrFindPicModalTablePagerDiv" style="height: 4.5rem; font-size: 1.6rem; display: flex; flex-direction: row; justify-content: center; align-items: center;">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 알림 모달 -->
<div id="alertModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#2c7be4; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="alertContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 경고 모달 -->
<div id="warningModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:red; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="warningContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>