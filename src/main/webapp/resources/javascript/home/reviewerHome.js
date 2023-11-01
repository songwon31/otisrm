$(init)

function init() {
	var selectedTab = '전체';
	loadReviewerHomeBoardList(1);
}

function formatDateToYYYYMMDD(timestamp) {
	if (timestamp == null) {
		return "";
	} else {
		// 타임스탬프를 Date 객체로 변환
		var date = new Date(timestamp);
		// 연도의 끝 두 자리를 추출
		var year = date.getFullYear().toString().slice(-4);
		// 월과 일을 가져와서 2자리로 포맷
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		// "YY-MM-dd" 형식으로 날짜를 조합
		var formattedDate = year + '-' + month + '-' + day;
		
		return formattedDate;
	}
}

function selectMainTableFilter(e) {
	$('.mainTableSelectElement').removeClass('filterTabSelected');
	$(e).addClass('filterTabSelected');
	selectedTab = $(e).text();
	loadReviewerHomeBoardList(1);
}

function loadReviewerHomeBoardList(pageNo) {
	var selectedTab = $(".filterTabSelected").text();
	$.ajax({
		type: "GET",
		url: "/otisrm/getReviewerHomeBoardList",
		data: {reviewerHomeBoardPageNo: pageNo, srRqstSttNm: selectedTab},
		success: function(data) {			
			var html = "";
			data.list.forEach((item, index)=>{
				const formattedRegDt = formatDateToYYYYMMDD(item.srRqstRegDt);
				const formattedCmptnPrnmntDt = formatDateToYYYYMMDD(item.srCmptnPrnmntDt);
				const trIndex = (pageNo - 1) * 5 + index + 1;
				
				html += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color: white;">';
				html += '	<td>' + trIndex + '</td>';
				html += '	<td>' + item.srRqstNo + '</td>';
				html += '	<td class="text-align-left">' + item.srTtl + '</td>';
				html += '	<td>' + item.sysNm + '</td>';
				html += '	<td>' + item.usrNm + '</td>';
				html += '	<td>' + item.instNm + '</td>';
				html += '	<td>' + item.srRqstSttsNm + '</td>';
				html += '	<td>' + formattedRegDt + '</td>';
				html += '	<td>' + formattedCmptnPrnmntDt + '</td>';
				html += '	<td><button class="btn-1" data-toggle="modal" data-target="#detailmodal">상세보기</button></td>';
				html += '</tr>';
			});
			$("#reviewerHomeBoardList").html(html);
			
			var pagingHtml = "";
			if(data.list.length != 0) {
				// 페이징 정보를 가져옴
			    var reviewerHomeBoardPager = data.pager;
	
			    // 동적으로 페이징 컨트롤 생성
			    pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + 1 + ')">처음</a>';
			    // 이전 페이지로 이동하는 링크 추가
			    if (reviewerHomeBoardPager.groupNo > 1) {
			        pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + (reviewerHomeBoardPager.startPageNo - 1) + ')">이전</a>';
			    }
			    // 중간 페이지 번호 링크 추가
			    for (var i = reviewerHomeBoardPager.startPageNo; i <= reviewerHomeBoardPager.endPageNo; i++) {
			    	if (reviewerHomeBoardPager.pageNo != i) {
			    		pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + i + ')">' + i + '</a>';
			        } else {
			        	pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + i + ')">' + i + '</a>';
			        }
			    }
			    // 다음 페이지로 이동하는 링크 추가
			    if (reviewerHomeBoardPager.groupNo < reviewerHomeBoardPager.totalGroupNo) {
			      pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + (reviewerHomeBoardPager.endPageNo + 1) + ')">다음</a>';
			    }
			    // 맨끝 페이지로 이동하는 링크 추가
			    pagingHtml += '<a class="btn" href="javascript:loadReviewerHomeBoardList(' + reviewerHomeBoardPager.totalPageNo + ')">맨끝</a>';
			}
			$("#reviewerHomeMainTablePaging").html(pagingHtml);
		}
	});
}
