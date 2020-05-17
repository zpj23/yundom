var outerHTML_, tbody_, tr_, UUID_, actionObj_={sql_: "", bt_: ""}, 
dynamicTableName_, generic_search_orgGuid, generic_blobObjArray = [],
overallDataParam_, generic_DateObjArray = [], btnStatus="",dataGuid,pubTr="",generic_SelectObjArray = [];

// 将HTML包装成DOM元素
function showOuterHTML_(param_obj){
	return $("<"+param_obj.pluginTag+"/>",param_obj);
};

// 表单验证
var validatebox = {
	validateboxArray:[],
	validateObj:function(columnObj){
		if(columnObj.verifyinfo!=null && columnObj.verifyinfo!=""){
			var tempValidate = {colName:columnObj.colName, verifyinfo:columnObj.verifyinfo};
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
		.blur(function(){$(this).validatebox('validate');});
		//部分历史数据存在小写的情况
		$('#'+param.colName.toUpperCase()).validatebox({
			 required : true,
			 validType: param.verifyinfo,
			 novalidate : paramAttr
		})
		.focus(function(){$(this).validatebox('enableValidation');})
		.blur(function(){$(this).validatebox('validate');});
	},
	initValidate:function(paramAttr){
		$.each(this.validateboxArray,function(k,v){
			validatebox.validate(v, paramAttr);
		});
	}
}

// 日期初始化
var datebox = {
	dateboxArray:[],
	initDate:function(param){
//		console.log(param);
		$('#'+param.toUpperCase()).attr({onclick:'WdatePicker({readOnly:true})', readonly:true,class:'WDate'});
//		setTimeout(function(){
//			$('#'+param.toLowerCase()).datebox({required:true});
//		},50);
	},
	initDateBox:function(){
		this.dateboxArray = generic_DateObjArray;
		$.each(this.dateboxArray,function(k,v){
			datebox.initDate(v);
		})
	}
}

var checkbox={
    nameArray:[],         
    objArray:[],
	initObj:function(param, columnObj, dataArray){
		param.type="checkbox";
		this.nameArray.push(param.name);
		this.specialObj(param, columnObj);
		param["style"]="vertical-align:middle;margin-top:-1px;";
		var outHtml="";
		if(dataArray[0]!=undefined){
			$.each(dataArray[0].dataMap, function(k,v){
				param.value=k;
				var checkboxObj = showOuterHTML_(param);
				outHtml+=checkboxObj[0].outerHTML+"<label style=\"cursor:pointer;\" id=\""+checkboxObj[0].value+"\">"+v+"</label>";
				checkbox.objArray.push(checkboxObj);
			});
		}
		nbspObj(outHtml);
	},
	initObj_radio:function(param, columnObj, dataArray){
		param.type="radio";
		this.nameArray.push(param.name);
		this.specialObj(param, columnObj);
		param["style"]="vertical-align:middle;margin-top:-1px;";
		var outHtml="";
		if(dataArray[0]!=undefined){
			$.each(dataArray[0].dataMap, function(k,v){
				param.value=k;
				var checkboxObj = showOuterHTML_(param);
				outHtml+=checkboxObj[0].outerHTML+"<label style=\"cursor:pointer;\" id=\""+checkboxObj[0].value+"\">"+v+"</label>";
				checkbox.objArray.push(checkboxObj);
			});
		}
		nbspObj(outHtml);
	},
	specialObj:function(param,columnObj){
		if(columnObj.colRemark=="督查督办"){
			param["onclick"]="specialBus(this)";
		}if(columnObj.colRemark=="领导关注"){
			param["onclick"]="specialBus(this)";
		}
	}
}

function nbspObj(paramObj_){
	var tempArray=[];
	tempArray.push("&nbsp;");
	tempArray.push(paramObj_);
	outerHTML_ = tempArray.join("");
}

function specialBus(param){
	var swdb_ = param.checked;
	swdb_==true ? swdb_ = 1 : swdb_ = 2;
	$.post("processAction_updateSWDB", {swdb:swdb_, taskId_:taskId_});
}

// input对象
var inputObj = {
	// 地图精度
	mapLng : "",
	// 地图纬度
	mapLat : "",
	// 临时对象
	tmpObj : [],
	// 初始化input对象
	init:function(plugObj, columnObj, dataArray, tagName_){
		$.extend(inputObj, dataBinding);
		
		// input对象绑定源数据
		if(tagName_=="INPUT"){
			var input_ ={
			  pluginTag: plugObj.pluginTag,
			  type: "text",
			  value: plugObj.pluginDefaultvalue,
			  name: columnObj.colName.toUpperCase(),
			  id: columnObj.colName.toUpperCase()
			};
			dataBinding.inputBinding(input_, dataArray);
			
			// input对象日期类型
			if(plugObj.pluginType=="date"){
				generic_DateObjArray.push(columnObj.colName.toUpperCase());
			}
			
			outerHTML_ = showOuterHTML_(input_)[0].outerHTML;
			
			// input对象单选框类型
			if(plugObj.pluginType=="radio"){
				input_.type="radio";
				checkbox.initObj_radio(input_, columnObj, dataArray);
				/**var man_radioChecked = showOuterHTML_(input_);
				var Obj_ = $.extend({}, input_);
				var womanObj_ = $.extend({}, input_);
				womanObj_.value="wom";
				var woman_radioChecked = showOuterHTML_(womanObj_);
				if(input_.value=="man"){
					man_radioChecked.attr({"checked":true, value:"man"});
				}else{
					woman_radioChecked.attr("checked",true);
				}
				outerHTML_ = "<lable>"+man_radioChecked[0].outerHTML+"男</lable>"+"<lable>"+woman_radioChecked[0].outerHTML+"女</lable>";*/
			}
			
			// input对象上传类型
			if(plugObj.pluginType=="file"){
				input_.type="hidden";
				input_.name="fileid";
				input_['id']="fileid";
				input_.value = dataGuid;
								
				// outerHTML_ = showOuterHTML_(input_)[0].outerHTML+"</input>"+$("<div>",{id:"myuploadify"})[0].outerHTML+$("<div>",{id:"FileList_myuploadify"})[0].outerHTML;
				
				outerHTML_ = "<div id=\"myuploadify\" style=\"height:0px;width:32px;\"></div>" +
						"<input type=\"hidden\" id=\"fileid\" name=\"fileid\" value=\""+dataGuid+"\" />" +
								"<div id=\"FileList_myuploadify\" ></div>";
			}
			
			if(plugObj.pluginType=="checkbox"){
				checkbox.initObj(input_, columnObj, dataArray);
			}
			
			if(plugObj.pluginType=="map"){
				var tmepStr = this.tmpObj.join();
				if(tmepStr.indexOf(columnObj.colName.toUpperCase())==-1){
					this.tmpObj.push(columnObj.colName.toUpperCase());
				}
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
			.prepend($("<option/>",{value:"",text: "------请选择------"}))[0].outerHTML;
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
		$(paramObj).parent().append(selectObj_.append(option_).prepend($("<option/>",{value:"",text: "------请选择------"}))[0].outerHTML)
	}
}

// textarea对象
var textareaObj = {
	init:function(plugObj, columnObj, tagName_){
		if(tagName_=="TEXTAREA"){
			/*var textarea_ = {
			  pluginTag:plugObj.pluginTag,
			  name: columnObj.colName,
			  id: columnObj.colName,
			  optionValue: plugObj.pluginDefaultvalue
			};
			outerHTML_ =showOuterHTML_(textarea_)[0].outerHTML;*/
		    //outerHTML_= showOuterHTML_("<textarea id=\"myEditor\" style=\"display:none\"></textarea>")[0].outerHTML;
			// <div id=\"myEditordiv\" style=\"width:100%;height:160px;\"></div>
			outerHTML_  = " <textarea id=\""+columnObj.colName+"\" name=\""+columnObj.colName+"\" style=\"width:100%;height:160px;\" ></textarea>";
		}
		if((columnObj.colType.toUpperCase()=='BLOB'||columnObj.colType.toUpperCase()=='CLOB') && columnObj.isHid!=1){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}if((columnObj.colType.toUpperCase()=='TEXT'||columnObj.colType.toUpperCase()=='CLOB') && columnObj.isHid==1&&columnObj.tableName=="STABLE_SWRY"){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}if(columnObj.colType.toUpperCase()=='BLOB' && columnObj.isHid==1 && columnObj.tableName=="STABLE_SWRY"){
			generic_blobObjArray.push(columnObj.colName.toUpperCase());
		}
		if(columnObj.pluginGuid=='CBC8E596512945C8AC7EC91A02C28248' && columnObj.isHid!=1){
		 //下拉框	
		 generic_SelectObjArray.push(columnObj.colName.toUpperCase());
		}
		validatebox.validateObj(columnObj);
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
					showTd_ +="<td style='border: 1px solid #CCCCCC;'>"+v.columnObj.colRemark+"</td>";
					columnArray +=$('<td>',{'style':'border: 1px solid #CCCCCC;','align':'center'}).append($(outerHTML_))[0].outerHTML;
				}
			});
			 showTd_+="<td>操作</td>";
			 table_tbody_.append($("<tr/>",{"style":"text-align:center;background-color:#DDD9C3;"}).append(showTd_));
			 columnArray+="<td align='center'><input type='hidden' name='"+childResult_[0].dataForm.tableName+"_GUID' id='"+childResult_[0].dataForm.tableName+"_GUID' /><a href=\"javascript:add()\">增加</a>&nbsp;<a onclick=\"del(this)\" href=\"javascript:void(0)\">删除</a></td>";			 
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
					showTd_ +="<td style='border: 1px solid #CCCCCC;'>"+v.columnObj.colRemark+"</td>";
					columnArray +=$('<td>',{'style':'border: 1px solid #CCCCCC;','align':'center'}).append($(outerHTML_).attr("class", "child_"+v.columnObj.colName))[0].outerHTML;
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
	
	radioBinding:function(param_){
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
				if(param1_.value!="man" && param1_.value!="wom"){
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
	init:function(){
		$("body").append("<form id=\"tableForm\" class=\"\pd3\"><table class=\"btable tableForm\" border=\"1\" cellspacing=\"0\" cellpadding=\"0\" width=\"100%\"><tbody></tbody></table></form>");
		tbody_ = $("body").find("form").children(".btable").find("tbody");
	},
	
	// easyui datagrid json赋值
	JSONData:function(urlData,paramData,datagrid_id){
		$('#'+datagrid_id).datagrid({
			url:urlData,
			queryParams:paramData
		}); 
	},
	
	// 动态表单数据展示
	ShowForm:function(param, path_, btnObj,orgGuid_){
		this.init();
		// 全局数据
		generic_search_orgGuid = orgGuid_;
		overallDataParam_ = param;
		if(param.layoutResult=="table"){
			// param.dataForm.remark 修改档案名称
			tbody_.append("<tr><td colspan=\"10\" class=\"dynamicTd\" style=\"line-height:30px;font-size:15px;\"><b><center>"+window.parent.CenterTab.getSelectTabPanel().title+"</center></b></td></tr>");
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
			});
		}
		dynamicTableName_ = param.dataForm.tableName;
		
		// 动态表单按钮
		if(btnStatus==null || btnStatus==""){
			this.ShowTableBottom(btnObj);
		}else{
			this.fileUpload(dynamicTableName_,Math.uuid(),'');
		}
	},
	
	ShowForm2:function(param, path_, btnObj,orgGuid_){
		this.init();
		// 全局数据
		generic_search_orgGuid = orgGuid_;
		overallDataParam_ = param;
		if(param.layoutResult=="table"){
			// param.dataForm.remark 修改档案名称
			tbody_.append("<tr><td colspan=\"10\" class=\"dynamicTd\" style=\"line-height:30px;font-size:15px;\"><b><center>"+window.parent.CenterTab.getSelectTabPanel().title+"</center></b></td></tr>");
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
			});
		}
		dynamicTableName_ = param.dataForm.tableName;
		
		// 动态表单按钮
		if(btnStatus==null || btnStatus==""){
			this.ShowTableBottom(btnObj);
		}else{
			this.fileUpload(dynamicTableName_,Math.uuid(),'');
		}
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

	ShowTableBottom:function(paramArray_){
		if(paramArray_==""){
			paramArray_ = [ {
				btnName : 'submitName',
				btnValue : ' 提 交 ',
				type : 'button',
				event_ : false,
				style : 'position: absolute;top: 10px;left: 41%;'
			}, {
				btnName : 'closeName',
				btnValue : ' 关 闭 ',
				type : 'button',
				event_ : true,
				click : 'window.parent.Dialog.CloseWindow()',
				style :''
			} ];
			//paramArray_ = [{btnName: 'submitName', btnValue: '提交', type:'button'}];
		}
		if(!$.isArray(paramArray_)){
			return false;
		}
		var btn = "<center>";
		$.each(paramArray_,function(k,v){
			var domO = {name: v.btnName, id: v.btnName, value: v.btnValue, type: v.type, style: v.style};
			if(v.event_){
				domO['onclick']=v.click;
			}
			btn+= $("<input/>",domO).attr('class','submitName')[0].outerHTML;
		});
		btn+="</center>";
//		console.log(btn);
		$('.btable').after($("<div/>",{style: 'text-align:center;padding-top:10px;padding-bottom: 10px;position: relative;', id:'btnDiv'}).append(btn));
		
		$('#submitName').click(function(){
			report_submit();
		});
		$('#resetName').click(function(){
			resetEditor();
		});
	},

	BindingDB:function(tabData){
		tabData.blobObjArray_ = generic_blobObjArray.join();
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
										if(v){
											var vsplit = v.split(',');
											$.each(vsplit,function(vk,vv){
												if($(ov).val()==vv){
													$("input[value="+vv+"]").attr("checked", 'checked');
												}
											})
										}
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
						

						if($("#"+formObjName)[0].type=="radio"){
							$("input[name='"+formObjName+"'][value="+jsonVal+"]").attr("checked", true);
						}
						
						if($("#"+formObjName)[0].nodeName=="SELECT"){
							$("#"+formObjName).change(function(){showChildrenSelect(this);});
							if(jsonVal!=null){
								var jsonValArray = jsonVal.split(",");
								$.each(jsonValArray, function(kjj,vjj){
									$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true}).change();
									$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
									    if(kjjSel>0){
									    	var newThis = $(this).change(function(){showChildrenSelect(this)});
									    	newThis.find("option[value='"+vjj+"']").attr({"selected": true}).change();
									    }
									})
								});
							}
						}else if($("#"+formObjName)[0].type == "checkbox"){
						}else if($("#"+formObjName).attr('class') == "WDate"){
							if(jsonVal!=null){
								jsonVal =jsonVal.substring(0,11);
							}
							$("#"+formObjName).val(jsonVal);
						}else{
							//console.log($("#"+formObjName).attr('class'));
							//console.log(jsonVal);
							$("#"+formObjName).val(jsonVal);
						}
						
						if($("#"+formObjName)[0].nodeName=="TEXTAREA"||$("#"+formObjName)[0].nodeName=="DIV"){
							/*CKEDITOR.instances[formObjName].on('instanceReady', function(){
								CKEDITOR.instances[formObjName].setData(jsonVal);
								CKEDITOR.instances[formObjName].resetDirty();
							})*/
							// alert(UE.getEditor(formObjName)+"..."+jsonVal);
							/*var BBSeditor =UE.getEditor(formObjName);
							BBSeditor.setContent(jsonVal);
							BBSeditor.render(formObjName);
							BBSeditor.addListener("ready", function () {
					            BBSeditor.setContent(jsonVal);
					        });*/
							$("#"+formObjName).html("");
							var BBSeditor = new baidu.editor.ui.Editor({
						    	textarea:formObjName,
						    	initialFrameHeight:120
							   });
						        BBSeditor.render(formObjName);
						        BBSeditor.addListener("ready", function () {
						            // editor准备好之后才可以使用
						        	//BBSeditor.setHeight(160);
						        	if(jsonVal==null)jsonVal="";
						            BBSeditor.setContent(jsonVal);
						        });
						       
						}
					});
					actionObj_.bt_ = "update";
					UUID_ = tabData.tableGuid_;
					$("#fileid").val(UUID_);
				}
			}
		});
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
							childColumnArray += $('<td>',{'style':'height:30px;border: 1px solid #CCCCCC;','align':'center'})
							.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						}
					});
					//childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/search.png\" onclick=\"chooseSWRY(this)\" alt=\"选择\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_add.png\" onclick=\"add()\" alt=\"新增\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_remove.png\" onclick=\"del(this)\" alt=\"删除\"></td>";
					childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><a href=\"javascript:add()\">增加</a>&nbsp;<a onclick=\"del(this)\" href=\"javascript:void(0)\">删除</a></td>";
					
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
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
							childColumnArray += $('<td>',{'style':'height:30px;border: 1px solid #CCCCCC;','align':'center'})
							.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						}
					});
					//childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/search.png\" onclick=\"chooseSWRY(this)\" alt=\"选择\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_add.png\" onclick=\"add()\" alt=\"新增\">&nbsp;<img style=\"cursor:pointer;\" src=\"js/EasyUI/EasyUI1.3.6/themes/icons/edit_remove.png\" onclick=\"del(this)\" alt=\"删除\"></td>";
					//childColumnArray+="<td align='center'><input type='hidden' name='"+tabData.tableName_+"_GUID' id='"+tabData.tableName_+"_GUID' value='"+$.trim(vj[tabData.tableName_+"_GUID"])+"' /><a href=\"javascript:add()\">增加</a>&nbsp;<a onclick=\"del(this)\" href=\"javascript:void(0)\">删除</a></td>";
					
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
					childColumnArray="";
				});
			}
		});
		if(formObj_.serializeArray()[columnLength]!=undefined){
			pubTr = $('.childTable').find('tbody').children().eq(1);
			$('.childTable').find('tbody').children().eq(1).remove();
		}
	},
	
	childBindingDB_bak:function(tabData, childObj_){
		var formObj_ = $('#childTableForm');
		var childColumnArray ="";
		columnLength = $('.childTable').find('tbody').children().eq(0).children().length-1;
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
						if(v.columnObj.isHid!=1 && columnObj.tableName!="STABLE_SWRY"){
							childColumnArray += $('<td>',{'style':'height:30px;border: 1px solid #CCCCCC;','align':'center'})
							.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						}
					});
					childColumnArray+="<td align='center'><a href=\"javascript:add()\">增加</a>&nbsp;<a onclick=\"del(this)\" href=\"javascript:void(0)\">删除</a></td>";
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
					childColumnArray="";
				});
			}
		});
		if(formObj_.serializeArray()[columnLength]!=undefined){
			pubTr = $('.childTable').find('tbody').children().eq(1);
			$('.childTable').find('tbody').children().eq(1).remove();
		}
	},
	
	
	BindingDBprint:function(tabData){ 
		tabData.blobObjArray_ = generic_blobObjArray.join();
		var formObj_ = $('#tableForm');  
		$.ajax({
			type: "post",
			url: "queryForm",
			dataType: "html",
			data: tabData,
			success: function(data){
				if(!$.isEmptyObject($.parseJSON(data)[0])){
					var formArray = formObj_.serializeArray();  
					$.each(formArray,function(k, v){
						var formObjName = v.name;     
						var jsonDB = $.parseJSON(data);   
						var jsonVal = jsonDB[0][formObjName.toUpperCase()];
						if($("#"+formObjName)[0].type=="radio"){
							$("input[name='"+formObjName+"'][value="+jsonVal+"]").attr("checked", true);
						}
						
						if($("#"+formObjName)[0].nodeName=="SELECT"){
							if(jsonVal!=null){   
							var a = $("#"+formObjName).find("option[value='"+jsonVal+"']").text();
							$("#td_"+formObjName).html(a);							
							}else{
								$("#td_"+formObjName).html("");	
							}
						}else{							
						$("#td_"+formObjName).html(jsonVal);
						}
						
						
					});  
					actionObj_.bt_ = "update";
					UUID_ = tabData.tableGuid_;
					
					this.fileUpload("Stable_Knowledge","FB7B50BE-8F43-45BC-8E4B-5C0E7486F1C5",ctx_);
				}
			}
		});
	},
	
	
	childBindingDBprint:function(tabData, childObj_){
		var formObj_ = $('#childTableForm');
		var childColumnArray ="";
		$.ajax({
			type: "post",
			url: "queryChildForm",
			dataType: "html",
			data: tabData,
			async: false,
			success: function(data){
				$.each($.parseJSON(data), function(kj, vj){
					$.each(childObj_.dataResult, function(k,v){
						jsonVal = vj[v.columnObj.colName.toUpperCase()];
						var formObjName = v.columnObj.colName;
						
						
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
						childColumnArray += $('<td>',{'style':'height:30px;','align':'center'})
						.append(htmlObj.attr("value",$.trim(vj[v.columnObj.colName.toUpperCase()])))[0].outerHTML;
						
						/*if($("#"+formObjName)[0].nodeName=="SELECT"){
							if(jsonVal!=null){   
							var a = $("#"+formObjName).find("option[value='"+jsonVal+"']").text();							
							$("#td_"+formObjName+kj).html(a);							
							}
						}else{						
							$("#td_"+formObjName+kj).html(jsonVal);
						}*/
						
						
					});
					
					//childColumnArray+="<td align='center'></td>";
					$('.childTable').find('tbody').append($("<tr/>").append(childColumnArray)[0].outerHTML);
					childColumnArray="";
				});
			}
		});
		if(formObj_.serializeArray()[childObj_.dataResult.length]!=undefined){
			pubTr = $('.childTable').find('tbody').children().eq(1);
			$('.childTable').find('tbody').children().eq(1).remove();
		}
	},
	
	
	disabled_:function(){
		$("#btnDiv").css("display", "none");
	},
	
	readonly_:function(){
		$("select").attr("disabled", "disabled");
		$("input").attr("readonly", "readonly");
	},
	BindingDBView:function(tabData){
		tabData.blobObjArray_ = generic_blobObjArray.join();
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
										if(v){
											var vsplit = v.split(',');
											$.each(vsplit,function(vk,vv){
												if($(ov).val()==vv){
													$("input[value="+vv+"]").attr("checked", 'checked');
												}
											})
										}
									})
								}
							})
						})
					}
					
					var formArray = formObj_.serializeArray();
					var colspanArray = {};
