<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<script src="${pageContext.request.contextPath}/resources/javascript/home/customerHome.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/customerHome.css" />
<div id="customerHomeDiv" class="contentDiv shadow">
   <input type="hidden" id="loginUsrNo" value="${usr.usrNo}">
   <div class="titleDiv">
      <div class="font-weight-bold d-flex tt-ct">
         <i class="material-icons tt-ic">person</i>
            <span>My Portal</span>
      </div>
   </div>
   <div class="potalTop">
   	  <div class="subcontentTitle">
	   	  <div class="d-flex st-ct">
	   	  	<i class="material-icons stt-ic">chevron_right</i>
	   	  	<span class="pt-1">나의 할일</span>
	   	  </div>
   	  </div>
   	  <div class="tableContainer w-70">
   	  	<div class="filterTabWrap">
   	  		<div class="d-flex">
   	  			<div class="filterTab pt-2" style="background-color: #f9fafe; color: black;">전체</div>
   	  			<div id="RQST" class="filterTab pt-2">요청<span id="rqst-count"></span></div>
   	  			<div id="APRV_WAIT" class="filterTab pt-2">승인대기<span id="rqst-count"></span></div>
   	  			<div id="APRV" class="filterTab pt-2">승인<span id="rqst-count"></span></div>
   	  			<div id="RCPT_WAIT"  class="filterTab pt-2">접수대기<span id="rqst-count"></span></div>
   	  			<div id="RCPT"  class="filterTab pt-2">접수<span id="rqst-count"></span></div>
   	  			<div id="DEP_ING"  class="filterTab pt-2">개발중<span id="rqst-count"></span></div>
   	  			<div id="TEST"  class="filterTab pt-2">테스트<span id="rqst-count"></span></div>
   	  			<div id="CMPTN_RQST"  class="filterTab pt-2">완료요청<span id="rqst-count"></span></div>
   	  			<div id="DEP_CMPTN"  class="filterTab pt-2">개발완료<span id="rqst-count"></span></div>
   	  			<div id="requestAddBtnWrap" class="d-flex flex-row-reverse align-items-end">
					<button id="requestAddBtn" data-toggle="modal" data-target="#addSrRqst" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" onclick="showSysByDeptNo('${usr.deptNo}')">
						요청 등록
					</button>
				</div>
   	  		</div>
   	  	</div>
   	  <table id="mainTable" style="width: 100%; text-align: center; height: 28rem;">
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
    <div class="potalBottom">
   	  <div class="subcontentTitle">
	   	  <div class="d-flex st-ct">
	   	  	<i class="material-icons stt-ic">chevron_right</i>
	   	  	<span class="pt-1">게시판</span>
	   	  </div>
   	  </div>
   	  <div class="d-flex st-ct">
	   	  <div class="subcontentTitle  w-50 pt-1" style="padding-left: 19px;color: #5d6e7e;">
	   	  	공지사항
	   	  </div>
	   	  <div class="subcontentTitle  w-50 pt-1"  style="padding-left: 19px;color: #5d6e7e;">
	   	  	문의게시판
	   	  </div>
   	  </div>
   	  <div class="d-flex">
	   	  <div class="tableContainer w-50 p-1">
		   	  	 <table id="mainTable" style="width: 100%; text-align: center; height: 28rem;">
				    <colgroup>
				        <col width="44.86px" />
				        <col width="118.99px" />
				        <col width="90px" />
				    </colgroup>
				    <thead>
				        <tr>
				            <th scope="col"></th>
				            <th scope="col">제목</th>
				            <th scope="col">작성일</th>
				        </tr>
				    </thead>
				    <tbody id="getSrReqstListByPageNo">      
			            <tr>
			            	<td>1</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>2</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>3</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>4</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>5</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
				    </tbody>
			</table>
	   	  </div>
	   	  <div class="tableContainer w-50 p-1">
		   	   <table id="mainTable" style="width: 100%; text-align: center; height: 28rem;">
				    <colgroup>
				        <col width="44.86px" />
				        <col width="118.99px" />
				        <col width="90px" />
				    </colgroup>
				    <thead>
				        <tr>
				            <th scope="col"></th>
				            <th scope="col">제목</th>
				            <th scope="col">작성일</th>
				        </tr>
				    </thead>
				    <tbody id="getSrReqstListByPageNo">      
			            <tr>
			            	<td>1</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>2</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>3</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>4</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
			            <tr>
			            	<td>5</td>
			            	<td>권한신청 프로세스 개선</td>
			            	<td>2023-10-30</td>
			            </tr> 
				    </tbody>
			</table>
	   	  </div>
   	  </div>
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
			        	 <input id="file" type="file" name="file" class="form-control" >
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
<div id="srRqstBySrNo" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">SR 요청 상세</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div class="modal-body">
      	<form id="modifySrRqst" action="modifySrRqst" method="post">
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
					            <input id="srRqst-UsrNm" type="text" class="form-control" id="writer" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="writerDepartment" class="form-label">소속</label>
					        </div>
					        <div class="w-45">
					          <input id="srRqst-inst" type="text" class="form-control" id="writerDepartment" disabled>
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
					            <input type="date" class="form-control" value="" id="srRqst-srRqstRegDt" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">

					        <div class="w-30">
					          <label for="systemName" class="form-label">관련시스템</label>
					        </div>
					        <div class="w-45">
					          <input id="srRqst-sysNm" type="text" class="form-control" id="writerDepartment" disabled>
					        </div>
					    </div>
					</div>
		        </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="srRqst-srTtl" class="form-label">SR제목</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input id="srRqst-srTtl" type="text" class="form-control">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="srRqst-srPrps" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input id="srRqst-srPrps" type="text" class="form-control">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea id="srRqst-srConts" class="form-control" id="srContent"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label modal-input">첨부파일</label>
			        </div>
			        <div style="width: 500px;">
			          <input type="file" class="" id="systemName" multiple disabled>
			        </div>
			        <div>
			        	<input id="srRqst-importantChk" type="checkbox" onclick="isImportendChecked2()"><span> 중요</span>
			        </div>
			    </div>
			</div>
      	</div>
      </div>
      <div class="modal-footer py-1">
      	<input id="srRqst-srRqstNo" type="hidden" name="srReqstrNo">
      	<input id="submitSrRqst-srTtl" type="hidden" class="form-control" name="srTtl">
		<input id="submitSrRqst-srPrps" type="hidden" class="form-control" name="srPrps">
		<input id="submitSrRqst-srConts" type="hidden" class="form-control" name="srConts">
		<input id="submit_Yn" type="hidden" name="srRqstEmrgYn">
        <button id="saveButton" class="btn-1" type="button" onclick="modifySrRqst(${srRqstNo})">저장</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
    </form>
   </div>
 
<%@ include file="/WEB-INF/views/common/footer.jsp"%>