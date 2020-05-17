<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html>
<html>
<head>
<script type="text/javascript" charset="UTF-8">
	var editRow;
	var treegrid;
	var imgurl="";
	var isPid=false;
	
	var operateTypeData = [ {
		iconcls : 'add',
		text : '新增'
	}, {
		iconcls : 'update',
		text : '编辑'
	},{
		iconcls : 'del',
		text : '删除'
	},{
		iconcls : 'query',
		text : '查询'
	},{
		iconcls : 'view',
		text : '查看'
	},{
		iconcls : 'export',
		text : '导出'
	},{
		iconcls : 'banli',
		text : '办理'
	},{
		iconcls : 'shangbao',
		text : '上报'
	},{
		iconcls : 'guanzhu',
		text : '关注'
	} ];
	
	var openData = [ {
		iconcls : '1',
		text : '弹出新页面'
	}, {
		iconcls : '2',
		text : '本系统'
	}]
	
	$(function() {
		treegrid = $('#treegrid').treegrid({
			url : 'functionAction_showFunctionJson',
			iconCls : '',
			fit : true,
			fitColumns : true,
			nowrap : true,
			animate : true,
			border : true,			
			idField : 'id',
			treeField : 'title',
			frozenColumns : [ [ {
				title : 'id',
				field : 'id',
				width : 50,
				hidden : true
			}, {
				field : 'title',
				title : '名称',
				width : 160,
				editor : {
					type : 'validatebox',
					options : {
						required : true
					}
				}
			} ] ],
			columns : [ [ {
				field : 'picture',
				title : '图标',
				width : 150,
				formatter : function(value, rowData, rowIndex) {
					// images/file/Word.png
					if(value==''){
						return "";
					}else{
					return "<img src='"+value+"' width='16px' height='17px'>";
					}
				},
				editor : {
					type : 'text'
					/*,
					 options : {
						formatter : function(v) {
							return '<iframe src="uploadfileAction_toUploadFile?modulename=mail&tableuuid=123456" width="100%" height="50px"></iframe>';
						}
					} */
				}
			},{
				field : 'url',
				title : '连接地址',
				width : 150,
				editor : {
					type : 'validatebox'
				}
			}, {
				field : 'funnum',
				title : '顺序',
				width : 30,
				editor : {
					type : 'numberbox',
					options : {
						required : true
					}
				}
			},{
				field : 'isPopup',
				title : '操打开方式',
				width : 70,
				animate : false,
				lines : !isLessThanIe8(),
				formatter : function(value, rowData, rowIndex) {					
					var str ="";
					if(value==1){
						str+=" 弹出新页面   ";
					}
					if(value==2){
						str+=" 本系统  ";
					}				
					return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '', str);
				},
				editor : {
					type : 'combobox',
					options : {
						valueField : 'iconcls',
						textField : 'text',
						panelHeight : '200',
						data : openData,
						multiple:"multiple",
						formatter : function(v) {
							return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.iconcls, v.text);
						}
					}
				}
			},{
				field : 'remark',
				title : '备注',
				width : 100,
				editor : {
					type : 'validatebox'
				}
			},{
				field : 'operateType',
				title : '操作',
				width : 150,
				animate : false,
				lines : !isLessThanIe8(),
				formatter : function(value, rowData, rowIndex) {
					value=","+value+",";
					var str ="";
					if(value.indexOf(',add,')>-1){
						str+=" 新增   ";
					}
					if(value.indexOf(',update,')>-1){
						str+=" 编辑  ";
					}
					if(value.indexOf(',del,')>-1){
						str+=" 删除  ";
					}
					if(value.indexOf(',query,')>-1){
						str+=" 查询  ";
					}
					if(value.indexOf(',view,')>-1){
						str+=" 查看  ";
					}
					if(value.indexOf(',export,')>-1){
						str+=" 导出  ";
					}
					if(value.indexOf(',banli,')>-1){
						str+=" 办理  ";
					}
					if(value.indexOf(',shangbao,')>-1){
						str+=" 上报  ";
					}
					if(value.indexOf(',guanzhu,')>-1){
						str+=" 关注  ";
					}
					return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', '', str);
				},
				editor : {
					type : 'combobox',
					options : {
						valueField : 'iconcls',
						textField : 'text',
						panelHeight : '200',
						data : operateTypeData,
						multiple:"multiple",
						formatter : function(v) {
							return getSelectJs('<span class="{0}" style="display:inline-block;vertical-align:middle;width:16px;height:16px;"></span>{1}', v.iconcls, v.text);
						}
					}
				}
			}] ],
			onDblClickRow : function(row) {
				if (editRow) {
					common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
				} else {
					treegrid.treegrid('beginEdit', row.id);
					if(row.picture==''){
						imgurl="";
					}else{
					   imgurl = row.picture;
					}
					editRow = row;
				}
			},
			onBeforeEdit : function(rowIndex, rowData){
				isPid=false;
				var node = treegrid.treegrid('getSelected');
				imgurl = node.picture;
				if(node.parentFunid == '1'){
					isPid=true;
				}
			},
			onAfterEdit : function(row, changes) {
				if (row.parentId != row.id) {
					$.ajax({
						url : 'functionAction_doAddFunction',
						type:"post",
						data : row,
						cache : false,
						dataType : "json",
						success : function(r) {
							if (r.result) {editRow = undefined;												
							    common.alert_info('保存成功');
								//treegrid.treegrid('reload');
								//parent.tree.tree('reload');								
							} else {
								editRow = undefined;
								common.alert_error('保存失败!');
							}
						}
					});
				} else {
					common.alert_error('保存失败，上级功能菜单不可以是自己!');
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
		if (editRow) {
			common.alert_remind('您没有结束之前编辑的数据，请先保存或取消编辑!');
		} else {
			var node = treegrid.treegrid('getSelected');
			//  orgType : 1,
			var data = [ {
				title : '功能菜单名称',				
				url : '',
				funum : '',
				remark : '',
				parentFunid : (node ? node.id : '')
			} ];
		 	var opts = {
				parent : data[0].parentFunid,
				data : data
			};
		 	$.ajax({
				url : 'functionAction_doAddFunction',
				type:"post",
				data : data[0],
				cache : false,
				dataType : "json",
				success : function(r) {
					if (r.result) {
						data[0].id = r.id;
						treegrid.treegrid('append', opts);

						treegrid.treegrid('beginEdit', data[0].id);
						editRow = data[0];
					} else {editRow = undefined;
					common.alert_error('保存失败!');
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
			$.messager.confirm('询问', '您确定要删除【' + node.title + '】？', function(b) {
				if (b) {
					$.ajax({
						url : 'functionAction_delFunction',
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
								common.alert_remind('该功能菜单存在下级数据,不能删除');
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
			url : 'functionAction_delFunction',
			data : {
				id : id
			},
			type:"post",
			cache : false,
			dataType : "json",
			success : function(r) {
				if (r==1) {editRow = undefined;					
					treegrid.treegrid('remove',id);								
				}else if (r==2) {
					common.alert_remind('该功能菜单存在下级数据,不能删除');
				}  else {
					common.alert_error('删除失败!');
				}
			}
		});				
	}	
	
	//选择1级菜单图标
	function choosepic(){
		common.openWindow('选择图标', 'functionAction_choosepic', 200, 200);
	}
	
	function setUrl(str1,url){
		var obj= window.frames["ContentBottomiframe_"+str1].contentWindow.document ;//|| window.frames["rightframe2"]. contentWindow.document;
		obj.frames["cc"].document.getElementById("imgurl").src=url;
		obj.frames["cc"].document.getElementById("pictureurl").value=url;
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
	
	
	$.extend($.fn.datagrid.defaults.editors, {   
	      text: {   
	          init: function(container, options){ 
	        	  if(isPid){
	              var input = $('<iframe id="cc" name="cc" src="uploadfileAction_toUploadFile?modulename=mail&tableuuid=123456&imgurl='+imgurl+'" width="100%" height="23px" ></iframe>').appendTo(container);   
	        	  }else{
	        		  var input = $('<iframe id="cc" name="cc" src="uploadfileAction_toUploadFile?modulename=mail&tableuuid=123456&imgurl=" width="100%" height="23px" ></iframe>').appendTo(container);   
	        	  }
	        	  
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
	
	
	function saveMenu() {
		if (editRow) {
			treegrid.treegrid('endEdit', editRow.id);
		}
	}
	
	function cancelUpdateMenu() {
		if (editRow) {
			if (editRow.funnum == undefined) {
				//删除点击新增而未做保存的临时数据
				removeNew(editRow.id);
			} else {
				treegrid.treegrid('cancelEdit', editRow.id);
				editRow = undefined;
			}
		}
	}
	
	function refreshOrg(){
		 editRow = undefined;
         treegrid.treegrid( 'reload' );

	}
</script>
</head>

<body >
<div class="easyui-layout" data-options= "fit:true">
		<div data-options="region:'north',split:false,border:false">
			<div class="panel pd3" style="background-color: #E6EEF8;">
				<div class="panel-header">
					<a href="#" class="easyui-linkbutton" iconCls="icon-add"
						onclick="append()" plain="true">新增</a> <span class="ge"></span> <a
						href="#" class="easyui-linkbutton" iconCls="icon-edit"
						onclick="edit()" plain="true">编辑</a> <span class="ge"></span> <a
						href="#" class="easyui-linkbutton" iconCls="icon-remove"
						onclick="removeinfo()" plain="true">删除</a> <span class="ge"></span> <a
						href="#" class="easyui-linkbutton" iconCls="icon-save"
						onclick="saveMenu()" plain="true">保存</a> <span class="ge"></span>
					<a href="#" class="easyui-linkbutton" iconCls="icon-back"
						onclick="cancelUpdateMenu()" plain="true">取消编辑</a> <span
						class="ge"></span> <a href="#" class="easyui-linkbutton"
						iconCls="icon-back" onclick="treegrid.treegrid('unselectAll');"
						plain="true">取消选中</a> <span class="ge"></span> <a href="#"
						class="easyui-linkbutton" iconCls="icon-refresh"
						onclick="refreshOrg()" plain="true">刷新</a>
				</div>
			</div>
		</div>
		<div data-options="region:'center',border:false" style="padding-top :0px; background-color:#E6EEF8 ;" class="pd3">		
		<table id="treegrid"></table>
	</div>
	
	<div id="menu" class="easyui-menu" style="width:120px;display: none;">
		<div onclick="append();" iconCls="icon-add">新增</div>
		<div onclick="edit();" iconCls="icon-edit">编辑</div>
		<div onclick="removeinfo();" iconCls="icon-remove">删除</div>
	</div>
	<input type="hidden"  id="aa" value="" />
 </div>	
</body> 

</html>