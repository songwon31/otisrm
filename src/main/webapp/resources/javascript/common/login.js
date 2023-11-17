$(init)

function init() {

   
}

//아이디/비밀번호 찾기 탭
$(document).ready(function(){
	  $(".nav-tabs a").click(function(){
	    $(this).tab('show');
	  });
	  
	  $("#findMyIdOrPswd").click(function(){
		  $("#findMyIdOrPswdModal").modal();
	  });
	  
});

//비밀번호 숫자로 변환
function blink() {
	var click = document.getElementById('eye');
	var usrPswdType = document.getElementById("usrPswd").getAttribute("type");
	if(click.src.match("eyeb")) {
		click.src = "/otisrm/resources/images/eye.JPG";
	} else {
		click.src = "/otisrm/resources/images/eyeb.JPG";
	}
	if(usrPswdType === "password"){
	    document.getElementById("usrPswd").setAttribute("type", "text");
	}else if(usrPswdType === "text"){
	    document.getElementById("usrPswd").setAttribute("type", "password");
	}
}

//아이디 찾기 폼 제출
function findMyId() {
	console.log("제출 실행!")
	$.ajax({
    url: "login/getMyid",
    data: {
    	usrNm: $("#id-usrNm").val(),
		usrEml: $("#id-usrEml").val()
    },
    method: "POST",
    success: function(data) {
      html="";
      console.log(data);
      if(data === "fail"){
			 html += '<div class="result-div">';
			 html += '	<div class="resultConts">일치하는 회원정보가 없습니다.</div>';
			 html += '	<div style="text-align: center; font-size: 14px;">입력하신 정보를 다시 확인해주세요.</div>';
			 html += '	<div onclick="returnTable()" class="btn btn-sm btn-primary" style="width: 100px; margin-left: 200px; margin-top:5px; font-size: 14px;">확인</div>';
			 html += '</div>';
	  }else{		  
		  html += '<div class="result-div">';
		  html += '	<div class="resultConts">' + $("#id-usrNm").val() + ' 회원님의 아이디 입니다.</div>';
		  html += '	<div class="resultInfo">' + data + '</div>';
		  html += '</div>';
	  }
      $("#findId").html(html);
    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//일치하는 계정 정보가 없을때 확인 버튼 초기화
function returnTable(){
	html="";
	html += '<form id="findIdForm" action="login/getMyid" method="post" >';
	html += '	<table class="find-id-table">';
	html += '		<tbody>';
	html += '			<tr>';
	html += '				<th scope="row">이름</th>';
	html += '				<td>';
	html += '					<input id="id-usrNm" class="find-input" name="usrNm" type="text" style="width: 170px;" data-err-msg="이름을 입력해주세요.">';
	html += '					<span id="nmErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이름을 입력해주세요.</span>';
	html += '				</td>';
	html += '			</tr>';
	html += '			<tr>';
	html += '				<th scope="row">등록한 이메일 주소</th>';
	html += '				<td>';
	html += '					<input id="id-usrEml" class="find-input" id="find-id-phone-tf" type="text" style="width: 170px;" name="usrEml">';
	html += '					<button class="btn btn-primary" style="width: 100px; height: 27px; font-size: 12px;" type="button" onclick="findMyId()">인증확인</button>';
	html += '					<div>';
	html += '						<span id="emailErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일을 입력해주세요.</span>';
	html += '						<span id="emailErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일 형식으로 입력해주세요.</span>';
	html += '						<span id="emailErr3" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">등록된 이메일 정보가 아닙니다.</span>';
	html += '					<div>';
	html += '				</td>';
	html += '			</tr>';
	html += '		</tbody>';
	html += '	</table>';
	html += '</form>';
	
	$("#findId").html(html);
}
//일치하는 계정 정보가 없을때 확인 버튼 초기화
function returnTable2(){
	html="";
	html="";
	html += '<form id="chgPswdForm" action="login/getUsrNoforChgPswd" method="post" >';
	html += '	<table class="find-id-table">';
	html += '		<tbody>';
	html += '			<tr>';
	html += '				<th scope="row">아이디</th>';
	html += '				<td>';
	html += '					<input id="pswd-usrId" name="usrId" class="find-input" type="text" style="width: 170px;">';
	html += '				</td>';
	html += '			</tr>';
	html += '			<tr>';
	html += '				<th scope="row">등록한 이메일 주소</th>';
	html += '				<td>';
	html += '					<input id="pswd-usrEml" name="usrEml" class="find-input" type="text" >';
	html += '					<button class="btn btn-primary" style="width: 100px; height: 27px; font-size: 12px;" type="button" onclick="findUsrNoforChgPswd()">인증확인</button>';
	html += '					<div>';
	html += '						<span id="emailErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일을 입력해주세요.</span>';
	html += '						<span id="emailErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일 형식으로 입력해주세요.</span>';
	html += '						<span id="emailErr3" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">등록된 이메일 정보가 아닙니다.</span>';
	html += '					<div>';
	html += '				</td>';
	html += '			</tr>';
	html += '		</tbody>';
	html += '	</table>';
	html += '</form>';
	
	$("#chgPswd").html(html);
}

function findUsrNoforChgPswd() {
	console.log("제출 실행!!!")
	$.ajax({
    url: "login/getUsrNoforChgPswd",
    data: {
    	usrId: $("#pswd-usrId").val(),
		usrEml: $("#pswd-usrEml").val()
    },
    method: "POST",
    success: function(data) {
      html="";
      console.log(data);
      console.log($("#pswd-usrId").val());
      if(data === "fail"){
			 html += '<div class="result-div">';
			 html += '	<div class="resultConts">일치하는 회원정보가 없습니다.</div>';
			 html += '	<div style="text-align: center; font-size: 14px;">입력하신 정보를 다시 확인해주세요.</div>';
			 html += '	<div onclick="returnTable2()" class="btn btn-sm btn-primary" style="width: 100px; margin-left: 200px; margin-top:5px; font-size: 14px;">확인</div>';
			 html += '</div>';
	  }else{		  
		    html += '<form id="editPswdForm" action="/editUsrPasswordForFindId" method="post" >';
			html += '	<div class="m-1" style="font-size: 14px;">새로운 비밀번호를 입력해주세요.</div>';
			html += '	<table class="find-id-table">';
			html += '		<tbody>';
			html += '			<tr>';
			html += '				<th scope="row">새 비밀번호 입력</th>';
			html += '				<td>';
			html += '					<input id="pswd-newUsrPswd" class="find-input" name="usrNm" type="password" style="width: 170px;" data-err-msg="이름을 입력해주세요.">';
			html += '					<div>';
			html += '						<span id="pwdErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">비밀번호를 입력해주세요.</span>';
			html += '						<span id="pwdErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">영문/숫자/특수문자 조합으로 8~20자 입력해주세요.</span>';
			html += '						<span id="pwdErr3" class="errorMsg text-success d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">사용 가능한 비밀번호입니다.</span>';
			html += '					</div>';
			html += '				</td>';
			html += '			</tr>';
			html += '			<tr>';
			html += '				<th scope="row">새 비밀번호 확인</th>';
			html += '				<td>';
			html += '					<input id="pswd-usrPswdCheck" class="find-input" type="password" style="width: 170px;" name="usrPswd">';
			html += '					<button class="btn btn-primary" style="width: 100px; height: 27px; font-size: 12px;" type="button" onclick="editUsrPswd(\''+ data +'\')">인증확인</button>';
			html += '					<div>';
			html += '						<span id="pwdCheckErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">확인을 위해 비밀번호를 다시 입력해주세요.</span>';
			html += '						<span id="pwdCheckErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">비밀번호가 일치하지 않습니다.</span>';
			html += '						<span id="pwdCheckErr3" class="errorMsg text-success d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">비밀번호가 일치합니다.</span>';
			html += '					</div>';
			html += '				</td>';
			html += '			</tr>';
			html += '		</tbody>';
			html += '	</table>';
			html += '</form>';
	  }
      $("#chgPswd").html(html);
      
      //input 블러 시 유효성 검사 
      $("input").blur(function(event) {
      	//모든 에러 메세지를 보여주지 않도록 초기화
         	var errorMsgs = $(".errorMsg");
         	console.log(errorMsgs);
         	errorMsgs.each(function(index, item) {
         		$(item).addClass("d-none");
         		
         	});
         	
      	//비밀번호 유효성 검사
      	pswdIsValidation();
      
      	//이메일 유효성 검사
      	emailIsValidation();
      });
    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//비밀번호 변경
function editUsrPswd(usrNo){
	$.ajax({
	    url: "login/editUsrPasswordForFindId",
	    data: {
	    	usrNo: usrNo,
			usrPswd: $("#pswd-usrPswdCheck").val()
	    },
	    method: "POST",
	    success: function(data) {
	      html="";
	      console.log(data);
	      console.log($("pswd-usrPswdCheck").val());
      
			 html += '<div class="result-div">';
			 html += '	<div class="resultConts">비밀번호가 성공적으로 변경되었습니다.</div>';
			 html += '	<div style="text-align: center; font-size: 14px;">로그인을 다시 이용해주세요.</div>';
			 html += '	<div onclick="offModal()" class="btn btn-sm btn-primary" style="width: 100px; margin-left: 200px; margin-top:5px; font-size: 14px;">확인</div>';
			 html += '</div>';
		
	      $("#chgPswd").html(html);
	    },
	    error: function(error) {
	      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
	    }
	  });
}

function offModal(){
	$("#findMyIdOrPswdModal").modal("hide");
}

//비밀번호 유효성검사
function pswdIsValidation(){
	//pwd검사
	if($(event.target).attr('id') == "pswd-newUsrPswd") {
    	var pwd = $("#pswd-newUsrPswd").val();
    	var pwdErr1 = $("#pwdErr1");
    	var pwdErr2 = $("#pwdErr2");
    	var pwdErr3 = $("#pwdErr3");
    	console.log("pwd: " + pwd);
    		if(pwd ==="") {
    			isValidation = false;
    			pwdErr2.addClass("d-none");
    			pwdErr3.addClass("d-none");
    			pwdErr1.removeClass("d-none");
    		} else {
    			var pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
	    		var result = pattern.test(pwd);
	    		if(!result) {
	    			isValidation = false;
	    			pwdErr3.addClass("d-none");
	    			pwdErr2.removeClass("d-none");
	    			pwdErr1.addClass("d-none");
	    		} else {
	    			isValidation = true;
	    			pwdErr2.addClass("d-none");
	    			pwdErr3.removeClass("d-none");
	    			pwdErr1.addClass("d-none");
	    		}
	    	}
	}		
	//pwd-check 검사
	if($(event.target).attr('id') == "pswd-usrPswdCheck") {
    	var pwdCheck = $("#pswd-usrPswdCheck").val();
    	var pwdCheckErr1 = $("#pwdCheckErr1");
    	var pwdCheckErr2 = $("#pwdCheckErr2");
    	var pwdCheckErr3 = $("#pwdCheckErr3");
    	
    	console.log("pwdCheck: " + pwdCheck);
    	if(pwdCheck === "") {
    		isValidation = false;
    		pwdCheckErr2.addClass("d-none");
    		pwdCheckErr3.addClass("d-none");
    		pwdCheckErr1.removeClass("d-none");
    			
    	} else {
			var result = $("#pswd-newUsrPswd").val();
    		if(pwdCheck !== result) {
    			isValidation = false;
    			pwdCheckErr3.addClass("d-none");
    			pwdCheckErr2.removeClass("d-none");
    			pwdCheckErr1.addClass("d-none");
    		} else {
    			isValidation = true;
    			pwdCheckErr2.addClass("d-none");
    			pwdCheckErr3.removeClass("d-none");
    			pwdCheckErr1.addClass("d-none");
    		}
    	}	
    	
	}	
}

//이메일 유효성 검사
function emailIsValidation(){
	if($(event.target).attr('class') == "usrEml") {
    	var email = $("#email").val();
    	console.log("email: " + email);
    	var emailErr1 = $("#emailErr1");
    	var emailErr2 = $("#emailErr2");
    	var emailErr3 = $("#emailErr3");
    	if(email === "") {
    		isValidation = false;
    		emailErr2.addClass("d-none");
    		emailErr3.addClass("d-none");
    		emailErr1.removeClass("d-none");
    			
    	} else {
    		var pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    		var result = pattern.test(email);
    		if(!result) {
    			isValidation = false;
    			emailErr1.addClass("d-none");
    			emailErr2.removeClass("d-none");
    			emailErr3.addClass("d-none");
    		} else {
    			isValidation = true;
    			emailErr2.addClass("d-none");
    			emailErr3.addClass("d-none");
    			emailErr1.addClass("d-none");
    		}
    	}
    	
	}
}

