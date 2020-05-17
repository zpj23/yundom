

function getFunid2(id){	
	purviewDwr.findOperateByFunid(id,function(data){
	    var obj = eval(data);
		$.fn.zTree.init($("#treeOperateDiv"), setting, obj);		
		
	});	
}


function getFunid(id){	
	$.post("purviewAction_findOperateByFunid", {
		id : id
	}, function(data) {
		var obj=  eval(data);
		$.fn.zTree.init($("#treeOperateDiv"), setting, obj);
	});
}

//依据功能id显示其各个关系
function findFunctionid(id){
	$.post("purviewAction_initOperateInfo", {
		funid : id
	}, function(data) {
		var obj = data.split("_");
		//角色ids
		$("#roleids").val(obj[0]);
		//角色names
		$("#rolenames").val(obj[1]);
		//机构ids
		$("#parentDeptid").val(obj[2]);
		//机构names
		$("#parentDeptname").val(obj[3]);
		//人员ids
		$("#userids").val(obj[4]);
		//人员names
		$("#usernames").val(obj[5]);
	});
}


//获取选择的功能项
function  getSelectedFunid(){	
	var zTree = $.fn.zTree.getZTreeObj("treeOperateDiv");
    var treeNodes = zTree.getSelectedNodes();
    var funid="";
    for(var i=0;i<treeNodes.length;i++){
    	funid=funid+treeNodes[i].id+",";
    }
    if(funid!=""){
    	funid=funid.substring(0,funid.length-1);
    }	
    return funid;
}

//选择角色(多选)
function chooseRoles(){	
	var funid = getSelectedFunid();
	JqueryDialog.Open('选择角色(多选)', 'roleAction_chooseRoles?funid='+funid, 700, 500);
}

//选择组织机构(多选)
function chooseOrgs(){	
	var funid = getSelectedFunid();
	JqueryDialog.Open('选择组织机构(多选)', 'orgAction_chooseOrgs?funid='+funid, 700, 500);
}

//选择用户(多选)
function chooseUsers(tagid,tagname,type){
	var ids = $("#"+tagid).val();
	var names = $("#"+tagname).val();
	JqueryDialog.Open('选择用户(多选)', 'orgAction_chooseOrgUsers?userids='+ids+'&usernames='+names+'&isone='+type, 900, 500);
}




//保存组织机构关联
function saveOrgs(){
	var id = $("#parentDeptid").val();
	var zTree = $.fn.zTree.getZTreeObj("treeOperateDiv");
    var treeNodes = zTree.getSelectedNodes();
    var funids="";
    for(var i=0;i<treeNodes.length;i++){
    	funids=funids+treeNodes[i].id+",";
    }
    if(funids!=""){
    	funids=funids.substring(0,funids.length-1);
    }else{
    	alert("请选择操作内容");
    	return false;
    }
    	
		$.post("purviewAction_saveOrgs", {
			orgids : id,
			funids : funids
		}, function(data) {
			alert('保存成功');
		});
	}	



//保存用户关联
function saveUsers(){
	var id = $("#userids").val();
	var zTree = $.fn.zTree.getZTreeObj("treeOperateDiv");
    var treeNodes = zTree.getSelectedNodes();
    var funids="";
    for(var i=0;i<treeNodes.length;i++){
    	funids=funids+treeNodes[i].id+",";
    }
    if(funids!=""){
    	funids=funids.substring(0,funids.length-1);
    }else{
    	alert("请选择操作内容");
    	return false;
    }
    
    
    	$.post("purviewAction_saveUsers", {
			userids : id,
			funids : funids
		}, function(data) {
			alert('保存成功');
		});
		
	}	


//保存角色关联
function saveRoles(){
	var id = $("#roleids").val();
	var zTree = $.fn.zTree.getZTreeObj("treeOperateDiv");
    var treeNodes = zTree.getSelectedNodes();
    var funids="";
    for(var i=0;i<treeNodes.length;i++){
    	funids=funids+treeNodes[i].id+",";
    }
    if(funids!=""){
    	funids=funids.substring(0,funids.length-1);
    }else{
    	alert("请选择操作内容");
    	return false;
    }
    	
		$.post("purviewAction_saveRoles", {
			roleids : id,
			funids : funids
		}, function(data) {
			alert('保存成功');
		});
	}

/**
 * 3个关联一起保存
 */
function saveAll(){
	var roleids = $("#roleids").val();
	var orgids = $("#parentDeptid").val();
	var userids = $("#userids").val();
	var zTree = $.fn.zTree.getZTreeObj("treeOperateDiv");
    var treeNodes = zTree.getSelectedNodes();
    var funids="";
    for(var i=0;i<treeNodes.length;i++){
    	funids=funids+treeNodes[i].id+",";
    }
    if(funids!=""){
    	funids=funids.substring(0,funids.length-1);
    }else{
    	alert("请选择操作内容");
    	return false;
    }	
		$.post("purviewAction_saveAll", {
			roleids : roleids,
			orgids : orgids,
			userids : userids,
			funids : funids
		}, function(data) {
			alert('保存成功');
		});
	}



function Ok(){
	return true;
}
	

