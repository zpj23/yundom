var outerHTML_, tbody_, tr_, UUID_, 
actionObj_ = {
	sql_ : "",
	bt_ : "",
	childSql_ : "",
	nodeParam : "",
	assignees : []
},
dynamicTableName_, generic_search_orgGuid, generic_blobObjArray = [],processInstanceId_, 
dataGuid, subUrl_, pubTr="", overallDataParam_,  generic_DateObjArray = [],sw_status, taskId_, 
generic_InitObjData=[],requiredArray=[] , tempData="", nextURL="";

// 将HTML包装成DOM元素
function showOuterHTML_(param_obj){
	return $("<"+param_obj.pluginTag+"/>",param_obj);
};

function nbspObj(paramObj_){
	var tempArray=[];
	tempArray.push("&nbsp;");
	tempArray.push(paramObj_);
	outerHTML_ = tempArray.join("");
}

var validatebox = {
	// 验证字段数组
	validateboxArray:[],
	validateObj:function(columnObj){
		if(columnObj.verifyinfo!=null && columnObj.verifyinfo!=""){
			var tempValidate = {colName:columnObj.colName, verifyinfo:columnObj.verifyinfo}
			this.validateboxArray.push(tempValidate);
		}
	},
	validate:function(param, paramAttr){
		$('#'+param.colName).validatebox({
			 required : true,
			 validType: param.verifyinfo,
			 novalidate : paramAttr
		})
		.focus(function(){$(this).validatebox('enableValidation');})
		.blur(function(){$(this).validatebox('validate')});
	},
	initValidate:function(paramAttr){
		$.each(this.validateboxArray,function(k,v){
			validatebox.validate(v, paramAttr);
		})
	}
}

var checkbox={
	nameArray:[],         
    objArray:[],
	initObj:function(param, columnObj, dataArray){
		param.type="checkbox";
		this.nameArray.push(columnObj.colName);
		param["style"]="vertical-align:middle;margin-top:-1px;";
		var outHtml="";
		if(dataArray[0]!=undefined){
			$.each(dataArray[0].dataMap, function(k,v){
				param.value=k;
				var checkboxObj = showOuterHTML_(param);
				outHtml+=checkboxObj[0].outerHTML+"<label style=\"cursor:pointer;\">"+v+"</label>";
			});
			nbspObj(outHtml);
		}else{
			this.specialObj(param, columnObj);
		}
	},
	specialObj:function(param,columnObj){
		if(columnObj.colRemark=="督查督办"){
			param["onclick"]="specialBus(this)";
		}if(columnObj.colRemark=="领导关注"){
			param["onclick"]="addLink(this,'guanzhu')";
			//param["onclick"]="updateStatus(this)";
		}
		param["style"]="vertical-align:middle;margin-top:-1px;";
		var checkboxObj = showOuterHTML_(param);
		var outHtml=checkboxObj[0].outerHTML+"<label style=\"cursor:pointer;\">"+columnObj.colRemark+"</label>";
		nbspObj(outHtml);
	},
	dataBinding:function(param){
		param[0].dataMap
	}
}

function addLink(param,linkflag,tablelinkid){
	if(param.checked==undefined){
		//默认是radio点击，当按钮点击时
		param.checked = true;
	}
	if(param.checked){
		$.post("processAction_addlink", {islink:param.checked,linkflag:linkflag,tableid:tablelinkid});
		common.alert_info('操作成功');
	}else{
		$.post("processAction_addlink", {islink:param.checked,linkflag:linkflag,tableid:tablelinkid});
		common.alert_info('取消成功');
	}
	
	
}

function updateStatus(param){
	$.post("processAction_updateStatus", {status_:window.parent.UserObj.userName.trim()+$(param).next().text(), processInstanceId:processInstanceId_});
	alert('操作成功');
}

function specialBus(param){
	var swdb_ = param.checked;
	swdb_==true ? swdb_ = 1 : swdb_ = 2;
	$.post("processAction_updateSWDB", {swdb:swdb_, taskId_:taskId_});
	alert('操作成功');
}


