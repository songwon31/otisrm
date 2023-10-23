$(init)

function init() {
   loading();
   jsonProduct();
   $("#btn_delete").hide();
   $('.content-row').hide();
   submitAndClose();
}

$(document).ready(function(){
	
    //input 블러 시 유효성 검사 및 밑줄 처리
    $("input").blur(function(event) {
    	//이름 검사
    	nmIsValidation();
    	
    	//비밀번호 유효성 검사
    	pswdIsValidation();
    
    	//이메일 유효성 검사
    	emailIsValidation();
    	
    	//휴대번호 유효성 검사
    	telIsValidation();
    	
    	//주민번호 유효성 검사
    	rrnIsValidation();
    });

});

//소속기관 선택
function myInst(){
	//선택된 옵션 id
	var selectedOptionId = $(event.target).find('option:selected').attr('id');
	$("#submitInst").val(selectedOptionId);
	console.log($("#submitInst").val());
	//선택된 옵션 내용
	var selectedOptionNm = $(event.target).val();
	//선택된 옵션 내용 모달에 표시
	$("#seleceded-inst").html("소속기관: " + selectedOptionNm);
	
	// AJAX를 사용하여 서버에서 개발부서 목록을 가져옴
    showDept(selectedOptionId);
    showRoles(selectedOptionId);
    showIbps(selectedOptionId);
}
//권한 선택
function myAuthrt(){
	//선택한 옵션 id
	var selectedOptionId = $(event.target).find('option:selected').attr('id');
	console.log("선택한 권한: " + selectedOptionId);
	$("#submitUsrAuthrt").val(selectedOptionId);
	console.log($("#submitUsrAuthrt").val());
}
//소속기관에 해당하는 개발부서
function showDept(selectedOptionId) {
    $.ajax({
        type: "GET", // 또는 "GET", 요청 유형에 따라 선택
        url: "getDepartments", // 서버 측 엔드포인트 URL로 변경
        data: { instNo: selectedOptionId }, // 선택한 소속기관 ID를 서버로 전달
        success: function (data) {
            // 서버 응답을 처리하여 개발부서 목록을 업데이트
       		 let html = "";
       		data.forEach((item, index) => {
            	html += '<tr id="'+ item.deptNm +'" class="contents">';	
            	html += '	<td style="cursor: pointer;" onclick="selectDept()">';
            	html += '		<input type="radio" id="'+ item.deptNo +'" name="deptNm" value="'+ item.deptNm +'" onclick="selectDept()">';
            	html += '	</td>';
            	html += '	<td>'+item.deptNo+'</td>';
            	html += '	<td>'+item.deptNm+'</td>';
            	html += '</tr>';
       		});
       	 // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
            $('#deptList').html(html); 
        },
        error: function (error) {
            console.error("오류 발생:", error);
        }
    });
}

//개발 부서 검색버튼 
function selectDeptBtn(){
    var selectedOption = $("#inst-select option:selected").val();
	if(selectedOption == "none"){
		 alert("소속기관을 먼저 선택해 주세요.");
	}else{
		$("#deptModal").show();
	}
}

function selectDept() {
    // 선택된 라디오 버튼의 ID 값을 가져옵니다.
    var selectedDeptNo = $("input[name='deptNm']:checked").attr("id");
    var selectedDeptNm = $("input[name='deptNm']:checked").val();
    $("#myDept").html(selectedDeptNm);
    $("#submit-deptNo").val(selectedDeptNo);	//제출할 deptNo
    $("#submit-deptNm").val(selectedDeptNm);
    console.log("선택된 부서 ID:", selectedDeptId);
}

//개발부서 모달창 닫기 버튼
function closeBtn(){
	$("#deptModal").hide();
}
function selectedoption1(){
	var selectedOption = $("#inst-select option:selected").val();
	if(selectedOption == "none"){
		 alert("소속기관을 먼저 선택해 주세요.");
	}else{
		var selectedRole = $(event.target).val();
		console.log("선택value: " + selectedRole);
		$("#submitRole").val(selectedRole);
	}
}
function selectedoption2(){
	var selectedOption = $("#inst-select option:selected").val();
	if(selectedOption == "none"){
		alert("소속기관을 먼저 선택해 주세요.");
	}else{
		var selectedIbps = $(event.target).val();
		console.log("선택value: " + selectedIbps);
		$("#submitIbps").val(selectedIbps);
	}
}

