<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<!-- css 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/developManagement/developManagement.css" />
<!-- javascript 연결 -->
<script src="${pageContext.request.contextPath}/resources/javascript/srManagement/developManagement.js"></script>

<div id="developManagementDiv" class="shadow">
	<div id="developManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 1rem;">SR개발관리</span>
		</div>
	</div>
	<div id="developManagementSearchDiv" class="shadow" style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
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
					<option value="" selected>전체</option>
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
					<option value="" selected>전체</option>
			        <c:forEach var="i" items="${sttsList}" varStatus="status">	
						<option  value="${i.srRqstSttsNo}">${i.srRqstSttsNm}</option>
					</c:forEach>
				</select>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 담당 SR -->
			<div style="width: 5.79%;" class="d-flex flex-row-reverse align-items-center">
				<span style="font-size:1.5rem; margin-left: 0.5rem;">담당 SR</span>
	        	<input type="checkbox" id="picCheck" name="picCheck">
	        </div>
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
					<option value="" selected>전체</option>
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
					<option value="" selected>전체</option>
					<option value="searchSrRqstNo">요청번호</option>
					<option value="searchSrRqstNm">제목</option>
				</select>
				<div style="width:1rem;" ></div>
				<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
			</div>
			<div style="width: 3.5%;"></div>
			<!-- 검색버튼 -->
			<button id="searchBtn" style="width: 5.79%;" class="d-inline-flex flex-row-reverse align-items-center justify-content-center searchBtn"  
				onclick="loadDevelopManagementList(1)">
				검색
			</button>
		</div>
	</div>
	<div id="developManagementBoardDiv" class="shadow" 
		style="height:63rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR개발목록</span>
			<button class="excelDownloadBtn" onclick="downloadExcelOnDevelopManagement()">엑셀 다운로드</button>
		</div>
		<div style="height:51.7rem; margin:0.75rem 0rem; background-color: #f9fafe;">
			<table id="developManagementMainTable" style="width: 100%;  table-layout: fixed;">
				<colgroup>
					<col width="4.5%" />
					<col width="10.5%" />
					<col width="16.5%" />
					<col width="8.5%" />
					<col width="6.5%" />
					<col width="6.5%" /> 
					<col width="8.5%" />
					<col width="8.5%" />
					<col width="6.5%" />
					<col width="4.5%" />
					<col width="6.5%" />
					<col width="6.5%" />
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
						<th scope="col">이관여부</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody id="developmentManagementList" style="height: 47rem;"></tbody>
			</table>
		</div>
		<div id="developmentManagementListPaging" style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center"></div>
		
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

		<!-- sr요청에 해당하는 상세모달 -->
		<div id="detailModal" class="modal" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<span class="modal-title">SR 요청 상세</span>
						<i class="material-icons close-icon" data-dismiss="modal"
							style="cursor: pointer;">close</i>
					</div>
					<div class="modal-body">
						<form id="modifySrRqst" action="/otisrm/srManagement/developManagement/modifySrRqst"
							method="post" enctype="multipart/form-data">
							<!-- SR요청정보 -->
							<div class="d-flex">
								<div>
									<span class="modal-sub-title">SR요청 정보</span>
								</div>
								<div class="mr-2 mb-2" style="margin-left: 420px;">
									<select class="form-control" style="width: 109.13px;"
										id="srRqstStts-select" name="srRqstSttsNo">
										<option value="">선택</option>
									</select>
								</div>
								<div>
									<button id="deleteButton" class="btn-5" type="button"
										data-toggle="modal" data-target="#srRqstdeleteModal">삭제</button>
									<button id="saveButton" type="button"
										onclick="modifySrRqst()" class="btn-1">저장</button>
								</div>
							</div>
							<div class="card p-3 mb-4">
								<div>
									<div class="d-flex">
										<div class="d-flex w-50 pt-2">
											<div class="w-30">
												<label for="writer" class="form-label">등록자</label>
											</div>
											<div class="w-45">
												<input id="srRqst-UsrNm" type="text" class="form-control"
													id="writer" disabled> <input id="srRqst-srRqstNo"
													type="hidden" class="form-control" name="srRqstNo">
											</div>
										</div>
										<div class="d-flex w-50">
											<div class="w-30">
												<label for="writerDepartment" class="form-label">소속</label>
											</div>
											<div class="w-45">
												<input id="srRqst-instNm" type="text" class="form-control"
													id="writerDepartment" disabled>
											</div>
										</div>
									</div>
									<div>
										<div>
											<div class="d-flex">
												<div class="d-flex w-50 pt-2">
													<div class="w-30">
														<label for="writeDate" class="form-label">등록일</label>
													</div>
													<div class="w-45">
														<input type="date" class="form-control" value=""
															id="srRqst-srRqstRegDt" disabled>
													</div>
												</div>
												<div class="d-flex w-50">

													<div class="w-30">
														<label for="systemName" class="form-label">관련시스템</label>
													</div>
													<div class="w-45">
														<input id="srRqst-sysNm" type="text" class="form-control"
															id="writerDepartment" disabled>
													</div>
												</div>
											</div>
										</div>
										<div class="d-flex w-100 pt-2">
											<div style="width: 113.9px;">
												<label for="srRqst-srTtl" class="form-label">SR제목</label>
											</div>
											<div style="width: 550.41px;">
												<input id="srRqst-srTtl" type="text"
													class="modifyPossible form-control" name="srTtl">
											</div>
										</div>
										<div class="d-flex w-100 pt-2">
											<div style="width: 113.9px;">
												<label for="srRqst-srPrps" class="form-label">관련근거/목적</label>
											</div>
											<div style="width: 550.41px;">
												<input id="srRqst-srPrps" type="text"
													class="modifyPossible form-control" name="srPrps">
											</div>
										</div>
										<div class="d-flex w-100 pt-2">
											<div style="width: 113.9px;">
												<label for="systemName" class="form-label">SR 내용</label>
											</div>
											<div style="width: 550.41px;">
												<textarea id="srRqst-srConts" rows="3"
													class="modifyPossible form-control" id="srContent"
													name="srContent"></textarea>
											</div>
										</div>
										<div class="d-flex w-100 pt-2">
											<div style="width: 113.9px;">
												<label for="systemName"
													class="srRqstModify form-label modal-input">첨부파일</label>
											</div>
											<div style="width: 500px;">
												<input type="file" id="srRqstAtch" name="srRqstAtch" disabled multiple>
											</div>
											<div class="d-flex">
												<input id="srRqst-importantChk" class="srRqstModify"
													type="checkbox" onclick="isImportendChecked2()">
													<span class="d-flex justify-content-center align-items-center ml-1">중요</span>
											</div>
										</div>
										<div class="d-flex w-100 pt-2">
											<div style="width: 113.9px;"></div>
											<div id="showSrRqstAtch"></div>
										</div>
									</div>
								</div>
							</div>
						</form>
						<!-- 검토의견 -->
						<div class="card p-3 mb-4">
							<div class="d-flex w-100 pt-2">
								<div style="width: 113.9px;">
									<label for="systemName" class="form-label">검토의견</label>
								</div>
								<div style="width: 550.41px;">
									<textarea id="srRqst-review" rows="3" class="form-control"
										disabled></textarea>
								</div>
							</div>
						</div>

						<!-- SR 상태 변경  -->
						<form id="srRqstSttsUpdate" action="modifySrRqst"
							method="post">
							<div class="d-flex">
								<div>
									<span class="modal-sub-title">SR개발 정보</span>
								</div>
								<div class="mr-2 mb-2" style="margin-left: 496px;">
									<select class="form-control" style="width: 109.13px;"
										id="srRqstStts-select2" name="srRqstSttsNo">
										<option value="">선택</option>
									</select> <input type="hidden" id="update-srRqstNo" name="srRqstNo">
								</div>
								<div>
									<button id="saveButton2" type="button" class="btn-1"
										onclick="srRqstSttsUpdate()" data-dismiss="modal">저장</button>
								</div>
							</div>
						</form>

						<!-- SR 개발정보 -->
						<form id="writeOrModifySr"
							action="writeOrModifySr" method="post"
							enctype="multipart/form-data">
							<div class="card p-3 mb-4">
								<div>
									<div class="d-flex">
										<div class="d-flex w-50 pt-2">
											<div class="w-30">
												<label for="srPic" class="form-label">개발담당자</label>
											</div>
											<div class="w-45">
												<input type="text" class="form-control" value="${usr.usrNm}"
													disabled> <input type="hidden" class="form-control"
													id="picUsrNo" name="picUsrNo" value="${usr.usrNo}">
												<input id="sr-srRqstNo" type="hidden" class="form-control"
													name="srRqstNo"> <input id="srNo" type="hidden"
													class="form-control" name="srNo">
											</div>
										</div>
										<div class="d-flex w-50">
											<div class="w-30">
												<label for="writerDepartment" class="form-label">개발부서</label>
											</div>
											<div class="w-45">
												<input type="text" class="form-control"
													value="${usr.deptNm}" disabled>
											</div>
										</div>
									</div>
									<div class="d-flex w-100 pt-2">
										<div style="width: 113.9px;">
											<label for="srTrnsfYn" class="form-label">이관여부</label>
										</div>
										<div class="d-flex" style="width: 550.41px;">
											<div class="d-flex">
												<input id="srTrnsfYn_Y" class="srInput" type="radio"
													name="srTrnsfYn" value="Y">
													<label class="ml-1 mb-0 d-flex justify-content-center align-items-center"
													for="srTrnsfYn_Y">이관신청</label>
											</div>
											<div class="ml-2 d-flex">
												<input id="srTrnsfYn_N" class="srInput" type="radio"
													name="srTrnsfYn" value="N">
													<label class="ml-1 mb-0 d-flex justify-content-center align-items-center"
													for="srTrnsfYn_N">자체개발</label>
											</div>
											<div id="srTrnsf-info" class="text-danger ml-2 pt-2"
												style="font-size: 1.2rem;">(이관 신청을 할 경우 이관기관, 소요예산,
												요청구분은 필수적으로 작성해주세요.)</div>
										</div>
									</div>
									<div>
										<div>
											<div class="d-flex">
												<div class="d-flex w-50 pt-2">
													<div class="w-30">
														<label for="srPic" class="form-label">이관기관</label>
													</div>
													<div class="w-45">
														<select id="trnsf-srinst"
															class="srTrnsfYn_Y srInput form-control"
															name="srTrnsfInstNo">
															<option value="">--이관기관 선택--</option>
															<c:forEach items="${instByOutsrcYList}" var="inst">
																<option id="${inst.instNm}" value="${inst.instNo}">${inst.instNm}</option>
															</c:forEach>
														</select>
													</div>
												</div>
												<div class="d-flex w-50">
													<div class="w-30">
														<label for="writerDepartment" class="form-label">소요예산</label>
													</div>
													<div class="w-45">
														<input id="trnsf-srReqBgt" type="text"
															class="srTrnsfYn_Y srInput form-control" name="srReqBgt">
													</div>
												</div>
											</div>
											<div>
												<div>
													<div class="d-flex">
														<div class="d-flex w-50 pt-2">
															<div class="w-30">
																<label for="writeDate" class="form-label">요청구분</label>
															</div>
															<div class="w-45">
																<select class="srTrnsfYn_Y srInput form-control"
																	id="trnsf-srDmndClsf" name="srDmndNo">
																	<option value="">--요청구분 선택--</option>
																	<c:forEach items="${srDmndClsfList}" var="srDmndClsf">
																		<option id="${srDmndClsf.srDmndNm}"
																			value="${srDmndClsf.srDmndNo}">${srDmndClsf.srDmndNm}</option>
																	</c:forEach>
																</select>
															</div>
														</div>
														<div class="d-flex w-50">

															<div class="w-30">
																<label for="systemName" class="form-label">업무구분</label>
															</div>
															<div class="w-45">
																<select class="srInput form-control" id="srTaskNo"
																	name="srTaskNo">
																	<option value="">--업무구분 선택--</option>
																	<c:forEach items="${srTaskClsfList}" var="srTaskClsf">
																		<option id="${srTaskClsf.srTaskNm}"
																			value="${srTaskClsf.srTaskNo}">${srTaskClsf.srTaskNm}</option>
																	</c:forEach>
																</select>
															</div>
														</div>
													</div>
												</div>
												<div>
													<div class="d-flex">
														<div class="d-flex w-50 pt-2">
															<div class="w-30">
																<label for="writeDate" class="form-label">우선순위</label>
															</div>
															<div class="w-45">
																<select class="srInput form-control" id="srPri"
																	name="srPri">
																	<option value="">--우선순위 선택--</option>
																	<option value="상">상</option>
																	<option value="중">중</option>
																	<option value="하">하</option>
																</select>
															</div>
														</div>
														<div class="d-flex w-50">
															<div class="w-30">
																<label for="systemName" class="form-label">완료예정일</label>
															</div>
															<div class="w-45">
																<input id="srCmptnPrnmntDt" type="date"
																	class="srInput form-control" name="srCmptnPrnmntDt">
															</div>
														</div>
													</div>
												</div>
												<div id="srSchdlChgRqstY">
													<div class="d-flex">
														<div class="d-flex w-50 pt-2"></div>
														<div class="d-flex w-50 pt-2">
															<div class="w-30">
																<label for="systemName" class="form-label"
																	style="color: #de483a">변경요청일</label>
															</div>
															<div class="w-45">
																<input id="srSchdlChgRqstDt" type="date"
																	class="srInput form-control">
															</div>
														</div>
													</div>
												</div>
												<div id="srSchdlChgRqstAprvYn">
													<div class="d-flex">
														<div class="d-flex w-50 pt-2"></div>
														<div class="d-flex w-50 pt-2">
															<div>
																<input id="srSchdlChgAprvY" class="srInput" type="radio"
																	name="srSchdlChgRqstAprvYn" value="Y"> <label
																	for="srSchdlChgAprvY">변경 요청 승인</label>
															</div>
															<div class="ml-2">
																<input id="srSchdlChgAprvN" class="srInput" type="radio"
																	name="srSchdlChgRqstAprvYn" value="N"> <label
																	for="srSchdlChgAprvN">변경 요청 반려</label>
															</div>
														</div>
													</div>
												</div>
												<div class="d-flex w-100 pt-2">
													<div style="width: 113.9px;">
														<label for="systemName" class="form-label">개발내용</label>
													</div>
													<div style="width: 550.41px;">
														<textarea id="srDvlConts" class="srInput form-control"
															rows="3" name="srDvlConts"></textarea>
													</div>
												</div>
												<div class="d-flex w-100 pt-2">
													<div style="width: 113.9px;">
														<label for="systemName" class="form-label modal-input">첨부파일</label>
													</div>
													<div style="width: 500px;">
														<input type="file" id="srAtch" class="srInput" name="srAtch"
															multiple>
													</div>
												</div>
												<div class="d-flex w-100 pt-2">
													<div style="width: 113.9px;"></div>
													<div id="showSrAtch"></div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<button id="srWriteOrModifyBtn" type="button"
									onclick="writeOrModifySr()" class="btn-1"
									style="font-size: 1.3rem;">SR정보 등록</button>
								<button type="button" class="btn-3" data-dismiss="modal">닫기</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		
		<!-- 알림 모달 -->
		<div id="alertModal" class="modal" data-backdrop="static">
			<div class="modal-dialog modal-dialog-centered modal-sm">
				<div class="modal-content">
					<div class="modal-header" style="background-color:#3d86e5; color:white; display:flex;">
						<i class="material-icons">info</i>
						<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">알림</div>
						<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;"" onclick="alertModalClose()">close</i>
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
					<div class="modal-header" style="background-color:#d1322e; color:white; display:flex;  justify-content: flex-start;">					
						<i class="material-icons">warning</i>
						<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">경고</div>
						<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;" onclick="warningModalClose()">close</i>
					</div>
					<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
						<div id="warningContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
							
						</div>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>