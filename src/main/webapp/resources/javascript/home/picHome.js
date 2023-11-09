$(init)

function init() {
	 requestInsertDate();
	 eventPreventSrRqstAtch();
	 getTotalRows(choiceSrRqstSttsNo);
	 showSrRqstStts();			 
	 console.log( $("#loginUsrNo").val());
	 numOftotalRows();
}
 
var choiceSrRqstSttsNo = "";
var pageNo = 1;
$(document).ready(function() {
	//필터링 텝 선택 효과
	$(".filterTab").click(function() {
	    // 클릭된 요소의 스타일을 변경
	    $(this).css({
	    	"background-color": "#edf2f8",
	        "color": "black"
	    });
	    $(".filterTab").not(this).css({
	        "background-color": "",
	        "color": ""
	    });
	    choiceSrRqstSttsNo = $(event.target).parent().attr("id");
	    console.log(choiceSrRqstSttsNo);
	    //필터링 된 상품 불러오기
	    loadSRRequests(1, choiceSrRqstSttsNo);
	});	
  loadSRRequests(1, choiceSrRqstSttsNo); //페이지 로딩 시 초기 데이터 로드
  
  //라디오 버튼 변경 이벤트 리스너 추가
  $("#srTrnsf-info").hide();
  document.querySelectorAll('input[name="srTrnsfYn"]').forEach(function(radio) {
      radio.addEventListener('change', function() {
          if (radio.value === 'Y') {
              // "이관신청" 라디오 버튼을 선택했을 때
              // srTnsfYn_Y 클래스를 가진 요소들을 활성화
              document.querySelectorAll('.srTrnsfYn_Y').forEach(function(element) {
                  element.disabled = false;
              });
              $("#srTrnsf-info").show();
          } else {
              // "자체개발" 라디오 버튼을 선택했을 때
              // srTnsfYn_Y 클래스를 가진 요소들을 비활성화
              document.querySelectorAll('.srTrnsfYn_Y').forEach(function(element) {
                  element.disabled = true;
              });
              $("#srTrnsf-info").hide();
          }
      });
  });

});

//요청 삭제모달 닫기 이벤트
function cancelBtnForDeleteModal(){
	 $('#srRqstdeleteModal').modal('hide');
}


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
    url: "getSRRequestsByPageNoForPicHome",
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
      data.forEach((item, index)=>{ 	  	  
		  var indexOffset = (pageNo - 1) * 5; // 페이지 번호에 따라 index 오프셋 계산
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
		  html += '	<td><button type="button" id="showSrRqstDetailBtn" class="btn-2" data-toggle="modal" data-target="#srRqstBySrNo" onclick="showSrRqstBySrRqstNo(\''+ item.srRqstNo +'\')">상세보기</button></td>';
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
	//전체
	getTotalRows("").then(function (totalRows) {
		  console.log(totalRows);
		  $("#numOfAll").html("("+ totalRows + ")");
		});
	//요청
	getTotalRows("RQST").then(function (totalRows) {
		  console.log(totalRows);
		  $("#numOfRqst").html("("+ totalRows + ")");
		});
	//승인대기 
	getTotalRows("APRV_WAIT").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfAprvWait").html("("+ totalRows + ")");
	});
	//승인
	getTotalRows("APRV").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfAprv").html("("+ totalRows + ")");
	});
	//접수대기
	getTotalRows("RCPT_WAIT").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfRcptWait").html("("+ totalRows + ")");
	});
	//접수
	getTotalRows("RCPT").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfRcpt").html("("+ totalRows + ")");
	});
	//개발중
	getTotalRows("DEP_ING").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfDepIng").html("("+ totalRows + ")");
	});
	//테스트
	getTotalRows("TEST").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfTest").html("("+ totalRows + ")");
	});
	//완료요청
	getTotalRows("CMPTN_RQST").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfCmptnRqst").html("("+ totalRows + ")");
	});
	//개발완료
	getTotalRows("DEP_CMPTN").then(function (totalRows) {
		console.log(totalRows);
		console.log(choiceSrRqstSttsNo);
		$("#numOfDepCmptn").html("("+ totalRows + ")");
	});
}

