$(init);

//메인 테이블 검색 옵션
var currentProgressManagementSearch = {
	sysNo: null,
	taskNo: null,
	receiptNo: null,
	prgrsNo: null,
	instNo: null,
	deptNo: null,
	keywordCategory: null,
	keywordContent: null,
	mySrCheck: null
}
//메인 테이블 페이지 번호
var currentPageNo = 1;

var mainTableFilter = 'Total';
var currentDetailSrNo;
var currentBottomTabFilter;

function init() {
	mainTableSearchDivConfig();
	mainTableConfig(currentProgressManagementSearch, currentPageNo);
}

$(document).ready(function() {
	
});

//날짜 형식을 변환
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

//검색창 구성
function mainTableSearchDivConfig() {
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/getProgressManagementSearchConfig",
		success: function(data) {
			$('#systemSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.sysList.length; ++i) {
				let sysData = data.sysList[i];
				$('#systemSelect').append('<option value="'+ sysData.sysNo + '">' + sysData.sysNm + '</option>');
			}
			
			$('#taskSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.taskList.length; ++i) {
				let taskData = data.taskList[i];
				$('#taskSelect').append('<option value="'+ taskData.srTaskNo + '">' + taskData.srTaskNm + '</option>');
			}
			
			$('#srRqstSttsSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<=1; ++i) {
				let srPrgrsStts = data.srPrgrsSttsList[i];
				$('#srRqstSttsSelect').append('<option value="'+ srPrgrsStts.srPrgrsSttsNo + '">' + srPrgrsStts.srPrgrsSttsNm + '</option>');
			}
			
			$('#srPrgrsSttsSelect').html('<option value="" selected>전체</option>');
			for (let i=2; i<data.srPrgrsSttsList.length; ++i) {
				let srPrgrsStts = data.srPrgrsSttsList[i];
				$('#srPrgrsSttsSelect').append('<option value="'+ srPrgrsStts.srPrgrsSttsNo + '">' + srPrgrsStts.srPrgrsSttsNm + '</option>');
			}
			
			$('#instSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.instList.length; ++i) {
				let instData = data.instList[i];
				if (instData.outsrcYn === 'Y') {
					$('#instSelect').append('<option value="'+ instData.instNo + '">' + instData.instNm + '</option>');
				}
			}
			
			$('#deptSelect').html('<option value="" selected>전체</option>');
			
			//instSelect값이 변경될 때마다 실행되는 함수. 협력사에 맞는 부서 정보를 가져와서 deptSelect구성
			$('#instSelect').change(function() {
				let instNo = $('#instSelect').val();
				if (instNo == '') {
					$('#deptSelect').html('<option value="" selected>전체</option>');
				} else {
					$.ajax({
						type: "POST",
						url: "/otisrm/srManagement/getDeptSelectConfig",
						data: {instNo: instNo},
						success: function(deptList) {
							$('#deptSelect').html('<option value="" selected>전체</option>');
							for (let i=0; i<deptList.length; ++i) {
								let deptData = deptList[i];
								$('#deptSelect').append('<option value="'+ deptData.deptNo + '">' + deptData.deptNm + '</option>');
							}
						}
					});
				}
			});
		}
	});
}

