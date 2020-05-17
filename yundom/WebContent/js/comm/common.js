
var common ={
		/**
		 * 打开dialog  用于选择用户，部门，角色等
		 * @param title   
		 * @param url
		 * @param width
		 * @param height
		 */
		openDialog : function(title,url,width,height){
			window.parent.Home.openModalDialog(title, url, width, height);
		},
		
		openDialogProject : function(title,url,width,height){
			window.parent.Home.openModalDialogProject(title, url, width, height);
		},
		
		openDialogButton : function(title,url,width,height,isSubmit,isClose,obj){
			window.parent.Home.openModalDialogButton(title, url, width, height,isSubmit,isClose,obj);
		},
		/**
		 * 子页面弹出选择地图
		 */
		openDialogMap :function(title,url,width,height,id){
			window.parent.Home.openModalDialogMap(title, url, width, height,id);
		},		
		openDialogClose : function(title,url,width,height){
			window.parent.Home.openModalDialogClose(title, url, width, height);
		},
		// 关闭模式窗体
		closeDialog:function(){
			window.parent.Dialog.CloseDialog();
		},
		
		/**
		 * 打开window ,一般适用于弹出新增,编辑,查看页面
		 * @param title
		 * @param url
		 * @param width
		 * @param height
		 */
		openWindow : function(title,url,width,height){
			window.parent.Home.openModalWindow(title, url, width, height);
		},
		
		/**
		 * 关闭window 无须刷新父页面时传入值为null
		 * @param url
		 */
		closeWindow : function (url){
			if(url!=null){
				var num =window.parent.CenterTab.getSelectTabId();
				if(num==null)num=999999;	//首页
				window.parent.document.getElementById("ContentBottomiframe_"+num).src=url;
		    }
			window.parent.Dialog.CloseWindow();
		},
		
		closeWindowWithCallback : function(callback){
			
			if(callback!=null){
				var num =window.parent.CenterTab.getSelectTabId();	
				callback("ContentBottomiframe_"+num);
		    }
			window.parent.Dialog.CloseWindow();
		},

		msg : function (title,msg,type,url){
			if(type=='error'){
				$.messager.alert(title, msg,type);
			}
			if(type=='info'){
				$.messager.alert(title, msg,type);
			}
			if(type=='success'){
				$.messager.alert(title, msg,'info',function(){
					common.closeWindow(url);
				});
			}
			if(type=='remind'){
				$.messager.show({
					msg : msg,
					title : title
				});
			}
		},
		
		alert_error : function(msg){
			if(msg==null||msg=='') msg ='操作失败!';
			$.messager.alert('提示', msg,'error');
		},
		alert_info : function(msg){			
			$.messager.alert('提示', msg,'info');
		},
		alert_success : function(msg,url){
			if(msg==null||msg=='') msg ='保存成功!';
			$.messager.alert('提示', msg,'info',function(){
				common.closeWindow(url);
			});
		},
		alert_remind : function(msg){
			/**$.messager.show({
				msg : msg,
				title : '提示'
			});*/
			$.messager.alert('提示', msg,'info');
		},
		
		
		
		
		cuiban:function (title,orgdeptval){
			common.openWindow('催办通知单', 'mailAction_cuiban?title='+title+'&orgdeptval='+orgdeptval, 1000, 500);
		},
		checkIEVersion : function () { 
		    var ua = navigator.userAgent; 
		    var s = "MSIE"; 
		    var i = ua.indexOf(s)          
		    if (i >= 0) { 
		       //获取IE版本号 
		        var ver = parseFloat(ua.substr(i + s.length)); 
		       //alert("你的浏览器是IE"+ver);
		        return true;
		    } 
		    else {
		        //其他情况，不是IE 
		       // alert("你的浏览器不是IE");
		    	return false;
		    } 
		},
		checkChromeVersion : function () { 
		    var ua = navigator.userAgent; 
		    var s = "Chrome"; 
		    var i = ua.indexOf(s);          
		    if (i >= 0) { 
		       //获取IE版本号 
		        var ver = parseFloat(ua.substr(i + s.length)); 
		       //alert("你的浏览器是IE"+ver);
		        return true;
		    } 
		    else {
		        //其他情况，不是IE 
		       // alert("你的浏览器不是IE");
		    	return false;
		    } 
		},
		checkFFVersion : function () { 
		    var ua = navigator.userAgent; 
		    var s = "Firefox"; 
		    var i = ua.indexOf(s)          
		    if (i >= 0) { 
		       //获取ff版本号 
		        var ver = parseFloat(ua.substr(i + s.length)); 
		       //alert("你的浏览器是ff"+ver);
		        return true;
		    } 
		    else {
		        //其他情况，不是ff 
		       // alert("你的浏览器不是ff");
		    	return false;
		    } 
	    },
		buttonPurview:function (){ 
			
			$("#tool_add").css("display","none");        // 新增
			$("#tool_update").css("display","none");     // 编辑
			$("#tool_del").css("display","none");        // 删除
			$("#tool_query").css("display","none");      // 查询
			$("#tool_view").css("display","none");       // 查看
			$("#tool_clear").css("display","none");      // 清空
			$("#tool_save").css("display","none");       // 保存
			$("#tool_banli").css("display","none");
			$("#tool_shangbao").css("display","none");  //上报
			$("#tool_guanzhu").css("display","none");  //关注
			
			//右击部分
			$("#tool_adddiv").css("display","none");
			$("#tool_deldiv").css("display","none");
			$("#tool_updatediv").css("display","none");
			if(typeof window.parent.CenterTab==='undefined'){
				return;
			}
			var id =window.parent.CenterTab.getSelectTabPanel().id;
			
			//查询本人在该菜单下的按钮权限
			$.ajax({
				type:"post",
				url:"purviewAction_findButtonByMenuid?menuid="+id, 
				async : false,
				cache:false,
				success: function(data) {
					if(data.indexOf(',add,')>-1){
						$("#tool_add").css("display","");
						$("#tool_save").css("display","");
						$("#tool_adddiv").css("display","");
					}
					if(data.indexOf(',update,')>-1){
						$("#tool_update").css("display","");
						$("#tool_save").css("display","");
						$("#tool_updatediv").css("display","");
					}
					if(data.indexOf(',del,')>-1){
						$("#tool_del").css("display","");
						$("#tool_deldiv").css("display","");
					}
					if(data.indexOf(',query,')>-1){
						$("#tool_query").css("display","");
						$("#tool_clear").css("display","");
					}
					if(data.indexOf(',view,')>-1){
						$("#tool_view").css("display","");
					}
//					if(data.indexOf(',export,')>-1){
//						$("#tool_export").css("display","");
//						$("#tool_export2").css("display","");
//					}
					if(data.indexOf(',banli,')>-1){
						$("#tool_banli").css("display","");
					}
					if(data.indexOf(',shangbao,')>-1){
						$("#tool_shangbao").css("display","");
					}
					if(data.indexOf(',guanzhu,')>-1){
						$("#tool_guanzhu").css("display","");
					}
			  }
			});	
		 
		},
		changeParentinfo : function (tarid,value,type){
			var num =window.parent.CenterTab.getSelectTabId();
			if(common.checkFFVersion()){
				//ff
				if(type=='value'){
					if(parent.window.frames["ContentBottomiframe_"+num].contentDocument.getElementById(tarid)!=null){
					  parent.window.frames["ContentBottomiframe_"+num].contentDocument.getElementById(tarid).value=value;
					}
				}else if(type=='text'){
					if(parent.window.frames["ContentBottomiframe_"+num].contentDocument.getElementById(tarid)!=null){
					  parent.window.frames["ContentBottomiframe_"+num].contentDocument.getElementById(tarid).innerHTML=value;
					}
				}
			}else{
				//ie and other
				if(type=='value'){
				  if(parent.window.frames["ContentBottomiframe_"+num].document.getElementById(tarid)!=null){
					parent.window.frames["ContentBottomiframe_"+num].document.getElementById(tarid).value=value;
				  }
				}else if(type=='text'){
					if(parent.window.frames["ContentBottomiframe_"+num].document.getElementById(tarid)!=null){
					  parent.window.frames["ContentBottomiframe_"+num].document.getElementById(tarid).innerHTML=value;
				    } 
				}
			}
			
			
		},
		getIFrame : function (){
			var num =window.parent.CenterTab.getSelectTabId();
			if(common.checkIEVersion()){
				//ie
			    return parent.window.frames["ContentBottomiframe_"+num].document;
			}else{
				//ff
				return parent.window.frames["ContentBottomiframe_"+num].contentDocument;
			
			}
			
			
		}
		
		
		
};

