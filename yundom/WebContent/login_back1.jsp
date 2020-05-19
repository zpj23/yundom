<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<link href="newUI/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/H-ui.login.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/style.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>考勤管理系统</title>


<%  
String username = "";  
String password = "";  
Cookie[] c = request.getCookies();  
if (c != null) {  
    for (int i = 0; i < c.length; i++) {  
        if ("username".equals(c[i].getName())) {  
            username = c[i].getValue();  
        } else if ("pwd".equals(c[i].getName())) {  
            password = c[i].getValue();  
        }  
    }  
} else {  
    username = "";  
    password = "";  
}
%> 
</head>
<script>
$(document).ready(function(){
	 window.setTimeout(function () {
		 if("${loginDefault}"=="1"){//用户名或密码错误
			 delCookie("username");
			 delCookie("pwd");
		 }
		 var username=$("#username").val();
		 var pwd=$("#pwd").val();
	     if(username!=""&&pwd!=""){
	    	 $("#online").prop("checked",true);
	    	 $("#rember").val("1");	
	     }
	 }, 0);
});
function checkLogin() {
	var flag=$("#online").is(":checked");//选中，返回true，没选中，返回false  
	if(flag){
		$("#rember").val("1");	
	}else{
		$("#rember").val("0");	
		delCookie("username");
		delCookie("pwd");
	}
	form1.action = "jlLoginAction_checkLogin";
	form1.submit();
}

function delCookie(name)
{
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null)
	document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}

</script>
<body>

<input type="hidden" id="TenantId" name="TenantId" value="" />
<div class="header"></div>
<div class="loginWraper">
  <div id="loginform" class="loginBox">
    <form id="form1" name="form1" class="form form-horizontal" action="" method="post">
    
      <div class="row cl">
        <label class="form-label col-3"><i class="Hui-iconfont">&#xe60d;</i></label>
        <div class="formControls col-8">
          <input value="<%=username%>" id="username" name="username"  type="text" placeholder="用户名" class="input-text size-L">
        </div>
      </div>
      <div class="row cl">
        <label class="form-label col-3"><i class="Hui-iconfont">&#xe60e;</i></label>
        <div class="formControls col-8">
          <input value="<%=password%>" id="pwd" name="pwd" type="password" placeholder="密码" class="input-text size-L">
        </div>
      </div>
<!--       <div class="row cl"> -->
<!--         <div class="formControls col-8 col-offset-3"> -->
<!--           <input class="input-text size-L" type="text" placeholder="验证码" onblur="if(this.value==''){this.value='验证码:'}" onclick="if(this.value=='验证码:'){this.value='';}" value="验证码:" style="width:150px;"> -->
<!--           <img src="images/VerifyCode.aspx.png"> <a id="kanbuq" href="javascript:;">看不清，换一张</a> </div> -->
<!--       </div> -->
      <div class="row">
        <div class="formControls col-8 col-offset-3">
        <input type="hidden" name="rember" id="rember" value=""/>
          <label for="online">
            <input type="checkbox" name="online" id="online" value="">
            
           记住密码</label>
        </div>
      </div>
      <div class="row">
        <div class="formControls col-8 col-offset-3">
          <input name="" type="submit" onclick="checkLogin()" class="btn btn-success radius size-L" value="&nbsp;登&nbsp;&nbsp;&nbsp;&nbsp;录&nbsp;">
          <input name="" type="reset" class="btn btn-default radius size-L" value="&nbsp;取&nbsp;&nbsp;&nbsp;&nbsp;消&nbsp;">
        </div>
      </div>
    </form>
  </div>
</div>

<div class="footer">备案号：<a href='http://www.miitbeian.gov.cn/' style='text-decoration:none;color:white;'>苏ICP备17053334号</a> &nbsp;&nbsp;&nbsp;Copyright &copy @远舟船舶</div>

</body>
</html>