// input对象
var inputObj = {
	// 地图精度
	mapLng : "",
	// 地图纬度
	mapLat : "",
	// 临时对象
	tmpObj : [],
	
	/*input_ : {
	    pluginTag: "",
	    type: "text",
	    value: "",
	    name: "",
	    id: ""
	},*/
	// 初始化input对象
	init:function(plugObj, columnObj, dataArray, tagName_){
		$.extend(inputObj, dataBinding);
	
		// input对象绑定源数据
		if(tagName_=="INPUT"){
			this.input_ ={
			    pluginTag: plugObj.pluginTag,
			    type: "text",
			    value: plugObj.pluginDefaultvalue,
			    name: columnObj.colName,
			    id: columnObj.colName
			}
			
			this.inputBinding(this.input_, dataArray);
			
			// input对象日期类型
			if(plugObj.pluginType.toUpperCase()=='DATE'){
				this.input_['onclick']='WdatePicker({readOnly:true})';
				this.input_['readonly']=true;
				generic_DateObjArray.push(columnObj.colName.toUpperCase());
			}
			
			// input对象上传类型
			if(columnObj.isRead=="1"){
				this.input_['readonly'] = 'readonly';
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="number"){
				
			}
			
			// 地图
			if(plugObj.pluginType=="map"){
				//this.input_['onclick']='common.openWindow("选择地点", "genericAction_map", 900, 650);';
				var tmepStr = this.tmpObj.join();
				if(tmepStr.indexOf(columnObj.colName.toUpperCase())==-1){
					this.tmpObj.push(columnObj.colName.toUpperCase());
				}
			}
			
			nbspObj(showOuterHTML_(this.input_)[0].outerHTML);
			
			// input对象单选框类型
			if(plugObj.pluginType=="radio"){
				input_.type="radio";
				var man_radioChecked = showOuterHTML_(this.input_);
				var Obj_ = $.extend({}, this.input_);
				var womanObj_ = $.extend({}, this.input_);
				womanObj_.value="AA0202";
				var woman_radioChecked = showOuterHTML_(womanObj_);
				if(input_.value=="AA0201"){
					man_radioChecked.attr({"checked":true, value:"AA0201"});
				}else{
					woman_radioChecked.attr("checked",true);
				}
				nbspObj("<lable>"+man_radioChecked[0].outerHTML+"男</lable>"+"<lable>"+woman_radioChecked[0].outerHTML+"女</lable>");
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="file"){
				/*this.input_.type="file";
				this.input_.name=UUID_+"uploadify";
				this.input_['id']=UUID_+"uploadify";
				nbspObj(showOuterHTML_(this.input_)[0].outerHTML+$("<div>",{id:"FileList_"+UUID_+"uploadify"})[0].outerHTML);*/
			
				/*input_.type="hidden";
				input_.name="fileid";
				input_['id']="fileid";
				input_.value = dataGuid;*/
								
				// outerHTML_ = showOuterHTML_(input_)[0].outerHTML+"</input>"+$("<div>",{id:"myuploadify"})[0].outerHTML+$("<div>",{id:"FileList_myuploadify"})[0].outerHTML;
			
				outerHTML_ = "<div id=\"myuploadify\" style=\"height:0px;width:32px;\"></div>" +
						"<input type=\"hidden\" id=\"fileid\" name=\"fileid\" value=\""+dataGuid+"\" />" +
								"<div id=\"FileList_myuploadify\" ></div>";
				nbspObj(outerHTML_);
			}
			
			if(plugObj.pluginType=="checkbox"){
				checkbox.initObj(this.input_, columnObj, dataArray);
			}
			
		}
		
		
		validatebox.validateObj(columnObj);
	},
	
	beforeInit:function(plugObj, columnObj, dataArray, tagName_, tableGuid_){
		$.extend(inputObj, dataBinding);
		
		// input对象绑定源数据
		if(tagName_=="INPUT"){
			var input_ ={
			  pluginTag: plugObj.pluginTag,
			  type: "text",
			  value: plugObj.pluginDefaultvalue,
			  name: columnObj.colName+"LWD"+tableGuid_,
			  id: columnObj.colName+"LWD"+tableGuid_
			};
			dataBinding.inputBinding(input_, dataArray);
			
			// input对象日期类型
			if(plugObj.pluginType.toUpperCase()=='DATE'){
				input_['onclick']='WdatePicker({readOnly:true})';
				input_['readonly']=true;
				generic_DateObjArray.push(columnObj.colName.toUpperCase());
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="number"){
				
			}
			
			nbspObj(showOuterHTML_(input_)[0].outerHTML);
			
			// input对象单选框类型
			if(plugObj.pluginType=="radio"){
				input_.type="radio";
				var man_radioChecked = showOuterHTML_(input_);
				var Obj_ = $.extend({}, input_);
				var womanObj_ = $.extend({}, input_);
				womanObj_.value="AA0202";
				var woman_radioChecked = showOuterHTML_(womanObj_);
				if(input_.value=="AA0201"){
					man_radioChecked.attr({"checked":true, value:"AA0201"});
				}else{
					woman_radioChecked.attr("checked",true);
				}
				nbspObj("<lable>"+man_radioChecked[0].outerHTML+"男</lable>"+"<lable>"+woman_radioChecked[0].outerHTML+"女</lable>");
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="file"){
				input_.type="file";
				input_.name=dataGuid+"uploadify";
				input_['id']=dataGuid+"uploadify";
				nbspObj(showOuterHTML_(input_)[0].outerHTML+$("<div>",{id:"FileList_"+dataGuid+"uploadify"})[0].outerHTML);
			}
			
			if(plugObj.pluginType=="checkbox"){
				checkbox.initObj(input_, columnObj, dataArray);
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
			if(columnObj.isInit == 1){
				generic_InitObjData.push(columnObj.colName.toUpperCase());
			}
			var tempVal = showOuterHTML_(select_)
			.append(this.selectBinding(dataArray))
			.prepend($("<option/>",{text: "------请选择------"}))[0].outerHTML;
			nbspObj(tempVal);
		}
		validatebox.validateObj(columnObj);
	},
	beforeInit:function(plugObj, columnObj, dataArray, tagName_, tableGuid_){
		$.extend(selectObj, dataBinding);
		if(tagName_=="SELECT"){
			var select_ = {
			  pluginTag:plugObj.pluginTag,
			  name: columnObj.colName+"LWD"+tableGuid_,
			  optionValue: plugObj.pluginDefaultvalue,
			  id: columnObj.colName+"LWD"+tableGuid_
			};
			if(plugObj.pluginType=="JL"){
				select_["onchange"]="showChildrenSelect(this)";
			}
			var tempVal = showOuterHTML_(select_)
			.append(this.selectBinding(dataArray))
			.prepend($("<option/>",{text: "------请选择------"}))[0].outerHTML;
			nbspObj(tempVal);
		}
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
			  name: columnObj.colName.toUpperCase(),
			  id: columnObj.colName.toUpperCase()
			};
			outerHTML_ =showOuterHTML_(textarea_)[0].outerHTML;
		}
		if((columnObj.colType.toUpperCase()=='CLOB'||columnObj.colType.toUpperCase()=='TEXT') && columnObj.isHid!=1){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}
		validatebox.validateObj(columnObj);
	},
	beforeInit:function(plugObj, columnObj, tagName_, tableGuid_){
		if(tagName_=="TEXTAREA"){
			var textarea_ = {
			  pluginTag:plugObj.pluginTag,
			  name: columnObj.colName+"LWD"+tableGuid_,
			  id: columnObj.colName+"LWD"+tableGuid_
			};

			outerHTML_ =showOuterHTML_(textarea_)[0].outerHTML;
		}
		if(columnObj.colType.toUpperCase()=='BLOB' && columnObj.isHid!=1){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}
	}
};

