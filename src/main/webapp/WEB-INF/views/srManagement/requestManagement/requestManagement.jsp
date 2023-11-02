<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>

<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/requestManagement/requestManagement.css" />

<div class="contentDiv shadow">
	<div id="developManagementTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex tt-ct">
			<i class="material-icons tt-ic">developer_board</i>
			<span style="margin-left: 1rem;">SR요청관리</span>
		</div>
	</div>
	<div class="contentTop shadow" >
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
					<select class="form-controll" style="width:100%;" id="selectSystem" name="selectSystem">
						<option value="" selected>전체</option>
					</select>
				</div>
				<div style="width: 3.5%;"></div>
				<!-- 진행 상태 -->
				<div style="width: 8.94%; display:flex; align-items:center;">
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">진행상태</span>
				</div>
				<div style="width: 20.73%;">
					<select style="width:109.13px;" id="selectProg" name="selectProg">
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
				<div style="width: 9.79%;" class="d-flex flex-row-reverse align-items-center">
					<span style="font-size:1.6rem; margin-left: 0.5rem;">내 요청 건만</span>
		        	<input type="checkbox" id="myDevCheck" name="myDevCheck" value="False">
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
						<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
						<button style="margin-left: 1rem;" class="btn-4 d-inline-flex align-items-center justify-content-center" 
							onclick="location.href='#';">
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
					<svg class="svgicon"><rect/></svg>
					<span style="font-size:1.6rem; font-weight:700;">키워드</span>
				</div>
				<div style="width: 24.73%; display: flex;">
					<select style="width:30%;" id="userStts" name="userStts">
						<option value="" selected>전체</option>
					</select>
					<div style="width:1rem;" ></div>
					<input type="text" id="keywordContent" name="keywordContent" class="flex-grow-1"/>
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
	<div id="developManagementBoardDiv" class="shadow" 
		style="height:65rem; background-color:white; border-radius:1rem; padding:2rem;">
		<div class="d-flex">
			<span class="mr-auto" style="height:3.5rem; font-size:2.2rem; font-weight:700; color:#222E3C;">SR개발목록</span>
			<button class="btn-5" onclick="location.href='#';">엑셀 다운로드</button>
		</div>
		<div class="tableContainer">
			<table id="mainTable" style="width: 100%; text-align: center; height: 27rem;">
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
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
						<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
					</tr>	
				</tbody>
			</table>
		</div>
		<div style="height:3.5rem;" class="d-flex flex-row justify-content-center align-items-center">
			페이징
		</div>
		
		<!-- 상세보기 모달 -->
	   
		
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>