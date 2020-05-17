<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
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
<title>新增用户</title>

<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<script type="text/javascript">
var roleids;
function changeDep(){
	$("#departmentname").val($("#departmentcode").find("option:selected").text());
}

var demon;
$(function(){
	
	demon=$("#form1").Validform(
			{
		tiptype:2,		
		ajaxPost:true,
		beforeSubmit:function(form){
// 			alert("验证成功");
// 			baocun();
// 			return false;
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
			  $('#departmentcode').val("${user.departmentcode}");
			  $('#remark').html("${user.remark}");
			  if("${user.sex}"=="1"){
				  $('#sex-1').attr("checked","checked");
			  }else if("${user.sex}"=="2"){
				  $('#sex-2').attr("checked","checked");
			  }else if("${user.sex}"=="3"){
				  $('#sex-3').attr("checked","checked");
			  }
			  if("${user.id}"!="0"){
				 $("#password").attr("readonly",true);
			  }
		   }
	});
	
});


//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
//	parent.$('.btn-refresh').click();
// 	console.log(parent);
	parent.tolist();
	parent.layer.close(index);
}

function choose_role(){
	roleids=$("#role_id_list").val();
	layer_show('用户授权','jlRoleInfoAction_toAddRole','600','400');
}
function choose_role_back(userids,usernames){
	$('#role_id_list').val(userids);
	$('#role_id_list_name').val(usernames);
}

</script>
</head>
<body>
<div class="pd-20">
  <form action="jlUserInfoAction_saveUser" name="form1" method="post" class="form form-horizontal" id="form1">
    <input type="hidden" id="id" name="user.id" value="${user.id}" />
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>用户名：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${user.username}" placeholder="" id="username" name="user.username" datatype="*2-16" nullmsg="用户名不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
    <label class="form-label col-xs-4 col-sm-3">性别：</label>
    	<div class="formControls skin-minimal col-5 ">
    			<div class="radio-box">
					<input type="radio" id="sex-1" name="user.sex" value="1" checked="checked">
					<label for="sex-1">男</label>
				</div>
				<div class="radio-box">
					<input type="radio" id="sex-2" name="user.sex" value="2">
					<label for="sex-2">女</label>
				</div>
				<div class="radio-box">
					<input type="radio" id="sex-3" name="user.sex" value="3">
					<label for="sex-3">保密</label>
				</div>
		</div>
    </div>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>登陆名：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${user.loginname}" placeholder="" id="loginname" name="user.loginname" datatype="*2-16" nullmsg="登陆名不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
    <c:if test="${user.id eq 0 ||user.id eq '0'}">
    <div class="row cl">
      <label class="form-label col-3">密码：</label>
      <div class="formControls col-5">
        <input type="password" class="input-text" value="${user.password}" placeholder="" id="password" name="user.password" >
      </div>
      <div class="col-4"> </div>
    </div>
    </c:if>
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>手机：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${user.telephone}" placeholder="" id="telephone" name="user.telephone"  datatype="m" nullmsg="手机不能为空">
      </div>
      <div class="col-4"> </div>
    </div>
<!--     <div class="row cl"> -->
<!--       <label class="form-label col-3"><span class="c-red">*</span>邮箱：</label> -->
<!--       <div class="formControls col-5"> -->
<%--         <input type="text" class="input-text" value="${user.email}" placeholder="@" name="user.email" id="email" datatype="" nullmsg="请输入邮箱！"> --%>
<!--       </div> -->
<!--       <div class="col-4"> </div> -->
<!--     </div> -->
    <div class="row cl">
      <label class="form-label col-3"><span class="c-red">*</span>所属部门：</label>
      <div class="formControls col-5"> <span class="select-box">
      	<input type="hidden" id="departmentname" name="user.departmentname" value="${user.departmentname}"/>
        <select class="select" size="1" name="user.departmentcode" id="departmentcode" value="${user.departmentcode}" onchange="changeDep()" datatype="*" nullmsg="请选择所属部门！">
          <option value="" selected>请选择部门</option>
          <option value="1">技术部</option>
          <option value="2">实施部</option>
          <option value="3">企划部</option>
          <option value="4">admin</option>
        </select>
        </span> </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">地址：</label>
      <div class="formControls col-5">
        <input type="text" class="input-text" value="${user.address}" name="user.address" id="address"  >
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">角色列表：</label>
      <div class="formControls col-5">
      <input type="hidden" name="role_id_list" id="role_id_list" value="${role_id_list}"/>
        <textarea name="role_id_list_name" id="role_id_list_name" value="${role_id_list_name}" cols="" ondblclick="choose_role()" rows=""  class="textarea"  placeholder="授权列表说明" datatype="*0-100" dragonfly="true" nullmsg="" >${role_id_list_name}</textarea>
        <p class="textarea-numberbar">
      </div>
      <div class="col-4"> </div>
    </div>
    <div class="row cl">
      <label class="form-label col-3">备注：</label>
      <div class="formControls col-5">
        <textarea name="user.remark" id="remark" value="${user.remark}" cols="" rows=""  class="textarea"  placeholder="说点什么..."  dragonfly="true" nullmsg="备注不能为空！" onKeyUp="textarealength(this,100)"></textarea>
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

</body>
</html>