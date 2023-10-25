<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/usrManagementStyle.css" />
<!-- 아이콘 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

<div id="userManagementDiv" class="shadow">
	<div id="userManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">settings</i>
			<span style="margin-left: 9.5px;">사용자관리</span>
		</div>
	</div>
	<div id="userManagementSearchDiv" class="shadow" 
		style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:10px;">
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
					<tr style="height:5rem; font-size:1.6rem; font-weight:700;">
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
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
						<th scope="row">ㅁ</th>
						<td class="">송원석</td>
						<td class="">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr style="height:4.7rem; font-size:1.6rem;">
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
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>