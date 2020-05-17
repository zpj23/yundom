<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title>Insert title here</title>
		<link rel="stylesheet" href="css/default.css" type="text/css" />
		<link rel="stylesheet" href="js/ztree/css/chooseUser.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css"
			type="text/css">
		
		<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
		<!--<script type="text/javascript" src="js/dialog/jquery_dialog.js"></script>
		--><script type="text/javascript"
			src="js/ztree/js/jquery.ztree.core-3.5.js"></script>
		<script type='text/javascript' src='dwr/engine.js'></script>
		<script type='text/javascript' src='dwr/util.js'></script>
		<script type='text/javascript' src='dwr/interface/orgService.js'></script>
        <script type="text/javascript" src="js/comm/chooseUser.js"></script>
        <script type="text/javascript" src="js/comm/jsjava-comp.js"></script>
		<script type="text/javascript">
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
		//初始化部门树
		$.fn.zTree.init($("#treeDiv"), setting, zNodes);
        //已选择的人员
        initUser('${userids}','${usernames}');
	});

	function Ok() {
		var isone = $("#isone").val();
		var selectName=document.getElementById("userinfo2");
		if(isone=='n'){//多选
		
		//上下移用户会导致隐藏框字段的顺序不一致，重置后重新赋值
		$("#selectid").val("");
		$("#selectname").val("");
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
		if(isone=='y'){//单选
			if(selectName.options.length>1){
				alert("只能选择一个人!");
				return false;
			}
		}
		var id_ = $("#selectid").val();
		if (id_ != '') {
			id_ = id_.substring(0, id_.length - 1);
		}
		var name_ = $("#selectname").val();
		if (name_ != '') {
			name_ = name_.substring(0, name_.length - 1);
		}	
		
		var tagid =$("#tagid").val();
		var tagname =$("#tagname").val();
		return true + "-" + id_ + "-" + name_ + "-" + "chooseorguser"+ "-" +tagid+ "-" +tagname;
	}
	
	function searchUserBak() {
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
	
	
	function searchUser() {
		var searchname = $("#searchname").val();
		$("#userinfo").empty();
		if($.trim(searchname)!=''){
		$.post("orgAction_searchUser", {
			searchname : searchname
		}, function(data) {
			var obj = eval(data);
			for ( var i = 0; i < obj.length; i++) {
				$("#userinfo").append(
						"<option value='"+obj[i].id+"' >" + obj[i].name
								+ "</option>");
			}
		});
		}
	}
</script>


	</head>
	<body>	   
	 <center> 
		姓名/用户名：<input  type="text" id="searchname" name="searchname" />
		<input type="button" value="查询" onclick="searchUser()">
	 </center>	
	<div class="content_wrap" >
			<div class="Part_1">
			<ul id="treeDiv" class="ztree"></ul>
		</div>
		<div class="Part_2">
			<select multiple="multiple"
				style="margin-top: 10px; width: 200px; height: 370px;"
				id="userinfo" ondblclick="chooseUser()">
				<c:forEach items="${userList}" var="a">
					<option value="${a[0]}">
						${a[1]}
					</option>
				</c:forEach>
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
						<!-- <input type="button" class="btn" name="select555" value="上移"
							onclick="moveups();" /><br><br>						
						<input type="button" class="btn" name="select666" value="下移"
							onclick="movedowns();" /> -->
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
				
				
<input type="hidden" id="selectid" value="${userids}" />
<input type="hidden" id="selectname" value="${usernames}" />
<input type="hidden" id="isone"  value="${isone}" />
<input type="hidden" id="tagid"  value="${tagid}" />
<input type="hidden" id="tagname"  value="${tagname}" />
<input type="hidden" id="isopen"  value="${isopen}" />
	</body>
</html>