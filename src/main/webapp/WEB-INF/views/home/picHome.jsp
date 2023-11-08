<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<script src="${pageContext.request.contextPath}/resources/javascript/home/picHome.js"></script>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/picHome.css" />
<div id="customerHomeDiv" class="contentDiv shadow">
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
		   <div class="potalTop section shadow w-70">
		   	  <div class="subcontentTitle">
			   	  <div class="d-flex st-ct">
			   	  	<i class="material-icons stt-ic">chevron_right</i>
			   	  	<span class="pt-1">나의 할일</span>
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
		   	  			<div id="APRV" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>승인</div>
		   	  				<div id="numOfAprv" class="pb-1"></div>
		   	  			</div>
		   	  			<div id="RCPT_WAIT" class="filterTab d-flex justify-content-center align-items-center">
		   	  				<div>접수대기</div>
		   	  				<div id="numOfRcptWait" class="pb-1"></div>
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
		   	  			<div id="DEP_CMPTN" class="filterTab d-flex justify-content-center align-items-center">
			   	  			<div>개발완료</div>
			   	  			<div id="numOfDepCmptn" class="m-1"></div>
		   	  			</div>
		   	  			<div id="requestAddBtnWrap" class="d-flex flex-row-reverse align-items-end">
							<button id="requestAddBtn" data-toggle="modal" data-target="#addSrRqst" class="btn-1 d-inline-flex flex-row align-items-center justify-content-center mb-1" onclick="showSysByDeptNo('${usr.deptNo}')">
								요청 등록
							</button>
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
				<div  id="pagination-container" class="paging d-flex justify-content-center">
					<!-- 비동기로 페이징 들어오는 곳 -->	
			    </div>	
		   	  </div>
		    </div>
		    <div class="potalTop section shadow w-30">
		   	</div>
	   </div>
   </div>
   
    
