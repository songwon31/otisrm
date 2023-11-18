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
	currentPageNo = pageNo;
	let requestData = {
		instManagementSearch: JSON.stringify(instManagementSearch),
		pageNo: pageNo
	}
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/instManagement/getInstManagementMainTableConfig",
		data: JSON.stringify(requestData),
		contentType: "application/json",
		success: function(data) {
			//테이블 body 구성
			//테이블 body 초기화
			$('#mainTable tbody').html('');
			//테이블 body 재구성
			for (let i=0; i<data.instList.length; ++i) {
				let inst = data.instList[i];
				let mainTableHtml = '';
				mainTableHtml += '<tr style="height:4.7rem; font-size:1.5rem; background-color:white;">';
				mainTableHtml += '<td><input type="checkbox" class="checkbox" style="vertical-align: middle;"></td>';
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
				
				//해당 행의 데이터를 추출
				let instNo = row.find('td:eq(3)').text();

			    setInstDetail(instNo);
				
			});
			
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

//기업 상세 정보 표시
function setInstDetail(instNo) {
	let requestData = {
        instNo: instNo
    };
	
	$.ajax({
		type: "POST",
		url: "/otisrm/systemManagement/instManagement/getDetailInstInfo",
		data: requestData,
		success: function(data) {
			$('#instDetailNm').html('');
			let instNmHtml = '';
			instNmHtml += '<input type="text" id="instDetailNmInput" class="instDetailNmInput" value="' + data.instNm + '" style="width:70%; height:3rem;">'
			instNmHtml += '<button class="btn-1" style="height:3rem; width:25%; margin-left:0.5rem;" onclick="saveNm()">저장</button>';
			$('#instDetailNm').html(instNmHtml);
			
			$('#instDetailNo').html(data.instNo);
			
			$('#instDetailClsf').html('');
			let instClsfHtml = '';
			instClsfHtml += '<select id="instDetailClsfSelect" name="instDetailClsfSelect" style="width:70%; height:3rem;">';
			instClsfHtml += '<option value="N">본사</option>';
			instClsfHtml += '<option value="Y">협력사</option>';
			instClsfHtml += '<option value="C">고객사</option>';
			instClsfHtml += '</select>';
			instClsfHtml += '<button class="btn-1" style="height:3rem; width:25%; margin-left:0.5rem;" onclick="saveClsf()">저장</button>';
			$('#instDetailClsf').html(instClsfHtml);
			$('#instDetailClsfSelect').val(data.outsrcYn);
			
			//직위 리스트 구성
			$('#instDetailIbpsTable tbody').html('');
			for (let i=0; i<data.ibpsList.length; ++i) {
				let ibps = data.ibpsList[i];
				let html = '';
				html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
				html += '<td>' + (i+1) + '</td>';
				html += '<td><input type="text" class="detailIbpsNm" value="' + ibps.ibpsNm + '" style="width:50%; text-align: center;"></td>';
				html += '<td><input type="text" class="detailIbpsNo" disabled value="' + ibps.ibpsNo + '" style="width:50%; text-align: center;"></td>';
				html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteIbps(this)">삭제</button></td>';
				html += '</tr>';
				/*html += '<td>' + ibps.ibpsNm+ '</td>';
				html += '<td>' + ibps.ibpsNo+ '</td>';*/
				$('#instDetailIbpsTable tbody').append(html);
			}
			if (data.ibpsList.length < 3) {
				$('#instDetailIbpsTableHeaderGap').css('display', 'none');
			} else {
				$('#instDetailIbpsTableHeaderGap').css('display', 'block');
			}
			
			//역할 리스트 구성
			$('#instDetailRoleTable tbody').html('');
			for (let i=0; i<data.roleList.length; ++i) {
				let role = data.roleList[i];
				let html = '';
				html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
				html += '<td>' + (i+1) + '</td>';
				html += '<td><input type="text" class="detailRoleNm" value="' + role.roleNm + '" style="width:50%; text-align: center;"></td>';
				html += '<td><input type="text" class="detailRoleNo" disabled value="' + role.roleNo + '" style="width:50%; text-align: center;"></td>';
				html += '<td><input type="text" class="detailRoleSeq" value="' + role.roleSeq + '" style="width:50%; text-align: center;"></td>';
				html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteRole(this)">삭제</button></td>';
				html += '</tr>';
				$('#instDetailRoleTable tbody').append(html);
			}
			if (data.roleList.length < 3) {
				$('#instDetailRoleTableHeaderGap').css('display', 'none');
			} else {
				$('#instDetailRoleTableHeaderGap').css('display', 'block');
			}
			
			//부서 리스트 구성
			$('#instDetailDeptTable tbody').html('');
			for (let i=0; i<data.deptList.length; ++i) {
				let dept = data.deptList[i];
				let html = '';
				html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
				html += '<td>' + (i+1) + '</td>';
				html += '<td><input type="text" class="detailDeptNm" value="' + dept.deptNm + '" style="width:50%; text-align: center;"></td>';
				html += '<td><input type="text" class="detailDeptNo" disabled value="' + dept.deptNo + '" style="width:50%; text-align: center;"></td>';
				html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteDept(this)">삭제</button></td>';
				html += '</tr>';
				$('#instDetailDeptTable tbody').append(html);
			}
			if (data.deptList.length < 3) {
				$('#instDetailDeptTableHeaderGap').css('display', 'none');
			} else {
				$('#instDetailDeptTableHeaderGap').css('display', 'block');
			}
		}
	});
	
	currentDetailInstNo = instNo;
	sessionStorage.setItem('developerHomeCurrentDetailInstNo', currentDetailInstNo);
}

