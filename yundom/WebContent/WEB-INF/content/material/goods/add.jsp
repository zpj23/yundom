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
<title>新增物资</title>
<script type="text/javascript">
	function changeSup(){
		$("#suppliername").val($("#supplierid").find("option:selected").text());
	}
</script>
</head>
<body>
<div class="pd-20">
  <form action="jlGoodsInfoAction_saveGoods" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="goods.id" value="${goods.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>物资名称：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${goods.name}" placeholder="" id="name" name="goods.name" datatype="*2-16" nullmsg="物资名称不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3">规格型号：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${goods.type}" name="goods.type" placeholder="袋装、瓶装、箱装、斤称、个、台" id="type"  nullmsg="请输入规格型号">
      </div>
      <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>单位：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${goods.unit}" placeholder="斤、瓶、箱、个、台" id="unit" name="goods.unit" datatype="*1-16" nullmsg="单位不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>单价（元）：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${goods.price}" placeholder="" id="price" name="goods.price"  datatype="*1-5" nullmsg="单价不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
   <div class="row cl">
      <label class="form-label col-3">供应商：</label>
      <div class="formControls col-5"> <span class="select-box">
      <input type="hidden" id="suppliername" name="goods.suppliername" value="${goods.suppliername}" />
        <select class="select" size="1" name="goods.supplierid" id="supplierid" value="${goods.supplierid}" onchange="changeSup()" datatype="*" nullmsg="请选择供应商！">
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="goods.remark" id="remark" value="${goods.remark}" cols="" rows=""  class="textarea"  placeholder="说点什么..." datatype="*0-100" dragonfly="true" nullmsg="" onKeyUp="textarealength(this,100)"></textarea>
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
	
	$.ajax({
		   type: "POST",
		   url: "jlSupplierInfoAction_getSupplier?state=1",
		   async:false,
		   success: function(data1){
			  var str="";
			  var data = $.parseJSON(data1);
			  str="<option value='' >请选择</option>";
			  for(var i=0;i<data.length;i++){
				 str+="<option value='"+data[i].id+"' >"+data[i].name+"</option>";
			  }
			  $("#supplierid").html(str);
			  $('#supplierid').val("${goods.supplierid}");
			  $('#remark').html("${goods.remark}");
		   }
	});
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