//메인 테이블 구성
function mainTableConfig(progressManagementSearch, pageNo) {
	let requestData = {
		progressManagementSearch: JSON.stringify(progressManagementSearch),
		pageNo: pageNo
	}
	console.log(JSON.stringify(requestData));
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/getProgressManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.srList.length; ++i) {
				let sr = data.srList[i];
				let mainTableHtml = '';
				mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				mainTableHtml += '<td>' + sr.srNo + '</td>';
				mainTableHtml += '<td>' + sr.sysNm+ '</td>';
				mainTableHtml += '<td>' + sr.srTaskNm + '</td>';
				mainTableHtml += '<td>' + sr.srTtl + '</td>';
				mainTableHtml += '<td>' + sr.rqstrNm + '</td>';
				
				if (sr.srCmptnPrnmntDt != null) {
					let srCmptnPrnmntDt = new Date(sr.srCmptnPrnmntDt);
					mainTableHtml += '<td>' + formatDate(srCmptnPrnmntDt) + '</td>';
				} else {
					mainTableHtml += '<td></td>';
				}
				
				if (sr.instNm != null) {
					mainTableHtml += '<td>' + sr.instNm + '</td>';
				} else {
					mainTableHtml += '<td></td>';
				}
				
				if (sr.srTrgtCmptnDt != null) {
					let srTrgtCmptnDt = new Date(sr.srTrgtCmptnDt);
					mainTableHtml += '<td>' + formatDate(srTrgtCmptnDt) + '</td>';
				} else {
					mainTableHtml += '<td></td>';
				}
				
				mainTableHtml += '<td>' + sr.srRqustSttsNm + '</td>';
				mainTableHtml += '<td>' + sr.srPrgrsSttsNm + '</td>';
				//mainTableHtml += '<td> <button class="btn-2 detail-button" data-dismiss="modal" onclick="setHrModalPic(\'' + usr.usrNm + '\')">선택</button> </td>';
				//jsp에 삽입
				$('#mainTable tbody').append(mainTableHtml);
			}
			
			//페이징 파트 구현
			let pagerHtml = '';
			if (data.pager.totalRows == 0) {
				pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">first_page</i>';
				pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_left</i>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">1</a>';
				pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
				pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
			} else {
				currentPageNo = data.pager.pageNo;
				if (data.pager.groupNo == 1) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">first_page</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_left</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentProgressManagementSearch, '+1+')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
					pagerHtml += '</a>';
					pagerHtml += '<a href="javascript:void(0)  onclick="mainTableConfig(currentProgressManagementSearch, ' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
					pagerHtml += '</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentProgressManagementSearch, '+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentProgressManagementSearch, ' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
					pagerHtml += '</a>';	
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentProgressManagementSearch, ' + data.pager.endPageNo + ')"">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
					pagerHtml += '</a>';
				}
				
				$('#mainTablePagingDiv').html(pagerHtml);
			}
		}
	});
}

function mainTableSearchReset() {
	currentProgressManagementSearch.sysNo = null;
	currentProgressManagementSearch.taskNo = null;
	currentProgressManagementSearch.receiptNo = null;
	currentProgressManagementSearch.prgrsNo = null;
	currentProgressManagementSearch.instNo = null;
	currentProgressManagementSearch.deptNo = null;
	currentProgressManagementSearch.keywordCategory = null;
	currentProgressManagementSearch.keywordContent = null;
	currentProgressManagementSearch.mySrCheck = null;
	currentPageNo = 1;
	mainTableSearchDivConfig();
	mainTableConfig(currentProgressManagementSearch, currentPageNo);
}

function mainTableSearch() {
	currentProgressManagementSearch.sysNo = $('#systemSelect').val();
	if ($('#systemSelect').val() == '') currentProgressManagementSearch.sysNo = null;
	currentProgressManagementSearch.taskNo = $('#taskSelect').val();
	if ($('#taskSelect').val() == '') currentProgressManagementSearch.taskNo = null;
	currentProgressManagementSearch.receiptNo = $('#srRqstSttsSelect').val();
	if ($('#srRqstSttsSelect').val() == '') currentProgressManagementSearch.receiptNo = null;
	currentProgressManagementSearch.prgrsNo = $('#srPrgrsSttsSelect').val();
	if ($('#srPrgrsSttsSelect').val() == '') currentProgressManagementSearch.prgrsNo = null;
	currentProgressManagementSearch.instNo = $('#instSelect').val();
	if ($('#instSelect').val() == '') currentProgressManagementSearch.instNo = null;
	currentProgressManagementSearch.deptNo = $('#deptSelect').val();
	if ($('#deptSelect').val() == '') currentProgressManagementSearch.deptNo = null;
	currentProgressManagementSearch.keywordCategory = $('#keywordCategoty').val();
	if ($('#keywordCategoty').val() == '') currentProgressManagementSearch.keywordCategory = null;
	currentProgressManagementSearch.keywordContent = $('#keywordContent').val();
	if ($('#keywordContent').val() == '') currentProgressManagementSearch.keywordContent = null;
	if ($('#mySrCheck').prop('checked')) {
		currentProgressManagementSearch.mySrCheck = "checked";
	} else {
		currentProgressManagementSearch.mySrCheck = null;
	}
	mainTableConfig(currentProgressManagementSearch, currentPageNo);
}
