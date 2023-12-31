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
	joinDateEnd: null,
	whdwlUsrCheck: null
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
				mainTableHtml += '<td>' + (i+1) + '</td>';
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
				
				mainTableHtml += '<td><button type="button" id="showSrRqstDetailBtn" data-toggle="modal" class="btn-blue" style="width:70%; height:2.8rem;"';
				mainTableHtml += 'data-target="#usrDetailModal" onclick="usrDetailModalConfig(\''+ usr.usrNo +'\')">상세정보</button></td>';
				
				//jsp에 삽입
				$('#mainTable tbody').append(mainTableHtml);
			}
			
			$("#batchCheck").prop("checked", false);
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
	currentUsrManagementSearch.usrAuthrt = null;
	currentUsrManagementSearch.usrStts = null;
	currentUsrManagementSearch.keywordCategory = null;
	currentUsrManagementSearch.keywordContent = null;
	currentUsrManagementSearch.usrInst = null;
	currentUsrManagementSearch.usrDept = null;
	currentUsrManagementSearch.joinDateStart = null;
	currentUsrManagementSearch.joinDateEnd = null;
	currentUsrManagementSearch.whdwlUsrCheck = null;
	
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
	if ($('#whdwlUsrCheck').prop('checked')) {
		currentUsrManagementSearch.whdwlUsrCheck = "checked";
	} else {
		currentUsrManagementSearch.whdwlUsrCheck = null;
	}
	
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