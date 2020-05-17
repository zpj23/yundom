<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
	<head>
		<title>提示</title>	
		<style type="text/css">
<!--
BODY {
	PADDING-RIGHT: 0px;
	PADDING-LEFT: 0px;
	FONT-SIZE: 9pt;
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	COLOR: #000000;
	LINE-HEIGHT: 120%;
	PADDING-TOP: 0px;
	FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif
}

TD {
	FONT-SIZE: 9pt;
	WORD-BREAK: normal;
	LINE-HEIGHT: 120%;
	FONT-FAMILY: Verdana, Arial, Helvetica, sans-serif;
	WORD-WRAP: break-word
}

IMG {
	BORDER-RIGHT: 0px;
	BORDER-TOP: 0px;
	BORDER-LEFT: 0px;
	BORDER-BOTTOM: 0px
}

FORM {
	PADDING-RIGHT: 0px;
	PADDING-LEFT: 0px;
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	PADDING-TOP: 0px
}

BUTTON {
	PADDING-RIGHT: 0px;
	PADDING-LEFT: 0px;
	PADDING-BOTTOM: 0px;
	MARGIN: 0px;
	PADDING-TOP: 0px
}

A {
	COLOR: #0042bd;
	TEXT-DECORATION: underline
}

A:hover {
	COLOR: #0042bd;
	TEXT-DECORATION: none
}

.commend_input {
	BORDER-RIGHT: #c9c9c9 1px solid;
	BORDER-TOP: #808080 1px solid;
	FONT-SIZE: 9pt;
	VERTICAL-ALIGN: middle;
	BORDER-LEFT: #808080 1px solid;
	WIDTH: 98%;
	COLOR: #000000;
	BORDER-BOTTOM: #c9c9c9 1px solid;
	FONT-FAMILY: Verdana;
	BACKGROUND-COLOR: #f5f5f5
}

.bule_table {
	MARGIN-BOTTOM: 1px;
	WIDTH: 570px;
	BACKGROUND-COLOR: #3971ad
}

.title_table {
	BORDER-RIGHT: #3971ad 1px solid;
	PADDING-LEFT: 10px;
	BORDER-LEFT: #3971ad 1px solid;
	WIDTH: 570px;
	COLOR: #000000;
	BORDER-BOTTOM: #6b697b 1px solid;
	HEIGHT: 25px;
	BACKGROUND-COLOR: #efeff7
}

.body_table {
	BORDER-RIGHT: #3971ad 1px solid;
	BACKGROUND: #ffffff;
	BORDER-LEFT: #3971ad 1px solid;
	WIDTH: 570px;
	BORDER-BOTTOM: #6b697b 1px solid
}

.commend_button {
	BORDER-RIGHT: #000000 1px solid;
	BORDER-TOP: #999999 1px solid;
	FONT-SIZE: 9pt;
	BORDER-LEFT: #999999 1px solid;
	CURSOR: pointer;
	COLOR: #000000;
	PADDING-TOP: 3px;
	BORDER-BOTTOM: #000 1px solid;
	BACKGROUND-COLOR: #eeeeee
}

.title {
	COLOR: #006db3
}

.commend_text {
	FONT-WEIGHT: bold;
	FONT-SIZE: 16px;
	COLOR: #3971ad;
	LINE-HEIGHT: 150%;
	LETTER-SPACING: 2px
}

.wrong_type {
	FONT-SIZE: 14px;
	COLOR: #000000
}

