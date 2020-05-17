<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<link rel="stylesheet" type="text/css" href="css/Default.css" />		
		<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
		<script type="text/javascript" src="js/sys/resource/resource.js"></script>
		<script type="text/javascript" src="js/comm/jsstyle_form.js"></script>
		<script type="text/javascript">
	$().ready(function() {
		var level = ${restype.parentTypeid};
		
		if (level != 0) {
			$("#level2tr").css("display", "");
		}
	});
</script>
	</head>
	<body style="height: 100%;">
		<div class="LeftConter" id="LeftConter">
			<div class="Menu_1">
				<div class="Title">
					<span><img src="Img/ICO/1.png" /> </span>
					<label>
						数据字典
					</label>
				</div>
				<div class="Main">
				</div>
			</div>
		</div>

		<div class="RightConter" id="RightConter">
			<div class="Form">
				<form action="" method="post" id="form1">
					<div class="FormTitle">
						<div class="Left"></div>
						<div class="Right">
							<a href="javascript:back()">返回</a>
						</div>
					</div>

					<div class="FormMain" id="FormMain">
						<table border="0" cellpadding="0" cellspacing="1">
							<tr>
								<th width="10%">
									类型名称
								</th>
								<td>
									${restype.typeName}
								</td>
							</tr>

							<tr>
								<th>
									类型代码
								</th>
								<td>
									${restype.typeCode}
								</td>
							</tr>

							<tr>
								<th>
									类型级别
								</th>
								<td>
									<c:if test="${restype.parentTypeid eq 0}">一级</c:if>
									<c:if test="${restype.parentTypeid ne 0}">二级</c:if>
								</td>
							</tr>

							<tr id="level2tr" style="display: none">
								<th>
									类型上级
								</th>
								<td>
									${parentName}
								</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
		</div>
	</body>
</html>