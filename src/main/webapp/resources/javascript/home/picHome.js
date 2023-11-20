$(init)

function init() {
	 requestInsertDate();
	 eventPreventSrRqstAtch();
	 getTotalRows(choiceSrRqstSttsNo);
	 getTotalRows2(choiceSrRqstSttsNo);
	 showSrRqstStts();			 
	 console.log( $("#loginUsrNo").val());
	 numOftotalRows();
	 numOftotalRows2();
	 $(".srSchdlChgRqstY").hide();
	 //하단 상세 숨기기
	 $("#progressCircles").hide();
	 $("#isTrnsfY").hide();
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
	
	$(".filterTab2").click(function(event) {
	    // 클릭된 요소의 스타일을 변경
	    $(this).css({
	        "background-color": "#edf2f8",
	        "color": "black"
	    });
	  
	    $(".filterTab2").not(this).css({
	        "background-color": "",
	        "color": ""
	    });
	});
	
	//필터링 텝 선택 효과
	$(".toDoItem").click(function() {
		// 클릭된 요소의 스타일을 변경
		$(this).css({
			"background-color": "#edf2f8",
		});
		
		$(".filterTab").css({
			"background-color": "",
			"color": ""
		});
		$("#toDoItem").css({
			"background-color": "#edf2f8",
	        "color": "black"
		});
		$("#toDoItem").not($(".filterTab")).css({
			"background-color": "",
	        "color": ""
		});
		
		//클릭안되어있을때
		$(".toDoItem").not(this).css({
			"background-color": "",
			"color": ""
		});
		choiceSrRqstSttsNo = $(this).attr("id");
		console.log(choiceSrRqstSttsNo);
		//필터링 된 상품 불러오기
		loadSRRequests2(1, choiceSrRqstSttsNo);
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
		  html += '<tr class="data-tr" style="background-color: white;" onclick="setSrDetail(\''+ item.srRqstNo +'\')">';
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

//처리항목 목록 불러오기
function loadSRRequests2(pageNo, choiceSrRqstSttsNo) {
	$.ajax({
		url: "getToDoItemsByPageNoForPicHome",
		data: { 
			srRqstPageNo: pageNo,
			item: choiceSrRqstSttsNo
		},
		dataType: "json",
		method: "GET",
		success: function(data) {
			html="";
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
				html += '<tr class="data-tr" style="background-color: white;" onclick="setSrDetail(\''+ item.srRqstNo +'\')">';
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
			
			//데이터가 없을 경우 페이징 숨기기
			var paginationContainer = document.getElementById("pagination-container");
			
			if(data.length<1){
				$(".btn").hide();
			}else{
				updatePagination2(pageNo, choiceSrRqstSttsNo);
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
		  $("#numOfAll").html("("+ totalRows + ")");
		});
	//요청
	getTotalRows("RQST").then(function (totalRows) {
		  $("#numOfRqst").html("("+ totalRows + ")");
		  $("#numOfRqstItems").html(totalRows);
		});
	//승인대기 
	getTotalRows("APRV_WAIT").then(function (totalRows) {
		$("#numOfAprvWait").html("("+ totalRows + ")");
	});
	//승인재검토
	getTotalRows("APRV_REEXAM").then(function (totalRows) {
		$("#numOfAprvReexam").html("("+ totalRows + ")");
		$("#numOfAprvReexamItems").html(totalRows);
	});
	//승인반려
	getTotalRows("APRV_RETURN").then(function (totalRows) {
		$("#numOfAprvReturn").html("("+ totalRows + ")");
	});
	//승인
	getTotalRows("APRV").then(function (totalRows) {
		$("#numOfAprv").html("("+ totalRows + ")");
		$("#numOfAprvItems").html(totalRows);
	});
	//접수대기
	getTotalRows("RCPT_WAIT").then(function (totalRows) {
		$("#numOfRcptWait").html("("+ totalRows + ")");
	});
	//접수재검토
	getTotalRows("RCPT_REEXAM").then(function (totalRows) {
		$("#numOfRcptReexam").html("("+ totalRows + ")");
		$("#numOfRcptReexamItems").html(totalRows);
	});
	//접수반려
	getTotalRows("RCPT_RETURN").then(function (totalRows) {
		$("#numOfRcptReturn").html("("+ totalRows + ")");
	});
	//접수
	getTotalRows("RCPT").then(function (totalRows) {
		$("#numOfRcpt").html("("+ totalRows + ")");
	});
	//개발중
	getTotalRows("DEP_ING").then(function (totalRows) {
		$("#numOfDepIng").html("("+ totalRows + ")");
	});
	//테스트
	getTotalRows("TEST").then(function (totalRows) {
		$("#numOfTest").html("("+ totalRows + ")");
	});
	//완료요청
	getTotalRows("CMPTN_RQST").then(function (totalRows) {
		$("#numOfCmptnRqst").html("("+ totalRows + ")");
	});
	//개발완료
	getTotalRows("DEP_CMPTN").then(function (totalRows) {
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

//**sr요청 상태 탭 별  행수 표시
function numOftotalRows2(){
	//처리항목 목록3: 접수된 sr 
	getTotalRows2("itemOfRcpt").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfRcptItems").html(totalRows);
	});
	//처리항목 목록4: 이관된 sr
	getTotalRows2("itemOfTrnsfY").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfTrnsfYItems").html(totalRows);
	});
	//처리항목 목록5: 개발 반영요청
	getTotalRows2("itemOfApplyRqst").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfApplyRqstItems").html(totalRows);
	});
	//처리항목 목록6: 계획 변경 요청
	getTotalRows2("itemOfSchdlChg").then(function (totalRows) {
		console.log(totalRows);
		$("#numOfSchdlChgItems").html(totalRows);
	});
}

//**총 처리항목 행수 구하기
function getTotalRows2(choiceSrRqstSttsNo) {
	return new Promise(function (resolve, reject) {
		$.ajax({
			url: "getCountTodoByitemForPicHome",
			data: {
				item: choiceSrRqstSttsNo
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

      // 페이징 파트 구성
      let pagerHtml = '';

      // 처음 페이지 버튼 생성
      pagerHtml += generatePagerButton("처음", 1, choiceSrRqstSttsNo);

      // 이전 페이지 버튼 생성
      pagerHtml += generatePagerButton("이전", pageNo - 1, choiceSrRqstSttsNo, pageNo > 1);

      // 페이지 번호 버튼 생성
      for (let i = 1; i <= totalPageNo; i++) {
        pagerHtml += generatePagerButton(i, i, choiceSrRqstSttsNo, i === pageNo);
      }

      // 다음 페이지 버튼 생성
      pagerHtml += generatePagerButton("다음", pageNo + 1, choiceSrRqstSttsNo, pageNo < totalPageNo);

      // 맨끝 페이지 버튼 생성
      pagerHtml += generatePagerButton("맨끝", totalPageNo, choiceSrRqstSttsNo);

      // 페이지 버튼 컨테이너 업데이트
      $("#pagination-container").html(pagerHtml);
    },
    error: function (error) {
      console.error("총 행 수를 가져오는 중 오류가 발생했습니다.");
    }
  });
}

// 페이지 버튼 생성 함수
function generatePagerButton(label, pageNumber, choiceSrRqstSttsNo, condition = true) {
  const style = "font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right: 0.5rem;";
  const inactiveStyle = "color:#868e96; cursor:default;";

  if (condition) {
    return `<a href="javascript:loadSRRequests(${pageNumber}, '${choiceSrRqstSttsNo}')" style="${style}">${label}</a>`;
  } else {
    return `<a href="javascript:void(0)" style="${style} ${inactiveStyle}">${label}</a>`;
  }
}
//**상태에 따른 처리항목 페이징 업데이트 함수
function updatePagination2(pageNo, choiceSrRqstSttsNo) {
	$.ajax({
		url: "getCountTodoByitemForPicHome",
		data: {
			item: choiceSrRqstSttsNo
		},
		dataType: "json",
		method: "GET",
		success: function (totalRows) {
			// totalRows를 기반으로 페이징을 업데이트
			var totalPageNo = Math.ceil(totalRows / 5); // 페이지 수 계산 (5는 페이지당 항목 수)
			
			// 현재 페이지 번호 업데이트
			var currentPageNo = pageNo;
			
			// 처음/맨끝 페이지 버튼 생성
			var firstButton = '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests2(1,\''+ choiceSrRqstSttsNo +'\')">처음</a>';
			var lastButton = '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests2(' + totalPageNo + ',\''+ choiceSrRqstSttsNo +'\')">맨끝</a>';
			
			// 페이지 번호 버튼 생성
			var pageButtons = '';
			for (var i = 1; i <= totalPageNo; i++) {
				if (i === currentPageNo) {
					// 현재 페이지 번호는 활성화된 스타일을 적용
					pageButtons += '<a class="page-button btn active" style="font-size: 1.3rem;" href="javascript:loadSRRequests2(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
				} else {
					pageButtons += '<a class="page-button btn" style="font-size: 1.3rem;" href="javascript:loadSRRequests2(' + i + ',\''+ choiceSrRqstSttsNo +'\')">' + i + '</a>';
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
        	//sr하단 내용에 데이터 세팅
        	$("#bottomSrRqstNo").text()
        	
         	//sr요청 번호에 해당하는 sr 상세 내용
        	showSrBySrRqstNo(choiceSrRqstNo);
        	
        	var date = new Date(data.srRqstRegDt);
        	$("#srWriteOrModifyBtn").text("SR정보 등록");
        	//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
        	var loggedInUsrNo= $("#loginUsrNo").val();// 로그인한 회원 번호 가져오기 
        	var saveButton = $("#saveButton");
        	
        	var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
        	
        	$("#srRqst-srRqstNo").val(data.srRqstNo);
        	$("#srRqst-UsrNm").val(data.usrNm);
        	$("#srRqst-instNm").val(data.instNm);
        	$("#srRqst-sysNm").val(data.sysNm);
        	$("#srRqst-srTtl").val(data.srTtl);
        	$("#srRqst-srPrps").val(data.srPrps);
        	$("#srRqst-srConts").val(data.srConts);
        	$("#srRqst-srRqstRegDt").val(formattedDate);
        	
        	//검토 사유
        	if(data.srRqstRvwRsn !== null || data.srRqstRvwRsn !==""){
        		$("#srRqst-review").val(data.srRqstRvwRsn);
        	}
        	
        	//상태에 따라 변경한 조건 초기화
        	$("#srRqstStts-select option").css("display", "inline");
        	$("#saveButton").prop("disabled", false);
    		$("#saveButton").css("opacity", 1);
    		
    		$("#srRqstStts-select2 option").css("display", "inline");
    		$("#srRqstStts-select2").prop("disabled", false);
    		$("#saveButton2").prop("disabled", false);
   		 	$("#saveButton2").css("opacity", 1);
   		 	$("#srWriteOrModifyBtn").prop("disabled", false);
   		 	$("#srWriteOrModifyBtn").css("opacity", 1);
   		 	$(".srInput").prop("disabled", false);
        	
   		 	
        	//요청 상태(상태: 요청, 승인요청, 승인)
        	if(data.srRqstSttsNo === "RQST"){
        		 $(".modifyPossible").prop("disabled", false);
        		 $("#srRqstStts-select").prop("disabled", false);
        		 $("#srRqstStts-select").val(data.srRqstSttsNo);
        		 //승인대기->승인요청으로변경 
                 $("#srRqstStts-select option[value='APRV_WAIT']").text("승인요청");
        		 
                 $("#srRqstStts-select option[value='APRV_REEXAM']").css("display", "none");
                 $("#srRqstStts-select option[value='APRV_RETURN']").css("display", "none");
                 $("#srRqstStts-select option[id]").filter(function() {
                     return parseInt($(this).attr("id")) > 4;
                 }).css("display", "none");
        		 
        		 //sr개발정보에 상태 표시 X, 수정 불가능/ 저장버튼 비활성화/ sr정보 등록 버튼 비활성화
        		 $("#srRqstStts-select2").prop("disabled", true);
        		 $("#saveButton2").prop("disabled", true);
        		 $("#saveButton2").css("opacity", 0.5);
        		 $("#srWriteOrModifyBtn").prop("disabled", true);
        		 $("#srWriteOrModifyBtn").css("opacity", 0.5);
        		 $(".srInput").prop("disabled", true);
        		 
        		 if(data.srReqstrNo === loggedInUsrNo){
        			 $(".modifyPossible").prop("disabled", false);
        		 }else{
        			 $(".modifyPossible").prop("disabled", true);		 
        		 }
        		
            //승인 대기 상태 (상태: 아무것도 못함)
        	}else if(data.srRqstSttsNo === "APRV_WAIT"){
        		$("#srRqstStts-select").val(data.srRqstSttsNo);
        		$("#srRqstStts-select").prop("disabled", true);
        		$("#srRqstStts-select2 option[value='APRV_WAIT']").text("승인대기");
        		
        		//sr개발정보에 상태 표시 X, 수정 불가능/ 저장버튼 비활성화/ sr정보 등록 버튼 비활성화
        		$("#srRqstStts-select2").val("");
        		$("#srRqstStts-select2").prop("disabled", true);
       		    $("#saveButton2").prop("disabled", true);
       		    $("#saveButton2").css("opacity", 0.5);
       		    $("#srWriteOrModifyBtn").prop("disabled", true);
       		    $("#srWriteOrModifyBtn").css("opacity", 0.5);
       		    $(".srInput").prop("disabled", true);
        	//승인 재검토(수정 후 승인 재요청이 가능해야 함)
        	}else if(data.srRqstSttsNo === "APRV_REEXAM"){
        		//현재 상태 표시
        		$("#srRqstStts-select").prop("disabled", true);
        		$("#srRqstStts-select").val('APRV_WAIT');
        		$("#srRqstStts-select option[value='APRV_WAIT']").text("승인 재요청");
        		$(".modifyPossible").prop("disabled", false);
        		
        		//sr개발정보에 상태 표시 X, 수정 불가능/ 저장버튼 비활성화/ sr정보 등록 버튼 비활성화
        		$("#srRqstStts-select2").val("");
        		$("#srRqstStts-select2").prop("disabled", true);
       		    $("#saveButton2").prop("disabled", true);
       		    $("#saveButton2").css("opacity", 0.5);
       		    $("#srWriteOrModifyBtn").prop("disabled", true);
       		    $("#srWriteOrModifyBtn").css("opacity", 0.5);
       		    $(".srInput").prop("disabled", true);
        	//승인반려(수정 불가능, 해당 변려건 삭제 가능)
        	}else if(data.srRqstSttsNo === "APRV_RETURN"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val(data.srRqstSttsNo);
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발정보에 상태 표시 X, 수정 불가능/ 저장버튼 비활성화/ sr정보 등록 버튼 비활성화
        		$("#srRqstStts-select2").val("");
        		$("#srRqstStts-select2").prop("disabled", true);
       		    $("#saveButton2").prop("disabled", true);
       		    $("#saveButton2").css("opacity", 0.5);
       		    $("#srWriteOrModifyBtn").prop("disabled", true);
       		    $("#srWriteOrModifyBtn").css("opacity", 0.5);
       		    $(".srInput").prop("disabled", true);
        	//승인 상태(수정 불가능)
        	}else if(data.srRqstSttsNo === "APRV"){
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발에서 sr요청 상태는 접수 요청만 변경 가능, sr개발정보 작성 및 수정 가능
        		$("#srRqstStts-select2").val("");
        		$("#srRqstStts-select2 option[id]").filter(function() {
                    return parseInt($(this).attr("id")) <= 4;
                }).css("display", "none");
        		$("#srRqstStts-select2 option[id]").filter(function() {
        			return parseInt($(this).attr("id")) >= 6;
        		}).css("display", "none");
        		$("#saveButton2").prop("disabled", false);
       		    $("#saveButton2").css("opacity", 1);
        		//접수대기-> 접수요청으로 상태 변경
                $("#srRqstStts-select2 option[value='RCPT_WAIT']").text("접수요청");
        	//접수 대기 상태	
        	}else if(data.srRqstSttsNo === "RCPT_WAIT"){
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발에서 sr요청 상태 변경 불가능, sr정보는 수정 가능
        		$("#srRqstStts-select2 option[id]").filter(function() {
                    return parseInt($(this).attr("id")) >= 9;
                }).css("display", "inline");
        		$("#srRqstStts-select2 option[value='RCPT_WAIT']").text("접수대기");
        		//상태 표시
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2").prop("disabled", true);
        		$("#saveButton2").prop("disabled", false);
       		    $("#saveButton2").css("opacity", 1);
       		    
       		//접수 재검토 상태
        	}else if(data.srRqstSttsNo === "RCPT_REEXAM"){
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발에서 수정 가능, 접수 재요청 가능
        		$("#srRqstStts-select2").val('RCPT_WAIT');
        		$("#srRqstStts-select2").prop("disabled", true);
 
        		//접수대기-> 접수요청으로 상태 변경
                $("#srRqstStts-select2 option[value='RCPT_WAIT']").text("접수재요청");
            //접수 반려(삭제만 가능)	
        	}else if(data.srRqstSttsNo === "RCPT_RETURN"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발정보에 상태 표시 X, 수정 불가능/ 저장버튼 비활성화/ sr정보 등록 버튼 비활성화
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2").prop("disabled", true);
       		    $("#saveButton2").prop("disabled", true);
       		    $("#saveButton2").css("opacity", 0.5);
       		    $("#srWriteOrModifyBtn").prop("disabled", true);
       		    $("#srWriteOrModifyBtn").css("opacity", 0.5);
       		    $(".srInput").prop("disabled", true);
       		//접수 상태
        	}else if(data.srRqstSttsNo === "RCPT"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		//sr개발정보에 상태 표시, 수정 가능/ 저장버튼 활성화/ sr정보 수정 버튼 비활성화
        		$("#srRqstStts-select2 option[value='RCPT_WAIT']").css("display", "none");
        		$("#srRqstStts-select2").val("");
        		$("#srRqstStts-select2 option[id]").filter(function() {
                    return parseInt($(this).attr("id")) <= 8;
                }).css("display", "none");
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        	}else if(data.srRqstSttsNo === "DEP_ING"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2 option[id]").filter(function() {
                    return parseInt($(this).attr("id")) <= 9;
                }).css("display", "none");
        	}else if(data.srRqstSttsNo === "TEST"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2 option[id]").filter(function() {
                    return parseInt($(this).attr("id")) <= 10;
                }).css("display", "none");
        		
        	}else if(data.srRqstSttsNo === "DEP_CMPTN"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2").prop("disabled", true);
       		    $("#saveButton2").prop("disabled", true);
       		    $("#saveButton2").css("opacity", 0.5);
       		    $("#srWriteOrModifyBtn").prop("disabled", true);
       		    $("#srWriteOrModifyBtn").css("opacity", 0.5);
       		    $(".srInput").prop("disabled", true);
        	}else if(data.srRqstSttsNo === "CMPTN_RQST"){
        		//현재 상태 표시
        		$("#srRqstStts-select").val("APRV");
        		$("#srRqstStts-select").prop("disabled", true);
        		//수정 불가능
        		$("#saveButton").prop("disabled", true);
        		$("#saveButton").css("opacity", 0.5);
        		$(".modifyPossible").prop("disabled", true);
        		
        		$("#srRqstStts-select2").val(data.srRqstSttsNo);
        		$("#srRqstStts-select2").prop("disabled", true);
        		$(".srInput").prop("disabled", true);
        	}
        	
        	//요청상태가 요청 또는 반려일때 삭제가능(버튼 속성 변경)
        	if(data.srRqstSttsNo == "RQST" && loggedInUsrNo === data.usrNo || data.srRqstSttsNo == "APRV_RETURN" ||data.srRqstSttsNo == "RCPT_RETURN" && loggedInUsrNo === data.usrNo){
        		$("#deleteButton").prop("disabled", false);
        		$("#deleteButton").css("opacity", 1);
        		$(".srRqstModify").prop("disabled", false);	
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
        	            if (srRqstAtch && srRqstAtch.srRqstNo === data.srRqstNo) {
        	                $("#showSrRqstAtch").show();
        	                var size = bytesToKB(srRqstAtch.srRqstAtchSize);
        	                html += '<a href="filedownloadForPicHome?srRqstAtchNo='+ srRqstAtch.srRqstAtchNo +'" class="d-flex srRqstAtchWrap" style="font-size:1.3rem;">';
        	                html += '    <div class="pt-2">';
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

//**요청에 해당하는 sr상세내용 가져오기;
function showSrBySrRqstNo(choiceSrRqstNo){
	clearFormFields();
	$("#srSchdlChgRqstY").hide();
	$("#srSchdlChgRqstAprvYn").hide();
	//sr요청 상세
	$.ajax({
		type: "GET",
		url: "getSrBySrRqstNoForPicHome",
		data: {srRqstNo: choiceSrRqstNo},
		success: function(data) {
			$(".srSchdlChgRqstY").hide();
			console.log("요청번호: " + choiceSrRqstNo);
			console.log("데이터: " , data);
			if(data != 0){
				console.log("앙");
				$("#srWriteOrModifyBtn").text("SR정보 수정");
				//sr번호 지정
				$("#srNo").val(data.srNo);
				
				var date = new Date(data.srCmptnPrnmntDt);
				
				//저장버튼(로그인한 회원의 요청만 저장버튼 활성화)
				var loggedInUsrNo= $("#loginUsrNo").val();// 로그인한 회원 번호 가져오기 
				var saveButton2 = $("#saveButton2");
				
				var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
				//이관여부
				$('input[name="srTrnsfYn"][value="'+ data.srTrnsfYn +'"]').prop('checked', true);
				//이관되었을때
				if(data.srTrnsfYn === "Y"){					
					//이관 기간 선택
					$("#trnsf-srinst").val(data.srTrnsfInstNo);
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
				
				//변경 요청일이 있을 경우
				if(data.srSchdlChgRqstDt !== null){
					console.log("후항: " + data.srSchdlChgRqstDt);
					//변경요청일 항목 보이게하기
					$("#srSchdlChgRqstY").show();
					$("#srSchdlChgRqstAprvYn").show();
					//날짜 포멧에 맞게 변경
					var date = new Date(data.srSchdlChgRqstDt);
					var formattedDate = $.datepicker.formatDate("yy-mm-dd", date);
					//변경일 넣어주기
					$("#srSchdlChgRqstDt").val(formattedDate);
					$("#srSchdlChgRqstDt").prop("disabled", true);
				//변경 요청일이 없을 경우 숨김
				}
				
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
								html += '<a href="filedownloadSrAtchForPicHome?srAtchNo='+ srAtch.srAtchNo +'" class="d-flex srRqstAtchWrap" style="font-size: 1.0rem;">';
								html += '    <div>';
								html += '    	<i class="material-icons atch-ic">download</i>';
								html += '    </div>';
								html += '    <div id="' + srAtch.srAtchNo + '" class="srAtch p-1 mb-2">' + srAtch.srAtchNm + ' (' + size + 'KB)</div>';
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

//폼 초기화
function clearFormFields() {
    // 각 필드를 초기화
    $("#srNo").val("");
    $("#srRqst-inst").val("");
    $("#srTrnsfYn_Y").prop("checked", false);
    $("#srTrnsfYn_N").prop("checked", false);
    $("#trnsf-inst").val("");
    $("#trnsf-srReqBgt").val("");
    $("#srReqBgt").val("");
    $("#trnsf-srDmndClsf").val("");
    $("#srTaskNo").val("");
    $("#srPri").val("");
    $("#srCmptnPrnmntDt").val("");
    $("#srDvlConts").val("");
    $("#showSrAtch").html(""); // 첨부파일 영역 비우기
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
	        window.location.href = currentURL; // 또는 다른 원하는 URL로 변경
	        
	    },
	    error: function (error) {
	        // 요청 중 오류가 발생한 경우 실행할 코드
	        console.error("작성 실패");
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
//"저장" 버튼 클릭 시 요청 수정 모달 표시
function modifySrRqst() {
    // 수정 모달 표시
    $('#srRqstModyfyModal').modal('show');
}

// 요청 수정 모달에서 확인 버튼 클릭 시 SR 요청 수정 수행
function confirmSrRqstModify() {
    var form = $("#modifySrRqstForPicHome")[0];
    var formData = new FormData(form);

    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "modifySrRqstForPicHome",
        data: formData,
        success: function (data) {
            // 수정 작업이 성공적으로 완료되면 여기에 원하는 작업을 수행할 수 있습니다.
        	$("#alertContent2").text("성공적으로 변경했습니다.");
        	$("#alertModal2").modal("show");
           
            showSrRqstBySrRqstNo(choiceSrRqstNo);
            loadSRRequests(1, choiceSrRqstSttsNo);
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            alert("수정 실패");
   
        },
        cache: false,
        processData: false,
        contentType: false,
    });
}

// "요청 수정 모달"에서 취소 버튼 클릭 시 모달 닫기
function closeAlertModal() {
	console.log("모달 닫기!");
    $('#alertModal').modal('hide');
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

//sr요청 상태 수정
function srRqstSttsUpdate() {
	$("#update-srRqstNo").val($("#srRqst-srRqstNo").val());
	writeOrModifySrForPicHome();
	var form = $("#srRqstSttsUpdate")[0];
    var formData = new FormData(form);
    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "modifySrRqstForPicHome",
        data: formData,
        success: function (data) {
        	console.log($("#srRqst-srRqstNo").val());
            // 수정 작업이 성공적으로 완료되면 여기에 원하는 작업을 수행할 수 있습니다.
            $("#alertContent2").text("성공적으로 변경했습니다.");
        	$("#alertModal2").modal("show");
            
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            alert("수정 실패:1");
            $('#srRqstModyfyModal').modal('hide'); // 모달 숨기기
        },
        cache: false,
        processData: false,
        contentType: false,
    });
}


//sr수정 모달 띄우기
function showSrModifyModal() {
    $('#srModyfyModal').modal('show');
}

function cancelBtnForModifyModal3(){
	 $('#srModyfyModal').modal('hide');
}

//**SR 등록 또는 수정 수행
function writeOrModifySrForPicHome(choiceSrRqstNo) {
	// 소요예산에 콤마를 함께 입력했을 경우 콤마 제거
    var formattedNumber = $("#trnsf-srReqBgt").val();
    const originalNumber = parseFloat(formattedNumber.replace(/,/g, ''));  // 문자열에서 ',' 제거하고 숫자로 변환
    $("#trnsf-srReqBgt").val(originalNumber);
	
	//formData세팅
	choiceSrRqstNo = $("#srRqst-srRqstNo").val();

    $("#sr-srRqstNo").val(choiceSrRqstNo);
	var form = $("#writeOrModifySrForPicHome")[0];
    var formData = new FormData(form);
   
    // srRqstNo에  해당하는 sr이 있는지 확인
    $.ajax({
        type: "GET",
        url: "checkIfSrInformationPresent",  // 수정: POST에서 GET으로 변경
        data: { srRqstNo: choiceSrRqstNo },
        success: function (countSr) {
            if (countSr > 0) {
                // SR 정보가 이미 있는 경우 수정 모달 띄우기
            	showSrModifyModal();
            	alert("수정이 완료되었습니다.");
            } else {
                // SR 정보가 없는 경우 등록 또는 수정 수행
            	proceedWriteOrModifySrForPicHome(formData);
            	alert("등록이 완료되었습니다.");
            }
        },
        error: function (error) {
            console.error("오류 발생:", error);
            alert("확인 실패");
        },
        cache: false,
    });
}

//SR 등록 또는 수정 수행 함수
function proceedWriteOrModifySrForPicHome() {
	choiceSrRqstNo = $("#srRqst-srRqstNo").val();
	$("#sr-srRqstNo").val(choiceSrRqstNo);
	var form = $("#writeOrModifySrForPicHome")[0];
    var formData = new FormData(form);

    $.ajax({
        type: "POST",
        url: "writeOrModifySrForPicHome",
        data: formData,
        success: function (data) {
        	if(data.srSchdlChgRqstDt != null || data.srSchdlChgRqstDt != ""){
        		
        	}
            // 수정 작업이 성공적으로 완료되면 여기에 원하는 작업을 수행할 수 있습니다.
            var currentURL = window.location.href;
            window.location.href = currentURL; // 원하는 URL로 변경
            showSrRqstBySrRqstNo(choiceSrRqstNo);
            loadSRRequests(1, choiceSrRqstSttsNo);
            $('#srRqstModyfyModal').modal('hide'); // 모달 숨기기
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            alert("수정 실패");
            $('#srRqstModyfyModal').modal('hide'); // 모달 숨기기
        },
        cache: false,
        processData: false,
        contentType: false,
    });
}

//이관했을 경우 하단 상세정보
//날짜 형식을 변환하는 함수
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function formatDateTime(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    var hours = date.getHours().toString().padStart(2, '0');
    var minutes = date.getMinutes().toString().padStart(2, '0');
    var seconds = date.getSeconds().toString().padStart(2, '0');
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
}

//하단 srDetail
function setSrDetail(srRqstNo) {
	 //하단 상세 숨기기
	 $("#progressCircles").hide();
	 $("#isTrnsfY").hide();
	 
	//sr요청 상세
	$.ajax({
	    type: "GET",
	    url: "getSrRqstBySrRqstNoForPicHome",
	    data: { srRqstNo: srRqstNo },
	    success: function (data) {
	        // sr하단 내용에 데이터 세팅
	        $("#bottomSrRqstNo").text(data.srRqstNo);
	        $("#bottomSRTtl").text(data.srTtl);
	    },
	    error: function (error) {
	        console.error("이거:", error);
	        // 오류 처리 로직을 추가할 수 있습니다.
	    }
	});
		
	 
	 $("#progressCircles").show();
 	//loadProgressInfo(srRqstNo);
 	
 	
	$.ajax({
		type: "GET",
		url: "getSrBySrRqstNoForPicHome",
		data: {srRqstNo: srRqstNo},
		success: function(data) { 
			if(data.srTrnsfYn === "Y" || data.srRqstNo != null){
				$("#isTrnsfY").show();
				var srRqstNo = data.srRqstNo;
				$.ajax({
				    type: "GET",
				    url: "getSrRqstBySrRqstNoForPicHome",
				    data: { srRqstNo: srRqstNo },
				    success: function (data) {
				        // 받은 데이터를 콘솔에 출력
				        console.log("Received data:", data);
				        $("#isTrnsfY-sysNm").text(data.sysNm);
				        $("#isTrnsfY-usrNm").text(data.usrNm);
				        // 여기서 데이터를 원하는 방식으로 처리
				        // 예를 들어, 데이터를 특정 위치에 표시하거나 다른 동적인 작업을 수행할 수 있음
				    },
				    error: function (xhr, status, error) {
				        // 에러가 발생한 경우 적절한 처리
				        console.error("Error:", error);
				    }
				});
			        	
				$("#isTrnsfY-srReqBgt").text(data.srReqBgt.toLocaleString('ko-KR'));
				setSrDetailBottom(data.srNo);
			}else if(data.srRqst != null){
			    $("#progressCircles").show();
			    console.log("이관아님: " + srRqstNo);
				
			}
		
		},
	    error: function() {
	    	$("#progressCircles").show();
	    	loadProgressInfo(srRqstNo);
	}});	
}

function setSrDetailBottom(srNo) {
	let requestData = {
        srNo: srNo
    };
	
	$("#progressCircles").hide();
	$.ajax({
		type: "POST",
		url: "/otisrm/getSrTransferInfo",
		data: requestData,
		success: function(data) {

			//SR계획정보 구성
			$('#srPlanInfoDmnd').html(data.srDmndNm);
			$('#srPlanInfoTask').html(data.srTaskNm);
			$('#srPlanInfoInst').html(data.instNm);
			$('#srPlanInfoDept').html(data.deptNm);
			$('#srPlanInfoPic').html(data.usrNm);
			if (data.srTrgtBgngDt == '' || data.srTrgtBgngDt == null) {
				$('#srPlanInfoBgngDt').html('');
			} else {
				let bgngDt = new Date(data.srTrgtBgngDt);
				$('#srPlanInfoBgngDt').html(formatDate(bgngDt));
			}
			if (data.srTrgtCmptnDt == '' || data.srTrgtCmptnDt == null) {
				$('#srPlanInfoCmptnDt').html('');
			} else {
				let cmptnDt = new Date(data.srTrgtCmptnDt);
				$('#srPlanInfoCmptnDt').html(formatDate(cmptnDt));
			}
			$('#srPlanInfoTotalCapacity').html(data.totalCapacity);
			$('#srPlanInfoNote').html(data.srTrnsfNote);
			
			//SR자원정보 구성
			$('#srHrInfo tbody').html('');	//html 초기화
			if (data.srTrnsfHrList != null) {
				for (let i=0; i<data.srTrnsfHrList.length; ++i) {
					let srTrnsfHr = data.srTrnsfHrList[i];
					let srTrnsfHrHtml = '';
					srTrnsfHrHtml += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
					srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox"></td>';
					srTrnsfHrHtml += '<td class="srNo" style="display:none">' + srTrnsfHr.srNo + '</td>';
					srTrnsfHrHtml += '<td class="usrNo" style="display:none">' + srTrnsfHr.usrNo + '</td>';
					srTrnsfHrHtml += '<td>' + srTrnsfHr.usrNm + '</td>';
					srTrnsfHrHtml += '<td>' + srTrnsfHr.roleNm + '</td>';
					if (srTrnsfHr.planCapacity != '' && srTrnsfHr.planCapacity != null) {
						srTrnsfHrHtml += '<td><input type="text" value="' + srTrnsfHr.planCapacity + '" style="width:50%; text-align: center;"></div></td>';
					} else {
						srTrnsfHrHtml += '<td><input type="text" value="" style="width:50%; text-align: center;"></div></td>';
					}
					if (srTrnsfHr.performanceCapacity != '' && srTrnsfHr.performanceCapacity != null) {
						srTrnsfHrHtml += '<td><input type="text" value="' + srTrnsfHr.performanceCapacity + '" style="width:50%; text-align: center;"></div></td>';
					} else {
						srTrnsfHrHtml += '<td><input type="text" value="" style="width:50%; text-align: center;"></div></td>';
					}
					srTrnsfHrHtml += '</tr>';
					$('#srHrInfo tbody').append(srTrnsfHrHtml);
				}
			}
			
			
			//SR진척률 구성
			$('#prgrsTable td').html('');
			if (data.srPrgrsList != null) {
				for (let i=0; i<data.srPrgrsList.length; ++i) {
					let srPrgrs = data.srPrgrsList[i];
					let bgngDt = new Date(srPrgrs.srPrgrsBgngDt);
			        let cmptnDt = new Date(srPrgrs.srPrgrsCmptnDt);
					if (srPrgrs.srPrgrsSttsNm == '분석') {
						if (srPrgrs.srPrgrsBgngDt != null) {
							$('#srAnalysisBgngDt').html(formatDate(bgngDt));
						}
						if (srPrgrs.srPrgrsCmptnDt != null) {
							$('#srAnalysisCmptnDt').html(formatDate(cmptnDt));
						}
						$('#srAnalysisPrgrs').html('<input value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
						if (srPrgrs.srPrgrs > 0) {
							$('#srAnalysisPrgrs input').val(srPrgrs.srPrgrs);
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#analysisProgressGraph').css('width', (srPrgrs.srPrgrs * 10) + '%');
						}
						
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'ANALYSIS\')">관리</a></center>';
						/*btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';*/
						
						$('#srAnalysisOtptBtn').html(btnHtml);	 
					} else if (srPrgrs.srPrgrsSttsNm == '설계') {
						if (srPrgrs.srPrgrsBgngDt != null) {
							$('#srDesignBgngDt').html(formatDate(bgngDt));
						}
						if (srPrgrs.srPrgrsCmptnDt != null) {
							$('#srDesignCmptnDt').html(formatDate(cmptnDt));
						}
						$('#srDesignPrgrs').html('<input value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
						if (srPrgrs.srPrgrs > 0) {
							$('#srDesignPrgrs input').val(srPrgrs.srPrgrs);
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#designProgressGraph').css('width', ((srPrgrs.srPrgrs - 10) * 10) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'DESIGN\')">관리</a></center>';
						$('#srDesignOtptBtn').html(btnHtml);
					} else if (srPrgrs.srPrgrsSttsNm == '구현') {
						if (srPrgrs.srPrgrsBgngDt != null) {
							$('#srImplBgngDt').html(formatDate(bgngDt));
						}
						if (srPrgrs.srPrgrsCmptnDt != null) {
							$('#srImplCmptnDt').html(formatDate(cmptnDt));
						}
						$('#srImplPrgrs').html('<input value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
						if (srPrgrs.srPrgrs > 0) {
							$('#srImplPrgrs input').val(srPrgrs.srPrgrs);
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#implementProgressGraph').css('width', ((srPrgrs.srPrgrs - 20) * 2) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'IMPLEMENT\')">관리</a></center>';
						$('#srImplOtptBtn').html(btnHtml);
					} else if (srPrgrs.srPrgrsSttsNm == '시험') {
						if (srPrgrs.srPrgrsBgngDt != null) {
							$('#srTestBgngDt').html(formatDate(bgngDt));
						}
						if (srPrgrs.srPrgrsCmptnDt != null) {
							$('#srTestCmptnDt').html(formatDate(cmptnDt));
						}
						$('#srTestPrgrs').html('<input value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
						if (srPrgrs.srPrgrs > 0) {
							$('#srTestPrgrs input').val(srPrgrs.srPrgrs);
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#testProgressGraph').css('width', ((srPrgrs.srPrgrs - 70) * 5) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'TEST\')">관리</a></center>';
						$('#srTestOtptBtn').html(btnHtml);
					} else if (srPrgrs.srPrgrsSttsNm == '반영요청') {
						if (srPrgrs.srPrgrsBgngDt != null) {
							$('#srApplyBgngDt').html(formatDate(bgngDt));
						}
						if (srPrgrs.srPrgrsCmptnDt != null) {
							$('#srApplyCmptnDt').html(formatDate(cmptnDt));
						}
						$('#srApplyPrgrs').html('<input value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
						if (srPrgrs.srPrgrs > 0) {
							$('#srApplyPrgrs input').val(srPrgrs.srPrgrs);
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#applyRequestProgressGraph').css('width', ((srPrgrs.srPrgrs - 90) * 10) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:100%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'APPLY_REQUEST\')">관리</a></center>';
						$('#srApplyOtptBtn').html(btnHtml);
					}
				}
			}
			
			
		}
	});
	
	//버튼 비활성화 해제
	$('.srProgressBtn').css('pointer-events', '');
	
	currentDetailSrNo = srNo;
	sessionStorage.setItem('developerHomeCurrentDetailSrNo', currentDetailSrNo);
}
//하단 테이블 필터 탭
function selectSrProgressTableFilter(tabStyle) {
	$('.srProgressTableSelectElement').removeClass('filterTabSelected');
	if (tabStyle == 'srRqstInfoTab') {
		$('#srRqstInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srPlanInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		$('.srPlanBtn').css('display', 'flex');
	} else if (tabStyle == 'srHrInfoTab') {
		$('#srHrInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srHrInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		$('.srHrBtn').css('display', 'flex');
	} else if (tabStyle == 'srPrgrsInfoTab') {
		$('#srPrgrsInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srProgressInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		$('.srPrgrsBtn').css('display', 'flex');
	}	
	currentBottomTabFilter = tabStyle;
	sessionStorage.setItem('developerHomecurrentBottomTabFilter', currentBottomTabFilter);
}

//이관하지 않았을 경우
function initProgress() {
	$("#progress_rqst_info").addClass('d-none');
	$("#progress_dep_ing_info").addClass('d-none');
	$("#progress_dep_cmptn_info").addClass('d-none');
	
	$(".inner-circle").css("background-color", "#3b82f6");
	$(".inner-circle").removeClass('currentCircle');
	
	$("#progress_srNo").text("");
	$("#progress_srTtl").text("");
	$("#progress_srConts").val("");
	$("#progress_srRqstRvwRsn").val("");
}

function loadProgressInfo(srRqstNo) {
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getSrRqstForProgressInfo",
		data: {selectedSrRqstNo: srRqstNo},
		success: function(data) {
			//초기화
			initProgress();
			
			//요청 정보
			var formattedSrRqstRegDt = formatDateToYYYYMMDD(data.srRqstRegDt);
			var formattedSrCmptnPrnmntDt = formatDateToYYYYMMDD(data.srCmptnPrnmntDt);
			$("#progress_rqst_info").removeClass('d-none');
			$("#progress_srRqstRegDt").text(formattedSrRqstRegDt);
			$("#progress_srReqstrNm").text(data.srReqstrNm);
			
			//개발정보
			var sttsNm = data.srRqstSttsNm;
			if(sttsNm == "개발중" || sttsNm =="테스트" || sttsNm =="완료요청" || sttsNm == "개발완료") {
				if(data.srTrnsfYn == "Y") {
					//이관개발
					$("#progress_dep_ing_info").removeClass('d-none');
					$("#progress_deptNmOrTrnsfInstNm").text(data.srTrnsfInstNm);
					$("#progress_srTrnsfYn").text("이관개발");
				} else {
					//자체개발
					$("#progress_deptNmOrTrnsfInstNm").text(data.deptNm);
					$("#progress_srTrnsfYn").text("자체개발");
				}
				
				//완료정보
				$("#progress_dep_cmptn_info").removeClass('d-none');
				$("#progress_srCmptnPrnmntDt").text(formattedSrCmptnPrnmntDt);
			}
			
			//SR 정보
			$("#progress_srNo").text(data.srRqstNo);
			$("#progress_srTtl").text(data.srTtl);
			$("#progress_srConts").val(data.srConts);
			$("#progress_srRqstRvwRsn").val(data.srRqstRvwRsn);
			
			//진행상태 color변경			
			$(".progress-step").each(function() {
				if(sttsNm =="승인재검토" || sttsNm =="승인반려") {
					sttsNm ="승인대기";
				}
				
				if(sttsNm =="접수재검토" || sttsNm =="접수반려") {
					sttsNm = "접수대기";
				}
				
				var progressStepStts = $(this).find(".progress-content p").text();
				/*console.log("스탭:" + progressStepStts);
				console.log("상태명:" + sttsNm);
				*/
			    if (progressStepStts === sttsNm) {
			    	$(this).find(".inner-circle").css("background-color", "#f63b3b");
			    	$(this).find(".inner-circle").addClass('currentCircle');
			    }
			});
		}
	});
}