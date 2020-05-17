/// <reference path="../jquery/jquery-1.4.1-vsdoc.js" />

$(document).ready(function () {
    $('#AO_Select').bind('change', function () {
        if ($('#AO_Select').val() != 'zidingyi') {


            //            var o = document.getElementById(Jump);
            //            var index = o.selectedIndex; //序号，取当前选中选项的序号
            //            var text = o.options[index].text;




            $("#AO_Name").attr("readonly", "readonly");
            $("#AO_Name").attr("style", "background-color:#eeeeee;");
            $("#AO_Name").val($('#AO_Select').find("option:selected").text());
            $("#AO_Code").attr("readonly", "readonly");
            $("#AO_Code").attr("style", "background-color:#eeeeee;");
            $("#AO_Code").val($('#AO_Select').val());

        } else {
            //自定义
            $("#AO_Name").removeAttr("readonly");
            $("#AO_Name").attr("style", "background-color:#ffffff;");
            $("#AO_Name").val("");
            $("#AO_Code").removeAttr("readonly");
            $("#AO_Code").attr("style", "background-color:#ffffff;");
            $("#AO_Code").val("");
        }
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
    //新增、编辑、保存操作数据
    $('#AO_Btn').bind('click', function () {
        if ($.trim($("#AO_Name").val()) == "") {
            jAlert("请输入操作名称！", "错误提示");
            return false;
        }
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityOperationHandler.ashx/insertActivityOperation",
            data: $('#form1').serialize() + "&ad_id=" + getParam("ad_id") + "&ao_id=" + getParam("ao_id"), //提交form的数据
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
                    if (getParam("ad_id") != '') {
                        //  alert(window.parent.document.getElementById("cz").innerHTML);
                        var str = '<tr><td align="center"><input name="id_CB" type="checkbox" value=' + json.Id + ' onclick="getId();" /></td><td align="left">&nbsp;' + $('#AO_Name').val() + '</td><td align="left">&nbsp;' + $('#AO_Code').val() + '</td></tr>';
                        // window.parent.document.getElementById("cz").innerHTML = window.parent.document.getElementById("cz").innerHTML + str;
                        $(window.parent.document.getElementById("cz")).append(str)
                    } else {
                        var tr_new = '<tr><td align="center"><input name="id_CB" type="checkbox" value=' + getParam("ao_id") + ' onclick="getId();" /></td><td align="left">&nbsp;' + $('#AO_Name').val() + '</td><td align="left">&nbsp;' + $('#AO_Code').val() + '</td></tr>';
                        var tr_old = $(window.parent.document.getElementById("cz")).find("input[name='id_CB'][value='" + getParam("ao_id") + "']").parent().parent();
                        tr_old.replaceWith(tr_new);
                        // alert(tr_obj[0].name);

                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });
    });




    //更新取数据
    if (getParam('ao_id') != '') {
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityOperationHandler.ashx/getEditData",
            // data: $('#form1').serialize(), //提交form的数据
            data: "ao_id=" + getParam('ao_id'),
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
                    $("#AO_Select").val(data.data[1].Value);

                    //如果是自定义
                    if ($("#AO_Select option[value='" + data.data[1].Value + "']").length == 0) {
                        $("#AO_Select").val("zidingyi");

                        $("#AO_Name").removeAttr("readonly");
                        $("#AO_Name").attr("style", "background-color:#ffffff;");

                        $("#AO_Code").removeAttr("readonly");
                        $("#AO_Code").attr("style", "background-color:#ffffff;");
                    }
                    else {

                        $("#AO_Name").attr("readonly", "readonly");
                        $("#AO_Name").attr("style", "background-color:#eeeeee;");

                        $("#AO_Code").attr("readonly", "readonly");
                        $("#AO_Code").attr("style", "background-color:#eeeeee;");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });
            }

        });
    }

});
