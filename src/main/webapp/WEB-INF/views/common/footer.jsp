<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<head>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/common/footer.css" />
	<!-- javascript 코드 -->
	<script src="${pageContext.request.contextPath}/resources/javascript/common/footer.js"></script>
</head>

				</div>
			</div>
		</div>
   </body>
</html>

<!-- 본인확인 모달 -->
<div id="identificationModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm" style="width:100rem;">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">본인 확인</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="editPersonalInfoEnterMiddleDiv" style="display:flex; flex-direction:column; align-items:center; padding:1rem;">
					<div>개인정보 보호를 위해 비밀번호를 확인합니다.</div>
					<div style="width:100%; display:flex; align-items:center; margin: 0.5rem 0;">
						<div style="height:3rem; display:flex; align-items:center;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">비밀번호</span>
						</div>
						<div style="flex-grow:1; display:flex; align-items:center; padding:0; margin:0;">
							<input type="password" id="password" name="password" style="width:100%; margin-left:0.5rem;"/>
						</div>
					</div>
					<button id="submitPasswordButton" onclick="submitPassword()"
							style="height:3rem; width:15%; font-weigth:700; margin-left:1rem; align-self:flex-end; border:none; border-radius:5px; background-color: #222E3C; color:white">
						확인
					</button>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 개인정보 수정 모달 -->
