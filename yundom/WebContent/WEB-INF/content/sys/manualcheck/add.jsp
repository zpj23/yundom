<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
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

<script type="text/javascript">
//初始化部门名称中文，根据已选择的部门编码
function changeDep(){
	$("#departmentname").val($("#departmentcode").find("option:selected").text());
}

var demon;
$(function(){
	
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
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
// 	$("#tijiao").click(function(){
// 		demo.ajaxPost();
// 		return false;
// 	});
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
			  $('#departmentcode').val("${cinfo.departmentcode}");
			  $('#address').val("${cinfo.address}");
 			  if("${cinfo.workdate}"!=""){
				  $('#workdate').val("${cinfo.workdate}".substring(0,10));
 			  }else{
 				 var rq=getNowFormatDate();
 				 $('#workdate').val(rq);
 			  }

			  
		   }
	});
	changeDep();
});

//获取当前时间
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
    return currentdate;
}

function judgeDate(obj){
	
	var workdate=$(obj).val();
	var currentdate=getNowFormatDate();
	if(workdate>currentdate){
		$(obj).attr("nullmsg","已超出当前日期");
	}
}

//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
//	parent.$('.btn-refresh').click();
// 	console.log(parent);
	parent.tolist();
	parent.layer.close(index);
}

function closeWin(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

</script>
</head>
<body style="overflow: hidden">
<div >
  <form action="jlManualCheckInfoAction_doAdd" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="cinfo.id" value="${cinfo.id}" />
    <input type="hidden"  value="${cinfo.address}" id="address" name="cinfo.address"  />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>施工日期：</label>
      <div class="formControls col-5">
        <input type="text"  id="workdate" datatype="*" onfocus="WdatePicker()" name="cinfo.workdate" class="input-text Wdate"  style="width:120px;" value="" nullmsg="不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">施工项目：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${cinfo.sgxm}" placeholder="示例：636/688;多个项目用/分割" id="sgxm" name="cinfo.sgxm" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">施工区域：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${cinfo.sgqy}" placeholder="示例：609/集控室，多个区域用/分割，/与施工项目一一对应" id="sgqy" name="cinfo.sgqy" />
      </div>
      <div class="col-4"> </div>
    </div>

    <div class="row cl">
      <label class="form-label col-3">具体内容：</label>
      <div class="formControls col-5">
        <textarea name="cinfo.workcontent" id="workcontent"  cols="" rows=""  class="textarea"  placeholder="说点什么..." datatype="*1-500" dragonfly="true" nullmsg="内容不能为空！" onKeyUp="textarealength(this,500)">${cinfo.workcontent}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>施工人员：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${cinfo.staffname}" placeholder="多个人用，分隔（中文下的逗号）" id="staffname" name="cinfo.staffname" datatype="*1-400" nullmsg="施工人员不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>出勤时间（小时）：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" datatype="*" value="${cinfo.workduringtime}" placeholder="默认8小时（数字）" id="workduringtime" name="cinfo.workduringtime"   nullmsg="出勤时间不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>加班时间（小时）：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text"  value="${cinfo.overtime}" placeholder="数字" id="overtime" name="cinfo.overtime"   nullmsg="">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>所属地区：</label>
      <div class="formControls col-5"> <span class="select-box">
      	<input type="hidden" id="departmentname" name="cinfo.departmentname" value="${cinfo.departmentname}"/>
        <select class="select" size="1" name="cinfo.departmentcode" id="departmentcode" value="${cinfo.departmentcode}" onchange="changeDep()" datatype="*" nullmsg="请选择所属部门！">
          <option value="" selected>请选择部门</option>
          <option value="1">技术部</option>
          <option value="2">实施部</option>
          <option value="3">企划部</option>
<!--           <option value="4">admin</option> -->
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    
    
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="cinfo.remark" id="remark" value="" cols="" rows=""  class="textarea"  placeholder="说点什么..."  dragonfly="true" nullmsg="内容不能为空！" onKeyUp="textarealength(this,500)">${cinfo.remark}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit" id="tijiao"  value="&nbsp;&nbsp;提&nbsp;&nbsp;交&nbsp;&nbsp;">
      	<input class="btn btn-danger radius"  type="button" value="&nbsp;&nbsp;关   闭&nbsp;&nbsp;" id="backButton" onclick="closeWin()" />
      </div>
    </div>
  </form>
</div>
</div>

</body>
</html>