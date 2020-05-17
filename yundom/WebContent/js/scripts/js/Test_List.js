$(document).ready(function () {






});
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