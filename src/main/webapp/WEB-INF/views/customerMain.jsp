<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		
		<!-- BootStrap을 사용하기 위한 외부 라이브러리 가져오기 -->
		<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
		<script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>	
		
		<!-- css styleSheet -->
		<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/resources/css/customer/customerMainStyle.css"/>
		
		<!-- javascript -->
		<script src="${pageContext.request.contextPath}/resources/javascript/customer/customerMain.js"></script>
	</head>
	<body>
		<h2>Vertical Tabs</h2>
		<p>Click on the buttons inside the tabbed menu:</p>
	
		<div class="tab">
			<button class="tablinks" onclick="openCity(event, 'London')"
				id="defaultOpen">London</button>
			<button class="tablinks" onclick="openCity(event, 'Paris')">Paris</button>
			<button class="tablinks" onclick="openCity(event, 'Tokyo')">Tokyo</button>
		</div>
	
		<div id="London" class="tabcontent">
			<h3>London</h3>
			<p>London is the capital city of England.</p>
		</div>
	
		<div id="Paris" class="tabcontent">
			<h3>Paris</h3>
			<p>Paris is the capital of France.</p>
		</div>
	
		<div id="Tokyo" class="tabcontent">
			<h3>Tokyo</h3>
			<p>Tokyo is the capital of Japan.</p>
		</div>
	
	</body>
</html>