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
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!-- <script type="text/javascript" src="js/sys/user/add.js"></script> -->
<title>新增菜单</title>
<script type="text/javascript">
var demon;
$(function(){

	//$("#remark").html("${dep.remark}");
});
function tijiao(){
 	$.ajax({
 		type: "POST",
		   url: "jlMenuInfoAction_saveMenu",
		   async:false,
		   data: $("#form1").serialize(),
		   success: function(data){
			  layer.msg('保存成功!',{icon: 1,time:1000});
			  setTimeout('toRefreshTree()', 1000); 
		   }
 		
 	});
}
function toRefreshTree(){
	parent.toRefreshTree();
}
function openChoosePicture(){
	parent.parent.layer_show("选择图标","jlMenuInfoAction_toChoosePic",600,400);
}
//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
// 	console.log(parent);
	parent.toRefreshTree();
	parent.layer.close(index);
}
	//打开选择列表
	function chooseUser(){
		//layer_show
	//	parent.user_show('选择用户','jlUserInfoAction_chooseUser','800','650');
	}
	//选择人员返回
	function user_chooseBack(userid,username){
		$("#userid").val(userid);
		$("#username").val(username);
	}
	function toShowPic(str){
		$("#pictureurl").val(str);
	}
</script>
</head>
<body>
<div class="pd-10">
  <form action="jlMenuInfoAction_saveMenu" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="menu.id" value="${menu.id}" />
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red">*</span>菜单名称：</label>
      <div class="formControls col-4">
        <input type="text" class="input-text" value="${menu.name}" placeholder="新建菜单" id="name" name="menu.name" >
      	
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>上级菜单名称：</label>
      <div class="formControls col-4">
        <input type="text" class="input-text" value="${menu.parentname}" placeholder="" id="parentname" name="menu.parentname"  readonly="readonly"  >
     	<input type="hidden"  value="${menu.parentid}"  id="parentid" name="menu.parentid" />
     	
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>链接地址：</label>
      <div class="formControls col-4">
        
	    <input type="text" class="input-text"  value="${menu.url}" placeholder="" id="url" name="menu.url"  />
      </div>
      <div class="col-4"> </div>
    </div>

    <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>图标链接地址：</label>
      <div class="formControls col-4">
        
      <input type="text" class="input-text"  value="${menu.pictureurl}" onclick="openChoosePicture()" placeholder="" readonly="readonly" id="pictureurl" name="menu.pictureurl"  />
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>菜单顺序：</label>
      <div class="formControls col-4">
        
      <input type="text" class="input-text"  value="${menu.menuorder}" placeholder="" id="menuorder" name="menu.menuorder"  />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-4">菜单说明：</label>
      <div class="formControls col-4">
        <textarea name="menu.remark" id="remark" value="${menu.remark}" cols="" rows=""  class="textarea"  placeholder="说点什么..." datatype="*0-100" dragonfly="true" nullmsg="" onKeyUp="textarealength(this,100)">${menu.remark}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="button" onclick="tijiao()" value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
      </div>
    </div>
  </form>
</div>
</div>


</body>
</html>