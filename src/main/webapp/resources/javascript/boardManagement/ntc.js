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
	loadNtcs(pageNo); //페이지 로딩 시 초기 데이터 로드
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



//요청 상태
choiceSrRqstSttsNo = "";

function submitList(){
	dataOfloadSrRequestsForm();
	loadSRRequests(pageNo, choiceSrRqstSttsNo);
}


//**공지사항 목록 불러오기
function loadNtcs(pageNo) {
	//페이지 지정
	$("#ntcPageNo").val(pageNo);
	$.ajax({
    url: "getNtcByPageNo",
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
        html += '<tr style="background-color: white;">';
        html += '  <td colspan="6">';
        html += '    <p class="t2_nonMessage">해당 목록 결과가 없습니다.</p>';
        html += '  </td>';
        html += '</tr>';
      } else {
        // 중요한 행 표시
        importantRows.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.ntcWrtDt);
          var indexOnPage = index + 1;
          var count = 0;

          html += '<tr class="data-tr-imp" style="background-color: #fff6f9;">'; // 일반 행 스타일 적용
          html += '  <td style="color: #d43e7d; font-weight: bold;">공지</td>';
          html += '  <td class="truncate-text">' + item.ntcTtl + '</td>';
          html += '  <td class="truncate-text">' + item.usrNm + '</td>';
          html += '  <td>' + formattedDate + '</td>';
          html += '  <td>' + item.ntcInqCnt + '</td>';
          html += '  <td><button type="button" id="showSrRqstDetailBtn" class="btn-2" data-toggle="modal" data-target="#getNtcByNtcNo" onclick="showSrRqstBySrRqstNo(\'' + item.ntcNo + '\')">상세보기</button></td>';
          html += '</tr>';
        });

        // 일반 행 표시
        normalRows.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.ntcWrtDt);
          var indexOnPage = index + 1; // 중요한 행 다음부터 인덱스 계산

          html += '<tr class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
          html += '  <td>' + indexOnPage + '</td>';
          html += '  <td class="truncate-text">' + item.ntcTtl + '</td>';
          html += '  <td class="truncate-text">' + item.usrNm + '</td>';
          html += '  <td>' + formattedDate + '</td>';
          html += '  <td>' + item.ntcInqCnt + '</td>';
          html += '  <td><button type="button" id="showSrRqstDetailBtn" class="btn-2" data-toggle="modal" data-target="#getNtcByNtcNo" onclick="showSrRqstBySrRqstNo(\'' + item.ntcNo + '\')">상세보기</button></td>';
          html += '</tr>';
        });
      }
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getNtcListByPageNo").html(html);
      
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
    			  $(this).css('background-color', '');
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
function updatePagination(pageNo) {
  $.ajax({
    url: "getCountNtcBySearch",
    data: {
    	ntcPageNo: parseInt(pageNo),
    	searchTarget: $("#searchTarget option:selected").val(),
    	keyword: $("#keyword").val()
    },
    dataType: "json",
    method: "GET",
    success: function (totalRows) {
    	// totalRows를 기반으로 페이징을 업데이트
        var totalPageNo = Math.ceil(totalRows / 12); // 페이지 수 계산 (5는 페이지당 항목 수)
        
        // 현재 페이지 번호 업데이트
        var currentPageNo = pageNo;
        
        // 이전/다음 페이지 버튼 표시 여부 결정
        var showPrev = currentPageNo > 1;
        var showNext = currentPageNo < totalPageNo;
        
        // 이전/다음 페이지 버튼 생성
        var prevButton = '<a class="page-button btn" href="javascript:loadNtcs(' + (currentPageNo - 1) + ',\''+ choiceSrRqstSttsNo +'\')">이전</a>';
        var nextButton = '<a class="page-button btn" href="javascript:loadNtcs(' + (currentPageNo + 1) + ',\''+ choiceSrRqstSttsNo +'\')">다음</a>';
        
        // 페이지 번호 버튼 생성
        var pageButtons = '';
        for (var i = 1; i <= totalPageNo; i++) {
          if (i === currentPageNo) {
            // 현재 페이지 번호는 활성화된 스타일을 적용
            pageButtons += '<a class="page-button btn active" href="javascript:loadNtcs(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          } else {
            pageButtons += '<a class="page-button btn" href="javascript:loadNtcs(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          }
        }
        
        // 이전 페이지 버튼을 표시
        if (showPrev) {
          pageButtons = '<a class="page-button btn" href="javascript:loadNtcs(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>' + prevButton + pageButtons;
        } else {
          pageButtons = '<a class="page-button btn" href="javascript:loadNtcs(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>' + pageButtons;
        }
        
        // 다음 페이지 버튼을 표시
        if (showNext) {
          pageButtons += nextButton + '<a class="page-button btn" href="javascript:loadNtcs(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        } else {
          pageButtons += '<a class="page-button btn" href="javascript:loadNtcs(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        }
        
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

//**공지 등록하기
function submitNtc(){
	var form = $("#writeNtc")[0];
	var formData = new FormData(form); // 폼 엘리먼트를 선택하고, [0]을 사용하여 DOM 요소로 변환
	console.log(form);
	console.log(formData);
	$.ajax({
	    url: "writeNtc", // 요청을 보낼 URL
	    method: "POST",
	    data: formData, // 폼 데이터를 전송
	    success: function (data) {
	    	 console.log(data);
	        // 성공적으로 요청이 완료된 경우 실행할 코드
	        var currentURL = window.location.href;
	        console.log(currentURL);
	        window.location.href = "/boardManagement"; // 또는 다른 원하는 URL로 변경
	        
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

//공지 등록 폼에  체크여부
function isImportendChecked(){
	var isChecked = $("#importantChk").prop("checked");
	if(isChecked === true){
		$("#ntcEmrgYn").val("Y");
	}else{
		$("#ntcEmrgYn").val("N");
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

/// 엑셀 다운로드
function downloadExcel() {
	// 엑셀에 다운될 데이터
	var data = [
	    ["번호", "제목", "등록자", "등록일", "조회수"],
	  ];
	//페이지 지정
	$("#ntcPageNo").val(pageNo);
	
	$.ajax({
	    url: "getNtcByPageNo",
	    data: { 
	    	ntcPageNo: parseInt(pageNo),
	    	searchTarget: $("#searchTarget option:selected").val(),
	    	keyword: $("#keyword").val()
	    },
	    dataType: "json",
	    method: "POST",
	    success: function(response) {
 
	    	response.forEach((item, index)=>{       
		        data.push([
		          item.ntcNo,
		          item.ntcTtl,
		          item.usrNm,
		          formatDateToYYYYMMDD(item.ntcWrtDt),
		          item.ntcInqCnt
		        ]);
	       });

	      // 워크북 생성
	      var wb = XLSX.utils.book_new();
	      var ws = XLSX.utils.aoa_to_sheet(data);
	
	      // 워크북에 워크시트 추가
	      XLSX.utils.book_append_sheet(wb, ws, "SRM_공지사항");
	
	      // 엑셀 파일 생성 및 다운로드
	      var today = new Date();
	      var filename = "SRM_공지사항_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
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