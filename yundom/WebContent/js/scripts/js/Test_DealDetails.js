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
    /*加载初始数据，包括请假基本信息、 提交用户、是否隐藏审批意见*/
    $.ajax({
        type: "post",
        url: "../handler/TestHandler.ashx/getWF_QingJia_Basic",
        data: "Data_Id=" + getParam("Data_Id"), //提交form的数据
        dataType: 'json',
        success: function (data, textStatus) {
            var json = data;
            if (json.success == false) {
                jAlert(json.info, "错误提示", function (r) { });
            }
            else {
                $("#QJ_Info").html(json.QJ_Info);
                // alert(json.Class);
                if (json.Class == "normal" || json.Class == "end") {
                    $("#tr_QJA").show();
                    $("#tr_Advice").show();
                    /***************************************************************************************/
                }
                if (json.Class == "end") $("#tr_user").hide();
                else {
                    /*下拉用户*/
                    var data_user = json.select;
                    var Select_User = document.getElementById("select_user");
                    for (var i = 0; i < data_user.length; i++) {
                        var opt = document.createElement("option");
                        opt.value = data_user[i].value;
                        opt.text = data_user[i].text;
                        Select_User.options.add(opt);
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            jAlert("错误", "错误提示", function (r) { });
        }

    });




    $("#Deal_Btn").bind("click", function () {


        $.ajax({
            type: "post",
            url: "../handler/TestHandler.ashx/deal",
            data: $('#form1').serialize() + "&Data_Id=" + getParam("Data_Id"), //提交form的数据 + "&wi_id=" + getParam("wi_id")
            dataType: 'json',
            success: function (data, textStatus) {
                var json = data;
                if (json.success == false) {
                    jAlert(json.info, "错误提示", function (r) { });
                }
                else {
                    // alert("处理成功！");
                    new $.msgbox({
                        autoClose: 2,
                        height: 100,
                        width: 300,
                        title: '提示',
                        content: json.info,
                        type: 'alert',
                        closeIcon: 'image:../../images/close.gif'
                    }).show();
                    $("#Deal_Btn").unbind("click")
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });
            }

        });


    });









});