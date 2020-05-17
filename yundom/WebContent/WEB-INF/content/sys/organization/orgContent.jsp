<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>   
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title></title>
<script type="text/javascript" src="js/jquery/jquery-1.6.min.js"></script>
<script language="JavaScript" src="js/jquery/jquery.validate.js"></script>
<script language="JavaScript" src="js/jquery/messages_cn.js"></script>
<script type="text/javascript" src="js/sys/organization/org.js"></script>

</head>
<body>

<form action="orgAction_doDealOrg" method="post" id="form1">

<table width="80%">
 <tr>
   <td colspan="2">
    
      <input type="button"  onclick="addChildOrg()" value="新增子机构" />
     
      <input type="button"  onclick="delOrg()" value="删除本机构" />
   </td>
 </tr>
 
 <tr>
   <th width="10%" align="right">名称：</th>
   <td><input type="text" name="org.orgName" id="orgName" maxlength="50" />  </td>
 </tr>
 
  <tr>
   <th >机构类别：</th>
   <td>
      
      <input type="radio" name="orgType"  value="1" ${1 eq org.orgType ? "checked":"" } onclick="showParentDept('1')"/> 机构 
      <input type="radio" name="orgType"  value="2" ${2 eq org.orgType ? "checked":"" } onclick="showParentDept('2')" /> 部门
   </td>
 </tr>
 
 <tr id="parentDeptTr" style="display: none">
   <th width="10%" align="right">上级部门：</th>
   <td>
      <input  type="text" name="org.parentDeptid" id="parentDeptid" readonly="readonly" /> 
   </td>
 </tr>
 
 <tr>
   <th >业务类别：</th>
   <td>
      <select name="org.businessType" id="businessType">
          <option value="">无</option>  
          <option value="5" ${5 eq org.businessType ? "selected":"" }>市</option>
          <option value="4" ${4 eq org.businessType ? "selected":"" }>区</option>
          <option value="3" ${3 eq org.businessType ? "selected":"" }>镇</option>
          <option value="2" ${2 eq org.businessType ? "selected":"" }>村</option>
          <option value="1" ${1 eq org.businessType ? "selected":"" }>网格</option>
          <option value="0" ${0 eq org.businessType ? "selected":"" }>街道</option>            
      </select>
   </td>
 </tr>
 
 <tr>
   <th >部门类别：</th>
   <td>
       <select name="org.deptType" id="deptType">
	       <option value="">无</option>
	       <option value="WWB" ${'WWB' eq org.deptType ? "selected":"" }>维稳办</option>
	       <option value="ZFW" ${'ZFW' eq org.deptType ? "selected":"" }>政法委</option>       
       </select>
   </td>
 </tr>
 
 <tr>
   <th align="right">备注：</th>
   <td >
     <textarea rows="9" cols="50" name="org.description">${org.description}</textarea>
   </td>
 </tr>
 
 <tr>
   <td colspan="2">
       <input type="text" name="org.orgLevel"  id="orgLevel"  value="2" />
       <input type="text" name="org.parentOrgid" id="parentOrgid" value="${id}" />
       <input type="button"  onclick="saveOrg(form1)" value="保存" />
   </td>
 </tr>

</table>

</form>
</body>
</html>