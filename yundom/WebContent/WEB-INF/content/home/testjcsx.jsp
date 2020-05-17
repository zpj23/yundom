<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/hnfxpglc/iteminfo/resstatus.js"></script>

<script type="text/javascript" charset="UTF-8">

var datagrid;
	$(function() {		
		datagrid = $('#datagrid');

		$('#datagrid').datagrid({
			url : 'HnAction_itemJsonIndex',
			queryParams : {
				
			},
			idField : 'id',
			frozenColumns : [ [ {
				title : 'id',
				field : 'id',
				width : 50,
				hidden :true
			} ] ],
			columns : [ [ {
				field : 'name',
				title : '名称',
				width : 200,
				formatter: function(value, rowData, rowIndex){
					return "<a href=\"javascript:view('"+rowData.id+"')\">"+value+"</a>";
				}
			},{
				field : 'address',
				title : '所在地',
				width : 210
			},{
				field : 'nature',
				title : '项目性质',
				width : 100
			},{
				field : 'type',
				title : '项目类别',
				width : 100
			},{
				field : 'level',
				title : '项目级别',
				width : 100
			},{
				field : 'status',
				title : '状态',
				width : 80,
				formatter: function(value, rowData, rowIndex){
					return translateName(value,"1");
				}
			}/* ,{
				field : 'time',
				title : '登记时间',
				width : 200,
				formatter: function(value, rowData, rowIndex){
					return value.substring(0,19);
				}
			} */  ] ]
		});
	});

	function view(id) {	
		parent.parent.Home.addTab("1122333", "项目详细信息", "", "HnAction_toViewIteminfo?isindex=1&id="+id, "href",true);
	}
</script>


</head>
<body>
<div class="easyui-layout" data-options="fit:true">
	<table id="datagrid" fit="true" fitColumns="true" toolbar="#wu-toolbar-2" 
	 pageSize="${ipagesize}" pageList="${ipagelist}" queryParams={name:''} idField="id" border="false" rownumbers="false" singleSelect="true" pagination="false">
	</table>
</div>
</body>
</html>