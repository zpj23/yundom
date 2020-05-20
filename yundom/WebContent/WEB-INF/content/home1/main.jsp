<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>我的桌面</title>
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

<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script>

<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/modules/exporting.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts-3d.js"></script>
<!--[if IE 6]>
<script type="text/javascript" src="lib/DD_belatedPNG_0.0.8a-min.js" ></script>
<script>DD_belatedPNG.fix('*');</script>
<![endif]-->
<script type="text/javascript">
var hzbArray=new Array();//横坐标
var zzbArray=new Array();//纵坐标
var SETTIMEFLAG=0;
$(document).ready(function(){
	initInfo();
	
});
//初始化信息统计
function initInfo(){
	var zs=$.parseJSON('${total_list}');
	var jt=$.parseJSON('${today_list}');
	var zt=$.parseJSON('${yesterday_list}');
	var bz=$.parseJSON('${week_list}');
	var by=$.parseJSON('${month_list}');
	var htmlStr="";
	for(var i=0;i<zs.length;i++){
		htmlStr+="<tr class='text-c'>";
		htmlStr+="<td>"+zs[i].name+"</td>";
		htmlStr+="<td>"+zs[i].total+"</td>";
		htmlStr+=compareuid(zs[i].uid,jt);
		htmlStr+=compareuid(zs[i].uid,zt);
		htmlStr+=compareuid(zs[i].uid,bz);
		htmlStr+=compareuid(zs[i].uid,by);
		htmlStr+="</tr>";
	}
	$("#total_num").html(htmlStr);
	initDepArea();
}
	function compareuid(uid,jt){
		var htmlStr="";
		var flag=false;
		for(var m=0;m<jt.length;m++){
			if(uid==jt[m].uid){
				htmlStr="<td>"+jt[m].total+"</td>";
				flag=true;
				break;
			}
		}
		if(!flag){
			htmlStr="<td>0</td>";
		}
		return htmlStr;
	}
	//初始化部门信息
	function initDepArea(){
		if("${jluserinfo.isAdmin}"=="1"){
			$.ajax({
			     type: "POST",
			     url: "jlDepartmentInfoAction_getDep",
			     async:false,
			     success: function(data1){
			      //var str="";
			      var data = $.parseJSON(data1);
			      var temparr=new Array();
			      
			    	  for(var n=0;n<data.length;n++){
				    	  if(data[n].name=="admin"){
				    		  continue;
				    	  }
				    	  temparr.push(data[n]);
				      }
				       inittabArea(temparr); 
			     }
			});
		}else{
			var temparr=new Array();
			var data=new Object();
			data.code="${jluserinfo.departmentcode}";
			data.name="${jluserinfo.departmentname}";
			temparr.push(data);
			inittabArea(temparr); 
		}	
		   
	}
	//初始化tab
	function inittabArea(depArr){
		 var tabCon="";
		 var tabBarDivHtml="<div class='tabBar clearfix'>";
		 var tabConDivHtml="";	
	
		for(var i=0;i<depArr.length;i++){
			tabBarDivHtml+="<span>"+depArr[i].name+"</span>";
			tabConDivHtml+="<div class='tabCon' >";
			tabConDivHtml+="<div id='container_"+depArr[i].code+"' style='width:100%;height:250px'></div>";
			tabConDivHtml+="</div>";
			
		}
		tabBarDivHtml+="</div>";
		$("#tab_demo").html(tabBarDivHtml+tabConDivHtml);
		$.Huitab("#tab_demo .tabBar span","#tab_demo .tabCon","current","click","0");
		initDataOne(depArr);
	}
	function initDataOne(tempArr){
		var code="";
		var name="";
		for(SETTIMEFLAG=0;SETTIMEFLAG<tempArr.length;SETTIMEFLAG++){
			if(SETTIMEFLAG>0){
				code+=",";
				name+=",";
			}
			code+=tempArr[SETTIMEFLAG].code;
			name+=tempArr[SETTIMEFLAG].name;
		}
		$.ajax({
	 		type: "POST",
			   url: "jlManualCheckInfoAction_initChartByArr",
			   async:true,
			   data: "departmentid="+code+"&departmentname="+name+"&datemin=2019",
			   success: function(arr){
				  var datas=$.parseJSON(arr);
				  for(var str in datas){
					  initChart(datas[str],str.split("|")[0],str.split("|")[1]);
				  }
				  
			   }
	 	});
	}
	
	
	function initChart(arr,code,name){
		hzbArray=new Array();//横坐标
		zzbArray=new Array();//纵坐标
		var depname="";
		pictitle="工时分布图";
		if(arr!=null&&arr.length>0){
			var wdtArr=new Array();//纵数据 正常
			var otArr=new Array();// 加班
			var totalArr =new Array();//  总计
			for(var i=0;i<arr.length;i++){
				hzbArray.push(arr[i].yuefen);
				wdtArr.push(arr[i].wdt);
				otArr.push(arr[i].ot);
				totalArr.push(arr[i].wdt+arr[i].ot);
			}
			var obj=new Object();
			obj.name="正常";
			obj.data=wdtArr;
			zzbArray.push(obj);
			var obj1=new Object();
			obj1.name="加班";
			obj1.data=otArr;
			zzbArray.push(obj1);
			var obj2=new Object();
			obj2.name="合计";
			obj2.data=totalArr;
			zzbArray.push(obj2);
		}
		
		$('#container_'+code).highcharts({
	        chart: {
	            type: 'column'
	        },
	        title: {
	            text: pictitle
	        },
	        subtitle: {
	            text: ''
	        },
	        xAxis: {
	            categories: hzbArray
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '工时'
	            }
	        },
	        plotOptions: {
	            column: {
	                pointPadding: 0.2,
	                borderWidth: 0,
	                dataLabels:{
	                    enabled:true, // dataLabels设为true
	                    style:{
	                        color:'#454545'
	                    }
	                }
	            }
	            
	        },
	        series: zzbArray
	    });
	}
</script>
</head>
<body style="width: auto;height: auto">
<div class="pd-20" style="padding-top:20px;height: 100%;">
  <p class="f-20 text-success">后台管理系统<span class="f-14">v1.0</span>
  </p>

<!--   <p>登录次数：18 </p> -->
  <p>上次登录IP：${jluserinfo.lastloginip}  上次登录时间：<fmt:formatDate value="${jluserinfo.lastlogintime}" type="both"/>  </p>
  <c:if test="${jluserinfo.isAdmin eq '1'}">
  <table class="table table-border table-bordered table-bg">
    <thead>
      <tr>
        <th colspan="7" scope="col">信息统计</th>
      </tr>
      <tr class="text-c">
        <th>统计</th>
        <th>总数</th>
        <th>今日</th>
        <th>昨日</th>
        <th>本周</th>
        <th>本月</th>
      </tr>
    </thead>
    <tbody id="total_num">
    </tbody>
  </table>
  </c:if>
  <div style="padd-bottom:20px">
 	<div id="tab_demo" class="HuiTab" style="overflow: hidden" >
	</div>
  </div>
</div>

<footer class="footer">
  <p><a href="http://www.baidu.com" target="_blank" title="">朱培军</a>提供前端技术支持</p>
</footer>

</body>
</html>