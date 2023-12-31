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
var currentSrDetailPicNo = -1;

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
	currentPageNo = pageNo;
	let requestData = {
		progressManagementSearch: JSON.stringify(progressManagementSearch),
		pageNo: pageNo
	};
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
				if (i == 9) {
					mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				} else {
					mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white; border-bottom: 1.5px solid #e9ecef;">';
				}
				mainTableHtml += '<td>' + (i+1) + '</td>';
				mainTableHtml += '<td>' + sr.srNo + '</td>';
				mainTableHtml += '<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + sr.sysNm+ '</td>';
				mainTableHtml += '<td style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + sr.srTaskNm + '</td>';
				mainTableHtml += '<td class="text-align-left" style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">' + sr.srTtl + '</td>';
				//mainTableHtml += '<td>' + sr.rqstrNm + '</td>';
				
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
				mainTableHtml += '<td> <button data-toggle="modal" data-target="#requestDetailModal" class="btn-blue detail-button" style="width:90%; height:2.8rem;" onclick="showRequestDetailModal(\'' + sr.srNo + '\')">요청상세</button> </td>';
				mainTableHtml += '<td> <button data-toggle="modal" data-target="#srProgressModal" class="btn-blue detail-button" style="width:90%; height:2.8rem;" onclick="showSrProgressModalFromMain(\'' + sr.srNo + '\')">진척관리</button> </td>';
				mainTableHtml += '</tr>';
				//jsp에 삽입
				$('#mainTable tbody').append(mainTableHtml);
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
			
			//페이징 파트 구성
			let pagerHtml = '';
			if (data.pager.totalRows == 0) {
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">처음</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">1</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">맨끝</a>';
			} else {
				currentPageNo = data.pager.pageNo;
				pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, '+1+')"style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">처음</a>';
				if (data.pager.groupNo == 1) {
					pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:0.5rem;">이전</a>';
				} else {
					pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, ' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">이전</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.5rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, '+i+')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; font-weight:700; color:blue; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.5rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				} else {
					pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, ' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">다음</a>';
				}
				pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, ' + data.pager.endPageNo + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">맨끝</a>';
			}
			$('#mainTablePagingDiv').html(pagerHtml);
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

