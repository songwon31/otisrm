$(init)

function init() {
	loadReviewManagementList(1);
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

function initSearchCondition() {
	$("#startDate").val("");
	$("#endDate").val("");
	$(".initOption").prop('selected', true);
	$("#inputInst").val("");
	$("#keywordContent").val("");
}

function sendRqstrInst() {
	var inputInst = $("#instList input:checked").val();
	$("#inputInst").val(inputInst);
}

function loadReviewManagementList(pageNo) {
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//관련 시스템 
	var searchSysNm = $("#selectSystem option:selected").text();
	//요청진행상태
	var searchSrRqstSttsNo = $("#selectProgress option:selected").val();
	//내 담당여부
	var searchUsr = "";
	var checkYn = $("#picCheck").is(':checked');
	if(checkYn) {
		searchUsr = $("#loginPic").val();
	}
	//등록자 소속
	var searchInstNo = $("#inputInst").val();
	//개발부서
	var searchDeptNo = $("#selectDevDepartment option:selected").val();
	//키워드 검색대상
	var searchTarget = $("#searchKeywordKind option:selected").val();
	//키워드 
	var searchKeyword = $("#keywordContent").val();

	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/getReviewManagementList",
	    data: {
	    	reviewManagementPageNo: pageNo,
	    	startDate: searchStartDate,
	    	endDate: searchEndDate,
	    	sysNm: searchSysNm,
	    	status: searchSrRqstSttsNo,
	    	usr: searchUsr,
	    	instNo: searchInstNo,
	    	deptNo: searchDeptNo,
	    	searchTarget: searchTarget,
	    	keyword: searchKeyword
	    },
	    success: function(data) {
	    	var html = "";
			var pagingHtml = "";
			if(data.list.length == 0) {
				$("#reviewManagementList").html("<tr><td colspan='12' style='height: 47rem; background-color: #f9fafe;'>해당 목록 결과가 없습니다.</td></tr>");
				$("#reviewManagementListListPaging").html("");
			} else if(data.list.length != 0) {
				var lastIndex = 0;
				data.list.forEach((item, index)=>{
					lastIndex = index;
					var formattedSrRqstRegDt = formatDateToYYYYMMDD(item.srRqstRegDt);
					var formattedSrCmptnPrnmntDt = formatDateToYYYYMMDD(item.srCmptnPrnmntDt);
					var trIndex = (pageNo - 1) * 10 + index + 1;
					var srTrnsfYn = item.srTrnsfYn;
					if (srTrnsfYn == null) {
						srTrnsfYn = "";
					}
					
					var rvwRsnYn = item.srRqstRvwRsn;
					if (rvwRsnYn == null) {
						rvwRsnYn = "N";
					} else {
						rvwRsnYn = "Y";
					}
					
					html += '<tr style="height: 4.7rem; font-size: 1.5rem;">';
					html += '	<td>' + trIndex + '</td>';
					html += '	<td>' + item.srRqstNo + '</td>';
					html += '	<td class="text-align-left" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.srTtl + '</td>';
					html += '	<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.sysNm + '</td>';
					html += '	<td>' + item.usrNm + '</td>';
					html += '	<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + item.instNm + '</td>';
					html += '	<td>' + formattedSrRqstRegDt + '</td>';
					html += '	<td>' + formattedSrCmptnPrnmntDt + '</td>';
					html += '	<td>' + item.srRqstSttsNm + '</td>';
					
					html += '	<td>' + item.srRqstEmrgYn + '</td>';
					html += '	<td>' + rvwRsnYn + '</td>';
					html += '	<td>' + srTrnsfYn + '</td>';
					html += '	<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal" onclick="showDetailModal(\''+ item.srRqstNo +'\')">상세보기</button></td>';
					html += '</tr>';
				});
				$("#reviewManagementList").html(html);
				
				if(lastIndex < 9) {
					html += '<tr style="height:100%;">';
					html += '</tr>';
					$("#reviewManagementList").html(html);
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
			    var reviewManagementPager = data.pager;
	
			    //동적으로 페이징 컨트롤 생성
			    pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; cursor:default; margin-right:1rem;" href="javascript:loadReviewManagementList(1)">처음</a>';
			    //이전 페이지로 이동하는 링크 추가
			    if (reviewManagementPager.groupNo == 1) {
			    	pagingHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
			    } else {
			        pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;"" href="javascript:loadReviewManagementList(' + ((reviewManagementPager.groupNo - reviewManagementPager.pagesPerGroup) * 5) + ')">이전</a>';
			    }
			    //중간 페이지 번호 링크 추가
			    for (var i = reviewManagementPager.startPageNo; i <= reviewManagementPager.endPageNo; i++) {
			    	if (reviewManagementPager.pageNo != i) {
			    		pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin: 0 0.5rem;" href="javascript:loadReviewManagementList(' + i + ')">' + i + '</a>';
			        } else {
			        	pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin: 0 0.5rem; font-weight:700; color: #2c7be4;" href="javascript:loadReviewManagementList(' + i + ')">' + i + '</a>';
			        }
			    }
			    //다음 페이지로 이동하는 링크 추가
			    if (reviewManagementPager.groupNo == reviewManagementPager.totalGroupNo) {
			    	pagingHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				} else {
			        pagingHtml += '<a class="btn" href="javascript:loadReviewManagementList(' + ((reviewManagementPager.groupNo * reviewManagementPager.pagesPerGroup)+1) + ')">다음</a>';
			    }
			    //맨끝 페이지로 이동하는 링크 추가
			    pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; cursor:default; margin-left:1rem;" href="javascript:loadReviewManagementList(' + reviewManagementPager.totalPageNo + ')">맨끝</a>';
			}
			$("#reviewManagementListPaging").html(pagingHtml);
	    }
	});
}

