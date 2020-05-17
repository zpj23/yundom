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
<title></title>
<script type="text/javascript">
$(document).ready(function(){
	$.ajax({
		   type: "POST",
		   url: "jlDepartmentInfoAction_getDep",
		   async:false,
		   success: function(data1){
			  var str="";
			  var data = $.parseJSON(data1);
			  str="<option value='' >请选择部门</option>";
			  for(var i=0;i<data.length;i++){
				 str+="<option value='"+data[i].id+"' >"+data[i].name+"</option>";
			  }
			  $("#departmentid").html(str);
			 
		   }
	});
});
function toList(){
	searchInfo();
}
function searchInfo(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$('#state').val(),$('#departmentid').val());
}
function findDetail(){
	list_iframe.contentWindow.findDetail();
}
function openDetail(title,url,w,h){
	layer_show(title,url,w,h);
}
function examinePurchase(){
	list_iframe.contentWindow.examineAndInStore();
}
//审核页面
function examinePurchaseAndDetail(title,url,w,h){
	layer_show(title,url,w,h);
}
</script>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 物资统计 <span class="c-gray en">&gt;</span> 采购单统计审核<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1"  >
 
	<div class="text-c"> 日期范围：
		<input type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')}'})" id="datemin" name="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}'})" id="datemax" name="datemax" class="input-text Wdate" style="width:120px;">
		<input type="text" class="input-text" style="width:150px" placeholder="输入采购人、录入人" id="username" name="username"/>
		<span class="select-box inline">
		<select class="select"  name="departmentid" id="departmentid" value=""  >
        </select>
        </span>
        <span class="select-box inline">
        <select class="select"  name="state" id="state" value=""  >
          <option value="" selected>请选择审核状态</option>
          <option value="1">采购中</option>
          <option value="2">已审核入库</option>
          <option value="3">未通过审核</option>
        </select>
        </span>
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 查询</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
		 <span class="l">
		  <a href="javascript:;" style="color:white;" onclick="findDetail()" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe6c6;</i>详细</a>
		  <a href="javascript:;" style="color:white;" onclick="examinePurchase();" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe60c;</i>审核</a>
		</span>
	</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlPurchaseInfoAction_toListIframe" width="100%" height="75%" frameborder="0"></iframe>
</div>

</body>
</html>