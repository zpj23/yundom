

//点击新增系统
function toAddSystem(){	
	$("#title").val("");
	$("#url").val("");
	$("#funOrder").val("");
	var operateType = $('input[name="operateType"]');
	for(var i=0;i<operateType.length;i++){
		operateType[i].checked=false;
	}
	$("#remark").val("");
	var isDisable = $('input[name="isDisable"]');
	for(var i=0;i<isDisable.length;i++){
		isDisable[i].checked=false;
	}
	var isPopup = $('input[name="isPopup"]');
	for(var i=0;i<isPopup.length;i++){
		isPopup[i].checked=false;
	}	
	$("#id").val("");
	$("#parentFunid").val(0);
}


//新增子功能
function toAddFunction(){	
	var zTree = $.fn.zTree.getZTreeObj("treeDiv");
    var treeNode = zTree.getSelectedNodes()[0];
    	
	$("#parentFunid").val(treeNode.id);
	$("#title").val("");
	$("#url").val("");
	$("#funOrder").val("");
	var operateType = $('input[name="operateType"]');
	for(var i=0;i<operateType.length;i++){
		operateType[i].checked=false;
	}
	$("#remark").val("");
	var isDisable = $('input[name="isDisable"]');
	for(var i=0;i<isDisable.length;i++){
		isDisable[i].checked=false;
	}
	var isPopup = $('input[name="isPopup"]');
	for(var i=0;i<isPopup.length;i++){
		isPopup[i].checked=false;
	}
	$("#id").val("");
}


//获取选中的功能项信息
function getFunid(id){	
	functionDwr.showOneFunction(id,function (data){		
		$("#title").val(data.title);
		$("#url").val(data.url);
		$("#funOrder").val(data.funOrder);
		var operateType = $('input[name="operateType"]');
		for(var i=0;i<operateType.length;i++){
			//if(operateType[i].value==data.operateType){
			if(data.operateType!=null&&data.operateType.indexOf(','+operateType[i].value+',')>-1){
				operateType[i].checked=true;
			}else{
				operateType[i].checked= false;
			}
		}
		$("#remark").val(data.remark);		
		var isDisable = $('input[name="isDisable"]');
		for(var i=0;i<isDisable.length;i++){
			if(isDisable[i].value==data.isDisable){
				isDisable[i].checked=true;
			}else{
				isDisable[i].checked= false;
			}
		}		
		var isPopup = $('input[name="isPopup"]');
		for(var i=0;i<isPopup.length;i++){
			if(isPopup[i].value==data.isPopup){
				isPopup[i].checked=true;
			}else{
				isPopup[i].checked= false;
			}
		}
		$("#parentFunid").val(data.parentFunid);
		$("#id").val(data.id);
		
	});	
}


//执行新增
function saveFunction(fun){	
	$(fun).validate({  
		rules : { 
			"title" : {
				required : [ "父结点" ]
			},
			"funOrder" : {
				digits : [ "排序" ]
			}	
		},  
		// 验证通过时的处理
		success : function() { 
		},
		errorPlacement : function(error, element) { 
			error.appendTo(element.parent());
		},
		focusInvalid : false,
		onkeyup : false
	});	
	
	var isSubmit = $(fun).validate().form();  
	if(isSubmit){
		var funinfo = new Array();	
		
		var id_ = $("#id").val();
		var title_ = $("#title").val();
		var url_ = $("#url").val();
		var funOrder_ = $("#funOrder").val();
		var operateType = $('input[name="operateType"]');
		var operateType_=",";
		for(var i=0;i<operateType.length;i++){
			if(operateType[i].checked){
				operateType_=operateType_+operateType[i].value+",";
			}
		}
		if(operateType_==","){
			operateType_="";
		}
		var remark_ = $("#remark").val();		
		var isDisable = $('input[name="isDisable"]');
		var isDisable_ ; 
		for(var i=0;i<isDisable.length;i++){
			if(isDisable[i].checked){
				isDisable_=isDisable[i].value;
			}
		}		
		var isPopup = $('input[name="isPopup"]');
		var isPopup_ ;
		for(var i=0;i<isPopup.length;i++){
			if(isPopup[i].checked){
				isPopup_=isPopup[i].value;
			}
		}
		
		var parentFunid_ = $("#parentFunid").val();
		
		funinfo[0]={
				id : id_,
				title : title_ ,
				url : url_ ,
				funOrder : funOrder_,
				operateType : operateType_,
				remark : remark_,
				isDisable : isDisable_,
				isPopup : isPopup_,
				parentFunid : parentFunid_
		};
		
		functionDwr.saveFunction(funinfo,function (data1){
			if(data1=='0'){
				alert('保存失败');
			}else{				
				var functionid = data1.split("_")[0];  //返回的主键
				var operateStatus =data1.split("_")[1]; //返回的操作状态
				
				$("#id").val(functionid);				
				
				var zTree = $.fn.zTree.getZTreeObj("treeDiv");
				var funcon = "getFunid('"+functionid+"')";
				var treeNode = zTree.getSelectedNodes()[0];
				if(operateStatus=='add'){
				if(parentFunid_==0){
					zTree.addNodes(null, {id:functionid, pId:parentFunid_, 
			        	name:title_,click:funcon});
				}else{
					
					zTree.addNodes(treeNode, {id:functionid, pId:parentFunid_, 
			        	name:title_,click:funcon});
				}
				}
				if(operateStatus=='update'){		        	
		        	treeNode=zTree.getNodesByParam("id", functionid, null)[0];
		        	treeNode.name = title_;
		 		    zTree.editName(treeNode);				        	
		        }
				alert('保存成功');
		        
			}
			
			
		});	
		
		
	}
	
}

    //删除
	function delFunction(){
		var id = $("#id").val();
		
		functionDwr.delFunction(id,function (data){
			if(data=='1'){
				alert("删除成功");
				var zTree = $.fn.zTree.getZTreeObj("treeDiv");
				  var treeNode = zTree.getSelectedNodes()[0];
				  zTree.removeNode(treeNode);				
			}
			else if(data=='2'){
				alert("存在下级");
			}else{
				alert("删除出错");
			}
			
		});
	}
	
	
	
	//设置角色下的功能点
	function setRoleFunction(){
		var menuids = $("#menuids").val();
		if(menuids==''){
			alert("请选择功能点");
			return false;
		}
		if(confirm("您确定保存吗?")){
		form1.action ="functionAction_setRoleFunction";
		form1.submit();
		}
	}
	
	
	
	function backRoleList(){
		form1.action ="roleAction_toRoleList";
		form1.submit();
	}
