var datagrid, userDialog, userDialog, userform, tableGuid_, formatterColumnStr, showDataGrid_;
var newTableName_ = "", search_orgGuid="", pageOrgid="",conn="";
var columnArray=[], formatterColumn_={}, seachObjArray=[], blobObjArray=[], ctx_, tabName,page=1,rows=15;
//arrayHtml(HTML展现数组) arrayNewObject,arryName(对象数组、名称数组)
var arrayNewObject=[],arryName=[];

var generic={
	// easyui datagrid json赋值
	JSONData:function(urlData,paramData,datagrid_id){
		$('#'+datagrid_id).datagrid({
			url:urlData,
			queryParams:paramData
		}); 
	}
}

// 添加面包屑菜单
function addMenu(param,nodeId_){
	var arrayHtml=[];
	var arrayLen = $.inArray(param,arryName);
	if(arrayLen==-1){
		var obj = {orgname:param,nodeId:nodeId_};
		arrayNewObject.push(obj);
		arryName.push(param);
	}
	$.each(arrayNewObject,function(k,v){
		arrayHtml.push("<a href='javascript:void(0);' onclick=aMenuAndRefreshData('orgAction_showJsonChildNode','"+v.nodeId+"','"+v.orgname+"')>"+v.orgname+"</a>");
	})
	showLocal.innerHTML="﹥"+arrayHtml.join("﹥");
}

// 面包屑单击函数
function aMenuAndRefreshData(url_,anodeId_,aorgname_){
	aMenu(url_,anodeId_,aorgname_);
	againData('',anodeId_);
}

function aMenu(url_,anodeId_,aorgname_){
	var arrayHtml_=[];
	generic.JSONData(url_,{'org.nodeId':anodeId_, tableName_: newTableName_},'user_list');
	var arrayLen = $.inArray(aorgname_,arryName);
	$.each(arrayNewObject,function(k,v){
		if(k>arrayLen){
			arrayNewObject.pop(k);
			arryName.pop(k);
		}else{
			arrayHtml_.push("<a href='javascript:void(0);' onclick=aMenuAndRefreshData('orgAction_showJsonChildNode','"+v.nodeId+"','"+v.orgname+"')>"+v.orgname+"</a>");
		}
	})
	showLocal.innerHTML="﹥"+arrayHtml_.join("﹥");
}

// 清空数据
function clearMenu_(param){
	search_orgGuid = param;
	generic.JSONData('orgAction_showJsonOrg',{columnName:'subtotal',order:'desc', tableName_:newTableName_},'user_list');
	showLocal.innerHTML="";
	arrayNewObject=[];
	arryName=[];
	orgFormList();
	//$("#datagrid").datagrid("reload",{orgGuid_:search_orgGuid});	
	$("#datagrid").datagrid("clearSelections");
	$("#user_list").datagrid("clearSelections");
	
}

$(function(){
	$('#user_list').datagrid({
		url: 'orgAction_showJsonOrg',
		queryParams :{columnName:'subtotal',order:'desc', tableName_:newTableName_},
		onClickRow:function(rowIndex,rowData){
//			$.getJSON('orgAction_showJsonChildNode',{'org.nodeId':rowData.ID}, function(data){
//				$('#user_list').datagrid('loadData', data);
//			})
			generic.JSONData('orgAction_showJsonChildNode',{'org.nodeId':rowData.ID, tableName_: newTableName_},'user_list');
			addMenu(rowData.ORGNAME,rowData.ID);
			pageOrgid = rowData.ID;
			againData('',pageOrgid);
			
			search_orgGuid =pageOrgid;
			this.generic_search_orgGuid = search_orgGuid;
		}
	});
	formList();
	$('#tdInput>input:text').bind('keypress',function(event){
        if(event.keyCode == "13"){
        	searchFun();
        }
    });
});

function orgFormList(){
	$('#tdInput').empty();
	formList();
}

