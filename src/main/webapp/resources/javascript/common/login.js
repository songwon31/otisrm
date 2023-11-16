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
	html += '					<span id="emailErr1" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일을 입력해주세요.</span>';
	html += '					<span id="emailErr2" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">이메일 형식으로 입력해주세요.</span>';
	html += '					<span id="emailErr3" class="errorMsg text-danger d-none small" style="font-family: dotum,sans-serif; font-size: 12px;">등록된 이메일 정보가 아닙니다.</span>';
	html += '				</td>';
	html += '			</tr>';
	html += '		</tbody>';
	html += '	</table>';
	html += '</form>';
	
	$("#findId").html(html);
}
