<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<script type="text/javascript" src="js/comm/judgeBrowse.js"></script>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
 // 确定选择的图片
 function  quedingpic(url){//alert(url);
	 var parm= judgeWeb();
	 if(parm==0){//ie
		 var num =window.parent.CenterTab.getSelectTabId();
		 var obj = parent.window.frames["ContentBottomiframe_"+num].document;	 
		 obj.frames["cc"].document.getElementById("imgurl").src=url;
		 obj.frames["cc"].document.getElementById("pictureurl").value=url;
	     common.closeWindow(null);
	 }else if(parm==2){
		 var num =window.parent.CenterTab.getSelectTabId();
		 var obj= parent.window.frames["ContentBottomiframe_"+num].contentDocument||window.frames["ContentBottomiframe_"+num]. contentWindow.document;
		 var ob=obj.cc;
		 ob.document.getElementById("imgurl").src=url;
		 ob.document.getElementById("pictureurl").value=url;
	     common.closeWindow(null);
	 }
 }
</script>
</head>
<body>
<c:forEach begin="1" step="1" end="19" varStatus="t">    
   <img alt="" src="images/menuimg/shwwp${t.index}.png"  width="18" height="19"  onclick="quedingpic(this.src)"  /> 
   <c:if test="${t.index mod 7==0 }"><br><br></c:if>
</c:forEach>



</body>
</html>