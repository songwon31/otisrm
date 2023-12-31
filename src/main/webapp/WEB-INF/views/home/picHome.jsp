<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<script src="${pageContext.request.contextPath}/resources/javascript/home/picHome.js"></script>

<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/picHome.css" />
<div id="picHomeDiv" class="contentDiv shadow">
   <div>
	   <input type="hidden" id="loginUsrNo" value="${usr.usrNo}">
	   <div class="titleDiv">
	      <div class="font-weight-bold d-flex tt-ct">
	         <i class="material-icons tt-ic">person</i>
	            <span>My Portal</span>
	      </div>
	   </div>
   </div>
   
   
   <div>
	   <div class="d-flex">
		   <div class="potalTop section shadow w-100">
		   	  <div class="subcontentTitle">
			   	  <div class="d-flex st-ct">
			   	  	<i class="material-icons stt-ic">chevron_right</i>
			   	  	<span class="pt-1" style="font-size: 2rem;">나의 할 일</span>
			   	  	<div id="requestAddBtnWrap">
						<button id="requestAddBtn" data-toggle="modal" data-target="#addSrRqst" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" style="margin-left: 1160px;" onclick="showSysByDeptNo('${usr.deptNo}')">
							요청 등록
						</button>
					</div>
			   	  </div>
		   	  </div>
		   	  <div class="tableContainer">
		   	  	<div class="filterTabWrap">
		   	  		<div class="d-flex">
		   	  			<div id="" class="filterTab d-flex justify-content-center align-items-center" 
		   	  				style="background-color: #edf2f8; color: black;">
			   	  			<div>전체</div>
			   	  			<div id="numOfAll" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RQST" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>요청</div>
		   	  				<div id="numOfRqst" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV_WAIT" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>승인대기</div>
			   	  			<div id="numOfAprvWait" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV_REEXAM" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>승인재검토</div>
			   	  			<div id="numOfAprvReexam" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV_RETURN" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>승인반려</div>
			   	  			<div id="numOfAprvReturn" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="APRV" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>승인</div>
		   	  				<div id="numOfAprv" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT_WAIT" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>접수대기</div>
		   	  				<div id="numOfRcptWait" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT_REEXAM" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>접수재검토</div>
		   	  				<div id="numOfRcptReexam" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT_RETURN" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>접수반려</div>
		   	  				<div id="numOfRcptReturn" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT"  class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>접수</div>
			   	  			<div id="numOfRcpt" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="DEP_ING"  class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>개발중</div>
		   	  				<div id="numOfDepIng" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="TEST" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>테스트</div>
			   	  			<div id="numOfTest" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="CMPTN_RQST" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>완료요청</div>
			   	  			<div id="numOfCmptnRqst"class="pb-1"></div>
		   	  			</div>
		   	  			<div id="toDoItem" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>처리 항목</div>
			   	  			<div id="" class="m-1"></div>
		   	  			</div>
		   	  			
		   	  		</div>
		   	  	</div>
		   	  <table id="mainTable" style="width: 100%; text-align: center; height: 27.5rem;">
				    <colgroup>
				        <col width="45.04px" />
				        <col width="118.99px" />
				        <col width="221.32px" />
				        <col width="144.64px" />
				        <col width="67.56px" />
				        <col width="69.64px" />
				        <col width="67.56px" />
				        <col width="90.08px" />
				        <col width="45.04px" />
				        <col width="67.7px" />
				    </colgroup>
				    <thead>
				        <tr>
				            <th scope="col"></th>
				            <th scope="col">요청번호</th>
				            <th scope="col">제목</th>
				            <th scope="col">관련시스템</th>
				            <th scope="col">등록자</th>
				            <th scope="col">소속</th>
				            <th scope="col">상태</th>
				            <th scope="col">요청일</th>
				            <th scope="col">중요</th>
				            <th scope="col">상세보기</th>
				        </tr>
				    </thead>
				    <tbody id="getSrReqstListByPageNo">      
			         <!-- Json 데이터 들어오는 곳 -->    
				    </tbody>
				</table>
				<!-- 페이징 -->
				<div id="pagination-container" class="paging d-flex justify-content-center align-items-center pt-2">
					<!-- 비동기로 페이징 들어오는 곳 -->
						
			    </div>	
		   	  </div>
		    </div>
	   </div>
   </div>
   <!-- 아래 내용 -->
   <div class="d-flex">
	   <div class="potalBottom section shadow w-30">
			<div class="subcontentTitle">
		 		<div class="d-flex st-ct">
			 	  	<i class="material-icons stt-ic">chevron_right</i>
			 	  	<span class="pt-1" style="font-size: 2rem;">처리 항목</span>
		 	 	</div>
			   <!-- 처리할 항목 -->
				<div id="toDoItemContends">
					<div class="subcontentTitle pt-1" style="padding-left: 19px;color: #5d6e7e;">
				   		나의 처리할 항목
				   	</div>
				 	<div class="d-flex justify-content-left">
					 	<div id="itemOfAprvRqst" class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">미승인 SR요청</div>
							<div class="d-flex justify-content-center">
								<div class="w-50 mt-2"> 								
									<div class="toDoItemNm" style="margin-left: 3px; margin-right: 2px;">요청</div>
									<div style="text-align: center;"><span id="numOfRqstItems" style="padding-right:2px; padding-left:5px; font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
								<div class="w-50 mt-2">								
									<div class="toDoItemNm"  style="margin-left: 2px; margin-right: 3px;">승인재검토</div>
									<div style="text-align: center;"><span id="numOfAprvReexamItems" style="padding-right:2px;font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
							</div>
						</div>
						<div id="itemOfRcptRqst" class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center; font-size: 1.3rem;">개발계획 작성 필요 SR요청</div>
							<div class="d-flex justify-content-center">
								<div class="w-50 mt-2"> 								
									<div class="toDoItemNm" style="margin-left: 3px; margin-right: 2px;">승인</div>
									<div style="text-align: center;"><span id="numOfAprvItems" style="padding-right:2px; padding-left:5px; font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
								<div class="w-50 mt-2">								
									<div class="toDoItemNm"  style="margin-left: 2px; margin-right: 3px;">접수재검토</div>
									<div style="text-align: center;"><span id="numOfRcptReexamItems" style="padding-right:2px;font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
							</div>
						</div>
				 	</div>
				 	<div class="d-flex justify-content-left">
					 	<div id="itemOfRcpt" class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">접수된 담당 SR</div>
							<div style="text-align: center;"><span id="numOfRcptItems" style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
						<div id="itemOfApplyRqst" class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">개발 반영 요청</div>
							<div style="text-align: center;"><span id="numOfApplyRqstItems" style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
				 	</div>
				 	<div class="d-flex">
						<div id="itemOfSchdlChg"  class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">계획 변경 요청</div>
							<div style="text-align: center;"><span id="numOfSchdlChgItems" style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
						<div id="itemOfTrnsfY" class="toDoItem"  style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">이관된 SR</div>
							<div style="text-align: center;"><span id="numOfTrnsfYItems" style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
				 	</div>
				</div>
			 </div>
	    </div>
	    
	   <!-- SR 진행 현황 -->
	   <div class="potalBottom section shadow w-75">
			<div class="subcontentTitle">
		 		<div class="d-flex st-ct">
			 	  	<i class="material-icons stt-ic">chevron_right</i>
			 	  	<span class="pt-1" style="font-size: 2rem;">SR 진행 현황</span>
		 	 	</div>
			 </div>
			 
			 <!-- 이관된 경우 -->
			<div id="isTrnsfY">
				<div class="bottomSrRqstNo mb-2 p-2">
					<div class="d-flex justify-content-center">
						<div class="w-30 d-flex">
							<i class="material-icons pt-2 mr-2">install_desktop</i>
							<div class="pt-2" style="font-weight: bold;">관련시스템:</div>
							<div id="isTrnsfY-sysNm" class="pt-2 ml-2" style="font-weight: bold;">고용노동부</div>
						</div>
					    <div class="w-30 d-flex">
							<i class="material-icons pt-2 mr-2">person_add</i>
							<div class="pt-2" style="font-weight: bold;">신청자:</div>
							<div id="isTrnsfY-usrNm" class="pt-2 ml-2" style="font-weight: bold;">성유짱</div>
						</div>
						<div class="w-30 d-flex">						
							<i class="material-icons pt-2 mr-2">payments</i>
						    <div class="pt-2" style="font-weight: bold;">소요예산: </div>
						    <div id="isTrnsfY-srReqBgt" class="pt-2  ml-2" style="font-weight: bold;">30000</div>
						    <div  class="pt-2" style="font-weight: bold;">원</div>
						</div>
					</div>
					
				</div>
				<div id="srProgressDiv">
					<div style="display:flex;">
						<div id="srProgressChoiceDiv" style="width:60%;" class="d-flex">
							<a id="srRqstInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srRqstInfoTab')"
								class="srProgressTableSelectElement srProgressPlan filterTab2 filterTabSelected"
								style="width: 25%; background-color: #edf2f8; color: black;" > 
								<span>SR계획정보</span>
							</a> 
							<a id="srHrInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srHrInfoTab')"
								class="srProgressTableSelectElement srProgressHr filterTab2"
								style="width: 25%"> 
								<span>SR자원정보</span>
							</a> 
							<a id="srPrgrsInfoTab" href="javascript:void(0)"
								onclick="selectSrProgressTableFilter('srPrgrsInfoTab')"
								class="srProgressTableSelectElement srProgressPercentage filterTab2"
								style="width: 25%"> 
								<span>SR진척률</span>
							</a>
							<div style="flex-grow: 1;"></div>
						</div>
					</div>
					<div style="height: 27rem;">
						<!-- SR계획정보 div -->
						<div id="srPlanInfo" class="bottomSubDiv">
							<div style="height: 4rem; display: flex; flex-direction: row;">
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">요청구분</div>
								<div id="srPlanInfoDmnd" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center;  border-top: 1.5px solid #e9ecef;">
									
								</div>
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">업무구분</div>
								<div id="srPlanInfoTask" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center; border-top: 1.5px solid #e9ecef; border-right: 1.5px solid #e9ecef;">
			
								</div>
							</div>
							<div style="height: 4rem; display: flex; flex-direction: row;">
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">처리팀</div>
								<div id="srPlanInfoDept" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center;">
			
								</div>
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">담당자</div>
								<div id="srPlanInfoPic" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center; border-right: 1.5px solid #e9ecef;">
			
								</div>
							</div>
							<div style="height: 4rem; display: flex; flex-direction: row;">
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">목표시작일</div>
								<div id="srPlanInfoBgngDt" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center;">
			
								</div>
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">목표완료일</div>
								<div id="srPlanInfoCmptnDt" style="height: 4rem; width: 35%; padding-left: 0.5rem; display: flex; align-items: center; border-right: 1.5px solid #e9ecef;">
								
								</div>
							</div>
							<div style="height: 4rem; display: flex; flex-direction: row;">
								<div style="height: 4rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">총 계획공수(M/D)</div>
								<div id="srPlanInfoTotalCapacity" style="height: 4rem; width: 85%; padding-left: 0.5rem; display: flex; align-items: center; border-right: 1.5px solid #e9ecef;"">
									
								</div>
							</div>
							<div style="height: 8rem; display: flex; flex-direction: row;">
								<div style="height: 8rem; width: 15%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #edf2f8; font-weight:700;">참고사항</div>
								<div style="height: 8rem; width: 85%; display: flex; flex-direction: column;">
									<div style="height: 8rem; display: flex; flex-direction: row; align-items: center;">
										<div id="srPlanInfoNote" style="height: 8rem; width: 100%; padding: 0.5rem; overflow-y: auto; white-space: pre-line; border-bottom: 1.5px solid #e9ecef; border-right: 1.5px solid #e9ecef;"">
			
										</div>
									</div>
								</div>
							</div>
						</div>
						<!-- SR자원정보 -->
						<div id="srHrInfo" class="bottomSubDiv" style="display: none;">
							<div style="height: 24rem; background-color: #F9FAFE; border: 1.5px solid #e9ecef;">
								<table class="bottomTable" style="width: 100%; text-align: center;">
									<colgroup>
										<col width="4%"/>
										<col width="24%"/>
										<col width="24%"/>
										<col width="24%"/>
										<col width="24%"/>
									</colgroup>
									<thead style="background-color: #edf2f8;">
										<tr style="height: 4rem; font-size: 1.6rem; font-weight: 700;">
											<th scope="col"></th>
											<th scope="col">담당자명</th>
											<th scope="col">역할</th>
											<th scope="col">계획공수(M/D)</th>
											<th scope="col">실적공수(M/D)</th>
										</tr>
									</thead>
									<tbody>
			
									</tbody>
								</table>
							</div>
						</div>
						<!-- SR진척률 -->
						<div id="srProgressInfo" class="bottomSubDiv" style="display: none;">
							<div style="height: 24rem; background-color: #F9FAFE; border: 1.5px solid #e9ecef;">
								<table id="prgrsTable" class="bottomTable" style="width: 100%; text-align: center;">
									<colgroup>
										<col width="20%" />
										<col width="20%" />
										<col width="20%" />
										<col width="20%" />
										<col width="20%" />
									</colgroup>
									<thead style="background-color: #edf2f8;">
										<tr style="height: 4rem; font-size: 1.6rem; font-weight: 700;">
											<th scope="col">작업구분</th>
											<th scope="col">시작일</th>
											<th scope="col">종료일</th>
											<th scope="col">진척률%(누적)</th>
											<th scope="col">산출물</th>
										</tr>
									</thead>
									<tbody>
										<tr
											style="height: 4rem; font-size: 1.6rem; background-color: white;">
											<th>분석</th>
											<td id="srAnalysisBgngDt"></td>
											<td id="srAnalysisCmptnDt"></td>
											<td id="srAnalysisPrgrs"></td>
											<td id="srAnalysisOtptBtn"></td>
										</tr>
										<tr
											style="height: 4rem; font-size: 1.6rem; background-color: white;">
											<th>설계</th>
											<td id="srDesignBgngDt"></td>
											<td id="srDesignCmptnDt"></td>
											<td id="srDesignPrgrs"></td>
											<td id="srDesignOtptBtn"></td>
										</tr>
										<tr
											style="height: 4rem; font-size: 1.6rem; background-color: white;">
											<th>구현</th>
											<td id="srImplBgngDt"></td>
											<td id="srImplCmptnDt"></td>
											<td id="srImplPrgrs"></td>
											<td id="srImplOtptBtn"></td>
										</tr>
										<tr
											style="height: 4rem; font-size: 1.6rem; background-color: white;">
											<th>시험</th>
											<td id="srTestBgngDt"></td>
											<td id="srTestCmptnDt"></td>
											<td id="srTestPrgrs"></td>
											<td id="srTestOtptBtn"></td>
										</tr>
										<tr
											style="height: 4rem; font-size: 1.6rem; background-color: white;">
											<th>반영요청</th>
											<td id="srApplyBgngDt"></td>
											<td id="srApplyCmptnDt"></td>
											<td id="srApplyPrgrs"></td>
											<td id="srApplyOtptBtn"></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>			
		   </div>
					
		<!-- 이관하지 않을 경우 SR 진행현황 -->
    	<div id="progressCircles">
    		<div class=" mt-4 mb-2 p-2" >
    			<div class="d-flex">
    				<div class="pr-1" style="color: #60707f; font-size: 17px; font-weight: bold;">[</div> 
    				<div id="bottomSrRqstNo" style="color: #60707f; font-size: 17px; font-weight: bold;">SR231116_0001</div>   			
    				<div class="pl-1" style="color: #60707f; font-size: 17px; font-weight: bold;">]</div> 
    				<div id="bottomSRTtl" class="pl-2" style="color: #424348; font-size: 17px; font-weight: bold;">FAQ 대표 질문 수정</div>   			  			
    			</div>
				<div style="border-bottom: 2px solid #e1e6ea; margin-top: 10px;"></div>	
			</div>
			
			<div style="margin-top: 50px;">
				<div class="progress-steps d-flex w-100" style="margin-top: 3.88rem;">
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">요청</p>
							<div id="progress_rqst_info" class="" style="width: 10rem; height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_srRqstRegDt"></div>
								<div id="progress_srReqstrNm"></div>
							</div>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">승인대기</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">승인</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">접수대기</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">접수</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">개발중</p>
							<div id="progress_dep_ing_info" class="" style="width: 10rem;  height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_deptNmOrTrnsfInstNm"></div>
								<div id="progress_srTrnsfYn"></div>
							</div>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">테스트</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">완료요청</p>
						</div>
					</div>
					<div class="progress-step">
						<div class="progress-content">
							<div class="inner-circle"></div>
							<p class="mt-3 mb-5">개발완료</p>
							<div id="progress_dep_cmptn_info" class="" style="width: 10rem; height: 10rem; background-color: lightgray; border-radius: 0.5rem; padding: 3rem 0;">
								<div id="progress_srCmptnPrnmntDt"></div>
								<div>예정</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>	
    </div>
  </div>

