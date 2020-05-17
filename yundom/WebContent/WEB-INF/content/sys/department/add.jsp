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
<title>新增用户</title>
<script type="text/javascript">
var demon;
$(function(){
	
	$("#remark").html("${dep.remark}");
});
function tijiao(){
 	$.ajax({
 		type: "POST",
		   url: "jlDepartmentInfoAction_saveDepartment",
		   async:false,
		   data: $("#form1").serialize(),
		   success: function(data){
			  parent.toRefreshTree();
		   }
 		
 	});
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
		parent.user_show('选择用户','jlUserInfoAction_chooseUser','800','650');
	}
	//选择人员返回
	function user_chooseBack(userid,username){
		$("#userid").val(userid);
		$("#username").val(username);
	}
</script>
</head>
<body>
<div class="pd-20">
  <form action="jlDepartmentInfoAction_saveDepartment" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="dep.id" value="${dep.id}" />
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red">*</span>部门名称：</label>
      <div class="formControls col-4">
        <input type="text" class="input-text" value="${dep.name}" placeholder="新建部门" id="name" name="dep.name" >
      	<input type="hidden"  value="${dep.code}"  id="code" name="dep.code" />
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>上级部门名称：</label>
      <div class="formControls col-4">
        <input type="text" class="input-text" value="${dep.parent_name}" placeholder="" id="parent_name" name="dep.parent_name"  readonly="readonly"  >
     	<input type="hidden"  value="${dep.parent_code}"  id="parent_code" name="dep.parent_code" />
     	<input type="hidden"  value="${dep.parent_id}"  id="parent_id" name="dep.parent_id" />
     	
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-4"><span class="c-red"></span>部门管理员：</label>
      <div class="formControls col-4">
        <input type="hidden"  value="${dep.userid}"  id="userid" name="dep.userid" />
	    <input type="text" class="input-text" onclick="chooseUser()" value="${dep.username}" placeholder="" id="username" name="dep.username" readonly="readonly" />
      </div>
      <div class="col-4"> </div>
    </div>
    
    <div class="row cl">
      <label class="form-label col-4">部门职能说明：</label>
      <div class="formControls col-4">
        <textarea name="dep.remark" id="remark" value="${dep.remark}" cols="" rows=""  class="textarea"  placeholder="说点什么...最少输入2个字符" datatype="*1-100" dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,100)"></textarea>
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