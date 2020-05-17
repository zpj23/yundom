<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>无标题文档</title>
<link href="${ctx}/style/ued.base.css" type="text/css" rel="stylesheet" />
<link href="${ctx}/style/fashionIndex.css" type="text/css" rel="stylesheet" />
<style type="text/css">
	  ul,li {margin:0;padding:0;list-style:none;}
	</style>
<!-- <script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=sNyur13vORywDFGWIkwSmuDi"></script>
<script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
 --><script src="${ctx}/js/sys/home/home.js" type="text/javascript"></script>
<script>
$(function(){
	datagrid_yujing();
})

function datagrid_yujing(){
    $.ajax({
		type: "post",
		url: "${ctx}/HomeAction_queryHomeYuJing",
		dataType: "html",
		data: {tableName :'weiwxx', rowCount:6, formatterMap: "{\"FENLXX\":\"SW01\" , \"GUANKJB\":\"SW02\"}"},
		success: function(data_){
			var yujingStr;
			$.each($.parseJSON(data_),function(k,v){
				yujingStr+="<tr><td></td><td class=\"tl\"><a href='#' onclick=showDetail('"+v.WEIWXX_GUID+"')>"+v.SHIDMC+"</a></td><td>"+formatter_shidmc(v.GUANKJB)+"</td></tr>"
			})
			$('#datagrid_yujing').find('tbody').append(yujingStr);
		}
	});
 }
 
function formatter_shidmc(param){
    try{
        if(param.indexOf('红色')==0){
            return "<img src='${ctx}/images/fashion/newindex_g1.gif'>";
        }if(param.indexOf('橙色')==0){
            return "<img src='${ctx}/images/fashion/newindex_g2.gif'>";
        }if(param.indexOf('黄色')==0){
            return "<img src='${ctx}/images/fashion/newindex_g3.gif'>";
        }if(param.indexOf('蓝色')==0){
            return "<img src='${ctx}/images/fashion/newindex_g4.gif'>";
        } 
    }catch(e){
        return param;
    }
}

function showDetail(param){
    Home.openModalWindow('详细信息', 'processAction_leaderReadForm?id='+param, 900, 650)
}
</script>
</head>

<body>
<div class="logo">
  <div class="kh_name">张明主任</div>
  <a href="loginAction_checkLogin"><img src="${ctx}/images/fashion/newindex_j23.jpg" class="fr" /></a>
  