// 子表对象
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
				if(v.columnObj.isHid!=1){
					showTd_ +="<td style='border: 1px solid #95B8E7;'>"+v.columnObj.colRemark+"</td>";
					columnArray +=$('<td>',{'style':'border: 1px solid #95B8E7;','align':'center'}).append($(outerHTML_).attr("class", "child_"+v.columnObj.colName))[0].outerHTML;
				}
			});
			 showTd_+="<td style='border: 1px solid #95B8E7;'>操作</td>";
			 table_tbody_.append($("<tr/>",{"style":"height:30px;text-align:center;background:linear-gradient(to bottom, #FDFDFD 0px, #F5F5F5 100%) repeat-x scroll 0 0 rgba(0, 0, 0, 0);"}).append(showTd_));
			 columnArray+="<td align='center' style='border: 1px solid #95B8E7;'><input type='hidden' name='"+childResult_[0].dataForm.tableName+"_GUID' id='"+childResult_[0].dataForm.tableName+"_GUID' /><img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/search.png\" onclick=\"chooseSWRY(this)\" alt=\"选择\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_add.png\" onclick=\"add()\" alt=\"新增\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_remove.png\" onclick=\"del(this)\" alt=\"删除\"></td>";
			 table_tbody_.append($("<tr/>").append(columnArray));
			 var formObj_ = $("<form id=\"childTableForm\">").append(table_tbody_.parent());
			 outerHTML_ =formObj_[0].outerHTML;
		}
	},
	initshow:function(plugObj, childResult_){
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
				if(v.columnObj.isHid!=1){
					showTd_ +="<td style='border: 1px solid #95B8E7;'>"+v.columnObj.colRemark+"</td>";
					columnArray +=$('<td>',{'style':'border: 1px solid #95B8E7;','align':'center'}).append($(outerHTML_).attr("class", "child_"+v.columnObj.colName))[0].outerHTML;
				}
			});
			table_tbody_.append($("<tr/>",{"style":"height:30px;text-align:center;background:linear-gradient(to bottom, #FDFDFD 0px, #F5F5F5 100%) repeat-x scroll 0 0 rgba(0, 0, 0, 0);"}).append(showTd_));
			 //columnArray+="<td align='center' style='border: 1px solid #CCCCCC;'><input type='hidden' name='"+childResult_[0].dataForm.tableName+"_GUID' id='"+childResult_[0].dataForm.tableName+"_GUID' /></td>";
			 table_tbody_.append($("<tr/>").append(columnArray));
			 var formObj_ = $("<form id=\"childTableForm\">").append(table_tbody_.parent());
			 outerHTML_ =formObj_[0].outerHTML;
		}
	}
};

// 源数据绑定
var dataBinding = {
	// select对象数据源绑定
	selectBinding:function(param_){
		var option_="";
		if(param_[0]!=undefined){
			$.each(param_[0].dataMap, function(k,v){
				option_ += $("<option/>",{text: v, value: k})[0].outerHTML;
			});
		}
		return option_;
	},
	
	// input对象数据源绑定
	inputBinding:function(param1_,param2_){
		if(param2_[0]!=undefined){
			$.each(param2_, function(k,v){
				if(param1_.value!="AA0201" && param1_.value!="AA0202"){
					param1_.value = v.childDataGuid;
				}
			});
		}
		return param1_;
	}
}


