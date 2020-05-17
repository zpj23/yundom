<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		<link rel="stylesheet" href="css/dialog/jquery_dialog.css"
			type="text/css" />
		
		
        <script type="text/javascript">            
		   $().ready(function(){		    	
		       CKEDITOR.replace( 'mailinfo.content' );
		       
		       var editor;
		       CKEDITOR.on( 'instanceReady', function( ev ) {
					editor = ev.editor;
					editor.setReadOnly(true);
				});
		       CKEDITOR.config.removePlugins='elementspath';
		   });
		    
		    
		  //关闭
			function back(){
				//关闭window
				common.closeWindow('mailAction_toMailList');
			}
	   </script>
	   
	</head>
	<body>
	 <div class="easyui-panel" style="width:auto;height:260px;" >
		<form action="" method="post" id="form1" class="form">			
			<center>
			 <p>	
		    <font style="color: red;font-size: 20px;text-align:center;">山东省人民政府</font>
		     <p>
		    </center>
		    <div style="height: 1px;background-color: red"></div>
		    <div align="right">				    
		    <p>
		    <font style="color: red;font-size: 15px;margin-right: 100px">鲁政字[2015]号</font>
		     </div>
			    ${str}
		
    </form>
	</body>
</html>