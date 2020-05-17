/**
* 上传页面构建
* 
* 作者：牛牛 
* 更新：2014-02-25
*
*/

var FileUpload = {
    Id: "aa",
    Width: "",
    Height: "",

    //初始化
    init: function (mode,moduleType,moduleID,uploadifyID,contextPath) {
        if (mode=="view") {
            $("#" + uploadifyID).hide();
        } else {
            $('#' + uploadifyID).uploadify({
                'swf': '/sdww/js/uploadify/uploadify.swf',
                'uploader': '/sdww/uploadfileAction_uploadFile',
                'method' : 'post',  
                //'queueID': 'queue',
               // 'auto': true,
                //'multi': true,
                //'folder': '/Uploaded/',
                'fileObjName': 'uploadify',
                //'fileTypeExts': '*.gif;*.jpg;*.png;*.bmp;*.jpeg;*.txt;*.doc;*.docx;*.ppt;*.pptx;*.xls;*.xlsx;*.rar;*.zip;*.pdf',
                'buttonText': '选择文件',
                //'buttonCursor': 'hand',
                //'cancelImg': '/Core/js/uploadify/uploadify-cancel.png',
                'height': 20,
                'width': 80,
                'formData': { 'moduleID': moduleID, 'moduleType': moduleType },
                'onQueueComplete': function (queueData) {
                	FileUpload.Bind(mode,moduleType,moduleID,uploadifyID,contextPath);
                }

            });
        }
        
        FileUpload.Bind(mode,moduleType,moduleID,uploadifyID,contextPath);
    },
    
    Bind : function(mode,moduleType,moduleID,uploadifyID,contextPath) {
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
                	var showname = objs[i].originalName.length>6?(objs[i].originalName.substring(0,6)+'...'):objs[i].originalName;
                    str = str + '<div style="position: relative; float: left; width:80px; height:100px; border:1px solid #E8E8E8; margin-left:30px;margin-top:0px;">' +
                    			' <div style="border-bottom:1px solid #e8e8e8; height:65px; background:url('+contextPath+'/js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j10.jpg) repeat-x; text-align:center; padding-top:5px;">' +
                                '<a href="/sdww/uploadfileAction_downLoadFile?id='+objs[i].id+'" target="_blank">' +
                                '<img style="width:60px;height:60px;border:0px;" src="' + FileUpload.GetIcon(objs[i].id, objs[i].fileType, objs[i].fileUrl,contextPath) + '" /></a>' +//
                                '</div>' +
                                '<p style="font-size: 10px;  text-align:center; height:15px; ">' + showname+ '</p>' +
                                '<span style="display:block; width:5px; height:5px;  position:absolute; top:0px; right:10px; text-align:center; line-height:5px; color:#fff;">';// 
                   
                    if (mode=="view"){//($("#"+c_IsView).val() == "true") { style="cursor:pointer;"

                    } else {
                        str = str + '<img src="'+contextPath+'/js/EasyUI/EasyUI1.3.6/themes/blue/images/hymain_j11.jpg"  onclick="FileUpload.DelFile(' + objs[i].id + ',\'' + mode + '\',\'' + moduleType + '\',\'' + moduleID + '\',\'' + uploadifyID + '\',\''+contextPath+'\')"/>';
                    }
                    str = str + '</span></div>';
                }

                $("#FileList_"+uploadifyID).html(str);
                //console.log(str);
            }
        });
    },
    
    DelFile : function(fileID,mode,moduleType,moduleID,uploadifyID,contextPath){
    	if(confirm("确实要删除吗？")){
	    	$.ajax({
	            url: '/sdww/uploadfileAction_delFile',
	            type: 'POST',
	            async: false,
	            dataType : 'json',
	            data: 'id=' + fileID,
	            success: function (msg) {
	            	//alert(msg);
	            	FileUpload.Bind(mode,moduleType,moduleID,uploadifyID,contextPath);
	            }
	        });
	    }
    },
    
    GetIcon : function(id,fileType,url,contextPath) {
    	fileType = fileType.substring(1,fileType.length);
        var exts = ["png", "jpeg", "jpg", "gif", "bmp"];
        for (var i = 0; i < exts.length; i++) {
            if (fileType.toLowerCase() == exts[i]) return "/sdww/uploadfileAction_viewImages?id="+id;//contextPath+"/images/file/img.png"; //return url;
        }
        if (fileType == "pptx" || fileType == "ppt") return contextPath+"/images/file/PowerPoint.png";
        if (fileType == "xlsx" || fileType == "xls") return contextPath+"/images/file/Excel.png";
        if (fileType == "docx" || fileType == "doc") return contextPath+"/images/file/Word.png";
        if (fileType == "rar" || fileType == "zip") return contextPath+"/images/file/rar.png";
        if (fileType == "txt" || fileType == "txt") return contextPath+"/images/file/txt.png";
        return contextPath+"/images/file/default.png";
    }
};