<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="newUI/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!-- <script type="text/javascript" src="js/sys/user/add.js"></script> -->
<title>新增供应商</title>

</head>
<body>
<div class="pd-20">
  <form action="jlSupplierInfoAction_saveSupplier" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="supper.id" value="${supper.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>供应商名称：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${supper.name}" placeholder="店名、公司名、厂名" id="name" name="supper.name" datatype="*2-16" nullmsg="供应商名称不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3">地址：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${supper.address}" name="supper.address" id="address"  nullmsg="请输入地址！">
      </div>
      <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>联系人：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${supper.contactname}" placeholder="" id="contactname" name="supper.contactname" datatype="*2-16" nullmsg="联系人不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>联系电话：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${supper.phone}" placeholder="" id="phone" name="supper.phone"  nullmsg="">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>类型：</label>
      <div class="formControls col-5">
        <select  id="state" name="supper.state" class="select">
    			<option value="1">供应商</option>
    			<option value="2">维修商</option>
    		</select>
      </div>
      <div class="col-4"> </div>
    </div>
  
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="supper.remark" id="remark" value="${supper.remark}" cols="" rows=""  class="textarea"  placeholder="说点什么...最少输入2个字符"  dragonfly="true" nullmsg="" onKeyUp="textarealength(this,100)"></textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit"  value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
      </div>
    </div>
  </form>
</div>
</div>
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<script type="text/javascript">
var demon;
$(function(){
	
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
		beforeSubmit:function(form){
// 			alert("验证成功");
			
		},
		callback:function(data){
			console.log(data);
// 			$.Showmsg();
			if(data.map.status=="1"){
				$.Hidemsg();
				layer.msg('保存成功!',{icon: 1,time:1000});
	  			closethisWin();
			}else{
				layer.msg('保存失败!',{icon: 5,time:1000});
			}
		//	setTimeout('closethisWin()', 1000); 
		}
	}
	);
	$("#remark").html("${supper.remark}");
	$("#state").val("${supper.state}");
});
//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
//	parent.$('.btn-refresh').click();
	console.log(parent);
	parent.tolist();
	parent.layer.close(index);
}
</script>
</body>
</html>