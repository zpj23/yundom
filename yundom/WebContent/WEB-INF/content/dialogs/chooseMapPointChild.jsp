<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>        
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="initial-scale=1.0, user-scalable=no" />
<style type="text/css">
body, html{width: 100%;height:100%;overflow: hidden;margin:0; padding:0;}
#allmap {width: 100%;height:96%;overflow: hidden;margin:0; padding:0;}
#allmap2 {width: 100%;height:4%;overflow: hidden;margin:0; padding:0;}
.BMap_cpyCtrl{display:none;}
.anchorBL{display:none;} 
</style>
<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=sNyur13vORywDFGWIkwSmuDi"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
<script type="text/javascript" src="${ctx}/js/comm/common.js"></script>
<title>地图</title>
</head>
<body style="height: 100%">
  <div id="allmap"></div>
  
</body>
</html>
<script type="text/javascript">
//var x = 120.873801;
//var y = 32.014665;
var x = 117.02702;
var y = 36.674414;
var map = new BMap.Map("allmap");
initMap(map);
showControl(map);
var localSearch = new BMap.LocalSearch(map);
var obj_ ;
// 地区检索
function search(param){
	localSearch.search(window.parent.UserObj.userOrgName.trim());
	localSearch.setSearchCompleteCallback(function (searchResult) {
		var poi = searchResult.getPoi(0);
		this.param_ = param;
		showInfo(poi, param);
	});
}

// 初始化map
function initMap(param){
  param.centerAndZoom(new BMap.Point(x, y), 16);
  param.addEventListener("click", showInfo);
  param.enableScrollWheelZoom();
  if(navigator.userAgent.indexOf("MSIE")>0){
	  //如果是IE浏览器就强制让它偏移指定的像素(因为IE下没办法居中)	
	  map.panBy(305,165);
	  //这里的数值单位是像素不是百度的经纬度
  }
}

// 地图动态标注返回经纬度
function showInfo(e){
  var point = new BMap.Point(e.point.lng, e.point.lat);
  // 创建标注
  var marker = new BMap.Marker(point);  
  map.clearOverlays();
  // 将标注添加到地图中
  map.addOverlay(marker);
  // 跳动的动画      
  marker.setAnimation(BMAP_ANIMATION_BOUNCE); 
  busLngAndLat(e.point.lng, e.point.lat);
 
  // 创建信息窗口对象
  var infoWindow = new BMap.InfoWindow('<font color=\'red\' style=\'font-size:12px;\'><b>经度:'+e.point.lng+'<p/>纬度:'+e.point.lat+'</b></font>',{enableMessage:false}); 
  marker.openInfoWindow(infoWindow);
}



// 缩放控件
function showControl(param){
  // 添加默认缩放平移控件
  param.addControl(new BMap.NavigationControl()); 
  // 左下角，仅包含平移按钮
  param.addControl(new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_LEFT, type: BMAP_NAVIGATION_CONTROL_PAN})); 
}

// 业务数据
function busLngAndLat(paramLng, paramLat, param){
  var tabWindow = window.parent.CenterTab.getSelectTabWindow();
  if(tabWindow.inputObj==undefined){
	  tabWindow =  window.parent.frames["jd_iframe_window"];
  }
  tabWindow.inputObj.mapLng = paramLng;
  tabWindow.inputObj.mapLat = paramLat;
  this.param_[0].value=paramLng+","+paramLat;
}
</script>

