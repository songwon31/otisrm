$(init)

function init() {
	loadDevelopManagementList(1);
	showSrRqstStts();
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

function sendRqstrInst() {
	var inputInst = $("#instList input:checked").val();
	$("#inputInst").val(inputInst);
}

function loadDevelopManagementList(pageNo) {
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
		url: "/otisrm/srManagement/getDevelopManagementList",
	    data: { 
	    	developManagementPageNo: pageNo,
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
				//listlength가 10개 아니면 tr추가해서 height 100%, border
				$("#developmentManagementList").html("<tr><td colspan='12' style='height: 47rem;'>해당 목록 결과가 없습니다.</td></tr>");
				$("#developmentManagementListPaging").html("");
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
					html += '	<td>' + srTrnsfYn + '</td>';
					html += '	<td><button class="btn-1" data-toggle="modal" data-target="#detailModal" onclick="showSrRqstBySrRqstNo(\''+ item.srRqstNo +'\')">상세보기</button></td>';
					html += '</tr>';
				});
				$("#developmentManagementList").html(html);
				
				if(lastIndex < 9) {
					html += '<tr style="height:100%;">';
					html += '</tr>';
					$("#developmentManagementList").html(html);
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
			    var developManagementPager = data.pager;
	
			    //동적으로 페이징 컨트롤 생성
			    pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; cursor:default; margin-right:1rem;" href="javascript:loadDevelopManagementList(1)">처음</a>';
			    //이전 페이지로 이동하는 링크 추가
			    if (developManagementPager.groupNo == 1) {
			    	pagingHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
			    } else {
			    	pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;" href="javascript:loadDevelopManagementList(' + ((developManagementPager.groupNo - developManagementPager.pagesPerGroup) * 5) + ')">이전</a>';
			    }
			    //중간 페이지 번호 링크 추가
			    for (var i = developManagementPager.startPageNo; i <= developManagementPager.endPageNo; i++) {
			    	if (developManagementPager.pageNo != i) {
			    		pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin: 0 0.5rem;" href="javascript:loadDevelopManagementList(' + i + ')">' + i + '</a>';
			        } else {
			        	pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin: 0 0.5rem; font-weight:700; color: #2c7be4;" href="javascript:loadDevelopManagementList(' + i + ')">' + i + '</a>';
			        }
			    }
			    //다음 페이지로 이동하는 링크 추가
			    if (developManagementPager.groupNo == developManagementPager.totalGroupNo) {
			    	pagingHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				} else {
			        pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;" href="javascript:loadDevelopManagementList(' + ((developManagementPager.groupNo * developManagementPager.pagesPerGroup)+1) + ')">다음</a>';
			    }
			    //맨끝 페이지로 이동하는 링크 추가
			    pagingHtml += '<a style="font-size: 1.5rem; height: 3rem; line-height: 3rem; cursor:default; margin-left:1rem;" href="javascript:loadDevelopManagementList(' + developManagementPager.totalPageNo + ')">맨끝</a>';
			}
			$("#developmentManagementListPaging").html(pagingHtml);
	    }
	});
}


function downloadExcelOnDevelopManagement() {
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
	    ["요청번호", "제목", "관련시스템", "등록자", "소속", "요청일", "완료예정일", "상태", "중요", "이관여부"],
	  ];

	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/developManagement/exportExcelDevelopManagementList",
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
		  	        item.srTrnsfYn
		  	        ]);
	    	});
	    	//워크북 생성
	        var wb = XLSX.utils.book_new();
	        var ws = XLSX.utils.aoa_to_sheet(data);
	        
	        //워크북에 워크시트 추가
	        XLSX.utils.book_append_sheet(wb, ws, "SR개발목록");
	
	        //엑셀 파일 생성 및 다운로드
	        var today = new Date();
	        var filename = "SR개발목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
	        XLSX.writeFile(wb, filename);
	    }
	});
}

