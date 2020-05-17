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
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=sNyur13vORywDFGWIkwSmuDi"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>

<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<title>地图管理</title>
<script type="text/javascript">
var bigMap;
var datagrid;
var markerArr=new Array();
	$(function() {		
		initMap();
	});
	//初始化地图
	function initMap(){
		bigMap = new BMap.Map("BaiduContainer",{mapType:BMAP_HYBRID_MAP}); 
		bigMap.enableScrollWheelZoom();
		bigMap.centerAndZoom(new BMap.Point(119.630414,39.955235),17);
		var mapType1 = new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]});
		bigMap.addControl(mapType1);  
		bigMap.setCurrentCity("江苏省");
	}
	function createHtml(obj){
		var content = "<table>";  
	     content = content + "<tr><td>姓名：</td><td>"+obj.username+"</td></tr>";  
		 content = content + "<tr><td>家庭住址：</td><td>"+obj.address+"</td></tr>";  
		 content = content + "<tr><td>经度：</td><td>"+obj.zuobiao.split(",")[0]+"</td></tr>";  
		 content = content + "<tr><td>纬度：</td><td>"+obj.zuobiao.split(",")[1]+"</td></tr>";  
	     content += "</table>";
	     return content;
	}
	//添加到地图上
	function addOnMap(data){
		if(null==data||""==data||data.length==0){
			return;
		}
		var currentMapLevel=bigMap.getZoom();

		markerArr=new Array();
		bigMap.clearOverlays();
		for(var i=0;i<data.length;i++){
			var zb=data[i].zuobiao;
			bigMap.centerAndZoom(new BMap.Point(zb.split(",")[0],zb.split(",")[1]),currentMapLevel);
			var marker =new BMap.Marker(new BMap.Point(zb.split(",")[0],zb.split(",")[1]));
			var html=createHtml(data[i]);
			
			(function () { 
				var infoWindow = new BMap.InfoWindow(html);
				marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
			})();
			
			marker.setTitle(data[i].username);
	 		var label=new BMap.Label(data[i].username);
	 		var size=new BMap.Size(20,20);
	 		label.setOffset(size);
	 		marker.setLabel(label);
	 		marker.id=data[i];
	 		markerArr.push(marker);
	 		bigMap.addOverlay(marker);
		}
		
	}
	
	//创建轨迹的气泡框
	function createGjHtml(obj,xingming){
		var content = "<table>";  
		 content = content + "<tr><td width='60px'>姓名：</td><td>"+xingming+"</td></tr>";  
	     content = content + "<tr><td width='60px'>内容：</td><td>"+obj.content+"</td></tr>";  
	     content = content + "<tr><td width='60px'>时间：</td><td>"+obj.createtime.substring(0,11)+"</td></tr>"; 
		 content = content + "<tr><td width='60px'>经度：</td><td>"+obj.zuobiao.split(",")[0]+"</td></tr>";  
		 content = content + "<tr><td width='60px'>纬度：</td><td>"+obj.zuobiao.split(",")[1]+"</td></tr>";  
	     content += "</table>";
	     return content;
	}
	//创建轨迹
	function createLine(data,xingming){
		bigMap.clearOverlays();
		var pointArr=new Array();
		for(var i=0;i<data.length;i++){
			var point=new BMap.Point(data[i].zuobiao.split(",")[0], data[i].zuobiao.split(",")[1]); 
			pointArr.push(point);
			var marker =new BMap.Marker(point);
			var html=createGjHtml(data[i],xingming);
			
			(function () { 
				var infoWindow = new BMap.InfoWindow(html);
				marker.addEventListener("click", function(){this.openInfoWindow(infoWindow);});
			})();
			
			marker.setTitle(xingming);
			var label;
			if(i==0){
		 		label=new BMap.Label("起始点-"+data[i].createtime.substring(0,11));
			}else if(i==(data.length-1)){
				label=new BMap.Label("结束点-"+data[i].createtime.substring(0,11));
			}else{
				label=new BMap.Label(data[i].createtime.substring(0,11));
				
			}
	 		var size=new BMap.Size(20,20);
	 		label.setOffset(size);
	 		marker.setLabel(label);
	 		marker.id=data[i];
	 		bigMap.addOverlay(marker);
		}
		var polyline = new BMap.Polyline(pointArr, {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.5});   //创建折线	
		bigMap.addOverlay(polyline);
		var currentMapLevel=bigMap.getZoom();
		bigMap.centerAndZoom(new BMap.Point(data[0].zuobiao.split(",")[0], data[0].zuobiao.split(",")[1]),currentMapLevel);
		addArrow(polyline,5,Math.PI/7);
	}
	function addArrow(polyline,length,angleValue){ //绘制箭头的函数  
		var linePoint=polyline.getPath();//线的坐标串  
		var arrowCount=linePoint.length;  
		for(var i =1;i<arrowCount;i++){ //在拐点处绘制箭头  
		var pixelStart=bigMap.pointToPixel(linePoint[i-1]);  
		var pixelEnd=bigMap.pointToPixel(linePoint[i]);  
		var angle=angleValue;//箭头和主线的夹角  
		var r=length; // r/Math.sin(angle)代表箭头长度  
		var delta=0; //主线斜率，垂直时无斜率  
		var param=0; //代码简洁考虑  
		var pixelTemX,pixelTemY;//临时点坐标  
		var pixelX,pixelY,pixelX1,pixelY1;//箭头两个点  
		if(pixelEnd.x-pixelStart.x==0){ //斜率不存在是时  
		    pixelTemX=pixelEnd.x;  
		    if(pixelEnd.y>pixelStart.y)  
		    {  
		    pixelTemY=pixelEnd.y-r;  
		    }  
		    else  
		    {  
		    pixelTemY=pixelEnd.y+r;  
		    }     
		    //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
		    pixelX=pixelTemX-r*Math.tan(angle);   
		    pixelX1=pixelTemX+r*Math.tan(angle);  
		    pixelY=pixelY1=pixelTemY;  
		}  
		else  //斜率存在时  
		{  
		    delta=(pixelEnd.y-pixelStart.y)/(pixelEnd.x-pixelStart.x);  
		    param=Math.sqrt(delta*delta+1);  
		  
		    if((pixelEnd.x-pixelStart.x)<0) //第二、三象限  
		    {  
		    pixelTemX=pixelEnd.x+ r/param;  
		    pixelTemY=pixelEnd.y+delta*r/param;  
		    }  
		    else//第一、四象限  
		    {  
		    pixelTemX=pixelEnd.x- r/param;  
		    pixelTemY=pixelEnd.y-delta*r/param;  
		    }  
		    //已知直角三角形两个点坐标及其中一个角，求另外一个点坐标算法  
		    pixelX=pixelTemX+ Math.tan(angle)*r*delta/param;  
		    pixelY=pixelTemY-Math.tan(angle)*r/param;  
		  
		    pixelX1=pixelTemX- Math.tan(angle)*r*delta/param;  
		    pixelY1=pixelTemY+Math.tan(angle)*r/param;  
		}  
		  
		var pointArrow=bigMap.pixelToPoint(new BMap.Pixel(pixelX,pixelY));  
		var pointArrow1=bigMap.pixelToPoint(new BMap.Pixel(pixelX1,pixelY1));  
		var Arrow = new BMap.Polyline([  
		    pointArrow,  
		 linePoint[i],  
		    pointArrow1  
		], {strokeColor:"blue", strokeWeight:3, strokeOpacity:0.5});  
		bigMap.addOverlay(Arrow);  
		}  
		}  
	
	
	function searchInfo(){
		$.ajax({
		     type: "POST",
		     url: "jlLocationAction_showByName?datemin="+$("#datemin").val()+"&datemax="+$("#datemax").val()+"&username="+$("#username").val(),
		     async:false,
		     success: function(data1){
		      var str="";
		      var arr = $.parseJSON(data1);
		      addOnMap(arr);
		     }
		});
	}
