<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>

<link href="css/base.css" type="text/css" rel="stylesheet" />
<link href="css/blue.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.10.1.min.js" type="text/javascript" ></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script src="js/jquery.tab.js" type="text/javascript"></script>
<script src="js/common.js" type="text/javascript"></script>
<script src="js/errect.js" type="text/javascript"></script>
<script type="text/javascript" src="js/comm/common.js"></script>
<script type="text/javascript">
function openQuick(id,title,url){
	parent.Home.addTab(id, title, "", url, "href",true);
}

</script>
</head>
<body> 
    

<div class="tongd fl">
     <h1 class="td_title">快捷通道</h1>
     <div class="td_main">
       <c:forEach items="${quickmenu}" var="a">
        <div><a href="#"><img src="${a[2]}"  onclick="openQuick('${a[0]}','${a[1]}','${a[3]}')" /><p>${a[1] }</p></a></div>
       </c:forEach>
     </div>
    </div>

</body>
</html>