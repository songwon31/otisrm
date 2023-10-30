$(init)

function init() {
	
}

function selectMainTableFilter(e) {
	$('.mainTableSelectElement').removeClass('filterTabSelected');
	$(e).addClass('filterTabSelected');
}

function selectSrFromBoardList() {
	$.ajax({
		type: "POST",
		url: "/reviewerHome/srProgress",
		success: function(data) {
			console.log("test");
		}
	});
}
