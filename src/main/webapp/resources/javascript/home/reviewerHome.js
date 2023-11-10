$(init)

var selectedStts = "전체";

function init() {
	//테이블에 전체 SR목록 가져오기
	loadReviewerHomeBoardList(1, selectedStts);
	//첫번쨰 SR진행현황 가져오기
	loadFirstSrToProgressInfo();
	//미처리 검토 요청개수 가져오기
	loadReviewerHomeCountBoard();
}

function formatDateToYYYYMMDD(timestamp) {
	if (timestamp == null) {
		return "";
	} else {
		//타임스탬프를 Date 객체로 변환
		var date = new Date(timestamp);
		//연도의 끝 두 자리를 추출
		var year = date.getFullYear().toString().slice(-4);
		//월과 일을 가져와서 2자리로 포맷
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		//"YY-MM-dd" 형식으로 날짜를 조합
		var formattedDate = year + '-' + month + '-' + day;
		
		return formattedDate;
	}
}

function loadReviewerHomeCountBoard() {
	$.ajax({
		type: "GET",
		url: "/otisrm/getReviewerHomeCountBoard",
		success: function(data) {
			$("#aprvWaitCount").text(data.aprvWaitCount);
			$("#rcptWaitCount").text(data.rcptWaitCount);
			$("#cmptnRqstCount").text(data.cmptnRqstCount);
		}
	});
}

function loadFirstSrToProgressInfo(){
	setTimeout(function() {
        var firstSrRqstNo = $("#reviewerHomeBoardList tr td:eq(1)").text();
        if(firstSrRqstNo == "") {
        	initProgress();
        } else {
        	loadProgressInfo(firstSrRqstNo);
        }
    }, 100);
}

function selectReviewStts(e) {
	selectedStts = $(e).find("span:first").text();
	loadReviewerHomeBoardList(1, selectedStts);
	
	//첫번째 SR진행현황 가져오기
	loadFirstSrToProgressInfo();
}

