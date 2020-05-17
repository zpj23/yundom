<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
		type="text/css"/>
<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
			<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.excheck-3.5.js"></script>
			<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.exedit-3.5.js"></script>
<script type="text/javascript" charset="UTF-8">
	var editRow;
	var treegrid;
	var item_typeid;
	
	var setting = {
			data : {
				simpleData : {
					enable : true
				}
			}
		};
	
	$(document).ready(function() {
		$('#datagrid').datagrid({
			url : 'purviewAction_toAllRoleJson',
			queryParams : {
				rolename : $("#rolename").val()
			},
			onClickRow:function(row){
			    //显示所有菜单按钮
	            var rowData =  $('#datagrid').datagrid('getSelected');
	            $('#treegrid2').treegrid({
					url: 'purviewAction_findMenuJsonByRoleid2',
					queryParams : {
						roleid : rowData.id
					},
					/* toolbar : [ {
						text : '保存',
						iconCls : 'icon-save',
						handler : function() {
							setQuickmenu();
						}
					}],  */
					/* fit : true,
					fitColumns : true,
					nowrap : true,
					animate : false,
					border : false, 
					singleSelect:false,*/
					idField : 'id',
					treeField : 'title',
					 frozenColumns : [ [ {
						title : 'id',
						field : 'id',
						width : 50,
						hidden: true
					}, {
						field : 'title',
						title : '菜单名称',
						width : 300 
					} ] ],  
					columns : [ [ {
						field : 'functionid',
						title : '菜单项',
						width : 60,
						formatter : function(value, rowData, rowIndex) {
							var ischeck = rowData.ischeck;
							var str="";
							if(ischeck=='1'){str="checked";}
							return  "<input type='checkbox' name='buttonval' value='"+value+"' "+str+"/>";
						}
					},{
						field : 'picture',
						title : '图标',
						width : 150,
						formatter : function(value, rowData, rowIndex) {
							
							var str ="";
							 if(value==''){
								 //默认图片
								 value = "images/menuimg/zhuantidiaoyan.jpg";
								 str = "<img src='"+value+"' id=\"pic"+rowData.number+"\" width='20' height='20' style='vertical-align:middle'>";
								str+="<input type='hidden' name=\"picpath\" id=\"picpath"+rowData.number+"\" value=\""+value+"\" >";
							}else{
								str = "<img src='"+value+"' id=\"pic"+rowData.number+"\" width='20' height='20' style='vertical-align:middle'>";
								str+="<input type='hidden' name=\"picpath\" id=\"picpath"+rowData.number+"\" value=\""+value+"\" >";
							}
							
							str+="<input type='button' onclick=\"choosepic("+rowData.number+")\" value='选择..'>"; 
							return str;
						},
						editor : {
							type : 'text'
						}
					}]],
					formatter: function(value,rr,index){
						alert(rr.id);
					}/* ,
					onDblClickRow : function(row) {
						
							$('#treegrid2').treegrid('beginEdit', row.id);
							if(row.picture==''){
								imgurl="";
							}else{
							   imgurl="/"+row.picture;
							}
							editRow = row;
						
					} */
				});
	            
	            //$('#treegrid2').treegrid("selectRecord",3);
			  }
		});
	});
	
	
	function searchFun(){
		$('#datagrid').datagrid('load', {
			rolename : $("#rolename").val()
		});
	}
	
	
	
	
	function setQuickmenu(){
		 var rowData =  $('#datagrid').datagrid('getSelected');		
		var id =  $('#treegrid2').treegrid("getSelections");
		var buttonval='',picpath='';		
		var bt = document.getElementsByName("buttonval");
		var pp = document.getElementsByName("picpath");
		for(var i=0;i<bt.length;i++){
			if(bt[i].checked){
				buttonval+=bt[i].value+',';
				picpath+=pp[i].value+',';
			}
		}		
		$.post("purviewAction_saveQuickmenu",
				{roleid:rowData.id,
			     menuid:buttonval,
			     picpath:picpath
			    },function(data){
			    	if(data==1){
			    	common.alert_info('设置成功!');
			    	}else{
			    		common.alert_error('设置失败!');	
			    	}
		});		
	}
	
	
	function configInfo(){
		$.messager.confirm('询问','您确定要生成权限配置？',function (b){
			if (b) {
				$("#loading").css("display","");
				count();
				 /* $.post("purviewAction_configData",
					function(data){
				    	if(data==1){
				    	    common.alert_info('生成配置成功!');
				    	}else{
				    		common.alert_error('生成配置失败!');	
				    	}
				});	 */
			}
		});	
	}
	
	//选择1级菜单图标
	function choosepic(num){
		common.openWindow('选择图标', 'functionAction_choosequickpic?num='+num, 725, 725);
	}
	
	$.extend($.fn.datagrid.defaults.editors, {   
	      text: {   
	          init: function(container, options){   
	              var input = $('<iframe id="cc" name="cc" src="uploadfileAction_toUploadFile?modulename=mail&tableuuid=123456&imgurl='+imgurl+'" width="100%" height="23px" sc></iframe>').appendTo(container);   
	              //var input = $('<button style="width:50px" onclick="choosepic()" >选择图片</button> ').appendTo(container);
	              return input;   
	          },   
	          getValue: function(target){
	        	  if(window.frames["cc"].document.getElementById("pictureurl")!=null){
	                return window.frames["cc"].document.getElementById("pictureurl").value; 
	        	  }else{
	        		  return '';
	        	  }
	         },   
	         setValue: function(target, value){   
	             $(target).val(value);   
	        },   
	        resize: function(target, width){   
	             var input = $(target);   
	            if ($.boxModel == true){   
	                 input.width(width - (input.outerWidth() - input.width()));   
	             } else {   
	                input.width(width);   
	             }   
	         }   
	     }   
	 });
	
	
	
</script>
</head>
<body >
<div class="easyui-layout" data-options= "fit:true">
		<div data-options="region:'north',split:false,border:false">
			<div class="panel pd3" style="background-color: #E6EEF8;">
				<div class="panel-header">
					<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
						onclick="setQuickmenu();" href="javascript:void(0);">保存</a> 
				</div>
			</div>
		</div>
		<div data-options="region:'center',border:false" style="padding-top :0px; background-color:#E6EEF8 ;padding-left: 3px;">
		<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'west',split:true,collapsed:false" style="width: 310px">
					<div id="wu-toolbar-2">
						<div class="wu-toolbar-search">
							<span> <label> 角色名称：</label>
							<input name="rolename" id="rolename" />
							</span>
							<a class="easyui-linkbutton" iconCls="icon-search"
							plain="true" onclick="searchFun();" href="javascript:void(0);">开始检索</a>
						</div>
					</div>
					<table id="datagrid" toolbar="#wu-toolbar-2" fitColumns=true
						queryParams={rolename: ''} idField="id" border="false"
						rownumbers="false" singleSelect="true">
						<thead>
							<tr>
								<th field="id" align="center" width="200" checkbox="true">id</th>
								<th field="rolename" align="left" width="200">角色名</th>
							</tr>
						</thead>
					</table>
				</div>
			<div data-options="region:'center'" >
				<table id="treegrid2"></table>
			</div>
		</div>
	</div>
	</div>
</body>
</html>