$(document).ready(function ($) {
    $(function () {
        $.ajax({
            type: "get",
            url: "../handler/SysHandler.ashx",
            data: encodeURI("optype=FieldsPreview&tableid=" + $("#DF_TableID").val()),
            success: function (ret) {
                json = $.parseJSON(ret);
                var innerhtml = "";
                var controlCount = 0;
                var BodyWidth = document.body.clientWidth * 0.95;
                var controlIDs = [];
                innerhtml += '<table class="TableBlock" width="95%" align="center">';
                for (var i = 0; i < json.base[0].config.length; i++) {
                    var controlStr = "";
                    var Controlwidth = BodyWidth * json.base[0].config[i].width - 120;
                    switch (json.base[0].config[i].type) {
                        case "文本框":
                        case "下拉框":
                        case "单选按钮":
                        case "复选按钮":
                        case "数字框":
                        case "日期控件":
                        case "时间控件":
                        case "文本域":
                        case "自定义关联控件":
                            controlStr = '<label style="height:' + (json.base[0].config[i].height == 0 ? null : json.base[0].config[i].height) + 'px;width:' + Controlwidth + 'px;" id="' + json.base[0].config[i].name + '"></label>';
                            break;
                        case "上传控件":
                            controlStr = '<input type="hidden" id="' + json.base[0].config[i].name + '"/><div id="' + json.base[0].config[i].name + '_div"></div>';
                            controlIDs.push(json.base[0].config[i].name.toString() + "#upload#" + json.base[0].config[i].width.toString());
                            break;
                    }

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
                innerhtml += '<input style="float:left;" type="button" onclick="window.location.href=\'TableList.aspx?tableid=' + $("#DF_TableID").val() + '&orgid=' + $("#org_id").val() + '\'" class="BigButton" value="返回" /></div></td></tr>';

                innerhtml += '</table>';
                $('#main').append(innerhtml);
                for (var c = 0; c < controlIDs.length; c++) {
                    var type = controlIDs[c].split('#');
                    if (type[1] == "upload") {
                        createUploadFile(type[0], type[2], false);
                    }
                }
                if ($("#updateid").val() != "") {
                    $.ajax({
                        type: "get",
                        url: "../handler/SysHandler.ashx",
                        data: encodeURI("optype=TableListConfig&tableid=" + $("#DF_TableID").val() + "&id=" + $("#updateid").val()),
                        success: function (retdata) {
                            jsondata = $.parseJSON(retdata);

                            for (var i = 0; i < json.base[0].config.length; i++) {
                                switch (json.base[0].config[i].type) {
                                    case "文本框":
                                    case "数字框":
                                        $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name]);
                                        break;
                                    case "文本域":
                                        var regS = new RegExp("\\$", "g");
                                        $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name].replace(regS, "</br>"));
                                        break;
                                    case "日期控件":
                                    case "时间控件":
                                        $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name].replace(" 0:00:00", "").replace("/", "-").replace("/", "-"));
                                        break;
                                    case "下拉框":
                                    case "单选按钮":
                                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                                        var valueStr = "";
                                        for (var m = 0; m < josnLink.length; m++) {
                                            if (josnLink[m].DDI_Code == jsondata.data[0][json.base[0].config[i].name]) {
                                                valueStr += josnLink[m].DDI_Name;
                                            }
                                        }
                                        $("#" + json.base[0].config[i].name).html(valueStr);
                                        break;
                                    case "复选按钮":
                                        var josnLink = $.parseJSON(json.base[0].config[i].link);
                                        var valueStr = "";
                                        for (var f = 0; f < jsondata.data[0][json.base[0].config[i].name].split(',').length; f++) {
                                            for (var m = 0; m < josnLink.length; m++) {
                                                if (josnLink[m].DDI_Code == jsondata.data[0][json.base[0].config[i].name].split(',')[f]) {
                                                    valueStr += josnLink[m].DDI_Name + "、";
                                                }
                                            }
                                        }
                                        $("#" + json.base[0].config[i].name).html(valueStr != "" ? valueStr.substring(0, valueStr.length - 1) : "");
                                        break;
                                    case "自定义关联控件":
                                        var josnControlInfo_new = $.parseJSON(json.base[0].config[i].controlInfo);
                                        if (josnControlInfo_new[0].C_Type.toString() == "url") {
                                            if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                                if (jsondata.data[0][json.base[0].config[i].name].indexOf('€') != -1) {
                                                    $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                                } else {
                                                    $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name].split('|')[1]);
                                                }
                                            }
                                        } else if (josnControlInfo_new[0].C_Type.toString() == "sql") {
                                            if (jsondata.data[0][json.base[0].config[i].name] != "") {
                                                $("#" + json.base[0].config[i].name).html(jsondata.data[0][json.base[0].config[i].name].split('€')[1]);
                                            }
                                        }
                                        break;
                                    case "上传控件":
                                        $("#" + json.base[0].config[i].name).val(jsondata.data[0][json.base[0].config[i].name].split('|')[0]);
                                        if (jsondata.data[0][json.base[0].config[i].name].split('|')[0] != "") {
                                            var fileStr = jsondata.data[0][json.base[0].config[i].name].split('|')[1];
                                            for (var m = 0; m < fileStr.split('^').length; m++) {
                                                str = "<div id='" + fileStr.split('^')[m].split('$')[3].toString().substring(0, fileStr.split('^')[m].split('$')[3].indexOf(".")) + "' class='td_div_top_img'><a href='" + fileStr.split('^')[m].split('$')[1] + "' target='_blank'><img style='float:left;' src='" + fileStr.split('^')[m].split('$')[1] + "' width='96px' title='" + fileStr.split('^')[m].split('$')[0] + "' height='70px'/><div style='overflow:hidden; width:96px;margin-top:72px;height:17px;'>" + (fileStr.split('^')[m].split('$')[0].toString().length <= 7 ? fileStr.split('^')[m].split('$')[0] : (fileStr.split('^')[m].split('$')[0].toString().substring(0, 7) + "...")) + "</div></a><div></div>";
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
                if ($("#DF_TableID").val() == "29") {
                    $("#ifram_Div").show();
                    $("#ifm").attr("src", "../JJYL/ShowUserServiceInfo.aspx?PERSON_ID=" + $("#updateid").val());
                }
            }
        });
    });
});