//**총 행수 구하기
function getTotalRows(choiceSrRqstSttsNo) {
  return new Promise(function (resolve, reject) {
    $.ajax({
      url: "getCountSRRequestsByStatusForPicHome",
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
    url: "getCountSRRequestsByStatusForPicHome",
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
        
        // 이전/다음 페이지 버튼 표시 여부 결정
        var showPrev = currentPageNo > 1;
        var showNext = currentPageNo < totalPageNo;
        
        // 이전/다음 페이지 버튼 생성
        var prevButton = '<a class="page-button btn" href="javascript:loadSRRequests(' + (currentPageNo - 1) + ',\''+ choiceSrRqstSttsNo +'\')">이전</a>';
        var nextButton = '<a class="page-button btn" href="javascript:loadSRRequests(' + (currentPageNo + 1) + ',\''+ choiceSrRqstSttsNo +'\')">다음</a>';
        
        // 페이지 번호 버튼 생성
        var pageButtons = '';
        for (var i = 1; i <= totalPageNo; i++) {
          if (i === currentPageNo) {
            // 현재 페이지 번호는 활성화된 스타일을 적용
            pageButtons += '<a class="page-button btn active" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          } else {
            pageButtons += '<a class="page-button btn" href="javascript:loadSRRequests(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
          }
        }
        
        // 이전 페이지 버튼을 표시
        if (showPrev) {
          pageButtons = '<a class="page-button btn" href="javascript:loadSRRequests(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>' + prevButton + pageButtons;
        } else {
          pageButtons = '<a class="page-button btn" href="javascript:loadSRRequests(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>' + pageButtons;
        }
        
        // 다음 페이지 버튼을 표시
        if (showNext) {
          pageButtons += nextButton + '<a class="page-button btn" href="javascript:loadSRRequests(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        } else {
          pageButtons += '<a class="page-button btn" href="javascript:loadSRRequests(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
        }
        
        // 페이지 버튼 컨테이너 업데이트
        $("#pagination-container").html(pageButtons);
    },
    error: function (error) {
      console.error("총 행 수를 가져오는 중 오류가 발생했습니다.");
    }
  });
}

function onsubmit(){
	 event.preventDefault();
}

//Byte를 KB로 변환
function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // 소수점 두 자리까지 표시
}

