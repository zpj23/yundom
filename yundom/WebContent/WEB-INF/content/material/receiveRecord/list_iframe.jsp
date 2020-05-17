<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/datagrid-detailview.js"></script>

<script type="text/javascript">
var datagrid;
$(document).ready(function(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'jlRecordInfoAction_getRecordsListJson',
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
			field : 'lyr',
			title : '领用人',
			width : 200
		},{
			field : 'createtime',
			title : '领用时间',
			width : 50,
			formatter: function(value, rowData, rowIndex){
				var str=rowData.createtime;
				var ret=str.substr(0,10);
				return ret;
			}
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				
				var str= ' <a title="编辑" href="javascript:;" onclick="admin_edit(\''+rowData.id+'\')"  style="text-decoration:none">编辑</a> <a title="删除" href="javascript:;" onclick="admin_del(\''+rowData.id+'\')"  style="text-decoration:none">删除</a>';
				return str;
			}
		}
		
		] ],
		view: detailview,
		detailFormatter:function(index,row){//严重注意喔
			return '<div"><table id="ddv-' + index + '" ></table></div>';
		},
		onExpandRow: function(index,row){//嵌套第一层，严重注意喔
			var ddv = $(this).datagrid('getRowDetail',index).find('#ddv-'+index);//严重注意喔
			ddv.datagrid({
				url:'jlRecordInfoAction_getRecordsDetailListJson?rid='+row.id,
				autoRowHeight:true,
				fitColumns:true,//改变横向滚动条
				singleSelect:false,//去掉选中效果
				rownumbers:true,
				loadMsg:'',
//					height:'auto',
				columns:[[
					{field:'gName',title:'物品名称',width:100},
					{field:'gNumber',title:'数量',width:100}
				]]
			});
			$('#dg').datagrid('fixDetailRowHeight',index);
		}
	});
});

// /****编辑用户****/
function admin_edit(id){
	parent.admin_edit('编辑记录','jlRecordAction_toAddRecord?id='+id,'800','650');
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