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
function getId() {
    var all = $("input[name='id_CB']");
    /*存要删除的id*/
    var value_id = '';

    all.each(function () {
        //alert($(this).attr("checked"));
        if ($(this).attr("checked") == 'checked')
            value_id = value_id + $(this).val() + '€'; ;

    });
    $('#HiddenField_ids').val(value_id);
}
function editCheck() {
    getId();
    var val = $('#HiddenField_ids').val();
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

function json2str(o) {
    var arr = [];
    var fmt = function (s) {
        if (typeof s == 'object' && s != null) return json2str(s);
        return /^(string|number)$/.test(typeof s) ? "\"" + s + "\"" : s;
    }
    for (var i in o) arr.push("\"" + i + "\":" + fmt(o[i]));
    return '{' + arr.join(',') + '}';
}

$(document).ready(function () {

    $(".table tr:odd").addClass("tr_odd"); //加奇行样式 
    $(".table tr:even").addClass("tr_even");    //加偶行样式
    //为行元素加上鼠标移入和移出事件
    $(".table tr").mouseover(function () {
        $(this).addClass("tr_onmouseover");        //加上样式
    }).mouseout(function () {
        $(this).removeClass("tr_onmouseover");        //去掉样式
    });
    //行勾选事件
    $("#table tr").each(function (index) {
        if (index != "0") {
            var cb_temp = $(this).find("input[name='id_CB']");
            $(this).find("td").each(function (index2) {
                if (index2 != "0") {
                    $(this).bind("click", function () {
                        var all = $("input[name='id_CB']");
                        all.each(function () {
                            $(this).removeAttr("checked");
                        });
                        cb_temp.attr("checked", "true");
                        /**/
                    });

                }
            });

            //行单击事件,验证按钮的权限:办理、删除
            $(this).bind("click", function () {

                var hidden_json = $.parseJSON(cb_temp.next().val());
                // alert(hidden_json.IsDeal);
                if (hidden_json.IsDeal == false) {
                    $("#dealButton").attr("disabled", "disabled");

                }
                else {
                    $("#dealButton").removeAttr("disabled");
                }
                if (hidden_json.IsDel == false) {
                    $("#delButton").attr("disabled", "disabled");

                }
                else {
                    $("#delButton").removeAttr("disabled");
                }

            });

            //双击查看
            $(this).bind("dblclick", function () {
                if (editCheck()) {
                    var cb = $("input[name='id_CB']:checked");
                    var hidden_json = $.parseJSON(cb.next().val());
                    window.open('ReadDetails.aspx?DealPage=true&Pd_Id=' + hidden_json.Pd_Id + '&PI_ID=' + hidden_json.PI_ID + '&Ad_Id=' + hidden_json.Ad_Id + '&AI_ID=' + hidden_json.AI_ID + '&WI_ID=' + hidden_json.WI_ID, '_self');

                }

            });
            var mingcheng = $(this).children()[1];
            var a_obj = $("<a target='_self' href=''></a>");

            a_obj.append(mingcheng.innerHTML);
            var hidden_json_1 = $.parseJSON($(this).children().first().children()[1].value);

            a_obj.attr("href", 'ReadDetails.aspx?DealPage=true&Pd_Id=' + hidden_json_1.Pd_Id + '&PI_ID=' + hidden_json_1.PI_ID + '&Ad_Id=' + hidden_json_1.Ad_Id + '&AI_ID=' + hidden_json_1.AI_ID + '&WI_ID=' + hidden_json_1.WI_ID);
            $(mingcheng).html(a_obj);

        }
    });
    //查看
    $("#lookButton").bind("click", function () {
        if (editCheck()) {
            var cb = $("input[name='id_CB']:checked");
            var hidden_json = $.parseJSON(cb.next().val());
            // alert(cb.next().val());
            window.open('ReadDetails.aspx?DealPage=true&Pd_Id=' + hidden_json.Pd_Id + '&PI_ID=' + hidden_json.PI_ID + '&Ad_Id=' + hidden_json.Ad_Id + '&AI_ID=' + hidden_json.AI_ID + '&WI_ID=' + hidden_json.WI_ID, '_self');

        }
    });
    //登记新增
    $("#newButton").bind("click", function () {
        window.open('StartWork.aspx?DealPage=true&pd_id=' + getParam("pd_id") + '&OperatType=add', '_self');
    });

    //办理
    $("#dealButton").bind("click", function () {
        if (editCheck()) {
            //验证办理按钮的权限
            var cb = $("input[name='id_CB']:checked");
            // alert(cb.next().val());
            var hidden_json = $.parseJSON(cb.next().val());
            if (hidden_json.IsDeal == false) {
                $("#dealButton").attr("disabled", "disabled");
                return false;
            }
            else {
                $("#dealButton").removeAttr("disabled");

            }

            //办理
            window.open('DealTask.aspx?DealPage=true&Pd_Id=' + hidden_json.Pd_Id + '&PI_ID=' + hidden_json.PI_ID + '&Ad_Id=' + hidden_json.Ad_Id + '&AI_ID=' + hidden_json.AI_ID + '&WI_ID=' + hidden_json.WI_ID, '_self');

        }


    });
    //删除
    $("#delButton").bind("click", function () {


        var cfm = confirm("确认删除？");
        if (cfm) {
            if (editCheck()) {
                //验证删除按钮的权限
                var hidden_obj = $("input[name='id_CB']:checked").next();
                var hidden_json = $.parseJSON(hidden_obj.val());
                if (hidden_json.IsDel == false) {
                    $("#delButton").attr("disabled", "disabled");
                    return false;
                }
                else {
                    $("#delButton").removeAttr("disabled");

                }

                //删除操作
                $.ajax({
                    type: "post",
                    url: "../handler/NBPM_Handler.ashx/DeleteProcessInstance?pi_id=" + hidden_json.PI_ID, //取得checkbox的value值的第一个值
                    // data: $('#form1').serialize() + "&editID=" + getParam('id'), //提交form的数据
                    dataType: 'text',
                    beforeSend: function (XMLHttpRequest) {
                        $.blockUI({ message: '<table><tr><td><img src="../images/loading2.gif" /></td><td>请稍候... ...</td></tr></table>',
                            css: { top: ($(window).height() - 25) / 2 + 'px',
                                left: ($(window).width() - 165) / 2 + 'px',
                                fontSize: '12px',
                                width: '160px',
                                cursor: 'pointer'
                            },
                            //背景的属性
                            overlayCSS: {
                                opacity: 0.1,
                                // backgroundColor: '#ffffff',
                                cursor: 'pointer'

                            }
                        });
                    },
                    success: function (data, textStatus) {
                        $.unblockUI();
                        var returnJson = $.parseJSON(data);
                        if (returnJson.success == true) {

                            //hidden重新赋值
                            hidden_json.IsDeal = false;
                            hidden_json.IsDel = false;
                            hidden_obj.val(json2str(hidden_json));
                            //手动改状态
                            var status_td = hidden_obj.parent().siblings().last();
                            status_td.html("已删除");
                            hidden_obj.parent().parent().remove();

                            //删除成功！
                            //                            $.blockUI({
                            //                                message: '<table style="font-size:14px;"><tr><td><img src="../images/check.png" /></td><td style="vertical-align:top; text-align:center;">' + returnJson.info + '</td></tr></table>',
                            //                                timeout: 1000, //设置自动消失时间
                            //                                css: {
                            //                                    verticalAlign: 'middle',
                            //                                    cursor: 'pointer',
                            //                                    '-webkit-border-radius': '10px',
                            //                                    '-moz-border-radius': '10px',
                            //                                    top: ($(window).height() - 80) / 2 + 'px',
                            //                                    left: ($(window).width() - 150) / 2 + 'px',
                            //                                    width: '150px',
                            //                                    height: '60px'
                            //                                },
                            //                                onUnblock: function () {

                            //                                }
                            //                            });

                        }
                        else jAlert(returnJson.info, "错误提示", function (r) { });

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        $.unblockUI(); jAlert("错误", "错误提示", function (r) { });

                    }
                });

            }
        }

    });

});





