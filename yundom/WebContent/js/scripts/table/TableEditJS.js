var controlIDs = [];
//必填项*号的宽度，不同浏览器减去的宽度不一样
var importantWidth = 2;
//如果是IE
if ($.browser.msie) {

    importantWidth = 2;
}
else { importantWidth = 6; }

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




var json;
$(document).ready(function ($) {
    $(function () {
        $.ajax({
            type: "get",
            // url: "../handler/SysHandler.ashx",
            // data: encodeURI("optype=FieldsPreview&tableid=" + $("#DF_TableID").val()),
            url: "../handler/Table_Handler.ashx/FieldsPreview",
            data: "tableid=" + $("#DF_TableID").val(),
            success: function (ret) {
                json = $.parseJSON(ret);
                var innerhtml = "";
                var controlCount = 0;
                var BodyWidth = document.body.clientWidth * 0.95;

                innerhtml += '<table class="TableBlock" width="95%" align="center">';
                for (var i = 0; i < json.base[0].config.length; i++) {
                    var controlStr = "";
                    var Controlwidth = json.base[0].config[i].Important == true ? (BodyWidth * json.base[0].config[i].width - 130) : (BodyWidth * json.base[0].config[i].width - 120);
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
                            // controlIDs.push(json.base[0].config[i].name.toString() + "#control#" + json.base[0].config[i].width.toString() + "#" + josnControlInfo[0].C_Name + "#" + josnControlInfo[0].C_Type + "#" + josnControlInfo[0].C_String + "#" + json.base[0].config[i].Important.toString());
                            // alert(josnControlInfo[0].C_Type);
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
                    if (json.base[0].config[i].type != "编辑器")
                        controlStr += json.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';
                    //   controlStr += json.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';

                    if (i != 0) {
                        if (controlCount.toString().indexOf('.') != -1) {
                            if (json.base[0].config[i].width == 0.5) {
                                innerhtml += '<td align="right" class="TableData"  style="width:100px" colspan="1">' + json.base[0].config[i].label + '：</td>';
                                innerhtml += '<td class="TableData" colspan="1">' + controlStr + '</td>';
                                controlCount = controlCount + json.base[0].config[i].width;
                            } else {
                                innerhtml += '<td class="TableData" colspan="2"></td></tr><tr>';
                                innerhtml += '<td align="right" class="TableData" style="width:100px"  colspan="1">' + json.base[0].config[i].label + '：</td>';
                                innerhtml += '<td class="TableData" colspan="3">' + controlStr + '</td>';
                                controlCount = controlCount + json.base[0].config[i].width + 0.5;
                            }
                        } else {
                            if (json.base[0].config[i].width == 0.5 && i == (json.base[0].config.length - 1)) {
                                innerhtml += '</tr>';
                                innerhtml += '<tr>';
                                innerhtml += '<td align="right" class="TableData" style="width:100px"  colspan="1">' + json.base[0].config[i].label + '：</td>';
                                innerhtml += '<td class="TableData" colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                innerhtml += '<td class="TableData" colspan="2"></td></tr>';
                                controlCount = controlCount + json.base[0].config[i].width;
                            }
                            else if (json.base[0].config[i].width == 1 && i == (json.base[0].config.length - 1)) {
                                innerhtml += '</tr>';
                                innerhtml += '<tr>';
                                innerhtml += '<td align="right" class="TableData" style="width:100px"  colspan="1">' + json.base[0].config[i].label + '：</td>';
                                innerhtml += '<td class="TableData" colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                innerhtml += '</tr>';
                                controlCount = controlCount + json.base[0].config[i].width;
                            } else {
                                innerhtml += '</tr>';
                                innerhtml += '<tr>';
                                innerhtml += '<td align="right"  class="TableData" style="width:100px"  colspan="1">' + json.base[0].config[i].label + '：</td>';
                                innerhtml += '<td class="TableData" colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                controlCount = controlCount + json.base[0].config[i].width;
                            }
                        }
                    } else {
                        innerhtml += '<tr>';
                        innerhtml += '<td align="right" class="TableData" colspan="1" style="width:100px">' + json.base[0].config[i].label + '：</td>';
                        innerhtml += '<td class="TableData" colspan="' + (json.base[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                        controlCount = controlCount + json.base[0].config[i].width;
                    }
                }

                innerhtml += '<tr align="center"><td class="TableData" colspan="4">';

                innerhtml += '<div style="margin-left:' + (BodyWidth / 2 - 120) + 'px;">';
                if ($("#OperatType").val() == "add" || $("#OperatType").val() == "update") {
                    innerhtml += '<input style="float:left;"  type="button" onclick="save()" class="BigButton" value="保存" />';
                }
                innerhtml += '<input style="float:left;" type="button" onclick="window.location.href=\'TableList.aspx?tableid=' + $("#DF_TableID").val() + '&orgid=' + $("#org_id").val() + '\'" class="BigButton" value="返回" /></div></td></tr>';

                innerhtml += '</table>';
                $('#main').append(innerhtml);
                //                for (var c = 0; c < controlIDs.length; c++) {
                //                    var type = controlIDs[c].split('#');
                //                    if (type[1] == "upload") {
                //                        createUploadFile(type[0], type[2], true);
                //                    } else {
                //                        createChoose(type[0], type[1], type[2], type[3], type[4], type[5], type[6]);
                //                    }
                //                }
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
                        type: "get",
                        // url: "../handler/SysHandler.ashx",
                        // data: encodeURI("optype=TableListConfig&tableid=" + $("#DF_TableID").val() + "&id=" + $("#updateid").val()),
                        url: "../handler/Table_Handler.ashx/GetData",

                        data: "tableid=" + $("#DF_TableID").val() + "&id=" + $("#updateid").val(),
                        success: function (retdata) {

                            jsondata = $.parseJSON(retdata);

                            for (var i = 0; i < json.base[0].config.length; i++) {
                                switch (json.base[0].config[i].type) {
                                    case "文本框":
                                    case "下拉框":
                                    case "数字框":
                                        $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                        break;
                                    case "文本域":
                                        // alert(jsondata.data[0][json.base[0].config[i].name]);
                                        var regS = new RegExp("\\$", "g");
                                        $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].replace(regS, "\n"));
                                        break;
                                    case "日期控件":
                                    case "时间控件":
                                        $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].replace(" 0:00:00", "").replace("/", "-").replace("/", "-"));
                                        break;
                                    case "单选按钮":
                                        // alert($("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']").length);
                                        for (var d = 0; d < $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']").length; d++) {
                                            if (jsondata.data[0][json.base[0].config[i].name] == $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']")[d].value) {
                                                $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']")[d].checked = true;
                                                break;
                                            } else {
                                                $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']")[d].checked = false;
                                            }
                                        }
                                        break;
                                    case "复选按钮":
                                        for (var d = 0; d < $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']").length; d++) {
                                            var isChecked = false;
                                            for (var f = 0; f < jsondata.data[0][json.base[0].config[i].name].split(',').length; f++) {
                                                if ($("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']")[d].value == jsondata.data[0][json.base[0].config[i].name].split(',')[f]) {
                                                    isChecked = true;
                                                }
                                            }
                                            $("[name='" + json.base[0].tablename + '_' + json.base[0].config[i].name + "']")[d].checked = isChecked;
                                        }
                                        break;
                                    case "自定义关联控件":
                                        var josnControlInfo_new = $.parseJSON(json.base[0].config[i].controlInfo);
                                        // alert(jsondata.data[0][json.base[0].config[i].name]);
                                        if (josnControlInfo_new[0].C_Type.toString() == "url") {
                                            if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                                if (jsondata.data[0][json.base[0].config[i].name].indexOf('€') != -1) {
                                                    $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                                    $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                                } else {
                                                    $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].split('|')[0]);
                                                    $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('|')[1]);
                                                }
                                            }
                                        } else if (josnControlInfo_new[0].C_Type.toString() == "sql") {
                                            if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                                $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                                $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name + "Name").val(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                            }
                                        }
                                        break;
                                    case "上传控件":
                                        // alert(jsondata.data[0][json.base[0].config[i].name]);
                                        $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].split('|')[0]);
                                        if (jsondata.data[0][json.base[0].config[i].name].split('|')[0] != "") {
                                            var fileStr = jsondata.data[0][json.base[0].config[i].name].split('|')[1];
                                            for (var m = 0; m < fileStr.split('^').length; m++) {
                                                str = "<div id='" + fileStr.split('^')[m].split('$')[3].toString().substring(0, fileStr.split('^')[m].split('$')[3].indexOf(".")) + "' class='td_div_top_img'><a href='" + fileStr.split('^')[m].split('$')[1] + "' target='_blank'><img style='float:left;' src='" + fileStr.split('^')[m].split('$')[1] + "' width='96px' title='" + fileStr.split('^')[m].split('$')[0] + "' height='70px'/><div style='overflow:hidden; width:96px;margin-top:72px;height:17px;'>" + (fileStr.split('^')[m].split('$')[0].toString().length <= 7 ? fileStr.split('^')[m].split('$')[0] : (fileStr.split('^')[m].split('$')[0].toString().substring(0, 7) + "...")) + "</div></a><div style='display:block;cursor:pointer;position:absolute;top:-10px;right:-6px;;width:22px;height:22px;background:url(../images/del.png) 22px 0;' onmouseout='this.style.backgroundPosition=\"22px 0px\";' onmouseover='this.style.backgroundPosition=\"0px 0px\";' onclick='DelEventFile(\"" + (fileStr.split('^')[m].split('$')[3].toString().substring(0, fileStr.split('^')[m].split('$')[3].indexOf("."))) + "\",\"" + fileStr.split('^')[m].split('$')[2] + "\",\"" + json.base[0].tablename + '_' + json.base[0].config[i].name + "\")' /><div></div>";
                                                var td = document.createElement("td");
                                                td.style.border = "0";
                                                td.innerHTML = str;
                                                document.getElementById(json.base[0].tablename + '_' + json.base[0].config[i].name + "_tr").appendChild(td);
                                            }
                                        }
                                        break;
                                    case "编辑器":
                                        // $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name]);
                                        // alert(jsondata.data[0][json.base[0].config[i].name]);
                                        UE.getEditor(json.base[0].tablename + '_' + json.base[0].config[i].name.toString()).setContent(jsondata.data[0][json.base[0].config[i].name], true);
                                        break;
                                    case "联动控件":
                                        var selectDataSource = jsondata.data[0][json.base[0].config[i].name][0].selectDataSource;
                                        // alert(selectDataSource.length);
                                        var Dynamic_value = jsondata.data[0][json.base[0].config[i].name][0].value;
                                        var hiddenObj = $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name);
                                        var parentTd = hiddenObj.parent();
                                        var firstSelect = hiddenObj.next();
                                        //创建所有的下拉
                                        for (var j = 0; j < selectDataSource.length; j++) {
                                            var tempSelect = $('<select style="width:80px;" onchange="DynamicFunction(this)">');
                                            tempSelect.attr("style", firstSelect.attr("style"));
                                            if (firstSelect.attr("class") != "undefined") tempSelect.attr("class", firstSelect.attr("class"));
                                            tempSelect.attr("name", firstSelect.attr("name"));
                                            if (selectDataSource[j].data.length > 0) {
                                                for (var k = 0; k < selectDataSource[j].data.length; k++) {
                                                    if (k == 0) tempSelect.append('<option value=""></option>');
                                                    var tempoption = $('<option value="' + selectDataSource[j].data[k].DDI_Code + '">' + selectDataSource[j].data[k].DDI_Name + '</option>');
                                                    tempSelect.append(tempoption);
                                                }
                                                parentTd.append(tempSelect);
                                            }
                                        }
                                        //给所有的下拉赋值
                                        hiddenObj.val(Dynamic_value);
                                        var array_all = '';
                                        if (Dynamic_value.indexOf('$') > -1)
                                            array_all = Dynamic_value.split('$')[0];
                                        var array = '';
                                        if (array_all.indexOf('€') > -1)
                                            array = array_all.split('€');
                                        var allSelects = parentTd.children("select");
                                        // alert(allSelects.length);
                                        for (var j = 0; j < array.length; j++) {
                                            // alert(array[j]);
                                            $(allSelects[j]).val(array[j]);
                                        }
                                        break;

                                    case "机构联动控件":
                                        var selectDataSource = jsondata.data[0][json.base[0].config[i].name][0].selectDataSource;
                                        // alert(selectDataSource.length);
                                        var Dynamic_value = jsondata.data[0][json.base[0].config[i].name][0].value;
                                        var hiddenObj = $("#" + json.base[0].tablename + '_' + json.base[0].config[i].name);
                                        var parentTd = hiddenObj.parent();
                                        var firstSelect = hiddenObj.next();
                                        hiddenObj.nextAll().remove();
                                        //创建所有的下拉
                                        for (var j = 0; j < selectDataSource.length; j++) {
                                            var tempSelect = $('<select style="width:80px;" onchange="OrgFunction(this)">');
                                            tempSelect.attr("style", firstSelect.attr("style"));
                                            if (firstSelect.attr("class") != "undefined") tempSelect.attr("class", firstSelect.attr("class"));
                                            tempSelect.attr("name", firstSelect.attr("name"));
                                            if (selectDataSource[j].data.length > 0) {
                                                for (var k = 0; k < selectDataSource[j].data.length; k++) {
                                                    if (k == 0) tempSelect.append('<option value=""></option>');
                                                    var tempoption = $('<option value="' + selectDataSource[j].data[k].O_ID + '">' + selectDataSource[j].data[k].O_Name + '</option>');
                                                    tempSelect.append(tempoption);
                                                }
                                                parentTd.append(tempSelect);
                                            }
                                        }
                                        //给所有的下拉赋值
                                        hiddenObj.val(Dynamic_value);
                                        var array_all = '';
                                        if (Dynamic_value.indexOf('$') > -1)
                                            array_all = Dynamic_value.split('$')[0];
                                        var array = '';
                                        if (array_all.indexOf('€') > -1)
                                            array = array_all.split('€');
                                        var allSelects = parentTd.children("select");
                                        // alert(allSelects.length);
                                        for (var j = 0; j < array.length; j++) {
                                            // alert(array[j]);
                                            $(allSelects[j]).val(array[j]);
                                        }
                                        break;
                                }
                            }
                        }
                    });
                }
                jQuery("#stable_form").validationEngine({ promptPosition: "bottomLeft" });

            }
        });
    });
});


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
            // alert($("#bianjiqi").val());
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
        //        var paramStr = "";
        //        for (var i = 0; i < json.base[0].config.length; i++) {
        //            switch (json.base[0].config[i].type) {
        //                case "文本框":
        //                case "下拉框":
        //                case "数字框":
        //                case "日期控件":
        //                case "时间控件":
        //                case "文本域":
        //                case "上传控件":
        //                case "自定义关联控件":
        //                    paramStr += json.base[0].config[i].name + "=" + $("#"+json.base[0].tablename + '_' + json.base[0].config[i].name).val() + "&";
        //                    break;
        //                case "单选按钮":
        //                case "复选按钮":
        //                    var checkedValue = "";
        //                    for (var k = 0; k < $("input[name='" + json.base[0].config[i].name + "']").length; k++) {
        //                        if ($("input[name='" + json.base[0].config[i].name + "']")[k].checked) {
        //                            checkedValue += $("input[name='" + json.base[0].config[i].name + "']")[k].value + ",";
        //                        }
        //                    }
        //                    paramStr += json.base[0].config[i].name + "=" + (checkedValue == "" ? "" : checkedValue.substring(0, checkedValue.length - 1)) + "&";
        //                    break;
        //            }
        //        }

        //        alert(paramStr);

        //        $.ajax({
        //            type: "get",
        //            url: "../handler/SysHandler.ashx",
        //            data: encodeURI("optype=SaveTableData&tableid=" + $("#DF_TableID").val() + "&orgid=" + $("#org_id").val() + "&updateid=" + $("#updateid").val() + "&" + paramStr.substring(0, paramStr.length - 1)),
        //            success: function (ret) {
        //                alert(ret)
        //                window.location.href = 'TableList.aspx?tableid=' + $("#DF_TableID").val() + '&orgid=' + $("#org_id").val();
        //            }
        //        });





        $.ajax({
            type: "post",
            url: "../handler/Table_Handler.ashx/SaveTableData",
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
                            window.location.href = 'TableList.aspx?tableid=' + $("#DF_TableID").val() + '&orgid=' + $("#org_id").val();
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