// 公共对象
var generic={
	// 初始化信息
	init:function(divname){
		$("#"+divname).append("<form id=\"tableForm\"><table class=\"btable tableForm\" width=\"100%\"><tbody></tbody></table></form>");
		tbody_ = $("#"+divname).find("form").children(".btable").find("tbody");
	},
	
	// easyui datagrid json赋值
	JSONData:function(urlData,paramData,datagrid_id){
		$('#'+datagrid_id).datagrid({
			url:urlData,
			queryParams:paramData 
		}); 
	},
	
	// 动态表单数据展示
	ShowForm:function(param, path_, btnObj,divname){
		if(param==null || param==""){
			return;
		}
		tr_=undefined;
		// 全局数据
		overallDataParam_ = param;
		this.init(divname);
		if(param.layoutResult=="table"){
			tbody_.append("<tr><td colspan=\"10\" class=\"dynamicTd\" style=\"line-height:30px;\"><b><center>"+param.dataForm.remark+"</center></b></td></tr>");
			$.each(param.dataResult,function(k,v){
				var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
				// 表单名称是否必填
				requiredVal(v.columnObj);
				// input初始化
				inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// select初始化
				selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// textarea初始化
				textareaObj.init(v.plugObj, v.columnObj, tagName_);
				// 子表初始化
				tableObj.init(v.plugObj, param.childResult);
				// 数据输出
				outHTML(v.columnObj, tagName_, v.plugObj);
				
				generic.initObjData(v.plugObj, v.columnObj, v.dataArray);
			});
		
		}
		
		dynamicTableName_ = param.dataForm.tableName;
	},
	
	// 动态表单数据展示
	ShowFormView:function(param, path_, btnObj,divname){
		if(param==null || param==""){
			return;
		}
		tr_=undefined;
		// 全局数据
		overallDataParam_ = param;
		this.init(divname);
		if(param.layoutResult=="table"){
			tbody_.append("<tr><td colspan=\"10\" class=\"dynamicTd\" style=\"line-height:30px;\"><b><center>"+param.dataForm.remark+"</center></b></td></tr>");
			$.each(param.dataResult,function(k,v){
				var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
				// 表单名称是否必填
				requiredVal(v.columnObj);
				// input初始化
				inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// select初始化
				selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
				// textarea初始化
				textareaObj.init(v.plugObj, v.columnObj, tagName_);
				// 子表初始化
				tableObj.initshow(v.plugObj, param.childResult);
				// 数据输出
				outHTML(v.columnObj, tagName_, v.plugObj);
				
				generic.initObjData(v.plugObj, v.columnObj, v.dataArray);
			});			
		}
		
		dynamicTableName_ = param.dataForm.tableName;
		
		this.fileUpload(dynamicTableName_,Math.uuid(),'');
	},
	 
	beforeNodeForm:function(param, path_, btnObj, tableGuid_){
		tr_=undefined;
		$("#upNodeForms").append("<form id=\""+tableGuid_+"\"><table class=\"beforeNodeTable tableForm\" width=\"100%\"><tbody></tbody></table></form>");
		tbody_ = $("#upNodeForms").find("#"+tableGuid_).children(".beforeNodeTable").find("tbody");
		if(param.layoutResult=="table"){
			tbody_.append("<tr><td colspan=\"10\" class=\"dynamicTd\" style=\"line-height:30px;\"><b><center>"+param.dataForm.remark+"</center></b></td></tr>");
			$.each(param.dataResult,function(k,v){
				var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
				// 表单名称是否必填
				requiredVal(v.columnObj);
				// input初始化
				inputObj.beforeInit(v.plugObj, v.columnObj, v.dataArray, tagName_, tableGuid_);
				// select初始化
				selectObj.beforeInit(v.plugObj, v.columnObj, v.dataArray, tagName_, tableGuid_);
				// textarea初始化
				textareaObj.beforeInit(v.plugObj, v.columnObj, tagName_, tableGuid_);
				// 子表初始化
				tableObj.init(v.plugObj, param.childResult);
				// 数据输出
				beforOutHTML(v.columnObj, tagName_, v.plugObj, tableGuid_);
			});
		}
	},
	
	BindingDB:function(tabData){
		var formObj_ = $('#tableForm');
		$.ajax({
			type: "post",
			url: "queryForm",
			dataType: "html",
			data: tabData,
			success: function(data){
				if(!$.isEmptyObject($.parseJSON(data)[0])){
					// checkbox
					if(checkbox.nameArray!=undefined){
						$.each($.parseJSON(data)[0],function(k,v){
							$.each(checkbox.nameArray,function(nk,nv){
								if(k==nv){
									$.each(checkbox.objArray,function(ok,ov){
										var vsplit = v.split(',');
										$.each(vsplit,function(vk,vv){
											if($(ov).val()==vv){
												$("input[value="+vv+"]").attr("checked", 'checked');
											}
										})
									})
								}
							})
						})
					}
					var formArray = formObj_.serializeArray();
					$.each(formArray,function(k, v){
						var formObjName = v.name;
						var jsonDB = $.parseJSON(data);
						var jsonVal = jsonDB[0][formObjName.toUpperCase()];
						if($("#"+formObjName)[0]!=undefined){
							
							if($("#"+formObjName)[0].nodeName=="INPUT"){
								$("input[name='"+formObjName+"'][value="+jsonVal+"]").attr("checked", true);
							}
							if($("#"+formObjName)[0].nodeName=="SELECT"){
								if(jsonVal!=null){
									var jsonValArray = jsonVal.split(",");
									$.each(jsonValArray, function(kjj,vjj){
										$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true}).change();
										$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
										    if(kjjSel>0){
										    	$(this).find("option[value='"+vjj+"']").attr({"selected": true}).change();
										    }
										})
									});
								}
							}else if(formObjName == "caijsj"){
								$("#"+formObjName).val(jsonVal.substring(0,11));
							}else{
								$("#"+formObjName).val(jsonVal);
							}
							if($("#"+formObjName)[0].nodeName=="TEXTAREA"){
								CKEDITOR.instances[formObjName].on('instanceReady', function(){
									CKEDITOR.instances[formObjName].setData(jsonVal);
									CKEDITOR.instances[formObjName].resetDirty();
								})
							}
						}
					});
					actionObj_.bt_ = "update";
					UUID_ = tabData.tableGuid_;
				}
			}
		});
		
		$.ajax({
			type: "post",
			url: "linkchecked",
			dataType: "html",
			data: tabData,
			success: function(data){
			   if(data=='true'){
			   $("#LINGDAOGUANZHU").attr("checked", 'checked');
			   }
		    }});
		
		

	},
	
	BindingDBView:function(tabData){
		var formObj_ = $('#tableForm');
		$.ajax({
			type: "post",
			url: "queryForm",
			dataType: "html",
			data: tabData,
			success: function(data){
				if(!$.isEmptyObject($.parseJSON(data)[0])){
					// checkbox
					if(checkbox.nameArray!=undefined){
						$.each($.parseJSON(data)[0],function(k,v){
							$.each(checkbox.nameArray,function(nk,nv){
								if(k==nv){
									$.each(checkbox.objArray,function(ok,ov){
										var vsplit = v.split(',');
										$.each(vsplit,function(vk,vv){
											if($(ov).val()==vv){
												$("input[value="+vv+"]").attr("checked", 'checked');
											}
										})
									})
								}
							})
						})
					}
					var formArray = formObj_.serializeArray();
					$.each(formArray,function(k, v){
						var formObjName = v.name;
						var jsonDB = $.parseJSON(data);
						var jsonVal = jsonDB[0][formObjName.toUpperCase()];
						if($("#"+formObjName)[0]!=undefined){
							
							if($("#"+formObjName)[0].nodeName=="INPUT"){
								$("input[name='"+formObjName+"'][value="+jsonVal+"]").attr("checked", true);
							}
							if($("#"+formObjName)[0].nodeName=="SELECT"){
								if(jsonVal!=null){
									var jsonValArray = jsonVal.split(",");
									$.each(jsonValArray, function(kjj,vjj){
										$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true}).change();
										$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
										    if(kjjSel>0){
										    	$(this).find("option[value='"+vjj+"']").attr({"selected": true}).change();
										    }
										})
									});
								}
							}else if(formObjName == "caijsj"){
								$("#"+formObjName).val(jsonVal.substring(0,11));
							}else{
								$("#"+formObjName).val(jsonVal);
							}
							if($("#"+formObjName)[0].nodeName=="TEXTAREA"){
								CKEDITOR.instances[formObjName].on('instanceReady', function(){
									CKEDITOR.instances[formObjName].setData(jsonVal);
									CKEDITOR.instances[formObjName].resetDirty();
								})
							}
						}
					});
					actionObj_.bt_ = "update";
					UUID_ = tabData.tableGuid_;
				}
				
				$("input").attr("disabled",true);
				$("textarea").attr("disabled",true);
				$("select").attr("disabled",true);
				$("#BtnSend").attr("disabled",false);
			}
		});
		
		$.ajax({
			type: "post",
			url: "linkchecked",
			dataType: "html",
			data: tabData,
			success: function(data){
			   if(data=='true'){
			   $("#LINGDAOGUANZHU").attr("checked", 'checked');
			   }
		    }});
	},
	
	beforeBindingDB:function(tabData, formId_){
		var formObj_ = $('#'+formId_);
		$.ajax({
			type: "post",
			url: "queryForm",
			dataType: "html",
			data: tabData,
			success: function(data){
				if(!$.isEmptyObject($.parseJSON(data)[0])){
					// checkbox
					// console.log(checkbox.nameArray);
					if(checkbox.nameArray!=undefined){
						$.each($.parseJSON(data)[0],function(k,v){
							$.each(checkbox.nameArray,function(nk,nv){
								if(k==nv){
									$.each(checkbox.objArray,function(ok,ov){
										var vsplit = v.split(',');
										$.each(vsplit,function(vk,vv){
											if($(ov).val()==vv){
												$("input[value="+vv+"]").attr("checked", 'checked');
											}
										})
									})
								}
							})
						})
					};
					
					var formArray = formObj_.serializeArray();
					// serializeArray序列化不到checkbox特此处理
					formObj_.find(':checkbox').each(function(k, v){
						formArray.push({name:v.name, value:v.value});
					})
					
					$.each(formArray,function(k, v){
						var formObjName = v.name;
						var jsonDB = $.parseJSON(data);
						var jsonVal = jsonDB[0][formObjName.toUpperCase()];
						
						if($("#"+formObjName)[0]!=undefined){
							var objName_ = formObjName.substring(0,formObjName.indexOf('LWD'));
							jsonVal = jsonDB[0][objName_.toUpperCase()];
							if($("#"+formObjName)[0].type=="checkbox" && jsonVal=="on"){
								$("#"+formObjName).attr("checked", true);
							}
							
							if($("#"+formObjName)[0].nodeName=="SELECT"){
								if(jsonVal!=null){
									var jsonValArray = jsonVal.split(",");
									$.each(jsonValArray, function(kjj,vjj){
										var newFormObjName = $("#"+formObjName).change(function(){showChildrenSelect(this)});
										$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true,}).change();
										$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
										    if(kjjSel>0){
										    	$(this).find("option[value='"+vjj+"']").attr({"selected": true,}).change();
										    }
										})
									});
								}
							}else{
								formObj_.find("#"+formObjName).val(jsonVal);
							}
							
							if($("#"+formObjName)[0].nodeName=="TEXTAREA"){
								CKEDITOR.instances[formObjName].on('instanceReady', function(){
									CKEDITOR.instances[formObjName].setData(jsonVal);
									CKEDITOR.instances[formObjName].resetDirty();
								});
							}
						}
					});
				}
			}
		});
		generic_blobObjArray = [];
	},
	
	childBindingDB:function(tabData, childObj_){
		var formObj_ = $('#childTableForm');
		var childColumnArray ="",
		columnLength = $('.childTable').find('tbody').children().eq(0).children().length;
		$.ajax({
			type: "post",
			url: "queryChildForm",
			dataType: "html",
			data: tabData,
			async: false,
			success: function(data){
				$.each($.parseJSON(data), function(kj, vj){
					$.each(childObj_.dataResult, function(k,v){
						var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
						// input初始化
						inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
						// select初始化
						selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
						// textarea初始化
						textareaObj.init(v.plugObj, v.columnObj, tagName_);
						var htmlObj = $(outerHTML_);
						if(htmlObj[0].tagName=="SELECT"){
							htmlObj.find("option[value='"+$.trim(vj[v.columnObj.colName.toUpperCase()])+"']").attr("selected",true);
						}
						if(v.columnObj.isHid!=1){
							childColumnArray += $('<td>',{'style':'height:30px;border: 1px solid #95B8E7;','align':'center'})
							.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						}
					});
					childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/search.png\" onclick=\"chooseSWRY(this)\" alt=\"选择\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_add.png\" onclick=\"add()\" alt=\"新增\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_remove.png\" onclick=\"del(this)\" alt=\"删除\"></td>";
					
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
					//console.log(childColumnArray);
					childColumnArray="";
				});
			}
		});
		if(formObj_.serializeArray()[columnLength]!=undefined){
			pubTr = $('.childTable').find('tbody').children().eq(1);
			$('.childTable').find('tbody').children().eq(1).remove();
		}
	},
	
	childBindingDBView:function(tabData, childObj_){
		var formObj_ = $('#childTableForm');
		var childColumnArray ="",
		columnLength = $('.childTable').find('tbody').children().eq(0).children().length;
		$.ajax({
			type: "post",
			url: "queryChildForm",
			dataType: "html",
			data: tabData,
			async: false,
			success: function(data){
				$.each($.parseJSON(data), function(kj, vj){
					$.each(childObj_.dataResult, function(k,v){
						var tagName_ =  $("<"+v.plugObj.pluginTag+">")[0].tagName;
						// input初始化
						inputObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
						// select初始化
						selectObj.init(v.plugObj, v.columnObj, v.dataArray, tagName_);
						// textarea初始化
						textareaObj.init(v.plugObj, v.columnObj, tagName_);
						var htmlObj = $(outerHTML_);
						if(htmlObj[0].tagName=="SELECT"){
							htmlObj.find("option[value='"+$.trim(vj[v.columnObj.colName.toUpperCase()])+"']").attr("selected",true);
						}
						if(v.columnObj.isHid!=1){
							childColumnArray += $('<td>',{'style':'height:30px;border: 1px solid #95B8E7;','align':'center'})
							.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						}
					});
					//childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/search.png\" onclick=\"chooseSWRY(this)\" alt=\"选择\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_add.png\" onclick=\"add()\" alt=\"新增\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_remove.png\" onclick=\"del(this)\" alt=\"删除\"></td>";
					
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
					//console.log(childColumnArray);
					childColumnArray="";
				});
			}
		});
		if(formObj_.serializeArray()[columnLength]!=undefined){
			pubTr = $('.childTable').find('tbody').children().eq(1);
			$('.childTable').find('tbody').children().eq(1).remove();
		}
	},
	
	disabled_:function(){
		$("#btnDiv").css("display", "none");
	},
	
	fileUpload:function(tableName_,UUID_,path_, formID_,fileUploadStatus){
		//FileUpload.init(fileUploadStatus,tableName_,UUID_,formID_,path_);
		baidufile.init('edit',UUID_,'myuploadify');
		$("#fileid").val(UUID_);
	},
	fileUploadView:function(tableName_,UUID_,path_){		
		baidufile.init('view',UUID_,'myuploadify');
		// $("#fileid").val(UUID_);
	},
	dynamicBtn:function(paramData){
		var strHTML="";
		$.each(paramData, function(k, v){
			var linkButton ={
				herf:'#',
				class:'easyui-linkbutton',
				iconCls:v.formPropertyId,
				text:v.formProperName,
				onClick:'LForm(this)',
				id:''
			};
			if(v.enumMap.result!=undefined){
				linkButton.id = v.enumMap.result;
			}
			$('#showDyBtn').append($('<a/>',linkButton).linkbutton()).append("&nbsp;");
		})
	},
	
	initObjData:function(plugObj, columnObj, dataArray){
		var jsonVal = "";
		var formObjName = columnObj.colName;
		if(columnObj.isInit!=undefined){
			jsonVal = window.parent.UserObj[columnObj.isInit];
			if(dataArray[0]!=undefined && dataArray[0].orgid!=undefined){
				var jsonValArray ="";
				$.ajax({
					type: "post",
					url: "processAction_queryCurUserPro",
					dataType: "script",
					data: {mapCodeType:jsonVal},
					async: false,
					success: function(data){
						jsonValArray = data.split(",");
					}
				});
				$.each(jsonValArray, function(kjj,vjj){
					$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true,}).change();
					$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
					    if(kjjSel>0){
					    	$(this).find("option[value='"+vjj+"']").attr({"selected": true,}).change();
					    }
					})
				});
			}else{
				$("#"+columnObj.colName).val(jsonVal);
			}
			
		}
	},
	
	leaderRead:function(){
		$.each($("input"),function(k,v){
			if(v.type!="checkbox"){
				if(v.type=="hidden"){//首页点击涉稳信息查看详细
				  $(v).parent().append("<span></span>");
			    }else{
				  $(v).parent().append("<span>"+v.value+"</span>");
			    }
			}			
			$(v).remove();
		})
		$.each($("select"),function(k,v){
			if($(v).find("option:selected").text()!="------请选择------"){
				$(v).parent().append("<span>"+$(v).find("option:selected").text()+"</span>");
			}
			$(v).remove();
		})
		$.each($("textarea"),function(k,v){
			$(v).parent().append("<span>"+v.value+"</span>");
			CKEDITOR.instances[v.name].destroy();
			$(v).remove();
		})
		var trObj = $('#childTableForm > table > tbody > tr');
		$.each(trObj, function(k,v){
			$(v).find('td').last().remove()
		})
	}
};

