<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title></title>
<script type="text/javascript" charset="UTF-8">
	
	
	//详细信息
	function detailurl(url,num){
	common.openWindow('详细信息', url, 1000, 600);
	$("#remindli"+num).css("display","none");
	}
	
	function toMore(){
		$("#remindnum").val("0");
		$('#datagrid').datagrid('load', {
			remindnum : 0
		});
		$("#aa").css("display","none");
	}
	
	 $(document).ready(function () {  
	        $(".info_list ul li").hover(function () {  
	        	$(this).css('background','#E3F7FF');
	        	//$(this).addClass("aa");  
	        }, function () {  
	        	$(this).css('background',''); 
	        });  
	    });  
	
</script>
<style>
  body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, pre, form, fieldset, input, textarea, p, blockquote, th, td {
    color: #333333;
    font-size: 12px;
    margin: 0;
    padding: 0;
 }
</style>

</head>
<body>
<!-- <div class="popumain"> -->
  <%-- <div class="reminders"><img src="js/EasyUI/themes/blue/images/noc_close.png" width="20" height="20" class="fl" /><span  class="fr mr15">共<strong>${listlength}</strong>条提醒</span>提醒事项</div> --%>
  <div class="info_list">
    <div class="classification"><img src="js/EasyUI/EasyUI1.3.6/themes/blue/myimages/up.png" width="20" height="19" />邮件</div>
    <ul>
      <c:forEach items="${remindList}" var="a" varStatus="t">
         <li onclick="detailurl('${a.remindUrl}','${t.index}');"  id="remindli${t.index}"  style="cursor:hand">
	         <p class="noc_iterm_info"><span class="noc_iterm_time">
	           ${a.showtime}
	         </span>${a.startUsername}</p>
	         <p class="noc_iterm_content">${a.remindTitle}</p>
         </li>
      </c:forEach>
    </ul>
</div>
</body>
<script src="js/jquery/jquery-1.6.min.js" type="text/javascript"></script>
<script>
$('.classification img').click(function(){
	if($(this).parent('div').next('ul').is(':hidden'))
	   {
		   $(this).parent('div').next('ul').show();
		   $(this).attr('src','js/EasyUI/EasyUI1.3.6/themes/blue/myimages/up.png')
	   }
	   else
	   {
		   $(this).parent('div').next('ul').hide();
		   $(this).attr('src','js/EasyUI/EasyUI1.3.6/themes/blue/myimages/down.png')
		   }
	})
</script>

</body>
</html>