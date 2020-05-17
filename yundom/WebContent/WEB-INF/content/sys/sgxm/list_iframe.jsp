<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript">
var datagrid;
var editRow = undefined; //定义全局变量：当前编辑的行
var isSaveFlag=false;
$(document).ready(function(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'sgxmAction_getListJson',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
            return 'height:40px;';  
        },
        showFooter:true,
		idField : 'id',
        toolbar: [{ text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
            //添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
            
            if (editRow != undefined) {
            	alert("请先保存之前的数据");
            	return;
//                 datagrid.datagrid("endEdit", editRow);
            }
            //添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
            if (editRow == undefined) {
                datagrid.datagrid("insertRow", {
                    index: 0, // index start with 0
                    row: {
                    	id:guid(),
                    	gjby:0,
                    	jbgz:0,
                    	jbgzhjj:0,
                    	yfgz:0,
                    	lhbt:0,
                    	fybt:0,
                    	mq:0,
                    	qtkk:0,
                    	zgz:0,
                    	yfgzy:0,
                    	sygz:0,
                    	sgxm:''
                    }
                });
                //将新插入的那一行开户编辑状态
                datagrid.datagrid("beginEdit", 0);
                //给当前编辑的行赋值
                editRow = 0;
                bindInfo(editRow);
            }
        }
        }, '-',
        { text: '复制/添加', iconCls: 'icon-cut', handler: function () {//复制新增
            //添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
            if (editRow != undefined) {
            	alert("请先保存之前的数据");
            	return;
//                 datagrid.datagrid("endEdit", editRow);
            }
        	//获取当前选中行，准备复制数据
            var rows = datagrid.datagrid("getSelections");
            if (rows.length == 1) {
            	//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
                if (editRow == undefined) {
                    datagrid.datagrid("insertRow", {
                        index: 0, // index start with 0
                        row: {
                        	id:guid(),
                        	xm:rows[0].xm,
                        	yf:rows[0].yf,
                        	gd:rows[0].gd,
                        	sgxm:rows[0].sgxm,
                        	gjby:rows[0].gjby,
                        	jbgz:rows[0].jbgz,
                        	jbgzhjj:rows[0].jbgzhjj,
                        	yfgz:rows[0].yfgz,
                        	lhbt:rows[0].lhbt,
                        	fybt:rows[0].fybt,
                        	mq:rows[0].mq,
                        	qtkk:rows[0].qtkk,
                        	zgz:rows[0].zgz,
                        	yfgzy:rows[0].yfgzy,
                        	sygz:rows[0].sygz,
                        	qz:rows[0].qz,
                        	bz:rows[0].bz,
                        	chuqin:rows[0].chuqin,
                        	jiaban:rows[0].jiaban,
                        	zonggongshi:rows[0].zonggongshi
                        }
                    });
                    //将新插入的那一行开户编辑状态
                    datagrid.datagrid("beginEdit", 0);
                    //给当前编辑的行赋值
                    editRow = 0;
                    bindInfo(editRow);
                }
            }
            
        }
        }, '-',
         { text: '删除', iconCls: 'icon-remove', handler: function () {
             //删除时先获取选择行
             var selectedRow = datagrid.datagrid('getSelected');  //获取选中行
             //选择要删除的行
            var indexrow1=datagrid.datagrid("getRowIndex",selectedRow);
             if (indexrow1!=-1) {
                 $.messager.confirm("提示", "你确定要删除吗?", function (r) {
                     if (r) {
                    	 delInfo(selectedRow.id,indexrow1);
//                     	 datagrid.datagrid('deleteRow',indexrow1);
                     }
                 });
             }
             else {
                 $.messager.alert("提示", "请选择要删除的行", "error");
             }
         }
         }, '-',
         { text: '修改', iconCls: 'icon-edit', handler: function () {
             //修改时要获取选择到的行
             var rows = datagrid.datagrid("getSelections");
             //如果只选择了一行则可以进行修改，否则不操作
             if (rows.length == 1) {
                 //修改之前先关闭已经开启的编辑行，当调用endEdit该方法时会触发onAfterEdit事件
                 if (editRow != undefined) {
                	 isSaveFlag=true;
                	 datagrid.datagrid("endEdit", editRow);
                	 
//                 	 $.messager.confirm("提示", "是否保存已编辑的数据?", function (r) {
//                          if (r) {
// 		                	 isSaveFlag=true;
// 		                	 datagrid.datagrid("endEdit", editRow);
		                	 
//                          }else{
//                         	 isSaveFlag=false;
// 		                	 datagrid.datagrid("endEdit", editRow);
//                          }
//                      });
                 }
                 //当无编辑行时
                 editRow=undefined;
                 if (editRow == undefined) {
                     //获取到当前选择行的下标
                     var index = datagrid.datagrid("getRowIndex", rows[0]);
                     //开启编辑
                     datagrid.datagrid("beginEdit", index);
                     //把当前开启编辑的行赋值给全局变量editRow
                     editRow = index;
                     //当开启了当前选择行的编辑状态之后，
                     //应该取消当前列表的所有选择行，要不然双击之后无法再选择其他行进行编辑
                     datagrid.datagrid("unselectAll");
                     bindInfo(editRow);
                 }
             }
         }
         }, '-',
         { text: '保存', iconCls: 'icon-save', handler: function () {
             //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
             isSaveFlag=true;
             datagrid.datagrid("endEdit", editRow);
         }
         }, '-',
         { text: '导出', iconCls: 'icon-export', handler: function () {
             //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
         }
         }, '-',
         { text: '刷新', iconCls: 'icon-refresh', handler: function () {
        	 if (editRow != undefined) {
        		 isSaveFlag=false;
                 datagrid.datagrid("endEdit", editRow);
             }
        	 parent.searchInfo();
         }
         }
         ],
         onAfterEdit: function (rowIndex, rowData, changes) {
             //endEdit该方法触发此事件
             
            try{
				if(isSaveFlag){
                	 tempSaveData(rowData);
				}
            }catch (e) {
 			}
             editRow = undefined;
         },
         onDblClickRow: function (rowIndex, rowData) {
         //双击开启编辑行
             if (editRow != undefined) {
            	 isSaveFlag=true;
                 datagrid.datagrid("endEdit", editRow);
             }
             editRow=undefined;
             if (editRow == undefined) {
                 datagrid.datagrid("beginEdit", rowIndex);
                 editRow = rowIndex;
	             bindInfo(editRow);
             }
         }
	});
	
});

