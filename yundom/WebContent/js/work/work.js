
//待办处理节点
function dealWork(url){	
	form1.action = url;
	form1.submit();
}

//已办查看详细
function detailWork(url){
	form1.action = url;
	form1.submit();
}


//待办查询
function selectWorkList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "workAction_toWorkList";
	form1.submit();
}

//已办查询
function selectWorkedList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "workAction_toWorkedList";
	form1.submit();
}