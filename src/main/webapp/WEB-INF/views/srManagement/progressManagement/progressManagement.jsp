<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/progressManagement/progressManagementStyle.css" />
<!-- 아이콘 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<div id="userManagementDiv" class="shadow">
	<div id="userManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">settings</i>
			<span style="margin-left: 9.5px;">SR진척관리</span>
		</div>
	</div>
	
	<div id="userManagementSearchDiv" class="shadow" 
		style="height:13rem; margin:1rem 0rem; padding:3rem 2rem; background-color:white; border-radius:10px;">
		<form id="searchForm" method="get" action="usrManagement">
			<div class="p-0 container-fluid d-inline-flex flex-row" style="height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">권한</span>
						</div>
						<div style="width:70%;">
							<label style="display:none;" for="usrAuthrt"></label> 
							<select id="usrAuthrt" name="usrAuthrt" style="width:100%">
								<option value="" selected>전체</option>
								<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
									<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">상태</span>
						</div>
						<div style="width:70%;">
							<label style="display:none;" for="userStts"></label> 
							<select id="userStts" name="userStts" style="width:100%">
								<option value="" selected>전체</option>
								<c:forEach var="usrStts" items="${usrManagementPageConfigure.usrSttsList}" varStatus="status">
									<option value="${usrStts.usrSttsNo}">${usrStts.usrSttsNm}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:20%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">키워드</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div style="width:35%; font-size:1.6rem;">
								<label style="display:none;" for="keywordCategory"></label> 
								<select id="keywordCategoty" name="keywordCategoty" style="width:100%">
									<option value="userName" selected>이름</option>	
									<option value="userTelno">전화번호</option>
									<option value="userEmail">이메일</option>
								</select>
							</div>
							<div style="width:2%"></div>
							<div class="p-0 m-0" style="width:63%">
								<label style="display:none;" for="keywordContent"></label>
								<input type="text" id="keywordContent" name="keywordContent" style="width:100%;"/>
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<button id="initBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="location.href='#';">
						초기화
					</button>
				</div>
			</div>
			<div class="p-0 container-fluid d-inline-flex flex-row" style="margin-top:1.2rem; height:3rem;">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">소속</span>
						</div>
						<div style="width:70%;">
							<label style="display:none;" for="usrInst"></label> 
							<select id="usrInst" name="usrInst" style="width:100%">
								<option value="" selected>전체</option>
								<c:forEach var="inst" items="${usrManagementPageConfigure.instList}" varStatus="status">
									<option value="${inst.instNo}">${inst.instNm}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">부서</span>
						</div>
						<div style="width:70%;">
							<label style="display:none;" for="usrDept"></label> 
							<select id="usrDept" name="usrDept" style="width:100%">
								<option value="" selected>전체</option>
								<c:forEach var="dept" items="${usrManagementPageConfigure.deptList}" varStatus="status">
									<option value="${dept.deptNo}">${dept.deptNm}</option>
								</c:forEach>
							</select>
						</div>
					</div>
				</div>
				<div style="width:7%;"></div>
				<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
						<div style="width:20%; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">가입일</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div class="d-inline-flex" style="width:100%; flex-direction:row; align-items:center">
								<input name="joinDateStart" style="width:45%;" type="date">
								<div style="width:10%; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
								<input name="joinDateEnd" style="width:45%;" type="date">
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<button id="searchBtn" class="d-inline-flex flex-row align-items-center justify-content-center" onclick="location.href='#';">
						검색
					</button>
				</div>	
			</div>
		</form>
	</div>
	<div id="userManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:10px; padding:2rem;">
		<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">사용자목록</div>
		<div class="" style="height:52rem; margin:0.75rem 0rem;">
			<table id="mainTable" style="width:100%;">
				<colgroup>
					<col width="3%"/>
					<col width="10%"/>
					<col width="20%"/>
					<col width="20%"/>
					<col width="20%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="12%"/>
				</colgroup>
				<thead style="background-color:#e9ecef;">
					<tr style="height:5rem; font-size:1.7rem; font-weight:700;">
						<th scope="col">ㅁ</th>
						<th scope="col">이름</th>
						<th scope="col">전화번호</th>
						<th scope="col">이메일</th>
						<th scope="col">소속</th>
						<th scope="col">상태</th>
						<th scope="col">가입일</th>
						<th scope="col">상세</th>
					</tr>
				</thead>
				<tbody>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.7rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
				</tbody>
			</table>
		</div>
		<div style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
	</div>
	<div id="srProgressDiv">
		<div>
			<div class="font-weight-bold d-flex" style="font-size:2rem; height:3rem; vertical-align: center; margin-bottom:0.5rem;">
				<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem;">chevron_right</i>
				<span>SR요청 처리 정보</span>
			</div>
		</div>
		<div id="srProgressChoiceDiv">
			<!-- 
			<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
				class="srProgressTableSelectElement srProgressRquest filterTab" style="width:10%">
				<span>SR요청정보</span>
			</a>
			 -->
			<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
				class="srProgressTableSelectElement srProgressPlan filterTab filterTabSelected" style="width:10%">
				<span>SR계획정보</span>
			</a>
			<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
				class="srProgressTableSelectElement srProgressHr filterTab" style="width:10%">
				<span>SR자원정보</span>
			</a>
			<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
				class="srProgressTableSelectElement srProgressPercentage filterTab" style="width:10%">
				<span>SR진척률</span>
			</a>
			<div style="flex-grow:1; border-bottom:1.5px solid #edf2f8;"></div>
		</div>
		<!-- SR요청정보 div -->
		<!-- 
		<div id="srRqstInfo" class="bottomSubDiv" style="display:none;">
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR번호</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS_SR_2023_0167</div>
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">시스템구분</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR제목</div>
				<div style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;">[국취] 맞춤분석 내 분석항목(전역예정장병, 재학생(졸업예정자)) 구분 항목 추가</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청일</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">2023-10-11</div>
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">완료요청일</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">2024-02-29</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR요청번호</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">SR231011_0010</div>
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">유지보수 이관일</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS</div>
			</div>
			<div style="height:11rem; display:flex; flex-direction:row;">
				<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR내용</div>
				<div style="height:11rem; width:85%; padding-left:0.5rem; display:flex; flex-direction: column;">
					<div style="height:3rem;">
						<form>
							<div style="display:flex; flex-direction: row; align-items:center;">
								<input type="radio" name="srContentType" value="requestContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">요청내용
								<div style="width:1rem;"></div>
								<input type="radio" name="srContentType" value="developContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">개발내용
							</div>
						</form>
					</div>
					<div style="height:8rem; display:flex; flex-direction: row; align-items:center; ">
						<div style="height:7rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto;">
							향후 로직 전달드리겠습니다.<br>* 첨부파일 내 6번 해당 <br><br>
						</div>
					</div>
				</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe; border-radius:0px 0px 0px 10px/0px 0px 0px 10px">첨부파일</div>
				<div style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;">(요청내용)230712_EIS변경요청.hwp</div>
			</div>
		</div>
		 -->
		<!-- SR계획정보 div -->
		<div id="srPlanInfo" class="bottomSubDiv">
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청구분</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
					<label style="display:none;" for="usrAuthrt"></label> 
					<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
						<option value="" selected>선택</option>
						<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
							<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
						</c:forEach>
					</select>
				</div>
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">업무구분</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
					<label style="display:none;" for="usrAuthrt"></label> 
					<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
						<option value="" selected>선택</option>
						<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
							<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청사</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
					<label style="display:none;" for="usrAuthrt"></label> 
					<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
						<option value="" selected>선택</option>
						<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
							<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
						</c:forEach>
					</select>
				</div>
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청팀</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
					<label style="display:none;" for="usrAuthrt"></label> 
					<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
						<option value="" selected>선택</option>
						<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
							<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
						</c:forEach>
					</select>
				</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">담당자</div>
				<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
					<input type="text" style="width:55%;">
					<div style="width:5%;"></div>
					<a style="width:30%; border:1px solid gray;" href="#">탐색</a>
				</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row;">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">목표시작일</div>
				<input style="width:35%;" type="date">
				<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">목표완료일</div>
				<input style="width:35%;" type="date">
			</div>
			<div style="height:11rem; display:flex; flex-direction:row;">
				<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">참고사항</div>
				<div style="height:11rem; width:85%; padding-left:0.5rem; display:flex; flex-direction: column;">
					<div style="height:11rem; display:flex; flex-direction: row; align-items:center; ">
						<div style="height:10rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto;">
							향후 로직 전달드리겠습니다.<br>* 첨부파일 내 6번 해당 <br><br>
						</div>
					</div>
				</div>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row; align-items:center; justify-content:right;">
				<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center;" href="#">저장</a>
			</div>
		</div>
		<!-- SR자원정보 -->
		<div id="srHrInfo" class="bottomSubDiv" style="display:none;">
			<div style="height:27rem; background-color:#f1f3f5;">
				<table style="width:100%; text-align:center;">
					<colgroup>
						<col width="5%"/>
						<col width="15%"/>
						<col width="15%"/>
						<col width="65%"/>
					</colgroup>
					<thead style="background-color:#e9ecef;">
						<tr style="height:4rem; font-size:1.6rem; font-weight:700;">
							<th scope="col">ㅁ</th>
							<th scope="col">담당자명</th>
							<th scope="col">역할</th>
							<th scope="col">담당 작업</th>
						</tr>
					</thead>
					<tbody>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<th scope="row">ㅁ</th>
							<td>송원석</td>
							<td>개발자</td>
							<td>분석 설계 구현 시험</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div style="height:4rem; display:flex; flex-direction:row; align-items:center;">
				<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center;" href="#">추가</a>
				<a style="height:3rem; width: 8rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center; margin-left:0.5rem;" href="#">선택삭제</a>
				<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center; margin-left:0.5rem;" href="#">저장</a>
			</div>
		</div>
		<!-- SR진척률 -->
		<div id="srProgressInfo" class="bottomSubDiv" style="display:none;">
			<div style="height:31rem; background-color:#f1f3f5; border-radius:10px;">
				<table style="width:100%; text-align:center;">
					<colgroup>
						<col width="20%"/>
						<col width="20%"/>
						<col width="20%"/>
						<col width="20%"/>
						<col width="20%"/>
					</colgroup>
					<thead style="background-color:#e9ecef;">
						<tr style="height:4rem; font-size:1.6rem; font-weight:700;">
							<th scope="col">작업구분</th>
							<th scope="col">시작일</th>
							<th scope="col">종료일</th>
							<th scope="col">진척률%(누적)</th>
							<th scope="col">산출물</th>
						</tr>
					</thead>
					<tbody>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<td>분석</td>
							<td>2023-08-08</td>
							<td>2023-08-09</td>
							<td>10</td>
							<td>버튼</td>
						</tr>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<td>설계</td>
							<td>2023-08-10</td>
							<td>2023-08-11</td>
							<td>20</td>
							<td>버튼</td>
						</tr>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<td>구현</td>
							<td>2023-08-14</td>
							<td>2023-09-20</td>
							<td>70</td>
							<td>버튼</td>
						</tr>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<td>시험</td>
							<td>2023-09-21</td>
							<td></td>
							<td>87</td>
							<td>버튼</td>
						</tr>
						<tr style="height:4rem; font-size:1.6rem; background-color:white;">
							<td>반영요청</td>
							<td></td>
							<td></td>
							<td></td>
							<td>버튼</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>