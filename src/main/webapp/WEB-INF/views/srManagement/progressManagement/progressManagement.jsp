<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<head>
	<!--  css style 코드 -->
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/progressManagement/progressManagementStyle.css" />
	
	<!-- javascript 코드 -->
	<script>
	    var modelUsrNo = '${usr.usrNo}';
	    var modelUsrAuthrtNo = '${usr.usrAuthrtNo}';
	</script>
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
		style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
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
						<div style="width:25%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">업무</span>
						</div>
						<div style="width:75%;"> 
							<select id="taskSelect" name="taskSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:35%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">접수상태</span>
						</div>
						<div style="width:65%;">
							<select id="srRqstSttsSelect" name="srRqstSttsSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:35%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">진행상태</span>
						</div>
						<div style="width:65%;">
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
					<button onclick="mainTableSearchReset()" class="btn-gray" style="height:3rem; width:100%">초기화</button>
					<!-- <a href="javascript:void(0)" onclick="mainTableSearchReset()"
							style="height: 3rem; width: 100%; border-radius: 5px; background-color:#868E96; color:white;
							display: flex; flex-direction: row; justify-content: center; align-items: center; text-decoration:none;">초기화</a> -->
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
						<div style="width:25%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">부서</span>
						</div>
						<div style="width:75%;">
							<select id="deptSelect" name="deptSelect" style="width:100%">
								<option value="" selected>전체</option>
							</select>
						</div>
					</div>
				</div>
				<div style="width:3.5%;"></div>
				<div style="width:30%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:23.2%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">키워드</span>
						</div>
						<div style="width:76.8%; display:flex; align-items:center;">
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
					 <button onclick="mainTableSearch()" class="btn-navy" style="height:3rem; width:100%">검색</button>
					<!-- 
					<a href="javascript:void(0)" onclick="mainTableSearch()"
							style="height: 3rem; width: 100%; border-radius: 5px; background-color:#222E3C; color:white;
							display: flex; flex-direction: row; justify-content: center; align-items: center; text-decoration:none;">검색</a>
					 -->
				</div>	
			</div>
		</form>
	</div>
	<div id="progressManagementBoardDiv" class="shadow" style="height:63rem; background-color:white; border-radius:10px; padding:2rem;">
		<div style="height:3.5rem; display:flex;">
			<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR처리목록</div>
			<div style="flex-grow:1;"></div>
			<button id="downloadExcelButton" class="btn-navy" onclick="downloadExcel()"
					style="height:3rem;">엑셀 다운로드</button>
		</div>
		<div class="" style="height:51.7rem; margin:0.75rem 0rem; background-color:#f9fafe; border:1.5px solid #e9ecef;">
			<table id="mainTable" style="width: 100%; table-layout: fixed;">
				<colgroup>
					<col width="3%"/>
					<col width="12%"/>
					<col width="8%"/>
					<col width="12%"/>
					<col width="20%"/>
					<col width="7%"/>
					<col width="8%"/>
					<col width="7%"/>
					<col width="5%"/>
					<col width="6%"/>
					<col width="6%"/>
					<col width="6%"/>
				</colgroup>
				<thead style="background-color: #edf2f8;">	
					<tr style="height:4.7rem; font-size:1.5rem; font-weight:700;">
						<th scope="col"></th>
						<th scope="col">SR번호</th>
						<th scope="col">시스템</th>
						<th scope="col">업무</th>
						<th scope="col">SR제목</th>
						<th scope="col">완료요청일</th>
						<th scope="col">협력사</th>
						<th scope="col">완료예정일</th>
						<th scope="col">접수상태</th>
						<th scope="col">진행상태</th>
						<th scope="col">요청상세</th>
						<th scope="col">진척관리</th>
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

