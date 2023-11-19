$(init)

function init() {
	 requestInsertDate();
	 eventPreventSrRqstAtch();
	 numOftotalRows();
	 getTotalRows(choiceSrRqstSttsNo);
	 console.log( $("#loginUsrNo").val());
	 // 0.5초 후에 함수 실행
	 setTimeout(doughnutChart, 500);
}
 
var choiceSrRqstSttsNo = "";
var pageNo = 1;
$(document).ready(function() {
	//필터링 텝 선택 효과
	$(".filterTab").click(function(event) {
	    // 클릭된 요소의 스타일을 변경
	    $(this).css({
	        "background-color": "#edf2f8",
	        "color": "black"
	    });
	    $(".toDoItem").css({"background-color": ""});
	    $(".filterTab").not(this).css({
	        "background-color": "",
	        "color": ""
	    });
	    console.log("아이디 가져갓!");

	    // 클릭된 요소를 더 안전하게 찾기
	    var clickedTab = $(event.currentTarget);
	    choiceSrRqstSttsNo = clickedTab.attr("id");
	    console.log(choiceSrRqstSttsNo);

	    // 필터링 된 상품 불러오기
	    loadSRRequests(1, choiceSrRqstSttsNo);
	});
	
  loadSRRequests(1, choiceSrRqstSttsNo); //페이지 로딩 시 초기 데이터 로드
  loadNtcs(1);
  loadInqs(1);
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

//**요청목록 불러오기
function loadSRRequests(pageNo, choiceSrRqstSttsNo) {
	$.ajax({
    url: "getSRRequestsByPageNo",
    data: { 
    	srRqstPageNo: pageNo,
    	status: choiceSrRqstSttsNo
    },
    dataType: "json",
    method: "GET",
    success: function(data) {
      html="";
      console.log(data);
      if(data<1){
			 html += '<tr style="background-color: white;">';
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

		  html += '<tr class="data-tr" style="background-color: white;">';
		  html += '	<td>' + indexOnPage + '</td>';
		  html += '	<td>' + item.srRqstNo + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 221.32px;">' + item.srTtl + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 144.64px;">' + item.sysNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 67.56px;">' + item.usrNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 69.64px;">' + item.instNm + '</td>';
		  html += '	<td class="truncate-text" style="max-width: 67.56px;">' + item.srRqstSttsNm + '</td>';
		  html += '	<td>'+ formattedDate +'</td>'
		  html += '	<td>'+ item.srRqstEmrgYn +'</td>';
		  html += '	<td><button type="button" id="showSrRqstDetailBtn" class="btn-1" data-toggle="modal" data-target="#srRqstBySrNo" onclick="showSrRqstBySrRqstNo(\''+ item.srRqstNo +'\')">상세보기</button></td>';
		  html += '</tr>';
    	  
      });
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getSrReqstListByPageNo").html(html);
      console.log("행수");
      //데이터가 없을 경우 페이징 숨기기
      var paginationContainer = document.getElementById("pagination-container");
  
      if(data.length<1){
    	  console.log($("pagination-container"));
    	  $(".btn").hide();
    	  console.log("데이터 없움");
      }else{
    	  updatePagination(pageNo, choiceSrRqstSttsNo);
    	  $(".btn").show();
    	  console.log("데이터 있움");
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
    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//**sr요청 상태 탭 별  행수 표시
function numOftotalRows(){
	///전체
	getTotalRows("").then(function (totalRows) {
		  $("#numOfAll").html("("+ totalRows + ")");
		});
	//요청
	getTotalRows("RQST").then(function (totalRows) {
		rqstTotal = totalRows;
		  $("#numOfRqst").html("("+ totalRows + ")");
		});
	//승인대기 
	getTotalRows("APRV_WAIT").then(function (totalRows) {
		aprvWaitTotal = totalRows;
		$("#numOfAprvWait").html("("+ totalRows + ")");
	});
	//승인재검토
	getTotalRows("APRV_REEXAM").then(function (totalRows) {
		aprvReexamTotal = totalRows;
		$("#numOfAprvReexam").html("("+ totalRows + ")");
	});
	//승인반려
	getTotalRows("APRV_RETURN").then(function (totalRows) {
		aprvReturnTotal = totalRows;
		$("#numOfAprvReturn").html("("+ totalRows + ")");
	});
	//승인
	getTotalRows("APRV").then(function (totalRows) {
		aprvTotal = totalRows;
		$("#numOfAprv").html("("+ totalRows + ")");
	});
	//개발완료
	getTotalRows("DEP_CMPTN").then(function (totalRows) {
		depCMptn = totalRows;
		$("#numOfDepCmptn").html("("+ totalRows + ")");
	});
}

function doughnutChart(){
	var rqstTotal = $("#numOfRqst").text();				//요청
	var aprvWaitTotal = $("#numOfAprvWait").text();		//승인 대기
	var aprvReexamTotal = $("#numOfAprvReexam").text();	//승인 재검토
	var aprvReturnTotal = $("#numOfAprvReturn").text();	//승인 반려
	var aprvTotal = $("#numOfAprv").text();				//승인
	var depCMptn = $("#numOfDepCmptn").text();			//개발완료
	
	// 정규 표현식을 사용하여 괄호를 제외하고 숫자만 추출
    var numberRqst = rqstTotal.replace(/[^\d]/g, '');
    console.log("요청수: " + rqstTotal +"/" + numberRqst);
    var numberAprvWait = aprvWaitTotal.replace(/[^\d]/g, '');
    var numberAprvReexam = aprvReexamTotal.replace(/[^\d]/g, '');
    var numberAprvReturn = aprvReturnTotal.replace(/[^\d]/g, '');
    var numberAprv = aprvTotal.replace(/[^\d]/g, '');
    var numberDepCMptn = depCMptn.replace(/[^\d]/g, '');
    
    // 캔버스 크기 조절
    var canvas = document.getElementById("myChart");
 
	//도넛차트
	const xValues = ["요청", "승인대기", "승인재검토", "승인반려", "승인", "개발완료"];
	const yValues = [numberRqst, numberAprvWait, numberAprvReexam, numberAprvReturn, numberAprv, numberDepCMptn];
	const barColors = [
	  "#26bbfd",
	  "#d6e2ee",
	  "#f3803d",
	  "#c6475c",
	  "#2c7be4",
	  "#00d279"
	];
	
	new Chart("myChart", {
	  type: "doughnut",
	  data: {
	    labels: xValues,
	    datasets: [{
	      backgroundColor: barColors,
	      data: yValues
	    }]
	  },
	  options: {
	    title: {
	      display: true,
	      text: "나의 SR 요청 현재 상태"
	    },
	    cutoutPercentage: 60, // 도넛 차트의 크기를 조절할 값 (0 ~ 100)
	  }
	});
}

//**총 행수 구하기
function getTotalRows(choiceSrRqstSttsNo) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "getCountSRRequestsByStatus",
      data: {
        status: choiceSrRqstSttsNo
      },
      dataType: "json",
      method: "GET",
      success: function (totalRows) {
        resolve(totalRows);  	
      },
      error: function (error) {
        reject(error);
      }
    });
  });
}

//**상태에 따른 페이징 업데이트 함수
function updatePagination(pageNo, choiceSrRqstSttsNo) {
  $.ajax({
    url: "getCountSRRequestsByStatus",
    data: {
      status: choiceSrRqstSttsNo
    },
    dataType: "json",
    method: "GET",
    success: function (totalRows) {
        // totalRows를 기반으로 페이징을 업데이트
        var totalPageNo = Math.ceil(totalRows / 5); // 페이지 수 계산 (5는 페이지당 항목 수)
        
        // 현재 페이지 번호 업데이트
        var currentPageNo = pageNo;
        
        // 처음/맨끝 페이지 버튼 생성
        var firstButton = '<a class="page-button btn" style="font-size: 12px;" href="javascript:loadSRRequests(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>';
        var lastButton = '<a class="page-button btn" style="font-size: 12px;" href="javascript:loadSRRequests(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        
        // 페이지 번호 버튼 생성
        var pageButtons = '';
        for (var i = 1; i <= totalPageNo; i++) {
          if (i === currentPageNo) {
            // 현재 페이지 번호는 활성화된 스타일을 적용
            pageButtons += '<a class="page-button btn active" style="font-size: 12px;" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          } else {
            pageButtons += '<a class="page-button btn" style="font-size: 12px;" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
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
	console.log("상세클릭");
	$.ajax({
		type: "GET",
        url: "getSrRqstBySrRqstNo",
        data: {srRqstNo: choiceSrRqstNo},
        success: function(data) {
        	var date = new Date(data.srRqstRegDt);
        	console.log(data);
        	//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsrNo").val();// 로그인한 회원 번호 가져오기 
        	var saveButton = $("#saveButton");
        	console.log(loggedInUsrNo);
        	// 로그인한 사용자와 요청을 등록한 회원을 비교하여 버튼 활성화/비활성화
            if(data.srRqstSttsNo === "RQST" || data.srRqstSttsNo === "APRV_WAIT"){
            	saveButton.prop("disabled", false); // 버튼을 활성화
        		saveButton.css("opacity", 1); // 버튼을 완전 불투명으로 설정
        	}else{
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
        	if(data.srRqstSttsNo === "RQST" || data.srRqstSttsNo === "APRV_RETURN"){
        		console.log("흐앙");
        		$("#deleteButton").prop("disabled", false); // 버튼을 활성화
        		$("#deleteButton").css("opacity", 1); // 버튼을 완전 불투명으로 설정
        	}else{
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
        	                html += '<a href="filedownload2?srRqstAtchNo='+ srRqstAtch.srRqstAtchNo +'" class="d-flex srRqstAtchWrap">';
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
        	        $("#showSrRqstAtch").text("첨부파일이 존재하지 않습니다.");
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        	    $("#showSrRqstAtch").text("첨부파일이 존재하지 않습니다.");
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

//**요청등록하기
function submitSrRqst(){
    var form = $("#writeSrRqst")[0];
    var formData = new FormData(form); // 폼 엘리먼트를 선택하고, [0]을 사용하여 DOM 요소로 변환

    $.ajax({
        url: "writeSrRqst", // 요청을 보낼 URL
        method: "POST",
        data: formData, // 폼 데이터를 전송
        success: function (data) {
        	$("#alertModal").text("성공적으로 SR요청이 등록되었습니다.");
    		$("#alertModal").modal("show");      		
    		
    		
    		// 성공적으로 요청이 완료된 경우 실행할 코드
    		var currentURL = window.location.href;
    		console.log(currentURL);
    		window.location.href = currentURL; // 또는 다른 원하는 URL로 변경
        	
        },
        error: function (error) {
            console.log(error);
        },
        cache: false,
        processData: false,
        contentType: false,
    });
}

function validateSrRqstForm(){
	event.preventDefault();
	console.log($(".isCheckSrRqstInput").val());
	if($(".isCheckSrRqstInput").val() === ''|| $(".isCheckSrRqstInput").val() === 'none') {
		$("#warningContent").text("필수항목을 모두 입력해주세요.");
		$("#warningModal").modal("show");
		
	}else{
		event.preventDefault();
		$("#alertContent").text("성공적으로 등록되었습니다.");
		$("#alertModal").modal("show");	
	}
}

//모달 close함수
function alertModalClose(){
	$("#alertModal").modal("hide");
	submitSrRqst();
	loadSRRequests(pageNo, choiceSrRqstSttsNo);
}
function warningModalClose(){
	$("#warningModal").modal("hide");
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
function modifySrRqst(srRqstNo) {
	modifySubmitData();
	// 데이터 수집 및 가공
    var data = {
    	srRqstNo: $("#srRqst-srRqstNo").val(),
        srTtl: $("#submitSrRqst-srTtl").val(),
        srPrps: $("#submitSrRqst-srPrps").val(),
        srConts: $("#submitSrRqst-srConts").val(),
        srRqstEmrgYn: $("#submit_Yn").val()
    };
    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "modifySrRqst",
        data: data,
        success: function (response) {
        	$("#alertContent2").text("성공적으로 등록되었습니다.");
    		$("#alertModal2").modal("show");	
            // 성공적으로 요청이 완료된 경우 실행할 코드
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
function removeSrRqst() {
	// Ajax 요청 보내기
	$.ajax({
		type: "POST",
		url: "removeSrRqstForCustomerHome",
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

//**공지사항 목록 불러오기
function loadNtcs(pageNo) {
	//페이지 지정
	$("#ntcPageNo").val(pageNo);
	$.ajax({
    url: "getNtcByPageNoForCustomerHome",
    data: { 
    	ntcPageNo: parseInt(pageNo),
    	searchTarget: $("#searchTarget option:selected").val(),
    	keyword: $("#keyword").val()
    },
    dataType: "json",
    method: "POST",
    success: function(data) {
      html="";
      console.log(data);
      // 중요한 행과 일반 행을 분리
      var importantRows = data.filter(item => item.ntcEmrgYn === "Y");
      var normalRows = data.filter(item => item.ntcEmrgYn !== "Y");

      if (importantRows.length < 1 && normalRows.length < 1) {
        // 중요한 행과 일반 행이 없을 경우 메시지 출력
        html += '<tr style="background-color: white; height: 4.5rem;"">';
        html += '  <td colspan="5">';
        html += '    <p class="t2_nonMessage">해당 목록 결과가 없습니다.</p>';
        html += '  </td>';
        html += '</tr>';
      } else {
        // 중요한 행 표시
        importantRows.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.ntcWrtDt);
          var indexOnPage = index + 1;
          var count = 0;

          html += '<tr data-toggle="modal" data-target="#getNtcByNtcNo" class="data-tr-imp" style="background-color: #fff6f9; height: 4.5rem;" onclick="showNtcByNtcNo(\'' + item.ntcNo + '\')">'; // 일반 행 스타일 적용
          html += '  <td style="color: #d43e7d; font-weight: bold;">공지</td>';
          html += '  <td class="truncate-text">' + item.ntcTtl + '</td>';
          html += '  <td class="truncate-text">' + item.usrNm + '</td>';
          html += '  <td>' + formattedDate + '</td>';
          html += '</tr>';
        });

        // 일반 행 표시
        normalRows.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.ntcWrtDt);
          var indexOnPage = index + 1; //인덱스 계산

          html += '<tr data-toggle="modal" data-target="#getNtcByNtcNo" class="data-tr" style="background-color:white; height: 4.5rem;" onclick="showNtcByNtcNo(\'' + item.ntcNo + '\')">'; // 일반 행 스타일 적용
          html += '  <td>' + indexOnPage + '</td>';
          html += '  <td class="truncate-text">' + item.ntcTtl + '</td>';
          html += '  <td class="truncate-text">' + item.usrNm + '</td>';
          html += '  <td>' + formattedDate + '</td>';
          html += '</tr>';
        });
      }
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getNtcListByPageNo").html(html);
      
      if(data.length<1){
    	  console.log($("pagination-container"));
    	  $(".btn").hide();
      }else{
    	  updatePagination(pageNo);
    	  $(".btn").show();
      }
      //중요 tr 요소에 대한 hover 이벤트 처리
      $('.data-tr-imp').hover(
        function() {
          // 마우스가 요소 위에 있을 때 배경색 변경
          $(this).css('background-color', '#fde8e7');
        },
        function() {
          // 마우스가 요소를 벗어날 때 배경색 원래대로 변경
          $(this).css('background-color', ' #fff6f9');
        }
      );
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
      // 성공적으로 요청이 완료된 경우 실행할 코드
      var currentURL = window.location.href;
    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//** 공지목록에 해당하는 공지 상세 가져오기(모달)
function showNtcByNtcNo(choiceNtcNo){
	$.ajax({
		type: "GET",
        url: "getNtcByNtcNoForCustomerHome",
        data: {ntcNo: choiceNtcNo},
        success: function(data) {
        	$("#showSrRqstAtch").hide();
        	var date = new Date(data.ntcWrtDt);
        	
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
        	console.log(formattedDate);
        	$("#ntc-usrNo").val(data.usrNo);
        	$("#ntc-usrNm").val(data.usrNm);
        	$("#ntc-ntcTtl").val(data.ntcTtl);
        	$("#ntc-ntcConts").val(data.ntcConts);
        	$("#ntc-ntcWrtDt").val(formattedDate);
        	$("#ntcInqCnt").html(data.ntcInqCnt);
        	//첨부파일
        	if (data.ntcAtchList && typeof data.ntcAtchList === "object") {
        	    // data.srRqstAtchList는 객체일 때
        	    const keys = Object.keys(data.ntcAtchList);
        	    if (keys.length !== 0) {
        	        let html = "";
        	        for (const key of keys) {
        	            const ntcAtch = data.ntcAtchList[key];
        	            console.log(ntcAtch);
        	            if (ntcAtch && ntcAtch.ntcNo === data.ntcNo) {
        	                $("#showNtcAtch").show();
        	                console.log("같음");
        	                var size = bytesToKB(ntcAtch.ntcAtchSize);
        	                html += '<a href="filedownloadOfNtcForCustomerHome?ntcAtchNo='+ ntcAtch.ntcAtchNo +'" class="d-flex srRqstAtchWrap">';
        	                html += '    <div>';
        	                html += '    	<i class="material-icons atch-ic">download</i>';
        	                html += '    </div>';
        	                html += '    <div id="' + ntcAtch.ntcAtchNo + '" class="srRqstAtch p-1">' + ntcAtch.ntcAtchNm + ' (' + size + 'KB)</div>';
        	                html += '</a>';
        	            }
        	        }
        	        $("#showNtcAtch").html(html);
        	    } else {
        	        //ntcAtchList가 객체지만 아무 항목도 없을 때
        	        $("#showNtcAtch").hide();
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        	    $("#showNtcAtch").hide();
        	}
        	if (data.ntcEmrgYn === "Y") {
        	    $("#ntc-importantChk").prop("checked", true);
        	} else {
        	    $("#ntc-importantChk").prop("checked", false);
        	}
	    
        	
        },
        error: function() {
          console.log(error);
        }
    });
}

//문의 목록 가져오기
//**문의 목록 불러오기
var id = "";
function loadInqs(pageNo) {
	//페이지 지정
	$("#inqPageNo").val(pageNo);
	$.ajax({
    url: "getInqByPageNoForCustomer",
    data: { 
    	inqPageNo: 1,
    	searchTarget: "",
    	keyword: ""
    },
    dataType: "json",
    method: "POST",
    success: function(data) {
      html="";
      //FAQ 표시
      html += '<tr onclick="toggleTr(10000)" class="data-tr-faq" style="background-color: #f2f7fd;">'; // 일반 행 스타일 적용
      html += '  <td class="text-primary" style="font-weight:bold;">FAQ</td>';
      html += '  <td class="truncate-text">O1.[접속] 어떻게 접속하는지 모르겠어요.</td>';
      html += '  <td class="truncate-text">최고관리자</td>';
      html += '  <td>23-10-30</td>';
      html += '  <td><i class="material-icons">expand_more</i></td>';
      html += '</tr>'; 
      html += '<tr id="10000" class="inqAnsTr hidden">';
	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
	  html += '    <p class="mt-2 t2_nonMessage">A. http://localhost:8080/otisrm/home 주소로 접속하시면 됩니다.</p>';
	  html += '  </td>';
	  html += '</tr>';
	  
	  html += '<tr onclick="toggleTr(1001)" class="data-tr-faq" style="background-color: #f2f7fd;">'; // 일반 행 스타일 적용
	  html += '  <td class="text-primary" style="font-weight:bold;">FAQ</td>';
	  html += '  <td class="truncate-text">Q2.[로그인] 로그인이 안되요</td>';
	  html += '  <td class="truncate-text">최고관리자</td>';
	  html += '  <td>23-10-30</td>';
	  html += '  <td><i class="material-icons">expand_more</i></td>';
	  html += '</tr>'; 
	  html += '<tr id="1001" class="inqAnsTr hidden">';
	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
	  html += '    <p class="mt-2 t2_nonMessage">';
	  html += '    	A. 로그인이 되지 않는 경우는 업체를 등록하지 않은 경우이거나, ID 혹은 PW 입력이 틀린경우 입니다. 업체등록 또는 ID, PW 안내는 시스템 관리자에게 요청하시면 됩니다.</p>';
	  html += '    </p>';
	  html += '  </td>';
	  html += '</tr>';
	 
	  html += '<tr onclick="toggleTr(1002)" class="data-tr-faq" style="background-color: #f2f7fd;">'; // 일반 행 스타일 적용
	  html += '  <td class="text-primary" style="font-weight:bold;">FAQ</td>';
	  html += '  <td class="truncate-text">Q.[데이터] 프로그램에서 조회가 안되요.</td>';
	  html += '  <td class="truncate-text">최고관리자</td>';
	  html += '  <td>23-10-30</td>';
	  html += '  <td><i class="material-icons">expand_more</i></td>';
	  html += '</tr>'; 
	  html += '<tr id="1002" class="inqAnsTr hidden">';
	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
	  html += '    <p class="mt-2 t2_nonMessage">';
	  html += '    	A: A. 조회가 안되는 경우는 호환성보기 설정, 검색조건, 데이터 이상 세 가지 경우입니다.';
	  html += '    </p>';
	  html += '    <p class="mt-1 t2_nonMessage">';
	  html += '    	 1. 먼저, 호환성 보기 설정에 otisrm.co.kr가 추가되어있는지 확인하세요.';
	  html += '    </p>';
	  html += '    <p class="mt-2 t2_nonMessage">';
	  html += '    	2. 검색조건이 제대로 입력되어 있는지 확인하세요.(스타일품번, 날짜 등)';
	  html += '    </p>';
	  html += '    <p class="mt-2 t2_nonMessage">';
	  html += '    	 3. 위 두가지 상황 확인 후에도 조회가 안될 시 데이터 확인이 필요합니다. 시스템 관리자에게 문의해주세요.';
	  html += '    </p>';
	  html += '  </td>';
	  html += '</tr>';
      console.log(data);
      if (data < 1) {
        html += '<tr style="background-color: white;">';
        html += '  <td colspan="5">';
        html += '    <p class="t2_nonMessage">해당 목록 결과가 없습니다.</p>';
        html += '  </td>';
        html += '</tr>';
      } else {
	    data.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.inqWrtDt);
          var indexOnPage = (pageNo - 1) * 5 + 1;
          id = item.inqNo
          //비밀글 일때
          if(item.usrNo === $("#loginUsr").val()){
        	  //로그인한 회원의 비밀글 일때
        	  if(item.inqPrvtYn == "Y"){        		  
        		  html += '<tr onclick="toggleTr('+ item.inqNo +')" class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
        		  html += '  <td><i style="font-size: 2.0rem; color: #5d6e82;" class="material-icons">lock</i></td>';
        		  html += '  <td class="truncate-text">' + item.inqTtl + '</td>';
        		  html += '  <td class="truncate-text">' + item.usrNm + '</td>';
        		  html += '  <td>' + formattedDate + '</td>';
        		  html += '  <td><i class="material-icons">expand_more</i></td>';
        		  html += '</tr>';
        		  html += '<tr id="'+ item.inqNo +'" class="inqAnsTr hidden">';
        		  html += '  <td colspan="5" style="background-color: #e9ecef;">';
        		  html += '    <p class="t2_nonMessage">아직 해당 문의글에 대한 답변이 달리지 않았습니다.</p>';
        		  html += '  </td>';
        		  html += '</tr>';
        		  if(item.inqAns === null){        	  
        			  html += '<tr id="'+ item.inqNo +'" class="inqAnsTr hidden">';
        			  html += '  <td colspan="5" style="background-color: #e9ecef;">';
        			  html += '    <p class="t2_nonMessage">아직 해당 문의글에 대한 답변이 달리지 않았습니다.</p>';
        			  html += '  </td>';
        			  html += '</tr>';
        		  }else{
        			  html += '<tr class="inqAnsTr hidden">';
        			  html += '  <td colspan="5" style="background-color: #e9ecef;">';
        			  html += '    <p class="t2_nonMessage">' + item.inqAns + '</p>';
        			  html += '  </td>';
        			  html += '</tr>';
        		  }
        	  }else if(item.inqPrvtYn == "N"){
        		  html += '<tr onclick="toggleTr('+ item.inqNo +')" class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
                  html += '  <td>'+ indexOnPage +'</td>';
                  html += '  <td class="truncate-text">' + item.inqTtl + '</td>';
                  html += '  <td class="truncate-text">' + item.usrNm + '</td>';
                  html += '  <td>' + formattedDate + '</td>';
                  html += '  <td><i class="material-icons">expand_more</i></td>';
                  html += '</tr>';
                  html += '<tr id="'+ item.inqNo +'" class="inqAnsTr hidden">';
            	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
            	  html += '    <p class="t2_nonMessage">아직 해당 문의글에 대한 답변이 달리지 않았습니다.</p>';
            	  html += '  </td>';
            	  html += '</tr>';
                  if(item.inqAns === null){        	  
                	  html += '<tr id="'+ item.inqNo +'" class="inqAnsTr hidden">';
                	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
                	  html += '    <p class="t2_nonMessage">아직 해당 문의글에 대한 답변이 달리지 않았습니다.</p>';
                	  html += '  </td>';
                	  html += '</tr>';
                  }else{
                	  html += '<tr class="inqAnsTr hidden">';
                	  html += '  <td colspan="5" style="background-color: #e9ecef;">';
                	  html += '    <p class="t2_nonMessage">' + item.inqAns + '</p>';
                	  html += '  </td>';
                	  html += '</tr>'; 
        	  }
           }
          }
        });
      }
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getInqListByPageNo").html(html);
      
      //tr 요소에 대한 hover 이벤트 처리
      $('.data-tr-faq').hover(
    		  function() {
    			  // 마우스가 요소 위에 있을 때 배경색 변경
    			  $(this).css('background-color', '#e1edf9');
    		  },
    		  function() {
    			  // 마우스가 요소를 벗어날 때 배경색 원래대로 변경
    			  $(this).css('background-color', '#f2f7fd');
    		  }
      );
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

    },
    error: function(error) {
      console.error("데이터를 불러오는 중 오류가 발생했습니다.");
    }
  });
}

//투글 효과함수
function toggleTr(id) {
	  $("#"+id).toggleClass("hidden");
}

