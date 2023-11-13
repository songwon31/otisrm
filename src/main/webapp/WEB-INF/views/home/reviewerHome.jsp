<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>

<!-- css 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/reviewerHome.css" />
<!-- javascript 연결 -->
<script src="${pageContext.request.contextPath}/resources/javascript/home/reviewerHome.js"></script>
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>


<div id="reviewerHomeDiv" class="shadow">
	<div id="reviewerHomeTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons" style="font-size:3.5rem; height:4rem; line-height: 4rem;">person</i>
         	<span style="margin-left: 1rem;">My Portal</span>
		</div>
	</div>
	<div class="d-flex">
		<div style="width: 70%;">
			<div id="reviewerHomeCountDiv" class="shadow" style="height:10.5rem; margin: 0.5rem 0; background-color:white; border-radius:1rem; padding:1rem;" >
				<div class="reviewerHomeSecondTitle">
					<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem;">chevron_right</i>
					<span>미처리 검토 현황</span>
					<button class="btn-all ml-auto px-3 d-flex justify-content-center align-items-center" onclick="loadUnprocessedListAll(1)">전체</button>
				</div>
				<div style="width: 100%;" class="d-flex">
					<a class="countcard" onclick="selectReviewStts(this)">
						<span>승인대기</span>
						<span class="mr-3">:</span>
						<span id="aprvWaitCount" class="mr-3">5</span>
						<span>건</span>
					</a>
					<div style="width: 1%;"></div>
					<a class="countcard" onclick="selectReviewStts(this)">
						<span>접수대기</span>
						<span class="mr-3">:</span>
						<span id="rcptWaitCount" class="mr-3">7</span>
						<span>건</span>
					</a>
					<div style="width: 1%;"></div>
					<a class="countcard" onclick="selectReviewStts(this)">
						<span>완료요청</span>
						<span class="mr-3">:</span>
						<span id="cmptnRqstCount" class="mr-3">1</span>
						<span>건</span>
					</a>
				</div>
			</div>
			<div id="reviewerHomeBoardDiv" class="shadow" style="height:36.5rem; background-color:white; border-radius:1rem; padding:1rem;">
				<div class="reviewerHomeSecondTitle">
					<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem;">chevron_right</i>
					<span>검토 목록</span>
				</div>
				<div style="height: 27rem;  background-color: #f9fafe;">
					<table id="reviewerHomeMainTable" style="width: 100%; table-layout: fixed;">
						<colgroup>
							<col width="5%" />
							<col width="12.5%" />
							<col width="20%" />
							<col width="10%" />
							<col width="7.5%" />
							<col width="7.5%" />
							<col width="7.5%" />
							<col width="10%" />
							<col width="10%" />
							<col width="7.5%" />
						</colgroup>
						<thead>
							<tr style="height: 4.5rem; font-size: 1.5rem; font-weight: 700;">
								<th scope="col"></th>
								<th scope="col">SR번호</th>
								<th scope="col">제목</th>
								<th scope="col">관련시스템</th>
								<th scope="col">등록자</th>
								<th scope="col">소속</th>
								<th scope="col">상태</th>
								<th scope="col">요청일</th>
								<th scope="col">완료예정일</th>
								<th scope="col">상세보기</th>
							</tr>
						</thead>
						<tbody id="reviewerHomeBoardList" style="height: 22.5rem;"></tbody>
					</table>
				</div>
				<div id="reviewerHomeMainTablePaging" style="height: 4rem; padding: 0.5rem 0;" class="d-flex flex-row justify-content-center align-items-center">
				</div>
				
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
							        <option value="APRV_REEXAM">승인재검토</option>
							        <option value="APRV_RETURN">승인반려</option>
							        <option value="APRV">승인</option>
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
								<input id="detailmodal_srRqstAtchData" type="file" class="w-content form-control-file form-control-sm p-0" disabled>
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
			      				<select id="receptionResult" name="receptionResult" class="mr-2" disabled>
							        <option id="initReceptionResult" value="" selected>선택</option>
							        <option value="RCPT_REEXAM">접수재검토</option>
							        <option value="RCPT_RETURN">접수반려</option>
							        <option value="RCPT">접수승인</option>
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
						            <input id="detailmodal_srTrnsfYn" type="text" class="form-control form-control-sm col-7" disabled>
						          </div>
								</div>
								<div class="row mx-0 mt-0 mb-2">
						          <div class="col-sm row">
						            <label for="detailmodal_srTrnsfInstNm" class="col-form-label col-5 pl-0">이관기관</label>
						            <input id="detailmodal_srTrnsfInstNm" type="text" class="form-control form-control-sm col-7" disabled>
						          </div>
						          <div class="col-sm row">
						            <label for="detailmodal_srTaskNm" class="col-form-label col-5">업무구분</label>
						            <input id="detailmodal_srTaskNm" type="text" class="form-control form-control-sm col-7" disabled>
						          </div>
								</div>
								<div class="row mx-0 mt-0 mb-2">
						          <div class="col-sm row">
						            <label for="detailmodal_srReqBgt" class="col-form-label col-5 pl-0">소요예산</label>
						            <input id="detailmodal_srReqBgt" type="text" class="form-control form-control-sm col-7" disabled>
						          </div>
						          <div class="col-sm row">
						            <label for="detailmodal_srDmndNm" class="col-form-label col-5">요청구분</label>
						            <input id="detailmodal_srDmndNm" type="text" class="form-control form-control-sm col-7" disabled>
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
									<input id="detailmodal_srAtchData" type="file" id="srFile" class="w-content form-control-file form-control-sm p-0" disabled>
					          	</div>
							</div>
				      </div>
				      <div class="modal-footer py-1">
				        <button id="completionResultBtn" type="button" class="btn-complete-disabled" onclick="saveCompletionResult()" disabled>개발완료 처리</button>
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
								
			</div>
		</div>
		<div style="width: 30%; padding-left: 0.5rem;">
			<div id="reviewerHomeChartDiv" class="shadow d-flex flex-column" style="height:47.5rem; background-color:white; border-radius:1rem; padding:1rem; margin-top: 0.5rem;" >
				<div class="reviewerHomeSecondTitle ">
					<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem;">chevron_right</i>
					<span>시스템별 SR 현황</span>
				</div>
				<div id="reviewerHomeChartBySys" style="height: 42rem;">
				</div>
			</div>
		</div>
	</div>
	
	<div id="reviewerHomeSrProgressDiv" class="shadow" style="height:31.5rem; width: 100%; background-color:white; border-radius:1rem; margin-top: 0.5rem; padding:1rem;">
       <div class="reviewerHomeSecondTitle ">
       		<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem;">chevron_right</i>
       		<span>SR진행현황</span>
       	</div>
       <div class="reviewerHomeSrProgressContents d-flex pt-3">
       		<div id="progressCircles" style="width: 70%; height: 23rem;">
				<div class="progress-steps" style="margin-top: 3.88rem;">
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">요청</p>
							<div id="progress_rqst_info" class="d-none" style="width: 10rem; height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_srRqstRegDt"></div>
								<div id="progress_srReqstrNm"></div>
							</div>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">승인대기</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">승인</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">접수대기</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">접수</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">개발중</p>
							<div id="progress_dep_ing_info" class="d-none" style="width: 10rem;  height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_deptNmOrTrnsfInstNm"></div>
								<div id="progress_srTrnsfYn"></div>
							</div>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">테스트</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">완료요청</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">개발완료</p>
							<div id="progress_dep_cmptn_info" class="d-none" style="width: 10rem; height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_srCmptnPrnmntDt"></div>
								<div>예정</div>
							</div>
						</div>
					</div>
				</div>
			</div>
       		<div class="d-flex flex-column" style="width: 30%; background-color: #edf2f8; border-radius: 0.5rem; padding: 1rem;">
	       		<div class="d-flex mb-3">
		       		<span class="badgeitem w-label d-flex justify-content-center mr-auto">SR 번호</span>
		       		<span id="progress_srNo" class="d-flex w-content"></span>
	       		</div>
	       		<div class="d-flex mb-3">
		       		<span class="badgeitem w-label d-flex justify-content-center mr-auto">SR 제목</span>
		       		<span id="progress_srTtl" class="d-flex w-content"></span>
	       		</div>
	       		<div class="d-flex mb-3">
		       		<span class="badgeitem w-label d-flex justify-content-center mr-auto">SR 내용</span>
		       		<textarea id="progress_srConts" class="d-flex w-content" rows="3" cols="50" disabled></textarea>
	       		</div>
	       		<div class="d-flex">
		       		<span class="badgeitem w-label d-flex justify-content-center mr-auto">검토의견</span>
		       		<textarea id="progress_srRqstRvwRsn" class="d-flex w-content" rows="3" cols="50" disabled></textarea>
	       		</div>
	       </div>
       </div>
       
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>