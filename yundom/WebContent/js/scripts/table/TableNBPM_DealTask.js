//该页中已经使用的遍历变量有i,j,kk,m,n,o,p
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

/*Guid方法开始*/
function Guid(g) {

    var arr = new Array(); //存放32位数值的数组



    if (typeof (g) == "string") { //如果构造函数的参数为字符串

        InitByString(arr, g);

    }

    else {

        InitByOther(arr);

    }

    //返回一个值，该值指示 Guid 的两个实例是否表示同一个值。

    this.Equals = function (o) {

        if (o && o.IsGuid) {

            return this.ToString() == o.ToString();

        }

        else {

            return false;

        }

    }

    //Guid对象的标记

    this.IsGuid = function () { }

    //返回 Guid 类的此实例值的 String 表示形式。

    this.ToString = function (format) {

        if (typeof (format) == "string") {

            if (format == "N" || format == "D" || format == "B" || format == "P") {

                return ToStringWithFormat(arr, format);

            }

            else {

                return ToStringWithFormat(arr, "D");

            }

        }

        else {

            return ToStringWithFormat(arr, "D");

        }

    }

    //由字符串加载

    function InitByString(arr, g) {

        g = g.replace(/\{|\(|\)|\}|-/g, "");

        g = g.toLowerCase();

        if (g.length != 32 || g.search(/[^0-9,a-f]/i) != -1) {

            InitByOther(arr);

        }

        else {

            for (var i = 0; i < g.length; i++) {

                arr.push(g[i]);

            }

        }

    }

    //由其他类型加载

    function InitByOther(arr) {

        var i = 32;

        while (i--) {

            arr.push("0");

        }

    }

    /*

    根据所提供的格式说明符，返回此 Guid 实例值的 String 表示形式。

    N  32 位： xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

    D  由连字符分隔的 32 位数字 xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx 

    B  括在大括号中、由连字符分隔的 32 位数字：{xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx} 

    P  括在圆括号中、由连字符分隔的 32 位数字：(xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx) 

    */

    function ToStringWithFormat(arr, format) {

        switch (format) {

            case "N":

                return arr.toString().replace(/,/g, "");

            case "D":

                var str = arr.slice(0, 8) + "-" + arr.slice(8, 12) + "-" + arr.slice(12, 16) + "-" + arr.slice(16, 20) + "-" + arr.slice(20, 32);

                str = str.replace(/,/g, "");

                return str;

            case "B":

                var str = ToStringWithFormat(arr, "D");

                str = "{" + str + "}";

                return str;

            case "P":

                var str = ToStringWithFormat(arr, "D");

                str = "(" + str + ")";

                return str;

            default:

                return new Guid();

        }

    }

}

//Guid 类的默认实例，其值保证均为零。

Guid.Empty = new Guid();

//初始化 Guid 类的一个新实例。

Guid.NewGuid = function () {

    var g = "";

    var i = 32;

    while (i--) {

        g += Math.floor(Math.random() * 16.0).toString(16);

    }
    //  alert(g + "0000000000000000");
    return new Guid(g);

}
/*Guid方法结束*/
// var guid = Guid.NewGuid();
// alert(Guid.NewGuid().ToString("string"));



