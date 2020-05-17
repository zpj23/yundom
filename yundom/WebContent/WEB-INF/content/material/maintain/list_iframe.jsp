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
		url : 'jlMaintainAction_getMaintainListJson',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){ 
			var str=""; 
			if(rowData.examinestate=="1"){
				str="color:red;";
			}else if(rowData.examinestate=="2"){
				str="color:black;";
			}
            return str;  
        },
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		columns : [ [ {
			field : 'goodsname',
			title : '物资名称',
			width : 100
		},{
			field : 'num',
			title : '数量',
			width : 50
		},{
			field : 'departmentname',
			title : '申请部门',
			width : 50
		}
		,{
			field : 'chargename',
			title : '申请人',
			width : 100
		},{
			field : 'damagestate',
			title : '报损状态',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				if(rowData.damagestate=="1"){
					return "报废";
				}else if(rowData.damagestate=="2"){
					return "维修";
				}
			}
		},{
			field : 'maintainname',
			title : '维修商名称',
			width : 200
		},{
			field : 'price',
			title : '维修金额',
			width : 50
				
		},{
			field : 'examinestate',
			title : '审核状态',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				if(rowData.examinestate=="1"){
					return "已申请";
				}else if(rowData.examinestate=="2"){
					return "已审核";
				}
			}
		}
		,{
			field : 'createtime',
			title : '报损时间',
			width : 100
		}
		] ]
	});
});

function load(datemin,datemax,username,state,examinestate){
	datagrid.datagrid("load", { 
		datemin:datemin,
		datemax:datemax,
		username:username,
		state:state,
		examinestate:examinestate
	});
}
function selectData(){
	var rowData=$("#datagrid").datagrid("getSelected");
	if(rowData!=null){
		var id=rowData.id;
		if(rowData.state=="2"||rowData.state=="3"){
			alert("已经审核,不能重复审核");
			return;
		}
		parent.examineShow(id);
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