<div class="potalBottom section shadow">
	<div class="subcontentTitle">
 		<div class="d-flex st-ct">
	 	  	<i class="material-icons stt-ic">chevron_right</i>
	 	  	<span class="pt-1">게시판</span>
 	 	</div>
	 </div>
   	  <div class="st-ct">
	   	  <div class="subcontentTitle pt-1" style="width: 48%; padding-left: 19px;color: #5d6e7e;">
	   	  	SR 진행 현황
	   	  </div>
   	  </div>
   	  <div class="d-flex">
	   	 
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
      	<form id="writeSrRqst" action="writeSrRqst" method="post" enctype="multipart/form-data">
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
        <button class="btn-1">저장</button>
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
      	<form id="modifySrRqst" action="modifySrRqst" method="post" enctype="multipart/form-data">
      		<!-- SR요청정보 -->
      		<div class="d-flex">      		
	      		<div>      		
	      			<h6 class="modal-sub-title">SR요청 정보</h6>
	      		</div>
	      		<div class="mr-2 mb-2" style="margin-left: 420px;">
	      			<select class="form-control" style="width:109.13px;" id="srRqstStts-select" name="status" disabled>
						<option value="" >전체</option>
				    </select>	      		
				</div>
	      		<div>      		
		      		<button id="deleteButton" class="btn-5" type="button" data-toggle="modal" data-target="#srRqstdeleteModal">삭제</button>
		      		<button id="saveButton" type="button" class="btn-1" data-dismiss="modal">저장</button>
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
			          <input id="srRqst-srTtl" type="text" class="form-control">
			          <input id="srRqst-srRqstNo" type="hidden" class="form-control">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="srRqst-srPrps" class="form-label">관련근거/목적</label>
			        </div>
			        <div style="width: 550.41px;">
			          <input id="srRqst-srPrps" type="text" class="form-control">
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label">SR 내용</label>
			        </div>
			        <div style="width: 550.41px;">
			          <textarea id="srRqst-srConts" class="form-control" id="srContent" disabled></textarea>
			        </div>
			    </div>
		        <div class="d-flex w-100 pt-2">
			        <div style="width: 113.9px;">
			          <label for="systemName" class="form-label modal-input" >첨부파일</label>
			        </div>
			        <div style="width: 500px;">
			          <input type="file" id="file" name="file" disabled multiple>	
			        </div>
			        <div>
			        	<input id="srRqst-importantChk" type="checkbox" onclick="isImportendChecked2()"><span> 중요</span>
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
	          <textarea id="srRqst-review" class="form-control" id="srRqstRvwRsn" disabled></textarea>
	        </div>
	    </div>
    </div>
    <form>
      <!-- SR개발 정보  -->
      <h6 class="modal-sub-title">SR개발 정보</h6>
  	  <div class="card p-3 mb-4">
	      <div>
	       	<div class="d-flex">
		        <div class="d-flex w-50 pt-2">
		          	<div class="w-30">			          	
		            	<label for="srPic" class="form-label">개발담당자</label>
		          	</div>
		 			<div class="w-45">
			            <input id="sr-srPic" type="text" class="form-control" id="srPic" value="${usr.usrNm}" disabled>
		 			</div>
		        </div>
		        <div class="d-flex w-50">
			        <div class="w-30">
			          <label for="writerDepartment" class="form-label">개발부서</label>
			        </div>
			        <div class="w-45">
			          <input id="srRqst-inst" type="text" class="form-control" id="writerDepartment" value="${usr.deptNm}" disabled>
			        </div>
			    </div>
			</div>
			<div>
		      	<div>
		        	<div class="d-flex">
				        <div class="d-flex w-50 pt-2">
				          	<div class="w-30">			          	
				            	<label for="srPic" class="form-label">업무구분</label>
				          	</div>
				 			<div class="w-45">
					            <input id="sr-srPic" type="text" class="form-control" id="srPic" disabled>
				 			</div>
				        </div>
				        <div class="d-flex w-50">
					        <div class="w-30">
					          <label for="writerDepartment" class="form-label">우선순위</label>
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
					            	<label for="writeDate" class="form-label">이관여부</label>
					          	</div>
					 			<div class="w-45">
						            <input type="text" class="form-control" value="" id="srTrnsfYn" disabled>
					 			</div>
					        </div>
					        <div class="d-flex w-50">
	
						        <div class="w-30">
						          <label for="systemName" class="form-label">이관기관</label>
						        </div>
						        <div class="w-45">
						          <input id="srRqst-sysNm" type="text" class="form-control" id="writerDepartment" disabled>
						        </div>
						    </div>
						</div>
				       </div>
		       		   <div>
				        	<div class="d-flex">
						        <div class="d-flex w-50 pt-2">
						          	<div class="w-30">			          	
						            	<label for="writeDate" class="form-label">소요예산</label>
						          	</div>
						 			<div class="w-45">
							            <input type="text" class="form-control" value="" id="srReqBgt" disabled>
						 			</div>
						        </div>
						        <div class="d-flex w-50">
		
							        <div class="w-30">
							          <label for="systemName" class="form-label">완료예정일</label>
							        </div>
							        <div class="w-45">
							          <input id="srRqst-sysNm" type="date" class="form-control" id="srCmptnPrnmntDt" disabled>
							        </div>
							    </div>
							</div>
				        </div>
				        <div class="d-flex w-100 pt-2">
					        <div style="width: 113.9px;">
					          <label for="systemName" class="form-label">개발내용</label>
					        </div>
					        <div style="width: 550.41px;">
					          <textarea id="srRqst-srConts" class="form-control" id="srContent"></textarea>
					        </div>
					    </div>
				        <div class="d-flex w-100 pt-2">
					        <div style="width: 113.9px;">
					          <label for="systemName" class="form-label modal-input">첨부파일</label>
					        </div>
					        <div style="width: 500px;">
					          <input type="file" id="file" name=file multiple>	
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
	        <div class="modal-footer py-1">7
		        <button id="saveButton" class="btn-1" type="button" >저장</button>
		        <button type="button" class="btn-3" data-dismiss="modal">닫기</button>
	        </div>
    	</div>
  	</div>
 </form>
</div>

<!-- 요청 삭제 모달 -->  
<div class="modal" id="srRqstdeleteModal">
  <div class="modal-dialog">
	  <div class="modal-content">
	      <!-- Modal Header -->
	      <div class="modal-header"  style="background-color: white;">
	        <h6 class="modal-title"  style="color: black;">sr요청 삭제</h6>
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	      </div>
	
	      <!-- Modal body -->
	      <div class="modal-body">
	        	해당 sr요청을 정말로 삭제하겠습니까 ?
	      </div>
	
	      <!-- Modal footer -->
	      <div class="modal-footer">
	        <button type="button" class="btn btn-primary" data-dismiss="modal" onclick="removeSrRqst()">확인</button>
	        <button type="button" class="btn" style="background-color: #de483a; color: white;" data-dismiss="modal">취소</button>
	      </div>
		</div>
	</div>
</div>





<%@ include file="/WEB-INF/views/common/footer.jsp"%>