//상세 보기 모달
function showRequestDetailModal(srNo) {
	// 서버로 보낼 데이터 객체 생성
    let requestData = {
        srNo: srNo
    };
    
	$.ajax({
		type: "POST", 
		url: "/otisrm/getSrDetailInfo", 
		data: requestData, 
		success: function (data) {
			$('#modal_sr_no').html(data.srNo);
			$('#modal_sr_rqst_no').html(data.srRqstNo);
			$('#modal_sys_nm').html(data.sysNm);
			$('#modal_sr_task_nm').html(data.srTaskNm);
			$('#modal_sr_ttl').html(data.srTtl);
			
			$('#modal_sr_prps').html(data.srPrps);
			$('#modal_dept_nm').html(data.deptNm);
			$('#modal_pic_nm').html(data.usrNm);
			let regDt = new Date(data.srRqstRegDt);
			let cmptnPrnmntDt = new Date(data.srCmptnPrnmntDt);
			let trnsfDt = new Date(data.srTrnsfDt);
			$('#modal_sr_rqst_reg_dt').html(formatDate(regDt));
			$('#modal_sr_cmptn_prnmnt_dt').html(formatDate(cmptnPrnmntDt));
			$('#modal_inst_nm').html(data.instNm);
			$('#modal_sr_trnsf_dt').html(formatDateTime(trnsfDt));
			$('#modal_sr_conts').html(data.srConts);
			$('#modal_sr_dvl_conts').html(data.srDvlConts);
			
			$("#modal_sr_conts_btn").on("click", function() {
		        if ($(this).is(":checked")) {
		        	modal_sr_conts_btn_checked();
		        }
		    });
			
			$("#modal_sr_dvl_conts_btn").on("click", function() {
		        if ($(this).is(":checked")) {
		        	modal_sr_dvl_conts_btn_checked();
		        }
		    });
			
			$('#modalSrAtch').html('');
			if (data.srAtchList != null) {
				for (let i=0; i<data.srAtchList.length; ++i) {
					let srAtch = data.srAtchList[i];
					let html = '';
	                html += '<a href="/otisrm/srAtchDownloadForDeveloperHome?srAtchNo='+ srAtch.srAtchNo +'" style="width:auto; display:flex; align-items:self; font-size:1.5rem;">';
	                html += '    <i class="material-icons atch-ic" style="font-size:2.5rem;">download</i>';
	                html += '    <div>' + srAtch.srAtchNm + ' (' + (srAtch.srAtchSize / 1024).toFixed(2) + 'KB)</div>';
	                html += '</a>';
	                $('#modalSrAtch').append(html);
				}
			}
			
        },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

function modal_sr_conts_btn_checked() {
	$('#modal_sr_dvl_conts_div').css('display', 'none');
	$('#modal_sr_conts_div').css('display', '');
}

function modal_sr_dvl_conts_btn_checked() {
	$('#modal_sr_conts_div').css('display', 'none');
	$('#modal_sr_dvl_conts_div').css('display', '');
}

//sr진척

function closeModal() {
	mainTableConfig(currentProgressManagementSearch, currentPageNo);
}

function selectSrProgressTableFilter(tabStyle) {
	$('.srProgressTableSelectElement').removeClass('filterTabSelected');
	if (tabStyle == 'srRqstInfoTab') {
		$('#srRqstInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srPlanInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		$.ajax({
			type: "POST", 
			url: "/otisrm/checkSavePlan",  
			data: {srNo: currentDetailSrNo},
			success: function (data) {
				if (data == 'success') {
					$('.srPlanBtn').css('display', 'flex');
				} else {
					$('.srPlanBtn').css('display', 'none');
				}
			}
		});
	} else if (tabStyle == 'srHrInfoTab') {
		$('#srHrInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srHrInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		if (currentSrDetailPicNo == modelUsrNo) {
			$('.srHrBtn').css('display', 'flex');
		}
	} else if (tabStyle == 'srPrgrsInfoTab') {
		$('#srPrgrsInfoTab').addClass('filterTabSelected');
		$('.bottomSubDiv').css('display', 'none');
		$('#srProgressInfo').css('display', '');
		$('.srProgressBtn').css('display', 'none');
		$.ajax({
			type: "POST", 
			url: "/otisrm/checkSavePrgrs",  
			data: {srNo: currentDetailSrNo},
			success: function (data) {
				if (data == 'success') {
					$('.srPrgrsBtn').css('display', 'flex');
				} else {
					$('.srPrgrsBtn').css('display', 'none');
				}
			}
		});
	}	
	currentBottomTabFilter = tabStyle;
}

function showSrProgressModalFromMain(srNo) {
	currentDetailSrNo = srNo;
	selectSrProgressTableFilter('srRqstInfoTab');
	let requestData = {
        srNo: srNo
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getSrTransferInfo",
		data: requestData,
		success: function(data) {
			currentSrDetailPicNo = data.usrNo;
			currentDetailSrNo = srNo;
			
			$("#srPlanModalTrgtBgngDt").prop("disabled", true);
			$("#srPlanModalTrgtCmptnDt").prop("disabled", true);
			//SR계획정보 구성
			$.ajax({
				type: "POST", 
				url: "/otisrm/checkSavePlan",  
				data: {srNo: currentDetailSrNo},
				success: function (response) {
					//등록 권한이 있는 경우
					if (response == 'success') {
						$('#srPlanModalDmndInput').val(data.srDmndNm);
						$('#srPlanModalTaskInput').val(data.srTaskNm);
						$('#srPlanModalDeptInput').val(data.deptNm);
						$('#srPlanModalPicInput').val(data.usrNm);
						if (data.totalCapacity != null) {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity.toFixed(1));
						} else {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity);
						}
						
						//진행 상태를 확인하고 날짜 입력 가능 여부 부여
						$.ajax({
							type: "POST", 
							url: "/otisrm/checkSrPrgrsSttsNo",  
							data: {srNo: currentDetailSrNo},
							success: function (srPrgrsSttsNo) {
								console.log(srPrgrsSttsNo);
								if (srPrgrsSttsNo == 'RQST' || srPrgrsSttsNo == 'RECEIPT') {
									$("#srPlanModalTrgtBgngDt").prop("disabled", false);
									$("#srPlanModalTrgtCmptnDt").prop("disabled", false);
								}
							}
						});
						
						if (data.srTrgtBgngDt == '' || data.srTrgtBgngDt == null) {
							$('#srPlanModalTrgtBgngDt').val('');
						} else {
							let bgngDt = new Date(data.srTrgtBgngDt);
							$('#srPlanModalTrgtBgngDt').val(formatDate(bgngDt));
						}
						if (data.srTrgtCmptnDt == '' || data.srTrgtCmptnDt == null) {
							$('#srPlanModalTrgtCmptnDt').val('');
						} else {
							let cmptnDt = new Date(data.srTrgtCmptnDt);
							$('#srPlanModalTrgtCmptnDt').val(formatDate(cmptnDt));
						}
						$('#srPlanInfoTotalCapacity').html(data.totalCapacity);
						$('#srPlanModalTrnsfNote').html(data.srTrnsfNote);
					} else {
						//작성 권한이 없는 경우
						$('#srPlanModalDmndInput').val(data.srDmndNm);
						$('#srPlanModalTaskInput').val(data.srTaskNm);
						$('#srPlanModalDeptInput').val(data.deptNm);
						$('#srPlanModalPicInput').val(data.usrNm);
						if (data.totalCapacity != null) {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity.toFixed(1));
						} else {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity);
						}
						
						if (data.srTrgtBgngDt == '' || data.srTrgtBgngDt == null) {
							$('#srPlanModalTrgtBgngDt').val('');
						} else {
							let bgngDt = new Date(data.srTrgtBgngDt);
							$('#srPlanModalTrgtBgngDt').val(formatDate(bgngDt));
						}
						if (data.srTrgtCmptnDt == '' || data.srTrgtCmptnDt == null) {
							$('#srPlanModalTrgtCmptnDt').val('');
						} else {
							let cmptnDt = new Date(data.srTrgtCmptnDt);
							$('#srPlanModalTrgtCmptnDt').val(formatDate(cmptnDt));
						}
						$('#srPlanInfoTotalCapacity').html(data.totalCapacity);
						$('#srPlanModalTrnsfNote').html(data.srTrnsfNote);
					}
				}
			});
			
			
			//SR자원정보 구성
			//현재 사용자가 담당자일경우
			if (currentSrDetailPicNo == modelUsrNo) {
				$('#srHrInfo tbody').html('');	//html 초기화
				if (data.srTrnsfHrList != null) {
					for (let i=0; i<data.srTrnsfHrList.length; ++i) {
						let srTrnsfHr = data.srTrnsfHrList[i];
						let srTrnsfHrHtml = '';
						srTrnsfHrHtml += '<tr style="height:4rem; font-size:1.5rem; background-color:white;">';
						srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
						srTrnsfHrHtml += '<td class="srNo" style="display:none">' + srTrnsfHr.srNo + '</td>';
						srTrnsfHrHtml += '<td class="usrNo" style="display:none">' + srTrnsfHr.usrNo + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.usrNm + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.roleNm + '</td>';
						if (srTrnsfHr.planCapacity != '' && srTrnsfHr.planCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" value="' + srTrnsfHr.planCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						if (srTrnsfHr.performanceCapacity != '' && srTrnsfHr.performanceCapacity != null) {
							srTrnsfHrHtml += '<td><input disabled type="text" value="' + srTrnsfHr.performanceCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input disabled type="text" value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						srTrnsfHrHtml += '</tr>';
						$('#srHrInfo tbody').append(srTrnsfHrHtml);
					}
				}
			} else {
				$('#srHrInfo tbody').html('');	//html 초기화
				if (data.srTrnsfHrList != null) {
					for (let i=0; i<data.srTrnsfHrList.length; ++i) {
						let srTrnsfHr = data.srTrnsfHrList[i];
						let srTrnsfHrHtml = '';
						srTrnsfHrHtml += '<tr style="height:4rem; font-size:1.5rem; background-color:white;">';
						srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
						srTrnsfHrHtml += '<td class="srNo" style="display:none">' + srTrnsfHr.srNo + '</td>';
						srTrnsfHrHtml += '<td class="usrNo" style="display:none">' + srTrnsfHr.usrNo + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.usrNm + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.roleNm + '</td>';
						if (srTrnsfHr.planCapacity != '' && srTrnsfHr.planCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" disabled value="' + srTrnsfHr.planCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" disabled value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						if (srTrnsfHr.performanceCapacity != '' && srTrnsfHr.performanceCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" disabled value="' + srTrnsfHr.performanceCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" disabled value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						srTrnsfHrHtml += '</tr>';
						$('#srHrInfo tbody').append(srTrnsfHrHtml);
					}
				}
			}
			
			
			//SR진척률 구성
			$('#prgrsTable td').html('');
			
			//권한 확인
			$.ajax({
				type: "POST", 
				url: "/otisrm/checkSavePrgrs",  
				data: {srNo: currentDetailSrNo},
				success: function (response) {
					if (response == 'success') {
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
									}
									
									let btnHtml = '<button data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-blue" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'ANALYSIS\')">관리</button>';
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
									}
									let btnHtml = '<button data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-blue" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'DESIGN\')">관리</button>';
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
									}
									let btnHtml = '<button data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-blue" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'IMPLEMENT\')">관리</button>';
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
									}
									let btnHtml = '<button data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-blue" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'TEST\')">관리</button>';
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
									}
									let btnHtml = '<button data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-blue" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'APPLY_REQUEST\')">관리</button>';
									$('#srApplyOtptBtn').html(btnHtml);
								}
							}
						}
					} else {
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
									$('#srAnalysisPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srAnalysisPrgrs input').val(srPrgrs.srPrgrs);
									}
									
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
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
									$('#srDesignPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srDesignPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srDesignOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '구현') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srImplBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srImplCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srImplPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srImplPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srImplOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '시험') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srTestBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srTestCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srTestPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srTestPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srTestOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '반영요청') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srApplyBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srApplyCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srApplyPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srApplyPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srApplyOtptBtn').html(btnHtml);
								}
							}
						}
					}
				}
			});
		}
	});
	
	//버튼 비활성화 해제
	$('.srProgressBtn').css('pointer-events', '');
	
	currentDetailSrNo = srNo;
}

