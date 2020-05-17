<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript">
var transfer_to_par = "";
var datagrid;
var editRow = undefined; //定义全局变量：当前编辑的行
$(document).ready(function(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : '',
		queryParams : {
			
		},
		rowStyler:function(rowIndex,rowData){  
            return 'height:40px;';  
        },
		idField : 'id',
// 		frozenColumns : [ [  ] ],
		columns : [ [ {
			field : 'sgxm',
			title : '施工项目',
			width : 30,
			editor:{
				type:'text'	
			}
			
		},{
			field : 'sgqy',
			title : '施工区域',
			width : 30,
			editor:{
				type:'text'	
			}
			
		},{
			field : 'staffname',
			title : '施工人员',
			width : 30,
			editor:{
				type:'text'	
			}
		},{
			field : 'workcontent',
			title : '工作内容',
			width : 100,
			editor:{
				type:'text'	
			}
		},{
			field : 'workduringtime',
			title : '出勤时间（小时）',
			width : 50,
			editor:{
				type:'numberbox',
				options:{  
			        precision:2  
			    } 
			}
		},{
			field : 'overtime',
			title : '加班时间（小时）',
			width : 50,
			editor:{
				type:'numberbox',
				options:{  
			        precision:2  
			    } 
			}
		},{
			field : 'remark',
			title : '备注',
			width : 100,
			editor:{
				type:'text'	
			}
		}
		] ]
        ,
        toolbar: [{ text: '添加', iconCls: 'icon-add', handler: function () {//添加列表的操作按钮添加，修改，删除等
            //添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
            
            if (editRow != undefined) {
                datagrid.datagrid("endEdit", editRow);
            }
            //添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
            if (editRow == undefined) {
                datagrid.datagrid("insertRow", {
                    index: 0, // index start with 0
                    row: {
                    	workduringtime:8,
                    	overtime:0
                    }
                });
                //将新插入的那一行开户编辑状态
                datagrid.datagrid("beginEdit", 0);
                //给当前编辑的行赋值
                editRow = 0;
            }
        }
        }, '-',
        { text: '复制/添加', iconCls: 'icon-cut', handler: function () {//复制新增
            //添加时先判断是否有开启编辑的行，如果有则把开户编辑的那行结束编辑
            if (editRow != undefined) {
                datagrid.datagrid("endEdit", editRow);
            }
        	//获取当前选中行，准备复制数据
            var rows = datagrid.datagrid("getSelections");
            if (rows.length == 1) {
            	//添加时如果没有正在编辑的行，则在datagrid的第一行插入一行
                if (editRow == undefined) {
                    datagrid.datagrid("insertRow", {
                        index: 0, // index start with 0
                        row: {
                            sgxm:rows[0].sgxm,
                            sgqy:rows[0].sgqy,
                            staffname:rows[0].staffname,
                            workcontent:rows[0].workcontent,
                            workduringtime:rows[0].workduringtime,
                            overtime:rows[0].overtime,
                            remark:rows[0].remark
                        }
                    });
                    //将新插入的那一行开户编辑状态
                    datagrid.datagrid("beginEdit", 0);
                    //给当前编辑的行赋值
                    editRow = 0;
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
                    	 datagrid.datagrid('deleteRow',indexrow1);
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
                     datagrid.datagrid("endEdit", editRow);
                 }
                 //当无编辑行时
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
                 }
             }
         }
         }, '-',
         { text: '保存', iconCls: 'icon-save', handler: function () {
             //保存时结束当前编辑的行，自动触发onAfterEdit事件如果要与后台交互可将数据通过Ajax提交后台
             datagrid.datagrid("endEdit", editRow);
             tempSaveData();
         }
         }],
         onAfterEdit: function (rowIndex, rowData, changes) {
             //endEdit该方法触发此事件
            try{
//              console.info(rowData);
            }catch (e) {
 			}
             editRow = undefined;
         },
         onDblClickRow: function (rowIndex, rowData) {
         //双击开启编辑行
             if (editRow != undefined) {
                 datagrid.datagrid("endEdit", editRow);
             }
             editRow=undefined;
             if (editRow == undefined) {
                 datagrid.datagrid("beginEdit", rowIndex);
                 editRow = rowIndex;
             }
         }
	});
	
});





// function load(datemin,datemax,username,departmentid,sgxm,sgqy,workcontent,shenhe){
// 	datagrid.datagrid("load", { 
// 		datemin:datemin,
// 		datemax:datemax,
// 		username:username,
// 		departmentid:departmentid,
// 		sgxm:sgxm,
// 		sgqy:sgqy,
// 		workcontent:workcontent,
// 		shenhe:shenhe
// 	});
// }


function tempSaveData(){
	datagrid.datagrid("endEdit", editRow);
	var arr = datagrid.datagrid("getRows");
	transfer_to_par = JSON.stringify(arr);
}

</script>
</head>
<body>
<table id="datagrid" fit="true" fitColumns="true"
				style="height: auto; width: auto;" toolbar="" title=""
				pageSize="1" pageList="${ipagelist}"
				queryParams="" idField="id" border="false"
				rownumbers="true" singleSelect="true" pagination="true" >
			</table>
</body>
</html>