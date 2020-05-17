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




//跳转到新增页面
function newTable(){
	form1.action ="dynamicTableAction_toAddTable";
	form1.submit();
}

//跳转到编辑页面
function modifyTable(id){	
	form1.action ="dynamicTableAction_toAddTable?id="+id;
	form1.submit();
}

//保存表信息
function saveTable(table){	
	$(table).validate({  
		rules : { 
			"tb.name" : {
				required : [ "表名称" ]
			},
			"tb.tablename" : {
				required : [ "数据库表名" ]
			}
			
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
		form1.action ="dynamicTableAction_doAddTable";
		form1.submit();
	}
}


function backList(){
	form1.action ="dynamicTableAction_toList";
	form1.submit();	
}


 // 删除表信息
 function delTables(){
	 var val = checkSelectBox2('checkid','删除');
		if(val!=0){
			$.ajax({
				url:"dynamicTableAction_isHaveColumn?id="+val, 
				async : false,
				success: function(data) {
				$("#isHaveColumn").val(data);
			  }
			});
			
			if($("#isHaveColumn").val()==1){
				alert("选择的表中存在字段，请先删除字段");
				return false;
			}else{
			if(confirm('确定要删除吗')){
				form1.action = "dynamicTableAction_delTable?id="+val;
				form1.submit();
			}
			}
		}
 }


  //查看表信息
  function viewTable(id){
	  form1.action = "dynamicTableAction_viewTable?id="+id;
	  form1.submit();	  
  }


  
  

  //字段列表
  function toColumnList(id){
	  form1.action = "dynamicTableAction_toColumnList?tableid="+id;
	  form1.submit();
  }

//跳转到新增页面
  function newColumn(tableid,tablename){
  	form1.action ="dynamicTableAction_toAddColumn?tableid="+tableid+"&tablename="+tablename;  	
  	form1.submit();
  }

  //跳转到编辑页面
  function modifyColumn(id,tableid){	
  	form1.action ="dynamicTableAction_toAddColumn?id="+id+"&tableid="+tableid;
  	form1.submit();
  }


//保存字段信息
  function saveColumn(column){	
  	$(column).validate({  
  		rules : { 
  			"col.name" : {
  				required : [ "字段名称" ]
  			},
  			"col.columnname" : {
  				required : [ "数据库字段名" ]
  			},
  			"col.number_" : {
  				required : [ "排序号" ],
  				digits:[]
  			}
  			
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
  	var isSubmit = $(column).validate().form();  	
  	if(isSubmit){
  		form1.action ="dynamicTableAction_doAddColumn";
  		form1.submit();
  	}
  }
  
  
//删除字段信息
  function delColumns(tableid){
 	 var val = checkSelectBox2('checkid','删除');
 		if(val!=0){
 			if(confirm('确定要删除吗')){
 				form1.action = "dynamicTableAction_delColumn?id="+val+"&tableid="+tableid;
 				form1.submit();
 			}
 		}
  }


   //查看字段信息
   function viewColumn(id){
 	  form1.action = "dynamicTableAction_viewColumn?id="+id;
 	  form1.submit();	  
   }
  
  
   function backColumnList(tableid){
	   form1.action = "dynamicTableAction_toColumnList?tableid="+tableid;
	   form1.submit();
   }
  
   //控件选择
  function chooseControl(typename){
	  if(typename=='childtable'){
		  //选择子表时字段名称可以不用以表名为前缀
		  var columnname =$("#columnname").val(); 
		  $("#columndiv").html("<input type=\"text\" name=\"col.columnname\" id=\"columnname\" value=\""+columnname+"\" maxlength=\"50\"  />");
	  }
	  
	  if(typename=='select'||typename=='radio'||
		 typename=='checkbox'||
		 typename=='link'||typename=='other'){
		  $("#binddatadiv").css("display","");
		  $("#binddatatablediv").css("display","");
	  }else{
		  $("#binddatadiv").css("display","none");
		  $("#binddatatablediv").css("display","none"); 		 
	  }
  }
  
  
   function changeSource(code){
		$.post("resourceAction_changeResource", {
			code : code
		}, function(data) {
			var obj=  eval(data);
			var a =" <select name='col.resourcecode2' style='height:20px;vertical-align:middle;width:100px;'  id='resourcecode2' ><option value=''>--请选择--</option>";
			for(var i=0;i<obj.length;i++){
				a=a+"<option value='"+obj[i].code+"'>"+obj[i].name+"</option>";
			}
			a=a+"</option>";
			$("#datadiv").html(a);
			
		});
	}

  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  





	//验证
	function checkSelectBox(idname,msg){	
		var checkids = $('input[name="'+idname+'"]');
		var checknum=0;
		var checkvalue;
		for(var i=0;i<checkids.length;i++){
			if(checkids[i].checked){
				checkvalue = checkids[i].value;
				checknum++;
				}		
		}
		if(checknum==0){
			alert("请选择"+msg+"项");
			return 0;
		}else if(checknum>1){
			alert("一次只能"+msg+"一项");
			return 0;
		}else{
			return checkvalue;
		}
		
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