function showSrProgressModal(srNo) {
	currentDetailSrNo = srNo;
	let requestData = {
        srNo: srNo
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getSrTransferInfo",
		data: requestData,
		success: function(data) {
			currentSrDetailPicNo = data.usrNo;
			currentDetailSrNo = srNo;
			
			$("#srPlanModalTrgtBgngDt").prop("disabled", true);
			$("#srPlanModalTrgtCmptnDt").prop("disabled", true);
			//SR계획정보 구성
			$.ajax({
				type: "POST", 
				url: "/otisrm/checkSavePlan",  
				data: {srNo: currentDetailSrNo},
				success: function (response) {
					//등록 권한이 있는 경우
					if (response == 'success') {
						$('#srPlanModalDmndInput').val(data.srDmndNm);
						$('#srPlanModalTaskInput').val(data.srTaskNm);
						$('#srPlanModalDeptInput').val(data.deptNm);
						$('#srPlanModalPicInput').val(data.usrNm);
						if (data.totalCapacity != null) {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity.toFixed(1));
						} else {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity);
						}
						
						//진행 상태를 확인하고 날짜 입력 가능 여부 부여
						$.ajax({
							type: "POST", 
							url: "/otisrm/checkSrPrgrsSttsNo",  
							data: {srNo: currentDetailSrNo},
							success: function (srPrgrsSttsNo) {
								console.log(srPrgrsSttsNo);
								if (srPrgrsSttsNo == 'RQST' || srPrgrsSttsNo == 'RECEIPT') {
									$("#srPlanModalTrgtBgngDt").prop("disabled", false);
									$("#srPlanModalTrgtCmptnDt").prop("disabled", false);
								}
							}
						});
						
						if (data.srTrgtBgngDt == '' || data.srTrgtBgngDt == null) {
							$('#srPlanModalTrgtBgngDt').val('');
						} else {
							let bgngDt = new Date(data.srTrgtBgngDt);
							$('#srPlanModalTrgtBgngDt').val(formatDate(bgngDt));
						}
						if (data.srTrgtCmptnDt == '' || data.srTrgtCmptnDt == null) {
							$('#srPlanModalTrgtCmptnDt').val('');
						} else {
							let cmptnDt = new Date(data.srTrgtCmptnDt);
							$('#srPlanModalTrgtCmptnDt').val(formatDate(cmptnDt));
						}
						$('#srPlanInfoTotalCapacity').html(data.totalCapacity);
						$('#srPlanModalTrnsfNote').html(data.srTrnsfNote);
					} else {
						//작성 권한이 없는 경우
						$('#srPlanModalDmndInput').val(data.srDmndNm);
						$('#srPlanModalTaskInput').val(data.srTaskNm);
						$('#srPlanModalDeptInput').val(data.deptNm);
						$('#srPlanModalPicInput').val(data.usrNm);
						if (data.totalCapacity != null) {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity.toFixed(1));
						} else {
							$('#srPlanModalTotalCapacity').val(data.totalCapacity);
						}
						
						if (data.srTrgtBgngDt == '' || data.srTrgtBgngDt == null) {
							$('#srPlanModalTrgtBgngDt').val('');
						} else {
							let bgngDt = new Date(data.srTrgtBgngDt);
							$('#srPlanModalTrgtBgngDt').val(formatDate(bgngDt));
						}
						if (data.srTrgtCmptnDt == '' || data.srTrgtCmptnDt == null) {
							$('#srPlanModalTrgtCmptnDt').val('');
						} else {
							let cmptnDt = new Date(data.srTrgtCmptnDt);
							$('#srPlanModalTrgtCmptnDt').val(formatDate(cmptnDt));
						}
						$('#srPlanInfoTotalCapacity').html(data.totalCapacity);
						$('#srPlanModalTrnsfNote').html(data.srTrnsfNote);
					}
				}
			});
			
			//SR자원정보 구성
			//현재 사용자가 담당자일경우
			if (currentSrDetailPicNo == modelUsrNo) {
				$('#srHrInfo tbody').html('');	//html 초기화
				if (data.srTrnsfHrList != null) {
					for (let i=0; i<data.srTrnsfHrList.length; ++i) {
						let srTrnsfHr = data.srTrnsfHrList[i];
						let srTrnsfHrHtml = '';
						srTrnsfHrHtml += '<tr style="height:4rem; font-size:1.5rem; background-color:white;">';
						srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
						srTrnsfHrHtml += '<td class="srNo" style="display:none">' + srTrnsfHr.srNo + '</td>';
						srTrnsfHrHtml += '<td class="usrNo" style="display:none">' + srTrnsfHr.usrNo + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.usrNm + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.roleNm + '</td>';
						if (srTrnsfHr.planCapacity != '' && srTrnsfHr.planCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" value="' + srTrnsfHr.planCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						if (srTrnsfHr.performanceCapacity != '' && srTrnsfHr.performanceCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" disabled value="' + srTrnsfHr.performanceCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" disabled value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						srTrnsfHrHtml += '</tr>';
						$('#srHrInfo tbody').append(srTrnsfHrHtml);
					}
				}
			} else {
				$('#srHrInfo tbody').html('');	//html 초기화
				if (data.srTrnsfHrList != null) {
					for (let i=0; i<data.srTrnsfHrList.length; ++i) {
						let srTrnsfHr = data.srTrnsfHrList[i];
						let srTrnsfHrHtml = '';
						srTrnsfHrHtml += '<tr style="height:4rem; font-size:1.5rem; background-color:white;">';
						srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
						srTrnsfHrHtml += '<td class="srNo" style="display:none">' + srTrnsfHr.srNo + '</td>';
						srTrnsfHrHtml += '<td class="usrNo" style="display:none">' + srTrnsfHr.usrNo + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.usrNm + '</td>';
						srTrnsfHrHtml += '<td>' + srTrnsfHr.roleNm + '</td>';
						if (srTrnsfHr.planCapacity != '' && srTrnsfHr.planCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" disabled value="' + srTrnsfHr.planCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" disabled value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						if (srTrnsfHr.performanceCapacity != '' && srTrnsfHr.performanceCapacity != null) {
							srTrnsfHrHtml += '<td><input type="text" disabled value="' + srTrnsfHr.performanceCapacity.toFixed(1) + '" style="width:50%; text-align: center;"></div></td>';
						} else {
							srTrnsfHrHtml += '<td><input type="text" disabled value="0.0" style="width:50%; text-align: center;"></div></td>';
						}
						srTrnsfHrHtml += '</tr>';
						$('#srHrInfo tbody').append(srTrnsfHrHtml);
					}
				}
			}
			
			
			//SR진척률 구성
			$('#prgrsTable td').html('');
			
			//권한 확인
			$.ajax({
				type: "POST", 
				url: "/otisrm/checkSavePrgrs",  
				data: {srNo: currentDetailSrNo},
				success: function (response) {
					if (response == 'success') {
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
									}
									let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'APPLY_REQUEST\')">관리</a></center>';
									$('#srApplyOtptBtn').html(btnHtml);
								}
							}
						}
					} else {
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
									$('#srAnalysisPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srAnalysisPrgrs input').val(srPrgrs.srPrgrs);
									}
									
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
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
									$('#srDesignPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srDesignPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srDesignOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '구현') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srImplBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srImplCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srImplPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srImplPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srImplOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '시험') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srTestBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srTestCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srTestPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srTestPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srTestOtptBtn').html(btnHtml);
								} else if (srPrgrs.srPrgrsSttsNm == '반영요청') {
									if (srPrgrs.srPrgrsBgngDt != null) {
										$('#srApplyBgngDt').html(formatDate(bgngDt));
									}
									if (srPrgrs.srPrgrsCmptnDt != null) {
										$('#srApplyCmptnDt').html(formatDate(cmptnDt));
									}
									$('#srApplyPrgrs').html('<input disabled value="" style="width:40%; height:3rem; margin:0rem 1rem; text-align: center;">');
									if (srPrgrs.srPrgrs > 0) {
										$('#srApplyPrgrs input').val(srPrgrs.srPrgrs);
									}
									let btnHtml = '<center><a href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;">관리</a></center>';
									$('#srApplyOtptBtn').html(btnHtml);
								}
							}
						}
					}
				}
			});
		}
	});
	
	//버튼 비활성화 해제
	$('.srProgressBtn').css('pointer-events', '');
	
	currentDetailSrNo = srNo;
}

