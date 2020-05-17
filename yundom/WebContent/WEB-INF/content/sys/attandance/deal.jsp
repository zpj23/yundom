<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/h-ui_header.jsp"%>
<%@ include file="/common/h-ui_ueditor.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />
<!-- <link rel="stylesheet" href="ueditor1_4_3-utf8-jsp/themes/default/css/ueditor.css" type="text/css"> -->
<!-- 	<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/ueditor.config.js"></script> -->
<!-- 	<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/ueditor.all.js"></script> -->
<!-- 	<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/lang/zh-cn/zh-cn.js"></script> -->
<!-- 	<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/lang/en/en.js"></script> -->
<script type="text/javascript">
$(function(){
	
	setTimeout('init()',0);
       
       
});
function init(){
	var BBSeditor = new baidu.editor.ui.Editor({
    	textarea:'mailinfo.content',					//表单提交的name
	});
    BBSeditor.render("myEditor");
    BBSeditor.addListener("ready", function () {
        // editor准备好之后才可以使用
        BBSeditor.setContent('');
    });
}
//导入考勤
function dataimport(){
  
  var value=$("#file").val();
  if(value==""){
    layer.msg('请选择需要导入的文档',{icon: 5,time:3000});
    return;
  }
  form1.action="jlAttendanceInfoAction_importExcel";
  form1.submit();
}
</script>

</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 考勤导入<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>

<div class="pd-20">
  <form action="" name="form1" method="post" class="form form-horizontal" id="form1" enctype="multipart/form-data">
    
    <div class="row cl">
	 <span class="btn-upload form-group">
			<input class="input-text upload-url" type="text" name="ad" id="ad" readonly  datatype="*" nullmsg="请添加附件！" style="width:200px">
			<a href="javascript:void();" style="color: white" class="btn btn-primary upload-btn radius"><i class="Hui-iconfont">&#xe642;</i> 浏览文件</a>
			<input type="file" multiple name="file" class="input-file" />
			
		</span>
		
		&nbsp;&nbsp;
			<a href="javascript:;" style="color:white;" onclick="dataimport()" class="btn btn-primary radius"><i class="Hui-iconfont">&#xe600;</i> 导入考勤</a>
   
      	 </div>
      	 <div class="row cl">
	      	 <div id="myEditor" style="width:100%;height: 200px;"></div> 
      	 </div>
  </form>
  			附件： <mf:FileUpload id="wj" mode="edit" moduleID="123" moduleType="wj"></mf:FileUpload>
  			
  			   
  			
  			
</div>


</body>
</html>