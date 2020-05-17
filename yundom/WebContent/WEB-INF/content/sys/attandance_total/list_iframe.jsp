<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/demo/demo.css" />
<script type="text/javascript">
var datagrid;
$(document).ready(function(){
	initDatagrid();
});
function initDatagrid(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'jlAttendanceInfoAction_ATIDatagrid',
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
			field : 'username',
			title : '用户名',
			width : 50
		},{
			field : 'departmentname',
			title : '所属地',
			width : 50
		},{
			field : 'gzsx',
			title : '工作时效标准/实际',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				var tempStr=rowData.gzsx_bz+"/"+rowData.gzsx_sj;
				return tempStr;
			}
		},{
			field : 'cd_cs',
			title : '迟到次数/分钟数',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				var tempStr=rowData.cd_cs+"/"+rowData.cd_fzs;
				return tempStr;
			}
		},{
			field : 'zt_cs',
			title : '早退次数/分钟数',
			width : 200,
			formatter: function(value, rowData, rowIndex){
				var tempStr=rowData.zt_cs+"/"+rowData.zt_fzs;
				return tempStr;
			}
		},{
			field : 'cqts',
			title : '出勤天数（标准/实际）',
			width : 100,
			formatter: function(value, rowData, rowIndex){
				var tempStr=rowData.cqts;
				return tempStr;
			}
		},{
			field : 'cc',
			title : '出差（天）',
			width : 50
		},{
			field : 'kg',
			title : '矿工（天）',
			width : 50
		},{
			field : 'qj',
			title : '请假（天）',
			width : 50
		},{
			field : 'sjgz',
			title : '实际工资',
			width : 50
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				var tempStr="";
				var str= '<a style="text-decoration:none;" onClick="viewOne('+rowData.id+')" href="javascript:;" >查看</a> ';
				return str;
			}
		}
		
		] ]
	});
}
function viewOne(id){
	
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

<!-- 	<div style="margin:20px ;"></div> -->
	<div id="cc" class="easyui-layout" data-options="fit:true,border:false">
		<div data-options="region:'center',border:false" style="padding-left:5px">
			<table id="datagrid" fit="true" fitColumns="true"
				style="height: auto; width: auto;" toolbar="" title=""
				pageSize="${ipagesize}" pageList="${ipagelist}"
				queryParams="" idField="id" border="true"
				rownumbers="true" singleSelect="true" pagination="true">
			</table>
		</div>
	</div>
</body>
</html>