<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>

<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript">
  $(document).ready(function(){
      $("td img").hover(
		  function () {
		    $(this).css({border:"1px blue solid"});
		  },
		  function () {
		    $(this).css({border:"1px solid transparent"});
		  }
		);
  });


 // 确定选择的图片
 function  quedingpic(url){
	 url = url.substring(url.indexOf("images"));	 
	 var obj = common.getIFrame();
	 $("#pic${num}",obj).attr("src",url);   
	 $("#picpath${num}",obj).val(url);
	 
     common.closeWindow(null);
 }
</script>
<%
Map<String, String> map = new HashMap<String, String>(); // Map
map.put("bztb", "表彰通报");
map.put("cjxx", "采集信息");
map.put("dcyj", "调查研究");
map.put("dcdb", "督查督办");
map.put("dcdbtj", "督查督办统计");
map.put("fk", "反馈");
map.put("fxpg", "风险评估");
map.put("gdwwb", "各地维稳办");
map.put("gzdt", "工作动态");
map.put("gzqkdcb", "工作情况调查表");

map.put("gwcl", "公文处理");
map.put("gwgl", "公文管理");
map.put("gmyl", "观摩演练");
map.put("gd", "归档");
map.put("hy", "会议");
map.put("jgjs", "机关建设");
map.put("jdck", "进度查看");
map.put("jyjl", "经验交流");
map.put("llmd", "联络名单");
map.put("lplb", "联评联办");
 
map.put("ldjh", "领导讲话");
map.put("pgxx", "评估信息");
map.put("qt", "其他");
map.put("qtzl", "其他资料");
map.put("swry", "涉稳人员");
map.put("swxx", "涉稳信息");
map.put("swxxfltj", "涉稳信息分类统计");
map.put("szbm", "省直部门");
map.put("sjcz", "事件处置");
map.put("txl", "通讯录");

map.put("tytb", "通用图标");
map.put("tzgg", "通知公告");
map.put("tjfx", "统计分析");
map.put("wwgz", "维稳工作");
map.put("wwkb", "维稳快报");
map.put("wjzd", "文件制度");
map.put("wpkzqk", "稳评开展情况");
map.put("xtalk", "系统案例库");
map.put("xgwdxz", "相关文档下载");
map.put("jjjy", "意见建议");

map.put("yjcl", "应急处理");
map.put("yak", "预案库");
map.put("yatx", "预案体系");
map.put("zsk", "知识库");
map.put("zdwj", "制度文件");
map.put("zdjcsx", "重点决策事项");
map.put("zdswry", "重点涉稳人员");
map.put("zdswsj", "重点涉稳事件");
map.put("zjk", "专家库");
map.put("ztdy", "专题调研");

map.put("zygl", "资源管理");
%>
<style type="text/css">
img {border: 1px solid transparent;cursor: pointer;}
</style>
</head>
<body>
<div class="easyui-layout" data-options="fit:true">
<table cellpadding="0" cellspacing="1" width="100%" class="demo2">
<tr>
	<c:forEach items="<%= map %>" var="entry"  varStatus="t">    
		<td width="10%">		     
	        <center><img alt="" src="images/menuimg/bigimg/${entry.key}.jpg"  width="64" height="62"  onclick="quedingpic(this.src)" />
	        <br/>
	        ${entry.value}</center>
		</td>
		<c:if test="${t.count%7==0}">
		</tr>
		<tr>
		</c:if>
	</c:forEach>
</tr>
</table>
</div>

</body>
</html>