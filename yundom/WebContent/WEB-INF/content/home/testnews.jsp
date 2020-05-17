<%@ page language="java" errorPage="/error.jsp" pageEncoding="UTF-8"%>
<%@ include file="/common/header.jsp"%>
<!DOCTYPE html>
<html>
<script type="text/javascript" src="js/sys/home/home.js"></script>
<link href="css/base.css" type="text/css" rel="stylesheet" />
<link href="css/blue.css" type="text/css" rel="stylesheet" />
<script src="js/jquery-1.10.1.min.js" type="text/javascript" ></script>
<script src="js/jquery.tab.js" type="text/javascript"></script>
<script src="js/common.js" type="text/javascript"></script>
<script src="js/errect.js" type="text/javascript"></script>
<script type="text/javascript" src="js/comm/common.js"></script>
<script type="text/javascript" src="js/comm/news.js"></script>
<link rel="stylesheet" type="text/css" href="js/EasyUI/EasyUI1.3.6/css/pannel.css" />
<style>
body{background-color:#fff;}
.one_kuang{ border:0px;}
.main{background:none;}
</style>
<script>

$(function(){    
	function layout()
	{
		//var m_height=$(window).height()-$('.col_top').height()-$('.foot').height();
		//$('.menu').height(m_height);
		//$('.main').height(m_height);
		/* $('.main').height(Math.floor($('.main').height()*0.82));   
		$('.one_main').height($('.main').height());
		$('.onetab').height($('.one_main').height());
		$('.one_kuang').height($('.onetab').height()-$('.m_tab').height()-6);
		$('.slider').width(266+'px');
		$('.slider').height($('.one_kuang').height()-6);
		
		$('.j_list').width($('.one_kuang').width()-$('.slider').width()-20);
		$('.slider .img_li').height($('.slider').height());
		$('.slider .img_li img').height($('.slider').height());
		$('.slider .img_li img').width($('.slider').width());
		$('.slider .pre').css('top',$('.slider').height()/2-25+'px');
		$('.slider .next').css('top',$('.slider').height()/2-25+'px');
		$('.img_li').css('left','-'+$('.slider').width()+'px');
		$('.j_list').height($('.one_kuang').height()-26);
		$('.j_list li').height(($('.j_list').height()-7)/8);
		$('.j_list li').css('line-height',$('.j_list li').height()-2+'px');	 */
		sh_span();
	}	
	layout();
	function sh_span()
	{
	   if($('.j_list').width()<391)
		   {
		  	 $('.j_list li span').hide();
		   }
	   else
		   {
		     $('.j_list li span').show();
		   }
	}
	
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
			var sdetay=5000;
			var auto=true;
			var hover='fouce';
			var parameter_s={hoverClass:hover,detay:sdetay,auto:auto};
			var trigger='click';
			var mothod={trigger:trigger}
			var slider=new window.effect.LimitlessImg();
			slider.start(json_slide,parameter_s);
	}
	
	$('.one_kuang').css('width','100%');
})
function a(id){
	Home.addTab4IframeChild("8220","查看快报", "icon-menudefault" ,"newsAction_toViewNews?index=1&newsid="+id ,"href",true);
}
function toNoticeDetail(id){
	 parent.common.openWindow('查看通知公告', 'noticeAction_toViewNoticeIndex?id='+id, 900, 700);
}

function b(id){
	Home.addTab4IframeChild("8221","查看表彰通报", "icon-menudefault" ,"noticeAction_toViewBztbIndex?isBztb=1&id="+id,"href",true);
}

function c(id){
	Home.addTab4IframeChild("8222","查看交流信息", "icon-menudefault" ,"bBSAction_feedBack?isView=1&isIndex=1&id="+id,"href",true);
}

