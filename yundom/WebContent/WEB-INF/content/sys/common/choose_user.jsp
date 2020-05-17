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
		url : 'jlUserInfoAction_getUserListJsonByChoose',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
//             return 'height:55px;';  
        },
        onDblClickRow : function(rowIndex,rowData) {
        	chooseOne(rowData.id,rowData.username);
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
			hidden:true,
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
				
				var str= '<a title="选择" href="javascript:;" onclick="chooseOne('+rowData.id+',\''+rowData.username+'\')"  style="text-decoration:none">选择</a>';
				return str;
			}
		}
		
		] ]
	});
});

function chooseOne(userid,username){
 	var index = parent.layer.getFrameIndex(window.name);
	parent.list_iframe.contentWindow.user_chooseBack(userid,username);
	parent.layer.close(index);
}




</script>
</head>
<body>
<table id="datagrid" fit="true" fitColumns="true"
				style="height: auto; width: auto;" toolbar="" title=""
				pageSize="${ipagesize}" pageList="${ipagelist}"
				queryParams="" idField="id" border="false"
				rownumbers="false" singleSelect="true" pagination="false">
			</table>
</body>
</html>