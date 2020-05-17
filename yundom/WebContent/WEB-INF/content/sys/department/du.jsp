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

<title></title>
<link href="newUI/css/H-ui.min.css" rel="stylesheet" type="text/css" />
<link href="newUI/css/H-ui.admin.css" rel="stylesheet" type="text/css" />
<link href="newUI/lib/Hui-iconfont/1.0.6/iconfont.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script> 
<script type="text/javascript" src="newUI/lib/layer/2.1/layer.js"></script>
<script type="text/javascript" src="newUI/js/H-ui.js"></script> 
<script type="text/javascript" src="newUI/js/H-ui.admin.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/modules/exporting.js"></script>
<script type="text/javascript" src="newUI/lib/Highcharts/4.1.7/js/highcharts-3d.js"></script>
<script type="text/javascript">
function initData(){
	$.ajax({
 		type: "POST",
		   url: "jlDepartmentInfoAction_initDu",
		   async:false,
		   data: "",
		   success: function(data){
			  var datas=$.parseJSON(data);
			  initChart(datas);
		   }
 		
 	});
}
$(function () {
	initData();
    // Set up the chart
    
});
function initChart(datas){
// 	console.log(datas);
	var ydata=[];//纵坐标值
	var xdata=[];//横坐标值
	for(var m=0;m<datas.length;m++){
		xdata.push(datas[m].name);
		ydata.push(datas[m].total);
	}
	var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
            type: 'column',
            margin: 75,
            options3d: {
                enabled: true,
                alpha: 0,
                beta: 0,
                depth: 50,
                viewDistance: 25
            }
        },
        title: {
            text: '用户分布'
        },
//         subtitle: {
//             text: '部门分类'
//         },
        xAxis: {
            categories: xdata
        },
        yAxis:{
        	
        	title:{
        		text:'数量    ',
        		rotation:0
        	}
        },
        plotOptions: {
            column: {
                depth: 25
            }
        },
//         legend:{
//         	title:{
//         		text:"用户部门分布"
//         	},
//         	labelFormat:'name'
//         },
        series: [{
            data: ydata,
            name:'部门人员'
        }]
    });
    

    // Activate the sliders
    $('#R0').on('change', function(){
        chart.options.chart.options3d.alpha = this.value;
        showValues();
        chart.redraw(false);
    });
    $('#R1').on('change', function(){
        chart.options.chart.options3d.beta = this.value;
        showValues();
        chart.redraw(false);
    });

    function showValues() {
        $('#R0-value').html(chart.options.chart.options3d.alpha);
        $('#R1-value').html(chart.options.chart.options3d.beta);
    }
    showValues();
}
</script>
</head>
<body>
<div class="pd-20">
  <div id="container" style="min-width:700px;height:400px"></div>
  <div id="sliders" style="min-width:310px;max-width: 300px;margin: 0 auto;">
		<table width="100%" border="0">
			<tr><td align="right">俯视角：</td><td align="center"><input id="R0" type="range" min="0" max="45" value="0"/> <span id="R0-value" class="value"></span></td></tr>
			<tr><td align="right">左视角：</td><td align="center"><input id="R1" type="range" min="0" max="45" value="0"/> <span id="R1-value" class="value"></span></td></tr>
		</table>
	</div>
</div>
</body>
</html>