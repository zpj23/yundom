<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script>
// 动态维护datagrid列数据
var colArray=[
	{XINGMING: '姓名'},
	{ITEMNAME: '性别'},
	{SHENFENZHENG: '身份证'},
	{NIANLING: '年龄'},
	{YIDONGDIANHUA: '手机'},
	{BEIZHU: '备注'}
],selObj={};

$(function() {
	bindData();
});

function forxinbie(value, rowData, rowIndex){
	return value;
}

function bindData(){
	// datagrid列数组
	var columnArray = [{field:'ID',checkbox:true},{field:'XINGBIE',hidden:true}];
	$.each(colArray,function(colk,colv){
		$.each(colv,function(objk,objv){
			var colObj = {field:objk, title:objv, width:200, align:'left'};
			if(objk=='XINGBIE'){
				colObj['formatter']='forxinbie(value, rowData, rowIndex) ';
			}
			//console.log(colObj);
			columnArray.push(colObj);
		})
	})
	
	$('#datagrid').datagrid({
		columns:[columnArray],
		url:  'DialogAction_jsonData?type='+$('#type').val(),
		onCheck:function(rowIndex,rowData){
			selObj = rowData;
		}
	});
}


function searchSwry(){
	$('#datagrid').datagrid('load', {
		selectname : $("#selectname").val()
	});
}
</script>
</head>
<body>
 <s:hidden name="type" id="type"></s:hidden>
 <div class="easyui-layout">
    <div id="toolbar" class="datagrid-toolbar">
					<div id="wu-toolbar-2">
						<div class="wu-toolbar-search">
							<span> <label> 用户名称： </label>
								<input name="selectname"  id="selectname"   />
							</span>
							 <a class="easyui-linkbutton" iconCls="icon-search"
								id="tool_query1" plain="true" onclick="searchSwry();"
								href="javascript:void(0);">开始检索</a>
						</div>
					</div>
				</div> 
 
	<table id="datagrid"  fit="true" fitColumns="true" style="height:auto; width:auto;"  toolbar="#toolbar"  title=""
				 pageSize="15"  border="false" rownumbers="false" singleSelect="true" pagination="true">
	</table>
</div> 
</body>
</html>