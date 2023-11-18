	$(init);

//메인 테이블 검색 옵션
var currentSrManagementSearch = {
	sysNo: null,
	rqstInstNo: null,
	dvlDeptNo: null,
	srRqstSttsNo: null,
	regDateStart: null,
	regDateEnd: null,
	keywordCategory: null,
	keywordContent: null,
	dvlCmptnSrCheck: null
}
//메인 테이블 페이지 번호
var currentPageNo = 1;
var currentDetailSrRqstNo;

function init() {
	mainTableSearchDivConfig();
	mainTableConfig(currentSrManagementSearch, currentPageNo);
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
		url: "/otisrm/systemManagement/srManagement/getSrManagementSearchConfig",
		success: function(data) {
			$('#systemSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.sysList.length; ++i) {
				let sys = data.sysList[i];
				$('#systemSelect').append('<option value="'+ sys.sysNo + '">' + sys.sysNm + '</option>');
			}
			
			$('#rqstInstSelect').html('<option value="" selected>전체</option>');	
			for (let i=0; i<data.reqstrInstList.length; ++i) {
				let rqstInst = data.reqstrInstList[i];
				$('#rqstInstSelect').append('<option value="'+ rqstInst.instNo + '">' + rqstInst.instNm + '</option>');
			}
			
			$('#deptSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.deptList.length; ++i) {
				let dept = data.deptList[i];
				$('#deptSelect').append('<option value="'+ dept.deptNo + '">' + (dept.instNm + '-' + dept.deptNm) + '</option>');
			}
			
			$('#srSttsSelect').html('<option value="" selected>전체</option>');
			for (let i=0; i<data.srRqstSttsList.length; ++i) {
				let srRqstStts = data.srRqstSttsList[i];
				$('#srSttsSelect').append('<option value="'+ srRqstStts.srRqstSttsNo + '">' + srRqstStts.srRqstSttsNm + '</option>');
			}
			
			
			$('#regDateStart').val('');
			$('#regDateEnd').val('');
			
			$('#keywordCategory').val('srTtl');
			$('#keywordContent').val('');
		}
	});
}

//메인 테이블 구성
function mainTableConfig(srManagementSearch, pageNo) {
	currentPageNo = pageNo;
	let requestData = {
		srManagementSearch: JSON.stringify(srManagementSearch),
		pageNo: pageNo
	}
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/srManagement/getSrManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			console.log(data);
			
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.srList.length; ++i) {
				let sr = data.srList[i];
				let mainTableHtml = '';
				mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				mainTableHtml += '<td>' + (i+1) + '</td>';
				mainTableHtml += '<td class="srRqstNo">' + sr.srRqstNo + '</td>';
				mainTableHtml += '<td>' + sr.srTtl + '</td>';
				mainTableHtml += '<td>' + sr.sysNm + '</td>';
				mainTableHtml += '<td>' + sr.reqstrNm + '</td>';
				mainTableHtml += '<td>' + sr.reqstrInstNm + '</td>';
				let regDt = new Date(sr.srRqstRegDt);
				mainTableHtml += '<td>' + formatDate(regDt) + '</td>';
				mainTableHtml += '<td>' + sr.srRqstSttsNm + '</td>';
				mainTableHtml += '<td>' + sr.srTrnsfYn + '</td>';
				
				mainTableHtml += '<td><button type="button" id="showSrRqstDetailBtn" data-toggle="modal" class="btn-1" style="width:70%; height:2.8rem;"';
				mainTableHtml += 'data-target="#usrDetailModal" onclick="">상세정보</button></td>';
				
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
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentSrManagementSearch, '+1+')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">first_page</i>';
					pagerHtml += '</a>';
					pagerHtml += '<a href="javascript:void(0)  onclick="mainTableConfig(currentSrManagementSearch, ' + ((data.pager.groupNo - data.pager.pagesPerGroup) * 5) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_left</i>';
					pagerHtml += '</a>';
				}
				
				for (let i=data.pager.startPageNo; i<=data.pager.endPageNo; ++i) {
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					if (data.pager.pageNo != i) {
						pagerHtml += '<a href="javascript:void(0)" onclick="mainTableConfig(currentSrManagementSearch, '+i+')" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					} else {
						pagerHtml += '<a href="javascript:void(0)" style="font-size: 1.6rem; height: 3rem; line-height: 3rem;">'+i+'</a>';
					}
					pagerHtml += '<div style="width: 0.25rem;"></div>';
					
				}
				if (data.pager.groupNo == data.pager.totalGroupNo) {
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">chevron_right</i>';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center; color:#868e96; cursor:default;">last_page</i>';
				} else {
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentSrManagementSearch, ' + ((data.pager.groupNo * data.pager.pagesPerGroup)+1) + ')">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">chevron_right</i>';
					pagerHtml += '</a>';	
					pagerHtml += '<a href="javascript:void(0) onclick="mainTableConfig(currentSrManagementSearch, ' + data.pager.endPageNo + ')"">';
					pagerHtml += '<i class="material-icons" style="font-size: 2rem; height: 3rem; line-height: 3rem; display: flex; align-content: center;">last_page</i>';
					pagerHtml += '</a>';
				}
				
				$('#mainTablePagingDiv').html(pagerHtml);
			}
			
			
		}
	});
}

