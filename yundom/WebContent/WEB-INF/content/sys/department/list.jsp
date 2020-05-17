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
<title>部门管理</title>
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
	list_iframe.contentWindow.append();
	//layer_show(title,url,w,h);
}
/*管理员-编辑*/
function admin_edit(title,url,w,h){
	layer_show(title,url,w,h);
}
function dudistribute(title,url,w,h){
	layer_show(title,url,w,h);
}
function searchInfo(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#departmentname').val());
}
function tolist(){
// 	form1.action="jlUserInfoAction_toList";
// 	form1.submit();
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#departmentname').val());
}

function removeDep(id){
	layer.confirm('确认要删除该部门吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		
		$.ajax({
			   type: "POST",
			   url: "jlDepartmentInfoAction_doRemove",
			   async:false,
			   data: "id="+id,
			   success: function(data){
				   if(data==1){
					   layer.msg('已删除!',{icon: 6,time:1000});
					   list_iframe.contentWindow.removeJd();
				   }else{
					   layer.msg('删除失败!',{icon: 5,time:1000});
				   }
			   }
			});
	});
}
</script>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 部门管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1">
 
	<div class="text-c" >
		<input type="text" class="input-text" style="width:250px" placeholder="输入部门名称" id="departmentname" name="departmentname">
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 搜部门</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
	 <span class="l">
	 	<a style="display:none;" href="javascript:;" onclick="datadel()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe6e2;</i> 批量删除</a> 
	 	<a href="javascript:;" style="color: white" onclick="admin_add('添加部门','jlDepartmentInfoAction_toAdd','800','650')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加部门</a>
	 	<a href="javascript:;" style="color: white" onclick="dudistribute('部门用户分布图','jlDepartmentInfoAction_toListUserDistribute','800','650')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe618;</i> 部门用户分布图</a>
	 
	 </span> <!-- <span class="r">共有数据：<strong>${count}</strong> 条</span> -->
	 
	</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlDepartmentInfoAction_toiframe" width="100%" height="75%" frameborder="0"></iframe>
</div>

</body>
</html>