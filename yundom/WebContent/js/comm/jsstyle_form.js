window.onresize=function(){
			kuandu();kuandu();
		}
		window.onload=function(){
			kuandu();kuandu();
		}
		
		//计算内页左右部分宽度
	function kuandu(){
		var LeftConter=document.getElementById("LeftConter");
		var RightConter=document.getElementById("RightConter");
		var TableList=document.getElementById("TableList");
		var TableListMain=document.getElementById("TableListMain");
		RightConter.style.width=document.body.offsetWidth-LeftConter.offsetWidth+"px";
		TableListMain.style.height=document.body.offsetHeight-110+"px";
	}
	
	
	//动态给js添加class属性
	function addClass(element, value) {
	    if(!element.className) {
	        element.className = value; //如果element本身不存在class,则直接添加class为value的值
	    } else {
	        element.className += " "+value; //如果element之前有一个class值，注意中间要多一个空格,然后再加上value的值
	    }
	}
	//隔行换色
	function stripeTable() {
	    var tables = document.getElementsByTagName("table"); //遍历文档中的所有table
	    for(var i=0; i<tables.length; i++) {
	        var rows = document.getElementsByTagName("tr");
	        for(var j=0; j<rows.length; j++) {
	            if(j%2 == 0) {
	                addClass(rows[j], "t2"); //如是偶数行，则添加class为odd的属性
	            }
	        }
	    }
	}
	//鼠标经过时高亮
	function highlightRows() {
	    var rows = document.getElementsByTagName("tr");
	    for(var i=0; i<rows.length; i++) {
	        rows[i].oldClassName = rows[i].className; //首先保存之前的class值
	        rows[i].onmouseover = function() {
	            addClass(this, "t3"); //鼠标经过时添加class为highlight的值
	        }
	        rows[i].onmouseout = function() {
	            this.className = this.oldClassName; //鼠标离开时还原之前的class值
	        }
	    }
	}
	
	$().ready(function (){
		var LeftConter=document.getElementById("LeftConter");
		var RightConter=document.getElementById("RightConter");
		var FormMain=document.getElementById("FormMain");
		RightConter.style.width=document.body.offsetWidth-LeftConter.offsetWidth+"px";
		FormMain.style.height=document.body.offsetHeight-50+"px";
		
		
	});