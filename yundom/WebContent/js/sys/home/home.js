/// <reference path="../../Scripts/jquery-1.4.1-vsdoc.js" />
/**
* 首页框架
* 
* 作者：牛牛 
* 更新：2013-12-24
*
*/
//对Date的扩展，将 Date 转化为指定格式的String
//月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
//年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
//例子： 
//(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
//(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
 var o = {
     "M+": this.getMonth() + 1, //月份 
     "d+": this.getDate(), //日 
     "h+": this.getHours(), //小时 
     "m+": this.getMinutes(), //分 
     "s+": this.getSeconds(), //秒 
     "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
     "S": this.getMilliseconds() //毫秒 
 };
 if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
 for (var k in o)
 if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
 return fmt;
}

var UserObj = {
	// 用户Id
	userId : '',
	// 用户登录名称
	userLoginName : '',
	// 用户名
	userName : '',
	// 组织机构ID
	userOrgId : '',
	// 组织机构编码
	userOrgCode : '',
	// 组织机构名称
	userOrgName : '', 
	// 用户头像
	userImg : '',
	// 用户排序
	userNumber : '',
	// 用户邮件
	userEmail : '',
	// 用户电话
	userPhone : '',
	// 用户地址
	userAddress : '',
	// 用户备注
	userRemark : '',
	// 是否流程用户 （isProcess）
	userWorkFlow : '',
	// 用户部门编码
	userDeptCode : '',
	// 用户部门名称
	userDeptName : '',
	// 用户角色编码
	userRoles : '',
	
	userDate: new Date().Format("yyyy-MM-dd")
}

var Top = {
    Id: "top",
    Width: "",
    Height: "",

    init: function () {
        
    }
};

var Bottom = {
    Id: "bottom",
    Width: "",
    Height: "",

    init: function () {

    }
};

var Left = {
    Id: "left",
    Width: "",
    Height: "",

    init: function () {
        $('.easyui-tree').tree({
            onClick: function (node) {
                //if (node.attributes && node.attributes.url) {
                //					$.messager.progress({
                //						title : '提示',
                //						text : '数据处理中，请稍后....'
                //					});
                if (node.url != "") {
                	 if(node.attributes.isPopup=='1'){//弹出显示
                		 window.open(node.url,"_blank");
                	 }
                	 else{
                		 Home.addTab(node.id, node.text, node.iconCls, node.url, "href",true);
                	 }
                }
                //}
            },
            onBeforeLoad: function (node, param) {
                //				if (layout_west_tree_url) {//只有刷新页面才会执行这个方法
                /*$.messager.progress({
                    title: '提示',
                    text: '数据处理中，请稍后....'
                });*/
                //				}
            },
            onLoadSuccess: function (node, data) {
                $.messager.progress('close');
            },onExpand:function (){
            	//alert('onExpand');
            	
            }
        });
    }
};

var Center = {
    Id: "center",
    Width: "",
    Height: "",

    init: function () {

    }
};


