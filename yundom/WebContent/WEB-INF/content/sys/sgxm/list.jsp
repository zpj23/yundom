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
<title>施工项目管理</title>
<script type="text/javascript">
//提示：1、工价/包月 填完会根据应发工资=（工价/包月）*总工时，自动计算出应发工资；2、基本工资 填完会根据加班工资和奖金=总工资-基本工资，自动计算出加班工资和奖金；3、劳护补贴在审核时会自动填入；4、其他扣款 填完会根据总工资=应发工资+劳护补贴+费用补贴+满勤-其他扣款，自动计算总工资；5、填写完预发工资，或者第4步中的计算自动生成剩余工资，根据公式 剩余工资=总工资-预发工资。
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
	w=document.body.clientWidth-100;
	h=document.body.clientHeight-100;
	layer_show(title,url,w,h);
}


function searchInfo(){
	
	list_iframe.contentWindow.load($('#username').val(),$('#sgxm').val(),$('#departmentid').val(),$('#yuefen').val());
}
function tolist(){
	list_iframe.contentWindow.load($('#username').val(),$('#sgxm').val(),$('#departmentid').val(),$('#yuefen').val());
}

function dataoutput(){
	alert("导出数据");
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
	       str+="<option value='"+data[i].name+"' >"+data[i].name+"</option>";
	      }
	      $("#departmentid").html(str);

	     }
	});
}

</script>
</head>
<body style="overflow: hidden">
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 工资管理 <span class="c-gray en">&gt;</span> 项目工资管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-10">
<form action="" name="form1" method="post" enctype="multipart/form-data"  id="form1"  >
		<div class="text-c"> 
		<input type="text" class="input-text" style="width:120px" placeholder="姓名" id="username" name="username" />
		<input type="text" class="input-text" style="width:120px" placeholder="施工项目" id="sgxm" name="sgxm" />
		<span class="select-box inline" >
			<select  class="select" size="1" name="departmentid" id="departmentid" value="" onchange="" datatype="*" nullmsg="请选择所属部门！">
	          <option value="" selected>所属区域</option>
	        </select>
        </span>
		<input type="text" placeholder="选择月份" onfocus="WdatePicker({dateFmt:'yyyy-M'})" id="yuefen" name="yuefen" class="input-text Wdate" style="width:80px;">
		
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 查询</button>
		
	</div>
	<div class="text-c"> 
		&nbsp;
	</div>
	</form>
		
<iframe id="list_iframe" name="list_frame" src="sgxmAction_toiframe" width="100%" height="78%" frameborder="0"></iframe>
</div>

</body>
</html>