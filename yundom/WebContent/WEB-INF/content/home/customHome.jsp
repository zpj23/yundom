<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>

<html style="height: 100%;">
	<head>
		<%@ include file="/common/meta.jsp"%>
		<title>首页</title>
		<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/EasyUI/themes/portal.css" />
		<style type="text/css">
		.title{
			font-size:16px;
			font-weight:bold;
			padding:20px 10px;
			background:#eee;
			overflow:hidden;
			border-bottom:1px solid #ccc;
		}
		.t-list{
			padding:5px;
		}
	</style>
	    <script src="${ctx}/js/Highcharts/highcharts.js"></script>
	    <script src="${ctx}/js/Highcharts/highcharts-3d.js"></script>
        <script src="${ctx}/js/Highcharts/modules/exporting.js"></script>
        <script src="${ctx}/js/sys/home/statistical.js"></script>
        <script src="${ctx}/js/sys/home/zhendata.js"></script>
		<script src="<%=request.getContextPath() %>/js/EasyUI/extension/jquery.portal.js" type="text/javascript"></script>
		<%--<script type="text/javascript" src="http://api.map.baidu.com/api?v=1.5&ak=sNyur13vORywDFGWIkwSmuDi"></script>
		<script type="text/javascript" src="http://api.map.baidu.com/library/Heatmap/2.0/src/Heatmap_min.js"></script>
		 <script src="<%=request.getContextPath() %>/js/sys/home/home.js" type="text/javascript"></script> --%>
		<!-- <script type="text/javascript" src="js/dialog/easyui_dialog.js"></script> -->
		<script>
		var panels;
	    var portal;
	    var myHeight = 200;
		$(function(){
			//panels = eval(ret);
		 //var closable = '${mode}'=='edit'?  true:false;
		 var closable = false;
       	 panels = [{
               id: 'p_notice',
               title: '通知公告',
               height: 170,
               //width: myWidth,
               collapsible: true,
               closable: closable,
               content: document.getElementById("p_notice").innerHTML
           }, {
               id: 'p_todo',
               title: '待办事项',
               height: 170,
               //width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<table id="datagrid_todo" class="easyui-datagrid" style="width:650px;height:auto" fit="true" border="false" singleSelect="true" idField="id" ></table>'
           }, {
               id: 'p_tj',
               title: '统计汇总',
               height: 250,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<div id="tj" style="height:210px;padding:5px; overflow:hidden;" ></div>'
           }, {
               id: 'p_grid',
               title: '信息预警',
               height: 170,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<table style="width:650px;height:auto" fit="true" border="false" singleSelect="true" idField="WEIWXX_GUID" id="datagrid_yujing">'
               	+'<thead><tr>'
               	+'<th field="WEIWXX_GUID" align="left" width="200" checkbox="true">id</th>'
               	+'<th field="SHIDMC" align="left" width="270" formatter="formatter_shidmc">名称</th>'
               	+'<th field="FENLXX" align="left" width="230" >信息分类</th>'
               	+'<th field="GUANKJB" align="left" width="100" >管控级别</th>'
               	+'</tr> </thead>'
               	+'</table>'
           }, {
               id: 'p_map',
               title: '涉稳信息分布',
               height: 430,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<div class="easyui-tabs" data-options="fit:true,plain:true" style="height:430px;overflow-x:hidden;overflow-y:hidden;padding: 5px;">'
               	+'<div id="baidumap1" style="height: 380px; width:680px; " title="涉稳信息">'
               	+'</div>'
               	+'<div id="baidumap2" style="height: 380px; width:680px; " title="涉稳人员">'
               	+'</div>'
               	+'<div id="baidumap3" style="height: 380px; width:680px; " title="热力分布">'
               	+'</div>'
               	+'</div>'
           }, 
           {
               id: 'p_onlineusers',
               title: '在线用户统计',
               height: 250,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<table id="datagrid_onlineuser" class="easyui-datagrid" style="width:650px;height:auto" fit="true" border="false" singleSelect="true" idField="id" ></table>'
           },
           {
               id: 'p_a',
               title: 'a',
               height: 250,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: '<div>aaaaaa</div>'
           }, 
           {
               id: 'p_b',
               title: 'b',
               height: 250,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: 'bbbbbbb'
           }, 
           {
               id: 'p_c',
               title: 'c',
               height: 250,
               //                width: myWidth,
               collapsible: true,
               closable: closable,
               content: 'cccccc'
           }];
       	//alert(panels);
       	//监听portal状态改变事件、每次改变位置、获取当前改变后的位置状态、保存在cookie
  	         portal = $('#pp').portal({
  	             border: false,
  	             fit: true,
  	             onStateChange: function () {
  	            	 //alert(getPanelsLoaction());
  	            	 
  	            	saveConfigInfo(getPanelsLoaction());
  				/*       $.cookie('portal_paenl_states', getPanelsLoaction(), {
  	                     expires: 7
  	                 }); */
  	             }
  	         });
	         //在一起的用，分割，不在一起的用：分割
	         var local = 'p_notice,p_todo,p_tj:p_grid,p_map';
	        if ('${portalConfig.objectConfigInfo}') {
	             local = '${portalConfig.objectConfigInfo}';
	         } 
	         function getPanelById(id) {
	             for (var i = 0; i < panels.length; i++) {
	                 if (panels[i].id == id) {
	                     return panels[i];
	                 }
	             }
	             return undefined;
	         }
	         //渲染panel
	         function renderPanel() {
	             var cols = local.split(":");
	             for (var i = 0; i < cols.length; i++) {
	                 var rows = cols[i].split(",");
	                 for (var j = 0; j < rows.length; j++) {
	                     var op = getPanelById(rows[j]);
	                     var p = $('<div/>').attr('id', op.id).appendTo('body');
	                     p.panel(op);
	                     portal.portal('add', {
	                         panel: p,
	                         columnIndex: i
	                     });
	                 }
	             }
	         }
	         renderPanel();
	         portal.portal('resize');
	         
	     	

	         //获取当前位置状态
	         function getPanelsLoaction() {
	             var locals = [];
	             var cols = local.split(":").length;
	             for (var i = 0; i < cols; i++) {
	                 var temp = [];
	                 var pl = portal.portal("getPanels", i);
	                 for (var j = 0; j < pl.length; j++) {
	                     temp.push(pl[j].attr("id"));
	                 }
	                 locals.push(temp.join(","));
	             }
	             return locals.join(':');
	         }
	         
	         bindTodo();
        	 statistical.init('statisticalAction_queryHomeTJ', '#tj');
        	
        	 if('${orglv}'==14){//镇用户执行此段代码
     			zhendata.init('HomeAction_zhendata', 'tj','${orgname}统计数据',null,'个');
     		 }
        	 datagrid_yujing();
        	 bindOnlineUser();
        	 buildMap();
		});
		
		function oper(type,url){
			 //location.href = "DCDBAction_toDeal?seriNo="+id
			 //common.openWindow('督查督办办理', 'DCDBAction_toDeal?seriNo='+id, 780, 500);
			 parent.Home.addTab("999", type, "", url, "href",true);
		}
		
		function saveConfigInfo(configInfo){
			$.ajax({
	            type: "post",
	            data:"configInfo="+configInfo,
	            url: "HomeAction_savePortalConfig",
	            success: function () {
	            }
			});
		}
		
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
		 
		 function bindTodo()
		 {
			 $('#datagrid_todo').datagrid({
					url: '/Core/HomeAction_ListJson4MainTodo',
					rowStyler:function(rowIndex,rowData){  
			            //任务完成100%， 并且已审核通过，背景色置红
			            if(rowData && rowData.stts && (rowData.stts2=='1'))  
			            {  
			                return 'color:#FF0000;';  
			            }  
			        },
					idField : 'seriNo',
					columns : [ [ {
						field : 'stts',
						title : '状态',
						width : 100
					},{
						field : 'title',
						title : '标题',
						width : 180,
						formatter : function(value, rowData, rowIndex) {
							var str ="<a href=\"javascript:oper('"+rowData.type+"','"+rowData.dealUrl+"')\">"+value+"</a>";
							return str;
						}
					},{
						field : 'type',
						title : '类型',
						width : 110
					},{
						field : 'sendDate',
						title : '发送日期',
						width : 150
					},{
						field : 'sendOrgDept',
						title : '发送单位',
						width : 100,
						formatter : function(value, rowData, rowIndex) {
							var str = rowData.sendOrgDept;
							return str;
						}
					}] ]
				});
		 }
		 
		 function bindOnlineUser(){
			 //alert("datagrid_onlineuser");
			 $('#datagrid_onlineuser').datagrid({
					url: '/Core/HomeAction_ListJson4OnlineUsers',
					idField : 'id',
					columns : [ [ {
						field : 'name',
						title : '用户姓名',
						width : 100
					},{
						field : 'loginTime',
						title : '登陆时间',
						width : 110
					},{
						field : 'loginIp',
						title : '登陆Ip',
						width : 110
					}] ]
			});
		 }
		 
		 
		 function toNoticeDetail(id){
			 common.openWindow('查看通知公告', 'noticeAction_toViewNoticeIndex?id='+id, 780, 500);
		 }
		 
		 // 信息预警
		 function datagrid_yujing(){
			$('#datagrid_yujing').datagrid({
				url: '${ctx}/HomeAction_queryHomeYuJing',
				queryParams : {tableName :'weiwxx', rowCount:4, formatterMap: "{\"FENLXX\":\"SW01\" , \"GUANKJB\":\"SW02\"}"}
			})
		 }
		 
		 function formatter_shidmc(rowIndex, rowData){
			 try{
				 if(rowData.GUANKJB.indexOf('红色')==0){
					 return rowData.SHIDMC+"<img src='${ctx}/images/shan/001.gif' width='20' height='22' align='absmiddle'>";
				 }if(rowData.GUANKJB.indexOf('橙色')==0){
					 return rowData.SHIDMC+"<img src='${ctx}/images/shan/002.gif' width='20' height='22' align='absmiddle'>";
				 }if(rowData.GUANKJB.indexOf('黄色')==0){
					 return rowData.SHIDMC+"<img src='${ctx}/images/shan/003.gif' width='20' height='22' align='absmiddle'>";
				 }if(rowData.GUANKJB.indexOf('蓝色')==0){
					 return rowData.SHIDMC+"<img src='${ctx}/images/shan/004.gif' width='20' height='22' align='absmiddle'>";
				 } 
			 }catch(e){
				 return rowData.SHIDMC;
			 }
		 }
	</script>
	<style type="text/css">
	  ul,li {margin:0;padding:0;list-style:none;}
	</style>
