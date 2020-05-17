/**************************   
**********************************************************************************************/

/**************************************************************
获取文本框的值并转换成Float类型返回
**************************************************************/
function $Float(el) {
    return Util.parseFloat($F(el));
}

/**************************************************************
获取文本框的值并转换成Integer类型返回
**************************************************************/
function $Integer(el) {
    return Util.parseInteger($F(el));
}

/**************************************************************
设置文本框的值
**************************************************************/
function $Set(el, value) {
    $(el).value = value;
}


/**************************************************************
工具类Util
**************************************************************/
var Util = {};

/**************************************************************
格式化字符串，使用方式类似java中的String.format()方法
**************************************************************/
Util.format = function (format) {
    var args = [];
    for (var i = 1; i < arguments.length; i++) {
        args.push(arguments[i]);
    }

    return format.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
}

/**************************************************************
判断字符串是否为空
**************************************************************/
Util.strIsEmpty = function (str) {
    return str == null || !str || typeof str == undefined || str == '';
}

/**************************************************************
将传入值转换成整数
**************************************************************/
Util.parseInteger = function (v) {
    if (typeof v == 'number') {
        return v;
    } else if (typeof v == 'string') {
        var ret = parseInt(v);

        if (isNaN(ret) || !isFinite(ret)) {
            return 0;
        }

        return ret;
    } else {
        return 0;
    }
}

/**************************************************************
将传入值转换成小数
**************************************************************/
Util.parseFloat = function (v) {
    if (typeof v == 'number') {
        return v;
    } else if (typeof v == 'string') {
        var ret = parseFloat(v);
        if (isNaN(ret) || !isFinite(ret)) {
            return 0;
        }

        return ret;
    } else {
        return 0;
    }
}

/**************************************************************
将传入值转换成小数,传入值可以是以逗号(,)分隔的数字，此方法将会过滤掉(,)
**************************************************************/
Util.parseDotFloat = function (v) {
    if (typeof v == 'number') {
        return v;
    } else if (typeof v == 'string') {
        v = v.replace(/[^\d|.]/g, '');
        v = parseFloat(v);

        if (isNan(v) || !isFinite(v)) {
            return 0
        }
        return ret;
    } else {
        return 0;
    }
}

/**************************************************************
添加事件
**************************************************************/
Util.addEventListener = function (element, event, handler, param) {
    param.scope = param.scope || element;

    if (typeof element == 'string') {
        element = $(element);
    }

    var h = function () {
        handler.call(param.scope, param);
    }

    if (element.attachEvent) {
        element.attachEvent('on' + event, h);

    } else if (element.addEventListener) {
        element.addEventListener(event, h, false);

    } else {
        element['on' + event] = h;
    }
}

/**************************************************************
检查标签值是否为空，当为空时提示

@param el {Element, string}检查的标签
@param msg {string}提示消息，当检查失败时提示
@return true检查通过，标签的值不空，false标签值为空 
**************************************************************/
Util.checkIsNotEmpty = function (el, msg) {
    if (typeof el == 'string') {
        el = $(el);
    }

    if (Util.strIsEmpty(el.value)) {
        alert(msg);
        if (!el.disabled) {
            el.focus();
            el.select();
        }
        return false;
    }
    return true;
}

/**************************************************************
字符串传换成date类型

@str {string}字符串格式表示的日期，格式为：yyyy-mm-dd
@return {Date}由str转换得到的Date对象
**************************************************************/
Util.str2date = function (str) {
    var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
    var dt;
    if (re.test(str)) {
        dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
    }
    return dt;
}

/**************************************************************
计算2个日期之间的天数

@day1 {Date}起始日期
@day2 {Date}结束日期
@return day2 - day1的天数差
**************************************************************/
Util.dayMinus = function (day1, day2) {
    var days = Math.floor((day2 - day1) / (1000 * 60 * 60 * 24));
    return days;
}

/**************************************************************
设置组合列表框选择项

@param combo 组合列表框
@param value 选择值
@param defaultIdx 默认选中项的序号
**************************************************************/
Util.setComboSelected = function (combo, value, defaultIdx) {
    if (typeof combo == 'string') {
        combo = $(combo);
    }


    var idx = defaultIdx;
    if (typeof defaultIdx == 'undefined') {
        idx = -1;
    }

    for (var i = 0, len = combo.options.length; i < len; ++i) {
        var v = combo.options[i].value;
        if (v == value) {
            idx = i;
            break;
        }
    }

    combo.selectedIndex = idx;
}

/**************************************************************
字符串转换成日期 
@param str {String}字符串格式的日期
@return {Date}由字符串转换成的日期
**************************************************************/
Util.str2date = function (str) {
    var re = /^(\d{4})\S(\d{1,2})\S(\d{1,2})$/;
    var dt;
    if (re.test(str)) {
        dt = new Date(RegExp.$1, RegExp.$2 - 1, RegExp.$3);
    }
    return dt;
}

/**************************************************************
计算2个日期间的天数差
 
@param day1 {Date}开始日期
@param day2 {Date}结束日期
@return 天数差
**************************************************************/
Util.dayInterval = function (day1, day2) {
    var days = Math.floor((day2 - day1) / (1000 * 60 * 60 * 24));
    return days;
}
 