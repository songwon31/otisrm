$(init)

function init() {
	loadStatisticsList();
}

function formatDateToYYYYMMDD(timestamp) {
	if (timestamp == null) {
		return "";
	} else {
		//타임스탬프를 Date 객체로 변환
		var date = new Date(timestamp);
		//연도의 끝 두 자리를 추출
		var year = date.getFullYear().toString().slice(-4);
		//월과 일을 가져와서 2자리로 포맷
		var month = (date.getMonth() + 1).toString().padStart(2, '0');
		var day = date.getDate().toString().padStart(2, '0');
		//"YY-MM-dd" 형식으로 날짜를 조합
		var formattedDate = year + '-' + month + '-' + day;
		
		return formattedDate;
	}
}

function loadStatisticsList() {
	//조회기간
	var searchStartDate = $("#startDate").val();
	var searchEndDate = $("#endDate").val();
	//통계기준
	var statisticsStandard = $("#selectStandard option:selected").text();

	$.ajax({
		type: "POST",
		url: "/otisrm/srManagement/getStatisticsList",
	    data: {
	    	startDate: searchStartDate,
	    	endDate: searchEndDate,
	    	statisticsStandard: statisticsStandard
	    },
	    success: function(data) {
	    	var html = "";
	    	statisticsStandard = statisticsStandard.replace("별", "");
			$("#selectStandardTitle").text(statisticsStandard);
	    	
			//열별 합계 초기화
			var rqstCountSum = 0;
			var aprvWaitCountSum = 0;
			var aprvReexamCountSum = 0;
			var aprvReturnCountSum = 0;
			var aprvCountSum = 0;
			var rcptWaitCountSum = 0;
			var rcptReexamCountSum = 0;
			var rcptReturnCountSum = 0;
			var rcptCountSum = 0;
			var depIngCountSum = 0;
			var testCountSum = 0;
			var cmptnRqstCountSum = 0;
			var depCmptnCountSum = 0;
			var totalRowSum = 0;
			
			data.forEach((item, index)=>{
				html += '<tr style="height: 4.7rem; font-size: 1.5rem;">';
				var rowSum = [
					  item.rqstCount,
					  item.aprvWaitCount,
					  item.aprvReexamCount,
					  item.aprvReturnCount,
					  item.aprvCount,
					  item.rcptWaitCount,
					  item.rcptReexamCount,
					  item.rcptReturnCount,
					  item.rcptCount,
					  item.depIngCount,
					  item.testCount,
					  item.cmptnRqstCount,
					  item.depCmptnCount
					].reduce((acc, currentValue) => acc + (currentValue || 0), 0);
				
				if(item.sysNm != null) {
					html += '<td>' + item.sysNm + '</td>';
				} else if(item.deptNm != null) {
					html += '<td>' + item.deptNm + '</td>';
				}
				
				//열별 합계 구하기
				rqstCountSum += item.rqstCount;
			    aprvWaitCountSum += item.aprvWaitCount;
			    aprvReexamCountSum += item.aprvReexamCount;
			    aprvReturnCountSum += item.aprvReturnCount;
			    aprvCountSum += item.aprvCount;
			    rcptWaitCountSum += item.rcptWaitCount;
			    rcptReexamCountSum += item.rcptReexamCount;
			    rcptReturnCountSum += item.rcptReturnCount;
			    rcptCountSum += item.rcptCount;
			    depIngCountSum += item.depIngCount;
			    testCountSum += item.testCount;
			    cmptnRqstCountSum += item.cmptnRqstCount;
			    depCmptnCountSum += item.depCmptnCount;
			    totalRowSum += rowSum;
				
				html += '<td>' + item.rqstCount + '</td>';
				html += '<td>' + item.aprvWaitCount + '</td>';
				html += '<td>' + item.aprvReexamCount + '</td>';
				html += '<td>' + item.aprvReturnCount + '</td>';
				html += '<td>' + item.aprvCount + '</td>';
				html += '<td>' + item.rcptWaitCount + '</td>';
				html += '<td>' + item.rcptReexamCount + '</td>';
				html += '<td>' + item.rcptReturnCount + '</td>';
				html += '<td>' + item.rcptCount + '</td>';
				html += '<td>' + item.depIngCount + '</td>';
				html += '<td>' + item.testCount + '</td>';
				html += '<td>' + item.cmptnRqstCount + '</td>';
				html += '<td>' + item.depCmptnCount + '</td>';
				html += '<td>' + rowSum + '</td>';
				html += '</tr>';
			});
			html += '<tr style="height: 4.7rem; font-size: 1.5rem; background-color: #dee2e6;">';
			html += '<td style="font-weight: 700;">합계</td>';
			html += '<td>' + rqstCountSum + '</td>';
			html += '<td>' + aprvWaitCountSum + '</td>';
			html += '<td>' + aprvReexamCountSum + '</td>';
			html += '<td>' + aprvReturnCountSum + '</td>';
			html += '<td>' + aprvCountSum + '</td>';
			html += '<td>' + rcptWaitCountSum + '</td>';
			html += '<td>' + rcptReexamCountSum + '</td>';
			html += '<td>' + rcptReturnCountSum + '</td>';
			html += '<td>' + rcptCountSum + '</td>';
			html += '<td>' + depIngCountSum + '</td>';
			html += '<td>' + testCountSum + '</td>';
			html += '<td>' + cmptnRqstCountSum + '</td>';
			html += '<td>' + depCmptnCountSum + '</td>';
			html += '<td>' + totalRowSum + '</td>';
			html += '</tr>';
			$("#statisticsList").html(html);
	    }
	});
}

//Byte를 KB로 변환
function bytesToKB(bytes) {
    return (bytes / 1024).toFixed(2); // 소수점 두 자리까지 표시
}

function downloadExcelOnStatisticsManagement() {
	//테이블을 배열로 저장
	var tableData = [];

	//테이블 헤더 데이터 저장
	var headerData = [];
	$("#statisticsManagementMainTable thead tr th").each(function () {
	    headerData.push($(this).text());
	});
	tableData.push(headerData);

	// 테이블 본문 데이터 저장
	$("#statisticsManagementMainTable tbody tr").each(function () {
	    var rowData = [];

	    //각 행 데이터를 배열에 추가
	    $(this).find('td').each(function () {
	        rowData.push($(this).text());
	    });

	    tableData.push(rowData);
	});
	
	console.log(tableData);

	//워크북 생성
    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.aoa_to_sheet(tableData);
    
    //워크북에 워크시트 추가
    var statisticsStandard = $("#selectStandard option:selected").text();
    XLSX.utils.book_append_sheet(wb, ws, statisticsStandard +" 통계목록");

    //엑셀 파일 생성 및 다운로드
    var today = new Date();
    var filename = "SR통계목록_" + today.getFullYear() + (today.getMonth() + 1) + today.getDate() + ".xlsx";
    XLSX.writeFile(wb, filename);
}