//요청 상태 불러오기
function showSrRqstStts() {
	$.ajax({
		type: "GET", 
		url: "getSrRqstSttsForPicHome", 
		success: function (data) {
			// 서버 응답을 처리하여 개발부서 목록을 업데이트 
			let html = "";
			// 서버 응답을 처리하여 개발부서 목록을 업데이트
        	html += '<option value="">선택</option>';
      		data.forEach((item, index) => {	
      			html += '<option id="'+ item.srRqstSttsSeq +'" value="'+ item.srRqstSttsNo +'">'+item.srRqstSttsNm+'</option>';
       		});
		   // HTML 콘텐츠를 검색한 부서 데이터로 업데이트
           $("#srRqstStts-select").html(html);
           // "srRqstStts-select" select 요소에서 seq가 0 이상인 모든 option을 숨기기
           $("#srRqstStts-select option[id]").filter(function() {
               return parseInt($(this).attr("id")) >= 4;
           }).css("display", "none");
           
           $("#srRqstStts-select2").html(html);
           
           //접수대기-> 접수요청으로 상태 변경
           $("#srRqstStts-select2 option[value='RCPT_WAIT']").text("접수요청");
           
           //승인재검토, 승인반려,승인 & 접수재검토, 접수반려, 접수 상태 숨기기
           $("#srRqstStts-select2 option[value='RQST']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='APRV_WAIT']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='APRV_REEXAM']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='APRV_RETURN']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='APRV']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='RCPT_REEXAM']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='RCPT_RETURN']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='RCPT']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='DEP_CMPTN']").prop("selected", true).css("display", "none");
           $("#srRqstStts-select2 option[value='']").prop("selected", true);
           
       },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

//**요청에 해당하는 상세 정보 가져오기 (모달)
function showSrRqstBySrRqstNo(choiceSrRqstNo){
	//sr요청 상세
	$.ajax({
		type: "GET",
        url: "getSrRqstBySrRqstNoForPicHome",
        data: {srRqstNo: choiceSrRqstNo},
        success: function(data) {
        	var date = new Date(data.srRqstRegDt);
        	console.log(data);
        	//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsrNo").val();// 로그인한 회원 번호 가져오기 
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
        	
        	//검토 사유
        	if(data.srRqstRvwRsn !== null || data.srRqstRvwRsn !==""){
        		console.log("검토있음: " + data.srRqstRvwRsn);
        		$("#srRqst-review").val(data.srRqstRvwRsn);
        	}
        	
        	//요청 상태
        	if(data.srRqstSttsNo === "RQST"){
        		 $("#srRqstStts-select").val(data.srRqstSttsNo);
        		 //승인대기->승인요청으로변경 
                 $("#srRqstStts-select option[value='APRV_WAIT']").text("승인요청");
        		 $("#srRqstStts-select option[id]").filter(function() {
                     return parseInt($(this).attr("id")) >= 2;
                 }).css("display", "none");
        	}else if(data.srRqstSttsNo === "APRV_WAIT"){        		
        		$("#srRqstStts-select").val(data.srRqstSttsNo);
        		$("#srRqstStts-select").prop("disabled", true);
        	}else if(data.srRqstSttsNo === "APRV_REEXAM" || data.srRqstSttsNo === "APRV_RETURN"){
        		$("#srRqstStts-select").val(data.srRqstSttsNo);
        		$("#srRqstStts-select").prop("disabled", true);
        	}else{
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        	}
        	
        	//요청상태가 요청 이상일 때 수정 및 삭제 불가능(버튼 속성 변경)
        	if(data.srRqstSttsNo !== "RQST"){
        		$("#deleteButton").prop("disabled", true);
        		$("#deleteButton").css("opacity", 0.5);
        		$(".srRqstModify").prop("disabled", true);
        		saveButton.prop("disabled", true); // 버튼을 비활성화
        		saveButton.css("opacity", 0.5); // 버튼을 반투명으로 설정 (예시로 0.5 사용)
        	}else{
        		$("#deleteButton").prop("disabled", false);
        		$("#deleteButton").css("opacity", 1);
        		$(".srRqstModify").prop("disabled", false);
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
        	                var size = bytesToKB(srRqstAtch.srRqstAtchSize);
        	                html += '<a href="filedownloadForPicHome?srRqstAtchNo='+ srRqstAtch.srRqstAtchNo +'" class="d-flex srRqstAtchWrap">';
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
	
	 showSrBySrRqstNo(choiceSrRqstNo);
}

//**요청에 해당하는 sr상세내용 가져오기;
function showSrBySrRqstNo(choiceSrRqstNo){
	console.log("데이터 앙 !!실행함");
	//sr요청 상세
	$.ajax({
		type: "GET",
		url: "getSrBySrRqstNoForPicHome",
		data: {srRqstNo: choiceSrRqstNo},
		success: function(data) {
			if(data != 0){
				console.log("데이터 앙 !!");
				//sr번호 지정
				$("#srNo").val(data.srNo);
				
				var date = new Date(data.srCmptnPrnmntDt);
				console.log(data);
				
				//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
				var loggedInUsrNo= $("#loginUsrNo").val();// 로그인한 회원 번호 가져오기 
				var saveButton = $("#saveButton2");
				
			    // 로그인한 사용자와 요청을 등록한 회원을 비교하여 버튼 활성화/비활성화
				if (data.picUsrNo === loggedInUsrNo) {
					console.log("내sr");
					saveButton.prop("disabled", false); // 버튼을 활성화
					saveButton.css("opacity", 1); // 버튼을 완전 불투명으로 설정
				} else{
					console.log("내요청 아님");
					saveButton.prop("disabled", true); // 버튼을 비활성화
					saveButton.css("opacity", 0.5); // 버튼을 반투명으로 설정 (예시로 0.5 사용)
				}
				var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
				//이관여부
				$('input[name="srTrnsfYn"][value="'+ data.srTrnsfYn +'"]').prop('checked', true);
				//이관되었을때
				if(data.srTrnsfYn === "Y"){					
					//이관 기간 선택
					$("#trnsf-inst").val(data.srTrnsfInstNo);
					//소요예산
					$("#trnsf-srReqBgt").val(data.srReqBgt.toLocaleString('ko-KR'));//,붙인 금액
					$("#srReqBgt").val(data.srReqBgt);//, 안붙인 금액
					//요청 구분
					$("#trnsf-srDmndClsf").val(data.srDmndNo);
				}
				//업무 구분
				$("#srTaskNo").val(data.srTaskNo);
				//우선순위
				$("#srPri").val(data.srPri);
				//완료예정일
				$("#srCmptnPrnmntDt").val(formattedDate);
				//sr 개발내용
				$("#srDvlConts").val(data.srDvlConts);
				
				//첨부파일
				if (data.srAtchList && typeof data.srAtchList === "object") {
					// data.srRqstAtchList는 객체일 때
					const keys = Object.keys(data.srAtchList);
					if (keys.length !== 0) {
						let html = "";
						for (const key of keys) {
							const srAtch = data.srAtchList[key];
							console.log(srAtch);
							if (srAtch && srAtch.srNo === data.srNo) {
								$("#showSrAtch").show();
								var size = bytesToKB(srAtch.srAtchSize);
								html += '<a href="filedownloadSrAtchForPicHome?srAtchNo='+ srAtch.srAtchNo +'" class="d-flex srRqstAtchWrap">';
								html += '    <div>';
								html += '    	<i class="material-icons atch-ic">download</i>';
								html += '    </div>';
								html += '    <div id="' + srAtch.srAtchNo + '" class="srAtch p-1">' + srAtch.srAtchNm + ' (' + size + 'KB)</div>';
								html += '</a>';
							}
						}
						$("#showSrAtch").html(html);
						
					} else {
						// srRqstAtchList가 객체지만 아무 항목도 없을 때
						$("#showSrAtch").html("첨부파일이 존재하지 않습니다.");
					}
				} else {
					// srRqstAtchList가 객체가 아닐 때
					$("#showSrAtch").html("첨부파일이 존재하지 않습니다.");
				}
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
		url: "getSysByDeptNoForPicHome", 
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
	console.log(form);
	console.log(formData);
	$.ajax({
	    url: "writeSrRqstForPicHome", // 요청을 보낼 URL
	    method: "POST",
	    data: formData, // 폼 데이터를 전송
	    success: function (data) {
	    	 console.log(data);
	    	 loadSRRequests(pageNo, choiceSrRqstSttsNo);
	        // 성공적으로 요청이 완료된 경우 실행할 코드
	        var currentURL = window.location.href;
	        console.log(currentURL);
	        window.location.href = "/home"; // 또는 다른 원하는 URL로 변경
	        
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
        url: "modifySrRqstForPicHome",
        data: data,
        success: function (response) {
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


//sr 요청 삭제
function removeSrRqst() {
	// Ajax 요청 보내기
	$.ajax({
		type: "POST",
		url: "removeSrRqstForPicHome",
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