function make_FeedBack(json) {
    var BodyWidth = document.body.clientWidth * 0.95;
    //清空反馈列表框
    $("#li_FeedBack").empty();
    //读数据
    for (var j = 0; j < json.baseData_FeedBack.length; j++) {
        var temp_div = $('<div style="margin:5px 0px 5px 0px;  border: 0px solid #176BA9;width:' + (BodyWidth + 12).toString() + 'px;"></div>'); //最外层的div包住主表和附带的操作表
        var innerhtml = "";
        var controlCount = 0;
        innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData_FeedBack[j].orginfo[0].O_Name + ' 用户：' + json.baseData_FeedBack[j].userinfo[0].UI_Name + ' 时间：' + json.baseData_FeedBack[j].data[0].AddDate + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div class="contentBorderNoTopDeal"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
        for (var i = 0; i < json.baseData_FeedBack[j].config.length; i++) {
            var controlStr = "";

            /*此处的120是要减去label的120宽度，6是每个td有个padding默认是1px;*/
            var Controlwidth = BodyWidth * json.baseData_FeedBack[j].config[i].width - 120 - 2;
            switch (json.baseData_FeedBack[j].config[i].type) {
                case "文本框":
                case "数字框":
                case "日期控件":
                case "时间控件":
                    // controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData_FeedBack[j].config[i].height == 0 ? 19 : json.baseData_FeedBack[j].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] + '" />';
                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    controlStr += "&nbsp;" + json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name];
                    controlStr += "</div>";
                    //alert(controlStr); 
                    break;

                case "下拉框":
                    //                    controlStr = '<select style="width:' + Controlwidth + 'px;" disabled="disabled"  size="1">';
                    //                    var options = "";
                    //                    var josnLink = $.parseJSON(json.baseData_FeedBack[j].config[i].link);
                    //                    for (var m = 0; m < josnLink.length; m++) {
                    //                        if (json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] == josnLink[m].DDI_Code)
                    //                            options += '<option value="' + josnLink[m].DDI_Code + '" selected="selected" >' + josnLink[m].DDI_Name + '</option>';
                    //                        else {
                    //                            options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                    //                        }
                    //                    }
                    //                    controlStr += options + '</select>';


                    var josnLink = $.parseJSON(json.baseData_FeedBack[j].config[i].link);
                    for (var m = 0; m < josnLink.length; m++) {
                        if (json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] == josnLink[m].DDI_Code)
                            controlStr = "&nbsp;" + josnLink[m].DDI_Name;
                        else {
                            controlStr = " ";
                        }
                    }

                    break;
                case "单选按钮":
                    //                    var josnLink = $.parseJSON(json.baseData_FeedBack[j].config[i].link);
                    //                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    //                    for (var m = 0; m < josnLink.length; m++) {
                    //                        controlStr += '<div><div style="float:left;" ><input type="radio"  disabled="disabled" ' + (m == 0 ? " checked=\"checked\"" : json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] == josnLink[m].DDI_Code ? " checked=\"checked\"" : "") + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                    //                    }
                    //                    controlStr += "</div>";

                    var josnLink = $.parseJSON(json.baseData_FeedBack[j].config[i].link);
                    controlStr = '<div style="width:' + Controlwidth + 'px;"> ';
                    for (var m = 0; m < josnLink.length; m++) {

                        if (json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] == josnLink[m].DDI_Code)
                            controlStr = "&nbsp;" + josnLink[m].DDI_Name;
                    }
                    controlStr += "</div>";
                    //  alert(controlStr); 
                    break;
                case "复选按钮":
                    var josnLink = $.parseJSON(json.baseData_FeedBack[j].config[i].link);
                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    for (var m = 0; m < josnLink.length; m++) {
                        var temp_checked_values = json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name].split(',');
                        var index_value = $.inArray(josnLink[m].DDI_Code, temp_checked_values);
                        if (index_value > -1)
                            controlStr += "&nbsp;" + josnLink[m].DDI_Name;
                    }
                    controlStr += "</div>";
                    break;
                case "文本域":
                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    controlStr += json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name];
                    controlStr += "</div>";
                    // alert(json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name]);
                    break;
                case "自定义关联控件":
                    var zdy_temp_value = json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name];
                    var zdy_1 = '';
                    if (zdy_temp_value != null && zdy_temp_value != '') {
                        zdy_1 = zdy_temp_value.split('€')[1];
                    }
                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    controlStr += zdy_1;
                    controlStr += "</div>";
                    // controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData_FeedBack[j].config[i].height == 0 ? 19 : json.baseData_FeedBack[j].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + zdy_1 + '" />';
                    // alert(controlStr);      






                    break;
                case "上传控件":
                    var sc_temp_value = json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name];
                    controlStr = '<div style="border: 1px solid #b5b8c8; height: 120px; width:' + Controlwidth + 'px;overflow-x: auto; overflow-y: hidden;">';
                    controlStr += '<table border="0"><tr>';
                    var sc_temp_json = $.parseJSON(sc_temp_value);
                    for (var kk = 0; kk < sc_temp_json.length; kk++) {
                        controlStr += '<td style="border: 0px;"><div class="td_div_top_img"><a href="' + sc_temp_json[kk].UF_FileUrl + '" target="_blank"><img src="' + sc_temp_json[kk].UF_FileUrl + '" width="96px" title="" height="70px">';
                        controlStr += '<div style="overflow: hidden; width: 96px; margin-top: 2px; height: 17px; text-align:center;">' + sc_temp_json[kk].UF_FileRemark + '</div></a></div></td>';

                    }
                    controlStr += '</tr></table></div>';
                    // alert(controlStr);      
                    break;
                case "编辑器":
                    //                    var guid = "UEditor_" + Guid.NewGuid().ToString("string");
                    //                    controlStr = '<textarea id="' + guid + '" style="height:' + (json.baseData_FeedBack[j].config[i].height == 0 ? 60 + 35 : parseFloat(json.baseData_FeedBack[j].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;">' + json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name] + '</textarea>';
                    //                    //编辑器默认工具栏      
                    //                    var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                    //                    if (json.baseData_FeedBack[j].config[i].width.toString() == '0.5')
                    //                        toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                    //                    //创建编辑器      
                    //                    var editor = UE.getEditor(guid, {
                    //                        toolbars: [toolbars]
                    //                                                                , initialFrameWidth: BodyWidth * parseFloat(json.baseData_FeedBack[j].config[i].width) - 120
                    //                                                                , elementPathEnabled: false/*关闭元素路径*/
                    //                                                                , wordCount: false/*关闭字数统计*/
                    //                                                                , initialFrameHeight: json.baseData_FeedBack[j].config[i].height/*重要*/
                    //                                                                , minFrameHeight: json.baseData_FeedBack[j].config[i].height /*重要*/
                    //                        //, initialContent: json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name]        
                    //                                                                , textarea: guid/*通过textarea给值，也可以通过上面的initialContent给值,但是用上面的方法要注意特殊符号*/
                    //                                                                , readonly: true


                    //                    });

                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    controlStr += json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name];
                    controlStr += "</div>";
                    break;
                case "联动控件":
                case "机构联动控件":
                    var Dynamic_value = json.baseData_FeedBack[j].data[0][json.baseData_FeedBack[j].config[i].name][0].value;
                    var array_all = '';
                    if (Dynamic_value.indexOf('$') > -1)
                        array_all = Dynamic_value.split('$')[1];
                    var array = '';
                    if (array_all.indexOf('€') > -1)
                        array = array_all.replace(/\€/gi, '-');
                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                    controlStr += array;
                    controlStr += "</div>";
                    // alert(json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name]);
                    break;
            }


            if (i != 0) {
                if (controlCount.toString().indexOf('.') != -1) {
                    if (json.baseData_FeedBack[j].config[i].width == 0.5) {
                        innerhtml += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                        innerhtml += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                        controlCount = controlCount + json.baseData_FeedBack[j].config[i].width;
                    } else {
                        innerhtml += '<td class="TableData" colspan="2"></td></tr><tr>';
                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                        innerhtml += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                        controlCount = controlCount + json.baseData_FeedBack[j].config[i].width + 0.5;
                    }
                } else {
                    if (json.baseData_FeedBack[j].config[i].width == 0.5 && i == (json.baseData_FeedBack[j].config.length - 1)) {
                        innerhtml += '</tr>';
                        innerhtml += '<tr>';
                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData_FeedBack[j].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                        innerhtml += '<td class="TableData" colspan="2"></td></tr>';
                        controlCount = controlCount + json.baseData_FeedBack[j].config[i].width;
                    }
                    else if (json.baseData_FeedBack[j].config[i].width == 1 && i == (json.baseData_FeedBack[j].config.length - 1)) {
                        innerhtml += '</tr>';
                        innerhtml += '<tr>';
                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData_FeedBack[j].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                        innerhtml += '</tr>';
                        controlCount = controlCount + json.baseData_FeedBack[j].config[i].width;
                    } else {
                        innerhtml += '</tr>';
                        innerhtml += '<tr>';
                        innerhtml += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData_FeedBack[j].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                        controlCount = controlCount + json.baseData_FeedBack[j].config[i].width;
                    }
                }
            } else {
                innerhtml += '<tr>';
                innerhtml += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json.baseData_FeedBack[j].config[i].label + ':</td>';
                innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData_FeedBack[j].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                controlCount = controlCount + json.baseData_FeedBack[j].config[i].width;
            }

        }
        innerhtml += "</table></div>";
        temp_div.append(innerhtml);

        $("#li_FeedBack").append(temp_div);
    }







}