//					console.log(formArray);
					$.each(formArray,function(k, v){
						var formObjName = v.name;
						var jsonDB = $.parseJSON(data);
						var jsonVal = jsonDB[0][formObjName.toUpperCase()];
						colspanArray[k] = $("#"+formObjName).parent().attr('colspan');
						
						if($("#"+formObjName)[0].type=="radio"){
							//$("input[name='"+formObjName+"'][value="+jsonVal+"]").attr("checked", true).attr("disable", "disabled");
							var val= $("#"+formObjName).find("option[value='"+jsonVal+"']").text();
							var a =$("#"+formObjName)[0].parentNode;
							$(a).html(val);	
						}
						
						//
						
						/*if($("#"+formObjName)[0].nodeName=="SELECT"){
							$("#"+formObjName).change(function(){showChildrenSelect(this);});
							if(jsonVal!=null){
								var jsonValArray = jsonVal.split(",");
								$.each(jsonValArray, function(kjj,vjj){
									$("#"+formObjName).find("option[value='"+vjj+"']").attr({"selected": true}).change();
									$("select[name='"+formObjName+"']").each(function(kjjSel,vjjSel){
									    if(kjjSel>0){
									    	var newThis = $(this).change(function(){showChildrenSelect(this)});
									    	newThis.find("option[value='"+vjj+"']").attr({"selected": true}).change();
									    }
									})
								});
							}
						}*/
						
						//						
						if($("#"+formObjName)[0].nodeName=="SELECT"){
							var val ='';
							if(jsonVal!=''){
								if(jsonVal.indexOf(",")>-1){
									$.ajax({
										url:"userAction_findData?val="+jsonVal, 
										async : false,
										success: function(data) {
										  val = data;
									  }
									});
								}else{
							      val= $("#"+formObjName).find("option[value='"+jsonVal+"']").text();
								}
							}
							var a =$("#"+formObjName)[0].parentNode;							
							$(a).css("padding","5px").html(val);							
						}else  if($("#"+formObjName)[0].nodeName=="TEXTAREA"||$("#"+formObjName)[0].nodeName=="DIV"){							
							/*$("#"+formObjName).html("");
							var BBSeditor = new baidu.editor.ui.Editor({
						    	textarea:formObjName,
						    	initialFrameHeight:120
							   });
						        BBSeditor.render(formObjName);
						        BBSeditor.addListener("ready", function () {
						            // editor准备好之后才可以使用
						        	//BBSeditor.setHeight(160);
						        	if(jsonVal==null)jsonVal="";
						            BBSeditor.setContent(jsonVal);
						            BBSeditor.setDisabled();
						        });*/
						        
						        var a =$("#"+formObjName)[0].parentNode;
						        //alert(a+'..'+jsonVal);
								$(a).css("padding","5px").html(jsonVal);
						       
						}else if($("#"+formObjName)[0].type=="checkbox"){
							var a =$("#"+formObjName)[0].parentNode;
							var req = "";
							if(jsonVal.indexOf(',') > -1){
								var jsonArray = jsonVal.split(',')
//								console.log(jsonArray);
								$.each(jsonArray,function(k,v){
									req += $('#'+v).html();
									req += ',';
								});
								req = req.substring(0,req.length-1);
								$(a).html(req);
							}else{
								$(a).html($('#'+jsonVal).html());
							}
						}else if($("#"+formObjName).attr('class') == "WDate"){
							var a =$("#"+formObjName)[0].parentNode;
							if(jsonVal!=null){
								jsonVal =jsonVal.substring(0,11);
							}
							$(a).css("padding","5px").html(jsonVal);
						}else{
							var a =$("#"+formObjName)[0].parentNode;
							$(a).css("padding","5px").html(jsonVal);
						}
					});
					var colspanbolean = true;
					$.each(colspanArray,function(k, v){
						if(colspanArray[k] != 2){
							colspanbolean = false;
						}
					});
					if(colspanbolean){
						var trObj = $('.tableForm tbody tr');
						$.each(trObj, function(k,v){
				    		$(v).find('td').last().css('width',600);
				    	});
					}
					actionObj_.bt_ = "update";
					UUID_ = tabData.tableGuid_;
				}
			}
		});
	},
	
	fileUpload:function(tableName_,UUID_,path_){
		//FileUpload.init('edit',tableName_,UUID_,'uploadify',path_);		
		baidufile.init('edit',UUID_,'myuploadify');
		$("#fileid").val(UUID_);
		//$("#edui1_iframeholder").hide();
	},
	
	fileUploadView:function(tableName_,UUID_,path_){	
		baidufile.init('view',UUID_,'myuploadify');
		//$("#fileid").val(UUID_);
	},
	
	fileUploadprint:function(tableName_,UUID_,path_){
	    FileUpload.init('view',tableName_,UUID_,'uploadify',path_);
    },
    
    leaderRead:function(){
    	$.each($("input"),function(k,v){
    		$(v).parent().append("<span>"+v.value+"</span>");
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
    		$(v).find('td').last().remove();
    	})
    }
};
 

