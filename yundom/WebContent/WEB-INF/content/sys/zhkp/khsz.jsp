<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/My97DatePicker/WdatePicker.js"></script>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/style_fxpg.css" />

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
#tableShow input{
	width: 30px;
	padding-left: 5px;
	margin-left: 10px;
	margin-right: 10px;
}
</style>
<script type="text/javascript">
	$(document).ready(function() {
		//search();
	});
	//点击查询按钮
	function search() {
		$.ajax({
			type : "post",
			url : "zhkpAction_initKhfz",
			async : false,
			cache : false,
			data : "selectyear=" + $("#selectyear").val() + "&selecthalf="
					+ $("#selecthalf").val(),
			success : function(data) {
				var resultData = $.parseJSON(data);
			}
		});
	}
	//保存配置
	function saveConfig() {
		$('#form1').form('submit',{
			url:'zhkpAction_savePeizhi',
		    success: function(){		
		    	common.alert_info('保存成功');
			//刷新父页面，关闭window			
		 }
		});
	}
</script>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
		<div data-options="region:'north',split:false,border:false">
			<div class="panel pd3" style="background-color: #E6EEF8;">
				<div class="panel-header">
							<a href="javascript:;" class="easyui-linkbutton"
								iconCls="icon-save" onclick="saveConfig();">保存配置</a> &nbsp;	
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
						class="tree-title">考核设置</span>
				</tr>
			</table>
			<form action="zhkpAction_savePeizhi" id="form1" name="form1" method="post">
					<input type="hidden" id="id" name="khfz.id" value="${khfz.id}" />
					<table class="table" id="tableShow" style="text-align: center;" width="100%" align="center">
						<tr>
							<td>类型</td>
							<td>总分<span style="color: red;">100</span>分
							</td>
							<td>分值设置</td>
						</tr>
						<tr>
							<td>评估信息</td>
							<td>总分<input type="text"  id="pgxx_zf"
								name="khfz.pgxx_zf" value="${khfz.pgxx_zf}" /></td>
							<td>
								<div>
									<span style="width: 100px;">数&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="pgxx_total" name="khfz.pgxx_total"
										value="${khfz.pgxx_total}" />不扣分，少一个扣<input type="text"
										id="pgxx_total_pre" name="khfz.pgxx_total_pre"
										value="${khfz.pgxx_total_pre}" />
								</div>
								<div>
									<span style="width: 100px;">完&nbsp;&nbsp;成&nbsp;&nbsp;达</span><input type="text" id="pgxx_complete"
										name="khfz.pgxx_complete" value="${khfz.pgxx_complete}" />不扣分，少一个扣<input
										type="text" id="pgxx_complete_pre" name="khfz.pgxx_complete_pre"
										value="${khfz.pgxx_complete_pre}" />
								</div>
							</td>
						</tr>
						<tr>
							<td>重大决策</td>
							<td>总分<input type="text" id="zdjc_zf" name="khfz.zdjc_zf"
								value="${khfz.zdjc_zf}" /></td>
							<td>
								<div>
									<span style="width: 100px;">数&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="zdjc_total" name="khfz.zdjc_total"
										value="${khfz.zdjc_total}" />不扣分，少一个扣<input type="text"
										id="zdjc_total_pre" name="khfz.zdjc_total_pre"
										value="${khfz.zdjc_total_pre}" />
								</div>
								<div>
									<span style="width: 100px;">质&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="zdjc_quality" name="khfz.zdjc_quality"
										value="${khfz.zdjc_quality}" />不扣分，少一个扣<input type="text"
										id="zdjc_quality_pre" name="khfz.zdjc_quality_pre"
										value="${khfz.zdjc_quality_pre}" />
								</div>
							</td>
			
						</tr>
						<tr>
							<td>督查督办</td>
							<td>总分<input type="text" id="dcdb_zf" name="khfz.dcdb_zf"
								value="${khfz.dcdb_zf}" /></td>
							<td>
								<div>
									<span style="width: 100px;">数&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="dcdb_total" name="khfz.dcdb_total"
										value="${khfz.dcdb_total}" />不扣分，少一个扣<input type="text"
										id="dcdb_total_pre" name="khfz.dcdb_total_pre"
										value="${khfz.dcdb_total_pre}" />
								</div>
								<div>
									<span style="width: 100px;">时&nbsp;&nbsp;效&nbsp;&nbsp;达</span><input type="text" id="dcdb_time" name="khfz.dcdb_time"
										value="${khfz.dcdb_time}" />不扣分，少一个扣<input type="text"
										id="dcdb_time_pre" name="khfz.dcdb_time_pre"
										value="${khfz.dcdb_time_pre}" />
								</div>
							</td>
						</tr>
						<tr>
							<td>维稳快报</td>
							<td>总分<input type="text" id="wwkb_zf" name="khfz.wwkb_zf"
								value="${khfz.wwkb_zf}" /></td>
							<td>
								<div>
									<span style="width: 100px;">数&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="wwkb_total" name="khfz.wwkb_total"
										value="${khfz.wwkb_total}" />不扣分，少一个扣<input type="text"
										id="wwkb_total_pre" name="khfz.wwkb_total_pre"
										value="${khfz.wwkb_total_pre}" />
								</div>
							</td>
						</tr>
						<tr>
							<td>公文</td>
							<td>总分<input type="text" id="gw_zf" name="khfz.gw_zf"
								value="${khfz.gw_zf}" /></td>
							<td>
								<div>
									<span style="width: 100px;">数&nbsp;&nbsp;量&nbsp;&nbsp;达</span><input type="text" id="gw_total" name="khfz.gw_total"
										value="${khfz.gw_total}" />不扣分，少一个扣<input type="text"
										id="gw_total_pre" name="khfz.gw_total_pre"
										value="${khfz.gw_total_pre}" />
								</div>
							</td>
						</tr>
					</table>
					
				</form>
			</div>
			</div>
			
		</div>
			
</div>
</body>
</html>