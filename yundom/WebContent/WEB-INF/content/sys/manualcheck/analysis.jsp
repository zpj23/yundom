<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/h-ui_header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta charset="utf-8">
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
<meta http-equiv="Cache-Control" content="no-siteapp" />

<title></title>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/modules/exporting.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts-3d.js"></script>
<script type="text/javascript">
var hzbArray=new Array();//横坐标
var zzbArray=new Array();//纵坐标
$(function () {
	initDep();
	initData();
});
function initData(){
	hzbArray=new Array();//横坐标
	zzbArray=new Array();//纵坐标
	
	if($("#datemin").val()==""&&$("#yuefen").val()!=""){
		layer.msg('如果需要选择月份，请先选择年份!',{icon: 5,time:3000});
		return;
	}
	
	$.ajax({
 		type: "POST",
		   url: "jlManualCheckInfoAction_initChart",
		   async:false,
		   data: "datemin="+$("#datemin").val()+"&yuefen="+$("#yuefen").val()+"&username="+$("#username").val()+"&sgxm="+$("#sgxm").val()+"&sgqy="+$("#sgqy").val()+"&workcontent="+$("#workcontent").val()+"&departmentid="+$("#departmentid").val(),
		   success: function(arr){
			  var datas=$.parseJSON(arr);
			  initChart(datas);
		   }
 	});
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
var pictitle="工时分布图";
function initChart(arr){
	var depname="";
	if($("#departmentid").find("option:selected").text()!="请选择"){
		depname=$("#departmentid").find("option:selected").text();
	}
	pictitle=$("#datemin").val()+" "+$("#yuefen").val()+" "+depname+" "+$("#sgxm").val()+" "+$("#sgqy").val()+" "+$("#username").val()+" "+"工时分布图";
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
	
	$('#container').highcharts({
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
//         tooltip: {
//             headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
//             pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
//                 '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
//             footerFormat: '</table>',
//             shared: true,
//             useHTML: true
//         },
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
//         	[{
//             name: 'Tokyo',
//             data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

//         }, {
//             name: 'New York',
//             data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

//         }, {
//             name: 'London',
//             data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

//         }, {
//             name: 'Berlin',
//             data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

//         }]
    });
}

</script>
</head>
<body>
<!-- <nav class="breadcrumb"><i class="Hui-iconfont">&#xe67f;</i> 首页 <span class="c-gray en">&gt;</span> 统计管理 <span class="c-gray en">&gt;</span> 柱状图统计 <a class="btn btn-success radius r mr-20" style="line-height:1.6em;margin-top:3px" href="javascript:location.replace(location.href);" title="刷新" ><i class="Hui-iconfont">&#xe68f;</i></a></nav> -->
<div class="pd-20">
<div class="text-c"> 
		<input type="text" placeholder="选择年份" onfocus="WdatePicker({dateFmt:'yyyy',minDate:'2016',maxDate:'2020'})" id="datemin" name="datemin" class="input-text Wdate" style="width:80px;">
		<input type="text" placeholder="选择月份" onfocus="WdatePicker({dateFmt:'MM'})" id="yuefen" name="yuefen" class="input-text Wdate" style="width:80px;">
		<input type="text" class="input-text" style="width:170px" placeholder="输入施工项目" id="sgxm" name="sgxm" />
		<input type="text" class="input-text" style="width:170px" placeholder="输入施工区域" id="sgqy" name="sgqy" />
		
		<input type="text" class="input-text" style="width:150px" placeholder="输入施工人员名称" id="username" name="username" />
		<input type="text" class="input-text" style="width:150px" placeholder="输入工作内容" id="workcontent" name="workcontent" />
		<span class="select-box inline">
			<select class="select" size="1" name="departmentid" id="departmentid" value="" onchange="" datatype="*" nullmsg="请选择所属部门！">
	          <option value="" selected>所属区域</option>
	        </select>
        </span>
		<button type="button"  class="btn btn-success" onclick="initData();" id="" name=""><i class="Hui-iconfont">&#xe665;</i> 构造</button>
</div>
<div class="pd-20">
	<div id="container" style="min-width:700px;height:400px"></div>
</div>

</body>
</html>