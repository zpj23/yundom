<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<html>
<head>
<%@ include file="/common/meta.jsp"%>
<link href="${ctx}/js/uploadify/uploadify.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/js/comm/generic.js"></script>
<script type="text/javascript" src="${ctx}/js/My97DatePicker/WdatePicker.js"></script>

<script src="${ctx}/js/uploadify/jquery.uploadify.min.js" type="text/javascript"></script>
<script src="${ctx}/js/uploadify/swfobject.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/fileUpload.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/Math.uuid.js" type="text/javascript"></script>
<script src="${ctx}/js/comm/validatebox.js" type="text/javascript"></script>
<title></title>
<OBJECT   id="WebBrowser"   classid="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"   height=0   width=0   VIEWASTEXT></OBJECT> 
<script>
var hkey_root,hkey_path,hkey_key;
hkey_root="HKEY_CURRENT_USER";
hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
//网页打印时清空页眉页脚
function pagesetup_null() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "");
    } catch (e) {}
}
function pagesetup_default() {
    try {
        var RegWsh = new ActiveXObject("WScript.Shell");
        hkey_key = "header";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&w&b页码，&p/&P");
        hkey_key = "footer";
        RegWsh.RegWrite(hkey_root + hkey_path + hkey_key, "&u&b&d");
    } catch (e) {
    }
}

function yldy(){
	 pagesetup_null();
	 $(".easyui-linkbutton").css("display","none");	 
	 	 
	 document.all.WebBrowser.ExecWB(7,1);
	 $(".easyui-linkbutton").css("display","");	 
} 

$(function(){
	btnStatus = '${btnStatus}';	
	showprint($.parseJSON('${jsonData}'), '${ctx}' , '');	
	var a = $.parseJSON('${jsonData}');
	
	var tabData = {tableName_: a.dataForm.tableName, tableGuid_: '${dataid}', blobObjArray_: "KNOWLEDGE_CONTENT"};
	generic.BindingDBprint(tabData);	
	generic.fileUploadprint(a.dataForm.tableName,'${dataid}','${ctx}');
	
	if(a.childResult[0]!=undefined){
		dataGuid = '${dataid}';
		generic.childBindingDBprint({tableName_:a.childResult[0].dataForm.tableName, tableGuid_:dataGuid}, a.childResult[0]);
	}
	
	//yldy();
});



function showprint(param, path_, btnObj){
	generic.init();
	// 全局数据
	overallDataParam_ = param;   
	if(param.layoutResult=="table"){
		$("body").before("<p><b><center>"+param.dataForm.remark+"</center></b></p>");
		$.each(param.dataResult,function(k,v){  
			var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
			
			// input初始化
			inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
			// select初始化
			selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
			// textarea初始化
			textareaObj.init(v.plugObj, v.columnObj, tagName_);
			// 子表初始化
			tableObj.init(v.plugObj, param.childResult);
			// 数据输出			
			outHTMLprint(v.columnObj, tagName_,v.plugObj.pluginName);
		});
	}
	dynamicTableName_ = param.dataForm.tableName;
	
	// 动态表单按钮
	/* if(btnStatus==null || btnStatus==""){
		this.ShowTableBottom(btnObj);
	}else{
		this.fileUpload(dynamicTableName_,Math.uuid(),'');
	} */
	
}


//输出内容
function outHTMLprint(columnObj, tagName_,pluginName){
    if(pluginName=='上传控件'){
    	var showTd_ = "<td  class=\"dynamicTd\" width=150 >"+columnObj.colRemark+"&nbsp;</td><td  id=\"td_ifileinfo\"  colspan="+columnObj.formstyleColspan+"  >"+outerHTML_+"</td>";
    }else{    
	var showTd_ = "<td  class=\"dynamicTd\" width=150 >"+columnObj.colRemark+"&nbsp;</td><td  id=\"td_"+columnObj.colName+"\"  colspan="+columnObj.formstyleColspan+"  >"+outerHTML_+"</td>";
    }
	var trPro = columnObj.widthPro*2;
	if(columnObj.widthPro>1){
		if(tr_==undefined){tr_=$("<tr/>");}
		if(tr_.find("td:visible").length==trPro){tr_=$("<tr/>");}
		if(columnObj.isHid==1){
			showTd_ = $('<tbody>').append(showTd_).css('display','none')[0].outerHTML;
		}
		tr_.append(showTd_);
		tbody_.append(tr_);
	}else{
		tr_=$("<tr/>").append(showTd_);
		tbody_.append(tr_);
		objPro(columnObj, $(tr_));
		tr_=undefined;
	}
	if(tagName_=="TEXTAREA"){
		pluginObj_.ckeditor(columnObj.colName);
	}
}



