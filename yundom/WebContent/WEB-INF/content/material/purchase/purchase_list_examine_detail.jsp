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
<link href="newUI/css/style.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script>  
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="newUI/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="newUI/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title></title>
<script type="text/javascript">
$(function(){
// 	var demon=$("#form1").Validform({
// 		tiptype:2,		
// 		ajaxPost:true,
// 		beforeSubmit:function(form){
			
// 		},
// 		callback:function(data){
// 			console.log(data);
// 			$.Hidemsg();
// 			 //$.parseJSON(data);
// 			 var obj=data.map;
// 		      if(obj.flag){
// 		       	alert(1);
// 		    	  parent.saveDetail(obj.id);
// 		      }else{
// 		    	  layer.msg('保存失败!',{icon: 1,time:1000})
// 		      }
// 		}
// 	});
  
   initDep();
    
});

  function setJine(total){
      $('#totalprice').val(total);
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
       str+="<option value='"+data[i].id+"' >"+data[i].name+"</option>";
      }
      $("#departmentid").html(str);
      $("#departmentid").val("${purchase.departmentid}");
     }
});
 }
 function save(){
    $("#state").val("2");
    sub();
 }
 function unsave(){
     $("#state").val("3");
     sub();
 }
 function sub(){
  $.ajax({
    type: "POST",
     url: "jlPurchaseInfoAction_examinePurchase",
     async:false,
     data:"state="+$("#state").val()+"&id="+$("#id").val(),
     success: function(data1){
    	 var data=$.parseJSON(data1);
    	 if(data.map.flag){
	    	 layer.msg('审核成功!',{icon: 1,time:1000});
	    	 closethisWin();
    	 }else{
    		 layer.msg('审核失败!',{icon:5,time:1000});
    	 }
     }
  });
 }
//关闭该窗口
 function closethisWin(){
	parent.closethisWin();
 }
</script>
</head>
<body>
<form action="" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="state" name="state" value=""/>
    <input type="hidden" id="id" name="id" value="${purchase.id}"/>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>合计金额：</label>
      <div class="formControls col-3">
        <input type="text" class="input-text" value="${purchase.totalprice}" placeholder="" id="totalprice" name="purchase.totalprice"  readonly="readonly">
      </div>
      <div class="col-4">元</div>
    </div>
     <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>采购部门：</label>
      <div class="formControls col-3"> <span class="select-box">
        <select class="select" size="1" name="purchase.departmentid" id="departmentid" value="" onchange="" disabled="disabled" >
          <option value="" selected>请选择部门</option>
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>采购员：</label>
      <div class="formControls col-3">
        <input type="text" class="input-text" value="${purchase.chargename}" placeholder="采购员" id="chargename" name="purchase.chargename" readonly="readonly" >
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <button onClick="save();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe632;</i> 审核入库</button>
        <button onClick="unsave();" class="btn btn-secondary radius" type="button"><i class="Hui-iconfont">&#xe6e2;</i>不审核入库</button>
      </div>
    </div>
  </form>
</body>
</html>