<!-- SR요청 상세정보 모달 -->
<div id="requestDetailModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">SR요청 상세정보</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srRqstInfo">
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">SR번호</div>
						<div id="modal_sr_no" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">SR요청번호</div>
						<div id="modal_sr_rqst_no" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">시스템구분</div>
						<div id="modal_sys_nm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">업무구분</div>
						<div id="modal_sr_task_nm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">SR제목</div>
						<div id="modal_sr_ttl" style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">SR목적</div>
						<div id="modal_sr_prps" style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">요청팀</div>
						<div id="modal_dept_nm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">요청자</div>
						<div id="modal_pic_nm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">요청일</div>
						<div id="modal_sr_rqst_reg_dt" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">완료요청일</div>
						<div id="modal_sr_cmptn_prnmnt_dt" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:4rem; display:flex; flex-direction:row;">
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">협력사</div>
						<div id="modal_inst_nm" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
						<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">유지보수 이관일</div>
						<div id="modal_sr_trnsf_dt" style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;"></div>
					</div>
					<div style="height:11rem; display:flex; flex-direction:row;">
						<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#edf2f8; font-weight:700;">SR내용</div>
						<div style="height:11rem; width:85%; padding:0rem 0.5rem; display:flex; flex-direction: column;">
							<div style="height:3rem;">
								<form>
									<div style="display:flex; flex-direction: row; align-items:center;">
										<input id="modal_sr_conts_btn" type="radio" name="srContentType" value="requestContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">요청내용
										<div style="width:1rem;"></div>
										<input id="modal_sr_dvl_conts_btn" type="radio" checked name="srContentType" value="developContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">개발내용
									</div>
								</form>
							</div>
							<div id="modal_sr_conts_div" style="height:8rem; display:flex; flex-direction: row; align-items:center; display:none;">
								<div id="modal_sr_conts" style="height:7rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto; white-space: pre-line;">
									
								</div>
							</div>
							<div id="modal_sr_dvl_conts_div" style="height:8rem; display:flex; flex-direction: row; align-items:center;">
								<div id="modal_sr_dvl_conts" style="height:7rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto; white-space: pre-line;">
									
								</div>
							</div>
						</div>
					</div>
					<div style="height:12rem; display:flex; flex-direction:row;">
						<div style="height:12rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; border-bottom:1px solid gray; background-color:#edf2f8;  font-weight:700;">첨부파일</div>
						<div id="modalSrAtch" style="height:12rem; width:85%; padding:0.5rem; display:flex; flex-direction:column; overflow-y:auto;">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- SR진척관리 모달 -->
