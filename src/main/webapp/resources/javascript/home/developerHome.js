$(init);

var mainTableFilter = 'Total';
var currentPageNo = 1;
var currentDetailSrNo;
var currentBottomTabFilter;

function init() {
	refactorMainTable('TOTAL', 1);
}

$(document).ready(function() {
	/*
	//메인 테이블 재구성
	if (sessionStorage.getItem('developerHomeMainTableFilter') !== null) {
		mainTableFilter = sessionStorage.getItem('developerHomeMainTableFilter');
	} else {
		mainTableFilter = 'TOTAL';
	}
	if (sessionStorage.getItem('developerHomeCurrentPageNo') !== null) {
		currentPageNo = sessionStorage.getItem('developerHomeCurrentPageNo');
	} else {
		currentPageNo = 1;
	}
	refactorMainTable(mainTableFilter, currentPageNo);
	
	//srDetail 재구성(기존에 있었다면)
	console.log(sessionStorage.getItem('developerHomeCurrentDetailSrNo'));
	if (sessionStorage.getItem('developerHomeCurrentDetailSrNo') !== null) {
		currentDetailSrNo = sessionStorage.getItem('developerHomeCurrentDetailSrNo');
		setSrDetail(currentDetailSrNo);
	}
	//srDetailTab 재구성(기존에 있었다면)
	if (sessionStorage.getItem('developerHomecurrentBottomTabFilter') !== null) {
		currentBottomTabFilter = sessionStorage.getItem('developerHomecurrentBottomTabFilter');
		selectSrProgressTableFilter(currentBottomTabFilter);
	}
	*/
});

//다른 페이지로 이동하기 직전에 실행되는 함수
/*
$(window).on('beforeunload', function() {
	sessionStorage.removeItem('developerHomeMainTableFilter');
	sessionStorage.removeItem('developerHomeCurrentPageNo');
	sessionStorage.removeItem('developerHomeCurrentDetailSrNo');
	sessionStorage.removeItem('developerHomecurrentBottomTabFilter');
});
*/
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

