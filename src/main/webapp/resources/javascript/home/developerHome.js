$(init);

function init() {
	//테이블 행 선택 시 하단 작업창에 데이터 세팅
	$('#mainTable tr').click(function() {
		console.log("tr이 클릭됨");
		
		//행 element 탐색
		let row = $(this).closest('tr');
		
		//해당 행의 데이터를 추출
		let srNo = row.find('td:eq(0)').text();
		
		// 서버로 보낼 데이터 객체 생성
	    let requestData = {
	        srNo: srNo
	    };
		
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
				let bgngDt = new Date(data.srTrgtBgngDt);
		        let cmptnDt = new Date(data.srTrgtCmptnDt);
				$('#srPlanInfoBgngDt').html(formatDate(bgngDt));
				$('#srPlanInfoCmptnDt').html(formatDate(cmptnDt));
				$('#srPlanInfoNote').html(data.srTrnsfNote);
				
				//SR자원정보 구성
				$('#srHrInfo tbody').html('');	//html 초기화
				if (data.srPrgrsHrList != null) {
					for (let i=0; i<data.srPrgrsHrList.length; ++i) {
						let srPrgrsPic = data.srPrgrsHrList[i];
						let srPrgrsPicInfoHtml = '';
						srPrgrsPicInfoHtml += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
						srPrgrsPicInfoHtml += '<td>ㅁ</td>';
						srPrgrsPicInfoHtml += '<td>' + srPrgrsPic.usrNm + '</td>';
						srPrgrsPicInfoHtml += '<td>' + srPrgrsPic.roleNm + '</td>';
						srPrgrsPicInfoHtml += '<td>';
						for (let j=0; j<srPrgrsPic.sttsList.length; ++j) {
							srPrgrsPicInfoHtml += srPrgrsPic.sttsList[j];
							if (j < srPrgrsPic.sttsList.length-1) {
								srPrgrsPicInfoHtml += ' ';
							}
						}
						srPrgrsPicInfoHtml += '</td>';
						srPrgrsPicInfoHtml += '</tr>';
						$('#srHrInfo tbody').append(srPrgrsPicInfoHtml);
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
							$('#srAnalysisBgngDt').html(formatDate(bgngDt));
							$('#srAnalysisCmptnDt').html(formatDate(cmptnDt));
							$('#srAnalysisPrgrs').html(srPrgrs.srPrgrs);
							$('#srAnalysisOtptBtn').html('버튼');
						} else if (srPrgrs.srPrgrsSttsNm == '설계') {
							$('#srDesignBgngDt').html(formatDate(bgngDt));
							$('#srDesignCmptnDt').html(formatDate(cmptnDt));
							$('#srDesignPrgrs').html(srPrgrs.srPrgrs);
							$('#srDesignOtptBtn').html('버튼');
						} else if (srPrgrs.srPrgrsSttsNm == '구현') {
							$('#srImplBgngDt').html(formatDate(bgngDt));
							$('#srImplCmptnDt').html(formatDate(cmptnDt));
							$('#srImplPrgrs').html(srPrgrs.srPrgrs);
							$('#srImplOtptBtn').html('버튼');
						} else if (srPrgrs.srPrgrsSttsNm == '시험') {
							$('#srTestBgngDt').html(formatDate(bgngDt));
							$('#srTestCmptnDt').html(formatDate(cmptnDt));
							$('#srTestPrgrs').html(srPrgrs.srPrgrs);
							$('#srTestOtptBtn').html('버튼');
						} else if (srPrgrs.srPrgrsSttsNm == '반영요청') {
							$('#srApplyBgngDt').html(formatDate(bgngDt));
							$('#srApplyCmptnDt').html(formatDate(cmptnDt));
							$('#srApplyPrgrs').html(srPrgrs.srPrgrs);
							$('#srApplyOtptBtn').html('버튼');
						}
					}
				}
				
				
			}
		})
	});
}

//날짜 형식을 변환하는 함수
function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return year + '-' + month + '-' + day;
}

function selectMainTableFilter(e) {
	$('.mainTableSelectElement').removeClass('filterTabSelected');
	$(e).addClass('filterTabSelected');
}

function selectSrProgressTableFilter(e) {
	$('.srProgressTableSelectElement').removeClass('filterTabSelected');
	// 클릭한 요소에 filterTabSelected 클래스를 추가
	$(e).addClass('filterTabSelected');
	
	if ($(e).hasClass('srProgressRquest')) {
		$('.bottomSubDiv').css('display', 'none');
		$('#srRqstInfo').css('display', '');
	} else if ($(e).hasClass('srProgressPlan')) {
		$('.bottomSubDiv').css('display', 'none');
		$('#srPlanInfo').css('display', '');
	} else if ($(e).hasClass('srProgressHr')) {
		$('.bottomSubDiv').css('display', 'none');
		$('#srHrInfo').css('display', '');
	} else if ($(e).hasClass('srProgressPercentage')) {
		$('.bottomSubDiv').css('display', 'none');
		$('#srProgressInfo').css('display', '');
	}
}

//상세 보기 모달
function showRequestDetail(srNo) {
	// 서버로 보낼 데이터 객체 생성
    let requestData = {
        srNo: srNo
    };
    
	$.ajax({
		type: "POST", 
		url: "getSrDetailInfo", 
		data: requestData, 
		success: function (data) {
			
        },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

/*
 * $(document).ready(function() {
 * 
 * var button = document.querySelector('.fc-dayGridMonth-button');
 * console.log("button: ", button); button.click(); button.style.display =
 * 'none';
 * 
 * $('.fc-daygrid-day-number').css('font-size', '1.4rem');
 * $('.fc-daygrid-day-number').css('padding', '0');
 * $('.fc-header-toolbar').css('margin', '0');
 * $('.fc-header-toolbar').css('margin-bottom', '0.5rem');
 * $('.fc-button').css('padding', '0rem');
 * $('.fc-toolbar-title').css('font-size', '2rem');
 * 
 * var parentElement = document.querySelector('.fc-view-harness'); // 부모 요소가
 * 존재하면 if (parentElement) { // 부모 요소의 하위 요소를 모두 가져와서 반복 var childElements =
 * parentElement.querySelectorAll('*'); for (var i = 0; i <
 * childElements.length; i++) { // 각 하위 요소에 overflow: hidden 스타일 적용
 * childElements[i].style.overflow = 'hidden'; } }
 * 
 * $('.fc-button').click(onCalendarChange);
 * 
 * 
 * });
 * 
 * function onCalendarChange() { $('.fc-daygrid-day-number').css('font-size',
 * '1.4rem'); $('.fc-daygrid-day-number').css('padding', '0');
 * $('.fc-header-toolbar').css('margin', '0');
 * $('.fc-header-toolbar').css('margin-bottom', '0.5rem');
 * $('.fc-button').css('padding', '0rem');
 * $('.fc-toolbar-title').css('font-size', '2rem');
 * 
 * var parentElement = document.querySelector('.fc-view-harness'); // 부모 요소가
 * 존재하면 if (parentElement) { // 부모 요소의 하위 요소를 모두 가져와서 반복 var childElements =
 * parentElement.querySelectorAll('*'); for (var i = 0; i <
 * childElements.length; i++) { // 각 하위 요소에 overflow: hidden 스타일 적용
 * childElements[i].style.overflow = 'hidden'; } } }
 */