function RemoveControl(elements){
	var arrObj = new Array();
	var count = elements.length;
	for(var i=0;i<count;i++){
		if(elements[i] == undefined)
			continue;
		var obj = document.createElement('span');
		switch(elements[i].type){
		case "text" : 
			obj.setAttribute("innerHTML",elements[i].value);
			break;
		case "textarea" :
			obj.setAttribute("innerHTML",elements[i].innerHTML);
			elements[i].innerHTML = '';
			break;
		case "select" :
			for(var j=0;j<elements[i].length;j++){
				if(elements[i][j].selected){
					obj.setAttribute("innerHTML",elements[i][j].text);
					break;
      }
     }
     elements[i].options.length = 0;
     break;      
  }
		$(elements[i]).parent().append("<span>"+elements[i].value+"</span>");
		$(elements[i]).empty();
  //elements[i].parentNode.appendChild(obj);
  //arrObj[arrObj.length] = elements[i];
	}
}

function LForm(paramObj_){
	actionObj_["status_"] = window.parent.Home.loginName+$.trim(paramObj_.text);
	sw_status = window.parent.Home.loginName+$.trim(paramObj_.text);
	if(paramObj_.id=='ST'){
		subUrl_ = "processAction_saveStatusProcess";
		actionObj_["taskId_"] = taskId_;
		report_submit("");
	}else if(paramObj_.id=='CB'){
		//采编
	     addLink(this,'caibian');
		/**subUrl_ = "processAction_saveStatusProcess";
		actionObj_["taskId_"] = taskId_;
		report_submit("");*/
	}else if(paramObj_.id=='L3'){
		common.openWindow("转阅部门", "business_formOrgUser", 260, 450);
		return;
	}else if(paramObj_.id=='back'){
		history.go(-1);
	}else if(paramObj_.id=='INDEX'){
		parent.window.location.href="loginAction_checkLogin";
	}else{
		report_submit(paramObj_.id);
	}
	
	
}