function dealstr(val){
	var num =10;
	if(value.length>num){
		value = value.substring(0,num-2)+"...";
	}
	return val;
}
</script>
       <div id="maintt" class="easyui-tabs" border="false">   
	    <div title="维稳快报"  style="">
	           <div class="main" style="width: 99%;">  
				  <div class="one_main" style="width: 99%">
				    <div class="onetab fl" style="width: 100%">				      
				      <div class="one_kuang jQtabcontent" style="">
				        <div class="slider" >
				            <div class="img_li img_over" id="imgdiv">
					            <c:forEach items="${newslist}" var="a" varStatus="t">
					              <img src="${ a[7]}"  class="dan_over"/>
					            </c:forEach>                
				            </div>
				            <div class="txt_x">
				                <c:forEach items="${newslist}" var="a">
				                   <c:if test="${fn:length(a[1]) >10 }">				                   
					                 <p>${fn:substring(a[1],0,10)}...</p>
					               </c:if>
					               <c:if test="${fn:length(a[1]) <=10 }">				                   
					                 <p>${a[1]}</p>
					               </c:if>
					            </c:forEach>
				                <div></div>
				            </div>
				        </div>
				        <ul class="j_list" style="float:right;width:60%;margin-right:0px;">
				            <c:forEach items="${newslist}" var="a">
				              <li style="width:100%"><a href="javascript:a('${a[0]}')">
				              <c:if test="${fn:length(a[1]) >21}">				                   
					                 <p>${fn:substring(a[1],0,21)}...<span style="float:right;padding-right:20px;">${a[6]}</span></p>
					               </c:if>
					               <c:if test="${fn:length(a[1]) <=21 }">				                   
					                 <p>${a[1]}<span style="float:right;padding-right:20px;">${a[6]}</span></p>
					               </c:if>
				              </a></li>
				            </c:forEach>
				        </ul>
				      </div>				      
				    </div>    
				  </div>
				 </div> 
	    </div>
	      
	    <div title="表彰通报"  style="overflow:auto;padding:0px;">
	             <div class="main" style="width: 99%">  
				  <div class="one_main" style="width: 99%">
				    <div class="onetab fl" style="width: 99%">
				      
				      <div class="one_kuang jQtabcontent" style="width: 100%;">
				         <ul class=jl_list style="float:left;width: 100%">
				           <c:forEach items="${bztbList}" var="a">
				              <li style="border-bottom: 1px solid #E7E7E7;">
						    	<span style="float: right;margin-right:10px;">${fn:substring(a.createTime,0,10)}</span>
								  <a href="void(0);" onclick="b('${a.fileid}');return false;" style="width: 500px">${a.title}</a>
							  </li>
				            </c:forEach>
				        </ul>
				      </div>
				    </div>    
				  </div>
				 </div>
	    </div>
	    
<!-- 	    <div title="交流信息"  style="overflow:auto;padding:0px;">  -->
<!-- 	             <div class="main" style="width: 99%">   -->
<!-- 				  <div class="one_main" style="width: 99%"> -->
<!-- 				    <div class="onetab fl" style="width: 99%"> -->
				      
<!-- 				      <div class="one_kuang jQtabcontent" style="width: 100%;"> -->
<!-- 				         <ul class="jl_list" style="float:left;width: 100%"> -->
<%-- 				           <c:forEach items="${jyjlList}" var="a"> --%>
<%-- 				           <li style="width:100%"><a href="javascript:c('${a.id}')"> --%>
<%-- 				              <c:if test="${fn:length(a.name) >21}">				                    --%>
<%-- 					                 <p>${fn:substring(a.name,0,21)}...<span style="float:right;padding-right:20px;">${fn:substring(a.createTime,0,10)}</span></p> --%>
<%-- 					               </c:if> --%>
<%-- 					               <c:if test="${fn:length(a.name) <=21 }">				                    --%>
<%-- 					                 <p>${a.name}<span style="float:right;padding-right:20px;">${fn:substring(a.createTime,0,10)}</span></p> --%>
<%-- 					               </c:if> --%>
<!-- 				              </a></li> -->
<%-- 				            </c:forEach> --%>
<!-- 				        </ul> -->
<!-- 				      </div> -->
<!-- 				    </div>     -->
<!-- 				  </div> -->
<!-- 				 </div> -->
<!-- 	    </div> -->
	   
	   </div> 
	   </html>
	   
	   
	   
      



