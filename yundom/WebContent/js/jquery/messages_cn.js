jQuery.extend(jQuery.validator.messages, {
        required: jQuery.validator.format("<br><font color='red'>{0}必须输入</font>"),
        remote: "请修正该字段",
        email: "{0}必须是正确格式的电子邮件格式",
        url: "{0}必须是合法的网址",
        date: "{0}请输入合法的日期",
        dateISO: "请输入合法的日期 (ISO).",
        number: "请输入合法的数字",
        digits: "只能输入整数",
        creditcard: "请输入合法的信用卡号",
        equalTo: jQuery.validator.format("<br><font color='red'>请再次输入相同的值</font>"),
        accept: "请输入拥有合法后缀名的字符串",
        maxlength: jQuery.validator.format("{1}请输入一个长度最多是 {0} 的字符串"),
        minlength: jQuery.validator.format("<br><font color='red'>请输入一个长度最少是 {0} 的字符串</font>"),
        rangelength: jQuery.validator.format("{2}请输入一个长度介于 {0} 和 {1} 之间的字符串"),
        range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
        max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
        maxNumber: jQuery.validator.format("输入的值不能大于{0}"),
        min: jQuery.validator.format("请输入一个最小为 {0} 的值"),
        nimei:jQuery.validator.format("<br><font color='red'>{0}必须输入</font>")
});

        

/* 电子邮件CHECK */
jQuery.validator.addMethod("email", function(value, element, param) {    
  return this.optional(element) || /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
}, jQuery.validator.format("<br><font color='red'>{0}必须是正确格式的电子邮件格式</font>"));

/* URL地址CHECK */
jQuery.validator.addMethod("url", function(value, element, param) {    
    return this.optional(element) || /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
}, jQuery.validator.format("<br><font color='red'>{0}必须是合法的网址</font>"));

/* 时间CHECK */
jQuery.validator.addMethod("date", function(value, element, param) {    
    return this.optional(element) || !/Invalid|NaN/.test(new Date(value));
}, jQuery.validator.format("<br><font color='red'>{0}必须是合法的日期</font>"));

/* 数字CHECK */
jQuery.validator.addMethod("number", function(value, element, param) {    
    return this.optional(element) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
}, jQuery.validator.format("<br><font color='red'>{0}必须是数字</font>"));

/* 整数CHECK */
jQuery.validator.addMethod("digits", function(value, element, param) {    
    return this.optional(element) || /^\d+$/.test(value);
}, jQuery.validator.format("<br><font color='red'>{0}必须是正整数</font>"));
/* 最大长度CHECK */
jQuery.validator.addMethod("rifmaxlength", function(value, element, param) {    
  return this.optional(element) || this.getLength($.trim(value), element) <= param[0];
}, jQuery.validator.format("<br><font color='red'>{1}长度最多是{0}个字符串</font>"));  

/* 最小长度CHECK */
jQuery.validator.addMethod("rifminlength", function(value, element, param) {    
  return this.optional(element) || this.getLength($.trim(value), element) >= param[0];
}, jQuery.validator.format("<br><font color='red'>{1}长度最少是{0}个字符串</font>"));  

/* 长度范围CHECK */
jQuery.validator.addMethod("myrangelength", function(value, element, param) {    
  var length = this.getLength($.trim(value), element);
  return this.optional(element) || ( length >= param[0] && length <= param[1] );
}, jQuery.validator.format("<br><font color='red'>{2}长度必须是介于 {0} 和 {1} 之间的字符串</font>"));
/* 起始时间小于结束时间CHECK */
jQuery.validator.addMethod("startLessEnd", function(value, element, param) {
  return this.optional(element) || ( value <= document.getElementById(param[0]).value);
}, jQuery.validator.format("<br><font color='red'>{1}必须早于{2}时间</font>"));

/* 起始时间晚于结束时间CHECK */
jQuery.validator.addMethod("startGreaterEnd", function(value, element, param) {
  return this.optional(element) || ( value >= document.getElementById(param[0]).value);
}, jQuery.validator.format("<br><font color='red'>{1}必须晚于{2}时间</font>"));

/* 正数CHECK */
jQuery.validator.addMethod("plus", function(value, element, param) {
    return this.optional(element) || /^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(value);
}, jQuery.validator.format("<br><font color='red'>{0}必须是正数</font>"));
/* 分配比例CHECK */
jQuery.validator.addMethod("perfor", function(value, element, param) {
	var temp = parseInt(value);
    return this.optional(element) || 100 > temp;
}, jQuery.validator.format("<br><font color='red'>{0}必须小于100</font>"));
/*最大值CHECK*/
jQuery.validator.addMethod("maxValue", function(value, element, param) {
    var temp = parseInt(value);
    var maxValue = parseInt(param[1]);
    return this.optional(element) || maxValue >= temp;
}, jQuery.validator.format("<br><font color='red'>{0}必须小于等于{1}</font>"));

/* 取得字节数 */
function getBytesCount(str) {
	if (str == null){
		return 0;
  	} else {
    	return (str.length + str.replace(/[\u0000-\u00ff]/g, "").length);
  	}
}


/*最大字节长度CHECK*/
jQuery.validator.addMethod("maxByteValue", function(value, element, param) {
    var temp = getBytesCount(value);
    var maxValue = parseInt(param[1]);
    return this.optional(element) || maxValue >= temp;
}, jQuery.validator.format("<br><font color='red'>{0}必须最大字节数必须小于等于{1}(1个汉字为两个字节)</font>"));


