function formList(){
	$.ajax({
		type: "post",
		url: "genericAction_queryFromColumn",
		dataType: "html",
		data: {tableName_: newTableName_},
		async: false,
		success: function(data){
			blobObjArray=[];
			var parseJSON = $.parseJSON(data);
			$.each(parseJSON.columnData, function(k,v){
				var columnObj ={
					field : v.COL_NAME.toUpperCase(),
					title : v.COL_REMARK,
					width : 200
				};
				if(v.IS_LISTSHOW==2){
					columnObj['hidden']=true;
				}
				if(v.IS_SELECT==1){
					var seachObj_={}
					columnObj['pluginType']=v.PLUGIN_TYPE;
					if(v.DYDATA!=""){
						columnObj['dydata']=v.DYDATA;
					}
					seachObj_=columnObj;
					seachObjArray.push(seachObj_);
				}
//				console.log(v.COL_TYPE);
				if(v.COL_TYPE.toUpperCase()=='BLOB' || v.COL_TYPE.toUpperCase()=='CLOB'){
					columnObj['formatter']=function(value, rowData, rowIndex){
						value = $.trim($(value).text());
						return value;
					};
					blobObjArray.push(v.COL_NAME.toUpperCase());
				}
				tableGuid_ = v.TABLE_GUID;
				columnArray.push(columnObj);
				if(v.CHILD_DATA_GUID!=undefined){
					formatterColumn_[v.COL_NAME.toUpperCase()]=v.CHILD_DATA_GUID;
				}
			});
		}
	});
	showSearchInput(seachObjArray);
	formatterColumnStr = JSON.stringify(formatterColumn_);
	showDataGrid(columnArray, showDataGrid_, formatterColumnStr);
}

function showSearchInput(inputParam){
	var inputObjStr="";
	$.each(inputParam, function(k,v){
		var inputObj ={
			name:v.field
		}
		if(v.pluginType=="date"){
			inputObj['onclick']='WdatePicker({readOnly:true})';
			inputObj['readonly']=true;
			inputObjStr += "&nbsp;"+v.title+"："+$("<input/>",inputObj)[0].outerHTML+"-"+$("<input/>",inputObj)[0].outerHTML;
		}else{
			if(v.dydata!=undefined){
				var select_ = {
					name:v.field
				};
				if(v.dydata!=undefined){
					var dydata_ = $.parseJSON(v.dydata);
					var option_="";
					$.each(dydata_, function(v){
						option_ += $("<option/>",{text: dydata_[v], value: v})[0].outerHTML;
					});
					var select_ = $("<select/>",select_)
					.append(option_)
					.prepend($("<option/>",{text: "------请选择------", value: ''}))[0].outerHTML;
					inputObjStr+="&nbsp;&nbsp;"+v.title+"："+select_;
				}
			}else{
				inputObjStr += "&nbsp;"+v.title+"："+$("<input/>",inputObj)[0].outerHTML;
			}
		}
	});
	if(inputObjStr==""){
		$('#searchForm').find("table").find("tr").first().css('display', 'none');
	}
	$('#tdInput').append(inputObjStr);
	seachObjArray=[];
}

function showDataGrid(columnArray_, showDataGrid_, formatterColumnStr){
	 if(conn!=''){
	     searchColumnStr =  "{\""+conn.split("_")[0]+"\":\""+conn.split("_")[1]+"\"}";
	 }else{
		 searchColumnStr =""; 
	 }
	 
	var guid_ =newTableName_+'_GUID';
	guid_ = guid_.toUpperCase();
	datagrid = $('#datagrid').datagrid({
		url: "genericAction_queryFromData",
		toolbar : '#toolbar',
		fit : true,
		fitColumns : true,
		nowrap : true,
		animate : false,
		border : false,
		pagination : true,
		pageSize : 15,
		pageList : [10,15,20,30],
	    rownumbers : false,
		idField : guid_,
		frozenColumns : [ [ {
			title : guid_,
			field : guid_,
			width : 50,
			checkbox : true
		} ] ],
		columns : [ columnArray_ ],
		queryParams : {orgGuid_:search_orgGuid,tableName_ :newTableName_, formatterColumnStr:formatterColumnStr,searchColumnStr:searchColumnStr, blobObjArray_: blobObjArray.join()},
		onRowContextMenu : function(e, rowIndex, rowData) {	
			e.preventDefault();
			$(this).datagrid('clearSelections');
			$(this).datagrid('selectRow', rowIndex);
			$('#mm').menu('show', {
				left : e.pageX,
				top : e.pageY
			});
		},
		onLoadSuccess:function(data){
			//统计数量
			$('#datagrid_total').html(data.total)
		},
		onClickRow:function(rowIndex,rowData){
			var guid_ =newTableName_+'_guid';
			guid_ = guid_.toUpperCase();
			var dataid_ = rowData[guid_];
			var tabData = {tableName_: newTableName_, tableGuid_: dataid_, blobObjArray_: blobObjArray.join()};
			common.openWindow(tabName+'_查看', "genericAction_formview?tableGuid_="+tableGuid_+"&dataid="+dataid_, 920, 500);
			$(window.parent.frames["jd_iframe_window"]).load(function(){
				this.generic.BindingDBView(tabData);
				this.generic.disabled_();
				//this.generic.readonly_();				
				this.generic.fileUploadView(this.dynamicTableName_,dataid_,ctx_);
			});
		}
		
	});
	// 替代datagrid queryParams参数 bug 
	var opts = datagrid.datagrid('options');
	datagrid.datagrid('getPager').pagination({
		onSelectPage:function(pageNumber, pageSize){
			rows = pageSize;
			//opts.queryParams.orgGuid_ = pageOrgid;
			opts.queryParams.orgGuid_ = search_orgGuid;
			opts.queryParams['page'] = pageNumber;
			opts.queryParams['rows'] = pageSize;
			//console.log(opts.url);
			$.ajax({ type: opts.method, url: opts.url, data: opts.queryParams, dataType: "json",  success: function (data) {
				datagrid.datagrid("loadData",data);
			}});
		}
		
	})
	columnArray = [];
}
   
