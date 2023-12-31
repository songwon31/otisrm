$(init);

var personalEditUsrIdDuplicationCheck = false;

function init() {
	$("#modalUsrId").keyup(function() {
		personalEditUsrIdDuplicationCheck = false;
	});
}

function submitPassword() {
	let password = $('#password').val();
	
	$.ajax({
		type: "POST",
		url: "/otisrm/checkPassword",
		data: {password: password},
		success: function(result) {
			if (result == true) {
				$('#password').val('');
				$("#identificationModal").modal("hide");
				
				editPersonalInfoModalInit();
        		$("#editPersonInfoModal").modal("show");
			} else {	
				$('#password').val('');
				$('#footerWarningContent').html("비밀번호가 일치하지 않습니다!");
        		$("#footerWarningModal").modal("show");
			}
		}
	});
}

function editPersonalInfoModalInit() {
	$.ajax({
		type: "POST",
		url: "/otisrm/getEditPersonalInfoConfig",
		success: function(data) {
			/*
			$('#modalUsrId').val(data.usrId);
			$('#modalUsrNm').val(data.usrNm);
			*/
			$('#footerModalUsrEml').val(data.usrEml);
			$('#footerModalUsrTelno').val(data.usrTelno);
			/*
			for (let i=0; i<data.deptList.length; ++i) {
				let dept = data.deptList[i];
				let html = '<option value="' + dept.deptNo + '">' + dept.deptNm + '</option>';
				$('#modalUsrDept').append(html);
			}
			$('#modalUsrDept').val(data.deptNo);
			
			for (let i=0; i<data.roleList.length; ++i) {
				let role = data.roleList[i];
				let html = '<option value="' + role.roleNo + '">' + role.roleNm + '</option>';
				$('#modalUsrRole').append(html);
			}
			$('#modalUsrRole').val(data.roleNo);
			
			for (let i=0; i<data.ibpsList.length; ++i) {
				let ibps = data.ibpsList[i];
				let html = '<option value="' + ibps.ibpsNo + '">' + ibps.ibpsNm + '</option>';
				$('#modalUsrIbps').append(html);
			}
			$('#modalUsrIbps').val(data.ibpsNo);
			*/
		}
	});
}

function usrIdDuplicationCheck() {
	let newUsrId = $('#modalUsrId').val();
	if (newUsrId == '') {
		$('#modalUsrId').val('');
		$('#footerWarningContent').html("새 아이디를 입력하세요.");
		$("#footerWarningModal").modal("show");
		$('#modalUsrIdCondition').css('display', 'flex');
	} else {
		let pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
		let result = pattern.test(newUsrId);
		if (result == true) {
			$.ajax({
				type: "GET", 
				url: "/otisrm/join/getNumOfOverlapUsrId", 
				data: { usrId: newUsrId }, 
				success: function (data) {
					console.log(data);
					if(data === 0){
						personalEditUsrIdDuplicationCheck = true;
						$('#footerAlertContent').html("사용 가능한 아이디입니다.");
						$("#footerAlertModal").modal("show");
						$('#modalUsrIdCondition').css('display', 'none');
					}else{
						$('#modalUsrId').val('');
						$('#footerWarningContent').html("이미 존재하는 아이디입니다.");
						$("#footerWarningModal").modal("show");
						$('#modalUsrIdCondition').css('display', 'flex');
					}
		       },
				error: function (error) {
					console.error("오류 발생:", error);
				}
			});
		} else {
			$('#modalUsrId').val('');
			$('#footerWarningContent').html("형식에 맞지 않는 아이디입니다.");
			$("#footerWarningModal").modal("show");
			$('#modalUsrIdCondition').css('display', 'flex');
		}
	}
}

function editUsrId() {
	let newUsrId = $('#modalUsrId').val();
	if (newUsrId == '') {
		$('#modalUsrId').val('');
		$('#footerWarningContent').html("새 아이디를 입력하세요.");
		$("#footerWarningModal").modal("show");
		$('#modalUsrIdCondition').css('display', 'flex');
	} else {
		let pattern = /^[a-z]+[a-z0-9]{4,19}$/g;
		let result = pattern.test(newUsrId);
		if (result == true) {
			if (personalEditUsrIdDuplicationCheck == false) {
				$('#modalUsrId').val('');
				$('#footerWarningContent').html("중복 검사를 진행해주세요.");
				$("#footerWarningModal").modal("show");
				$('#modalUsrIdCondition').css('display', 'flex');
			} else {
				//아이디 변경
				$.ajax({
					type: "POST", 
					url: "/otisrm/editUsrId", 
					data: { newUsrId: newUsrId }, 
					success: function (data) {
						if (data == 1) {
							$('#footerAlertContent').html("아이디가 변경되었습니다.");
							$("#footerAlertModal").modal("show");
							$('#modalUsrIdCondition').css('display', 'none');
						} else {
							console.log("something wrong");
						}
			        }
				});
			}
		} else {
			$('#modalUsrId').val('');
			$('#footerWarningContent').html("형식에 맞지 않는 아이디입니다.");
			$("#footerWarningModal").modal("show");
			$('#modalUsrIdCondition').css('display', 'flex');
		}
	}
	
}

