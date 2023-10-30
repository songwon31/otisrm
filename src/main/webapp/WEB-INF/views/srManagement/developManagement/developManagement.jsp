<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/developManagement/developManagement.css" />

<div id="developManagementDiv" class="shadow">
	<div id="developManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 1rem;">SR개발관리</span>
		</div>
	</div>
	<div id="developManagementSearchDiv" class="shadow" style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
		<form id="searchForm" method="get" action="">
			<div class="d-flex" style="height:3rem;">
				<!-- 조회기간 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">조회기간</span>
				</div>
				<div style="width: 22.57%; display:flex; align-items:center;">
						<input style="width: 45%;" name="startDate" type="date">
						<div style="width: 10%; margin: 0 1rem; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
						<input style="width: 45%;" name="endDate" type="date">
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 관련 시스템 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">관련 시스템</span>
				</div>
				<div style="width: 9.59%;">
					<select style="width:100%;" id="selectSystem" name="selectSystem">
						<option value="" selected>전체</option>
					</select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 진행 상태 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">진행상태</span>
				</div>
				<div style="width: 24.73%;">
					<select style="width:30%;" id="selectProg" name="selectProg">
						<option value="" selected>전체</option>
				        <option>요청</option>
				        <option>검토중</option>
				        <option>접수</option>
				        <option>개발중</option>
				        <option>개발완료신청</option>
				        <option>개발완료</option>
				    </select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 담당 SR -->
				<div style="width: 5.79%;" class="d-flex flex-row-reverse align-items-center">
					<span style="font-size:1.6rem; margin-left: 0.5rem;">담당 SR</span>
		        	<input type="checkbox" id="myDevCheck" name="myDevCheck" value="False">
		        </div>
			</div>
			
			<!-- LINE2 -->
			<div class="d-flex" style="margin-top:1.2rem; height:3rem;">
				<!-- 등록자 소속 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">등록자 소속</span>
				</div>
				<div style="width: 22.57%; display:flex; align-items:center;">
						<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
						<button id="searchBtn" style="margin-left: 1rem;" class="d-inline-flex align-items-center justify-content-center" 
							onclick="location.href='#';">
							찾기
						</button>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 개발 부서 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">개발 부서</span>
				</div>
				<div style="width: 9.59%;">
					<select id="selectDevDepartment" name="selectDevDepartment" style="width:100%">
						<option value="" selected>전체</option>
						<option>개발1팀</option>
				        <option>개발2팀</option>
				        <option>개발3팀</option>
					</select>

				</div>
				<div style="width: 3.5%;"></div>
				<!-- 키워드 검색 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">키워드</span>
				</div>
				<div style="width: 24.73%; display: flex;">
					<select style="width:30%;" id="userStts" name="userStts">
						<option value="" selected>전체</option>
						<c:forEach var="usrStts" items="${usrManagementPageConfigure.usrSttsList}" varStatus="status">
							<option value="${usrStts.usrSttsNo}">${usrStts.usrSttsNm}</option>
						</c:forEach>
					</select>
					<div style="width:1rem;" ></div>
					<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 검색버튼 -->
				<button id="searchBtn" style="width: 5.79%;" class="d-inline-flex flex-row-reverse align-items-center justify-content-center"  
					onclick="location.href='#';">
					검색
				</button>
			</div>
		</form>
	</div>
	<div id="developManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR개발목록</span>
			<button id="excelDownloadBtn" onclick="location.href='#';">엑셀 다운로드</button>
		</div>
		<div class="" style="height:52rem; margin:0.75rem 0rem;">
			<table id="mainTable" style="width: 100%;">
				<colgroup>
					<col width="4%" />
					<col width="10%"/>
					<col width="16%"/>
					<col width="8%" />
					<col width="6%" />
					<col width="6%" />
					<col width="6%" />
					<col width="8%" />
					<col width="8%" />
					<col width="4%" />
					<col width="6%" />
					<col width="6%" />
					<col width="6%" />
					<col width="6%" />
				</colgroup>
				<thead style="background-color: #e9ecef;">
					<tr style="height: 5rem; font-size: 1.6rem; font-weight: 700;">
						<th scope="col"></th>
						<th scope="col">요청번호</th>
						<th scope="col">제목</th>
						<th scope="col">관련시스템</th>
						<th scope="col">등록자</th>
						<th scope="col">소속</th>
						<th scope="col">상태</th>
						<th scope="col">요청일</th>
						<th scope="col">완료예정일</th>
						<th scope="col">중요</th>
						<th scope="col">접수요청</th>
						<th scope="col">유지보수<br>이관여부
						</th>
						<th scope="col">개발완료<br>요청여부
						</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
					<tr style="height: 4.7rem; font-size: 1.6rem;">
						<td>1</td>
						<td>SR231013_0001</td>
						<td class="text-align-left">SRM 시스템 개발 요청</td>
						<td>SoftNet</td>
						<td>홍길동</td>
						<td>한소원</td>
						<td>접수</td>
						<td>2023-10-13</td>
						<td>2023-10-31</td>
						<td>Y</td>
						<td>Y</td>
						<td>Y</td>
						<td>N</td>
						<td><button class="detailViewBtn" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
		
		<!-- 상세보기 모달 -->
	    <div id="detailmodal" class="modal" data-backdrop="static">
		  <div class="modal-dialog modal-dialog-centered">
		    <div class="modal-content">
		      <div class="modal-header">
		        <span class="modal-title">SR 상세</span>
		        <i class="material-icons close-icon" data-dismiss="modal">close</i>
		      </div>
		      <div class="modal-body">
		      		<!-- SR요청정보 -->
		      		<div class="d-flex mb-2">
		      			<span class="modal-sub-title mr-auto">SR요청정보</span>
		      			<select id="requestResult" name="requestResult" class="mr-2">
					        <option>승인</option>
					        <option>반려</option>
					        <option>재검토</option>
					    </select>
		      			<button type="button" class="btn-1">처리</button>
		      		</div>
		      		<div class="card p-2 mb-2">
				      	<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="writer" class="col-form-label col-5 pl-0">등록자</label>
				            <input type="text" class="form-control form-control-sm col-7" id="writer">
				          </div>
				          <div class="col-sm row">
				            <label for="writerDepartment" class="col-form-label col-5">소속</label>
				            <input type="text" class="form-control form-control-sm col-7" id="writerDepartment">
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="writeDate" class="col-form-label col-5 pl-0">등록일</label>
				            <input type="date" class="form-control form-control-sm col-7" id="writeDate">
				          </div>
				          <div class="col-sm row">
				            <label for="systemName" class="col-form-label col-5">관련시스템</label>
				            <input type="text" class="form-control form-control-sm col-7" id="systemName">
				          </div>
						</div>
			          <div class="d-flex mb-2 w-100">
			            <label for="srTitle" class="w-label col-form-label pl-0">SR제목</label>
			            <input type="text" class="w-content form-control form-control-sm" id="srTitle">
			          </div>
			          <div class="d-flex mb-2 w-100">
			            <label for="srContent" class="w-label col-form-label pl-0">SR내용</label>
			            <textarea class="w-content form-control form-control-sm"  id="srContent" rows="3" cols="50"></textarea>
			          </div>
			          <div class="d-flex mb-2 w-100">
			            <label for="srFile" class="w-label col-form-label pl-0">첨부파일</label>
						<input type="file" id="srFile" class="w-content form-control-file form-control-sm px-0">
			          </div>
					</div>
					<div class="card p-2 mb-4">
				      <div class="d-flex mb-2 w-100">
			            <label for="srFile" class="w-label col-form-label pl-0">검토의견</label>
						<textarea class="w-content form-control form-control-sm"  id="srContent" rows="3" cols="50"></textarea>
			          </div>
					</div>
					
					<!-- SR개발정보 -->
		      		<div class="d-flex mb-2">
		      			<span class="modal-sub-title mr-auto">SR개발정보</span>
	      				<select id="receptionResult" name="receptionResult" class="mr-2">
					        <option>승인</option>
					        <option>반려</option>
					        <option>재검토</option>
					    </select>
		      			<button type="button" class="btn-1">처리</button>
		      		</div>
		      		<div class="card p-2">
			      		<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="devPic" class="col-form-label col-5 pl-0">개발담당자</label>
				            <input type="text" class="form-control form-control-sm col-7" id="devPic">
				          </div>
				          <div class="col-sm row">
				            <label for="devDepartment" class="col-form-label col-5">개발부서</label>
				            <input type="text" class="form-control form-control-sm col-7" id="devDepartment">
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="progStts" class="col-form-label col-5 pl-0">진행상태</label>
				            <input type="text" class="form-control form-control-sm col-7" id="progStts">
				          </div>
				          <div class="col-sm row">
				            <label for="devEndDate" class="col-form-label col-5">완료예정일</label>
				            <input type="date" class="form-control form-control-sm col-7" id="devEndDate">
				          </div>
						</div>
						<div class="row mx-0 mt-0 mb-2">
				          <div class="col-sm row">
				            <label for="devCount" class="col-form-label col-5 pl-0">투입인력</label>
				            <input type="text" class="form-control form-control-sm col-7" id="devCount">
				          </div>
				          <div class="col-sm row">
				            <label for="devBudget" class="col-form-label col-5">소요예산</label>
				            <input type="text" class="form-control form-control-sm col-7" id="devBudget">
				          </div>
						</div>
			      		<div class="d-flex mb-2 w-100">
				            <label for="srContent" class="w-label col-form-label pl-0">개발내용</label>
				            <textarea class="w-content form-control form-control-sm"  id="srContent" rows="3" cols="50"></textarea>
				          </div>
				          <div class="d-flex mb-2 w-100">
				            <label for="srFile" class="w-label col-form-label pl-0">첨부파일</label>
							<input type="file" id="srFile" class="w-content form-control-file form-control-sm px-0">
				          </div>
					</div>
		      </div>
		      <div class="modal-footer py-1">
		        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
		      </div>
		    </div>
		  </div>
		</div>
		
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>