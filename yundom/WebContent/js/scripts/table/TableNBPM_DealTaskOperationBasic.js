//必填项*号的宽度，不同浏览器减去的宽度不一样
var importantWidth = 2;
//如果是IE
if ($.browser.msie) {
    importantWidth = 2;
}
else {
    importantWidth = 6;
}
var controlIDs_temp = new Array();


//联动控件方法
/*做保存和hidden的值存储*/
function DynamicFunction(obj) {
    $.ajax({
        type: "post",
        url: "../handler/Table_Handler.ashx/GetDataDictionaryItemData?DDI_Code=" + obj.value,
        // data: encodeURI($('#form1').serialize()),
        dataType: 'text',
        success: function (data, textStatus) {
            var returnJson = $.parseJSON(data);
            $(obj).nextAll().remove();
            if (returnJson.success == true) {
                var prevSelect = $(obj);
                var nextSelect = $('<select style="width:80px;" onchange="DynamicFunction(this)">');
                nextSelect.attr("style", prevSelect.attr("style"));
                if (prevSelect.attr("class") != "undefined") nextSelect.attr("class", prevSelect.attr("class"));
                nextSelect.attr("name", prevSelect.attr("name"));
                if (returnJson.data.length > 0) {
                    prevSelect.nextAll().remove();
                    for (var i = 0; i < returnJson.data.length; i++) {
                        if (i == 0) nextSelect.append('<option value=""></option>');
                        var tempoption = $('<option value="' + returnJson.data[i].DDI_Code + '">' + returnJson.data[i].DDI_Name + '</option>');
                        nextSelect.append(tempoption);
                    }
                    prevSelect.after(nextSelect);
                }
            }
            else {

            }


            //存hidden的值*********************************************
            var allSelect = $(obj).parent().children("select");
            var hidden = $(obj).parent().children().first();
            // alert(hidden[0].name);
            var hidden_value = "";
            //先存下拉的value值
            allSelect.each(function (index) {
                hidden_value = hidden_value + this.value;
                if (index != allSelect.length - 1) {
                    hidden_value = hidden_value + "€";

                }

            });
            //再存下拉的text值，以$符号分隔
            hidden_value = hidden_value + "$";
            allSelect.each(function (index) {
                hidden_value = hidden_value + $(this).find("option:selected").text();
                if (index != allSelect.length - 1) {
                    hidden_value = hidden_value + "€";

                }

            });




            hidden.val(hidden_value);
            // alert(hidden.val());

            // alert(obj.value);

            // alert(document.getElementsByName(obj.name).value);
            // alert($("input[name='DynamicSelect_test_view_ld']").length);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });

}

function OrgFunction(obj) {
    $.ajax({
        type: "post",
        url: "../handler/Table_Handler.ashx/getOrgsByParent?O_OrganizationParentID=" + obj.value,
        // data: encodeURI($('#form1').serialize()),
        dataType: 'text',
        success: function (data, textStatus) {
            var returnJson = $.parseJSON(data);
            $(obj).nextAll().remove();
            if (returnJson.success == true) {
                var prevSelect = $(obj);
                var nextSelect = $('<select style="width:80px;" onchange="OrgFunction(this)">');
                nextSelect.attr("style", prevSelect.attr("style"));
                if (prevSelect.attr("class") != "undefined") nextSelect.attr("class", prevSelect.attr("class"));
                nextSelect.attr("name", prevSelect.attr("name"));
                if (returnJson.data.length > 0) {
                    prevSelect.nextAll().remove();
                    for (var i = 0; i < returnJson.data.length; i++) {
                        if (i == 0) nextSelect.append('<option value=""></option>');
                        var tempoption = $('<option value="' + returnJson.data[i].O_ID + '">' + returnJson.data[i].O_Name + '</option>');
                        nextSelect.append(tempoption);
                    }
                    prevSelect.after(nextSelect);
                }
            }
            else {

            }


            //存hidden的值*********************************************
            var allSelect = $(obj).parent().children("select");
            var hidden = $(obj).parent().children().first();
            // alert(hidden[0].name);
            var hidden_value = "";
            //先存下拉的value值
            allSelect.each(function (index) {
                hidden_value = hidden_value + this.value;
                if (index != allSelect.length - 1) {
                    hidden_value = hidden_value + "€";

                }

            });
            //再存下拉的text值，以$符号分隔
            hidden_value = hidden_value + "$";
            allSelect.each(function (index) {
                hidden_value = hidden_value + $(this).find("option:selected").text();
                if (index != allSelect.length - 1) {
                    hidden_value = hidden_value + "€";

                }

            });




            hidden.val(hidden_value);
            // alert(hidden.val());

            // alert(obj.value);

            // alert(document.getElementsByName(obj.name).value);
            // alert($("input[name='DynamicSelect_test_view_ld']").length);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {

        }
    });

}


$(document).ready(function () {
    /*获取url参数开始*/
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

    // alert(1);

    //取得父页面点击button的hidden值
    // var hidden_value = window.parent.$("input[name=" + getParam("hidden_name") + "]")[getParam("index")].value;
    //取得父页面点击button的hidden对象
    var hidden_obj = $(window.parent.$("input[name=" + getParam("hidden_name") + "]")[getParam("index")]);

    //退回的默认百分比宽度
    var operationBasicBodyWidth = $(window).width();
    //  alert(operationBasicBodyWidth);

    $.ajax({
        type: "post",
        url: "../handler/NBPM_Handler.ashx/getOperationConfig?tablename=" + hidden_obj.val().split('€')[0] + "&AD_ID=" + hidden_obj.val().split('€')[5],
        //取得button对应的hidden的value值的第一个值
        // data: $('#form1').serialize() + "&editID=" + getParam('id'), //提交form的数据
        dataType: 'text',
        beforeSend: function (XMLHttpRequest) {
            $.blockUI({
                message: '<table><tr><td><img src="../images/loading2.gif" /></td><td>正在加载，请稍候...</td></tr></table>',
                css:
                {
                    top: ($(window).height() - 25) / 2 + 'px',
                    left: ($(window).width() - 145) / 2 + 'px',
                    fontSize: '12px',
                    width: '140px',
                    cursor: 'pointer'
                },
                //背景的属性
                overlayCSS:
                {
                    opacity: 0.1,
                    // backgroundColor: '#ffffff',
                    cursor: 'pointer'

                }
            });
        },
        success: function (data, textStatus) {
            $.unblockUI();

            var json_operation = $.parseJSON(data);
            if (json_operation.success == false) {
                jAlert(json_operation.info, "错误提示", function (r) { });
            }
            else {
                //所有的操作表的html控件命名前面都加"操作名"+"operation_"
                var operationINNERHTML = '<table class="TableBlock" width="100%" style="border: 0px solid #95D9F2;" ><tr><td  class="TableData" style="text-align:center;line-height: 29px; font-family: 微软雅黑;height: 29px;background-image: url(../images/title_background.jpg); background-repeat: repeat-x; font-size:14px;font-weight:bold;"  colspan="4">' + hidden_obj.val().split('€')[6] + '</td></tr>';
                var controlCount = 0;
                // controlIDs_temp = [];
                // alert(json_operation.base[0].config.length);
                for (var i = 0; i < json_operation.base[0].config.length; i++) {

                    var controlStr = "";
                    /*此处的120是要减去label的120宽度，2是每个td有个padding默认是1px;*/

                    var Controlwidth = json_operation.base[0].config[i].Important == true ? (operationBasicBodyWidth * json_operation.base[0].config[i].width - 130 - importantWidth) : (operationBasicBodyWidth * json_operation.base[0].config[i].width - 120 - 2);
                    //  alert(BodyWidth * json_operation.base[0].config[i].width - 130);
                    // alert(Controlwidth);
                    switch (json_operation.base[0].config[i].type) {
                        case "文本框":
                            controlStr = '<input type="text" ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 19 : json_operation.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" />';
                            break;
                        case "下拉框":
                            controlStr = '<select ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;"  id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '"  size="1"> '
                            var options = "";
                            var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                            for (var m = 0; m < josnLink.length; m++) {
                                options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                            }
                            controlStr += options + '</select>';
                            break;
                        case "单选按钮":
                            var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                            controlStr = '<div style="width:' + Controlwidth + 'px;">';
                            for (var m = 0; m < josnLink.length; m++) {
                                controlStr += '<div><div style="float:left;" ><input type="radio" ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required] radio" ' : '') + (m == 0 ? " checked=\"checked\"" : "") + ' name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                            }
                            controlStr += "</div>"
                            break;
                        case "复选按钮":
                            var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                            controlStr = '<div style="width:' + Controlwidth + 'px;">';
                            for (var m = 0; m < josnLink.length; m++) {
                                controlStr += '<div><div style="float:left;" ><input type="checkbox"  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[minCheckbox[1]] checkbox"' : '') + '  name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                            }
                            controlStr += "</div>"
                            break;
                        case "数字框":
                            controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '"  onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';
                            // controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';


                            break;
                        case "日期控件":
                            controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" type="text" onclick="WdatePicker();" />';
                            break;
                        case "时间控件":
                            controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true});" />';
                            break;
                        case "文本域":
                            controlStr = '<textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 : json_operation.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea>';
                            break;
                        case "上传控件":
                            controlStr = '<input type="hidden" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" /><div id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '_div"></div>';
                            controlIDs_temp.push('operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#upload#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].Important.toString());
                            break;
                        case "自定义关联控件":
                            controlStr = '<div id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '_div"></div>';
                            var josnControlInfo = $.parseJSON(json_operation.base[0].config[i].controlInfo);
                            controlIDs_temp.push('operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#control#" + json_operation.base[0].config[i].width.toString() + "#" + josnControlInfo[0].C_Name + "#" + josnControlInfo[0].C_Type + "#" + josnControlInfo[0].C_String + "#" + json_operation.base[0].config[i].Important.toString() + "#" + json_operation.base[0].config[i].name.toString());
                            break;
                        case "编辑器":
                            //编辑器有默认的65高度，因此textarea要加65的高度
                            if (json_operation.base[0].config[i].Important == true)
                                controlStr = '<table border="0" cellspacing="0" cellpadding="0"><tr><td style="border:0px;"><textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json_operation.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea></td><td style="border:0px; vertical-align:top;"><span style="color:red;">&nbsp;*</span></td></tr></table>';
                            else
                                controlStr = '<textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json_operation.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea>';

                            controlIDs_temp.push('operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#ueditor#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].height.toString() + "#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].Important);
                            break;
                        case "联动控件":
                            controlStr = '<input type="hidden" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" />';

                            controlStr += '<select ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;"   name="DynamicSelect_' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" onchange="DynamicFunction(this)"> '
                            var options = '<option value=""> </option>';
                            var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                            for (var m = 0; m < josnLink.length; m++) {
                                options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                            }
                            controlStr += options + '</select>';
                            break;
                        case "机构联动控件":
                            var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                            var values = ""; var names = "";
                            for (var m = 0; m < josnLink.length; m++) {
                                for (var n = 0; n < josnLink[m].data.length; n++) {
                                    if (josnLink[m].data[n].O_ID.toString() == josnLink[m].value) {
                                        values += josnLink[m].data[n].O_ID + "€";
                                        names += josnLink[m].data[n].O_Name + "€";
                                    }

                                }
                            }
                            var value_name = "";
                            if (values != "" && names != "") value_name = values + "$" + names;
                            controlStr = '<input type="hidden" id="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hidden_obj.val().split('€')[1] + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + value_name + '"/>';

                            for (var m = 0; m < josnLink.length; m++) {
                                controlStr += '<select ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;"   name="OrgSelect_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" onchange="OrgFunction(this)"> '
                                var options = '<option value=""> </option>';
                                for (var n = 0; n < josnLink[m].data.length; n++) {
                                    if (josnLink[m].data[n].O_ID.toString() == josnLink[m].value)
                                        options += '<option selected="selected" value="' + josnLink[m].data[n].O_ID + '">' + josnLink[m].data[n].O_Name + '</option>';
                                    else
                                        options += '<option value="' + josnLink[m].data[n].O_ID + '">' + josnLink[m].data[n].O_Name + '</option>';
                                }
                                controlStr += options + '</select>';
                            }

                            break;
                    }
                    //  alert(controlStr);

                    if (json_operation.base[0].config[i].type != "编辑器")
                        controlStr += json_operation.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';

                    if (i != 0) {
                        if (controlCount.toString().indexOf('.') != -1) {
                            if (json_operation.base[0].config[i].width == 0.5) {
                                operationINNERHTML += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                operationINNERHTML += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                                controlCount = controlCount + json_operation.base[0].config[i].width;
                            }
                            else {
                                operationINNERHTML += '<td class="TableData" colspan="2"></td></tr><tr>';
                                operationINNERHTML += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                operationINNERHTML += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                                controlCount = controlCount + json_operation.base[0].config[i].width + 0.5;
                            }
                        }
                        else {
                            if (json_operation.base[0].config[i].width == 0.5 && i == (json_operation.base[0].config.length - 1)) {
                                operationINNERHTML += '</tr>';
                                operationINNERHTML += '<tr>';
                                operationINNERHTML += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                operationINNERHTML += '<td class="TableData" colspan="2"></td></tr>';
                                controlCount = controlCount + json_operation.base[0].config[i].width;
                            }
                            else if (json_operation.base[0].config[i].width == 1 && i == (json_operation.base[0].config.length - 1)) {
                                operationINNERHTML += '</tr>';
                                operationINNERHTML += '<tr>';
                                operationINNERHTML += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                operationINNERHTML += '</tr>';
                                controlCount = controlCount + json_operation.base[0].config[i].width;
                            }
                            else {
                                operationINNERHTML += '</tr>';
                                operationINNERHTML += '<tr>';
                                operationINNERHTML += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                controlCount = controlCount + json_operation.base[0].config[i].width;
                            }
                        }
                    }
                    else {
                        operationINNERHTML += '<tr>';
                        operationINNERHTML += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json_operation.base[0].config[i].label + ':</td>';
                        operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                        controlCount = controlCount + json_operation.base[0].config[i].width;
                    }
                }

                operationINNERHTML += '<tr><td  class="TableData" style="text-align:center;" colspan="4"><input  type="button" onclick="save()" class="BigButton" value="保存" /> <input  type="button" onclick="window.parent.$.unblockUI()" class="BigButton" value="取消" /></td></tr>';
                operationINNERHTML += '</table>';
                //alert(operationINNERHTML);
                $("#operationBasic_tempDiv").append(operationINNERHTML);

                //该for循环用来创建特殊控件
                // alert(controlIDs.length);
                for (var c = 0; c < controlIDs_temp.length; c++) {
                    // alert(controlIDs[c]);
                    var type = controlIDs_temp[c].split('#');
                    if (type[1] == "upload") {
                        createUploadFile(type[0], type[2], true, operationBasicBodyWidth, type[3]);
                        // alert(1);
                    }
                    else if (type[1] == "ueditor") {
                        //编辑器默认工具栏
                        var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                        if (type[4] == '0.5')
                            toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                        //创建编辑器
                        //  alert(type[2]);
                        var editor = UE.getEditor(type[0].toString(),
                        {
                            toolbars: [toolbars],
                            initialFrameWidth: type[5].toString() == 'true' ? (operationBasicBodyWidth * type[2] - 130) : (operationBasicBodyWidth * type[2] - 120),
                            elementPathEnabled: false,
                            initialFrameHeight: type[3]
                            /*重要*/
                            ,
                            minFrameHeight: type[3]
                            /*重要*/

                            // , textarea: type[0].toString()
                        });


                    }
                    else {
                        createChoose(type[0], type[1], type[2], type[3], type[4], type[5], type[6], type[7]);
                    }
                }
                jQuery("#form1").validationEngine({ promptPosition: "bottomLeft" });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.unblockUI();
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
function save() {
    var hidden_obj = $(window.parent.$("input[name=" + getParam("hidden_name") + "]")[getParam("index")]);
    for (var c = 0; c < controlIDs_temp.length; c++) {
        var type = controlIDs_temp[c].split('#');
        //**************把编辑器中的数据同步到textarea中****************    
        if (type[1] == "ueditor") {
            var editor = UE.getEditor(type[0]);
            //同步数据到textarea
            editor.sync();
            //验证非空,把编辑器的validate[required]样式去掉
            if (type[5].toString() == 'true') {
                //取得编辑器对象的div
                var ueditor_div = $("#" + type[0]).prev();
                //如果textarea不为空
                if ($("#" + type[0]).val() != "") {
                    //移除编辑器的验证
                    $(ueditor_div).removeClass("validate[required]");
                } else {
                    $(ueditor_div).addClass("validate[required]");
                    // alert(2);
                }
            }
        }
        //上传的验证
        else if (type[1] == "upload") {
            if (type[3].toString() == 'true') {
                if ($("#" + type[0]).val() != "") {
                    var next_div = $("#" + type[0]).next();
                    var validate_div = $(next_div).children();
                    $(validate_div).removeClass("validate[required]");
                }
                else {

                    $(validate_div).addClass("validate[required]");
                }
            }
        }
    }

    if (jQuery('#form1').validationEngine('validate')) {//判断form是否验证成功
        //  // alert($('#stable_form').serialize());


        var Pd_Id = window.parent.$("#Hidden_Pd_Id").val();
        var PI_ID = window.parent.$("#Hidden_PI_ID").val();
        var Ad_Id = window.parent.$("#Hidden_Ad_Id").val();
        var AI_ID = window.parent.$("#Hidden_AI_ID").val();
        var WI_ID = window.parent.$("#Hidden_WI_ID").val();
        //  alert(hidden_obj.val());

        $.ajax({
            type: "post",
            url: "../handler/NBPM_Handler.ashx/SaveDealTaskOperationBasicData?Pd_Id=" + Pd_Id + "&PI_ID=" + PI_ID + "&Ad_Id=" + Ad_Id + "&AI_ID=" + AI_ID + "&WI_ID=" + WI_ID + "&hidden_value=" + encodeURI(hidden_obj.val()),
            data: encodeURI($('#form1').serialize()),
            dataType: 'text',
            beforeSend: function (XMLHttpRequest) {
                $.blockUI({ message: '<table><tr><td><img src="../images/loading2.gif" /></td><td>正在保存数据，请稍候... ...</td></tr></table>',
                    css: { top: ($(window).height() - 25) / 2 + 'px',
                        left: ($(window).width() - 175) / 2 + 'px',
                        fontSize: '12px',
                        width: '170px',
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
                    //保存成功！
                    $.blockUI({
                        message: '<table style="font-size:14px;"><tr><td><img src="../images/check.png" /></td><td style="vertical-align:top; text-align:center;">' + returnJson.info + '</td></tr></table>',
                        timeout: 1000, //设置自动消失时间
                        css: {
                            verticalAlign: 'middle',
                            cursor: 'pointer',
                            '-webkit-border-radius': '10px',
                            '-moz-border-radius': '10px',
                            top: ($(window).height() - 80) / 2 + 'px',
                            left: ($(window).width() - 150) / 2 + 'px',
                            width: '150px',
                            height: '60px'
                        },
                        onUnblock: function () {
                            window.parent.$.unblockUI();
                            //history.go(-1);
                            //  window.parent.window.location.href = 'MyTasks.aspx';
                            //父页面刷新反馈信息
                            window.parent.refresh_FeedBack();
                        }
                    });
                }
                else {

                    jAlert(returnJson.info, "错误提示", function (r) { });
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $.unblockUI(); jAlert("错误", "错误提示", function (r) { });

            }
        });
    }
}
