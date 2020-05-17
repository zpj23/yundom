<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http：//www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
	</head>
	<body>
	   
		<div class="easyui-panel" style="width:600px;height:350px;">		
			<img alt="显示图片" src="/Core/uploadfileAction_viewImages?id=${id}"></img>
		</div>
		<div class="dialog-button" style="text-align:center;padding:5px">
		    	<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-close" onclick="back();">关闭</a>
	        </div>   
		<script>
		//返回
		function back(){
			window.parent.Dialog.CloseWindow();
		}
		</script>
	</body>
</html>