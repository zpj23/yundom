<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<!--[if lt IE 9]>
<script type="text/javascript" src="lib/html5.js"></script>
<script type="text/javascript" src="lib/respond.min.js"></script>
<script type="text/javascript" src="lib/PIE_IE678.js"></script>
<![endif]-->
<link href="newUI/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/style.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<!-- <script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script>   -->
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script> 
<script type="text/javascript" src="newUI/lib/laypage/1.2/laypage.js"></script> 
<script type="text/javascript" src="newUI/lib/My97DatePicker/WdatePicker.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script> 

<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>日志信息管理</title>
<script type="text/javascript">




function searchInfo(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$("#type").val());
}
function tolist(){
// 	form1.action="jlUserInfoAction_toList";
// 	form1.submit();
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$("#type").val());
}

function clearLog(){
	//var id=list_iframe.contentWindow.selectOneData();
	layer.confirm('确认要清空距现在三个月之前的日志吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
			   type: "POST",
			   url: "jlLogAction_delLog",
			   async:false,
			//   data: "id="+id,
			   success: function(data){
				   if(data==1){
						layer.msg('已删除!',{icon:1,time:1000});
				   }else{
					   layer.msg('删除失败!',{icon: 5,time:1000});
				   }
				   tolist();
			   }
			});
	});
}


</script>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 日志管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1" enctype="multipart/form-data" >
 
	<div class="text-c"> 日期范围：
		<input type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')}'})" id="datemin" name="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}'})" id="datemax" name="datemax" class="input-text Wdate" style="width:120px;">
		<input type="text" class="input-text" style="width:250px" placeholder="输入用户名、描述" id="username" name="username">
		 <span class="select-box inline">
			<select class="select"  name="type" id="type" value=""  >
				<option value="" selected>操作</option>
				<option value="登陆">登陆</option>
<!-- 				<option value="新增">新增</option> -->
<!-- 				<option value="编辑">编辑</option> -->
				<option value="新增或编辑">新增/编辑</option>
				<option value="删除">删除</option>
	        </select>
        </span>
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 搜日志</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
	 <span class="l">
<!-- 	 <input type="file" id="file" name="file" style="width:150px;" /> -->
	<!--  <a href="javascript:;" onclick="dataimport()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe600;</i>批量导入</a> -->
	  <a href="javascript:;" style="color: white" onclick="clearLog()" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe609;</i> 清空日志</a></span> <!-- <span class="r">共有数据：<strong>${count}</strong> 条</span> -->
	</div>

	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlLogAction_iframe" width="100%" height="75%" frameborder="0"></iframe>
</div>

</body>
</html>