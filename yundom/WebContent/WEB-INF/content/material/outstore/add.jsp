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
<title></title>
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<script type="text/javascript">
var demon;
var storeArr = new Array();//初始化的库存的数组信息
$(function(){
	initDep();
	initStoreInfo();
	$("#totalprice").val("");
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
		beforeSubmit:function(form){
// 			alert("验证成功");
			
		},
		callback:function(data){
// 			$.Showmsg();
			if(data.map.status=="1"){
				$.Hidemsg();
				layer.msg('保存成功!',{icon: 1,stime:5000});
       			location.replace(location.href);
// 	  			closethisWin();
			}else{
				layer.msg('保存失败!',{icon: 5,time:5000});
			}
		//	setTimeout('closethisWin()', 1000); 
		}
	}
	);
	
});


//初始化部门下拉框
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

	     }
	});
}
//初始化物资库存量
function initStoreInfo(){
	 $.ajax({
	     type: "POST",
	     url: "jlStoreAction_getStoreInfo",
	     async:false,
	     success: function(data1){
	      var str="";
	      storeArr = $.parseJSON(data1);
	      initGoods();
	     }
	});
}
	 
 function initGoods(){

	  var str="<option value='' >请选择</option>";
    for(var i=0;i<storeArr.length;i++){
     str+="<option value='"+storeArr[i].goodsid+"' >"+storeArr[i].goodsname+"</option>";
    }
    $("#goodsid").html(str);
    

}
	 function selectOne(){
      var goodsid=$("#goodsid").val();
      if(goodsid==""){
        $("#suppliername").val("");
        $("#supplierid").val("");
        $("#price").val("");
        $("#store_num").val("");
        return;
      }
      for(var i=0;i<storeArr.length;i++){
          if(goodsid==storeArr[i].goodsid){
            $("#suppliername").val(storeArr[i].suppliername);
            $("#supplierid").val(storeArr[i].supplierid);
            $("#price").val(storeArr[i].price);
            $("#store_num").val(storeArr[i].num);
            break;
          }
      }
   }
   function calculate(){
     var total= parseFloat($("#store_num").val());
     var ly=parseFloat($("#num").val());
     if(total<ly){
        layer.msg('领用数量大于库存!',{icon: 5,time:3000});
        $("#num").val("");
        return;
     }else{
        $("#totalprice").val(ly*parseFloat($("#price").val()));
     }
   }
</script>

</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 物资信息 <span class="c-gray en">&gt;</span> 物资领用<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>

<div class="pd-20">
  <form action="jlOutStoreAction_saveOutStore" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="oStore.id" value="${oStore.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>物资名称：</label>
      <div class="formControls col-5">
        <select  id="goodsid" name="oStore.goodsid" class="select" datatype="*" nullmsg="请选择物资！" onchange="selectOne()" >
    	</select>
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3">供应商名称：</label>
      <div class="formControls col-5">
        <input type="hidden" class="input-text" value="" name="oStore.supplierid" id="supplierid" >
      	<input type="text" class="input-text" value="" name="suppliername" id="suppliername" readonly="readonly">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>单价：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="price" name="oStore.price" readonly="readonly">
      </div>
      <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>库存数量：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="store_num" name="store_num"  readonly="readonly">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>领用数量：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="num" name="oStore.num" onblur="calculate()" datatype="*" nullmsg="请填写领用数量！" >
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>领用部门：</label>
      <div class="formControls col-3"> <span class="select-box">
        <select class="select" size="1" name="oStore.departmentid" id="departmentid" value="" onchange="" datatype="*" nullmsg="请选择所属部门！">
          <option value="" selected>请选择部门</option>
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>领用人：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="chargename" name="oStore.chargename"  datatype="*" nullmsg="请填写领用人！" >
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>合计金额：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="totalprice" name="totalprice"  readonly="readonly" >
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit"  value="&nbsp;&nbsp;领用&nbsp;&nbsp;">
      </div>
    </div>
  </form>
</div>
</div>

</body>
</html>