//sr계획 작성/수정
function editSrTrnsfPlan() {
	let srNo = currentDetailSrNo;
	let deptNm = $('#srPlanModalDeptInput').val();
	let usrNm = $('#srPlanModalPicInput').val();
	let srTrgtBgngDt = $('#srPlanModalTrgtBgngDt').val();
	let srTrgtCmptnDt = $('#srPlanModalTrgtCmptnDt').val();
	let srTrnsfNote = $('#srPlanModalTrnsfNote').val();
	let srDmndNo = $('#srPlanModalDmndInput').val();

	//날짜 유효성 검사
	let trgtBgngDt = new Date(srTrgtBgngDt);
	let trgtCmptnDt = new Date(srTrgtCmptnDt);
	let today = new Date();
	trgtBgngDt.setHours(0, 0, 0, 0);
	trgtCmptnDt.setHours(0, 0, 0, 0);
	today.setHours(0, 0, 0, 0);
	var srCmptnPrnmntDt;
	$.ajax({
		type: "POST",
		url: "/otisrm/getCmptnPrnmntDt",
		data: {srNo: srNo},
		success: function(data) {
			let srCmptnPrnmntDt = new Date(data);
			srCmptnPrnmntDt.setHours(0, 0, 0, 0);
			if (trgtCmptnDt > srCmptnPrnmntDt) {
				$('#warningContent').html("목표 완료일은 완료 요청일 이후일 수 없습니다.");
				$("#warningModal").modal("show");
				return;
			}
			
			if (trgtBgngDt < today) {
				$('#warningContent').html("목표 시작일은 작성일 이전일 수 없습니다.");
				$("#warningModal").modal("show");
				return;
			}
			
			if (trgtBgngDt > trgtCmptnDt) {
				$('#warningContent').html("목표 완료일은 목표 시작일 이전일 수 없습니다.");
				$("#warningModal").modal("show");
				return;
			}
			
			//유효성 검사 통과
			let requestData = {
				srNo: srNo,
				deptNm: deptNm,
		        usrNm: usrNm,
		        srTrgtBgngDt: srTrgtBgngDt,
		        srTrgtCmptnDt: srTrgtCmptnDt,
		        srTrnsfNote: srTrnsfNote,
		        srDmndNo: srDmndNo
		    };
			
			console.log(requestData);
			
			$.ajax({
				type: "POST",
				url: "/otisrm/editSrTrnsfPlan",
				data: requestData,
				success: function(data) {
					showSrProgressModalFromMain(srNo);
				}
			});
			
			mainTableConfig(currentProgressManagementSearch, currentPageNo);
			
			$('#alertContent').html("SR계획이 저장되었습니다.");
			$("#alertModal").modal("show");
			console.log("111111");
		}
	});
}

