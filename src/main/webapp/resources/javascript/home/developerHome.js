$(init);

function init() {

}

function selectMainTableFilter(e) {
	$('.mainTableSelectElement').removeClass('filterTabSelected');
	$(e).addClass('filterTabSelected');
}

function selectSrProgressTableFilter(e) {
	$('.srProgressTableSelectElement').removeClass('filterTabSelected');
	// 클릭한 요소에 filterTabSelected 클래스를 추가
	$(e).addClass('filterTabSelected');
}

/*
 * $(document).ready(function() {
 * 
 * var button = document.querySelector('.fc-dayGridMonth-button');
 * console.log("button: ", button); button.click(); button.style.display =
 * 'none';
 * 
 * $('.fc-daygrid-day-number').css('font-size', '1.4rem');
 * $('.fc-daygrid-day-number').css('padding', '0');
 * $('.fc-header-toolbar').css('margin', '0');
 * $('.fc-header-toolbar').css('margin-bottom', '0.5rem');
 * $('.fc-button').css('padding', '0rem');
 * $('.fc-toolbar-title').css('font-size', '2rem');
 * 
 * var parentElement = document.querySelector('.fc-view-harness'); // 부모 요소가
 * 존재하면 if (parentElement) { // 부모 요소의 하위 요소를 모두 가져와서 반복 var childElements =
 * parentElement.querySelectorAll('*'); for (var i = 0; i <
 * childElements.length; i++) { // 각 하위 요소에 overflow: hidden 스타일 적용
 * childElements[i].style.overflow = 'hidden'; } }
 * 
 * $('.fc-button').click(onCalendarChange);
 * 
 * 
 * });
 * 
 * function onCalendarChange() { $('.fc-daygrid-day-number').css('font-size',
 * '1.4rem'); $('.fc-daygrid-day-number').css('padding', '0');
 * $('.fc-header-toolbar').css('margin', '0');
 * $('.fc-header-toolbar').css('margin-bottom', '0.5rem');
 * $('.fc-button').css('padding', '0rem');
 * $('.fc-toolbar-title').css('font-size', '2rem');
 * 
 * var parentElement = document.querySelector('.fc-view-harness'); // 부모 요소가
 * 존재하면 if (parentElement) { // 부모 요소의 하위 요소를 모두 가져와서 반복 var childElements =
 * parentElement.querySelectorAll('*'); for (var i = 0; i <
 * childElements.length; i++) { // 각 하위 요소에 overflow: hidden 스타일 적용
 * childElements[i].style.overflow = 'hidden'; } } }
 */