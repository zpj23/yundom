<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<script type="text/javascript" charset="UTF-8">
	var editRow;
	var treegrid;
	var typeData = [ {
		iconcls : '1',
		text : '机构'
	}, {
		iconcls : '2',
		text : '部门'
	} ];
	$(function() {

		treegrid = $('#treegrid').treegrid({
			url : 'orgAction_showOrgJson',
			title : '',
			iconCls : '',
			fit : true,
			fitColumns : true,
			nowrap : true,
			animate : false,
			border : true,
			idField : 'id',
			treeField : 'orgName',
			toolbar:'#toolbar',
			frozenColumns : [ [ {
				title : 'id',
				field : 'id',
				width : 50,
				hidden : true
			}, {
				field : 'orgName',
				title : '名称',
				width : 200,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
			} ] ],
			columns : [ [ {
				field : 'orgType',
				title : '类别',
				width : 150,
				animate : false,
				lines : !isLessThanIe8(),
				formatter : function(value, rowData, rowIndex) {
					if (value == 1) {
						return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '', '机构');
					} else {
						return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '', '部门');
					}
				}, 
				editor : {
					type : 'combobox',
					options : {
						valueField : 'iconcls',
						textField : 'text',
						panelHeight : '200',
						data : typeData,
						formatter : function(v) {
							return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.iconcls, v.text);
						}
					}
				}
			}, {
				field : 'orgCode',
				title : '编码',
				width : 200,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
			}, {
				field : 'parentDeptid',
				title : '上级部门',
				width : 200,
				formatter : function(value, rowData, rowIndex) {
					return rowData.parentDeptname;
				},
				editor : {
					type : 'combotree',
					options : {
						url : 'orgAction_chooseOrgJson',
						animate : false,
						lines : !isLessThanIe8(),
						onLoadSuccess : function(node, data) {
							var t = $(this);														
							if (data) {
								/* $(data).each(function(index, d) {
									if (this.state == 'closed') {
										t.tree('expandAll');
									}
								}); */
							}
						}
					}
				}
			} , {
				field : 'parentDeptname',
				title : '上级部门',
				width : 80,
				hidden : true
			}  ] ],
			onDblClickRow : function(row) {
				if (editRow) {
					common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
				} else {
					treegrid.treegrid('beginEdit', row.id);
					editRow = row;
				}
			},
			onAfterEdit : function(row, changes) {
				if (row.parentId != row.id) {
					$.ajax({
						url : 'orgAction_doAddOrg',
						type:"post",
						data : row,
						cache : false,
						dataType : "json",
						success : function(r) {
							if (r.result) {editRow = undefined;
								row.parentDeptname = r.parentDeptname;
								row.parentDeptid = r.parentDeptid;
								
								treegrid.treegrid('reload',row.id);								
								//treegrid.treegrid('reload');
								common.alert_info('保存成功');
								//parent.tree.tree('reload');
							} else {
								editRow = undefined;
								common.alert_error('保存组织机构失败!,请确认编码是否重复');
							}
						}
					});
				} else {
					common.alert_error('保存失败，上级组织机构不可以是自己!');
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
				/* var t = $(this);
				if (data) {
					$(data).each(function(index, d) {
						if (this.state == 'closed') {
							t.treegrid('expandAll');
						}
					});
				} */
				treegrid.treegrid('expand','${tagnodeid}');
				
			},
			onExpand : function(row) {
				treegrid.treegrid('unselectAll');
			},
			onCollapse : function(row) {
				treegrid.treegrid('unselectAll');
			}
		});

	});

	function edit() {
		if (editRow) {
			common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
		} else {
			var node = treegrid.treegrid('getSelected');
			if (node && node.id) {
				treegrid.treegrid('beginEdit', node.id);
				editRow = node;
			}
		}
	}
	
	function append() {	
		var node = treegrid.treegrid('getSelected');
		if(node==null){
			common.alert_remind('请选择上级节点!');
		}else{
		  common.openWindow('新增组织机构', 'orgAction_toAddOrg?pid='+node.id, 550, 200);	
		}
	}
	
	function appendBak() {
		if (editRow) {
			common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
		} else {
			var node = treegrid.treegrid('getSelected');
			//  orgType : 1,
			var data = [ {
				orgName : '',				
				orgCode : '',
				parentOrgid : (node ? node.id : '')
			} ];
		 	var opts = {
				parent : data[0].parentOrgid,
				data : data
			};
		 	$.ajax({
				url : 'orgAction_doAddOrg',
				type:"post",
				data : data[0],
				cache : false,
				dataType : "json",
				success : function(r) {
					if (r.result) {
						data[0].id = r.id;
						data[0].parentDeptname = r.parentDeptname;
						treegrid.treegrid('append', opts);

						treegrid.treegrid('beginEdit', data[0].id);
						editRow = data[0];
					} else {editRow = undefined;
					  common.alert_error('保存组织机构失败!,请确认编码是否重复');
					}
				}
			}); 
		}
	}
	
	
	
	function removeinfo() {
		var node = treegrid.treegrid('getSelected');
		if (node) {
			if (node.id == '0') {				
				common.alert_remind('不能删除根节点!');
				return;
			}
			$.messager.confirm('询问', '您确定要删除【' + node.orgName + '】？', function(b) {
				if (b) {
					$.ajax({
						url : 'orgAction_delOrg',
						data : {
							id : node.id
						},
						type:"post",
						cache : false,
						dataType : "json",
						success : function(r) {
							if (r==1) {editRow = undefined;
								//treegrid.treegrid('reload');
								//parent.tree.tree('reload');
								treegrid.treegrid('remove', node.id);								
								common.alert_info('删除成功');
								
							}else if (r==2) {
								common.alert_remind('该组织机构存在下级数据,不能删除');
							}  else {
								common.alert_error('删除失败!');
							}
						}
					});
				}
			});
		}
	}
	
	
	
	function removeNew(id) {		
		$.ajax({
			url : 'orgAction_delOrg',
			data : {
				id : id
			},
			type:"post",
			cache : false,
			dataType : "json",
			success : function(r) {
				if (r==1) {editRow = undefined;
					treegrid.treegrid('remove', id);
				}else if (r==2) {
					common.alert_remind('该组织机构存在下级数据,不能删除');
				}  else {
					common.alert_error('删除失败!');
				}
			}
		});
				
	}
	
	//查询
	function searchinfo(){ 
		var selectword = $("#orgname").val();
		if($.trim(selectword)!=''){		
		    $.post('orgAction_searchorg',{selectword:selectword},function(data){
		    	var obj = $.parseJSON(data);
		    	$('#treegrid').treegrid('collapseAll');
		    	for(var i=0;i<obj.length;i++){
		    		$('#treegrid').treegrid('expand', obj[i].id);
		    	}
		    });
		}
	} 
	
	
	function getSelectJs(str) {
		for ( var i = 0; i < arguments.length - 1; i++) {
			str = str.replace("{" + i + "}", arguments[i + 1]);
		}
		return str;
	};
	
	
	function isLessThanIe8 () {/* 判断浏览器是否是IE并且版本小于8 */
		return ($.browser.msie && $.browser.version < 8);
	};
	
	function saveOrg(){
		if (editRow) {
			treegrid.treegrid('endEdit', editRow.id);
		}
	}
	function cancelUpdateOrg(){
		if (editRow) {
			if(editRow.orgCode==''){
				//删除点击新增而未做保存的临时数据
				removeNew(editRow.id);
			}else{
			treegrid.treegrid('cancelEdit', editRow.id);
			editRow = undefined;
			}
		}
	}
	function refreshOrg(){
		editRow = undefined;
		treegrid.treegrid('reload');
	}
