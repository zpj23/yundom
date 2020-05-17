
function getContextid(id){
       //获取选中id的org实体类信息
       orgService.showOneOrg(id,function (data){       
       //名称
       $("#orgName").val(data.orgName);
       //机构类别
       var orgtype = document.getElementsByName("orgType");
       for(var i=0;i<orgtype.length;i++){       
          if(orgtype[i].value == data.orgType){
             orgtype[i].checked=true;
          }
       }   
       if(data.orgType==2){
     		 $("#parentDeptTr").css("display","");
         }else{
     		$("#parentDeptTr").css("display","none");
     	   }
       
       //业务类型
       $("#businessType").val(data.businessType);       
       //部门类别
       $("#deptType").val(data.deptType);       
       //备注       
       $("#description").val(data.description);
       //上级部门
       $("#parentDeptid").val(data.parentDeptid);
       $("#parentDeptname").val(data.parentDeptname);
       //级别
       $("#orgLevel").val(data.orgLevel);
       //父级id
       $("#parentOrgid").val(data.parentOrgid);
       //主键
       $("#id").val(id);
       
       $("#orgidsPath").val(data.orgidsPath);
       $("#orgnamesPath").val(data.orgnamesPath);
       
       if(data.orgType==2){
    	   $("#deptidsPath").val(data.deptidsPath);
           $("#deptnamesPath").val(data.deptnamesPath);
       }else{
    	   $("#deptidsPath").val("");
           $("#deptnamesPath").val("");
       }
       
       
       });
       
	}



/**
 * 选择部门时显示上级部门选择
 * @param flag  1-机构 ，2-部门
 */
function showParentDept(flag){	
	if(flag=='2'){
		$("#parentDeptTr").css("display","");
	}else{
		$("#parentDeptTr").css("display","none");
	}
}

//新增子机构，将页面上的数据清空
function addChildOrg(){
	//名称
    $("#orgName").val("");
    //机构类别
    var orgtype = document.getElementsByName("orgType");       
    for(var i=0;i<orgtype.length;i++){       
       if(orgtype[i].value == 1){
          orgtype[i].checked=true;//默认机构
       }
    }       
    //业务类型
    $("#businessType").val("");       
    //部门类别
    $("#deptType").val("");
    //备注       
    $("#description").val("");
    //上级部门
    $("#parentDeptid").val("");
    $("#parentDeptname").val("");
    
    //当前选中节点的id
    var zTree = $.fn.zTree.getZTreeObj("treeMenuDiv");
    var treeNode = zTree.getSelectedNodes()[0];
    orgService.showOneOrg(treeNode.id,function (data){  
    	//级别
        $("#orgLevel").val(data.orgLevel*1+1);
        //父级id
        $("#parentOrgid").val(data.id);
        //主键
        $("#id").val("");
        
        $("#orgidsPath").val(data.orgidsPath);
        $("#orgnamesPath").val(data.orgnamesPath);
        
        if(data.orgType==2){
     	   $("#deptidsPath").val(data.deptidsPath);
            $("#deptnamesPath").val(data.deptnamesPath);
        }
    	
    	
    	
    });    
    
}