//绑定 在字段上加keyup监听 
function bindInfo(ri){
	var ed = $('#datagrid').datagrid('getEditors', ri);
		for (var i = 0; i < ed.length; i++){
			var et = ed[i];
			if(et.field == "gjby"){
				//工价包月
				$(et.target).bind("keyup", function(){
	            	chf($(this),"gjby");
	            });
			}else if(et.field == "jbgz"){
				//监听基本工资
				$(et.target).bind("keyup", function(){
	            	chf($(this),"jbgz");
	            });
			}else if(et.field == "jbgzhjj"){
				//监听加班工资和奖金
				$(et.target).bind("keyup", function(){
	            	chf($(this),"jbgzhjj");
	            });
			}else if(et.field == "qtkk"){
				//其他扣款
				$(et.target).bind("keyup", function(){
	            	chf($(this),"qtkk");
	            });
			}else if(et.field == "yfgzy"){
				//预付工资元
				$(et.target).bind("keyup", function(){
	            	chf($(this),"yfgzy");
	            });
			}
		}
}

//keyup方法
function chf(textarea,tfield){
	if(editRow != undefined){
		var edr = $('#datagrid').datagrid('getEditors', editRow);
		var newval = $(textarea).val();
		if(tfield=="gjby"){
			//判断改变的是工价包月 ,则利用总工时*工价包月
			var temp= $(edr[7].target).val();
			if(null!=temp&&temp!=""&&null!=newval&&newval!=""){
				var yfgz=temp*newval;
				$(edr[11].target).val(yfgz.toFixed(2));
			}
		}else if(tfield=="jbgz"){
			//判断如果改变的是基本工资，则用应发工资-基本工资=加班工资和奖金
			var yfgz=$(edr[11].target).val();
			if(null!=yfgz&&yfgz!=""&&null!=newval&&newval!=""){
				var jbgzhjj=yfgz-newval;
				$(edr[10].target).val(jbgzhjj.toFixed(2));
			}
		}else if(tfield=="jbgzhjj"){
			//判断如果改变的是加班工资和奖金，则用应发工资-加班工资和奖金=基本工资
			var yfgz=$(edr[11].target).val();
			if(null!=yfgz&&yfgz!=""&&null!=newval&&newval!=""){
				var jbgz=yfgz-newval;
				$(edr[9].target).val(jbgz.toFixed(2));
			}
		}else if(tfield=="qtkk"){
			//判断如果改变的是其他扣款，则  总工资=应发工资+劳护补贴+费用补贴+满勤-其他扣款
			var yfgz=$(edr[11].target).val();//应发工资
			var lhbt=$(edr[12].target).val();//劳护补贴
			var fybt=$(edr[12].target).val();//费用补贴
			var mq=$(edr[14].target).val();//满勤
			var qtkk=$(edr[15].target).val();//其他扣款
			var zgz=parseFloat(yfgz)+parseFloat(lhbt)+parseFloat(fybt)+parseFloat(mq)-parseFloat(newval);
			$(edr[16].target).val(zgz.toFixed(2));
			var yfgzy=$(edr[17].target).val();
			var sygz=zgz-parseFloat(yfgzy);
			$(edr[18].target).val(sygz.toFixed(2));
		}else if(tfield=="yfgzy"){
			//判断如果改变的是预发工资，剩余工资=总工资-预发工资
			var zgz=$(edr[16].target).val();
			var sygz=zgz-parseFloat(newval);
			$(edr[18].target).val(sygz.toFixed(2));
		}
	}
	
}

