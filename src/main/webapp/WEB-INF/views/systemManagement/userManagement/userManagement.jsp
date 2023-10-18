<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<%@ include file="/WEB-INF/views/common/header.jsp"%>
<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/systemManagement/userManagement.css" />

<div class="border border-1 p-3" style="background-color:white; border-radius:15px;">
	<form method="get">
		<div class="p-0 container-fluid d-inline-flex flex-row">
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center border border-1">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">권한</span>
					</div>
					<div style="width:70%;">
						<input type="text" name="userName" style="width:100%;"/>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:10%;"></div>
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center border border-1">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">상태</span>
					</div>
					<div style="width:70%;">
						<input type="text" name="userStatus" style="width:100%;"/>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:10%;"></div>
			<div style="width:35%;" class="d-inline-flex flex-row align-items-center border border-1 border-danger">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">키워드</span>
					</div>
					<div class="border border-1 border-primary" style="width:70%; display:flex; align-items:center;">
						<div style="width:30%; font-size:14px;">
							<label for="keywordCategory"></label> 
							<select id="keywordCategoty" name="keywordCategoty" style="width:90%">
								<option value="userName" selected>이름</option>
								<option value="userTelno">전화번호</option>
								<option value="userEmail">이메일</option>
							</select>
						</div>
						<div class="p-0 m-0" style="width:70%">
							<label for="keywordContent"></label>
							<input type="text" id="keywordContent" name="keywordContent" style="width:95%;"/>
						</div>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:5%;"></div>
		</div>
		<div class="p-0 container-fluid d-inline-flex flex-row">
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center border border-1">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center ">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">권한</span>
					</div>
					<div style="width:70%;">
						<input type="text" name="userName" style="width:100%;"/>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:10%;"></div>
			<div style="width:20%;" class="d-inline-flex flex-row align-items-center border border-1">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">상태</span>
					</div>
					<div style="width:70%;">
						<input type="text" name="userStatus" style="width:100%;"/>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:10%;"></div>
			<div style="width:35%;" class="d-inline-flex flex-row align-items-center border border-1 border-danger">
				<div style="width:100%;" class="p-0 d-inline-flex flex-row align-items-center">
					<div style="width:30%; display:flex; align-items:center;">
						<svg style="width:4px; height:4px; margin: 0px 5px;"><rect width="4px" height="4px" fill="#222E3C" /></svg>
						<span class="font-weight-bold" style="font-size:14px;">키워드</span>
					</div>
					<div class="border border-1 border-primary" style="width:70%; display:flex; align-items:center;">
						<div style="width:30%; font-size:14px;">
							<label for="keywordCategory"></label> 
							<select id="keywordCategoty" name="keywordCategoty" style="width:90%">
								<option value="userName" selected>이름</option>
								<option value="userTelno">전화번호</option>
								<option value="userEmail">이메일</option>
							</select>
						</div>
						<div class="p-0 m-0" style="width:70%">
							<label for="keywordContent"></label>
							<input type="text" id="keywordContent" name="keywordContent" style="width:95%;"/>
						</div>
					</div>
				</div>
			</div>
			<div class="border border-1" style="width:5%;"></div>
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