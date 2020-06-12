<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<!-- <link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css"/> -->
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
	
	var isableData = [ {
		iconcls : '1',
		text : '可用'
	}, {
		iconcls : '0',
		text : '禁用'
	} ];
	
	var setting = {
			data : {
				simpleData : {
					enable : true
				}
			}
		};
	var zNodes = ${typeJson};
	$(document).ready(function() {
		$.fn.zTree.init($("#treeDiv"), setting, zNodes);
		 init();
	});
	
	function addType(){
		parent.openWindow('新增类别', 'resourceAction_toAddRescource', 550, 160);
	}
	
	function modifyType(){
	    var zTree = $.fn.zTree.getZTreeObj("treeDiv");
		var treeNode = zTree.getSelectedNodes()[0];
		if(treeNode == undefined){
			parent.layer.msg('请选择要修改的记录!',{icon: 0,time:1000});
		}else{
	      parent.openWindow('编辑类别', 'resourceAction_toAddRescource?id='+treeNode.id+'&pid='+treeNode.pId, 550, 160);
		}
	}
	
	function delType(){
		var zTree = $.fn.zTree.getZTreeObj("treeDiv");
		var treeNode = zTree.getSelectedNodes()[0];	
		if(treeNode == undefined){
			common.alert_remind('请选择要删除的记录!');
		}else{
			$.messager.confirm('询问','您要删除当前所选数据类别？',function (b){
				if (b) {
					$.ajax({
						url :"resourceAction_delRescource?id="+treeNode.id,
						cache : false,						
						success : function(r) {
							if (r==1) {
								zTree.removeNode(treeNode);
								parent.layer.msg('删除成功!',{icon: 1,time:1000});
							}else if(r==2){
// 								common.alert_remind('该类型存在下级节点,不能删除');
								parent.layer.msg('该类型存在下级节点,不能删除!',{icon:0,time:1000});
							}else {
// 								common.alert_error('删除失败!');
								parent.layer.msg('删除失败!',{icon:5,time:1000});
							}
						}
					});				
				}
			});
		}	
	}
	
	
	
	function showItem(id){
		item_typeid = id;
		editRow = undefined;
		 $('#treegrid').treegrid({
				url : 'resourceAction_showResourceItemJson?pid='+id}
		 );  
		//item_typeid = null;
	}
	
	 function reflush() {
		editRow = undefined;
		$('#treegrid').treegrid('reload', item_typeid);
		//$('#treegrid').treegrid('reload');
	}
	
	
	   function init(){
		treegrid = $('#treegrid').treegrid({
			url : 'resourceAction_showResourceItemJson',
// 			toolbar : [   /* '-', {
// 				text : '刷新',
// 				iconCls : 'icon-reload',
// 				handler : reflush
// 			}, */  {
// 				text : '新增',
// 				iconCls : 'icon-add',
// 				handler : function() {
// 					append();
// 				}
// 			},{
// 				text : '新增主节点',
// 				iconCls : 'icon-add',
// 				handler : function() {
// 					treegrid.treegrid('unselectAll');
// 					append();
// 				}
// 			},{
// 				text : '编辑',
// 				iconCls : 'icon-edit',
// 				handler : function() {
// 					edit();
// 				}
// 			}, {
// 				text : '删除',
// 				iconCls : 'icon-remove',
// 				handler : function() {
// 					removeinfo();
// 				}
// 			}, {
// 				text : '保存',
// 				iconCls : 'icon-save',
// 				handler : function() {
// 					if (editRow) {
// 						treegrid.treegrid('endEdit', editRow.id);
// 					}
// 				}
// 			},{
// 				text : '取消编辑',
// 				iconCls : 'icon-undo',
// 				handler : function() {
// 					if (editRow) {
// 						if(editRow.itemCode==''){
// 							//删除点击新增而未做保存的临时数据
// 							removeNew(editRow.id);
// 						}else{
// 						treegrid.treegrid('cancelEdit', editRow.id);
// 						editRow = undefined;
// 						}
// 					}
// 				}
// 			},{
// 				text : '取消选中',
// 				iconCls : 'icon-undo',
// 				handler : function() {
// 					treegrid.treegrid('unselectAll');
// 				}
// 			}],
			
			iconCls : '',
			fit : true,
			nowrap : true,
			animate : false,
			fitColumns:true,
			border : true,
			idField : 'id',
			treeField : 'itemName',
			 frozenColumns : [ [ {
				title : 'id',
				field : 'id',
				width : 50,
				checkbox : true
			}, {
				field : 'itemName',
				title : '数据名称',
				width : 200 ,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				} 
			} ] ], 
			columns : [ [{
				field : 'itemCode',
				title : '编码',
				width : 200,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
			},
			{
				field : 'itemnum',
				title : '排序',
				width : 50,
				editor : {
					type : 'numberbox',
					options : {
						required : true
					}
				}
			},{
				field : 'parentItemid',
				title : 'parentItemid',
				width : 50,
				hidden : true
			},{
				field : 'typeid',
				title : 'typeid',
				width : 50,
				hidden : true
			},{
				field : 'isable',
				title : '是否禁用',
				width : 100,
				animate : false,
				lines : !isLessThanIe8(),
				formatter : function(value, rowData, rowIndex) {
					if (value == 0) {
						return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '0', '禁用');
					} else {value == 1;
						return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '1', '可用');
					}
				},
				editor : {
					type : 'combobox',
					options : {
						valueField : 'iconcls',
						textField : 'text',
						panelHeight : '200',
						data : isableData,
						formatter : function(v) {
							return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.iconcls, v.text);
						}
					}
				}
			}] ],
			onDblClickRow : function(row) {
				if (editRow) {
// 					common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
					parent.layer.msg('您没有结束之前编辑的数据，请先保存或取消编辑!',{icon: 5,time:1000});
				} else {
					treegrid.treegrid('beginEdit', row.id);
					editRow = row;
				}
			},
			onAfterEdit : function(row, changes) {   
				if (row.parentId != row.id) {
					$.ajax({
						url : 'resourceAction_doAddItem',
						data : row,
						type : "post",
						cache : false,
						dataType : "json",						
						success : function(r) {
							if (r.result) {editRow = undefined;								
// 							common.alert_info('保存成功');
							parent.layer.msg('保存成功!',{icon: 1,time:1000});
								//treegrid.treegrid('reload');
								//parent.tree.tree('reload');
								editRow = undefined;
							} else {editRow = undefined;	
// 							common.alert_error('保存失败,请确认编码是否重复!');
							parent.layer.msg('保存失败,请确认编码是否重复!',{icon: 5,time:1000});
							}
						}
					});
				} else {
					parent.layer.msg('保存失败，上级数据字典项不可以是自己!',{icon: 5,time:1000});
// 					common.alert_error('保存失败，上级数据字典项不可以是自己!');
				}
			},
			onContextMenu : function(e, row) {
				e.preventDefault();
				$(this).treegrid('unselectAll');
				$(this).treegrid('select', row.id);
				$('#menu').menu('show', {
					left : e.pageX,
					top : e.pageY
				});
			},
			onLoadSuccess : function(row, data) {
				/* 
				var t = $(this);
				if (data) {
					$(data).each(function(index, d) {
						if (this.state == 'closed') {							
						}
					});
				} */
			},
			onExpand : function(row) {
				treegrid.treegrid('unselectAll');
			},
			onCollapse : function(row) {
				treegrid.treegrid('unselectAll');
			},
			onBeforeExpand:function (row){
				treegrid.treegrid('options').url="resourceAction_showResourceItemJson";
				return true;
			}
		});

	   }
	//新增按钮
	function xz(){
		append();
	}
	//新增主节点
	function xzzjd(){
		treegrid.treegrid('unselectAll');
		append();
	}
	//编辑
	function bj(){
		edit();
	}
	//删除
	function sc(){
		removeinfo();
	}
	//保存
	function bc(){
		if (editRow) {
			treegrid.treegrid('endEdit', editRow.id);
		}
	}
	//取消编辑
	function qxbj(){
		if (editRow) {
			if(editRow.itemCode==''){
				//删除点击新增而未做保存的临时数据
				removeNew(editRow.id);
			}else{
			treegrid.treegrid('cancelEdit', editRow.id);
			editRow = undefined;
			}
		}
	}
	//取消选中
	function qxxz(){
		treegrid.treegrid('unselectAll');
	}

	function edit() {
		if (editRow) {
			parent.layer.msg('您没有结束之前编辑的数据，请先保存或取消编辑!',{icon: 0,time:1000});
		} else {
			var node = treegrid.treegrid('getSelected');
			if (node && node.id) {
				treegrid.treegrid('beginEdit', node.id);
				editRow = node;
			}
		}
	}
	function append() {
		if (editRow) {
			parent.layer.msg('您没有结束之前编辑的数据，请先保存或取消编辑!',{icon: 0,time:1000});
		} else {
			var node = treegrid.treegrid('getSelected');
			var data = [ {				
				itemName : '新数据名称',
				itemCode : '',
				itemnum : '99',
				typeid :item_typeid,
				isable : '1',
				parentItemid : (node ? node.id : item_typeid)
			} ];
			var opts = {
				parent : data[0].parentItemid,
				data : data
			};
			 $.ajax({
				url : 'resourceAction_doAddItem',
				data : data[0],
				cache : false,
				dataType : "json",
				success : function(re) {
					if (re.result) {
						data[0].id = re.id;
						treegrid.treegrid('append', opts);

						treegrid.treegrid('beginEdit', data[0].id);
						editRow = data[0];
					} else {
						parent.layer.msg('新增失败',{icon:5,time:1000});
					}
				}
			}); 
		}
	}
	function removeinfo() {
		var node = treegrid.treegrid('getSelected');
		if (node) {
			if (node.id == '0') {
				parent.layer.msg('不能删除根节点!',{icon: 0,time:1000});
				return;
			}
			$.messager.confirm('询问', '您确定要删除【' + node.itemName + '】数据字典项？', function(b) {
				if (b) {
					$.ajax({
						url : 'resourceAction_delItem',
						data : {
							id : node.id
						},
						cache : false,
						dataType : "json",
						success : function(r) {
							if (r==1) {editRow = undefined;
								treegrid.treegrid('remove', node.id);								
								parent.layer.msg('删除成功!',{icon: 1,time:1000});
							}else if (r==2) {
								parent.layer.msg('该数据字典项存在下级数据,不能删除',{icon:0,time:1000});
							} else {
								parent.layer.msg('删除失败',{icon:5,time:1000});
							}
						}
					});
				}
			});
		}
	}
	
	
	function removeNew(id) {	
			$.ajax({
				url : 'resourceAction_delItem',
				data : {
					id : id
				},
				cache : false,
				dataType : "json",
				success : function(r) {
					if (r==1) {editRow = undefined;
						treegrid.treegrid('remove', id);
					}else if (r==2) {
						parent.layer.msg('该数据字典项存在下级数据,不能删除',{icon:0,time:1000});
					} else {
// 						common.alert_error('删除失败!');
						parent.layer.msg('删除失败',{icon:5,time:1000});
					}
				}
			});				
	}
	
	function getSelectJs(str) {
		for ( var i = 0; i < arguments.length - 1; i++) {
			str = str.replace("{" + i + "}", arguments[i + 1]);
		}
		return str;
	};
	
	
	function isLessThanIe8 () {/* 判断浏览器是否是IE并且版本小于8 */
		return false;
	};