function report_submit(){
	validatebox.initValidate(false);
	//alert("validate : "+$('#tableForm').form('validate'));
	if($('#tableForm').form('validate')){
		$('#submitName').attr("disabled",true); //防止重复提交
		// 获取ueditor数据		
		$.each(generic_blobObjArray,function(k,v){
			pluginObj_.pluginId = v;
			pluginObj_.getData();
		});
		var formObj_ = $('#tableForm');
		var childTableForm_ = $('#childTableForm');
		// 表名称
		if(overallDataParam_.childResult[0]!=undefined){
			var childTableName = overallDataParam_.childResult[0].dataForm.tableName;
			columnLength = $('.childTable').find('tbody').children().eq(0).children().length;
			$.each(childTableForm_.serializeArray(),function(k, v){
				if(k==0){
					if(v.value=="" || v.value=="------请选择------"){
						return;
					}else{
						var formArray = childTableForm_.serializeArray();						
						/*var keyValues=[], columnArray=[], insql="";
						$.each(formArray,function(k,v){
							keyValues.push("'"+v.value+"'");
							columnArray.push(v.name);
							if(k>=1 && ++k%columnLength==0){
								columnArray.push([childTableName+"_guid","CREATE_USER","CREATE_DATE","ORG_GUID"]);
								keyValues.push("'"+Math.uuid()+"'","'CREATE_USER_DATA'","'CREATE_DATE_DATA'","'ORG_GUID_DATA'");
								insql += "into "+childTableName+"("+columnArray.join()+")values("+keyValues.join()+")";
								keyValues=[];
								columnArray=[];
							}
						});
						insql = "insert all "+insql+" select * from dual";
						actionObj_.childSql_ = insql;*/
						
						var sqlString=[], mergeObj={};
						$.each(formArray,function(k,v){
							mergeObj[v.name]=v.value;
							
							if(k>=1 && ++k%columnLength==0){
								// 过滤JS对象主键
								delete mergeObj[childTableName+"_GUID"];
								// 判断是新增、更新								
								if(v.name==childTableName+"_GUID" /*&& v.value==""*/){
									mergeObj[childTableName+"_GUID"]=Math.uuid();
									mergeObj["CREATE_USER"]="CREATE_USER_DATA";
									mergeObj["CREATE_DATE"]="CREATE_DATE_DATA";
									mergeObj["ORG_GUID"]="ORG_GUID_DATA";
									sqlString.push(squel.insert().into(childTableName).setFields(mergeObj).toString());
								}/*else{
									mergeObj["UPDATE_USER"]="UPDATE_USER_DATA";
									mergeObj["UPDATE_DATE"]="UPDATE_DATE_DATA";
									mergeObj["ORG_GUID"]="ORG_GUID_DATA";
									sqlString.push(squel.update().table(childTableName).setFields(mergeObj).where(childTableName+"_GUID='"+v.value+"'").toString());
								}*/
								mergeObj={};
							}
						});
						actionObj_.childSql_ = sqlString.join("||");
						
					}
				}
			});
		}
		
		
		overallDataParam_.dataForm["childTableName"]=childTableName;
		
		if(actionObj_.bt_=="update"){
			actionObj_.sql_ = sqleditor.update_(overallDataParam_.dataForm, formObj_);
		}else{
			actionObj_.sql_=sqleditor.insert_(overallDataParam_.dataForm, formObj_);
			
	        actionObj_.bt_ = "insert";
		}
		
		actionObj_["tableName_"] = overallDataParam_.dataForm.tableName;
		actionObj_["data_uuid_"] = UUID_;
		actionObj_["blobObjArray_"] = generic_blobObjArray.join();
		actionObj_["dateObjArray_"] = generic_DateObjArray.join();
//		console.log(actionObj_);
		$.ajax({
			type: "post",
			url: "saveorUpdateFormObj",
			dataType: "html",
			data: actionObj_,
			success: function(data){				
				if(data){
					$.messager.alert("系统提示","操作成功","info",function(){
						window.parent.Dialog.CloseWindow();
						window.parent.CenterTab.RefreshTab();
					});
				}else{
					$.messager.alert("系统提示","操作失败","info",function(){
						window.parent.Dialog.CloseWindow();
						window.parent.CenterTab.RefreshTab();
					});
				}
			}
		});
	}
}

