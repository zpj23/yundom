<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>

<html>
<head>
<%@ include file="/common/meta.jsp"%>
<%@ include file="/common/header.jsp"%>
<script>
$(function(){
	$('#datagrid_todo').datagrid({
		url: 'HomeAction_ListJson4MainTodo',
		rowStyler:function(rowIndex,rowData){  
            //任务完成100%， 并且已审核通过，背景色置红
            if(rowData && rowData.stts && (rowData.stts2=='1')) {  
                return 'color:#FF0000;';  
            }  
        },
		idField : 'seriNo',
		border : false,
		singleSelect : true,
		columns : [ [ {
			field : 'stts',
			title : '状态',
			width : 180
		},{
			field : 'title',
			title : '标题',
			width : 280,
			formatter : function(value, rowData, rowIndex) {
				var str ="<a href=\"javascript:oper('"+rowData.type+"','"+rowData.dealUrl+"')\">"+value+"</a>";
				return str;
			}
		},{
			field : 'type',
			title : '类型',
			width : 110
		},{
			field : 'sendDate',
			title : '发送日期',
			width : 150
		},{
			field : 'sendOrgDept',
			title : '发送单位',
			width : 100,
			formatter : function(value, rowData, rowIndex) {
				var str = rowData.sendOrgDept;
				return str;
			}
		}] ]
	});
})

function oper(type,url){
	 parent.Home.addTab("999", type, "", url, "href",true);
}
</script>
</head>
<body>
  <div class="easyui-layout">
    <div data-options="region:'center',title:'${titleName}'">
        <table id="datagrid_todo"></table>
        </div>
    </div>
</body>
</html>