//기업 등록 모달 초기화
function registInstModalConfig() {
	$('#registInstModalInstNm').val('');
	$('#registInstModalInstNo').val('');
	$('#registInstModalInstClsf').val('Y');
}

//기업 등록
function registInst() {
	let instNm = $('#registInstModalInstNm').val();
	let instNo = $('#registInstModalInstNo').val();
	let outsrcYn = $('#registInstModalInstClsf').val();
	if (instNm == '' || instNo == '' || outsrcYn == '') {
		$('#warningContent').html("모든 정보를 입력해주세요.");
		$("#warningModal").modal("show");
	} else {
		let requestData = {
			instNo: instNo,
			instNm: instNm,
			outsrcYn: outsrcYn
	    };
		
		$.ajax({
	        url: '/otisrm/systemManagement/instManagement/registInst',
	        type: 'POST',	
	        data: requestData,
	        success: function (data) {
	        	if (data == "success") {
	        		$('#registInstModal').modal('hide');
	        		$('#alertContent').html("기업이 등록되었습니다.");
	    			$("#alertModal").modal("show");
	    			setInstDetail(currentDetailInstNo);
		        	mainTableConfig(currentInstManagementSearch, currentPageNo);
	        	} else {
	        		$('#warningContent').html("이미 존재하는 기업 코드입니다.");
	    			$("#warningModal").modal("show");
	        	}
	        }
	    });
	}
}

//기업 삭제
function deleteInst() {
	let instNoList = [];
	// 테이블 내의 체크박스를 확인
	$('#mainTable td').each(function () {
	    if ($(this).find('.checkbox').is(':checked')) {
	        // 체크된 행의 데이터를 객체로 저장
	    	instNoList.push($(this).closest('tr').find('.tableInstNo').html());
	    }
	});
	
	$.ajax({
        url: '/otisrm/systemManagement/instManagement/deleteInst',
        type: 'POST',	
        data: JSON.stringify(instNoList),
        contentType: 'application/json',
        success: function (data) {
        	if (data == "success") {
        		$('#alertContent').html("기업이 삭제되었습니다.");
    			$("#alertModal").modal("show");
        	} else {
        		$('#warningContent').html("기업에 속한 사용자가 존재합니다.");
    			$("#warningModal").modal("show");
        	}
        	setInstDetail(currentDetailInstNo);
        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        	$("#batchCheck").prop("checked", false);
        }
    });
}