function refactorMainTable(filterType, page) {
	//페이지 변경 버튼을 눌렀을 경우 
	if (filterType == 'change_page') {
		filterType = mainTableFilter;
	}
	
	let requestData = {
        filterType: filterType,
        page: page
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getTableInfo",
		data: requestData,
		success: function(data) {
			//탭 구성
			mainTableFilter = filterType;
			//전체
			if (mainTableFilter == 'TOTAL') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableTotalTab').addClass('filterTabSelected');
				$('#mainTableTotalTab').css('pointer-events', 'none');
				$('#mainTableTotalTab').css('cursor', 'default');
			//요청
			} else if (mainTableFilter == 'RQST') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableRqstTab').addClass('filterTabSelected');
				$('#mainTableRqstTab').css('pointer-events', 'none');
				$('#mainTableRqstTab').css('cursor', 'default');
			//접수
			} else if (mainTableFilter == 'RECEIPT') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableReceiptTab').addClass('filterTabSelected');
				$('#mainTableReceiptTab').css('pointer-events', 'none');
				$('#mainTableReceiptTab').css('cursor', 'default');
			//분석
			} else if (mainTableFilter == 'ANALYSIS') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableAnalysisTab').addClass('filterTabSelected');
				$('#mainTableAnalysisTab').css('pointer-events', 'none');
				$('#mainTableAnalysisTab').css('cursor', 'default');
			//설계
			} else if (mainTableFilter == 'DESIGN') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableDesignTab').addClass('filterTabSelected');
				$('#mainTableDesignTab').css('pointer-events', 'none');
				$('#mainTableDesignTab').css('cursor', 'default');
			//구현
			} else if (mainTableFilter == 'IMPLEMENT') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableImplementTab').addClass('filterTabSelected');
				$('#mainTableImplementTab').css('pointer-events', 'none');
				$('#mainTableImplementTab').css('cursor', 'default');
			//시험
			} else if (mainTableFilter == 'TEST') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableTestTab').addClass('filterTabSelected');
				$('#mainTableTestTab').css('pointer-events', 'none');
				$('#mainTableTestTab').css('cursor', 'default');
			//반영요청
			} else if (mainTableFilter == 'APPLY_REQUEST') {
				$('.mainTableSelectElement').removeClass('filterTabSelected');
				$('.mainTableSelectElement').css('pointer-events', '');
				$('.mainTableSelectElement').css('cursor', 'pointer');
				$('#mainTableApplyRequestTab').addClass('filterTabSelected');
				$('#mainTableApplyRequestTab').css('pointer-events', 'none');
				$('#mainTableApplyRequestTab').css('cursor', 'default');
			}
			
			//원소 개수 구성
			$('#totalNum').html(data.totalNum);
			$('#requestNum').html(data.requestNum);
			$('#analysisNum').html(data.analysisNum);
			$('#receiptNum').html(data.receiptNum);
			$('#designNum').html(data.designNum);
			$('#implementNum').html(data.implementNum);
			$('#testNum').html(data.testNum);
			$('#applyNum').html(data.applyNum);
			
			
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<5; ++i) {
				if (data.srList[i] == null) {
					let html = '';
					if (i == 0) {
						html = '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
						html += '<td colspan=\'10\'>해당 목록 결과가 없습니다.</td>';
					} else {
						html = '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:#F9FAFE;">';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
						html += '<td></td>';
					}
					html += '</tr>'
					$('#mainTable tbody').append(html);
				} else {
					let sr = data.srList[i];
					let srTrHtml = '';
					srTrHtml += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
					srTrHtml += '<td>' + (i+1) + '</td>';
					srTrHtml += '<td>' + sr.srNo + '</td>';
					srTrHtml += '<td>' + sr.sysNm + '</td>';
					srTrHtml += '<td>' + sr.srTaskNm + '</td>';
					srTrHtml += '<td>' + sr.srTtl + '</td>';
					srTrHtml += '<td>' + sr.usrNm + '</td>';
					let srCmptnPrnmntDt = new Date(sr.srCmptnPrnmntDt);
			        srTrHtml += '<td>' + formatDate(srCmptnPrnmntDt) + '</td>';
			        if (sr.srTrgtCmptnDt == null) {
			        	srTrHtml += '<td></td>';
			        } else {
			        	let srTrgtCmptnDt = new Date(sr.srTrgtCmptnDt);
						srTrHtml += '<td>' + formatDate(srTrgtCmptnDt) + '</td>';
			        }
					srTrHtml += '<td>' + sr.srPrgrsSttsNm + '</td>';
					srTrHtml += '<td> <button data-toggle="modal" data-target="#requestDetailModal" class="btn-1 detail-button" style="height:2.6rem; width:60%;" onclick="showRequestDetail(\'' + sr.srNo + '\')">요청상세</button> </td>';
					//jsp에 삽입
					$('#mainTable tbody').append(srTrHtml);
				}
				
			}
			
			//테이블 행 선택 시 하단 작업창에 데이터 세팅
			$('#mainTable tr').click(function() {
				//행 element 탐색
				let row = $(this).closest('tr');
				
				console.log(row);
				//해당 행의 데이터를 추출
				let srNo = row.find('td:eq(1)').text();

			    setSrDetail(srNo);
				
			});
			
			
			
			
			//페이징 파트 구성
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
					pagerHtml += '<a href="javascript:void(0) onclick="refactorMainTable(\'change_page\', '+1+')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
					pagerHtml += '</a>';
					pagerHtml += '<a href="javascript:void(0)  onclick="refactorMainTable(\'change_page\', ' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
					pagerHtml += '</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="refactorMainTable(\'change_page\', '+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="refactorMainTable(\'change_page\', ' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
					pagerHtml += '</a>';	
					pagerHtml += '<a href="javascript:void(0) onclick="refactorMainTable(\'change_page\', ' + data.pager.endPageNo + ')"">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
					pagerHtml += '</a>';
				}
			}
			$('#pager_div').html(pagerHtml);
				
			sessionStorage.setItem('developerHomeMainTableFilter', mainTableFilter);
			sessionStorage.setItem('developerHomeCurrentPageNo', currentPageNo);
			
			
		}
	});
	
}

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
	                html += '<a href="srAtchDownloadForDeveloperHome?srAtchNo='+ srAtch.srAtchNo +'" style="width:auto; display:flex; align-items:self; font-size:1.5rem;">';
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

