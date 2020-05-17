


//显示该机构下的人员
	function getOneDeptInfo(id) {
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
	





//显示该机构下的人员(另一种形式)
	function getOneDeptInfo2(id) {
		$("#userinfo").empty();
		$.post("orgAction_getOneDeptInfo", {
			id : id
		}, function(data) {
			var obj = eval(data);
			for ( var i = 0; i < obj.length; i++) {
				$("#userinfo").append(
						"<option value='"+obj[i].id+"' >" + obj[i].name
								+ "</option>");
			}
		});
	}

	//选择人员,添加到选择框
	function chooseUser() {
		var iid = $("#selectid").val();
		var name = $.trim($("#userinfo").find("option:selected").text()); //获取Select选择的Text   
		var id = $("#userinfo").val(); //获取Select选择的Value 

		if (("," + iid).indexOf(',' + id + ',') < 0) {
			$("#userinfo2").append(
					"<option value='"+id+"' >" + name + "</option>");

			var iname = $("#selectname").val();
			$("#selectid").val(iid + id + ",");
			$("#selectname").val(iname + name + ",");
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
	
	
	
	//上移
		function moveups(){
			var selectName2=document.getElementById("userinfo2"); 
			for(var i=1;i<selectName2.options.length;i++){
				if (selectName2.options[i].selected==true){		   
					var tempName=selectName2.options[i-1].text;
					var tempUserid=selectName2.options[i-1].value;  
					selectName2.options[i-1].text=selectName2.options[i].text;
					selectName2.options[i-1].value=selectName2.options[i].value;
					selectName2.options[i].text=tempName;
					selectName2.options[i].value=tempUserid;
					
					selectName2.options[i-1].selected=true;
					selectName2.options[i].selected=false;
				}				
		   	}
		}
		//下移
		function movedowns(){
			var selectName2=document.getElementById("userinfo2");
			for(var i=selectName2.options.length-2;i>=0;i--){
				if (selectName2.options[i].selected==true){		   
					var tempName=selectName2.options[i+1].text;
					var tempUserid=selectName2.options[i+1].value;
					selectName2.options[i+1].text=selectName2.options[i].text;
					selectName2.options[i+1].value=selectName2.options[i].value;
					selectName2.options[i].text=tempName;
					selectName2.options[i].value=tempUserid;
					
					selectName2.options[i+1].selected=true;
					selectName2.options[i].selected=false;
				}
		   	}
		}

//全选		
function addAll(){
	var selectName=document.getElementById("userinfo"); 	
	for(var i=1;i<selectName.options.length+1;i++){		   
			var name=selectName.options[i-1].text;
			var id=selectName.options[i-1].value; 
			var iid = $("#selectid").val();
			var iname = $("#selectname").val();
			if (("," + iid).indexOf(',' + id + ',') < 0) {
				$("#userinfo2").append(
						"<option value='"+id+"' >" + name + "</option>");
				
				$("#selectid").val(iid + id + ",");
				$("#selectname").val(iname + name + ",");
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










