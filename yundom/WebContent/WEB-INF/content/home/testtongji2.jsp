<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<head>
<title></title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/pannel.css" />
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<script src="js/Highcharts/highcharts.js"></script>

<script language="Javascript" src="js/FusionCharts3.2/FusionCharts.js"></script>
<script type="text/javascript" src="js/comm/makefusioncharts.js" ></script>
</head>
<body style="margin: 0px;">
	    <div title="风险评估项目统计"  style="padding:2px;">
	          <div id="tj" style="height:280px;padding:0px; overflow:hidden;" ></div>
	    </div>
<input  type="hidden"  name="naturetype" id="naturetype" />
<script>
	fchar.init("zhu","hnStatisticsAction_queryHomeTJSimple","tj","100%","100%","${year}年度全省评估项目统计","","件","","","");
</script>
</body>
</html>