</script>
</head>

<body >
<div class="easyui-layout" data-options= "fit:true">
<div data-options="region:'north',split:false,border:false" >
     <div class="panel pd3" style="background-color :#E6EEF8;" >
            <div class="panel-header" >
            <a class="easyui-linkbutton" iconCls="icon-add" plain="true"
						onclick="append();" href="javascript:void(0);">新增</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-edit" plain="true"
						onclick="edit();" href="javascript:void(0);">编辑</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-remove" plain="true"
						onclick="removeinfo();" href="javascript:void(0);">删除</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-save" plain="true"
						onclick="saveOrg()" href="javascript:void(0);">保存</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-back" plain="true"
						onclick="cancelUpdateOrg();" href="javascript:void(0);">取消编辑</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-back" plain="true"
						onclick="treegrid.treegrid('unselectAll');" href="javascript:void(0);">取消选择</a> <span
						class="ge"></span>
						<a class="easyui-linkbutton" iconCls="icon-refresh" plain="true"
						onclick="refreshOrg();" href="javascript:void(0);">刷新</a>
</div>
</div>
</div>
    <div data-options="region:'center',border:false" style="padding-top :0px; background-color:#E6EEF8 ;" class="pd3" >
       <div id="toolbar" class="datagrid-toolbar" >
         <table cellspacing="0" cellpadding="0" class="search_table">
			<tr>
				<td>机构名称：
				   <input type="text" id="orgname" name="orgname" />						   
				</td>				
				<td>
				<a class="easyui-linkbutton" iconCls="icon-search" plain="true"
						onclick="searchinfo();" href="javascript:void(0);">开始检索</a>
				</td>
			</tr>
	    </table>
	   </div>  		
		<table id="treegrid" title=""></table> 
	</div>
	
	<div id="menu" class="easyui-menu" style="width:120px;display: none;">
		<div onclick="append();" id="tool_adddiv" iconCls="icon-add">新增</div>
		<div onclick="removeinfo();" id="tool_deldiv" iconCls="icon-remove">删除</div>
		<div onclick="edit();" id="tool_updatediv" iconCls="icon-edit">编辑</div>
	</div>
	
 </div>	
</body> 

</html>