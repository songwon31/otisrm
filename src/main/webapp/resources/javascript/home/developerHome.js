$(init);

var mainTableFilter = 'Total';
var currentPageNo = 1;
var currentDetailSrNo;
var currentBottomTabFilter;

function init() {
	//테이블 행 선택 시 하단 작업창에 데이터 세팅
	$('#mainTable tr').click(function() {
		//행 element 탐색
		let row = $(this).closest('tr');
		
		//해당 행의 데이터를 추출
		let srNo = row.find('td:eq(0)').text();

	    setSrDetail(srNo);
		
	});
	
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
}

$(document).ready(function() {
	refactorMainTable('TOTAL', 1);
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
			for (let i=0; i<data.srList.length; ++i) {
				let sr = data.srList[i];
				let srTrHtml = '';
				srTrHtml += '<tr style="height: 4.5rem; font-size: 1.5rem; background-color:white;">';
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
				srTrHtml += '<td> <button data-toggle="modal" data-target="#requestDetailModal" class="btn-2 detail-button" onclick="showRequestDetail(\'' + sr.srNo + '\')">요청상세</button> </td>';
				//jsp에 삽입
				$('#mainTable tbody').append(srTrHtml);
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
			
			init();
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
        },
		error: function (error) {
			console.error("오류 발생:", error);
		}
	});
}

function setSrDetail(srNo) {
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
						let btnHtml = '<center><a href="javascript:void(0)" onclick=""';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
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
						let btnHtml = '<center><a href="javascript:void(0)" onclick=""';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
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
						let btnHtml = '<center><a href="javascript:void(0)" onclick=""';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
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
						let btnHtml = '<center><a href="javascript:void(0)" onclick=""';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
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
						let btnHtml = '<center><a href="javascript:void(0)" onclick=""';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
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
			$('#srPlanModalDmndInput').val(data.srDmndNm);
			$('#srPlanModalTaskInput').val(data.srTaskNm);
			$('#srPlanModalDeptInput').val(data.deptNm);
			$('#srPlanModalPicInput').val(data.usrNm);
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
				findPicTableHtml += '<td>' + usr.deptNm + '</td>';
				findPicTableHtml += '<td>' + usr.roleNm + '</td>';
				findPicTableHtml += '<td>' + usr.ibpsNm + '</td>';
				findPicTableHtml += '<td>' + usr.usrNm + '</td>';
				findPicTableHtml += '<td> <button class="btn-2 detail-button" data-dismiss="modal" onclick="setFindPicModalPic(\'' + usr.deptNm + '\', \'' + usr.usrNm + '\')">선택</button> </td>';
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
	
	let requestData = {
		srNo: srNo,
		deptNm: deptNm,
        usrNm: usrNm,
        srTrgtBgngDt: srTrgtBgngDt,
        srTrgtCmptnDt: srTrgtCmptnDt,
        srTrnsfNote: srTrnsfNote
    };
	
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
function composeSetHrFindPicModal(e) {
	let deptNm = $('#setHrModalDeptInput').val();
	$('#setHrFindPicModalDeptInput').val(deptNm);
	
	let td = $(e).closest('td');
	let inputId = td.find('input').attr('id');
	
	$('#setHrFindPicModalCallerInputId').html(inputId);
	console.log(inputId);
	
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
						findPicTableHtml += '<td>' + usr.deptNm + '</td>';
						findPicTableHtml += '<td>' + usr.roleNm + '</td>';
						findPicTableHtml += '<td>' + usr.ibpsNm + '</td>';
						findPicTableHtml += '<td>' + usr.usrNm + '</td>';
						findPicTableHtml += '<td> <button class="btn-2 detail-button" data-dismiss="modal" onclick="setHrModalPic(\'' + usr.usrNm + '\')">선택</button> </td>';
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

function setHrModalPic(usrNm) {
	let inputId = '#' + $('#setHrFindPicModalCallerInputId').html();
	$(inputId).val(usrNm);
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