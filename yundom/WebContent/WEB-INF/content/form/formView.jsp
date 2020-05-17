<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@ include file="/common/meta.jsp"%>
<%-- <link href="${ctx}/js/uploadify/uploadify.css" rel="stylesheet" type="text/css" /> --%>
<%-- <script src="${ctx}/js/uploadify/jquery.uploadify.min.js" type="text/javascript"></script>
<script src="${ctx}/js/uploadify/swfobject.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/file.js" type="text/javascript"></script> --%>
<link rel="stylesheet" href="ueditor1_4_3-utf8-jsp/themes/default/css/ueditor.css" type="text/css">
<script type="text/javascript" src="${ctx}/js/My97DatePicker/WdatePicker.js"></script>
<script src="${ctx}/js/comm/Math.uuid.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/squel.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/file.js" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/ueditor.all.js"></script>
<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" charset="utf-8" src="ueditor1_4_3-utf8-jsp/lang/en/en.js"></script>
<%-- <script src="${ctx}/js/comm/validatebox.js" type="text/javascript"></script> --%>

<script type="text/javascript" src="${ctx}/js/comm/generic.js"></script>
<title></title>
<script language="javascript">
function killErrors()
{
   return true;
}
window.onerror = killErrors;
</script>
<script>
$(function(){
	dataGuid ='${dataGuid}';
	btnStatus = '${btnStatus}';
	orgGuid_ = '${orgGuid_}';
	//alert("dataGuid:"+dataGuid);
	if(dataGuid!=""){
		UUID_ = dataGuid;		
	}else{
		UUID_ = Math.uuid();
	}
	var bigData = $.parseJSON('${jsonData}');
	generic.ShowForm2(bigData, '${ctx}' , '' , orgGuid_);
	if(bigData.childResult[0]!=undefined){
		generic.childBindingDBView({tableName_:bigData.childResult[0].dataForm.tableName, tableGuid_:dataGuid}, bigData.childResult[0]);
	}
	
	//baidufile.init("edit",UUID_,"uploadify");
	
	//generic.readonly_();
	
	/*延迟*/
	setTimeout(img_size,200);

});

function img_size(){
     for(var i=0;i<$("img").length;i++){    	 
		 if($("img")[i].width>700){
			$('img')[i].width=700;		
		} 
     }
}
</script>
</head>
<body>
<%--  <mf:FileUpload id="pglcfile" mode="edit" moduleID="1" moduleType=""></mf:FileUpload> --%>
<!-- <div>                                         
<a class="easyui-linkbutton" iconCls="icon-view"  plain="true" onclick="printview();" href="javascript:void(0);">打印预览</a>
  <script type="text/javascript">
    function printview(){    	
  			var newwindow;
  			var obj = $.parseJSON('${jsonData}');
  			var tableGuid_ = obj.dataForm.tableGuid;
  			newwindow = window.open("genericAction_formprint?tableGuid_="+tableGuid_+"&dataid=${dataid}","_blank", "height=650,width=920");  			
  			 //window.showModalDialog("genericAction_formprint?tableGuid_="+tableGuid_+"&dataid=${dataid}",'',"dialogWidth=920px;dialogHeight=650px");
  			
    }
  </script>
</div>
<div style="height: 5px"></div> -->
</body>
</html>