//기업명 저장
function saveNm() {
	let instNm = $('#instDetailNmInput').val();
	
	let requestData = {
		instNo: currentDetailInstNo,
		instNm: instNm
    };
	
	$.ajax({
        url: '/otisrm/systemManagement/instManagement/saveNm',
        type: 'POST',	
        data: requestData,
        success: function (data) {
        	if (data == "fail") {
        		$('#warningContent').html("기업명 저장에 실패했습니다.");
    			$("#warningModal").modal("show");
        	} else if (data == "success") {
        		$('#alertContent').html("기업명이 저장되었습니다.");
    			$("#alertModal").modal("show");
    			setInstDetail(currentDetailInstNo);
	        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        	}
        }
    });
}

//기업분류 저장
function saveClsf() {
	let instClsf = $('#instDetailClsfSelect').val();
	
	let requestData = {
		instNo: currentDetailInstNo,
		instClsf: instClsf
    };
	
	$.ajax({
        url: '/otisrm/systemManagement/instManagement/saveClsf',
        type: 'POST',	
        data: requestData,
        success: function (data) {
        	if (data == "fail") {
        		$('#warningContent').html("진행중인 SR건이 존재합니다.");
    			$("#warningModal").modal("show");
    			setInstDetail(currentDetailInstNo);
        	} else if (data == "success") {
        		$('#alertContent').html("기업 분류가 갱신되었습니다.");
    			$("#alertModal").modal("show");
    			setInstDetail(currentDetailInstNo);
	        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        	}
        }
    });
}

//직위 추가
function addIbps() {
	let html = '';
	html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
	html += '<td></td>';
	html += '<td><input type="text" class="detailIbpsNm" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><input type="text" class="detailIbpsNo" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteIbps(this)">삭제</button></td>';
	html += '</tr>';
	
	$('#instDetailIbpsTable tbody').append(html);
	$("#instDetailIbpsTableDiv").animate({ scrollTop: $("#instDetailIbpsTableDiv")[0].scrollHeight }, 200);
}

//직위 삭제
function deleteIbps(button) {
	let closestTr = $(button).closest('td').parent('tr');
	let ibpsNm = closestTr.find('.detailIbpsNm').val();
	let ibpsNoTr = closestTr.find('.detailIbpsNo');
	let ibpsNo = closestTr.find('.detailIbpsNo').val();
	if (!ibpsNoTr.prop('disabled')) {
		closestTr.remove();
	} else {
		let requestData = {
			ibpsNo: currentDetailInstNo + '_' + ibpsNo
	    };
		
		$.ajax({
	        url: '/otisrm/systemManagement/instManagement/deleteIbps',
	        type: 'POST',	
	        data: requestData,
	        success: function (data) {
	        	if (data == "ibpsFailUsrExist") {
	        		$('#warningContent').html("해당 직위의 사용자가 존재합니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "ibpsFailDelete") {
	        		$('#warningContent').html("직위 삭제에 실패했습니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "success") {
	        		$('#alertContent').html("직위가 삭제되었습니다.");
	    			$("#alertModal").modal("show");
	    			setInstDetail(currentDetailInstNo);
		        	mainTableConfig(currentInstManagementSearch, currentPageNo);
	        	}
	        }
	    });
	}
}

//직위 저장
function saveIbps() {
	let instNo = currentDetailInstNo;
	let dataRows = []; // 데이터를 저장할 배열
	let ibpsNoArray = [];
	let warning = ''

    // 테이블 내의 각 행 순회
    $("#instDetailIbpsTable tr").each(function (idx) {
        let rowData = {};
        let ibpsNm = $(this).find('.detailIbpsNm').val();
        let ibpsNo = $(this).find('.detailIbpsNo').val();
        
        //둘 다 값이 있을 경우
        if (ibpsNm != '' && ibpsNo != '') {
        	// ibpsNo가 이미 ibpsNoArray에 존재하는지 확인
            if (ibpsNoArray.includes(ibpsNo)) {
                // 중복된 값이 있을 경우 처리
                warning = '중복된 코드는 처리되지 않습니다.';
            } else {
            	rowData['ibpsNm'] = ibpsNm;
            	rowData['ibpsNo'] = instNo + '_' + ibpsNo;
            	rowData['instNo'] = instNo;
            	
            	// rowData를 dataRows 배열에 추가
                dataRows.push(rowData);
                
                // ibpsNo를 ibpsNoArray에 추가
                ibpsNoArray.push(ibpsNo);
            }
        }
    });

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/systemManagement/instManagement/saveIbps",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	if (warning != '') {
        		$('#warningContent').html(warning);
    			$("#warningModal").modal("show");
        	} else {
        		$('#alertContent').html("성공적으로 저장되었습니다.");
    			$("#alertModal").modal("show");
        	}
        	setInstDetail(currentDetailInstNo);
        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        }
    });
}

