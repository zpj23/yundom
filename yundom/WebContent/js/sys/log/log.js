


function selectLogList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "logAction_toLogList";
	form1.submit();	
	
}