function editUsrPassword() {
	let currentUsrPassword = $('#modalCurrentUsrPassword').val();
	let newUsrPassword1 =  $('#modalNewUsrPassword1').val();
	let newUsrPassword2 =  $('#modalNewUsrPassword2').val();
	$.ajax({
		type: "POST",
		url: "/otisrm/checkPassword",
		data: {password: currentUsrPassword},
		success: function(result) {
			if (result == true) {
				if (newUsrPassword1 != newUsrPassword2) {
					$('#modalCurrentUsrPassword').val('');
					$('#modalNewUsrPassword1').val('');
					$('#modalNewUsrPassword2').val('');
					$('#footerWarningContent').html("새 비밀번호가 일치하지 않습니다!");
	        		$("#footerWarningModal").modal("show");
	        		$('#modalUsrPasswordCondition').css('display', 'flex');
				} else {
					let pattern = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
		    		let result = pattern.test(newUsrPassword1);
		    		if(result) {
		    			//비밀번호 변경
		    			$.ajax({
							type: "POST", 
							url: "/otisrm/editUsrPassword", 
							data: { newUsrPassword: newUsrPassword1 }, 
							success: function (data) {
								if (data == 1) {
									$('#modalCurrentUsrPassword').val('');
									$('#modalNewUsrPassword1').val('');
									$('#modalNewUsrPassword2').val('');
									$('#footerAlertContent').html("비밀번호가 변경되었습니다.");
									$("#footerAlertModal").modal("show");
									$('#modalUsrPasswordCondition').css('display', 'none');
								} else {
									console.log("something wrong");
								}
					        }
						});
		    		} else {
		    			$('#modalCurrentUsrPassword').val('');
						$('#modalNewUsrPassword1').val('');
						$('#modalNewUsrPassword2').val('');
						$('#footerWarningContent').html("형식에 맞지 않는 비밀번호입니다.");
		        		$("#footerWarningModal").modal("show");
		        		$('#modalUsrPasswordCondition').css('display', 'flex');
		    		}
				}
			} else {	
				$('#modalCurrentUsrPassword').val('');
				$('#modalNewUsrPassword1').val('');
				$('#modalNewUsrPassword2').val('');
				$('#footerWarningContent').html("기존 비밀번호가 일치하지 않습니다.");
        		$("#footerWarningModal").modal("show");
        		$('#modalUsrPasswordCondition').css('display', 'flex');
			}
		}
	});
}

function editUsrNm() {
	let newUsrNm = $('#modalUsrNm').val();
	if (newUsrNm === '') {
		$('#modalUsrNm').val('');
		$('#footerWarningContent').html("새 이름을 입력하세요.");
		$("#footerWarningModal").modal("show");
		$('#modalUsrNmCondition').css('display', 'flex');
	} else {
		let pattern =/^[가-힣]{2,20}|[a-zA-Z]{2,20}\s[a-zA-Z]{2,20}$/;
		let result = pattern.test(newUsrNm);
		if (result) {
			//이름 변경
			$.ajax({
				type: "POST", 
				url: "/otisrm/editUsrNm", 
				data: { newUsrNm: newUsrNm }, 
				success: function (data) {
					if (data == 1) {
						$('#footerAlertContent').html("이름이 변경되었습니다.");
						$("#footerAlertModal").modal("show");
						$('#modalUsrNmCondition').css('display', 'none');
					} else {
						console.log("something wrong");
					}
		        }
			});
		} else {
			$('#modalUsrNm').val('');
			$('#footerWarningContent').html("형식에 맞지 않는 이름입니다.");
			$("#footerWarningModal").modal("show");
			$('#modalUsrNmCondition').css('display', 'flex');
		}
	}
}

