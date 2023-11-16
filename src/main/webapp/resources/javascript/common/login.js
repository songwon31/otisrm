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