//保存信息
function saveOrg(org){
	$(org).validate({  
		rules : { 
			"org.orgName" : {
				required : [ "机构名称" ]
			},
			"org.orgType" : {
				required : [ "机构类别" ]
			},
			"org.parentDeptid" : {
				required : [ "上级部门" ]
			},
			"org.businessType" : {
				required : [ "业务类别" ]
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
	var isSubmit = $(org).validate().form();  
	if(isSubmit){
	/*form1.action = "orgAction_doDealOrg";
	$(form1).submit();*/		
		
		var orginfo = new Array();
		
		var id_ = $("#id").val();
		if(id_==''){
			id_ =0;
		}
		
		var orgName_ = $("#orgName").val();
		var orgtypeobj = $('input[name="orgType"]');
		var orgType_;
		for(var i=0;i<orgtypeobj.length;i++){
			if(orgtypeobj[i].checked){
				orgType_ = orgtypeobj[i].value;
			}
		}
		
		var businessType_ = $("#businessType").val();
		var deptType_ = $("#deptType").val();
		var parentOrgid_ = $("#parentOrgid").val();
		var parentDeptid_ = $("#parentDeptid").val();
		var parentDeptname_ = $("#parentDeptname").val();
		var description_ = $("#description").val();
		var orgLevel_ = $("#orgLevel").val();
		var orgidsPath_ = $("#orgidsPath").val();
		var orgnamesPath_ = $("#orgnamesPath").val();
		
		
		if(orgType_==2){//部门
			var deptidsPath_ = $("#deptidsPath").val();
			var deptnamesPath_ = $("#deptnamesPath").val();
			orginfo[0]={
					id : id_,
					orgName : orgName_,
					orgType : orgType_ ,
					businessType : businessType_,
					deptType : deptType_,
					parentOrgid : parentOrgid_,
				    parentDeptid : parentDeptid_,
				    parentDeptname : parentDeptname_,
				    description : description_,
				    orgLevel : orgLevel_,
				    orgidsPath : orgidsPath_,
				    orgnamesPath : orgnamesPath_,
				    deptidsPath : deptidsPath_ ,
				    deptnamesPath : deptnamesPath_
				    
				};
		}else{//机构
			orginfo[0]={
					id : id_,
					orgName : orgName_,
					orgType : orgType_ ,
					businessType : businessType_,
					deptType : deptType_,
					parentOrgid : parentOrgid_,
				    parentDeptid : parentDeptid_,
				    parentDeptname : parentDeptname_,
				    description : description_,
				    orgLevel : orgLevel_,
				    orgidsPath : orgidsPath_,
				    orgnamesPath : orgnamesPath_
				    
				};
		}
		
		orgService.saveOrg(orginfo,function (data1){
			if(data1=='0'){
				alert('保存失败');
			}else{				
				var orgid = data1.split("_")[0];
				var operateStatus =data1.split("_")[1]; 	
				 orgService.showOneOrg(orgid,function (data){       
				       //名称
				       $("#orgName").val(data.orgName);
				       //机构类别
				       var orgtype = document.getElementsByName("orgType");       
				       for(var i=0;i<orgtype.length;i++){       
				          if(orgtype[i].value == data.orgType){
				             orgtype[i].checked=true;
				          }
				       }       
				       //业务类型
				       $("#businessType").val(data.businessType);       
				       //部门类别
				       $("#deptType").val(data.deptType);
				       //备注       
				       $("#description").val(data.description);
				       //上级部门
				       $("#parentDeptid").val(data.parentDeptid);
				       $("#parentDeptname").val(data.parentDeptname);
				       //级别
				       $("#orgLevel").val(data.orgLevel);
				       //父级id
				       $("#parentOrgid").val(data.parentOrgid);
				       //主键
				       $("#id").val(orgid);
				       
				       $("#orgidsPath").val(data.orgidsPath);
				       $("#orgnamesPath").val(data.orgnamesPath);
				       
				       if(data.orgType==2){
				    	   $("#deptidsPath").val(data.deptidsPath);
				           $("#deptnamesPath").val(data.deptnamesPath);
				       }else{
				    	   $("#deptidsPath").val("");
				           $("#deptnamesPath").val("");
				       }
				       
				       
				        var zTree = $.fn.zTree.getZTreeObj("treeMenuDiv");
				        var treeNode = zTree.getSelectedNodes()[0];
				        
				        
				        var img = "images/tree/file.gif";
			        	 //机构和部门的图片控制
			        	if(data.orgType==2){
			        	  img = "";	
			        	}
				        if(operateStatus=='add'){
				        	var funcon = "getContextid('"+orgid+"')";					        
					        zTree.addNodes(treeNode, {id:orgid, pId:data.parentOrgid, 
					        	name:data.orgName,click:funcon,icon:img});
					        //return false;
				        }
				        if(operateStatus=='update'){
				        	treeNode.name = data.orgName;				        	
				        	treeNode.icon=img;
				 		    zTree.editName(treeNode);				        	
				        }
				            
				       });
				 alert('保存成功');
			}
			
			
		});
		
	}
}




//删除此机构
function delOrg(){
	var id = $("#id").val();
	
		orgService.delOrg(id,function (data){
			if(data=='1'){
				alert("删除成功");
				var zTree = $.fn.zTree.getZTreeObj("treeMenuDiv");
				  var treeNode = zTree.getSelectedNodes()[0];
				  zTree.removeNode(treeNode);				
			}
			else if(data=='2'){
				alert("存在下级");
			}else{
				alert("删除出错");
			}
			
		});
	
}



//选择部门
function chooseDept(){
	var parentDeptid = $("#parentDeptid").val(); 
	var parentDeptname = $("#parentDeptname").val(); 
	JqueryDialog.Open('上级机构选择(单选)', 'orgAction_chooseOrg?parentDeptid='+parentDeptid+'&parentDeptname='+parentDeptname, 700, 500);
	
}


//点击选择一个部门
function getOneDeptInfo(id,name){
	var isone = $("#isone").val();	
	var orgid = $("#selectid").val();
	var orgname = $("#selectname").val();	
	if(isone=='y'){
		   $("#deptselect").empty();	   
		    $("#deptselect").append("<option value='"+id+"'>"+name+"<option>"); 
		    $("#selectid").val(id);
		    $("#selectname").val(name);			   
	   }else{			   
		   //$("#deptselect").append("<option value='"+id+"'>"+$.trim(name)+"<option>");
		   var iid = $("#selectid").val();
		   if (("," + iid).indexOf(',' + id + ',') < 0) {
		   document.getElementById("deptselect").options.add(new Option(name,id));
		   $("#selectid").val(orgid+id+',');
		   $("#selectname").val(orgname+name+',');
		   }
	   }
}


//取消已选择的上级部门
function cancleOneDept(){
		var checkText = $("#deptselect").find("option:selected").text(); //获取Select选择的Text   
		var checkValue = $("#deptselect").val(); //获取Select选择的Value
		var iid = $("#selectid").val();
		var iname = $("#selectname").val();
		iid = iid.replace(checkValue + ",", "");
		iname = iname.replace(checkText + ",", "");
		$("#selectid").val(iid);
		$("#selectname").val(iname);
		//删除所选项
		$("#deptselect option[value='" + checkValue + "']").remove();

}


//确定已选择的上级部门
function returnDeptValue(){
	
	window.opener.document.getElementById("parentDeptid").value = $("#deptid").val();
	window.opener.document.getElementById("parentDeptname").value = $("#deptname").val();
	window.opener.document.getElementById("deptidsPath").value = $("#deptidsPath").val();
	window.opener.document.getElementById("deptnamesPath").value = $("#deptnamesPath").val();
	
}