function loadReviewerHomeBoardList(pageNo, selectedStts) {
	$.ajax({
		type: "GET",
		url: "/otisrm/getReviewerHomeBoardList",
		data: {reviewerHomeBoardPageNo: pageNo, srRqstSttNm: selectedStts},
		success: function(data) {
			var html = "";
			var pagingHtml = "";
			if(data.list.length == 0) {
				$("#reviewerHomeBoardList").html("<tr><td colspan='10' style='height: 22.5rem;'>해당 목록 결과가 없습니다.</td></tr>");
				$("#reviewerHomeMainTablePaging").html("");
				var lastIndex = 0;
			} else if(data.list.length != 0) {
				//tr 생성
				data.list.forEach((item, index)=>{
					lastIndex = index;
					var formattedSrRqstRegDt = formatDateToYYYYMMDD(item.srRqstRegDt);
					var formattedSrCmptnPrnmntDt = formatDateToYYYYMMDD(item.srCmptnPrnmntDt);
					var trIndex = (pageNo - 1) * 5 + index + 1;
					
					html += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color: white;" onclick="loadProgressInfo(\''+ item.srRqstNo +'\')">';
					html += '	<td>' + trIndex + '</td>';
					html += '	<td>' + item.srRqstNo + '</td>';
					html += '	<td class="text-align-left" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.srTtl + '</td>';
					html += '	<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.sysNm + '</td>';
					html += '	<td>' + item.usrNm + '</td>';
					html += '	<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.instNm + '</td>';
					html += '	<td>' + item.srRqstSttsNm + '</td>';
					html += '	<td>' + formattedSrRqstRegDt + '</td>';
					html += '	<td>' + formattedSrCmptnPrnmntDt + '</td>';
					html += '	<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal" onclick="showDetailModal(\''+ item.srRqstNo +'\')">상세보기</button></td>';
					html += '</tr>';
				});
				$("#reviewerHomeBoardList").html(html);
				
				if(lastIndex < 4) {
					html += '<tr style="height:100%;">';
					html += '</tr>';
					$("#reviewerHomeBoardList").html(html);
				}
				
				//hover 효과 동적으로 추가
				$('tbody tr').hover(
					function() {
					  //마우스가 요소 위에 있을 때 배경색 변경
					  $(this).css('background-color', '#f3f6fd');
					},
					function() {
					  //마우스가 요소를 벗어날 때 배경색 원래대로 변경
					  $(this).css('background-color', 'white');
				    }
				);
				
				//페이징 처리
			    var reviewerHomeBoardPager = data.pager;
	
			    //동적으로 페이징 컨트롤 생성
			    pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + 1 + ', \'' + selectedStts + '\')">처음</a>';
			    //이전 페이지로 이동하는 링크 추가
			    if (reviewerHomeBoardPager.groupNo > 1) {
			        pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + (reviewerHomeBoardPager.startPageNo - 1) + ', \'' + selectedStts + '\')">이전</a>';
			    }
			    //중간 페이지 번호 링크 추가
			    for (var i = reviewerHomeBoardPager.startPageNo; i <= reviewerHomeBoardPager.endPageNo; i++) {
			    	if (reviewerHomeBoardPager.pageNo != i) {
			    		pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + i + ', \'' + selectedStts + '\')">' + i + '</a>';
			        } else {
			        	pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + i + ', \'' + selectedStts + '\')">' + i + '</a>';
			        }
			    }
			    //다음 페이지로 이동하는 링크 추가
			    if (reviewerHomeBoardPager.groupNo < reviewerHomeBoardPager.totalGroupNo) {
			      pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + (reviewerHomeBoardPager.endPageNo + 1) + ', \'' + selectedStts + '\')">다음</a>';
			    }
			    //맨끝 페이지로 이동하는 링크 추가
			    pagingHtml += '<a class="btn" onclick="loadFirstSrToProgressInfo()" href="javascript:loadReviewerHomeBoardList(' + reviewerHomeBoardPager.totalPageNo + ', \'' + selectedStts + '\')">맨끝</a>';
			}
			$("#reviewerHomeMainTablePaging").html(pagingHtml);
		}
	});
}

function initDetailModal() {
	$("#approveResult").attr("disabled","disabled");
	$("#approveResultBtn").attr('disabled');
	$("#approveResultBtn").removeClass('btn-1');
	$("#approveResultBtn").addClass('btn-3');
	$("#detailmodal_srRqstRvwRsn").removeAttr('disabled');
	$("#initApproveResult").prop('selected', true);
	$("#detailmodal_srRqstRvwRsn").attr("disabled","disabled");
	
	$("#receptionResult").attr("disabled","disabled");
	$("#receptionResultBtn").attr('disabled');
	$("#initReceptionResult").prop('selected', true);
	$("#receptionResultBtn").removeClass('btn-1');
	$("#receptionResultBtn").addClass('btn-3');
	
	$("#completionResultBtn").attr('disabled');
	$("#completionResultBtn").removeClass('btn-complete');
	$("#completionResultBtn").addClass('btn-complete-disabled');
}

function showDetailModal(srRqstNo) {
	$.ajax({
		type: "GET",
		url: "/otisrm/getSrRqstForReviewerModal",
		data: {selectedSrRqstNo: srRqstNo},
		success: function(data) {
			var formattedSrRqstRegDt = formatDateToYYYYMMDD(data.srRqstRegDt);
			var formattedSrCmptnPrnmntDt = formatDateToYYYYMMDD(data.srCmptnPrnmntDt);
			
			//SR번호
			$("#detailmodal_srRqstNo").val(data.srRqstNo);
			
 			//진행상태에 따른 select, button 활성화
			var sttsNo = data.srRqstSttsNo;
			if(sttsNo == "RQST") {
				//변화없음
			} else if(sttsNo == "APRV_WAIT" || sttsNo == "APRV_REEXAM") {
				$("#approveResult").removeAttr('disabled');
				$("#approveResultBtn").removeAttr('disabled');
				$("#approveResultBtn").removeClass('btn-3');
				$("#approveResultBtn").addClass('btn-1');
				$("#detailmodal_srRqstRvwRsn").removeAttr('disabled');
			} else if(sttsNo == "APRV_RETURN") {
				$("option[value='APRV_RETURN']").prop('selected', true);
			} else {
				$("option[value='APRV']").prop('selected', true);
			}
			
			if(sttsNo == "RCPT" || sttsNo == "DEP_ING" || sttsNo == "TEST" || sttsNo == "CMPTN_RQST" || sttsNo == "DEP_CMPTN") {
				$("option[value='RCPT']").prop('selected', true);
			} else if(sttsNo == "RCPT_WAIT" || sttsNo == "RCPT_REEXAM") {
				$("#receptionResult").removeAttr('disabled');
				$("#receptionResultBtn").removeAttr('disabled');
				$("#receptionResultBtn").removeClass('btn-3');
				$("#receptionResultBtn").addClass('btn-1');
			} else if(sttsNo == "RCPT_RETURN") {
				$("option[value='RCPT_RETURN']").prop('selected', true);
			}
			
			if(sttsNo == "CMPTN_RQST") {
				$("#completionResultBtn").removeAttr('disabled');
				$("#completionResultBtn").removeClass('btn-complete-disabled');
				$("#completionResultBtn").addClass('btn-complete');
			}

			//SR요청정보 불러오기
			$("#detailmodal_srReqstrNm").val(data.srReqstrNm);
        	$("#detailmodal_reqstrInstNm").val(data.reqstrInstNm);
        	$("#detailmodal_srRqstRegDt").val(formattedSrRqstRegDt);
        	$("#detailmodal_sysNm").val(data.sysNm);
        	$("#detailmodal_srTtl").val(data.srTtl);
        	$("#detailmodal_srConts").val(data.srConts);
        	$("#detailmodal_srRqstRvwRsn").val(data.srRqstRvwRsn);
        	
			//SR개발정보 불러오기
        	$("#detailmodal_srPicUsrNm").val(data.srPicUsrNm);
        	$("#detailmodal_srTrnsfYn").val(data.srTrnsfYn);
        	$("#detailmodal_srTrnsfInstNm").val(data.srTrnsfInstNm);
        	$("#detailmodal_srTaskNm").val(data.srTaskNm);
        	if(data.srReqBgt == 0) {
        		$("#detailmodal_srReqBgt").val("");
        	} else {
        		$("#detailmodal_srReqBgt").val(data.srReqBgt);
        	}
        	$("#detailmodal_srDmndNm").val(data.srDmndNm);
        	$("#detailmodal_srPri").val(data.srPri);
        	$("#detailmodal_srCmptnPrnmntDt").val(formattedSrCmptnPrnmntDt);
        	$("#detailmodal_srDvlConts").val(data.srDvlConts);
		}
	});
}

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
		type: "GET",
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
				
			    if (progressStepStts === sttsNm) {
			    	$(this).find(".inner-circle").css("background-color", "#f63b3b");
			    	$(this).find(".inner-circle").addClass('currentCircle');
			    }
			});
		}
	});
}