//담당자 검색 모달 구성
function composeFindPicModal() {
	//dept select 구성
	$.ajax({
		type: "POST",
		url: "/otisrm/getFindPicModalDeptSelectList",
		data: {},
		success: function(data) {
			for (let i=0; i<data.length; ++i) {
				let html = '<option value="' + data[i].deptNo + '">' + data[i].deptNm + '</option>';
				$('#findPicModalDeptSelect').append(html);
			}
		}
	});
	
	composeFindPicModalTable(1);
}

//담당자 검색 모달 구성
function composeFindPicModal() {
	//dept select 구성
	$.ajax({
		type: "POST",
		url: "/otisrm/getFindPicModalDeptSelectList",
		data: {},
		success: function(data) {
			for (let i=0; i<data.length; ++i) {
				let html = '<option value="' + data[i].deptNo + '">' + data[i].deptNm + '</option>';
				$('#findPicModalDeptSelect').append(html);
			}
		}
	});
	
	composeFindPicModalTable(1);
}

//담당자 검색 모달 테이블 구성
function composeFindPicModalTable(pageNo) {
	//데이터 준비
	let deptNo = $('#findPicModalDeptSelect').val();
	let usrNm = $('#findPicModalPicInput').val();
	
	let requestData = {
        deptNo: deptNo,
        usrNm: usrNm,
        pageNo: pageNo
    };
	
	//테이블 구성
	$.ajax({
		type: "POST",
		url: "/otisrm/getFindPicModalCompose",
		data: requestData,
		success: function(data) {
			//테이블 body 구성
			//테이블 body 초기화
			$('#findPicModalTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.usrList.length; ++i) {
				let usr = data.usrList[i];
				let findPicTableHtml = '';
				findPicTableHtml += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
				findPicTableHtml += '<td>' + (i+1) + '</td>';
				findPicTableHtml += '<td>' + usr.deptNm + '</td>';
				findPicTableHtml += '<td>' + usr.roleNm + '</td>';
				findPicTableHtml += '<td>' + usr.ibpsNm + '</td>';
				findPicTableHtml += '<td>' + usr.usrNm + '</td>';
				findPicTableHtml += '<td> <button class="btn-blue detail-button" style="height:2.8rem; width:40%;" data-dismiss="modal" onclick="setFindPicModalPic(\'' + usr.deptNm + '\', \'' + usr.usrNm + '\')">선택</button> </td>';
				//jsp에 삽입
				$('#findPicModalTable tbody').append(findPicTableHtml);
			}
			
			//페이징 파트 구성
			let pagerHtml = '';
			if (data.pager.totalRows == 0) {
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">처음</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">1</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">맨끝</a>';
			} else {
				currentPageNo = data.pager.pageNo;
				pagerHtml += '<a href="javascript:void(0)" onclick="composeFindPicModalTable('+1+')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">처음</a>';
				if (data.pager.groupNo == 1) {
					pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:0.5rem;">이전</a>';
				} else {
					pagerHtml += '<a href="javascript:void(0)" onclick="onclick="composeFindPicModalTable(' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">이전</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.5rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="onclick="composeFindPicModalTable('+i+')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; font-weight:700; color:blue; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.5rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
				} else {
					pagerHtml += '<a href="javascript:void(0)" onclick="onclick="composeFindPicModalTable(' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">다음</a>';
				}
				pagerHtml += '<a href="javascript:void(0)" onclick="onclick="composeFindPicModalTable(' + data.pager.endPageNo + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">맨끝</a>';
			}
			$('#findPicModalTablePagerDiv').html(pagerHtml);
		}
	});
}

