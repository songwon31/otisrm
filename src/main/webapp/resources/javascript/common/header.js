$(init);

function init() {
	setRootFontSize();
	
	let htmlFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
	console.log('HTML 태그의 현재 font-size:', htmlFontSize);
	
	//html overflow:auto로 설정
	document.documentElement.style.overflow = 'auto';
}
/*
function setRootFontSize() {
	let width = window.innerWidth || document.body.clientWidth;
	let height = window.innerHeight || document.body.clientHeight;
	
	let rootFontSize = height * 0.01;
	$('html').css('font-size', rootFontSize + 'px');
	
	$('body').css('min-width', width+'px');
	$('body').css('min-height', height+'px');
	$('body').css('overflow', 'auto');
}
*/

function setRootFontSize() {
	let extraWidth = window.screen.availWidth - window.outerWidth;
	let extraHeight = window.screen.availHeight - window.outerHeight;
	/*
	let extraWidth = window.screen.availWidth - $(window).width();
	let extraHeight = window.screen.availHeight - $(window).height();
	*/
	console.log("window.screen.availWidth: " + window.screen.availWidth);
	console.log("window.outerWidth: " + window.outerWidth);
	console.log("extraWidth: " + extraWidth);
	console.log("window.screen.availHeight: " + window.screen.availHeight);
	console.log("window.outerHeight: " + window.outerHeight);
	console.log("extraHeight: " + extraHeight);
	
	/*
	let width = (window.innerWidth || document.body.clientWidth) + extraWidth;
	let height = (window.innerHeight || document.body.clientHeight) + extraHeight;
	*/
	
	let width = window.innerWidth + extraWidth;
	let height = window.innerHeight + extraHeight;
	if (window.screen.availWidth != window.outerWidth) {
		width += (window.outerWidth - window.innerWidth);
		height += (window.outerWidth - window.innerWidth);
	}
	
	console.log("");
	//console.log("originalWidth: " + (window.innerWidth || document.body.clientWidth));
	//console.log("originalHeight: " + (window.innerHeight || document.body.clientHeight));
	console.log("window.innerWidth: " + window.innerWidth);
	console.log("window.innerHeight: " + window.innerHeight);
	console.log("width: " + width);
	console.log("height: " + height);
	
	console.log("");
	console.log(window.screen.availWidth - width);
	console.log(window.screen.availHeight - height);
	console.log("");
	
	let rootFontSize = height * 0.01;
	$('html').css('font-size', rootFontSize + 'px');
	
	$('body').css('min-width', width+'px');
	$('body').css('min-height', height+'px');
	$('body').css('overflow', 'auto');
}