// js生成sql
var sqleditor={
	init_:function(dataParam_, formObj_){
		/**
		  * sql对象
		  * tableKeyWork_ SQL关键字
		  * tableName_ 表名名称
		  * tableMap_ 列数据
		  * tableWhere_ SQL过滤条件
		  */
		var sqlObj_={
			tableKeyWork_:"",
			tableName_:"",
			tableMap_:"",
			tableWhere_:""
		},sqlMap_={};
		//find(':visible')
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
		return JSON.stringify(update_sqlObj_);
	}
}

// 输出内容
function outHTML(columnObj, tagName_, plugObj_){
	var showTd_ = "<td class=\"dynamicTd\"  style=\"word-wrap:break-word;\" width=\"10%\">"+columnObj.colRemark+"&nbsp;</td><td width=\"10%\" colspan="+columnObj.formstyleColspan+">"+outerHTML_+"</td>";
	if (plugObj_.pluginTag == 'table') {
		showTd_ = "<td style='text-align:left;height:40px;' colspan="
		+ columnObj.formstyleColspan
		+ "><div style='line-height:30px;background:#E0ECFF;'>&nbsp;"+columnObj.colRemark+"</div>"
		+ ""+outerHTML_+"</td>";
	}
	var trPro = columnObj.widthPro*2;
	
	if(columnObj.widthPro>1){
		if(tr_==undefined){tr_=$("<tr/>");}
		if(tr_.find("td:visible").length==trPro){tr_=$("<tr/>");}
		if(columnObj.isHid==1 && columnObj.tableName!="STABLE_SWRY"){
			showTd_ = $('<tbody>').append(showTd_).css('display','none')[0].outerHTML;
		}
		tr_.append(showTd_);
		tbody_.append(tr_);
	}else{
		/**
		 * TD数据输出百分比需要重新优化JS
		 */
		var tdDOM = $(showTd_), newShowId;
		$.each(tdDOM, function(tdK,tdV){
			var tdV_ = $(tdV);
			if(tdK%2==1){
				tdV_.attr('width','80%');
			}else{
				tdV_.attr('width','10%');
			}
			newShowId += tdV_[0].outerHTML;
		});
		tr_=$("<tr/>").append(newShowId);
		tbody_.append(tr_);
		objPro(columnObj, $(tr_));
		tr_=undefined;
	}
	if(tagName_=="TEXTAREA"){
		pluginObj_.ckeditor(columnObj.colName);		
	}
}