//역할 추가
function addRole() {
	let html = '';
	html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
	html += '<td></td>';
	html += '<td><input type="text" class="detailRoleNm" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><input type="text" class="detailRoleNo" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteRole(this)">삭제</button></td>';
	html += '</tr>';
	
	$('#instDetailRoleTable tbody').append(html);
	$("#instDetailRoleTableDiv").animate({ scrollTop: $("#instDetailRoleTableDiv")[0].scrollHeight }, 200);
}

//역할 삭제
function deleteRole(button) {
	let closestTr = $(button).closest('td').parent('tr');
	let roleNm = closestTr.find('.detailRoleNm').val();
	let roleNoTr = closestTr.find('.detailRoleNo');
	let roleNo = closestTr.find('.detailRoleNo').val();
	if (!roleNoTr.prop('disabled')) {
		closestTr.remove();
	} else {
		let requestData = {
			roleNo: currentDetailInstNo + '_' + roleNo
	    };
		
		$.ajax({
	        url: '/otisrm/systemManagement/instManagement/deleteRole',
	        type: 'POST',	
	        data: requestData,
	        success: function (data) {
	        	if (data == "roleFailUsrExist") {
	        		$('#warningContent').html("해당 부서의 사용자가 존재합니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "roleFailDelete") {
	        		$('#warningContent').html("직위 삭제에 실패했습니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "success") {
	        		$('#alertContent').html("직위가 삭제되었습니다.");
	    			$("#alertModal").modal("show");
	    			setInstDetail(currentDetailInstNo);
		        	mainTableConfig(currentInstManagementSearch, currentPageNo);
	        	}
	        }
	    });
	}
}

//역할 저장
function saveRole() {
	let instNo = currentDetailInstNo;
	let dataRows = []; // 데이터를 저장할 배열
	let roleNoArray = [];
	let warning = ''

    // 테이블 내의 각 행 순회
    $("#instDetailRoleTable tr").each(function (idx) {
        let rowData = {};
        let roleNm = $(this).find('.detailRoleNm').val();
        let roleNo = $(this).find('.detailRoleNo').val();
        let roleSeq = $(this).find('.detailRoleSeq').val();
        
        //둘 다 값이 있을 경우
        if (roleNm != '' && roleNo != '' && roleSeq != '') {
        	// roleNo가 이미 ibpsNoArray에 존재하는지 확인
            if (roleNoArray.includes(roleNo)) {
                // 중복된 값이 있을 경우 처리
                warning = '중복된 코드는 처리되지 않습니다.';
            } else {
            	rowData['roleNm'] = roleNm;
            	rowData['roleNo'] = instNo + '_' + roleNo;
            	rowData['instNo'] = instNo;
            	rowData['roleSeq'] = roleSeq;
            	
            	// rowData를 dataRows 배열에 추가
                dataRows.push(rowData);
                
                // ibpsNo를 ibpsNoArray에 추가
                roleNoArray.push(roleNo);
            }
        }
    });

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/systemManagement/instManagement/saveRole",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	if (warning != '') {
        		$('#warningContent').html(warning);
    			$("#warningModal").modal("show");
        	} else {
        		$('#alertContent').html("성공적으로 저장되었습니다.");
    			$("#alertModal").modal("show");
        	}
        	setInstDetail(currentDetailInstNo);
        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        }
    });
}


