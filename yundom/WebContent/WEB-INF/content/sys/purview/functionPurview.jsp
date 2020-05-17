<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html>
<head>
<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
	type="text/css" />
<script type="text/javascript"
	src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
<script type="text/javascript"
	src="js/ztree/js/jquery.ztree.excheck-3.5.js"></script>
<script type="text/javascript"
	src="js/ztree/js/jquery.ztree.exedit-3.5.js"></script>
<script type="text/javascript" charset="UTF-8">
	
	var editRow;
	var treegrid;
	var item_typeid;

	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	$(document)
			.ready(
					function() {
						$('#datagrid')
								.datagrid(
										{
											url : 'purviewAction_toAllRoleJson',
											queryParams : {
												rolename : $("#rolename").val()
											},
											onClickRow : function(row) {
												//显示所有菜单按钮
												var rowData = $('#datagrid')
														.datagrid('getSelected');
												$('#treegrid2')
														.treegrid(
																{
																	url : 'purviewAction_findMenuJsonByRoleid',
																	queryParams : {
																		roleid : rowData.id
																	},
																	idField : 'id',
																	treeField : 'title',
																	border:false,
																	frozenColumns : [ [
																			{
																				title : 'id',
																				field : 'id',
																				width : 50,
																				hidden : true
																			},
																			{
																				field : 'title',
																				title : '菜单名称',
																				width : 300
																			} ] ],
																	columns : [ [
																			{
																				field : 'functionid',
																				title : '菜单项',
																				width : 60,
																				formatter : function(
																						value,
																						rowData,
																						rowIndex) {
																					var ischeck = rowData.ischeck;
																					var str = "";
																					if (ischeck == '1') {
																						str = "checked";
																					}
																					return "<input type='checkbox' name='buttonval' value='"+value+"' "+str+"/>";
																				}
																			},
																			{
																				field : 'childbutton',
																				title : '按钮',
																				width : 700,
																				formatter : function(
																						value,
																						rowData,
																						rowIndex) {
																					return js_format(value);
																				}
																			} ] ],
																	formatter : function(
																			value,
																			rr,
																			index) {
																		alert(rr.id);
																	}
																});

												$('#treegrid2').treegrid(
														"selectRecord", 3);
											}
										});
					});

	function searchFun() {
		$('#datagrid').datagrid('load', {
			rolename : $("#rolename").val()
		});
	}

	function js_format(val) {
		if (val == '') {
			return '';
		}

		var arr = val.split(",");
		var str = "";
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != '') {
				var a = arr[i];
				var b = a.split("-");
				str += "<input type='checkbox' name='buttonval' value='" + b[0]
						+ "' ";
				var ischeck = "";
				if (b[2] == '1') {
					ischeck = " checked ";
				}
				str += ischeck;
				if (b[1] == 'add') {
					str += " /> 新增";
				} else if (b[1] == 'update') {
					str += " /> 编辑";
				} else if (b[1] == 'del') {
					str += " /> 删除";
				} else if (b[1] == 'query') {
					str += " /> 查询";
				} else if (b[1] == 'view') {
					str += " /> 查看";
				}else if (b[1] == 'export') {
					str += " /> 导出";
				}else if (b[1] == 'banli') {
					str += " /> 办理";
				}else if (b[1] == 'shangbao') {
					str += " /> 上报";
				}else if (b[1] == 'guanzhu') {
					str += " /> 关注";
				}
			}
		}
		return str;
	}

	function setFunction() {
		var rowData = $('#datagrid').datagrid('getSelected');
		var id = $('#treegrid2').treegrid("getSelections");
		var buttonval = '';
		var bt = document.getElementsByName("buttonval");
		for (var i = 0; i < bt.length; i++) {
			if (bt[i].checked) {
				buttonval += bt[i].value + ',';
			}
		}
		$.post("purviewAction_saveSetData", {
			roleid : rowData.id,
			menuid : buttonval
		}, function(data) {
			if (data == 1) {
				common.alert_info('设置成功');
			} else {
				common.alert_error('设置失败');
			}
		});
	}

	function configInfo() {
		$.messager.confirm('温馨提示', '您确定要生成权限配置', function(b) {
			if (b) {
				showProcess(true, '温馨提示', '正在配置菜单...');
				count();
			}
		});
	}

	// 进度条
	function showProcess(isShow, title, msg) {
		if (!isShow) {
			$.messager.progress('close');
			return;
		}
		var win = $.messager.progress({
			title : title,
			msg : msg
		});
	}

	function count() {
		$.post("purviewAction_configData", function(data) {
			if (data == 1) {
				showProcess(false);
				$.messager.alert('温馨提示', '生成配置成功!');
			} else {
				$.messager.alert('温馨提示', '生成配置失败!');
			}
		});
	}
</script>

</head>
<body>
	<div class="easyui-layout" data-options= "fit:true">
		<div data-options="region:'north',split:false,border:false">
			<div class="panel pd3" style="background-color: #E6EEF8;">
				<div class="panel-header">
					<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
						onclick="setFunction();" href="javascript:void(0);">保存</a> <span
						class="ge"></span> <a class="easyui-linkbutton"
						iconCls="icon-anchor" plain="true" onclick="configInfo();"
						href="javascript:void(0);">生成权限配置</a>
				</div>
			</div>
		</div>
		<div data-options="region:'center',border:false" style="padding-top :0px; background-color:#E6EEF8 ;" class="pd3">
		<div class="easyui-layout" data-options= "fit:true">
		<div
				data-options="region:'west',split:true,collapsed:false"
				style="width: 310px">
					<div id="wu-toolbar-2">
						<div class="wu-toolbar-search">
							<span> <label> 角色名称：</label>
							<input name="rolename" id="rolename" />
							</span>
							<a class="easyui-linkbutton" iconCls="icon-search"
							plain="true" onclick="searchFun();" href="javascript:void(0);">开始检索</a>
						</div>
					</div>
					<table id="datagrid" toolbar="#wu-toolbar-2" fitColumns=true
						queryParams={rolename: ''} idField="id" border="false"
						rownumbers="false" singleSelect="true">
						<thead>
							<tr>
								<th field="id" align="center" width="200" checkbox="true">id</th>
								<th field="rolename" align="left" width="200">角色名</th>
							</tr>
						</thead>
					</table>
				</div>
			<div data-options="region:'center'">
				<table id="treegrid2"></table>
			</div>
</div>
	</div>
	</div>
</body>
</html>