function objPro(columnObj, trAndTd_){
	if(columnObj.isHid==1 && columnObj.tableName!="STABLE_SWRY"){
		trAndTd_.css('display','none');
	}
}

// 富文本渲染
var pluginObj_={
	pluginObj:"",
	
	pluginId:"",
	
	// 初始化ckeditor
	ckeditor:function(param_){
		/*this.pluginId = param_;
		this.pluginObj = CKEDITOR.replace(param_,{width:'100%', 
			toolbar: [
		      ['Bold','Italic','Underline','Strike'], ['Cut','Copy','Paste'],['Image'],
		      ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
		      ['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock']],
		    language:'zh-cn',
		    removePlugins:'elementspath'
		});*/
				
		 pluginObj = new baidu.editor.ui.Editor({
		    	textarea:param_,					//表单提交的name
			   });
		 pluginObj.render(param_);
		 /*pluginObj.addListener("ready", function () {
	            // editor准备好之后才可以使用
	            BBSeditor.setContent('${info.content}');
	        });*/
		
	},
	
	// 获取ckeditor信息
	getData:function(){
	  //$('#'+this.pluginId).val(CKEDITOR.instances[pluginObj_.pluginId].getData());
//		console.log(pluginObj);
		pluginObj.getContent();
	}
};

// form元素名称必填加*
function requiredVal (columnObj){
	if(columnObj.isMust=="1"){
		columnObj.colRemark="<font color='red'>*</font>&nbsp;"+columnObj.colRemark;
	}
}

