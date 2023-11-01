<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>

<!-- css 연결 -->
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/reviewerHome.css" />
<!-- javascript 연결 -->
<script src="${pageContext.request.contextPath}/resources/javascript/home/reviewerHome.js"></script>

<div id="reviewerHomeDiv" class="shadow">
	<div id="reviewerHomeTitleDiv" style="height:4rem;">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons" style="font-size:3.5rem; height:4rem; line-height: 4rem;">person</i>
         	<span style="margin-left: 1rem;">My Portal</span>
		</div>
	</div>
	<div class="d-flex">
		<div style="width: 70%;">
			<div id="reviewerHomeCountDiv" class="shadow" style="height:10.5rem; margin: 0.5rem 0; background-color:white; border-radius:1rem; padding:1rem;" >
				<div class="reviewerHomeSecondTitle">미처리 검토 현황</div>
				<div style="width: 100%;" class="d-flex">
					<div class="countcard">
						<span class="mr-3">검토요청:</span>
						<span id="requestReviewCount" class="mr-3">5</span>
						<span>건</span>
					</div>
					<div style="width: 1%;"></div>
					<div class="countcard">
						<span class="mr-3">접수요청:</span>
						<span id="requestReceptionCount" class="mr-3">7</span>
						<span>건</span>
					</div>
					<div style="width: 1%;"></div>
					<div class="countcard">
						<span class="mr-3">완료요청:</span>
						<span id="requestCompleteCount" class="mr-3">1</span>
						<span>건</span>
					</div>
				</div>
			</div>
			<div id="reviewerHomeBoardDiv" class="shadow" style="height:39.5rem; background-color:white; border-radius:1rem; padding:1rem;">
				<div class="reviewerHomeSecondTitle">검토 목록</div>
				<div id="statusChoiceBtnDiv">
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab filterTabSelected" style="width:10%;">전체</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">요청</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">검토중</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">접수</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">개발중</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">테스트</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">완료요청</a>
					<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" class="mainTableSelectElement filterTab" style="width:10%;">개발완료</a>
				</div>
				<div style="height: 27rem;  background-color: #f9fafe;">
					<table id="reviewerHomeMainTable" style="width: 100%;">
						<colgroup>
							<col width="5%" />
							<col width="12.5%" />
							<col width="20%" />
							<col width="10%" />
							<col width="7.5%" />
							<col width="7.5%" />
							<col width="7.5%" />
							<col width="10%" />
							<col width="10%" />
							<col width="7.5%" />
						</colgroup>
						<thead>
							<tr style="height: 4.5rem; font-size: 1.5rem; font-weight: 700;">
								<th scope="col"></th>
								<th scope="col">SR번호</th>
								<th scope="col">제목</th>
								<th scope="col">관련시스템</th>
								<th scope="col">등록자</th>
								<th scope="col">소속</th>
								<th scope="col">상태</th>
								<th scope="col">요청일</th>
								<th scope="col">완료예정일</th>
								<th scope="col">상세보기</th>
							</tr>
						</thead>
						<tbody id="reviewerHomeBoardList" style="height: 22.5rem;"></tbody>
					</table>
				</div>
				<div id="reviewerHomeMainTablePaging" style="height: 4rem; padding: 0.5rem 0;" class="d-flex flex-row justify-content-center align-items-center">
					<%-- <a class="btn" href="javascript:loadReviewerHomeBoardList(1)">처음</a>
					<c:if test="${reviewerHomeBoardPager.groupNo>1}">
						<a class="btn" href="javascript:loadReviewerHomeBoardList(${reviewerHomeBoardPager.startPageNo-1})">이전</a>
					</c:if>
					
					<c:forEach var="i" begin="${reviewerHomeBoardPager.startPageNo}" end="${reviewerHomeBoardPager.endPageNo}">
						<c:if test="${reviewerHomeBoardPager.pageNo != i}">
							<a class="btn" href="javascript:loadReviewerHomeBoardList(${i})">${i}</a>
						</c:if>
						<c:if test="${reviewerHomeBoardPager.pageNo == i}">
							<a class="btn" href="javascript:loadReviewerHomeBoardList(${i})">${i}</a>
						</c:if>
					</c:forEach>
					
					<c:if test="${reviewerHomeBoardPager.groupNo<reviewerHomeBoardPager.totalGroupNo}">
						<a class="btn" href="javascript:loadReviewerHomeBoardList(${reviewerHomeBoardPager.endPageNo+1})">다음</a>
					</c:if>
					<a class="btn" href="javascript:loadReviewerHomeBoardList(${reviewerHomeBoardPager.totalPageNo})">맨끝</a> --%>
				</div>
				
				<!-- 상세보기 모달 -->
			    <div id="detailmodal" class="modal" data-backdrop="static">
				  <div class="modal-dialog modal-dialog-centered modal-lg">
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
						            <label for="progStts" class="col-form-label col-5 pl-0">이관여부</label>
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
		<div style="width: 30%; padding-left: 0.5rem;" class="">
			<div id="reviewerHomeChartDiv" class="shadow" style="height:51rem; background-color:white; border-radius:1rem; padding:1rem;" >
				<div class="reviewerHomeSecondTitle ">시스템별 검토 현황</div>
				<c:forEach var="i" items="${totalSytemList}" varStatus="status">	
					<div>${i}</div>
					<div style="width:100%; height: 1.5rem; background-color: #3b82f6; opacity: 0.5;"></div>
				</c:forEach>
				
				<!-- Chart -->
 			    <!--<script src= "https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script> 
				<script src= "https://cdn.jsdelivr.net/npm/chart.js@4.0.1/dist/chart.umd.min.js"></script> 
			    
			    <div id="containerID">           
			        <div> 
			            <canvas id="stackedChartID" width="100%;"></canvas> 
			        </div> 
			    </div> 
			  
			    <script> 
			        var myContext = document.getElementById( 
			            "stackedChartID").getContext('2d'); 
			              
			        var myChart = new Chart(myContext, { 
			            type: 'bar', 
			            data: { 
			                labels: ["bike", "car", "scooter", "truck"], 
			                datasets: [{ 
			                    label: 'worst', 
			                    backgroundColor: "blue", 
			                    data: [17, 16, 4, 1], 
			                }, { 
			                    label: 'Okay', 
			                    backgroundColor: "green", 
			                    data: [4, 2, 10, 6], 
			                }, { 
			                    label: 'bad', 
			                    backgroundColor: "red", 
			                    data: [2, 21, 3, 24], 
			                }], 
			            }, 
			            options: { 
			                indexAxis: 'y', 
			                scales: { 
			                    x: { 
			                        stacked: true, 
			                    }, 
			                    y: { 
			                        stacked: true 
			                    } 
			                }, 
			                responsive: true 
			            } 
			        }); 
			    </script>-->
			</div>
		</div>
	</div>
	
	<div id="reviewerHomeSrProgressDiv" class="shadow" style="height:28.5rem; width: 100%; background-color:white; border-radius:1rem; margin-top: 0.5rem; padding:1rem;">
       <div class="reviewerHomeSecondTitle ">SR진행현황</div>
       <div class="d-flex" style="margin: 0.5rem 1rem 2rem 1rem;">
       		<span class="badgeitem mr-3">SR번호</span>
       		<span class="mr-3">SR231013_0001</span>
       		<span class="badgeitem mr-3">SR제목</span>
       		<span>SRM 시스템 개발 요청</span>
       </div>
       <div id="progressCircles">
			<div class="progress-steps">
				<div class="progress-step">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">요청</p>
						<div style="width: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 1rem 0;">
							<div>2023-10-27</div>
							<div>성유짱</div>
						</div>
					</div>
				</div>
				<div class="progress-step">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">검토중</p>
					</div>
				</div>
				<div class="progress-step">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">접수</p>
					</div>
				</div>
				<div class="progress-step">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">개발중</p>
						<div style="width: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 1rem 0;">
							<div>2023-10-27</div>
							<div>성유짱</div>
						</div>
					</div>
				</div>
				<div class="progress-step mb-0">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">테스트</p>
					</div>
				</div>
				<div class="progress-step mb-0">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">완료신청</p>
					</div>
				</div>
				<div class="progress-step mb-0">
					<div class="progress-content">
						<div class="inner-circle"></div>
						<p class="mt-3 mb-1">개발완료</p>
						<div style="width: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 1rem 0;">
							<div>2023-10-27</div>
							<div>예정</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>