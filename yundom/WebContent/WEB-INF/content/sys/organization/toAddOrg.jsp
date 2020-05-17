<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
		<title></title>
		
		<script type="text/javascript">
		var typeData = [ {
			id : '1',
			text : '机构'
		}, {
			id : '2',
			text : '部门'
		} ];
		
		$().ready(function (){
			 $('#orgType').combobox({   
				valueField : 'id',
				textField : 'text',
				onSelect: function(rec){
		            $('#type').val(rec.id);
		        }
			});
			$("#orgType").combobox("loadData", typeData);
			
			$('#pdept').combotree({
				url:'orgAction_chooseOrgJson',
				onSelect: function(rec){    
		            $('#parentDeptid').val(rec.id);
		            $('#parentDeptname').val(rec.text);
		        }
			});
			 
		});
		
		
		//保存
		var result = false;
		function saveOrg(){			  
				$('#form1').form('submit',{
					url:'orgAction_addOrginfo',
					onSubmit:function(){	
						//验证机构编码是否存在
						$.ajax({
							type:"post",
							url:"orgAction_checkOrgcode?orgCode="+$("#orgCode").val(), 
							async : false,
							cache:false,
							success: function(data) {
							if(data==1){
								common.alert_error('该组织机构编码已存在，请重新填写!');
								result = false;
							}else{
								result = $("#form1").form('validate');
							}
						  }
						});
						
						return result;
					},
				    success: function(){				    	
			    	//刷新父页面，关闭window
			    	common.alert_success('保存成功','orgAction_init?openid='+$("#parentOrgid").val());
				 }
				});                
			}
	
		
		//返回
		function back(){
			//关闭window
			common.closeWindow(null);
		}
		
	
		
	
		</script>
	</head>
	<body id="body">	
	<div  style="width:auto;">
				<form action="" method="post" id="form1" class="form" >					
						<table class="tableForm">							
							<tr>
								<th>
									名称<font style="color: red">(*)</font>：
								</th>
								<td>									
									<input class="easyui-validatebox" type="text" name="orginfo.orgName" maxlength="50" id="orgName"
									 data-options="required:true" value="${orginfo.orgName}" ${orginfo.orgName eq null?"":"readonly" } /> 	
									 
								</td>
								<th>
									类别<font style="color: red">(*)</font>：
								</th>
								<td>
									<input class="easyui-combobox" type="text" name="" id="orgType" 
									   data-options="required:true,tipPosition:'left'" />
									<input type="hidden"  name="orginfo.orgType" id="type" value="${orginfo.orgType}" />   
								</td>
							</tr>
                            
							<tr>
								<th>
									编码<font style="color: red">(*)</font>：
								</th>
								<td>								   
								   <input class="easyui-validatebox" type="text" name="orginfo.orgCode" id="orgCode" data-options="required:true"
								    validType="length[1,30]"  value="${orginfo.orgCode}" />	
								</td>
								<th>
									上级部门：
								</th>
								<td>								   
								   <input class="easyui-combotree" type="text" name="pdept" id="pdept" 
									  value="${orginfo.parentDeptid}"  />									  
									<input type="hidden"  name="orginfo.parentDeptid" id="parentDeptid" value="${orginfo.parentDeptid}" />
									<input type="hidden"  name="orginfo.parentDeptname" id="parentDeptname" value="${orginfo.parentDeptname}" />
								</td>
							</tr>										
						</table>
						
						<input type="hidden" name="orginfo.id" id="id"
							value="${orginfo.id}" />
						<input type="hidden" name="orginfo.parentOrgid" id="parentOrgid"
							value="${orginfo.parentOrgid}" />
				</form>
			
			<div class="dialog-button" style="text-align:center;padding:5px">
		    	<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-save" onclick="saveOrg();">保存</a>
		    	<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-close" onclick="back();">关闭</a>
	        </div>
	</div>
		
		
	</body>
	
</html>