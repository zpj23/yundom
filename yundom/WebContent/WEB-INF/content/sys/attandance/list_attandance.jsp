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
			field : 'address',
			title : '地址',
			width : 200
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
				style="height: 100%; width: 100%;" toolbar="" title=""
				pageSize="${ipagesize}" pageList="${ipagelist}"
				queryParams="" idField="id" border="true"
				rownumbers="true" singleSelect="true" pagination="true">
			</table>
</body>
</html>