$(init)

function init() {
	modifyCheck();
	checkValidation();
}
//회원가입 버튼 클릭 시 회원가입 폼 열기
function openSmallWindow(event) {
    event.preventDefault();

    // 새 창의 크기 및 속성 설정
    var width = 1100;
    var height = 1300;
    var left = (window.innerWidth - width) / 2; // 화면 가로 중앙
    var top = (window.innerHeight - height) / 2; // 화면 세로 중앙
    var features = `width=${width},height=${height},left=${left},top=${top}`;

    // 새 창 열기
    window.open(event.target.href, '_blank', features);
}

function modifyCheck() {
	var modifyMsg = $("#modifyMsg").val();
	console.log(modifyMsg);
	if(modifyMsg!="") {
		alert(modifyMsg);
		
	}
}

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
		}
		 else if(Type === "text"){
		    document.getElementById("usrPswd").setAttribute("type", "password");
		}
}

/*function checkValidation() {
   	var isValidation = true;	
 
   	//모든 에러 메세지를 보여주지 않도록 초기화
   	var errorMsgs = $(".errorMsg");
   	console.log(errorMsgs);
   	errorMsgs.each(function(index, item) {
   		$(item).addClass("d-none");
   	});
   	
	//usrId 검사
	var usrId = $("#usrId").val();
	var usrIdErr1 = $("#usrIdErr1");
	var usrIdErr2 = $("#usrIdErr2");
	var usrIdErr3 = $("#usrIdErr3");

	if(usrId ==="") {
		isValidation = false;
		usrIdErr2.addClass("d-none");
		usrIdErr3.addClass("d-none");
		usrIdErr1.removeClass("d-none");
	} else {
		var pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
    	var result = pattern.test(usrId);
    	if(!result) {
    		isValidation = false;
    		usrIdErr2.removeClass("d-none");
    		usrIdErr1.addClass("d-none");
    		usrIdErr3.addClass("d-none");
    	} else {
    		usrIdErr2.addClass("d-none");
    		usrIdErr1.addClass("d-none");
    		usrIdErr3.addClass("d-none");
    	}
	}
		
	//usrPswd검사
	var usrPswd = $("#usrPswd").val();
	var usrPswdErr1 = $("#usrPswdErr1");
	var usrPswdErr2 = $("#usrPswdErr2");
	if(usrPswd ==="") {
		isValidation = false;
		usrPswdErr2.addClass("d-none");
		usrPswdErr3.addClass("d-none");
		usrPswdErr1.removeClass("d-none");
	} else {
		var pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    	var result = pattern.test(usrPswd);
    	if(!result) {
    		isValidation = false;
    		usrPswdErr2.removeClass("d-none");
    		usrPswdErr1.addClass("d-none");
    	} else {
    		usrPswdErr2.addClass("d-none");
    		usrPswdErr1.addClass("d-none");
    	}
    }

	if(!isValidation) {
		event.preventDefault();
	
	}
}
*/