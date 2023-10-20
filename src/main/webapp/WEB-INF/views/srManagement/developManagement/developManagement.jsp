<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/srManagement/developManagement.css" />
<!-- 폰트 -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap" rel="stylesheet">
<!-- 아이콘 -->
<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

				<div class="wrapper">
					<h4 class="card-title top-title">
						<i class="material-icons top-icon pb-1">developer_board</i>
						SR개발관리
					</h4>

					<div class="card mb-3 p-3">
						<div class="card-body">
							<!-- 검색조건1 -->
							<!-- <div class="test">
								<div class="d-flex">
						            <span class="col-form-label">조회기간</span>
					            	<div class="d-flex p-0 ml-4">
							            <input class="form-control form-control-sm" type="date" id="startDate" name="startDate">
										<span class="btn btn-sm pt-1 between-date py-0 mx-2">~</span>
										<input class="form-control form-control-sm" type="date" id="endDate" name="endDate">
					            	</div>
					            </div>
						        <div class="d-flex">
						        	<span class="col-form-label">관련시스템</span>
						            <select class="form-control form-control-sm ml-4" id="selectSystem" name="selectSystem">
								        <option>시스템1</option>
								        <option>시스템2</option>
								        <option>시스템3</option>
								        <option>시스템4</option>
								    </select>
						        </div>
						        <div class="d-flex">
						        	<span class="col-form-label">진행상태</span>
						            <select class="form-control form-control-sm ml-4" id="selectProg" name="selectProg">
								        <option>요청</option>
								        <option>검토중</option>
								        <option>접수</option>
								        <option>개발중</option>
								        <option>개발완료신청</option>
								        <option>개발완료</option>
								    </select>
						        </div>
						        <div class="d-flex flex-row-reverse">
						        	<input type="checkbox" id="myDevCheck" class="form-control form-control-sm ml-4" name="myDevCheck" value="False">
									<label for="myDevCheck" class="mt-2">내 개발건만</label>
						        </div>
							</div>
							<div class="test">
							
								<div class="d-flex">
						            <span class="col-form-label">등록자 소속</span>
					            	<div class="d-flex p-0 ml-4">
							            <input type="text" class="form-control form-control-sm placeholder mr-2">
										<button class="btn btn-small btn-secondary search-btn">찾기</button>
					            	</div>
					            </div>
						        <div class="d-flex">
						        	<span class="col-form-label">개발 부서</span>
						            <select class="form-control form-control-sm" id="selectDepartment" name="selectDepartment">
								        <option>개발1팀</option>
								        <option>개발2팀</option>
								        <option>개발3팀</option>
								    </select>
						        </div>
						        <div class="d-flex">
						            <select class="form-control form-control-sm ml-4" id="selectProg" name="selectProg">
								        <option>요청</option>
								        <option>검토중</option>
								        <option>접수</option>
								        <option>개발중</option>
								        <option>개발완료신청</option>
								        <option>개발완료</option>
								    </select>
						        </div>
						        <div class="d-flex">
						        	<input type="text" class="form-control form-control-sm placeholder mr-2" placeholder="검색어를 입력하세요.">
									<button class="btn btn-small btn-secondary search-btn">검색</button>
						        </div>
								
							</div> -->
							
							<table class="sr-search">
								<tbody>
									<tr class="d-flex mb-2">
										<th scope="col">조회기간</th>
										<td class="d-flex mr-5">
											<input class="form-control form-control-sm mr-2" type="date" id="startDate" name="startDate">
											<span class="btn btn-sm pt-1 mr-2 between-date">~</span>
											<input class="form-control form-control-sm" type="date" id="endDate" name="endDate">
										</td>
										<th scope="col">관련시스템</th>
										<td>
											<select class="form-control form-control-sm" id="selectSystem" name="selectSystem">
										        <option>시스템1</option>
										        <option>시스템2</option>
										        <option>시스템3</option>
										        <option>시스템4</option>
										    </select>
										</td>
										<th scope="col">진행상태</th>
										<td>
											<select class="form-control form-control-sm" id="selectProg" name="selectProg">
										        <option>요청</option>
										        <option>검토중</option>
										        <option>접수</option>
										        <option>개발중</option>
										        <option>개발완료신청</option>
										        <option>개발완료</option>
										    </select>
										</td>
									</tr>
									<tr class="d-flex">
										<th scope="col">등록자 소속</th>
										<td class="d-flex mr-5">
											<input type="text" class="form-control form-control-sm placeholder mr-2">
											<button class="btn btn-small btn-secondary search-btn">찾기</button>
										</td>
										<th scope="col">개발 부서</th>
										<td>
											<select class="form-control form-control-sm" id="selectDepartment" name="selectDepartment">
										        <option>개발1팀</option>
										        <option>개발2팀</option>
										        <option>개발3팀</option>
										    </select>
										</td>
										<td class="d-flex space-between">
											<input type="text" class="form-control form-control-sm placeholder mr-2" placeholder="검색어를 입력하세요.">
											<button class="btn btn-small btn-secondary search-btn">검색</button>
										</td>
									</tr>						
								</tbody>
							</table>
						</div>
					</div>
					<div class="card mt-3">
					  <div class="card-body">
					    <h5 class="card-title list-title">SR개발 목록</h5>
						<div class="table-container">
						    <table class="table sr-list">
						      <thead class="thead-light">
						        <tr>
						          <th scope="col"></th>
						          <th scope="col">요청번호</th>
						          <th scope="col">제목</th>
						          <th scope="col">관련시스템</th>
						          <th scope="col">등록자</th>
						          <th scope="col">상태</th>
						          <th scope="col">요청일</th>
						          <th scope="col">완료예정일</th>
						          <th scope="col">중요</th>
						          <th scope="col">접수요청</th>
						          <th scope="col">유지보수<br>이관여부</th>
						          <th scope="col">개발완료<br>요청여부</th>
						          <th scope="col">상세보기</th>
						        </tr>
						      </thead>
						      <tbody>
						        <tr>
						          <th scope="row">1</th>
						          <td class="text-align-left">SR231013_0001</td>
						          <td class="text-align-left">SRM 시스템 개발 요청</td>
						          <td>SoftNet</td>
						          <td>홍길동</td>
						          <td>접수</td>
						          <td>2023-10-13</td>
						          <td>2023-10-31</td>
						          <td>Y</td>
						          <td>Y</td>
						          <td>Y</td>
						          <td>N</td>
						          <td class="btn-container"><button class="btn btn-small btn-primary" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
						        </tr>
						        <tr>
						          <th scope="row">2</th>
						          <td class="text-align-left">SR231013_0001</td>
						          <td class="text-align-left">SRM 시스템 개발 요청</td>
						          <td>SoftNet</td>
						          <td>홍길동</td>
						          <td>접수</td>
						          <td>2023-10-13</td>
						          <td>2023-10-31</td>
						          <td>Y</td>
						          <td>Y</td>
						          <td>Y</td>
						          <td>N</td>
						          <td class="btn-container"><button class="btn btn-small btn-primary" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>
						        </tr>
						      </tbody>
						    </table>
						    
						    <!-- 상세보기 모달 -->
						    <div id="detailmodal" class="modal" data-backdrop="static">
							  <div class="modal-dialog modal-dialog-centered modal-lg">
							    <div class="modal-content">
							      <div class="modal-header">
							        <h6 class="modal-title">SR 상세</h6>
							        <i class="material-icons close-icon" data-dismiss="modal">close</i>
							      </div>
							      <div class="modal-body">
							      		<!-- SR요청정보 -->
							      		<h6 class="modal-sub-title">SR요청정보</h6>
							      		<div class="card p-2 mb-4">
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
											<div class="row mx-0 mt-0 mb-2">
									          <div class="col-sm row">
									            <label for="srTitle" class="col-form-label col-5 pl-0">SR제목</label>
									            <input type="text" class="form-control form-control-sm col-7" id="srTitle">
									          </div>
											</div>
											<div class="row mx-0 mt-0 mb-2">
									          <div class="col-sm row">
									            <label for="srContent" class="col-form-label col-5 pl-0">SR내용</label>
									            <textarea class="form-control form-control-sm col-7"  id="srContent" rows="5" cols="50"></textarea>
									          </div>
											</div>
											<div class="row mx-0 mt-0 mb-2">
									          <div class="col-sm row">
									          <label for="srFile" class="col-form-label col-5 pl-0">첨부파일</label>
												<input type="file" id="srFile" class="form-control-file form-control-sm col-7 px-0">
									          </div>
											</div>
										</div>
										
										<!-- SR개발정보 -->
							      		<h6 class="modal-sub-title">SR개발정보</h6>
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
								      		<div class="row mx-0 mt-0 mb-2">
									          <div class="col-sm row">
									            <label for="devContent" class="col-form-label col-5 pl-0">개발내용</label>
									            <textarea class="form-control form-control-sm col-7"  id="devContent" rows="5" cols="50"></textarea>
									          </div>
											</div>
											<div class="row mx-0 mt-0 mb-2">
									          <div class="col-sm row">
									          <label for="devFile" class="col-form-label col-5 pl-0">첨부파일</label>
												<input type="file" id="devFile" class="form-control-file form-control-sm col-7 px-0">
									          </div>
											</div>
										</div>
							      </div>
							      <div class="modal-footer py-1">
							        <button type="button" class="btn btn-primary plan-btn">개발계획작성</button>
							        <button type="button" class="btn btn-primary plan-btn">개발계획수정</button>
							        <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
							      </div>
							    </div>
							  </div>
							</div>
							
						</div>
					  </div>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>