</script>
</head>
<body >
<form action="" method="post" id="form_resource_list">
<div class="easyui-layout" style="background-color:#E6EEF8;"> 
            <div data-options="region:'west',split:true,collapsible:false,border:true" style="width:290px;margin-top: 3px; border-left: hidden;overflow: inherit;"  > 
					<div data-options="region:'center',border:true" style="padding-top:0px;overflow:auto;height: 100%" class="pd3">     
						<ul id="treeDiv" class="ztree" style="height:100%;"></ul>
					</div>
			
            </div>   
            <div data-options="region:'center',border:false" style="padding-top:0px;background-color:#E6EEF8; padding-left: 0px;padding-bottom: 48px;height: 100%" class="pd3">
            	<div data-options="region:'north',split:false,border:false">
	            	 <div class="panel " style="background-color:#E6EEF8;padding-top: 3px;padding-bottom: 3px;">
								<div class="panel-header">
<!-- 									    <a class="easyui-linkbutton" iconCls="icon-add" onclick="xz();" plain="true" href="javascript:void(0);">新增</a> -->
<!-- 			                   			<span class="ge"></span> -->
			                   			<a class="easyui-linkbutton" iconCls="icon-add" onclick="xzzjd();" plain="true" href="javascript:void(0);">新增主节点</a>
			                   			<span class="ge"></span>
					                    <a class="easyui-linkbutton" iconCls="icon-edit" onclick="bj();" plain="true" href="javascript:void(0);">编辑</a>
					                    <span class="ge"></span>
					                    <a class="easyui-linkbutton" iconCls="icon-remove" onclick="sc();" plain="true" href="javascript:void(0);">删除</a>
										<span class="ge"></span>
					                    <a class="easyui-linkbutton" iconCls="icon-save" onclick="bc();" plain="true" href="javascript:void(0);">保存</a>
					                    <span class="ge"></span>
					                    <a class="easyui-linkbutton" iconCls="icon-undo" onclick="qxbj();" plain="true" href="javascript:void(0);">取消编辑</a>
					                    <span class="ge"></span>
					                    <a class="easyui-linkbutton" iconCls="icon-undo" onclick="qxxz();" plain="true" href="javascript:void(0);">取消选中</a>
								</div>
						</div>  
					</div> 
               <table id="treegrid" style="height:auto; width:auto;"></table> 
               <div id="menu" class="easyui-menu" style="width:120px;display: none;">
					<div onclick="append();" iconCls="icon-add">新增</div>
					<div onclick="edit();" iconCls="icon-edit">编辑</div>
					<div onclick="removeinfo();" iconCls="icon-remove">删除</div>					
				</div>
            </div>  
        
</div> 
</form>   
</body>
</html>