<div id="editPersonInfoModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered">
		<div class="modal-content">
			<div class="modal-header">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">개인정보수정</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="editPersonalInfoMiddleDiv" style="display:flex; flex-direction:column; align-items:center;">
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">아이디</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<input id="modalUsrId" type="text" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
						</div>
						<div style="height: 4rem; padding-left: 0.5rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrIdDuplicationCheckButton" onclick="usrIdDuplicationCheck()" style=" background-color:gray;">
								중복검사
							</button>
						</div>
						<div id="srPlanInfoDmnd" style="height: 4rem; padding-left: 0.5rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrIdEditButton" onclick="editUsrId()">
								아이디 변경
							</button>
						</div>
					</div>
					<div style="height: 16rem; width:100%; display: flex; flex-direction: row;">
						<div style="height: 16rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">비밀번호</span>
						</div>
						<div style="height:16rem; width:80%; display: flex; flex-direction: column; justify-content:center;">
							<div style="height: 4rem; width: 100%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">
								<div style="height: 4rem; width: 25%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">현재 비밀번호</div>
								<div style="height: 4rem; width: 40%; padding-left: 0.5rem; display: flex; align-items: center;">
									<input id="modalCurrentUsrPassword" type="password" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
								</div>
							</div>
							<div style="height: 4rem; width: 100%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">
								<div style="height: 4rem; width: 25%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">새 비밀번호</div>
								<div style="height: 4rem; width: 40%; padding-left: 0.5rem; display: flex; align-items: center;">
									<input id="modalNewUsrPassword1" type="password" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
								</div>
							</div>
							<div style="height: 4rem; width: 100%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">
								<div style="height: 4rem; width: 25%; font-weight:700; padding-left: 0.5rem; display: flex; align-items: center;">새 비밀번호 재입력</div>
								<div style="height: 4rem; width: 40%; padding-left: 0.5rem; display: flex; align-items: center;">
									<input id="modalNewUsrPassword2" type="password" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
								</div>
							</div>
							<div style="height: 4rem; width: 23%; padding-left: 1rem; display: flex; align-items: center;">
								<button type="button" id="modalUsrPasswordEditButton" onclick="editUsrPassword()">
									비밀번호 변경
								</button>
							</div>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">이름</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<input id="modalUsrNm" type="text" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrNmEditButton" onclick="editUsrNm()" style="width:35%;">
								이름 변경
							</button>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">이메일</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<input id="modalUsrEml" type="text" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrEmlEditButton" onclick="editUsrEml()" style="width:35%;">
								이메일 변경
							</button>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">전화번호</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<input id="modalUsrTelno" type="text" value="" style="width:100%; height:3rem; margin:0 0 0 0.5rem;">
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrTelnoEditButton" onclick="editUsrTelno()" style="width:35%;">
								전화번호 변경
							</button>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">부서</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<select id="modalUsrDept" name="modalUsrDept" style="width:100%; margin-left:0.5rem; padding:1px;">
							</select>
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrDeptEditButton" onclick="editUsrDept()" style="width:35%;">
								부서 변경
							</button>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">직책</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<select id="modalUsrRole" name="modalUsrRole" style="width:100%; margin-left:0.5rem; padding:1px;">
							</select>
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrRoleEditButton" onclick="editUsrRole()" style="width:35%;">
								직책 변경
							</button>
						</div>
					</div>
					
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; width: 20%; padding-left: 0.5rem; display: flex; align-items: center; background-color: #f9fafe; font-weight:700;">
							<svg style="width:0.5rem; height:0.5rem; margin: 0rem 0.5rem;"><rect width="0.5rem" height="0.5rem" fill="#222E3C" /></svg>
							<span style="font-size:1.6rem; font-weight:700;">직위</span>
						</div>
						<div style="height: 4rem; width: 30%; padding-left: 0.5rem; display: flex; align-items: center;">
							<select id="modalUsrIbps" name="modalUsrIbps" style="width:100%; margin-left:0.5rem; padding:1px;">
							</select>
						</div>
						<div style="flex-grow:1; height: 4rem; padding-left: 1rem; display: flex; align-items: center;">
							<button type="button" id="modalUsrIbpsEditButton" onclick="editUsrIbps()" style="width:35%;">
								직위 변경
							</button>
						</div>
					</div>
					<div style="width:100%; display: flex; flex-direction: row;">
						<div style="height: 4rem; padding-left: 0.5rem; display: flex; align-items: center;">
							<button type="button" id="whdwlButton" data-toggle="modal" data-target="#whdwlModal" style="background-color:red;">
								회원탈퇴
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 알림 모달 -->
<div id="alertModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:#2c7be4; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="alertContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 경고 모달 -->
<div id="warningModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:red; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">경고</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem;">
				<div id="warningContent" style="height:11rem; font-size:1.7rem; font-weight:700; display:flex; justify-content:center; align-items:center; white-space: pre-wrap;">
					
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 탈퇴 모달 -->
<div id="whdwlModal" class="modal" data-backdrop="static">
	<div class="modal-dialog modal-dialog-centered modal-sm">
		<div class="modal-content">
			<div class="modal-header" style="background-color:red; color:white; display:flex;">
				<div class="modal-title" style="font-size:2rem; font-weight:700;">회원탈퇴</div>
				<i class="material-icons close-icon" data-dismiss="modal" style="cursor: pointer;">close</i>
			</div>
			<div class="modal-body" style="margin:0px; padding:0px; font-size:1.5rem; padding:2rem;">
				<div id="whdwlContent" style="font-size:1.7rem; font-weight:700; display:flex; flex-direction:column; justify-content:center; align-items:center; white-space: pre-wrap;">
					<div>정말 탈퇴하시겠습니까?</div>
					<div style="width: 100%; margin-top:1rem; font-size:1.7rem; font-weight:700; display:flex; align-items:center; justify-content:center;">
						<a href="javascript:void(0)" onclick="usrWhdwl()" style="width:20%; height:3rem; background-color:red; color:white; display:flex; justify-content:center; align-items:center; border-radius:5px;">
							<span>탈퇴</span>
						</a>
						<a href="javascript:void(0)" data-dismiss="modal" style="width:20%; height:3rem; background-color:#2c7be4; margin-left:2rem; color:white; display:flex; justify-content:center; align-items:center; border-radius:5px;">
							<span>취소</span>
						</a>
					</div>
				</div>
				
			</div>
		</div>
	</div>
</div>
