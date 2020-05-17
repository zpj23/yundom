//全选按钮的控制
var checkboxFlag=true;
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


//点击查询
function selectList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "roleAction_toRoleList";
	form1.submit();
}



//打开新增角色页面
function addRole(){
	form1.action = "roleAction_toAddRole";
	form1.submit();
}


//选择组织机构(多选)
function chooseOrgs(roleid){
	JqueryDialog.Open('选择组织机构(多选)', 'orgAction_chooseOrgs?roleid='+roleid, 700, 500);
}

//选择子用户(多选)
function chooseOrgUsers(tagid,tagname,type){
	var ids = $("#"+tagid).val();
	var names = $("#"+tagname).val();
	JqueryDialog.Open('选择用户(多选)', 'orgAction_chooseOrgUsers?userids='+ids+'&usernames='+names+'&isone='+type+'&tagid='+tagid+'&tagname='+tagname, 900, 500);
}


//保存角色
function saveRole(role){
	$("#checkcodediv").css("display","none");
	$(role).validate({  
		rules : { 
			"role.rolename" : {
				required : [ "角色名" ]
			},
			"role.rolecode" : {
				required : [ "角色编码" ]
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
	var isSubmit = $(role).validate().form();  	
	if(isSubmit){
		//检查code是否已存在
		var roleid = $("#id").val();
		var rolecode = $("#rolecode").val();
		$.ajax({
			url:"roleAction_checkSamerolecode?rolecode="+rolecode+"&roleid="+roleid, 
			async : false,
			success: function(data) {
			$("#checkSamecode").val(data);
		  }
		});
		if($("#checkSamecode").val()==1){
			$("#checkcodediv").css("display","");
			return false;
		}
	form1.action = "roleAction_doAddRole";
	form1.submit();
	}
}

//跳转到修改页面
function modifyRole(){
	var val = checkSelectBox('checkid','修改');
	if(val!=0){
		//跳转到修改页面
		form1.action = "roleAction_toAddRole?id="+val;
		form1.submit();
	}
}


//删除角色
function delRole(){
	var val = checkSelectBox2('checkid','删除');
	if(val!=0){
		if(confirm('确定要删除吗')){
			form1.action = "roleAction_delRole?id="+val;
			form1.submit();
		}
	}
}


//查看角色信息
function viewRole(){
	var val = checkSelectBox('checkid','查看');
	if(val!=0){
		form1.action = "roleAction_viewRole?id="+val;
		form1.submit();
	}	
}

function viewRole2(val){
		form1.action = "roleAction_viewRole?id="+val;
		form1.submit();
}



function setFunction(roleid){
	form1.action = "functionAction_toSetRoleFunction?roleid="+roleid;
	form1.submit();
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


//返回
function back(){
	window.history.go(-1);
} 