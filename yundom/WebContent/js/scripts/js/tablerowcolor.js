$(document).ready(function () {
    var tbody_table = document.getElementsByTagName("table");

    for (var j = 0; j < tbody_table.length; j++) {
        //alert(tbody_table[j].className)
        if (tbody_table[j].className == "TableList") {
            var tbody_tr = document.getElementsByTagName("tr");

            for (i = 1; i < tbody_tr.length + 1; i++) {
                tbody_tr[i - 1].className = (i % 2 > 0) ? "t1" : "t2";
            }

            for (var i = 0; i < tbody_tr.length; i++) {
                tbody_tr[i].onmouseover = function () {
                    this.tmpClass = this.className;
                    this.className = "t3";
                };
                tbody_tr[i].onmouseout = function () {
                    this.className = this.tmpClass;
                };
            }
        }
    }
});