//부서 추가
function addDept() {
	let html = '';
	html += '<tr style="height:4rem; font-size:1.6rem; background-color:white;">';
	html += '<td></td>';
	html += '<td><input type="text" class="detailDeptNm" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><input type="text" class="detailDeptNo" value="" style="width:50%; text-align: center;"></td>';
	html += '<td><button class="btn-1" style="height:3rem; width:50%; background-color:red;" onclick="deleteDept(this)">삭제</button></td>';
	html += '</tr>';
	
	$('#instDetailDeptTable tbody').append(html);
	$("#instDetailDeptTableDiv").animate({ scrollTop: $("#instDetailDeptTableDiv")[0].scrollHeight }, 200);
}

//부서 삭제
function deleteDept(button) {
	let closestTr = $(button).closest('td').parent('tr');
	let deptNm = closestTr.find('.detailDeptNm').val();
	let deptNoTr = closestTr.find('.detailDeptNo');
	let deptNo = closestTr.find('.detailDeptNo').val();
	if (!deptNoTr.prop('disabled')) {
		closestTr.remove();
	} else {
		let requestData = {
			deptNo: currentDetailInstNo + '_' + deptNo
	    };
		
		$.ajax({
	        url: '/otisrm/systemManagement/instManagement/deleteDept',
	        type: 'POST',	
	        data: requestData,
	        success: function (data) {
	        	if (data == "deptFailUsrExist") {
	        		$('#warningContent').html("해당 부서의 사용자가 존재합니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "deptFailDelete") {
	        		$('#warningContent').html("부서 삭제에 실패했습니다.");
	    			$("#warningModal").modal("show");
	        	} else if (data == "success") {
	        		$('#alertContent').html("부서가 삭제되었습니다.");
	    			$("#alertModal").modal("show");
	    			setInstDetail(currentDetailInstNo);
		        	mainTableConfig(currentInstManagementSearch, currentPageNo);
	        	}
	        }
	    });
	}
}

//부서 저장
function saveDept() {
	let instNo = currentDetailInstNo;
	let dataRows = []; // 데이터를 저장할 배열
	let deptNoArray = [];
	let warning = ''

    // 테이블 내의 각 행 순회
    $("#instDetailDeptTable tr").each(function (idx) {
        let rowData = {};
        let deptNm = $(this).find('.detailDeptNm').val();
        let deptNo = $(this).find('.detailDeptNo').val();
        
        //둘 다 값이 있을 경우
        if (deptNm != '' && deptNo != '') {
        	// deptNo가 이미 deptNoArray에 존재하는지 확인
            if (deptNoArray.includes(deptNo)) {
                // 중복된 값이 있을 경우 처리
                warning = '중복된 코드는 처리되지 않습니다.';
            } else {
            	rowData['deptNm'] = deptNm;
            	rowData['deptNo'] = instNo + '_' + deptNo;
            	rowData['instNo'] = instNo;
            	
            	// rowData를 dataRows 배열에 추가
                dataRows.push(rowData);
                
                // ibpsNo를 ibpsNoArray에 추가
                deptNoArray.push(deptNo);
            }
        }
    });

    let jsonData = JSON.stringify(dataRows);

    // AJAX 요청
    $.ajax({
        url: "/otisrm/systemManagement/instManagement/saveDept",
        method: "POST",
        data: jsonData,
        contentType: "application/json; charset=utf-8",
        success: function (response) {
        	if (warning != '') {
        		$('#warningContent').html(warning);
    			$("#warningModal").modal("show");
        	} else {
        		$('#alertContent').html("성공적으로 저장되었습니다.");
    			$("#alertModal").modal("show");
        	}
        	setInstDetail(currentDetailInstNo);
        	mainTableConfig(currentInstManagementSearch, currentPageNo);
        }
    });
}