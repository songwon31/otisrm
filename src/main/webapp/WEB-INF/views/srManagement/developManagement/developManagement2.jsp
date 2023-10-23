<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header2.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/developManagement2.css" />

<div id="userManagementDiv" class="shadow">
	<div id="userManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons top-icon" style="font-size:3.5rem; height:4rem; line-height: 4rem;">developer_board</i>
			<span style="margin-left: 1rem;">SR개발관리</span>
		</div>
	</div>
	<!-- <div style="width:160.07rem; height:1rem; background-color: red;"></div> -->
	<div id="userManagementSearchDiv" class="shadow" style="height:13rem; margin:2rem 0rem; padding:3rem 2rem; background-color:white; border-radius:1rem;">
		<form id="searchForm" method="get" action="">
			<div class="d-flex" style="height:3rem;">
				<!-- 조회기간 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">조회기간</span>
				</div>
				<div style="width:33rem; display:flex; align-items:center;">
						<input name="joinDateStart" type="date">
						<div style="margin: 0 1rem; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">~</div>
						<input name="joinDateEnd" type="date">
				</div>
				<div style="width: 7.19rem;"></div>
				<!-- 관련 시스템 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">관련 시스템</span>
				</div>
				<div style="width:15rem;">
					<select id="usrAuthrt" name="usrAuthrt">
						<option value="" selected>전체</option>
						<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
							<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
						</c:forEach>
					</select>
				</div>
				<div style="width: 7.19rem;"></div>
				<!-- 진행 상태 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">진행상태</span>
				</div>
				<div style="width:36rem;">
					<select style="width:13rem;" id="selectProg" name="selectProg">
						<option value="" selected>전체</option>
				        <option>요청</option>
				        <option>검토중</option>
				        <option>접수</option>
				        <option>개발중</option>
				        <option>개발완료신청</option>
				        <option>개발완료</option>
				    </select>
				</div>
				<div style="width: 7.19rem;"></div>
				<!-- 담당 SR -->
				<div style="width: 8.5rem;" class="d-flex flex-row-reverse align-items-center">
					<span style="font-size:1.6rem; margin-left: 1rem;">담당 SR</span>
		        	<input type="checkbox" id="myDevCheck" name="myDevCheck" value="False">
		        </div>
			</div>
			
			<!-- LINE2 -->
			<div class="d-flex" style="margin-top:1.2rem; height:3rem;">
				<!-- 등록자 소속 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">등록자 소속</span>
				</div>
				<div style="width:33rem; display:flex; align-items:center;">
						<input type="text" id="keywordContent" name="keywordContent" style="width: 24rem;"/>
						<button id="searchBtn" style="margin-left: 1rem;" class="d-inline-flex align-items-center justify-content-center" 
							onclick="location.href='#';">
							찾기
						</button>
				</div>
				<div style="width: 7.19rem;"></div>
				<!-- 개발 부서 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">개발 부서</span>
				</div>
				<div style="width:15rem;">
					<select id="devDepartment" name="devDepartment" style="width:100%">
						<option value="" selected>전체</option>
						<option>개발1팀</option>
				        <option>개발2팀</option>
				        <option>개발3팀</option>
					</select>

				</div>
				<div style="width: 7.19rem;"></div>
				<!-- 키워드 검색 -->
				<div style="width:14rem; display:flex; align-items:center;">
					<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
					<span style="font-size:1.6rem; font-weight:700;">키워드</span>
				</div>
				<div style="width:36rem; display: flex;">
					<select style="width:13rem;" id="userStts" name="userStts">
						<option value="" selected>전체</option>
						<c:forEach var="usrStts" items="${usrManagementPageConfigure.usrSttsList}" varStatus="status">
							<option value="${usrStts.usrSttsNo}">${usrStts.usrSttsNm}</option>
						</c:forEach>
					</select>
					<input type="text" id="keywordContent" name="keywordContent" style="width: 22rem; margin-left:1rem;"/>
				</div>
				<div style="width: 7.6rem;"></div>
				<!-- 검색버튼 -->
				<button id="searchBtn" class="d-inline-flex flex-end align-items-center justify-content-center"  
					onclick="location.href='#';">
					검색
				</button>
			</div>

		</form>
	</div>
	<div id="userManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR개발목록</div>
		<div class="" style="height:52rem; margin:0.75rem 0rem;">
			<table id="mainTable" style="width: 100%;">
				<colgroup>
					<col width="4%" />
					<col width="10%" />
					<col width="18%" />
					<col width="6%" />
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
					<tr style="height: 5rem; font-size: 1.7rem; font-weight: 700;">
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
					<tr style="height: 4.7rem; font-size: 1.7rem;">
						<th scope="row">1</th>
						<td class="text-align-left">SR231013_0001</td>
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
				</tbody>
			</table>
		</div>
		<div style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
	</div>
</div>
<%@ include file="/WEB-INF/views/common/footer2.jsp"%>