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
				alert("保存成功");
        		location.replace(location.href);
// 	  			closethisWin();
			}else{
				layer.msg('保存失败!',{icon: 5,time:1000});
			}
		//	setTimeout('closethisWin()', 1000); 
		}
	}
	);
	initmain();// 初始化维修商下拉框
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
//初始化物资
function initStoreInfo(){
	 $.ajax({
	     type: "POST",
	     url: "jlGoodsInfoAction_getGoodsInfo",
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
     str+="<option value='"+storeArr[i].id+"' >"+storeArr[i].name+"</option>";
    }
    $("#goodsid").html(str);

}
	 function selectOne(){
      var goodsid=$("#goodsid").val();
      if(goodsid==""){
        $("#suppliername").val("");
        $("#supplierid").val("");
        return;
      }
      for(var i=0;i<storeArr.length;i++){
          if(goodsid==storeArr[i].id){
            $("#suppliername").val(storeArr[i].suppliername);
            $("#supplierid").val(storeArr[i].supplierid);
            break;
          }
      }
   }
//    function calculate(){
//      var total= parseFloat($("#store_num").val());
//      var ly=parseFloat($("#num").val());
//      if(total<ly){
//         layer.msg('领用数量大于库存!',{icon: 1,time:3000});
//         $("#num").val("");
//         return;
//      }else{
//         $("#totalprice").val(ly*parseFloat($("#price").val()));
//      }
//    }
   function stateChange(){
	   var str=$("#damagestate").val();
	   if(str==""){
		   showAndHide("none");
	   }else if(str=="1"){//报废
		   showAndHide("none");
	   }else if(str=="2"){
		   showAndHide("");
	   }
   }
   function showAndHide(state){
	   $("#wxs").css("display",state);
	   $("#wxfy").css("display",state);
	   $("#bz").css("display",state);
   }
   
   function initmain(){
	   $.ajax({
		   type: "POST",
		   url: "jlSupplierInfoAction_getSupplier?state=2",
		   async:false,
		   success: function(data1){
			  var str="";
			  var data = $.parseJSON(data1);
			  str="<option value='' >请选择</option>";
			  for(var i=0;i<data.length;i++){
				 str+="<option value='"+data[i].id+"' >"+data[i].name+"</option>";
			  }
			  $("#maintainid").html(str);
		   }
	});
   }
</script>

</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 物资信息 <span class="c-gray en">&gt;</span> 报损维修登记<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>

<div class="pd-20">
  <form action="jlMaintainAction_saveMaintain" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="maintain.id" value="${maintain.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>物资名称：</label>
      <div class="formControls col-5">
        <select  id="goodsid" name="maintain.goodsid" class="select" datatype="*" nullmsg="请选择物资！" onchange="selectOne()" >
    	</select>
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3">供应商名称：</label>
      <div class="formControls col-5">
        <input type="hidden" class="input-text" value="" name="maintain.supplierid" id="supplierid" >
      	<input type="text" class="input-text" value="" name="suppliername" id="suppliername" readonly="readonly">
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>数量：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="num" name="maintain.num"  datatype="n" nullmsg="请填写数量！" >
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>申请部门：</label>
      <div class="formControls col-3"> <span class="select-box">
        <select class="select" size="1" name="maintain.departmentid" id="departmentid" value="" onchange="" datatype="*" nullmsg="请选择所属部门！">
          <option value="" selected>请选择部门</option>
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>申请人：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="chargename" name="maintain.chargename"  datatype="*" nullmsg="请填写申请人！" >
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3"><span class="c-red"></span>报废、维修：</label>
      <div class="formControls col-3"> <span class="select-box">
        <select class="select" size="1" name="maintain.damagestate" id="damagestate" value="" onchange="stateChange()" datatype="*" nullmsg="请选择一项！">
          <option value="" selected>请选择状态</option>
          <option value="1" >报废</option>
          <option value="2" >维修</option>
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl" id="wxs" style="display: none;">
      <label class="form-label col-3">维修商名称：</label>
      <div class="formControls col-5">
       <select  id="maintainid" name="maintain.maintainid" class="select"   >
    	</select>
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl" id="wxfy" style="display: none;">
      <label class="form-label col-3"><span class="c-red"></span>合计维修金额：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="" placeholder="" id="price" name="maintain.price"   >
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl" id="bz" style="display: none;">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="maintain.remark" id="remark" value="" cols="" rows=""  class="textarea"  placeholder="说明" datatype="*0-100" dragonfly="true" nullmsg="" onKeyUp="textarealength(this,100)"></textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
   	</div>
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit"  value="&nbsp;&nbsp;保存&nbsp;&nbsp;">
      </div>
    </div>
  </form>
</div>
</div>

</body>
</html>