.button {
	BORDER-RIGHT: #000000 1px solid;
	BORDER-TOP: #999999 1px solid;
	FONT-SIZE: 9pt;
	BORDER-LEFT: #999999 1px solid;
	CURSOR: pointer;
	COLOR: #000000;
	PADDING-TOP: 3px;
	BORDER-BOTTOM: #000 1px solid;
	BACKGROUND-COLOR: #eeeeee
}
-->
</style>
		<script type="text/javascript" language="javascript">
			function returnTo(nextURL,whichPage){
				if(whichPage=='parent'){
					parent.window.location.href=nextURL;	
				}else if(whichPage=='pparent'){
					parent.window.parent.window.location.href=nextURL;	
				}else if(whichPage=='close'){
					window.close();	
				}else{
					window.location.href=nextURL;
				}
			}
			
	      	var n=2;
			setInterval(function() {
				var nextURL='${nextURL}';
				var whichPage ='${whichPage}';
				document.all.s1.innerText=n;
				if(n==0){
					returnTo(nextURL,whichPage);
				}else{
					n--;
				}
	      	 }, 1000) ;
		</script>
	</head>
	<body onselectstart="return false" oncontextmenu="window.event.returnValue=false">
		<div class="center">
			<table width="100%" height="100%" border="0" cellpadding="0"
				cellspacing="0">
				<tr>
					<td align="center" valign="middle">
						<table cellspacing="0" cellpadding="0" width="570" align="center"
							border="0">
							<tbody>
								<tr>
									<td>
										<table class="bule_table" style="MARGIN: 0px" cellspacing="0"
											cellpadding="0" align="center" border="0">
											<tbody>
												<tr>
													<td width="12">
														<img height="28" src="images/background/left_corner.gif"
															width="12" />
													</td>
													<td width="73">
														<img height="21" src="images/background/wrong1.gif"
															width="75" />
													</td>
													<td width="473"></td>
													<td width="12">
														<img height="28" src="images/background/right_corner.gif"
															width="12" />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
								<tr>
									<td
										style="BORDER-RIGHT: #a2bcd8 1px solid; BORDER-LEFT: #a2bcd8 1px solid"
										valign="top" align="center" height="297";>
										<table style="MARGIN-TOP: 60px" cellspacing="2"
											cellpadding="0" width="82%" border="0">
											<tbody>
												<tr>
													<td style="PADDING-BOTTOM: 3px; PADDING-TOP: 3px"
														valign="top" width="137">
														<img height="128" src="images/background/Completed.gif"
															width="128" />
													</td>
													<td
														style="PADDING-LEFT: 5px; PADDING-BOTTOM: 3px; PADDING-TOP: 3px"
														valign="top" align="left" width="323">
														<table cellspacing="12" cellpadding="0">
															<tr>
																<td 　class="wrong_type">
																	<strong>系统提示：</strong>
																</td>
															</tr>
															<tr>
																<td class="wrong_type"
																	style="PADDING-LEFT: 16px; PADDING-TOP: 7px; color: #3F7F5F;">
																	${msg}
																</td>
															</tr>
															<tr>
																<td class="wrong_type"
																	style="PADDING-LEFT: 16px; PADDING-TOP: 13px; color: #3F7F5F;">
																	页面&nbsp;
																	<span id="s1">3</span>&nbsp;秒后自动调转...
																	
																																		
																		<input type="button" size="8" class="btn"
																			name="backhome" style="cursor: pointer;"
																			value=" 确 定 "
																			onclick="returnTo('${nextURL}','${whichPage}');">																								
																</td>
																
															</tr>
														</table>
													</td>
												</tr>
											</tbody>
										</table><!--
										<table cellspacing="0" cellpadding="0" width="82%" border="0">
											<tbody>
												<tr>
													<td>
														<div align="center">
															<input type="button" size="8" class="btn"
																name="backhome" style="cursor: pointer;" value=" 确 定 "
																onclick="returnTo('${nextURL}','${whichPage}');">
														</div>
													</td>
												</tr>
											</tbody>
										</table>
									--></td>
								</tr>
								<tr>
									<td valign="middle" align="center">
										<table class="bule_table" cellspacing="0" cellpadding="0"
											width="570" align="center" border="0">
											<tbody>
												<tr>
													<td width="12">
														<img height="21" src="images/background/left_corner_2.gif"
															width="12" />
													</td>
													<td width="546">
														&nbsp;
													</td>
													<td width="12">
														<img height="21"
															src="images/background/right_corner_2.gif" width="12" />
													</td>
												</tr>
											</tbody>
										</table>
									</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
			</table>
		</div>
	</body>
</html>