<div id="srProgressModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">SR진척관리</div>
				<i class="material-icons close-icon" data-dismiss="modal" onclick="closeModal()" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srProgressDiv">
					<div style="display:flex;">
						<div id="srProgressChoiceDiv" style="width:80%; display:flex; align-items:center;">
							<a id="srRqstInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srRqstInfoTab')"
								class="srProgressTableSelectElement srProgressPlan filterTab filterTabSelected"
								style="width: 30%; display:flex; justify-content:center; align-items:center;"> 
								<span>SR계획정보</span>
							</a> 
							<a id="srHrInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srHrInfoTab')"
								class="srProgressTableSelectElement srProgressHr filterTab"
								style="width: 30%; display:flex; justify-content:center; align-items:center;"> 
								<span>SR자원정보</span>
							</a> 
							<a id="srPrgrsInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srPrgrsInfoTab')"
								class="srProgressTableSelectElement srProgressPercentage filterTab"
								style="width: 30%; display:flex; justify-content:center; align-items:center;">
								<span>SR진척률</span>
							</a>
							<div style="flex-grow: 1; align-self:flex-end; border-bottom: 1.5px solid #edf2f8;"></div>
						</div>
						<div id="srProgressBtnDiv" style="display:flex; margin-right:0.5rem; line-height:3rem; justify-content:flex-end; align-items:center; width:40%; border-bottom: 1.5px solid #edf2f8;">
							<button type="button" class="srProgressBtn srPlanBtn btn-navy" data-toggle="modal" data-target="#srPlanInfoEditModal" onclick="editSrTrnsfPlan()" 
								style="height:2.5rem;">등록/수정</button> 
							<button type="button" class="srProgressBtn srHrBtn btn-blue" data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal()" 
								style="height:2.5rem; margin-right:0.5rem; display:none;">추가</button> 
							<button type="button" class="srProgressBtn srHrBtn btn-red" onclick="deleteHrInfo()"
								style="height:2.5rem; margin-right:0.5rem; display:none;">삭제</button> 
							<button type="button" class="srProgressBtn srHrBtn btn-navy" onclick="saveHrInfo()"
								style="height:2.5rem; display:none;">저장</button> 
							<button type="button" class="srProgressBtn srPrgrsBtn btn-navy" onclick="updatePrgrs()"
								style="height:2.5rem; display:none;">저장</button> 
						</div>
					</div>
					<!-- SR계획정보(수정) div -->
					<div id="srPlanInfo" class="bottomSubDiv">
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">요청구분</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalDmndInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
							</div>
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">업무구분</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalTaskInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
							</div>
						</div>
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">처리팀</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalDeptInput" type="text" disabled style="width:80%; height:3rem; margin:0 0 0 0.5rem;">
							</div>
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">담당자</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalPicInput" type="text" disabled style="width:62%; height:3rem; margin:0 0 0 0.5rem;">
								<div style="width:3%"></div>
								<button type="button" data-toggle="modal" data-target="#srPlanInfoFindPicModal" onclick="composeFindPicModal()" class="btn-blue" style="height:3rem; width:15%; margin-right:0.5rem;">
									찾기
								</button>
								<!-- 
								<a data-toggle="modal" data-target="#srPlanInfoFindPicModal" onclick="composeFindPicModal()" class="srProgressBtn srPlanBtn" href="javascript:void(0)" 
									style="height: 3rem; width: 15%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
									display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
								 -->	
							</div>
						</div>
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">목표시작일</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalTrgtBgngDt" type="date" style="width:80%; height:3rem; margin:0rem 0.5rem;">
							</div>
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">목표완료일</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalTrgtCmptnDt" type="date" style="width:80%; height:3rem; margin:0rem 0.5rem;">
							</div>
						</div>
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">총 계획공수(M/D)</div>
							<div style="height: 4rem; width: 35%; display: flex; align-items: center;">
								<input id="srPlanModalTotalCapacity" type="text" disabled style="width:80%; height:3rem; margin:0rem 0.5rem;">
							</div>
						</div>
						<div style="height: 11rem; display: flex; flex-direction: row;">
							<div style="height: 11rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; border-radius: 0px 0px 0px 10px; font-weight:700;">검토내용</div>
							<div style="height:11rem; width:85%; padding:0.5rem;">
								<textarea id="srPlanModalTrnsfNote" style="width:100%; height:100%; resize:none; padding:0.5rem;"></textarea>
							</div>
						</div>
					</div>
					<!-- SR자원정보 -->
					<div id="srHrInfo" class="bottomSubDiv" style="display: none;">
						<div style="height: 27rem; background-color: #F9FAFE; border-radius: 10px;">
							<table style="width: 100%; text-align: center;">
								<colgroup>
									<col width="4%"/>
									<col width="24%"/>
									<col width="24%"/>
									<col width="24%"/>
									<col width="24%"/>
								</colgroup>
								<thead style="background-color: #edf2f8;">
									<tr style="height: 4rem; font-size: 1.6rem; font-weight: 700;">
										<th scope="col"></th>
										<th scope="col">담당자명</th>
										<th scope="col">역할</th>
										<th scope="col">계획공수(M/D)</th>
										<th scope="col">실적공수(M/D)</th>
									</tr>
								</thead>
								<tbody>
		
								</tbody>
							</table>
						</div>
					</div>					
					<!-- SR진척률 -->
					<div id="srProgressInfo" class="bottomSubDiv" style="display: none;">
					<div style="height: 27rem; background-color: #F9FAFE; border-radius: 10px;">
						<table id="prgrsTable" style="width: 100%; text-align: center;">
							<colgroup>
								<col width="20%" />
								<col width="20%" />
								<col width="20%" />
								<col width="20%" />
								<col width="20%" />
							</colgroup>
							<thead style="background-color: #edf2f8;">
								<tr style="height: 4rem; font-size: 1.6rem; font-weight: 700;">
									<th scope="col">작업구분</th>
									<th scope="col">시작일</th>
									<th scope="col">종료일</th>
									<th scope="col">진척률%(누적)</th>
									<th scope="col">산출물</th>
								</tr>
							</thead>
							<tbody>
								<tr
									style="height: 4rem; font-size: 1.6rem; background-color: white;">
									<th>분석</th>
									<td id="srAnalysisBgngDt"></td>
									<td id="srAnalysisCmptnDt"></td>
									<td id="srAnalysisPrgrs"></td>
									<td id="srAnalysisOtptBtn"></td>
								</tr>
								<tr
									style="height: 4rem; font-size: 1.6rem; background-color: white;">
									<th>설계</th>
									<td id="srDesignBgngDt"></td>
									<td id="srDesignCmptnDt"></td>
									<td id="srDesignPrgrs"></td>
									<td id="srDesignOtptBtn"></td>
								</tr>
								<tr
									style="height: 4rem; font-size: 1.6rem; background-color: white;">
									<th>구현</th>
									<td id="srImplBgngDt"></td>
									<td id="srImplCmptnDt"></td>
									<td id="srImplPrgrs"></td>
									<td id="srImplOtptBtn"></td>
								</tr>
								<tr
									style="height: 4rem; font-size: 1.6rem; background-color: white;">
									<th>시험</th>
									<td id="srTestBgngDt"></td>
									<td id="srTestCmptnDt"></td>
									<td id="srTestPrgrs"></td>
									<td id="srTestOtptBtn"></td>
								</tr>
								<tr
									style="height: 4rem; font-size: 1.6rem; background-color: white;">
									<th>반영요청</th>
									<td id="srApplyBgngDt"></td>
									<td id="srApplyCmptnDt"></td>
									<td id="srApplyPrgrs"></td>
									<td id="srApplyOtptBtn"></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- SR계획 이관 협력사 담당자 수정 모달 -->
