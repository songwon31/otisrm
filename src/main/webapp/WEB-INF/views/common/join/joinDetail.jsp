<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
	<head>
		<script>
			function fn_agree1(val) {
				window.parent.postMessage({ agree1: val }, '*');
			};
			function fn_agree2(val) {
				window.parent.postMessage({ agree2: val }, '*');
			};
			function fn_agree3(val) {
				window.parent.postMessage({ agree3: val }, '*');
			};	
		</script>       	
       	
    </head>
    <body>
    	<table style="border-collapse:collapse;">
            <tbody>
            	<tr>
            		<td>
            			<div> ■ 본 시스템은 회원에게만 제공되는 서비스로 회원가입을 통해 신청자에 관한 개인정보를 일부 수집∙이용하고 있습니다.</div>
						<div>■ 개인정보 처리에 대한 상세한 사항은 홈페이지(https://www.otisrm.com/)에 공개한 '개인정보 처리방침'을 참조하십시오.</div>
						<div>다만, 본 동의서 내용과 상충되는 부분은 본 동의서의 내용이 우선합니다.</div>
            		</td>
            	</tr>            	      	
            <tr>
            	<td>
						<div>□ 개인정보 수집∙이용 내역(필수)</div><br>
							<table border="1" bgcolor="#bcbcbc" width="900px" style="border-collapse:collapse; border:1px gray solid;">
								<tbody>
									<tr bgcolor="#ffffff" height="30px">
										<td align="center" bgcolor="#bcbcbc" width="150px" colspan="2">구분</td>
										<td align="center" bgcolor="#bcbcbc" width="350px">항목</td>
										<td align="center" bgcolor="#bcbcbc" width="200px">수집∙이용 목적</td>
										<td align="center" bgcolor="#bcbcbc" width="200px">보유∙이용 기간</td>
									</tr>
								  	<tr bgcolor="#ffffff" height="30px">
										<td align="center" rowspan="3" width="75px">거래처유형</td>
										<td align="center" width="75px">공통</td>
										<td align="center">아이디, 이름</td>
										<td align="left" rowspan="4"><!-- 회원가입을 위한 개인식별<br>이용자의 사용유형 확인 및 <br>고지사항 전달, 불만처리 등을 위한 의사소통 경로 확보<br>세메스 사내시스템 운영을 위한 데이터 연계 -->
											<ul style="padding-left:15px;">
												<li>회원가입을 위한 개인식별</li>
												<li>이용자의 사용유형 확인 및 고지사항 전달</li>
												<li>불만처리 등을 위한 의사소통 경로 확보</li>
												<li>세메스 사내시스템 운영을 위한 데이터 연계(내부 업무처리용)</li>
											</ul>
										</td>		
										<td align="center" rowspan="3" style="text-decoration:underline">
											<b>회원탈퇴 시 파기,<br>1년이상 미 접속 시 파기</b>
										</td>	
									</tr>
									<tr bgcolor="#ffffff" height="30px">
										<td align="center">SEMES</td>
										<td align="center">거래처유형(SEMES/SEMES외),<br>협력사(국가, 사업자번호, 업체명, 대표자명),<br>이메일, 휴대전화번호</td>	
									</tr>
									<tr bgcolor="#ffffff" height="30px">
										<td align="center">SEMES 외</td>
										<td align="center">거래처유형(SEMES/SEMES외),<br>협력사(국가, 사업자번호, 업체명, 대표자명),<br>이메일, 휴대전화번호, 거래처, 거래처담당자</td>	
									</tr>
								</tbody>
							</table>
							<div class="d-flex justify-content-start">							
								※ 귀하께서는 본 개인정보 수집·이용에 대한 동의를 거부하실 수 있으나, 이는 서비스 제공에 
								필수적으로 제공되어야 하는 정보이므로, 동의를 거부하실 경우 회원 가입을 하실 수 없습니다.
							</div>
	            		</td>
	            	</tr>
		            <tr>
		            	<td align="left"> 
							<form name="frm" style="padding-top: 1%;"> 
								<input type="radio" class="agree" name="agree1" id="chk1" value="Y" onclick="fn_agree1('Y');"> 개인정보의 수집 및 이용에 동의합니다.
							</form>
		            	</td>
		            </tr>
		            <tr>
		            	<td align="left"> 
							<form name="frm"> 
								<pre><input type="radio" class="agree" name="agree3" id="chk3" value="Y" onclick="fn_agree3('Y');"> 본인은 <b>만 14세 이상</b>입니다.</pre> 
							</form>
		            	</td>
		            </tr>            
	           		<tr>
	            		<td>
							<input class="agree" type="checkbox" checked="checked" name="remember"> 개인정보 수집∙이용 내역(선택)<br>
							<table border="1" bgcolor="#bcbcbc" width="900px" style="border-collapse:collapse; border:1px gray solid;">
								<tbody>
									<tr bgcolor="#ffffff" height="30px">
										<td align="center" bgcolor="#bcbcbc" width="150px" colspan="2">구분</td>
										<td align="center" bgcolor="#bcbcbc" width="350px">항목</td>
										<td align="center" bgcolor="#bcbcbc" width="200px">수집∙이용 목적</td>
										<td align="center" bgcolor="#bcbcbc" width="200px">보유∙이용 기간</td>
									</tr>
									<tr bgcolor="#ffffff" height="40px">
										<td align="center" width="75px">거래처유형</td>
										<td align="center" width="75px">공통</td>
										<td align="center">이름(영문), 전화번호, FAX 번호</td>	
										<td align="center">새로운 서비스 및 정보 등의 안내</td>		
										<td align="center" style="text-decoration:underline"><b>회원탈퇴 시 파기,<br>1년 이상 미 접속 시 파기</b></td>	
									</tr>
								</tbody>
							</table>
							<div class="">							
								※ 귀하께서는 본 선택항목 수집·이용에 대한 동의를 거부하시는 경우에도 SRM 협업시스템 서비스를 
								이용하실 수 있습니다.
							</div>
	            	    </td>
		            <tr>
		            	<td align="left"> 
							<form action=""> 
							<div class="d-flex justify-content-start">							
								<input type="radio"  class="agree" name="agree2" id="chk2" value="Y" onclick="fn_agree2('Y');"> 개인정보의 수집 및 이용에 동의합니다.</pre> 
							</div>
							</form>
		            	</td>
		            </tr>                       	           
			</tbody>
		</table>
	</body>
</html>