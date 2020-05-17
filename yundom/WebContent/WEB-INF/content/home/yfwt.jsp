 




 

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
<div class="easyui-layout" data-options="fit:true">
	<div data-options="region:'north',split:false,border:false">
	<div class="panel pd3" style="background-color:#E6EEF8;">
			
		</div>
		<div data-options="region:'center',border:false" style="padding-top:0px;background-color:#E6EEF8;" class="pd3">
				<form id="statisForm" name="statisForm"
					action="statisAction_statisFpgzqk" method="post">
					<div >
					<center ><font style="font-size:20px">重大活动统计表</font></center>
				    </div>
					<input type="hidden" name="naturetype" id="naturetype" />
					<div class="risk_wpkzqk">
						<table class="table">
							<tr class="head">
								<td rowspan="2" width="30px">序号</td>
								<td rowspan="2" width="70px">机构单位</td>
								<td rowspan="2" width="70px">活动时间</td>
								<td rowspan="2" width="150px">活动主题</td>
								<td rowspan="2" width="150px">活动地点</td>
								<td rowspan="2" width="100px">活动形式</td>
								<td rowspan="2" width="120px">参加单位</td>
								<td rowspan="2" width="120px">参加媒体</td>
								<td colspan="3" width="170px">参加人员</td>
								<td rowspan="2" width="100px">宣传资料</td>
								<td rowspan="2" width="100px">发放资料</td>
								<td rowspan="2" width="100px">受益人群</td>
								<td rowspan="2" width="150px">备注</td>
							</tr>
							<tr class="head">
								<td width="70px">领导姓名</td>
								<td width="50px">职工数</td>
								<td width="50px">群众数</td>
							</tr>
							<tr>
							   <td style="text-align: center;">1</td>
							   <td style="text-align: center;">济南市</td>
							   <td style="text-align: center;">2015-01-21</td>
							   <td style="text-align: center;">法治文化广场建设</td>
							   <td style="text-align: center;">天桥区车站街22号</td>
							   <td style="text-align: center;">问卷调查</td>
							   <td style="text-align: center;">济南规划局</td>
							   <td style="text-align: center;">济南电视台</td>
							   <td style="text-align: center;">王毅</td>
							   <td style="text-align: center;">20</td>
							   <td style="text-align: center;">30</td>
							   <td style="text-align: center;">如何开展文体活动</td>
							   <td style="text-align: center;">广场宣传册</td>
							   <td style="text-align: center;">广大群众</td>
							   <td style="text-align: center;">丰富群众活动</td>
							</tr>
							
							<tr>
							   <td style="text-align: center;">2</td>
							   <td style="text-align: center;">济南市</td>
							   <td style="text-align: center;">2015-02-05</td>
							   <td style="text-align: center;">化工厂泄漏污染事</td>
							   <td style="text-align: center;">舜华路1969</td>
							   <td style="text-align: center;">开展调查</td>
							   <td style="text-align: center;">济南环保局</td>
							   <td style="text-align: center;">大众日报</td>
							   <td style="text-align: center;">南宫莲</td>
							   <td style="text-align: center;">20</td>
							   <td style="text-align: center;">10</td>
							   <td style="text-align: center;">环境污染整治条例</td>
							   <td style="text-align: center;">环保法文档</td>
							   <td style="text-align: center;">化工厂附近居民</td>
							   <td style="text-align: center;"></td>
							</tr>
							
							<tr>
							   <td style="text-align: center;">3</td>
							   <td style="text-align: center;">烟台市</td>
							   <td style="text-align: center;">2015-02-19</td>
							   <td style="text-align: center;">万顷良田征收</td>
							   <td style="text-align: center;">金城镇</td>
							   <td style="text-align: center;">问卷调查</td>
							   <td style="text-align: center;">烟台国土局</td>
							   <td style="text-align: center;">胶东在线</td>
							   <td style="text-align: center;">李雷</td>
							   <td style="text-align: center;">5</td>
							   <td style="text-align: center;">50</td>
							   <td style="text-align: center;">征地条例</td>
							   <td style="text-align: center;">征地条例</td>
							   <td style="text-align: center;">土地所有者</td>
							   <td style="text-align: center;">按法律合法征收</td>
							</tr>
						</table>
					</div>
				</form>
			</div>
	</div>
</div>
	

</body>
</html>