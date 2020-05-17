//全选按钮的控制
var checkboxFlag=true;
function allCheck(cssClass) {
	$("." + cssClass).attr("checked", checkboxFlag);
	var obj = $('input[name="checkid"]');
	if(checkboxFlag){
		for(var i=0;i<obj.length;i++){
			obj[i].checked = true;
		}
	}else{
		for(var i=0;i<obj.length;i++){
			obj[i].checked = false;
		}
	}	
	checkboxFlag = !checkboxFlag;	
}

//点击查询
function selectList(){
	//当未选中第几页而点击查询时重置页数
	var topage = $("#topage").val();
	if(topage==''){
		$("#page").val(1);
	}else{
		$("#page").val(topage);
	}
	form1.action = "dynamicShowAction_toList";
	form1.submit();
}

 function toAddDynamic(){
	 form1.action = "dynamicShowAction_toAdd";
	 form1.submit();
 }



 function saveDynamicData(table){
	 
	 $(table).validate({  
			rules : { 
				
				
			},  
			// 验证通过时的处理
			success : function() { 
			},
			errorPlacement : function(error, element) { 
				error.appendTo(element.parent());
			},
			focusInvalid : false,
			onkeyup : false
		});	
		var isSubmit = $(table).validate().form();  
		if(isSubmit){
			 if(confirm("您确定保存吗?")){
				 form1.action = "dynamicShowAction_doAdd";
				 form1.submit();
			 }
		}
 }


  //编辑
  function toModifyDynamic(id){	  
	  form1.action ="dynamicShowAction_toModify?id="+id;
	  form1.submit();
  } 

 
  //执行编辑
 function modifyDynamicData(form1){
	 
	 if(confirm("您确定保存吗?")){
		 form1.action = "dynamicShowAction_doModify";
		 form1.submit();		 
	 }
	
 }


 
//执行删除
 function delDynamicOne(id){	 
	 if(confirm("您确定删除吗?")){
		 form1.action = "dynamicShowAction_doDel?id="+id;
		 form1.submit();		 
	 }	
 }
 
 
 function delDynamicSome(){
	 var val = checkSelectBox2('checkid','删除');
		if(val!=0){
			if(confirm('确定要删除吗')){
				form1.action = "dynamicShowAction_doDel?id="+val;
				form1.submit();
			}
		}
 }
 
 
 
 
 function changeProvince(code,name){
		$.post("dynamicShowAction_changeArea", {
			code : code
		}, function(data) {
			var obj=  eval(data);
			var a =" <select name='"+name+"_city' style='height:20px;vertical-align:middle;width:100px;' onchange=\"changeCity(this.value,'"+name+"')\" id='"+name+"_city'><option value=''>--请选择--</option>";
			for(var i=0;i<obj.length;i++){
				a=a+"<option value='"+obj[i].code+"'>"+obj[i].name+"</option>";
			}
			a=a+"</option>";
			var a_= name+'citydiv';
			$("#"+a_).html(a);
			var b_= name+'areadiv';
			$("#"+b_).html(" <select name='"+name+"_area' style='height:20px;vertical-align:middle;width:100px;' onchange=\"changeArea(this.value,'"+name+"')\" id='"+name+"_area' class='project'><option value=''>--请选择--</option></select>");
			var c_= name+'streetdiv';
			$("#"+c_).html(" <select name='"+name+"_street' style='height:20px;vertical-align:middle;width:100px;'  id='"+name+"_street' class='project'><option value=''>--请选择--</option></select>");
		});
	}


	function changeCity(code,name){
		$.post("dynamicShowAction_changeArea", {
			code : code
		}, function(data) {
			var obj=  eval(data);
			var a =" <select name='"+name+"_area' style='height:20px;vertical-align:middle;width:100px;' onchange=\"changeArea(this.value,'"+name+"')\" id='"+name+"_area' class='project'><option value=''>--请选择--</option>";
			for(var i=0;i<obj.length;i++){
				a=a+"<option value='"+obj[i].code+"'>"+obj[i].name+"</option>";
			}
			a=a+"</option>";
			var b_= name+'areadiv';  
			$("#"+b_).html(a);
			var c_= name+'streetdiv';
			$("#"+c_).html(" <select name='"+name+"_street' style='height:20px;vertical-align:middle;width:100px;'  id='"+name+"_street' class='project'><option value=''>--请选择--</option></select>");
		});
	}


	function changeArea(code,name){
		$.post("dynamicShowAction_changeArea", {
			code : code
		}, function(data) {
			var obj=  eval(data);
			var a =" <select name='"+name+"_street' style='height:20px;vertical-align:middle;width:100px;'  id='"+name+"_street' class='project'><option value=''>--请选择--</option>";
			for(var i=0;i<obj.length;i++){
				a=a+"<option value='"+obj[i].code+"'>"+obj[i].name+"</option>";
			}
			a=a+"</option>";
			var c_= name+'streetdiv';
			$("#"+c_).html(a);
		});
	}
	
	
	function changeLinkone(code,name){
		$.post("dynamicShowAction_changeArea", {
			code : code
		}, function(data) {
			var obj=  eval(data);
			var a =" <select name='"+name+"two' style='height:20px;vertical-align:middle;width:100px;'  id='"+name+"two' class='project'><option value=''>--请选择--</option>";
			for(var i=0;i<obj.length;i++){
				a=a+"<option value='"+obj[i].code+"'>"+obj[i].name+"</option>";
			}
			a=a+"</option>";
			var c_= name+'linktwodiv';
			$("#"+c_).html(a);
		});
	}
 
 
	//选择子用户(多选)
	function chooseOrgUsers(tagid,tagname,type){
		var ids = $("#"+tagid).val();
		var names = $("#"+tagname).val();
		JqueryDialog.Open('选择用户', 'orgAction_chooseOrgUsers?userids='+ids+'&usernames='+names+'&isone='+type+'&tagid='+tagid+'&tagname='+tagname, 900, 500);
	}
	
	
	//子表新增
	function toAddChildLine(childtablename){
		JqueryDialog.Open('新增', 'dynamicShowAction_toAddChildLine?childtablename='+childtablename, 1000, 700);
	}
	
	
	
	
	
	
	
	
	
	/*function delChildRow2(num){
		alert(11111222222);
	}*/
	
	
	
	//处理新增行
	function addLine1(obj) {	
		var a =jQuery.parseJSON(obj); 
		
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
	function modifyLine(obj){
		//删除此行，重新新增一行置于最后
		var number = obj[2]*1+1;
		delRow(number);
		addLine(obj);
	}

	//删除行
	function delRow(n) {
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
	
	
	function removeTextNode(tb) {
		for ( var i = 0; i < tb.childNodes.length; i++) {
			var node = tb.childNodes[i];
			if (!node || node.nodeType != 1) {
				tb.removeChild(tb.childNodes[i]);
			}
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	

//返回列表
function backList(){
	form1.action = "dynamicShowAction_toList";
	 form1.submit();
}


function checkSelectBox2(idname,msg){	
	var checkids = $('input[name="'+idname+'"]');
	var checknum=0;
	var checkvalue="";
	for(var i=0;i<checkids.length;i++){
		if(checkids[i].checked){
			checkvalue += checkids[i].value+",";
			checknum++;
			}		
	}
	if(checknum==0){
		alert("请选择"+msg+"项");
		return 0;
	}else{
		checkvalue=checkvalue.substring(0,checkvalue.length-1);
		return checkvalue;
	}	
}