<div id="srPlanInfoFindPicModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">담당자 검색</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srPlanInfoFindPic">
					<div id="srPlanInfoFindPicSearchDiv" style="margin:0.5rem; padding:0.5rem; border: 1px solid #222e3c; border-radius:5px;">
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 10%; padding-left: 0.5rem; display: flex; align-items: center;">
								<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
								<span style="font-weight:700">처리팀</span>
							</div>
							<div style="height: 4rem; width: 25%; display: flex; align-items: center;">
								<select id="findPicModalDeptSelect" name="modalRqstSelect" style="width:70%; height:3rem; margin:0rem 0.5rem;">
									<option value="" selected>선택</option>
								</select>
							</div>
							<div style="height: 4rem; width: 10%; padding-left: 0.5rem; display: flex; align-items: center;">
								<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
								<span style="font-weight:700">담당자</span>
							</div>
							<div style="height: 4rem; width: 25%; display: flex; align-items: center;">
								<input id="findPicModalPicInput" value="" style="width:70%; height:3rem; margin:0rem 0.5rem;">
							</div>
							<div style="height:4rem; flex-grow:1; display:flex; justify-content:flex-end; align-items:center;">
								<button class="btn-navy" onclick="composeFindPicModalTable(1)"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">검색</button>
							</div>
						</div>
					</div>
					<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0 0 0.5rem;">
						<span style="font-size:1.6rem; font-weight:700;">조회결과</span>
						<div style="height:27rem; background-color:#F9FAFE; margin:0.5rem;">
							<table id="findPicModalTable" style="width: 100%; text-align: center; border-radius:5px;">
								<colgroup>
									<col width="5%"/>
									<col width="20%"/>
									<col width="20%"/>
									<col width="20%"/>
									<col width="15%"/>
									<col width="20%"/>
								</colgroup>
								<thead style="background-color:#edf2f8;">
									<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700;">
										<th scope="col"></th>
										<th scope="col">소속팀</th>
										<th scope="col">직책</th>
										<th scope="col">직위</th>
										<th scope="col">이름</th>
										<th scope="col">선택</th>
									</tr>
								</thead>
								<tbody>
									
								</tbody>
							</table>
						</div>
						<div id="findPicModalTablePagerDiv" style="height: 4.5rem; font-size: 1.6rem; display: flex; flex-direction: row; justify-content: center; align-items: center;">
							
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- HR관리 모달 -->
<div id="setHrModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">SR자원정보</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srPlanInfoFindPic">
					<div style="height: 4rem; display: flex; flex-direction: row; margin-top:0.5rem;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">처리팀</span>
						</div>
						<div style="height: 4rem; width: 40%; display: flex; align-items: center;">
							<input id="setHrModalDeptInput" disabled value="" style="width:100%; height:3rem; margin:0rem 1rem;">
						</div>
					</div>
					<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0 0 0.5rem;">
						<!-- <span style="font-size:1.6rem; font-weight:700;">HR관리</span> -->
						<div style="background-color:#f9fafe; margin:0.5rem;">
							<table id="setHrModalTable" style="width: 100%; text-align: center; border-radius:5px;">
								<colgroup>
									<col width="40%"/>
									<col width="60%"/>
								</colgroup>
								<thead>
									<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700;">
										<th scope="col">작업</th>
										<th scope="col">담당자</th>
									</tr>
								</thead>
								<tbody>
									<tr style="height:4rem; font-size:1.6rem; background-color:white;">
										<td>분석</td>
										<td style="height:4rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
											<input id="setHrModalAnalysisPicInput" disabled value="" style="width:50%; height:3rem; margin:0rem 0.5rem;">
											<a data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal(this)" href="javascript:void(0)" 
												style="height: 3rem; width: 20%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
												display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a>
										</td>
									</tr>
									<tr style="height:4rem; font-size:1.6rem; background-color:white;">
										<td>설계</td>
										<td  style="height:4rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
											<input id="setHrModalDesignPicInput" disabled value="" style="width:50%; height:3rem; margin:0rem 0.5rem;">
											<a data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal(this)" href="javascript:void(0)" 
												style="height: 3rem; width: 20%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
												display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
										</td>	
									</tr>
									<tr style="height:4rem; font-size:1.6rem; background-color:white;">
										<td>구현</td>
										<td style="height:4rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
											<input id="setHrModalImplementPicInput" disabled value="" style="width:50%; height:3rem; margin:0rem 0.5rem;">
											<a data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal(this)" href="javascript:void(0)" 
												style="height: 3rem; width: 20%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
												display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
										</td>
									</tr>
									<tr style="height:4rem; font-size:1.6rem; background-color:white;">
										<td>시험</td>
										<td style="height:4rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
											<input id="setHrModalTestPicInput" disabled value="" style="width:50%; height:3rem; margin:0rem 0.5rem;">
											<a data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal(this)" href="javascript:void(0)" 
												style="height: 3rem; width: 20%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
												display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
										</td>
									</tr>
									<tr style="height:4rem; font-size:1.6rem; background-color:white;">
										<td>반영요청</td>
										<td style="height:4rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
											<input id="setHrModalApplyRequestPicInput" disabled value="" style="width:50%; height:3rem; margin:0rem 0.5rem;">
											<a data-toggle="modal" data-target="#setHrFindPicModal" onclick="composeSetHrFindPicModal(this)" href="javascript:void(0)" 
												style="height: 3rem; width: 20%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700; 
												display: flex; flex-direction: row; justify-content: center; align-items: center;">찾기</a> 
										</td>
									</tr>
								</tbody>
							</table>
						</div>
						<div style="height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-end;">
							<a href="javascript:void(0)" onclick="updateSrPrgrs()" data-dismiss="modal"
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
	</div>