//요청 상태 불러오기
function showSrRqstStts() {
	$.ajax({
		type: "GET", 
		url: "/otisrm/srManagement/developManagement/getSrRqstStts", 
		success: function (data) {
			let html = "";
        	html += '<option value="">선택</option>';
      		data.forEach((item, index) => {	
      			html += '<option id="'+ item.srRqstSttsSeq +'" value="'+ item.srRqstSttsNo +'">'+item.srRqstSttsNm+'</option>';
       		});
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
        url: "/otisrm/srManagement/developManagement/getSrRqstBySrRqstNo",
        data: {srRqstNo: choiceSrRqstNo},
        success: function(data) {        	
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
        		$("#srRqstStts-select2 option[value='APRV_WAIT']").text("승인대기");
        		$("#srRqstStts-select").val(data.srRqstSttsNo);
        		$("#srRqstStts-select").prop("disabled", true);
        		
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
        	if(data.srRqstSttsNo == "RQST" && loggedInUsrNo === data.usrNo || data.srRqstSttsNo == "APRV_RETURN" && loggedInUsrNo === data.usrNo  ||data.srRqstSttsNo == "RCPT_RETURN" && loggedInUsrNo === data.usrNo ){
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
        	                html += '<a href="filedownload?srRqstAtchNo='+ srRqstAtch.srRqstAtchNo +'" class="d-flex srRqstAtchWrap" style="font-size:1.3rem;">';
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
        	        // $("#showSrRqstAtch").html("첨부파일이 존재하지 않습니다.");
        	    }
        	} else {
        	    // srRqstAtchList가 객체가 아닐 때
        		// $("#showSrRqstAtch").html("첨부파일이 존재하지 않습니다.");
        	}
        	if (data.srRqstEmrgYn === "Y") {
        	    $("#srRqst-importantChk").prop("checked", true);
        	    submitSrRqst();
        	} else {
        	    $("#srRqst-importantChk").prop("checked", false);
        	}
       
        },
        error: function() {
          console.error(error);
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
		url: "/otisrm/srManagement/developManagement/getSrBySrRqstNo",
		data: {srRqstNo: choiceSrRqstNo},
		success: function(data) {
			$(".srSchdlChgRqstY").hide();
			if(data != 0){
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
				
				if(data.srSchdlChgRqstAprvYn !== null){
					$("#srSchdlChgRqstY").hide();
					$("#srSchdlChgRqstAprvYn").hide();
				}
				
				//요청상태가 요청 또는 반려일때 삭제가능(버튼 속성 변경)
	        	if(data.srRqstSttsNo == "RQST" && loggedInUsrNo === data.picUsrNo || data.srRqstSttsNo == "APRV_RETURN" && loggedInUsrNo === data.picUsrNo  ||data.srRqstSttsNo == "RCPT_RETURN" && loggedInUsrNo === data.picUsrNo ){
	        		$("#deleteButton").prop("disabled", false);
	        		$("#deleteButton").css("opacity", 1);
	        		$(".srRqstModify").prop("disabled", false);	
	        	}else{
	        		$("#deleteButton").prop("disabled", true);
	        		$("#deleteButton").css("opacity", 0.5);
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
								html += '<a href="filedownloadSrAtch?srAtchNo='+ srAtch.srAtchNo +'" class="d-flex srRqstAtchWrap" style="font-size: 1.0rem;">';
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
						//$("#showSrAtch").html("첨부파일이 존재하지 않습니다.");
					}
				} else {
					// srRqstAtchList가 객체가 아닐 때
					//$("#showSrAtch").html("첨부파일이 존재하지 않습니다.");
				}
			}
			
		},
		error: function() {
			console.error(error);
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

/*//부서번호에 해당하는 관련시스템 목록
function showSysByDeptNo(myDeptNo) {
	$.ajax({
		type: "GET", 
		url: "/otisrm/srManagement/developManagement/getSysByDeptNo", 
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
}*/


function validateSrRqstForm(){
	event.preventDefault();
	if($(".isCheckSrRqstInput").val() === ''|| $(".isCheckSrRqstInput").val() === 'none') {
		$("#warningContentSrRqst").text("필수항목을 모두 입력해주세요.");
		$("#warningModalSrRqst").modal("show");
		
	}else{
		event.preventDefault();
		$("#alertContentSrRqst").text("성공적으로 등록되었습니다.");
		$("#alertModalSrRqst").modal("show");	
	}
}

//모달 close함수
function alertModalClose(){
	$("#alertModalSrRqst").modal("hide");
	submitSrRqst();
	loadSRRequests(pageNo, choiceSrRqstSttsNo);
}
function warningModalClose(){
	$("#warningModal").modal("hide");
	var currentURL = window.location.href;
    window.location.href = currentURL; // 원하는 URL로 변경
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
	var form = $("#modifySrRqst")[0];
    var formData = new FormData(form);

    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "/otisrm/srManagement/developManagement/modifySrRqst",
        data: formData,
        success: function (data) {
            // 수정 작업이 성공적으로 완료되면 여기에 원하는 작업을 수행할 수 있습니다.
        	$("#alertContent").text("성공적으로 변경했습니다.");
        	$("#alertModal").modal("show");
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


//sr 요청 삭제
function removeSrRqst() {
	// Ajax 요청 보내기
	$.ajax({
		type: "POST",
		url: "removeSrRqstForPicHome",
		data: {srRqstNo: $("#srRqst-srRqstNo").val()},
		success: function (data) {
			// 성공적으로 요청이 완료된 경우 실행할 코드
			/*var currentURL = window.location.href;
			window.location.href = currentURL; // 원하는 URL로 변경
*/			loadSRRequests(1, choiceSrRqstSttsNo);
		},
		error: function (error) {
			// 요청 중 오류가 발생한 경우 실행할 코드
			console.error("오류 발생:", error);
			console.log("수정 실패");
		}
	});
}

//sr요청 상태 수정
function srRqstSttsUpdate() {
	$("#update-srRqstNo").val($("#srRqst-srRqstNo").val());
	writeOrModifySr();
	var form = $("#srRqstSttsUpdate")[0];
    var formData = new FormData(form);
    // Ajax 요청 보내기
    $.ajax({
        type: "POST",
        url: "/otisrm/srManagement/developManagement/modifySrRqst",
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


/*//sr수정 모달 띄우기
function showSrModifyModal() {
    $('#srModyfyModal').modal('show');
}

function cancelBtnForModifyModal3(){
	 $('#srModyfyModal').modal('hide');
}
*/
//**SR 등록 또는 수정 수행
function writeOrModifySr(choiceSrRqstNo) {
	// 소요예산에 콤마를 함께 입력했을 경우 콤마 제거
    var formattedNumber = $("#trnsf-srReqBgt").val();
    const originalNumber = parseFloat(formattedNumber.replace(/,/g, ''));  // 문자열에서 ',' 제거하고 숫자로 변환
    $("#trnsf-srReqBgt").val(originalNumber);
	
	//formData세팅
	choiceSrRqstNo = $("#srRqst-srRqstNo").val();

    $("#sr-srRqstNo").val(choiceSrRqstNo);
	var form = $("#writeOrModifySr")[0];
    var formData = new FormData(form);
   
    // srRqstNo에  해당하는 sr이 있는지 확인
    $.ajax({
        type: "GET",
        url: "/otisrm/srManagement/developManagement/checkIfSrInformationPresent",  // 수정: POST에서 GET으로 변경
        data: { srRqstNo: choiceSrRqstNo },
        success: function (countSr) {
            if (countSr > 0) {
                // SR 정보가 이미 있는 경우 수정 모달 띄우기
            	showSrModifyModal();
            	$("#alertContent").text("수정이 완료되었습니다.");
            	$("#alertModal").modal("show");
            } else {
                // SR 정보가 없는 경우 등록 또는 수정 수행
            	proceedWriteOrModifySr(formData);
            	$("#alertContent").text("등록이 완료되었습니다.");
            	$("#alertModal").modal("show");
            }
        },
        error: function (error) {
            console.error("오류 발생:", error);
            alert("확인 실패");
        },
        cache: false,
        processData: false,
        contentType: false
    });
}


//SR 등록 또는 수정 수행 함수
function proceedWriteOrModifySr() {
	choiceSrRqstNo = $("#srRqst-srRqstNo").val();
	$("#sr-srRqstNo").val(choiceSrRqstNo);
	var form = $("#writeOrModifySr")[0];
    var formData = new FormData(form);

    $.ajax({
        type: "POST",
        url: "/otisrm/srManagement/developManagement/writeOrModifySr",
        data: formData,
        success: function (data) {
        	if(data.srSchdlChgRqstDt != null || data.srSchdlChgRqstDt != ""){
        		
        	}
            showSrRqstBySrRqstNo(choiceSrRqstNo);
            loadSRRequests(1, choiceSrRqstSttsNo);
            $('#srRqstModyfyModal').modal('hide'); // 모달 숨기기
        },
        error: function (error) {
            // 요청 중 오류가 발생한 경우 실행할 코드
            console.error("오류 발생:", error);
            $("#warningContent").text("필수항목을 모두입력해주세요.");
        	$("#warningModal").modal("show");
            $('#srRqstModyfyModal').modal('hide'); // 모달 숨기기
        },
        cache: false,
        processData: false,
        contentType: false,
    });
}