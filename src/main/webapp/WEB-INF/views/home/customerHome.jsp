<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<script src="${pageContext.request.contextPath}/resources/javascript/home/customerHome.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/customerHome.css" />
<div id="customerHomeDiv" class="contentDiv shadow">
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
   	  			<div class="filterTab pt-2">요청</div>
   	  			<div class="filterTab pt-2">접수</div>
   	  			<div class="filterTab pt-2">개발중</div>
   	  			<div class="filterTab pt-2">개발완료</div>
   	  			<div class="filterTab pt-2">반려</div>
   	  			<div id="requestAddBtnWrap" class="d-flex flex-row-reverse align-items-end">
					<button id="requestAddBtn" data-toggle="modal" data-target="#addRequestmodal" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" onclick="showSysByDeptNo('${usr.deptNo}')">
						요청 등록
					</button>
				</div>
   	  		</div>
   	  	</div>
   	  <table id="mainTable" style="width: 100%; text-align: center;">
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
		    <tbody>
		        <c:forEach var="srRqst" items="${srRqsts}" varStatus="status">    
		            <tr>
		                <td>${status.count}</td>
		                <td>${srRqst.srRqstNo}</td>
		                <td class="truncate-text" style="max-width: 221.32px;">${srRqst.srTtl}</td>
		                <td class="truncate-text" style="max-width: 144.64px;">${srRqst.sysNm}</td>
		                <td class="truncate-text" style="max-width: 67.56px;">${srRqst.usrNm}</td>
		                <td class="truncate-text" style="max-width: 69.64px;">${srRqst.instNm}</td>
		                <td class="truncate-text" style="max-width: 67.56px;">${srRqst.srRqstSttsNm}</td>
		                <c:set var="srRqstRegDt" value="${srRqst.srRqstRegDt}" />
		                <fmt:formatDate value="${srRqstRegDt}" pattern="yyyy-MM-dd" var="formattedDate" />
		                <td class="truncate-text" style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90.08px;">${formattedDate}</td> 
		                <td>${srRqst.srRqstEmrgYn}</td>
		                <td><button class="btn-2">상세보기</button></td>
		            </tr>
		        </c:forEach>
		    </tbody>
		</table>
		<!-- 페이징 -->
		<div class="d-flex justify-content-center">
			<a class="btn" href="?srRqstPageNo=1">처음</a>
			<c:if test="${srRqstpager.groupNo>1}">
				<a class="btn" href="?srRqstPageNo=${srRqstpager.startPageNo-1}">이전</a>
			</c:if>
			
			<c:forEach var="i" begin="${srRqstpager.startPageNo}" end="${srRqstpager.endPageNo}">
				<c:if test="${srRqstpager.pageNo != i}">
					<a class="btn" href="?srRqstPageNo=${i}">${i}</a>
				</c:if>
				<c:if test="${srRqstpager.pageNo == i}">
					<a class="btn" href="?srRqstPageNo=${i}">${i}</a>
				</c:if>
			</c:forEach>
			
			<c:if test="${srRqstpager.groupNo<srRqstpager.totalGroupNo}">
				<a class="btn" href="?srRqstPageNo=${srRqstpager.endPageNo+1}">다음</a>
			</c:if>
			<a class="btn" href="?=${srRqstpager.totalPageNo}">맨끝</a>
	    </div>	
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
   	  <div class="d-flex">
	   	  <div class="tableContainer w-50">
	   	  </div>
	   	  <div class="tableContainer w-50">
	   	  </div>
   	  </div>
   </div>
</div>
 <!-- 요청등록 모달 -->
    <div id="addRequestmodal" class="modal" data-backdrop="static">
	  <div class="modal-dialog modal-dialog-centered modal-lg">
	    <div class="modal-content">
	      <div class="modal-header">
	        <h6 class="modal-title">SR 요청</h6>
	        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
	      </div>
	      <div class="modal-body">
	      	<form id="writeSrRqst" action="writeSrRqst" method="post">
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
						            <input type="text" class="form-control" id="writer" value="${usr.usrNm}" disabled>
					 			</div>
					            <input type="hidden" name="srReqstrNo" value="${usr.usrNo}">
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
						            <input type="date" class="form-control" name="" value="" id="writeDate" disabled>
					 			</div>
					        </div>
					        <div class="d-flex w-50">
					        	<input type="hidden" name="srRqstNo">
						        <div class="w-30">
						          <label for="systemName" class="form-label">관련시스템</label>
						        </div>
						        <div class="w-45">
						          <select class="form-control" id="systemName" name="sysNo">
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
				          <textarea class="form-control" id="srContent" name="srConts"></textarea>
				        </div>
				    </div>
			        <div class="d-flex w-100 pt-2">
				        <div style="width: 113.9px;">
				          <label for="systemName" class="form-label modal-input">첨부파일</label>
				        </div>
				        <div style="width: 500px;">
				          <input type="file" class="" id="systemName" multiple>
				        </div>
				        <div>
				        	<input id="importantChk" type="checkbox" onclick="isImportendChecked()"><span> 중요</span>
				        </div>
				        <input id="submitYn" type="hidden" name="SrRqstEmrgYn" value="N">
				    </div>
				</div>
	      	</div>
	      </div>
	      <div class="modal-footer py-1">
	        <button class="btn-1" type="submit">저장</button>
	        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
	      </div>
	    </form>
	    </div>
	  </div>
	</div>	

<%@ include file="/WEB-INF/views/common/footer.jsp"%>