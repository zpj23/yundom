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
		url : 'jlUserInfoAction_getUserListJson',
		queryParams : {
			
		},
        rowStyler:function(rowIndex,rowData){ 
        	var tempStr="";
			var col="black";
			if(rowData.isdel==1){
				tempStr="启用";
				col="grey";
			}else if(rowData.isdel==0){
				tempStr="停用";
			}
			return 'color:'+col;
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
			width : 200
		},{
			field : 'loginname',
			title : '登陆名',
			width : 50
		},{
			field : 'telephone',
			title : '联系电话',
			width : 50
		},{
			field : 'createtime',
			title : '创建时间',
			width : 50
		},{
			field : 'isdel',
			title : '是否已启用',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				var tempStr="";
				var col="black";
				if(rowData.isdel==0){
					tempStr='<span style="color:'+col+';"  >已启用</span>';
				}else if(rowData.isdel==1){
					col="grey";
					tempStr='<span style="color:'+col+';"  >已停用</span>';
				}
				return tempStr;
			}
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				var tempStr="";
				var col="black";
				if(rowData.isdel==1){
					tempStr="启用";
					col="grey";
				}else if(rowData.isdel==0){
					tempStr="停用";
// 					col="red";
				}
				var str= '<a style="text-decoration:none;color:'+col+';" onClick="admin_ss('+rowData.isdel+','+rowData.id+')" href="javascript:;" title="'+tempStr+'">'+tempStr+'</a> <a title="编辑" href="javascript:;" onclick="admin_edit('+rowData.id+')"  style="text-decoration:none">编辑</a> <a title="删除" href="javascript:;" onclick="admin_del('+rowData.id+')"  style="text-decoration:none">删除</a>';
				return str;
			}
		}
		
		] ]
	});
});

function selectOneData(){
	var rowData=$("#datagrid").datagrid("getSelected");
	if(rowData!=null){
		var id=rowData.id;
		return id;
	}else{
		parent.layer.msg('请勾选一条数据!',{icon: 5,time:3000});
	}
}

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
	parent.admin_edit('编辑用户','jlUserInfoAction_toAdd?id='+id,'800','650');
}
/*****删除用户*****/
function admin_del(id){
	parent.admin_del(id);
}

function load(datemin,datemax,username,departmentcode){
	datagrid.datagrid("load", { 
		datemin:datemin,
		datemax:datemax,
		username:username,
		departmentcode:departmentcode
	});
}


// function importEx(){
// 	showProcess(true, '温馨提示', '正在导入数据...');
// 	$('#formExc').form('submit',{
// 		url:'jlUserInfoAction_importExcel',
// 		onSubmit:function(){
			
// 		},
// 		success: function(data){				
// 				//刷新父页面，关闭window	
// 				showProcess(false);
// 				if(data=="success"){
					
// 				}else{
// 					common.alert_remind(data+"，请检查导入文件");
// 				}
// 			 }
// 	});
// }

// // 进度条
// function showProcess(isShow, title, msg) {
// 	if (!isShow) {
// 		$.messager.progress('close');
// 		return;
// 	}
// 	var win = $.messager.progress({
// 		title : title,
// 		msg : msg
// 	});
// }

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