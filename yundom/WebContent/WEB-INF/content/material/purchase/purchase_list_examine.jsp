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
var choosedgrid;
var editRow = undefined; //定义全局变量：当前编辑的行
$(document).ready(function(){
	initChoosed();
});


//已选择的datagrid
function initChoosed(){
	choosedgrid=$('#choosedgrid');
	choosedgrid.datagrid({
		url:'jlPurchaseInfoAction_toListDetailJson?purchaseid=${purchaseid}',
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
		
		columns : [ [  {
			field : 'goodsname',
			title : '物资名称',
			width : 150
		},{
			field : 'goodsprice',
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
				var str= parseFloat(rowData.goodsprice)*parseInt(rowData.num)+"元";
				return str;
			}
		}
		
		] ]
	});
}

function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
 	parent.toList();
 	parent.layer.close(index);
}

</script>
</head>
<body>
<div class="easyui-layout" data-options="fit:true" >
	<div data-options="region:'north',split:true,collapsible:false" style="width:100%;height:300px;">
		<table id="choosedgrid" fit="true" fitColumns="true"
					style="height: auto; width: auto;" toolbar="" title=""
					pageSize="1" pageList="10" border="false"
					rownumbers="true" singleSelect="true" pagination="false">
				</table>
	</div>
	<div data-options="region:'center',split:true,collapsible:false" style="width:100%;height: 300px">
		<iframe id="purchase_exam" name="purchase_exam" src="jlPurchaseInfoAction_toExamine?purchaseid=${purchaseid}" width="95%" height="95%" frameborder="0" scrolling="no"></iframe>
	</div>
</div>
</body>
</html>