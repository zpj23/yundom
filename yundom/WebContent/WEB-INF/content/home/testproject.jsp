<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>    
<!DOCTYPE html>
<head>
<title></title>
</head>
<body>
<div id="pointText" style="padding:10px 10px 10px 5px; color: green;font-weight: bold; line-height: 10px;">
	<div style="width:10px;height:10px;background-color: green;float:left;"></div>&nbsp;<span style="float:left;margin-left: 5px;">已备案</span>
	<div style="width:10px;height:10px;background-color:black;float:left;margin-left: 20px;"></div><span style="float:left;color:black;margin-left: 5px;">正在执行</span>
</div>
<table id='datagrid_todo' class='easyui-datagrid' style='width:650px;height:auto' fit='true' border='false' singleSelect='true' idField='id' >
</table>
<script>
		bindTodo();
		function bindTodo()
		 {
			 	$('#datagrid_todo').datagrid({
					url: 'HnAction_toIndex',
					rowStyler:function(rowIndex,rowData){  
			            //任务完成100%， 并且已审核通过，背景色置红
			            if(rowData && rowData.isBak && (rowData.isBak=='1'))  
			            {  
			                return 'color:green;';  
			            }  
			        },
			        toolbar:'#pointText',
					idField : 'id',
					columns : [ [ {
						field : 'status',
						title : '状态',
						width : 110
					},{
						field : 'name',
						title : '标题',
						width : 160,
						formatter: function(value, rowData, rowIndex){
							if(value.length>15){
								value = value.substring(0,13)+"...";
							}
							if(rowData && rowData.isBak && (rowData.isBak=='1'))  
				            {  
							    value= "<font style=\"color:green\">"+value+"</font>";
				            }
							var str = "<a href=\"#\" onclick=\"openDetails('"+rowData.id+"');return false;\">"+value+"</a>";
							return  str;
						}
					},{
						field : 'type',
						title : '项目类别',
						width : 70
					},{
						field : 'nature',
						title : '项目性质',
						width : 100
					},{
						field : 'startupdate',
						title : '评估启动日期',
						width : 130,
						formatter: function(value, rowData, rowIndex){
							if(value=='null'){
								return '--';
							}else{
								return value;
							}
						}
					}] ],
          fitColumns:true
				});
		 }
		
		function openDetails(id){
			parent.parent.Home.addTab("112233", "项目详细信息", "", "HnAction_toViewProcess?isindex=1&id="+id, "href",true);
		}
</script>
</body>
</html>