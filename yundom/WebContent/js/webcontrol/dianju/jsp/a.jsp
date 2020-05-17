<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<HTML><HEAD><TITLE>weboffice演示页面</TITLE>
<META http-equiv=Content-Type content="text/html; charset=utf-8">
<LINK href="weboffice/css/style.css" type=text/css rel=stylesheet>
<SCRIPT src="weboffice/js/main.js" type=text/javascript></SCRIPT>
<!-- --------------------=== 调用Weboffice初始化方法 ===--------------------- -->
<SCRIPT language=javascript event=NotifyCtrlReady for=WebOffice1>
/****************************************************
*
*	在装载完Weboffice(执行<object>...</object>)
*	控件后执行 "WebOffice1_NotifyCtrlReady"方法
*
****************************************************/
    WebOffice_Event_Flash("NotifyCtrlReady");
	WebOffice1_NotifyCtrlReady()
</SCRIPT>

<SCRIPT language=javascript event=NotifyWordEvent(eventname) for=WebOffice1>
<!--
WebOffice_Event_Flash("NotifyWordEvent");
 WebOffice1_NotifyWordEvent(eventname);
 
//-->
</SCRIPT>

<SCRIPT language=javascript event=NotifyToolBarClick(iIndex) for=WebOffice1>
<!--
  WebOffice_Event_Flash("NotifyToolBarClick");
 WebOffice1_NotifyToolBarClick(iIndex);
//-->
</SCRIPT>

<SCRIPT language=javascript>
/****************************************************
*
*		控件初始化WebOffice方法
*
****************************************************/
function WebOffice1_NotifyCtrlReady() {
	document.all.WebOffice1.SetWindowText("授权XX(可通过接口自定义)", 0);
	document.all.WebOffice1.OptionFlag |= 128;
	// 新建文档
	//document.all.WebOffice1.LoadOriginalFile("", "doc");
	spnWebOfficeInfo.innerText="----   您电脑上安装的WebOffice版本为:V" + document.all.WebOffice1.GetOcxVersion() +"\t\t\t本实例是根据版本V6044编写";
}
var flag=false;
function menuOnClick(id){
	var id=document.getElementById(id);
	var dis=id.style.display;
	if(dis!="none"){
		id.style.display="none";
		
	}else{
		id.style.display="block";
	}
}
/****************************************************
*
*		接收office事件处理方法
*
****************************************************/
var vNoCopy = 0;
var vNoPrint = 0;
var vNoSave = 0;
var vClose=0;
function no_copy(){
	vNoCopy = 1;
}
function yes_copy(){
	vNoCopy = 0;
}


function no_print(){
	vNoPrint = 1;
}
function yes_print(){
	vNoPrint = 0;
}


function no_save(){
	vNoSave = 1;
}
function yes_save(){
	vNoSave = 0;
}
function EnableClose(flag){
 vClose=flag;
}
function CloseWord(){
	
  document.all.WebOffice1.CloseDoc(0); 
}

function WebOffice1_NotifyWordEvent(eventname) {
	if(eventname=="DocumentBeforeSave"){
		if(vNoSave){
			document.all.WebOffice1.lContinue = 0;
			alert("此文档已经禁止保存");
		}else{
			document.all.WebOffice1.lContinue = 1;
		}
	}else if(eventname=="DocumentBeforePrint"){
		if(vNoPrint){
			document.all.WebOffice1.lContinue = 0;
			alert("此文档已经禁止打印");
		}else{
			document.all.WebOffice1.lContinue = 1;
		}
	}else if(eventname=="WindowSelectionChange"){
		if(vNoCopy){
			document.all.WebOffice1.lContinue = 0;
			//alert("此文档已经禁止复制");
		}else{
			document.all.WebOffice1.lContinue = 1;
		}
	}else   if(eventname =="DocumentBeforeClose"){
	    if(vClose==0){
	    	document.all.WebOffice1.lContinue=0;
	    } else{
	    	//alert("word");
		    document.all.WebOffice1.lContinue = 1;
		  }
 }
	//alert(eventname); 
}
function dd(){

	document.all.WebOffice1.FullScreen=0;

}</SCRIPT>


<script type="text/javascript">
function gz(){alert(11);
	document.all.WebOffice1.SetFieldValue("test", "", "::ADDMARK::");
	var zhangurl = "http://127.0.0.1:8089/Core/weboffice/img/zhang.gif"; //"http://127.0.0.1:8089/Core/weboffice/img/3.jpg"
	document.all.WebOffice1.SetFieldValue("test", zhangurl, "::JPG::");
}

</script>

<LINK href="weboffice/css/style.css" type=text/css rel=stylesheet>
<META content="MSHTML 6.00.2900.5921" name=GENERATOR></HEAD>
<BODY style="BACKGROUND: #ccc" onunload="return window_onunload()">
<CENTER>
<DIV 
style="PADDING-RIGHT: 0px; PADDING-LEFT: 0px; BACKGROUND: #fff; PADDING-BOTTOM: 0px; MARGIN: -10px 0px 0px; WIDTH: 1024px; PADDING-TOP: 10px; HEIGHT: 750px" 
align=center>
<FORM name=myform>

<table>
<tr>
<td>
  <input type="button" onclick="gz()" value="盖个章">
</td>
<td>
 <textarea rows="5" cols="70" id="abc" name="abc"></textarea>
</td>
</tr>
</table>

<TABLE class=TableBlock width="90%">
  <TBODY>
  <TR>
    <TD class=leftTableData vAlign=top width="15%">   
      <DIV class=menuItem onclick="menuOnClick('markset')">书签操作 </DIV>
      <DIV id=markset style="DISPLAY: none"><INPUT class=btn onclick="return addBookmark()" type=button value=设置书签 name=button8> 
		<INPUT class=btn onclick="return taohong()" type=button value=套红 name=button8> 
		<INPUT class=btn onclick="return gaizhang()" type=button value=盖章 name=button8>
      </DIV>
     
    
      </TD>
    <TD class=TableData vAlign=top width="85%">
    	<!-- -----------------------------== 装载weboffice控件 ==--------------------------------- -->
      <SCRIPT src="weboffice/js/LoadWebOffice.js"></SCRIPT>
			<!-- --------------------------------== 结束装载控件 ==----------------------------------- -->
			</TD></TR></TBODY></TABLE></FORM></DIV></CENTER></BODY></HTML>