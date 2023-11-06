<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="/WEB-INF/views/common/header.jsp" %>
<script src="${pageContext.request.contextPath}/resources/javascript/boardManagement/ntc.js"></script> 
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/boardManagement/ntc.css" />

<div class="contentDiv shadow">
	<div id="developManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex tt-ct">
			<i class="material-icons tt-ic">campaign</i>
			<span style="margin-left: 1rem;">공지사항</span>
		</div>
	</div>
	<div class="contentTop shadow" >
		<input type="hidden" id="loginUsr" value="${usr.usrNo}">
		<form id="searchForm" method="post" action="javascript:loadNtcs(${ntcPager.pageNo})">
			<div class="d-flex" style="height:2rem;">
				<!-- 검색 조건 -->
				<div style="width: 15%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">검색조건</span>
				</div>
				<div style="width: 20%;">
					<select style="width:220px;" id="searchTarget" name="searchTarget">
						<option value="" >선택</option>
						<option value="searchNtcTtl" >제목</option>
						<option value="searchUsrNo" >등록자</option>
				    </select>
				</div>
				<div style="width: 7%;"></div>
				
				<!-- 키워드 검색 -->
				<div style="width: 15%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">키워드 입력</span>
				</div>
				<div style="width: 3.5%;"></div>
				<div style="width: 70%; display:flex; align-items:center;">
						<input type="text" id="keyword" name="keyword" class="flex-grow-1"/>
						<input type="hidden" id="ntcPageNo" name="ntcPageNo" class="flex-grow-1"/>
						<button type="submit" style="margin-left: 2rem;" class="btn-4 d-inline-flex align-items-center justify-content-center" >
							검색
						</button>
				</div>
			</div>
		</form>
	</div>
	<div id="requestManagementBoardDiv" class="shadow" 
		style="height:70rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">공지사항</span>
			<c:if test="${showButton}">
			    <button data-toggle="modal" data-target="#addNtc" class="btn-6 mr-2" style="background-color:#2c7be4;" onclick="location.href='#';">공지 추가하기</button>
			</c:if>
			<button id="downloadExcelButton" class="btn-5" onclick="downloadExcel()">엑셀 다운로드</button>
		</div>
		<div class="tableContainer">
			<table id="mainTable" style="width: 100%; text-align: center; height: 57.9rem;">
				<colgroup>
					<col width="10%" /> 
				    <col width="30%" /> 
				    <col width="15%" /> 
				    <col width="15%" /> 
				    <col width="10%" /> 
				    <col width="10%" />
				</colgroup>
				<thead style="background-color: #e9ecef;">
					<tr>
						<th scope="col"></th>
						<th scope="col">제목</th>
						<th scope="col">등록자</th>
						<th scope="col">등록일</th>
						<th scope="col">조회수</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody id="getNtcListByPageNo">
				 <!-- Json 데이터 들어오는 곳 --> 
					
				</tbody>
			</table>
			<!-- 페이징 -->
			<div id="pagination-container" class="paging d-flex justify-content-center">
			페이징
			</div>	
		</div>
	</div>
</div>

<!-- 공지 등록 모달 -->
<div id="addNtc" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">공지사항</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div id="writeNtcForm" class="modal-body">
      	<form id="writeNtc" action="writeNtc" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<h6 class="modal-sub-title">공지사항 등록</h6>
      		<div class="card p-3 mb-4">
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writer" class="form-label">등록자</label>
				          	</div>
				 			<div class="w-60">
					            <input type="text" class="form-control" id="writer" value="${usr.usrNm}" disabled>
				 			</div>
				            <input type="hidden" id="usrNo" name="usrNo" value="${usr.usrNo}">
				        </div>
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writeDate" class="form-label">등록일</label>
				          	</div>
				 			<div class="w-60">
					            <input type="date" class="form-control" id="writeDate" disabled>
				 			</div>
				        </div>
					</div>
				<div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="ntcTtl" class="form-label">제목</label>
			        </div>
			        <div style="width: 605px;">
			          <input type="text" class="form-control" id="ntcTtl" name="ntcTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="ntcConts" class="form-label">내용</label>
			        </div>
			        <div style="width: 605px;">
			          <textarea class="form-control" id="ntcConts" name="ntcConts" style="height: 50rem;"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="file" class="form-label modal-input">첨부파일</label>
			        </div>
			        <div style="width: 560px;">
			        	 <input id="file" type="file" name="file" multiple>
			        </div>
			        <div>
			        	<input id="importantChk" type="checkbox" onclick="isImportendChecked()"><span> 중요</span>
			        </div>
			        <input id="ntcEmrgYn" type="hidden" name="ntcEmrgYn" value="N">
			    </div>
			</div>
      	</div>
      </div>
      <div class="modal-footer py-1">
        <button type="submit" class="btn-1">저장</button>
        <button type="button" class="close btn-3" data-dismiss="modal">닫기</button>
      </div>
    </form>
   </div>
  </div>
 </div>
</div>

<!-- 공지목록에 해당하는 상세모달 -->
<div id="getNtcByNtcNo" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">공지사항</h6>
        <i onclick="loadNtcs(${ntcPager.pageNo})" class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div id="writeNtcForm" class="modal-body">
      	<form id="modifyNtc" action="modifyNtc" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<h6 class="modal-sub-title">상세내용</h6>
      		<div class="card p-3 mb-4">
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writer" class="form-label">등록자</label>
				          	</div>
				 			<div class="w-60">
					            <input type="text" class="form-control" id="ntc-usrNm" value="" disabled>
					            <input type="hidden" class="form-control" id="ntc-usrNo" value="">
				 			</div>
				            <input type="hidden" id="loginUsr" name="usrNo" value="${usr.usrNo}">
				        </div>
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writeDate" class="form-label">등록일</label>
				          	</div>
				 			<div class="w-60">
					            <input type="text" class="form-control" id="ntc-ntcWrtDt" disabled>
				 			</div>
				        </div>
					</div>
				<div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="ntcTtl" class="form-label">제목</label>
			        </div>
			        <div style="width: 605px;">
			          <input type="text" class="form-control" id="ntc-ntcTtl" name="ntcTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="ntcConts" class="form-label">내용</label>
			        </div>
			        <div style="width: 605px;">
			          <textarea class="form-control" id="ntc-ntcConts" name="ntcConts" style="height: 50rem;"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="file" class="form-label modal-input">첨부파일</label>
			        </div>
			        <div style="width: 560px;">
			        	 <input id="file" type="file" name="file" multiple>
			        </div>
			        <div>
			        	<input id="ntc-importantChk" class="pb-1" type="checkbox" onclick="isImportendChecked2()"><span class="mb-1"> 중요</span>
			        </div>
			        <input id="ntcEmrgYn" type="hidden" name="ntcEmrgYn" value="N">
			    </div>
			    <div class="d-flex w-100 pt-2">
			    	<div style="width: 113.9px;"></div>
			    	<div id="showNtcAtch">
			    	</div>
			    </div>
			</div>
      	</div>
      </div>
	  <div class="mr-3 pb-4 d-flex justify-content-end">
       	<span style="font-size: 1.3rem;">조회수:</span> <span id="ntcInqCnt" class="ml-2" style="font-size: 1.3rem; font-weight: bold;">0</span>
   	  </div>
      <div class="modal-footer py-1">
        <button type="submit" class="btn-1">저장</button>
        <button type="button" class="btn-3" data-dismiss="modal" onclick="loadNtcs(${ntcPager.pageNo})" >닫기</button>
      </div>
    </form>
   </div>
   
<%@ include file="/WEB-INF/views/common/footer.jsp" %>