//담당자 검색 모달에서 선택시 SR계획정보로 데이터 전달
function setFindPicModalPic(deptNm, usrNm) {
    $('#srPlanModalDeptInput').val(deptNm);
    $('#srPlanModalPicInput').val(usrNm);
}

//--------------------------------------------------------------------------------------------
//sr계획 작성/수정

//HR수정 모달
function showSetHrModal() {
	let srNo = currentDetailSrNo
	
	let requestData = {
		srNo: srNo
  };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/showSetHrModal",
		data: requestData,
		success: function(data) {
			console.log(data);
			$('#setHrModalDeptInput').val(data.deptNm);
			$('#setHrModalAnalysisPicInput').val(data.analysisPicNm);
			$('#setHrModalDesignPicInput').val(data.designPicNm);
			$('#setHrModalImplementPicInput').val(data.implementPicNm);
			$('#setHrModalTestPicInput').val(data.testPicNm);
			$('#setHrModalApplyRequestPicInput').val(data.applyRequestPicNm);
		}
	});
}


//HR담당자 검색 모달 구성
function composeSetHrFindPicModal() {
	let deptNm = $('#srPlanInfoDept').html();
	console.log(deptNm);
	$('#setHrFindPicModalDeptInput').val(deptNm);
	/*
	let td = $(e).closest('td');
	let inputId = td.find('input').attr('id');
	
	$('#setHrFindPicModalCallerInputId').html(inputId);
	console.log(inputId);
	*/
	composeSetHrFindPicModalTable(1);
}

//HR담당 검색 모달 테이블 구성
function composeSetHrFindPicModalTable(pageNo) {
	
	//데이터 준비
	let deptNm = $('#setHrFindPicModalDeptInput').val();
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getDeptNoByDeptNm",
		data: {deptNm: deptNm,
			   srNo: currentDetailSrNo},
		success: function(data) {
			let deptNo = data;
			let usrNm = $('#setHrFindPicModalPicInput').val();
			
			let requestData = {
		        deptNo: deptNo,
		        usrNm: usrNm,
		        pageNo: pageNo
		    };
			
			//테이블 구성
			$.ajax({
				type: "POST",
				url: "/otisrm/getFindPicModalCompose",
				data: requestData,
				success: function(data) {
					//테이블 body 구성
					//테이블 body 초기화
					$('#setHrFindPicModalTable tbody').html('');
					//테이블 body 재구성
					for (let i=0; i<data.usrList.length; ++i) {
						let usr = data.usrList[i];
						let findPicTableHtml = '';
						findPicTableHtml += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
						findPicTableHtml += '<td>' + (i+1) + '</td>';
						findPicTableHtml += '<td>' + usr.deptNm + '</td>';
						findPicTableHtml += '<td>' + usr.roleNm + '</td>';
						findPicTableHtml += '<td>' + usr.ibpsNm + '</td>';
						findPicTableHtml += '<td>' + usr.usrNm + '</td>';
						findPicTableHtml += '<td> <button class="btn-1 detail-button" style="height:2.8rem; width:40%;" data-dismiss="modal" onclick="addHr(\'' + usr.usrNo + '\')">선택</button> </td>';
						//jsp에 삽입
						$('#setHrFindPicModalTable tbody').append(findPicTableHtml);
					}
					
					
					//페이징 파트 구성
					let pagerHtml = '';
					if (data.pager.totalRows == 0) {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">처음</a>';
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:1rem;">이전</a>';
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">1</a>';
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">맨끝</a>';
					} else {
						currentPageNo = data.pager.pageNo;
						pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(composeSetHrFindPicModalTable('+1+')"style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">처음</a>';
						if (data.pager.groupNo == 1) {
							pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-right:0.5rem;">이전</a>';
						} else {
							pagerHtml += '<a href="javascript:void(0)" onclick="composeSetHrFindPicModalTable(' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-right:1rem;">이전</a>';
						}
						
						for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
							pagerHtml += '<div style="width: 0.5rem;"></div>';
							if (data.pager.pageNo != i) {
								pagerHtml += '<a href="javascript:void(0)" onclick="composeSetHrFindPicModalTable('+i+')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
							} else {
								pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; font-weight:700; color:blue; height: 3rem; line-height: 3rem;">'+i+'</a>';
							}
							pagerHtml += '<div style="width: 0.5rem;"></div>';
							
						}
						if (data.pager.groupNo == data.pager.totalGroupNo) {
							pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; color:#868e96; cursor:default; margin-left:1rem;">다음</a>';
						} else {
							pagerHtml += '<a href="javascript:void(0)" onclick="composeSetHrFindPicModalTable(' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">다음</a>';
						}
						pagerHtml += '<a href="javascript:void(0)" onclick="composeSetHrFindPicModalTable(' + data.pager.endPageNo + ')" style="font-size: 1.5rem; height: 3rem; line-height: 3rem; margin-left:1rem;">맨끝</a>';
					}
					$('#setHrFindPicModalTablePagerDiv').html(pagerHtml);
				}
			});
			
		}
	});	
}

function addHr(usrNo) {
	console.log(usrNo);
	console.log	
	$.ajax({
		type: "POST",
		url: "/otisrm/addHr",
		data: {srNo: currentDetailSrNo,
			   usrNo: usrNo},
		success: function(data) {
			showSrProgressModal(currentDetailSrNo);
		}
	});
}

