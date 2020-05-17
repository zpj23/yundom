<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<%-- <link rel="stylesheet" type="text/css" href="${ctx}/js/EasyUI/demo/demo.css" /> --%>
<script type="text/javascript" charset="UTF-8">
	var datagrid;
	var userDialog;
	var userform;
				
	$(function() {
		userform = $('#userform').form();
		datagrid = $('#datagrid');
		
		$('#datagrid').datagrid({
			url: 'uploadfileAction_toFileJson',
			queryParams : {
				filename : $("#filename").val(),
				modelname : $("#modelname").val()
			},
			idField : 'id',
			frozenColumns : [ [ {
				title : 'id',
				field : 'id',
				width : 50,
				checkbox : true
			} ] ],
			columns : [ [ {
				field : 'originalName',
				title : '文件名',
				width : 300,
				formatter : function(value, rowData, rowIndex) {
					return "<a href='javascript:look("+rowData.id+");' >"+value+"</a>";
				}
			},{
				field : 'fileType',
				title : '文件类型',
				width : 100
			},{
				field : 'moduleName',
				title : '所属模块',
				width : 200
			},{
				field : 'uploadTime',
				title : '上传时间',
				width : 200,
				formatter : function(value, rowData, rowIndex) {
					return value.substring(0,10);
				}
			}] ]
			
			});
		
	});
    
	
	
	//打开查看页面
	function look() {
		var ids = document.getElementsByName("id");
		var  num=0;var id;
		for(var i=0;i<ids.length;i++){
			if(ids[i].checked){
				id = ids[i].value;
				num++;
			}
		}		
		if(num==0){			
			common.alert_remind('请选择要下载的附件!');
		}
		if(num>1){
			common.alert_remind('只能择一个附件进行下载!');
		}
		if(num==1){
			$.messager.confirm('询问','您确定要查看/下载当前所选附件？',function (b){
				if (b) {
			       //window.open("uploadfileAction_viewImages?id="+id);
			       window.open("uploadfileAction_downLoadFile?id="+id);
			       //form1.submit();
				}
			});
			
			/* var node = datagrid.datagrid('getSelected');
			if(node.fileType=='jpg'||node.fileType=='png'){
				common.openWindow('查看附件', "uploadfileAction_toView?id="+id, 650, 450);
			}else{
				window.open("uploadfileAction_viewImages?id="+id);
			} */
			
		}
	}

	//执行删除用户
	function removeinfo() {
		var ids = document.getElementsByName("id");
		var  num=0;var id="";
		for(var i=0;i<ids.length;i++){
			if(ids[i].checked){
				id = id+ids[i].value+",";
				num++;
			}
		}		
		if(num==0){
			common.alert_remind('请选择要删除的附件!');
		}else{	
			$.messager.confirm('询问','您要删除当前所选附件？',function (b){
				if (b) {
		    id=id.substring(0,id.length-1);
			
			$('#form1').form('submit', {    
			    url:"uploadfileAction_delFile?id="+id,    
			    onSubmit: function(){    
			       
			    },    
			    success:function(data){    
			    	common.alert_info('删除成功');
			    	$('#datagrid').datagrid('load', {
			    		filename : $("#filename").val(),
						modelname : $("#modelname").val()
					});
			    }    
			});	
			
			}
		});
	 }
	}

	//搜索
	function searchFun() {
		$('#datagrid').datagrid('load', {
			filename : $("#filename").val(),
			modelname : $("#modelname").val()
		});
	}
	
	//清空
	function clearFun() {
		$('input').val('');
		$('#modelname').val('');
		datagrid.datagrid('load', {});
	}
	
</script>


</head>
<body>
   <div  class="easyui-layout" >
   <div data-options="region:'north',split:false,border:false">
		<div class="panel pd3" style="background-color:#E6EEF8;">
			<div class="panel-header">
			    <a class="easyui-linkbutton" iconCls="icon-remove" id="tool_del" onclick="removeinfo();" plain="true" href="javascript:void(0);">删除</a>							
			</div>
		</div>
	</div>

	    <div data-options="region:'center',border:false" style="padding-top:0px;background-color:#E6EEF8;"  class="pd3"> 
			<div id="toolbar" class="datagrid-toolbar" >
					<form action="" method="post" id="form1" >
						<label>文件名称：</label>
						<input  name="filename" id="filename" />
						<label>所属模块：</label>
						 <mf:selectCoder type="fujianmokuai" name="modelname" id="modelname"  headerKey="" headerValue="------请选择------"></mf:selectCoder>
							<a class="easyui-linkbutton" iconCls="icon-search" id="tool_query" plain="true" onclick="searchFun();" href="javascript:void(0);">查找</a>
							<span class="ge"></span>
							<a class="easyui-linkbutton" iconCls="icon-undo" id="tool_clear" plain="true" onclick="clearFun();" href="javascript:void(0);">清空</a>
				   </form>
			</div>
		
		 	<table id="datagrid"   fit="true" fitColumns="true" style="height:auto; width:auto;"  toolbar="#toolbar"  
				 pageSize="${ipagesize}" pageList="${ipagelist}" queryParams=filename:''} idField="id" border="true" rownumbers="false" singleSelect="true" pagination="true">				
	      	</table>
     </div> 
  
     
	</div>
</body>
</html>