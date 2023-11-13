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
			   	  	<span class="pt-1">나의 할일</span>
			   	  	<div id="requestAddBtnWrap">
						<button id="requestAddBtn" data-toggle="modal" data-target="#addSrRqst" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" style="margin-left: 1180px;" onclick="showSysByDeptNo('${usr.deptNo}')">
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
		   	  			<div id="" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>처리 항목</div>
			   	  			<div id="" class="m-1"></div>
		   	  			</div>
		   	  			
		   	  		</div>
		   	  	</div>
		   	  <table id="mainTable" style="width: 100%; text-align: center; height: 27rem;">
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
			 	  	<span class="pt-1">처리 항목</span>
		 	 	</div>
			   <!-- 처리할 항목 -->
				<div id="toDoItemContends">
					<div class="subcontentTitle pt-1" style="padding-left: 19px;color: #5d6e7e;">
				   		나의 처리할 항목
				   	</div>
				 	<div class="d-flex justify-content-left">
					 	<div class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">미승인 SR요청</div>
							<div class="d-flex justify-content-center">
								<div class="w-50 mt-2"> 								
									<div class="toDoItemNm" style="margin-left: 3px; margin-right: 2px;">요청</div>
									<div style="text-align: center;"><span style="padding-right:2px; padding-left:5px; font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
								<div class="w-50 mt-2">								
									<div class="toDoItemNm"  style="margin-left: 2px; margin-right: 3px;">승인재검토</div>
									<div style="text-align: center;"><span style="padding-right:2px;font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
							</div>
						</div>
						<div class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">개발계획 작성 필요 SR요청</div>
							<div class="d-flex justify-content-center">
								<div class="w-50 mt-2"> 								
									<div class="toDoItemNm" style="margin-left: 3px; margin-right: 2px;">승인</div>
									<div style="text-align: center;"><span style="padding-right:2px; padding-left:5px; font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
								<div class="w-50 mt-2">								
									<div class="toDoItemNm"  style="margin-left: 2px; margin-right: 3px;">접수재검토</div>
									<div style="text-align: center;"><span style="padding-right:2px;font-size: 24px; color: #2278e7;">0</span>건</div>
								</div>
							</div>
						</div>
				 	</div>
				 	<div class="d-flex justify-content-left">
					 	<div class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">접수된 SR</div>
							<div style="text-align: center;"><span style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
						<div class="toDoItem"  style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">이관된 SR</div>
							<div style="text-align: center;"><span style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
				 	</div>
				 	<div class="d-flex">
					 	<div class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">개발 반영 요청</div>
							<div style="text-align: center;"><span style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
						<div class="toDoItem" style="width: 100%; margin-right: 0.5rem;">
							<div class="pt-1" style="color: #36404a; text-align: center;">계획 변경 요청</div>
							<div style="text-align: center;"><span style="padding-right:2px;font-size: 40px; color: #2278e7;">0</span>건</div>
						</div>
				 	</div>
				</div>
			 </div>
	    </div>
	    
	   <!-- SR 진행 현황 -->
	   <div class="potalBottom section shadow w-70">
			<div class="subcontentTitle">
		 		<div class="d-flex st-ct">
			 	  	<i class="material-icons stt-ic">chevron_right</i>
			 	  	<span class="pt-1">SR 진행 현황</span>
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
      	<form id="writeSrRqst" action="writeSrRqst" method="post" onsubmit="onsubmit()" enctype="multipart/form-data">
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
					          <select class="form-control" id="sysNo" name="sysNo">
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
			          <input type="text" class="form-control" id="srTtl" name="srTtl">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input type="text" class="form-control" id="srPrps" name="srPrps">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea class="form-control" id="srConts" name="srConts"></textarea>
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
        <button type="submit" class="btn-1">저장</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
    </form>
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
		      		<button id="deleteButton" class="btn-5" type="button" data-toggle="modal" data-target="#srRqstdeleteModal">삭제</button>
		      		<button id="saveButton" type="button" onclick="modifySrRqst()" class="btn-1">저장</button>
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
					          <input id="srRqst-inst" type="text" class="form-control" id="writerDepartment" disabled>
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
				          <input id="srRqst-inst" type="text" class="form-control" value="${usr.deptNm}" disabled>
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
        <button id="srWriteOrModifyBtn" type="button" onclick="writeOrModifySrForPicHome()" class="btn-1">SR정보 등록</button>
        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
      </div>
	 </form>
</div>

<!-- 요청 삭제 모달 -->  
<div class="modal" id="srRqstdeleteModal">
  <div class="modal-dialog">
	  <div class="modal-content">
	      <!-- Modal Header -->
	      <div class="modal-header" style="background-color: #de483a;">
	        <h6 class="modal-title">sr요청 삭제</h6>
	      </div>
	
	      <!-- Modal body -->
	      <div class="modal-body">
	        	해당 sr요청을 정말로 삭제하겠습니까 ?
	      </div>
	
	      <!-- Modal footer -->
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removeSrRqst()">확인</button>
	        <button type="button" class="btn" style="background-color: #de483a; color: white;" onclick="cancelBtnForDeleteModal()">취소</button>
	      </div>
		</div>
	</div>
</div>

<!-- 요청 수정 모달 -->  
<div class="modal" id="srRqstModyfyModal">
  <div class="modal-dialog">
	  <div class="modal-content">
	      <!-- Modal Header -->
	      <div class="modal-header" style="background-color: #2c7be4;">
	        <h6 class="modal-title">sr요청 수정</h6>
	      </div>
	
	      <!-- Modal body -->
	      <div class="modal-body">
	        	해당 sr요청을 다음과 같이 변경하시겠습니까 ?
	      </div>
	
	      <!-- Modal footer -->
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="confirmSrRqstModify()" >확인</button>
	        <button type="button" class="btn" style="background-color: #de483a; color: white;" onclick="cancelBtnForModifyModal2()">취소</button>
	      </div>
		</div>
	</div>
</div>

<!-- sr 수정 모달 -->  
<div class="modal" id="srModyfyModal">
  <div class="modal-dialog">
	  <div class="modal-content">
	      <!-- Modal Header -->
	      <div class="modal-header" style="background-color: #2c7be4;">
	        <h6 class="modal-title">sr개발 정보 수정</h6>
	      </div>
	
	      <!-- Modal body -->
	      <div class="modal-body">
	        	해당 sr개발 정보를 다음과 같이 변경하시겠습니까 ?
	      </div>
	
	      <!-- Modal footer -->
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="proceedWriteOrModifySrForPicHome()" >확인</button>
	        <button type="button" class="btn" style="background-color: #de483a; color: white;" onclick="cancelBtnForModifyModal3()">취소</button>
	      </div>
		</div>
	</div>
</div>


<%@ include file="/WEB-INF/views/common/footer.jsp"%>