var controlIDs = []; //特殊控件存放数组
var controlIDs_FirstNum = 0; //    第一次加载完成后，特殊控件的个数
//必填项*号的宽度，不同浏览器减去的宽度不一样
var importantWidth = 2;
//如果是IE
if ($.browser.msie) {

    importantWidth = 2;
}
else { importantWidth = 6; }

var backIndex = -1;

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
    // alert(getParam("pd_id"));
    $.ajax({
        type: "get",
        url: "../handler/NBPM_Handler.ashx/FieldsPreview",
        data: "ad_id=" + $("#Hidden_ad_id").val() + "&pd_id=" + getParam("pd_id"),
        //  data: "tableid=" + getParam("pd_id"),
        beforeSend: function (XMLHttpRequest) {
            $.blockUI({ message: '<table><tr><td><img src="../images/loading2.gif" /></td><td>正在加载，请稍候... ...</td></tr></table>',
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
        success: function (ret) {
            $.unblockUI();
            var json;
            try {
                json = $.parseJSON(ret);

            } catch (ex) {

                // alert(ret);
                jAlert(ret, "错误提示", function (r) { });
            }

            //此句控制动态操作表格的宽度

            var innerhtml = "";
            var foothtml = "";
            var controlCount = 0;
            var BodyWidth = document.body.clientWidth * 0.95;
            // alert(document.body.clientWidth);
            $(".operation").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
            //此句控制main_operation的宽度
            $(".main_operation").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
            // innerhtml += '<table class="TableBlock" width="95%" >';
            //*************追加"操作"***************
            var operationHtml = '<div id="operation_div">&nbsp;&nbsp;操作：';
            for (var i = 0; i < json.operation.length; i++) {
                //checkbox中的值是NBPM_ActivityOperation表的字段AO_TableName€AO_Code€AO_IsBasic€PD_Id€AD_Id€AD_Id_Next
                operationHtml += '<input  type="hidden" value="' + json.operation[i].AO_Code + '" name="hd_ActivityOperation" /><input  type="checkbox" value="' + json.operation[i].AO_TableName + '€' + json.operation[i].AO_Code + '€' + json.operation[i].AO_IsBasic + '€' + json.operation[i].PD_Id + '€' + json.operation[i].AD_Id + '€' + json.operation[i].AD_Id_Next + '€' + json.operation[i].AO_Name + '€' + json.operation[i].T_Id + '€' + json.operation[i].AO_AnotherName + '€' + json.operation[i].AO_ID + '" name="CB_ActivityOperation"  />';
                if (json.operation[i].AO_AnotherName != "" && json.operation[i].AO_AnotherName != null)
                    operationHtml += "<span>&nbsp;" + json.operation[i].AO_AnotherName + "</span>" + "&nbsp;&nbsp;";
                else operationHtml += "<span>&nbsp;" + json.operation[i].AO_Name + "</span>" + "&nbsp;&nbsp;";


            }
            //  operationHtml += "<span class=\"requireTime\">办结时间：<input id=\"UB_Birthday\" type=\"text\" name=\"UB_Birthday\" class=\"Wdate\"  onFocus=\"WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/></span>";

            operationHtml += "</div>";
            /////////////操作下的用户
            operationHtml += "<div id='operation_user_total' class='operation_user_total'></div>";




            var requireTime = "<div class=\"requireTime\">&nbsp;&nbsp;办结时间：<input id=\"WI_RequireEndTime\" type=\"text\" name=\"WI_RequireEndTime\" class=\"Wdate\"  onFocus=\"WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/></div>";

            //写死的重点项目
            if (getParam("pd_id") == "4ba5d989-6d7c-476e-8806-5f4618d70ce6") {
                requireTime = "<div class=\"requireTime\" style=\"display:none;\">&nbsp;&nbsp;办结时间：<input id=\"WI_RequireEndTime\" type=\"text\" name=\"WI_RequireEndTime\" class=\"Wdate\"  onFocus=\"WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/></div>";

            }

            innerhtml += '<div class="nbpm_title"><span class="span1">办理表单</span></div><div class="contentBorderNoTop">' + operationHtml + requireTime + '<table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:5px;" >';

            for (var i = 0; i < json.base[0].config.length; i++) {
                var controlStr = "";
                /*此处的120是要减去label的120宽度，2是每个td有个padding默认是1px;*/
                var Controlwidth = json.base[0].config[i].Important == true ? (BodyWidth * json.base[0].config[i].width - 130 - importantWidth) : (BodyWidth * json.base[0].config[i].width - 120 - 2);
                // alert(Controlwidth);
                //  alert(BodyWidth * json.base[0].config[i].width - 120);
                switch (json.base[0].config[i].type) {
                    case "文本框":
                        controlStr = '<input type="text" ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json.base[0].config[i].height == 0 ? 19 : json.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" />';
                        break;
                    case "下拉框":
                        controlStr = '<select ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;"  id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '"  size="1"> '
                        var options = "";
                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                        for (var m = 0; m < josnLink.length; m++) {
                            options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                        }
                        controlStr += options + '</select>';
                        break;
                    case "单选按钮":
                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                        controlStr = '<div style="width:' + Controlwidth + 'px;">';
                        for (var m = 0; m < josnLink.length; m++) {
                            controlStr += '<div><div style="float:left;" ><input type="radio" ' + (json.base[0].config[i].Important == true ? 'class="validate[required] radio" ' : '') + (m == 0 ? " checked=\"checked\"" : "") + ' name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                        }
                        controlStr += "</div>";
                        break;
                    case "复选按钮":
                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                        controlStr = '<div style="width:' + Controlwidth + 'px;">';
                        for (var m = 0; m < josnLink.length; m++) {
                            controlStr += '<div><div style="float:left;" ><input type="checkbox"  ' + (json.base[0].config[i].Important == true ? 'class="validate[minCheckbox[1]] checkbox"' : '') + '  name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                        }
                        controlStr += "</div>";
                        break;
                    case "数字框":
                        controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '"  onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';
                        // controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';

                        break;
                    case "日期控件":
                        controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" type="text" onclick="WdatePicker();" />';
                        break;
                    case "时间控件":
                        controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true});" />';
                        break;
                    case "文本域":
                        controlStr = '<textarea  ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json.base[0].config[i].height == 0 ? 60 : json.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" ></textarea>';
                        break;
                    case "上传控件":
                        controlStr = '<input type="hidden" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" /><div id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '_div"></div>';
                        controlIDs.push(json.base[0].tablename + '_' + json.base[0].config[i].name.toString() + "#upload#" + json.base[0].config[i].width.toString() + "#" + json.base[0].config[i].Important.toString());
                        break;
                    case "自定义关联控件":
                        controlStr = '<div id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '_div"></div>';
                        var josnControlInfo = $.parseJSON(json.base[0].config[i].controlInfo);
                        controlIDs.push(json.base[0].tablename + '_' + json.base[0].config[i].name.toString() + "#control#" + json.base[0].config[i].width.toString() + "#" + josnControlInfo[0].C_Name + "#" + josnControlInfo[0].C_Type + "#" + josnControlInfo[0].C_String + "#" + json.base[0].config[i].Important.toString() + "#" + json.base[0].config[i].name.toString());
                        break;
                    case "编辑器":
                        //编辑器有默认的65高度，因此textarea要加65的高度
                        if (json.base[0].config[i].Important == true)
                            controlStr = '<table border="0" cellspacing="0" cellpadding="0"><tr><td style="border:0px;"><textarea  ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" ></textarea></td><td style="border:0px; vertical-align:top;"><span style="color:red;">&nbsp;*</span></td></tr></table>';
                        else
                            controlStr = '<textarea  ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" ></textarea>';

                        controlIDs.push(json.base[0].tablename + '_' + json.base[0].config[i].name.toString() + "#ueditor#" + json.base[0].config[i].width.toString() + "#" + json.base[0].config[i].height.toString() + "#" + json.base[0].config[i].width.toString() + "#" + json.base[0].config[i].Important);
                        break;
                    case "联动控件":
                        controlStr = '<input type="hidden" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" />';

                        controlStr += '<select ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;"   name="DynamicSelect_' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" onchange="DynamicFunction(this)"> '
                        var options = '<option value=""> </option>';
                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                        for (var m = 0; m < josnLink.length; m++) {
                            options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                        }
                        controlStr += options + '</select>';
                        break;
                    case "机构联动控件":
                        var josnLink = $.parseJSON(json.base[0].config[i].link);
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
                        controlStr = '<input type="hidden" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" value="' + value_name + '"/>';

                        for (var m = 0; m < josnLink.length; m++) {
                            controlStr += '<select ' + (json.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;"   name="OrgSelect_' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" onchange="OrgFunction(this)"> '
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
                //alert(controlStr);

                if (json.base[0].config[i].type != "编辑器")
                    controlStr += json.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';

                if (i != 0) {
                    if (controlCount.toString().indexOf('.') != -1) {
                        if (json.base[0].config[i].width == 0.5) {
                            innerhtml += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json.base[0].config[i].label + ':</td>';
                            innerhtml += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                            controlCount = controlCount + json.base[0].config[i].width;
                        } else {
                            innerhtml += '<td class="TableData" colspan="2"></td></tr><tr>';
                            innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.base[0].config[i].label + ':</td>';
                            innerhtml += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                            controlCount = controlCount + json.base[0].config[i].width + 0.5;
                        }
                    } else {
                        if (json.base[0].config[i].width == 0.5 && i == (json.base[0].config.length - 1)) {
                            innerhtml += '</tr>';
                            innerhtml += '<tr>';
                            innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.base[0].config[i].label + ':</td>';
                            innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                            innerhtml += '<td class="TableData" colspan="2"></td></tr>';
                            controlCount = controlCount + json.base[0].config[i].width;
                        }
                        else if (json.base[0].config[i].width == 1 && i == (json.base[0].config.length - 1)) {
                            innerhtml += '</tr>';
                            innerhtml += '<tr>';
                            innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.base[0].config[i].label + ':</td>';
                            innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                            innerhtml += '</tr>';
                            controlCount = controlCount + json.base[0].config[i].width;
                        } else {
                            innerhtml += '</tr>';
                            innerhtml += '<tr>';
                            innerhtml += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json.base[0].config[i].label + ':</td>';
                            innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                            controlCount = controlCount + json.base[0].config[i].width;
                        }
                    }
                } else {
                    innerhtml += '<tr>';
                    innerhtml += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json.base[0].config[i].label + ':</td>';
                    innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                    controlCount = controlCount + json.base[0].config[i].width;
                }
            }

            //            innerhtml += '<tr align="center"><td class="TableData" colspan="4">';

            //            innerhtml += '<div style="margin-left:' + (BodyWidth / 2 - 120) + 'px;">';
            //            if ($("#OperatType").val() == "add" || $("#OperatType").val() == "update") {
            //                innerhtml += '<input style="float:left;"  type="button" onclick="save()" class="BigButton" value="保存" />';
            //            }
            //            innerhtml += '<input style="float:left;" type="button" onclick="window.location.href=\'StartList.aspx\'" class="BigButton" value="返回" /></div></td></tr>';

            innerhtml += '</table></div>';



            foothtml += '<div style="margin-left:' + (BodyWidth / 2 - 120) + 'px;margin-top:5px;">';
            if ($("#OperatType").val() == "add" || $("#OperatType").val() == "update") {
                foothtml += '<input style="float:left;"  type="button" onclick="save()" class="BigButton" value="保存" />';
            }
            //  foothtml += '<input style="float:left;" type="button" onclick="window.location.href=\'StartList.aspx\'" class="BigButton" value="返回" /></div><br /><br />';
            foothtml += '<input style="float:left;" type="button" onclick="history.go(backIndex);" class="BigButton" value="返回" /></div><br /><br />';
            $('#main').append(innerhtml);




            // $("#operation_div").html(operationHtml);





            var CB_ActivityOperation = $("input[name='CB_ActivityOperation']");
            //单击勾选事件
            CB_ActivityOperation.each(function (index) {
                //新增操作选项卡和空的操作表单div
                var ul_0 = $("#tab_div").children()[0];
                var lis = $(ul_0).children();
                $(ul_0).append('<li class="li0">' + $(this).next().html() + '</li>');
                $("#item_all").append('<div class="item_div0"></div>');
                //新增空的用户div
                var operation_user_total = $("#operation_user_total");
                var operation_user_child = "<div class='operation_user_child'><input  type='hidden' name='Hidden_User_" + $(this).prev().val() + "' />&nbsp;" + $(this).next().html() + "用户：</div>";



                operation_user_total.append(operation_user_child);

                $(this).on("click", function () {
                    //增加选项
                    //重新加载li列表
                    var li_all = $($("#tab_div").children()[0]).children();
                    if (this.checked) {


                        var hd_value = $(this).prev().val();
                        // alert(hd_value);
                        document.getElementById("tab_div").style.display = "block";
                        document.getElementById("item_all").style.display = "block";

                        li_all.each(function (index2) {
                            //$(this).attr("class", "li");
                            if ($(this).hasClass("li2")) {
                                $(this).attr("class", "li1");
                                // alert(1);
                            }
                        });

                        //默认将所有的item_div全部隐藏
                        var item_all = $("#item_all").children();
                        item_all.each(function (index4) {
                            $(this).attr("class", "item_div0");

                        });

                        //li显示出来并注册li事件
                        $(li_all[index]).attr("class", "li2");
                        //点击li显示item_div
                        $(li_all[index]).bind("click", function () {
                            var li1_li2_all = $("#tab_div .li1,#tab_div .li2");
                            li1_li2_all.each(function (index3) {
                                if ($(this).hasClass("li2")) {
                                    $(this).attr("class", "li1");
                                }
                            });
                            $(this).attr("class", "li2");


                            var item_all2 = $("#item_all").children();
                            item_all2.each(function (index5) {
                                $(this).attr("class", "item_div0");

                            });
                            $(item_all2[index]).attr("class", "item_div1");
                            /*锚点定位到底部*/
                            //  window.location.href = "#bottom_a_maodian";

                        });
                        //div显示出来
                        $(item_all[index]).attr("class", "item_div1");


                        //显示用户
                        var operation_user_childs = operation_user_total.children();


                        //  $(operation_user_childs[index]).show();

                        //ajax可以在这里结束
                        //判空，只加载一次
                        if ($(item_all[index]).html() == "") {
                            $.ajax({
                                type: "post",
                                url: "../handler/NBPM_Handler.ashx/getOperationConfig?tablename=" + $(this).val().split('€')[0] + "&AD_ID=" + $(this).val().split('€')[5], //取得checkbox的value值的第一个值
                                // data: $('#form1').serialize() + "&editID=" + getParam('id'), //提交form的数据
                                dataType: 'text',
                                beforeSend: function (XMLHttpRequest) {
                                    $.blockUI(
                                    { message: '<table><tr><td><img src="../images/loading2.gif" /></td><td>正在加载，请稍候... ...</td></tr></table>',
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
                                    var json_operation = $.parseJSON(data);
                                    if (json_operation.success == false) {

                                        if (json_operation.info != "该操作没有配置表单，您可以在节点配置中配置完整！")
                                            jAlert(json_operation.info, "错误提示", function (r) { });
                                    }
                                    else {
                                        //所有的操作表的html控件命名前面都加"操作名"+"operation_"
                                        var operationINNERHTML = '<table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:5px;" >';
                                        controlCount = 0;
                                        for (var i = 0; i < json_operation.base[0].config.length; i++) {
                                            var controlStr = "";
                                            /*此处的120是要减去label的120宽度，2是每个td有个padding默认是1px;*/
                                            var Controlwidth = json_operation.base[0].config[i].Important == true ? (BodyWidth * json_operation.base[0].config[i].width - 130 - importantWidth) : (BodyWidth * json_operation.base[0].config[i].width - 120 - 2);
                                            // alert(BodyWidth * json_operation.base[0].config[i].width);
                                            switch (json_operation.base[0].config[i].type) {
                                                case "文本框":
                                                    controlStr = '<input type="text" ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 19 : json_operation.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" />';
                                                    break;
                                                case "下拉框":
                                                    controlStr = '<select ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;"  id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '"  size="1"> '
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
                                                        controlStr += '<div><div style="float:left;" ><input type="radio" ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required] radio" ' : '') + (m == 0 ? " checked=\"checked\"" : "") + ' name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                                    }
                                                    controlStr += "</div>"
                                                    break;
                                                case "复选按钮":
                                                    var josnLink = $.parseJSON(json_operation.base[0].config[i].link);
                                                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                                                    for (var m = 0; m < josnLink.length; m++) {
                                                        controlStr += '<div><div style="float:left;" ><input type="checkbox"  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[minCheckbox[1]] checkbox"' : '') + '  name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + josnLink[m].DDI_Code + '"></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                                    }
                                                    controlStr += "</div>"
                                                    break;
                                                case "数字框":
                                                    controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '"  onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';
                                                    // controlStr = '<input ' + (json.base[0].config[i].Important == true ? 'class="validate[custom[number]]"' : '') + '  style="width:' + Controlwidth + 'px;"  type="text" id="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" name="' + json.base[0].tablename + '_' + json.base[0].config[i].name + '" onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')" />';

                                                    break;
                                                case "日期控件":
                                                    controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" type="text" onclick="WdatePicker();" />';
                                                    break;
                                                case "时间控件":
                                                    controlStr = '<input ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:' + Controlwidth + 'px;border:#999 1px solid;height:20px;background:#fff url(../scripts/My97DatePicker/skin/datePicker.gif) no-repeat right;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true});" />';
                                                    break;
                                                case "文本域":
                                                    controlStr = '<textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 : json_operation.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea>';
                                                    break;
                                                case "上传控件":
                                                    controlStr = '<input type="hidden" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" /><div id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '_div"></div>';
                                                    controlIDs.push('operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#upload#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].Important.toString());
                                                    break;
                                                case "自定义关联控件":
                                                    controlStr = '<div id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '_div"></div>';
                                                    var josnControlInfo = $.parseJSON(json_operation.base[0].config[i].controlInfo);
                                                    controlIDs.push('operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#control#" + json_operation.base[0].config[i].width.toString() + "#" + josnControlInfo[0].C_Name + "#" + josnControlInfo[0].C_Type + "#" + josnControlInfo[0].C_String + "#" + json_operation.base[0].config[i].Important.toString() + "#" + json_operation.base[0].config[i].name.toString());
                                                    break;
                                                case "编辑器":
                                                    //编辑器有默认的65高度，因此textarea要加65的高度
                                                    if (json_operation.base[0].config[i].Important == true)
                                                        controlStr = '<table border="0" cellspacing="0" cellpadding="0"><tr><td style="border:0px;"><textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json_operation.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea></td><td style="border:0px; vertical-align:top;"><span style="color:red;">&nbsp;*</span></td></tr></table>';
                                                    else
                                                        controlStr = '<textarea  ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + ' style="height:' + (json_operation.base[0].config[i].height == 0 ? 60 + 35 : parseFloat(json_operation.base[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" ></textarea>';

                                                    controlIDs.push('operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name.toString() + "#ueditor#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].height.toString() + "#" + json_operation.base[0].config[i].width.toString() + "#" + json_operation.base[0].config[i].Important);
                                                    break;

                                                case "联动控件":
                                                    controlStr = '<input type="hidden" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" />';

                                                    controlStr += '<select ' + (json_operation.base[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;"   name="DynamicSelect_' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" onchange="DynamicFunction(this)"> '
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
                                                    controlStr = '<input type="hidden" id="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" name="' + 'operation_' + hd_value + '_' + json_operation.base[0].tablename + '_' + json_operation.base[0].config[i].name + '" value="' + value_name + '"/>';

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
                                            //alert(controlStr);

                                            if (json_operation.base[0].config[i].type != "编辑器")
                                                controlStr += json_operation.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';

                                            if (i != 0) {
                                                if (controlCount.toString().indexOf('.') != -1) {
                                                    if (json_operation.base[0].config[i].width == 0.5) {
                                                        operationINNERHTML += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                                        operationINNERHTML += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                                                        controlCount = controlCount + json_operation.base[0].config[i].width;
                                                    } else {
                                                        operationINNERHTML += '<td class="TableData" colspan="2"></td></tr><tr>';
                                                        operationINNERHTML += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                                        operationINNERHTML += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                                                        controlCount = controlCount + json_operation.base[0].config[i].width + 0.5;
                                                    }
                                                } else {
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
                                                    } else {
                                                        operationINNERHTML += '</tr>';
                                                        operationINNERHTML += '<tr>';
                                                        operationINNERHTML += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json_operation.base[0].config[i].label + ':</td>';
                                                        operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                                        controlCount = controlCount + json_operation.base[0].config[i].width;
                                                    }
                                                }
                                            } else {
                                                operationINNERHTML += '<tr>';
                                                operationINNERHTML += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json_operation.base[0].config[i].label + ':</td>';
                                                operationINNERHTML += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json_operation.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                                controlCount = controlCount + json_operation.base[0].config[i].width;
                                            }
                                        }

                                        operationINNERHTML += '</table>';
                                        $(item_all[index]).append(operationINNERHTML);

                                        //该for循环用来创建特殊控件
                                        // alert(controlIDs.length);
                                        for (var c = controlIDs_FirstNum; c < controlIDs.length; c++) {
                                            // alert(controlIDs[c]);
                                            var type = controlIDs[c].split('#');
                                            if (type[1] == "upload") {
                                                createUploadFile(type[0], type[2], true, BodyWidth, type[3]);
                                            }
                                            else if (type[1] == "ueditor") {
                                                //编辑器默认工具栏
                                                var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                                                if (type[4] == '0.5')
                                                    toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                                                //创建编辑器
                                                //  alert(type[2]);
                                                var editor = UE.getEditor(type[0].toString(), {
                                                    toolbars: [toolbars]
                                                    , initialFrameWidth: type[5].toString() == 'true' ? (BodyWidth * type[2] - 130) : (BodyWidth * type[2] - 120)
                                                    , elementPathEnabled: false
                                                    , initialFrameHeight: type[3]/*重要*/
                                                    , minFrameHeight: type[3]/*重要*/
                                                    // , textarea: type[0].toString()
                                                });
                                                //                    var ueditor_div = $("#" + type[0]).prev();
                                                //                    var ueditor_td = $("#" + type[0]).parent();
                                                //                    alert($(ueditor_td).height()); alert($(ueditor_div).height());
                                                //                    $(ueditor_td).height($(ueditor_div).height());


                                            } else {
                                                createChoose(type[0], type[1], type[2], type[3], type[4], type[5], type[6],type[7]);
                                            }
                                        }
                                        /*特殊控件再次确认个数*/
                                        controlIDs_FirstNum = controlIDs.length;
                                        /*锚点定位到底部*/
                                        //  window.location.href = "#bottom_a_maodian";
                                        /*定位了锚点，返回就要多返回一次*/
                                        backIndex = backIndex - 1;
                                        // alert(backIndex);

                                    }

                                    // $(operation_user_childs[index])
                                    if ($(operation_user_childs[index]).find("input").length > 1) $(operation_user_childs[index]).show();
                                    if ($(operation_user_childs[index]).find("input").length == 1) {
                                        //Hidden_User_
                                        if (json_operation.users.toString() == "false") {
                                            //表示下一个节点是结束节点
                                            $(operation_user_childs[index]).find(":hidden").val(json_operation.users);
                                        }
                                        else {
                                            $(operation_user_childs[index]).show();
                                            for (var i = 0; i < json_operation.users.length; i++) {

                                                //                                        alert(json_operation.users[i].UI_Name);
                                                //                                        alert(hd_value);
                                                var tempCB = ' <input  type="checkbox" name="CB_User_' + hd_value + '" value="' + json_operation.users[i].UI_ID + '" checked="checked" />' + json_operation.users[i].UI_Name;
                                                $(operation_user_childs[index]).append(tempCB);

                                            }
                                        }
                                    }

                                },
                                error: function (XMLHttpRequest, textStatus, errorThrown) {
                                    $.unblockUI(); jAlert("错误", "错误提示", function (r) { });

                                }

                            });

                        } else {

                            if ($(operation_user_childs[index]).find("input").length > 1) $(operation_user_childs[index]).show();
                            /*锚点定位到底部*/
                            //  window.location.href = "#bottom_a_maodian";
                        }

                    }
                    //删除选项
                    else {
                        $(li_all[index]).attr("class", "li0");
                        var item_all3 = $("#item_all").children();
                        $(item_all3[index]).attr("class", "item_div0");


                        var li1_li2_all = $("#tab_div .li1,#tab_div .li2");
                        var li2_all = $("#tab_div .li2");
                        var li1_all = $("#tab_div .li1");
                        if (li1_li2_all.length == 0) {

                            document.getElementById("tab_div").style.display = "none";
                            document.getElementById("item_all").style.display = "none";
                        }
                        else if (li2_all.length == 0 && li1_all.length > 0) {
                            $(li1_all[li1_all.length - 1]).attr("class", "li2");
                            //获取当前显示的li在li队列中是第几个
                            var num = $(li1_all[li1_all.length - 1]).prevAll().length;
                            $(item_all3[num]).attr("class", "item_div1");
                        }

                        //隐藏用户
                        var operation_user_childs = operation_user_total.children();
                        $(operation_user_childs[index]).hide();


                        /*锚点定位到底部*/
                        //  window.location.href = "#bottom_a_maodian";
                    }
                });
            });




            $('#foot_div').append(foothtml);



            for (var c = 0; c < controlIDs.length; c++) {
                // alert(controlIDs[c]);
                var type = controlIDs[c].split('#');
                if (type[1] == "upload") {
                    createUploadFile(type[0], type[2], true, BodyWidth, type[3]);
                }
                else if (type[1] == "ueditor") {
                    //编辑器默认工具栏
                    var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                    if (type[4] == '0.5')
                        toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                    //创建编辑器
                    //  alert(type[2]);
                    var editor = UE.getEditor(type[0].toString(), {
                        toolbars: [toolbars]
                        , initialFrameWidth: type[5].toString() == 'true' ? (BodyWidth * type[2] - 130) : (BodyWidth * type[2] - 120)
                        , elementPathEnabled: false/*关闭元素路径*/
                        , wordCount: false/*关闭字数统计*/
                        , initialFrameHeight: type[3]/*重要*/
                        , minFrameHeight: type[3]/*重要*/
                        // , textarea: type[0].toString()
                    });
                    //                    var ueditor_div = $("#" + type[0]).prev();
                    //                    var ueditor_td = $("#" + type[0]).parent();
                    //                    alert($(ueditor_td).height()); alert($(ueditor_div).height());
                    //                    $(ueditor_td).height($(ueditor_div).height());


                } else {
                    createChoose(type[0], type[1], type[2], type[3], type[4], type[5], type[6], type[7]);
                }
            }
            if ($("#updateid").val() != "") {
                $.ajax({
                    type: "post",
                    url: "../handler/SysHandler.ashx",
                    data: encodeURI("optype=TableListConfig&tableid=" + $("#DF_TableID").val() + "&id=" + $("#updateid").val()),
                    success: function (retdata) {
                        jsondata = $.parseJSON(retdata);

                        for (var i = 0; i < json.base[0].config.length; i++) {
                            switch (json.base[0].config[i].type) {
                                case "文本框":
                                case "下拉框":
                                case "数字框":
                                    $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                    break;
                                case "文本域":
                                    var regS = new RegExp("\\$", "g");
                                    $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].replace(regS, "\n"));
                                    break;
                                case "日期控件":
                                case "时间控件":
                                    $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].replace(" 0:00:00", "").replace("/", "-").replace("/", "-"));
                                    break;
                                case "单选按钮":
                                    for (var d = 0; d < $("[name='" + json.base[0].config[i].name + "']").length; d++) {
                                        if (jsondata.data[0][json.base[0].config[i].name] == $("[name='" + json.base[0].config[i].name + "']")[d].value) {
                                            $("[name='" + json.base[0].config[i].name + "']")[d].checked = true;
                                            break;
                                        } else {
                                            $("[name='" + json.base[0].config[i].name + "']")[d].checked = false;
                                        }
                                    }
                                    break;
                                case "复选按钮":
                                    for (var d = 0; d < $("[name='" + json.base[0].config[i].name + "']").length; d++) {
                                        var isChecked = false;
                                        for (var f = 0; f < jsondata.data[0][json.base[0].config[i].name].split(',').length; f++) {
                                            if ($("[name='" + json.base[0].config[i].name + "']")[d].value == jsondata.data[0][json.base[0].config[i].name].split(',')[f]) {
                                                isChecked = true;
                                            }
                                        }
                                        $("[name='" + json.base[0].config[i].name + "']")[d].checked = isChecked;
                                    }
                                    break;
                                case "自定义关联控件":
                                    var josnControlInfo_new = $.parseJSON(json.base[0].config[i].controlInfo);
                                    if (josnControlInfo_new[0].C_Type.toString() == "url") {
                                        if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                            if (jsondata.data[0][json.base[0].config[i].name].indexOf('€') != -1) {
                                                $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                                $("#" + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                            } else {
                                                $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].split('|')[0]);
                                                $("#" + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('|')[1]);
                                            }
                                        }
                                    } else if (josnControlInfo_new[0].C_Type.toString() == "sql") {
                                        if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                            $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                            $("#" + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                        }
                                    }
                                    break;
                                case "上传控件":
                                    $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].split('|')[0]);
                                    if (jsondata.data[0][json.base[0].config[i].name].split('|')[0] != "") {
                                        var fileStr = jsondata.data[0][json.base[0].config[i].name].split('|')[1];
                                        for (var m = 0; m < fileStr.split('^').length; m++) {
                                            str = "<div id='" + fileStr.split('^')[m].split('$')[3].toString().substring(0, fileStr.split('^')[m].split('$')[3].indexOf(".")) + "' class='td_div_top_img'><a href='" + fileStr.split('^')[m].split('$')[1] + "' target='_blank'><img style='float:left;' src='" + fileStr.split('^')[m].split('$')[1] + "' width='96px' title='" + fileStr.split('^')[m].split('$')[0] + "' height='70px'/><div style='overflow:hidden; width:96px;margin-top:72px;height:17px;'>" + (fileStr.split('^')[m].split('$')[0].toString().length <= 7 ? fileStr.split('^')[m].split('$')[0] : (fileStr.split('^')[m].split('$')[0].toString().substring(0, 7) + "...")) + "</div></a><div style='display:block;cursor:pointer;position:absolute;top:-10px;right:-6px;;width:22px;height:22px;background:url(../images/del.png) 22px 0;' onmouseout='this.style.backgroundPosition=\"22px 0px\";' onmouseover='this.style.backgroundPosition=\"0px 0px\";' onclick='DelEventFile(\"" + (fileStr.split('^')[m].split('$')[3].toString().substring(0, fileStr.split('^')[m].split('$')[3].indexOf("."))) + "\",\"" + fileStr.split('^')[m].split('$')[2] + "\",\"" + json.base[0].config[i].name + "\")' /><div></div>";
                                            var td = document.createElement("td");
                                            td.style.border = "0";
                                            td.innerHTML = str;
                                            document.getElementById(json.base[0].config[i].name + "_tr").appendChild(td);
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                });
            }
            jQuery("#stable_form").validationEngine({ promptPosition: "bottomLeft" });
            //    第一次加载完成后，特殊控件的个数
            controlIDs_FirstNum = controlIDs.length;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.unblockUI(); jAlert("错误", "错误提示", function (r) { });

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

    for (var c = 0; c < controlIDs.length; c++) {
        var type = controlIDs[c].split('#');
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

    if (jQuery('#stable_form').validationEngine('validate')) {//判断form是否验证成功
        // alert($('#stable_form').serialize());
        $.ajax({
            type: "post",
            url: "../handler/NBPM_Handler.ashx/SaveTableData?pd_id=" + getParam('pd_id'),
            //data: encodeURI("optype=SaveTableData&tableid=" + $("#DF_TableID").val() + "&orgid=" + $("#org_id").val() + "&updateid=" + $("#updateid").val() + "&" + paramStr.substring(0, paramStr.length - 1)),
            data: encodeURI($('#stable_form').serialize()),
            dataType: 'text',
            success: function (data, textStatus) {
                //   alert(data);

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
                            // $.unblockUI();

                            // history.go(backIndex);
                            if (getParam("DealPage") == "true") window.location.href = 'NBPM_DealPage.aspx?pd_id=' + getParam('pd_id');
                            else window.location.href = 'StartList.aspx';

                        }
                    });


                    //                window.location.href = 'TableList.aspx?tableid=' + $("#DF_TableID").val() + '&orgid=' + $("#org_id").val();
                }
                else {

                    jAlert(returnJson.info, "错误提示", function (r) { });
                }
            }
        });
    }
}