function saveApproveResult(e) {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	var approveResult = $("#approveResult").val();
	var srRqstRvwRsn = $("#detailmodal_srRqstRvwRsn").val();
	
	if(approveResult == ""){
		$('#alertModal').modal('show');
		e.preventDefault();
	}
	
	$.ajax({
		type: "POST",
		url: "/otisrm/saveApproveResult",
		data: {selectedSrRqstNo: srRqstNo, srRqstSttsNo: approveResult, srRqstRvwRsn: srRqstRvwRsn},
		success: function(data) {
			loadReviewerHomeCountBoard();
		}
	});
}

function saveReceptionResult(e) {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	var receptionResult = $("#receptionResult").val();
	
	if(receptionResult == ""){
		$('#alertModal').modal('show');
		e.preventDefault();
	}
	
	$.ajax({
		type: "POST",
		url: "/otisrm/saveReceptionResult",
		data: {selectedSrRqstNo: srRqstNo, srRqstSttsNo: receptionResult},
		success: function(data) {
			loadReviewerHomeCountBoard();
		}
	});
}

function saveCompletionResult() {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	
	$.ajax({
		type: "POST",
		url: "/otisrm/saveCompletionResult",
		data: {selectedSrRqstNo: srRqstNo},
		success: function(data) {
			loadReviewerHomeCountBoard();
		}
	});
}