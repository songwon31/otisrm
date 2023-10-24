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
    var height = 1500;
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
	}else if(usrPswdType === "text"){
	    document.getElementById("usrPswd").setAttribute("type", "password");
	}
}

