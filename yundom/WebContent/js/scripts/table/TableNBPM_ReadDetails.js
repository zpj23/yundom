//该页中已经使用的遍历变量有i,j,kk,m,n
var controlIDs = []; //特殊控件存放数组
var controlIDs_FirstNum = 0; //    第一次加载完成后，特殊控件的个数
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
        innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData_FeedBack[j].orginfo[0].O_Name + ' 用户：' + json.baseData_FeedBack[j].userinfo[0].UI_Name + ' 时间：' + json.baseData_FeedBack[j].data[0].AddDate + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div style="width:100%;border:1px solid #BCDCED; border-top:0px;padding-top:5px;"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
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
        url: "../handler/NBPM_Handler.ashx/Deal_getConfig?readonly=true&Pd_Id=" + getParam("Pd_Id") + "&PI_ID=" + getParam("PI_ID") + "&Ad_Id=" + getParam("Ad_Id") + "&AI_ID=" + getParam("AI_ID"), //取得checkbox的value值的第一个值
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
                    // var BodyWidth = document.body.clientWidth * 0.95;
                    //控制title的宽度
                    $("#title_table").attr("style", "width:" + (BodyWidth + 12).toString() + "px;");
                    // alert(BodyWidth);
                    // innerhtml += '主表<div><table class="TableBlock" width="95%" >';
                    var temp_div = $('<div style="margin:5px 0px 5px 0px;border: 0px solid #176BA9;width:' + (BodyWidth + 12).toString() + 'px;"></div>'); //最外层的div包住主表和附带的操作表

                    if (json.baseData[j].MainTable.length > 0) {
                        innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].MainTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].MainTable[0].userinfo[0].UI_Name + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div style="width:100%;border:1px solid #BCDCED; border-top:0px;padding-top:5px;"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
                        //读主数据表
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
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].MainTable[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '

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
                                    var array_all = '';
                                    if (Dynamic_value.indexOf('$') > -1)
                                        array_all = Dynamic_value.split('$')[0];
                                    var array = '';
                                    if (array_all.indexOf('€') > -1)
                                        array = array_all.split('€');
                                    controlStr = '<input type="hidden"  value="' + Dynamic_value + '"/>';
                                    // json.baseData[j].MainTable[0].config[i].name
                                    var options = '';
                                    //之后的下拉框
                                    var selectDataSource = json.baseData[j].MainTable[0].data[0][json.baseData[j].MainTable[0].config[i].name][0].selectDataSource;
                                    for (var p = 0; p < selectDataSource.length; p++) {

                                        // alert(selectDataSource[p].data.length);
                                        if (selectDataSource[p].data.length > 0) {
                                            controlStr += '<select disabled="disabled"' + (json.baseData[j].MainTable[0].config[i].Important == true ? 'class="validate[required]"' : '') + '  style="width:80px;" onchange="DynamicFunction(this)"> '

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
                        //                        innerhtml += '</table></div>';
                        //                        $("#div_old").append(innerhtml);
                        innerhtml += "</table>";
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
                        //  innerhtml += '<br />' + getOperationName(n) + '<div><table class="TableBlock" width="95%" >';
                        if (temp_div.html() == "")
                            innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].OperationTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].OperationTable[0].userinfo[0].UI_Name + ' 操作：' + getOperationName(json.baseData[j].OperationTable[n].data[0]['OL_ID']) + '</span><span class="hiddenDetails" onclick="hiddenDetails(this)">&nbsp;</span><span class="showDetails" onclick="showDetails(this)">&nbsp;</span></div><div style="width:100%;border:1px solid #BCDCED; border-top:0px;padding-top:5px;"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';
                        else innerhtml += '<div class="operation_title"><div class="div1">操作：' + getOperationName(json.baseData[j].OperationTable[n].data[0]['OL_ID']) + '</div></div><div style="width:100%;border:1px solid #BCDCED; border-top:0px;padding-top:5px;"><table class="TableBlock" width="' + BodyWidth.toString() + 'px" style="margin:0px 5px 5px 5px;" >';

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
                                        controlStr += '<div><div style="float:left;" ><input type="checkbox"  disabled="disabled" ' + (index_value > -1 ? ' checked=\"checked\"' : '') + ' value="' + josnLink[m].DDI_Code + '" /></div><div style="float:left;" > ' + josnLink[m].DDI_Name + '</div></div>';
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
                                    var options = '';
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
                        //                        innerhtml += '</table></div>';
                        //                        $("#div_old").append(innerhtml);
                        innerhtml += "</table>";
                        temp_div.append(innerhtml);
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
                            BodyWidth = document.body.clientWidth * 0.95;
                            //定义要返回的操作名字
                            var operationNames = "";
                            for (var o = 0; o < array_OL_ID_more.length; o++) {
                                operationNames += getOperationName(array_OL_ID_more[o]);
                                if (o != array_OL_ID_more.length - 1) operationNames += ",";
                            }
                            //alert(operationNames);
                            if (temp_div.html() == "")
                                innerhtml += '<div class="nbpm_title"><span class="span1">机构：' + json.baseData[j].OperationTable[0].orginfo[0].O_Name + ' 用户：' + json.baseData[j].OperationTable[0].userinfo[0].UI_Name + ' 操作：' + operationNames + '(暂无数据)</span></div>';
                            else innerhtml += '<div class="operation_title"><div class="div1" style="border-bottom:1px solid #C1DEEE; height:29px;">操作：' + operationNames + '(暂无数据)</div></div>';
                            temp_div.append(innerhtml);
                        }


                        //$("#div_old").append(temp_div);
                    }
                    $("#div_old").append(temp_div);
                }
                /*数据表格加载结束*/

                var operationBasicHTML = "";
                for (var i = 0; i < json.operationBasic.length; i++) {
                    //json.operation[i].AO_TableName + '€' + json.operation[i].AO_Code + '€' + json.operation[i].AO_IsBasic + '€' + json.operation[i].PD_Id + '€' + json.operation[i].AD_Id + '€' + json.operation[i].AD_Id_Next + '€' + json.operation[i].AO_Name + '€' + json.operation[i].T_Id + '€' + json.operation[i].AO_AnotherName + '€' + json.operation[i].AO_ID

                    if (json.operationBasic[i].AO_AnotherName != "" && json.operationBasic[i].AO_AnotherName != null) {
                        if (json.operationBasic[i].AO_Code == "FeedBack")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /> <input type=\"button\" value=\"" + json.operationBasic[i].AO_AnotherName + "\" class=\"buttonOperation\" onclick=\"operationBasic_BACK_FeedBack(this)\" />";
                    }
                    else {
                        if (json.operationBasic[i].AO_Code == "FeedBack")
                            operationBasicHTML += "<input name=\"operationBasic_hidden\"  type=\"hidden\" value=\"" + json.operationBasic[i].AO_TableName + '€' + json.operationBasic[i].AO_Code + '€' + json.operationBasic[i].AO_IsBasic + '€' + json.operationBasic[i].PD_Id + '€' + json.operationBasic[i].AD_Id + '€' + json.operationBasic[i].AD_Id_Next + '€' + json.operationBasic[i].AO_Name + '€' + json.operationBasic[i].T_Id + '€' + json.operationBasic[i].AO_AnotherName + '€' + json.operationBasic[i].AO_ID + "\" /> <input type=\"button\" value=\"" + json.operationBasic[i].AO_Name + "\" class=\"buttonOperation\"  onclick=\"operationBasic_BACK_FeedBack(this)\" />";

                    }

                }
                // alert(operationBasicHTML);
                operationBasicHTML += '<input type="button" onclick="history.go(-1);" class="buttonOperation" value="返回" style="float: right;margin-left:3px;" />';
                $("#operationBasic_div").append(operationBasicHTML);

                //写死的重点项目
                if (getParam("pd_id") == "4ba5d989-6d7c-476e-8806-5f4618d70ce6") {
                    $(".title").hide();
                }



                /*加载反馈信息数据*/
                make_FeedBack(json);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $.unblockUI(); jAlert("错误", "错误提示", function (r) { });

        }

    });





});


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
