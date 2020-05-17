<%@page import="com.jl.sys.pojo.MenuInfo"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%
		String menuStr=(String)request.getSession().getAttribute("jlMenuList");
    %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<LINK rel="Bookmark" href="newUI/favicon.ico" >
<LINK rel="Shortcut Icon" href="newUI/favicon.ico" />
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="newUI/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/H
-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<link href="newUI/skin/default/skin.css" rel="stylesheet" type="text/css" id="skin" />
<link href="newUI/css/style.css" rel="stylesheet" type="text/css" />
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>系统</title>
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script> 
<script type="text/javascript">
var menu_arr=eval('<%=menuStr%>');
$(document).ready(function(){
	initMenu();

});
/*资讯-添加*/
function article_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*图片-添加*/
function picture_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*产品-添加*/
function product_add(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}
/*用户-添加*/
function member_add(title,url,w,h){
	layer_show(title,url,w,h);
}

function initMenu(){
	var htmlStr="";

	
	for(var i=0;i<menu_arr.length;i++){
		if(menu_arr[i].parentid==1||menu_arr[i].parentid=="1"){//第一层菜单
			htmlStr+="<dl id=\"menu-"+menu_arr[i].pictureurl+"\">";
			htmlStr+="<dt><i class=\"Hui-iconfont Hui-iconfont-"+menu_arr[i].pictureurl+"\"></i> "+menu_arr[i].name+"<i class=\"Hui-iconfont menu_dropdown-arrow\">&#xe6d5;</i></dt>";
			htmlStr+="<dd><ul>";
			
			for(var j=0;j<menu_arr.length;j++){
				
				if(menu_arr[j].parentid==menu_arr[i].id){//子菜单
					
					htmlStr+="<li><a _href=\""+menu_arr[j].url+"\" data-title=\""+menu_arr[j].name+"\" href=\"javascript:void(0)\">"+menu_arr[j].name+"</a></li>";

				}	
			}
			htmlStr+="</ul></dd></dl>";
		}

	}
	$('#menuD').html(htmlStr);
	var div=$("<div class=\"dislpayArrow\"><a class=\"pngfix\" href=\"javascript:void(0);\" onClick=\"displaynavbar(this)\"></a></div>").appendTo("body");
	$("aside").after(div);
	$.Huifold(".menu_dropdown dl dt",".menu_dropdown dl dd","fast",1,"click");
}

function loginOut(){
	form1.submit();
}
</script> 
</head>
<body id="mainbody"> 
<form action="jlLoginAction_loginOut" method="post" id="form1" name="form1"></form>
<header class="Hui-header cl"> <a class="Hui-logo l" title="H-ui.admin v2.3" href="/">企业管理系统</a> <a class="Hui-logo-m l" href="/" title="H-ui.admin">H-ui</a> <span class="Hui-subtitle l">V1.0</span>
	<nav class="mainnav cl" id="Hui-nav" style="display:none;">
		<ul>
			<li class="dropDown dropDown_click"><a href="javascript:;" aria-expanded="true" aria-haspopup="true" data-toggle="dropdown" class="dropDown_A"><i class="Hui-iconfont">&#xe600;</i> 新增 <i class="Hui-iconfont">&#xe6d5;</i></a>
				<ul class="dropDown-menu radius box-shadow">
					<li><a href="javascript:;" onclick="article_add('添加资讯','article-add.html')"><i class="Hui-iconfont">&#xe616;</i> 资讯</a></li>
					<li><a href="javascript:;" onclick="picture_add('添加资讯','picture-add.html')"><i class="Hui-iconfont">&#xe613;</i> 图片</a></li>
					<li><a href="javascript:;" onclick="product_add('添加资讯','product-add.html')"><i class="Hui-iconfont">&#xe620;</i> 产品</a></li>
					<li><a href="javascript:;" onclick="member_add('添加用户','jlUserInfoAction_toAdd','','550')"><i class="Hui-iconfont">&#xe60d;</i> 用户</a></li>
				</ul>
			</li>
		</ul>
	</nav>
	<ul class="Hui-userbar">
		<li>${jluserinfo.username}</li>
		<li class="dropDown dropDown_hover"><a href="#" class="dropDown_A">${jluserinfo.loginname} <i class="Hui-iconfont">&#xe6d5;</i></a>
			<ul class="dropDown-menu radius box-shadow">
<!-- 				<li><a href="#">个人信息</a></li> -->
<!-- 				<li><a href="#" onclick="loginOut()">切换账户</a></li> -->
				<li><a href="#" onclick="loginOut()">退出</a></li>
			</ul>
		</li>
		<li id="Hui-msg"> <a href="#" title="采购单数目"><span class="badge badge-danger">${count}</span><i class="Hui-iconfont" style="font-size:18px">&#xe68a;</i></a> </li>
		<li id="Hui-skin" class="dropDown right dropDown_hover"><a href="javascript:;" title="换肤"><i class="Hui-iconfont" style="font-size:18px">&#xe62a;</i></a>
			<ul class="dropDown-menu radius box-shadow">
				<li><a href="javascript:;" data-val="default" title="默认（黑色）">默认（黑色）</a></li>
				<li><a href="javascript:;" data-val="blue" title="蓝色">蓝色</a></li>
				<li><a href="javascript:;" data-val="green" title="绿色">绿色</a></li>
				<li><a href="javascript:;" data-val="red" title="红色">红色</a></li>
				<li><a href="javascript:;" data-val="yellow" title="黄色">黄色</a></li>
				<li><a href="javascript:;" data-val="orange" title="绿色">橙色</a></li>
			</ul>
		</li>
	</ul>
	<a href="javascript:;" class="Hui-nav-toggle Hui-iconfont" aria-hidden="false">&#xe667;</a> </header>
<aside class="Hui-aside"  >
<!-- 	<input runat="server" id="divScrollValue" type="hidden" value="" /> -->
	<div class="menu_dropdown bk_2" id="menuD" >
	</div>
</aside>
<!-- <div class="dislpayArrow"><a class="pngfix" href="javascript:void(0);" onClick="displaynavbar(this)"></a></div> -->
<section class="Hui-article-box">
	<div id="Hui-tabNav" class="Hui-tabNav">
		<div class="Hui-tabNav-wp">
			<ul id="min_title_list" class="acrossTab cl">
				<li class="active"><span title="我的桌面" data-href="home1/main.jsp">我的桌面</span><em></em></li>
			</ul>
		</div>
		<div class="Hui-tabNav-more btn-group"><a id="js-tabNav-prev" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d4;</i></a><a id="js-tabNav-next" class="btn radius btn-default size-S" href="javascript:;"><i class="Hui-iconfont">&#xe6d7;</i></a></div>
	</div>
	<div id="iframe_box" class="Hui-article">
		<div class="show_iframe">
			<div style="display:none" class="loading"></div>
			<iframe scrolling="yes" frameborder="0" src="jlLoginAction_toMain"></iframe>
		</div>
	</div>
</section>

</body>
</html>