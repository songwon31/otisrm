$(init);

//메인 테이블 검색 옵션
var currentInstManagementSearch = {
	keywordCategory: null,
	keywordContent: null
}
//메인 테이블 페이지 번호
var currentPageNo = 1;
var currentDetailInstNo;

function init() {
	mainTableConfig(currentInstManagementSearch, currentPageNo);
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

//메인 테이블 구성
function mainTableConfig(instManagementSearch, pageNo) {
	console.log(instManagementSearch, pageNo);
	currentPageNo = pageNo;
	let requestData = {
		instManagementSearch: JSON.stringify(instManagementSearch),
		pageNo: pageNo
	}
	console.log(JSON.stringify(requestData));
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/instManagement/getInstManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			console.log(data);
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.instList.length; ++i) {
				let inst = data.instList[i];
				let mainTableHtml = '';
				mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				mainTableHtml += '<td>' + (i+1) + '</td>';
				mainTableHtml += '<td>' + inst.instNm+ '</td>';
				mainTableHtml += '<td class="tableInstNo">' + inst.instNo + '</td>';
				if (inst.outsrcYn == 'N') {
					mainTableHtml += '<td class="tableInstNo">본사</td>';
				} else if (inst.outsrcYn == 'Y') {
					mainTableHtml += '<td class="tableInstNo">협력사</td>';
				} else if (inst.outsrcYn == 'C') {
					mainTableHtml += '<td class="tableInstNo">고객사</td>';
				}
				
				//jsp에 삽입
				$('#mainTable tbody').append(mainTableHtml);
			}
			
			//테이블 행 선택 시 우측 작업창에 데이터 세팅
			$('#mainTable tr').click(function() {
				//행 element 탐색
				let row = $(this).closest('tr');
				
				console.log(row);
				//해당 행의 데이터를 추출
				let instNo = row.find('td:eq(2)').text();

			    setInstDetail(instNo);
				
			});
			/*
			//일괄 체크 구현
			$("#batchCheck").on("change", function() {
		        if ($(this).prop("checked")) {
		            // batchCheck가 체크되면 mainTable 안의 모든 체크박스를 체크
		            $("#mainTable input[type='checkbox']").prop("checked", true);
		        } else {
		            // batchCheck가 체크 해제되면 mainTable 안의 모든 체크박스를 체크 해제
		            $("#mainTable input[type='checkbox']").prop("checked", false);
		        }
		    });
			*/
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
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentUsrManagementSearch, '+1+')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
					pagerHtml += '</a>';
					pagerHtml += '<a href="javascript:void(0)  onclick="mainTableConfig(currentUsrManagementSearch, ' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
					pagerHtml += '</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentUsrManagementSearch, '+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentUsrManagementSearch, ' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
					pagerHtml += '</a>';	
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentUsrManagementSearch, ' + data.pager.endPageNo + ')"">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
					pagerHtml += '</a>';
				}
				
				$('#mainTablePagingDiv').html(pagerHtml);
			}
		}
	});
}

function mainTableSearchReset() {
	currentInstManagementSearch.keywordCategory = null;
	currentInstManagementSearch.keywordContent = null;
	
	currentPageNo = 1;
	$('#keywordCategoty').val('instNm');
	$('#keywordContent').val('');
	mainTableConfig(currentInstManagementSearch, currentPageNo);
}

function mainTableSearch() {
	currentInstManagementSearch.keywordCategory = $('#keywordCategoty').val();
	if ($('#keywordCategoty').val() == '') currentInstManagementSearch.keywordCategory = null;
	
	currentInstManagementSearch.keywordContent = $('#keywordContent').val();
	if ($('#keywordContent').val() == '') currentInstManagementSearch.keywordContent = null;
	
	mainTableConfig(currentInstManagementSearch, currentPageNo);
}

