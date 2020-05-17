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
		url : 'jlLogAction_getLogListJson',
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
		columns : [ [ 
		              {
			field : 'userid',
			title : '用户id',
			width : 50
		},{
			field : 'username',
			title : '用户名称',
			width : 50
		},{
			field : 'description',
			title : '操作描述',
			width : 200,
			formatter:function(value,row){
				var str=value.replace(/"/g,"");
		        var content = '<span title=\"' + str + '\" class="easyui-tooltip">' + value + '</span>';  
		        return content;  
		    }  
		},{
			field : 'type',
			title : '操作类型',
			width : 100
		},{
			field : 'createtime',
			title : '操作时间',
			width : 100
		}
		
		] ]
	});
});




function load(datemin,datemax,username,type){
	datagrid.datagrid("load", { 
		datemin:datemin,
		datemax:datemax,
		username:username,
		type:type
	});
}

function selectOneData(){
	var rowData=$("#datagrid").datagrid("getSelected");
	if(rowData!=null){
		var id=rowData.id;
		return id;
	}else{
		parent.layer.msg('请勾选一条数据!',{icon: 5,time:3000});
	}
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