<!-- 요청등록 모달 -->
<div id="addSrRqst" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">SR 요청 등록</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div id="srRqstBySrRqstNoForm" class="modal-body">
      	<form id="writeSrRqstForPicHome" action="writeSrRqstForPicHome" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<h6 class="modal-sub-title">SR요청등록</h6>
      		<div class="card p-3 mb-4">
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writer" class="form-label">등록자</label>
				          	</div>
				 			<div class="w-45">
					            <input type="text" class="form-control" id="data-usrNm" value="${usr.usrNm}" disabled>
				 			</div>
				            <input type="hidden" id="srReqstrNo" name="srReqstrNo" value="${usr.usrNo}">
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="writerDepartment" class="form-label">소속</label>
					        </div>
					        <div class="w-45">
					          <input type="text" class="form-control" id="writerDepartment" value="${usr.instNm}" disabled>
					        </div>
					    </div>
					</div>
				<div>
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writeDate" class="form-label">등록일</label>
				          	</div>
				 			<div class="w-45">
					            <input type="date" class="form-control" id="writeDate" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="systemName" class="form-label">관련시스템</label>
					        </div>
					        <div class="w-45">
					          <select class="isCheckSrRqstInput form-control" id="sysNo" name="sysNo">
					          	<option>--관련시스템--</option>
					          </select>
					        </div>
					    </div>
					</div>
		        </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR제목</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input type="text" class="isCheckSrRqstInput form-control" id="srTtl" name="srTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input type="text" class="isCheckSrRqstInput form-control" id="srPrps" name="srPrps">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea class="isCheckSrRqstInput form-control" id="srConts" name="srConts"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label modal-input">첨부파일</label>
			        </div>
			        <div style="width: 500px;">
			        	 <input id="file" type="file" name="file" multiple>
			        </div>
			        <div>
			        	<input id="importantChk" type="checkbox" onclick="isImportendChecked()"><span> 중요</span>
			        </div>
			        <input id="srRqstEmrgYn" type="hidden" name="srRqstEmrgYn" value="N">
			    </div>
			</div>
      	</div>
      </div>
      <div class="modal-footer py-1">
        <button class="btn-1" type="submit">저장</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
    </form>
   </div>
  </div>
 </div>