</div>

<!-- HR 담당자 선택 모달 -->
<div id="setHrFindPicModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">HR검색</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="setHrFindPicModalCallerInputId" style="display:none;"></div>
				<div id="srPlanInfoFindPic">
					<div id="srPlanInfoFindPicSearchDiv" style="margin:0.5rem; padding:0.5rem; border: 1px solid #222e3c; border-radius:5px;">
						<div style="height: 4rem; display: flex; flex-direction: row;">
							<div style="height: 4rem; width: 10%; padding-left: 0.5rem; display: flex; align-items: center;">
								<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
								처리팀
							</div>
							<div style="height: 4rem; width: 25%; display: flex; align-items: center;">
								<input id="setHrFindPicModalDeptInput" disabled value="" style="width:70%; height:3rem; margin:0rem 0.5rem;">
							</div>
							<div style="height: 4rem; width: 10%; padding-left: 0.5rem; display: flex; align-items: center;">
								<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
								담당자
							</div>
							<div style="height: 4rem; width: 25%; display: flex; align-items: center;">
								<input id="setHrFindPicModalPicInput" value="" style="width:70%; height:3rem; margin:0rem 0.5rem;">
							</div>
							<div style="height:4rem; flex-grow:1; display:flex; justify-content:flex-end; align-items:center;">
								<button class="btn-navy" onclick="composeSetHrFindPicModalTable(1)"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">검색</button>
							</div>
						</div>
					</div>
					<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0 0 0.5rem;">
						<span style="font-size:1.6rem; font-weight:700;">조회결과</span>
						<div style="height:27rem; background-color:#F9FAFE; margin:0.5rem;">
							<table id="setHrFindPicModalTable" style="width: 100%; text-align: center; border-radius:5px;">
								<colgroup>
									<col width="5%"/>
									<col width="20%"/>
									<col width="20%"/>
									<col width="20%"/>
									<col width="15%"/>
									<col width="20%"/>
								</colgroup>
								<thead style="background-color:#edf2f8">
									<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700;">
										<th scope="col"></th>
										<th scope="col">소속팀</th>
										<th scope="col">직책</th>
										<th scope="col">직위</th>
										<th scope="col">이름</th>
										<th scope="col">선택</th>
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