</head>
<body class="easyui-layout">
<form action="HomeAction_savePorlets">
	<div id="div_portal_edit" region="north" class="title" border="false" style="height:80px;display: ${display};">
			<s:checkboxlist theme="simple" name="porlets" list="#{'p_notice':'通知公告','p_todo':'待办事项','p_tj':'统计汇总','p_grid':'信息预警','p_map':'涉稳信息分布','p_onlineusers':'在线用户统计','p_a':'a','p_b':'b','p_c':'c'}" listKey="key" listValue="value" value="portalConfig.objectInfo.split(',')" ></s:checkboxlist>

			<s:submit theme="simple" value="保存"></s:submit>
			<s:submit theme="simple" action="HomeAction_toHome" value="取消"></s:submit>
	</div>
	<div region="center" border="false">
		<div id="pp" style="position:relative" class="MyPortal">
			<div style="width:30%;">
			 
		    </div>
		    <div style="width:30%;">
		     
			</div>
		</div>
	</div>
	<div id="p_notice" title="通知公告" collapsible="true" closable="false" style="height:170px;text-align:center;display: none;">
	      <ul class="notice">
			  <c:forEach items="${noticeList}" var="a">
			    <li><span style="float: right;margin-right:10px;">${a.createTime}</span>
			     <a href="void(0);" onclick="toNoticeDetail('${a.id}');return false;" style="width: 300px">${a.title}</a>
			    </li> 		  
			  </c:forEach>
	      </ul>
	 </div>
     <!--  <div id="p_todo" title="待办事项" collapsible="true" closable="false" style="height:170px;padding:5px;">
        
      </div> -->
	   <!-- <div id="p_tj" title="统计汇总" collapsible="true" closable="false" style="height:250px;padding:5px; overflow:hidden;display: none;" >
      </div> -->
       <!-- <div id="pgrid" title="信息预警" collapsible="true" closable="false" style="height:170px;display: none;">
        
      </div> -->
	  <div id="p_map" > <!--  title="涉稳信息分布" collapsible="true" closable="false" style="height:430px;overflow-x:hidden;overflow-y:hidden;padding: 5px;display: none;" -->
		  
      </div>
</form>
</body>
</html>
