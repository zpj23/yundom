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
<%-- <script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script> --%>
<script type="text/javascript" src="newUI/lib/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/js/EasyUI/EasyUI1.3.6/themes/blue/style.css" />

<style>
<!--
/* input {width:159px} */
-->
</style>
