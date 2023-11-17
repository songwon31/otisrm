<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
	<!-- 렌더링(사용자에게 보여주기 위한 시각화) 요소가 아니고, 브라우저에 제공되는 추가 정보 -->
	<head>
	  <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="${pageContext.request.contextPath}/resources/images/logo.png" type="image/x-icon">
      <title>OtiSRM</title>
      
      <!-- Bootstrap을 사용하기 위한 외부 라이브러리 가져오기 -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   	  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
      <script src="${pageContext.request.contextPath}/resources/javascript/common/login.js"></script>
      
      <!-- loading-overlay를 사용하기 위한 라이브러리 -->
      <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
	  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/header/login.css"/>
	</head>
	
	<body>
	
		<!-- 아이디/비밀번호 찾기 모달 -->
		<div class="modal fade" id="findMyIdOrPswdModal" data-backdrop="false">
		    <div class="modal-dialog modal-lg">
		      <div class="modal-content">
		      
		        <!-- Modal Header -->
		        <div class="modal-header" style="background-color: #f9fafe;">
		          <h6 class="modal-title" style="font-weight: bold; color: #33414e;">아이디/비밀번호 찾기</h6>
		          <button type="button" class="close" data-dismiss="modal" style="padding-left: 540px;">×</button>
		        </div>
		        
		        <!-- Modal body -->
		        <div class="modal-body">
					<p class="title">계정정보 찾기</p>
					  <!-- Nav tabs -->
					  <ul class="nav nav-tabs">
					    <li class="nav-item">
					      <a class="nav-link active" href="#findId">아이디 찾기</a>
					    </li>
					    <li class="nav-item">
					      <a class="nav-link" href="#findPswd">비밀번호 찾기</a>
					    </li>
					  </ul>
					
					  <!-- Tab panes -->
					  <div class="tab-content">
					    <div id="findId" class="container tab-pane active"><br>
					    	<form id="findIdForm" action="login/getMyid" method="post" >

						      <table class="find-id-table">
					          	<tbody>
						            <tr>
						                <th scope="row">이름</th>
						                <td>
						                    <input id="id-usrNm" class="find-input" name="usrNm" type="text" data-err-target="find-id-auth-send-msg__fail-name" style="width: 170px;" data-err-msg="이름을 입력해주세요.">
						                </td>
						            </tr>
						            <tr>
						                <th scope="row">등록한 이메일 주소</th>
						                <td>
						                    <input id="id-usrEml" class="usrEml find-input" id="find-id-phone-tf" type="text" style="width: 170px;" name="usrEml">
						
						                    <button class="btn btn-primary" style="width: 100px; height: 27px; font-size: 12px;" type="button" onclick="findMyId()">인증확인</button>
						                    <span id="emailErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일을 입력해주세요.</span>
											<span id="emailErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일 형식으로 입력해주세요.</span>
											<span id="emailErr3" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">등록된 이메일 정보가 아닙니다.</span>
						                </td>
						            </tr>
					              </tbody>
					        	</table>
					    	</form>
					    </div>
					    <div id="findPswd" class="container tab-pane fade"><br>
					    	<ul class="find-password-notice">
				                <li style="font-size: 12px;">비밀번호의 경우 <strong>암호화</strong> 저장되어 분실 시 찾아드릴 수 없는 정보 입니다.</li>
				                <li style="font-size: 12px;"><strong>본인 확인</strong>을 통해 비밀번호를 재설정 하실 수 있습니다.</li>
				            </ul>
				            <div id="chgPswd">
					    		<form id="chgPswdForm" action="login/getUsrNoforChgPswd" method="post">
							      <table class="find-id-table">
						          	<tbody>
							           <tr>
							           		<th scope="row">아이디</th>
							                <td>
							                    <input id="pswd-usrId" name="usrId" class="find-input" type="text" style="width: 170px;">
							                </td>
							             </tr>
							             <tr>
							                <th scope="row">등록한 이메일 주소</th>
							                <td>
							                    <input id="pswd-usrEml" name="usrEml" class="usrEml find-input" type="text" >
							                    <button class="btn btn-primary" style="width: 100px; height: 27px; font-size: 12px;" type="button"  onclick="findUsrNoforChgPswd()">인증확인</button>
							                    <div>
								                    <span id="emailErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일을 입력해주세요.</span>
													<span id="emailErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일 형식으로 입력해주세요.</span>
													<span id="emailErr3" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">등록된 이메일 정보가 아닙니다.</span>
							                    </div>
							                    <div class="find-id-auth-form" style="display: none;">
							 
							                    </div>
							                </td>
							             </tr>
						              </tbody>
						        	</table>
					    		</form>
					  		</div>
					  	</div>
		       		 </div>
		     	 </div>
	    	</div>
		</div>
	</div>
		
		<div id="id01" class="madal" width="30%">
			<input type="hidden" id="modifyMsg" value="${msg}">	
			<form id="login" name="login" action="login" onsubmit="checkValidation()" class="id-modal-content modal-content animate" method="post">
			  <div class="container d-flex justify-content-center">
				  <div>
				    <img id="login-logo" src="${pageContext.request.contextPath}/resources/images/logo.png" width="30">
				  </div>
			  	  <div>
			  	  	<h6 class="title">SRM 시스템 로그인</h6>
			  	  </div>
			  </div>
			
			  <div class="container">
			  	<div class="input-fields">			  					  	
				    <div class="d-flex justify-content-center">			    
				    	<label id="usrId" class="mr-3" for="usrId"><b>ID</b></label>
				    	<input id="usrId" value="${login.usrId}" type="text" placeholder="아이디를 입력해주세요" name="usrId">

				    </div>					
					<c:if test="${error1 != null}">
						<div id="usrIdErr1" class="errorMsg text-danger small" style="margin-left:70px; font-family: dotum,sans-serif;
    						  font-size: 12px;">${error1}
    				    </div>
					</c:if>
					<c:if test="${error2 != null}">
						<div id="usrIdErr2" class="errorMsg text-danger small" style="margin-left:70px; font-family: dotum,sans-serif;
    						  font-size: 12px;">${error2}
    				    </div>
					</c:if>
					<div class="d-flex justify-content-center">				
				    	<label class="mr-2" for="usrPswd"><b>PW</b></label>			    				    	
				    	<input id="usrPswd" value="${login.usrPswd}" type="password" placeholder="비밀번호를 입력해주세요" name="usrPswd">
						<span style="position: relative;">
							<img id="eye" onclick="blink()" src ="${pageContext.request.contextPath}/resources/images/eye.JPG" width="30">
						</span> 
					</div>
			  	</div>
		  		<div id="usrPswdErr1" class="errorMsg text-danger d-none small" style="margin-left:70px; font-family: dotum,sans-serif; font-size: 12px;">비밀번호를 입력해주세요.</div>
				<div id="usrPswdErr2" class="errorMsg text-danger d-none small" style="margin-left:70px; font-family: dotum,sans-serif; font-size: 12px;">비밀번호를 형식에 맞게 입력해주세요.</div>
   				<c:if test="${error3 != null}">
					<div id="usrPswdErr3" class="errorMsg text-danger small" style="margin-left:70px; font-family: dotum,sans-serif;
   						  font-size: 12px;">${error3}
   				    </div>
				</c:if>
			    <div class="d-flex">			    
					<div id="find-container" class="find-container">
					  <label id="saveId">
					    <input type="checkbox" checked="checked" name="remember">아이디 저장
					  </label>
					  <span class="findIdOrPsw d-felx justify-content-end"><a id="findMyIdOrPswd" href="javascript:modalShow()">아이디/비밀번호 찾기</a></span>
					</div>
			    </div>
				<div class="button-container">
			   		<button id="login_btn" class="btn btn-primary" type="submit">로그인</button>
			   		<a id="join-btn" class="btn btn-outline-primary" href="${pageContext.request.contextPath}/join/join" target="_blank">회원가입</a>
				</div>
			  </div>
			</form>
		
	</body>
</html>