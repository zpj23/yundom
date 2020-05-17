<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>    
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script type="text/javascript">
function uploadFile(){
  if($("#file").val()!=""){
  form11.action ="uploadfileAction_uploadFileMenu";
  form11.submit();
  }
}
</script>
</head>
<body>

<img alt="" src="${pictureurl}" width="16" height="17">
<input type="hidden" id="pictureurl" value="${pictureurl}" />

</body>
</html>