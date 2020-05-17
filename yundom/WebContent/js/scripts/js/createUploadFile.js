function createUploadFile(parentID, _width, _readonly, BodyWidth, isImportant) {
    var parent = document.getElementById(parentID + "_div");
    var div = document.createElement("div");
    div.style.float = "left";
    if (isImportant == 'true')
        $(div).addClass("validate[required]");
    div.style.border = "1px solid #B5B8C8";
    div.style.height = "120px";
    // alert(document.body.clientWidth);
    div.style.width = (BodyWidth * _width - 120) + "px";
    // alert(div.style.width);
    div.style.overflowX = "auto";
    div.style.overflowY = "hidden";


    var table = document.createElement("table");
    var tr = document.createElement("tr");
    tr.id = parentID + "_tr";
    if (_readonly) {
        var td = document.createElement("td");
        td.style.border = "0";
        var divAdd = document.createElement("div");
        divAdd.style.display = "block";
        divAdd.style.float = "left";
        divAdd.style.margin = "5px 5px 5px 5px";
        divAdd.style.border = "0px solid #B5B8C8";
        divAdd.style.height = "82px";
        divAdd.style.width = "82px";
        divAdd.style.backgroundImage = "url(../images/addfile.gif)";
        divAdd.style.cursor = "pointer";
        divAdd.title = "添加文件";
        divAdd.onclick = function () {
            //            new $.msgbox({
            //                height: 300,
            //                width: 500,
            //                title: '新增文件',
            //                content: '<iframe  frameborder="0" scrolling="no" src="../../dialogs/addUploadFile.aspx?fieldName=' + (parentID) + '" style="width:100%;height:250px;"></iframe>',
            //                closeIcon: 'image:../../images/close.gif'
            //            }).show();

            $.blockUI({
                message: '<iframe  frameborder="0" scrolling="no" src="../../dialogs/addUploadFile.aspx?fieldName=' + (parentID) + '" style="width:100%;height:200px;"></iframe>',
                // onOverlayClick: $.unblockUI(), //点击遮盖层自动关闭
                css: {
                    width: '500px',
                    /*此处的top、left和iframe的width、height有关*/
                    //   top: '100px',
                    top: ($(window).height() - 300) / 2 + 'px',
                    left: ($(window).width() - 500) / 2 + 'px'
                },
                overlayCSS: {
                    // opacity: 0.1,
                    cursor: 'pointer'
                }
            });
            //  $('.blockOverlay').attr('title', '点击自动关闭').click($.unblockUI);
        };
        td.appendChild(divAdd);
        tr.appendChild(td);
    }
    table.appendChild(tr);
    div.appendChild(table);
    //alert(div.innerHTML);
    parent.appendChild(div);
}

//删除图片
function DelEventFile(_val, _type, _fieldname) {
    var btn = document.getElementById(_val);
    // alert(_val); alert(_type); alert(_fieldname);
    $.ajax({
        type: "post",
        url: "../handler/SysHandler.ashx",
        data: "optype=deletefile&UF_FileName=" + _val + _type,
        // data: "optype=deletefile&UF_FileName=" + document.getElementById(_fieldname).value,
        dataType: 'text',
        success: function (data, textStatus) {
            var json = $.parseJSON(data);
            //后台删除成功
            if (json.success == true) {

                btn.parentNode.parentNode.removeChild(btn.parentNode);
                var _fieldnameValue = document.getElementById(_fieldname).value;
                // alert(_fieldnameValue);
                var _fieldnameValue_new = "";
                for (var c = 0; c < _fieldnameValue.split(',').length; c++) {
                    if ((_val + _type) != _fieldnameValue.split(',')[c]) {
                        _fieldnameValue_new += _fieldnameValue.split(',')[c] + ",";
                        //       alert(_fieldnameValue_new);
                    }
                }
                document.getElementById(_fieldname).value = (_fieldnameValue_new == "" ? "" : _fieldnameValue_new.substring(0, _fieldnameValue_new.length - 1));
                // alert(document.getElementById(_fieldname).value);
            }
            else {
                jAlert("删除失败", "错误提示", function (r) { });
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            jAlert("错误", "错误提示", function (r) { });

        }

    });


}