<!-- SR 산출물 관리 모달 -->
<div id="manageSrOutputModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-lg" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">SR산출물 관리</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<input id="outputSrPrgrsNo" type="text" value="" style="display:none;"></div>
				<div id="setHrFindPicModalCallerInputId" style="display:none;"></div>
				<div id="srPlanInfoFindPic">
					<div style="display: flex; flex-direction: column; justify-contents:center;">
						<div style="width:100%; height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-between;">
							<div id="manageSrOutputModalTableTitle" style="flex-grow:1; display: flex; flex-direction: row; align-items:center; font-size:2.2rem; font-weight:700; margin-left:1rem;">
								
							</div>
							<div style="height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-end;">
								<button data-toggle="modal" data-target="#addSrOutputModal" class="btn-blue"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">추가</button>
								<button class="btn-red" onclick="deleteOutput()"
									style="height: 3rem; width: 5rem; margin-right:0.5rem;">삭제</button>
							</div>
						</div>
						<div style="height:27rem; background-color:#f9fafe; margin:0.5rem;">
							<table id="manageSrOutputModalTable" style="width: 100%; text-align: center; border-radius:5px;">
								<colgroup>
									<col width="0%"/>
									<col width="5%"/>
									<col width="20%"/>
									<col width="40%"/>
									<col width="10%"/>
									<col width="10%"/>
									<col width="15%"/>
								</colgroup>
								<thead style="background-color: #edf2f8;">
									<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700;">
										<th scope="col"></th>
										<th scope="col"></th>
										<th scope="col">산출물명</th>
										<th scope="col">파일명</th>
										<th scope="col">용량</th>
										<th scope="col">등록자</th>
										<th scope="col">등록일</th>
									</tr>
								</thead>
								<tbody>

								</tbody>
							</table>
						</div>
						<!-- 
						<div id="setHrFindPicModalTablePagerDiv" style="height: 4.5rem; font-size: 1.6rem; display: flex; flex-direction: row; justify-content: center; align-items: center;">
							
						</div>
						 -->
						
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 산출물 추가 모달 -->
<div id="addSrOutputModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-md">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">SR산출물 추가</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="srPlanInfoFindPic">
					<div style="height: 4rem; display: flex; flex-direction: row; margin-top:0.5rem;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">산출물명</span>
						</div>
						<div style="height: 4rem; width: 80%; display: flex; align-items: center;">
							<input id="addSrOutputModalOutputNameInput" value="" style="width:100%; height:3rem; margin:0rem 1rem;">
						</div>
					</div>
					<div style="height: 4rem; width:100%; display: flex; flex-direction: row; align-items:center; padding:0.5rem 1rem;">
						<div style="width:80%; display:flex; align-items:center; justify-content:flex-start;">
							<input type="file" id="addSrOutputModalFileInput" name=file style="width:100%;">
						</div>
						<div style="width:20%; display:flex; align-items:center; justify-content:flex-end;">
							<button data-dismiss="modal" class="btn-blue" onclick="addSrOutputFile()"
									style="height: 3rem; width: 5rem;">추가</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 알림 모달 -->
<div id="alertModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-md">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#2c7be4; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">알림</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="alertContent" style="height:11rem; font-size:1.7rem; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 경고 모달 -->
<div id="warningModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-md">
		<div class="modal-content">
			<div class="modal-header" style="background-color:red; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="warningContent" style="height:11rem; font-size:1.7rem; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>