//소속기관에 해당하는 역할
function showRoles(selectedOptionId) {
	$.ajax({
		type: "GET", 
		url: "getRoles", 
		data: { instNo: selectedOptionId }, 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			html += '<option value="none">--역할--</option>'
				data.forEach((item, index) => {	
					html += '<option value="'+item.roleNo+'">'+item.roleNm+'</option>';
				});
			// HTML 콘텐츠를 검색한 부서 데이터로 업데이트
			$('#role-select').html(html); 
			console.log("역할 완료");
		},
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}
//소속기관에 해당하는 직위
function showIbps(selectedOptionId) {
	$.ajax({
		type: "GET", 
		url: "getPositions", 
		data: { instNo: selectedOptionId }, 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			html += '<option value="none">--직위--</option>'
      		data.forEach((item, index) => {	
           	html += '<option value="'+item.ibpsNo+'">'+item.ibpsNm+'</option>';
      		});
      	 // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#ibps-select").html(html); 
           console.log("직위 완료");
       },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}


//아이디 유효성검사
function selectOverlapUsrId(){
	console.log("클릭");
	let myUsrId = $("#usrId").val();
	if(myUsrId === null || myUsrId===""){
		console.log("클릭-입력안함");
		$("#usrIdInfo").hide();
		$("#usrIdErr").show();
		$("#usrIdErr").html("아이디를 입력해주세요.");
	}else{
		console.log("검사시작");
		$.ajax({
			type: "GET", 
			url: "getNumOfOverlapUsrId", 
			data: { usrId: myUsrId }, 
			success: function (data) {
				if(data === 0){
					var pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
		    		var result = pattern.test(myUsrId);
					if(result === false){
						console.log("아이디 틀림");
						$("#usrIdInfo").hide();
						$("#usrIdErr").show();
						$("#usrIdErr").html("아이디를 올바르게 입력해주세요.");
					}else{
						console.log("사용가능");
						$("#usrIdErr").hide();
						$("#usrIdInfo").show();
						$("#usrIdInfo").html("사용가능한 아이디 입니다.");
					}	
				}else{
					console.log("이미존재");
					$("#usrIdInfo").hide();
					$("#usrIdErr").show();
					$("#usrIdErr").html("이미 존재하는 아이디 입니다.");
				}
	       },
			error: function (error) {
				console.error("오류 발생:", error);
			}
		});
	}
}

//이름 유효성 검사
function nmIsValidation(){
	if($(event.target).attr('id') == "name") {
    	var name = $("#name").val();
    	console.log("name: " + name);
    	var nameErr = $("#nameErr");
    	if(name === "") {
    		isValidation = false;
    		nameErr.removeClass("d-none");
    	} else {
    		var pattern =/^[가-힣]{2,20}|[a-zA-Z]{2,20}\s[a-zA-Z]{2,20}$/;
    		var result = pattern.test(name);
    		if(!result) {
    			isValidation = false;
    			nameErr.removeClass("d-none");
    		} else {
    			nameErr.addClass("d-none");
    		}
    	}
    	
	}	
}
//비밀번호 유효성검사
function pswdIsValidation(){
	//유효성 검사
    var isValidation = true;
	//pwd검사
	if($(event.target).attr('id') == "pwd") {
    	var pwd = $("#pwd").val();
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
	    			pwdErr2.addClass("d-none");
	    			pwdErr3.removeClass("d-none");
	    			pwdErr1.addClass("d-none");
	    		}
	    	}
	}		
	//pwd-check 검사
	if($(event.target).attr('id') == "pwd-check") {
    	var pwdCheck = $("#pwd-check").val();
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
			var result = $("#pwd").val();
    		if(pwdCheck !== result) {
    			isValidation = false;
    			pwdCheckErr3.addClass("d-none");
    			pwdCheckErr2.removeClass("d-none");
    			pwdCheckErr1.addClass("d-none");
    		} else {
    			pwdCheckErr2.addClass("d-none");
    			pwdCheckErr3.removeClass("d-none");
    			pwdCheckErr1.addClass("d-none");
    		}
    	}	
    	
	}	
}
//휴대전화 유효성검사
function telIsValidation(){
	if($(event.target).attr('id') == "tel") { 
    	var tel = $("#tel").val();
    	console.log("tel: " + tel);
    	var telErr1 = $("#telErr1");
    	//var telErr2 = $("#telErr2");
    	if(tel === "") {
    		isValidation = false;
    		telErr1.removeClass("d-none");
    		//telErr2.addClass("d-none");
    	} else {
    		var pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
    		var result = pattern.test(tel);
    		if(!result) {
    			isValidation = false;
    			telErr1.removeClass("d-none");
	    		//telErr2.addClass("d-none");
    		} else {
    			telErr1.addClass("d-none");
    			//telErr2.addClass("d-none");
    		}
    	}
    	
    	tel = $("#tel").val($("#tel").val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
    	console.log("tel"+tel);
    	
	}
    
}
//이메일 유효성 검사
function emailIsValidation(){
	if($(event.target).attr('id') == "email") {
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
    			emailErr2.addClass("d-none");
    			emailErr3.addClass("d-none");
    			emailErr1.addClass("d-none");
    		}
    	}
	}
}
//주민번호 유효성검사
function rrnIsValidation(){
	if($(event.target).attr('id') == "rrn"){		
		var rrn = $("#rrn").val();
		console.log("rrnDate: " + rrn);
		var rrnErr1 = $("#rrnErr1");
		var rrnErr2 = $("#rrnErr2");
	
		var pattern = /^(?:[0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[1,2][0-9]|3[0,1]))-?[1-4]$/;
		var result = pattern.test(rrn);
		if(rrn === ""){
			console.log("작성안함")
			rnnErr1.addClass("d-none");
			rrnErr2.removeClass("d-none");
		}else{
			if(!result){
				console.log("틀림");
				isValidation = false;
				rrnErr1.removeClass("d-none");
				rnnErr2.addClass("d-none");
			}else{
				console.log("안틀림");
				rnnErr1.addClass("d-none");
				rnnErr2.addClass("d-none");
				
			}
		}
	}
}

//보안문자 새로고침 버튼
function refreshCaptcha() {
    // 보안문자 이미지 엘리먼트 가져오기
    var captchaImage = document.getElementById("semes_captcha");

    // 새로운 이미지 URL 생성 (타임스탬프를 추가하여 캐시 회피)
    var timestamp = new Date().getTime();
    var newImageUrl = "https://www.cpsrm.com/sp/oms/common/semesCaptchaImg.do?t=" + timestamp;

    // 이미지를 새 URL로 변경
    captchaImage.src = newImageUrl;
}

//자동하이픈기능추가
const autoHyphen = (target) => {
	 target.value = target.value
	  .replace(/[^0-9]/g, '')
	  .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3").replace(/(\-{1,2})$/g, "");
}