function tempSaveData(data){
	var transfer_to_par = JSON.stringify(data);
	if(data.xm==""){
		alert("数据不完整，不能保存,请填写姓名!");
		return;
	}
	
	$.ajax({
		   type: "POST",
		   url: "sgxmAction_saveInfo",
		   async:false,
		   data: "data="+transfer_to_par,
		   success: function(data){
			   if(data){
				   parent.layer.msg('保存成功!',{icon: 1,time:1000});
			   }else{
				   parent.layer.msg('保存失败!',{icon: 5,time:10000});
			   }
		   }
		});
}
//删除数据
function delInfo(id,index){
	$.ajax({
		   type: "POST",
		   url: "sgxmAction_delInfo",
		   async:false,
		   data: "id="+id,
		   success: function(data){
			   if(data){
				   datagrid.datagrid('deleteRow',index);
				   parent.layer.msg('删除成功!',{icon: 1,time:1000});
			   }else{
				   parent.layer.msg('删除失败!',{icon: 5,time:10000});
			   }
		   }
		});
}

function load(username,sgxm,departmentname,yuefen){
	datagrid.datagrid("load", { 
		username:username,
		sgxm:sgxm,
		departmentname:departmentname,
		yuefen:yuefen
	});
}


function showContents(value,row,index){
	if(value==undefined||value==''){
		return '';
	}else{
		return '<span title=\"' + value + '\" class="easyui-tooltip">' + value + '</span>';  
	}
}


function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
}
//用于生成uuid
function guid() {
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}



</script>
</head>
<body>

<table id="datagrid" fit="true" fitColumns="true" title="项目工资明细" class="easyui-datagrid" style="height: auto; width: auto;"  
        url=""  
        singleSelect="true" iconCls="icon-save" rownumbers="true" pageSize="${ipagesize}" pageList="${ipagelist}" pagination="true">  
    <thead>  
        <tr >  
        	<th rowspan="2" field="id"  data-options="editor:{type:'text'},hidden:'true'" align="center" >id</th>
            <th rowspan="2" field="xm" data-options="editor:{type:'text'},width:80" align="center" >姓名</th>  
            <th rowspan="2" field="yf" data-options="editor:{type:'text'},width:80" align="center" >月份</th>  
            <th rowspan="2" field="gd" data-options="editor:{type:'text'},width:80" align="center"  >工地</th>  
        	<th rowspan="2" field="sgxm" data-options="editor:{type:'text'},width:65,resizable:'true',formatter:showContents" align="center" >施工项目</th>
            <th colspan="3"  >出勤明细</th>
            <th rowspan="2" field="gjby" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >工价/包月</th>  
            <th rowspan="2" field="jbgz" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >基本工资</th>  
            <th rowspan="2" field="jbgzhjj" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >加班工资和奖金</th>  
            <th rowspan="2" field="yfgz" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >应发工资</th>  
            <th rowspan="2" field="lhbt" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >劳护补贴</th>  
            <th rowspan="2" field="fybt" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >费用补贴（元）</th>  
            <th rowspan="2" field="mq" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >满勤</th>  
            <th rowspan="2" field="qtkk" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >其他扣款</th> 
            <th rowspan="2" field="zgz" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >总工资（元）</th>
            <th rowspan="2" field="yfgzy" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >预付工资（元）</th>
            <th rowspan="2" field="sygz" data-options="editor:{type:'numberbox',options:{precision:2}},width:65,resizable:'true'" align="center" >剩余工资（元）</th>
            <th rowspan="2" field="qz" data-options="editor:{type:'text'},width:65,resizable:'true',formatter:showContents" align="center" >签字</th>
            <th rowspan="2" field="bz" data-options="editor:{type:'text'},width:65,resizable:'true',formatter:showContents" align="center" >备注</th>
        </tr>  
        <tr>
            <th field="chuqin" data-options="editor:{type:'numberbox',options:{precision:1}},width:65" align="center">出勤（h）</th>  
            <th field="jiaban" data-options="editor:{type:'numberbox',options:{precision:1}},width:65"  align="center">加班（h）</th>  
            <th field="zonggongshi" data-options="editor:{type:'numberbox',options:{precision:1}},width:65" align="center">总工时（h）</th>  
        </tr>
    </thead>  
</table> 

</body>
</html>