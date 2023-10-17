<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

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
      
      <!-- loading-overlay를 사용하기 위한 라이브러리 -->
      <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
	  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/header/login.css"/>
	</head>
	
	<body>
		<div id="id01" class="madal" width="30%">	
			<form class="modal-content animate" action="action_page.php" method="post">
			  <div class="container d-flex justify-content-center">
				  <div>
				    <img id="login-logo" src="${pageContext.request.contextPath}/resources/images/logo.png" width="30">
				  </div>
			  	  <div>
			  	  	<h6 id="title">SRM 시스템 로그인</h6>
			  	  </div>
			  </div>
			
			  <div class="container">
			  	<div class="input-fields">			  					  	
				    <div class="d-flex justify-content-center">			    
				    	<label id="id" class="mr-2" for="userID"><b>ID</b></label>
				    	<input type="text" placeholder="아이디를 입력해주세요" name="uname" required>
				    </div>					
					<div class="d-flex justify-content-center">				
				    	<label class="mr-2" for="userPwd"><b>PW</b></label>
				    	<input type="password" placeholder="비밀번호를 입력해주세요" name="psw" required>
					</div>
			  	</div>
			    <div class="d-flex">			    
				    <label>
				      <input type="checkbox" checked="checked" name="remember">아이디 저장
				    </label>
					<div class="container">
					  <span class="findIdOrPsw d-felx justify-content-end"><a href="#">아이디/비밀번호 찾기</a></span>
					</div>
			    </div>
				<div class="button-container">
			   		<button class="btn btn-success" type="submit">로그인</button>
			   		<button class="btn btn-outline-success" href="${pageContext.request.contextPath}/common/join">회원가입</button>
				</div>
			  </div>
			
			</form>
		</div>
	</body>
</html>