function editUsrEml() {
	let newEml = $('#footerModalUsrEml').val();
	if(newEml === "") {
		$('#footerModalUsrEml').val('');
		$('#footerWarningContent').html("새 이메일을 입력하세요.");
		$("#footerWarningModal").modal("show");
		$('#footerModalUsrEmlCondition').css('display', 'flex');
	} else {
		let pattern = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
		let result = pattern.test(newEml);
		if(!result) {
			$('#footerModalUsrEml').val('');
			$('#footerWarningContent').html("형식에 맞지 않는 이메일입니다.");
			$("#footerWarningModal").modal("show");
			$('#footerModalUsrEmlCondition').css('display', 'flex');
		} else {
			//이메일 변경
			$.ajax({
				type: "POST", 
				url: "/otisrm/editUsrEml", 
				data: { newUsrEml: newEml }, 
				success: function (data) {
					if (data == 1) {
						$('#footerAlertContent').html("이메일이 변경되었습니다.");
						$("#footerAlertModal").modal("show");
						$('#footerModalUsrEmlCondition').css('display', 'none');
					} else {
						console.log("something wrong");
					}
		        }
			});
		}
	}
	
}

function editUsrTelno() {
	let newUsrTelno = $('#footerModalUsrTelno').val();
	if (newUsrTelno == '') {
		$('#footerModalUsrTelno').val('');
		$('#footerWarningContent').html("새 전화번호를 입력하세요.");
		$("#footerWarningModal").modal("show");
		$('#footerModalUsrTelnoCondition').css('display', 'flex');
	} else {
		let pattern = /^(01[016789]{1})-?[0-9]{3,4}-?[0-9]{4}$/;
		let result = pattern.test(newUsrTelno);
		if (result) {
			$.ajax({
				type: "POST", 
				url: "/otisrm/editUsrTelno", 
				data: { newUsrTelno: newUsrTelno }, 
				success: function (data) {
					if (data == 1) {
						$('#footerAlertContent').html("전화번호가 변경되었습니다.");
						$("#footerAlertModal").modal("show");
						$('#footerModalUsrTelnoCondition').css('display', 'none');
					} else {
						console.log("something wrong");
					}
		        }
			});
		} else {
			$('#footerModalUsrTelno').val('');
			$('#footerWarningContent').html("형식에 맞지 않는 전화번호입니다.");
			$("#footerWarningModal").modal("show");
			$('#footerModalUsrTelnoCondition').css('display', 'flex');
		}
	}
}

function editUsrDept() {
	//부서 변경
	let newDeptNo = $('#modalUsrDept').val();
	$.ajax({
		type: "POST", 
		url: "/otisrm/editUsrDept", 
		data: { newDeptNo: newDeptNo }, 
		success: function (data) {
			if (data > 0) {
				$('#footerAlertContent').html("부서가 변경되었습니다.");
				$("#footerAlertModal").modal("show");
				$('#modalUsrDeptCondition').css('display', 'none');
			} else {
				$('#footerWarningContent').html("진행중인 SR건이 존재하여 부서를 변경할 수 없습니다.");
				$("#footerWarningModal").modal("show");
				$('#modalUsrDeptCondition').css('display', 'flex');
			}
        }
	});
}

function editUsrRole() {
	//직책 변경
	let newRoleNo = $('#modalUsrRole').val();
	$.ajax({
		type: "POST", 
		url: "/otisrm/editUsrRole", 
		data: { newRoleNo: newRoleNo }, 
		success: function (data) {
			if (data == 1) {
				$('#footerAlertContent').html("직책이 변경되었습니다.");
				$("#footerAlertModal").modal("show");
			} else {
				console.log("something wrong");
			}
        }
	});
}

function editUsrIbps() {
	//직위 변경
	let newIbpsNo = $('#modalUsrIbps').val();
	$.ajax({
		type: "POST", 
		url: "/otisrm/editUsrIbps", 
		data: { newIbpsNo: newIbpsNo }, 
		success: function (data) {
			if (data == 1) {
				$('#footerAlertContent').html("직위가 변경되었습니다.");
				$("#footerAlertModal").modal("show");
			} else {
				console.log("something wrong");
			}
        }
	});
}

function usrWhdwl() {
	$.ajax({
		type: "POST", 
		url: "/otisrm/usrWhdwl", 
		success: function (data) {
			if (data > 0) {
				let csrfParameter = "${_csrf.parameterName}";
			    let csrfToken = "${_csrf.token}"; 
			    $.post({
			        url: "/otisrm/logout",
			        data: csrfParameter + "=" + csrfToken,
			        success: function(data) {
			        	window.location.href = "/otisrm/login";
			        }
			    });
			} else {
				$('#footerWarningContent').html("진행중인 SR건이 존재하여 탈퇴할 수 없습니다.");
				$("#footerWhdwlModal").modal("hide");
				$("#footerWarningModal").modal("show");
			}
        }
	});
}
