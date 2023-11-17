<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- css 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/reviewManagement/reviewManagement.css" />
<!-- javascript 연결 -->
<script src="${pageContext.request.contextPath}/resources/javascript/srManagement/reviewManagement.js"></script>

<div id="reviewManagementDiv" class="shadow">
	<div id="reviewManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 1rem;">SR검토관리</span>
		</div>
	</div>
	<div id="reviewManagementSearchDiv" class="shadow" style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
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
			<!-- 관련 시스템 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">관련 시스템</span>
			</div>
			<div style="width: 9.59%;">
				<select style="width:100%;" id="selectSystem" name="selectSystem">
					<option class="initOption" value="" selected>전체</option>
					<c:forEach var="i" items="${totalSystemList}" varStatus="status">	
						<option>${i}</option>
					</c:forEach>
				</select>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 요청 진행 상태 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">진행상태</span>
			</div>
			<div style="width: 24.73%;">
				<select style="width:30%;" id="selectProgress" name="selectProgress">
					<option class="initOption" value="" selected>전체</option>
			        <c:forEach var="i" items="${sttsList}" varStatus="status">	
						<option  value="${i.srRqstSttsNo}">${i.srRqstSttsNm}</option>
					</c:forEach>
				</select>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 검색버튼 -->
			<button id="initSearchBtn" style="width: 5.79%;" class="d-inline-flex flex-row-reverse align-items-center justify-content-center"  
				onclick="initSearchCondition()">
				초기화
			</button>
		</div>
		
		<div class="d-flex" style="margin-top:1.2rem; height:3rem;">
			<!-- 등록자 소속 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">등록자 소속</span>
			</div>
			<div style="width: 22.57%; display:flex; align-items:center;">
				<input type="text" id="inputInst" name="inputInst" class="flex-grow-1"/>
				<button id="findBtn" style="margin-left: 1rem;" class="d-inline-flex align-items-center justify-content-center searchBtn" 
					 data-toggle="modal" data-target="#rqstrInst">
					찾기
				</button>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 개발 부서 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">개발 부서</span>
			</div>
			<div style="width: 9.59%;">
				<select id="selectDevDepartment" name="selectDevDepartment" style="width:100%">
					<option class="initOption" value="" selected>전체</option>
					<c:forEach var="i" items="${deptList}" varStatus="status">	
						<option value="${i.deptNo}">${i.deptNm}</option>
					</c:forEach>
				</select>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 키워드 검색 -->
			<div style="width: 8.94%; display:flex; align-items:center;">
				<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
				<span style="font-size:1.5rem; font-weight:700;">키워드</span>
			</div>
			<div style="width: 24.73%; display: flex;">
				<select style="width:30%;" id="searchKeywordKind" name="searchKeywordKind">
					<option class="initOption" value="" selected>전체</option>
					<option value="searchSrRqstNo">요청번호</option>
					<option value="searchSrRqstNm">제목</option>
				</select>
				<div style="width:1rem;" ></div>
				<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 검색버튼 -->
			<button id="searchBtn" style="width: 5.79%;" class="d-inline-flex flex-row-reverse align-items-center justify-content-center searchBtn"  
				onclick="loadReviewManagementList(1)">
				검색
			</button>
		</div>
	</div>
	<div id="reviewManagementBoardDiv" class="shadow" 
		style="height:63rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR검토목록</span>
			<button id="excelDownloadBtn" onclick="downloadExcelOnReviewManagement()">엑셀 다운로드</button>
		</div>
		<div style="height:51.7rem; margin:0.75rem 0rem; background-color: #f9fafe;">
			<table id="reviewManagementMainTable" style="width: 100%; table-layout: fixed;">
				<colgroup>
					<col width="4%" />
					<col width="10%" />
					<col width="16%" />
					<col width="8%" />
					<col width="6%" />
					<col width="6%" /> 
					<col width="8%" />
					<col width="8%" />
					<col width="6%" />
					<col width="4%" />
					<col width="6%" />
					<col width="6%" />
					<col width="6%" />
				</colgroup>
				<thead>
					<tr style="height: 4.7rem; font-size: 1.5rem; font-weight: 700;">
						<th scope="col"></th>
						<th scope="col">요청번호</th>
						<th scope="col">제목</th>
						<th scope="col">관련시스템</th>
						<th scope="col">등록자</th>
						<th scope="col">소속</th>
						<th scope="col">요청일</th>
						<th scope="col">완료예정일</th>
						<th scope="col">상태</th>
						<th scope="col">중요</th>
						<th scope="col">검토의견</th>
						<th scope="col">이관여부</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody id="reviewManagementList" style="height: 47rem;"></tbody>
			</table>
		</div>
		<div id="reviewManagementListPaging" style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center"></div>
		
		<!-- 상세보기 모달 -->
	    <div id="detailmodal" class="modal" data-backdrop="static">
		  <div class="modal-dialog modal-dialog-centered modal-lg">
		    <div class="modal-content">
		      <div class="modal-header">
		        <span class="modal-title">SR 상세</span>
		        <input id="detailmodal_srRqstNo" hidden>
		        <i class="material-icons close-icon" data-dismiss="modal" onclick="initDetailModal()">close</i>
		      </div>
		      <div class="modal-body">
		      		<!-- SR요청정보 -->
		      		<div class="d-flex mb-2">
		      			<span class="modal-sub-title mr-auto">SR요청정보</span>
		      			<select id="approveResult" name="requestResult" class="mr-2" disabled>
					        <option id="initApproveResult" value="" selected>선택</option>
					        <option class="optionApproveResult" value="APRV_REEXAM">승인재검토</option>
					        <option class="optionApproveResult" value="APRV_RETURN">승인반려</option>
					        <option class="optionApproveResult" value="APRV">승인</option>
					    </select>
		      			<button id="approveResultBtn" type="button" class="btn-3" onclick="saveApproveResult(this)" disabled>처리</button>
		      		</div>
		      		<div class="card p-2 mb-2">
				      	<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="detailmodal_srReqstrNm" class="col-form-label col-5 pl-0">등록자</label>
				            <input id="detailmodal_srReqstrNm" type="text" class="form-control form-control-sm col-7" disabled>
				          </div>
				          <div class="col-sm row">
				            <label for="detailmodal_reqstrInstNm" class="col-form-label col-5">소속</label>
				            <input id="detailmodal_reqstrInstNm" type="text" class="form-control form-control-sm col-7" disabled>
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="detailmodal_srRqstRegDt" class="col-form-label col-5 pl-0">등록일</label>
				            <input id="detailmodal_srRqstRegDt" type="date" class="form-control form-control-sm col-7" disabled>
				          </div>
				          <div class="col-sm row">
				            <label for="detailmodal_sysNm" class="col-form-label col-5">관련시스템</label>
				            <input id="detailmodal_sysNm" type="text" class="form-control form-control-sm col-7" disabled>
				          </div>
						</div>
			          <div class="d-flex mb-2 w-100">
			            <label for="detailmodal_srTtl" class="w-label col-form-label pl-0">SR제목</label>
			            <input id="detailmodal_srTtl" type="text" class="w-content form-control form-control-sm" disabled>
			          </div>
			          <div class="d-flex mb-2 w-100">
			            <label for="detailmodal_srConts" class="w-label col-form-label pl-0">SR내용</label>
			            <textarea id="detailmodal_srConts" class="w-content form-control form-control-sm" rows="3" cols="50" disabled></textarea>
			          </div>
			          <div class="d-flex mb-2 w-100">
			            <label for="detailmodal_srRqstAtchData" class="w-label col-form-label">첨부파일</label>
						<div class="w-content d-flex justify-content-center align-items-center">
		            		<div id="detailmodal_srRqstAtchData"></div>
		            		<div class="ml-auto d-flex">
		            			<input id="detailmodal_srRqstEmrgYn" type="checkbox" disabled><span class="d-flex justify-content-center align-items-center ml-1">중요</span>
		            		</div>
		            	</div>
			          </div>
					</div>
					<div class="card p-2 mb-4">
				      <div class="d-flex mb-2 w-100">
			            <label for="srFile" class="w-label col-form-label pl-0">검토의견</label>
						<textarea id="detailmodal_srRqstRvwRsn" class="w-content form-control form-control-sm" rows="3" cols="50" disabled></textarea>
			          </div>
					</div>
					
					<!-- SR개발정보 -->
		      		<div class="d-flex mb-2">
		      			<span class="modal-sub-title mr-auto">SR개발정보</span>
		      			<input id="detailmodal_srNo" hidden>
	      				<select id="receptionResult" name="receptionResult" class="mr-2" disabled>
					        <option id="initReceptionResult" value="" selected>선택</option>
					        <option value="RCPT_REEXAM">접수재검토</option>
					        <option value="RCPT_RETURN">접수반려</option>
					        <option value="RCPT">접수</option>
					    </select>
		      			<button id="receptionResultBtn" type="button" class="btn-3" onclick="saveReceptionResult(this)" disabled>처리</button>
		      		</div>
		      		<div class="card p-2">
			      		<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="detailmodal_srPicUsrNm" class="col-form-label col-5 pl-0">개발담당자</label>
				            <input id="detailmodal_srPicUsrNm" type="text" class="form-control form-control-sm col-7" disabled>
				          </div>
				          <div class="col-sm row">
				            <label for="detailmodal_srTrnsfYn" class="col-form-label col-5">이관여부</label>
				            <div class="d-flex col-7 p-0">
				            	<div class="d-flex">				        
							       <input id="srTrnsfYn_Y" type="radio" name="srTrnsfYn" value="Y" disabled>
							       <label for="srTrnsfYn_Y" class="d-flex ml-3 mb-0 align-items-center">이관신청</label>
						        </div>
								<div class="d-flex ml-auto">						
							       <input id="srTrnsfYn_N" type="radio" name="srTrnsfYn" value="N" disabled>
							       <label for="srTrnsfYn_N" class="d-flex ml-3 mb-0 align-items-center">자체개발</label>
								</div>
							</div>
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="detailmodal_srTrnsfInst" class="col-form-label col-5 pl-0">이관기관</label>
				            <select style="width:30%;" id="detailmodal_srTrnsfInst" class="form-control form-control-sm col-7" disabled>
						        <c:forEach var="i" items="${outsrcInstList}" varStatus="status">	
									<option value="${i.instNo}">${i.instNm}</option>
								</c:forEach>
							</select>
				          </div>
				          <div class="col-sm row">
				            <label for="detailmodal_srTaskClsf" class="col-form-label col-5">업무구분</label>
				            <select style="width:30%;" id="detailmodal_srTaskClsf" class="form-control form-control-sm col-7" disabled>
						        <c:forEach var="i" items="${taskClsfList}" varStatus="status">	
									<option value="${i.srTaskNo}">${i.srTaskNm}</option>
								</c:forEach>
							</select>
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="detailmodal_srReqBgt" class="col-form-label col-5 pl-0">소요예산</label>
				            <input id="detailmodal_srReqBgt" type="text" class="form-control form-control-sm col-7" disabled>
				          </div>
				          <div class="col-sm row">
				            <label for="detailmodal_srDmndClsf" class="col-form-label col-5">요청구분</label>
				            <select style="width:30%;" id="detailmodal_srDmndClsf" class="form-control form-control-sm col-7" disabled>
						        <c:forEach var="i" items="${dmndClsfList}" varStatus="status">	
									<option value="${i.srDmndNo}">${i.srDmndNm}</option>
								</c:forEach>
							</select>
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
							<div class="col-sm row">
				            	<label for="detailmodal_srPri" class="col-form-label col-5 pl-0">우선순위</label>
				            	<input id="detailmodal_srPri" type="text" class="form-control form-control-sm col-7" disabled>
				          	</div>
				          	<div class="col-sm row">
				            	<label for="detailmodal_srCmptnPrnmntDt" class="col-form-label col-5">완료예정일</label>
				            	<input id="detailmodal_srCmptnPrnmntDt" type="date" class="form-control form-control-sm col-7" disabled>
				          	</div>
						</div>
			      		<div class="d-flex mb-2 w-100">
			            	<label for="detailmodal_srDvlConts" class="w-label col-form-label pl-0">개발내용</label>
			            	<textarea id="detailmodal_srDvlConts" class="w-content form-control form-control-sm" rows="3" cols="50" disabled></textarea>
			          	</div>
			          	<div class="d-flex mb-2 w-100">
			            	<label for="detailmodal_srAtchData" class="w-label col-form-label">첨부파일</label>
			            	<div id="detailmodal_srAtchData" class="w-content d-flex align-items-center"></div>
			          	</div>
					</div>
		      </div>
		      <div class="modal-footer py-1">
		        <button id="completionResultBtn" type="button" class="completionResultBtn btn-complete-disabled" onclick="saveCompletionResult()" disabled>개발완료 처리</button>
		      </div>
		    </div>
		  </div>
		</div>
		
		<!-- 알림 모달  -->
		<div id="alertModal" class="modal" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered modal-sm">
				<div class="modal-content">
					<div class="modal-header-red d-flex">
						<div class="modal-title mr-auto">알림</div>
						<i class="material-icons close-icon ml-auto" data-dismiss="modal" style="cursor: pointer;">close</i>
					</div>
					<div class="modal-body">
						<div id="alertModalContent" style="height:11rem; font-weight: 700; display: flex; justify-content: center; align-items: center;">
							변경할 상태를 선택해주십시오.
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 변경성공 알림 모달  -->
		<div id="successModal" class="modal" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered modal-sm">
				<div class="modal-content">
					<div class="modal-header d-flex" style="background-color: #2c7be4;">
						<div class="modal-title mr-auto">성공</div>
						<i class="material-icons close-icon ml-auto" data-dismiss="modal" style="cursor: pointer;" onclick="redirect()">close</i>
					</div>
					<div class="modal-body">
						<div id="alertModalContent" style="height:11rem; font-weight: 700; display: flex; justify-content: center; align-items: center;">
							SR요청 상태가 변경되었습니다.
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 등록자 소속 선택 모달 -->
		<div id="rqstrInst" class="modal" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered modal-md" style="width:100rem;">
				<div class="modal-content">
					<div class="modal-header">
						<div class="modal-title">등록자 소속 찾기</div>
						<i class="material-icons close-icon" data-dismiss="modal">close</i>
					</div>
					<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
						<div style="display:none;"></div>
						<div>
							<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0.5rem 0.5rem 0;">
								<span class="m-3" style="font-size:1.6rem; font-weight:700;">등록자 소속을 선택해 주세요.</span>
								<div style="margin:0.5rem;">
									<table id="getInsts" style="width: 100%; text-align: center; border-radius:5px;">
										<colgroup>
											<col width="20%"/>
											<col width="40%"/>
											<col width="40%"/>
										</colgroup>
										<thead style="background-color: #e9ecef;">
											<tr style="height: 4.3rem; font-size: 1.5rem; font-weight: 700; border: 1.5px solid #e9ecef;">
												<th scope="col"></th>
												<th scope="col">소속 기관 코드</th>
												<th scope="col">소속 기관</th>
											</tr>
										</thead>
										<tbody id="instList">
											<c:forEach var="i" items="${NoOutsrcInstList}" varStatus="status">	
												<tr style="background-color: white; height: 4.5rem; border: 1.5px solid #e9ecef;">
													<td><input type="radio" value="${i.instNo}"></td>
													<td>${i.instNo}</td>
													<td>${i.instNm}</td>
												</tr>
											</c:forEach>
										</tbody>
									</table>
								</div>
								<div style="height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-end;">
									<a id="rqstrInstBtn" class ="btn-1 d-flex justify-content-center align-items-center" data-dismiss="modal" onclick="sendRqstrInst()">확인</a>
									<a href="#" class="btn-3 d-flex justify-content-center align-items-center" data-dismiss="modal">닫기</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
	    </div>
		
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>