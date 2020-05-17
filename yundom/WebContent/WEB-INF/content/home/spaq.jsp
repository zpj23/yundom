<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<!DOCTYPE html>
<html>
<head>
<title>风险源统计图</title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<script src="js/Highcharts/highcharts.js"></script>

<script language="Javascript" src="js/FusionCharts3.2/FusionCharts.js"></script>
<script type="text/javascript">
var fchar ={
	     //类型，数据url，id，主标题，副标题，单位量词，x轴名称，y轴名称，前缀描述           
	    init : function(type,url,id,width,height,title,subtitle,dangwei,xaxisname,yaxisname,numberprefix,fontsize){
	    	 if(fontsize == undefined ){
	    		 fontsize = 12;	 //默认字体
	    	 }
		       var data_=""; 
		        var swfUrl = '';
			  if(type=='bing'){
				  swfUrl = "js/FusionCharts3.2/Pie2D.swf?ChartNoDataText=无数据显示";
			  }else if(type=='line'){
				  swfUrl = "js/FusionCharts3.2/Line.swf?ChartNoDataText=无数据显示";
			  }else if(type=='zhu'){
				  swfUrl = "js/FusionCharts3.2/Column3D.swf?ChartNoDataText=无数据显示";
			  }
	         
					
			  
			  var idata  = '{"listnum":"17","sourcedata":[{"name":"济南市","num":"80"},{"name":"泰安市","num":"70"},{"name":"枣庄市","num":"82"},{"name":"烟台市","num":"86"},{"name":"威海市","num":"85"},{"name":"日照市","num":"90"},{"name":"聊城市","num":"92"},{"name":"滨州市","num":"82"},{"name":"菏泽市","num":"85"},{"name":"东营市","num":"90"},{"name":"淄博市","num":"91"},{"name":"青岛市","num":"95"},{"name":"临沂市","num":"80"},{"name":"济宁市","num":"88"},{"name":"潍坊市","num":"90"},{"name":"德州市","num":"83"},{"name":"莱芜市","num":"81"}]}';
			  var data = JSON.parse(idata);  
	    	  data_ += '<chart  caption="'+title+'" subcaption="" xaxisname="'+xaxisname+'" yaxisname="'+yaxisname+'" numberprefix="'+numberprefix
	    	  +'" showlabels="1" showalternatehgridcolor="1" alternatehgridcolor="ff5904" divlinecolor="ff5904" divlinealpha="50" alternatehgridalpha="5" canvasbordercolor="666666" canvasborderthickness="1" basefontcolor="666666" baseFontSize="'+fontsize+'" linecolor="FF5904" linealpha="85" showvalues="1" rotatevalues="0" valueposition="auto" canvaspadding="10"  bgcolor="ffffff" valuepadding="5" showborder="0">';
	    	  var obj = data.sourcedata;
	    	  
			  for(var i=0;i<data.listnum;i++){
				  data_+='<set label="'+obj[i].name+'" value="'+obj[i].num+'" />';							  
			  }
			  data_+='</chart>';
				    
			  
	          		  
			  var chart_SalesByYear = new FusionCharts({ 
				"swfUrl" : swfUrl,
				"width" : width,    //650
				"height" : height,   //220
				"renderAt" : id,
				"dataFormat" : "xml",
				"id" : id+"_",
				"wmode" : "opaque",	
			    "baseFontSize":"22",
				"dataSource" : data_			
				}).render();
			  
				
	            //"bgAlpha ":"0",
				//"bgColor":"red",
			    //"canvasBgColor":"red",
	         

	    }
}
</script>
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
<body style="margin: 0px;"> 
<div>
      <div id="tj" style="height:100%;padding:0px; overflow:hidden;" ></div>
<input  type="hidden"  name="naturetype" id="naturetype" />
<div class="risk_wpkzqk">
		<table class="table">
			<tr class="head">
				<td  width="60px">序号</td>
				<td  width="150px">机构单位</td>
				<td  width="150px">抽查数</td>
				<td  width="150px">合格数</td>
				<td  width="150px">通过率</td>
			</tr>
			<tr>
			   <td style="text-align: center;">1</td>
			   <td style="text-align: center;">济南市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">80</td>
			   <td style="text-align: center;">80%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">2</td>
			   <td style="text-align: center;">泰安市</td>
			   <td style="text-align: center;">50</td>
			   <td style="text-align: center;">35</td>
			   <td style="text-align: center;">70%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">3</td>
			   <td style="text-align: center;">枣庄市</td>
			   <td style="text-align: center;">50</td>
			   <td style="text-align: center;">41</td>
			   <td style="text-align: center;">82%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">4</td>
			   <td style="text-align: center;">烟台市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">86</td>
			   <td style="text-align: center;">86%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">5</td>
			   <td style="text-align: center;">威海市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">85</td>
			   <td style="text-align: center;">85%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">6</td>
			   <td style="text-align: center;">日照市</td>
			   <td style="text-align: center;">50</td>
			   <td style="text-align: center;">45</td>
			   <td style="text-align: center;">90%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">7</td>
			   <td style="text-align: center;">聊城市</td>
			   <td style="text-align: center;">50</td>
			   <td style="text-align: center;">46</td>
			   <td style="text-align: center;">92%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">8</td>
			   <td style="text-align: center;">滨州市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">82</td>
			   <td style="text-align: center;">82%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">9</td>
			   <td style="text-align: center;">菏泽市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">85</td>
			   <td style="text-align: center;">85%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">10</td>
			   <td style="text-align: center;">东营市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">90</td>
			   <td style="text-align: center;">90%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">11</td>
			   <td style="text-align: center;">淄博市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">91</td>
			   <td style="text-align: center;">91%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">12</td>
			   <td style="text-align: center;">青岛市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">95</td>
			   <td style="text-align: center;">95%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">13</td>
			   <td style="text-align: center;">临沂市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">80</td>
			   <td style="text-align: center;">80%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">14</td>
			   <td style="text-align: center;">济宁市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">88</td>
			   <td style="text-align: center;">88%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">15</td>
			   <td style="text-align: center;">潍坊市</td>
			   <td style="text-align: center;">50</td>
			   <td style="text-align: center;">45</td>
			   <td style="text-align: center;">90%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">16</td>
			   <td style="text-align: center;">德州市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">83</td>
			   <td style="text-align: center;">83%</td>
			</tr>
			<tr>
			   <td style="text-align: center;">17</td>
			   <td style="text-align: center;">莱芜市</td>
			   <td style="text-align: center;">100</td>
			   <td style="text-align: center;">81</td>
			   <td style="text-align: center;">81%</td>
			</tr>
			
		</table>
	</div>


<script>
	fchar.init("zhu","mailAction_toStaticsData","tj","1250","280","食品监测抽查合格率分析","","","","%","");
</script>

</div>
</body>
</html>