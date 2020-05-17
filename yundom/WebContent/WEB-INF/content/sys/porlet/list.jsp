<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>栏目管理</title>
<script>

function deal(type) {
	if(type=='add'){
		common.openWindow('新增', 'PorletAction_toDeal?type=add', 900, 690);		
	}
	else if(type=='update'){
		var checkedItems = $('#datagrid').datagrid('getChecked');
		var ids = [];
		$.each(checkedItems, function(index, item){
			ids.push(item.id);
		});   

		common.openWindow('编辑', 'PorletAction_toDeal?type=update&id='+ids, 900, 790);		
	}
	else if(type=='del'){
		var checkedItems = $('#datagrid').datagrid('getChecked');
		var ids = [];
		$.each(checkedItems, function(index, item){
			ids.push(item.id);
		});               
		if(ids.join(",").length==0){
			$.messager.alert('提示', '请选择要删除的记录！', 'error');
		}
		else{
			 $.messager.confirm('提示', '确实要删除这些记录吗?', function(r){
				if (r){
						location.href='PorletAction_toDeal?type=del&id='+ids.join(",");
				}
			 });
		 }
	}
}
</script>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<div data-options="region:'north',split:false,border:false">
		<div class="panel pd3" style="background-color:#E6EEF8;">
			<div class="panel-header">
				<a href="#" class="easyui-linkbutton" iconCls="icon-add" onclick="deal('add');" plain="true">新增</a>
				<span class="ge"></span>
				<a href="#" class="easyui-linkbutton" iconCls="icon-edit" onclick="deal('update');" plain="true">修改</a>
				<span class="ge"></span>
				<a href="#" class="easyui-linkbutton" iconCls="icon-remove" onclick="deal('del');" plain="true">删除</a>
				<span class="ge"></span>
				<a href="#" class="easyui-linkbutton" iconCls="icon-application-view-detail" onclick="deal('view');" plain="true">查看</a>
			</div>
		</div>
	</div>
	<div data-options="region:'center',border:false" style="padding-top:0px;background-color:#E6EEF8;" class="pd3">
	    <table id="datagrid" toolbar="#wu-toolbar-2" 
	        class="easyui-datagrid" 
		    pageSize="${ipagesize}" 
		    pageList="${ipagelist}" 
		    queryParams={name:''} 
		    idField="id" 
		    border="true" 
		    rownumbers="false" 
		    singleSelect="true" 
		    pagination="true" 
		    fit="true" 
		    fitColumns="true"
		    url="PorletAction_porletListJson">
		    <thead>
				<tr>
					<th data-options="field:'id',checkbox:true"></th>
					<th field="code" align="left" width="200"  >代码</th>
					<th field="name" align="left" width="100" >名称</th>
					<th field="dataType" align="left" width="100" >数据源类别</th>
				</tr>
			</thead>
		    </table>
    </div>
</div>
</div>
</body>
</html>