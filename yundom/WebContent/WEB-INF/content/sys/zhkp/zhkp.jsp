<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" type="text/css"
	href="js/EasyUI/EasyUI1.3.6/css/style_fxpg.css" />

<style>
	table {
		font-size: 12px;
		background-color: #95B8E7;
		width: 100%;
		
		border-spacing: 1px;
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

.score{
	color:Green;
}
	
</style>
<script type="text/javascript">
var  scoreRatio;
	$(document).ready(function(){
		searchInfo();
	});
	function initData(resultData){
		scoreRatio =resultData.scoreRatio;
		
		$(".listInfo").remove();
		var cityList= resultData.cityList;
		//报备的对象
		var bbsObj=changeToObj(resultData.allList);
		//准予实施的对象
		var obj1=changeToObj(resultData.list1);
		//暂缓实施的对象
		var obj2=changeToObj(resultData.list2);
		//不予实施的对象
		var obj3=changeToObj(resultData.list3);
		//重大决策上报数量		
		var obj4=changeToObj(resultData.listItemSB);
		//重大决策上报办结数量
		var obj5=changeToObj(resultData.listItemBJ);
		//督察督办到各市的数据
		var obj6=changeToObj(resultData.listDCDBFK);
		//督察督办归档的数据
		var obj7=changeToObj(resultData.listDCDBGD);
		//维稳快报数据
		var obj8=changeToObj(resultData.listWEKB);
		//公文数据
		var obj9=changeToObj(resultData.listGW);
		
		//循环各市
		for(var i=0;i<cityList.length;i++){
			var trObj=$("<tr>").addClass("listInfo");
			//评估信息
			var tdObj_city=$("<td>");
			var tdObj_pgxx_num=$("<td>");
			var tdObj_pgxx_comple=$("<td>");
			var tdObj_pgxx_sx=$("<td>");
			var tdObj_pgxx_score=$("<td>");
			tdObj_city.html(cityList[i][1]);
			var numb=bbsObj[cityList[i][2]];
			if(numb!=null){
				tdObj_pgxx_num.html(numb);
			}else{
				numb=0;
				tdObj_pgxx_num.html(numb);
			}
			var wcs=0;
			if(obj1[cityList[i][2]]!=null){
				wcs=wcs+parseInt(obj1[cityList[i][2]]);
			}
			if(obj2[cityList[i][2]]!=null){
				wcs=wcs+parseInt(obj2[cityList[i][2]]);
			}
			if(obj3[cityList[i][2]]!=null){
				wcs=wcs+parseInt(obj3[cityList[i][2]]);
			}
			tdObj_pgxx_comple.html(wcs);
			//计算得分
			var scoreNum=calculateScore(numb,wcs,"pgxx");
			
			tdObj_pgxx_score.html(scoreNum).addClass("score");
			
			trObj.append(tdObj_city).append(tdObj_pgxx_num).append(tdObj_pgxx_comple).append(tdObj_pgxx_score);
			// 重大决策
			var tdObj_zdjc_num=$("<td>");
			var tdObj_zdjc_zl=$("<td>");
			var tdObj_zdjc_score=$("<td>");
			var zdjc_num=obj4[cityList[i][2]];
			if(zdjc_num!=null){
				tdObj_zdjc_num.html(zdjc_num);
			}else{
				zdjc_num=0;
				tdObj_zdjc_num.html(zdjc_num);
			}
			var zdjc_zl=obj5[cityList[i][2]];
			if(zdjc_zl!=null){
				tdObj_zdjc_zl.html(zdjc_zl);
			}else{
				zdjc_zl=0;
				tdObj_zdjc_zl.html(zdjc_zl);
			}
			//得分
			var scoreNum_zdjc=calculateScore(parseInt(zdjc_num),parseInt(zdjc_zl),"zdjc");
			
			tdObj_zdjc_score.html(scoreNum_zdjc).addClass("score");
			trObj.append(tdObj_zdjc_num).append(tdObj_zdjc_zl).append(tdObj_zdjc_score);
			//督查督办
			var tdObj_dcdb_num=$("<td>");
			var tdObj_dcdb_sx=$("<td>");
			var tdObj_dcdb_score=$("<td>");
			var dcdb_num=obj6[cityList[i][2]];
			if(dcdb_num!=null){
				tdObj_dcdb_num.html(dcdb_num);
			}else{
				dcdb_num=0;
				tdObj_dcdb_num.html(dcdb_num);
			}
			var dcdb_gd=obj7[cityList[i][2]];
			if(dcdb_gd!=null){
				tdObj_dcdb_sx.html(dcdb_gd);
			}else{
				dcdb_gd=0;
				tdObj_dcdb_sx.html(dcdb_gd);
			}
			
			//得分
			var scoreNum_dcdb=calculateScore(parseInt(dcdb_num),parseInt(dcdb_gd),"dcdb");
			
			tdObj_dcdb_score.html(scoreNum_dcdb).addClass("score");
			trObj.append(tdObj_dcdb_num).append(tdObj_dcdb_sx).append(tdObj_dcdb_score);
			
			
			
			//维稳快报
			var tdObj_wwkb_num=$("<td>");
			var tdObj_wwkb_score=$("<td>");
			var wwkb_num=obj8[cityList[i][2]];
			if(wwkb_num!=null){
				tdObj_wwkb_num.html(wwkb_num);
			}else{
				wwkb_num=0;
				tdObj_wwkb_num.html(wwkb_num);
			}
			var socreNum_wwkb=calculateScore(parseInt(wwkb_num),"","wwkb");
			tdObj_wwkb_score.html(socreNum_wwkb).addClass("score");
			trObj.append(tdObj_wwkb_num).append(tdObj_wwkb_score);
			
			//公文
			var tdObj_gw_num=$("<td>");
			var tdObj_gw_score=$("<td>");
			var gw_num	= obj9[cityList[i][2]];
			if(gw_num!=null){
				tdObj_gw_num.html(gw_num);
			}else{
				gw_num=0;
				tdObj_gw_num.html(gw_num);
			}
			var scoreNum_gw=calculateScore(parseInt(gw_num),"","gw");
			tdObj_gw_score.html(scoreNum_gw).addClass("score");
			trObj.append(tdObj_gw_num).append(tdObj_gw_score);
			//总分
			var tdObj_total=$("<td>");
			tdObj_total.html(parseInt(tdObj_pgxx_score.html())+parseInt(tdObj_zdjc_score.html())+parseInt(tdObj_dcdb_score.html())+parseInt(tdObj_wwkb_score.html())+parseInt(tdObj_gw_score.html()));
			trObj.append(tdObj_total);
			
			$("#tableShow").append(trObj);
			
		}
	}
	//计算得分数据
	function calculateScore(num1,num2,flag){
		var scoreNum=0;
		if(flag=="pgxx"){
			scoreNum=parseInt(scoreRatio.pgxx_zf);
			if(num1>=parseInt(scoreRatio.pgxx_total)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.pgxx_total)-num1)*(parseInt(scoreRatio.pgxx_total_pre));
			}
			if(num2>parseInt(scoreRatio.pgxx_complete)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.pgxx_complete)-num2)*(parseInt(scoreRatio.pgxx_complete_pre));
			}
		}else if(flag=="zdjc"){
			scoreNum=parseInt(scoreRatio.zdjc_zf);
			if(num1>=parseInt(scoreRatio.zdjc_total)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.zdjc_total)-num1)*(parseInt(scoreRatio.zdjc_total_pre));
			}
			if(num2>=parseInt(scoreRatio.zdjc_quality)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.zdjc_quality)-num2)*(parseInt(scoreRatio.zdjc_quality_pre));
			}
		}else if(flag=="dcdb"){
			scoreNum=parseInt(scoreRatio.dcdb_zf);
			if(num1>=parseInt(scoreRatio.dcdb_total)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.dcdb_total)-num1)*(parseInt(scoreRatio.dcdb_total_pre));
			}
			if(num2>=parseInt(scoreRatio.dcdb_time)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.dcdb_time)-num2)*(parseInt(scoreRatio.dcdb_time_pre));
			}
		}else if(flag=="wwkb"){
			scoreNum=parseInt(scoreRatio.wwkb_zf);
			if(num1>=parseInt(scoreRatio.wwkb_total)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.wwkb_total)-num1)*(parseInt(scoreRatio.wwkb_total_pre));
			}
		}else if(flag=="gw"){
			scoreNum=parseInt(scoreRatio.gw_zf);
			if(num1>=parseInt(scoreRatio.gw_total)){
				
			}else{
				scoreNum=scoreNum-(parseInt(scoreRatio.gw_total)-num1)*(parseInt(scoreRatio.gw_total_pre));
			}
		}
		return scoreNum;
	}
	//转换对象 同时把重复的组织机构的的都相加合并成一个组织机构的数据
	function changeToObj(tempList){
		var obj =new Object();
		for(var m=0;m<tempList.length;m++){
			var tempStr=tempList[m][0];
			var code=tempStr.split("-")[0];
			if(obj[code]!=null){
				obj[code]=parseInt(obj[code])+parseInt(tempList[m][1]);
			}else{
				obj[code]=parseInt(tempList[m][1]);
			}
		}
		return obj;
	}
	//查询
	function searchInfo(){
		$.ajax({
			type:"post",
			url:"zhkpAction_initData", 
			async : false,
			cache:false,
			data:"selectyear="+$("#selectyear").val()+"&selecthalf="+$("#selecthalf").val(),
			success: function(data) {
				var resultData=$.parseJSON(data);
				initData(resultData);
		  	}
		});
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
								     <select id="selecthalf" name="selecthalf" class="easyui-validatebox" >
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
			<table class="TableBlock" width="100%">
				<tr>
					<td class="panel-header title" colspan="6"><span
						class="tree-icon tree-file icon-application-form"></span> <span
						class="tree-title">综合考评统计</span>
				</tr>
			</table>
			 <table class="table" id="tableShow" style="text-align: center;" width="100%" align="center">
			  	<tr>
			  		<td rowspan="2">单位</td>
			  		<td colspan="3">评估信息</td>
			  		
			  		<td colspan="3">重大事项决策</td>
			  		
			  		<td colspan="3">督察督办</td>
			  		<td colspan="2">维稳快报</td>
			  		<td colspan="2">公文</td>
			  		<td rowspan="2">总分</td>
			  		
			  	</tr>
			  	<tr>
			  		<td>数量</td>
			  		<td>完成数</td>
			  		<td class='score'>得分</td>
			  		<td>数量</td>
			  		<td>质量</td>
			  		<td class='score'>得分</td>
			  		<td>数量</td>
			  		<td>时效</td>
			  		<td class='score'>得分</td>
			  		<td>数量</td>
			  		<td class='score'>得分</td>
			  		<td>数量</td>
			  		<td class='score'>得分</td>
			  	</tr>
			  	
			  
			  </table>
			  </div>
			  </div>
</div>
 
</body>
</html>