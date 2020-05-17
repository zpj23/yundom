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
<title>工资单管理</title>
<script type="text/javascript">
//提示：1、工价/包月 填完会根据应发工资=（工价/包月）*总工时，自动计算出应发工资；2、基本工资 填完会根据加班工资和奖金=总工资-基本工资，自动计算出加班工资和奖金；3、劳护补贴在审核时会自动填入；4、其他扣款 填完会根据总工资=应发工资+劳护补贴+费用补贴+满勤-其他扣款，自动计算总工资；5、填写完预发工资，或者第4步中的计算自动生成剩余工资，根据公式 剩余工资=总工资-预发工资。
$(document).ready(function(){
// 	initDep();
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
	w=document.body.clientWidth-100;
	h=document.body.clientHeight-100;
	layer_show(title,url,w,h);
}

function composeTime(){
	var year=$("#nianfen").val();
	var month=$('#yuefen').val();
	var tempStr="";
	if(year!=null&&year!=""){
		tempStr+=year;
	}
	if(tempStr!=""){
		if(month!=null&&month!=""){
			tempStr+="-"+month;
		}
	}else{
		if(month!=null&&month!=""){
			alert("请先选择年份");
		}
	}
	
	return tempStr;
}

function searchInfo(){
	var year=$("#nianfen").val();
	var month=$('#yuefen').val();
	var tempStr="";
	if(year!=null&&year!=""){
		tempStr+=year;
	}
	if(tempStr!=""){
		if(month!=null&&month!=""){
			tempStr+="-"+month;
		}
	}else{
		if(month!=null&&month!=""){
			alert("请先选择年份");
			return;
		}
	}	
	list_iframe.contentWindow.load($('#username').val(),tempStr);
}
function tolist(){
	var year=$("#nianfen").val();
	var month=$('#yuefen').val();
	var tempStr="";
	if(year!=null&&year!=""){
		tempStr+=year;
	}
	if(tempStr!=""){
		if(month!=null&&month!=""){
			tempStr+="-"+month;
		}
	}else{
		if(month!=null&&month!=""){
			alert("请先选择年份");
			return;
		}
	}	
	list_iframe.contentWindow.load($('#username').val(),tempStr);
}

function dataoutput(){
	var year=$("#nianfen").val();
	var month=$('#yuefen').val();
	var tempStr="";
	if(year!=null&&year!=""){
		tempStr+=year;
	}
	if(tempStr!=""){
		if(month!=null&&month!=""){
			tempStr+="-"+month;
		}
	}else{
		if(month!=null&&month!=""){
			alert("请先选择年份");
			return;
		}
	}
	list_iframe.contentWindow.outputparam($('#username').val(),tempStr);
}
//更新项目工资单中的某个月份的数据
function updateSgxmByYf(){
	var yuefen=$("#sgxmyf").val();
	if(yuefen==""){
		alert("请选择需要更新的月份");
		return;
	}
	$.messager.confirm('温馨提示', '您确定要更新'+yuefen+'的项目工资管理中的数据吗', function(b) {
		if (b) {
			showProcess(true, '温馨提示', '正在更新...');
			setTimeout(function(){
				ajaxupdateSgxmByYf(yuefen);
			}, 200);
		}
	});
	
}
function ajaxupdateSgxmByYf(yuefen){
	$.ajax({
	   type: "POST",
	   url: "jlPayrollAction_updateSgxmInfo",
	   async:true,
	   data: "yf="+yuefen,
	   success: function(data){
		   showProcess(false);
		   if(data){
			   parent.layer.msg('更新成功!',{icon: 1,time:1000});
		   }else{
			   parent.layer.msg('更新失败!',{icon: 5,time:10000});
		   }
	   }
	});
}
//进度条
function showProcess(isShow, title, msg) {
	if (!isShow) {
		$.messager.progress('close');
		return;
	}
	var win = $.messager.progress({
		title : title,
		msg : msg
	});
}
</script>
</head>
<body style="overflow: hidden">
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 工资管理 <span class="c-gray en">&gt;</span> 工资单管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-10">
提示：1、工价/包月 填完会根据应发工资=（工价/包月）*总工时，自动计算出应发工资；2、基本工资 填完会根据加班工资和奖金=应发工资-基本工资，自动计算出加班工资和奖金；3、劳护补贴在审核时会自动填入；4、其他扣款 填完会根据总工资=应发工资+劳护补贴+费用补贴+满勤-其他扣款，自动计算总工资；5、填写完预发工资，或者第4步中的计算自动生成剩余工资，根据公式 剩余工资=总工资-预发工资。
<form action="" name="form1" method="post" enctype="multipart/form-data"  id="form1"  >
		<div class="text-c"> 
<!-- 			<input type="checkbox" id="orderWay" name="orderWay"  />排序方式 -->
			<input type="text" class="input-text" style="width:120px" placeholder="姓名" id="username" name="username" />
			<input type="text" placeholder="选择年份" onfocus="WdatePicker({dateFmt:'yyyy'})" id="nianfen" name="nianfen" class="input-text Wdate" style="width:80px;">
			<input type="text" placeholder="选择月份" onfocus="WdatePicker({dateFmt:'M'})" id="yuefen" name="yuefen" class="input-text Wdate" style="width:80px;">
			<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 查询</button>
			&nbsp;&nbsp;&nbsp;&nbsp;
			<input type="text" placeholder="选择月份" onfocus="WdatePicker({dateFmt:'yyyy-M'})" id="sgxmyf" name="sgxmyf" class="input-text Wdate" style="width:80px;">
			<button type="button"  class="btn btn-primary" onclick="updateSgxmByYf();" id="" name=""><i class="Hui-iconfont">&#xe665;</i>  更新施工项目单信息</button>
	
		</div>
		<div class="text-c">
			&nbsp;&nbsp;&nbsp;&nbsp;
		</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="jlPayrollAction_toiframe" width="100%" height="78%" frameborder="0"></iframe>
</div>

</body>
</html>