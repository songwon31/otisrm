<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<script src="${pageContext.request.contextPath}/resources/javascript/home/customerHome.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/customerHome.css" />
<div id="customerHomeDiv" class="contentDiv shadow">
   <div>
	   <input type="hidden" id="loginUsrNo" value="${usr.usrNo}">
	   <div class="titleDiv">
	      <div class="font-weight-bold d-flex tt-ct">
	         <i class="material-icons tt-ic">person</i>
	            <span>My Portal</span>
	      </div>
	   </div>
   </div>
   
   
   <div>
	   <div class="d-flex">
		   <div class="potalTop section shadow w-70">
		   	  <div class="subcontentTitle">
			   	  <div class="d-flex st-ct">
			   	  	<i class="material-icons stt-ic">chevron_right</i>
			   	  	<span class="pt-1">나의 할일</span>
			   	  </div>
		   	  </div>
		   	  <div class="tableContainer">
		   	  	<div class="filterTabWrap">
		   	  		<div class="d-flex">
		   	  			<div id="" class="filterTab d-flex justify-content-center align-items-center" 
		   	  				style="background-color: #edf2f8; color: black;">
			   	  			<div>전체</div>
			   	  			<div id="numOfAll" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RQST" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>요청</div>
		   	  				<div id="numOfRqst" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV_WAIT" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>승인대기</div>
			   	  			<div id="numOfAprvWait" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>승인</div>
		   	  				<div id="numOfAprv" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT_WAIT" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>접수대기</div>
		   	  				<div id="numOfRcptWait" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT"  class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>접수</div>
			   	  			<div id="numOfRcpt" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="DEP_ING"  class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>개발중</div>
		   	  				<div id="numOfDepIng" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="TEST" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>테스트</div>
			   	  			<div id="numOfTest" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="CMPTN_RQST" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>완료요청</div>
			   	  			<div id="numOfCmptnRqst"class="pb-1"></div>
		   	  			</div>
		   	  			<div id="DEP_CMPTN" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>개발완료</div>
			   	  			<div id="numOfDepCmptn" class="m-1"></div>
		   	  			</div>
		   	  			<div id="requestAddBtnWrap" class="d-flex flex-row-reverse align-items-end">
							<button id="requestAddBtn" data-toggle="modal" data-target="#addSrRqst" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" onclick="showSysByDeptNo('${usr.deptNo}')">
								요청 등록
							</button>
						</div>
		   	  		</div>
		   	  	</div>
		   	  <table id="mainTable" style="width: 100%; text-align: center; height: 27rem;">
				    <colgroup>
				        <col width="45.04px" />
				        <col width="118.99px" />
				        <col width="221.32px" />
				        <col width="144.64px" />
				        <col width="67.56px" />
				        <col width="69.64px" />
				        <col width="67.56px" />
				        <col width="90.08px" />
				        <col width="45.04px" />
				        <col width="67.7px" />
				    </colgroup>
				    <thead>
				        <tr>
				            <th scope="col"></th>
				            <th scope="col">요청번호</th>
				            <th scope="col">제목</th>
				            <th scope="col">관련시스템</th>
				            <th scope="col">등록자</th>
				            <th scope="col">소속</th>
				            <th scope="col">상태</th>
				            <th scope="col">요청일</th>
				            <th scope="col">중요</th>
				            <th scope="col">상세보기</th>
				        </tr>
				    </thead>
				    <tbody id="getSrReqstListByPageNo">      
			         <!-- Json 데이터 들어오는 곳 -->    
				    </tbody>
				</table>
				<!-- 페이징 -->
				<div  id="pagination-container" class="paging d-flex justify-content-center">
					<a class="btn" href="javascript:loadSRRequests(1)">처음</a>
					<c:if test="${srRqstpager.groupNo>1}">
						<a class="btn" href="javascript:loadSRRequests(${srRqstpager.startPageNo-1})">이전</a>
					</c:if>
					
					<c:forEach var="i" begin="${srRqstpager.startPageNo}" end="${srRqstpager.endPageNo}">
						<c:if test="${srRqstpager.pageNo != i}">
							<a class="btn" href="javascript:loadSRRequests(${i})">${i}</a>
						</c:if>
						<c:if test="${srRqstpager.pageNo == i}">
							<a class="btn" href="javascript:loadSRRequests(${i})">${i}</a>
						</c:if>
					</c:forEach>
					
					<c:if test="${srRqstpager.groupNo<srRqstpager.totalGroupNo}">
						<a class="btn" href="javascript:loadSRRequests(${srRqstpager.endPageNo+1})">다음</a>
					</c:if>
					<a class="btn" href="javascript:loadSRRequests(${srRqstpager.totalPageNo})">맨끝</a>
			    </div>	
		   	  </div>
		    </div>
		    <div class="potalTop section shadow w-30">
		   	</div>
	   </div>
   </div>
   
    
<div class="potalBottom section shadow">
	<div class="subcontentTitle">
 		<div class="d-flex st-ct">
	 	  	<i class="material-icons stt-ic">chevron_right</i>
	 	  	<span class="pt-1">게시판</span>
 	 	</div>
	 </div>
   	  <div class="st-ct">
	   	  <div class="subcontentTitle pt-1" style="width: 48%; padding-left: 19px;color: #5d6e7e;">
	   	  	SR 진행 현황
	   	  </div>
   	  </div>
   	  <div class="d-flex">
	   	 
	 </div>
