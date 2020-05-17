
function newModel(){	
	//JqueryDialog.Open('新增工作流模型', 'workflowAction_toCreateModel', 700, 300);
	form1.action = "workmodelAction_toCreateModel";
	form1.submit();
}



function saveModel(){
	form1.action = "workmodelAction_doCreateModel";
	form1.submit();
}


//流程挂起/激活
function changeProcessStatus(statusflag,processDefinitionId,num){
	var msg = "您确定挂起该流程吗?";
	if(statusflag=='active'){
		msg="您确定激活该流程吗?";
	}
	if(confirm(msg)){
	 $.post("workflowAction_updateState",
			{state:statusflag,processDefinitionId:processDefinitionId},
		     function(data) {     
		     var obj =data.split('_');
		     
		     var content='';
		     if($.trim(obj[0])=='active'){ 
		    	 content = "False | <a href='javascript:changeProcessStatus(\"suspend\",\""+obj[1]+"\",\""+num+"\")'>挂起</a>";
		     }
             if($.trim(obj[0])=='suspend'){
            	 content = "True | <a href='javascript:changeProcessStatus(\"active\",\""+obj[1]+"\",\""+num+"\")'>激活</a>";
		     }
             
             $("#statustd"+num).html(content);             
			});	
	}
}



// 配置节点下的用户组人员
/*function configUserGroup(groupkey,nodename){
	
	form1.action = "worknodeAction_toConfigUser?groupkey="+groupkey+"&nodename="+nodename;
	form1.submit();
}*/

//选择流程用户(多选)
function chooseOrgUsers(tagid,tagname,type){
	var ids = $("#"+tagid).val();
	var names = $("#"+tagname).val();
	JqueryDialog.Open('选择流程用户(多选)', 'orgAction_chooseNodeUsers?userids='+ids+'&usernames='+names+'&isone='+type, 900, 500);
}


//选择流程角色(多选)
function chooseRoles(tagid,tagname,type){	
	var ids = $("#"+tagid).val();
	var names = $("#"+tagname).val();
	JqueryDialog.Open('选择角色(多选)', 'roleAction_chooseNodeRoles?roleids='+ids+'&rolenames='+names+'&isone='+type+'&tagid='+tagid+'&tagname='+tagname, 700, 500);
}

//选择流程组织机构(多选)
function chooseOrgs(tagid,tagname,type){	
	var ids = $("#"+tagid).val();
	var names = $("#"+tagname).val();
	JqueryDialog.Open('选择组织机构(多选)', 'orgAction_chooseNodeOrgs?orgids='+ids+'&orgnames='+names+'&isone='+type+'&tagid='+tagid+'&tagname='+tagname, 700, 500);
}


//保存用户组与人员的关系
function saveGroupUser(){
	form1.action ="worknodeAction_saveGroupUser";
	form1.submit();
}


function saveNodeUser(){
	form1.action ="worknodeAction_saveNodeUser";
	form1.submit();
}


//删除流程
function delProcess(deploymentId){
	if(confirm('您确定删除该流程吗?')){
		form1.action ="workflowAction_delete?deploymentId="+deploymentId;
		form1.submit();
	}
}

//节点配置人员的不同选择
function changeChoose(num){
	
	if(num==1){
		$("#personDiv").css("display","");
		$("#roleDiv").css("display","none");
		$("#orgDiv").css("display","none");
	}else if(num ==2){
		$("#personDiv").css("display","none");
		$("#roleDiv").css("display","");
		$("#orgDiv").css("display","none");
	}else{
		$("#personDiv").css("display","none");
		$("#roleDiv").css("display","none");
		$("#orgDiv").css("display","");
	}
}