//Byte를 KB로 변환
function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // 소수점 두 자리까지 표시
}

function initDetailModal() {
	$("#approveResult").attr("disabled", "disabled");
    $("#approveResultBtn").attr('disabled', true);
    $("#approveResultBtn").removeClass('btn-1');
    $("#approveResultBtn").addClass('btn-3');
    $("#detailmodal_srRqstRvwRsn").removeAttr('disabled');
    $("#initApproveResult").prop('selected', true);
    $("#detailmodal_srRqstRvwRsn").attr("disabled", "disabled");
    $("#detailmodal_srRqstEmrgYn").prop('checked',false);

    $("#receptionResult").attr("disabled", "disabled");
    $("#receptionResultBtn").attr('disabled', true);
    $("#initReceptionResult").prop('selected', true);
    $("#receptionResultBtn").removeClass('btn-1');
    $("#receptionResultBtn").addClass('btn-3');

    $("#completionResultBtn").attr('disabled', true);
    $("#completionResultBtn").removeClass('btn-complete');
    $("#completionResultBtn").addClass('btn-complete-disabled');

    $("#detailmodal_srTrnsfYn").val("");
	$("#detailmodal_srTrnsfInst").val("");
	$("#detailmodal_srTaskClsf").val("");
	$("#detailmodal_srDmndClsf").val("");

}

