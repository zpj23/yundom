<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<!DOCTYPE>
<html style="height:100%">
<head>
<title></title>
<script type="text/javascript">
function openQuick(id,title,url){
	parent.parent.Home.addTab(id, title, "", url, "href",true);
}

</script>
<style>
._pt{ font-size: 14px; color: #3399FE;}
._dm{ width:auto;float:left;margin-left:38px; cursor: pointer;}
</style>
</head>
<body>

	<c:forEach items="${quickmenu}" var="a">
		<div class="_dm" onclick="openQuick('${a[0]}','${a[1]}','${a[3]}')" >
		<center><p class="_pt">
		<img src="${a[2]}"/></p>
		<p class="_pt" >${a[1]}</p></p>
		</div></center>
	</c:forEach>
</body>
</html>