function setSrDetail(srNo) {
	//그래프 초기화
	$('#totalProgressGraph').css('width', '0%');
	$('#totalProgressGraphText').html('0%');
	$('#analysisProgressGraph').css('width', '0%');
	$('#designProgressGraph').css('width', '0%');
	$('#implementProgressGraph').css('width', '0%');
	$('#testProgressGraph').css('width', '0%');
	$('#applyRequestProgressGraph').css('width', '0%');

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
					srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
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
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" class="btn-1" style="width:30%; height:3rem; font-size:1.5rem;" onclick="composeManageSrOutputModal(\'APPLY_REQUEST\')">관리</a></center>';
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

function modal_sr_conts_btn_checked() {
	$('#modal_sr_dvl_conts_div').css('display', 'none');
	$('#modal_sr_conts_div').css('display', '');
}

function modal_sr_dvl_conts_btn_checked() {
	$('#modal_sr_conts_div').css('display', 'none');
	$('#modal_sr_dvl_conts_div').css('display', '');
}

//SR계획정보 모달 구성
function showSrPlanInfoEditModal() {
	let srNo = currentDetailSrNo;
	
	let requestData = {
        srNo: srNo
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/getSrPlanModalCompose",
		data: requestData,
		success: function(data) {
			console.log(data);
			//SR계획정보 구성
			/*
			for (let i=0; i<data.dmndList.length; ++i) {
				let dmnd = data.dmndList[i];
				let srPlanModalDmndSelectHtml = '';
				srPlanModalDmndSelectHtml += '<option value="' + dmnd.srDmndNo + '">' + dmnd.srDmndNm + '</option>';
				$('#srPlanModalDmndSelect').append(srPlanModalDmndSelectHtml);
			}
			if (data.srDmndNm != null && data.srDmndNm != '') {
				$("#srPlanModalDmndSelect option:selected").prop("selected", false);
			    $("#srPlanModalDmndSelect option").filter(function() {
			        return $(this).text() == data.srDmndNm;
			    }).prop("selected", true);
			}
			*/
			
			$('#srPlanInfoEditModalSrTtl').html(data.srTtl);
			$('#srPlanModalDmndInput').val(data.srDmndNm);
			$('#srPlanModalTaskInput').val(data.srTaskNm);
			$('#srPlanModalDeptInput').val(data.deptNm);
			$('#srPlanModalPicInput').val(data.usrNm);
			$('#srPlanModalTotalCapacity').val(data.totalCapacity)
			if (data.srTrgtBgngDt == null) {
				$('#srPlanModalTrgtBgngDt').val('');
			} else {
				let trgtBgngDt = new Date(data.srTrgtBgngDt);
				$('#srPlanModalTrgtBgngDt').val(formatDate(trgtBgngDt));
			}
			if (data.srTrgtCmptnDt == null) {
				$('#srPlanModalTrgtCmptnDt').val('');
			} else {
				let trgtCmptnDt = new Date(data.srTrgtCmptnDt);
				$('#srPlanModalTrgtCmptnDt').val(formatDate(trgtCmptnDt));
			}
			$('#srPlanModalTrnsfNote').html(data.srTrnsfNote);
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
				findPicTableHtml += '<td> <button class="btn-1 detail-button" style="height:2.8rem; width:40%;" data-dismiss="modal" onclick="setFindPicModalPic(\'' + usr.deptNm + '\', \'' + usr.usrNm + '\')">선택</button> </td>';
				//jsp에 삽입
				$('#findPicModalTable tbody').append(findPicTableHtml);
			}
			
			
			//페이징 파트 구성
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
					pagerHtml += '<a href="javascript:void(0) onclick="composeFindPicModalTable('+1+')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
					pagerHtml += '</a>';
					pagerHtml += '<a href="javascript:void(0)  onclick="composeFindPicModalTable(' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
					pagerHtml += '</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="composeFindPicModalTable('+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="composeFindPicModalTable(' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
					pagerHtml += '</a>';	
					pagerHtml += '<a href="javascript:void(0) onclick="composeFindPicModalTable(' + data.pager.endPageNo + ')"">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
					pagerHtml += '</a>';
				}
				
				$('#findPicModalTablePagerDiv').html(pagerHtml);
			}
		}
	});
}

