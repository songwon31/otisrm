$(init)

function init() {
   loading();
   jsonProduct();
   $("#btn_delete").hide();
   $('.content-row').hide();
   submitAndClose();
}

window.Polymer = {
	//Polymer 엘리먼트 로드 완료 이벤트 설정
	polymerReady : true,
	//#다국어 처리 프로세서 비활성화
	useI18nParser : false,
	//캐시 버스트
	cacheBust : ('' || Date.now()),
	//lazy loader 활성화
	useLazyLoader : true,
	//lazy register 활성화
	useLazyRegister : true,
	//true 값이면 윈도우 숨김처리시 document.body 에서 윈도우 엘리먼트가 자동으로 제거
	detachedOnSCWindowHided : false,
	//소스 내 whitespace를 지워주는 기능 할성화
	useStripWhiteSpace : true
};
window.SESSIONTIMEOUT = Number('7200') * 1000;


var mdiMain = document.getElementById('mdiMain'),
	start = function() {
	var menuId = "NOT00010";
	var langCode = "" || "ko_KR"; // 다국어처리 코드 추가
	var appId = "" || "";
	var aprvTypCd = "" || "";
	var paramCd = "" || "";
	var paramDt = "" || "";
    	
    	if(mdiMain.mdiMainCompleted) {
			var menuList = SCMdiManager.getMenuList();
        	var windowUrl = "";
        	var menuName = "";
        	for (idx in menuList) {
                if (menuId == menuList[idx].menu_id) {
                	windowUrl = menuList[idx].menu_url;
               	 	menuName = menuList[idx].menu_nm;
                }
            }	        	
			if(windowUrl.indexOf('?') > -1){
				importUrl = windowUrl.slice(0, windowUrl.indexOf('?'));	
			}else{
				importUrl = windowUrl;
			}
			
			importUrl = importUrl + "?app_id=" + appId + "&aprv_typcd=" + aprvTypCd + "&param_cd=" + paramCd + "&param_dt=" + paramDt;

				mdiMain.$.mdiContent.createWindow(menuId, menuName, importUrl, false);
    		
    	}
    	
		if(window.CollectGarbage) {
			setInterval(function() {
				CollectGarbage();
		   	}, 60000);
    	}
	};

mdiMainCompletedHandler = function(e) {
	mdiMain.removeEventListener('mdi-manager-initialized', mdiMainCompletedHandler);
	mdiMain.mdiMainCompleted = true;
	start();
};
mdiMain.addEventListener('mdi-manager-initialized', mdiMainCompletedHandler);

document.addEventListener('keydown',function(e){
	var ele = e.srcElement ? e.srcElement : e.target,
		rx = /INPUT|SELECT|TEXTAREA/i,
	    k = e.which || e.keyCode;
	if(!ele.type || !rx.test(e.target.tagName)|| (ele.readOnly || ele.disabled )) {
	    	if(k == 8){
	    		e.preventDefault();
	     	}
	     }
},true);

environmentHandler = function() {
	environment.removeEventListener('environments-completed', environmentHandler);
	mdiMain.environmentsCompleted = true;
	setTimeout(function(){
		start();
	},1)
};

//소속기관 선택
function myInst(){
	//선택된 옵션 id
	var selectedOptionId = $(event.target).find('option:selected').attr('id');
	//선택된 옵션 내용
	var selectedOptionNm = $(event.target).val();
	//선택된 옵션 내용 모달에 표시
	$("#seleceded-inst").html("소속기관: " + selectedOptionNm);
	
	// AJAX를 사용하여 서버에서 개발부서 목록을 가져옴
    showDept(selectedOptionId);
}

function showDept(selectedOptionId) {
    $.ajax({
        type: "GET", // 또는 "GET", 요청 유형에 따라 선택
        url: "join/join", // 서버 측 엔드포인트 URL로 변경
        data: { instNo: selectedOptionId }, // 선택한 소속기관 ID를 서버로 전달
        success: function (data) {
            // 서버 응답을 처리하여 개발부서 목록을 업데이트
            
        },
        error: function (error) {
            console.error("오류 발생:", error);
        }
    });
}

//개발 부서 검색버튼 
function selectDeptBtn(){
    var selectedOption = $("#option-inst option:selected").val();
	if(selectedOption == "none"){
		 alert("소속기관을 먼저 선택해 주세요.");
	}else{
		$("#deptModal").show();
	}
}