/*var easyuiWindowOnMove = function(left, top) {  
    if (left < 0) {  
        $(this).window('move', {  
            "left" : 1  
        });  
    }  
    if (top < 0) {  
        $(this).window('move', {  
            "top" : 1  
        });  
    }  
    var width = 500;  
    var height = 400;  
    var parentWidth = 1055;  
    var parentHeight = 1000;
  
    if (left > parentWidth - width) {  
        $(this).window('move', {  
            "left" : parentWidth - width  
        });  
    }  
    if (top > parentHeight - height) {  
        $(this).window('move', {  
            "top" : parentHeight-$(this).parent().height() 
        });  
    }   
}  
$.fn.window.defaults.onMove = easyuiWindowOnMove;  
  
var easyuiDialogOnMove = function(left, top) {  
    if (left < 0) {  
        $(this).dialog('move', {  
            "left" : 1  
        });  
    }  
    if (top < 0) {  
        $(this).dialog('move', {  
            "top" : 1  
        });  
    }  
    var width = $(this).dialog('options').width;  
    var height = $(this).dialog('options').height;  
    var parentWidth = 1055;  
    var parentHeight = 1000;  
  
  
  
    if (left > parentWidth - width) {  
        $(this).dialog('move', {  
            "left" : parentWidth - width  
        });  
    }  
    if (top > parentHeight - height) {  
        $(this).dialog('move', {  
            "top" : parentHeight-$(this).parent().height()  
        });  
    }  
  
  
}  
$.fn.dialog.defaults.onMove = easyuiDialogOnMove; */ 
 