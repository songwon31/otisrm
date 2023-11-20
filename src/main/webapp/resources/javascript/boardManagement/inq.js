$(init)

function init() {
	 console.log("실행")
	 requestInsertDate();		 			
}
 
var pageNo = 1;
$(document).ready(function() {
	loadInqs(pageNo);
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

//**문의 목록 불러오기
var id = "";
function loadInqs(pageNo) {
	//페이지 지정
	$("#ntcPageNo").val(pageNo);
	$.ajax({
    url: "getInqByPageNo",
    data: { 
    	inqPageNo: parseInt(pageNo),
    	searchTarget: $("#searchTarget option:selected").val(),
    	keyword: $("#keyword").val()
    },
    dataType: "json",
    method: "POST",
    success: function(data) {
    	console.log("내권한: " + $("#loginUsrAuthrt2").val());
      html="";
      //FAQ 표시
      html += '<tr onclick="toggleTr(10000)" class="data-tr-faq" style="background-color: #f2f7fd;">'; // 일반 행 스타일 적용
      html += '  <td class="text-primary" style="font-weight:bold;">FAQ</td>';
      html += '  <td class="truncate-text">O1.[접속] 어떻게 접속하는지 모르겠어요.</td>';
      html += '  <td class="truncate-text">최고관리자</td>';
      html += '  <td>23-10-30</td>';
      html += '  <td></td>';
      html += '  <td><i class="material-icons">expand_more</i></td>';
      html += '</tr>'; 
      html += '<tr id="10000" class="inqAnsTr hidden">';
	  html += '  <td colspan="6" style="background-color: #e9ecef;">';
	  html += '    <p class="mt-2 t2_nonMessage">A. http://localhost:8080/otisrm/home 주소로 접속하시면 됩니다.</p>';
	  html += '  </td>';
	  html += '</tr>';
	  
	  html += '<tr onclick="toggleTr(1001)" class="data-tr-faq" style="background-color: #f2f7fd;">'; // 일반 행 스타일 적용
	  html += '  <td class="text-primary" style="font-weight:bold;">FAQ</td>';
	  html += '  <td class="truncate-text">Q2.[로그인] 로그인이 안되요</td>';
	  html += '  <td class="truncate-text">최고관리자</td>';
	  html += '  <td>23-10-30</td>';
	  html += '  <td></td>';
	  html += '  <td><i class="material-icons">expand_more</i></td>';
	  html += '</tr>'; 
	  html += '<tr id="1001" class="inqAnsTr hidden">';
	  html += '  <td colspan="6" style="background-color: #e9ecef;">';
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
	  html += '  <td></td>';
	  html += '  <td><i class="material-icons">expand_more</i></td>';
	  html += '</tr>'; 
	  html += '<tr id="1002" class="inqAnsTr hidden">';
	  html += '  <td colspan="6" style="background-color: #e9ecef;">';
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
      if (data < 1) {
        html += '<tr style="background-color: white;">';
        html += '  <td colspan="6">';
        html += '    <p class="t2_nonMessage">해당 목록 결과가 없습니다.</p>';
        html += '  </td>';
        html += '</tr>';
      } else {
	    data.forEach((item, index) => {
          const formattedDate = formatDateToYYYYMMDD(item.inqWrtDt);
          var indexOnPage = (pageNo - 1) * 12 + 1;
          id = item.inqNo
          //비밀글 일때
          if(item.inqPrvtYn == "Y"){
        	  console.log( $("#loginUsrAuthrt2").val());
        	  //로그인한 회원의 비밀글 일때
        	  if(item.usrNo == $("#loginUsr2").val()|| $("#loginUsrAuthrt2").val() == "SYS_MANAGER"){        		  
        		  html += '<tr onclick="toggleTr('+ item.inqNo +')" class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
        		  html += '  <td><i style="font-size: 2.0rem; color: #5d6e82;" class="material-icons">lock</i></td>';
        		  html += '  <td class="truncate-text">' + item.inqTtl + '</td>';
        		  html += '  <td class="truncate-text">' + item.usrNm + '</td>';
        		  html += '  <td>' + formattedDate + '</td>';
        		  html += '  <td>' + item.inqAnsYn + '</td>';
        		  html += '  <td><button type="button" id="showinqDetailBtn" class="btn-1" data-toggle="modal" data-target="#answelInq" onclick="showInqDtail(\'' + item.inqNo + '\')">상세보기</button></td>';
        		  html += '</tr>';
        		
 
        	  //로그인한 회원의 비밀글이 아닐 때
        	  }else if(item.usrNo !== $("#loginUsr2").val()){
        		  html += '<tr onclick="toggleTr('+ item.inqNo +')" class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
        		  html += '  <td><i style="font-size: 2.0rem; color: #5d6e82;" class="material-icons">lock</i></td>';
        		  html += '  <td class="truncate-text">' + item.inqTtl + '</td>';
        		  html += '  <td class="truncate-text">' + item.usrNm + '</td>';
        		  html += '  <td>' + formattedDate + '</td>';
        		  html += '  <td>' + item.inqAnsYn + '</td>';
        		  html += '  <td><button type="button" style="opacity: 0.5;" class="btn-1" disabled>상세보기</button></td>';
        		  html += '</tr>';
        	  }
           }else if(item.inqPrvtYn == "N"){
        		  html += '<tr onclick="toggleTr('+ item.inqNo +')" class="data-tr" style="background-color: white;">'; // 일반 행 스타일 적용
                  html += '  <td>'+ indexOnPage +'</td>';
                  html += '  <td class="truncate-text">' + item.inqTtl + '</td>';
                  html += '  <td class="truncate-text">' + item.usrNm + '</td>';
                  html += '  <td>' + formattedDate + '</td>';
                  html += '  <td>' + item.inqAnsYn + '</td>';
                  html += '  <td><button type="button" id="showinqDetailBtn" class="btn-1" data-toggle="modal" data-target="#answelInq" onclick="showInqDtail(\'' + item.inqNo + '\')">상세보기</button></td>';
                  html += '</tr>';
              
          }
        });
      }
      html +='<tr class="empty-tr" style="height: 100%;">';
      html +='</tr>';
      $("#getInqListByPageNo").html(html);
      
      //데이터가 없을 경우 페이징 숨기기
      var paginationContainer = document.getElementById("pagination-container");
  
      if(data.length<1){
    	  console.log($("pagination-container"));
    	  $(".btn").hide();
      }else{
    	  updatePagination(pageNo);
    	  $(".btn").show();
      }
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

function toggleTr(id) {
	  $("#"+id).toggleClass("hidden");
}

//**상태에 따른 페이징 업데이트 함수
function updatePagination(pageNo) {
	  $.ajax({
	    url: "getCountInqBySearch",
	    data: {
	    	inqPageNo: parseInt(pageNo),
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
	          pagerHtml += '<a  href="javascript:loadInqs(1)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">처음</a>';
	          
	          // 이전 페이지 버튼 생성
	          if (currentPageNo > 1) {
	            pagerHtml += '<a href="javascript:loadInqs(' + (currentPageNo - 1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:0.5rem;">이전</a>';
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
	            pagerHtml += '<a href="javascript:loadInqs(' + (currentPageNo + 1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:0.5rem;">다음</a>';
	          } else {
	            pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:0.5rem;">다음</a>';
	          }
	          
	          // 맨끝 페이지 버튼 생성
	          pagerHtml += '<a href="javascript:loadInqs(' + totalPageNo + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">맨끝</a>';
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




//등록 폼 오늘날짜로 자동 설정
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
	document.getElementById('writeDate2').value = todayFormatted;
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

//**문의 등록하기
function submitInq(){
	var form = $("#writeInq")[0];
	var formData = new FormData(form); // 폼 엘리먼트를 선택하고, [0]을 사용하여 DOM 요소로 변환
	console.log(form);
	console.log(formData);
	$.ajax({
	    url: "writeInq", // 요청을 보낼 URL
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

//문의 등록 폼에  체크여부
function isPrvnChecked(){
	var isChecked = $("#prvnChk").prop("checked");
	if(isChecked === true){
		$("#inqPrvtYn").val("Y");
	}else{
		$("#inqPrvtYn").val("N");
	}
}
function isPrvnChecked2(){
	var isChecked = $("#prvnChk2").prop("checked");
	if(isChecked === true){
		$("#inqPrvtYn2").val("Y");
	}else{
		$("#inqPrvtYn2").val("N");
	}
}

//** 문의목록에 해당하는 문의 상세 가져오기(모달)
function showInqDtail(choiceInqNo){
	$.ajax({
		type: "GET",
        url: "getInqByInqNo",
        data: {inqNo: choiceInqNo},
        success: function(data) {
        	console.log("문의상세: " + data.toString());
        	$("#showInqAtch").hide();
        	var date = new Date(data.inqWrtDt);
        	
        	//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsr2").val();// 로그인한 회원 번호 가져오기 
        	var modifySaveBtn = $("#modifySaveBtn");
        	console.log("내권한: " + $("loginUsrAuthrt2").val());
        	// 로그인한 사용자와 문의을 등록한 회원을 비교하여 버튼 활성화/비활성화
        	if (data.usrNo === loggedInUsrNo) {
        		modifySaveBtn.prop("disabled", false); // 버튼을 활성화
        		modifySaveBtn.css("opacity", 1); // 버튼을 완전 불투명으로 설정
        	} else{
        		modifySaveBtn.prop("disabled", true); // 버튼을 비활성화
        		modifySaveBtn.css("opacity", 0.5); // 버튼을 반투명으로 설정 (예시로 0.5 사용)
        	}
        	var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);

        	$("#getInq-usrNo").val(data.usrNo);
        	$("#getInq-usrNm").val(data.usrNm);
        	$("#getInq-iqnTtl").val(data.inqTtl);
        	$("#getInq-inqConts").val(data.inqConts);
        	$("#getInq-inqWrtDt").val(formattedDate);
        	$("#ans-inqNo").val(data.inqNo);
       
        	//첨부파일
        	if (data.inqAtchList && typeof data.inqAtchList === "object") {
        	    // data.srRqstAtchList는 객체일 때
        	    const keys = Object.keys(data.inqAtchList);
        	    if (keys.length !== 0) {
        	        let html = "";
        	        for (const key of keys) {
        	            const inqAtch = data.inqAtchList[key];
        	            console.log(inqAtch);
        	            if (inqAtch && inqAtch.inqNo === data.inqNo) {
        	                $("#showInqAtch").show();
        	                console.log("같음");
        	                var size = bytesToKB(inqAtch.inqAtchSize);
        	                html += '<a href="filedownloadOfInq?inqAtchNo='+ inqAtch.inqAtchNo +'" class="d-flex srRqstAtchWrap">';
        	                html += '    <div>';
        	                html += '    	<i class="material-icons atch-ic">download</i>';
        	                html += '    </div>';
        	                html += '    <div id="' + inqAtch.inqAtchNo + '" class="srRqstAtch p-1">' + inqAtch.inqAtchNm + ' (' + size + 'KB)</div>';
        	                html += '</a>';
        	            }
        	        }
        	        $("#showInqAtch").html(html);
        	    } else {
        	        // srRqstAtchList가 객체지만 아무 항목도 없을 때
        	        $("#showInqAtch").hide();
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        	    $("#showInqAtch").hide();
        	}
        	if (data.inqPrvtYn === "Y") {
        	    $("#prvnChk2").prop("checked", true);
        	} else {
        	    $("#prvnChk2").prop("checked", false);
        	}
        	
        	//문의답변 상세
        	if(data.inqAnsYn === "Y"){
        		console.log("답변있움ㅎㅎ");
        		showInqAnstDtail(choiceInqNo);
        	}
        	
        },
        error: function() {
          console.log(error);
        }
    });
}

//** 문의답변에 해당하는 문의 상세 가져오기(모달)
function showInqAnstDtail(choiceInqNo){
	$.ajax({
		type: "GET",
        url: "getInqByInqNo",
        data: {inqNo: choiceInqNo},
        success: function(data) {
        	console.log("문의상세: " + data.toString());
        	$("#showInqAnsAtch").hide();
        	var date = new Date(data.inqAnsWrtDt);
        	
        	//저장버튼(관리자만 답변 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsr2").val();// 로그인한 회원 번호 가져오기 
        	var submitInqAnsBtn = $("#submitInqAnsBtn");
        	
        	// 로그인한 사용자와 문의을 등록한 회원을 비교하여 버튼 활성화/비활성화
        	if ($("#loginUsrAuthrt2").val() === "SYS_MANAGER") {
        		submitInqAnsBtn.prop("disabled", false); // 버튼을 활성화
        		submitInqAnsBtn.css("opacity", 1); // 버튼을 완전 불투명으로 설정
        	} else{
        		submitInqAnsBtn.prop("disabled", true); // 버튼을 비활성화
        		submitInqAnsBtn.css("opacity", 0.5); // 버튼을 반투명으로 설정 (예시로 0.5 사용)
        	}
        	var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
        	
        	$("#getInq-usrNo").val(data.usrNo);
        	$("#writer").val(data.usrNm);
        	$("#inqAnsTtl").val(data.inqAnsTtl);
        	$("#inqAnsConts").val(data.inqAnsConts);
        	$("#writeDate2").val(formattedDate);
        	$("#ans-inqNo").val(data.inqNo);
       
        	//첨부파일
        	if (data.inqAnsAtchList && typeof data.inqAnsAtchList === "object") {
        	    // data.srRqstAtchList는 객체일 때
        	    const keys = Object.keys(data.inqAnsAtchList);
        	    if (keys.length !== 0) {
        	        let html = "";
        	        for (const key of keys) {
        	            const inqAnsAtch = data.inqAnsAtchList[key];
        	            if (inqAnsAtch && inqAnsAtch.inqAnsNo === data.inqAnsNo) {
        	                $("#showInqAnsAtch").show();
        	                console.log("같음");
        	                var size = bytesToKB(inqAnsAtch.inqAnsAtchSize);
        	                html += '<a href="filedownloadOfInqAns?inqAnsAtchNo='+ inqAnsAtch.inqAnsAtchNo +'" class="d-flex srRqstAtchWrap">';
        	                html += '    <div>';
        	                html += '    	<i class="material-icons atch-ic">download</i>';
        	                html += '    </div>';
        	                html += '    <div id="' + inqAnsAtch.inqAnsAtchNo + '" class="srRqstAtch p-1">' + inqAnsAtch.inqAnsAtchNm + ' (' + size + 'KB)</div>';
        	                html += '</a>';
        	            }
        	        }
        	        $("#showInqAnsAtch").html(html);
        	    } else {
        	        // srRqstAtchList가 객체지만 아무 항목도 없을 때
        	        $("#showInqAnsAtch").hide();
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        	    $("#showInqAnsAtch").hide();
        	}
        	
        },
        error: function() {
          console.log(error);
        }
    });
}

function modalClose(){
	$("#answerInq").modal("hide");
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

//**문의답변 등록하기
function submitInqAns(){
	var form = $("#writeInqAnsForm")[0];
	var formData = new FormData(form); // 폼 엘리먼트를 선택하고, [0]을 사용하여 DOM 요소로 변환
	console.log(form);
	console.log(formData);
	$.ajax({
	    url: "writeInqAnsByInqNo", // 요청을 보낼 URL
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
	    ["번호", "제목", "등록자", "등록일", "답변여부"],
	  ];
	//페이지 지정
	$("#inqPageNo").val(pageNo);
	
	$.ajax({
	    url: "getInqByPageNo",
	    data: { 
	    	inqPageNo: parseInt(pageNo),
	    	searchTarget: $("#searchTarget option:selected").val(),
	    	keyword: $("#keyword").val()
	    },
	    dataType: "json",
	    method: "POST",
	    success: function(response) {
 
	    	response.forEach((item, index)=>{       
		        data.push([
		          item.inqNo,
		          item.inqTtl,
		          item.usrNm,
		          formatDateToYYYYMMDD(item.inqWrtDt),
		          item.inqAnsYn
		        ]);
	       });

	      // 워크북 생성
	      var wb = XLSX.utils.book_new();
	      var ws = XLSX.utils.aoa_to_sheet(data);
	
	      // 워크북에 워크시트 추가
	      XLSX.utils.book_append_sheet(wb, ws, "SRM_문의목록");
	
	      // 엑셀 파일 생성 및 다운로드
	      var today = new Date();
	      var filename = "SRM_문의목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
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
  setTimeout("closeLoadingWithMask()", 500);
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