function showDetailModal(srRqstNo) {
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/reviewManagement/getSrRqstForModal",
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
				$("#approveResult option[value='APRV_RETURN']").prop('selected', true);
			} else {
				$("#approveResult option[value='APRV']").prop('selected', true);
			}
			
			if(sttsNo == "RCPT" || sttsNo == "DEP_ING" || sttsNo == "TEST" || sttsNo == "CMPTN_RQST" || sttsNo == "DEP_CMPTN") {
				$("#receptionResult option[value='RCPT']").prop('selected', true);
			} else if(sttsNo == "RCPT_WAIT" || sttsNo == "RCPT_REEXAM") {
				$("#receptionResult").removeAttr('disabled');
				$("#receptionResultBtn").removeAttr('disabled');
				$("#receptionResultBtn").removeClass('btn-3');
				$("#receptionResultBtn").addClass('btn-1');
			} else if(sttsNo == "RCPT_RETURN") {
				$("#receptionResult option[value='RCPT_RETURN']").prop('selected', true);
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
        	if(data.srRqstEmrgYn == "Y") {
        		$("#detailmodal_srRqstEmrgYn").prop('checked',true);
        	}
        	
        	//요청첨부파일
        	var html = '';
        	if(data.srRqstAtchList.length != 0) {
        		data.srRqstAtchList.forEach((item, index)=>{
        			var size = bytesToKB(item.srRqstAtchSize);
	                html += '<a href="/otisrm/srManagement/reviewManagement/srRqstAtchDownload?srRqstAtchNo='+ item.srRqstAtchNo +'" class="d-flex">';
	                html += '    <i class="material-icons mt-1" style="font-size: 2rem; color: #666d75;">download</i>';
	                html += '    <div id="' + item.srRqstAtchNo + '">' + item.srRqstAtchNm + ' (' + size + 'KB)</div>';
	                html += '</a>';
        		});
        	} else {
        		html += '<span>첨부파일이 존재하지 않습니다.</span>'
        	}
        	$("#detailmodal_srRqstAtchData").html(html);
        	
        	//SR개발정보 불러오기
        	$("#detailmodal_srNo").val(data.srNo);
        	$("#detailmodal_srPicUsrNm").val(data.srPicUsrNm);
        	var srTrnsfYn = data.srTrnsfYn;
        	if(srTrnsfYn == "Y") {
        		$("#srTrnsfYn_Y").prop('checked',true);
        	} else {
        		$("#srTrnsfYn_N").prop('checked',true);
        	}
        	$("#detailmodal_srTrnsfInst").val(data.srTrnsfInstNo);
        	$("#detailmodal_srTaskClsf").val(data.srTaskNo);
        	if(data.srReqBgt == 0) {
        		$("#detailmodal_srReqBgt").val("");
        	} else {
        		$("#detailmodal_srReqBgt").val(data.srReqBgt.toLocaleString('ko-KR'));
        	}
        	$("#detailmodal_srDmndClsf").val(data.srDmndNo);
        	$("#detailmodal_srPri").val(data.srPri);
        	$("#detailmodal_srCmptnPrnmntDt").val(formattedSrCmptnPrnmntDt);
        	$("#detailmodal_srDvlConts").val(data.srDvlConts);
        	
        	//SR첨부파일
        	var html = '';
        	if(data.srAtchList != null && data.srAtchList.length != 0) {
        		data.srAtchList.forEach((item, index)=>{
        			var size = bytesToKB(item.srAtchSize);
	                html += '<a href="/otisrm/srManagement/reviewManagement/srAtchDownload?srAtchNo='+ item.srAtchNo +'" class="d-flex">';
	                html += '    <i class="material-icons mt-1" style="font-size: 2rem; color: #666d75;">download</i>';
	                html += '    <div id="' + item.srAtchNo + '">' + item.srAtchNm + ' (' + size + 'KB)</div>';
	                html += '</a>';
        		});
        	} else {
        		html += '<span>첨부파일이 존재하지 않습니다.</span>'
        	}
        	$("#detailmodal_srAtchData").html(html);
		}
	});
}

function saveApproveResult(e) {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	var approveResult = $("#approveResult").val();
	var srRqstRvwRsn = $("#detailmodal_srRqstRvwRsn").val();
	
	if(approveResult == ""){
		$('#alertModal').modal('show');
		return false;
	}
	
	if(approveResult != "APPV" && (srRqstRvwRsn == "" || srRqstRvwRsn == null)){
		$('#alertModalContent').text("검토 의견을 작성해주십시오.");
		$('#alertModal').modal('show');
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/reviewManagement/saveApproveResult",
		data: {selectedSrRqstNo: srRqstNo, srRqstSttsNo: approveResult, srRqstRvwRsn: srRqstRvwRsn},
		success: function(data) {
			$('#successModal').modal('show');
		}
	});
}

