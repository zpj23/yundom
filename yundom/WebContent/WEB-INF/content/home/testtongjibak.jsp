<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<script src="js/Highcharts/highcharts.js"></script>
<script type="text/javascript" src="js/sys/home/projectdata.js"></script> 
<script type="text/javascript" src="js/sys/home/projectbingdata.js"></script>
</head>
<body> 
      <div id="maintt" class="easyui-tabs" style="height:270px;">   
	    <div title="风险评估项目统计"  style="padding:2px;">
	          <div id="tj" style="height:210px;padding:5px; overflow:hidden;" ></div>
	    </div>   
	    <div title="单位稳评工作评比"  style="overflow:auto;padding:0px;">   
	           <div id="tt" class="easyui-tabs" style="height:250px;">   
				    <div title="重大工程"  style="padding:2px;">
				       <div id="tj1" style="height:210px;padding:2px; overflow:hidden;" ></div> 
				    </div>   
				    <div title="重大政策"  style="overflow:auto;padding:2px;">   
				        <div id="tj2" style="height:210px;padding:2px; overflow:hidden;" ></div>    
				    </div>   
				    <div title="其他事项"  style="padding:2px;">   
				       <div id="tj3" style="height:210px;padding:2px; overflow:hidden;" ></div>
				    </div>   
				</div>
	    </div>   
	</div>
<input  type="hidden"  name="naturetype" id="naturetype" />
<script>
      projectin.init("hnStatisticsAction_queryHomeTJ", "tj","",null,"个");
	  projectnature.init("hnStatisticsAction_queryHomeTJ2?naturetype=ZDJC", "tj1","",null,"个");
	  projectnature.init("hnStatisticsAction_queryHomeTJ2?naturetype=ZDZC", "tj2","",null,"个");
	  projectnature.init("hnStatisticsAction_queryHomeTJ2?naturetype=ZDXM", "tj3","",null,"个");
	  
	  $('#tt').tabs({    
		    border:false,    
		    onSelect:function(title,index){    
		        $("#naturetype").val(index);    
		    }    
		});
</script>

</body>
</html>