var CenterTab = {
    Id : "centerTab",
    Index: -1,
    
    add: function (id, title, iconCls, content, closable) {
        if ($("#" + this.Id).tabs('exists', title)) {
            $("#" + this.Id).tabs('select', title);
        } else {
        	this.Index++;
            $("#" + this.Id).tabs('add', {
                id: id,
                title: title,
                iconCls: iconCls,
                content: content, //'<div style="padding:10px">Content' + this.Index + '</div>',
                //href : "",
                closable: closable,
                fit: true
            });
        }
        //$.messager.progress('close');
    },
    
    addTab4Iframe: function (id, title, iconCls, content, closable) {
    		if(parent.$("#" + this.Id).tabs('exists',title)){
    			parent.$("#" + this.Id).tabs('select', title);
    			parent.$("#" + this.Id).tabs('update', {
    				tab: parent.$("#" + this.Id).tabs('getSelected'),
    				options: {
    	                title: title,
    	                content: content 
    				}
    			});
    		}else{
	        	this.Index++;
	        	parent.$("#" + this.Id).tabs('add', {
	                id: id,
	                title: title,
	                iconCls: iconCls,
	                content: content, //'<div style="padding:10px">Content' + this.Index + '</div>',
	                //href : "",
	                closable: closable,
	                fit: true
	            });
    		}
    },
    addTab4IframeChild: function (id, title, iconCls, content, closable) {
		if(parent.parent.$("#" + this.Id).tabs('exists',title)){
			parent.parent.$("#" + this.Id).tabs('select', title);
			parent.parent.$("#" + this.Id).tabs('update', {
				tab: parent.$("#" + this.Id).tabs('getSelected'),
				options: {
	                title: title,
	                content: content 
				}
			});
		}else{
        	this.Index++;
        	parent.parent.$("#" + this.Id).tabs('add', {
                id: id,
                title: title,
                iconCls: iconCls,
                content: content, //'<div style="padding:10px">Content' + this.Index + '</div>',
                //href : "",
                closable: closable,
                fit: true
            });
		}
    },

    remove : function(){
        var tab = $("#" + this.Id).tabs('getSelected');
        if (tab) {
            var index = $("#" + this.Id).tabs('getTabIndex', tab);
			if(index>0){
				 $("#" + this.Id).tabs('close', index);
			}
        }
    },
    
    remove4Child : function(){
        var tab = parent.$("#" + this.Id).tabs('getSelected');
        if (tab) {
            var index = parent.$("#" + this.Id).tabs('getTabIndex', tab);
			if(index>0){
				parent.$("#" + this.Id).tabs('close', index);
			}
        }
    },
    
    removeAllTab : function(){
    	for(i=this.Index;i>=0;--i){
    		$("#" + this.Id).tabs('close', i);
    	}
    },
    // 获取操作页面window
    getSelectTabWindow:function(){
    	return $("#" + this.Id).tabs('getSelected').find("iframe")[0].contentWindow;
    },
    getSelectTab:function(){
    	return $("#" + this.Id).tabs('getSelected');
    },
    
    getSelectTabPanel:function(){
    	return $("#" + this.Id).tabs('getSelected').panel('options');
    },
    
    getSelectTabId : function(){         
         var tab = $("#" + this.Id).tabs('getSelected');
    	 var id = tab.panel('options').id;
    	 return id;
    },
    
    RefreshTab : function(){
    	 var tab_ = $("#" + this.Id).tabs('getSelected');
    	 var url = $(tab_.panel('options').content).attr('src');
    	 $("#" + this.Id).tabs('update', {
    		 tab : tab_,
    		 options : {
    			 content : tab_.panel('options').content
    		 }
    	 });
    }
};

var Home = {
    /**
    * 首页初始化
    */
    init: function () {
        Top.init();
        Bottom.init();
        Left.init();
        Center.init();

        this.addTab("0", "首页", "icon-tip", "HomeAction_toHome", "href",false);
    },

    /**
    * 增加首页tab
    * id: id
    * title: 标题
    * info: 内容
    * type: 类型：href-超链接； html-静态页面；
    */
    addTab: function (id, title, iconCls, info, type,closable) {
    	if(info!=''&&info!='null'){
	        var content = '';
	        if (type == "href") {
	        	//content = '<div>'+title+'</div>';
	            content = '<iframe src="' + info + '" allowTransparency="true" scrolling="auto" style="border: 0; width: 100%; height: 100%;" frameBorder="0" id="ContentBottomiframe_'+id+'" ></iframe>';
	        }
	        else if (type == "html") {
	            content = info;
	        }
	        CenterTab.add(id, title, iconCls, content,closable);
    	}
    },
    addTab4Iframe: function (id, title, iconCls, info, type,closable) {
    	if(info!=''&&info!='null'){
	        var content = '';
	        if (type == "href") {
	        	//content = '<div>'+title+'</div>';
	            content = '<iframe src="' + info + '" allowTransparency="true" scrolling="auto" style="border: 0; width: 100%; height: 100%;" frameBorder="0" id="ContentBottomiframe_'+id+'" ></iframe>';
	        }
	        else if (type == "html") {
	            content = info;
	        }
	        CenterTab.addTab4Iframe(id, title, iconCls, content,closable);
    	}
    },
    addTab4IframeChild: function (id, title, iconCls, info, type,closable) {
    	if(info!=''&&info!='null'){
	        var content = '';
	        if (type == "href") {
	        	//content = '<div>'+title+'</div>';
	            content = '<iframe src="' + info + '" allowTransparency="true" scrolling="auto" style="border: 0; width: 100%; height: 100%;" frameBorder="0" id="ContentBottomiframe_'+id+'" ></iframe>';
	        }
	        else if (type == "html") {
	            content = info;
	        }
	        CenterTab.addTab4IframeChild(id, title, iconCls, content,closable);
    	}
    },

    removeAllTab : function(){
    	CenterTab.removeAllTab();
    },
    
    openModalDialog : function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,ids,names){
    	Dialog.OpenDialog(dialogTitle, iframeSrc, iframeWidth, iframeHeight);
    },
    openModalDialogButton : function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,isSubmit,isClose){
    	Dialog.OpenDialogButton(dialogTitle, iframeSrc, iframeWidth, iframeHeight,isSubmit,isClose);
    },
    openModalDialogMap : function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,id){
    	Dialog.OpenDialogMap(dialogTitle, iframeSrc, iframeWidth, iframeHeight,id);
    },
    
    openModalDialogClose : function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,ids,names){
    	Dialog.OpenDialogClose(dialogTitle, iframeSrc, iframeWidth, iframeHeight);
    },

    openModalWindow : function(dialogTitle, iframeSrc, iframeWidth, iframeHeight){
    	Dialog.OpenWindow(dialogTitle, iframeSrc, iframeWidth, iframeHeight);
    },
    
    openModalDialogProject :function(dialogTitle, iframeSrc, iframeWidth, iframeHeight){
		Dialog.OpenDialogProject(dialogTitle, iframeSrc, iframeWidth, iframeHeight);
    },
    
    test2: function () {
       /* this.addTab("1", "人口管理","icon-remove", "http://www.baidu.com", "href");
        this.addTab("2", "事件管理", "icon-add", "http://www.baidu.com", "html");*/
    	this.addTab("portal123", "portal", "icon-add", "test/portal/Portal.jsp", "href");

        $.messager.alert("操作提示", "操作成功！");

//        $.messager.progress({
//            title: '提示',
//            text: '数据处理中，请稍后....'
//        });
        //$.messager.progress('close');
    }
    
    
    
    //提醒个数
    ,remindNumber:function(){
    	$.post("loginAction_findRemindNumber",function (data){
    		$("#remindnumber").html(data);
    	});    	
    }
   //提醒图标
    ,remindPicture:function(){
    	$.post("loginAction_findRemindNumber",function (data){
    		Home.changePicture(data,"remindpicture");    		
    	});    	
    }
    ,changePicture:function (val,id){
    	if(val==0){
			document.getElementById(id).src = "js/EasyUI/EasyUI1.3.6/themes/myicons/msg3.png";
		}else{
			document.getElementById(id).src = "js/EasyUI/EasyUI1.3.6/themes/myicons/msg.gif";
		}
    }
    //更新提醒数据
    ,remind : function(){
    	$.post("loginAction_addRemindData",function (data){
    		Home.changePicture(data,"remindpicture");
    	}); 
    },
    
    loginName:"",
    
    orgid:""

};


