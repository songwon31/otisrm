<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="/WEB-INF/views/common/header.jsp" %>
<script src="${pageContext.request.contextPath}/resources/javascript/srManagement/requestManagement.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/requestManagement/requestManagement.css" />

<div class="contentDiv shadow">
	<div id="developManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex tt-ct">
			<i class="material-icons tt-ic">developer_board</i>
			<span style="margin-left: 1rem;">SR요청관리</span>
		</div>
	</div>
	<div class="contentTop shadow" >
		<input type="hidden" id="loginUsr" value="${usr.usrNo}">
		<form id="searchForm" method="get" action="">
			<div class="d-flex" style="height:3rem;">
				<!-- 조회기간 -->
				<div class="" style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span class="filter-item">조회기간</span>
				</div>
				<div style="width: 22.57%; display:flex; align-items:center;">
						<input style="width: 45%;" name="startDate" type="date">
						<div style="width: 10%; margin: 0 1rem; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
						<input style="width: 45%;" name="endDate" type="date">
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 관련 시스템 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span class="filter-item">관련 시스템</span>
				</div>
				<div style="width: 9.59%;">
					<select id="sysNo-select" name="sysNo" style="width:100%">
						<option value="none" selected>전체</option>
						<!-- json으로 데이터 들어오는 곳 -->
					</select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 진행 상태 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">진행상태</span>
				</div>
				<div style="width: 20.73%;">
					<select style="width:109.13px;" id="srRqstStts-select" name="status">
						<option value="" selected>전체</option>
				    </select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 내 SR 요청건만 -->
				<div style="width: 9.79%;" class="d-flex flex-row-reverse align-items-center">
					<span style="font-size:1.6rem; margin-left: 0.5rem;">내 요청 건만</span>
		        	<input type="checkbox" id="myCheck" name="myDevCheck" value="False">
		        	<input type="hidden" id="usr" name="usr" value="">
		        </div>
			</div>
			
			<!-- LINE2 -->
			<div class="d-flex" style="margin-top:1.2rem; height:3rem;">
				<!-- 등록자 소속 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">등록자 소속</span>
				</div>
				<div style="width: 22.57%; display:flex; align-items:center;">
						<input type="text" id="instNm" name="keywordContent" class="flex-grow-1" disabled/>
						<input type="hidden" id="instNo" name="instNo" class="flex-grow-1" value=""/>
						<button type="button" style="margin-left: 1rem;" data-toggle="modal" data-target="#filterOfInst" class="btn-4 d-inline-flex align-items-center justify-content-center" >
							찾기
						</button>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 개발 부서 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">개발 부서</span>
				</div>
				<div style="width: 9.59%;">
					<select id="deptNo-select" name="deptNo" style="width:100%">
						<option value="none" selected>전체</option>
						<!-- json으로 데이터 들어오는 곳 -->
					</select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 키워드 검색 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">키워드</span>
				</div>
				<div style="width: 24.73%; display: flex;">
					<select style="width:30%;" id="userStts" name="searchTarget">
						<option value="" selected>전체</option>
						<option value="searchSrRqstNo" >요청 번호</option>
						<option value="searchSrRqstNm" >제목</option>
					</select>
					<div style="width:1rem;" ></div>
					<input type="text" id="keyword" name="keyword" class="flex-grow-1"/>
					<input type="hidden" id="srRqstMngPageNo" name="srRqstMngPageNo" class="flex-grow-1"/>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 검색버튼 -->
				<button style="width: 5.79%;" class="btn-4 d-inline-flex flex-row-reverse align-items-center justify-content-center"  
					onclick="location.href='#';">
					검색
				</button>
			</div>
		</form>
	</div>
	<div id="requestManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR요청목록</span>
			<button class="btn-5" onclick="location.href='#';">엑셀 다운로드</button>
		</div>
		<div class="tableContainer">
			<table id="mainTable" style="width: 100%; text-align: center; height: 49.3rem;">
				<colgroup>
					<col width="45.04px" />
					<col width="118.99px"/>
					<col width="235.37"/>
					<col width="144px"/>
					<col width="88.26px" />
					<col width="88.26px" />
					<col width="88.26px" />
					<col width="117.69px" />
					<col width="117.69px" />
					<col width="58.85px" />
					<col width="58.85px" />
					<col width="88.26px" />
				</colgroup>
				<thead style="background-color: #e9ecef;">
					<tr>
						<th scope="col"></th>
						<th scope="col">요청번호</th>
						<th scope="col">제목</th>
						<th scope="col">관련시스템</th>
						<th scope="col">등록자</th>
						<th scope="col">소속</th>
						<th scope="col">개발부서</th>
						<th scope="col">상태</th>
						<th scope="col">요청일</th>
						<th scope="col">승인요청</th>
						<th scope="col">중요</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody id="getSrReqstListByPageNo">
				 <!-- Json 데이터 들어오는 곳 -->    	
				</tbody>
			</table>
			<!-- 페이징 -->
			<div id="pagination-container" class="paging d-flex justify-content-center">
			
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
<div id="srRqstBySrNo" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">SR 요청 상세</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div class="modal-body">
      	<form id="modifySrRqst" action="modifySrRqst" method="post" enctype="multipart/form-data">
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
			          <input type="file" id="file" name=file multiple>	
			        </div>
			        <div>
			        	<input id="srRqst-importantChk" type="checkbox" onclick="isImportendChecked2()"><span> 중요</span>
			        </div>
			    </div>
			    <div class="d-flex w-100 pt-2">
			    	<div style="width: 113.9px;"></div>
			    	<div id="showSrRqstAtch">
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
  </div>
 </div>
</div>

<!-- 등록자 소속 선택 모달 -->
<div id="filterOfInst" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-md" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">등록자 소속 찾기</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div style="display:none;"></div>
				<div>
					<div style="display: flex; flex-direction: column; justify-contents:center; margin:0 0 0 0.5rem;">
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
								<!-- json 데이터 받는 곳 -->	
								</tbody>
							</table>
						</div>
						<div id="setHrFindPicModalTablePagerDiv" class="m-2" style="height: 4.5rem;">
							<span style="font-weight: bold;">선택한 등록자 소속기관: </span>
							<span id="findInst"></span>
						</div>
						<div style="height:4rem; display: flex; flex-direction: row; align-items:center; justify-content:flex-end;">
							<a onclick="choiceOfInstOkBtn()" data-dismiss="modal"
								style="height: 3rem; width: 5rem; border-radius: 5px; background-color:#222e3c; color:white; font-weight:700; margin-right:0.5rem;
								display: flex; flex-direction: row; justify-content: center; align-items: center;">확인</a>
							<a href="#" data-dismiss="modal"
								style="height: 3rem; width: 5rem; border-radius: 5px; background-color:red; color:white; font-weight:700; margin-right:0.5rem;
								display: flex; flex-direction: row; justify-content: center; align-items: center; cursor: pointer;">닫기</a>
						</div>
					</div>
				</div>
			</div>


   
<%@ include file="/WEB-INF/views/common/footer.jsp" %>