// 字符转16进制
function stringToHex(str){
	var val="";
	for(var i = 0; i < str.length; i++){
		val += str.charCodeAt(i).toString(16);
	}
	return val.toUpperCase();
}

function add_bak(){
	var tableObj_HTML = "";
	if(pubTr!=""){
		tableObj_HTML = pubTr[0].outerHTML;
	}else{
	  tableObj_HTML = $('.childTable').find('tbody').children().eq(1).show()[0].outerHTML;
	}
	$('.childTable').find('tbody').append(tableObj_HTML);
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

// 清空表单富文本、上传控件数据
function resetEditor(){
	if($('#FileList_uploadify').find('img')[1]!=undefined){
		$('#FileList_uploadify').find('img')[1].click();
	}
	$.each(generic_blobObjArray, function(k,v){
		CKEDITOR.instances[v].setData("");		
		$('#'+v).val("");
	});
	$.each(generic_SelectObjArray, function(k,v){
		  var value_ = $('#'+v.toLowerCase()).val();
		  $("#"+v.toLowerCase()+" option[value='"+value_+"']").attr("selected", false);
	});
	
}

function chooseSWRY(param){
	var tdArray = $(param).parent().parent().children(), objArray=[];
	$.each(tdArray,function(k,v){
		if(k!=tdArray.length-1){
			objArray.push($(v).children().eq(0));
		}
	})
	window.parent.Dialog.OpenDialogWithReturn("选择人员",
			"/myhappyform/DialogAction_toCommonSqlDialog?type=chooseSWRY",
			500,400,objArray);
}

function showll(param){
	common.openDialogMap("选择地点", "genericAction_mapchild", 900, 650,param.id);
	var iframeObj_ = window.parent.frames["jd_iframe"];
	$(iframeObj_).load(function(){
		var mapArray = $(param).val().split(',');
		var e ={point:{lng:mapArray[0],lat:mapArray[1]}};
		if(e.point.lng!='' && e.point.lng!=null){
			//this.param_ = $(param);
			//this.showInfo(e);
			parent.document.getElementsByTagName("iframe")["jd_iframe"].contentWindow.param_ = $(param);
			parent.document.getElementsByTagName("iframe")["jd_iframe"].contentWindow.showInfo(e);
		}else{
			parent.document.getElementsByTagName("iframe")["jd_iframe"].contentWindow.search($(param));
			//this.search($(param));
		}
	});
}

$(window).load(function(){
	
	validatebox.initValidate(true);
	
	datebox.initDateBox();
	
	$.each(inputObj.tmpObj,function(k,v){
		$("input[name='"+v+"']").attr('onclick','showll(this)');
	})
})


jQuery.fn.removeSelected = function() {
    this.val("");
};