</script>
</head>
<body>
<nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 系统管理 <span class="c-gray en">&gt;</span> 地图管理<a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav>
<div class="pd-20">
<form action="" name="form1" method="post"  id="form1" enctype="multipart/form-data" >
 
	<div class="text-c"> 日期范围：
		<input type="text" onfocus="WdatePicker({maxDate:'#F{$dp.$D(\'datemax\')}'})" id="datemin" name="datemin" class="input-text Wdate" style="width:120px;">
		-
		<input type="text" onfocus="WdatePicker({minDate:'#F{$dp.$D(\'datemin\')}'})" id="datemax" name="datemax" class="input-text Wdate" style="width:120px;">
		<input type="text" class="input-text" style="width:250px" placeholder="输入用户名" id="username" name="username">
		<button type="button"  class="btn btn-success" onclick="searchInfo();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 搜用户</button>
	</div>
	<div class="cl pd-5 bg-1 bk-gray mt-20">
	 <span class="l">
<!-- 	 <input type="file" id="file" name="file" style="width:150px;" /> -->
		<span class="btn-upload form-group">
			<input class="input-text upload-url" type="text" name="ad" id="ad" readonly  datatype="*" nullmsg="请添加附件！" style="width:200px">
			<a href="javascript:void();" style="color: white" class="btn btn-primary upload-btn radius"><i class="Hui-iconfont">&#xe642;</i> 浏览文件</a>
			<input type="file" multiple name="file" class="input-file">
		</span>
	  <a href="javascript:;" style="color: white" onclick="dataimport()" class="btn btn-danger radius"><i class="Hui-iconfont">&#xe600;</i>批量导入</a>
	   <!-- <span class="r">共有数据：<strong>${count}</strong> 条</span> -->
	</div>
	</form>
		
<div id="BaiduContainer" style="height: 624px; width:982px; " title="地图"></div>
</div>

</body>
</html>