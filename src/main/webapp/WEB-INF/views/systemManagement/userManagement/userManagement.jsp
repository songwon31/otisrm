<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/userManagementStyle.css" />

<div class="border border-1 px-5 py-4" style="background-color:white; border-radius:15px;">
	<form id="searchForm" method="get">
		<div class="p-0 container-fluid d-inline-flex flex-row">
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">권한</span>
					</div>
					<div style="width:70%;">
						<label style="display:none;" for="userAuth"></label> 
						<select id="userAuth" name="userAuth" style="width:100%">
							<option value="" selected>전체</option>
							<option value="customer">고객사</option>	
							<option value="pic">담당자</option>
							<option value="developer">개발자</option>
							<option value="reviewer">검토자</option>
							<option value="systemManager">관리자</option>
						</select>
					</div>
				</div>
			</div>
			<div style="width:7%;"></div>
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">상태</span>
					</div>
					<div style="width:70%;">
						<label style="display:none;" for="userStatus"></label> 
						<select id="userStatus" name="userStatus" style="width:100%">
							<option value="" selected>전체</option>
							<option value="waitApproval">가입 승인 대기</option>	
							<option value="normal">일반</option>
							<option value="withdrawl">탈퇴</option>
						</select>
					</div>
				</div>
			</div>
			<div style="width:7%;"></div>
			<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:20%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">키워드</span>
					</div>
					<div style="width:80%; display:flex; align-items:center;">
						<div style="width:35%; font-size:14px;">
							<label style="display:none;" for="keywordCategory"></label> 
							<select id="keywordCategoty" name="keywordCategoty" style="width:100%">
								<option value="userName" selected>이름</option>	
								<option value="userTelno">전화번호</option>
								<option value="userEmail">이메일</option>
							</select>
						</div>
						<div style="width:2%"></div>
						<div class="p-0 m-0" style="width:63%">
							<label style="display:none;" for="keywordContent"></label>
							<input type="text" id="keywordContent" name="keywordContent" style="width:98%;"/>
						</div>
					</div>
				</div>
			</div>
			<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
				<a href="javascript:void(0)" class="d-inline-flex flex-row align-items-center justify-content-center" 
					style="width:50%; height:100%; background-color:#868E96; border-radius:5px;">
					<span style="font-size:14px; color:white;">초기화</span>
				</a>
			</div>
		</div>
		<div class="p-0 container-fluid d-inline-flex flex-row mt-3">
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">소속</span>
					</div>
					<div style="width:70%;">
						<label style="display:none;" for="userInst"></label> 
						<select id="userInst" name="userInst" style="width:100%">
							<option value="" selected>전체</option>
							<option value="mel">고용노동부</option>
							<option value="keis">한국고용정보원</option>	
							<option value="oti">오티아이</option>	
						</select>
					</div>
				</div>
			</div>
			<div style="width:7%;"></div>
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">부서</span>
					</div>
					<div style="width:70%;">
						<label style="display:none;" for="userInst"></label> 
						<select id="userInst" name="userInst" style="width:100%">
							<option value="" selected>전체</option>
							<option value="a">능력개발팀</option>
							<option value="b">외국인력팀</option>	
							<option value="c">서비스개발팀</option>	
						</select>
					</div>
				</div>
			</div>
			<div style="width:7%;"></div>
			<div style="width:35%;" class="d-inline-flex flex-row align-items-center">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:20%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">가입일</span>
					</div>
					<div style="width:80%; display:flex; align-items:center;">
						<div style="width:100%; dispaly:flex; align-items:center">
							<input style="width:45%;" type="date">
							<span style="width:10%; font-size:14px;">~</span>
							<input style="width:45%;" type="date">
						</div>
					</div>
				</div>
			</div>
			<div style="width:11%;" class="d-flex flex-row-reverse align-items-center">
				<a href="javascript:void(0)" class="d-inline-flex flex-row align-items-center justify-content-center" 
					style="width:50%; height:100%; background-color:#222E3C; border-radius:5px;">
					<span style="font-size:14px; color:white;">검색</span>
				</a>
			</div>	
		</div>
	</form>
</div>
<!-- 
<div class="border border-1 p-3" style="background-color:#FAFBFD; border-radius:15px;">
	<div class="font-weight-bold" style="font-size:24px; color:#222E3C;">사용자 관리</div>
	<div class="border border-1 my-3 p-3" style="background-color:#FBFCFE;">
		<form method="get">
			<div class="mb-2 p-0 container-fluid d-inline-flex flex-row">
				<div style="width:20%;">
					<div class="p-0 d-inline-flex flex-row align-items-center ">
						<div style="width:30%; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">권한</span>
						</div>
						<div style="width:70%;">
							<input type="text" name="userName" style="width:100%;"/>
						</div>
					</div>
				</div>
				<div style="width:10%;"></div>
				<div style="width:20%;">
					<div class="p-0">
						<div style="float:left; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">상태</span>
						</div>
						<div style="float:right;">
							<input type="text" name="userName" style="width:150px;"/>
						</div>
					</div>
				</div>
				<div style="width:10%;"></div>
				<div style="width:30%;">
					<div class="p-0">
						<div class="row">
							<div class="col-4 pr-0" style="display:flex; align-items:center;">
								<div style="float:left; display:flex; align-items:center;">
									<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
									<span class="font-weight-bold" style="font-size:14px;">키워드</span>
								</div>
							</div>
							<div class="col-8 p-0 border">
								<div class="d-inline-flex flex-row">
									<div class="form-group m-0 p-0" style="font-size:14px;">
										<label for="keywordCategory"></label> 
										<select id="keywordCategoty" name="keywordCategoty">
											<option value="userName" selected>이름</option>
											<option value="userTelno">전화번호</option>
											<option value="userEmail">이메일</option>
										</select>
									</div>
									<div class="form-group m-0 px-2">
										<label for="keywordContent"></label>
										<input type="text" id="keywordContent" name="keywordContent"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mb-2 p-0 container-fluid d-inline-flex flex-row">
				<div style="width:25%;">
					<div class="container-fluid p-0">
						<div style="float:left; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">소속</span>
						</div>
						<div style="float:right;">
							<input type="text" name="userName" style="width:150px;"/>
						</div>
					</div>
				</div>
				<div style="width:8%;"></div>
				<div style="width:25%;">
					<div class="container-fluid p-0">
						<div style="float:left; display:flex; align-items:center;">
							<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
							<span class="font-weight-bold" style="font-size:14px;">부서</span>
						</div>
						<div style="float:right;">
							<input type="text" name="userName" style="width:150px;"/>
						</div>
					</div>
				</div>
				<div style="width:8%;"></div>
				<div style="width:25%;">
					<div class="container-fluid p-0">
						<div class="row">
							<div class="col-4 pr-0" style="display:flex; align-items:center;">
								<div style="float:left; display:flex; align-items:center;">
									<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
									<span class="font-weight-bold" style="font-size:14px;">키워드</span>
								</div>
							</div>
							<div class="col-8 p-0 border">
								<div class="d-inline-flex flex-row">
									<div class="form-group m-0 p-0" style="font-size:14px;">
										<label for="keywordCategory"></label> 
										<select id="keywordCategoty" name="keywordCategoty">
											<option value="userName" selected>이름</option>
											<option value="userTelno">전화번호</option>
											<option value="userEmail">이메일</option>
										</select>
									</div>
									<div class="form-group m-0 px-2">
										<label for="keywordContent"></label>
										<input type="text" id="keywordContent" name="keywordContent"/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</form>
	</div>
</div> 
-->
<%@ include file="/WEB-INF/views/common/footer.jsp"%>