//input对象
var inputObj = {
	// 初始化input对象
	init:function(plugObj, columnObj, dataArray, tagName_){
		$.extend(inputObj, dataBinding);
		
		// input对象绑定源数据
		if(tagName_=="INPUT"){
			var input_ ={
			  pluginTag: plugObj.pluginTag,
			  type: "text",
			  value: plugObj.pluginDefaultvalue,
			  name: columnObj.colName,
			  id: columnObj.colName
			};
			dataBinding.inputBinding(input_, dataArray);
			
			// input对象日期类型
			if(plugObj.pluginType=="date"){
				input_['onclick']='WdatePicker({readOnly:true})';
				input_['readonly']=true;
				generic_DateObjArray.push(columnObj.colName.toUpperCase());
			}
			outerHTML_ = showOuterHTML_(input_)[0].outerHTML;
			
			// input对象单选框类型
			if(plugObj.pluginType=="radio"){
				input_.type="radio";
				var man_radioChecked = showOuterHTML_(input_);
				var Obj_ = $.extend({}, input_);
				var womanObj_ = $.extend({}, input_);
				womanObj_.value="wom";
				var woman_radioChecked = showOuterHTML_(womanObj_);
				if(input_.value=="man"){
					man_radioChecked.attr({"checked":true, value:"man"});
				}else{
					woman_radioChecked.attr("checked",true);
				}
				outerHTML_ = "<lable>"+man_radioChecked[0].outerHTML+"男</lable>"+"<lable>"+woman_radioChecked[0].outerHTML+"女</lable>";
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="file"){
				input_.type="file";
				input_.name="uploadify";
				input_['id']="uploadify";
				outerHTML_ = showOuterHTML_(input_)[0].outerHTML+$("<div>",{id:"FileList_uploadify"})[0].outerHTML;
			}
		}
		
		validatebox.validateObj(columnObj);
	}
};

// select对象
var selectObj = {
	init:function(plugObj, columnObj, dataArray, tagName_){
		$.extend(selectObj, dataBinding);
		if(tagName_=="SELECT"){
			var select_ = {
			  pluginTag:plugObj.pluginTag,
			  name: columnObj.colName,
			  optionValue: plugObj.pluginDefaultvalue,
			  id: columnObj.colName
			};
			if(plugObj.pluginType=="JL"){
				select_["onchange"]="showChildrenSelect(this)";
			}
			outerHTML_ =showOuterHTML_(select_)
			.append(this.selectBinding(dataArray))
			.prepend($("<option/>",{text: "------请选择------"}))[0].outerHTML;
		}
		validatebox.validateObj(columnObj);
	}
};

/**
 * 展示级联子节点
 * @param paramObj
 */
function showChildrenSelect(paramObj){
	$(paramObj).nextAll().remove();
	var selectObj_ = $('<select/>',{name: $(paramObj)[0].name, id: $(paramObj)[0].name, onchange:"showChildrenSelect(this)"});
	var option_="";
	$.ajax({
		type: "post",
		url: "processAction_showChildrenSelect",
		async :false,
		dataType:"json",
		data: {mapCodeType:$(paramObj).find("option:selected").val()},
		success: function(data){
			$.each(data,function(k,v){
				option_ += $("<option/>",{text: v, value: k})[0].outerHTML;
			});
		}
	});
	if(option_!=""){
		$(paramObj).parent().append(selectObj_.append(option_).prepend($("<option/>",{text: "------请选择------"}))[0].outerHTML)
	}
}

// textarea对象
var textareaObj = {
	init:function(plugObj, columnObj, tagName_){
		if(tagName_=="TEXTAREA"){
			var textarea_ = {
			  pluginTag:plugObj.pluginTag,
			  name: columnObj.colName,
			  id: columnObj.colName,
			  optionValue: plugObj.pluginDefaultvalue
			};
			outerHTML_ =showOuterHTML_(textarea_)[0].outerHTML;
		}if(columnObj.colType.toUpperCase()=='BLOB' || columnObj.colType.toUpperCase()=='CLOB'){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}
		
		validatebox.validateObj(columnObj);
	}
};

//子表对象
var tdnum =0;
var tableObj = {
	init:function(plugObj, childResult_){
		if(plugObj.pluginTag=="table"){
			var table_tbody_ = 
				$("<table class=\"childTable tableForm\" width=\"100%\"><tbody></tbody></table>")
				.find("tbody");
			var showTd_ = "",columnArray="";
			
			$.each(childResult_[0].dataResult,function(k,v){
				var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
				// input初始化
				inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// select初始化
				selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// textarea初始化
				textareaObj.init(v.plugObj, v.columnObj, tagName_);
				showTd_ +="<td style='height:30px;'>"+v.columnObj.colRemark+"</td>";
				var columnid = "td_"+v.columnObj.colName+tdnum; 
				columnArray +=$('<td>',{'style':'height:30px;','align':'center','id':columnid}).append(outerHTML_)[0].outerHTML;
				
			});
			  showTd_+="";
			  
			 table_tbody_.append($("<tr/>",{"style":"text-align:center;background-color:#DDD9C3;"}).append(showTd_));
			 
			 table_tbody_.append($("<tr/>").append(columnArray));
			
			var formObj_ = $("<form id=\"childTableForm\">").append(table_tbody_.parent());
			outerHTML_ =formObj_[0].outerHTML;			
		}
	}
};



</script>
</head>
<body id="print_div">
<div id="printbuttondiv">
   <a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-view" onclick="yldy()">打印</a>
</div>
</body>
</html>