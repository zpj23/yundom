$(document).ready(function () {




    $(".TableCss tr:odd").addClass("tr_odd"); //加奇行样式 
    $(".TableCss tr:even").addClass("tr_even");    //加偶行样式
    //为行元素加上鼠标移入和移出事件
    $(".TableCss tr").mouseover(function () {
        $(this).addClass("tr_onmouseover");        //加上样式
    }).mouseout(function () {
        $(this).removeClass("tr_onmouseover");        //去掉样式
    });


    //            $('#addBtn').bind('click', function () {
    //                new $.msgbox({
    //                    height: 600,
    //                    width: 600,
    //                    title: '提示',
    //                    content: '<iframe  frameborder="0" scrolling="no" src="../sys/NBPM_ProcessDefinitionAddEdit.aspx" style="width:100%;height:550px;"></iframe>',
    //                    // type: 'text',
    //                    closeIcon: 'image:../../images/close.gif',
    //                    onClose: function () {

    //                        //  window.location.href = "NBPM_ProcessDefinitionList.aspx";
    //                        window.location.reload();

    //                    }

    //                }).show();


    //            });


});
function edit(id) {
    new $.msgbox({
        height: 600,
        width: 600,
        title: '提示',
        content: '<iframe  frameborder="0" scrolling="no" src="../sys/NBPM_ProcessDefinitionAddEdit.aspx?id=' + id + '"' + ' style="width:100%;height:550px;"></iframe>',
        // type: 'text',
        closeIcon: 'image:../../images/close.gif',
        onClose: function () {
            window.location.reload();

        }

    }).show();

}
function checkall(obj) {
    //  var all = document.getElementsByName("id_CB");
    var all = $("input[name='id_CB']");
    // alert(all[0].checked);
    if (obj.checked) {
        // 全选
        all.each(function () {
            $(this).attr("checked", "true");
            // alert($(this).attr("checked"));

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
            value_id = value_id + $(this).val() + '€'; ;

    });
    $('#HiddenField_ids').val(value_id);
    // alert($('#<%= HiddenField_ids.ClientID %>').val());
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