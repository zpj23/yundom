<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的桌面</title>
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

<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<script type="text/javascript">
$(document).ready(function(){
	var zs=$.parseJSON('${total_list}');
	var jt=$.parseJSON('${today_list}');
	var zt=$.parseJSON('${yesterday_list}');
	var bz=$.parseJSON('${week_list}');
	var by=$.parseJSON('${month_list}');
	var htmlStr="";
	for(var i=0;i<zs.length;i++){
		htmlStr+="<tr class='text-c'>";
		htmlStr+="<td>"+zs[i].name+"</td>";
		htmlStr+="<td>"+zs[i].total+"</td>";
		htmlStr+=compareuid(zs[i].uid,jt);
		htmlStr+=compareuid(zs[i].uid,zt);
		htmlStr+=compareuid(zs[i].uid,bz);
		htmlStr+=compareuid(zs[i].uid,by);
		htmlStr+="</tr>";
	}
	$("#total_num").html(htmlStr);
});
	
	function compareuid(uid,jt){
		var htmlStr="";
		var flag=false;
		for(var m=0;m<jt.length;m++){
			if(uid==jt[m].uid){
				htmlStr="<td>"+jt[m].total+"</td>";
				flag=true;
				break;
			}
		}
		if(!flag){
			htmlStr="<td>0</td>";
		}
		return htmlStr;
	}
</script>
</head>
<body style="width: auto;height: auto">
<div class="pd-20" style="padding-top:20px;height: 100%;">
  <p class="f-20 text-success">企业管理系统 <span class="f-14">v2.3</span>
  </p>
	  <embed pluginspage="http://www.macromedia.com/go/getflashplayer" 
	 menu="true" loop="true" play="true" type="application/x-shockwave-flash" 
	 style="z-index:-1;" id="tim"
	 src="${pageContext.request.contextPath}/swf/time.swf">
</embed>
<!--   <p>登录次数：18 </p> -->
  <p>上次登录IP：${jluserinfo.lastloginip}  上次登录时间：<fmt:formatDate value="${jluserinfo.lastlogintime}" type="both"/>  </p>
  <c:if test="${jluserinfo.isAdmin eq '1'}">
  <table class="table table-border table-bordered table-bg">
    <thead>
      <tr>
        <th colspan="7" scope="col">信息统计</th>
      </tr>
      <tr class="text-c">
        <th>统计</th>
        <th>总数</th>
        <th>今日</th>
        <th>昨日</th>
        <th>本周</th>
        <th>本月</th>
      </tr>
    </thead>
    <tbody id="total_num">
    </tbody>
  </table>
  </c:if>
 	
  <div style="width: 100%;height: 100%;">
  <iframe id="testFrame" name="testFrame" src="jlLoginAction_toMainIframe" width="100%" height="400px" frameborder="0" ></iframe>
  </div>
 
</div>
<footer class="footer">
  <p><a href="http://www.baidu.com" target="_blank" title="">个人</a>提供前端技术支持</p>
</footer>

</body>
</html>