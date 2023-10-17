<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/header/alerts.css"/>	
	<div class="card overflow-hidden">
		<div class="card-header bg-body-tertiary">
	      <div class="row flex-between-center">
	        <div class="col-sm-auto">
	          <h5 class="mb-1 mb-md-0">Your Notifications</h5>
	        </div>
	        <div class="col-sm-auto fs--1"><a class="font-sans-serif ms-2 ms-sm-3" href="#notification-settings-modal" data-bs-toggle="modal">Notification settings</a></div>
	      </div>
	    </div>
		<div class="card-body">
			<a class="border-bottom-0 notification rounded-0 border-x-0 border-300" href="#!">
	          <div class="notification-body">
	            <p class="mb-1"><strong>[SR231017_0006]</strong>컨소시엄 훈련 통계 현황 수정 SR요청이 <strong>접수</strong>되었습니다.</p>
	            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">📢</span>23-10-17(오전10:38)</span>
	           </div>
	        </a>
	        <a class="border-bottom-0 notification-unread notification rounded-0 border-x-0 border-300" href="#!">
	           <div class="notification-body">
	           	<p class="mb-1"><strong>[SR231017_0006]</strong>컨소시엄 훈련 통계 현황 수정 SR요청이 <strong>접수</strong>되었습니다.</p>
	            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">📢</span>23-10-17(오전10:38)</span>
	           </div>
	         </a>
		</div>
	</div>


<%@ include file="/WEB-INF/views/common/footer.jsp" %>