// 打开新增用户页面
function append() {	
	var orgGuid_ = $('#orgGuid').val();
	//console.log($('#orgGuid').val());
	common.openWindow(tabName+'_增加', 'genericAction_form?tableGuid_='+tableGuid_+'&orgGuid_='+orgGuid_, 920, 500);
	var iframeObj_ = window.parent.frames["jd_iframe_window"];
	$(iframeObj_).load(function(){
		this.generic_search_orgGuid = search_orgGuid;
		this.UUID_ = Math.uuid();
		this.generic.fileUpload(this.dynamicTableName_,this.UUID_,ctx_);
	});
}

// 打开编辑页面
function edit() {
	var num = $("#datagrid").datagrid("getSelections");	
	var numLength = num.length;
	var guid_ =newTableName_+'_GUID';
	
	guid_ = guid_.toUpperCase();
	if(numLength==0){			
		common.msg('提示','请选择要编辑的记录!','remind');	
	}
	if(numLength>1){
		common.msg('提示','只能择一个动态表进行编辑!','remind');
	}
	if(numLength==1){
		// 绑定动态表数据
		var orgGuid = "";
		if(!num[0]['ORG_GUID']){
			orgGuid = "";
		}else{
			orgGuid = num[0]['ORG_GUID'];
		}
		common.openWindow(tabName+"_编辑", "genericAction_form?tableGuid_="+tableGuid_+"&dataid="+num[0][guid_]+"&orgGuid_="+orgGuid, 920, 500);
		var tabData = {tableName_: newTableName_, tableGuid_: num[0][guid_], blobObjArray_: blobObjArray.join()};
		var iframeObj_ = window.parent.frames["jd_iframe_window"];
		$(iframeObj_).load(function(){
//			console.log(tabData);
			this.generic.BindingDB(tabData);
			//this.generic.fileUpload(this.dynamicTableName_,num[0][guid_],ctx_);//'${ctx}'
//			console.log(num[0][guid_]);
			this.generic.fileUpload(this.dynamicTableName_,num[0][guid_],ctx_);
			$("#fileid").val(num[0][guid_]);
		});
	}
}

function remove_common() {
	var num = $("#datagrid").datagrid("getSelections");	
	var numLength = num.length;
	if(numLength==0){
		common.msg('提示','请选择要删除的记录!','remind');
	}else{	
		$.messager.confirm('系统提示','您要删除当前所选数据',function(r){
			if(r){
				var guid_ =newTableName_+'_guid';
				guid_ = guid_.toUpperCase();
				var tableGuidArray = [];
				$.each(num,function(k,v){
					tableGuidArray.push(v[guid_]);
				})
				$.ajax({
					type: "post",
					url: "genericAction_delFormTable",
					dataType: "html",
					data: {tableName_: newTableName_, tableGuid_: tableGuidArray.join()},
					success: function(data){
						//查询项内容
						var searchObj={}, obj_=[], dateArray=[];
						$.each($('#searchForm').serializeArray(),function(k,v){
							if(v.value!=""){
								if(obj_.length>0){
									if($.inArray(v.name,obj_)>=0){
										var dateSql = searchObj[v.name]+","+v.value;
										searchObj[v.name]=dateSql;
										return true;
									}
								}
								obj_.push(v.name);
								searchObj[v.name]=v.value;
							}
						});
						searchObj = JSON.stringify(searchObj);
						
						
						if(data){
							$.messager.alert('系统提示','操作成功','info',function(){againData(searchObj,pageOrgid);});
						}else{
							$.messager.alert('系统提示','操作失败','info',function(){againData(searchObj,pageOrgid);});
						}
					}
				});
			}
		})
	}
}

