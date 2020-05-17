/// <reference path="../jquery/jquery-1.4.1-vsdoc.js" />
/*第一种形式 第二种形式 更换显示样式*/



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
    //指定流程，禁用
    var pd_id = getParam('pd_id');
    if (pd_id != '') {
        $("#DropDownList_ProcessDefinition").val(pd_id);
        //enabled
        $("#ProcessDefinition_tr").hide();
    }


    //新增数据
    $('#saveButton').bind('click', function () {

        if ($.trim($("#Name").val()) == "") {
            jAlert("请输入名称！", "错误提示");
            return false;
        }
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityDefinitionHandler.ashx/insert",
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

                    if (json.Id != null) {
                        // alert($("#Id").val());
                        // alert(json.Id);
                        $("#Id").val(json.Id);
                        //  alert($("#Id").val());
                    }
                    //                    if (getParam('id') == '') {
                    //                        document.getElementById("form1").reset();
                    //                    }
                    ////显示：参与者、操作、字段
                    $(".TableCss:hidden").each(function () {
                        $(this).show();
                    });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });
    });
    //更新
    if (getParam('id') != '') {
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityDefinitionHandler.ashx/getEditData",
            // data: $('#form1').serialize(), //提交form的数据
            data: "id=" + getParam('id'),
            dataType: 'json',
            success: function (data, textStatus) {

                if (data.success == false) {
                    jAlert(data.info, "错误提示", function (r) { });
                }
                else {
                    //显示：参与者、操作、字段
                    $(".TableCss:hidden").each(function () {
                        $(this).show();
                    });
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

    //保存参与者
    $("#ParticipantBtn").bind('click', function () {
        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityDefinitionHandler.ashx/saveParticipant",
            data: $('#form1').serialize(), //提交form的数据
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
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                jAlert("错误", "错误提示", function (r) { });

            }

        });


    });

    //    $('#AO_Btn').bind('click', function () {

    //        if ($.trim($("#AO_Name").val()) == "") {
    //            jAlert("请输入操作名称！", "错误提示");
    //            return false;
    //        }

    //        //        var AO = {
    //        //            AO_Name: $("#AO_Name").val(),
    //        //            AO_Code: $("#AO_Code").val()
    //        //        }

    //        //   var aostr = $.toJSON(AO);
    //        var addData = "AO_Name=" + encodeURIComponent($('#AO_Name').val()) + "&" + "AO_Code=" + encodeURIComponent($('#AO_Code').val()) + "&ad_id=" + $('#Id').val();
    //        //alert(addData);


    //        $.ajax({
    //            type: "post",
    //            url: "../handler/NBPM_ActivityDefinitionHandler.ashx/insertActivityOperation",
    //            data: addData, //提交form的数据
    //            dataType: 'json',
    //            success: function (data, textStatus) {
    //                var json = data;
    //                if (json.success == false) {
    //                    // jConfirm("aaaa", "bbbbb", function (r) { alert(r) });
    //                    jAlert(json.info, "错误提示", function (r) { });
    //                }
    //                else {
    //                    new $.msgbox({
    //                        autoClose: 2,
    //                        height: 100,
    //                        width: 300,
    //                        title: '提示',
    //                        content: json.info,
    //                        type: 'alert',
    //                        closeIcon: 'image:../../images/close.gif'
    //                    }).show();



    //                }
    //            },
    //            error: function (XMLHttpRequest, textStatus, errorThrown) {
    //                jAlert("错误", "错误提示", function (r) { });

    //            }

    //        });
    //    });

    //新增操作数据
    $('#Add_AO_Btn').bind('click', function () {
        /// alert(document.getElementById("Id").value);
        new $.msgbox({
            height: 300,
            width: 360,
            bgOpacity: 0.1,
            title: '提示',
            content: '<iframe  frameborder="0" scrolling="no" src="../nbpm/NBPM_ActivityOperationAddEdit.aspx?ad_id=' + document.getElementById("Id").value + '" style="width:100%;height:250px;"></iframe>',
            // type: 'text',
            closeIcon: 'image:../../images/close.gif',
            onClose: function () {

                //  window.location.href = "NBPM_ProcessDefinitionList.aspx";
                // window.location.reload();

            }

        }).show();


    });
    ///删除操作
    $('#Del_AO_Btn').bind('click', function () {

        $.ajax({
            type: "post",
            url: "../handler/NBPM_ActivityOperationHandler.ashx/delData",
            data: "ids=" + $('#HiddenField_ids').val(),
            dataType: 'json',
            success: function (data, textStatus) {

                if (data.success == false) {
                    jAlert(data.info, "错误提示", function (r) { });
                }
                else {
                    var all = $("input[name='id_CB']");
                    all.each(function () {
                        //alert($(this).attr("checked"));
                        if ($(this).attr("checked") == 'checked') {
                            $(this).parent().parent().remove();
                        }
                    });
                    new $.msgbox({
                        autoClose: 1,
                        height: 100,
                        width: 300,
                        title: '提示',
                        content: data.info,
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
    ///编辑操作
    $('#Edit_AO_Btn').bind('click', function () {


        if (editCheck()) {
            var str = $('#HiddenField_ids').val();
            var l = str.length;
            new $.msgbox({
                height: 300,
                width: 360,
                bgOpacity: 0.1,
                title: '提示',
                content: '<iframe  frameborder="0" scrolling="no" src="../nbpm/NBPM_ActivityOperationAddEdit.aspx?ao_id=' + str.substring(0, l - 1) + '" style="width:100%;height:250px;"></iframe>',
                // type: 'text',
                closeIcon: 'image:../../images/close.gif',
                onClose: function () {

                    //  window.location.href = "NBPM_ProcessDefinitionList.aspx";
                    // window.location.reload();

                }

            }).show();

        }
    });

    $('#ad_Names').bind('click', function () {
        StableDialog.chooseNBPM_ActivityDefinition('ad_ids', 'ad_Names', $("#Id").val(), getParam('pd_id'));
    });





});

function checkall(obj) {

    var all = $("input[name='id_CB']");
    if (obj.checked) {
        // 全选
        all.each(function () {
            $(this).attr("checked", "true");

        });
    }
    else {
        all.each(function () {
            $(this).removeAttr("checked");
        });

    }
    getId();
}
function getId() {
    var all = $("input[name='id_CB']");
    /*存要删除的id*/
    var value_id = '';

    all.each(function () {
        //alert($(this).attr("checked"));
        if ($(this).attr("checked") == 'checked')
            value_id = value_id + $(this).val() + '€';

    });
    $('#HiddenField_ids').val(value_id);
}
function editCheck() {
    getId();
    var val = $('#HiddenField_ids').val();
    // alert(val);
    var val_array = val.split('€');
    if (val_array.length == 2) {
        return true;
    }
    else if (val_array.length < 2) {
        jAlert('请选中一条数据！', "提示");
        return false;
    }
    else {
        jAlert('只可以选中一条数据！', "提示");
        return false;
    }
}