$(init)

function init() {
	 console.log("실행")
	 requestInsertDate();
	 eventPreventSrRqstAtch();				
}
 
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

function onsubmitOfSearchForm(){
	if($("#searchTarget").val() === ""){
		event.preventDefault();
		alert("검색 조건을 선택해주세요.");
	}
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
          html += '  <td><button type="button" id="showSrRqstDetailBtn" class="btn-1" data-toggle="modal" data-target="#getNtcByNtcNo" onclick="showNtcByNtcNo(\'' + item.ntcNo + '\')">상세보기</button></td>';
          html += '</tr>';
        });

        // 일반 행 표시
        normalRows.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.ntcWrtDt);
          var indexOnPage = index + 1; //인덱스 계산

          html += '<tr class="data-tr" style="background-color:white;">'; // 일반 행 스타일 적용
          html += '  <td>' + indexOnPage + '</td>';
          html += '  <td class="truncate-text">' + item.ntcTtl + '</td>';
          html += '  <td class="truncate-text">' + item.usrNm + '</td>';
          html += '  <td>' + formattedDate + '</td>';
          html += '  <td>' + item.ntcInqCnt + '</td>';
          html += '  <td><button type="button" id="showSrRqstDetailBtn" class="btn-1" data-toggle="modal" data-target="#getNtcByNtcNo" onclick="showNtcByNtcNo(\'' + item.ntcNo + '\')">상세보기</button></td>';
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
	        
	        // 페이징 파트 구성
	        let pagerHtml = '';
	        if (totalRows === 0) {
	          pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">처음</a>';
	          pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
	          pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">1</a>';
	          pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
	          pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">맨끝</a>';
	        } else {
	          // 현재 페이지 번호 업데이트
	          var currentPageNo = pageNo;
	          
	          // 처음 페이지 버튼 생성
	          pagerHtml += '<a  href="javascript:loadNtcs(1)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">처음</a>';
	          
	          // 이전 페이지 버튼 생성
	          if (currentPageNo > 1) {
	            pagerHtml += '<a href="javascript:loadNtcs(' + (currentPageNo - 1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:0.5rem;">이전</a>';
	          } else {
	            pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:0.5rem;">이전</a>';
	          }
	          
	          // 페이지 번호 버튼 생성
	          for (let i = 1; i <= totalPageNo; i++) {
	            pagerHtml += '<div style="width: 0.5rem;"></div>';
	            if (i === currentPageNo) {
	              // 현재 페이지 번호는 활성화된 스타일을 적용
	              pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; font-weight:700; color:blue; height: 3rem; line-height: 3rem;">' + i + '</a>';
	            } else {
	              pagerHtml += '<a href="javascript:loadNtcs(' + i + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">' + i + '</a>';
	            }
	            pagerHtml += '<div style="width: 0.5rem;"></div>';
	          }
	          
	          // 다음 페이지 버튼 생성
	          if (currentPageNo < totalPageNo) {
	            pagerHtml += '<a href="javascript:loadNtcs(' + (currentPageNo + 1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:0.5rem;">다음</a>';
	          } else {
	            pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:0.5rem;">다음</a>';
	          }
	          
	          // 맨끝 페이지 버튼 생성
	          pagerHtml += '<a href="javascript:loadNtcs(' + totalPageNo + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">맨끝</a>';
	        }
	        
	        // 페이지 버튼 컨테이너 업데이트
	        $("#pagination-container").html(pagerHtml);
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


//Byte를 KB로 변환
function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // 소수점 두 자리까지 표시
}




//공지 등록 폼 오늘날짜로 자동 설정
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

//** 공지목록에 해당하는 공지 상세 가져오기(모달)
function showNtcByNtcNo(choiceNtcNo){
	$.ajax({
		type: "GET",
        url: "getNtcByNtcNo",
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
        	                html += '<a href="filedownloadOfNtc?ntcAtchNo='+ ntcAtch.ntcAtchNo +'" class="d-flex srRqstAtchWrap">';
        	                html += '    <div>';
        	                html += '    	<i class="material-icons atch-ic">download</i>';
        	                html += '    </div>';
        	                html += '    <div id="' + ntcAtch.ntcAtchNo + '" class="srRqstAtch p-1">' + ntcAtch.ntcAtchNm + ' (' + size + 'KB)</div>';
        	                html += '</a>';
        	            }
        	        }
        	        $("#showNtcAtch").html(html);
        	    } else {
        	        // srRqstAtchList가 객체지만 아무 항목도 없을 때
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
//공지 수정  폼에 체크여부
function isImportendChecked2(){
	var isChecked = $("#ntc-importantChk").prop("checked");
	if(isChecked === true){
		$("#submit_Yn").val("Y");
	}else{
		$("#submit_Yn").val("N");
	}
}

//sr요청 수정 폼 제출 데이터 세팅
function modifySubmitData(){
	$("#submitSrRqst-srTtl").val($("#ntc-ntcTtl").val());
	$("#submitSrRqst-srPrps").val($("#srRqst-srPrps").val());
	$("#submitSrRqst-srConts").val($("#srRqst-srConts").val());
	var isChecked = $("#srRqst-importantChk").prop("checked");
	if(isChecked === true){
		$("#submit_Yn").val("Y");
	}else{
		$("#submit_Yn").val("N");
	}
}

//공지 수정
function modifyNtc(srRqstNo) {
	modifySubmitData();
	// 데이터 수집 및 가공
	var form = $("#modifyNtc")[0];
	var formData = new FormData(form);
    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "modifyNtc",
        data: formData,
        success: function (data) {
            // 성공적으로 요청이 완료된 경우 실행할 코드
            var currentURL = window.location.href;
            window.location.href = currentURL; // 원하는 URL로 변경
            loadNtcs(pageNo);
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            alert("수정 실패");
        },
        cache: false,        //파일이 포함되어 있으니, 브라우저 메모리에 저장하지 마라
	    processData: false,  //title=xxx&desc=yyy& 씩으로 만들지 마라
	    contentType: false,   //파트마다 Content-Type이 포함되기 때문에 따로 헤더에 Content-Type에 추가하지 마라(mutiple-> 파일마다 모두 다름)
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

