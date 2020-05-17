; String.format = function() {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
};

; (function($) {
    $.fn.extend({
        updateSortNum: function() {
            var rownum = 1;
            $.each($("td.rownum", this), function(i, n) {
                $(n).text(rownum++);
            });
        },
        getRowObj: function() {//tr get the row object
            var obj = {};
            $(":[property]", this).each(function() {
                //get value
                var property = $(this).attr("property");
                var v = $(this).getValue();
                obj[property] = v;
            });
            return obj;
        }
        ,
        getTableObj: function() {//get the all table object
            var arr = new Array();
            $("tbody tr", this).each(function() {
                var obj = $(this).getRowObj();
                arr.push(obj);
            });
            return arr;
        }
        ,
        getValue: function() {
            var v = "";
            var property = $(this).attr("property");
            if (property != "") {
                if ($(this).is("input:checkbox")) {//checkbox only first input
                    var cv = new Array();
                    $(":checked", $(this).parent()).each(function() {
                        cv.push($(this).val());
                    });
                    v = cv.join(",");
                } else if ($(this).is("input:radio")) {//radio only first input
                    var grounp = $(this).attr("name");
                    v = $(String.format("input:[name='{0}']:checked", grounp), $(this).parent()).val();
                    if (v == undefined) {
                        v = "";
                    }
                }
                else if (this[0].tagName.toLowerCase() == "input" || this[0].tagName.toLowerCase() == "textarea") {
                    v = $(this).val();
                } else if (this[0].tagName.toLowerCase() == "select") {
                    v = $("option:selected", this).val();
                    if (v = "") {
                        v = $("option:selected", this).text();
                    }
                } else if (this[0].tagName.toLowerCase() == "label" || this[0].tagName.toLowerCase() == "td") {
                    v = $(this).text();
                }
            }
            return v;
        }
        ,
        getSource: function(opts) {
            //"property"
            var defaults = {
                item: "item",
                root: "root",
                saveSelector: ""
            };
            opts = $.extend(defaults, opts);
            var host = this;
            var source = "";
            $("tbody tr", this).each(function() {
                var item = "";
                var $tr = this;
                $(":[property]", $tr).each(function() {
                    //get value
                    var property = $(this).attr("property");
                    var v = $(this).getValue();
                    item += String.format(" {0}='{1}' ", property, v);
                });
                source += String.format("<{1} {0}/>", item, opts.item);
            });
            source = String.format("<{0}>{1}</{0}>", opts.root, source)
            if (opts.saveSelector != "") {
                $(opts.saveSelector).val(source);
            }
            return source;
        },
        getJson: function(opts) {
              var continents = new Array(); 
              $("tbody tr", this).each(function() {
                    var item = "{";
                    var $tr = this;
                    $(":[property]", $tr).each(function() {
                        //get value
                        var property = $(this).attr("property");
                        var v = $(this).getValue();
                        item += String.format(" {0}:'{1}', ", property, v);
                    });
                    item += "}";
                    continents.push(item);
                    //source += String.format("<{1} {0}/>", item, opts.item);
              });

              return $.toJSON(continents);
        },
        updateCalculates: function(Calculates) {
            var host = this;
            $.each(Calculates, function(i, o) {
                if (o.selector != "") {
                    if ($(String.format(":[property='{0}']", o.column), host).length > 0) {
                        $(String.format(":[property='{0}']", o.column), host).trigger("change"); //set sum value;
                    } else {
                        $(o.selector).val(0).trigger("change");
                    }
                }
            })//Calculates
        },
        dynamicTable: function(options) {
            //参数和默认值
            var defaults = {
                addTrigger: "",
                removeTrigger: [], //selector,handler
                rowTemplate: "",
                addPosition: "last",
                Calculates: [], //selector,column,func(max,min,sum,count,avg,customer)
                CalculatesColumn: []
            };
            var host = this;
            var uniqueidentity = 0;
            var options = $.extend(defaults, options);
            if (options.addTrigger != "") {
                $(options.addTrigger).css("cursor", "hand");
                $(options.addTrigger).live("click", function() {
                var len = $("tbody tr", host).length; //unique index for unique requiretment;
                var rowTemplate = String.format(options.rowTemplate, uniqueidentity++);
                    if (options.addPosition == "last") {                        
                        $(rowTemplate).appendTo($("tbody", host));
                    }
                    else {
                        if (len < 1) {
                            $(rowTemplate).appendTo($("tbody", host));
                        }
                        else {
                            if (options.addPosition == "first") {
                                $(rowTemplate).insertBefore($("tbody tr:eq(" + (0) + ")", host)).end();
                            } else if (options.addPosition > 0) {
                                $(rowTemplate).insertBefore($("tbody tr:eq(" + (options.addPosition - 1) + ")", host)).end();
                            }
                            else if (options.addPosition < 0) {
                                var position = len + options.addPosition;
                                $(rowTemplate).insertBefore($("tbody tr:eq(" + (position) + ")", host)).end();
                            }
                        }
                    }
                    $(host).updateSortNum();
                    $(host).updateCalculates(options.Calculates); //更新计算
                    //update sort num;
                })
            } //add
            if (options.removeTrigger.length > 0) {
                $.each(options.removeTrigger, function(i, n) {
                    if (n.selector != undefined) {
                        $(n.selector).css("cursor", "hand");
                        $(n.selector).live("click", function() {
                            var len = $("tbody tr", host).length;
                            if (n.handler == "first") {
                                $("tbody tr:not([fixed=true]):first", host).remove();
                            } else if (n.handler == "last") {
                            $("tbody tr:not([fixed=true]):last", host).remove();
                            }
                            else if (n.handler == "current") {
                                $(n.selector, host).removeClass("selected");
                                $(this).addClass("selected");
                                var t = $("tbody tr:not([fixed=true]):has(.selected)", host);
                                t.not(":[fixed=true]").remove();
                            } else if (n.handler > 0) {
                                $("tbody tr:eq(" + (n.handler - 1) + ")", host).not(":[fixed=true]").remove();
                            }
                            else if (n.handler < 0) {
                                var position = len + n.handler;
                                $("tbody tr:eq(" + (position - 1) + ")", host).not(":[fixed=true]").remove();
                            }
                            $(host).updateSortNum();
                            $(host).updateCalculates(options.Calculates); //更新计算                           
                            //update sort num;
                        })
                    }
                }); //each
            } //remove

            $(this).updateCalculates(options.Calculates); //更新计算
            //sum ,avg
            $.each(options.Calculates, function(i, o) {
                if (o.selector != undefined && o.selector != "") {
                    $(String.format(":[property='{0}']", o.column), host).live("change", function() {
                        var vs = new Array();
                        $(String.format(":[property='{0}']", o.column), host).each(function() {
                            try {
                                var v = parseFloat($(this).val());
                                if (!isNaN(v)) {
                                    vs.push(v);
                                }
                            } catch (e) {
                            }
                        }); //sum
                        var v = 0;
                        if (vs.length > 0) {
                            if (typeof o.func == "function") { //customer;
                                v = o.func(vs);
                            } else
                                if (o.func.toLowerCase() == "max") {
                                v = vs.sort(function compare(a, b) { return a - b; }).reverse()[0];
                            } else if (o.func.toLowerCase() == "min") {
                                v = vs.sort(function compare(a, b) { return a - b; })[0];
                            } else if (o.func.toLowerCase() == "avg") {
                                var sum = 0;
                                for (var i in vs) {
                                    sum += vs[i];
                                }
                                v = sum / vs.length;
                            } else if (o.func.toLowerCase() == "sum") {
                                v = 0;
                                for (var i in vs) {
                                    v += vs[i];
                                }
                            } else if (o.func.toLowerCase() == "count") {
                                v = vs.length;
                            }

                        }
                        $(o.selector).val(v).trigger("change");
                    }).trigger("change"); //set sum value;
                }
            })//Calculates

            $.each(options.CalculatesColumn, function(i, o) {
               
                if (o.trigger != undefined && o.trigger != null && o.trigger.length > 0 && o.func != undefined && typeof o.func == "function") {
                    $.each(o.trigger, function(j, trigger) {
                        if (trigger != null && trigger != "") {
                            var selector = String.format(":[property='{0}']", trigger);
                            $(selector).live("change", function() {
                                $(selector, host).removeClass("CalculatesColumn");
                                $(this).addClass("CalculatesColumn");
                                var $tr = $("tbody tr:has(.CalculatesColumn)", host);
                                var columns = null;
                                if (o.column != undefined && o.column != "") {
                                    columns = $(String.format(":[property='{0}']", o.column), $tr);
                                }
                                if (columns != null && columns.length > 0) {
                                    o.func(columns[0], $($tr[0]).getRowObj());
                                    $(columns[0]).trigger("change");
                                } else {
                                    o.func($($tr[0]).getRowObj());
                                }
                            })
                        }

                    });
                }

            }); //CalculatesColumn
            $(host).updateSortNum();
        }
    });
})(jQuery);