//담당자 검색 모달에서 선택시 SR계획정보로 데이터 전달
function setFindPicModalPic(deptNm, usrNm) {
    $('#srPlanModalDeptInput').val(deptNm);
    $('#srPlanModalPicInput').val(usrNm);
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
	console.log(srDmndNo);
	
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
			refactorMainTable(mainTableFilter, currentPageNo);
			setSrDetail(srNo);
		}
	});
	
	refactorMainTable(mainTableFilter, currentPageNo);
}

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
							pagerHtml += '<a href="javascript:void(0) onclick="composeSetHrFindPicModalTable('+1+')">';
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
							pagerHtml += '</a>';
							pagerHtml += '<a href="javascript:void(0)  onclick="composeSetHrFindPicModalTable(' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
							pagerHtml += '</a>';
						}
						
						for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
							pagerHtml += '<div style="width: 0.25rem;"></div>';
							if (data.pager.pageNo != i) {
								pagerHtml += '<a href="javascript:void(0)" onclick="composeSetHrFindPicModalTable('+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
							} else {
								pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
							}
							pagerHtml += '<div style="width: 0.25rem;"></div>';
							
						}
						if (data.pager.groupNo == data.pager.totalGroupNo) {
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
						} else {
							pagerHtml += '<a href="javascript:void(0) onclick="composeSetHrFindPicModalTable(' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
							pagerHtml += '</a>';	
							pagerHtml += '<a href="javascript:void(0) onclick="composeSetHrFindPicModalTable(' + data.pager.endPageNo + ')"">';
							pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
							pagerHtml += '</a>';
						}
						
						$('#setHrFindPicModalTablePagerDiv').html(pagerHtml);
					}
				}
			});
			
		}
	});	
}

function addHr(usrNo) {
	console.log(usrNo);
	$.ajax({
		type: "POST",
		url: "/otisrm/addHr",
		data: {srNo: currentDetailSrNo,
			   usrNo: usrNo},
		success: function(data) {
			setSrDetail(currentDetailSrNo);
		}
	});
}

function saveHrInfo() {
	let dataRows = []; // 데이터를 저장할 배열

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
		        	}
		            rowData[key] = value;
	        	}
	        	
	        });
	
	        // rowData를 dataRows 배열에 추가
	        dataRows.push(rowData);
    	}
    });
    console.log(dataRows);

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/saveHrInfo",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	setSrDetail(currentDetailSrNo);
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
        	setSrDetail(currentDetailSrNo);
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
			setSrDetail(srNo);
		}
	});
}

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
			refactorMainTable(mainTableFilter, currentPageNo);
			setSrDetail(srNo);
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
		
		/*
		$.ajax({
			url: "/otisrm/srPrgrsOtptDownload",
			type: "GET",
			data: {srPrgrsOtptNo: srPrgrsOtptNo},
			success: function(data) {
				
			}
		});
		*/
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

function srPerformanceRegistrationModalConfig() {
	 $.ajax({
        url: '/otisrm/getUsrCapacity',
        type: 'POST',
        success: function (data) {
        	$('#srPerformanceRegistrationModalTable tbody').html('');
        	if (data != null) {
        		for (let i=0; i<data.length; ++i) {
        			let hrData = data[i];
        			let html = '';
        			html += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
        			html += '<td style="display:none">' + hrData.usrNo + '</td>';
        			html += '<td>' + hrData.srNo + '</td>';
        			let srTrgtBgngDt = new Date(hrData.srTrgtBgngDt);
        			html += '<td>' + formatDate(srTrgtBgngDt) + '</td>';
        			let srTrgtCmptnDt = new Date(hrData.srTrgtCmptnDt);
        			html += '<td>' + formatDate(srTrgtCmptnDt) + '</td>';
        			html += '<td>' + hrData.planCapacity + '</td>';
        			html += '<td>' + hrData.performanceCapacity + '</td>';
        			html += '<td><input type="text" value="' + hrData.lastRegCapacity + '" style="width:50%; text-align: center;"></div></td>';
        			html += '</tr>';
        				
    				$('#srPerformanceRegistrationModalTable tbody').append(html);
        		}
        	}
        	
        }
    });
}

function registerCapacity() {
	let dataRows = []; // 데이터를 저장할 배열

    // 테이블 내의 각 행 순회
    $("#srPerformanceRegistrationModalTable tr").each(function (idx) {
    	if (idx != 0) {
    	
	        let rowData = {};
	
	        // 현재 행 내의 각 <td> 요소 순회
	        $(this).find("td").each(function (index) {
	        	if (index == 0) {
	        		rowData['usrNo'] = $(this).html();
	        	} else if (index == 1) {
	        		rowData['srNo'] = $(this).html();
	        	} else if (index == 6) {
	        		rowData['lastRegCapacity'] = $(this).find('input').val();
	        	}
	        });
	        dataRows.push(rowData);
    	}
    });
    console.log(dataRows);

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/registerHrInfo",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	srPerformanceRegistrationModalConfig();
        	if (currentDetailSrNo != null) {
        		setSrDetail(currentDetailSrNo);
        	}
        }
    });
}

