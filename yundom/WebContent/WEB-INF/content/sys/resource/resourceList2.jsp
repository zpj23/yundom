<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title></title>
		<link rel="stylesheet" type="text/css" href="css/Default.css" />		
		<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
		<script type="text/javascript" src="js/sys/resource/resource.js"></script>
		<script type="text/javascript" src="js/comm/jsstyle.js"></script>
		<script type="text/javascript">
	window.onload = function() {
		stripeTable();
		highlightRows();
	}
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

			</div>
		</div>
		<form method="post" id="form1" action="">
			<div class="RightConter" id="RightConter">
				<div class="TableList">
					<div class="TableListSearch">
						<div class="Left">
							<a href="javascript:addRes()">新增</a>
							<a href="javascript:modifyRes()">修改</a>
							<a href="javascript:delRes()">删除</a>
							<a href="javascript:viewRes()">查看</a>
							<a href="javascript:selectList()">返回</a>
							<input type="hidden" name="pid" id="pid" value="${pid}" />
						</div>
						<div class="Right">
							<input type="text" class="text_1" name="selectName"
								value="${selectName}" />
							<input type="button" class="submit_1" onclick="selectList2()" />
						</div>
					</div>
					<div class="TableListMain" id="TableListMain">
						<table border="0" cellpadding="0" cellspacing="0">
							<tr>
								<th width="10%">
									<input type="checkbox" title="全选"
										onclick="allCheck('checkboxId')" />
								</th>
								<th width="35%">
									名称
								</th>
								<th width="35%">
									代码
								</th>
								<th width="20%">

								</th>
							</tr>
							<c:forEach items="${listData}" var="a">
								<tr>
									<td>
										<input type="checkbox" name="checkid" class="checkboxId"
											value="${a[0]}" />
									</td>
									<td>
										<a href="javascript:viewRes2('${a[0]}')">${a[1]}</a>
									</td>
									<td>
										${a[2]}
									</td>
									<td>
										<a href="resourceAction_toSetDetail?pid=${a[0]}">字典配置</a>
									</td>
								</tr>
							</c:forEach>
						</table>
					</div>
					<div>
						<jsp:include page="/setPage.jsp"></jsp:include>
					</div>
				</div>
			</div>
		</form>
	</body>
</html>