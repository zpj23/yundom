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

$(document).ready(function(){
//    initTree();
});

//初始化组织结构
function initTree(){
	$("#tt").tree({
		url:'jlDepartmentInfoAction_showChildNodeOrUser',
		
		onBeforeExpand:function(node,param){  
	        $('#tt').tree('options').url = "jlDepartmentInfoAction_showChildNodeOrUser?id=" + node.id;
	    },  
		animate: true,
         loadFilter: function(data){	
	          if (data.msg){	
	            return data.msg;	
	         } else {	
	           return data;	
	         }	
	     }, 
	     onDblClick:function(){
	    	 var cnode = $("#tt").tree('getSelected');
	    	 if(cnode!=null){
		    	 toShow(cnode);
	    	 }
	     },

	     onContextMenu: function(e,node){
	  		e.preventDefault();
	  		$("#tt").tree('select',node.target);
// 	  		$('#mm').menu('show',{
// 	  			left: e.pageX,
// 	  			top: e.pageY
// 	  		});
	  	}
	});
	
}
//新增
function append(){
	var t = $('#tt');
	var node = t.tree('getSelected');
	t.tree('append', {
		parent: (node?node.target:null),
		data: [{
			text: '新建部门'
		}]
	});
}
//删除
function removeit(){
	var node = $('#tt').tree('getSelected');
	if(node!=null){
		parent.removeDep(node.attributes.pk);
	}
}
function removeJd(){
	var node = $('#tt').tree('getSelected');
	var pnode=$('#tt').tree('getParent',node.target);
	$('#tt').tree('remove', node.target);
	$('#tt').tree("reload",pnode.target);
	$('#tt').tree("expand",pnode.target);
}
function collapse(){
	var node = $('#tt').tree('getSelected');
	$('#tt').tree('collapse',node.target);
}
function expand(){
	var node = $('#tt').tree('getSelected');
	$('#tt').tree('expand',node.target);
}
//双击打开新增或编辑页面
function toShow(cnode){
	var type="";
	var id="";
	if(cnode.attributes!=null){
		type=cnode.attributes.type;// 双击树的元素的类型people 或者 department
		id=cnode.attributes.id;
	}
	
	document.getElementById("attandance_list_frame").src="jlAttendanceInfoAction_toListOne?id="+id+"&type="+type;
// 	alert(2);
// 	detail_frame.src="jlDepartmentInfoAction_toAdd?id="+cpk+"&pid="+ppk;
}

//打开选择人员列表界面
function user_show(title,url,w,h){
	parent.layer_show(title,url,w,h);
}
//成功选择人员返回
function user_chooseBack(userid,username){
	detail_frame.user_chooseBack(userid,username);
}
function toRefreshTree(){
	document.getElementById("detail_frame").src="";
	var node = $('#tt').tree('getSelected');
	var pnode=$('#tt').tree('getParent',node.target);
	$('#tt').tree("reload",pnode.target);
	$('#tt').tree("expand",pnode.target);
}

</script>
</head>
<body>

	<div style="margin:20px ;"></div>
	<div id="cc" class="easyui-layout" data-options="fit:true,border:false">
<!-- 		<div data-options="region:'north'" style="height:50px"></div> -->
<!-- 		<div data-options="region:'south'" style="height:50px;"></div> -->
<!-- 		<div data-options="region:'west',border:false" style="width:300px;"> -->
<!-- 							<div class="easyui-panel" style="padding:5px;height: 500px"> -->
<!-- 						<ul id="tt"  ></ul> -->
<!-- 					</div> -->
<!-- 					<div id="mm" class="easyui-menu" style="width:120px;"> -->
<!-- 						<div onclick="append()" data-options="iconCls:'icon-add'">Append</div> -->
<!-- 						<div onclick="removeit()" data-options="iconCls:'icon-remove'">Remove</div> -->
<!-- 						<div class="menu-sep"></div> -->
<!-- 						<div onclick="expand()">Expand</div> -->
<!-- 						<div onclick="collapse()">Collapse</div> -->
<!-- 					</div> -->
<!-- 		</div> -->
		<div data-options="region:'center',border:false" style="padding-left:5px">
			<iframe id="attandance_list_frame" name="attandance_list_frame" src="" width="100%" height="500px" frameborder="0"></iframe>
		</div>
	</div>
	
	
	<script type="text/javascript">
	
	</script>
</body>
</html>