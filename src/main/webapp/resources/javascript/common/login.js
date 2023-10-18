$(init)

function init() {
  
}

function openSmallWindow(event) {
    event.preventDefault();

    // 새 창의 크기 및 속성 설정
    var width = 1100;
    var height = 1300;
    var left = (window.innerWidth - width) / 2; // 화면 가로 중앙
    var top = (window.innerHeight - height) / 2; // 화면 세로 중앙
    var features = `width=${width},height=${height},left=${left},top=${top}`;

    // 새 창 열기
    window.open(event.target.href, '_blank', features);
}