function changeScheduleRequestModalConfig() {
	console.log(currentDetailSrNo);
	$.ajax({
        url: "/otisrm/getSrCmptnPrnmntDt",
        method: "POST",
        data: {srNo: currentDetailSrNo},
        success: function (data) {
        	if (data.srSchdlChgRqstDt == null || data.srSchdlChgRqstDt == '') {
        		data.srSchdlChgRqstDt = data.srCmptnPrnmntDt;
        	}
        	let currentCmptnPrnmntDt = new Date(data.srCmptnPrnmntDt);
        	let requestSrTrgtCmptnDt = new Date(data.srSchdlChgRqstDt);
        	$('#currentSrCmptnPrnmntDt').val(formatDate(currentCmptnPrnmntDt));
        	$('#requestSrTrgtCmptnDt').val(formatDate(requestSrTrgtCmptnDt));
        }
    });
}

function srScheduleChangeRequest() {
	let requestSrTrgtCmptnDt = $('#requestSrTrgtCmptnDt').val();
	$.ajax({
        url: "/otisrm/requestSrScheduleChange",
        method: "POST",
        data: {
        	srNo: currentDetailSrNo,
        	srSchdlChgRqstDt: requestSrTrgtCmptnDt
        },
        success: function (data) {
        	if (data == "success") {
        		$('#alertContent').html("일정 변경이 신청되었습니다.");
    			$("#alertModal").modal("show");
        	} else {
        		$('#warningContent').html("신청이 실패했습니다.");
    			$("#warningModal").modal("show");
        	}
        	
        }
    });
}

function manageChangeScheduleRequestModalConfig() {
	$('#manageChangeScheduleRequestModalTable tbody').html('');
	$.ajax({
        url: "/otisrm/getManageChangeScheduleRequestModalConfig",
        method: "POST",
        success: function (data) {
        	if (data.length == 0) {
        		let html = '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
        		html += '<td colspan=\'7\'>일정변경요청 내역이 없습니다.</td>';
        		html += '</tr>'
        		$('#manageChangeScheduleRequestModalTable tbody').append(html);
        	}
        	for (let i=0; i<data.length; ++i) {
        		let config = data[i];
    			let html = '';
    			html += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
    			html += '<td>' + (i+1) + '</td>';
    			html += '<td>' + config.srNo + '</td>';
    			let srCmptnPrnmntDt = new Date(config.srCmptnPrnmntDt);
    			html += '<td><input type="date" value="' + formatDate(srCmptnPrnmntDt) + '" disabled></td>';
    			let srSchdlChgRqstDt = new Date(config.srSchdlChgRqstDt);
    			html += '<td><input class="chgRqstDt" type="date" value="' + formatDate(srSchdlChgRqstDt) + '"></td>';
    			html += '<td>' + config.status + '</td>';
    			html += '<td> <button class="btn-1" style="height:2.8rem;" onclick="srScheduleChangeRequestModal(\'' + config.srNo + '\')">요청수정/재신청</button> </td>';
    			if (config.srSchdlChgRqstAprvYn == null || config.srSchdlChgRqstAprvYn == '') {
    				html += '<td></td>'
    			} else {
    				html += '<td> <button class="btn-1" style="height:2.8rem;" onclick="srScheduleChangeRequestResultCheck(\'' + config.srNo + '\')">확인</button> </td>';
    			}
    			html += '</tr>';
    			
				$('#manageChangeScheduleRequestModalTable tbody').append(html);
        	}
        }
    });
}

function srScheduleChangeRequestModal(srNo) {
	let requestSrTrgtCmptnDt = $(event.target).closest('tr').find('.chgRqstDt').val();
	
	$.ajax({
        url: "/otisrm/requestSrScheduleChange",
        method: "POST",
        data: {
        	srNo: srNo,
        	srSchdlChgRqstDt: requestSrTrgtCmptnDt
        },
        success: function (data) {
        	if (data == "success") {
        		$('#alertContent').html("일정 변경이 신청되었습니다.");
    			$("#alertModal").modal("show");
        	} else {
        		$('#warningContent').html("신청이 실패했습니다.");
    			$("#warningModal").modal("show");
        	}
        	manageChangeScheduleRequestModalConfig();
        }
    });
}

function srScheduleChangeRequestResultCheck(srNo) {
	$.ajax({
        url: "/otisrm/srScheduleChangeRequestResultCheck",
        method: "POST",
        data: { srNo: srNo },
        success: function (data) {
        	if (data == "success") {
        		
        	} else {
        		
        	}
        	manageChangeScheduleRequestModalConfig();
        }
    });
}


