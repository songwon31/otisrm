<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<head>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/home/developerHomeStyle.css" />
	<!-- javascript 코드 -->
    <script src="${pageContext.request.contextPath}/resources/javascript/home/developerHome.js"></script>
      
	<!-- 아이콘 -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

	<!-- fullcalendar css -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.css">
	
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/main.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.18.1/moment.min.js"></script>
	<!-- fullcalendar 언어 설정관련 script -->
	<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/locales-all.js"></script>
</head>


<div id="developerHomeDiv" class="shadow">
	<div id="userManagementTitleDiv">
		<div class="font-weight-bold d-flex" style="font-size:2.5rem; height:4rem; vertical-align: center;">
			<i class="material-icons" style="font-size:3.5rem; height:4rem; line-height: 4rem;">person</i>
			<span style="margin-left: 1.3rem;">My Portal</span>
		</div>
	</div>
	<div id="userManagementMiddleDiv">
		<div id="tableDiv">
			<div>
				<div class="font-weight-bold d-flex" style="font-size:2rem; height:3rem; vertical-align: center; margin-bottom:0.5rem;">
					<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem;">chevron_right</i>
					<span>나의 할 일</span>
				</div>
			</div>
			<div id="statusChoiceBtnDiv">
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab filterTabSelected" style="width:6%;">
					<span>전체</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:8%;">
					<span>요청(</span>
					<span>${requestNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:8%;">
					<span>분석(</span>
					<span>${analysisNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:8%;">
					<span>설계(</span>
					<span>${designNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:8%;">
					<span>구현(</span>
					<span>${implementNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:8%;">
					<span>시험(</span>
					<span>${testNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:10%;">
					<span>운영반영(</span>
					<span>${applyNum}</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:15%;">
					<span>SR일정변경요청(</span>
					<span>0</span>
					<span>)</span>
				</a>
				<a href="javascript:void(0)" onclick="selectMainTableFilter(this)" 
					class="mainTableSelectElement filterTab" style="width:18%;">
					<span>SR테스트 승인/반려(</span>
					<span>0</span>
					<span>)</span>
				</a>
				<div style="flex-grow:1; border-bottom:1.5px solid #edf2f8;"></div>
			</div>
			<table id="mainTable" style="width:100%; text-align:center;">
				<colgroup>
					<col width="15%"/>
					<col width="15%"/>
					<col width="15%"/>
					<col width="25%"/>
					<col width="10%"/>
					<col width="10%"/>
					<col width="10%"/>
				</colgroup>
				<thead>
					<tr style="height:4.5rem; font-size:1.5rem; font-weight:700;">
						<th scope="col">SR번호</th>
						<th scope="col">시스템구분</th>
						<th scope="col">업무구분</th>
						<th scope="col">SR제목</th>
						<th scope="col">담당자</th>
						<th scope="col">진행상태</th>
						<th scope="col">상세보기</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="sr" items="${srList}" varStatus="status">
						<tr style="height:4.5rem; font-size:1.5rem;">
							<td>${sr.srNo}</td>
							<td>${sr.sysNm}</td>
							<td>${sr.srDmndNm}</td>
							<td>${sr.srTtl}</td>
							<td>${sr.usrNm}</td>
							<td>${sr.srPrgrsSttsNm}</td>
							<td><button class="btn-2">상세보기</button></td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
			<div style="height:4.5rem; font-size:1.6rem; display:flex; flex-direction:row; justify-content:center; align-items:center;">
				<a href="javascript:void(0)">
					<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem; display:flex; align-content:center;">first_page</i>
				</a>
				<c:if test="${pager.groupNo>1}">
					<a href="javascript:void(0)">
						<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem; display:flex; align-content:center;">chevron_left</i>
					</a>
				</c:if>
				
				<c:forEach var="i" begin="${pager.startPageNo}" end="${pager.endPageNo}">
					<div style="width:0.25rem;"></div>
					<c:if test="${pager.pageNo != i}">
						<a href="javascript:void(0)" onclick="movePage(${i})" style="font-size:1.6rem; height:3rem; line-height: 3rem;">${i}</a>
					</c:if>
					<c:if test="${pager.pageNo == i}">
						<a href="javascript:void(0)" style="font-size:1.6rem; height:3rem; line-height: 3rem;">${i}</a>
					</c:if>
					<div style="width:0.25rem;"></div>
				</c:forEach>
				
				<c:if test="${pager.groupNo<pager.totalGroupNo}">
					<a href="javascript:void(0)">
						<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem; display:flex; align-content:center;">chevron_right</i>
					</a>
				</c:if>
				
				<a href="javascript:void(0)">
					<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem; display:flex; align-content:center;">last_page</i>
				</a>
			</div>
		</div>
		<div id="calendarDiv">
			<!-- 
			<div id="calendar"></div>
			<script>
				document.addEventListener('DOMContentLoaded', function() {
					var calendarEl = document.getElementById('calendar');
					var calendar = new FullCalendar.Calendar(calendarEl, {
						height: '40rem', // calendar 높이 설정
						aspectRatio: 1,
						//fixedWeekCount: false,
				        //expandRows: true, // 화면에 맞게 높이 재설정
				        slotMinTime: '08:00', // Day 캘린더에서 시작 시간
				        slotMaxTime: '20:00', // Day 캘린더에서 종료 시간
				        // 해더에 표시할 툴바
				        headerToolbar: {
				          left: 'title',	
				          center: 'dayGridMonth',
				          right: 'prev,next'
				        },
				        initialView: 'dayGridMonth', // 초기 로드 될때 보이는 캘린더 화면(기본 설정: 달)
				        //initialDate: '2021-07-15', // 초기 날짜 설정 (설정하지 않으면 오늘 날짜가 보인다.)
				        //navLinks: true, // 날짜를 선택하면 Day 캘린더나 Week 캘린더로 링크
				        //editable: true, // 수정 가능?
				        //selectable: true, // 달력 일자 드래그 설정가능
				        //nowIndicator: true, // 현재 시간 마크
				        //dayMaxEvents: true, // 이벤트가 오버되면 높이 제한 (+ 몇 개식으로 표현)
				        locale: 'ko', // 한국어 설정
				        eventAdd: function(obj) { // 이벤트가 추가되면 발생하는 이벤트
				          console.log(obj);
				        },
				        eventChange: function(obj) { // 이벤트가 수정되면 발생하는 이벤트
				          console.log(obj);
				        },
				        eventRemove: function(obj){ // 이벤트가 삭제되면 발생하는 이벤트
				          console.log(obj);
				        },
				        /* select: function(arg) { // 캘린더에서 드래그로 이벤트를 생성할 수 있다.
				          var title = prompt('Event Title:');
				          if (title) {
				            calendar.addEvent({
				              title: title,
				              start: arg.start,
				              end: arg.end,
				              allDay: arg.allDay
				            })
				          }
				          calendar.unselect()
				        }, */
				        // 이벤트 
				        events: [
				          {
				            title: 'All Day Event',
				            start: '2021-07-01',
				          },
				          {
				            title: 'Long Event',
				            start: '2021-07-07',
				            end: '2021-07-10'
				          },
				          {
				            groupId: 999,
				            title: 'Repeating Event',
				            start: '2021-07-09T16:00:00'
				          },
				          {
				            groupId: 999,
				            title: 'Repeating Event',
				            start: '2021-07-16T16:00:00'
				          },
				          {
				            title: 'Conference',
				            start: '2021-07-11',
				            end: '2021-07-13'
				          },
				          {
				            title: 'Meeting',
				            start: '2021-07-12T10:30:00',
				            end: '2021-07-12T12:30:00'
				          },
				          {
				            title: 'Lunch',
				            start: '2021-07-12T12:00:00'
				          },
				          {
				            title: 'Meeting',
				            start: '2021-07-12T14:30:00'
				          },
				          {
				            title: 'Happy Hour',
				            start: '2021-07-12T17:30:00'
				          },
				          {
				            title: 'Dinner',
				            start: '2021-07-12T20:00:00'
				          },
				          {
				            title: 'Birthday Party',
				            start: '2021-07-13T07:00:00'
				          },
				          {
					      	title: 'project',
					      	start: '2023-10-25T07:00:00',
					      	end: '2023-10-27T16:00:00'
					      },
				          {
				            title: 'Click for Google',
				            url: 'http://google.com/', // 클릭시 해당 url로 이동
				            start: '2021-07-28'
				          }
				        ]
				      });
					calendar.render();
				});
				
			</script>
			 -->
		</div>
	</div>
	<div id="userManagementBottomDiv">
		<div id="srProgressDiv">
			<div>
				<div class="font-weight-bold d-flex" style="font-size:2rem; height:3rem; vertical-align: center; margin-bottom:0.5rem;">
					<i class="material-icons" style="font-size:2rem; height:3rem; line-height: 3rem;">chevron_right</i>
					<span>SR요청 처리 정보</span>
				</div>
			</div>
			<div id="srProgressChoiceDiv">
				<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
					class="srProgressTableSelectElement srProgressRquest filterTab filterTabSelected" style="width:10%">
					<span>SR요청정보</span>
				</a>
				<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
					class="srProgressTableSelectElement srProgressPlan filterTab" style="width:10%">
					<span>SR계획정보</span>
				</a>
				<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
					class="srProgressTableSelectElement srProgressHr filterTab" style="width:10%">
					<span>SR자원정보</span>
				</a>
				<a href="javascript:void(0)" onclick="selectSrProgressTableFilter(this)" 
					class="srProgressTableSelectElement srProgressPercentage filterTab" style="width:10%">
					<span>SR진척률</span>
				</a>
				<div style="flex-grow:1; border-bottom:1.5px solid #edf2f8;"></div>
			</div>
			<!-- SR요청정보 div -->
			<div id="srRqstInfo" class="bottomSubDiv">
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR번호</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS_SR_2023_0167</div>
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">시스템구분</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR제목</div>
					<div style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;">[국취] 맞춤분석 내 분석항목(전역예정장병, 재학생(졸업예정자)) 구분 항목 추가</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청일</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">2023-10-11</div>
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">완료요청일</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">2024-02-29</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR요청번호</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">SR231011_0010</div>
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">유지보수 이관일</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">EIS</div>
				</div>
				<div style="height:11rem; display:flex; flex-direction:row;">
					<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">SR내용</div>
					<div style="height:11rem; width:85%; padding-left:0.5rem; display:flex; flex-direction: column;">
						<div style="height:3rem;">
							<form>
								<div style="display:flex; flex-direction: row; align-items:center;">
									<input type="radio" name="srContentType" value="requestContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">요청내용
									<div style="width:1rem;"></div>
									<input type="radio" name="srContentType" value="developContent" style="width:1.6rem; height:1.6rem; margin-right:0.2rem;">개발내용
								</div>
							</form>
						</div>
						<div style="height:8rem; display:flex; flex-direction: row; align-items:center; ">
							<div style="height:7rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto;">
								향후 로직 전달드리겠습니다.<br>* 첨부파일 내 6번 해당 <br><br>
							</div>
						</div>
					</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe; border-radius:0px 0px 0px 10px/0px 0px 0px 10px">첨부파일</div>
					<div style="height:4rem; width:85%; padding-left:0.5rem; display:flex; align-items:center;">(요청내용)230712_EIS변경요청.hwp</div>
				</div>
			</div>
			<!-- SR계획정보 div -->
			<div id="srPlanInfo" class="bottomSubDiv" style="display:none;">
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청구분</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						<label style="display:none;" for="usrAuthrt"></label> 
						<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
							<option value="" selected>선택</option>
							<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
								<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
							</c:forEach>
						</select>
					</div>
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">업무구분</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						<label style="display:none;" for="usrAuthrt"></label> 
						<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
							<option value="" selected>선택</option>
							<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
								<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청사</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						<label style="display:none;" for="usrAuthrt"></label> 
						<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
							<option value="" selected>선택</option>
							<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
								<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
							</c:forEach>
						</select>
					</div>
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">요청팀</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						<label style="display:none;" for="usrAuthrt"></label> 
						<select id="usrAuthrt" name="usrAuthrt" style="width:90%">
							<option value="" selected>선택</option>
							<c:forEach var="usrAuthrt" items="${usrManagementPageConfigure.usrAuthrtList}" varStatus="status">
								<option value="${usrAuthrt.usrAuthrtNo}">${usrAuthrt.usrAuthrtNm}</option>
							</c:forEach>
						</select>
					</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">담당자</div>
					<div style="height:4rem; width:35%; padding-left:0.5rem; display:flex; align-items:center;">
						<input type="text" style="width:55%;">
						<div style="width:5%;"></div>
						<a style="width:30%; border:1px solid gray;" href="#">탐색</a>
					</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row;">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">목표시작일</div>
					<input style="width:35%;" type="date">
					<div style="height:4rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">목표완료일</div>
					<input style="width:35%;" type="date">
				</div>
				<div style="height:11rem; display:flex; flex-direction:row;">
					<div style="height:11rem; width:15%; padding-left:0.5rem; display:flex; align-items:center; background-color:#f9fafe;">참고사항</div>
					<div style="height:11rem; width:85%; padding-left:0.5rem; display:flex; flex-direction: column;">
						<div style="height:11rem; display:flex; flex-direction: row; align-items:center; ">
							<div style="height:10rem; width: 100%; border:1px solid gray; padding:0.3rem; overflow-y:auto;">
								향후 로직 전달드리겠습니다.<br>* 첨부파일 내 6번 해당 <br><br>
							</div>
						</div>
					</div>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row; align-items:center; justify-content:right;">
					<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center;" href="#">저장</a>
				</div>
			</div>
			<!-- SR자원정보 -->
			<div id="srHrInfo" class="bottomSubDiv" style="display:none;">
				<div style="height:27rem; background-color:#f1f3f5;">
					<table style="width:100%; text-align:center;">
						<colgroup>
							<col width="5%"/>
							<col width="15%"/>
							<col width="15%"/>
							<col width="65%"/>
						</colgroup>
						<thead style="background-color:#e9ecef;">
							<tr style="height:4rem; font-size:1.6rem; font-weight:700;">
								<th scope="col">ㅁ</th>
								<th scope="col">담당자명</th>
								<th scope="col">역할</th>
								<th scope="col">담당 작업</th>
							</tr>
						</thead>
						<tbody>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<th scope="row">ㅁ</th>
								<td>송원석</td>
								<td>개발자</td>
								<td>분석 설계 구현 시험</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div style="height:4rem; display:flex; flex-direction:row; align-items:center;">
					<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center;" href="#">추가</a>
					<a style="height:3rem; width: 8rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center; margin-left:0.5rem;" href="#">선택삭제</a>
					<a style="height:3rem; width: 5rem; border:1px solid gray; border-radius:5px; display:flex; flex-direction:row; justify-content:center; align-items:center; margin-left:0.5rem;" href="#">저장</a>
				</div>
			</div>
			<!-- SR진척률 -->
			<div id="srProgressInfo" class="bottomSubDiv" style="display:none;">
				<div style="height:31rem; background-color:#f1f3f5; border-radius:10px;">
					<table style="width:100%; text-align:center;">
						<colgroup>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
							<col width="20%"/>
						</colgroup>
						<thead style="background-color:#e9ecef;">
							<tr style="height:4rem; font-size:1.6rem; font-weight:700;">
								<th scope="col">작업구분</th>
								<th scope="col">시작일</th>
								<th scope="col">종료일</th>
								<th scope="col">진척률%(누적)</th>
								<th scope="col">산출물</th>
							</tr>
						</thead>
						<tbody>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<td>분석</td>
								<td>2023-08-08</td>
								<td>2023-08-09</td>
								<td>10</td>
								<td>버튼</td>
							</tr>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<td>설계</td>
								<td>2023-08-10</td>
								<td>2023-08-11</td>
								<td>20</td>
								<td>버튼</td>
							</tr>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<td>구현</td>
								<td>2023-08-14</td>
								<td>2023-09-20</td>
								<td>70</td>
								<td>버튼</td>
							</tr>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<td>시험</td>
								<td>2023-09-21</td>
								<td></td>
								<td>87</td>
								<td>버튼</td>
							</tr>
							<tr style="height:4rem; font-size:1.6rem; background-color:white;">
								<td>반영요청</td>
								<td></td>
								<td></td>
								<td></td>
								<td>버튼</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div id="teamInfoDiv">
		
		</div>
	</div>
</div>

<%@ include file="/WEB-INF/views/common/footer.jsp"%>