$(init);

function init() {
	setRootFontSize();
	
	let htmlFontSize = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
	console.log('HTML 태그의 현재 font-size:', htmlFontSize);
}

function setRootFontSize() {
	let width = window.innerWidth || document.body.clientWidth;
	let height = window.innerHeight || document.body.clientHeight;
	
	let rootFontSize = height * 0.01;
	$('html').css('font-size', rootFontSize + 'px');
	
	$('body').css('min-width', width+'px');
	$('body').css('min-height', height+'px');
	$('body').css('overflow', 'auto');
}