</div>
	
	<!-- 알림 모달 -->
	<div id="alertModalSrRqst" class="modal" data-backdrop="static">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#3d86e5; color:white; display:flex;">
					<i class="material-icons">info</i>
					<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">알림</div>
					<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;"" onclick="alertModalClose()">close</i>
				</div>
				<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
					<div id="alertContentSrRqst" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
						
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- 경고 모달 -->
	<div id="warningModalSrRqst" class="modal" data-backdrop="static">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#d1322e; color:white; display:flex;  justify-content: flex-start;">					
					<i class="material-icons">warning</i>
					<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">경고</div>
					<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;" onclick="warningModalClose()">close</i>
				</div>
				<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
					<div id="warningContentSrRqst" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
						
					</div>
				</div>
			</div>
		</div>
	</div>
		

<!-- sr요청에 해당하는 상세모달 -->
<div id="srRqstBySrNo" class="modal" data-backdrop="static">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h6 class="modal-title">SR 요청 상세</h6>
        <i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
      </div>
      <div class="modal-body">
      	<form id="modifySrRqstForPicHome" action="modifySrRqstForPicHome" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<div class="d-flex">      		
	      		<div>      		
	      			<h6 class="modal-sub-title">SR요청 정보</h6>
	      		</div>
	      		<div class="mr-2 mb-2" style="margin-left: 420px;">
	      			<select class="form-control" style="width:109.13px;" id="srRqstStts-select" name="srRqstSttsNo">
						<option value="" >선택</option>
				    </select>   		
				</div>
	      		<div>      		
		      		<button id="deleteButton" class="delete btn-5" type="button" data-toggle="modal" data-target="#srRqstdeleteModal">삭제</button>
		      		<button id="saveButton" type="button" onclick=" modifySrRqst()" class="btn-1">저장</button>
	      		</div>
      		</div>
      		<div class="card p-3 mb-4">
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writer" class="form-label">등록자</label>
				          	</div>
				 			<div class="w-45">
					            <input id="srRqst-UsrNm" type="text" class="form-control" id="writer" disabled>
					            <input id="srRqst-srRqstNo" type="hidden" class="form-control" name="srRqstNo">
				 			</div>
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="writerDepartment" class="form-label">소속</label>
					        </div>
					        <div class="w-45">
					          <input id="srRqst-instNm" type="text" class="form-control" id="writerDepartment" disabled>
					        </div>
					    </div>
					</div>
				<div>
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="writeDate" class="form-label">등록일</label>
				          	</div>
				 			<div class="w-45">
					            <input type="date" class="form-control" value="" id="srRqst-srRqstRegDt" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">

					        <div class="w-30">
					          <label for="systemName" class="form-label">관련시스템</label>
					        </div>
					        <div class="w-45">
					          <input id="srRqst-sysNm" type="text" class="form-control" id="writerDepartment" disabled>
					        </div>
					    </div>
					</div>
		        </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="srRqst-srTtl" class="form-label" >SR제목</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input id="srRqst-srTtl" type="text" class="modifyPossible form-control" name="srTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="srRqst-srPrps" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input id="srRqst-srPrps" type="text" class="modifyPossible form-control" name="srPrps">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea id="srRqst-srConts" rows="3" class="modifyPossible form-control" id="srContent" name="srContent"></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="srRqstModify form-label modal-input" >첨부파일</label>
			        </div>
			        <div style="width: 500px;">
			          <input type="file" id="file" name="file" disabled multiple>	
			        </div>
			        <div>
			        	<input id="srRqst-importantChk" class="srRqstModify" type="checkbox" onclick="isImportendChecked2()"><span> 중요</span>
			        </div>
			    </div>
			    <div class="d-flex w-100 pt-2">
			    	<div style="width: 113.9px;"></div>
			    	<div id="showSrRqstAtch">
			    	</div>
			    </div>
			</div>
      	</div>
      </div>
    </form>
     <!-- 검토의견 -->
     <div class="card p-3 mb-4">
     	<div class="d-flex w-100 pt-2">
	        <div style="width: 113.9px;">
	          <label for="systemName" class="form-label">검토의견</label>
	        </div>
	        <div style="width: 550.41px;">
	          <textarea id="srRqst-review" rows="3" class="form-control" disabled></textarea>
	        </div>
	    </div>
    </div>

    <!-- SR 상태 변경  -->
    <form id="srRqstSttsUpdate" action="modifySrRqstForPicHome" method="post">    
	    <div class="d-flex">      		
	    	<div>      		
	    		<h6 class="modal-sub-title">SR개발 정보</h6>
	    	</div>
	     	<div class="mr-2 mb-2" style="margin-left: 496px;">
	     		<select class="form-control" style="width:109.13px;" id="srRqstStts-select2" name="srRqstSttsNo">
					<option value="" >선택</option>
			    </select>	
			    <input type="hidden" id="update-srRqstNo" name="srRqstNo">	         		
			</div>
	    	<div>      		
	     		<button id="saveButton2" type="button" class="btn-1" onclick="srRqstSttsUpdate()" data-dismiss="modal">저장</button>
	    	</div>
	     </div>
	 </form>
	 
	 <!-- SR 개발정보 -->
	 <form id="writeOrModifySrForPicHome" action="writeOrModifySrForPicHome" method="post" enctype="multipart/form-data">
	  	 <div class="card p-3 mb-4">
		      <div>
		       	<div class="d-flex">
			        <div class="d-flex w-50 pt-2">
			          	<div class="w-30">			          	
			            	<label for="srPic" class="form-label">개발담당자</label>
			          	</div>
			 			<div class="w-45">
				            <input type="text" class="form-control" value="${usr.usrNm}" disabled>
				            <input type="hidden" class="form-control" id="picUsrNo" name="picUsrNo" value="${usr.usrNo}" >
				            <input id="sr-srRqstNo" type="hidden" class="form-control" name="srRqstNo">
				            <input id="srNo" type="hidden" class="form-control" name="srNo">
			 			</div>
			        </div>
			        <div class="d-flex w-50">
				        <div class="w-30">
				          <label for="writerDepartment" class="form-label">개발부서</label>
				        </div>
				        <div class="w-45">
				          <input type="text" class="form-control" value="${usr.deptNm}" disabled>
				        </div>
				    </div>
				</div>
				<div class="d-flex w-100 pt-2">
				    <div style="width: 113.9px;">
				        <label for="srTrnsfYn" class="form-label">이관여부</label>
				    </div>
				    <div class="d-flex" style="width: 550.41px;">
				        <div>				        
					        <input id="srTrnsfYn_Y" class="srInput" type="radio" name="srTrnsfYn" value="Y">
					        <label for="srTrnsfYn_Y">이관신청</label>
				        </div>
						<div class="ml-2">						
					        <input id="srTrnsfYn_N" class="srInput" type="radio" name="srTrnsfYn" value="N">
					        <label for="srTrnsfYn_N">자체개발</label>
						</div>
				    	<div id="srTrnsf-info" class="text-danger ml-2 pt-2" style="font-size:10px;">(이관 신청을 할 경우 이관기관, 소요예산, 요청구분은 필수적으로 작성해주세요.)</div>
				    </div>
				</div>
				<div>
			      	<div>
			        	<div class="d-flex">
					        <div class="d-flex w-50 pt-2">
					          	<div class="w-30">			          	
					            	<label for="srPic" class="form-label">이관기관</label>
					          	</div>
					 			<div class="w-45">
						            <select id="trnsf-srinst" class="srTrnsfYn_Y srInput form-control" name="srTrnsfInstNo">
						 				<option value="" >--이관기관 선택--</option>
						 				<c:forEach items="${instByOutsrcYList}" var="inst">					 				
											<option id="${inst.instNm}" value="${inst.instNo}" >${inst.instNm}</option>
						 				</c:forEach>
								    </select>	
					 			</div>
					        </div>
					        <div class="d-flex w-50">
						        <div class="w-30">
						          <label for="writerDepartment" class="form-label">소요예산</label>
						        </div>
						        <div class="w-45">
						          <input id="trnsf-srReqBgt" type="text" class="srTrnsfYn_Y srInput form-control" name="srReqBgt">
						        </div>
						    </div>
						</div>
						<div>
					      <div>
				        	<div class="d-flex">
						        <div class="d-flex w-50 pt-2">
						          	<div class="w-30">			          	
						            	<label for="writeDate" class="form-label">요청구분</label>
						          	</div>
						 			<div class="w-45">
							            <select class="srTrnsfYn_Y srInput form-control" id="trnsf-srDmndClsf" name="srDmndNo">
											<option value="" >--요청구분 선택--</option>
											<c:forEach items="${srDmndClsfList}" var="srDmndClsf">					 				
												<option id="${srDmndClsf.srDmndNm}" value="${srDmndClsf.srDmndNo}" >${srDmndClsf.srDmndNm}</option>
							 				</c:forEach>
								    	</select>
						 			</div>
						        </div>
						        <div class="d-flex w-50">
		
							        <div class="w-30">
							          <label for="systemName" class="form-label">업무구분</label>
							        </div>
							        <div class="w-45">
							        	<select class="srInput form-control" id="srTaskNo" name="srTaskNo">
											<option value="" >--업무구분 선택--</option>
											<c:forEach items="${srTaskClsfList}" var="srTaskClsf">					 				
												<option id="${srTaskClsf.srTaskNm}" value="${srTaskClsf.srTaskNo}" >${srTaskClsf.srTaskNm}</option>
							 				</c:forEach>
								    	</select>
							        </div>
							    </div>
							</div>
					       </div>
			       		   <div>
					        	<div class="d-flex">
							        <div class="d-flex w-50 pt-2">
							          	<div class="w-30">			          	
							            	<label for="writeDate" class="form-label">우선순위</label>
							          	</div>
							 			<div class="w-45">
								            <select class="srInput form-control" id="srPri" name="srPri">
												<option value="" >--우선순위 선택--</option>
												<option value="상" >상</option>
												<option value="중" >중</option>
												<option value="하" >하</option>
								    		</select>
							 			</div>
							        </div>
							        <div class="d-flex w-50">
								        <div class="w-30">
								          <label for="systemName" class="form-label">완료예정일</label>
								        </div>
								        <div class="w-45">
								          <input id="srCmptnPrnmntDt" type="date" class="srInput form-control" name="srCmptnPrnmntDt" >
								        </div>
								    </div>
								</div>
					        </div>
			       		   <div id="srSchdlChgRqstY">
					        	<div class="d-flex">
							        <div class="d-flex w-50 pt-2"></div>
							        <div class="d-flex w-50 pt-2">
							       		<div class="w-30">
								          <label for="systemName" class="form-label" style="color: #de483a">변경요청일</label>
								        </div>
								        <div class="w-45">
								          <input id="srSchdlChgRqstDt" type="date" class="srInput form-control">
								        </div>
							        </div>
								</div>
					        </div>
			       		   <div id="srSchdlChgRqstAprvYn">
					        	<div class="d-flex">
							        <div class="d-flex w-50 pt-2"></div>
							        <div class="d-flex w-50 pt-2">
							       		<div>				        
									        <input id="srSchdlChgAprvY" class="srInput" type="radio" name="srSchdlChgRqstAprvYn" value="Y">
									        <label for="srSchdlChgAprvY">변경 요청 승인</label>
								        </div>
										<div class="ml-2">						
									        <input id="srSchdlChgAprvN" class="srInput" type="radio" name="srSchdlChgRqstAprvYn" value="N">
									        <label for="srSchdlChgAprvN">변경 요청 반려</label>
										</div>
							        </div>
								</div>
					        </div>
					        <div class="d-flex w-100 pt-2">
						        <div style="width: 113.9px;">
						          <label for="systemName" class="form-label">개발내용</label>
						        </div>
						        <div style="width: 550.41px;">
						          <textarea id="srDvlConts" class="srInput form-control" rows="3" name="srDvlConts"></textarea>
						        </div>
						    </div>
					        <div class="d-flex w-100 pt-2">
						        <div style="width: 113.9px;">
						          <label for="systemName" class="form-label modal-input">첨부파일</label>
						        </div>
						        <div style="width: 500px;">
						          <input type="file" id="file" class="srInput" name=file multiple>	
						        </div>
						    </div>
						    <div class="d-flex w-100 pt-2">
						    	<div style="width: 113.9px;"></div>
						    	<div id="showSrAtch">
						    	</div>
						    </div>
				        </div>
		   			</div>
		  		</div>
	    	</div>
	  	</div>
	  	 <div class="modal-footer py-1">
        <button id="srWriteOrModifyBtn" type="button" onclick="writeOrModifySrForPicHome()" class="btn-1" style="font-size: 1.3rem;">SR정보 등록</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
	 </form>
