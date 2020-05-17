

function removeTextNode(tb) {
	for ( var i = 0; i < tb.childNodes.length; i++) {
		var node = tb.childNodes[i];
		if (!node || node.nodeType != 1) {
			tb.removeChild(tb.childNodes[i]);
		}
	}
}
function replaceCt(content){	
	while(content.indexOf('"')>-1){
		content = content.replace('"',"&quot;");
	}
	while(content.indexOf("'")>-1){
		content = content.replace("'","&#39;");
	}
	return content;
}


/*********************出差begin***********************************/
function addTravelLine(obj){	
	var a =jQuery.parseJSON(obj[1]); 
	var document = window.frames["ContentBottomiframe"].document;
	
    tb = document.getElementById("tb").getElementsByTagName("TBODY")[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement("tr");

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].travelusername+"<input type=\"hidden\"  id=\"travelusername" + (num - 1) + "\"  name=\"travelusername\" value=\""+a[0].travelusername
			+ "\" /><input type=\"hidden\"  id=\"traveluserid" + (num - 1) + "\"  name=\"traveluserid\" value=\""+a[0].traveluserid
			+ "\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td3 = document.createElement('td');
    td3.innerHTML = "<td  >"+a[0].traveldate+"<input type=\"hidden\"  id=\"traveldate" + (num - 1) + "\" name=\"traveldate\" value=\""+a[0].traveldate
			+ "\"  /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].backdate+"<input type=\"hidden\" id=\"backdate" + (num - 1) + "\"  name=\"backdate\" value=\""+a[0].backdate 
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  >"+a[0].description+"<input type=\"hidden\"  id=\"description" + (num - 1) + "\" name=\"description\" size=\"40\" value=\""+replaceCt(a[0].description)+"\" />" +
			"<input type=\"hidden\"  id=\"fileid" + (num - 1) + "\" name=\"fileid\" value=\""+a[0].fileid+"\"  /><td>";
	$(td5).css("background-color", "#fff");
	var td6 = document.createElement('td');
	td6.innerHTML = "<td  >"
			+ "<input type=\"button\"  onclick=\"modifyLine("+(num - 1)+")\" value=\"编辑\" class=\"ListButton\" /><td>";
	$(td6).css("background-color", "#fff");
	var td7 = document.createElement('td');
	td7.innerHTML = "<td  ><center><a href='javascript:delTravelRow(" + num + ")'>X</a></center><td>";
	$(td7).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tr.appendChild(td7);
	tb.appendChild(tr);		
}


function modifyTravelLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delTravelRow(number);
	
	var a =jQuery.parseJSON(obj[1]);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById("tb").getElementsByTagName("TBODY")[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement("tr");

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].travelusername+"<input type=\"hidden\"  id=\"travelusername" + (num - 1) + "\"  name=\"travelusername\" value=\""+a[0].travelusername
			+ "\" /><input type=\"hidden\"  id=\"traveluserid" + (num - 1) + "\"  name=\"traveluserid\" value=\""+a[0].traveluserid
			+ "\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td3 = document.createElement('td');
    td3.innerHTML = "<td  >"+a[0].traveldate+"<input type=\"hidden\"  id=\"traveldate" + (num - 1) + "\" name=\"traveldate\" value=\""+a[0].traveldate
			+ "\"  /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].backdate+"<input type=\"hidden\" id=\"backdate" + (num - 1) + "\"  name=\"backdate\" value=\""+a[0].backdate 
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  >"+a[0].description+"<input type=\"hidden\"  id=\"description" + (num - 1) + "\" name=\"description\" size=\"40\" value=\""+replaceCt(a[0].description)+"\" />" +
			"<input type=\"hidden\"  id=\"fileid" + (num - 1) + "\" name=\"fileid\" value=\""+a[0].fileid+"\"  /><td>";
	$(td5).css("background-color", "#fff");
	var td6 = document.createElement('td');
	td6.innerHTML = "<td  >"
			+ "<input type=\"button\"  onclick=\"modifyLine("+(num - 1)+")\" value=\"编辑\" class=\"ListButton\" /><td>";
	$(td6).css("background-color", "#fff");
	var td7 = document.createElement('td');
	td7.innerHTML = "<td  ><center><a href='javascript:delTravelRow(" + num + ")'>X</a></center><td>";
	$(td7).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);	
	tr.appendChild(td7);	
	tb.appendChild(tr);		
}


