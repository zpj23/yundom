<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
		<link rel="stylesheet" href="css/default.css" type="text/css" />

<script type="text/javascript">


   $().ready(function (){
	   initDept('${selectid}');
   });
   
   function initDept(deptids){
	   var ids = deptids.split(",");
	   var obj = document.getElementsByName("dept");
	   for(var i=0;obj.length;i++){
		   if(deptids.indexOf(obj[i].value.split("_")[0])>-1){
			   obj[i].checked = true;
		   }
	   }
	   
   }
		
	
	function chooseDept(val){
		var obj = document.getElementsByName("dept");
		 var str1="";var str2="";
		for(var i=0;obj.length;i++){
			if(obj[i].checked){
				var a = obj[i].value.split("_");
				str1+=a[0]+',';
				str2+=a[1]+',';
				$("#selectid").val(str1);
				$("#selectname").val(str2);
			}
		}
	}
	
	
	</script>
	
	
</head>
<body>
   
 <div class="content_wrap" >
      <c:forEach items="${deptList}" var="a" varStatus="t">
        <input type="checkbox" value="${a[0]}_${a[1]}" name="dept" onclick="chooseDept(this.value);" />${a[1]}
        <c:if test="${(t.index+1) mod 3 eq 0 }"><br></c:if>
      </c:forEach>    
				
		<input type="hidden"  id="selectid"  value="${selectid}" />
	  <input type="hidden"  id="selectname"  value="${selectname}" />
	  <input type="hidden"  id="tagid"  value="${tagid}" />
	  <input type="hidden"  id="tagname"  value="${tagname}" />
	  <input type="hidden"  id="isone"  value="${isone}" />
	  <input type="hidden" id="isopen"  value="${isopen}" />
	  			
</div>

</body>
</html>