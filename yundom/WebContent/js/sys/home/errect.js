// JavaScript Document
window.effect = {
	//选项卡插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{ title: titleList, content: contentList }
	title:选项卡切换标题,
	content：选项卡切换主体内容,
	parameter：传递的参数,例如{hoverClass:hover_class}
	hoverClass:当前选中的选项卡样式,
	method   ：传递的方法，如{trigger:trigger}
	*/

	tab: function () {
		this.star = function (json, parameter, method) {
			var titleList = json.title;
			var contentList = json.content;
			var hover = parameter.hoverClass;
			if (titleList.length == contentList.length) {
				for (var i = 0; i < titleList.length; i++) {
					if (i == 0) {
						$(contentList[i]).show();
						$(titleList[i]).addClass(hover);
					}
					else {
						$(contentList[i]).hide();
					}
					(function (i) {
						$(titleList[i]).mouseover(function () {
							titleList.removeClass(hover);
							$(titleList[i]).addClass(hover);
							contentList.hide();
							$(contentList[i]).show();
						})
					} (i))
				}
			}
		}
	},
	//无缝滚动(连续)插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	method   ：传递的方法
	JSON各字段命名如下：例如{div_One:demoOne}
	div_One:包含数据对象的容器,
	div_Two：复制数据对象的容器,
	div_Content：最外层容器包含数据与复制数据容器,
	parameter：传递的参数 例如{hoverClass:hover_class}
	div_speed:滚动速度,
	r_type:滚动方向,  up:代表向上;left:代表向左;right:代表向右;down:代表向下;
	*/
	rolling: function () {
		this.start = function (json, parameter, method) {
			var speed = parameter.div_speed;
			var d_type = parameter.r_type;
			var divOne = json.div_One;
			var divTwo = json.div_Two;
			var divContent = json.div_Content;

			if(d_type=="left"||d_type=="right")
			{
				/*判断不是TABLE布局的滑动*/
				if(json.demoWidth)
				{
					var divWidth=json.demoWidth;
					if(json.n_conTent){
						var widthall=0;
						/*如果不是TABLE布局，获取每个单元的宽度,例如LI*/
						json.n_conTent.each(function(e){
		                 widthall+=$(this).innerWidth();
						})
						divOne.width(widthall);
					}
				}
				if (divOne.innerWidth() > divContent.innerWidth())
				    { 
				    	divWidth.width(widthall*2);
				    	divTwo.html(divOne.html()); 
				    }
				else 
					{ return false; }
			}
			else
				{ divTwo.html(divOne.html()); }
			
			switch (d_type) {
				case "up":
					function rollMarqueeUP() {
						if (divContent.scrollTop() >= divOne.height())
							divContent.scrollTop(0);
						else {
							divContent.scrollTop(divContent.scrollTop() + 1);
						}
					}
					var MyMarRollUp = setInterval(rollMarqueeUP, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarRollUp);
					})
					divContent.mouseout(function () {
						MyMarRollUp = setInterval(rollMarqueeUP, speed);
					})
					break;
				case "left":
					function RollMarqueeLeft() {
						if (divOne.width() <= divContent.scrollLeft()) {
							divContent.scrollLeft(divContent.scrollLeft() - divOne.width());
						}
						else {
							divContent.scrollLeft(divContent.scrollLeft() + 1);
						}
					}
					var RollMyMarLeft = setInterval(RollMarqueeLeft, speed)
					divContent.mouseover(function () {
						clearInterval(RollMyMarLeft);
					})
					divContent.mouseout(function () {
						RollMyMarLeft = setInterval(RollMarqueeLeft, speed);
					})
					break;
				case "right":
					function RollMarqueeRight() {
						if (divContent.scrollLeft() <= 0) {
							divContent.scrollLeft(divContent.scrollLeft() + divOne.width());
						}
						else {
							divContent.scrollLeft(divContent.scrollLeft() - 1);
						}
					}
					var RollMyMarRight = setInterval(RollMarqueeRight, speed)
					divContent.mouseover(function () {
						clearInterval(RollMyMarRight);
					})
					divContent.mouseout(function () {
						RollMyMarRight = setInterval(RollMarqueeRight, speed);
					})
					break;
				case "down":
					divContent.scrollTop(divContent[0].scrollHeight);
					
					function RollMarqueeDown() {
						if (divOne[0].offsetTop - divContent.scrollTop() >= 0) {
							divContent.scrollTop(divContent.scrollTop() + divOne.height());
						}
						else {
							divContent.scrollTop(divContent.scrollTop() - 1);
						}
					}
					var RollMyMarDown = setInterval(RollMarqueeDown, speed)
					divContent.mouseover(function () {
						clearInterval(RollMyMarDown);
					})
					divContent.mouseout(function () {
						RollMyMarDown = setInterval(RollMarqueeDown, speed);
					});
					break;
				default: break;
			}
		}
	},
	//无缝滚动(单模块移动)插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	div_One:包含数据对象的容器,
	div_Two：复制数据对象的容器,
	div_Content：最外层容器包含数据与复制数据容器,
	parameter：传递的参数 例如{hoverClass:hover_class}
	div_speed:滚动速度,
	r_type:滚动方向,  up:代表向上;left:代表向左;right:代表向右;down:代表向下;
	*/
	stepRolling: function () {
		this.start = function (json, parameter, method) {
			var speed = parameter.div_speed;
			var d_type = parameter.r_type;
			var divOne = json.div_One;
			var divTwo = json.div_Two;
			var divContent = json.div_Content;
			if(d_type=="up"||d_type=="down")
			{var demoDistance=json.demoDistance.innerHeight();}
		    else
		    {
		    	var demoDistance=json.demoDistance.innerWidth();
		    }
		    if(json.demoWidth)
			{
				var divWidth=json.demoWidth;
				divWidth.width(divOne.width()*2);
			}
			
			divTwo.html(divOne.html());
			switch (d_type) {
				case "up":
					function MarqueeUp() {
						if (divContent.scrollTop() >= divOne.height())
							divContent.scrollTop(0);
						else {
							divContent.animate({scrollTop:divContent.scrollTop() + demoDistance});
							//divContent.scrollTop(divContent.scrollTop() + demoDistance);
							
						}
					}
					var MyMarUp= setInterval(MarqueeUp, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarUp);
					})
					divContent.mouseout(function () {
						MyMarUp = setInterval(MarqueeUp, speed);
					})
					break;
				case "left":
					function MarqueeLeft() {
						if (divOne.width() <= divContent.scrollLeft()) {
							divContent.scrollLeft(divContent.scrollLeft() - divOne.width());
						}
						else {
							//divContent.scrollLeft(divContent.scrollLeft() + demoDistance);
							divContent.animate({scrollLeft:divContent.scrollLeft() + demoDistance},500);
						}
					}
					var MyMarLeft = setInterval(MarqueeLeft, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarLeft);
					})
					divContent.mouseout(function () {
						MyMarLeft = setInterval(MarqueeLeft, speed);
					})
					break;
				case "right":
					function MarqueeRight() {
						if (divContent.scrollLeft() <= 0) {
							divContent.scrollLeft(divContent.scrollLeft() + divOne.width());
						}
						else {
							//divContent.scrollLeft(divContent.scrollLeft() - demoDistance);
							divContent.animate({scrollLeft:divContent.scrollLeft() - demoDistance},500);
						}
					}
					var MyMarRight = setInterval(MarqueeRight, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarRight);
					})
					divContent.mouseout(function () {
						MyMarRight = setInterval(MarqueeRight, speed);
					})
					break;
				case "down":
					divContent.scrollTop(divContent[0].scrollHeight);
					function MarqueeDown() {
						if (divOne[0].offsetTop - divContent.scrollTop() >= 0) {
							divContent.scrollTop(divContent.scrollTop() + divOne.height());
						}
						else {
							//divContent.scrollTop(divContent.scrollTop() - demoDistance);
							divContent.animate({scrollTop:divContent.scrollTop() - demoDistance},500);
						}
					}
					var MyMarDown = setInterval(MarqueeDown, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarDown);
					})
					divContent.mouseout(function () {
						MyMarDown = setInterval(MarqueeDown, speed);
					});
					break;
				default: break;
			}
		}
	},
	//焦点图片(滑动版)插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	slideBtn:包含序列的容器,
	slideImg：包含滑动内容的容器,
	slodehua：最外层滑动的容器,
	parameter：传递的参数，例如{hoverClass:hover_class}，
	hoverClass:序列划过样式,
	auto：是否自动播放（true/False），
	detay:延迟时间；
	method   ：传递的方法，如{trigger:trigger}
	*/
	SlideImg: function () {
		this.start = function (json, parameter, method) {
			var slideBtn = json.slideBtn;
			var slideContent = json.slideContent;
			var slideImg = json.slideImg;
			var slodehua = json.slodehua;
			var hover = arguments[1]?arguments[1].hoverClass:'fouce';
			var contectWidth = slideContent.width();
			var slideIndex = 0, autoTimer;
			var timer = null;
			var trigger=arguments[2]?arguments[2].trigger:'mouseover';
			
			slodehua.width(contectWidth*slideImg.length);
			
			//遍历绑定事件
			if (slideImg.length == slideBtn.length) {
				for (var i = 0; i < slideBtn.length; i++) {
					if (i == 0) {
						$(slideImg[i]).show();
						$(slideBtn[i]).addClass(hover);
					}
					(function (i) {
						$(slideBtn[i]).bind(trigger,function(){
							 if (parameter.auto) {
								if (autoTimer) clearInterval(autoTimer);
							}
							
							move(i);
							slideIndex = i;
						})
						$(slideBtn[i]).bind('mouseout',function(){
							auto();
							if (timer !== null) {
								clearTimeout(timer);
								timer = null;
							}
						})
						$(slideImg[i]).mouseover(function(){

							if (parameter.auto) {
								if (autoTimer) clearInterval(autoTimer);
							}
						})
						$(slideImg[i]).mouseout(function(){

							auto();
							if (timer !== null) {
								clearTimeout(timer);
								timer = null;
							}
						})
					} (i))
				}
			}
			//滚动位移方法
			function move(i) {
				if (timer !== null) {
					clearTimeout(timer);
					timer = null;
				}
				
				timer = setTimeout(function () {
					slideBtn.removeClass(hover);
					$(slideBtn[i]).addClass(hover);
					slodehua.stop(true, false).animate({ left: -contectWidth * i }, 800);
				}, 180);
			}
			//自动运行
			function auto() {
				if (parameter.auto) {
					autoTimer = setInterval(function () {
						slideIndex = (slideIndex >= slideImg.length - 1) ? 0 : (slideIndex + 1);
						move(slideIndex);
					}, parameter.detay);
				} else {
					if (autoTimer) clearInterval(autoTimer);
				}
			}
			auto();
		}
	},
	//焦点图片(渐隐渐现版)插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	slideBtn:包含序列的容器,
	slideImg：包含滑动内容的容器,
	slodehua：最外层滑动的容器,
	parameter：传递的参数，例如{hoverClass:hover_class}，
	hoverClass:序列划过样式,
	auto：是否自动播放（true/False），
	detay:延迟时间；
	method   ：传递的方法,如{trigger:trigger}
	*/
	FadeImg: function () {
		this.start = function (json, parameter, method) {
			var slideBtn = json.slideBtn;
			var slideContent = json.slideContent;
			var slideImg = json.slideImg;
			var slodehua = json.slodehua;
			var hover = arguments[1]?arguments[1].hoverClass:'fouce';
			var contectWidth = slideContent.width();
			var slideIndex = 0, autoTimer;
			var timer = null;
			var preIndex=0;
			var trigger=arguments[2]?arguments[2].trigger:'mouseover';
			slideImg.css({position:'absolute',top:'0px',left:'0px'});
			//遍历绑定事件
			if (slideImg.length == slideBtn.length) {
				for (var i = 0; i < slideBtn.length; i++) {
					if (i == 0) {
						$(slideImg[i]).show();
						$(slideBtn[i]).addClass(hover);
					}
					else
					{
						$(slideImg[i]).hide();
					}
					(function (i) {
						$(slideBtn[i]).bind(trigger,function(){
							 if (parameter.auto) {
								if (autoTimer) clearInterval(autoTimer);
							}
							preIndex=slideIndex;
							move(i);
							slideIndex = i;
						})
						
						$(slideImg[i]).mouseover(function(){
							if (parameter.auto) {
								if (autoTimer) clearInterval(autoTimer);
							}
						})
						$(slideImg[i]).mouseout(function(){
							auto();
							if (timer !== null) {
								clearTimeout(timer);
								timer = null;
							}
						})
					} (i))
				}
			}
			//渐隐渐现 方法
			function move(i) {
				if (timer !== null) {
					clearTimeout(timer);
					timer = null;
				}
				timer = setTimeout(function () {
					slideBtn.removeClass(hover);
					$(slideBtn[i]).addClass(hover);
					slideImg.hide();
					$(slideImg[i]).show();
				}, 800);
			}
			//自动运行
			function auto() {
				if (parameter.auto) {
					autoTimer = setInterval(function () {
						preIndex=slideIndex;
						slideIndex = (slideIndex >= slideImg.length - 1) ? 0 : (slideIndex + 1);
						move(slideIndex);
					}, parameter.detay);
				} else {
					if (autoTimer) clearInterval(autoTimer);
				}
			}
			auto();
		}
	},
	//焦点图片(无限左右移动版)插件,起始向右移动
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	slideBtn:包含序列的容器,
	slideImg：包含滑动内容的容器,
	slodehua：最外层滑动的容器,
	parameter：传递的参数
	hoverClass:序列划过样式(默认fouce),例如{hoverClass:hover_class}，
	auto：是否自动播放(true/False)
	detay:延迟时间；
	method   ：传递的方法（不穿默认MOUSEROVER事件,如{trigger:trigger}）
	*/
	LimitlessImg: function () {
		this.start = function (json, parameter, method) {
			var slideContent = json.slideContent;
			var slideImg = json.slideImg;
			var slodehua = json.slodehua;
			var slideText = json.slideText;
			var preBtn = json.preBtn;
			var nextBtn = json.nextBtn;
			var hover = arguments[1]?arguments[1].hoverClass:'fouce';
			var contectWidth = slideContent.width();
			var slideIndex = 0, autoTimer;
			var timer = null;
			var preIndex=0;
			var index_n=0;
			var trigger=arguments[2]?arguments[2].trigger:'click';
			var flag=false;
			var t_number=slideImg.length;
			var pk=[];
			slodehua.width(contectWidth*slideImg.length);
			slideImg.last().insertBefore(slideImg.first());
			slodehua.css('left','-'+slideContent.width()+'px');
			changPosition();
			slideImg=$(pk);
			slideText.hide();
			slideText.eq(0).show();
			preBtn.bind(trigger,function(){
					if (autoTimer) clearInterval(autoTimer);
					if(!flag)
                    {
                    	    flag=true;
                    	    slodehua.animate({left:'0px'},800,function(){
                    	    slideImg.last().insertBefore(slideImg.first());
                            changPosition();
				            slideImg=$(pk);
				            slodehua.css('left','-'+contectWidth+'px');
                    	    index_n=index_n-1;
                    	   if(index_n>=0)
                    	   {
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                              index_n=t_number-1;
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	      flag=false;	
                    	})
                    }
				})
                slideContent.bind('mouseover',function(){
				if (autoTimer) clearInterval(autoTimer);
				
		         if(preBtn.is(':hidden'))
		         {
		         		preBtn.fadeIn(500);
						nextBtn.fadeIn(500);
		         }	
                })
                slideContent.bind('mouseleave',function(){
                	preBtn.fadeOut(500);
				    nextBtn.fadeOut(500);
				    auto(); 
                })
				nextBtn.bind(trigger,function(){
					if(!flag)
                    {
                    	flag=true;
                    	slodehua.animate({left:-(2*contectWidth)+'px'},1000,function(){
                    	slideImg.last().after(slideImg.first());
                    	changRosition();
				        slideImg=$(pk);
                    	slodehua.css('left','-'+contectWidth+'px');
                    	index_n=index_n+1;
                    	   if(index_n<t_number)
                    	   {

                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                               index_n=0;
                               slideText.hide();
				               slideText.eq(index_n).show();
                    	   }
                    	       flag=false;	
                    	})
                    }
				})
			
			 function changPosition()
			 {
                 for(var k=0;k<slideImg.length;k++)
                 {
                 	if(k==0)
                 		{
                 			pk[k]= slideImg[slideImg.length-1];
                 		}
                 	else
                 	    {
                 	    	pk[k]= slideImg[k-1];
                 	    }
                 }
			 }
			 function changRosition()
			 {
                 for(var k=0;k<slideImg.length;k++)
                 {
                 	if(k==slideImg.length-1)
                 		{
                 			pk[k]= slideImg[0];
                 		}
                 	else
                 	{
                 		pk[k]= slideImg[k+1];
                 	}
                 }
			 }
             //自动运行
			 function auto() {
				if (parameter.auto) {
					autoTimer = setInterval(function () {
					if(!flag)
                    {
                    	    flag=true;
                    	    slodehua.animate({left:'0px'},800,function(){
                    	    slideImg.last().insertBefore(slideImg.first());
                            changPosition();
				            slideImg=$(pk);
				            slodehua.css('left','-'+contectWidth+'px');
                    	    index_n=index_n-1;
                    	   if(index_n>=0)
                    	   {
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                               index_n=t_number-1;
                               slideText.hide();
				               slideText.eq(index_n).show();
                    	   }
                    	   flag=false;	
                    	})
                    }
					}, parameter.detay);
				} else {
					if (autoTimer) clearInterval(autoTimer);
				}
			}
		  auto(); 
		}
	},
	//焦点图片(无限左右移动版)插件,起始向左移动
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	slideBtn:包含序列的容器,
	slideImg：包含滑动内容的容器,
	slodehua：最外层滑动的容器,
	parameter：传递的参数
	hoverClass:序列划过样式(默认fouce),例如{hoverClass:hover_class}，
	auto：是否自动播放(true/False)
	detay:延迟时间；
	method   ：传递的方法（不穿默认click事件,如{trigger:trigger}）
	*/
	RimitlessImg: function () {
		this.start = function (json, parameter, method) {
			var slideContent = json.slideContent;
			var slideImg = json.slideImg;
			var slodehua = json.slodehua;
			var slideText = json.slideText;
			var preBtn = json.preBtn;
			var nextBtn = json.nextBtn;
			var hover = arguments[1]?arguments[1].hoverClass:'fouce';
			var contectWidth = slideContent.width();
			var slideIndex = 0, autoTimer;
			var timer = null;
			var preIndex=0;
			var index_n=0;
			var trigger=arguments[2]?arguments[2].trigger:'click';
			var flag=false;
			var t_number=slideText.length;
			var pk=[];
			slodehua.width(contectWidth*slideImg.length);
			if (slideImg.length == slideText.length) {
							slideImg.last().insertBefore(slideImg.first());
							changPosition();
							slideImg=$(pk);
							slideText.hide();
							slideText.eq(0).show();
				preBtn.bind(trigger,function(){
					if (autoTimer) clearInterval(autoTimer);
					if(!flag)
                    {
                    	    flag=true;
                    	    slodehua.animate({left:'0px'},800,function(){
                    	   
                    	    slideImg.last().insertBefore(slideImg.first());
                            changPosition();
				            slideImg=$(pk);
				            slodehua.css('left','-'+contectWidth+'px');
                    	index_n=index_n-1;
                    	   if(index_n>=0)
                    	   {
                    	   
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                               index_n=t_number-1;
                             
                               slideText.hide();
				               slideText.eq(index_n).show();
                    	   }
                    	   flag=false;	
                    	})
                    }
				})
                slideContent.bind('mouseover',function(){
				if (autoTimer) clearInterval(autoTimer);
				
		         if(preBtn.is(':hidden'))
		         {
		         		preBtn.fadeIn(500);
						nextBtn.fadeIn(500);
		         }	
                })
                slideContent.bind('mouseleave',function(){
                	preBtn.fadeOut(500);
				    nextBtn.fadeOut(500);
				auto(); 
                })
				nextBtn.bind(trigger,function(){
					if(!flag)
                    {
                    	flag=true;
                    	slodehua.animate({left:-(2*contectWidth)+'px'},1000,function(){
                    	slideImg.last().after(slideImg.first());
                    	changRosition();
				        slideImg=$(pk);
                    	slodehua.css('left','-'+contectWidth+'px');
                    	index_n=index_n+1;
                    	   if(index_n<t_number)
                    	   {
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                               index_n=0;
                               slideText.hide();
				               slideText.eq(index_n).show();
                    	   }
                    	       flag=false;	
                    	})
                    }
				})
			}
			//向右移动复制元素
			 function changPosition()
			 {
                 for(var k=0;k<slideImg.length;k++)
                 {
                 	if(k==0)
                 		{
                 			pk[k]= slideImg[slideImg.length-1];
                 		}
                 	else
                 	    {
                 	    	pk[k]= slideImg[k-1];
                 	    }
                 }
			 }
			 //向左移动复制元素
			 function changRosition()
			 {
                 for(var k=0;k<slideImg.length;k++)
                 {
                 	if(k==slideImg.length-1)
                 		{
                 			pk[k]= slideImg[0];
                 		}
                 	else
                 	{
                 		pk[k]= slideImg[k+1];
                 	}
                 }
			 }
             //自动运行
			 function auto() {
				if (parameter.auto) {
					autoTimer = setInterval(function () {
						if(!flag)
                    {
                    	    flag=true;
                    	    slodehua.animate({left:-(2*contectWidth)+'px'},800,function(){
                    	    slideImg.first().insertAfter(slideImg.last());
                            changRosition();
				            slideImg=$(pk);
				            slodehua.css('left','-'+contectWidth+'px');
                    	index_n=index_n-1;
                    	   if(index_n>=0)
                    	   {
                    	   	  
                              slideText.hide();
				              slideText.eq(index_n).show();
                    	   }
                    	   else
                    	   {
                               index_n=t_number-1;
                               slideText.hide();
				               slideText.eq(index_n).show();
                    	   }
                    	   flag=false;	
                    	})
                    }
					}, parameter.detay);
				} else {
					if (autoTimer) clearInterval(autoTimer);
				}
			}
		  auto(); 
		}
	},
	//无缝滚动(横向可指向滑动)插件
	/*
	传递三个JSON格式数据
	json     :json传递的数据对象
	JSON各字段命名如下：例如{div_One:demoOne}
	div_One:包含数据对象的容器,
	div_Two：复制数据对象的容器,
	divThree：复制数据对象的容器,
	div_Content：最外层容器包含数据与复制数据容器,
	parameter：传递的参数 例如{hoverClass:hover_class}
	prex:左移对象，
	Next：右移对象，
	div_speed:滚动速度,
	r_type:滚动方向,  left:代表向左;right:代表向右;没其他方向;
	*/
	runRolling: function () {
		this.start = function (json, parameter, method) {
			var speed = parameter.div_speed;
			var d_type = parameter.r_type;
			var divOne = json.div_One;
			var divTwo = json.div_Two;
			var divThree = json.div_Three;
			var divContent = json.div_Content;
			var prex=json.prex;
			var Next=json.Next;
			var demoDistance=json.demoDistance.innerWidth();
			 var MyMarLeft,MyMarRight;  
			 var flag=false;               //默认FLAG为FALSE可点击滑动
		   	if(json.demoWidth)
			{
				var divWidth=json.demoWidth;
				divWidth.width(divOne.width()*3);
			}
			divTwo.html(divOne.html());
			divThree.html(divOne.html());
			divContent.scrollLeft(divOne.width());
			switch (d_type) {
				case "left":
					function MarqueeLeft() {
						left_go();
					}
					 MyMarLeft = setInterval(MarqueeLeft, speed)
					divContent.mouseover(function () { 
						clearInterval(MyMarLeft);
					})
					divContent.mouseout(function () {
						MyMarLeft = setInterval(MarqueeLeft, speed);
					})
					break;
				case "right":
					function MarqueeRight() {
						 right_go();
					}
					 MyMarRight = setInterval(MarqueeRight, speed)
					divContent.mouseover(function () {
						clearInterval(MyMarRight);
					})
					divContent.mouseout(function () {
						MyMarRight = setInterval(MarqueeRight, speed);
					})
					break;
				default: break;
			}
			function kong(){
           	if(d_type=="left")
             	{
					clearInterval(MyMarLeft);
             	}
                else
                {
                	clearInterval(MyMarRight);
                }
           }
           function left_go()
           {
           		if (divOne.width() <= divContent.scrollLeft()) {
							divContent.animate({scrollLeft:divContent.scrollLeft() - divOne.width()},1,function(){flag=false;});
						}
						else {
							divContent.animate({scrollLeft:divContent.scrollLeft() + demoDistance},500,function(){flag=false;});
						}
           }
           function right_go()
           {  
           	    if (divContent.scrollLeft() <= 0) {
							divContent.animate({scrollLeft:divContent.scrollLeft() + divOne.width()},1,function(){flag=false;})
						}
						else {
							divContent.animate({scrollLeft:divContent.scrollLeft() - demoDistance},500,function(){flag=false;});
						}		
           }
			 prex.bind('click',function(){
			 	if(!flag){
			 		 flag=true;
			 		setTimeout(left_go(),800);
			 	}
             })
             Next.bind('click',function(){
             	if(!flag){
             		 flag=true;
			 		setTimeout(right_go(),800);
			 	}
             })
             prex.bind('mouseover',function(){
                kong();
             })
             Next.bind('mouseover',function(){
             	kong();
             })
            prex.bind('mouseout',function(){
             	if(d_type=="left")
             	{
					MyMarLeft = setInterval(MarqueeLeft, speed);
             	}
                else
                {
                	MyMarRight = setInterval(MarqueeRight, speed);
                }
             })
             Next.bind('mouseout',function(){
             	if(d_type=="left")
             	{
             		MyMarLeft = setInterval(MarqueeLeft, speed);
             	}
                else
                {
                	MyMarRight = setInterval(MarqueeRight, speed);
                }
             })
		}
	},
	//客服固定位置插件
	/*
	json:json传递的数据对象
	divContent:包含数据对象的容器,
	parameter：传递的参数 例如{direction代表方向:right和left}
	z_index:Z轴层数，数据越高,显示的级别就越高，
	direction:代表方向，left居左，right居右；
	*/
	kefu:function(){
		this.start=function(json, parameter, method){
			var divContent=json.divContent;
			divContent.css({ position:'absolute',top:0+'px',left:0+'px'});
			var top_distance=parseInt($(window).height()/2)-parseInt(divContent.height()/2);
			divContent.wrap('<div  style="position:absolute;top:'+top_distance+'px"></div>');
			var direction=parameter.direction;
			var z_index=arguments[1].z_index?arguments[1].z_index:1;
			switch(direction){
				case 'right':
				divContent.parent('div').css({'right':divContent.width()+'px', 'z-index':z_index});
			     break;
				case 'left': 
				divContent.parent('div').css({'left':0+'px', 'z-index':z_index});
				 break;
				 default: break;	
			}
			$(window).bind('scroll',function(){
				divContent.parent('div').css('top',top_distance+$(document).scrollTop());
			})
		}
	},
	//对联插件
	/*
	json:json传递的数据对象，divContent为jquery对象.
	parameter:传递的参数(topDistance:顶部距离;padDistance:距左右的距离;speed:显示的时长,默认10秒)
	*/
	federal:function(){
     	this.start=function(json,parameter,method){
     		var divContent=json.divContent;
     		var z_index=arguments[1].z_index?arguments[1].z_index:1;
     		var topDistance=arguments[1].topDistance?arguments[1].topDistance:0;
     		var padDistance=arguments[1].padDistance?arguments[1].padDistance:0;
     		var speed=arguments[1].speed?arguments[1].speed:10000;
     		divContent.css({ position:'absolute',top:0+'px',left:0+'px'});
     		divContent.on('dblclick',function(){
 			$(this).parent('div').hide();
     		})
     		var rightDistance=padDistance+divContent.width();
     		var copyDIV=divContent.clone(true);  
     		copyDIV.appendTo('body').wrap('<div style="position:absolute; left:'+padDistance+'px;top:'+topDistance+'px;z-index:'+z_index+'"></div>');
     		divContent.wrap('<div style="position:absolute; right:'+rightDistance+'px;top:'+topDistance+'px;z-index:'+z_index+'"></div>');
     		$(window).bind('scroll',function(){
			divContent.parent('div').css('top',topDistance+$(document).scrollTop());
			copyDIV.parent('div').css('top',topDistance+$(document).scrollTop());
			})
			function hideFederal(){
				divContent.parent('div').hide();
				copyDIV.parent('div').hide();
			}
			setTimeout(hideFederal,speed);
     	}
	},
	//返回到顶部
	/*
	json:json传递参数;
	r_type:代表位置，此项必填，lefttop:左上,leftbottom:左下,righttop:右上,rightbottom:右下；
	urlImg:图片路径，此项必填，
	distance：代表距离左或者右边距的距离，如果无值传送，默认0;
	tbdistance：代表距离顶部或者底部的距离，如果无值传送，默认0;
	*/
	backToTop:function(){
		this.start=function(json,parameter,method){
		  var r_type=json.r_type;
		  var urlImg=json.urlImg;
		  var distance=arguments[0].distance?arguments[0].distance:0;
		  var tbdistance=arguments[0].tbdistance?arguments[0].tbdistance:0;
		  switch(r_type){
		  	    case 'righttop':
		  	   var imgUrl='<img src="'+urlImg+'" class="backtop" style="position:absolute; top:'+tbdistance+'px; right:'+distance+'px; display:none;" />';
		  	    $('body').append(imgUrl);
		  	     var bot=$('.backtop').css('top');
				bot=bot.substring(0,bot.indexOf('px'));
		  	    $(window).on('scroll',function(){
		  	    	if($(document).scrollTop()>50)
		  	    	{
		  	    		$('.backtop').show();
		  	    	}
		  	    	else
		  	    	{
		  	    		$('.backtop').hide();
		  	    	}
			       $('.backtop').css('top',parseInt($(document).scrollTop())+parseInt(bot)+'px');
		  		}); 
		  	    break;
		  	    case 'rightbottom':
		  	    var imgUrl='<img src="'+urlImg+'" class="backtop" style="position:absolute; bottom:'+tbdistance+'px; right:'+distance+'px; display:none;" />';
		  	    $('body').append(imgUrl);
		  	    var bot=$('.backtop').css('bottom');
				bot=bot.substring(0,bot.indexOf('px'));
		  	    $(window).on('scroll',function(){
		  	    	if($(document).scrollTop()>50)
		  	    	{
		  	    		$('.backtop').show();
		  	    	}
		  	    	else
		  	    	{
		  	    		$('.backtop').hide();
		  	    	}
			       $('.backtop').css('bottom',parseInt(bot)-parseInt($(document).scrollTop())+'px');
		  		}); 
		  	    break;
		  	    case 'lefttop':
		  	   var imgUrl='<img src="'+urlImg+'" class="backtop" style="position:absolute; top:'+tbdistance+'px; left:'+distance+'px; display:none;" />';
		  	    $('body').append(imgUrl);
		  	     var bot=$('.backtop').css('top');
				bot=bot.substring(0,bot.indexOf('px'));
		  	    $(window).on('scroll',function(){
		  	    	if($(document).scrollTop()>50)
		  	    	{
		  	    		$('.backtop').show();
		  	    	}
		  	    	else
		  	    	{
		  	    		$('.backtop').hide();
		  	    	}
			       $('.backtop').css('top',parseInt($(document).scrollTop())+parseInt(bot)+'px');
		  		}); 
		  	    break;
		  	    case 'leftbottom':
		  	    var imgUrl='<img src="'+urlImg+'" class="backtop" style="position:absolute; bottom:'+tbdistance+'px; left:'+distance+'px; display:none;" />';
		  	    $('body').append(imgUrl);
		  	    var bot=$('.backtop').css('bottom');
				bot=bot.substring(0,bot.indexOf('px'));
		  	    $(window).on('scroll',function(){
		  	    	if($(document).scrollTop()>50)
		  	    	{
		  	    		$('.backtop').show();
		  	    	}
		  	    	else
		  	    	{
		  	    		$('.backtop').hide();
		  	    	}
			       $('.backtop').css('bottom',parseInt(bot)-parseInt($(document).scrollTop())+'px');
		  		}); 
		  	    break;
		  	    default:break;
		  }
		  $('.backtop').on('click',function(){
				$(document).scrollTop(0+'px');
				$(this).hide();
		  })
		}
	},
	//图片弹出层插件
	/*
	json:json传递参数;
	*/
	Popup:function(){
          this.start=function(json,parameter,method){
              	
          }
	},
	//隔行换色
	/*
	json:json传递参数;
		 rowObject:传递的对象，必传；
		 oddColor：奇数行的背景样式，必传；
		 evenColor：偶数行的背景样式，必传；
		 hoverColor：经过行时候的背景样式，必传；
	*/
	changeRow:function(){
         this.start=function(json,parameter,method){
            var  rowObject=json.rowObject;
            var oddColor=parameter.oddColor;
            var evenColor=parameter.evenColor;
            var hoverColor=parameter.hoverColor;
            rowObject.each(function(i){
               if(i%2==0)
               	{
               		$(this).addClass(oddColor);
               	}
               else{
				$(this).addClass(evenColor);
               }
            });
            rowObject.mouseover(function(){
                $(this).addClass(hoverColor) ;
            }).mouseout(function(){

            	$(this).removeClass(hoverColor);
            })
         }
	},
	//右下角弹窗提醒
	/*
	json:json传递参数;
	contine:被包含的弹出层内容，必须传
	close_div：关闭弹出层对象，必须传
	heightDiv：弹出层的高度，必须传
	widthDiv：弹出层的宽度，必须传
	timeover：弹出速度，数值越小越快，
	*/
	tanDiv:function(){
         this.start=function(json,parameter,method){
            var  contine=json.contine;
            var  close_div=json.close_div;
            var timeover=parameter.timeover;
            var heightDiv=parameter.heightDiv;
            var widthDiv=parameter.widthDiv;
            contine.wrap('<div class="r_content"  style="position:absolute;bottom:0px;right:0px; height:0px; width:'+widthDiv+'"></div>');
			function showBox(){ 
			$('.r_content').height($('.r_content').height()+2+'px');
			if ($('.r_content').height()<heightDiv) setTimeout(function(){showBox()},timeover); 
			} 
			close_div.on('click',function(){
                $('.r_content').hide();
			})
			showBox();
         }
	}
}