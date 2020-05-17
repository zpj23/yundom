<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript">
var datagrid;
$(document).ready(function(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'jlRoleInfoAction_getRoleListJson',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
            return 'height:55px;';  
        },
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		columns : [ [ {
			field : 'rolename',
			title : '角色名称',
			width : 200
		},{
			field : 'rolecode',
			title : '角色编码',
			width : 50
		},{
			field : 'remark',
			title : '备注',
			width : 50
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				var tempStr="";
	
				
				var str= '<a title="编辑" href="javascript:;" onclick="role_edit('+rowData.id+')"  style="text-decoration:none">编辑</a> <a title="删除" href="javascript:;" onclick="role_del('+rowData.id+')"  style="text-decoration:none">删除</a>';
				return str;
			}
		}
		
		] ]
	});
});


/****编辑用户****/
function role_edit(id){
	parent.admin_edit('编辑角色','jlRoleInfoAction_toAdd?id='+id,'800','650');
}
/*****删除用户*****/
function role_del(id){
	parent.admin_del(id);
}

function load(datemin,datemax,username){
	datagrid.datagrid("load", { 
		datemin:datemin,
		datemax:datemax,
		username:username
	});
}




</script>
</head>
<body>
<table id="datagrid" fit="true" fitColumns="true"
				style="height: auto; width: auto;" toolbar="" title=""
				pageSize="${ipagesize}" pageList="${ipagelist}"
				queryParams="" idField="id" border="false"
				rownumbers="true" singleSelect="true" pagination="true">
			</table>
</body>
</html>