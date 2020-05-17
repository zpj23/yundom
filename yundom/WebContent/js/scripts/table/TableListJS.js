$(document).ready(function ($) {
    $(function () {
        $.ajax({
            type: "get",
            url: "../handler/SysHandler.ashx",
            data: encodeURI("optype=TableViewConfig&tableid=" + $("#DF_TableID").val()),
            success: function (ret) {
                json = $.parseJSON(ret);
                var innerhtml = "";
                //var BodyWidth = document.body.clientWidth * 1; //0.98;
                innerhtml += '<div class=Title style="width:99%;margin-left:0px;">';
                for (var i = 0; i < json.search[0].config.length; i++) {
                    var controlStr = "";
                    switch (json.search[0].config[i].type) {
                        case "文本框":
                        case "文本域":
                            controlStr = json.search[0].config[i].label + '：<input type="text" style="width:100px;" id="' + json.search[0].config[i].name + '_search"/>';
                            break;
                        case "单选按钮":
                        case "复选按钮":
                        case "下拉框":
                            controlStr = json.search[0].config[i].label + '：<select  style="width:100px;" id="' + json.search[0].config[i].name + '_search" size="1"> '
                         //   var options = '<option value="">--请选择--</option>';
                            var options = '<option value=""> </option>';
                            var josnLink = $.parseJSON(json.search[0].config[i].link);
                            for (var m = 0; m < josnLink.length; m++) {
                                options += '<option value="' + josnLink[m].DDI_Code + '">' + josnLink[m].DDI_Name + '</option>';
                            }
                            controlStr += options + '</select>';
                            break;
                        case "数字框":
                            controlStr = json.search[0].config[i].label + '：<input  style="width:100px;" type="text" id="' + json.search[0].config[i].name + '_search"  onkeyup="if(isNaN(value))execCommand(\'undo\')" onafterpaste="if(isNaN(value))execCommand(\'undo\')"/>';
                            break;
                        case "日期控件":
                            controlStr = json.search[0].config[i].label + '：<input  style="width:100px;" class="Wdate" id="' + json.search[0].config[i].name + '_search" type="text" onclick="WdatePicker();" />';
                            break;
                        case "时间控件":
                            controlStr = json.search[0].config[i].label + '：<input  style="width:140px;" class="Wdate" id="' + json.search[0].config[i].name + '_search" type="text" onclick="WdatePicker({dateFmt:\'yyyy-MM-dd HH:mm:ss\',alwaysUseStartDate:true});" />';
                            break;
                    }
                    innerhtml += "<div style=\"float:left;height:22px; margin-left:3px;\">" + controlStr + "</div>";
                }
                if (json.search[0].config.length != 0) {
                    innerhtml += '<div style=\"float:left;height:22px; margin-left:10px;\"><input type="button" style="cursor:pointer;" onclick="search()" class="Query" value="" /></div>';
                    innerhtml += '</div>';
                }
                $('#searchDiv').append(innerhtml);
                if ($("#searchParam").val() != "") {
                    var paramStr = $("#searchParam").val();
                    for (var m = 0; m < paramStr.split('|').length; m++) {
                        $("#" + paramStr.split('|')[m].split('^')[0] + "_search").val(paramStr.split('|')[m].split('^')[1]);
                    }
                }
            }
        });
    });
});