function refresh_FeedBack() {

    $.ajax({
        type: "post",
        url: "../handler/NBPM_Handler.ashx/RefreshFeedBack?pd_id=" + $("#Hidden_Pd_Id").val() + "&pi_id=" + $("#Hidden_PI_ID").val(),
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
            var json_FeedBack = $.parseJSON(data);
            make_FeedBack(json_FeedBack);


        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.unblockUI();
            jAlert("错误", "错误提示", function (r) { });

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
    /*获取url参数结束*/

    $.ajax({
        type: "post",
        url: "../handler/NBPM_Handler.ashx/Deal_getConfig?Pd_Id=" + getParam("Pd_Id") + "&PI_ID=" + getParam("PI_ID") + "&Ad_Id=" + getParam("Ad_Id") + "&AI_ID=" + getParam("AI_ID"), //取得checkbox的value值的第一个值
        // data: $('#form1').serialize() + "&editID=" + getParam('id'), //提交form的数据
        dataType: 'text',
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
        success: function (data, textStatus) {

            $.unblockUI();
            // document.getElementById("Hidden1").value = data;
            var json = $.parseJSON(data);
            if (json.success == false) {
                jAlert(json.info, "错误提示", function (r) { });
            }
            else {

                /*数据表格加载开始*/
                var BodyWidth = document.body.clientWidth * 0.95;
                for (var j = 0; j < json.baseData.length; j++) {

                    var innerhtml = "";
                    var controlCount = 0;
                    //  var BodyWidth = document.body.clientWidth * 0.95;
                    var temp_div = $('<div style="margin:5px 0px 5px 0px;  border: 0px solid #176BA9;width:' + (BodyWidth + 12).toString() + 'px;"></div>'); //最外层的div包住主表和附带的操作表
                    //读主数据表
                    if (json.baseData[j].MainTable.length > 0) {
                        innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].MainTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].MainTable[0].userinfo[0].UI_Name + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div class="contentBorderNoTopDeal"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
                        for (var i = 0; i < json.baseData[j].MainTable[0].config.length; i++) {
                            var controlStr = "";
                            /*此处的120是要减去label的120宽度，6是每个td有个padding默认是1px;*/
                            var Controlwidth = BodyWidth * json.baseData[j].MainTable[0].config[i].width - 120 - 2;
                            switch (json.baseData[j].MainTable[0].config[i].type) {
                                case "文本框":
                                case "数字框":
                                case "日期控件":
                                case "时间控件":
                                    controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData[j].MainTable[0].config[i].height == 0 ? 19 : json.baseData[j].MainTable[0].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name] + '" />';
                                    //alert(controlStr); 
                                    break;

                                case "下拉框":
                                    controlStr = '<select style="width:' + Controlwidth + 'px;" disabled="disabled"  size="1">';
                                    var options = "";
                                    var josnLink = $.parseJSON(json.baseData[j].MainTable[0].config[i].link);
                                    for (var m = 0; m < josnLink.length; m++) {
                                        if (json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name] == josnLink[m].DDI_Code)
                                            options += '<option value="' + josnLink[m].DDI_Code + '" selected="selected" >' + josnLink[m].DDI_Name + '</option>';
                                        else {
                                            options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                                        }
                                    }
                                    controlStr += options + '</select>';
                                    break;
                                case "单选按钮":
                                    var josnLink = $.parseJSON(json.baseData[j].MainTable[0].config[i].link);
                                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                                    for (var m = 0; m < josnLink.length; m++) {
                                        controlStr += '<div><div style="float:left;" ><input type="radio"  disabled="disabled" ' + (m == 0 ? " checked=\"checked\"" : json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name] == josnLink[m].DDI_Code ? " checked=\"checked\"" : "") + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                    }
                                    controlStr += "</div>";
                                    //  alert(controlStr); 
                                    break;
                                case "复选按钮":
                                    var josnLink = $.parseJSON(json.baseData[j].MainTable[0].config[i].link);
                                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                                    for (var m = 0; m < josnLink.length; m++) {
                                        var temp_checked_values = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name].split(',');
                                        var index_value = $.inArray(josnLink[m].DDI_Code, temp_checked_values);
                                        controlStr += '<div><div style="float:left;" ><input type="checkbox" disabled="disabled"  ' + (index_value > -1 ? ' checked=\"checked\"' : '') + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                    }
                                    controlStr += "</div>";
                                    break;
                                case "文本域":
                                    controlStr = '<textarea  readonly="readonly" style="height:' + (json.baseData[j].MainTable[0].config[i].height == 0 ? 60 : json.baseData[j].MainTable[0].config[i].height) + 'px;width:' + Controlwidth + 'px;">' + json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name] + '</textarea>';
                                    // alert(json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name]);
                                    break;
                                case "自定义关联控件":
                                    var zdy_temp_value = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name];
                                    var zdy_1 = '';
                                    if (zdy_temp_value != null && zdy_temp_value != '') {

                                        zdy_1 = zdy_temp_value.split('€')[1];
                                    }
                                    controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData[j].MainTable[0].config[i].height == 0 ? 19 : json.baseData[j].MainTable[0].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + zdy_1 + '" />';
                                    // alert(controlStr);      
                                    break;
                                case "上传控件":
                                    var sc_temp_value = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name];
                                    controlStr = '<div style="border: 1px solid #b5b8c8; height: 120px; width:' + Controlwidth + 'px;overflow-x: auto; overflow-y: hidden;">';
                                    controlStr += '<table border="0"><tr>';
                                    var sc_temp_json = $.parseJSON(sc_temp_value);
                                    for (var kk = 0; kk < sc_temp_json.length; kk++) {
                                        controlStr += '<td style="border: 0px;"><div class="td_div_top_img"><a href="' + sc_temp_json[kk].UF_FileUrl + '" target="_blank"><img src="' + sc_temp_json[kk].UF_FileUrl + '" width="96px" title="" height="70px">';
                                        controlStr += '<div style="overflow: hidden; width: 96px; margin-top: 2px; height: 17px; text-align:center;">' + sc_temp_json[kk].UF_FileRemark + '</div></a></div></td>';

                                    }
                                    controlStr += '</tr></table></div>';
                                    // alert(controlStr);      
                                    break;
                                case "编辑器":
                                    var guid = "UEditor_" + Guid.NewGuid().ToString("string");
                                    controlStr = '<textarea id="' + guid + '" style="height:' + (json.baseData[j].MainTable[0].config[i].height == 0 ? 60 + 35 : parseFloat(json.baseData[j].MainTable[0].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;">' + json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name] + '</textarea>';
                                    //编辑器默认工具栏      
                                    var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                                    if (json.baseData[j].MainTable[0].config[i].width.toString() == '0.5')
                                        toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                                    //创建编辑器      
                                    var editor = UE.getEditor(guid, {
                                        toolbars: [toolbars]
                                                                , initialFrameWidth: BodyWidth * parseFloat(json.baseData[j].MainTable[0].config[i].width) - 120
                                                                , elementPathEnabled: false/*关闭元素路径*/
                                                                , wordCount: false/*关闭字数统计*/
                                                                , initialFrameHeight: json.baseData[j].MainTable[0].config[i].height/*重要*/
                                                                , minFrameHeight: json.baseData[j].MainTable[0].config[i].height /*重要*/
                                        //, initialContent: json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name]        
                                                                , textarea: guid/*通过textarea给值，也可以通过上面的initialContent给值,但是用上面的方法要注意特殊符号*/
                                                                , readonly: true


                                    });
                                    break;
                                case "联动控件":
                                    var Dynamic_value = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name][0].value;
                                    var array_all = '';
                                    if (Dynamic_value.indexOf('$') > -1)
                                        array_all = Dynamic_value.split('$')[0];
                                    var array = '';
                                    if (array_all.indexOf('€') > -1)
                                        array = array_all.split('€');
                                    controlStr = '<input type="hidden"  value="' + Dynamic_value + '"/>';
                                    // json.baseData[j].MainTable[0].config[i].name
                                    //第一个下拉框
                                    controlStr += '<select disabled="disabled" ' + (json.baseData[j].MainTable[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '
                                    var options = '<option value=""> </option>';
                                    var josnLink = $.parseJSON(json.baseData[j].MainTable[0].config[i].link);
                                    for (var p = 0; p < josnLink.length; p++) {
                                        // alert(array);
                                        if (array != '') {
                                            if (array[0] == josnLink[p].DDI_Code)
                                                options += '<option value="' + josnLink[p].DDI_Code + '"  selected="selected">' + josnLink[p].DDI_Name + '</option>';
                                        } else options += '<option value="' + josnLink[p].DDI_Code + '">' + josnLink[p].DDI_Name + '</option>';

                                    }
                                    controlStr += options + '</select>';
                                    //之后的下拉框
                                    var selectDataSource = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name][0].selectDataSource;
                                    for (var p = 0; p < selectDataSource.length; p++) {

                                        // alert(selectDataSource[p].data.length);
                                        if (selectDataSource[p].data.length > 0) {
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].MainTable[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> ';

                                            options = '<option value=""> </option>';
                                            for (var q = 0; q < selectDataSource[p].data.length; q++) {
                                                //selected="selected"
                                                if (array[p + 1] == selectDataSource[p].data[q].DDI_Code)
                                                    options += '<option value="' + selectDataSource[p].data[q].DDI_Code + '" selected="selected">' + selectDataSource[p].data[q].DDI_Name + '</option>';
                                                else options += '<option value="' + selectDataSource[p].data[q].DDI_Code + '">' + selectDataSource[p].data[q].DDI_Name + '</option>';
                                                //  controlStr += options;
                                            }

                                            controlStr += options + '</select>';
                                        }

                                    }

                                    break;
                                case "机构联动控件":
                                    var Dynamic_value = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name][0].value;
                                    // alert(Dynamic_value);
                                    var array_all = '';
                                    if (Dynamic_value.indexOf('$') > -1)
                                        array_all = Dynamic_value.split('$')[0];
                                    var array = '';
                                    if (array_all.indexOf('€') > -1)
                                        array = array_all.split('€');
                                    controlStr = '<input type="hidden"  value="' + Dynamic_value + '"/>';
                                    // json.baseData[j].MainTable[0].config[i].name
                                    //第一个下拉框
                                    var options = '';
                                    //之后的下拉框
                                    var selectDataSource = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name][0].selectDataSource;
                                    for (var p = 0; p < selectDataSource.length; p++) {
                                        if (selectDataSource[p].data.length > 0) {
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].MainTable[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="OrgFunction(this)"> ';
                                            options = '<option value=""> </option>';
                                            for (var q = 0; q < selectDataSource[p].data.length; q++) {
                                                //selected="selected"
                                                // alert(selectDataSource[p].data[q].O_ID);
                                                if (array[p] == selectDataSource[p].data[q].O_ID)
                                                    options += '<option value="' + selectDataSource[p].data[q].O_ID + '" selected="selected">' + selectDataSource[p].data[q].O_Name + '</option>';
                                                else options += '<option value="' + selectDataSource[p].data[q].O_ID + '">' + selectDataSource[p].data[q].O_Name + '</option>';
                                                //  controlStr += options;
                                            }
                                            controlStr += options + '</select>';
                                        }

                                    }

                                    break;
                            }


                            if (i != 0) {
                                if (controlCount.toString().indexOf('.') != -1) {
                                    if (json.baseData[j].MainTable[0].config[i].width == 0.5) {
                                        innerhtml += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width;
                                    } else {
                                        innerhtml += '<td class="TableData" colspan="2"></td></tr><tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width + 0.5;
                                    }
                                } else {
                                    if (json.baseData[j].MainTable[0].config[i].width == 0.5 && i == (json.baseData[j].MainTable[0].config.length - 1)) {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].MainTable[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        innerhtml += '<td class="TableData" colspan="2"></td></tr>';
                                        controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width;
                                    }
                                    else if (json.baseData[j].MainTable[0].config[i].width == 1 && i == (json.baseData[j].MainTable[0].config.length - 1)) {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].MainTable[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        innerhtml += '</tr>';
                                        controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width;
                                    } else {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].MainTable[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width;
                                    }
                                }
                            } else {
                                innerhtml += '<tr>';
                                innerhtml += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json.baseData[j].MainTable[0].config[i].label + ':</td>';
                                innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].MainTable[0].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                controlCount = controlCount + json.baseData[j].MainTable[0].config[i].width;
                            }

                        }
                        innerhtml += "</table></div>";
                        temp_div.append(innerhtml);

                    }
                    //取得办理数据对应的操作名字
                    function getOperationName(temp_OL_ID) {
                        var return_value = "";
                        var temp_OperationLogData = json.baseData[j].OperationLogData;

                        for (var temp_ol = 0; temp_ol < temp_OperationLogData.length; temp_ol++) {
                            if (temp_OperationLogData[temp_ol].OL_ID == temp_OL_ID) {

                                return_value = temp_OperationLogData[temp_ol].OL_AnotherName == "" ? temp_OperationLogData[temp_ol].OL_Name : temp_OperationLogData[temp_ol].OL_AnotherName;
                                break;
                            }

                        }
                        return return_value;


                    }

                    //记录有数据的操作的OL_ID
                    var array_OL_ID = new Array();

                    //读对应的操作表
                    for (var n = 0; n < json.baseData[j].OperationTable.length; n++) {
                        array_OL_ID.push(json.baseData[j].OperationTable[n].data[0]['OL_ID']);
                        innerhtml = "";
                        controlCount = 0;
                        //  BodyWidth = document.body.clientWidth * 0.95;
                        //alert(BodyWidth);
                        if (temp_div.html() == "")
                            innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].OperationTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].OperationTable[0].userinfo[0].UI_Name + ' 操作：' + getOperationName(json.baseData[j].OperationTable[n].data[0]['OL_ID']) + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div class="contentBorderNoTopDeal"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
                        else innerhtml += '<div class="operation_title"><div class="div1">操作：' + getOperationName(json.baseData[j].OperationTable[n].data[0]['OL_ID']) + '</div></div><div class="contentBorderNoTopDeal"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
                        for (var i = 0; i < json.baseData[j].OperationTable[n].config.length; i++) {
                            var controlStr = "";
                            /*此处的120是要减去label的120宽度，6是每个td有个padding默认是1px;*/
                            var Controlwidth = BodyWidth * json.baseData[j].OperationTable[n].config[i].width - 120 - 2;
                            switch (json.baseData[j].OperationTable[n].config[i].type) {
                                case "文本框":
                                case "数字框":
                                case "日期控件":
                                case "时间控件":
                                    controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData[j].OperationTable[n].config[i].height == 0 ? 19 : json.baseData[j].OperationTable[n].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name] + '" />';
                                    //alert(controlStr); 
                                    break;

                                case "下拉框":
                                    controlStr = '<select style="width:' + Controlwidth + 'px;" disabled="disabled"  size="1">';
                                    var options = "";
                                    var josnLink = $.parseJSON(json.baseData[j].OperationTable[n].config[i].link);
                                    for (var m = 0; m < josnLink.length; m++) {
                                        if (json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name] == josnLink[m].DDI_Code)
                                            options += '<option value="' + josnLink[m].DDI_Code + '" selected="selected" >' + josnLink[m].DDI_Name + '</option>';
                                        else {
                                            options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                                        }
                                    }
                                    controlStr += options + '</select>';
                                    break;
                                case "单选按钮":
                                    var josnLink = $.parseJSON(json.baseData[j].OperationTable[n].config[i].link);
                                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                                    for (var m = 0; m < josnLink.length; m++) {
                                        controlStr += '<div><div style="float:left;" ><input type="radio"  disabled="disabled" ' + (m == 0 ? " checked=\"checked\"" : json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name] == josnLink[m].DDI_Code ? " checked=\"checked\"" : "") + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                    }
                                    controlStr += "</div>";
                                    //  alert(controlStr); 
                                    break;
                                case "复选按钮":
                                    var josnLink = $.parseJSON(json.baseData[j].OperationTable[n].config[i].link);
                                    controlStr = '<div style="width:' + Controlwidth + 'px;">';
                                    for (var m = 0; m < josnLink.length; m++) {
                                        var temp_checked_values = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name].split(',');
                                        var index_value = $.inArray(josnLink[m].DDI_Code, temp_checked_values);
                                        controlStr += '<div><div style="float:left;" ><input type="checkbox"  disabled="disabled"  ' + (index_value > -1 ? ' checked=\"checked\"' : '') + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
                                    }
                                    controlStr += "</div>";
                                    break;
                                case "文本域":
                                    controlStr = '<textarea  readonly="readonly" style="height:' + (json.baseData[j].OperationTable[n].config[i].height == 0 ? 60 : json.baseData[j].OperationTable[n].config[i].height) + 'px;width:' + Controlwidth + 'px;">' + json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name] + '</textarea>';
                                    // alert(json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name]);
                                    break;
                                case "自定义关联控件":
                                    var zdy_temp_value = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name];
                                    var zdy_1 = '';
                                    if (zdy_temp_value != null && zdy_temp_value != '') {
                                        zdy_1 = zdy_temp_value.split('€')[1];
                                    }
                                    controlStr = '<input type="text"  readonly="readonly"' + ' style="height:' + (json.baseData[j].OperationTable[n].config[i].height == 0 ? 19 : json.baseData[j].OperationTable[n].config[i].height) + 'px;width:' + Controlwidth + 'px;"' + ' value="' + zdy_1 + '" />';
                                    // alert(controlStr);      
                                    break;
                                case "上传控件":
                                    var sc_temp_value = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name];
                                    controlStr = '<div><div style="float: left; border: 1px solid #b5b8c8; height: 120px; width:' + Controlwidth + 'px;overflow-x: auto; overflow-y: hidden;">';
                                    controlStr += '<table><tr>';
                                    var sc_temp_json = $.parseJSON(sc_temp_value);
                                    for (var kk = 0; kk < sc_temp_json.length; kk++) {
                                        controlStr += '<td style="border: 0px;"><div class="td_div_top_img"><a href="' + sc_temp_json[kk].UF_FileUrl + '" target="_blank"><img style="float: left;" src="' + sc_temp_json[kk].UF_FileUrl + '" width="96px" title="" height="70px">';
                                        controlStr += '<div style="overflow: hidden; width: 96px; margin-top: 72px; height: 17px;">' + sc_temp_json[kk].UF_FileRemark + '</div></a></div></td>';

                                    }
                                    controlStr += '</tr></table></div></div>';
                                    // alert(controlStr);      
                                    break;
                                case "编辑器":
                                    var guid = "UEditor_" + Guid.NewGuid().ToString("string");
                                    controlStr = '<textarea id="' + guid + '" style="height:' + (json.baseData[j].OperationTable[n].config[i].height == 0 ? 60 + 35 : parseFloat(json.baseData[j].OperationTable[n].config[i].height) + 35) + 'px;width:' + Controlwidth + 'px;">' + json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name] + '</textarea>';
                                    //编辑器默认工具栏      
                                    var toolbars = ['source', '|', 'undo', 'redo', '|', 'bold', 'italic', 'underline', 'pasteplain', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|', 'link', 'unlink', '|', 'insertimage', 'emotion', 'attachment'];
                                    if (json.baseData[j].OperationTable[n].config[i].width.toString() == '0.5')
                                        toolbars = ['bold', 'italic', 'underline', 'forecolor', '|', 'fontfamily', 'fontsize', '|', 'justifyleft', 'justifycenter', 'justifyright', '|', 'insertimage'];
                                    //创建编辑器      
                                    var editor = UE.getEditor(guid, {
                                        toolbars: [toolbars]
                                                                , initialFrameWidth: BodyWidth * parseFloat(json.baseData[j].OperationTable[n].config[i].width) - 120
                                                                , elementPathEnabled: false/*关闭元素路径*/
                                                                , wordCount: false/*关闭字数统计*/
                                                                , initialFrameHeight: json.baseData[j].OperationTable[n].config[i].height/*重要*/
                                                                , minFrameHeight: json.baseData[j].OperationTable[n].config[i].height /*重要*/
                                        //, initialContent: json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name]        
                                                                , textarea: guid/*通过textarea给值，也可以通过上面的initialContent给值,但是用上面的方法要注意特殊符号*/
                                                                , readonly: true


                                    });
                                    break;
                                /**************此处加只读属性的下拉****************/ 
                                case "联动控件":

                                    var Dynamic_value = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name][0].value;
                                    var array_all = '';
                                    if (Dynamic_value.indexOf('$') > -1)
                                        array_all = Dynamic_value.split('$')[0];
                                    var array = '';
                                    if (array_all.indexOf('€') > -1)
                                        array = array_all.split('€');
                                    controlStr = '<input type="hidden"  value="' + Dynamic_value + '"/>';
                                    // json.baseData[j].MainTable[0].config[i].name
                                    //第一个下拉框
                                    controlStr += '<select disabled="disabled" ' + (json.baseData[j].OperationTable[n].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '
                                    var options = '<option value=""> </option>';
                                    var josnLink = $.parseJSON(json.baseData[j].OperationTable[n].config[i].link);
                                    for (var p = 0; p < josnLink.length; p++) {
                                        if (array != '') {
                                            if (array[0] == josnLink[p].DDI_Code)
                                                options += '<option value="' + josnLink[p].DDI_Code + '"  selected="selected">' + josnLink[p].DDI_Name + '</option>';
                                        } else options += '<option value="' + josnLink[p].DDI_Code + '">' + josnLink[p].DDI_Name + '</option>';
                                    }
                                    controlStr += options + '</select>';
                                    //之后的下拉框
                                    var selectDataSource = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name][0].selectDataSource;
                                    for (var p = 0; p < selectDataSource.length; p++) {

                                        // alert(selectDataSource[p].data.length);
                                        if (selectDataSource[p].data.length > 0) {
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].OperationTable[n].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '

                                            options = '<option value=""> </option>';
                                            for (var q = 0; q < selectDataSource[p].data.length; q++) {
                                                //selected="selected"
                                                if (array[p + 1] == selectDataSource[p].data[q].DDI_Code)
                                                    options += '<option value="' + selectDataSource[p].data[q].DDI_Code + '" selected="selected">' + selectDataSource[p].data[q].DDI_Name + '</option>';
                                                else options += '<option value="' + selectDataSource[p].data[q].DDI_Code + '">' + selectDataSource[p].data[q].DDI_Name + '</option>';
                                                //  controlStr += options;
                                            }

                                            controlStr += options + '</select>';
                                        }

                                    }

                                    break;
                                case "机构联动控件":

                                    var Dynamic_value = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name][0].value;
                                    var array_all = '';
                                    if (Dynamic_value.indexOf('$') > -1)
                                        array_all = Dynamic_value.split('$')[0];
                                    var array = '';
                                    if (array_all.indexOf('€') > -1)
                                        array = array_all.split('€');
                                    controlStr = '<input type="hidden"  value="' + Dynamic_value + '"/>';
                                    var options = '<option value=""> </option>';

                                    //之后的下拉框
                                    var selectDataSource = json.baseData[j].OperationTable[n].data[0][json.baseData[j].OperationTable[n].config[i].name][0].selectDataSource;
                                    for (var p = 0; p < selectDataSource.length; p++) {

                                        // alert(selectDataSource[p].data.length);
                                        if (selectDataSource[p].data.length > 0) {
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].OperationTable[n].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '

                                            options = '<option value=""> </option>';
                                            for (var q = 0; q < selectDataSource[p].data.length; q++) {
                                                //selected="selected"
                                                if (array[p] == selectDataSource[p].data[q].O_ID)
                                                    options += '<option value="' + selectDataSource[p].data[q].O_ID + '" selected="selected">' + selectDataSource[p].data[q].O_Name + '</option>';
                                                else options += '<option value="' + selectDataSource[p].data[q].O_ID + '">' + selectDataSource[p].data[q].O_Name + '</option>';
                                                //  controlStr += options;
                                            }

                                            controlStr += options + '</select>';
                                        }

                                    }

                                    break;
                            }


                            if (i != 0) {
                                if (controlCount.toString().indexOf('.') != -1) {
                                    if (json.baseData[j].OperationTable[n].config[i].width == 0.5) {
                                        innerhtml += '<td align="right" class="TableData"  style="width:120px;" colspan="1">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" colspan="1" style="vertical-align:top;" >' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width;
                                    } else {
                                        innerhtml += '<td class="TableData" colspan="2"></td></tr><tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" colspan="3" style="vertical-align:top;" >' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width + 0.5;
                                    }
                                } else {
                                    if (json.baseData[j].OperationTable[n].config[i].width == 0.5 && i == (json.baseData[j].OperationTable[n].config.length - 1)) {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].OperationTable[n].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        innerhtml += '<td class="TableData" colspan="2"></td></tr>';
                                        controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width;
                                    }
                                    else if (json.baseData[j].OperationTable[n].config[i].width == 1 && i == (json.baseData[j].OperationTable[n].config.length - 1)) {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right" class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].OperationTable[n].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        innerhtml += '</tr>';
                                        controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width;
                                    } else {
                                        innerhtml += '</tr>';
                                        innerhtml += '<tr>';
                                        innerhtml += '<td align="right"  class="TableData" style="width:120px;"  colspan="1">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                        innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].OperationTable[n].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                        controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width;
                                    }
                                }
                            } else {
                                innerhtml += '<tr>';
                                innerhtml += '<td align="right" class="TableData" colspan="1" style="width:120px;">' + json.baseData[j].OperationTable[n].config[i].label + ':</td>';
                                innerhtml += '<td class="TableData" style="vertical-align:top;"  colspan="' + (json.baseData[j].OperationTable[n].config[i].width == 0.5 ? 1 : 3) + '">' + controlStr + '</td>';
                                controlCount = controlCount + json.baseData[j].OperationTable[n].config[i].width;
                            }

                        }
                        innerhtml += "</table></div>";

                        //  document.getElementById("div_old").innerHTML = document.getElementById("div_old").innerHTML + innerhtml;
                        // $("#div_old").append(innerhtml);
                        // alert(1);
                        temp_div.append(innerhtml);
                    }
                    //                    if (json.baseData[j].OperationTable.length == 0) {
                    //                        innerhtml = "";
                    //                        controlCount = 0;
                    //                        BodyWidth = document.body.clientWidth * 0.95;

                    //                        if (temp_div.html() == "")
                    //                            innerhtml += '<div class="nbpm_title"><span>机构：' + json.baseData[j].OperationTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].OperationTable[0].userinfo[0].UI_Name + ' 操作：' + getOperationName(n) + '</span></div>';
                    //                        else innerhtml += '<div class="operation_title">操作：' + getOperationName(n) + '</div>';


                    //                    }
                    //记录没有数据的操作OL_ID

                    var array_OL_ID_more = new Array();
                    for (var o = 0; o < json.baseData[j].OperationLogData.length; o++) {
                        //  alert(3);
                        if ($.inArray(json.baseData[j].OperationLogData[o].OL_ID, array_OL_ID) == -1) {

                            array_OL_ID_more.push(json.baseData[j].OperationLogData[o].OL_ID);
                        }
                    }

                    if (array_OL_ID_more.length > 0) {
                        innerhtml = "";
                        // BodyWidth = document.body.clientWidth * 0.95;
                        //定义要返回的操作名字
                        var operationNames = "";
                        for (var o = 0; o < array_OL_ID_more.length; o++) {
                            operationNames += getOperationName(array_OL_ID_more[o]);
                            if (o != array_OL_ID_more.length - 1) operationNames += ",";
                        }
                        //alert(operationNames);
                        if (temp_div.html() == "")
                            innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].OperationTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].OperationTable[0].userinfo[0].UI_Name + ' 操作：' + operationNames + '(暂无数据)</span></div>';
                        else innerhtml += '<div class="operation_title"><div class="div1">操作：' + operationNames + '(暂无数据)</div></div>';
                        temp_div.append(innerhtml);
                    }


                    $("#div_old").append(temp_div);
                }
                // $("#Hidden1").val($("#div_old").html());


                /*数据表格加载结束*/

                /*加载办理表格开始*/

                //  var json = $.parseJSON(ret);
                //控制title的宽度
                // $("#title_table").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
                //此句控制动态操作表格的宽度
                $(".operation").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
                //此句控制main_operation的宽度
                $(".main_operation").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
                var innerhtml = "";
                var foothtml = "";
                var controlCount = 0;
                //  var BodyWidth = document.body.clientWidth * 0.95;
                // alert(document.body.clientWidth);

                //*************追加"操作"***************
                var operationHtml = '<div id="operation_div">&nbsp;&nbsp;操作：';
                for (var i = 0; i < json.operation.length; i++) {
                    //checkbox中的值是NBPM_ActivityOperation表的字段AO_TableName€AO_Code€AO_IsBasic€PD_Id€AD_Id€AD_Id_Next
                    operationHtml += '<input  type="hidden" value="' + json.operation[i].AO_Code + '" name="hd_ActivityOperation" /><input  type="checkbox" value="' + json.operation[i].AO_TableName + '€' + json.operation[i].AO_Code + '€' + json.operation[i].AO_IsBasic + '€' + json.operation[i].PD_Id + '€' + json.operation[i].AD_Id + '€' + json.operation[i].AD_Id_Next + '€' + json.operation[i].AO_Name + '€' + json.operation[i].T_Id + '€' + json.operation[i].AO_AnotherName + '€' + json.operation[i].AO_ID + '" name="CB_ActivityOperation"  />';
                    if (json.operation[i].AO_AnotherName != "" && json.operation[i].AO_AnotherName != null)
                        operationHtml += "<span>&nbsp;" + json.operation[i].AO_AnotherName + "</span>" + "&nbsp;&nbsp;";
                    else operationHtml += "<span>&nbsp;" + json.operation[i].AO_Name + "</span>" + "&nbsp;&nbsp;";


                }
                operationHtml += "</div>";

                /////////////操作下的用户
                operationHtml += "<div id='operation_user_total' class='operation_user_total'></div>";


                var requireTime = "<div class=\"requireTime\">&nbsp;&nbsp;办结时间：<input id=\"WI_RequireEndTime\" type=\"text\" name=\"WI_RequireEndTime\" class=\"Wdate\"  onFocus=\"WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/></div>";
                //写死的重点项目
                if (getParam("pd_id") == "4ba5d989-6d7c-476e-8806-5f4618d70ce6") {
                    requireTime = "<div class=\"requireTime\" style=\"display:none;\">&nbsp;&nbsp;办结时间：<input id=\"WI_RequireEndTime\" type=\"text\" name=\"WI_RequireEndTime\" class=\"Wdate\"  onFocus=\"WdatePicker({minDate:'%y-%M-%d',dateFmt:'yyyy-MM-dd HH:mm:ss'})\"/></div>";
                    $(".title").hide();
                }

                innerhtml += '<div style="margin:5px 0px 0px 0px; width:' + (BodyWidth + 12).toString() + 'px;"><div class="nbpm_title"><span class="span1">办理表单</span></div><div class="contentBorderNoTop">' + operationHtml + requireTime + '<table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:5px;" >';

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

                    if (json.base[0].config[i].type != "编辑器") {
                        controlStr += json.base[0].config[i].Important == true ? '<span style="color:red;">*</span>' : '';
                        // alert(111);
                    }

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
                //            innerhtml += '<input style="float:left;" type="button" onclick="window.location.href=\'MyTasks.aspx\'" class="BigButton" value="返回" /></div></td></tr>';

                innerhtml += '</table></div></div>';



                foothtml += '<div style="margin-left:' + (BodyWidth / 2 - 120) + 'px;margin-top:5px;">';
                //  if ($("#OperatType").val() == "add" || $("#OperatType").val() == "update") {
                foothtml += '<input style="float:left;"  type="button" onclick="save()" class="BigButton" value="保存" />';
                // }
                // foothtml += '<input style="float:left;" type="button" onclick="window.location.href=\'MyTasks.aspx\'" class="BigButton" value="返回" /></div>';
                foothtml += '<input style="float:left;" type="button" onclick="history.go(backIndex);" class="BigButton" value="返回" /></div><br /><br />';
                $('#main').append(innerhtml);
                //*************追加"操作"***************
                //                var operationHtml = '操作选择：';
                //                for (var i = 0; i < json.operation.length; i++) {
                //                    //checkbox中的值是NBPM_ActivityOperation表的字段AO_TableName€AO_Code€AO_IsBasic€PD_Id€AD_Id€AD_Id_Next
                //                    operationHtml += '<input  type="hidden" value="' + json.operation[i].AO_Code + '" name="hd_ActivityOperation" /><input  type="checkbox" value="' + json.operation[i].AO_TableName + '€' + json.operation[i].AO_Code + '€' + json.operation[i].AO_IsBasic + '€' + json.operation[i].PD_Id + '€' + json.operation[i].AD_Id + '€' + json.operation[i].AD_Id_Next + '€' + json.operation[i].AO_Name + '€' + json.operation[i].T_Id + '€' + json.operation[i].AO_AnotherName + '€' + json.operation[i].AO_ID + '" name="CB_ActivityOperation"  />';
                //                    if (json.operation[i].AO_AnotherName != "" && json.operation[i].AO_AnotherName != null)
                //                        operationHtml += "<span>" + json.operation[i].AO_AnotherName + "</span>" + "&nbsp;&nbsp;";
                //                    else operationHtml += "<span>" + json.operation[i].AO_Name + "</span>" + "&nbsp;&nbsp;";


                //                }
                //                operationHtml += "";
                // $("#operation_div").html(operationHtml);

                //此句控制动态操作表格的宽度
                //   $(".operation").attr("style", "width:" + (BodyWidth + 10).toString() + "px;");

                var CB_ActivityOperation = $("input[name='CB_ActivityOperation']");
                //单击勾选事件
                CB_ActivityOperation.each(function (index) {
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
                                //   window.location.href = "#bottom_a_maodian";

                            });
                            //div显示出来
                            $(item_all[index]).attr("class", "item_div1");
                            //显示用户
                            var operation_user_childs = operation_user_total.children();


                            // $(operation_user_childs[index]).show();


                            //ajax可以在这里结束
                            //判空，只加载一次
                            if ($(item_all[index]).html() == "") {
                                $.ajax({
                                    type: "post",
                                    url: "../handler/NBPM_Handler.ashx/getOperationConfig?tablename=" + $(this).val().split('€')[0] + "&AD_ID=" + $(this).val().split('€')[5], //取得checkbox的value值的第一个值
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

                                            if (json_operation.info != "该操作没有配置表单，您可以在节点配置中配置完整！")
                                                jAlert(json_operation.info, "错误提示", function (r) { });
                                        }
                                        else {
                                            //所有的操作表的html控件命名前面都加"操作名"+"operation_"
                                            // var operationINNERHTML = '<table class="TableBlock" width="100%" >';

                                            var operationINNERHTML = '<table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:5px;" >';
                                            // innerhtml += '<div style="margin:5px 0px 5px 0px; background-color:#176BA9; border: 1px solid #176BA9;width:' + (BodyWidth + 10).toString() + 'px;"><div class="nbpm_title"><span>办理表单</span></div><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:5px;border:0px;" >';
                                            controlCount = 0;
                                            for (var i = 0; i < json_operation.base[0].config.length; i++) {
                                                var controlStr = "";
                                                /*此处的120是要减去label的120宽度，2是每个td有个padding默认是1px;*/
                                                var Controlwidth = json_operation.base[0].config[i].Important == true ? (BodyWidth * json_operation.base[0].config[i].width - 130 - importantWidth) : (BodyWidth * json_operation.base[0].config[i].width - 120 - 2);
                                                //  alert(BodyWidth * json_operation.base[0].config[i].width - 130);
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
                                                    createChoose(type[0], type[1], type[2], type[3], type[4], type[5], type[6], type[7]);
                                                }
                                            }
                                            /*特殊控件再次确认个数*/
                                            controlIDs_FirstNum = controlIDs.length;
                                            /*锚点定位到底部*/
                                            //window.location.href = "#bottom_a_maodian";
                                            /*定位了锚点，返回就要多返回一次*/
                                            backIndex = backIndex - 1;

                                        }
                                        // alert($(operation_user_childs[index]).find("input").length);
                                        // $(operation_user_childs[index])
                                        if ($(operation_user_childs[index]).find("input").length > 1) $(operation_user_childs[index]).show();
                                        if ($(operation_user_childs[index]).find("input").length == 1) {
                                            //Hidden_User_
                                            // alert(json_operation.users + "111");
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
                                // window.location.href = "#bottom_a_maodian";
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
                            // window.location.href = "#bottom_a_maodian";
                        }
                    });
                });




                $('#foot_div').append(foothtml);

                var operationBasicHTML = "";
                for (var i = 0; i < json.operationBasic.length; i++) {
                    //json.operation[i].AO_TableName + '€' + json.operation[i].AO_Code + '€' + json.operation[i].AO_IsBasic + '€' + json.operation[i].PD_Id + '€' + json.operation[i].AD_Id + '€' + json.operation[i].AD_Id_Next + '€' + json.operation[i].AO_Name + '€' + json.operation[i].T_Id + '€' + json.operation[i].AO_AnotherName + '€' + json.operation[i].AO_ID

                    if (json.operationBasic[i].AO_AnotherName != "" && json.operationBasic[i].AO_AnotherName != null) {
                        if (json.operationBasic[i].AO_Code == "BACK")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /><input type=\"button\" value=\"" + json.operationBasic[i].AO_AnotherName + "\" class=\"buttonOperation\" onclick=\"operationBasic_BACK_FeedBack(this)\" />";
                    }
                    else {
                        if (json.operationBasic[i].AO_Code == "BACK")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /><input type=\"button\" value=\"" + json.operationBasic[i].AO_Name + "\" class=\"buttonOperation\"  onclick=\"operationBasic_BACK_FeedBack(this)\" />";

                    }
                    if (json.operationBasic[i].AO_AnotherName != "" && json.operationBasic[i].AO_AnotherName != null) {
                        if (json.operationBasic[i].AO_Code == "FeedBack")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /> <input type=\"button\" value=\"" + json.operationBasic[i].AO_AnotherName + "\" class=\"buttonOperation\" onclick=\"operationBasic_BACK_FeedBack(this)\" />";
                    }
                    else {
                        if (json.operationBasic[i].AO_Code == "FeedBack")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /> <input type=\"button\" value=\"" + json.operationBasic[i].AO_Name + "\" class=\"buttonOperation\"  onclick=\"operationBasic_BACK_FeedBack(this)\" />";

                    }

                }
                $("#operationBasic_div").append(operationBasicHTML);
                //  alert(json.operationBasic.length);


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

                jQuery("#stable_form").validationEngine({ promptPosition: "bottomLeft" });
                //    第一次加载完成后，特殊控件的个数
                controlIDs_FirstNum = controlIDs.length;

                /*加载办理表格结束*/




                /*加载反馈信息数据*/
                make_FeedBack(json);

            }
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
        //  // alert($('#stable_form').serialize());
        $.ajax({
            type: "post",
            url: "../handler/NBPM_Handler.ashx/SaveDealTaskData",
            data: encodeURI($('#stable_form').serialize()),
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
                            // $.unblockUI();
                            // window.location.href = 'StartList.aspx';
                            //  history.go(-1);

                            if (getParam("DealPage") == "true") window.location.href = 'NBPM_DealPage.aspx?pd_id=' + getParam('pd_id');
                            else window.location.href = 'MyTasks.aspx';

                            // window.location.href = 'NBPM_DealPage.aspx?pd_id=' + getParam('pd_id');
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


/*必须使用iframe，基本操作:退回、基本操作:反馈*/
function operationBasic_BACK_FeedBack(obj) {

    var hidden_obj = $(obj).prev();
    var width_operationBasic = 0.6;
    var operationBasicBodyWidth = $(window).width() * width_operationBasic;



    var indexValue = $("input[name='operationBasic_hidden']").index(hidden_obj);


    // alert(hidden_obj.val().replace(/\€/gi, ','));

    $.blockUI({
        // iframe的src传递button对应的hidden的name和hidden的索引
        message: '<iframe  frameborder="0" scrolling="no" src="DealTaskOperationBasic.aspx?hidden_name=operationBasic_hidden&index=' + indexValue + '" style="width:' + operationBasicBodyWidth + 'px;height:500px;"></iframe>',

        css: {
            width: operationBasicBodyWidth,
            top: ($(window).height() - 500) / 2 + 'px',
            left: ($(window).width() * (1 - width_operationBasic)) / 2 + 'px'
        },
        // onOverlayClick: $.unblockUI(), //点击遮盖层自动关闭
        overlayCSS: { cursor: 'pointer'
        }
    });
    // $('.blockOverlay').attr('title', '点击自动关闭').click($.unblockUI);

}








//展开 收缩
function hiddenDetails(obj) {
    $(obj).parent().nextAll().slideUp("fast");
    $(obj).next().show();
    $(obj).hide();
}
function showDetails(obj) {
    $(obj).parent().nextAll().slideDown("fast");
    $(obj).prev().show();
    $(obj).hide();
}



function changeTab(obj) {
    var parent_li = $(obj).parent();
    var parent_divs = parent_li.children();
    var parent_nexts = parent_li.nextAll();
    var flag = parent_divs.index(obj);
    parent_divs.each(function (index) {
        if (index == flag) {
            $(this).attr("class", "title_bg");
        }
        else {

            if ($(this).attr("class") != "buttons")
                $(this).attr("class", "title");
        }
    });
    parent_nexts.each(function (index) {
        if (index == flag) {
            $(this).attr("style", "display: block;");
        }
        else $(this).attr("style", "display: none;");
    });
}