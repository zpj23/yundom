<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<link rel="stylesheet" href="/Core/js/codemirror/codemirror.css">
<script src="/Core/js/codemirror/codemirror.js"></script>
<script src="/Core/js/codemirror/mode/velocity/velocity.js"></script>
<script src="/Core/js/codemirror/addon/selection/active-line.js"></script>
<script src="/Core/js/codemirror/addon/edit/matchbrackets.js"></script>
<style type="text/css">
      .CodeMirror {
        border: 1px solid #eee;
        height: auto;
      }
      .CodeMirror-scroll {
        overflow-y: hidden;
        overflow-x: auto;
      }
 </style>


<form id="form1">
<table class="tableForm" width="100%">
	<s:hidden name="porlet.id"></s:hidden>
	<tr>
		<th>标识：</th>
		<td> <s:textfield theme="simple" name="porlet.code"></s:textfield> </td>
	</tr>
	<tr>
		<th>名称：</th>
		<td> <s:textfield theme="simple" name="porlet.name"></s:textfield> </td>
	</tr>
	<tr>
		<th>高度：</th>
		<td> <s:textfield theme="simple" name="porlet.height"></s:textfield> </td>
	</tr>
	<tr>
		<th>数据源类别：</th>
		<td> <s:radio theme="simple" name="porlet.dataType" list="#{'service':'Service方法','query':'自定义查询'}" listKey="key" listValue="value"></s:radio> </td>
	</tr>
	<tr>
		<th>是否显示更多：</th>
		<td> <s:radio theme="simple" name="porlet.ismore" list="#{'1':'是','0':'否'}" listKey="key" listValue="value"></s:radio> </td>
	</tr>
	<tr>
		<th>方法路径：</th>
		<td> <s:textfield theme="simple" name="porlet.dataUrl"></s:textfield> </td>
	</tr>
	<tr>
		<th>模板：</th>
		<td>
		 <div style="max-width: 60em;" >
		<s:textarea cols="70" rows="8" theme="simple" name="porlet.template" id="template" >
		
		</s:textarea>
		</div>
		</td>
	</tr>
	<tr>
		<td colspan="2">
			<input type="button" value="保存" onclick="save()" >
		</td>
	</tr>
</table>

</form>
    <script>
      var editor = CodeMirror.fromTextArea(document.getElementById("template"), {
        lineNumbers: true,
        viewportMargin: Infinity
      });
      
      function save(){
    		$('#form1').form('submit',{
    			url:'PorletAction_save',
    			onSubmit:function(){						 

    			},
    		    success: function(){	
    		    	//alert('反馈成功');
    				//location.href = "DCDBAction_toList";
    				
    				//$("#feedback_datagrid",window.parent.document).datagrid('reload');
    				//common.closeWindow(null);
    		    	common.alert_success('保存成功','PorletAction_toDeal?type=list');
    		 	}
    		});        
    	} 
    </script>

</html>
