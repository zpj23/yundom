/// <reference path="../jquery/jquery-1.4.1-vsdoc.js" />
$(document).ready(function () {

    //    $('#Button1').bind('click', function () {
    //        new $.msgbox({
    //            height: 600,
    //            width: 600,
    //            title: '提示',
    //            content: '<iframe  frameborder="0" scrolling="no" src="../sys/NBPM_ProcessDefinitionAddEdit.aspx" style="width:100%;height:550px;"></iframe>',
    //            // type: 'text',
    //            closeIcon: 'image:../../images/close.gif'
    //        }).show();


    //        //   JqueryDialog.Open('新增', '/sys/NBPM_ProcessDefinitionAddEdit.aspx', 600, 400);

    //    });

    //if ($('#ddddd').val()) alert(1);

    $('#saveButton').bind('click', function () {
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ProcessDefinitionHandler.ashx/insert",
            data: $('#form1').serialize() + "&editID=" + getParam('id'), //提交form的数据
            dataType: 'json',
            success: function (data, textStatus) {
                var json = data;
                if (json.success == false) {
                    // jConfirm("aaaa", "bbbbb", function (r) { alert(r) });
                    jAlert(json.info, "错误提示", function (r) { });
                }
                else {
                    new $.msgbox({
                        autoClose: 2,
                        height: 100,
                        width: 300,
                        title: '提示',
                        content: json.info,
                        type: 'alert',
                        closeIcon: 'image:../../images/close.gif'
                    }).show();
                    if (getParam('id') == '') {
                        document.getElementById("form1").reset();
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });
    });
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
    if (getParam('id') != '') {
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ProcessDefinitionHandler.ashx/getData",
            // data: $('#form1').serialize(), //提交form的数据
            data: encodeURI("id=" + getParam('id')),
            dataType: 'json',
            success: function (data, textStatus) {

                if (data.success == false) {
                    jAlert(data.info, "错误提示", function (r) { });
                }
                else {
                    //赋值
                    for (var i = 0; i < data.data.length; i++) {
                        if ($("#" + data.data[i].ID).val() != 'undefined') {
                            $("#" + data.data[i].ID).val(data.data[i].Value.toString());
                        }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });
    }

});