// js生成sql
var sqleditor={
	init_:function(dataParam_, formObj_){
		/**
		  * sql对象
		  * tableKeyWork_ SQL关键字
		  * tableName_ 表名名称
		  * childTableName_ 子表名称
		  * tableMap_ 列数据
		  * tableWhere_ SQL过滤条件
		  */
		var sqlObj_={
			tableKeyWork_:"",
			tableName_:"",
			childTableName_:"",
			tableMap_:"",
			tableWhere_:""
		},sqlMap_={};
		
		var formArray = formObj_.serializeArray();
		var new_generic_DateObjArray = generic_DateObjArray.join();
		$.each(formArray,function(k,v){
			if(sqlMap_[v.name]){
				// 级联数组
				if(!sqlMap_[v.name].push){
					sqlMap_[v.name] = [sqlMap_[v.name]];
				}
				sqlMap_[v.name].push(v.value);
				sqlMap_[v.name] = sqlMap_[v.name].join();
			}else{
				if(v.value=="------请选择------"){
					v.value = "";
				}else{
					if(v.value!="" && new_generic_DateObjArray.indexOf(v.name.toUpperCase())!=-1){
						sqlMap_[v.name] = 'to_date(\''+v.value+'\',\'yyyy-MM-dd\')';
					}else{
						if(v.name!="result"){
							sqlMap_[v.name] = v.value;
						}
					}
				}
			}
		});
		sqlMap_["ORG_GUID"]=generic_search_orgGuid;
		sqlObj_["dataGuid"] = UUID_;
		sqlMap_["STATUS"] = sw_status;
		sqlObj_.tableName_ = dataParam_.tableName;
		sqlObj_.tableMap_ = sqlMap_;
		sqlObj_.childTableName_ = dataParam_.childTableName;
		return sqlObj_;
	},
	// insert
	insert_:function(dataParam_, formObj_){
		var insert_sqlObj_ = this.init_(dataParam_, formObj_);
		insert_sqlObj_.tableMap_[dataParam_.tableName+"_guid"]=UUID_;
		insert_sqlObj_.tableKeyWork_ = "insert";
		return JSON.stringify(insert_sqlObj_);
	},
	// update
	update_:function(dataParam_, formObj_){
		var update_sqlObj_ = this.init_(dataParam_, formObj_);
		update_sqlObj_.tableKeyWork_ = "update";
		update_sqlObj_.tableWhere_ = "where "+dataParam_.tableName+"_guid='"+UUID_+"'";
		update_sqlObj_.dataGuid = UUID_;
		return JSON.stringify(update_sqlObj_);
	}
}

