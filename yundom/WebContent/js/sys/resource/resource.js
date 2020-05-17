var checkboxFlag = true;
function allCheck2(cssClass) {// ie 有效
	$("." + cssClass).attr("checked", checkboxFlag);
	checkboxFlag = !checkboxFlag;
}
//全选按钮的控制
function allCheck(cssClass) {
	$("." + cssClass).attr("checked", checkboxFlag);
	var obj = $('input[name="checkid"]');
	if(checkboxFlag){
		for(var i=0;i<obj.length;i++){
			obj[i].checked = true;
		}
	}else{
		for(var i=0;i<obj.length;i++){
			obj[i].checked = false;
		}
	}	
	checkboxFlag = !checkboxFlag;	
}


//点击查询按钮(一级数据)
function selectList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "resourceAction_listLevel1";
	form1.submit();
}

//至新增数据的页面
function addRes(){
	form1.action = "resourceAction_toAddRescource";
	form1.submit();
	
}


//控制二级下拉框的显隐
function chooseLevel(obj){
	if(obj.value==2){
		$("#level2tr").css("display","");
	}else{
		$("#level2tr").css("display","none");
	}
}


//保存/编辑数据
function saveRes(res){
	$("#checkcodediv").css("display","none");
		$(res).validate({  
			rules : { 
				"restype.typeName" : {
					required : [ "类型名称" ]
				},
				"restype.typeCode" : {
					required : [ "类型代码" ]
				},
				"restype.parentTypeid" : {
					required : [ "类型上级" ]
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
		var isSubmit = $(res).validate().form();  
		if(isSubmit){
			//父级id为int型不能为空字符串			
			if($("#parentTypeid").val()==''){
				$("#parentTypeid").val("0");
			}	
			
			//检查code是否已存在
			var typeid = $("#id").val();
			var typecode = $("#typeCode").val();
			$.ajax({
				url:"resourceAction_checkSametypecode?typecode="+typecode+"&typeid="+typeid, 
				async : false,
				success: function(data) {
				$("#checkSamecode").val(data);
			  }
			});
			if($("#checkSamecode").val()==1){
				$("#checkcodediv").css("display","");
				return false;
			}
			
		form1.action = "resourceAction_doAddRescource";
		form1.submit();
		}
}


//修改
function modifyRes(){	
	var val = checkSelectBox('checkid','修改');
	if(val!=0){
		//跳转到修改页面
		form1.action = "resourceAction_toAddRescource?id="+val;
		form1.submit();
	}
}


//删除
function delRes(){
	var val = checkSelectBox('checkid','删除');
	if(val!=0){
		$.post("resourceAction_checkChildData?id="+val, 
			     function(data) {     
			       if(data==1){
			    	   alert("该项有下级元素，不能删除");
			    	   return false;
			       }else{
			    	   if(confirm('确定要删除吗')){
			   			form1.action = "resourceAction_delRescource?id="+val;
			   			form1.submit();
			   		}
			       }
				});
		
	}	
}



//验证
function checkSelectBox(idname,msg){	
	var checkids = $('input[name="'+idname+'"]');
	var checknum=0;
	var checkvalue;
	for(var i=0;i<checkids.length;i++){
		if(checkids[i].checked){
			checkvalue = checkids[i].value;
			checknum++;
			}		
	}
	if(checknum==0){
		alert("请选择"+msg+"项");
		return 0;
	}else if(checknum>1){
		alert("一次只能"+msg+"一项");
		return 0;
	}else{
		return checkvalue;
	}	
}


function checkSelectBox2(idname,msg){	
	var checkids = $('input[name="'+idname+'"]');
	var checknum=0;
	var checkvalue="";
	for(var i=0;i<checkids.length;i++){
		if(checkids[i].checked){
			checkvalue += checkids[i].value+",";
			checknum++;
			}		
	}
	if(checknum==0){
		alert("请选择"+msg+"项");
		return 0;
	}else{
		checkvalue=checkvalue.substring(0,checkvalue.length-1);
		return checkvalue;
	}	
}


//查看详细页面
function viewRes(){
	var val = checkSelectBox('checkid','查看');
	if(val!=0){
		form1.action = "resourceAction_viewRescource?id="+val;
		form1.submit();
	}	
}

function viewRes2(val){
		form1.action = "resourceAction_viewRescource?id="+val;
		form1.submit();
}


//点击查询按钮(二级数据)
function selectList2(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "resourceAction_listLevel2";
	form1.submit();
}


//查看下级分类
function viewChild(id){
	//清空选择项
	$("#selectName").val("");
	$("#selectCode").val("");
	//将上级id传入下级列表页面
	$("#pid").val(id); 
	form1.action = "resourceAction_listLevel2";
	form1.submit();
}


//返回
function back(){
	window.history.go(-1);
} 


//点击新增根节点
function toAddRoot(){	
	$("#parentName").val("无");
	$("#parentItemid").val("");
	$("#itemName").val("");
	$("#itemCode").val("");
	$("#itemOrder").val("");
	$("#remark").val("");	
	$("#id").val("");
}


//新增子项
function toAddItem(){	
	var zTree = $.fn.zTree.getZTreeObj("treeDiv");
    var treeNode = zTree.getSelectedNodes()[0];
    
	$("#parentName").val(treeNode.name);
	$("#parentItemid").val(treeNode.id);
	$("#itemName").val("");
	$("#itemCode").val("");
	$("#itemOrder").val("");
	$("#remark").val("");
	$("#id").val("");
}


//获取选中的字典项信息
function getTypeid(id){	
	resourceDwr.showOneItem(id,function (data){		
		if(data.parentItemid==null){
			$("#parentName").val("无");
		}else{
			//$("#parentName").val(data.parentItemid);
			$("#parentName").val(data.parentItemname);
		}
		$("#itemName").val(data.itemName);
		$("#itemCode").val(data.itemCode);
		$("#itemOrder").val(data.itemOrder);
		$("#remark").val(data.remark);	
		$("#id").val(data.id);	
		$("#parentItemid").val(data.parentItemid);
	});	
}


//执行新增
function dealItem(item){	
	$(item).validate({  
		rules : { 
			"parentName" : {
				required : [ "父结点" ]
			},
			"itemCode" : {
				required : [ "代码" ]
			},
			"itemName" : {
				required : [ "名称" ]
			},
			"itemOrder" : {
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
	
	var isSubmit = $(item).validate().form();  
	if(isSubmit){
		var iteminfo = new Array();		
		var id_ = $("#id").val();
		var itemName_ = $("#itemName").val();
		var itemCode_ = $("#itemCode").val();
		var itemOrder_ = $("#itemOrder").val();
		var remark_ = $("#remark").val();
		var parentItemid_ = $("#parentItemid").val();
		var typeid_ = $("#pid").val();
		
		iteminfo[0]={
				id : id_,
				itemName : itemName_ ,
				itemCode : itemCode_ ,
				itemOrder : itemOrder_,
				remark : remark_,
				parentItemid : parentItemid_,
				typeid : typeid_
		};
		
		resourceDwr.saveItem(iteminfo,function (data1){
			if(data1=='0'){
				alert('保存失败');
			}else if(data1=='1'){
				alert('编码已存在,请重新输入');
			}else{				
				var itemid = data1.split("_")[0];  //返回的主键
				var operateStatus =data1.split("_")[1]; //返回的操作状态
				
				$("#id").val(itemid);				
				
				var zTree = $.fn.zTree.getZTreeObj("treeDiv");
				var funcon = "getTypeid('"+itemid+"')";
				var treeNode = zTree.getSelectedNodes()[0];
				if(operateStatus=='add'){
				if(parentItemid_==''){
					zTree.addNodes(null, {id:itemid, pId:parentItemid_, 
			        	name:itemName_,click:funcon});
				}else{
					
					zTree.addNodes(treeNode, {id:itemid, pId:parentItemid_, 
			        	name:itemName_,click:funcon});
				}
				}
				if(operateStatus=='update'){		        	
		        	treeNode=zTree.getNodesByParam("id", itemid, null)[0];
		        	treeNode.name = itemName_;
		 		    zTree.editName(treeNode);				        	
		        }
				alert('保存成功');
						        
			}	
		});	
	}	
}

    //删除
	function delItem(){
		var id = $("#id").val();		
		resourceDwr.delItem(id,function (data){
			if(data=='1'){
				var zTree = $.fn.zTree.getZTreeObj("treeDiv");
				  var treeNode = zTree.getSelectedNodes()[0];
				  zTree.removeNode(treeNode);	
				  alert('删除成功');
			}else if(data=='2'){
				alert("存在下级");
			}else{
				alert("删除失败");
			}			
		});
	}
