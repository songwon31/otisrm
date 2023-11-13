$(init)

function init() {
	 console.log("실행")
	 requestInsertDate();
	 eventPreventSrRqstAtch();				
	 showInstList();	
	 showSysByDeptNo()//소속기관 불러오기
	 
	 //등록 소속 확인 후 소속기관에 해당하는 부서 가져오기
	 $("#confirmButton").click(function () {
		 showDept();
		});
	 var deptNo = "";
	//개발 부서 select box 클릭 이벤트 처리(유효성검사)
    $("#deptNo-select").click(function() {
        var instNo = $("#instNo").val();
        if (!instNo) {
            // 등록자 소속이 선택되지 않았을 때 알림 메시지 표시
            alert("등록자 소속을 먼저 선택해주세요.");
        }else{
        	deptNo = $("#deptNo-select option:selected").val();
        	console.log("내가 선택한 부서: " + deptNo);
        	showSys(deptNo);
        }
    });
    $("#sysNo-select").click(function() {
    	if (!deptNo || deptNo == "none") {
    		// 등록자 소속이 선택되지 않았을 때 알림 메시지 표시
    		alert("개발부서를 먼저 선택해주세요.");
    	}
    }); 
    
  
    showSrRqstStts();
}
 
var choiceSrRqstSttsNo = "";
var status = "";
var pageNo = 1;
$(document).ready(function() {
    loadSRRequests(1, choiceSrRqstSttsNo); //페이지 로딩 시 초기 데이터 로드
    
    //선택한 시스템 번호 넣어주기
    var selectedSysNo = $("#sysNo-select").val();
	$("#sysNo-select").val(selectedSysNo);	    
   
    
});

//timestamp 객체를 YYYY-MM-dd 형식의 문자열로 변환하는 함수
function formatDateToYYYYMMDD(timestamp) {
	// 타임스탬프를 Date 객체로 변환
	var date = new Date(timestamp);

	// 연도의 끝 두 자리를 추출
	var year = date.getFullYear().toString().slice(-2);

	// 월과 일을 가져와서 2자리로 포맷
	var month = (date.getMonth() + 1).toString().padStart(2, '0');
	var day = date.getDate().toString().padStart(2, '0');

	// "YY-MM-dd" 형식으로 날짜를 조합
	var formattedDate = year + '-' + month + '-' + day;
  return formattedDate;
}

//sr요청 검색창
//1: 등록자 소속 찾기 모달에서 소속기관 불러오기
function showInstList() {
    $.ajax({
        type: "GET",
        url: "getInstListOfMng",
        success: function (data) {
        	console.log("시쟉");
       		let html = "";
       		data.forEach((item, index) => {
            	html += '<tr id="'+ item.instNo +'" class="contents" style="background-color:white; height: 4.5rem; border: 1.5px solid #e9ecef; cursor:pointer;">';	
            	html += '	<td style="cursor: pointer;" onclick="selectInst()">';
            	html += '		<input type="radio" id="'+ item.instNo +'" name="instNm" value="'+ item.instNm +'" onclick="selectInst()">';
            	html += '	</td>';
            	html += '	<td>'+item.instNo+'</td>';
            	html += '	<td>'+item.instNm+'</td>';
            	html += '</tr>';
       		});
       	 // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
            $('#instList').html(html); 
        },
        error: function (error) {
            console.error("오류 발생:", error);
        }
    });
}

//소속기관 저장 검색버튼 
var selectedInstNo = "";
function selectInst() {
    // 선택된 라디오 버튼의 ID 값을 가져오기
    var selectedInstNo = $("input[name='instNm']:checked").attr("id");
    var selectedInstNm = $("input[name='instNm']:checked").val();
    $("#instNm").val(selectedInstNm);
    $("#instNo").val(selectedInstNo);	//제출할 instNo
    $("#findInst").html(selectedInstNm);	
}

//2: 소속기관에 해당하는 개발부서 불러오기
var instNo = $("input[name='instNm']:checked").attr("id");
function showDept() {
    $.ajax({
        type: "GET", // 또는 "GET", 요청 유형에 따라 선택
        url: "getDeptListOfMng", // 서버 측 엔드포인트 URL로 변경
        data: {instNo: $("input[name='instNm']:checked").attr("id")}, // 선택한 소속기관 ID를 서버로 전달
        success: function (data) {
        	console.log(data);
        	html="";
            // 서버 응답을 처리하여 개발부서 목록을 업데이트
        	html += '<option value="">전체</option>';
      		data.forEach((item, index) => {	
      			html += '<option value="'+item.deptNo+'">'+item.deptNm+'</option>';
       		});
       	 // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
         $('#deptNo-select').html(html);
        },
        error: function (error) {
            console.error("오류 발생:", error);
        }
    });
}

