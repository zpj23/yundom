<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>

<html>
<head>
<%@ include file="/common/meta.jsp"%>
<%@ include file="/common/header.jsp"%>
<script>
$(function(){
	$('#datagrid_yujing').datagrid({
		url: '${ctx}/HomeAction_queryHomeYuJing',
		queryParams : {tableName :'weiwxx', rowCount:100, formatterMap: "{\"FENLXX\":\"SW01\" , \"GUANKJB\":\"SW02\"}"}
	})
})


function formatter_shidmc(rowIndex, rowData) {

	var temp = "<a href='javascript:'>";
	try {
		if (rowData.GUANKJB.indexOf('红色') == 0) {
			return "<a href='#' onclick=showDetail('"
					+ rowData.WEIWXX_GUID
					+ "')>"
					+ rowData.SHIDMC
					+ "<img src='${ctx}/images/shan/001.gif' border='0' width='20' height='22' align='absmiddle'></a>";
		}
		if (rowData.GUANKJB.indexOf('橙色') == 0) {
			return "<a href='#' onclick=showDetail('"
					+ rowData.WEIWXX_GUID
					+ "')>"
					+ rowData.SHIDMC
					+ "<img src='${ctx}/images/shan/002.gif' border='0' width='20' height='22' align='absmiddle'></a>";
		}
		if (rowData.GUANKJB.indexOf('黄色') == 0) {
			return "<a href='#' onclick=showDetail('"
					+ rowData.WEIWXX_GUID
					+ "')>"
					+ rowData.SHIDMC
					+ "<img src='${ctx}/images/shan/003.gif' border='0' width='20' height='22' align='absmiddle'></a>";
		}
		if (rowData.GUANKJB.indexOf('蓝色') == 0) {
			return "<a href='#' onclick=showDetail('"
					+ rowData.WEIWXX_GUID
					+ "')>"
					+ rowData.SHIDMC
					+ "<img src='${ctx}/images/shan/004.gif' border='0' width='20' height='22' align='absmiddle'></a>";
		}
	} catch (e) {
		return rowData.SHIDMC;
	}
}

	
function showDetail(param) {
	common.openWindow('详细信息', 'processAction_leaderReadForm?id=' + param,
			900, 650)
}
</script>
</head>
<body>
  <div class="easyui-layout">
    <div data-options="region:'center', title:'${titleName}'">
			<table style="width: 650px; height: auto" fit="true" border="false"
				singleSelect="true" idField="WEIWXX_GUID" id="datagrid_yujing">
				<thead>
					<tr>
						<th field="SHIDMC" align="left" width="270"
							formatter="formatter_shidmc">名称</th>
						<th field="FENLXX" align="left" width="230">信息分类</th>
						<th field="GUANKJB" align="left" width="100">管控级别</th>
					</tr>
				</thead>
			</table>
		</div>
    </div>
</body>
</html>