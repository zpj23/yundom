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

var demon;
$(function(){
	
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
		callback:function(data){
			console.log(data);
			if(data.map.status=="y"){
				$.Hidemsg();
				layer.msg('保存成功!',{icon: 1,time:1000});
// 	  			closethisWin();
			setTimeout('closethisWin()', 1000); 
			}
		}
	}
	);
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

function closeWin(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.layer.close(index);
}

</script>
</head>
<body style="overflow: hidden">
<div >
  <form action="jlSalaryInfoAction_doAdd" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="sInfo.id" value="${sInfo.id}" />
    <div class="row cl">
      <label class="form-label col-3">序号：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${sInfo.orderNum}" placeholder="序号（数字）" id="orderNum" name="sInfo.orderNum"  >
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">姓名：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${sInfo.userName}" placeholder="示例：朱培军" id="userName" name="sInfo.userName" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">银行：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${sInfo.bankName}" placeholder="示例：工行" id="bankName" name="sInfo.bankName" />
      </div>
      <div class="col-4"> </div>
    </div>
	<div class="row cl">
      <label class="form-label col-3">卡号：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${sInfo.bankCard}" placeholder="示例：6812345678979878" id="bankCard" name="sInfo.bankCard" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">预付款：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${sInfo.advance}" placeholder="示例：2000" id="advance" name="sInfo.advance" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">年月：</label>
      <div class="formControls col-5">
      	<input type="text" class="input-text" value="${sInfo.year}" placeholder="示例：年月" id="year" name="sInfo.year" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="sInfo.remark" id="remark"  cols="" rows=""  class="textarea"  placeholder="说点什么..." >${sInfo.remark}</textarea>
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