</div>

<!-- 요청 삭제 모달 -->  
<div class="modal" id="srRqstdeleteModal">
	  <div class="modal-dialog">
		  <div class="modal-content">
		      <!-- Modal Header -->
		      <div class="modal-header"  style="background-color: white;">
		        <h6 class="modal-title"  style="color: black; font-weight: bold;">SR요청 삭제</h6>
		        <button type="button" class="close" data-dismiss="modal">&times;</button>
		      </div>
		
		      <!-- Modal body -->
		      <div class="modal-body" style="font-size: 1.3rem;">
		        	해당 SR요청을 정말로 삭제하겠습니까 ?
		      </div>
		
		      <!-- Modal footer -->
		      <div class="modal-footer">
		        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removeSrRqst()">확인</button>
		        <button type="button" class="btn" style="background-color: #de483a; color: white;" data-dismiss="modal">취소</button>
		      </div>
			</div>
		</div>
	</div>
  
    <!-- 알림 모달 -->
	<div id="alertModal" class="modal" data-backdrop="static">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#3d86e5; color:white; display:flex;">
					<i class="material-icons">info</i>
					<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">알림</div>
					<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;"" onclick="alertModalClose()">close</i>
				</div>
				<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
					<div id="alertContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
						
					</div>
				</div>
			</div>
		</div>
	</div>
	
	<!-- 경고 모달 -->
	<div id="warningModal" class="modal" data-backdrop="static">
		<div class="modal-dialog modal-dialog-centered modal-sm">
			<div class="modal-content">
				<div class="modal-header" style="background-color:#d1322e; color:white; display:flex;  justify-content: flex-start;">					
					<i class="material-icons">warning</i>
					<div class="modal-title pl-2" style="font-size:2rem; font-weight:700;">경고</div>
					<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer; padding-left: 180px;" onclick="warningModalClose()">close</i>
				</div>
				<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
					<div id="warningContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
						
					</div>
				</div>
			</div>
		</div>
	</div>


<%@ include file="/WEB-INF/views/common/footer.jsp"%>