function setInstDetail(instNo) {
	let requestData = {
        instNo: instNo
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/instManagement/getDetailInstInfo",
		data: requestData,
		success: function(data) {
			$('#instDetailNm').html(data.instNm);
			$('#instDetailNo').html(data.instNo);
			if (data.outsrcYn == 'Y') {
				$('#instDetailClsf').html('본사');
			} else if (data.outsrcYn == 'N') {
				$('#instDetailClsf').html('협력사');
			} else if (data.outsrcYn == 'C') {
				$('#instDetailClsf').html('고객사');
			} 
			
			for (let i=0; i<data.ibpsList.length; ++i) {
				let ibps = data.ibpsList[i];
				let html = '';
				html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
				html += '<td>' + (i+1) + '</td>';
				html += '<td><input type="text" class="detailIbpsNm" value="' + ibps.ibpsNm + '" style="width:50%; text-align: center;"></td>';
				html += '<td><input type="text" class="detailIbpsNo" value="' + ibps.ibpsNo + '" style="width:50%; text-align: center;"></td>';
				html += '<td>' + ibps.ibpsNm+ '</td>';
				html += '<td>' + ibps.ibpsNo+ '</td>';
				html += '<td>' + ibps.ibpsNo+ '</td>';
			}
			

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
					srTrnsfHrHtml += '<td><input type="checkbox" class="checkbox"></td>';
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
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" onclick="composeManageSrOutputModal(\'ANALYSIS\')"';
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
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#designProgressGraph').css('width', ((srPrgrs.srPrgrs - 10) * 10) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" onclick="composeManageSrOutputModal(\'DESIGN\')"';
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
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#implementProgressGraph').css('width', ((srPrgrs.srPrgrs - 20) * 2) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" onclick="composeManageSrOutputModal(\'IMPLEMENT\')"';
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
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#testProgressGraph').css('width', ((srPrgrs.srPrgrs - 70) * 5) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" onclick="composeManageSrOutputModal(\'TEST\')"';
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
							
							//그래프 재구성
							$('#totalProgressGraph').css('width', srPrgrs.srPrgrs + '%');
							$('#totalProgressGraphText').html(srPrgrs.srPrgrs + '%');
							$('#applyRequestProgressGraph').css('width', ((srPrgrs.srPrgrs - 90) * 10) + '%');
						}
						let btnHtml = '<center><a data-toggle="modal" data-target="#manageSrOutputModal" href="javascript:void(0)" onclick="composeManageSrOutputModal(\'APPLY_REQUEST\')"';
						btnHtml += 'style="height: 3rem; width: 30%; border-radius: 5px; background-color:#2c7be4; color:white; font-weight:700;';
						btnHtml += 'display: flex; flex-direction: row; justify-content: center; align-items: center;">관리</a></center>';
						$('#srApplyOtptBtn').html(btnHtml);
					}
				}
			}
			
			
		}
	});
	
	currentDetailInstNo = instNo;
	sessionStorage.setItem('developerHomeCurrentDetailInstNo', currentDetailInstNo);
}

function batchApproval() {
	let usrNoList = [];
	// 테이블 내의 체크박스를 확인
	$('#mainTable td').each(function () {
	    if ($(this).find('.checkbox').is(':checked')) {
	        // 체크된 행의 데이터를 객체로 저장
	    	usrNoList.push($(this).closest('tr').find('.usrNo').html());
	    }
	});
	
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/batchApproval',
        type: 'POST',
        data: JSON.stringify(usrNoList),
        contentType: 'application/json',
        success: function (data) {
        	mainTableConfig(currentUsrManagementSearch, currentPageNo);
        }
    });
}

function batchWithdrawal() {
	let usrNoList = [];
	// 테이블 내의 체크박스를 확인
	$('#mainTable td').each(function () {
	    if ($(this).find('.checkbox').is(':checked')) {
	        // 체크된 행의 데이터를 객체로 저장
	    	usrNoList.push($(this).closest('tr').find('.usrNo').html());
	    }
	});
	
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/batchWithdrawl',
        type: 'POST',	
        data: JSON.stringify(usrNoList),
        contentType: 'application/json',
        success: function (data) {
        	mainTableConfig(currentUsrManagementSearch, currentPageNo);
        }
    });
}

/*
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
        },
		error: function (error) {
			console.error("오류 발생:", error);
		}
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

*/