var Dialog = {
         // DOM数组
        objArray:[],
        // 涉稳人员主键数组
        newObjArray:[],
		OpenDialogWithReturn:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,backids){
			$('#jd_dialog').empty();
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
			});
			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='no' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center><input type='button' value='提交' onclick='Dialog.Ok()' />     <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			this.objArray = backids;
			//$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_backids' value='"+backids+"'  />");
			$("#jd_dialog").dialog('open');
		},
		OpenDialog:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,ids,names){
			$('#jd_dialog').empty();
			/*$("#jd_dialog").css("width",iframeWidth);
			$("#jd_dialog").css("height",iframeHeight);
			$("#jd_dialog").attr("title",dialogTitle);*/
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});
			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='no' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center><input type='button' value='确认' onclick='Dialog.Ok()' />     <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			
			$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_ids' value='"+ids+"'  />");
			$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_names' value='"+names+"' />");
			$("#jd_dialog").dialog('open');
		},
		OpenDialogMap:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,id){
			$('#jd_dialog').empty();
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});
			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='no' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center><input type='button' value='保存' onclick='Dialog.CloseDialog()' />     <input type='button' value='删除' onclick='Dialog.clearMap(\""+id+"\")' />");
			
			$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_id' value='"+id+"'  />");
			$("#jd_dialog").dialog('open');
		},
		OpenDialogShewenuser:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight){
			$('#jd_dialog').empty();
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='no' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center><input type='button' value='提交' onclick='Dialog.OkShewen()' />     <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			$("#jd_dialog").dialog('open');
		},
		OpenDialogProject:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight){
			$('#jd_dialog').empty();
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='no' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center><input type='button' value='提交' onclick='Dialog.OkProject()' />     <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			$("#jd_dialog").dialog('open');
		},
		OpenDialogButton:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,isSubmit,isClose){
			$('#jd_dialog').empty();
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});
			if(isSubmit==undefined){isSubmit=true;}if(isClose==undefined){isClose=true;} 
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='auto' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");			
			if(isSubmit&&!isClose){
				$("#jd_dialog").append("<center><input type='button' value='提交' onclick='Dialog.Ok()' />");
			}
			if(isClose&&!isSubmit){
				$("#jd_dialog").append("<center><center><input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			}
			if(isSubmit&&isClose){
				$("#jd_dialog").append("<center><input type='button' value='提交' onclick='Dialog.Ok()' />     <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			}		
			$("#jd_dialog").dialog('open');
		},
		
		OpenDialogClose:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,ids,names){
			$('#jd_dialog').empty();
			/*$("#jd_dialog").css("width",iframeWidth);
			$("#jd_dialog").css("height",iframeHeight);
			$("#jd_dialog").attr("title",dialogTitle);*/
			$('#jd_dialog').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				iconCls:'',
				modal: true
				});
			
			$("#jd_dialog").append("<iframe id='jd_iframe' src='"+iframeSrc+"' scrolling='auto' frameborder='0' width='"+(iframeWidth-20)+"' height='"+(iframeHeight-60)+"' />");
			$("#jd_dialog").append("<center> <input type='button' value='关闭' onclick='Dialog.CloseDialog()' />");
			
			$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_ids' value='"+ids+"'  />");
			$("#jd_dialog").append("<input type='hidden' id='dialog_hidden_names' value='"+names+"' />");
			$("#jd_dialog").dialog('open');
		},
		
		OpenWindow:function(dialogTitle, iframeSrc, iframeWidth, iframeHeight,ids,names){	
			$('#jd_dialog_window').empty();	
			$('#jd_dialog_window').dialog({
				title: dialogTitle,
				width: iframeWidth,
				height: iframeHeight,
				//closed: false,
				//cache: false,
				//href: iframeSrc,
				iconCls:'',
				onClose:afterCloseWindow,
				modal: true
				});
			//$("#jd_dialog_window").parent().attr("title",dialogTitle);
			//$("#jd_dialog_window").parent().css("width",iframeWidth);
			//$("#jd_dialog_window").parent().css("height",iframeHeight);
			//alert($("#jd_dialog_window").attr("title"));
			$("#jd_dialog_window").append("<iframe id='jd_iframe_window' name='jd_iframe_window' src='"+iframeSrc+"' scrolling='auto' frameborder='0' width='100%' height='100%' />");
			$("#jd_dialog_window").dialog('open');			
			
			
			
			
		},
		OkShewen : function (){
			var num =CenterTab.getSelectTabId();  
            var datagridObj = parent.document.getElementById("jd_iframe").contentWindow.selObj;            
			var linenum =window.frames["jd_iframe"].document.getElementById("linenum").value-1;
		    
		    window.frames["jd_iframe_window"].document.getElementById("username"+linenum).value = datagridObj.XINGMING== undefined?"":datagridObj.XINGMING;
		    window.frames["jd_iframe_window"].document.getElementById("usercard"+linenum).value = datagridObj.SHENFENZHENGHAO== undefined?"":datagridObj.SHENFENZHENGHAO;
		    window.frames["jd_iframe_window"].document.getElementById("usersex"+linenum).value = datagridObj.XINGBIE== undefined?"":datagridObj.XINGBIE;
		    window.frames["jd_iframe_window"].document.getElementById("userage"+linenum).value = datagridObj.NIANLING== undefined?"":datagridObj.NIANLING;
		    window.frames["jd_iframe_window"].document.getElementById("userphone"+linenum).value = datagridObj.YIDONGDIANHUA== undefined?"":datagridObj.YIDONGDIANHUA;
		    window.frames["jd_iframe_window"].document.getElementById("userremark"+linenum).value = datagridObj.BEIZHU == undefined?"":datagridObj.BEIZHU;
		    $("#jd_dialog").dialog('close');
		},	
		OkProject : function (){
			var num =CenterTab.getSelectTabId();
			if(common.checkIEVersion()){
				var id =window.frames["jd_iframe"].document.getElementById("selectid").value;
				var name =window.frames["jd_iframe"].document.getElementById("selectname").value;
				
				parent.window.frames["jd_iframe_window"].document.getElementById("projectid").value = id;
				parent.window.frames["jd_iframe_window"].document.getElementById("projectname").value = name;
			}else{
				// firefox
				var id =window.frames["jd_iframe"].contentDocument.getElementById("selectid").value;
				var name =window.frames["jd_iframe"].contentDocument.getElementById("selectname").value;
				document.getElementById("jd_iframe_window").contentDocument.getElementById("projectid").value = id;
				document.getElementById("jd_iframe_window").contentDocument.getElementById("projectname").value = name;		
			}
		    $("#jd_dialog").dialog('close');
		},	
		Ok:function(){
			var num =CenterTab.getSelectTabId();
            if(num==null) num=999999;//首页点击进来的
            var datagridObj = parent.document.getElementById("jd_iframe").contentWindow.selObj;
			if(datagridObj!=undefined && datagridObj != ''){
			    //this.newObjArray.push(datagridObj['ID']);
				$.each(this.objArray, function(k,v){
					var personName = $(v).attr('id');
					// 主键名称存在差异做转换
				try{
					if(personName.indexOf('GUID')>1){
						$(v).val(datagridObj['ID']);
					}else{
						//alert('datagridObj[personName]');
						$(v).val(datagridObj[personName]);
					}
				  }catch(exception ){};
				})
			}else{
			
				if(common.checkIEVersion()){
					// ie
					var id =window.frames["jd_iframe"].document.getElementById("selectid").value;		
					var name =window.frames["jd_iframe"].document.getElementById("selectname").value;
					var isone = window.frames["jd_iframe"].document.getElementById("isone").value; //单/多选		
					var isopen = window.frames["jd_iframe"].document.getElementById("isopen").value; //是否open打开					
					if(isone!='y'){
					id = id.substring(0,id.length-1);
					name = name.substring(0,name.length-1);
					}
					//填充目标域的名称
					var tagid = window.frames["jd_iframe"].document.getElementById("tagid").value;   
				    var tagname = window.frames["jd_iframe"].document.getElementById("tagname").value;
					//window.frames["ContentBottomiframe_"+num].document.getElementById(tagname).value = name;				    
				    if(isopen=='n'){			    	
					    window.frames["ContentBottomiframe_"+num].document.getElementById(tagid).value = id;
					    window.frames["ContentBottomiframe_"+num].document.getElementById(tagname).value = name;
				    }else{
				    	parent.window.frames["jd_iframe_window"].document.getElementById(tagid).value = id;
				    	parent.window.frames["jd_iframe_window"].document.getElementById(tagname).value = name;
				    }
				    if(tagid=='orgidsLink'){
				      window.frames["jd_iframe_window"].initDept();
				    }
				}else{
					// firefox
					var id =document.getElementById("jd_iframe").contentDocument.getElementById("selectid").value;			
					var name =document.getElementById("jd_iframe").contentDocument.getElementById("selectname").value; 
					var isone = document.getElementById("jd_iframe").contentDocument.getElementById("isone").value; //单/多选	
					var isopen = document.getElementById("jd_iframe").contentDocument.getElementById("isopen").value; 
					
					if(isone!='y'){
					id = id.substring(0,id.length-1);
					name = name.substring(0,name.length-1);
					}
					//填充目标域的名称
					var tagid =document.getElementById("jd_iframe").contentDocument.getElementById("tagid").value;   
				    var tagname = document.getElementById("jd_iframe").contentDocument.getElementById("tagname").value;
					
				    /*document.getElementById("jd_iframe_window").contentDocument.getElementById(tagid).value = id;
				    document.getElementById("jd_iframe_window").contentDocument.getElementById(tagname).value = name;*/				   
				    if(isopen=='n'){			    	
					   /* window.frames["ContentBottomiframe_"+num].document.getElementById(tagid).value = id;
					    window.frames["ContentBottomiframe_"+num].document.getElementById(tagname).value = name;*/
					    document.getElementById("ContentBottomiframe_"+num).contentDocument.getElementById(tagid).value = id;
						document.getElementById("ContentBottomiframe_"+num).contentDocument.getElementById(tagname).value = name;
				    }else{
				    	 document.getElementById("jd_iframe_window").contentDocument.getElementById(tagid).value = id;
						 document.getElementById("jd_iframe_window").contentDocument.getElementById(tagname).value = name;
				    }				    
				    if(tagid=='orgidsLink'){
				    	document.getElementById("jd_iframe_window").contentWindow.initDept();
				    }					
				}			
			}
			//alert(document.getElementById("jd_iframe").contentDocument.getElementById("selectid").value);			
			$("#jd_dialog").dialog('close');
		},
		CloseDialog: function(){
			$("#jd_dialog").dialog('close');
		},
		CloseWindow: function(){
			$("#jd_dialog_window").dialog('close');
		},
		clearMap: function(tagid){
			window.frames["jd_iframe_window"].document.getElementById(tagid).value = "";
			$("#jd_dialog").dialog('close');
		}
};

function afterCloseWindow(){
	var num =CenterTab.getSelectTabId(); 
    if(num==559){//邮件查看点击右上方关闭按钮后刷新列表页面
    	var num2 =window.parent.CenterTab.getSelectTabId();	
		window.parent.document.getElementById("ContentBottomiframe_"+num2).src='mailAction_toMailList';
    }
}