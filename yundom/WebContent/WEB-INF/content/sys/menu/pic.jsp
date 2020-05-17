<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
<link href="newUI/lib/icheck/icheck.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/icheck/jquery.icheck.min.js"></script> 
<script type="text/javascript" src="newUI/lib/Validform/5.3.2/Validform.min.js"></script>
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="http://lib.h-ui.net/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<!-- <script type="text/javascript" src="js/sys/user/add.js"></script> -->
<title>新增菜单</title>
<script type="text/javascript">
var sel;
$(function(){
	$('.Hui-iconfont').dblclick(function(){
		sel=$(this).attr("name");
		closethisWin();
	});
});

//关闭该窗口
function closethisWin(){
	var index = parent.layer.getFrameIndex(window.name);
	parent.toShowPic(sel);
	parent.layer.close(index);
}
	
</script>
<style type="text/css">
.icon_lists .Hui-iconfont{font-size:38px;line-height: 100px;margin: 10px 0;color: #333;-webkit-transition: font-size 0.25s ease-out 0s;-moz-transition: font-size 0.25s ease-out 0s;transition: font-size 0.25s ease-out 0s}
.icon_lists .Hui-iconfont:hover { font-size: 100px ;cursor: pointer;}
</style>
</head>
<body>
<div class="pd-20 icon_lists">
    <div class="row cl">
<!--       <label class="form-label col-4"><span class="c-red">*</span>菜单名称：</label> -->
      <div class="formControls col-16">
        <i class="Hui-iconfont Hui-iconfont-search1" name="search1"></i>
        <i class="Hui-iconfont Hui-iconfont-manage" name="manage" ></i>
        <i class="Hui-iconfont Hui-iconfont-news" name="news" ></i>
        <i class="Hui-iconfont Hui-iconfont-tuku" name="tuku" ></i>
        <i class="Hui-iconfont Hui-iconfont-goods" name="goods" ></i>
        <i class="Hui-iconfont Hui-iconfont-comment" name="comment" ></i>
        <i class="Hui-iconfont Hui-iconfont-user" name="user" ></i>
        <i class="Hui-iconfont Hui-iconfont-tongji" name="tongji" ></i>
      </div>
    </div>
    <div class="row cl">
      <div class="formControls col-16">
        <i class=" icon Hui-iconfont Hui-iconfont-jiangjia" name="jiangjia"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-menu" name="menu"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-shujutongji" name="shujutongji"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-system" name="system"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-tags" name="tags"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-dangan" name="dangan"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-manage2" name="manage2"  ></i>
       <i class=" icon Hui-iconfont Hui-iconfont-share" name="share"  ></i>
       
      </div>
    </div>
<!--     <div class="row cl"> -->
<!--       <div class="col-16 col-offset-5"> -->
<!--         <input class="btn btn-primary radius" type="button" onclick="tijiao()" value="&nbsp;&nbsp;提交&nbsp;&nbsp;"> -->
<!--       </div> -->
<!--     </div> -->
</div>
</div>


</body>
</html>