function saveHrInfo() {
	let dataRows = []; // 데이터를 저장할 배열
	let totalPlanCapacity = 0.0;

    // 테이블 내의 각 행 순회
    $("#srHrInfo tr").each(function (idx) {
    	if (idx != 0) {
    	
	        let rowData = {};
	
	        // 현재 행 내의 각 <td> 요소 순회
	        $(this).find("td").each(function (index) {
	        	if (index != 0) {
	        		let key;
		        	if (index == 1) {
		        		key = 'srNo';
		        	} else if (index == 2) {
		        		key = 'usrNo';
		        	} else if (index == 3) {
		        		key = 'usrNm';
		        	} else if (index == 4) {
		        		key = 'roleNm';
		        	} else if (index == 5) {
		        		key = 'planCapacity';
		        	} else if (index == 6) {
		        		key = 'performanceCapacity';
		        	}
		        	let value;
		        	if (index == 1 || index == 2 || index == 3 || index == 4) {
		        		value = $(this).html();
		        	} else {
		        		value = $(this).find('input').val();
		        		if (index == 5) {
		        			totalPlanCapacity += parseFloat(value);
		        			console.log(totalPlanCapacity);
		        		}
		        	}
		            rowData[key] = value;
	        	}
	        	
	        });
	
	        // rowData를 dataRows 배열에 추가
	        dataRows.push(rowData);
    	}
    });
    console.log($('#srPlanModalTotalCapacity').val());
    if (totalPlanCapacity > parseFloat($('#srPlanModalTotalCapacity').val())) {
    	$('#warningContent').html("총 계획공수값을 초과하였습니다.");
		$("#warningModal").modal("show");
		showSrProgressModal(currentDetailSrNo);
		return;
    }

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/saveHrInfo",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	$('#alertContent').html("자원 정보가 저장되었습니다.");
    		$("#alertModal").modal("show");
    		showSrProgressModal(currentDetailSrNo);
        }
    });
}

function deleteHrInfo() {
	let dataList = [];
	// 테이블 내의 체크박스를 확인
	$('#srHrInfo td').each(function () {
	    if ($(this).find('.checkbox').is(':checked')) {
	    	let rowData = {};
	        // 체크된 행의 데이터를 객체로 저장
	    	rowData['srNo'] = $(this).closest('tr').find('.srNo').html();
	    	rowData['usrNo'] = $(this).closest('tr').find('.usrNo').html();
	    	dataList.push(rowData);
	    }
	});
	
	let jsonData = JSON.stringify(dataList);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/deleteHrInfo",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	showSrProgressModal(currentDetailSrNo);
        }
    });
}


function updateSrPrgrs() {
	let srNo = currentDetailSrNo;
	let analysisPicNm = $('#setHrModalAnalysisPicInput').val();
	let designPicNm = $('#setHrModalDesignPicInput').val();
	let implementPicNm = $('#setHrModalImplementPicInput').val();
	let testPicNm = $('#setHrModalTestPicInput').val();
	let applyRequestPicNm = $('#setHrModalApplyRequestPicInput').val();
	

	let requestData = {
		srNo: srNo,
		analysisPicNm: analysisPicNm,
		designPicNm: designPicNm,
		implementPicNm: implementPicNm,
		testPicNm: testPicNm,
		applyRequestPicNm: applyRequestPicNm
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/updateSrPrgrs",
		data: requestData,
		success: function(data) {
			showSrProgressModal(srNo);
		}
	});
}


//-------------------------------------------------------------------------------
function updatePrgrs() {
	let srNo = currentDetailSrNo;
	let analysisPrgrs = $('#srAnalysisPrgrs input').val();
	let designPrgrs = $('#srDesignPrgrs input').val();
	let implementPrgrs = $('#srImplPrgrs input').val();
	let testPrgrs = $('#srTestPrgrs input').val();
	let applyRequestPrgrs = $('#srApplyPrgrs input').val();
	
	let requestData = {
		srNo: srNo,
		analysisPrgrs: analysisPrgrs,
		designPrgrs: designPrgrs,
		implementPrgrs: implementPrgrs,
		testPrgrs: testPrgrs,
		applyRequestPrgrs: applyRequestPrgrs
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/updateSrTrnsfPrgrs",
		data: requestData,
		success: function(data) {
			showSrProgressModal(srNo);
		}
	});
}

function composeManageSrOutputModal(srPrgrsSttsNo) {
	srNo = currentDetailSrNo;
	let srPrgrsNo;
	if (srPrgrsSttsNo == 'ANALYSIS') {
		srPrgrsNo = srNo + '_analysis';
		$('#manageSrOutputModalTableTitle').html('분석');
	} else if (srPrgrsSttsNo == 'DESIGN') {
		srPrgrsNo = srNo + '_design';
		$('#manageSrOutputModalTableTitle').html('설계');
	} else if (srPrgrsSttsNo == 'IMPLEMENT') {
		srPrgrsNo = srNo + '_implement';
		$('#manageSrOutputModalTableTitle').html('구현');
	} else if (srPrgrsSttsNo == 'TEST') {
		srPrgrsNo = srNo + '_test';
		$('#manageSrOutputModalTableTitle').html('시험');
	} else if (srPrgrsSttsNo == 'APPLY_REQUEST') {
		srPrgrsNo = srNo + '_apply_request';
		$('#manageSrOutputModalTableTitle').html('반영요청');
	}
	$('#outputSrPrgrsNo').val(srPrgrsNo);
	
	$.ajax({
		url: "/otisrm/getSrPrgrsOtpts",
		type: "POST",
		data: {srPrgrsNo: srPrgrsNo},
		success: function(data) {
			$('#manageSrOutputModalTable tbody').html('');
			for (let i=0; i<data.length; ++i) {
				let otpt = data[i];
				let html = '';
				html += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
				html += '<td><div class="id" style="display:none;">' + otpt.srPrgrsOtptNo + '</div></td>';
				html += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
				html += '<td>' + otpt.srPrgrsOtptNm + '</td>';
				html += '<td>' + otpt.srPrgrsOtptFileNm + '</td>';
				html += '<td>' + (otpt.srPrgrsOtptSize / 1024).toFixed(2) + 'KB</td>'
				html += '<td>' + otpt.usrNm + '</td>';
				let regDt = new Date(otpt.srPrgrsOtptRegDt);
				html += '<td>' + formatDate(regDt) + '</td>';
				
				$('#manageSrOutputModalTable tbody').append(html);
			}
			setFunctionOnManageSrOutputModalTableTr();
		}
	});
	
}

