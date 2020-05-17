$(function(){    
	function layout()
	{
		var m_height=$(window).height()-$('.col_top').height()-$('.foot').height();
		if(!common.checkIEVersion()){
			m_height = parent.$('#p_notice').height();
		}
		$('.menu').height(m_height);
		$('.main').height(m_height);
		$('.main').height(Math.floor($('.main').height()*0.82));
		$('.one_main').height($('.main').height());
		$('.onetab').height($('.one_main').height());
		$('.one_kuang').height($('.onetab').height()-$('.m_tab').height()-6);
		$('.slider').width(302+'px');
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
		$('.j_list li').css('line-height',$('.j_list li').height()-2+'px');	
		$('.jl_list li').height($('.j_list li').height());
		$('.jl_list li').css('line-height',$('.j_list li').css('line-height'));	
		
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
function toNoticeDetail(id){
	 common.openWindow('查看通知公告', 'noticeAction_toViewNoticeIndex?id='+id, 780, 500);
}