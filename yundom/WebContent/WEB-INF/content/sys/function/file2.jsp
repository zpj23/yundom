<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>    
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

function choosepic(){
	parent.common.openWindow('选择图标', 'functionAction_choosepic', 200, 200);
}
$(function(){
	var hide='${hide}';
	if (hide){
	    $('#pic').hide();
	}
})
</script>
</head>
<body style="height: 20px;margin-top:1px;overflow-y : hidden;">
<form action="" method="post" id="form11"  style="height: 20px"> 
  <%-- <input type="file" name="file" id="file" size="10" value="${pictureurl}"> <input type="button" value="上传" onclick="uploadFile()" /> --%>
  <img alt="" src="${imgurl}" style="width:16px ;height: 16px;margin-top: 2px;" id="imgurl" />
  <input type="hidden"  value="${imgurl}" id="pictureurl" />
  <button style="width:80px;height: 20px;margin-top: 0px;margin-bottom: 0px;" onclick="choosepic()" id="pic">选择图片</button>  
</form>
</body>
</html>