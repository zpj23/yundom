<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript">
var datagrid;
var choosedgrid;
var editRow = undefined; //定义全局变量：当前编辑的行
$(document).ready(function(){
	initGoods();
	initChoosed();
});


function initGoods(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'jlGoodsInfoAction_getGoodsListJson',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
            return 'height:55px;';  
        },
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		
		columns : [ [ {
			field : 'name',
			title : '物资名称',
			width : 150,
			formatter:function(value, rowData, rowIndex){
				var str=rowData.name+"["+rowData.type+"]";
				return str;
			}
		},{
			field : 'suppliername',
			title : '供应商',
			width : 50
			
		},{
			field : 'price',
			title : '单价',
			width : 80,
			formatter: function(value, rowData, rowIndex){
				
				var str=rowData.price+"元/"+rowData.unit;
				return str;
			}
		},{
			field : 'num',
			title : '数量',
			width : 50,
			editor:{
				type:'text'	
			}
		},
		{
			field : 'supplierid',
			title : '提供商id',
			hidden:true,
			width : 50
			
		},{
			field : 'caoz',
			title : '操作',
			width : 50,
			formatter: function(value, rowData, rowIndex){
				
				var str= ' <a title="选择" href="javascript:;" onclick="addGoods('+rowData.id+')"  style="text-decoration:none">选择</a>';
				return str;
			}
		}
		
		] ],
		onDblClickRow: function (rowIndex, rowData) {
			
	        //双击开启编辑行
	            if (editRow != undefined) {
	                datagrid.datagrid("endEdit", editRow);
	            }
	            editRow = undefined;
	            if (editRow == undefined) {
	                datagrid.datagrid("beginEdit", rowIndex);
	                editRow = rowIndex;
	            }
	        },
	        onAfterEdit: function (rowIndex, rowData, changes) {
	            //endEdit该方法触发此事件
	           try{
	        	   
	           }catch (e) {
				}
	            editRow = undefined;
	        }
	});
}

//已选择的datagrid
function initChoosed(){
	choosedgrid=$('#choosedgrid');
	choosedgrid.datagrid({
		url:'',
		rowStyler:function(rowIndex,rowData){  
            return 'height:55px;';  
        },
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		
		columns : [ [ {
			field : 'name',
			title : '物资名称',
			width : 200
		},{
			field : 'price',
			title : '单价',
			width : 50
		},{
			field : 'num',
			title : '数量',
			width : 50
			
		},{
			field : 'jine',
			title : '金额',
			width : 50
			
		},{
			field : 'supplierid',
			title : '提供商id',
			width : 50,
			hidden:true
			
		},{
			field : 'caoz',
			title : '操作',
			width : 150,
			formatter: function(value, rowData, rowIndex){
				
				var str= ' <a title="移除" href="javascript:;" onclick="removeGoods('+rowData.id+')"  style="text-decoration:none">移除</a>';
				return str;
			}
		}
		
		] ]
	});
}


/****t****/
function addGoods(id){
	datagrid.datagrid("endEdit", editRow);
	var rowData=datagrid.datagrid("getSelected");
	if(rowData.num==0||rowData.num==null){
		alert("请填写数量");
		return;
	}
	
	var row={};
	row.id=rowData.id;
	row.name=rowData.name;
	row.price=rowData.price+"元/"+rowData.unit;
	row.num=rowData.num+""+rowData.unit;
	row.jine=(rowData.price*rowData.num).toFixed(2)+"元";
	row.supplierid=rowData.supplierid;
	row.caoz='<a title="移除" href="javascript:;" onclick="removeGoods('+rowData+')"  style="text-decoration:none">移除</a>';
	var datas=$('#choosedgrid').datagrid('getData').rows;
	for(var i=0;i<datas.length;i++){
		if(rowData.id==datas[i].id){
			var rowIndex = $('#choosedgrid').datagrid('getRowIndex', datas[i]);
			$('#choosedgrid').datagrid("deleteRow",rowIndex);
			break;
		}
	}
	$('#choosedgrid').datagrid('appendRow',row);
	totalSummary();
}

function totalSummary(){
	var total=0;
	var datas=$('#choosedgrid').datagrid('getData').rows;
	for(var i=0;i<datas.length;i++){
		var jine=datas[i].jine;
		jine =jine.substring(0,jine.length-1);
		total+=(parseFloat(jine));
	}
	
	try{
		purchase_deal.setJine(total);
	}catch(e){
		purchase_deal.contentWindow.setJine(total);
	}
	
}

function removeGoods(rowData){
	//var rowData=$('#choosedgrid').datagrid("getSelected");
	var rowIndex = $('#choosedgrid').datagrid('getRowIndex', rowData);
	$('#choosedgrid').datagrid("deleteRow",rowIndex);
	totalSummary();
}

//保存列表信息
function saveDetail(id){
	var datas=$('#choosedgrid').datagrid('getData').rows;
	var str=JSON.stringify(datas);
	$.ajax({
		 type: "POST",
	     url: "jlPurchaseInfoAction_savePurchaseDetail",
	     async:false,
	     data:"id="+id+"&data="+str,
	     success: function(data1){
	    	  var data=$.parseJSON(data1);
		      if(data.map.flag){
		      		parent.saveSuccess();
		      }else{
		      		parent.savefail();
		      }
	     }
	});
}

</script>
</head>
<body>
<div class="easyui-layout" data-options="fit:true" >
	<div data-options="region:'west',split:true,collapsible:false" style="width:380px;">
		<table id="datagrid" fit="true" fitColumns="true"
						style="height: auto; width: auto;" toolbar="" title=""
						pageSize="${ipagesize}" pageList="${ipagelist}"
						queryParams="" idField="id" border="false"
						rownumbers="true" singleSelect="true" pagination="true" >
					</table>
	</div>
	<div data-options="region:'center',split:true,collapsible:false" style="width:100%;height: 800px">
		<div data-options="region:'north',split:true,collapsible:false" style="width:100%;height:300px;">
			<table id="choosedgrid" fit="true" fitColumns="true"
						style="height: auto; width: auto;" toolbar="" title=""
						pageSize="1" pageList="10" border="false"
						rownumbers="true" singleSelect="true" pagination="false">
					</table>
		</div>
		<div data-options="region:'center',split:true,collapsible:false" style="width:100%;height: 300px">
			<iframe id="purchase_deal" name="purchase_deal" src="jlPurchaseInfoAction_totalIframe" width="95%" height="95%" frameborder="0" scrolling="no"></iframe>
		</div>
	</div>
</div>
</body>
</html>