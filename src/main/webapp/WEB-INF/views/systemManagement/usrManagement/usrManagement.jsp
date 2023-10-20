<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>

<!-- 
작성자: 송원석
 -->

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/usrManagementStyle.css" />
<div id="userManagementDiv" class="border border-1 p-3 d-flex flex-column" style="background-color:#FAFBFD; border-radius:15px;">
	<div id="userManagementTitleDiv">
		<div class="font-weight-bold" style="font-size:24px; color:#222E3C;">사용자 관리</div>
	</div>
	<div id="userManagementSearchDiv" class="border border-1 mt-3 px-4 py-3" style="background-color:white; border-radius:15px;">
		<form id="searchForm" method="get" action="usrManagement">
			<div class="p-0 container-fluid d-inline-flex flex-row">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">권한</span>
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
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">상태</span>
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
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">키워드</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div style="width:35%; font-size:14px;">
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
								<input type="text" id="keywordContent" name="keywordContent" style="width:98%;"/>
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<a id="initBtn" href="javascript:void(0)" class="d-inline-flex flex-row align-items-center justify-content-center" 
						style="width:50%; height:100%;">
						<span style="font-size:14px; color:white;">초기화</span>
					</a>
				</div>
			</div>
			<div class="p-0 container-fluid d-inline-flex flex-row mt-3">
				<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
					<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">소속</span>
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
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">부서</span>
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
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">가입일</span>
						</div>
						<div style="width:80%; display:flex; align-items:center;">
							<div style="width:100%; dispaly:flex; align-items:center">
								<input name="joinDateStart" style="width:45%;" type="date">
								<span style="width:10%; font-size:14px;">~</span>
								<input name="joinDateEnd" style="width:45%;" type="date">
							</div>
						</div>
					</div>
				</div>
				<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
					<button id="searchBtn" class="d-inline-flex flex-row align-items-center justify-content-center" 
						style="width:50%; height:100%;">
						<span style="font-size:14px; color:white;">검색</span>
					</button>
					<!-- 
					<a id="searchBtn" href="javascript:void(0)" class="d-inline-flex flex-row align-items-center justify-content-center" 
						style="width:50%; height:100%;">
						<span style="font-size:14px; color:white;">검색</span>
					</a>
					 -->
				</div>	
			</div>
		</form>
	</div>
	<div id="userManagementBoardDiv" class="d-flex flex-column border border-1 mt-3 px-4 py-3" 
		style="flex-grow:1; height:75%; background-color:white; border-radius:15px;">
		<div>
			<div class="font-weight-bold" style="font-size:20px; color:#222E3C;">사용자 목록</div>
		</div>
		<div class="d-flex flex-column border border-1" style="flex-grow:1; margin:10px 0px;">
			<table class="table m-0">
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
				<thead class="thead-light">
					<tr>
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
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
					<tr>
						<th scope="row">ㅁ</th>
						<td class="text-align-left">송원석</td>
						<td class="text-align-left">010-1234-5678</td>
						<td>a1@naver.com</td>
						<td>한국소프트웨어협회</td>
						<td>승인 대기</td>
						<td>2023-10-18</td>
						<td>Y</td>
					</tr>
				</tbody>
			</table>
			<!-- 
			<div>
				<table class="table m-0" style="background-color:#dee2e6;">
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
					<thead>
						<tr>
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
				</table>
			</div>
			<div style="flex-grow:1; overflow-y:auto;">
				<table class="table">
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
					<tbody>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
						<tr>
							<th scope="row">ㅁ</th>
							<td class="text-align-left">송원석</td>
							<td class="text-align-left">010-1234-5678</td>
							<td>a1@naver.com</td>
							<td>한국소프트웨어협회</td>
							<td>승인 대기</td>
							<td>2023-10-18</td>
							<td>Y</td>
						</tr>
					</tbody>
				</table>
			</div> 
			-->
		</div>
		<div style="height:10%;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer.jsp"%>