function mainTableSearchReset() {
	currentSrManagementSearch.sysNo = null;
	currentSrManagementSearch.rqstInstNo = null;
	currentSrManagementSearch.dvlDeptNo = null;
	currentSrManagementSearch.srRqstSttsNo = null;
	currentSrManagementSearch.regDateStart = null;
	currentSrManagementSearch.regDateEnd = null;
	currentSrManagementSearch.keywordCategory = null;
	currentSrManagementSearch.keywordContent = null;
	currentSrManagementSearch.dvlCmptnSrCheck = null;
	
	currentPageNo = 1;
	mainTableSearchDivConfig();
	mainTableConfig(currentSrManagementSearch, currentPageNo);
}

function mainTableSearch() {
	currentSrManagementSearch.sysNo = $('#systemSelect').val();
	if ($('#systemSelect').val() == '') currentSrManagementSearch.sysNo = null;
	currentSrManagementSearch.rqstInstNo = $('#rqstInstSelect').val();
	if ($('#rqstInstSelect').val() == '') currentSrManagementSearch.rqstInstNo = null;
	currentSrManagementSearch.dvlDeptNo = $('#deptSelect').val();
	if ($('#deptSelect').val() == '') currentSrManagementSearch.dvlDeptNo = null;
	currentSrManagementSearch.srRqstSttsNo = $('#srSttsSelect').val();
	if ($('#srSttsSelect').val() == '') currentSrManagementSearch.srRqstSttsNo = null;
	currentSrManagementSearch.regDateStart = $('#regDateStart').val();
	if ($('#regDateStart').val() == '') currentSrManagementSearch.regDateStart = null;
	currentSrManagementSearch.regDateEnd = $('#regDateEnd').val();
	if ($('#regDateEnd').val() == '') currentSrManagementSearch.regDateEnd = null;
	currentSrManagementSearch.keywordCategory = $('#keywordCategory').val();
	if ($('#keywordCategory').val() == '') currentSrManagementSearch.keywordCategory = null;
	currentSrManagementSearch.keywordContent = $('#keywordContent').val();
	if ($('#keywordContent').val() == '') currentSrManagementSearch.keywordContent = null;
	if ($('#dvlCmptnSrCheck').prop('checked')) {
		currentSrManagementSearch.dvlCmptnSrCheck = "checked";
	} else {
		currentSrManagementSearch.dvlCmptnSrCheck = null;
	}
	console.log(currentSrManagementSearch);
	mainTableConfig(currentSrManagementSearch, currentPageNo);
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
        	if (data == 0) {
        		$('#wraningModalContent').html("진행중인 SR건이 있을 경우\n    탈퇴처리할 수 없습니다!");
        		$("#wraningModal").modal("show");
        	}
        	mainTableConfig(currentUsrManagementSearch, currentPageNo);
        }
    });
}

function usrDetailModalConfig(usrNo) {
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/getUsrDetailModalConfig',
        type: 'POST',	
        data: {usrNo: usrNo},
        success: function (data) {
        	$('#modalUsrNo').html(data.usrNo);
        	$('#modalUsrNm').html(data.usrNm);
        	$('#modalUsrRrno').html(data.usrRrno);
        	$('#modalUsrTelno').html(data.usrTelno);
        	$('#modalUsrEml').html(data.usrEml);
        	$('#modalInstNm').html(data.instNm);
        	
        	$('#modalUsrDept').html('');
        	for (let i=0; i<data.deptList.length; ++i) {
        		let dept = data.deptList[i];
        		let html = '<option value="' + dept.deptNo + '">' + dept.deptNm + '</option>';
        		$('#modalUsrDept').append(html);
        	}
        	$('#modalUsrDept').val(data.deptNo);
        	
        	$('#modalUsrIbps').html('');
        	for (let i=0; i<data.ibpsList.length; ++i) {
        		let ibps = data.ibpsList[i];
        		let html = '<option value="' + ibps.ibpsNo + '">' + ibps.ibpsNm + '</option>';
        		$('#modalUsrIbps').append(html);
        	}
        	$('#modalUsrIbps').val(data.ibpsNo);
        	
        	$('#modalUsrRole').html('');
        	for (let i=0; i<data.roleList.length; ++i) {
        		let role = data.roleList[i];
        		let html = '<option value="' + role.roleNo + '">' + role.roleNm + '</option>';
        		$('#modalUsrRole').append(html);
        	}
        	$('#modalUsrRole').val(data.roleNo);
        	
        	$('#modalUsrAuthrt').val(data.usrAuthrtNo);
        	$('#modalUsrSttsNm').html(data.usrSttsNm);
        	let joinDt = new Date(data.usrJoinDt);
        	$('#modalUsrJoinDt').html(formatDate(joinDt));
        	/*
        	if (data.usrWhdwlDt != null && data.usrWhdwlDt != '') {
        		let whdwlDt = new Date(data.usrWhdwlDt);
        		$('#modalUsrWhdwlDt').html(formatDate(whdwlDt));
        	} else {
        		$('#modalUsrWhdwlDt').html('');
        	}
        	*/
        	$('#srList').html('');
        	for (let i=0; i<data.srInfo.length; ++i) {
        		let html = '<div style="white-space: pre-wrap;">' + data.srInfo[i].srNo + '\t' + data.srInfo[i].srTtl + '</div>'
        		$('#srList').append(html);
        	}
        }
    });
}

