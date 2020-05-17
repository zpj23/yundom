<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
		<link rel="stylesheet" href="css/default.css" type="text/css" />
		<link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="js/ztree/js/jquery.ztree.core-3.5.js"></script>		
		<script language="JavaScript" src="js/jquery/jquery.validate.js"></script>
		<script language="JavaScript" src="js/jquery/messages_cn.js"></script>	

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
		 initOrg('${selectid}','${selectname}');
	});
	
	//已选择的人员
	function initOrg(userids,usernames){
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
	
	
	//点击选择一个机构获取同级部门
	function getOneDeptInfo(id,name,code){
		$("#deptselect").empty();
		$.post("userAction_findSameDeptByOrgid",{orgid:id},function (data_){
			var data = JSON.parse(data_);
			$("#orgname").val(data.orgname);
			$("#orgcode").val(data.orgcode);
			var obj = data.deptinfo;
			$("#deptselect").append(
					"<option value='' >" + name+ "</option>");
			for(var i=0;i<obj.length;i++){
					$("#deptselect").append(
							"<option value='"+obj[i].code+"' >" + obj[i].name + "</option>");
		     }
		});		
	}

	
	function chooseOneDept(){
			var checkText = $("#deptselect").find("option:selected").text(); //获取Select选择的Text   
			var checkValue = $("#deptselect").val(); //获取Select选择的Value
			//alert(checkText+".."+checkValue);
			$("#selectid").val($("#orgcode").val()+"-"+checkValue);
			
			if(checkValue!=""){
			   $("#selectname").val($("#orgname").val()+checkText);
			}else{
			   $("#selectname").val($("#orgname").val());
			}
	}
	</script>
	
	
</head>
<body>
 <div class="content_wrap" >
           <div class="Part_1" style=" margin-left : 20px;">
					<div class="zTreeDemoBackground left"  >
						<ul id="treeDiv" class="ztree"></ul>
					</div>
			</div>
				
			<div class="Part_2">
					  <select multiple="multiple" style=" margin-top : 10px; width:200px; height:370px;" id="deptselect" onclick="chooseOneDept()">
					    <option value="${parentDeptid}">${parentDeptname} </option>
					  </select>
			</div>	
				
	  <input type="hidden"  id="selectid"  value="${selectid}" />
	  <input type="hidden"  id="selectname"  value="${selectname}" />
	  <input type="hidden"  id="tagid"  value="${tagid}" />
	  <input type="hidden"  id="tagname"  value="${tagname}" />
	  <input type="hidden"  id="isone"  value="${isone}" />	
	  <input type="hidden"  id="ischild"  value="${ischild}" />		
	  <input type="hidden" id="isopen"  value="${isopen}" />
	  
	  <input type="hidden" id="orgname"  value="" />
	  <input type="hidden" id="orgcode"  value="" />	
</div>
</body>
</html>