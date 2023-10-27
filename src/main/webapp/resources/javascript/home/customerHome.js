$(init)

function init() {
	 requestInsertDate();
}

//부서번호에 해당하는 관련시스템 목록
function showSysByDeptNo(myDeptNo) {
	$.ajax({
		type: "GET", 
		url: "getSysByDeptNo", 
		data: { deptNo: myDeptNo}, 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			html += '<option value="none">--관련시스템--</option>'
      		data.forEach((item, index) => {	
           	html += '<option value="'+item.sysNo+'">'+item.sysNm+'</option>';
      		});
		   // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#systemName").html(html); 
           console.log("시스템 완료");
       },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

//요청등록 폼 오늘날짜로 자동 설정
function requestInsertDate(){
	// 오늘의 날짜를 가져오기
	var today = new Date();

	// 년, 월, 일을 YYYY-MM-DD 형식으로 변환
	var yyyy = today.getFullYear();
	var mm = String(today.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 
	var dd = String(today.getDate()).padStart(2, '0');

	// YYYY-MM-DD 형식으로 날짜 문자열 생성
	var todayFormatted = yyyy + '-' + mm + '-' + dd;

	// 해당 ID를 가진 input 요소에 오늘의 날짜를 설정
	document.getElementById('writeDate').value = todayFormatted;
}

function submitSrRqst(){
	console.log("제출");
    //요청등록하기
	$.ajax({
	    type: "POST",
	    url: "writeSrRqst", // 요청을 보낼 URL
	    data: formData, // 폼 데이터를 전송
	    success: function (data) {
	        // 성공적으로 요청이 완료된 경우 실행할 코드
	        var currentURL = window.location.href;
	        console.log(currentURL);
	        window.location.href = "/home"; // 또는 다른 원하는 URL로 변경
	    },
	    error: function (error) {
	        // 요청 중 오류가 발생한 경우 실행할 코드
	        console.error("오류 발생:", error);
	    }
	});
}

function isImportendChecked(){
	var isChecked = $("#importantChk").prop("checked");
	if(isChecked === true){
		console.log("나체쿠")
		$("#submitYn").val("Y");
	}else{
		$("#submitYn").val("N")
	}
}

//로그 메시지 저장
function logToStorage(message) {
    var logs = JSON.parse(localStorage.getItem('consoleLogs')) || [];
    logs.push(message);
    localStorage.setItem('consoleLogs', JSON.stringify(logs));
    console.log(message);
}

// 페이지 로드 시 저장된 로그 메시지를 다시 불러옴
function loadLogsFromStorage() {
    var logs = JSON.parse(localStorage.getItem('consoleLogs')) || [];
    logs.forEach(function (log) {
        console.log(log);
    });
}

// 페이지 로드 시 저장된 로그 메시지 불러오기
window.addEventListener('load', loadLogsFromStorage);