// 输出内容
function outHTML(columnObj, tagName_, plugObj_){
	//console.log(outerHTML_);
	var showTd_ = "<td class=\"dynamicTd\" style=\"word-wrap:break-word;\" width=\"100\">"+columnObj.colRemark+"</td><td colspan="+columnObj.formstyleColspan+">"+outerHTML_+"</td>";
	if (plugObj_.pluginTag == 'table') {
		showTd_ = "<td style='text-align:left;height:30px;padding:3px;' colspan="
		+ columnObj.formstyleColspan
		+ "><div style='line-height:30px;background-color:#E0ECFF;border: 1px solid #95B8E7;border-bottom:0px;'>&nbsp;"+columnObj.colRemark+"</div>"
		+ ""+outerHTML_+"</td>";
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
		pluginObj_.ckeditor(columnObj.colName.toUpperCase());
	}
	
}

function objPro(columnObj, trAndTd_){
	if(columnObj.isHid==1){
		trAndTd_.css('display','none');
	}
}

//输出内容
function beforOutHTML(columnObj, tagName_, plugObj_, tableGuid_){
	var showTd_ = "<td class=\"dynamicTd\" style=\"word-wrap:break-word;\" width=\"100\">"+columnObj.colRemark+"</td><td colspan="+columnObj.formstyleColspan+">"+outerHTML_+"</td>";
	if (plugObj_.pluginTag == 'table') {
		showTd_ = "<td style='text-align:left;height:30px;padding:3px;' colspan="
		+ columnObj.formstyleColspan
		+ "><div style='line-height:30px;background-color:#E0ECFF;border: 1px solid #95B8E7;border-bottom:0px;'>&nbsp;"+columnObj.colRemark+"</div>"
		+ ""+outerHTML_+"</td>";
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
		objPro(columnObj, $(tr_));
		tbody_.append(tr_);
		tr_=undefined;
	}
	if(tagName_=="TEXTAREA"){
		pluginObj_.ckeditor(columnObj.colName+"LWD"+tableGuid_);
	}
}

