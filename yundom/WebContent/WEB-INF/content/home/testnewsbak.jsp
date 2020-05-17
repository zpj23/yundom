<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">


<link href="css/base.css" type="text/css" rel="stylesheet" />
<link href="css/blue.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.10.1.min.js" type="text/javascript" ></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/jquery.easyui.min.js"></script>
<script type="text/javascript" src="js/EasyUI/EasyUI1.3.6/locale/easyui-lang-zh_CN.js"></script>
<script src="js/jquery.tab.js" type="text/javascript"></script>
<script src="js/common.js" type="text/javascript"></script>
<script src="js/errect.js" type="text/javascript"></script>
<script type="text/javascript" src="js/comm/common.js"></script>
<script>
$(function(){    
	function layout()
	{
		var m_height=$(window).height()-$('.col_top').height()-$('.foot').height();
		$('.menu').height(m_height);
		$('.main').height(m_height);
		$('.one_main').height(Math.floor(($('.main').height()-43)/2));
		$('.onetab').width(Math.floor(($('.one_main').width()-5)/2)).height($('.one_main').height());
		$('.one_kuang').height($('.onetab').height()-$('.m_tab').height()-1);
		$('.slider').width(($('.one_kuang').width()-12)*0.4);
		$('.slider').height($('.one_kuang').height()-6);
		$('.slider .img_li').height($('.slider').height());
		$('.slider .img_li img').height($('.slider').height());
		$('.slider .img_li img').width($('.slider').width());
		$('.slider .pre').css('top',$('.slider').height()/2-25+'px');
		$('.slider .next').css('top',$('.slider').height()/2-25+'px');
		$('.img_li').css('left','-'+$('.slider').width()+'px');
		$('.j_list').width(($('.one_kuang').width()-12)*0.58).height($('.one_kuang').height()-26);
		$('.j_list li').height(($('.j_list').height()-7)/8);
		$('.j_list li').css('line-height',$('.j_list li').height()-2+'px');		
		addEvent();
	}	
	layout();
	
	function addEvent()
	{
	  $('.onetab').tabBuild({currentClass:'fouce'});	 
	  imgplay();	 
	}
	function imgplay(){
	   var slideContent=$('.slider ');
			var slideText=$('.slider  .txt_x p');
			var slideImg=$('.slider  .img_li .dan_over');
			var slodehua=$('.slider  .img_li');
			var preBtn=$('.slider  .pre');
			var nextBtn=$('.slider  .next');
			var json_slide={slideContent:slideContent,slideText:slideText,slideImg:slideImg,slodehua:slodehua,preBtn:preBtn,nextBtn:nextBtn};
			var sdetay=3000;
			var auto=true;
			var hover='fouce';
			var parameter_s={hoverClass:hover,detay:sdetay,auto:auto};
			var trigger='click';
			var mothod={trigger:trigger}
			var slider=new window.effect.LimitlessImg();
			slider.start(json_slide,parameter_s);
	}	
})
function a(id){common.openWindow('查看新闻', "newsAction_toViewNews?index=1&newsid="+id, 800, 700);}
</script>


<div class="main">  
  <div class="one_main">
    <div class="onetab fl">
      <div class="m_tab">
      	<ul class="tab_ul">
          <li class="fouce jQtabmenu"><i class="notice"></i>新闻</li>
          <li class="ml10 jQtabmenu"><i class="wenjian "></i>文件通知</li>
        </ul>
      </div>
      <div class="one_kuang jQtabcontent" style="width:260">
        <div class="slider" >
            <div class="img_li img_over" id="imgdiv">
	            <c:forEach items="${newslist}" var="a" varStatus="t">
	              <img src="/myhappyform/uploadfileAction_viewImages?id=${a[4]}"  class="dan_over"/>
	            </c:forEach>                
            </div>
            <div class="txt_x">
                <c:forEach items="${newslist}" var="a">
	              <p>${a[3]}</p>
	            </c:forEach>
                <div></div>
            </div>
            <img src="images/b_p7.png"  width="32" height="50"  class="pre"/>
            <img src="images/b_p8.png"  width="32" height="50"  class="next"/>
        </div>
        <ul class="j_list">
            <c:forEach items="${newslist}" var="a">
              <li ><a href="javascript:a('${a[0]}')">${a[1]}</a></li>
            </c:forEach>
        </ul>
      </div>
      <div class="one_kuang jQtabcontent none" style="width:400">
         <ul class="j_list" style="float:left">
            <c:forEach items="${newslist}" var="a">
              <li ><a href="#">${a[1]}</a></li>
            </c:forEach>
        </ul>
      </div>
    </div>    
  </div>
 </div> 


