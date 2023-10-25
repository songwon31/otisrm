$(init)

function init() {
	
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