// 打开查看页面
function look() {
	var num = $("#datagrid").datagrid("getSelections");	
	var numLength = num.length;	
	if(numLength==0){		
		common.msg('提示','请选择要查看的记录!','remind');
	}
	if(numLength>1){
		common.msg('提示','只能择一个表进行查看!','remind');
	}
	if(numLength==1){
		var guid_ =newTableName_+'_guid';
		guid_ = guid_.toUpperCase();		
		var tabData = {tableName_: newTableName_, tableGuid_: num[0][guid_], blobObjArray_: blobObjArray.join()};
		common.openWindow(tabName+'_查看', "genericAction_form?tableGuid_="+tableGuid_+"&dataid="+num[0][guid_], 920, 500);
		$(window.parent.frames["jd_iframe_window"]).load(function(){
			this.generic.BindingDBView(tabData);
			this.generic.disabled_();
			//this.generic.readonly_();
			this.generic.fileUploadView(this.dynamicTableName_,num[0][guid_],ctx_);
		});
	}
}

//搜索
function searchFun() {
	var searchObj={}, obj_=[], dateArray=[];
	$.each($('#searchForm').serializeArray(),function(k,v){  console.log(v);
		if(v.value!=""){
			if(obj_.length>0){
				if($.inArray(v.name,obj_)>=0){
					var dateSql = searchObj[v.name]+","+$.trim(v.value);
					searchObj[v.name]=dateSql;
					return true;
				}
			}
			obj_.push(v.name);
			searchObj[v.name]=$.trim(v.value);
		}
	});
	searchObj = JSON.stringify(searchObj);
	againData(searchObj,pageOrgid);
}

function againData(searchObj, newOrgGuid_){
	if(searchObj!=''){
         searchColumnStr =  searchObj;
    }else{
		 searchColumnStr =""; 
	 }
	//更新全局变量
	search_orgGuid = newOrgGuid_;
	$.ajax({
		type: "post",
		url: "genericAction_queryFromData",
		dataType: "html",
		data: {tableName_ :newTableName_, formatterColumnStr:formatterColumnStr,page:page,rows:rows,searchColumnStr:searchColumnStr, orgGuid_:newOrgGuid_, blobObjArray_: blobObjArray.join()},
		success: function(data_){
			$('#datagrid').datagrid("loadData",$.parseJSON(data_));
			$('#datagrid_total').html($.parseJSON(data_).total)
		}
	});
	$("#datagrid").datagrid("clearSelections");
}

// 清空
function clearFun() {
	$('input').val('');
	var pagesize = $(".pagination-page-list").val();
	$('select').val('');
	$(".pagination-page-list").val(pagesize);
	$(".pagination-num").val(1);
	searchFun();
}

var clearDataGrid = function(){
	$("#datagrid").datagrid("reload");	
	$("#datagrid").datagrid("clearSelections");
}



// 导出（此方法不是通用的）
function exportword() {
	var num = $("#datagrid").datagrid("getSelections");	
	var numLength = num.length;	
	if(numLength==0){		
		common.msg('提示','请选择要导出的记录!','remind');
	}
	if(numLength>1){
		common.msg('提示','只能择一个记录进行导出!','remind');
	}
	if(numLength==1){
		var guid_ =newTableName_+'_guid';
		guid_ = guid_.toUpperCase();		
		var tabData = {tableName_: newTableName_, tableGuid_: num[0][guid_], blobObjArray_: blobObjArray.join()};
		/**$.post("genericAction_importWord",
			{"tablename":newTableName_,
				"guid":num[0][guid_]
			 },function (data){
			
		  }
		);*/
		searchForm.action="genericAction_importWord?tablename="+newTableName_+"&guid="+num[0][guid_];
		searchForm.submit();
		
	}
}


function exportword2() {
	var num = $("#datagrid").datagrid("getSelections");	
	var numLength = num.length;	
	if(numLength==0){		
		common.msg('提示','请选择要预览的记录!','remind');
	}
	if(numLength>1){
		common.msg('提示','只能择一个记录进行预览!','remind');
	}
	if(numLength==1){
		var guid_ =newTableName_+'_guid';
		guid_ = guid_.toUpperCase();		
		var tabData = {tableName_: newTableName_, tableGuid_: num[0][guid_], blobObjArray_: blobObjArray.join()};
		/**$.post("genericAction_importWord",
			{"tablename":newTableName_,
				"guid":num[0][guid_]
			 },function (data){
			
		  }
		);*/
		var url="genericAction_importWord2?tablename="+newTableName_+"&guid="+num[0][guid_];
		common.openWindow('预览', url, 700, 320);
		
	}
}