function saveReceptionResult(e) {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	var receptionResult = $("#receptionResult").val();
	var srTrnsfYn = $("input[name='srTrnsfYn']:checked").val();
	var srNo = $("#detailmodal_srNo").val();
	var srTrnsfInstNo = $("#detailmodal_srTrnsfInst").val();
	var srDmndNo = $("#detailmodal_srDmndClsf").val();
	
	if(receptionResult == ""){
		$('#alertModal').modal('show');
		return false;
	}
	
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/reviewManagement/saveReceptionResult",
		data: {selectedSrRqstNo: srRqstNo, 
			srRqstSttsNo: receptionResult, 
			srTrnsfYn: srTrnsfYn,
			srNo: srNo,
			srTrnsfInstNo: srTrnsfInstNo,
			srDmndNo: srDmndNo
			},
		success: function(data) {
			$('#successModal').modal('show');
		}
	});
}

function saveCompletionResult() {
	var srRqstNo = $("#detailmodal_srRqstNo").val();
	
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/reviewManagement/saveCompletionResult",
		data: {selectedSrRqstNo: srRqstNo},
		success: function(data) {
			$('#successModal').modal('show');
		}
	});
}

function redirect() {
	window.location.href = "/otisrm/srManagement/reviewManagement";
}

function downloadExcelOnReviewManagement() {
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//관련 시스템 
	var searchSysNm = $("#selectSystem option:selected").text();
	//요청진행상태
	var searchSrRqstSttsNo = $("#selectProgress option:selected").val();
	//내 담당여부
	var searchUsr = "";
	var checkYn = $("#picCheck").is(':checked');
	if(checkYn) {
		searchUsr = $("#loginPic").val();
	}
	//등록자 소속
	var searchInstNo = $("#inputInst").val();
	//개발부서
	var searchDeptNo = $("#selectDevDepartment option:selected").val();
	//키워드 검색대상
	var searchTarget = $("#searchKeywordKind option:selected").val();
	//키워드 
	var searchKeyword = $("#keywordContent").val();
	
	//엑셀에 다운될 데이터
	var data = [
	    ["요청번호", "제목", "관련시스템", "등록자", "소속", "요청일", "완료예정일", "상태", "중요", "검토의견", "이관여부"],
	  ];

	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/reviewManagement/exportExcelReviewManagementList",
	    data: {
	    	startDate: searchStartDate,
	    	endDate: searchEndDate,
	    	sysNm: searchSysNm,
	    	status: searchSrRqstSttsNo,
	    	usr: searchUsr,
	    	instNo: searchInstNo,
	    	deptNo: searchDeptNo,
	    	searchTarget: searchTarget,
	    	keyword: searchKeyword
	    },
	    success: function(response) {
	    	response.forEach(function (item, index) {
	    		var formattedSrRqstRegDt = formatDateToYYYYMMDD(item.srRqstRegDt);
				var formattedSrCmptnPrnmntDt = formatDateToYYYYMMDD(item.srCmptnPrnmntDt);
				
	    		var srRqstRvwRsnYn = item.srRqstRvwRsn;
	    		if(srRqstRvwRsnYn == null) {
	    			srRqstRvwRsnYn = "N";
	    		} else {
	    			srRqstRvwRsnYn = "Y";
	    		}
	    		
	    		var srTrnsfYn = item.srTrnsfYn;
	    		if (srTrnsfYn == null) {
	    			srTrnsfYn = "";
	    		}
	    		
	    		data.push([
	    			item.srRqstNo,
	    			item.srTtl,
		  	        item.sysNm,
		  	        item.usrNm,
		  	        item.instNm,
		  	        formattedSrRqstRegDt,
		  	        formattedSrCmptnPrnmntDt,
		  	        item.srRqstSttsNm,
		  	        item.srRqstEmrgYn,
		  	        srRqstRvwRsnYn,
		  	        item.srTrnsfYn
		  	        ]);
	    	});
	    	//워크북 생성
	        var wb = XLSX.utils.book_new();
	        var ws = XLSX.utils.aoa_to_sheet(data);
	        
	        //워크북에 워크시트 추가
	        XLSX.utils.book_append_sheet(wb, ws, "SR검토목록");
	
	        //엑셀 파일 생성 및 다운로드
	        var today = new Date();
	        var filename = "SR검토목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
	        XLSX.writeFile(wb, filename);
	    }
	});
}
