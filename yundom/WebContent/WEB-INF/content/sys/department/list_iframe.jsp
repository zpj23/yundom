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
   initTree();
});

function initTree(){
	$("#tt").tree({
		url:'jlDepartmentInfoAction_showChildNode',
		
		onBeforeExpand:function(node,param){  
	        $('#tt').tree('options').url = "jlDepartmentInfoAction_showChildNode?id=" + node.id;
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
	    		 var pnode=$("#tt").tree('getParent',cnode.target);
		    	 toEdit(pnode,cnode);
	    	 }
	     },

	     onContextMenu: function(e,node){
	  		e.preventDefault();
	  		$("#tt").tree('select',node.target);
	  		$('#mm').menu('show',{
	  			left: e.pageX,
	  			top: e.pageY
	  		});
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
function toEdit(pnode,cnode){
	var cpk="";
	var ppk="";
	if(cnode.attributes!=null){
		cpk=cnode.attributes.pk;
	}
	if(pnode.attributes!=null){
		ppk=pnode.attributes.pk;
	}
	document.getElementById("detail_frame").src="jlDepartmentInfoAction_toAdd?id="+cpk+"&pid="+ppk;
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
		<div data-options="region:'west',border:false" style="width:300px;">
							<div class="easyui-panel" style="padding:5px;height: 500px">
						<ul id="tt"  ></ul>
					</div>
					<div id="mm" class="easyui-menu" style="width:120px;">
						<div onclick="append()" data-options="iconCls:'icon-add'">新增</div>
						<div onclick="removeit()" data-options="iconCls:'icon-remove'">删除</div>
						<div class="menu-sep"></div>
						<div onclick="expand()">展开</div>
						<div onclick="collapse()">合并</div>
					</div>
		</div>
		<div data-options="region:'center',border:false" style="padding:20px">
			<iframe id="detail_frame" name="detail_frame" src="" width="100%" height="90%" frameborder="0"></iframe>
		</div>
	</div>
	
	
	<script type="text/javascript">
	
	</script>
</body>
</html>