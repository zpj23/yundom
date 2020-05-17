<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>	
		<link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
			type="text/css">		
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
		<script type="text/javascript"
			src="js/ztree/js/jquery.ztree.excheck-3.5.js"></script>
		<script type="text/javascript" src="js/sys/function/function.js"></script>

		<SCRIPT type="text/javascript">
		
			var setting = {
			check: {
				enable: true,
				//chkboxType: {"Y":"", "N":""},
				nocheckInherit: false
			},
			view: {
				dblClickExpand: false
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				beforeClick: beforeClick,
				onCheck: onCheck
			}
		};

		var zNodes = ${functionjson};

		function beforeClick(treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeOrgDiv");
			zTree.checkNode(treeNode, !treeNode.checked, null, true);
			return false;
		}
		
		function onCheck(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj("treeOrgDiv"),
			nodes = zTree.getCheckedNodes(true),
			v = ""; z="";  
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
				z += nodes[i].id + ",";  
			}
			
			if (z.length > 0 ) z = z.substring(0, z.length-1);
			var idObj = $("#menuids");
			idObj.attr("value", z); 
			
		}

		function onBodyDown(event) {
			if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length>0)) {
				hideMenu();
			}
		}

		$(document).ready(function(){ 
		      if(zNodes==0){
		    	  common.alert_error("请在功能管理模块下设置功能菜单");
		      }
			$.fn.zTree.init($("#treeOrgDiv"), setting, zNodes);
		});
		
		
		
		
		//设置角色下的功能点
		function setRoleFunction(){
			var menuids = $("#menuids").val();
			var roleid = $("#roleid").val();
			if(menuids==''){
				common.alert_remind('请选择功能菜单!');
				return false;
			}
			$.messager.confirm('询问', '您确定保存吗', function(b) {
				if (b) {
					$.ajax({
						url : 'functionAction_setRoleFunction',
						data : {
							roleid : roleid,
							menuids : menuids
						},
						success : function(r) {
							if (r==1) {								
								common.msg('提示','保存成功','remind');
								common.closeWindow(null);
								
							}else {
								common.msg('提示','保存失败!','remind');
							}
						}
					});
				}
			});
			//form1.action ="functionAction_setRoleFunction";
			//form1.submit();
			
		}
	</SCRIPT>

	</head>
	<body style="height: 100%;">		
		<div class="RightConter" id="RightConter">
			<div class="Form" >
				<form action="" method="post" id="form1">					
					<div class="FormMain" id="FormMain">
						<div id="menuContent" class="" style="position: absolute;">
							<div id="treeOrgDiv" class="ztree"
								style="margin-top: 0; width: 270px; height: 300px;"></div>
							
						</div>
						
					</div>
				</form>				
			</div>
			
		</div>
		<div style="float: right;">
			<input type="hidden" name="roleid" id="roleid" value="${roleid}" />
			<input type="hidden" name="menuids" id="menuids"
				value="${menuids}" />

			<!-- <input type="button" class="ListButton"
				onclick="setRoleFunction()" value="保存" /> -->
			<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-save" onclick="setRoleFunction();">保存</a>	
		</div>
	</body>
</html>