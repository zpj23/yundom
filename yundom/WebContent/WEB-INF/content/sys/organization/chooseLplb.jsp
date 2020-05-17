<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="css/default.css" type="text/css" />
<link rel="stylesheet" href="js/ztree/css/chooseUser.css" type="text/css">
<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
<script type="text/javascript" src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
<script type='text/javascript' src='dwr/engine.js'></script>
<script type='text/javascript' src='dwr/util.js'></script>
<script type='text/javascript' src='dwr/interface/orgService.js'></script>
      <script type="text/javascript" src="js/comm/jsjava-comp.js"></script>

<script type="text/javascript">	
	var tagid = '${tagid}';
	var tagname = '${tagname}';
	var isone = '${isone}';
	
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		},
		async: {  
	        enable:true, //设置zTree开启异步加载模式,默认值为false(默认为异步的POST请求)  
	        url   :'orgAction_showChildNode',
	        autoParam:["id"]
		}
	};

	var zNodes = ${orgjson};
	
	$(document).ready(function() {
		$.fn.zTree.init($("#treeDiv"), setting, zNodes);
		initUser('${selectid}','${selectname}');
	});
	
	//已选择的人员
	function initOrg(userids,usernames){alert(userids+usernames);
		$("#deptselect").empty();
		if(userids!=''){
			var ids = userids.split(",");
			var names = usernames.split(",");
			for(var i=0;i<ids.length;i++){
				if(ids[i]!=''){
					$("#deptselect").append(
							"<option value='"+ids[i]+"' >" + names[i] + "</option>");
				}
		    }
		}
	}
	
	
	//已选择的人员
	function initUser(userids,usernames){
		if(userids!=''){
			$("#userinfo2 option[value='']").remove();
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
	
	//点击选择一个机构获取同级部门
	function getOneDeptInfo(id,name,code){
		$("#deptselect").empty();
		$.post("userAction_findSameDeptByOrgid",{orgid:id},function (data_){
			var data = JSON.parse(data_);
			$("#orgname").val(data.orgname);
			$("#orgcode").val(data.orgcode);
			var obj = data.deptinfo;
			$("#deptselect").append(
					"<option value='"+code+"-' >" + name+ "</option>");
			for(var i=0;i<obj.length;i++){
				$("#deptselect").append(
						"<option value='"+code+"-"+obj[i].code+"' >" +name+obj[i].name + "</option>");
		     }
		});		
	}

	
	function chooseOneDept(){
			var checkText = $("#deptselect").find("option:selected").text(); //获取Select选择的Text   
			var checkValue = $("#deptselect").val(); //获取Select选择的Value
			
			$("#selectid").val($("#orgcode").val()+"-"+checkValue);
			if(checkValue!=""){
			   $("#selectname").val($("#orgname").val()+checkText);
			}else{
			   $("#selectname").val($("#orgname").val());
			}
	 }
	</script>
	<script type="text/javascript">
	
	function chooseUser(){
		
		$("#userinfo2 option[value='']").remove();
		
		var iid = $("#selectid").val();
		var name = $.trim($("#deptselect").find("option:selected").text()); //获取Select选择的Text   
		var id = $("#deptselect").val(); //获取Select选择的Value		
		if (("," + iid).indexOf(',' + id + ',') < 0) {
			$("#userinfo2").append(
					"<option value='"+id+"' >" + name + "</option>");
			var iname = $("#selectname").val();
			$("#selectid").val(iid + id + ",");
			$("#selectname").val(iname + name + ",");
		}
	}
	
	//全选		
	function addAll(){
		var selectName=document.getElementById("deptselect");
		$("#userinfo2 option[value='']").remove();
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
		$("#userinfo2 option[value='"+checkValue+"']").remove();
	}
	
	</script>
	
</head>
<body>
       <div class="content_wrap" >
           <div class="Part_1" style=" margin-left : 20px;">					
				<ul id="treeDiv" class="ztree"></ul>
			</div>
				
			<div class="Part_2">
					  <select multiple="multiple" style=" margin-top : 10px; width:200px; height:370px;" id="deptselect"  ondblclick="chooseUser()" >
					    <option  value="${parentDeptid}">${parentDeptname}</option>
					  </select>
			</div>	
			
			<div class="Part_3">
				<table cellspacing="0" cellpadding="0" border="0">
					<tr>
						<td>
							<div>
								<input type="button" class="btn" name="select111" value="选择"
									onclick="chooseUser();" /><br><br>							
								<input type="button" class="btn" name="select222" value="删除"
									onclick="cancelUser();" /><br><br>
								<input type="button" class="btn" name="select333" value="全选"
									onclick="addAll();" /><br><br>						
								<input type="button" class="btn" name="select444" value="全删"
									onclick="delAll();" /><br><br>
							</div>
						</td>
					</tr>
				</table>
		   </div>
		   
			<div class="Part_4">
				<select multiple="multiple"
					style="margin-top: 10px; width: 200px; height: 370px;"
					id="userinfo2" ondblclick="cancelUser()">
					<c:forEach items="${selectusers}" var="a">
						<option value="${a[0]}">
							${a[1]}
						</option>
					</c:forEach>
				</select>
			</div>
		</div>		
	  <input type="hidden"  id="selectid"  value="${selectid}" />
	  <input type="hidden"  id="selectname"  value="${selectname}" />
	  <input type="hidden"  id="tagid"  value="${tagid}" />
	  <input type="hidden"  id="tagname"  value="${tagname}" />
	  <input type="hidden"  id="isone"  value="${isone}" />		
	  <input type="hidden" id="isopen"  value="n" />
	  
	  <input type="hidden" id="orgname"  value="" />
	  <input type="hidden" id="orgcode"  value="" />	

</body>
</html>