$(init)

function init() {
	loadDevelopManagementList(1);
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
					html += '	<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal" onclick="showDetailModal(\''+ item.srRqstNo +'\')">상세보기</button></td>';
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
			    pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(1)">처음</a>';
			    //이전 페이지로 이동하는 링크 추가
			    if (developManagementPager.groupNo > 1) {
			        pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(' + developManagementPager.startPageNo - 1 + ')">이전</a>';
			    }
			    //중간 페이지 번호 링크 추가
			    for (var i = developManagementPager.startPageNo; i <= developManagementPager.endPageNo; i++) {
			    	if (developManagementPager.pageNo != i) {
			    		pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(' + i + ')">' + i + '</a>';
			        } else {
			        	pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(' + i + ')">' + i + '</a>';
			        }
			    }
			    //다음 페이지로 이동하는 링크 추가
			    if (developManagementPager.groupNo < developManagementPager.totalGroupNo) {
			      pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(' + developManagementPager.endPageNo + 1 + ')">다음</a>';
			    }
			    //맨끝 페이지로 이동하는 링크 추가
			    pagingHtml += '<a class="btn" href="javascript:loadDevelopManagementList(' + developManagementPager.totalPageNo + ')">맨끝</a>';
			}
			$("#developmentManagementListPaging").html(pagingHtml);
	    }
	});
}


function downloadExcelOnDevelopManagement() {
	console.log("왔다.");
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