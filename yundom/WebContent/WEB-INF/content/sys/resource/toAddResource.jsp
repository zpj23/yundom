<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript">
	$().ready(function() {
		 var pid = '${pid}';
		if (pid != null) {
			$("#level").val(2);
			$("#parentTypeid").val(pid);
			$("#level2tr").css("display", "");
		}
	});
	function closethisWin(){
		var index = parent.layer.getFrameIndex(window.name);
		parent.reflushTree();
		parent.layer.close(index);
	}
	
</script>
</head>
<body id="body">
	<div class="easyui-panel" style="width:auto;border: none">
			<form action="" method="post" id="form_resource" class="form">
				<table class="tableForm">
					<tr>
						<th  width="25%">类型名称：</th>
						<td width="25%">
						    <input class="easyui-validatebox" type="text" name="restype.typeName" id="typeName"
									 data-options="required:true" value="${restype.typeName}" />		
						</td>
					
						<th  width="25%">类型代码：</th>
						<td  width="25%">
							<input class="easyui-validatebox" type="text" name="restype.typeCode" id="typeCode"
									 data-options="required:true,tipPosition:'left'" value="${restype.typeCode}" />
						</td>			 
					</tr>

					<tr>
						<th>类型级别：</th>
						<td>
						    <select name="level" id="level" onchange="chooseLevel(this)" >
								<option value="1">一级</option>
								<option value="2">二级</option>
						    </select>
						</td>
					
						<th>类型上级：</th>
						<td>
							<select name="restype.parentTypeid" id="parentTypeid" style="display: none">
								<option value="">---请选择--</option>
								<c:forEach items="${typeList}" var="a">
									<option value="${a[0]}" ${a[0] eq restype.parentTypeid ?"selected":"" }>
										${a[1]}
									</option>
								</c:forEach>
							</select>							
						</td>
					</tr>
				</table>
				<input type="hidden" name="restype.id" value="${restype.id}" />
			</form>
		
		<div class="dialog-button" style="text-align:center;padding:5px;background-color: white;border: none">
				 <a class="l-btn-left l-btn-icon-left easyui-linkbutton l-btn  " onclick="saveType();">
				 <span class=" ">保存</span><span class="l-btn-icon icon-save" style=""> </span></a>
				 <a class="l-btn-left l-btn-icon-left easyui-linkbutton l-btn  " onclick="closethisWin();">
				 <span class=" ">关闭</span><span class="l-btn-icon icon-cross-octagon"> </span></a>		 
		</div>
    </div>
	<script type="text/javascript">
	//控制二级下拉框的显隐
	function chooseLevel(obj){
		if(obj.value==2){
			$("#parentTypeid").css("display","");
		}else{
			$("#parentTypeid").css("display","none");
		}
	}
	
	
	
	//保存
	var result = false;
	function saveType(){
			$('#form_resource').form('submit',{
				url:'resourceAction_doAddRescource',
				onSubmit:function(){
					// 检查code是否已存在
					var typecode = $("#typeCode").val();
					var typeid = $("#id").val();
					if(typecode!=''){
						$.ajax({
							url:"resourceAction_checkSametypecode?typecode="+typecode+"&typeid="+typeid, 
							async : false,
							success: function(data) {
							if(data==1){
// 								common.alert_error('该数据编码已存在，请重新填写!');
								parent.layer.msg('该数据编码已存在，请重新填写!',{icon: 5,time:1000});
								result = false;
							}else{
								result = $("#form_resource").form('validate');
							}
						  }
						});
					}else{
						result = $("#form_resource").form('validate');
					}
					return result;
				},
			    success: function(){
				//刷新父页面，关闭window
// 				common.alert_success('保存成功','resourceAction_listLevel1');
				 layer.msg('保存成功!',{icon: 1,time:1000});
				 closethisWin();
			 }
			});                
		}
	</script>
</body>
</html>