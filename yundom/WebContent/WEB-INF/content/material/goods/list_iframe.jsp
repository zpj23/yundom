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
		url : 'jlGoodsInfoAction_getGoodsListJson',
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
			field : 'name',
			title : '物资名称',
			width : 100
		},{
			field : 'suppliername',
			title : '供应商名称',
			width : 100
		},{
			field : 'type',
			title : '规格型号',
			width : 50
		},{
			field : 'price',
			title : '单价',
			width : 50,
			formatter: function(value, rowData, rowIndex){
				
				var str=rowData.price+"元/"+rowData.unit;
				return str;
			}
		},{
			field : 'createtime',
			title : '创建时间',
			width : 50
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				
				var str= ' <a title="编辑" href="javascript:;" onclick="admin_edit('+rowData.id+')"  style="text-decoration:none">编辑</a> <a title="删除" href="javascript:;" onclick="admin_del('+rowData.id+')"  style="text-decoration:none">删除</a>';
				return str;
			}
		}
		
		] ]
	});
});

/*管理员-启停用*/
function admin_ss(flag,id){
	if(flag=="1"){//停用
		parent.admin_start(id);
	}else if(flag=="0"){//启用
		parent.admin_stop(id);
	}
}
/****编辑用户****/
function admin_edit(id){
	parent.admin_edit('编辑供应商','jlGoodsInfoAction_toAddGoods?id='+id,'800','650');
}
/*****删除用户*****/
function admin_del(id){
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