</div>
<div class="cellmain">
 <div class="cbo kuai">
      <div class="cont_div">
         <div class="ty_head"><div class="nt"><a href="#">更多</a><img src="${ctx}/images/fashion/newindex_j4.jpg" />通知公告</div></div>
         <div class="ty_list">
          	<c:forEach items="${noticeList}" var="a" varStatus="vs">
          		<c:if test="${vs.index==0}">
	            <h1 class="hot"><a href="#">${a.title}</a></h1>
	            <div class="cbo info">
		            <img src="${ctx}/images/fashion/newindex_j18.jpg" width="119" height="90" />
		            <p>${a.content }</p>
	            </div>
	            </c:if>
            </c:forEach>
            <ul class="list_info">
              <c:forEach items="${noticeList}" var="a" varStatus="vs">
              	<c:if test="${vs.index>1}">
				    <li><span>${a.createTime}</span>
				     	<a href="void(0);" onclick="toNoticeDetail('${a.id}');return false;" >${a.title}</a>
				    </li> 
			    </c:if>		  
			  </c:forEach>
            </ul>
            
         </div>
         <div class="ty_bot"><div></div></div>
      </div>
      <div class="big_div">
       <table width="100%" border="0" cellpadding="0" cellspacing="0"  class="table_kj">
          <tr>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j9.jpg" /><br/><span>涉稳信息</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j10.jpg" /><br/><span>督察督办</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j11.jpg" /><br/><span>风险评估</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j12.jpg" /><br/><span>涉稳人员</span></a></td>
          </tr>
          <tr>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j16.jpg" /><br/><span>应急处理</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j15.jpg" /><br/><span>资源库</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j14.jpg" /><br/><span>考核监管</span></a></td>
            <td><a href="#"><img src="${ctx}/images/fashion/newindex_j13.jpg" /><br/><span>组织体系</span></a></td>
          </tr>
       </table>
      </div>
      <div class="cont_div">
      	<div class="ty_head"><div class="nt"><a href="#">更多</a><img src="${ctx}/images/fashion/newindex_j8.jpg" />信息预警</div></div>
        <div class="ty_list">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"  class="table_list" id="datagrid_yujing">
            <thead>
            <tr>
              <th width="9%"></th>
              <th width="64%" class="tl">名称</th>
              <th width="27%">管控级别</th>
            </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
        <div class="ty_bot"><div></div></div>
      </div>
 </div>
 <div class="cbo kuai">
      <div class="cont_div">
         <div class="ty_head"><div class="nt"><a href="#">更多</a><img src="${ctx}/images/fashion/newindex_j5.jpg" />待办事项</div></div>
         <div class="ty_list">
          <table width="100%" cellpadding="0" cellspacing="0" border="0"  class="table_list">
            <thead>
            <tr>
              <th width="54%" class="tl">名称</th>
              <th width="23%">时间</th>
              <th width="14%">单位</th>
            </tr>
            </thead>
            <tbody>
             <c:forEach items="${todoList}" var="a" varStatus="vs">
             	<tr>
	              <td class="tl">${a.title}</td>
	              <td>${a.sendDate }</td>
	              <td>${a.sendOrgDept }</td>
	            </tr>
             </c:forEach>
            </tbody>
          </table>
         </div>
         <div class="ty_bot"><div></div></div>
      </div>
      <div class="big_div">
      	<div class="ty_head"><div class="nt"><a href="#">更多</a><img src="${ctx}/images/fashion/newindex_j6.jpg" />地图</div></div>
	      	<div title="涉稳信息分布" collapsible="true" closable="false" style="height:260px;overflow-x:hidden;overflow-y:hidden;padding: 5px;">
			  <div class="easyui-tabs" data-options="fit:true,plain:true">
				 <div id="baidumap1"  title="涉稳信息">
	
				 </div>
				 <div id="baidumap2" title="涉稳人员">
			
				 </div>
				 <div id="baidumap3" title="热力分布">
				
				 </div>
			  </div>
	      </div>
          <div class="ty_list">地图</div>
         <div class="ty_bot"><div></div></div>
      </div>
      
      <div class="cont_div">
      	<div class="ty_head"><div class="nt"><a href="#">更多</a><img src="${ctx}/images/fashion/newindex_j7.jpg" />辅助决策</div></div>
        <div class="ty_list">
          <table cellpadding="0" cellspacing="0" border="0" class="table_fuzhu">
            <tr>
              <td><img src="${ctx}/images/fashion/newindex_j19.jpg" /></td>
              <td><img src="${ctx}/images/fashion/newindex_j20.jpg" /></td>
            </tr>
            <tr>
              <td><img src="${ctx}/images/fashion/newindex_j21.jpg" /></td>
              <td><img src="${ctx}/images/fashion/newindex_j22.jpg" /></td>
            </tr>
          </table>
        </div>
         <div class="ty_bot"><div></div></div>
      </div>
 </div>
</div>
<div id="jd_dialog_window" class="easyui-dialog"  
	data-options="modal:true,closed:true,iconCls:'icon-save'" 
		style="width:1000px;height:600px;padding:10px;" >      
</div>
<!-- <script src="images/jquery.min.js" type="text/javascript"></script> -->
<script>
 $(function(){
	 $('.table_list tbody tr').each(function(i){
		   if(i%2==0)
		   {
			   $(this).addClass('even');
			   }
		   else
		   {
				 $(this).addClass('odd');
			 }
		 })
	 })
