<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/h-ui_header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>鋆鼎</title>
<link rel="stylesheet" type="text/css" href="login/css/base.css">
    <link rel="stylesheet" type="text/css" href="login/css/login.css">
</head>
<script type="text/javascript">
document.onkeydown=keyDownSearch;
function keyDownSearch(e) { 
    // 兼容FF和IE和Opera 
    var theEvent = e || window.event; 
    var code = theEvent.keyCode || theEvent.which || theEvent.charCode; 
    if (code == 13) {  
    	checkLogin();//具体处理函数 
        return false; 
    } 
    return true; 
}


function checkLogin() {
	$("#username").val($("#username1").val());
	$("#pwd").val($("#pwd1").val());
	if($("#username").val()==""||$("#pwd").val()==""){
		layer.msg('用户名或密码不能为空',{icon: 5,time:3000});
		return;
	}
	form1.action = "jlLoginAction_checkLogin";
	form1.submit();
}
</script>
<body>

<div class="login_form ">
        <h1 class="pr">后台管理系统</h1>
        <form id="form1" name="form1"  action="" method="post">
        	<input type="hidden" value="" id="username" name="username" />
        	<input type="hidden" value="" id="pwd" name="pwd" />
        </form>	
        <div class="form_put">
            <div class="txt_name txt_put mt20">
                <input type="text" value="" id="username1" name="username1"  placeholder="请输入您的账号">
            </div>
            <div class="txt_password txt_put mt20">
                <input value="" id="pwd1" name="pwd1" type="password" placeholder="输入您的密码">
            </div>
        </div>
       
        <input type="submit" value="登录" onclick="checkLogin()" class="btn_submit mt30">
        
    </div>
    <div class="quan">
        <img src="login/image/zi2.png" alt="">
    </div>
    <img src="login/image/zi7.png" alt="" class="top_right_img">
    <img src="login/image/zi8.png" alt="" class="bottom_right_img">
	<div class="copy">鋆鼎提供 @ 技术支持</div>

</body>
</html>