//3: 개발부서번호에 해당하는 관련 시스템 불러오기
function showSys(deptNo) {
	console.log(deptNo);
	$.ajax({
		type: "GET", 
		url: "getSysByDeptNoOfMng", 
		data: {deptNo: deptNo}, 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			// 서버 응답을 처리하여 개발부서 목록을 업데이트
        	html += '<option value="">전체</option>';
      		data.forEach((item, index) => {	
      			html += '<option value="'+item.sysNo+'">'+item.sysNm+'</option>';
       		});
		   // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#sysNo-select").html(html); 
           console.log(deptNo + "부서에 해당하는 시스템 목록 불러오기 완료.");
       },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

//4: 요청 상태 불러오기
function showSrRqstStts() {
	$.ajax({
		type: "GET", 
		url: "getSrRqstSttsOfMng", 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			// 서버 응답을 처리하여 개발부서 목록을 업데이트
        	html += '<option value="">전체</option>';
      		data.forEach((item, index) => {	
      			html += '<option value="'+ item.srRqstSttsNo +'">'+item.srRqstSttsNm+'</option>';
       		});
		   // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#srRqstStts-select").html(html); 
       },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

//요청 상태
choiceSrRqstSttsNo = "";
var status = "";
function dataOfloadSrRequestsForm(){
	//페이지 세팅
	$("#srRqstMngPageNo").val(pageNo);
	
	//내 요청 건만 체크
	if($("#myCheck").prop("checked")){
		$("#usr").val($("#loginUsr").val());
	}else{
		$("#usr").val("");
	}
}

function submitList(){
	dataOfloadSrRequestsForm();
	loadSRRequests(pageNo, choiceSrRqstSttsNo);
}


//**요청목록 불러오기
function loadSRRequests(pageNo, choiceSrRqstSttsNo) {
	choiceSrRqstSttsNo = $("#srRqstStts-select option:selected").val();
	//등록자 소속기관
	var searchInstNo = $("input[name='instNm']:checked").attr("id");
	//개발부서
	var searchDeptNo = $("#deptNo-select option:selected").val();
	//진행 상태
	var searchStatus = choiceSrRqstSttsNo;
	//내 요청건만 여부
	var searchUsr = $("#usr").val();
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//관련 시스템 
	var searchSysNo = $("#sysNo-select option:selected").val();
	//키워드 검색대상
	var searchTarget = $("#searchTarget option:selected").val();
	//키워드 
	var searchKeyword = $("#keyword").val();
	//페이지 지정
	$("#srRqstMngPageNo").val(pageNo);
	$.ajax({
    url: "getSRRequestsByPageNoOfMng",
    data: { 
    	srRqstMngPageNo: parseInt(pageNo),
    	instNo: searchInstNo,
    	deptNo: searchDeptNo,
    	status: choiceSrRqstSttsNo,
    	usr: searchUsr,
    	startDate: searchStartDate,
    	endDate: searchEndDate,
    	sysNo: searchSysNo,
    	searchTarget: searchTarget,
    	keyword: searchKeyword
    },
    dataType: "json",
    method: "POST",
    success: function(data) {
      html="";
      console.log(data);
      if(data<1){
			 html += '<tr style="background-color: white;">';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td style="width:190px;">';
			 html += '		<p class="t2_nonMessage">해당 목록 결과가 없습니다.</p>';
			 html += '	</td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '	<td></td>';
			 html += '</tr>';
	  }
      var indexOffset = (pageNo - 1) * 5; // 페이지 번호에 따라 index 오프셋 계산
      data.forEach((item, index)=>{
    	  // item.srRqstRegDt를 YYYY-MM-dd 문자열로 변환
    	  const formattedDate = formatDateToYYYYMMDD(item.srRqstRegDt);
    	  var indexOnPage = index + indexOffset + 1; // 페이지 내에서의 index 계산
    	  var count = 0;
    	  //승인여부
    	  var aprvYn = "N";
    	  if(item.srRqstSttsSeq > 0){
    		  aprvYn = "Y";
    	  }
		  console.log("앙");
		  
		  html += '<tr class="data-tr" style="background-color: white;">';
		  html += '	<td>' + indexOnPage + '</td>';
		  html += '	<td>' + item.srRqstNo + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 235.37px;">' + item.srTtl + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 144px;">' + item.sysNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 88.26px;">' + item.usrNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 88.26px;">' + item.instNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 88.26px;">' + item.deptNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 88.26px;">' + item.srRqstSttsNm + '</td>';
		  html += '	<td>'+ formattedDate +'</td>'
		  html += '	<td>'+ item.srRqstEmrgYn +'</td>';
		  html += '	<td>'+ aprvYn +'</td>';
		  html += '	<td><button type="button" id="showSrRqstDetailBtn" class="btn-1" data-toggle="modal" data-target="#srRqstBySrNo" onclick="showSrRqstBySrRqstNo(\''+ item.srRqstNo +'\')">상세보기</button></td>';
		  html += '</tr>';
    	  
      });
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getSrReqstListByPageNo").html(html);
      
      //데이터가 없을 경우 페이징 숨기기
      var paginationContainer = document.getElementById("pagination-container");
  
      if(data.length<1){
    	  console.log($("pagination-container"));
    	  $(".btn").hide();
      }else{
    	  updatePagination(pageNo, choiceSrRqstSttsNo);
    	  $(".btn").show();
      }
      //tr 요소에 대한 hover 이벤트 처리
      $('.data-tr').hover(
        function() {
          // 마우스가 요소 위에 있을 때 배경색 변경
          $(this).css('background-color', '#f3f6fd');
        },
        function() {
          // 마우스가 요소를 벗어날 때 배경색 원래대로 변경
          $(this).css('background-color', 'white');
        }
      );
      loading();
      // 성공적으로 요청이 완료된 경우 실행할 코드
      var currentURL = window.location.href;
    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//**상태에 따른 페이징 업데이트 함수
function updatePagination(pageNo, choiceSrRqstSttsNo) {
	choiceSrRqstSttsNo = $("#srRqstStts-select option:selected").val();
	//등록자 소속기관
	var searchInstNo = $("input[name='instNm']:checked").attr("id");
	//개발부서
	var searchDeptNo = $("#deptNo-select option:selected").val();
	//진행 상태
	var searchStatus = choiceSrRqstSttsNo;
	//내 요청건만 여부
	var searchUsr = $("#usr").val();
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//관련 시스템 
	var searchSysNo = $("#sysNo-select option:selected").val();
	//키워드 검색대상
	var searchTarget = $("#searchTarget option:selected").val();
	//키워드 
	var searchKeyword = $("#keyword").val();
  $.ajax({
    url: "getCountSRRequestsByStatus",
    data: {
    	srRqstMngPageNo: pageNo,
    	instNo: searchInstNo,
    	deptNo: searchDeptNo,
    	status: choiceSrRqstSttsNo,
    	usr: searchUsr,
    	startDate: searchStartDate,
    	endDate: searchEndDate,
    	sysNo: searchSysNo,
    	searchTarget: searchTarget,
    	keyword: searchKeyword
    },
    dataType: "json",
    method: "GET",
    success: function (totalRows) {
        // totalRows를 기반으로 페이징을 업데이트
        var totalPageNo = Math.ceil(totalRows / 10); // 페이지 수 계산 (5는 페이지당 항목 수)
        
        // 현재 페이지 번호 업데이트
        var currentPageNo = pageNo;
        
        // 처음/맨끝 페이지 버튼 생성
        var firstButton = '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>';
        var lastButton = '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        
        // 페이지 번호 버튼 생성
        var pageButtons = '';
        for (var i = 1; i <= totalPageNo; i++) {
          if (i === currentPageNo) {
            // 현재 페이지 번호는 활성화된 스타일을 적용
            pageButtons += '<a class="page-button btn active" style="font-size: 1.3rem;" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          } else {
            pageButtons += '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          }
        }
        
        // 처음 페이지 버튼만 표시
        pageButtons = firstButton + pageButtons;
        
        // 맨끝 페이지 버튼만 표시
        pageButtons += lastButton;
        
        // 페이지 버튼 컨테이너 업데이트
        $("#pagination-container").html(pageButtons);
    },
    error: function (error) {
      console.error("총 행 수를 가져오는 중 오류가 발생했습니다.");
    }
  });
}

//Byte를 KB로 변환
function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // 소수점 두 자리까지 표시
}

//**요청에 해당하는 상세 정보 가져오기 (모달)
function showSrRqstBySrRqstNo(choiceSrRqstNo){
	loading();
	$.ajax({
		type: "GET",
        url: "getSrRqstBySrRqstNoOfMng",
        data: {srRqstNo: choiceSrRqstNo},
        success: function(data) {
        	$("#showSrRqstAtch").hide();
        	var date = new Date(data.srRqstRegDt);
        	console.log(data);
        	//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsr").val();// 로그인한 회원 번호 가져오기 
        	var saveButton = $("#saveButton");
        	console.log(loggedInUsrNo);
        	// 로그인한 사용자와 요청을 등록한 회원을 비교하여 버튼 활성화/비활성화
        	if (data.srReqstrNo === loggedInUsrNo) {
        		console.log("내요청");
        		saveButton.prop("disabled", false); // 버튼을 활성화
        		saveButton.css("opacity", 1); // 버튼을 완전 불투명으로 설정
        	} else{
        		console.log("내요청 아님");
        		saveButton.prop("disabled", true); // 버튼을 비활성화
        		saveButton.css("opacity", 0.5); // 버튼을 반투명으로 설정 (예시로 0.5 사용)
        	}
        	var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
        	$("#srRqst-srRqstNo").val(data.srRqstNo);
        	$("#srRqst-UsrNm").val(data.usrNm);
        	$("#srRqst-inst").val(data.instNm);
        	$("#srRqst-sysNm").val(data.sysNm);
        	$("#srRqst-srTtl").val(data.srTtl);
        	$("#srRqst-srPrps").val(data.srPrps);
        	$("#srRqst-srConts").val(data.srConts);
        	$("#srRqst-srRqstRegDt").val(formattedDate);
        	
        	//요청상태가 승인대기 이상일 때 삭제 불가능(버튼 속성 변경)
        	if(data.srRqstSttsNo !== "RQST" || data.srReqstrNo !== loggedInUsrNo){
        		$("#deleteButton").prop("disabled", true);
        		$("#deleteButton").css("opacity", 0.5); 
        	}
        	//첨부파일
        	if (data.srRqstAtchList && typeof data.srRqstAtchList === "object") {
        	    // data.srRqstAtchList는 객체일 때
        	    const keys = Object.keys(data.srRqstAtchList);
        	    if (keys.length !== 0) {
        	        let html = "";
        	        for (const key of keys) {
        	            const srRqstAtch = data.srRqstAtchList[key];
        	            console.log(srRqstAtch);
        	            if (srRqstAtch && srRqstAtch.srRqstNo === data.srRqstNo) {
        	                $("#showSrRqstAtch").show();
        	                console.log("같음");
        	                var size = bytesToKB(srRqstAtch.srRqstAtchSize);
        	                html += '<a href="filedownloadOfMng?srRqstAtchNo='+ srRqstAtch.srRqstAtchNo +'" class="d-flex srRqstAtchWrap">';
        	                html += '    <div>';
        	                html += '    	<i class="material-icons atch-ic">download</i>';
        	                html += '    </div>';
        	                html += '    <div id="' + srRqstAtch.srRqstAtchNo + '" class="srRqstAtch p-1">' + srRqstAtch.srRqstAtchNm + ' (' + size + 'KB)</div>';
        	                html += '</a>';
        	            }
        	        }
        	        $("#showSrRqstAtch").html(html);
        	    } else {
        	        // srRqstAtchList가 객체지만 아무 항목도 없을 때
        	        $("#showSrRqstAtch").html("첨부파일이 존재하지 않습니다.");
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        		 $("#showSrRqstAtch").html("첨부파일이 존재하지 않습니다.");
        	}
        	if (data.srRqstEmrgYn === "Y") {
        	    $("#srRqst-importantChk").prop("checked", true);
        	    submitSrRqst();
        	} else {
        	    $("#srRqst-importantChk").prop("checked", false);
        	}
        	
        },
        error: function() {
          console.log(error);
        }
    });
}
//a태그 클릭시 폼 제출 막기
function eventPreventSrRqstAtch(){
	// 해당 클래스를 가진 모든 요소를 찾기
	var links = document.querySelectorAll(".srRqstAtchWrap");

	// 각 링크에 클릭 이벤트 리스너 추가
	for (var i = 0; i < links.length; i++) {
	    links[i].addEventListener("click", function(event) {
	        event.preventDefault(); // 폼 제출을 막음
	    });
	}
}

//부서번호에 해당하는 관련시스템 목록
function showSysByDeptNo() {
	$.ajax({
		type: "GET", 
		url: "getSysByDeptNoOfMng", 
		data: { deptNo: $("#loginUsrDeptNo").val()}, 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			html += '<option value="">--관련시스템--</option>'
      		data.forEach((item, index) => {	
           	html += '<option value="'+item.sysNo+'">'+item.sysNm+'</option>';
      		});
		   // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#sysNo").html(html); 
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

//YY-MM-dd 형식의 String 타입을 Date타입으로 변환
function parseDateStringToDateFormat(dateString) {
  // 날짜 문자열을 "-"로 분할
  var parts = dateString.split("-");
  
  // 날짜 문자열을 Date 객체로 변환
  var year = parseInt("20" + parts[0], 10);
  var month = parseInt(parts[1], 10) - 1; // 월은 0부터 시작하므로 1을 빼줍니다.
  var day = parseInt(parts[2], 10);
  
  var date = new Date(year, month, day);
  
  return date;
}

//**요청등록하기
function submitSrRqstOfMng(){
	var form = $("#writeSrRqstOfMng")[0];
	var formData = new FormData(form); // 폼 엘리먼트를 선택하고, [0]을 사용하여 DOM 요소로 변환
	console.log(form);
	console.log(formData);
	$.ajax({
	    url: "writeSrRqstOfMng", // 요청을 보낼 URL
	    method: "POST",
	    data: formData, // 폼 데이터를 전송
	    success: function (data) {
	    	 console.log(data);
	    	 loadSRRequests(pageNo, choiceSrRqstSttsNo);
	        // 성공적으로 요청이 완료된 경우 실행할 코드
	        var currentURL = window.location.href;
	        console.log(currentURL);
	        window.location.href = "/requestManagement"; // 또는 다른 원하는 URL로 변경
	        
	    },
	    error: function (error) {
	        // 요청 중 오류가 발생한 경우 실행할 코드
	        console.error("으어아으우어");
	    },
	    cache: false,        //파일이 포함되어 있으니, 브라우저 메모리에 저장하지 마라
	    processData: false,  //title=xxx&desc=yyy& 씩으로 만들지 마라
	    contentType: false,   //파트마다 Content-Type이 포함되기 때문에 따로 헤더에 Content-Type에 추가하지 마라(mutiple-> 파일마다 모두 다름)
	});
}

//sr요청 등록 폼에  체크여부
function isImportendChecked(){
	var isChecked = $("#importantChk").prop("checked");
	if(isChecked === true){
		$("#srRqstEmrgYn").val("Y");
	}else{
		$("#srRqstEmrgYn").val("N");
	}
}

//sr요청 수정 폼에 체크여부
function isImportendChecked2(){
	var isChecked = $("#srRqst-importantChk").prop("checked");
	if(isChecked === true){
		$("#submit_Yn").val("Y");
	}else{
		$("#submit_Yn").val("N");
	}
}

//sr요청 수정 폼 제출 데이터 세팅
function modifySubmitData(){
	$("#submitSrRqst-srTtl").val($("#srRqst-srTtl").val());
	$("#submitSrRqst-srPrps").val($("#srRqst-srPrps").val());
	$("#submitSrRqst-srConts").val($("#srRqst-srConts").val());
	var isChecked = $("#srRqst-importantChk").prop("checked");
	if(isChecked === true){
		$("#submit_Yn").val("Y");
	}else{
		$("#submit_Yn").val("N");
	}
}

//sr 요청 수정
function modifySrRqstOfMng(srRqstNo) {
	modifySubmitData();
	// 데이터 수집 및 가공
	var form = $("#modifySrRqstOfMng")[0];
	var formData = new FormData(form);
    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "modifySrRqstOfMng",
        data: formData,
        success: function (data) {
            // 성공적으로 요청이 완료된 경우 실행할 코드
            var currentURL = window.location.href;
            window.location.href = currentURL; // 원하는 URL로 변경
            loadSRRequests(1, choiceSrRqstSttsNo);
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            alert("수정 실패");
        }
    });
}

//**sr 요청 삭제
function removeSrRqstOfMng() {
	// Ajax 요청 보내기
	$.ajax({
		type: "POST",
		url: "removeSrRqstOfMng",
		data: {srRqstNo: $("#srRqst-srRqstNo").val()},
		success: function (data) {
			// 성공적으로 요청이 완료된 경우 실행할 코드
			var currentURL = window.location.href;
			window.location.href = currentURL; // 원하는 URL로 변경
			loadSRRequests(1, choiceSrRqstSttsNo);
		},
		error: function (error) {
			// 요청 중 오류가 발생한 경우 실행할 코드
			console.error("오류 발생:", error);
			alert("수정 실패");
		}
	});
}

/// 엑셀 다운로드
function downloadExcel() {
	choiceSrRqstSttsNo = $("#srRqstStts-select option:selected").val();
	//등록자 소속기관
	var searchInstNo = $("input[name='instNm']:checked").attr("id");
	//개발부서
	var searchDeptNo = $("#deptNo-select option:selected").val();
	//진행 상태
	var searchStatus = choiceSrRqstSttsNo;
	//내 요청건만 여부
	var searchUsr = $("#usr").val();
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//관련 시스템 
	var searchSysNo = $("#sysNo-select option:selected").val();
	//키워드 검색대상
	var searchTarget = $("#searchTarget option:selected").val();
	//키워드 
	var searchKeyword = $("#keyword").val();
	//페이지 지정
	$("#srRqstMngPageNo").val(pageNo);
	
	// 엑셀에 다운될 데이터
	var data = [
	    ["요청번호", "제목", "관련시스템", "등록자", "소속", "개발부서", "상태", "요청일", "승인요청", "중요"],
	  ];
	
	$.ajax({
	    url: "getSRRequestsByPageNoOfMng",
	    data: {
	      srRqstMngPageNo: parseInt(pageNo),
	      instNo: searchInstNo,
	      deptNo: searchDeptNo,
	      status: choiceSrRqstSttsNo,
	      usr: searchUsr,
	      startDate: searchStartDate,
	      endDate: searchEndDate,
	      sysNo: searchSysNo,
	      searchTarget: searchTarget,
	      keyword: searchKeyword
	    },
	    dataType: "json",
	    method: "POST",
	    success: function (response) {
	      response.forEach(function (item, index) {
	        // 승인여부
	        var aprvYn = "N";
	        if (item.srRqstSttsSeq > 1) {
	          aprvYn = "Y";
	        }
	        data.push([
	          item.srRqstNo,
	          item.srTtl,
	          item.sysNm,
	          item.usrNm,
	          item.instNm,
	          item.deptNm,
	          item.srRqstSttsNm,
	          item.srRqstRegDt,
	          item.srRqstEmrgYn,
	          aprvYn
	        ]);
	      });
	
	      // 워크북 생성
	      var wb = XLSX.utils.book_new();
	      var ws = XLSX.utils.aoa_to_sheet(data);
	
	      // 워크북에 워크시트 추가
	      XLSX.utils.book_append_sheet(wb, ws, "SR요청목록");
	
	      // 엑셀 파일 생성 및 다운로드
	      var today = new Date();
	      var filename = "SR요청목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
	      XLSX.writeFile(wb, filename);
	    },
	    error: function (error) {
	      console.log(error);
	    }
    });
}

//로딩 스피너 함수
function loading() {
  LoadingWithMask();
  setTimeout("closeLoadingWithMask()", 800);
}

//스피너와 마스크 표시
function LoadingWithMask() {
  //로딩중 이미지 표시
  $.LoadingOverlay("show", {
  	background       : "rgba(0, 0, 0, 0.5)",
  	image            : "https://upload.wikimedia.org/wikipedia/commons/f/fc/Herbert_Kickl.gif",
  	maxSize          : 150,
  	fontawesome      : "fa fa-pulse fa-fw",
  	fontawesomeColor : "#FFFFFF",
  });
 
}
//스피너와 마스크 종료
function closeLoadingWithMask() {
  $.LoadingOverlay("hide"); 
}