//개발부서 모달창 닫기 버튼
function closeBtn(){
	$("#deptModal").hide();
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

//폼 제출 시 유효성 검사
function checkValidation() {
	
    var isValidation = true;
    
   	//모든 에러 메세지를 보여주지 않도록 초기화
   	var errorMsgs = $(".errorMsg");
   	console.log(errorMsgs);
   	errorMsgs.each(function(index, item) {
   		$(item).addClass("d-none");
   		
   	});
   	
   	//모든 밑줄 회색처리
	$(".form-group").children('div').removeClass("line-red");
	$(".form-group").children('div').removeClass("line-blue");
	$(".form-group").children('div').addClass("line-gray");
   	
    //uid 검사
	var uid = $("#uid").val();
	var uidErr1 = $("#uidErr1");
	var uidErr2 = $("#uidErr2");
	console.log("uid: " + uid);
		if(uid ==="") {
			isValidation = false;
			uidErr2.addClass("d-none");
			uidErr1.removeClass("d-none");
		} else {
			var pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
    		var result = pattern.test(uid);
    		if(!result) {
    			isValidation = false;
    			uidErr2.removeClass("d-none");
    			uidErr1.addClass("d-none");
    		} else {
    			uidErr2.addClass("d-none");
    			uidErr1.addClass("d-none");
    		}
		}
	
	if(!isValidation) {
		var borderbottom = $("#id-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
	} else {
		var borderbottom = $("#id-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}
    	
		
	
	//pwd검사
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
		
	if(!isValidation) {
		var borderbottom = $("#pwd-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
    } else {
		var borderbottom = $("#pwd-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}
	

			
	//pwd-check 검사
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
	
	if(!isValidation) {
		var borderbottom = $("#pwd-form-check");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
    } else {
		var borderbottom = $("#pwd-form-check");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}	
    	
	
	
	//email 검사
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
	
	if(!isValidation) {
		var borderbottom = $("#email-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
    } else {
		var borderbottom = $("#email-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}	
	
	
	//name 검사
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
	
	if(!isValidation) {
		var borderbottom = $("#name-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
    } else {
		var borderbottom = $("#name-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}	
	
	
	//tel 검사
	var tel = $("#tel").val();
	console.log("tel: " + tel);
	var telErr1 = $("#telErr1");
	if(tel === "") {
		isValidation = false;
		telErr1.removeClass("d-none");
	} else {
		var pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		var result = pattern.test(tel);
		if(!result) {
			isValidation = false;
			telErr1.removeClass("d-none");
		} else {
			telErr1.addClass("d-none");
		}
	}
	
	tel = $("#tel").val($("#tel").val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3").replace("--", "-") );
	
	if(!isValidation) {
		var borderbottom = $("#tel-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-blue");
		borderbottom.addClass("line-red");
    } else {
		var borderbottom = $("#tel-form");
		borderbottom.removeClass("line-gray");
		borderbottom.removeClass("line-red");
		borderbottom.addClass("line-gray");
	}	
	
	//이용약관 동의 유효성 검사
	if(!$("#agree1").prop("checked")){ 
		isValidation = false;
	}
   
	if(!isValidation) {
		event.preventDefault();
		window.alert('회원가입에 실패하였습니다.');
	}
}		




$(document).ready(function(){
	
	//체크박스 모두 선택 시 전체 선택
	$("#agree").click(function(){
		//전체 선택 선택시 모두 체크, 해제
		if($("#agree").prop("checked")){ 
			$(".agreement").prop("checked", true);
		} else {
			$(".agreement").prop("checked", false);
		}
	});	
		
		//선택 갯수가 전체 선택 갯수와 같을 경우 전체 선택 체크
	$(".agreement").click(function(){	
		if($('input[class=agreement]:checked').length ==$('.agreement').length){
	        $('#agree').prop('checked',true);
	    }else{
	       $('#agree').prop('checked',false);
	    }
			
	});
	
	//input 포커스 시 회색 border-bottom => 파란색 border-bottom
    $("input").focus(function(event){
		   const name = $(event.target).parent('div');
		   const parent = name.parent('div');
		   parent.removeClass("line-gray");
		   parent.removeClass("line-red");
		   parent.addClass("line-blue");
	});
    
    //input 블러 시 유효성 검사 및 밑줄 처리
    $("input").blur(function(event) {
        //유효성 검사
        var isValidation = true;

       	
       	//모든 밑줄 회색처리
    	$(".form-group").children('div').removeClass("line-blue");
    	$(".form-group").children('div').addClass("line-gray");
       	
        //uid 검사
    	if($(event.target).attr('id') == "uid") {
    		var uid = $("#uid").val();
	    	var uidErr1 = $("#uidErr1");
	    	var uidErr2 = $("#uidErr2");
	    	//var uidErr3 = $("#uidErr3");
	    	//var uidErr4 = $("#uidErr4");
	    	console.log("uid: " + uid);
	    		if(uid ==="") {
	    			isValidation = false;
	    			uidErr2.addClass("d-none");
	    			//uidErr3.addClass("d-none");
	    			//uidErr4.addClass("d-none");
	    			uidErr1.removeClass("d-none");
	    		} else {
	    			var pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
		    		var result = pattern.test(uid);
		    		if(!result) {
		    			isValidation = false;
		    			//uidErr3.addClass("d-none");
		    			uidErr2.removeClass("d-none");
		    			uidErr1.addClass("d-none");
		    			//uidErr4.addClass("d-none");
		    		} else {
		    			uidErr2.addClass("d-none");
		    			//uidErr3.removeClass("d-none");
		    			uidErr1.addClass("d-none");
		    			//uidErr4.addClass("d-none");
		    		}
	    		}
	    	
	    	if(!isValidation) {
	    		var borderbottom = $("#id-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
	    	} else {
	    		var borderbottom = $("#id-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
	    	}
	    	
    	}	
    	
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
	    		
	    	if(!isValidation) {
	    		var borderbottom = $("#pwd-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
		    } else {
	    		var borderbottom = $("#pwd-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
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
    		
	    	if(!isValidation) {
	    		var borderbottom = $("#pwd-form-check");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
		    } else {
	    		var borderbottom = $("#pwd-form-check");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
	    	}	
	    	
    	}	
    	
    	//email 검사
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
	    	
	    	if(!isValidation) {
	    		var borderbottom = $("#email-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
		    } else {
	    		var borderbottom = $("#email-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
	    	}	
    	}
    	
    	//name 검사
    	
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
	    	
	    	if(!isValidation) {
	    		var borderbottom = $("#name-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
		    } else {
	    		var borderbottom = $("#name-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
	    	}	
    	}	
    	
    	//tel 검사
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
	    	if(!isValidation) {
	    		var borderbottom = $("#tel-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-blue");
	    		borderbottom.addClass("line-red");
		    } else {
	    		var borderbottom = $("#tel-form");
	    		borderbottom.removeClass("line-gray");
	    		borderbottom.removeClass("line-red");
	    		borderbottom.addClass("line-gray");
	    	}
	    	
    	}
        
    });

});
