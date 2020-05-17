<%@ page language="java"  pageEncoding="UTF-8"%>  <!-- errorPage="/error.jsp" -->

<%-- JSTL 标签 --%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %> 
<%@ taglib prefix="mf" uri="/MyFramework-tags"%>
<%-- 绝对路径 --%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/themes/default/easyui.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/common.css" />
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/icon.css" />
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
		
<link rel="stylesheet" type="text/css" href="${ctx}/js/EasyUI/EasyUI1.3.6/themes/blue/style.css" />
<script type="text/javascript" src="${ctx}/js/comm/dealdialog.js"></script>
<script type="text/javascript" src="${ctx}/js/comm/common.js"></script>
<script type="text/javascript" src="${ctx}/js/comm/buttonpurview.js"></script> 

<link href="${ctx}/images/favicon.ico" rel="shortcut icon" type="image/x-icon" />
<%-- <link href="${ctx}/js/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
<script src="${ctx}/js/uploadify/jquery.uploadify.min.js" type="text/javascript"></script>
<script src="${ctx}/js/uploadify/swfobject.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/fileUpload.js" type="text/javascript"></script> --%>

<style>
<!--
/* input {width:159px} */
-->
</style>