function editUsrAuthrt() {
	let usrNo = $('#modalUsrNo').html();
	let newUsrAuthrtNo = $('#modalUsrAuthrt').val();
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/editUsrAuthrt',
        type: 'POST',	
        data: {
        	usrNo: usrNo,
        	newUsrAuthrtNo: newUsrAuthrtNo
        },
        success: function (data) {
        	if (data > 0) {
        		$('#alertModalContent').html("권한이 변경되었습니다.");
        		$("#alertModal").modal("show");
        		mainTableConfig(currentUsrManagementSearch, currentPageNo);
        		usrDetailModalConfig(usrNo);
        	} else {
        		$('#wraningModalContent').html("진행중인 SR건이 있을 경우\n 권한을 변경할 수 없습니다");
        		$("#wraningModal").modal("show");
        	}
        }
    });
}

function editUsrDeptModal() {
	let usrNo = $('#modalUsrNo').html();
	let newUsrDeptNo = $('#modalUsrDept').val();
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/editUsrDept',
        type: 'POST',	
        data: {
        	usrNo: usrNo,
        	newUsrDeptNo: newUsrDeptNo
        },
        success: function (data) {
        	if (data > 0) {
        		$('#alertModalContent').html("부서가 변경되었습니다.");
        		$("#alertModal").modal("show");
        		mainTableConfig(currentUsrManagementSearch, currentPageNo);
        		usrDetailModalConfig(usrNo);
        	} else {
        		$('#wraningModalContent').html("진행중인 SR건이 있을 경우\n 부서를 변경할 수 없습니다");
        		$("#wraningModal").modal("show");
        	}
        }
    });
}

function editUsrIbpsModal() {
	let usrNo = $('#modalUsrNo').html();
	let newUsrIbpsNo = $('#modalUsrIbps').val();
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/editUsrIbps',
        type: 'POST',	
        data: {
        	usrNo: usrNo,
        	newUsrIbpsNo: newUsrIbpsNo
        },
        success: function (data) {
        	if (data > 0) {
        		$('#alertModalContent').html("직위가 변경되었습니다.");
        		$("#alertModal").modal("show");
        		mainTableConfig(currentUsrManagementSearch, currentPageNo);
        		usrDetailModalConfig(usrNo);
        	} else {
        		$('#wraningModalContent').html("진행중인 SR건이 있을 경우\n 직위를 변경할 수 없습니다");
        		$("#wraningModal").modal("show");
        	}
        }
    });
}

function editUsrRoleModal() {
	let usrNo = $('#modalUsrNo').html();
	let newUsrRoleNo = $('#modalUsrRole').val();
	$.ajax({
        url: '/otisrm/systemManagement/usrManagement/editUsrRole',
        type: 'POST',	
        data: {
        	usrNo: usrNo,
        	newUsrRoleNo: newUsrRoleNo
        },
        success: function (data) {
        	if (data > 0) {
        		$('#alertModalContent').html("역할이 변경되었습니다.");
        		$("#alertModal").modal("show");
        		mainTableConfig(currentUsrManagementSearch, currentPageNo);
        		usrDetailModalConfig(usrNo);
        	} else {
        		$('#wraningModalContent').html("진행중인 SR건이 있을 경우\n 역할을 변경할 수 없습니다");
        		$("#wraningModal").modal("show");
        	}
        }
    });
}

function downloadExcel() {
	let requestData = {
		usrManagementSearch: JSON.stringify(currentUsrManagementSearch),
		pageNo: currentPageNo
	};
	
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/usrManagement/getUsrManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			// 엑셀에 다운될 데이터
			let excelOutputData = [
				["사용자번호", "이름", "전화번호", "이메일", "소속", "부서", "직책", "권한", "가입일", "상태"],
			];
			for (let i=0; i<data.usrList.length; ++i) {
				let usr = data.usrList[i];
				excelOutputData.push([
					usr.usrNo,
					usr.usrNm,
					usr.usrTelno,
					usr.usrEml,
					usr.instNm,
					usr.deptNm,
					usr.roleNm,
					usr.usrAuthrtNm,
					formatDate(new Date(usr.usrJoinDt)),
					usr.usrSttsNm
		        ]);
			}
			// 워크북 생성
			var wb = XLSX.utils.book_new();
			var ws = XLSX.utils.aoa_to_sheet(excelOutputData);
					
			// 워크북에 워크시트 추가
			XLSX.utils.book_append_sheet(wb, ws, "사용자목록");
					
			// 엑셀 파일 생성 및 다운로드
			var today = new Date();
			var filename = "사용자목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
			XLSX.writeFile(wb, filename);
		}
	});
}