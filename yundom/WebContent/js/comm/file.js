var baidufile = {
	
	//初始化
    init: function (mode,moduleID,uploadifyID) {
        if (mode=="view") {
            $("#" + uploadifyID).hide();
            baidufile.bindDate(mode,moduleID,uploadifyID);
        } else if (mode == "viewAtt"){
        	$("#" + uploadifyID).hide();
        	baidufile.bindAttDate(mode,moduleID,uploadifyID);
        } else{
        	var editor = UE.getEditor(uploadifyID,{
		          toolbars: [
		                     ['attachment']
		                ]
		          });
        	editor.addListener("contentChange",function(){
				 baidufile.bindDate(mode,moduleID,uploadifyID);
			}); 
      		baidufile.bindDate(mode,moduleID,uploadifyID);
        }        
        
    },		
	
   //显示数据 
  bindDate:function (mode,moduleID,uploadifyID){
	var moduleType ="";	
	 $("#FileList_"+uploadifyID).html("");
 	str = "";
 	
     $.ajax({
         url: '/uploadfileAction_getFiles',
         type: 'POST',
         async: false,
         dataType : 'json',
         data: 'moduleType=' + moduleType + "&moduleID=" + moduleID,
         success: function (msg) { 
             var objs = $.parseJSON(msg);
             
             str = "";
             for (var i = 0; i < objs.length; i++) {
             	var showname = objs[i].originalName.length>6?(objs[i].originalName.substring(0,6)+'...')+objs[i].fileType:objs[i].originalName;
                 str = str + '<div style="position: relative; float: left; width:80px; height:100px; border:1px solid #E8E8E8; margin-left:30px;margin-top:0px;">' +
                 			' <div style="border-bottom:1px solid #e8e8e8; height:65px; background:url(js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j10.jpg) repeat-x; text-align:center; padding-top:5px;">' +
                             '<a href="/uploadfileAction_downLoadFile?id='+objs[i].id+'" target="_blank">' +
                             '<img style="width:60px;height:60px;border:0px;" src="' + baidufile.GetIcon(objs[i].id, objs[i].fileType, objs[i].fileUrl) + '" /></a>' +//
                             '</div>' +
                             '<div style="font-size: 10px;  text-align:center; height:20px; ">' + showname+ '</div>' +
                             '<span style="display:block; width:5px; height:5px;  position:absolute; top:0px; right:10px; text-align:center; line-height:5px; color:#fff;">';// 
                 // viewAtt 详细页过滤图片的显示
                 if (mode=="view"||mode=="viewAtt"){

                 }else {
                     str = str + '<img src="js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j11.jpg"  onclick="baidufile.DelFile(' + objs[i].id + ',\'' + mode + '\',\'' + moduleID + '\',\'' + uploadifyID + '\')"/>';
                 }
                 str = str + '</span></div>';
             }
             $("#FileList_"+uploadifyID).html(str);
             //console.log(str);
         }
     });
},


//显示数据 
bindAttDate:function (mode,moduleID,uploadifyID){
	var moduleType ="";	
	 $("#FileList_"+uploadifyID).html("");
	str = "";
  $.ajax({
      url: '/uploadfileAction_getAttFiles',
      type: 'POST',
      async: false,
      dataType : 'json',
      data: 'moduleType=' + moduleType + "&moduleID=" + moduleID,
      success: function (msg) {            	
          var objs = $.parseJSON(msg);        
          str = "";
          if(objs.length > 0){
        	  str = '<div style="background-color: #fff;margin-top:20px;height:120px;width:100%;">';
	          for (var i = 0; i < objs.length; i++) {
	          	var showname = objs[i].originalName.length>6?(objs[i].originalName.substring(0,6)+'...')+objs[i].fileType:objs[i].originalName;
	              str = str + '<div style="position: relative; float: left; width:80px; height:100px; border:1px solid #E8E8E8; margin-left:30px;margin-top:0px;">' +
	              			' <div style="border-bottom:1px solid #e8e8e8; height:65px; background:url(js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j10.jpg) repeat-x; text-align:center; padding-top:5px;">' +
	                          '<a href="/uploadfileAction_downLoadFile?id='+objs[i].id+'" target="_blank">' +
	                          '<img style="width:60px;height:60px;border:0px;" src="' + baidufile.GetIcon(objs[i].id, objs[i].fileType, objs[i].fileUrl) + '" /></a>' +//
	                          '</div>' +
	                          '<div style="font-size: 10px;  text-align:center; height:20px; ">' + showname+ '</div>' +
	                          '<span style="display:block; width:5px; height:5px;  position:absolute; top:0px; right:10px; text-align:center; line-height:5px; color:#fff;">';// 
	             
	              if (mode=="view"){//($("#"+c_IsView).val() == "true") { style="cursor:pointer;"
	
	              } 
	              if (mode=="viewAtt"){//($("#"+c_IsView).val() == "true") { style="cursor:pointer;"
	
	              }
	              else {
	                  str = str + '<img src="js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j11.jpg"  onclick="baidufile.DelFile(' + objs[i].id + ',\'' + mode + '\',\'' + moduleID + '\',\'' + uploadifyID + '\')"/>';
	              }
	              str = str + '</span></div>';
	          }
	          str +='</div>';
          }
          $("#FileList_"+uploadifyID).html(str);
          //console.log(str);
      }
  });
},

//获取图标
GetIcon : function(id,fileType,url) {
	var contextPath = "";
    var exts = ["png", "jpeg", "jpg", "gif", "bmp"];
    for (var i = 0; i < exts.length; i++) {
        if (fileType.toLowerCase() == exts[i]) return "/uploadfileAction_viewImages?id="+id;//contextPath+"/images/file/img.png"; //return url;
    }
    if (fileType == "pptx" || fileType == "ppt") return contextPath+"/images/file/PowerPoint.png";
    if (fileType == "xlsx" || fileType == "xls") return contextPath+"/images/file/Excel.png";
    if (fileType == "docx" || fileType == "doc") return contextPath+"/images/file/Word.png";
    if (fileType == "rar" || fileType == "zip") return contextPath+"/images/file/rar.png";
    if (fileType == "txt" || fileType == "txt") return contextPath+"/images/file/txt.png";
    return contextPath+"/images/file/default.png";
},

// 删除附件
DelFile : function(fileID,mode,moduleID,uploadifyID){
	if(confirm("确实要删除吗？")){
    	$.ajax({
            url: '/uploadfileAction_delFile',
            type: 'POST',
            async: false,
            dataType : 'json',
            data: 'id=' + fileID,
            success: function (msg) {
            	baidufile.bindDate(mode,moduleID,uploadifyID);
            }
        });
    }
},

getMutifiFile : function (moduleID){
	var str = '[]';
	$.ajax({
	         url: '/uploadfileAction_getFilesUrl',
	         type: 'POST',
	         async: false,
	         dataType : 'json',
	         data: "moduleID=" + moduleID,
	         success: function (msg) { 
		             str = msg;
	         }
	     });
		return str;
	}
}