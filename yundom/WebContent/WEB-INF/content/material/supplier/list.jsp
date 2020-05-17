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
<title>供应商管理</title>
<script type="text/javascript">




/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
/*管理员-增加*/
function admin_add(title,url,w,h){
	layer_show(title,url,w,h);
}
/*管理员-删除*/
function admin_del(id){
	layer.confirm('确认要删除吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
			   type: "POST",
			   url: "jlSupplierInfoAction_delSupplier",
			   async:false,
			   data: "id="+id,
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
/*管理员-编辑*/
function admin_edit(title,url,w,h){
	layer_show(title,url,w,h);
}
/*管理员-停用*/
function admin_stop(id){
	layer.confirm('确认要停用吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		
		$.ajax({
			   type: "POST",
			   url: "jlUserInfoAction_ssUser",
			   async:false,
			   data: "id="+id,
			   success: function(data){
				   if(data==1){
					   layer.msg('已停用!',{icon: 5,time:1000});
				   }else{
					   layer.msg('停用失败!',{icon: 5,time:1000});
				   }
				   tolist();
			   }
			});
	});
}

/*管理员-启用*/
function admin_start(id){
	layer.confirm('确认要启用吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
			   type: "POST",
			   url: "jlUserInfoAction_ssUser",
			   async:false,
			   data: "id="+id,
			   success: function(data){
				   if(data==1){
					   layer.msg('已启用!', {icon: 6,time:1000});
				   }else{
					   layer.msg('启用用失败!',{icon: 5,time:1000});
				   }
				   tolist();
			   }
			});
		
		
	});
}
function searchInfo(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$('#state').val());
}
function tolist(){
// 	form1.action="jlUserInfoAction_toList";
// 	form1.submit();
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$('#state').val());
}
</script>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 物资信息 <span class="c-gray en">&gt;</span> 供应商管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1">
 
	<div class="text-c"> 日期范围：
		<input type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')}'})" id="datemin" name="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}'})" id="datemax" name="datemax" class="input-text Wdate" style="width:120px;">
		<input type="text" class="input-text" style="width:250px" placeholder="输入供应商、联系人、地址、备注" id="username" name="username">
		<span class="select-box inline">
			<select id="state" name="state" class="select">
				<option value="" selected>请选择</option>
				<option value="1">供应商</option>
				<option value="2">维修商</option>
			</select>
		</span>
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 搜供应商</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
	 <span class="l"><a style="display:none;" href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a> <a href="javascript:;" style="color:white;" onclick="admin_add('添加供应商','jlSupplierInfoAction_toAddSupplier','800','650')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加供应商</a></span> <!-- <span class="r">共有数据：<strong>${count}</strong> 条</span> -->
	</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlSupplierInfoAction_toiframe" width="100%" height="75%" frameborder="0"></iframe>
</div>

</body>
</html>