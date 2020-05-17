/// <reference path="../jquery/jquery-1.4.1-vsdoc.js" />

$(document).ready(function () {
    function getParam(paramName) {
        /* alert(this.location.search);*/
        var paramValue = "";
        var isFound = false;
        if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
            arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&");
            i = 0;
            while (i < arrSource.length && !isFound) {
                if (arrSource[i].indexOf("=") > 0) {
                    if (arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase()) {
                        paramValue = arrSource[i].split("=")[1];
                        isFound = true;
                    }
                }
                i++;
            }
        }
        return paramValue;
    }
    //新增、编辑、保存操作数据
    $('#Save_Btn').bind('click', function () {
        if ($.trim($("#QJ_Info").val()) == "") {
            jAlert("请输入申请原因！", "错误提示");
            return false;
        }
        $.ajax({
            type: "post",
            url: "../handler/TestHandler.ashx/insert",
            data: $('#form1').serialize() + "&pd_id=" + getParam("pd_id"), //提交form的数据
            dataType: 'json',
            success: function (data, textStatus) {
                var json = data;
                if (json.success == false) {
                    jAlert(json.info, "错误提示", function (r) { });
                }
                else {
                    new $.msgbox({
                        autoClose: 1,
                        height: 80,
                        width: 150,
                        title: '提示',
                        content: json.info,
                        type: 'alert',
                        closeIcon: 'image:../../images/close.gif'
                    }).show();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });
    });
    //判断是否有发起流程的权限
    $.ajax({
        type: "post",
        url: "../handler/TestHandler.ashx/isAdd",
        data: "pd_id=" + getParam("pd_id"),
        dataType: 'json',
        success: function (data, textStatus) {
            var json = data;
            if (json.success == false) {
                jAlert("您没有发起权限！", "提示", function (r) { });
                $("#QJ_Info").attr("readonly", "readonly");

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            jAlert("您没有发起权限！", "提示", function (r) { });
            $("#QJ_Info").attr("readonly", "readonly");

        }

    });

    

});
