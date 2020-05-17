<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
	<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script language="Javascript" src="js/FusionCharts3.2/FusionCharts.js"></script>
<script type="text/javascript" src="js/statis/makefusioncharts.js" ></script>
<link rel="stylesheet" type="text/css"
	href="js/EasyUI/EasyUI1.3.6/css/style_fxpg.css" />
<style type="text/css">
	table {
		font-size: 12px;
		background-color: #95B8E7;
		width: 100%;
	
	}
	#tableShow td {
	background-color: White;
	height: 28px;
		
}

#tableShow tr {
	display: table-row;
	vertical-align: inherit;
	border-color: inherit;
}
</style>

<script type="text/javascript">
	$(document).ready(function(){
		searchInfo();
		
	});
	//查询展示柱状图调用通用的方法构造
	function searchInfo(){
		fchar.init("column", "zhkpAction_ColumnData?selectyear="+$("#selectyear").val()+"&selecthalf="+$("#selecthalf").val(), "tj", "100%", "500",
				"KHPM", "", "", "", "", "", "");
	}
</script>
</head>
<body >
<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',split:false,border:false">
			<div class="panel pd3" style="background-color: #E6EEF8;">
				<div class="panel-header">
						年份﹕
						<input name="selectyear" type="text" value="${selectyear}" 
								        id="selectyear" onclick="WdatePicker({dateFmt:'yyyy'});" class="Wdate" />										
						<span>
								     上/下半年:
								     <select id="selecthalf" name="selecthalf" class="easyui-validatebox" onchange="showcitydata_()">
								      <option value="">--请选择--</option>
								      <option value="1" ${selecthalf eq '1'?'selected':'' }>上半年</option>
								      <option value="2" ${selecthalf eq '2'?'selected':'' }>下半年</option>
								     </select>
								    </span>
						&nbsp;<a href="javascript:;" class="easyui-linkbutton"
								iconCls="icon-search" onclick="searchInfo();">检索</a> &nbsp;
				</div>
			</div>
		</div>
		<div data-options="region:'center',border:false"
			style="top:35px;padding-top: 0px; background-color: #E6EEF8;" class="pd3" >
			<div id="myPrintArea" > 
			<div class="risk_wpkzqk">
			<table class="TableBlock" width="100%"  >
				<tr >
					<td class="panel-header title" colspan="" ><span
						class="tree-icon tree-file icon-application-form"></span> <span
						class="tree-title" >考评排名统计</span>
				</tr>
			</table>
					 	 <div id="tj" style="height: 500px; width:100%;padding-bottom:5px;  overflow: hidden;"></div>
			  </div>
			  </div>
</div>
 
</body>
</html>