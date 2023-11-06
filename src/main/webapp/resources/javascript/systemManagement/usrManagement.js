$(init);

//메인 테이블 검색 옵션
var currentUsrManagementSearch = {
	usrAuthrt: null,
	usrStts: null,
	keywordCategory: null,
	keywordContent: null,
	usrInst: null,
	usrDept: null,
	joinDateStart: null,
	joinDateEnd: null
}
//메인 테이블 페이지 번호
var currentPageNo = 1;
var currentDetailUsrNo;

function init() {
	mainTableSearchDivConfig();
	mainTableConfig(currentUsrManagementSearch, currentPageNo);
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
		url: "/otisrm/systemManagement/usrManagement/getUsrManagementSearchConfig",
		success: function(data) {
			console.log(data.usrAuthrtList);
			$('#authrtSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.usrAuthrtList.length; ++i) {
				let authrtData = data.usrAuthrtList[i];
				$('#authrtSelect').append('<option value="'+ authrtData.usrAuthrtNo + '">' + authrtData.usrAuthrtNm + '</option>');
			}
			
			$('#sttsSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.usrSttsList.length; ++i) {
				let sttsData = data.usrSttsList[i];
				$('#sttsSelect').append('<option value="'+ sttsData.usrSttsNo + '">' + sttsData.usrSttsNm + '</option>');
			}
			
			$('#instSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.instList.length; ++i) {
				let instData = data.instList[i];
				$('#instSelect').append('<option value="'+ instData.instNo + '">' + instData.instNm + '</option>');
			}
			
			$('#deptSelect').html('<option value="" selected>전체</option>');
			
			$('#joinDateStart').val('');
			$('#joinDateEnd').val('');
			
			//instSelect값이 변경될 때마다 실행되는 함수. 협력사에 맞는 부서 정보를 가져와서 deptSelect구성
			$('#instSelect').change(function() {
				let instNo = $('#instSelect').val();
				if (instNo == '') {
					$('#deptSelect').html('<option value="" selected>전체</option>');
				} else {
					$.ajax({
						type: "POST",
						url: "/otisrm/systemManagement/usrManagement/getDeptSelectConfig",
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
function mainTableConfig(usrManagementSearch, pageNo) {
	currentPageNo = pageNo;
	let requestData = {
		usrManagementSearch: JSON.stringify(usrManagementSearch),
		pageNo: pageNo
	}
	console.log(JSON.stringify(requestData));
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/usrManagement/getUsrManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.usrList.length; ++i) {
				let usr = data.usrList[i];
				let mainTableHtml = '';
				mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				mainTableHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
				mainTableHtml += '<td class="usrNo">' + usr.usrNo + '</td>';
				mainTableHtml += '<td>' + usr.usrNm+ '</td>';
				mainTableHtml += '<td>' + usr.usrTelno + '</td>';
				mainTableHtml += '<td>' + usr.usrEml + '</td>';
				mainTableHtml += '<td>' + usr.instNm + '</td>';
				mainTableHtml += '<td>' + usr.deptNm + '</td>';
				mainTableHtml += '<td>' + usr.roleNm + '</td>';
				mainTableHtml += '<td>' + usr.usrAuthrtNm + '</td>';
				let joinDt = new Date(usr.usrJoinDt);
				mainTableHtml += '<td>' + formatDate(joinDt) + '</td>';
				
				mainTableHtml += '<td>' + usr.usrSttsNm + '</td>';
				/*
				mainTableHtml += '<td>';
				mainTableHtml += '<select class="rowSttsSelect" name="rowSttsSelect">';
				if (usr.usrSttsNm == '승인 대기') {
					mainTableHtml += '<option value="PENDING" selected>승인 대기</option>';
					mainTableHtml += '<option value="NORMAL">일반</option>';
					mainTableHtml += '<option value="WITHDRAWL">탈퇴</option>';
				} else if (usr.usrSttsNm == '일반') {
					mainTableHtml += '<option value="PENDING">승인 대기</option>';
					mainTableHtml += '<option value="NORMAL" selected>일반</option>';
					mainTableHtml += '<option value="WITHDRAWL">탈퇴</option>';
				} else if (usr.usrSttsNm == '탈퇴') {
					mainTableHtml += '<option value="PENDING">승인 대기</option>';
					mainTableHtml += '<option value="NORMAL">일반</option>';
					mainTableHtml += '<option value="WITHDRAWL" selected>탈퇴</option>';
				}
				mainTableHtml += '</select>';
				mainTableHtml += '</td>'
				
				*/
				/*
				mainTableHtml += '<td> <button data-toggle="modal" data-target="#requestDetailModal" class="btn-2 detail-button" onclick="showRequestDetailModal(\'' + sr.srNo + '\')">요청상세</button> </td>';
				mainTableHtml += '<td> <button data-toggle="modal" data-target="#srProgressModal" class="btn-2 detail-button" onclick="showSrProgressModal(\'' + sr.srNo + '\')">진척관리</button> </td>';
				*/
				//jsp에 삽입
				$('#mainTable tbody').append(mainTableHtml);
			}
			
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
	currentUsrManagementSearch.usrAuthrt = null;
	currentUsrManagementSearch.usrStts = null;
	currentUsrManagementSearch.keywordCategory = null;
	currentUsrManagementSearch.keywordContent = null;
	currentUsrManagementSearch.usrInst = null;
	currentUsrManagementSearch.usrDept = null;
	currentUsrManagementSearch.joinDateStart = null;
	currentUsrManagementSearch.joinDateEnd = null;
	
	currentPageNo = 1;
	mainTableSearchDivConfig();
	mainTableConfig(currentUsrManagementSearch, currentPageNo);
}

function mainTableSearch() {
	currentUsrManagementSearch.usrAuthrt = $('#authrtSelect').val();
	if ($('#authrtSelect').val() == '') currentUsrManagementSearch.usrAuthrt = null;
	
	currentUsrManagementSearch.usrStts = $('#sttsSelect').val();
	if ($('#sttsSelect').val() == '') currentUsrManagementSearch.usrStts = null;
	
	currentUsrManagementSearch.keywordCategory = $('#keywordCategoty').val();
	if ($('#keywordCategoty').val() == '') currentUsrManagementSearch.keywordCategory = null;
	
	currentUsrManagementSearch.keywordContent = $('#keywordContent').val();
	if ($('#keywordContent').val() == '') currentUsrManagementSearch.keywordContent = null;
	
	currentUsrManagementSearch.usrInst = $('#instSelect').val();
	if ($('#instSelect').val() == '') currentUsrManagementSearch.usrInst = null;
	
	currentUsrManagementSearch.usrDept = $('#deptSelect').val();
	if ($('#deptSelect').val() == '') currentUsrManagementSearch.usrDept = null;
	
	currentUsrManagementSearch.joinDateStart = $('#joinDateStart').val();
	if ($('#joinDateStart').val() == '') currentUsrManagementSearch.joinDateStart = null;
	
	currentUsrManagementSearch.joinDateEnd = $('#joinDateEnd').val();
	if ($('#joinDateEnd').val() == '') currentUsrManagementSearch.joinDateEnd = null;
	
	mainTableConfig(currentUsrManagementSearch, currentPageNo);
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