// 富文本渲染
var pluginObj_={
	pluginObj:"",
	
	pluginId:"",
	
	// 初始化ckeditor
	ckeditor:function(param_){
		this.pluginId = param_;
		this.pluginObj = CKEDITOR.replace(param_,{width:'100%',
			toolbar: [
		      ['Bold','Italic','Underline','Strike','Image'], ['Cut','Copy','Paste'],
		      ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		      ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']],
		    language:'zh-cn',
		    removePlugins:'elementspath'
		});
	},
	
	// 获取ckeditor信息
	getData:function(){
	    $('#'+this.pluginId).val(CKEDITOR.instances[pluginObj_.pluginId].getData());
	}
};

// form元素名称必填加*
function requiredVal (columnObj){
	if(columnObj.isMust=="1"){
		columnObj.colRemark="<font color='red'>*</font>&nbsp;"+columnObj.colRemark;
		requiredArray.push(columnObj.colName);
	}
}

//BUG 字符转16进制
function stringToHex(str){
	var val="";
	for(var i = 0; i < str.length; i++){
		val += str.charCodeAt(i).toString(16);
	}
	return val.toUpperCase();
}

function add(){
	var tableObj_HTML = "";
	if(pubTr!=""){
		tableObj_HTML = pubTr[0].outerHTML;
	}else{
	  tableObj_HTML = $('.childTable').find('tbody').children().eq(1).show()[0].outerHTML;
	}
	$('.childTable').find('tbody').append(tableObj_HTML);
	var s = $('.childTable').find('tbody tr:gt(0) td *');
	$.each(s,function(k,v){
		$.each(validatebox.validateboxArray, function(valk,valv){
			if(valv.colName == s.eq(k).attr('id')){
				$.each(inputObj.tmpObj, function(tmpk, tmpv){
					if(valv.colName != tmpv){
						$('.child_'+s.eq(k).attr('id')).validatebox({
							 required : true,
							 validType: valv.verifyinfo
						})
					}else{
						$("input[name='"+tmpv+"']").attr('onclick','showll(this)');
					}
				})
			}
		})
	})
}

function del(param){
  var table_tr = $(param).parent().parent();
  var tableRow = $('.childTable').find('tbody').children().length-1;
  if(tableRow==1){
    alert('第一行不能删除!'); 
    return;
  }
  table_tr.remove();
}

// 清空表单富文本数据
function resetEditor(){
	$.each(generic_blobObjArray, function(k,v){
		CKEDITOR.instances[v.toLowerCase()].setData('');
		$('#'+v.toLowerCase()).val('');
	});
}

function report_submit(report_submit_paramObj_){
	validatebox.initValidate(false);
	if($('#tableForm').form('validate')){
		// 获取ueditor数据
		$.each(generic_blobObjArray,function(k,v){
			pluginObj_.pluginId = v;
			pluginObj_.getData();
		});
		
		var formObj_ = $('#tableForm');
		var childTableForm_ = $('#childTableForm');
		// 表名称
		if(overallDataParam_.childResult[0]!=undefined){
			var childTableName = overallDataParam_.childResult[0].dataForm.tableName,
			columnLength = $('.childTable').find('tbody').children().eq(0).children().length;
			$.each(childTableForm_.serializeArray(),function(k, v){
				if(k==0){
					if(v.value=="" || v.value=="------请选择------"){
						return;
					}else{
						var formArray = childTableForm_.serializeArray();
						var sqlString=[], mergeObj={};
						$.each(formArray,function(k,v){
							mergeObj[v.name]=v.value;
							if(k>=1 && ++k%columnLength==0){
								// 过滤JS对象主键
								delete mergeObj[childTableName+"_GUID"];
								// 判断是新增、更新
								if(v.name==childTableName+"_GUID" && v.value==""){
									mergeObj[childTableName+"_GUID"]=Math.uuid();
									mergeObj["CREATE_USER"]="CREATE_USER_DATA";
									mergeObj["CREATE_DATE"]="CREATE_DATE_DATA";
									mergeObj["ORG_GUID"]="ORG_GUID_DATA";
									sqlString.push(squel.insert().into(childTableName).setFields(mergeObj).toString());
								}else{
									mergeObj["UPDATE_USER"]="UPDATE_USER_DATA";
									mergeObj["UPDATE_DATE"]="UPDATE_DATE_DATA";
									mergeObj["ORG_GUID"]="ORG_GUID_DATA";
									sqlString.push(squel.update().table(childTableName).setFields(mergeObj).where(childTableName+"_GUID='"+v.value+"'").toString());
								}
								mergeObj={};
							}
						});
						//console.log(sqlString.join("||"));
						actionObj_.childSql_ = sqlString.join("||");
					}
				}
			});
		}
		
		
		overallDataParam_.dataForm["childTableName"]=childTableName;
		if(actionObj_.bt_=="update"){
			actionObj_.sql_ = sqleditor.update_(overallDataParam_.dataForm, formObj_);
		}else{
			actionObj_.sql_ = sqleditor.insert_(overallDataParam_.dataForm, formObj_);
	        actionObj_.bt_ = "insert";
		}
		
		actionObj_["tablename_"] = overallDataParam_.dataForm.tableName;
		// 档案涉稳人员数据同步
		actionObj_["childTableName"] = childTableName;
		actionObj_["data_uuid_"] = UUID_;
		actionObj_["blobObjArray_"] = generic_blobObjArray.join();
		actionObj_["dateObjArray_"] = generic_DateObjArray.join();
		actionObj_["processInstanceId"] = processInstanceId_;
		// 涉稳人员主键数据
		//actionObj_["personGuid"] = window.parent.Dialog.newObjArray.join();
		// 节点走向
		actionObj_.nodeParam = report_submit_paramObj_;
		//console.log(actionObj_);
		$.ajax({
			type: "post",
			url: subUrl_,
			data: actionObj_,
			dataType: "json",
			success: function(data){
				if(data.bool){
					$.messager.alert("系统提示","操作成功","info", function(){
						window.location.href = data.nextURL;
					});
				}else{
					$.messager.alert("系统提示","操作失败","info", function(){
						window.location.href = data.nextURL;
					});
				}
			}
		});
		
		// 销毁涉稳人员主键数据
		window.parent.Dialog.newObjArray= [];
	}
}

function chooseSWRY(param){
	var tdArray = $(param).parent().parent().children(), objArray=[];
	$.each(tdArray,function(k,v){
		if(k!=tdArray.length){
			objArray.push($(v).children().eq(0));
		}
	})
	window.parent.Dialog.OpenDialogWithReturn("选择人员",
			"/myhappyform/DialogAction_toCommonSqlDialog?type=chooseSWRY",
			500,400,objArray);
}


function showll_bak(param){
	common.openDialogButton("选择地点", "genericAction_map", 900, 650, true, true,param);
	var iframeObj_ = window.parent.frames["jd_iframe"];
	$(iframeObj_).load(function(){//alert(param.id);
		var mapArray = $(param).val().split(',');
		var e ={point:{lng:mapArray[0],lat:mapArray[1]}};
		if(e.point.lng!='' && e.point.lng!=null){
			this.param_ = $(param);
			this.showInfo(e);
		}else{
			this.search($(param));
		}
	});
}

function showll(param){
	common.openWindow("选择地点", "genericAction_map", 900, 650);
	var iframeObj_ = window.parent.frames["jd_iframe_window"];
	$(iframeObj_).load(function(){
		var mapArray = $(param).val().split(',');
		var e ={point:{lng:mapArray[0],lat:mapArray[1]}};
		if(e.point.lng!='' && e.point.lng!=null){
			this.param_ = $(param);
			this.showInfo(e);
		}else{
			this.search($(param));
		}
	});
}

$(window).load(function(){
	validatebox.initValidate(true);
	$.each(inputObj.tmpObj,function(k,v){
		$("input[name='"+v+"']").attr('onclick','showll(this)');
	})
})