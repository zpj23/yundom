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
		url : 'jlStoreAction_getDetail?goodsid=${goodsid}',
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
			field : 'goodsname',
			title : '物资名称',
			width : 150
		},{
			field : 'price',
			title : '物资单价',
			width : 50,
			formatter: function(value, rowData, rowIndex){
				var str= value+"元";
				return str;
			}
		},{
			field : 'num',
			title : '物资数量',
			width : 50
		},{
			field : 'suppliername',
			title : '供应商',
			width : 100
		},{
			field : 'totalprice',
			title : '总金额',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				var str= parseFloat(rowData.price)*parseInt(rowData.num)+"元";
				return str;
			}
		},{
			field : 'type',
			title : '类型',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				if(rowData.type=="in"){
					return "入库";					
				}else if(rowData.type=="out"){
					return "出库";
				}
			}
		},{
			field : 'createtime',
			title : '操作时间',
			width : 100
		}
		
		] ]
	});
});


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