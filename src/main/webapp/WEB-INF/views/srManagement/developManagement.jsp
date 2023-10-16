<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/developManagement.css" />
<!-- 폰트 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
			<div class="card">
			  <div class="card-body">
			    <h5 class="card-title">SR개발 목록</h5>
			
			    <table class="table sr-list">
			      <thead class="thead-light">
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
			          <th scope="col">완료예정일</th>
			          <th scope="col">중요</th>
			          <th scope="col">접수요청</th>
			          <th scope="col">유지보수<br>이관여부</th>
			          <th scope="col">개발완료<br>요청여부</th>
			        </tr>
			      </thead>
			      <tbody>
			        <tr>
			          <th scope="row">1</th>
			          <td class="text-align-left">SR231013_0001</td>
			          <td class="text-align-left">SRM 시스템 개발 요청</td>
			          <td>SoftNet</td>
			          <td>홍길동</td>
			          <td>한국소프트웨어협회</td>
			          <td>데이터관리팀</td>
			          <td>접수</td>
			          <td>2023-10-13</td>
			          <td>2023-10-31</td>
			          <td>Y</td>
			          <td>Y</td>
			          <td>Y</td>
			          <td>N</td>
			        </tr>
			        <tr>
			          <th scope="row">2</th>
			          <td class="text-align-left">SR231013_0001</td>
			          <td class="text-align-left">SRM 시스템 개발 요청</td>
			          <td>SoftNet</td>
			          <td>홍길동</td>
			          <td>한국소프트웨어협회</td>
			          <td>데이터관리팀</td>
			          <td>접수</td>
			          <td>2023-10-13</td>
			          <td>2023-10-31</td>
			          <td>Y</td>
			          <td>Y</td>
			          <td>Y</td>
			          <td>N</td>
			        </tr>
			      </tbody>
			    </table>
			
			  </div>
			</div>
	</body>
</html>