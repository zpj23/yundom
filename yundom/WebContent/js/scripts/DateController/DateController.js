/*
PandaDate日期控件，展示型
作者：可爱的小熊猫
*/
function PandaDate(){
this.Config={
drop:null,//空件放入的元素
specialdate:new Array(),//特别表示的日期
height:0,//外层高度，不足的地方将用空白方格补足(不可小于(lheight+1)*6+theight)
lwidth:42,//小方格宽度
lheight:33,//小方格高度
imgurl: "/scripts/DateController/images/", //控件图片路径
style:"",//附加样式
/*以下属性不可从外部修改*/
theight:70,//上部选择显示区域高度,不可改动
year:null,//存放年信息的对象
month:null,//存放月信息的对象
day:null//日对象存储区域ul对象
};
this.Create = function () {
    this.Config.width = (this.Config.lwidth + 1) * 7 - 1;
    var temp = (this.Config.lheight + 1) * 6 + this.Config.theight;
    if (this.Config.height < temp) {
        this.Config.height = temp;
    }
    temp = null;

    var config = this.Config;
    var date = new Date();
    var htmlarr = new Array();
    var pdf = new PandaDateFun();

    htmlarr.push("<div style='position:relative; width:" + config.width + "px; height:" + config.height + "px; border:1px solid #dddddd; -moz-border-radius:4px; -webkit-border-radius:4px; font-family:Arial,宋体; font-size:12px; overflow:hidden; " + config.style + "'>");
    /*顶部模块 begin*/
    htmlarr.push("<div style='width:100%; height:" + config.theight + "px; float:left; overflow:hidden; background-image:url(" + config.imgurl + "pd_2.gif);'>");
    //标题
    htmlarr.push("<div style='position:relative; width:100%; float:left; text-align:center; font-size:14px; padding:5px 0px;'>");
    htmlarr.push("<strong><span id='pandadate_year'>" + date.getUTCFullYear() + "</span>年</strong>");
    htmlarr.push("<div id='pandadate_greenclick' style='position:absolute; top:8px; right:10px; width:14px; height:14px; overflow:hidden; cursor:pointer; background:url(" + config.imgurl + "pd_3.gif)'></div>");
    htmlarr.push("</div>");
    //选择
    htmlarr.push("<div style='position:relative; width:100%; float:left; margin-top:3px;'>");
    htmlarr.push("<div id='pandadate_yearminus' style='position:absolute; width:14px; height:14px; left:10px; top:1px; overflow:hidden; cursor:pointer; background:url(" + config.imgurl + "pd_3.gif) 0px -42px;'></div>");
    htmlarr.push("<div id='pandadate_monthminus' style='position:absolute; width:14px; height:14px; left:34px; top:1px; overflow:hidden; cursor:pointer; background:url(" + config.imgurl + "pd_3.gif) 0px -15px;'></div>");
    htmlarr.push("<div id='pandadate_yearplus' style='position:absolute; width:14px; height:14px; right:10px; top:1px; overflow:hidden; cursor:pointer; background:url(" + config.imgurl + "pd_3.gif) 0px -56px;'></div>");
    htmlarr.push("<div id='pandadate_monthplus' style='position:absolute; width:14px; height:14px; right:34px; top:1px; overflow:hidden; cursor:pointer; background:url(" + config.imgurl + "pd_3.gif) 0px -28px;'></div>");
    htmlarr.push("<div></div><div style='width:100%; height:15px; line-height:15px; float:left; overflow:hidden; text-align:center;'><span id='pandadate_month'>" + pdf.CNmonth(date.getMonth() + 1) + "</span>月</div>");
    htmlarr.push("</div>");
    //星期
    htmlarr.push("<div style='width:" + (config.width + 1) + "px; float:left; margin-top:8px;'>")
    for (var i = 0; i <= 6; i++) {
        htmlarr.push("<div style='width:" + (config.lwidth + 1) + "px; float:left; text-align:center;'><strong>" + pdf.CNweek(i) + "</strong></div>");
    }
    htmlarr.push("</div>");

    htmlarr.push("</div>");
    /*顶部模块 end*/
    /*日历模块 begin*/
    htmlarr.push("<div style='width:100%; float:left;'><ul id='pandadate_day' style='width:" + (config.width + 1) + "px; float:left; list-style:none; margin:0px; padding:0px; background-image:url(" + config.imgurl + "pd_1.gif);'>");
    temp = Math.ceil((config.height - config.theight) / (config.lheight + 1));
    for (var i = 0; i < temp; i++) {
        for (var j = 0; j < 7; j++) {
            htmlarr.push("<li style='position:relative; width:" + config.lwidth + "px; height:" + config.lheight + "px; float:left; list-style:none; border-top:1px solid #dddddd; border-right:1px solid #dddddd; margin:0px; padding:0px; box-sizing:content-box; -webkit-box-sizing:content-box;'></li>");
        }
    }
    htmlarr.push("</ul></div>");
    /*日历模块 end*/
    htmlarr.push("</div>");
    //输出日历框架
    if (config.drop != null) {
        config.drop.innerHTML = htmlarr.join("");
    } else {
        document.write(htmlarr.join(""));
    }

    //必要对象赋值
    temp = document.getElementById("pandadate_year");
    temp.id = "";
    this.Config.year = temp;
    temp = document.getElementById("pandadate_month");
    temp.id = "";
    this.Config.month = temp;
    temp = document.getElementById("pandadate_day");
    temp.id = "";
    this.Config.day = temp;

    //绑定事件
    temp = document.getElementById("pandadate_greenclick");
    temp.id = "";
    temp.onclick = this.GreenClick;
    var temp = document.getElementById("pandadate_yearminus");
    temp.id = "";
    this.YearMinus(temp);
    var temp = document.getElementById("pandadate_yearplus");
    temp.id = "";
    this.YearPlus(temp);
    var temp = document.getElementById("pandadate_monthminus");
    temp.id = "";
    this.MonthMinus(temp);
    var temp = document.getElementById("pandadate_monthplus");
    temp.id = "";
    this.MonthPlus(temp);

    //生成日期
    pdf.SetDate(this, date.getFullYear(), date.getMonth() + 1);
};
this.YearMinus=function(element){
	var obj=this;
	var pdf=new PandaDateFun();
	element.onclick=function(){
		obj.Config.year.innerHTML=parseInt(obj.Config.year.innerHTML)-1;
		pdf.SetDate(obj,obj.Config.year.innerHTML,pdf.CNmonth(obj.Config.month.innerHTML,1));
	};
};
this.YearPlus=function(element){
	var obj=this;
	var pdf=new PandaDateFun();
	element.onclick=function(){
		obj.Config.year.innerHTML=parseInt(obj.Config.year.innerHTML)+1;
		pdf.SetDate(obj,obj.Config.year.innerHTML,pdf.CNmonth(obj.Config.month.innerHTML,1));
	};
};
this.MonthMinus=function(element){
	var obj=this;
	var pdf=new PandaDateFun();
	element.onclick=function(){
		var month=parseInt(pdf.CNmonth(obj.Config.month.innerHTML.toString(),1))-1;
		if(month>0 && month<13){
			obj.Config.month.innerHTML=pdf.CNmonth(month);
			pdf.SetDate(obj,obj.Config.year.innerHTML,month);
		}
	};
};
this.MonthPlus=function(element){
	var obj=this;
	var pdf=new PandaDateFun();
	element.onclick=function(){
		var month=parseInt(pdf.CNmonth(obj.Config.month.innerHTML.toString(),1))+1;
		if(month>0 && month<13){
			obj.Config.month.innerHTML=pdf.CNmonth(month);
			pdf.SetDate(obj,obj.Config.year.innerHTML,month);
		}
	};
};
this.GreenClick=function(){};
this.DateClick=function(){};
}
function PandaDateFun(){
//生成日期模组
this.SetDate=function(obj,year,month){
	var ndate=new Date();
	var date=new Date();
	date.setFullYear(year);
	date.setMonth(month-1);
	date.setDate(1);
	var days=this.GetDays(date);
	var list=obj.Config.day.getElementsByTagName("li")
	if(list.length>days){
		for(var i=0;i<list.length;i++){
			list[i].innerHTML="";
		}
		for(var i=date.getDay();i<days+date.getDay();i++){
			var element=document.createElement("div");
			var day=i-date.getDay()+1;
			element.style.cssText="position:absolute; width:100%; height:100%; line-height:"+obj.Config.lheight+"px; text-align:center; cursor:pointer; background:#ffffff;";
			element.innerHTML="<strong>"+day+"</strong>";
			list[i].appendChild(element);
			//创建日期点击事件
			this.CreDateClick(obj,element,day,month,year);
			//创建日期格效果
			if(day==ndate.getDate() && month-1==ndate.getMonth() && year==ndate.getFullYear()){
				element.style.backgroundColor="#d6f0f1";
			}else{
				element.onmouseover=function(){
				this.style.backgroundColor="#dddddd";
				};
				element.onmouseout=function(){
					this.style.backgroundColor="#ffffff";
				};
			}
			//如果设置特殊日期，则附加指定样式
			for(var j=0;j<obj.Config.specialdate.length;j++){
				if(year+"-"+month+"-"+day==this.DateLtoS(obj.Config.specialdate[j])){
					element.style.color="#00f";
					element.style.textDecoration="underline";
					break;
				}
			}
			element=null;day=null;
		}
	}else{
		alert("日期格数少与天数，日期生成失败！")
	}
};
//创建日期点击事件
this.CreDateClick=function(obj,element,day,month,year){
	if(window.attachEvent){
		element.attachEvent("onclick",function(){
			var pdf=new PandaDateFun();
			obj.DateClick(pdf.DateStoL(year+"-"+month+"-"+day));
			pdf=null;
		});
	}else{
		element.addEventListener("click",function(){
			var pdf=new PandaDateFun();
			obj.DateClick(pdf.DateStoL(year+"-"+month+"-"+day));
			pdf=null;
		},false);
	}
};
//获取传入日期的当月共有多少天
this.GetDays=function(date){
	var days=0;
	var year=date.getFullYear();
	var month=date.getMonth()+1;
	if(month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12){
		days=31;
	}else if(month==4 || month==6 || month==9 || month==11){
		days=30;
	}else if(month==2 && (year%400==0 || (year%100!=0 && year%4==0))){
		days=29
	}else{
		days=28;
	}
	return days;
};
//将长日期格式转换成短日期格式(如2012-01-01转为2010-1-1)
this.DateLtoS=function(date){
	try{
		var arr=date.split("-");
		return arr[0]+"-"+(arr[1].substring(0,1)==0?arr[1].substring(1,arr[1].length):arr[1])+"-"+(arr[2].substring(0,1)==0?arr[2].substring(1,arr[2].length):arr[2]);
	}catch(e){alert("错误的转换日期格式")}
};
//将短日期格式转换成长日期格式(如2012-1-1转为2010-01-01)
this.DateStoL=function(date){
	try{
		var arr=date.split("-");
		return arr[0]+"-"+(arr[1].length==1?"0"+arr[1]:arr[1])+"-"+(arr[2].length==1?"0"+arr[2]:arr[2])
	}catch(e){alert("错误的转换日期格式")}
};
//星期的中文转换
this.CNweek=function(num){
	var t=null;
	switch(num){
	case 0: t="日"; break;
	case 1: t="一"; break;
	case 2: t="二"; break;
	case 3: t="三"; break;
	case 4: t="四"; break;
	case 5: t="五"; break;
	case 6: t="六"; break;
	}
	return t;
};
//月的中文数字转换
this.CNmonth=function(num,type){
	var t=null;
	if(type==1){
		switch(num){
		case "一": t=1; break;
		case "二": t=2; break;
		case "三": t=3; break;
		case "四": t=4; break;
		case "五": t=5; break;
		case "六": t=6; break;
		case "七": t=7; break;
		case "八": t=8; break;
		case "九": t=9; break;
		case "十": t=10; break;
		case "十一": t=11; break;
		case "十二": t=12; break;
		}
	}else{
		switch(num){
		case 1: t="一"; break;
		case 2: t="二"; break;
		case 3: t="三"; break;
		case 4: t="四"; break;
		case 5: t="五"; break;
		case 6: t="六"; break;
		case 7: t="七"; break;
		case 8: t="八"; break;
		case 9: t="九"; break;
		case 10: t="十"; break;
		case 11: t="十一"; break;
		case 12: t="十二"; break;
		}
	}
	return t;
};

}