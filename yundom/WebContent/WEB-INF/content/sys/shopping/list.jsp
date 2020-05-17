<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes" />
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
<script type="text/javascript" src="js/judge.js" ></script>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>考勤管理</title>
<script type="text/javascript">

$(document).ready(function(){
	initDep();
});



/*
	参数解释：
	title	标题
	url		请求的url
	id		需要操作的数据id
	w		弹出层宽度（缺省调默认值）
	h		弹出层高度（缺省调默认值）
*/
/*增加*/
function admin_add(title,url,w,h){
	if(ISPHONE){
		w=document.body.clientWidth;
		h=document.body.clientHeight;
	}
	
	layer_show(title,url,w,h);
}
function manager_add(title,url,w,h){
	w=document.body.clientWidth-100;
	h=document.body.clientHeight-100;
	layer_show(title,url,w,h);
}
/*删除*/
function admin_del(id){
	layer.confirm('确认要删除吗？',function(index){
// 		if(id==1||id=="1"){
// 			layer.msg('管理员不可删除!',{icon:5,time:3000});
// 			return;
// 		}
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
			   type: "POST",
			   url: "jlManualCheckInfoAction_del",
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
//批量审核
function shenhe(){
	list_iframe.contentWindow.shenhe();
}
function admin_shenhe(id){
	layer.confirm('确认要审核吗？',function(index){
		//此处请求后台程序，下方是成功后的前台处理……
		$.ajax({
			   type: "POST",
			   url: "jlManualCheckInfoAction_doshenhe",
			   async:false,
			   data: "id="+id,
			   success: function(data){
				   if(data==1){
						layer.msg('已审核!',{icon:1,time:1000});
						//list_iframe.src='jlManualCheckInfoAction_toiframe';
						list_iframe.contentWindow.clearSelection();
						tolist();
				   }else{
					   layer.msg('审核失败!',{icon: 5,time:1000});
				   }
				   
			   }
			});
	});
}

function searchInfo(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$('#departmentid').val(),$('#sgxm').val(),$('#sgqy').val(),$("#workcontent").val(),$("#shenhe").val(),$("#lrrname").val());
}
function tolist(){
	list_iframe.contentWindow.load($('#datemin').val(),$('#datemax').val(),$('#username').val(),$('#departmentid').val(),$('#sgxm').val(),$('#sgqy').val(),$("#workcontent").val(),$("#shenhe").val(),$("#lrrname").val());
}

function dataimport(){
	
	var value=$("#file").val();
	if(value==""){
		layer.msg('请选择需要导入的文档',{icon: 5,time:3000});
		return;
	}
	form1.action="jlUserInfoAction_importExcel";
	form1.submit();
}
function dataoutput(){
// 	form1.action="jlManualCheckInfoAction_exportExcel";
// 	form1.submit();
}


//初始化部门下拉框
function initDep(){
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
	      $("#departmentid").html(str);

	     }
	});
}
function analysis(){
	layer_show("统计分析","jlManualCheckInfoAction_toShowByType",1100,650);
}

</script>
</head>
<body style="overflow: hidden">
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 考勤管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1"  >
 
	<div class="text-c"> 
		<input type="text" placeholder="施工日期开始" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')}'})" id="datemin" name="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input type="text" placeholder="施工日期结束" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}'})" id="datemax" name="datemax" class="input-text Wdate" style="width:120px;">
		<input type="text" class="input-text" style="width:120px" placeholder="施工人员名称" id="username" name="username" />
		<input type="text" class="input-text" style="width:120px" placeholder="施工项目" id="sgxm" name="sgxm" />
		<input type="text" class="input-text" style="width:120px" placeholder="施工区域" id="sgqy" name="sgqy" />
		<input type="text" class="input-text" style="width:120px" placeholder="工作内容" id="workcontent" name="workcontent" />
		<input type="text" class="input-text" style="width:120px" placeholder="录入人" id="lrrname" name="lrrname" />
		<span class="select-box inline">
			<select class="select" size="1" name="departmentid" id="departmentid" value="" onchange="" datatype="*" nullmsg="请选择所属部门！">
	          <option value="" selected>所属区域</option>
	        </select>
        </span>
        <span class="select-box inline">
			<select class="select" size="1" name="shenhe" id="shenhe" value="" onchange="" datatype="*" nullmsg="是否审核">
	          <option value="" selected>审核状态</option>
	          <option value="0" >已上报，待审核</option>
	          <option value="1" >已审核</option>
	        </select>
        </span>
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 查询</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
	 <span class="l">
	  <c:if test="${jluserinfo.isAdmin=='1'}">
	  	<a href="javascript:;" style="color: white" onclick="analysis()" class="btn btn-secondary radius"><i class="Hui-iconfont">&#xe618;</i>数据分析</a>
	  	<a href="javascript:;" style="color: white" onclick="shenhe()" class="btn btn-success radius"><i class="Hui-iconfont">&#xe618;</i>批量审核</a>
	  </c:if> 
	  <a href="javascript:;" style="color: white" onclick="dataoutput()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe644;</i>导出数据</a>
	  <a href="javascript:;" style="color: white" onclick="admin_add('添加信息','jlManualCheckInfoAction_toAdd','800','650')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 添加信息</a>
	  <a href="javascript:;" style="color: white" onclick="manager_add('添加信息','jlManualCheckInfoAction_toManagerAdd','800','650')" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i>批量添加</a>
	  </span>
	</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlManualCheckInfoAction_toiframe" width="100%" height="75%" frameborder="0"></iframe>
</div>

</body>
</html>