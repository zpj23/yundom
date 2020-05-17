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
		url : 'jlPurchaseInfoAction_toListJson',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
			if(rowData.state=="1"){
				return 'color:red';
			}
            
        },
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		columns : [ [ {
			field : 'cgdbh',
			title : '采购单编号',
			width : 100
		},{
			field : 'chargename',
			title : '采购人',
			width : 100
		},{
			field : 'departmentname',
			title : '采购部门',
			width : 50
		},{
			field : 'username',
			title : '登记人',
			width : 50
		},{
			field : 'state',
			title : '采购状态',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				var str= "";
				if(rowData.state=="1"){
					str="采购中";
				}else if(rowData.state=="2"){
					str="已审核入库";
				}else if(rowData.state=="3"){
					str="未通过审核";
				}
				return str;
			}
		},{
			field : 'totalprice',
			title : '总金额',
			width : 50,
			formatter: function(value, rowData, rowIndex){
				var str= rowData.totalprice+"元";
				return str;
			}
		},{
			field : 'createtime',
			title : '创建时间',
			width : 100
		}
		
		] ]
	});
});


/****编辑用户****/
function findDetail(){
	var rowData=datagrid.datagrid("getSelected");
	if(rowData==null){
		alert("请勾选一条数据");
		return;
	}
	parent.openDetail('采购单详细','jlPurchaseInfoAction_toListDetail?purchaseid='+rowData.id,'600','400');
}

function load(datemin,datemax,username,state,departmentid){
	datagrid.datagrid("load", { 
		datemin:datemin,
		datemax:datemax,
		username:username,
		state:state,
		departmentid:departmentid
	});
}
function examineAndInStore(){
	var rowData=datagrid.datagrid("getSelected");
	if(rowData==null){
		alert("请勾选一条数据");
		return;
	}
	var id=rowData.id;
	if(rowData.state=="2"||rowData.state=="3"){
		alert("已经审核,不能重复审核");
		return;
	}
	parent.examinePurchaseAndDetail('采购单审核','jlPurchaseInfoAction_toExaminePurchaseDetail?purchaseid='+id,'600','600');
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