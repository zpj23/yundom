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
<title>新增角色</title>
<script type="text/javascript">
var  mIds="${menuIds}";
var  userids;
var  departmentids;
function getchecked(){
  var str= menuTree.getTreeIds();
  $('#menuIds').val(str);
}

function choose_user(){
	userids=$('#role_user_list_id').val();
	layer_show('用户授权','jlRoleInfoAction_toAddUser','600','400');
}
function choose_user_back(userids,usernames){
	$('#role_user_list_id').val(userids);
	$('#role_user_list_name').val(usernames);
}
function choose_department(){
	departmentids=$('#role_department_list_id').val();
	layer_show('部门授权','jlRoleInfoAction_toAddDepartment','300','500');
}
function choose_department_back(departmentids,departmentnames){
	$('#role_department_list_id').val(departmentids);
	$('#role_department_list_name').val(departmentnames);
}
</script>
</head>
<body>
<div class="pd-20">
  <form action="jlRoleInfoAction_saveRole" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="role.id" value="${role.id}" />
    <input type="hidden" id="menuIds" name="menuIds" value="${menuIds}"/>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>角色名称：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${role.rolename}" placeholder="" id="rolename" name="role.rolename" datatype="*2-16" nullmsg="角色名不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
    <label class="form-label col-3"><span class="c-red">*</span>角色菜单：</label>
    <div class="formControls col-5">
			    <ul id="Huifold1" class="Huifold">
			    	<li class="item">
			              <h4>菜单树<b>+</b></h4>
			              <div class="info" style="height: 300px; margin: 0px;padding: 0px;">
			              	<iframe id="menuTree" name="menuTree" width="auto" height="100%"  frameborder="0" src="jlRoleInfoAction_showRoleTree"></iframe> 
			              </div>
			            </li>
			           </ul> 
			          </div> 
			           <div class="col-4"> </div>
    </div>
   
    <div class="row cl">
      <label class="form-label col-3">用户授权列表：</label>
      <div class="formControls col-5">
      <input type="hidden" name="role_user_list_id" id="role_user_list_id" value="${role_user_list_id}"/>
        <textarea name="role_user_list_name" id="role_user_list_name" value="${role_user_list_name}" cols="" ondblclick="choose_user()" rows=""  class="textarea"  placeholder="授权列表说明" datatype="*0-100" dragonfly="true" nullmsg="" >${role_user_list_name}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">部门授权列表：</label>
      <div class="formControls col-5">
      <input type="hidden" name="role_department_list_id" id="role_department_list_id" value="${role_department_list_id}"/>
        <textarea name="role_department_list_name" id="role_department_list_name" value="${role_department_list_name}" cols="" ondblclick="choose_department()" rows=""  class="textarea"  placeholder="授权列表说明" datatype="*0-100" dragonfly="true" nullmsg="" >${role_department_list_name}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
    </div>
     <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="role.remark" id="remark" value="${role.remark}" cols="" rows=""  class="textarea"  placeholder="角色说明" datatype="*0-100" dragonfly="true" nullmsg="" onKeyUp="textarealength(this,100)">${role.remark}</textarea>
        <p class="textarea-numberbar"><em class="textarea-length">0</em>/100</p>
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <div class="col-9 col-offset-3">
        <input class="btn btn-primary radius" type="submit"   value="&nbsp;&nbsp;提交&nbsp;&nbsp;">
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
			getchecked();
     		return true;
		},
		callback:function(data){
			if(data.map.status=="y"){
				$.Hidemsg();
				layer.msg('保存成功!',{icon: 1,time:1000});
				setTimeout('closethisWin()', 1000); 
			}
		}
	}
	);
	
	$.Huifold("#Huifold1 .item h4","#Huifold1 .item .info","fast",1,"click"); /*5个参数顺序不可打乱，分别是：相应区,隐藏显示的内容,速度,类型,事件*/
	$("#Huifold1 .item h4").click();
	
});
//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
//	parent.$('.btn-refresh').click();
// 	console.log(parent);
	parent.tolist();
	parent.layer.close(index);
}


</script>
</body>
</html>