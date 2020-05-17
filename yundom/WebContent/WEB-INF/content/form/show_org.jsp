<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<html>
<head>
<%@ include file="/common/meta.jsp"%>

<title>组织机构</title>
<style type="text/css">
a{text-decoration:none; color:#0000FF}
</style>
<script src="${ctx}/js/comm/json.js" type="text/javascript"></script>
<script type="text/javascript" src="${ctx}/js/My97DatePicker/WdatePicker.js"></script>
<script src="${ctx}/js/comm/Math.uuid.js" type="text/javascript"></script>
<script src="${ctx}/js/sys/form/form.js" type="text/javascript"></script>
<script>
newTableName_ = '${tableName_}';
search_orgGuid = '${orgGuid_}';
conn = '${conn}';
ctx_ = '${ctx}';
tabName = window.parent.CenterTab.getSelectTabPanel().title;

/* $(function(){
	$('#cc').layout('panel', 'center').panel({ title: tabName}); 
}); */
  
/* $(window).load(function(){
	setTimeout(function(){
		var total_ = $('#datagrid').datagrid('getData').total;
		$('#datagrid_total').html(total_);
	},200)
}) */
</script>
	
</head>
<body>
	<div id="toolbar">
		<form action="" method="post" id="searchForm" style="height:auto;margin-bottom: 0px;" onsubmit="return false;">
			<table cellspacing="0" cellpadding="0" class="search_table">
				<tr>
					<td id="tdInput"></td> 
		            <td align="left">
		                <a class="easyui-linkbutton" iconCls="icon-search" id="tool_query" plain="false" onclick="searchFun();" href="javascript:void(0);">开始检索</a>
		                <!-- <a class="easyui-linkbutton" iconCls="icon-edit-clear" id="tool_clear" plain="false" onclick="clearFun();" href="javascript:void(0);">清空</a> -->
		            </td>
				</tr>
			</table>
		</form>
	</div>

	<div class="easyui-layout" data-options="fit:true">

		<div data-options="region:'center',border:false,title :''" style="padding: 3px;background-color: #E6EEF8;">
			<div  class="easyui-layout" data-options="fit:true">
				<c:if test="${nochilddata}">
					<div data-options="region:'west',split:true,collapsible:false" style="width:320px">
						<div class="panel">
							<div class="panel-header"
								style="border: 0px; border-bottom: solid 1px; border-color: #95B8E7;">
								<a class="easyui-linkbutton" plain="true"
									href="javascript:void(0);" style="font-size: 14px;"><b>组织机构</b></a>
							</div>
						</div>
						<div id="toolbar_org" class="datagrid-toolbar">
							<table cellspacing="0" cellpadding="0" class="search_table">
								<tr>
									<td colspan="2">
										<div
											style="width: 520px; font-size: 12px; padding-left: 7px; line-height: 25px;">
											所属区域：<a href="javascript:clearMenu_('${orgGuid_}')">${orgName}</a><span
												id="showLocal" style="width: 300px;"></span> 
												<input type='hidden' id='orgGuid' value='${orgGuid_}'>
												<span style="width: 300px; float: right;"> 统计数量：<font
												id="datagrid_total"></font></span>
										</div>
									</td>
								</tr>
							</table>
						</div>
						<table id="user_list" style="width: 320px;" remoteSort="false"
							fit="true" border="false" toolbar="#tools_org" idField="ID"
							rownumbers="true" singleSelect="true">
							<thead>
								<tr>
									<th field="ID" align="center" width="150" hidden="true"></th>
									<th field="ORGNAME" align="left" width="150" sortable="true">行政区域</th>
									<th field="SUBTOTAL" align="center" width="150" sortable="true">小计</th>
								</tr>
							</thead>
						</table>
					</div>
				</c:if>
				<div data-options="region:'center',title :''">
					<div class="easyui-layout" data-options="fit:true">
						<div data-options="region:'north',split:false,border:false">
							<div class="panel-header"
								style="border: 0px; border-bottom: solid 1px; border-color: #95B8E7;">
								<a class="easyui-linkbutton" iconCls="icon-add" id="tool_add"
									plain="true" onclick="append();" href="javascript:void(0);">新增</a>
								<span class="ge"></span> <a class="easyui-linkbutton"
									iconCls="icon-edit" id="tool_update" plain="true"
									onclick="edit();" href="javascript:void(0);">编辑</a> <span
									class="ge"></span> <a class="easyui-linkbutton"
									iconCls="icon-remove" id="tool_del" plain="true"
									onclick="remove_common();" href="javascript:void(0);">删除</a>
							</div>
						</div>
						<div data-options="region:'center',border:false,title :''">
							<table id="datagrid"></table>
						</div>
					</div>
				</div>
			</div>	
							
		</div>		
	</div>
	<div id="mm" class="easyui-menu" style="width: 120px; display: black">
		<div iconCls="icon-add" onclick="append();" id="tool_adddiv">新增</div>
		<div iconCls="icon-edit" onclick="edit();" id="tool_adddiv">编辑</div>
		<div iconCls="icon-remove" onclick="remove_common();" id="tool_adddiv">删除</div>
	</div>
</body>
</html>