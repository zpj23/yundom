


//显示该机构下的人员
/**	function getOneDeptInfo2(id) {
		orgService.showUserOfOrg(id, function(data) {
			$("#userinfo").empty();
			var obj = eval(data);
			for ( var i = 0; i < obj.length; i++) {
				$("#userinfo").append(
						"<option value='"+obj[i].id+"' >" + obj[i].name
								+ "</option>");
			}
		});
	}
*/	
	
	/**
	function search() {
		var searchname = $("#searchname").val();
		if($.trim(searchname)!=''){
		orgService.showUserOfSearchname(searchname, function(data) {
			$("#userinfo").empty();
			var obj = eval(data);
			for ( var i = 0; i < obj.length; i++) {
				$("#userinfo").append(
						"<option value='"+obj[i].id+"' >" + obj[i].name
								+ "</option>");
			}
		});
		}
	}	
	*/





//显示该机构下的部门
var orgcode,orgname;
	function getOneDeptInfo(id,name,code) {orgcode=code;orgname=name;
		$("#userinfo").empty();
		$.post("orgAction_chooseDeptData", {
			orgid : id
		}, function(data) {
			var obj = eval(data);
			for ( var i = 0; i < obj.length; i++) {
				$("#userinfo").append(
						"<option value='"+obj[i].code+"' >" + obj[i].name
								+ "</option>");
			}
		});
	}

	//选择机构部门,添加到选择框
	function chooseUser() {
		
		var iid = $("#selectid").val();
		var name = $.trim($("#userinfo").find("option:selected").text()); //获取Select选择的Text   
		var id = $("#userinfo").val(); //获取Select选择的Value 

		if (("," + iid).indexOf(',' + orgcode+"_"+id + ',') < 0) {
			$("#userinfo2").append(
					"<option value='"+orgcode+"_"+id+"' >" + orgname+name + "</option>");

			var iname = $("#selectname").val();
			$("#selectid").val(iid + orgcode+"_"+id + ",");
			$("#selectname").val(iname + orgname+""+name + ",");
		}
	}

	//去除已选人员
	function cancelUser() {
		var checkText = $("#userinfo2").find("option:selected").text(); //获取Select选择的Text   
		var checkValue = $("#userinfo2").val(); //获取Select选择的Value   

		var iid = $("#selectid").val();
		var iname = $("#selectname").val();
		iid = iid.replace(checkValue + ",", "");
		iname = iname.replace(checkText + ",", "");
		$("#selectid").val(iid);
		$("#selectname").val(iname);
		//删除所选项
		$("#userinfo2 option[value='" + checkValue + "']").remove();
	}
	

//全选		
function addAll(){
	var selectName=document.getElementById("userinfo"); 	
	for(var i=1;i<selectName.options.length+1;i++){		   
			var name=selectName.options[i-1].text;
			var id=selectName.options[i-1].value; 
			var iid = $("#selectid").val();
			var iname = $("#selectname").val();
			if (("," + iid).indexOf(',' + orgcode+"_"+id + ',') < 0) {
				$("#userinfo2").append(
						"<option value='"+orgcode+"_"+id+"' >" + orgname+name + "</option>");
				
				$("#selectid").val(iid + orgcode+"_"+id + ",");
				$("#selectname").val(iname + orgname+""+name + ",");
			}
		}				
   	}
	
	
//全删
function delAll(){
	//情况选择项
	$("#userinfo2").empty();
	//情况值
	$("#selectid").val("");
	$("#selectname").val("");
}


//已选择的人员
function initUser(userids,usernames){
	if(userids!=''){
		var ids = userids.split(",");
		var names = usernames.split(",");
		for(var i=0;i<ids.length;i++){
			if(ids[i]!=''){
				$("#userinfo2").append(
						"<option value='"+ids[i]+"' >" + names[i] + "</option>");
			}			
		}
	}
}










