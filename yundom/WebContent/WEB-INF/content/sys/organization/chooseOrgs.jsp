<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>     
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
		<link rel="stylesheet" href="css/default.css" type="text/css" />
		<link rel="stylesheet" href="js/ztree/css/demo.css" type="text/css">
		<link rel="stylesheet" href="js/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css">
		<script type="text/javascript" src="js/ztree/js/jquery-1.4.4.min.js"></script>
		<script type="text/javascript" src="js/dialog/jquery_dialog.js"></script>
		<script type="text/javascript" src="js/ztree/js/jquery.ztree.core-3.5.js"></script>	
		

<script type="text/javascript">
	
	var setting = {
		data : {
			simpleData : {
				enable : true
			}
		}
	};

	var zNodes = ${orgjson};
	
	$(document).ready(function() {
		$.fn.zTree.init($("#treeMenuDiv"), setting, zNodes);		

	});
	
	
	function Ok(){
	    var deptid = $("#deptid").val();
	    if(deptid!=''){
	      deptid=deptid.substring(0,deptid.length-1); 
	    }
	   var deptname = $("#deptname").val();
	   if(deptname!=''){
	      deptname=deptname.substring(0,deptname.length-1); 
	    }
	   return true+"-"+deptid+"-"+deptname+"-"+"chooseorgs";	  
	
	}
	
	
	//点击选择一个部门

function getOneDeptInfo(id,name){
    var iid =$("#deptid").val();
	if((","+iid).indexOf(','+id+',')<0){
	$("#deptselect").append("<option value='"+id+"' >"+name+"</option>");
	
	var iname = $("#deptname").val();
	$("#deptid").val(iid+id+",");
	$("#deptname").val(iname+name+",");
	 }

   }
	
	
	function canclethisDept(){		 
		var checkText=$("#deptselect").find("option:selected").text();   //获取Select选择的Text   
		var checkValue=$("#deptselect").val();   //获取Select选择的Value   
		
		var iid =$("#deptid").val();
		var iname = $("#deptname").val();
		iid=iid.replace(checkValue+",","");
		iname=iname.replace(checkText+",","");
		$("#deptid").val(iid);
		$("#deptname").val(iname);
		//删除所选项
		$("#deptselect option[value='"+checkValue+"']").remove();	  
	}
	
	</script>
	
	
</head>
<body>
 <div class="content_wrap" >
	<div class="zTreeDemoBackground left"  >
		<ul id="treeMenuDiv" class="ztree"></ul>
	</div>
	<div class="right">
	  <select multiple="multiple" style=" margin-top : 10px; width:200px; height:370px;" id="deptselect" ondblclick="canclethisDept()">
	   <c:forEach items="${selectorgs}" var="a">
	      <option value="${a[0]}">${a[1]}</option>
	    </c:forEach>
	  </select>	  
	</div>
	  <input type="hidden"  id="deptid"  value="${orgids }" />
	  <input type="hidden"  id="deptname"  value="${orgnames }" />
	 
</div>
</body>
</html>