</div>
   
<!-- 요청등록 모달 -->
<div id="addSrRqst" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">SR 요청 등록</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div id="srRqstBySrRqstNoForm" class="modal-body">
      	<form id="writeSrRqst" action="writeSrRqst" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<h6 class="modal-sub-title">SR요청등록</h6>
      		<div class="card p-3 mb-4">
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writer" class="form-label">등록자</label>
				          	</div>
				 			<div class="w-45">
					            <input type="text" class="form-control" id="data-usrNm" value="${usr.usrNm}" disabled>
				 			</div>
				            <input type="hidden" id="srReqstrNo" name="srReqstrNo" value="${usr.usrNo}">
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="writerDepartment" class="form-label">소속</label>
					        </div>
					        <div class="w-45">
					          <input type="text" class="form-control" id="writerDepartment" value="${usr.instNm}" disabled>
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
					            <input type="date" class="form-control" id="writeDate" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="systemName" class="form-label">관련시스템</label>
					        </div>
					        <div class="w-45">
					          <select class="form-control" id="sysNo" name="sysNo">
					          	<option>--관련시스템--</option>
					          </select>
					        </div>
					    </div>
					</div>
		        </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR제목</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input type="text" class="form-control" id="srTtl" name="srTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input type="text" class="form-control" id="srPrps" name="srPrps">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea class="form-control" id="srConts" name="srConts"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label modal-input">첨부파일</label>
			        </div>
			        <div style="width: 500px;">
			        	 <input id="file" type="file" name="file" multiple>
			        </div>
			        <div>
			        	<input id="importantChk" type="checkbox" onclick="isImportendChecked()"><span> 중요</span>
			        </div>
			        <input id="srRqstEmrgYn" type="hidden" name="srRqstEmrgYn" value="N">
			    </div>
			</div>
      	</div>
      </div>
      <div class="modal-footer py-1">
        <button class="btn-1">저장</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
    </form>
   </div>
  </div>
 </div>
</div>

<!-- 요청목록에 해당하는 상세모달 -->
<!-- 상세보기 모달 -->
<div id="detailmodal" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <span class="modal-title">SR 상세</span>
        <input id="detailmodal_srRqstNo" hidden>
        <i class="material-icons close-icon" data-dismiss="modal">close</i>
      </div>
      <div class="modal-body">
      		<!-- SR요청정보 -->
      		<div class="d-flex mb-2">
      			<span class="modal-sub-title mr-auto">SR요청정보</span>
      			<select id="approveResult" name="requestResult" class="mr-2" disabled>
			        <option value="APRV_REEXAM">승인재검토</option>
			        <option value="APRV_RETURN">승인반려</option>
			        <option value="APRV">승인</option>
			    </select>
      			<button id="approveResultBtn" type="button" class="btn-3" onclick="saveApproveResult()" disabled>처리</button>
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
	            <label for="detailmodal_srRqstAtchData" class="w-label col-form-label pl-0">첨부파일</label>
				<input id="detailmodal_srRqstAtchData" type="file" class="w-content form-control-file form-control-sm px-0" disabled>
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
			        <option value="RCPT_REEXAM">접수재검토</option>
			        <option value="RCPT_RETURN">접수반려</option>
			        <option value="RCPT">접수승인</option>
			    </select>
      			<button id="receptionResultBtn" type="button" class="btn-3" onclick="saveReceptionResult()" disabled>처리</button>
      		</div>
      		<div class="card p-2">
	      		<div class="row mx-0 mt-0 mb-2">
		          <div class="col-sm row">
		            <label for="detailmodal_srPicUsrNm" class="col-form-label col-5 pl-0">개발담당자</label>
		            <input id="detailmodal_srPicUsrNm" type="text" class="form-control form-control-sm col-7" disabled>
		          </div>
		          <div class="col-sm row">
		            <label for="detailmodal_deptNm" class="col-form-label col-5">개발부서</label>
		            <input id="detailmodal_deptNm" type="text" class="form-control form-control-sm col-7" disabled>
		          </div>
				</div>
				<div class="row mx-0 mt-0 mb-2">
		          <div class="col-sm row">
		            <label for="detailmodal_srTrnsfYn" class="col-form-label col-5 pl-0">이관여부</label>
		            <input id="detailmodal_srTrnsfYn" type="text" class="form-control form-control-sm col-7" disabled>
		          </div>
		          <div class="col-sm row">
		            <label for="detailmodal_srTrnsfInstNm" class="col-form-label col-5">이관기관</label>
		            <input id="detailmodal_srTrnsfInstNm" type="text" class="form-control form-control-sm col-7" disabled>
		          </div>
				</div>
				<div class="row mx-0 mt-0 mb-2">
		          <div class="col-sm row">
		            <label for="detailmodal_srReqBgt" class="col-form-label col-5 pl-0">소요예산</label>
		            <input id="detailmodal_srReqBgt" type="text" class="form-control form-control-sm col-7" disabled>
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
		            <label for="detailmodal_srAtchData" class="w-label col-form-label pl-0">첨부파일</label>
					<input id="detailmodal_srAtchData" type="file" id="srFile" class="w-content form-control-file form-control-sm px-0" disabled>
		          </div>
			</div>
      </div>
      <div class="modal-footer py-1">
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>


<%@ include file="/WEB-INF/views/common/footer.jsp"%>