<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="js/common/json2.js"></script>

<script type="text/javascript">
var datagrid;
var userids=parent.userids;
$(document).ready(function(){
	datagrid = $('#datagrid');
	datagrid.datagrid({
		url : 'jlUserInfoAction_getUserListJsonByChoose',
		queryParams : {
			
		}
		,
// 		onLoadSuccess:function(data){
// 			var arr=userids.split(",");
// 			for(var i=0;i<data.length;i++){
// 				for(var j=0;j<arr.length;j++){
// 					var did=data[i].id+"";
// 					alert(did+">>>"+arr[j]);
// 					if(did==arr[j]){
// 						console.log(data[i]);
// 						$(this).datagrid('selectRow',i);
// 					}
// 				}
				
// 			}
			
// 		},
		rowStyler:function(rowIndex,rowData){  
            return 'height:55px;';  
        },
        
//         onDblClickRow : function(rowIndex,rowData) {
//         	chooseOne(rowData.id,rowData.username);
// 		},
		idField : 'id',
		frozenColumns : [ [ {
			title : 'id',
			field : 'id',
			width : 50,
			checkbox : true
		} ] ],
		columns : [ [ {
			field : 'username',
			title : '用户名',
			width : 200
		},{
			field : 'loginname',
			title : '登陆名',
			width : 50
		}
		
		] ]
	});
	 var opts = datagrid.datagrid('options');
            var pager = datagrid.datagrid('getPager');
            pager.pagination({
                onSelectPage: function (pageNum, pageSize) {
                    opts.pageNumber = pageNum;
                    opts.pageSize = pageSize;
                    pager.pagination('refresh', {
                        pageNumber: pageNum,
                        pageSize: pageSize
                    });
                    initd();  //从数据库中获取数据，并加载                   
                },
                pageList: [10, 30, 50, 100], //可以设置每页记录条数的列表           
                beforePageText: '第', //页数文本框前显示的汉字           
                afterPageText: '页    共 {pages} 页',
                displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
            });  
	
	 window.setTimeout("initd()",0);
});

function initd(){
	  var page_Number = datagrid.datagrid('options').pageNumber;   //pageNumber为datagrid的当前页码
      var page_Size = datagrid.datagrid('options').pageSize;                 //pageSize为datagrid的每页记录条数
	$.ajax({
		   type: "POST",
		   url: "jlUserInfoAction_getUserListJsonByChoose?page"+page_Number+"&rows="+page_Size,
		   async:true,
		   data: "",
		   success: function(data){
// 			   datagrid.datagrid("loadData",data);
				data=JSON.parse(data);
			   $('#datagrid').datagrid({"onLoadSuccess":function(data){
					var arr=data.rows;
					var uarr=userids.split(",");
					for (var i = 0; i <uarr.length; i++) {
						for(var m=0;m<arr.length;m++){
							if(uarr[i]==parseInt(arr[m].id)){
								$(this).datagrid('selectRow',m);
							}
						}
					};
					
				    
				   
				}}).datagrid("loadData",data);
		   }
		});
	
	
	
           
}

function chooseOne(){
	
	var rowData=datagrid.datagrid("getSelections");
	var userid="";
	var username="";
	for(var m=0;m<rowData.length;m++){
		if(m>0){
			userid+=",";
			username+=",";
		}
		userid +=rowData[m].id;
		username+=rowData[m].username;
		
	}

 	var index = parent.layer.getFrameIndex(window.name);
	parent.choose_user_back(userid,username);
	parent.layer.close(index);
}




</script>
</head>
<body  >
<div class="easyui-panel" style="padding-top:0px;height: 300px;width:600px;border: 0px;">
<table id="datagrid" fit="true" fitColumns="true"
				style="height: 300px; width: auto;" toolbar="" title=""
				pageSize="1000" pageList="${ipagelist}"
				queryParams="" idField="id" border="false"
				rownumbers="true" singleSelect="false" pagination="true">
			</table>
</div>			
<div class="easyui-panel" style="padding-top:20px;height: 50px;border: 0px;text-align:center;">
<!-- <table> -->
<!-- <tr> -->
<!-- <td style="vertical-align: middle;"> -->
				<input type="button"  onclick="chooseOne()" style="" value="&nbsp;&nbsp;提交&nbsp;&nbsp;"/>
<!-- </td> -->
<!-- </tr> -->
<!-- </table> -->
</div>			
</body>
</html>