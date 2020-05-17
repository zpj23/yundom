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
		beforeSubmit:function(curform){
			var df="";
			try{
				recordDetail.tempSaveData();
				df=recordDetail.transfer_to_par;
			}catch(e){
				recordDetail.contentWindow.tempSaveData();
				df=recordDetail.contentWindow.transfer_to_par;
			} 
			$("#detailfileds").val(df);
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
			  $('#departmentcode').val("${recordInfo.departmentcode}");
 			  if("${recordInfo.createtime}"!=""){
				  $('#createtime').val("${recordInfo.createtime}".substring(0,10));
 			  }else{
 				 var rq=getNowFormatDate();
 				 $('#createtime').val(rq);
 			  }

			  
		   }
	});
	changeDep();
	var rid="${recordInfo.id}";
	document.getElementById('recordDetail').src="jlRecordInfoAction_toListRecordDetail?rid="+rid;
	
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

//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
//	parent.$('.btn-refresh').click();
// 	console.log(parent);
	parent.tolist();
	parent.layer.close(index);
}
</script>
</head>
<body style="overflow: auto">
<div >
  <form action="jlRecordAction_saveRecord" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="recordInfo.id" value="${recordInfo.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>领用日期：</label>
      <div class="formControls col-5">
        <input type="text"  id="createtime" datatype="*" onfocus="WdatePicker()" name="recordInfo.createtime" class="input-text Wdate"  style="width:120px;" value="" nullmsg="不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>领用人：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${recordInfo.lyr}" placeholder="领用人姓名" id="lyr" name="recordInfo.lyr" datatype="*1-100" nullmsg="领用人不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>领用部门：</label>
      <div class="formControls col-5"> <span class="select-box">
      	<input type="hidden" id="departmentname" name="recordInfo.departmentname" value="${recordInfo.departmentname}"/>
        <select class="select" size="1" name="recordInfo.departmentcode" id="departmentcode" value="${recordInfo.departmentcode}" onchange="changeDep()" datatype="*" nullmsg="请选择领用部门！">
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
      <label class="form-label col-3">附件：</label>
      <div class="formControls col-5">
          <mf:FileUpload id="recordFj" mode="edit" moduleID="${recordInfo.id}" moduleType="record"></mf:FileUpload>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="recordInfo.remark" id="remark" value="" cols="" rows=""  class="textarea"  placeholder="说点什么..."  dragonfly="true" nullmsg="内容不能为空！" onKeyUp="textarealength(this,500)">${recordInfo.remark}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/500</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">清单列表：</label>
      <div class="formControls col-7">
      		<input type="hidden" id="detailfileds" name="detailfileds" value="" />
           <iframe id="recordDetail" name="recordDetail" src="" width="100%" height="300" frameborder="0"></iframe>
      </div>
      <div class="col-4"> </div>
    </div>
    
    
    <div class="row cl">
      <div class="col-9 col-offset-3">
<!--       	<input class="btn btn-primary radius"  type="button" value="提 交" id="tijiao"  /> -->
        <input class="btn btn-primary radius" type="submit" id="tijiao"  value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
      </div>
    </div>
  </form>
</div>
</div>

</body>
</html>