//编辑页面
function modifyTravelLine2(obj){	
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delTravelRow(number);
	
	var a =jQuery.parseJSON(obj[1]);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById("tb").getElementsByTagName("TBODY")[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement("tr");

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].travelusername+"<input type=\"hidden\"  id=\"travelusername" + (num - 1) + "\"  name=\"travelusername\" value=\""+a[0].travelusername
			+ "\" /><input type=\"hidden\"  id=\"traveluserid" + (num - 1) + "\"  name=\"traveluserid\" value=\""+a[0].traveluserid
			+ "\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td3 = document.createElement('td');
    td3.innerHTML = "<td  >"+a[0].traveldate+"<input type=\"hidden\"  id=\"traveldate" + (num - 1) + "\" name=\"traveldate\" value=\""+a[0].traveldate
			+ "\"  /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].backdate+"<input type=\"hidden\" id=\"backdate" + (num - 1) + "\"  name=\"backdate\" value=\""+a[0].backdate 
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  >"+a[0].description+"<input type=\"hidden\"  id=\"description" + (num - 1) + "\" name=\"description\" size=\"40\" value=\""+replaceCt(a[0].description)+"\" />" +
			"<input type=\"hidden\"  id=\"fileid" + (num - 1) + "\" name=\"fileid\" value=\""+a[0].fileid+"\"  /><td>";
	$(td5).css("background-color", "#fff");
	var td6 = document.createElement('td');
	td6.innerHTML = "<td  >"
			+ "<input type=\"button\"  onclick=\"modifyLine2("+(num - 1)+")\" value=\"编辑\" class=\"ListButton\" /><td>";
	$(td6).css("background-color", "#fff");
	
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tb.appendChild(tr);		
}

//删除行
function delTravelRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "travelusername" + i);
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "traveluserid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "traveldate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "backdate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "description" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "fileid" + i);
			tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML="<input type=\"button\"  onclick=\"modifyLine("+i+")\" value=\"编辑\" class=\"ListButton\" />";
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:delTravelRow(" + (i + 1) + ")'>X</a></center>";
	}

}
/**********************出差end**********************************/


/**********************项目下单分配begin**********************************/

//处理新增行
function addAllocationLine(obj) {		
	var a =jQuery.parseJSON(obj[1]);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num+"." + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].dealusername+"<input type=\"hidden\"  id=\"dealusername" + (num - 1) + "\"  name=\"dealusername\"  value=\""+a[0].dealusername 
			+ "\" /><input type=\"hidden\"  id=\"dealuserid" + (num - 1) + "\"  name=\"dealuserid\" value=\""+a[0].dealuserid
			+ "\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td7 = document.createElement('td');
	td7.innerHTML = "<td >"+a[0].title+"<input type=\"hidden\" id=\"title" + (num - 1) + "\"  name=\"title\" value=\""+a[0].title 
			+ "\"   /><td>";
	$(td7).css("background-color", "#fff");
	var td3 = document.createElement('td');
    td3.innerHTML = "<td  >"+a[0].allocationcontent+"<input type=\"hidden\"  id=\"allocationcontent" + (num - 1) + "\" name=\"allocationcontent\" value=\""+replaceCt(a[0].allocationcontent)
			+ "\"  size=\"60\"  /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].workload+"<input type=\"hidden\" id=\"workload" + (num - 1) + "\"  name=\"workload\" value=\""+a[0].workload 
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");
	var td5 = document.createElement('td');
	td5.innerHTML = "<td >"+a[0].completedate+"<input type=\"hidden\" id=\"completedate" + (num - 1) + "\"  name=\"completedate\" value=\""+a[0].completedate
			+ "\"  /><input type=\"hidden\" id=\"fileid" + (num - 1) + "\"  name=\"fileid\" value=\""+a[0].fileid
			+ "\"  /><td>";
	$(td5).css("background-color", "#fff");			
	var td6 = document.createElement('td');
	td6.innerHTML = "<td  ><center><a href='javascript:modifyRow(" + num + ")'>编辑</a> | <a href='javascript:delAllocationRow(" + num + ")'>删除</a></center><td>";
	$(td6).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td7);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tb.appendChild(tr);			
}

//处理编辑行
function modifyAllocationLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delAllocationRow(number);
	addAllocationLine(obj);
}

//删除行
function delAllocationRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "dealusername" + i);
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "dealuserid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "title" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "allocationcontent" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "workload" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "completedate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "fileid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:modifyRow(" + (i + 1) + ")'>编辑</a>  |  <a href='javascript:delAllocationRow(" + (i + 1) + ")'>删除</a></center>";
	}

}

/**********************项目下单分配end**********************************/

