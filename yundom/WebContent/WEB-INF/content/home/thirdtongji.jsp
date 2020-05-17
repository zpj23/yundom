<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/common.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/icon.css" />
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<script type="text/javascript" src="js/Highcharts/highcharts.js"></script>
<script type="text/javascript" src="js/FusionCharts3.2/FusionCharts.js"></script>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/statis/makefusioncharts.js" ></script>
</head>
<body style="margin: 0px;background-color:#E6EEF8;">
		<form id="statisForm" name="statisForm"
			action="hnStatisticsAction_toShow" method="post">
	<div class="panel-header">
			<table border="0" cellpadding="0" cellspacing="0" class="search">
				<tr>
					<td>选择日期范围﹕</td>
					<td><input name="startDate" type="text" value="${startDate }"
						id="startDate" onclick="WdatePicker();" class="Wdate" onFocus="var endDate=$dp.$('endDate');WdatePicker({onpicked:function(){endDate.focus();},maxDate:'#F{$dp.$D(\'endDate\')}'})" /> ~ <input
						name="endDate" type="text" value="${endDate }" id="endDate"
						onclick="WdatePicker();" class="Wdate" onFocus="WdatePicker({minDate:'#F{$dp.$D(\'startDate\')}'})" /></td>
						<td>&nbsp;<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="searchInfo();">检索</a>
							</td>
				</tr>
			</table>
	</div>
	<div id="maintt" class="easyui-tabs" border="false"
		style="height: 600px;background-color:#E6EEF8;">
		<div title="风险评估项目统计" style="padding: 2px;background-color:#E6EEF8;">
			<div id="tj" style="height: 550px; padding: 0px; overflow: hidden;background-color:#E6EEF8;"></div>
		</div>
		<div title="单位稳评工作评比" style="overflow: auto; padding: 0px;background-color:#E6EEF8;">
			<div id="tt" class="easyui-tabs" style="height: 550px;background-color:#E6EEF8;">
				<div title="重大工程" style="padding: 2px;background-color:#E6EEF8;">
					<div id="tj1"
						style="height: 500px; padding: 2px; overflow: hidden;background-color:#E6EEF8;"></div>
				</div>
				<div title="重大政策" style="overflow: auto; padding: 2px;background-color:#E6EEF8;">
					<div id="tj2"
						style="height: 500px; padding: 2px; overflow: hidden;background-color:#E6EEF8;"></div>
				</div>
				<div title="其他事项" style="padding: 2px;">
					<div id="tj3"
						style="height: 500px; padding: 2px; overflow: hidden;background-color:#E6EEF8;"></div>
				</div>
			</div>
		</div>
	</div>
	<input type="hidden" name="naturetype" id="naturetype" />
	</form>
	<script>
		var startDate = '${startDate }';
		var endDate = '${endDate }';
		fchar.init("line","hnStatisticsAction_queryThirdTJFc?startDate="+startDate+"&endDate="+endDate,"tj","100%","100%","","","","","","","");
		fchar.init("bing","hnStatisticsAction_queryThirdTJ2Fc?naturetype=ZDXM&startDate="+startDate+"&endDate="+endDate,"tj1","100%","100%","","","","","","","");
		fchar.init("bing","hnStatisticsAction_queryThirdTJ2Fc?naturetype=ZDZC&startDate="+startDate+"&endDate="+endDate,"tj2","100%","100%","","","","","","","");
		fchar.init("bing","hnStatisticsAction_queryThirdTJ2Fc?naturetype=ZDJC&startDate="+startDate+"&endDate="+endDate,"tj3","100%","100%","","","","","","","");
		   
	    $('#tt').tabs({
		    border:false,
		    onSelect:function(title,index){
		        $("#naturetype").val(index);
		    }
		 });
	    
	    function searchInfo(){
	    	document.statisForm.submit();
	    }
	</script>
</body>
</html>