</script>
<script>
		buildMap();
		function buildMap(){
			var x = 120.873801;
			var y = 32.014665;


			var map1 = new BMap.Map("baidumap1");          // 创建地图实例
		    var point1 = new BMap.Point(x, y);
		    map1.centerAndZoom(point1, 25);             // 初始化地图，设置中心点坐标和地图级别
		    map1.enableScrollWheelZoom(); // 允许滚轮缩放

			//map1.centerAndZoom(new BMap.Point(120.873801, 32.014665), 14);
			var marker1 = new BMap.Marker(new BMap.Point(120.873801, 32.014665));  // 创建标注
			map1.addOverlay(marker1);              // 将标注添加到地图中

			//创建信息窗口
			var infoWindow1 = new BMap.InfoWindow("普通标注");
			marker1.addEventListener("click", function(){this.openInfoWindow(infoWindow1);});

			//创建小狐狸
			//var pt = new BMap.Point(120.873801, 32.014665);
			//var myIcon = new BMap.Icon("", new BMap.Size(300,157));
			//var marker2 = new BMap.Marker(pt,{icon:myIcon});  // 创建标注
			//map1.addOverlay(marker2);              // 将标注添加到地图中

			//让小狐狸说话（创建信息窗口）
			//var infoWindow2 = new BMap.InfoWindow("<p style='font-size:14px;'>哈哈，你看见我啦！我可不常出现哦！</p><p style='font-size:14px;'>赶快查看源代码，看看我是如何添加上来的！</p>");
			//marker2.addEventListener("click", function(){this.openInfoWindow(infoWindow2);});

		 

			var map2 = new BMap.Map("baidumap2");          // 创建地图实例
		    var point2 = new BMap.Point(x, y);
		    map2.centerAndZoom(point2, 15);             // 初始化地图，设置中心点坐标和地图级别
		    map2.enableScrollWheelZoom(); // 允许滚轮缩放

			var marker22 = new BMap.Marker(new BMap.Point(120.873801, 32.014665));  // 创建标注
			map2.addOverlay(marker22);              // 将标注添加到地图中
			




			var map = new BMap.Map("baidumap3");          // 创建地图实例

		    var point = new BMap.Point(x, y);
		    map.centerAndZoom(point, 15);             // 初始化地图，设置中心点坐标和地图级别
		    map.enableScrollWheelZoom(); // 允许滚轮缩放

		    var points =[
		    {"lng":120.873801,"lat":32.014665,"count":50},
		    {"lng":120.863801,"lat":32.024665,"count":51},
		    {"lng":120.853801,"lat":32.013665,"count":15},
		    {"lng":120.861801,"lat":32.029665,"count":40},
		    {"lng":120.858801,"lat":32.034665,"count":200},
		    {"lng":120.876801,"lat":32.026665,"count":250},
		    {"lng":120.863801,"lat":32.016665,"count":18},
		    {"lng":120.853801,"lat":32.017665,"count":80},
		    {"lng":120.843801,"lat":32.011165,"count":11},
		    {"lng":120.883801,"lat":32.011695,"count":7},
		    {"lng":120.877801,"lat":32.034655,"count":42},
		    {"lng":120.866801,"lat":32.024115,"count":300},
		    {"lng":120.855801,"lat":32.014225,"count":27},
		    {"lng":120.866601,"lat":32.012265,"count":23},
		    {"lng":120.855501,"lat":32.013365,"count":60},
		    {"lng":120.844401,"lat":32.011125,"count":8}];
		    

		    if(!isSupportCanvas()){
		    	alert('热力图目前只支持有canvas支持的浏览器,您所使用的浏览器不能使用热力图功能~')
		    }

		    	
			//详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md

			//参数说明如下:
			/* visible 热力图是否显示,默认为true
		     * opacity 热力的透明度,1-100
		     * radius 势力图的每个点的半径大小   
		     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
		     *	{
					.2:'rgb(0, 255, 255)',
					.5:'rgb(0, 110, 255)',
					.8:'rgb(100, 0, 255)'
				}
				其中 key 表示插值的位置, 0~1. 
				    value 为颜色值. 
		     */
			heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});
			map.addOverlay(heatmapOverlay);
			heatmapOverlay.setDataSet({data:points,max:100});
		   
		}
		
		function setRadius(radius){
	    	document.getElementById("radius-result").innerHTML = radius;
	        heatmapOverlay.setOptions({"radius":radius})
	    }

	    function setOpacity(opacity){
	    	document.getElementById("opacity-result").innerHTML = opacity;
	        heatmapOverlay.setOptions({"opacity":opacity})
	    }

	    function toggle(){
	        heatmapOverlay.toggle()
	    }

	     function setGradient(){

	     	/*
			格式如下所示:
			{
		  		0:'rgb(102, 255, 0)',
		 	 	.5:'rgb(255, 170, 0)',
			  	1:'rgb(255, 0, 0)'
			}
	     	*/
	     	var gradient = {};
	     	var colors = document.querySelectorAll("input[type='color']");
	     	colors = [].slice.call(colors,0);
	     	colors.forEach(function(ele){
				gradient[ele.getAttribute("data-key")] = ele.value; 
	     	});
	        heatmapOverlay.setOptions({"gradient":gradient});
	    }


	    function isSupportCanvas(){
	        var elem = document.createElement('canvas');
	        return !!(elem.getContext && elem.getContext('2d'));
	    }
</script>
</body>
</html>