/**********************项目下单反馈begin**********************************/
//处理新增行
function addFeedbackLine(obj) {
	var a =obj[1];
	a=eval(a);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num+"." + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].feedbackcontent+"<input type=\"hidden\"  id=\"feedbackcontent" + (num - 1) + "\"  name=\"feedbackcontent\" value=\""+a[0].feedbackcontent
			+ "\" size=\"60\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td3 = document.createElement('td');
    td3.innerHTML = "<td >"+a[0].feedbackstatus+"<input type=\"hidden\" id=\"feedbackstatus" + (num - 1) + "\"  name=\"feedbackstatus\" value=\""+a[0].feedbackstatus
            + "\" /><input type=\"hidden\" id=\"feedbackid" + (num - 1) + "\"  name=\"feedbackid\" value=\""+a[0].feedbackid
            + "\" /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});			
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].feedbackdate+"<input type=\"hidden\" id=\"feedbackdate" + (num - 1) + "\"  name=\"feedbackdate\" value=\""+a[0].feedbackdate
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");			
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  ><center><a href='javascript:modifyRow(" + (num-1) + ")'>编辑</a>  |  <a href='javascript:delFeedbackRow(" + num + ")'>删除</a></center><td>";
	$(td5).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tb.appendChild(tr);			
}

//处理编辑行
function modifyFeedbackLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delFeedbackRow(number);
	addFeedbackLine(obj);	
}

//删除行
function delFeedbackRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackcontent" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackstatus" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "feedbackid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackdate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:modifyRow(" + i + ")'>编辑</a>  |  <a href='javascript:delFeedbackRow(" + (i + 1) + ")'>删除</a></center>";
	}
}
/**********************项目下单反馈end**********************************/

/**********************项目下单测试反馈begin**********************************/
//新增行
function addCsFeedbackLine(obj) {
	var a =obj[1];
	a=eval(a);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement('tr');
	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});			
	var td2 = document.createElement('td');
    td2.innerHTML = "<td  >"+a[0].description+"<input type=\"hidden\"  id=\"description" + (num - 1) + "\" name=\"description\" value=\""+a[0].description
			+ "\"  size=\"70\"  /><td>";
	$(td2).css({"background-color": "#fff","text-align":"center"});			
	var td3 = document.createElement('td');
	td3.innerHTML = "<td >"+a[0].result+"<input type=\"hidden\" id=\"result" + (num - 1) + "\"  name=\"result\" value=\""+a[0].result
	        + "\"   /><td>";
	$(td3).css("background-color", "#fff");			
	var td4 = document.createElement('td');
	td4.innerHTML = "<td  >"+a[0].dealusername+"<input type=\"hidden\"  id=\"dealusername" + (num - 1) + "\"  name=\"dealusername\" value=\""+a[0].dealusername
			+ "\" /><input type=\"hidden\"  id=\"dealuserid" + (num - 1) + "\"  name=\"dealuserid\" value=\""+a[0].dealuserid
			+ "\" /><td>";
	$(td4).css({"background-color":"#fff","text-align":"center"});			
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  ><center><a href='javascript:modifyRow(" + num + ")'>编辑</a> | <a href='javascript:delCsFeedbackRow(" + num + ")'>删除</a></center><td>";
	$(td5).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tb.appendChild(tr);			
}


//处理编辑行
function modifyCsFeedbackLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delCsFeedbackRow(number);
	addCsFeedbackLine(obj);
}


//删除行
function delCsFeedbackRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "description" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "result" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "dealusername" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "dealuserid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:modifyRow(" + (i + 1) + ")'>编辑</a>  |  <a href='javascript:delCsFeedbackRow(" + (i + 1) + ")'>删除</a></center>";
	}
}

/**********************项目下单测试反馈end**********************************/

/**********************任务下单分配begin**********************************/

//处理新增行
function addAllocationTaskLine(obj) {		
	var a =jQuery.parseJSON(obj[1]);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num+"." + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].dealusername+"<input type=\"hidden\"  id=\"dealusername" + (num - 1) + "\"  name=\"dealusername\"  value=\""+a[0].dealusername 
			+ "\" /><input type=\"hidden\"  id=\"dealuserid" + (num - 1) + "\"  name=\"dealuserid\" value=\""+a[0].dealuserid
			+ "\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td7 = document.createElement('td');
	td7.innerHTML = "<td >"+a[0].title+"<input type=\"hidden\" id=\"title" + (num - 1) + "\"  name=\"title\" value=\""+a[0].title 
			+ "\"   /><td>";
	$(td7).css("background-color", "#fff");
	var td3 = document.createElement('td');
    td3.innerHTML = "<td  >"+a[0].allocationcontent+"<input type=\"hidden\"  id=\"allocationcontent" + (num - 1) + "\" name=\"allocationcontent\" value=\""+replaceCt(a[0].allocationcontent)
			+ "\"  size=\"60\"  /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].workload+"<input type=\"hidden\" id=\"workload" + (num - 1) + "\"  name=\"workload\" value=\""+a[0].workload 
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");
	var td5 = document.createElement('td');
	td5.innerHTML = "<td >"+a[0].completedate+"<input type=\"hidden\" id=\"completedate" + (num - 1) + "\"  name=\"completedate\" value=\""+a[0].completedate
			+ "\"  /><input type=\"hidden\" id=\"fileid" + (num - 1) + "\"  name=\"fileid\" value=\""+a[0].fileid
			+ "\"  /><td>";
	$(td5).css("background-color", "#fff");			
	var td6 = document.createElement('td');
	td6.innerHTML = "<td  ><center><a href='javascript:modifyRow(" + num + ")'>编辑</a> | <a href='javascript:delAllocationTaskRow(" + num + ")'>删除</a></center><td>";
	$(td6).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td7);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tr.appendChild(td6);
	tb.appendChild(tr);			
}

