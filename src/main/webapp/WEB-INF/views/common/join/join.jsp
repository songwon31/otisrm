<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<!-- 렌더링(사용자에게 보여주기 위한 시각화) 요소가 아니고, 브라우저에 제공되는 추가 정보 -->
	<head>
	  <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="icon" href="${pageContext.request.contextPath}/resources/images/logo.png" type="image/x-icon">
      <title>OtiSRM</title>
      
      <!-- Bootstrap을 사용하기 위한 외부 라이브러리 가져오기 -->
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css">
   	  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.css"/>
      <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/toastr.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.4/dist/jquery.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/js/bootstrap.bundle.min.js"></script>
      <script src="${pageContext.request.contextPath}/resources/javascript/common/join.js"></script>
      
      <!-- loading-overlay를 사용하기 위한 라이브러리 -->
      <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@2.1.7/dist/loadingoverlay.min.js"></script>
	  <!-- 아이콘 사용을 위함 -->
	  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
	  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>
	  <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/header/join.css"/>
	</head>
	
	<body>
		<sc-mdi id="mdiMain" use-single-page="true" use-storage-menu="false">
			<div id="headWrap" class="style-scope sc-mdi" hidden="true">
				<sc-ajax id="sessionTimeUpdate" url="https://www.cpsrm.com/ui/lib/mdi/sessionTimeUpdate.do" class="style-scope sc-mdi" hidden="">
				</sc-ajax>
				<div class="toolbar style-scope sc-mdi">
					<div class="mdiLogo supplier style-scope sc-mdi">
					</div>
					<div class="spacer style-scope sc-mdi">
					</div>
					<div class="label style-scope sc-mdi">비로그인사용자</div>
					<sc-mdi-searchbar id="searchBar" class="style-scope sc-mdi">
						<div class="mdi_srch style-scope sc-mdi-searchbar">
							<div class="srch_condtion style-scope sc-mdi-searchbar">
								<a class="tit_srch style-scope sc-mdi-searchbar">검색조건</a>
								<div class="srch_con_list style-scope sc-mdi-searchbar">
									<ul class="style-scope sc-mdi-searchbar"><li class="style-scope sc-mdi-searchbar">
										<a id="menu" class="style-scope sc-mdi-searchbar">메뉴</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="wrap_input style-scope sc-mdi-searchbar">
								<cc-auto-text-field id="menuAutoTextField" class="hide-visible style-scope sc-mdi-searchbar" autofocus="true" trigger-cls="search"><sc-text-field id="autocompleteInput" class="style-scope cc-auto-text-field" aria-disabled="false" field="">
									<div class="field-container style-scope sc-text-field">
										<input id="input" class="style-scope sc-text-field" autofocus="" autocomplete="off">
										<div class="trigger-container style-scope sc-text-field">
											<div class="trigger search style-scope sc-text-field">
											</div>
										</div>
									</div>
									</sc-text-field>
									<cc-auto-suggestions for="autocompleteInput" id="autocompleteSuggestions" class="style-scope cc-auto-text-field">
										<div class="style-scope cc-auto-suggestions">
											<sc-listbox id="suggestionsWrapper" class="style-scope cc-auto-suggestions" tabindex="0" role="listbox" field="" style="max-height: 700px;">
											</sc-listbox>
											<template id="defaultTemplate" class="style-scope cc-auto-suggestions"></template>
											<template autocomplete-custom-template="" class="style-scope sc-mdi-searchbar"></template>
										</div>
									</cc-auto-suggestions>
								</cc-auto-text-field>
							</div>
						</div>
					</sc-mdi-searchbar>
					<div id="sessionTimer" class="timer style-scope sc-mdi" title="Session Time Reset">01:54:32</div>
						<div class="mdi_lan style-scope sc-mdi">
							<a class="style-scope sc-mdi">한국어</a>
							<div class="lan_list style-scope sc-mdi">
							<ul class="style-scope sc-mdi">
								<li class="style-scope sc-mdi">
									<a class="style-scope sc-mdi">English</a>
								</li>
								<li class="style-scope sc-mdi">
									<a class="style-scope sc-mdi">日本語</a></li>
									<template id="localeList" is="dom-repeat" as="locale" filter="_onLocaleFilter" class="style-scope sc-mdi"></template>
							</ul>
						</div>
					</div>
					<ul class="top_func style-scope sc-mdi">
						<li class="info style-scope sc-mdi">
							<sc-button id="infoBtn" class="info-btn style-scope sc-mdi" tabindex="0" role="button" aria-disabled="false">
								<div class="button-container style-scope sc-button">
									<div class="style-scope sc-button"></div>
								</div>
							</sc-button>
						</li>
						<li class="notice style-scope sc-mdi">
							<span id="noticeNum" style="visibility:hidden;" class="num style-scope sc-mdi"></span>
							<smartsuite-notice title="Alert" class="style-scope sc-mdi" init="initialized">
								<sc-ajax id="getAlertSchedule" url="https://www.cpsrm.com/smartsuite/calendar/readyToGetSchedule.do" class="style-scope smartsuite-notice" hidden=""></sc-ajax>
								<sc-button id="alertIcon" class="alertIcon style-scope smartsuite-notice" tabindex="0" role="button" aria-disabled="false">
									<div class="button-container style-scope sc-button">
										<div class="style-scope sc-button"></div>
									</div>
								</sc-button>
							</smartsuite-notice>
						</li>
						<li class="logout style-scope sc-mdi">
							<sc-button title="Logout" tabindex="0" class="style-scope sc-mdi" role="button" aria-disabled="false">
								<div class="button-container style-scope sc-button">
									<div class="style-scope sc-button"></div>
								</div>  
							</sc-button>
						</li>
					</ul>
				</div>
				<div class="gnbBar style-scope sc-mdi">
					<sc-mdi-topmenu id="mdiTopMenu" class="style-scope sc-mdi">
						<div id="topMenuListDiv" class="topMenuListDiv style-scope sc-mdi-topmenu">
							<ul class="mdiTopMenu style-scope sc-mdi-topmenu" id="menuBar">
								<li id="WMS00000" class="expandable style-scope sc-mdi-topmenu" is-menu-item="Y">
									<a class="style-scope sc-mdi-topmenu">
										<span class="style-scope sc-mdi-topmenu">자재관리</span>
									</a>
								</li>
								<li id="NOT00000" class="expandable style-scope sc-mdi-topmenu selected" is-menu-item="Y">
									<a class="style-scope sc-mdi-topmenu">
										<span class="style-scope sc-mdi-topmenu">비로그인</span>
									</a>
								</li>
							</ul>
						</div>
						<div id="topMenuSubListDiv" class="topSubMenuListDiv style-scope sc-mdi-topmenu"></div>
						<div id="topMenuLeftScroll" class="topMenuLeftScroll style-scope sc-mdi-topmenu">
							<span class="style-scope sc-mdi-topmenu"></span>
						</div>
						<div id="topMenuRightScroll" class="topMenuRightScroll style-scope sc-mdi-topmenu">
							<span class="style-scope sc-mdi-topmenu"></span>
						</div>
						<div id="utilAreaResize" class="utilAreaUp style-scope sc-mdi-topmenu">
							<span class="style-scope sc-mdi-topmenu"></span>
						</div>
					</sc-mdi-topmenu>
				</div>
			</div>
			<div id="containerWrap" class="containerWrap style-scope sc-mdi" style="width: 1110px; height: 955px;">
				<div class="style-scope sc-mdi"></div>
				<sc-mdi-leftmenu id="mdiLeftMenu" class="style-scope sc-mdi" hidden="">
					<sc-ajax id="saveMyFavorite" url="https://www.cpsrm.com/saveMyFavorite.do" class="style-scope sc-mdi-leftmenu" hidden="">
					</sc-ajax>
					<div id="leftWrap" class="leftWrap style-scope sc-mdi-leftmenu" style="width: 0px; display: none;">
						<div class="leftTabArea style-scope sc-mdi-leftmenu">
							<div id="leftMenuTit" class="leftMenuTit style-scope sc-mdi-leftmenu">
								<span class="style-scope sc-mdi-leftmenu">비로그인</span>
							</div>
							<div id="leftCloseBtn" class="leftCloseBtn style-scope sc-mdi-leftmenu">
								<span class="style-scope sc-mdi-leftmenu"></span>
							</div>
							<div id="leftFavoritBtn" class="leftFavoritBtn style-scope sc-mdi-leftmenu">
								<span class="style-scope sc-mdi-leftmenu"></span>
							</div>
						</div>
						<div id="menuListDiv" class="menuList style-scope sc-mdi-leftmenu" style="height: 955px;">
							<ul id="leftMenu" class="lnbMenu style-scope sc-mdi-leftmenu">
								<li id="NOT00010" ismenuitem="Y" class="style-scope sc-mdi-leftmenu selected">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="회원가입" class="style-scope sc-mdi-leftmenu">회원가입</span>
									</a>
								</li>
								<li id="NOT00020" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="KIOSK" class="style-scope sc-mdi-leftmenu">KIOSK</span>
									</a>
								</li>
								<li id="NOT00030" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="바코드출력(Inv)" class="style-scope sc-mdi-leftmenu">바코드출력(Inv)</span>
									</a>
								</li>
								<li id="NOT00040" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="협력사등록" class="style-scope sc-mdi-leftmenu">협력사등록</span>
									</a>
								</li>
								<li id="NOT00070" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="거래제안서" class="style-scope sc-mdi-leftmenu">거래제안서</span>
									</a>
								</li>
								<li id="NOT00080" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="HelpDesk" class="style-scope sc-mdi-leftmenu">HelpDesk</span>
									</a>
								</li>
								<li id="NOT00090" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="공지사항" class="style-scope sc-mdi-leftmenu">공지사항</span>
									</a>
								</li>
								<li id="NOT00100" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="사용자매뉴얼" class="style-scope sc-mdi-leftmenu">사용자매뉴얼</span>
									</a>
								</li>
								<li id="NOT00110" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="공지사항" class="style-scope sc-mdi-leftmenu">공지사항</span>
									</a>
								</li>
								<li id="NOT00071" ismenuitem="Y" class="style-scope sc-mdi-leftmenu">
									<a class="style-scope sc-mdi-leftmenu">
										<span title="거래제안팝업" class="style-scope sc-mdi-leftmenu">거래제안팝업</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div id="leftSideBar" class="leftSplitter style-scope sc-mdi-leftmenu" style="height: 955px;">
						<aside class="style-scope sc-mdi-leftmenu">
							<ul class="style-scope sc-mdi-leftmenu">
								<li class="style-scope sc-mdi-leftmenu">
									<a title="Menu" id="leftSideBarCloseBtn" class="style-scope sc-mdi-leftmenu"></a>
								</li>
								<li class="style-scope sc-mdi-leftmenu">
									<a id="leftMyFavorite" title="Favorite" data-args="favor" class="style-scope sc-mdi-leftmenu"></a>
									<div class="wrap_sb_content fav_content style-scope sc-mdi-leftmenu">
										<h2 class="style-scope sc-mdi-leftmenu">Favorite</h2>
										<ul class="style-scope sc-mdi-leftmenu">
											<li class="style-scope sc-mdi-leftmenu">
												<a class="style-scope sc-mdi-leftmenu">바코드출력(Inv)</a>
												<span title="Delete" class="style-scope sc-mdi-leftmenu"></span>
											</li>
											<li class="style-scope sc-mdi-leftmenu">
												<a class="style-scope sc-mdi-leftmenu">INVOICE 현황(바코드출력)</a>
												<span title="Delete" class="style-scope sc-mdi-leftmenu"></span>
											</li>
											<li class="style-scope sc-mdi-leftmenu">
												<a class="style-scope sc-mdi-leftmenu">HelpDesk</a>
												<span title="Delete" class="style-scope sc-mdi-leftmenu"></span>
											</li>
											<template is="dom-repeat" as="favorite" class="style-scope sc-mdi-leftmenu"></template>
										</ul>
									</div>
								</li>
								<li class="style-scope sc-mdi-leftmenu">
									<a id="myMemo" title="Memo" class="style-scope sc-mdi-leftmenu"></a>
								</li>
								<li class="style-scope sc-mdi-leftmenu">
									<a id="calendar" title="Calendar" class="style-scope sc-mdi-leftmenu"></a>
								</li>
							</ul>
						</aside>
					</div>
				</sc-mdi-leftmenu>
				<sc-mdi-content id="mdiContent" class="style-scope sc-mdi" style="height: 955px; width: 1110px;">
					<sc-mdi-tabbar id="mdiTabbar" class="style-scope sc-mdi-content" hidden="">
						<div class="mdiTabsDiv style-scope sc-mdi-tabbar">
							<div id="tabContainer" class="tabContainer style-scope sc-mdi-tabbar">
								<sc-tabbar id="mdiTabs" class="mdiTabs style-scope sc-mdi-tabbar" interact-draggable="true" role="tablist" aria-disabled="false" container="" style="width: 1110px;">
									<div class="scroller left-scroller style-scope sc-tabbar" hidden=""></div>
									<div class="content style-scope sc-tabbar">
										<sc-tab role="tab" aria-disabled="false" class="closable style-scope sc-mdi-tabbar item-selected first-tab last-tab" data-window-id="NOT00010" data-window-url="ui/sp/oms/user/em-spuser-reg.html?app_id=&amp;aprv_typcd=&amp;param_cd=&amp;param_dt=" active="" style="left: 0px;">회원가입
											<div style="width:20px;display:inline-block;">
												<img src="https://www.cpsrm.com/ui/lib/mdi/img/btn_tabclose.png" alt="tabClose" window-id="NOT00010">
											</div>
										</sc-tab>
									</div>
									<div class="scroller right-scroller style-scope sc-tabbar" hidden=""></div>
								</sc-tabbar></div><div id="mdiTabToolbar" class="mdiTabToolbar style-scope sc-mdi-tabbar">
								<sc-toolbar class="style-scope sc-mdi-tabbar" role="toolbar" aria-disabled="false">
									<li id="leftScroller" class="scroller left-scroller style-scope sc-mdi-tabbar scroller-disabled"></li><li id="rightScroller" class="scroller right-scroller style-scope sc-mdi-tabbar scroller-disabled"></li><li id="toolTabList" class="mdi-tools mdi-tools-tabList style-scope sc-mdi-tabbar"></li>
									<li id="toolCloseAll" class="mdi-tools mdi-tools-closeall style-scope sc-mdi-tabbar"></li>
								</sc-toolbar>
							</div>
						</div>
						<div id="tabListDiv" class="tabListDiv style-scope sc-mdi-tabbar" style=""></div>
						<div id="tooltip" class="tooltip style-scope sc-mdi-tabbar" style="display:none"></div>
					</sc-mdi-tabbar>
					<sc-bc id="mdiBreadCrumb" class="style-scope sc-mdi-content"><b>회원가입</b> ( Home &nbsp;&gt;&nbsp; 비로그인 &nbsp;&gt;&nbsp; 회원가입 )</sc-bc>
					<sc-pages id="mdiPages" class="style-scope sc-mdi-content" aria-disabled="false" style="width: 1110px; height: 942px;">
						<sc-mdi-window id="NOT00010" window-id="NOT00010" class="style-scope sc-mdi-content item-selected" style="width: 1080px; height: 912px;">
							<em-spuser-reg init="initialized" class="style-scope sc-mdi-content x-scope em-spuser-reg-0">
								<sc-pages id="pages" selected="0" class="fit style-scope em-spuser-reg" aria-disabled="false">
									<es-spuser-reg id="spuser-reg" class="style-scope em-spuser-reg item-selected x-scope es-spuser-reg-0" init="initialized">
										<sc-request-group init="" class="style-scope es-spuser-reg">
											<sc-code-group init="" class="style-scope es-spuser-reg">
												<sc-code code="C043" class="style-scope es-spuser-reg"></sc-code>
												<sc-code code="C046" class="style-scope es-spuser-reg"></sc-code>
												<sc-code code="C050" class="style-scope es-spuser-reg"></sc-code>
											</sc-code-group>
											<sc-ajax url="https://www.cpsrm.com/ui/sp/oms/user/findCommonCodeAttrCdList.do" body="{&quot;grp_cd&quot;:&quot;C049&quot;, &quot;attr_cd&quot;:&quot;SAMPLE&quot;}" class="style-scope es-spuser-reg" hidden="">
											</sc-ajax>
										</sc-request-group>
										<cc-auth-checker check-list="auth-r, auth-s" class="style-scope es-spuser-reg">
										</cc-auth-checker>
										<sc-ajax id="insertOmsUser" url="https://www.cpsrm.com/ui/sp/oms/user/insertOmsUser.do" class="style-scope es-spuser-reg" hidden=""></sc-ajax>
										<sc-ajax id="selectUserCount" url="https://www.cpsrm.com/ui/sp/oms/user/selectUserCount.do" class="style-scope es-spuser-reg" hidden=""></sc-ajax>
										<sc-ajax id="selectSameUser" url="https://www.cpsrm.com/ui/sp/oms/user/selectSameUser.do" class="style-scope es-spuser-reg" hidden=""></sc-ajax>
										<sc-ajax id="semesCaptchaVerify" url="https://www.cpsrm.com/sp/oms/common/semesCaptchaVerify.do" class="style-scope es-spuser-reg" hidden=""></sc-ajax>
										<div class="popupWrap style-scope es-spuser-reg">
											<div class="popupHead style-scope es-spuser-reg">
											<b class="style-scope es-spuser-reg">회원가입</b>
										</div>
									</div>
									<div class="vspace-5 style-scope es-spuser-reg"></div>
									<sc-toolbar class="style-scope es-spuser-reg" role="toolbar" aria-disabled="false">
										<sc-label text="개인정보 수집 및 이용에 관한 동의" class="style-scope es-spuser-reg" aria-disabled="false">
											<div class="bullet-container style-scope sc-label">
												<div class="style-scope sc-label"></div>
											</div>
											<span class="style-scope sc-label">개인정보 수집 및 이용에 관한 동의</span>
										</sc-label>
										<sc-spacer class="style-scope es-spuser-reg" aria-disabled="false"></sc-spacer>
									</sc-toolbar>
									<iframe src="${pageContext.request.contextPath}/joinDetail" style="border-width:1px; border-color:#bcbcbc; border-style:solid;width:98%; height:200px" class="style-scope es-spuser-reg">
									</iframe>
									<div class="vspace-5 style-scope es-spuser-reg"></div>
									<sc-toolbar class="style-scope es-spuser-reg" role="toolbar" aria-disabled="false">
										<sc-label text="회원가입" class="style-scope es-spuser-reg" aria-disabled="false">
											<div class="bullet-container style-scope sc-label">
												<div class="style-scope sc-label"></div>
								            </div>
								            <span class="style-scope sc-label">회원가입</span>
								        </sc-label>
								        <sc-spacer class="style-scope es-spuser-reg" aria-disabled="false">
								        </sc-spacer>
								        <sc-button type="submit" id="continue_btn" text="저장" class="auth-s style-scope es-spuser-reg" role="button" tabindex="0" aria-disabled="false">
								        	<div class="button-container style-scope sc-button">
								        		<div class="style-scope sc-button"></div>
								        	</div> 제출
								        </sc-button>
								        <sc-button text="닫기" class="style-scope es-spuser-reg" role="button" tabindex="0" aria-disabled="false">
								        	<div class="button-container style-scope sc-button">
								        		<div class="style-scope sc-button"></div>
								        	</div> 닫기
								        </sc-button>
								  </sc-toolbar>
								  <div class="vspace-5 style-scope es-spuser-reg"></div>
								  <form id="joinForm" name="joinForm" action="joinForm" onsubmit="checkValidation()" method="post">  
									  <table class="tb-form style-scope es-spuser-reg" validation-group="data">
									  	<colgroup class="style-scope es-spuser-reg">
									  		<col style="width:10%" class="style-scope es-spuser-reg">
									  		<col style="width:40%" class="style-scope es-spuser-reg">
									  		<col style="width:10%" class="style-scope es-spuser-reg">
									  		<col style="width:40%" class="style-scope es-spuser-reg">
									  	</colgroup>
									  	<tbody class="style-scope es-spuser-reg">
										  	<tr class="true style-scope es-spuser-reg">
				            					<th class="style-scope es-spuser-reg">
				            						<sc-label text="소속기관" class="style-scope es-spuser-reg" aria-disabled="false">
				            							<div class="bullet-container style-scope sc-label">
				            								<div class="style-scope sc-label"></div>
				            							</div>
				            							<span class="style-scope sc-label">소속기관</span>
				            						</sc-label>
				            					</th>
				            					<td colspan="3" class="style-scope es-spuser-reg">
				            						<div class="field-box style-scope es-spuser-reg">
				            							<select id="option0" class="option custom-select m-3" name="cart_optionContent" onclick="myOption1()">
															<option value="none">--소속기관--</option>
															<c:forEach var="productOption" items="${instOptions}">
																<option id="${instList.instNo}" value="${instList.instNo}">${instList.instNm}</option>
															</c:forEach>
														</select>
				            							<div class="hspace-2 style-scope es-spuser-reg"></div>
				            							<sc-label text="* srm 관리자에게  해당 개발부서 가입승인요청 메일이 전송됩니다." style="color:blue;" class="style-scope es-spuser-reg" aria-disabled="false">
				            								<div class="bullet-container style-scope sc-label">
				            									<div class="style-scope sc-label"></div>
				            								</div>
				            								<span class="style-scope sc-label">* srm 담당자에게 가입승인요청 메일이 전송됩니다.</span>
				            							</sc-label>
				            						</div>
				            					</td>
				            				</tr>
										  	<tr class="style-scope es-spuser-reg">
										  		<th class="style-scope es-spuser-reg">
										  			<sc-label text="가입권한" class="style-scope es-spuser-reg" aria-disabled="false">
										  				<div class="bullet-container style-scope sc-label">
										  					<div class="style-scope sc-label"></div>
										  				</div>
										  				<span class="style-scope sc-label">가입권한</span>
										  			</sc-label>
										  		</th>
										  		<td colspan="3" class="style-scope es-spuser-reg">		
				            						<select id="option0" class="option custom-select m-3" name="cart_optionContent" onclick="myOption1()">
														<option value="none">--권한--</option>
														<c:forEach var="productOption" items="${options}">
															<option id="${productOption.productOption_no}" value="${productOption.productOption_type}">${productOption.productOption_type}</option>
														</c:forEach>
													</select>
												</td>
											</tr>
											<tr class="style-scope es-spuser-reg">
												<th class="style-scope es-spuser-reg">
													<sc-label text="이름" class="style-scope es-spuser-reg" aria-disabled="false">
														<div class="bullet-container style-scope sc-label">
															<div class="style-scope sc-label"></div>
														</div>
														<span class="style-scope sc-label">이름</span>
													</sc-label>
												</th>
												<td colspan="3" class="style-scope es-spuser-reg">
													<div class="hbox flex style-scope es-spuser-reg" style="overflow-y: hidden;">
														<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" required="" max-length="19" mask-re="/[A-Za-z\0-9\-]/" strip-chars-re="/[ㄱ-힣~!@#$%^&amp;*|<>?:{}()+,]/" aria-disabled="false" field="">
															<div class="field-container style-scope sc-text-field">
																<input id="input" class="style-scope sc-text-field" autocomplete="off" maxlength="19">
															</div>
														</sc-text-field>
													</div>
												</td>
											</tr>
											<tr class="style-scope es-spuser-reg">
												<th class="style-scope es-spuser-reg">
													<sc-label text="아이디" class="style-scope es-spuser-reg" aria-disabled="false">
														<div class="bullet-container style-scope sc-label">
															<div class="style-scope sc-label"></div>
														</div>
														<span class="style-scope sc-label">아이디</span>
													</sc-label>
												</th>
												<td class="style-scope es-spuser-reg">
													<div class="hbox flex style-scope es-spuser-reg" style="overflow-y: hidden;">
														<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" required="" max-length="19" mask-re="/[A-Za-z\0-9\-]/" strip-chars-re="/[ㄱ-힣~!@#$%^&amp;*|<>?:{}()+,]/" aria-disabled="false" field="">
															<div class="field-container style-scope sc-text-field">
																<input id="uid" name="userId" class="style-scope sc-text-field" autocomplete="off" maxlength="19"  value="${User.userId}">
															</div>
														</sc-text-field>
														<div class="hspace-5 style-scope es-spuser-reg"></div>
														<sc-button text="중복체크" class="auth-r style-scope es-spuser-reg" style="display:inline;padding:1px 3px;" role="button" tabindex="0" aria-disabled="false">
															<div class="button-container style-scope sc-button">
																<div class="style-scope sc-button"></div>
															</div>  중복체크
														</sc-button>
													</div>
												</td>
												<th class="style-scope es-spuser-reg">
													<sc-label text="비밀번호" class="style-scope es-spuser-reg" aria-disabled="false">
													<div class="bullet-container style-scope sc-label">
														<div class="style-scope sc-label"></div>
													</div>
													<span class="style-scope sc-label">비밀번호</span>
													</sc-label>
												</th>
												<td class="style-scope es-spuser-reg">
													<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" aria-disabled="false" field="">
														<div class="field-container style-scope sc-text-field">
															<input id="pwd" type="password" name="userPswd"value="${user.userPswd}" class="style-scope sc-text-field" autocomplete="off">
														</div>
														<span id="pwdErr1" class="errorMsg text-danger d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">비밀번호를 입력해주세요.</span>
													    <span id="pwdErr2" class="errorMsg text-danger d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">영문/숫자/특수문자 조합으로 8~20자 입력해주세요.</span>
													    <span id="pwdErr3" class="errorMsg text-success d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">사용 가능한 비밀번호입니다.</span>
														<div class="field-container style-scope sc-text-field mt-1">
															<input id="pwd-check" type="password" placeholder="비밀번호 확인" class="style-scope sc-text-field" autocomplete="off">
														</div>
														<span id="pwdCheckErr1" class="errorMsg text-danger d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">확인을 위해 비밀번호를 다시 입력해주세요.</span>
														<span id="pwdCheckErr2" class="errorMsg text-danger d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">비밀번호가 일치하지 않습니다.</span>
														<span id="pwdCheckErr3" class="errorMsg text-success d-none small" style="margin-left:10px; font-family: dotum,sans-serif; font-size: 12px;">비밀번호가 일치합니다.</span>
													</sc-text-field>
			            						</td>
			            					</tr>
			            					<tr class="style-scope es-spuser-reg"><th class="style-scope es-spuser-reg">
			            						<sc-label text="Email" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">Email</span>
			            						</sc-label>
			            					</th>
			            					<td colspan="3" class="style-scope es-spuser-reg">
			            						<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" required="" aria-disabled="false" field="">
			            							<div class="field-container style-scope sc-text-field">
			            								<input id="input" class="style-scope sc-text-field" autocomplete="off">
			            							</div>
			            						</sc-text-field>
			            						<div class="field-box style-scope es-spuser-reg">
			            							<sc-checkbox-field checked-value="Y" un-checked-value="N" default-value="N" class="style-scope es-spuser-reg" aria-disabled="false" field="" toggles="" checked="">
			            								<div class="check-default style-scope sc-checkbox-field checked"></div>
			            							</sc-checkbox-field>
			            							<sc-label text="*(외부메일 가입이 필요할 시 아래 절차 진행바랍니다.)" class="style-scope es-spuser-reg" aria-disabled="false">
			            								<div class="bullet-container style-scope sc-label">
			            									<div class="style-scope sc-label"></div>
			            							 	</div>
			            							 	<span class="style-scope sc-label">*(외부메일 가입이 필요할 시 아래 절차 진행바랍니다.)</span>
			            							 </sc-label>
			            						</div>
			            						<sc-label text="절차 : 첨부에 있는 공문 다운로드  > 공문작성  > 대표이사 직인 날인  > 스캔첨부" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">절차 : 첨부에 있는 공문 다운로드  &gt; 공문작성  &gt; 대표이사 직인 날인  &gt; 스캔첨부</span>
			            						</sc-label>
			            						<sc-label text="(*공문에 허위사실 기재 시 발생하는 일체의 법적 문제에 대하여는 귀사에 책임이 있습니다.)" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">(*공문에 허위사실 기재 시 발생하는 일체의 법적 문제에 대하여는 귀사에 책임이 있습니다.)</span>
			            						</sc-label>
			            					</td>
			            				</tr>
			            				<tr class="style-scope es-spuser-reg">
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="휴대전화번호" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">휴대전화번호</span>
			            						</sc-label>
			            					</th>
			            					<td class="style-scope es-spuser-reg">
			            						<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" maxlength="60" mask-re="/[0-9\-+]/" validator-type="mobile" required="" aria-disabled="false" field="">
			            							<div class="field-container style-scope sc-text-field">
			            								<input id="input" class="style-scope sc-text-field" autocomplete="off" maxlength="60">
			            							</div>
			            						</sc-text-field> ex)xxx-xxxx-xxxx (선택)
			            					</td>
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="전화번호" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">전화번호</span>
			            						</sc-label>
			            					</th>
			            					<td class="style-scope es-spuser-reg">
			            						<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" maxlength="60" mask-re="/[0-9\-+]/" validator-type="phone" aria-disabled="false" field="">
			            							<div class="field-container style-scope sc-text-field">
			            								<input id="input" class="style-scope sc-text-field" autocomplete="off" maxlength="60">
			            							</div>
			            						</sc-text-field> ex)xxx-xxxx-xxxx (선택)
			            					</td>
			            				</tr>
			            				<tr class="style-scope es-spuser-reg">
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="주민등록번호" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">주민등록번호</span>
			            						</sc-label>
			            					</th>
			            					<td colspan="3" class="style-scope es-spuser-reg">
			            						<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" maxlength="60" mask-re="/[0-9\-+]/" validator-type="phone" aria-disabled="false" field="">
			            							<div class="field-container style-scope sc-text-field">
			            								<input id="input" class="style-scope sc-text-field" autocomplete="off" maxlength="60">
			            							</div>
			            						</sc-text-field> 
			            					</td>
			            				</tr>
			            				<tr class="true style-scope es-spuser-reg">
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="개발부서" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">개발부서</span>
			            						</sc-label>
			            					</th>
			            					<td colspan="3" class="style-scope es-spuser-reg">
			            						<div class="field-box style-scope es-spuser-reg">
			            							<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" readonly="" disabled="" required="" aria-disabled="true" field="">
				            							<div class="field-container style-scope sc-text-field">
				            								<input id="input" class="style-scope sc-text-field" disabled="" readonly="" autocomplete="off">
				            							</div>
			            							</sc-text-field>
			            							<div class="hspace-2 style-scope es-spuser-reg"></div>
			            							<sc-button class="fa fa-search style-scope es-spuser-reg" style="padding:3px 7px 0px 7px;border:none;" role="button" tabindex="0" aria-disabled="false">
			            								<div class="button-container style-scope sc-button">
			            									<div class="style-scope sc-button"></div>
			            								</div>  </sc-button><sc-label text="* srm 관리자에게  해당 개발부서 가입승인요청 메일이 전송됩니다." style="color:blue;" class="style-scope es-spuser-reg" aria-disabled="false">
			            						
			            								<div class="bullet-container style-scope sc-label">
			            									<div class="style-scope sc-label"></div>
			            								</div>
			            								<span class="style-scope sc-label">
			            							</sc-label>
			            						</div>
			            					</td>
			            				</tr>
			            				<tr class="style-scope es-spuser-reg">
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="역할" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">역할</span>
			            						</sc-label>
			            					</th>
			            					<td class="style-scope es-spuser-reg">
			            						<select id="option1" class="option custom-select m-3" name="cart_optionContent" onclick="myOption1()">
													<option value="none">--역할--</option>
													<c:forEach var="productOption" items="${options}">
														<option id="${productOption.productOption_no}" value="${productOption.productOption_type}">${productOption.productOption_type}</option>
													</c:forEach>
												</select>
			            					</td>
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="직위" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">직위</span>
			            						</sc-label>
			            					</th>
			            					<td class="style-scope es-spuser-reg">
			            						<select id="option2" class="option custom-select m-3" name="cart_optionContent" onclick="myOption2()">
													<option value="none">--직위--</option>
													<c:forEach var="productOption" items="${options}">
														<option id="${productOption.productOption_no}" value="${productOption.productOption_type}">${productOption.productOption_type}</option>
													</c:forEach>
												</select>
			            					</td>
			            				</tr>
			            				<tr class="false style-scope es-spuser-reg">
			            					<th class="style-scope es-spuser-reg">
			            						<sc-label text="거래처" class="style-scope es-spuser-reg" aria-disabled="false">
			            							<div class="bullet-container style-scope sc-label">
			            								<div class="style-scope sc-label"></div>
			            							</div>
			            							<span class="style-scope sc-label">거래처</span>
			            						</sc-label>
			            					</th>
			            					<td colspan="3" class="style-scope es-spuser-reg">
			            						<div class="hbox flex style-scope es-spuser-reg" style="overflow-y: hidden;">
			            							<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" required="" trigger-cls="search" aria-disabled="false" field="">
			            								<div class="field-container style-scope sc-text-field">
			            									<input id="input" class="style-scope sc-text-field" autocomplete="off">
				           										<div class="trigger-container style-scope sc-text-field">
				           											<div class="trigger search style-scope sc-text-field"></div>
				           										</div>
			            								</div>
			            							</sc-text-field>
			            							<div class="hspace-5 style-scope es-spuser-reg"></div>
			            							<sc-text-field input-clear="true" class="w-100 style-scope es-spuser-reg" readonly="" required="" aria-disabled="false" field="">
				            							<div class="field-container style-scope sc-text-field">
				            								<input id="input" class="style-scope sc-text-field" readonly="" autocomplete="off">
				            							</div>
				            						</sc-text-field>
				            						<div class="hspace-5 style-scope es-spuser-reg"></div>
				            					</div>
				            				</td>
				            			</tr>
				            			<tr class="false style-scope es-spuser-reg">
				            				<th class="style-scope es-spuser-reg">
				            					<sc-label text="거래처담당자" class="style-scope es-spuser-reg" aria-disabled="false">
				            						<div class="bullet-container style-scope sc-label">
				            							<div class="style-scope sc-label"></div>
				            						</div>
				            						<span class="style-scope sc-label">거래처담당자</span>
				            					</sc-label>
				            				</th>
				            				<td colspan="3" class="style-scope es-spuser-reg">
				            					<div class="field-box style-scope es-spuser-reg">
				            						<sc-text-field input-clear="true" class="w-150 style-scope es-spuser-reg" readonly="" disabled="" required="" aria-disabled="true" field="">
				            							<div class="field-container style-scope sc-text-field">
				            								<input id="input" class="style-scope sc-text-field" disabled="" readonly="" autocomplete="off">
				            							</div>
				            						</sc-text-field>
				            						<div class="hspace-2 style-scope es-spuser-reg"></div>
				            						<sc-button class="fa fa-search style-scope es-spuser-reg" style="padding:3px 7px 0px 7px;border:none;" role="button" tabindex="0" aria-disabled="false">
				            							<div class="button-container style-scope sc-button">
				            								<div class="style-scope sc-button"></div>
				            							</div>  
				            						</sc-button>
				            						<sc-label text="* 거래처 담당자에게 가입승인요청 메일이 전송됩니다." style="color:blue;" class="style-scope es-spuser-reg" aria-disabled="false">
				            							<div class="bullet-container style-scope sc-label">
				            								<div class="style-scope sc-label"></div>
				            							</div>
				            							<span class="style-scope sc-label">* 거래처 담당자에게 가입승인요청 메일이 전송됩니다.</span>
				            						</sc-label>
				            					</div>
				            				</td>
				            			</tr>
				            			<tr class="style-scope es-spuser-reg"><th class="style-scope es-spuser-reg">
				            				<sc-label text="첨부파일" class="style-scope es-spuser-reg" aria-disabled="false">
				            					<div class="bullet-container style-scope sc-label">
				            						<div class="style-scope sc-label"></div>
				            					</div>
				            					<span class="style-scope sc-label">첨부파일</span>
				            				</sc-label>
				            			</th>
				            			<td colspan="3" class="style-scope es-spuser-reg">
				            				<sc-grid id="gridPanel" class="h-100 style-scope es-spuser-reg" use-selection="false" use-state="false" container="">
				            					<div class="content-wrapper style-scope sc-grid">
					            					<div class="content style-scope sc-grid" style="position: absolute; width: 960.74px; height: 100px;">
					            						<sc-grid-columns class="style-scope es-spuser-reg">
					            							<sc-data-column data-field="label" header-text="첨부파일종류" width="250" text-align="center" class="style-scope es-spuser-reg">
					            							</sc-data-column>
					            							<sc-attachment-column data-field="grp_cd_cnt" header-text="첨부" width="60" text-align="center" shared-group-field="file_grp_cd" editable="true" popup-call-fn="callAttach" class="style-scope es-spuser-reg">
					            							</sc-attachment-column>
					            							<sc-attachment-column data-field="grp_cd_sample" header-text="공문다운로드" width="80" text-align="center" shared-group-field="dtl_cd_attr_val" class="style-scope es-spuser-reg">
					            							</sc-attachment-column>
					            						</sc-grid-columns>
					            						<sc-grid-fields class="style-scope es-spuser-reg">
					            							<sc-grid-field data-field="data" class="style-scope es-spuser-reg"></sc-grid-field>
					            							<sc-grid-field data-field="file_grp_cd" class="style-scope es-spuser-reg"></sc-grid-field>
					            						</sc-grid-fields>
					            						<div class="grid-container style-scope sc-grid" id="sc-grid-1" style="height: 100px;">
					            							<div style="position: relative; box-sizing: border-box; width: 100%; height: 100%; border-style: none; border-width: 0px; overflow: hidden;">
					            								<canvas width="959" height="99" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; background: rgb(255, 255, 255); border-style: none; border-width: 0px; transform: translateZ(0px); cursor: auto;">
					            									Your browser does not support HTML5 Canvas.
					            								</canvas>
					            								<div spellcheck="false" style="outline: none; position: absolute; z-index: 2000; box-sizing: border-box; overflow: hidden; border: none; width: 0px; height: 0px; padding: 0px; margin: 0px; box-shadow: none; resize: none;">
					            									<input style="position: absolute; margin: 0px; padding: 0px 1px 0px 2px; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal; overflow-wrap: normal; overflow: hidden; resize: none; border: none; outline: none; text-align: left; color: rgb(68, 84, 106); left: 0px; top: 0px; width: 100%; height: 100%; cursor: text; -webkit-user-modify: read-write-plaintext-only; white-space: pre-wrap; transform: translateZ(0px); text-transform: none;" readonly="" maxlength="1000000">
					            								</div>
					            							</div>
					            						</div>
					            						<div class="grid-bottom-status style-scope sc-grid">
					            							<span class="style-scope sc-grid"></span>
					            						</div>
					            					</div>
				            					</div>
				            				</sc-grid>
				            			</td>
				            		</tr>
				            		<tr class="style-scope es-spuser-reg">
				            			<th width="100px" class="style-scope es-spuser-reg">
				            				<sc-label text="보안문자" class="style-scope es-spuser-reg" aria-disabled="false">
				            					<div class="bullet-container style-scope sc-label">
				            						<div class="style-scope sc-label"></div>
				            					</div>
				            					<span class="style-scope sc-label">보안문자</span>
				            				</sc-label>
				            			</th>
				            			<td colspan="3" class="style-scope es-spuser-reg">
				            				<div style="display:inline-flex; width:100%;vertical-align:middle;" class="style-scope es-spuser-reg">
											    <img src="https://www.cpsrm.com/sp/oms/common/semesCaptchaImg.do" alt="보안문자" id="semes_captcha" class="style-scope es-spuser-reg">
											    <div class="hspace-5 style-scope es-spuser-reg"></div>
											    <sc-text-field class="w-30 style-scope es-spuser-reg" input-clear="true" aria-disabled="false" field="">
											        <div class="field-container style-scope sc-text-field">
											            <input id="input" class="style-scope sc-text-field" autocomplete="off">
											        </div>
											    </sc-text-field>
											    <div class="hspace-5 style-scope es-spuser-reg"></div>
											    <sc-button text="새로고침" class="style-scope es-spuser-reg" role="button" tabindex="0" aria-disabled="false" onclick="refreshCaptcha()">
											        <div class="button-container style-scope sc-button">
											            <div class="style-scope sc-button"></div>
											        </div>
											        새로고침
											    </sc-button>
											</div>
				            				<p class="style-scope es-spuser-reg">※ 프로그램을 이용한 자동 입력을 방지하기 위한 보안절차입니다</p>
				            		</td>
			            		</tr>
			            	</tbody>
			            </table>
					</form>
		           </es-spuser-reg>
		          </sc-pages>
		         </em-spuser-reg>
		        </sc-mdi-window>
		       </sc-pages>
		      <sc-mdi-progress id="mdiProgress" class="style-scope sc-mdi-content" style="opacity: 1; display: none; top: 477.5px; left: 555px; max-width: 1070px; max-height: 915px;">
		      	<div class="title style-scope sc-mdi-progress">회원가입</div>
		      	<sc-progress id="progress" open-changed-delay="0" class="style-scope sc-mdi-progress" aria-disabled="false">
		      		<div class="container style-scope sc-progress">
		      			<div class="progress style-scope sc-progress" style="transform: scaleX(0);"></div>
			      		<div class="percent style-scope sc-progress">
			      			<span class="style-scope sc-progress">0%</span>
			      		</div>
		      		</div>
		      	</sc-progress>
		      </sc-mdi-progress>
		     </sc-mdi-content>
		    </div>
    	</sc-mdi>
    	<sc-grid-filter id="sc-grid-filter-2" hidden="" aria-disabled="false" aria-hidden="true" style="outline: none; display: none;">
    		<div id="scFilterContainer" class="filterContainer style-scope sc-grid-filter">
    			<div id="filterGroup" class="filterInputGroup style-scope sc-grid-filter">
    				<div class="searchContainer style-scope sc-grid-filter">
    					<sc-text-field id="filterText" placeholder="Search" input-clear="true" trigger-cls="search" class="style-scope sc-grid-filter" aria-disabled="false" field="">
    						<div class="field-container style-scope sc-text-field">
    							<input id="input" class="style-scope sc-text-field" autocomplete="off" placeholder="Search">
   								<div class="trigger-container style-scope sc-text-field">
   									<div class="trigger search style-scope sc-text-field"></div>
   								</div>
    						</div>
    					</sc-text-field>
    				</div>
	    			<div class="filterBtnTopGroup style-scope sc-grid-filter">
	    				<ul class="style-scope sc-grid-filter">
	    					<li class="style-scope sc-grid-filter">
	    						<a title="Select All" class="style-scope sc-grid-filter"></a>
	    					</li>
	    					<li class="style-scope sc-grid-filter">
	    						<a title="Delete All" class="style-scope sc-grid-filter"></a>
	    					</li>
	    				</ul>
	    				<span class="style-scope sc-grid-filter">Results : </span>
	    			</div>
    			</div>
    			<div class="scFilterGrid style-scope sc-grid-filter" id=""></div>
    			<div class="filterInputContainer style-scope sc-grid-filter">
    				<sc-combobox-field class="filterKindCombo style-scope sc-grid-filter" selected-index="0" input-clear="false" display-field="text" value-field="value" aria-disabled="false" field="">
    					<div class="field-container style-scope sc-combobox-field">
    						<input id="input" readonly="" class="style-scope sc-combobox-field">
   							<div class="trigger-container style-scope sc-combobox-field">
   								<div class="trigger default style-scope sc-combobox-field"></div>
   							</div>
    					</div>
    				</sc-combobox-field>
    				<sc-text-field class="style-scope sc-grid-filter" aria-disabled="false" field="">
    					<div class="field-container style-scope sc-text-field">
    						<input id="input" class="style-scope sc-text-field" autocomplete="off">
    					</div>
    				</sc-text-field>
    			</div>
    			<div class="filterBtnBottomGroup style-scope sc-grid-filter">
    				<sc-button class="filter_bt_btn_clipboard style-scope sc-grid-filter" role="button" tabindex="0" aria-disabled="false">
    					<div class="button-container style-scope sc-button">
    						<div class="style-scope sc-button"></div>
    					</div>  클립보드 가져오기
    				</sc-button>
    				<sc-button class="filter_bt_btn_apply style-scope sc-grid-filter" role="button" tabindex="0" aria-disabled="false">
    					<div class="button-container style-scope sc-button">
    						<div class="style-scope sc-button"></div>
    					</div>  적용
    				</sc-button>
    				<sc-button class="filter_bt_btn_close style-scope sc-grid-filter" role="button" tabindex="0" aria-disabled="false">
    					<div class="button-container style-scope sc-button">
    						<div class="style-scope sc-button"></div>
    					</div>  닫기
    				</sc-button>
    			</div>
    		</div>
    	</sc-grid-filter>
    	<sc-window aria-disabled="false" tabindex="-1" style="outline: none; width: 700px; height: 400px; box-sizing: border-box; transform: translate(-1px, 0px); position: fixed; display: none;" class="" data-x="-1" data-y="0" aria-hidden="true" hidden="">
    		<sc-toolbar class="header style-scope sc-window" role="toolbar" aria-disabled="false"><div class="title style-scope sc-window"></div>
    			<sc-button class="collapsible style-scope sc-window" role="button" tabindex="0" hidden="" aria-disabled="false">
	    			<div class="button-container style-scope sc-button">
	    				<div class="style-scope sc-button"></div>
	    			</div>  
    			</sc-button>
	    		<sc-button class="maximizable style-scope sc-window" role="button" tabindex="0" aria-disabled="false">
	    			<div class="button-container style-scope sc-button">
	    				<div class="style-scope sc-button"></div>
	    			</div>  
	    		</sc-button>
	    		<sc-button class="closable style-scope sc-window" role="button" tabindex="0" aria-disabled="false">
	    			<div class="button-container style-scope sc-button">
	    				<div class="style-scope sc-button"></div>
	    			</div>  
	    		</sc-button>
    		</sc-toolbar>
    		<div class="content-wrap style-scope sc-window">
    			<div class="content style-scope sc-window" style="width: 678.667px; height: 344.667px;">
    				<ep-spuser-chr-list init="initialized" class="x-scope ep-spuser-chr-list-0">
    					<sc-ajax id="findList" url="https://www.cpsrm.com/ui/sp/oms/user/findListChrEnc.do" class="style-scope ep-spuser-chr-list" hidden=""></sc-ajax>
    					<div class="vbox flex style-scope ep-spuser-chr-list">
    						<cc-page-title-bar title-text="담당자 검색" class="style-scope ep-spuser-chr-list">
    							<h3 class="style-scope cc-page-title-bar">담당자 검색</h3>
    							<ul id="toolbar" class="style-scope cc-page-title-bar" hidden="">
    								<li class="style-scope cc-page-title-bar">
    									<a title="즐겨찾기 저장" class="style-scope cc-page-title-bar"></a>
    								</li>
    								<li class="style-scope cc-page-title-bar">
    									<a title="도움말 보기" class="style-scope cc-page-title-bar"></a>
    								</li>
    							</ul>
    							<div class="wrap_btn style-scope cc-page-title-bar"></div>
    						</cc-page-title-bar>
    						<cc-search-container auth-r="" class="style-scope ep-spuser-chr-list">
    							<div id="_searchContainer" class="sc-wrap-srch style-scope cc-search-container">
    								<div id="_toggleTarget" class="style-scope cc-search-container">
    									<table class="style-scope ep-spuser-chr-list">
    										<colgroup class="style-scope ep-spuser-chr-list">
    											<col style="width:100px" class="style-scope ep-spuser-chr-list">
    											<col class="style-scope ep-spuser-chr-list">
    										</colgroup>
    										<tbody class="style-scope ep-spuser-chr-list">
    											<tr class="style-scope ep-spuser-chr-list">
    												<th class="style-scope ep-spuser-chr-list">
    													<sc-label text="담당자명" class="style-scope ep-spuser-chr-list" aria-disabled="false">
    														<div class="bullet-container style-scope sc-label">
    															<div class="style-scope sc-label"></div>
    														</div>
    														<span class="style-scope sc-label">담당자명</span>
    													</sc-label>
    												</th>
    												<td class="style-scope ep-spuser-chr-list">
    													<sc-text-field input-clear="true" class="w-150 style-scope ep-spuser-chr-list" required="" aria-disabled="false" field="">
    														<div class="field-container style-scope sc-text-field">
    															<input id="input" class="style-scope sc-text-field" autocomplete="off">
    														</div>
    													</sc-text-field>
    												</td>
    											</tr>
    										</tbody>
    									</table>
    								</div>
    								<div id="_buttonContainer" class="sc-wrap-btn style-scope cc-search-container">
    									<div class="wrap-srch-btn style-scope cc-search-container">
    										<sc-button id="_searchBtn" class="btn_srch style-scope cc-search-container" role="button" tabindex="0" aria-disabled="false">
    											<div class="button-container style-scope sc-button">Search</div>  
    										</sc-button>
    									</div>
    									<sc-button id="_resetBtn" class="btn_reset style-scope cc-search-container" role="button" tabindex="0" aria-disabled="false" hidden="">
    										<div class="button-container style-scope sc-button">Reset</div>  
    									</sc-button>
    									<sc-button id="_hideBtn" class="btn_toggle_up style-scope cc-search-container" title="Hide Search" role="button" tabindex="0" aria-disabled="false" hidden="">
    										<div class="button-container style-scope sc-button">
    											<div class="style-scope sc-button"></div>
    										</div>  
    									</sc-button>
    								</div>
    							</div>
    							<div id="_hideButtonContainer" class="sc-wrap-btn _toggleHide style-scope cc-search-container">
    								<sc-button id="_showBtn" class="btn_toggle_down style-scope cc-search-container" title="Show Search" role="button" tabindex="0" aria-disabled="false">
    									<div class="button-container style-scope sc-button">
    										<div class="style-scope sc-button"></div>
    									</div>  
    								</sc-button>
    							</div>
    						</cc-search-container>
    						<sc-grid class="flex style-scope ep-spuser-chr-list" id="grid" selection-mode="false" use-state="false" container="">
    							<div class="content-wrapper style-scope sc-grid">
    								<div class="content style-scope sc-grid" style="position: absolute; width: 678.667px; height: 283.74px;">
    									<sc-grid-columns class="style-scope ep-spuser-chr-list">
    										<sc-data-column data-field="emp_nm" header-text="담당자명" width="100" text-align="center" class="style-scope ep-spuser-chr-list"></sc-data-column>
    										<sc-data-column data-field="dept_nm" header-text="부서명" width="200" text-align="center" class="style-scope ep-spuser-chr-list"></sc-data-column>
    										<sc-data-column data-field="emp_jk" header-text="직급" width="100" text-align="center" class="style-scope ep-spuser-chr-list"></sc-data-column>
    										<sc-data-column data-field="email" header-text="E-mail" width="200" text-align="left" class="style-scope ep-spuser-chr-list"></sc-data-column>
    									</sc-grid-columns>
    									<sc-grid-fields class="style-scope ep-spuser-chr-list">
    										<sc-grid-field data-field="emp_no" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    										<sc-grid-field data-field="emp_nm" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    										<sc-grid-field data-field="emp_jk" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    										<sc-grid-field data-field="dept_nm" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    										<sc-grid-field data-field="user_id" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    										<sc-grid-field data-field="emailid" class="style-scope ep-spuser-chr-list"></sc-grid-field>
    									</sc-grid-fields>
    									<div class="grid-container style-scope sc-grid" id="sc-grid-3" style="height: 283px;">
    										<div style="position: relative; box-sizing: border-box; width: 100%; height: 100%; border-style: none; border-width: 0px; overflow: hidden;">
    											<canvas width="0" height="0" style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; background: rgb(255, 255, 255); border-style: none; border-width: 0px; transform: translateZ(0px); cursor: auto;">
    												Your browser does not support HTML5 Canvas.
    											</canvas>
    											<div spellcheck="false" style="outline: none; position: absolute; z-index: 2000; box-sizing: border-box; overflow: hidden; border: none; width: 0px; height: 0px; padding: 0px; margin: 0px; box-shadow: none; resize: none;">
    												<input style="position: absolute; margin: 0px; padding: 0px 1px 0px 2px; font-style: normal; font-variant: normal; font-weight: normal; line-height: normal; overflow-wrap: normal; overflow: hidden; resize: none; border: none; outline: none; text-align: left; color: rgb(68, 84, 106); left: 0px; top: 0px; width: 100%; height: 100%; cursor: text; -webkit-user-modify: read-write-plaintext-only; white-space: pre-wrap; transform: translateZ(0px);">
    											</div>
    										</div>
    									</div>
    									<div class="grid-bottom-status style-scope sc-grid">
    										<span class="style-scope sc-grid"></span>
    									</div>
    								</div>
    							</div>
    						</sc-grid>
    					</div>
    				</ep-spuser-chr-list>
    			</div>
    		</div>
    		<div class="interact-resizable-handle style-scope sc-window" skip-upgrade="">
    			<div class="interact-resizable-north style-scope sc-window"></div>
    			<div class="interact-resizable-south style-scope sc-window"></div>
    			<div class="interact-resizable-west style-scope sc-window"></div>
    			<div class="interact-resizable-east style-scope sc-window"></div>
    			<div class="interact-resizable-northwest style-scope sc-window"></div>
    			<div class="interact-resizable-northeast style-scope sc-window"></div>
    			<div class="interact-resizable-southwest style-scope sc-window"></div>
    			<div class="interact-resizable-southeast style-scope sc-window"></div>
    		</div>
    	</sc-window>
	</body>
</html>