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
var deparmentids=parent.departmentids;
$(document).ready(function(){
   initTree();
});

function initTree(){
	$("#tt").tree({
		url:'jlDepartmentInfoAction_showCheckTree?checkids='+deparmentids,
	    checkbox:true,
	    parentField: 'pid',
		animate: true,
		cascadeCheck: false,
        onCheck: function (node, checked) {
            if (checked) {
                var parentNode = $("#tt").tree('getParent', node.target);
                if (parentNode != null) {
                    $("#tt").tree('check', parentNode.target);
                }
            } else {
                var childNode = $("#tt").tree('getChildren', node.target);
                if (childNode.length > 0) {
                    for (var i = 0; i < childNode.length; i++) {
                        $("#tt").tree('uncheck', childNode[i].target);
                    }
                }
            }
        },
         loadFilter: function(data){	
        	  var opt = $(this).data().tree.options;
              var idFiled, textFiled, parentField;
              if (opt.parentField) {
                  idFiled = opt.idFiled || 'id';
                  textFiled = opt.textFiled || 'text';
                  parentField = opt.parentField;
                  var i, l, treeData = [], tmpMap = [];
                  for (i = 0, l = data.length; i < l; i++) {
                      tmpMap[data[i][idFiled]] = data[i];
                  }
                  for (i = 0, l = data.length; i < l; i++) {
                      if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
                          if (!tmpMap[data[i][parentField]]['children'])
                              tmpMap[data[i][parentField]]['children'] = [];
                          data[i]['text'] = data[i][textFiled];
                          tmpMap[data[i][parentField]]['children'].push(data[i]);
                      } else {
                          data[i]['text'] = data[i][textFiled];
                          treeData.push(data[i]);
                      }
                  }
                  return treeData;
              }
              return data;
	     }, 
	     onDblClick:function(){
	    	 var cnode = $("#tt").tree('getSelected');
	    	 if(cnode!=null){
	    		 var pnode=$("#tt").tree('getParent',cnode.target);
		    	 toEdit(pnode,cnode);
	    	 }
	     }

	});
	
}


function toRefreshTree(){
	var node = $('#tt').tree('getSelected');
	var pnode=$('#tt').tree('getParent',node.target);
	if(pnode!=null){
		$('#tt').tree("reload",pnode.target);
		$('#tt').tree("expand",pnode.target);
	}else{
		$('#tt').tree("reload",node);
	}
}
function getTreeIds(){
	var nodes = $('#tt').tree('getChecked');
	var s = '';
	var m='';
	for(var i=0; i<nodes.length; i++){
		if(nodes[i].id){
			if (s != '') s += ',';
			if(m!='') m+=',';
			
			s += nodes[i].id;
			m += nodes[i].text;
		}
		
	}
	
	parent.choose_department_back(s,m);
	
}

function chooseDepartment(){
	getTreeIds();
 	var index = parent.layer.getFrameIndex(window.name);
	
	parent.layer.close(index);
}


</script>
</head>
<body style="border: 0px;">

	<div id="cc" class="easyui-layout" data-options="fit:true,border:false" style="overflow-y:auto;">
			<div class="easyui-panel" style="padding:10px;height: 400px;border: 0px;">
				<ul id="tt"  class="easyui-tree"  ></ul>
			</div>			
			<div class="easyui-panel" style="padding-left:100px;height: 50px;border: 0px;">
				<input type="button"  onclick="chooseDepartment()"  value="&nbsp;&nbsp;提交&nbsp;&nbsp;"/>
			</div>
	</div>
	
	
	<script type="text/javascript">
	
	</script>
</body>
</html>