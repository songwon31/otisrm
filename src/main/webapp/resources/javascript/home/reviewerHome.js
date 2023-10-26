$(init)

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
