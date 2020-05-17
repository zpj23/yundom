<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ include file="/common/h-ui_header.jsp"%>  
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<title>新增页面</title>
<script type="text/javascript">
$(function(){
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
		beforeSubmit:function(curform){
			var df="";
			try{
				manager_iframe.tempSaveData();
				df=manager_iframe.transfer_to_par;
			}catch(e){
				manager_iframe.contentWindow.tempSaveData();
				df=manager_iframe.contentWindow.transfer_to_par;
			} 
			$("#detailfileds").val(df);
			console.log(df);
			return true;
		},
		callback:function(data){
			if(data.map.status=="y"){
				$.Hidemsg();
				layer.msg('保存成功!',{icon: 1,time:1000});
// 	  			closethisWin();
			setTimeout('closethisWin()', 1000); 
			}
		}
	}
	);
	
	initDep();
	
});
//初始化部门名称中文，根据已选择的部门编码
function changeDep(){
	$("#departmentname").val($("#departmentcode").find("option:selected").text());
}
function initDep(){
	$.ajax({
		   type: "POST",
		   url: "jlDepartmentInfoAction_getDep",
		   async:false,
		   success: function(data1){
			  var str="";
			  var data = $.parseJSON(data1);
			  str="<option value='' >请选择</option>";
			  for(var i=0;i<data.length;i++){
				 str+="<option value='"+data[i].code+"' >"+data[i].name+"</option>";
			  }
			  $("#departmentcode").html(str);
			  $('#departmentcode').val("${jluserinfo.departmentcode}");
			  changeDep();
		   }
	});
}


//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.tolist();
	parent.layer.close(index);
}
</script>
</head>
<body style="overflow: hidden;padding:5px;">
<form action="jlManualCheckInfoAction_doManageAdd" name="form1" method="post" class="form form-horizontal" id="form1">
	<input type="hidden" id="detailfileds" name="detailfileds" value="" />
	<div class="row cl">
      <label class="form-label col-1"><span class="c-red">*</span>施工日期：</label>
      <div class="formControls col-5">
        <input type="text"  id="workdate" datatype="*" onfocus="WdatePicker()" name="workdate" class="input-text Wdate"  style="width:120px;" value="" nullmsg="不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-1"><span class="c-red">*</span>所属工地：</label>
      <div class="formControls col-5"> <span class="select-box">
      	<input type="hidden" id="departmentname" name="departmentname" value=""/>
        <select class="select" size="1" name="departmentcode" id="departmentcode" value="" onchange="changeDep()" datatype="*" nullmsg="请选择所属部门！">
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
    <label class="form-label col-1"><span class="c-red">*</span>具体信息：</label>
      <div class="formControls col-10">
    	<iframe id="manager_iframe" name="manager_iframe" src="jlManualCheckInfoAction_managerIframe" width="100%" height="300" frameborder="0"></iframe>
	  </div>
	  <div class="col-4"> </div>
	</div>
	<div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit" id="tijiao"  value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
      </div>
    </div>
</form>
</body>
</html>