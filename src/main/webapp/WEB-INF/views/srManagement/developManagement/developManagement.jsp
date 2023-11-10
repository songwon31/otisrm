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
			        <option value="APRV">승인</option>
					<option value="RCPT_WAIT">접수대기</option>
					<option value="RCPT_REEXAM">접수재검토</option>
					<option value="RCPT_RETURN">접수반려</option>
					<option value="RCPT">접수</option>
					<option value="DEP_ING">개발중</option>
					<option value="TEST">테스트</option>
					<option value="CMPTN_RQST">완료요청</option>
					<option value="DEP_CMPTN">개발완료</option>
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
			<button id="excelDownloadBtn" onclick="location.href='#';">엑셀 다운로드</button>
		</div>
		<div style="height:51.7rem; margin:0.75rem 0rem; background-color: #f9fafe;">
			<table id="developManagementMainTable" style="width: 100%;">
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
		
		<!-- 상세보기 모달 -->
		
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