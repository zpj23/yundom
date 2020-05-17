<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<%-- JSTL 标签 --%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="mf" uri="/MyFramework-tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/common.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/icon.css" />
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<script src="js/Highcharts/highcharts.js"></script>

<script language="Javascript" src="js/FusionCharts3.2/FusionCharts.js"></script>
<script type="text/javascript" src="js/statis/makefusioncharts.js" ></script>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/style_fxpg.css" />
<style>
.risk_wpkzqk .title {
  border: 1px solid #004e81;
  width: 100%;
  height: 25px;
  font-size: 12px;
  color: White;
  font-weight: bold;
  line-height: 25px;
  background-image: url(images/risk_title1.jpg);
  background-repeat: repeat-x;
}

.risk_wpkzqk .title span {
  margin-left: 10px;
  padding-left: 15px;
  background-image: url(images/risk_title2.jpg);
  background-position: 0px 1px;
  background-repeat: no-repeat;
}
.risk_wpkzqk .search {
  margin-top: 10px;
  font-size: 12px;
}

.risk_wpkzqk .table {
  font-size: 12px;
  margin-top: 10px;
  background-color: #95B8E7;
  width: 100%;
  border-spacing: 1px;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}

.risk_wpkzqk .table .head td{
  font-weight: bold;
  text-align: center;
  background-color: #EEEEEE;
}

.risk_wpkzqk {
  padding: 0px;
  color: #3d3d3d;
}
.risk_wpkzqk .table td {
  background-color: White;
  height: 31px;
}
tr {
  display: table-row;
  vertical-align: inherit;
  border-color: inherit;
}
</style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true" id="layoutTwo">
			<form id="statisForm" name="statisForm" action="HomeAction_indextongjidetail" method="post">
	<div data-options="region:'north',split:false,border:false">
	<div class="panel pd3" style="background-color:#E6EEF8;">
			<div class="panel-header">
					<table border="0" cellpadding="0" cellspacing="0" class="search">
						<tr>
							<td>选择日期范围﹕</td>
							<td><input name="startDate" type="text"
								value="${startDate }" id="startDate" onclick="WdatePicker();"
								class="Wdate"> ~ <input name="endDate" type="text"
								value="${endDate }" id="endDate" onclick="WdatePicker();"
								class="Wdate"></td>
							<td>&nbsp;<a href="#" class="easyui-linkbutton" iconCls="icon-search" onclick="searchInfo();">检索</a>
							</td>
						</tr>
						</tbody>
					</table>
					
				</div>
		</div>
	</div>
	<div data-options="region:'center',border:false" style="padding-top:0px;background-color:#E6EEF8;" class="pd3">
				<form method="post" name="form1">
					<div id="maintt" class="easyui-tabs" style="background-color: #E6EEF8">
						<div title="风险评估项目统计" style="padding: 2px;background-color: #E6EEF8">
							<div id="tj"
								style="padding: 0px; overflow: hidden;background-color: #E6EEF8"></div>
						</div>
						<div title="单位稳评工作评比" style="overflow: auto; padding: 0px;background-color: #E6EEF8">
							<div id="tt" class="easyui-tabs" style="background-color: #E6EEF8">
								<div title="重大工程" style="padding: 2px;background-color: #E6EEF8">
									<div id="tj1"
										style="padding: 2px; overflow: hidden;background-color: #E6EEF8"></div>
								</div>
								<div title="重大政策" style="overflow: auto; padding: 2px;background-color: #E6EEF8">
									<div id="tj2"
										style="padding: 2px; overflow: hidden;background-color: #E6EEF8"></div>
								</div>
								<div title="其他事项" style="padding: 2px;background-color: #E6EEF8">
									<div id="tj3"
										style="padding: 2px; overflow: hidden;background-color: #E6EEF8"></div>
								</div>
							</div>
						</div>
					</div>
					
					<input type="hidden" name="naturetype" id="naturetype" />					
				</form>
			</div>
	</form>
</div>
	
<script>
	var startDate = '${startDate }';
	var endDate = '${endDate }';
	fchar.init("line","statisAction_queryHomeTJFc?startDate="+startDate+"&endDate="+endDate,"tj","100%","100%","","","","","","","");
	fchar.init("bing","statisAction_queryHomeTJ2Fc?naturetype=ZDXM&startDate="+startDate+"&endDate="+endDate,"tj1","100%","100%","","","","","","","");
	fchar.init("bing","statisAction_queryHomeTJ2Fc?naturetype=ZDZC&startDate="+startDate+"&endDate="+endDate,"tj2","100%","100%","","","","","","","");
	fchar.init("bing","statisAction_queryHomeTJ2Fc?naturetype=ZDJC&startDate="+startDate+"&endDate="+endDate,"tj3","100%","100%","","","","","","","");
	  
    $('#tt').tabs({    
	    border:false,    
	    onSelect:function(title,index){    
	        $("#naturetype").val(index);    
	    }    
	 });
</script>
<script>

function searchInfo(){
	document.statisForm.submit();
}

function viewProject(gztjIndex){
	Home.addTab4Iframe("8210","工作情况调查详细信息", "icon-menudefault" ,"statisAction_viewProject?isGzqk=3&gztjIndex="+gztjIndex ,"href",true);
}

$(window).resize(function () {
	setTimeout(function(){
		$('#maintt').tabs({
	        width: $("#maintt").parent().width(),  
	        height: "auto"  
	    }); 
		
	}, 200);
}); 

$(function(){intitTabContentHeight();})

/**
 * 初始化TAB内容高度
 */
function intitTabContentHeight(){
	var height_ = $('#layoutTwo').layout('panel','center').panel('options').height;
	$('#tj').css('height', height_-40);
	$('#tj1').css('height', height_-73);
	$('#tj2').css('height', height_-73);
	$('#tj3').css('height', height_-73);
}

</script>

</body>
</html>