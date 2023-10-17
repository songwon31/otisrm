<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/views/common/header.jsp" %>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/header/alarm.css"/>
	<div class="card-header bg-body-tertiary">
	    <div class="row flex-between-center">
	      <div class="col-sm-auto">
	        <h5 class="mb-1 mb-md-0">Your Notifications</h5>
	      </div>
	      <div class="col-sm-auto fs--1"><a class="font-sans-serif" href="#!">Mark all as read</a><a class="font-sans-serif ms-2 ms-sm-3" href="#notification-settings-modal" data-bs-toggle="modal">Notification settings</a></div>
	    </div>
    </div>
	<div class="card-body">
		<a class="border-bottom-0 notification rounded-0 border-x-0 border-300" href="#!">
          <div class="notification-body">
            <p class="mb-1">Announcing the winners of the <strong>The only book awards</strong> decided by you, the readers. Check out the champions and runners-up in all 21 categories now!</p>
            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">📢</span>Just Now</span>
           </div>
        </a>
        <a class="border-bottom-0 notification-unread notification rounded-0 border-x-0 border-300" href="#!">
           <div class="notification-body">
             <p class="mb-1">Last chance to vote in <strong>The 2018 Falcon Choice Awards</strong>! See what made it to the Final Round and help your favorites take home the win. Voting closes on November 26</p>
             <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">📢</span>Just Now</span>
           </div>
         </a>
	</div>

<%@ include file="/WEB-INF/views/common/footer.jsp" %>