//处理编辑行
function modifyAllocationTaskLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delAllocationTaskRow(number);
	addAllocationTaskLine(obj);
}



//删除行
function delAllocationTaskRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "dealusername" + i);
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "dealuserid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "title" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "allocationcontent" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "workload" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "completedate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "fileid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:modifyRow(" + (i + 1) + ")'>编辑</a>  |  <a href='javascript:delAllocationTaskRow(" + (i + 1) + ")'>删除</a></center>";
	}
}
/**********************任务下单分配end**********************************/

/**********************任务下单反馈begin**********************************/
//处理新增行
function addFeedbackTaskLine(obj) {
	var a =obj[1];
	a=eval(a);
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);
	var num = tb.childNodes.length + 1;
	var tr = document.createElement('tr');

	var td1 = document.createElement('td');
	td1.innerHTML = "<td >" + num+"." + "</td>";
	$(td1).css({"background-color":"#fff","text-align":"center"});
	var td2 = document.createElement('td');
	td2.innerHTML = "<td  >"+a[0].feedbackcontent+"<input type=\"hidden\"  id=\"feedbackcontent" + (num - 1) + "\"  name=\"feedbackcontent\" value=\""+a[0].feedbackcontent
			+ "\" size=\"60\" /><td>";
	$(td2).css({"background-color":"#fff","text-align":"center"});
	var td3 = document.createElement('td');
    td3.innerHTML = "<td >"+a[0].feedbackstatus+"<input type=\"hidden\" id=\"feedbackstatus" + (num - 1) + "\"  name=\"feedbackstatus\" value=\""+a[0].feedbackstatus
            + "\" /><input type=\"hidden\" id=\"feedbackid" + (num - 1) + "\"  name=\"feedbackid\" value=\""+a[0].feedbackid
            + "\" /><td>";
	$(td3).css({"background-color": "#fff","text-align":"center"});			
	var td4 = document.createElement('td');
	td4.innerHTML = "<td >"+a[0].feedbackdate+"<input type=\"hidden\" id=\"feedbackdate" + (num - 1) + "\"  name=\"feedbackdate\" value=\""+a[0].feedbackdate
			+ "\"   /><td>";
	$(td4).css("background-color", "#fff");			
	var td5 = document.createElement('td');
	td5.innerHTML = "<td  ><center><a href='javascript:modifyRow(" + (num-1) + ")'>编辑</a>  |  <a href='javascript:delFeedbackTaskRow(" + num + ")'>删除</a></center><td>";
	$(td5).css("background-color", "#fff");
	tr.appendChild(td1);
	tr.appendChild(td2);
	tr.appendChild(td3);
	tr.appendChild(td4);
	tr.appendChild(td5);
	tb.appendChild(tr);			
}

//处理编辑行
function modifyFeedbackTaskLine(obj){
	//删除此行，重新新增一行置于最后
	var number = obj[2]*1+1;
	delFeedbackTaskRow(number);
	addFeedbackTaskLine(obj);	
}

//删除行
function delFeedbackTaskRow(n) {
	var document = window.frames["ContentBottomiframe"].document;
	tb = document.getElementById('tb').getElementsByTagName('TBODY')[0];
	removeTextNode(tb);

	tb.removeChild(tb.childNodes[n - 1]);
	for ( var i = 0; i < tb.childNodes.length; i++) {
		removeTextNode(tb.childNodes[i]);
		tb.childNodes[i].firstChild.innerHTML = i + 1 + ".";
		tb.childNodes[i].firstChild.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackcontent" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackstatus" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.getElementsByTagName('input')[1].setAttribute("id", "feedbackid" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.getElementsByTagName('input')[0].setAttribute("id", "feedbackdate" + i);
		tb.childNodes[i].firstChild.nextSibling.nextSibling.nextSibling.nextSibling.innerHTML = "<center><a href='javascript:modifyRow(" + i + ")'>编辑</a>  |  <a href='javascript:delFeedbackTaskRow(" + (i + 1) + ")'>删除</a></center>";
	}
}
/**********************任务下单反馈end**********************************/
//已选择的人员
function initUser(a,b){ alert(2);
	var document = window.frames["ContentBottomiframe"].document;
	var userids = document.parent.getElementById("userids"); //$("#userids").val();
	var usernames = $("#usernames").val();
	alert(userids);
}