function setFunctionOnManageSrOutputModalTableTr() {
	$('#manageSrOutputModalTable td').on("click", function(e) {
		if ($(this).find('input').length <= 0) {
			let srPrgrsOtptNo = $(this).closest('tr').find(".id").html();
			window.location.href = "/otisrm/srPrgrsOtptDownload?srPrgrsOtptNo=" + srPrgrsOtptNo;
		}
    });
}

function addSrOutputFile() {
	let outputName = $("#addSrOutputModalOutputNameInput").val();
    let outputFile = $("#addSrOutputModalFileInput")[0].files[0];
    let srPrgrsNo = $("#outputSrPrgrsNo").val();
    
    if (outputName && outputFile) {
    	let formData = new FormData();
        formData.append("srPrgrsNo", srPrgrsNo);
        formData.append("srPrgrsOtptNm", outputName);
        formData.append("srPrgrsOtptData", outputFile);
        
        $.ajax({
            url: "/otisrm/addSrPrgrsOtpt",
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
            	//모달 초기화
            	$("#addSrOutputModalOutputNameInput").val('');
            	$("#addSrOutputModalFileInput").val('');
            	//외부 모달 로드
            	if (srPrgrsNo.includes('analysis')) {
            		composeManageSrOutputModal('ANALYSIS');
            	} else if (srPrgrsNo.includes('design')) {
            		composeManageSrOutputModal('DESIGN');
            	} else if (srPrgrsNo.includes('implement')) {
            		composeManageSrOutputModal('IMPLEMENT');
            	} else if (srPrgrsNo.includes('test')) {
            		composeManageSrOutputModal('TEST');
            	} else if (srPrgrsNo.includes('apply_design')) {
            		composeManageSrOutputModal('APPLY_REQUEST');
            	}
            }
        });
    } else {
        alert("산출물명과 파일을 입력하세요.");
    }
}

function deleteOutput() {
	let srPrgrsOtptNoList = [];
	// 테이블 내의 체크박스를 확인
	$('#manageSrOutputModalTable td').each(function () {
	    if ($(this).find('.checkbox').is(':checked')) {
	        // 체크된 행의 데이터를 객체로 저장
	    	srPrgrsOtptNoList.push($(this).closest('tr').find('.id').html());
	    }
	});
	
	let stts;
	if (srPrgrsOtptNoList[0].includes('analysis')) {
		stts = 'ANALYSIS';
	} else if (srPrgrsOtptNoList[0].includes('design')) {
		stts = 'DESIGN';
	} else if (srPrgrsOtptNoList[0].includes('implement')) {
		stts = 'IMPLEMENT';
	} else if (srPrgrsOtptNoList[0].includes('test')) {
		stts = 'TEST';
	} else if (srPrgrsOtptNoList[0].includes('apply_design')) {
		stts = 'APPLY_REQUEST';
	}

    // AJAX 요청을 통해 서버로 데이터 전송
    $.ajax({
        url: '/otisrm/deleteSelectedOtpt',
        type: 'POST',
        data: JSON.stringify(srPrgrsOtptNoList),
        contentType: 'application/json',
        success: function (data) {
        	console.log(stts);
        	composeManageSrOutputModal(stts);
        }
    });
}

function downloadExcel() {
	let requestData = {
		progressManagementSearch: JSON.stringify(currentProgressManagementSearch),
		pageNo: currentPageNo
	};
	
	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/getProgressManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			// 엑셀에 다운될 데이터
			let excelOutputData = [
				["SR번호", "시스템", "업무", "SR제목", "요청자", "완료요청일", "협력사", "완료예정일", "접수상태", "진행상태"],
			];
			
			for (let i=0; i<data.srList.length; ++i) {
				let sr = data.srList[i];
				
				if (sr.srCmptnPrnmntDt != null) {
					let srCmptnPrnmntDt = new Date(sr.srCmptnPrnmntDt);
					sr.srCmptnPrnmntDt = formatDate(srCmptnPrnmntDt);
				} else {
					sr.srCmptnPrnmntDt = '';
				}
				
				if (sr.srTrgtCmptnDt != null) {
					let srTrgtCmptnDt = new Date(sr.srTrgtCmptnDt);
					sr.srTrgtCmptnDt = formatDate(srTrgtCmptnDt);
				} else {
					sr.srTrgtCmptnDt = '';
				}
				
				excelOutputData.push([
					sr.srNo,
					sr.sysNm,
					sr.srTaskNm,
					sr.srTtl,
					sr.rqstrNm,
					sr.srCmptnPrnmntDt,
					sr.instNm,
					sr.srTrgtCmptnDt,
					sr.srRqustSttsNm,
					sr.srPrgrsSttsNm
		        ]);
			}
			// 워크북 생성
			var wb = XLSX.utils.book_new();
			var ws = XLSX.utils.aoa_to_sheet(excelOutputData);
					
			// 워크북에 워크시트 추가
			XLSX.utils.book_append_sheet(wb, ws, "SR처리목록");
					
			// 엑셀 파일 생성 및 다운로드
			var today = new Date();
			var filename = "SR처리목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
			XLSX.writeFile(wb, filename);
		}
	});
}