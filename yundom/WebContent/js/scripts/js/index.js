(function($){
    var curMenu = null, zTree_Menu = null;
	var setting = {
		view: {
			showLine: false,
			showIcon: false,
			selectedMulti: false,
			dblClickExpand: false,
			addDiyDom: addDiyDom
		},
        async: {
            enable: true,
            url: LeftZtreeUrl,
            autoParam: ["id=0", "name=n"]
        },
		callback: {
			beforeClick: beforeLeftMenuClick,
			onClick: OnLeftMenuClick
		}
	};	
    
    $.fn.addTab = function(id, title, url, closable, selected){
      //$('.over-mask-layer').hide();   
      //$('#overlay_panel').hide();
   
      if(!id) return;
      closable = (typeof(closable) == 'undefined') ? true : closable;
      selected = (typeof(selected) == 'undefined') ? true : selected;
      var height = '100%';// isTouchDevice() ? 'auto' : '100%';
      $('#tabs_container').tabs('add', {
         id: id,
         title: title,
         closable: closable,
         selected: selected,
         style: 'height:' + height + ';',
         content: '<iframe id="tabs_' + id + '_iframe" name="tabs_' + id + '_iframe" allowTransparency= "true"  src="' + url + '"  border="0" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" style="width:100%;height:' + height + ';"></iframe>'//onload="IframeLoaded('+treeNode+');"
      });
   };
   $.fn.selectTab = function(id){
      $('#tabs_container').tabs('select', id);
   };
   $.fn.closeTab = function(id){
      $('#tabs_container').tabs('close', id);
   };
   $.fn.getSelected = function(){
      return $('#tabs_container').tabs('selected');
   };

	//init
    function init()
    {
        resizeLayout();
	   //
       $("#bar").click(function() {
			if($("#left").is(":hidden")){
				$("#left").show();
                $(this).attr('class', 'scroll-left');
			}else{
				$("#left").hide();
                $(this).attr('class', 'scroll-right');
			}

			resizeLayout();
	   });

       $("#firstpane p.menu_head").click(function () {
                for (i = 0; i < document.getElementById("firstpane").getElementsByTagName("p").length; i++) {
                    document.getElementById("firstpane").getElementsByTagName("p")[i].style.backgroundImage = "";
                    //document.getElementById("firstpane").getElementsByTagName("p")[i].style.color = "#333333";
                }
                this.style.backgroundImage = "url(images/Default_17.png)";
                this.style.color = "#ffffff";
                $(this).next("div.menu_body").slideToggle(300).siblings("div.menu_body").slideUp("falst");
            });
       
       //选中第一个
       $("#firstpane p.menu_head :first").trigger("click");

       //initMain();

        //标签栏
       initTabs();

       //initStartMenu();

	   initLeft();
      
    }

    //初始化tab
   function initTabs()
   {
      //设置标签栏属性
      $('#tabs_container').tabs({
         tabsLeftScroll:'tabs_left_scroll',
         tabsRightScroll:'tabs_right_scroll',
         panelsContainer:'content',
         secondTabsContainer: 'bottom'
      });
      
      //关闭所有标签后，显示门户切换
      $('#tabs_container').bind('_close', function(){
         if($('a.tab', this).length <= 0 && $('#portal_panel:visible').length <= 0)
            $('#portal').trigger('click');
      });
   }

//   function openURL(id, name, url, open_window, width, height, left, top)
//    {
//       id = !id ? ('w' + (nextTabId++)) : id;
//       if(open_window != "1")
//       {
//          window.setTimeout(function(){jQuery().addTab(id, name, url, true)}, 1);
//       }
//       else
//       {
//          width = typeof(width) == "undefined" ? 780 : width;
//          height = typeof(height) == "undefined" ? 550 : height;
//          left = typeof(left) == "undefined" ? (screen.availWidth-width)/2 : left;
//          top = typeof(top) == "undefined" ? (screen.availHeight-height)/2-30 : top;
//          window.open(url, id, "height="+height+",width="+width+",status=0,toolbar=no,menubar=yes,location=no,scrollbars=yes,top="+top+",left="+left+",resizable=yes");
//       }
//       jQuery(document).trigger('click');
//    }

   
    //初始化左边菜单
    function initLeft(){
		var treeObj = $("#LeftTree");
		$.fn.zTree.init(treeObj, setting);//, zNodes
		zTree_Menu = $.fn.zTree.getZTreeObj("LeftTree");
		//curMenu = zTree_Menu.getNodes()[0].children[0].children[0];
		//zTree_Menu.selectNode(curMenu);

		treeObj.hover(function () {
			if (!treeObj.hasClass("showIcon")) {
				treeObj.addClass("showIcon");
			}
		}, function() {
			treeObj.removeClass("showIcon");
		});
	}

    function initMain()
    {
//            $('#content_iframe').html('<iframe id="portal_iframe" name="portal_iframe" allowTransparency= "true" src="" border="0" frameborder="0" framespacing="0" marginheight="0" marginwidth="0" style="width:100%;height:100%;"></iframe>');
//            $('#content_iframe iframe').attr('src', "/main.aspx");
    }

	function addDiyDom(treeId, treeNode) {
			var spaceWidth = 5;
			var switchObj = $("#" + treeNode.tId + "_switch"),
			icoObj = $("#" + treeNode.tId + "_ico");
			switchObj.remove();
			icoObj.before(switchObj);

			if (treeNode.level > 1) {
				var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
				switchObj.before(spaceStr);
			}
	}

	function beforeLeftMenuClick(treeId, treeNode) {
			if (treeNode.level == 0 ) {
				var zTree = $.fn.zTree.getZTreeObj("LeftTree");
				zTree.expandNode(treeNode);
				return false;
			}
			return true;
	}

	//左侧菜单点击
	function OnLeftMenuClick(event, treeId, treeNode) {
        if(treeNode.des!=null && treeNode.des != "")
        {
            $('#content_iframe iframe').attr('src', treeNode.des);
        }  
        //window.setTimeout(function(){jQuery().addTab(id, name, url, true)}, 1);
        var path = treeNode.getParentNode().name+"  >  "+"<a href='"+treeNode.des+"' target='portal_iframe' >"+treeNode.name+"</a>";
        //$().addTab(treeNode.id, treeNode.name, treeNode.des, true,true);
        $("#td_path").html(path);
		resizeLayout();
    }

    //
    function LeftZtreeUrl(treeId, treeNode) {
            if (treeNode == null)
                return encodeURI("/handler/SysHandler.ashx?optype=leftTree&pid=0");
            else
                return encodeURI("/handler/SysHandler.ashx?optype=leftTree&pid=" + treeNode.id);
    }

	//计算主操作区大小
   function resizeLayout()
   {
      // 主操作区域高度
      var wWidth = (window.document.documentElement.clientWidth || window.document.body.clientWidth || window.innerHeight);
      var wHeight = (window.document.documentElement.clientHeight || window.document.body.clientHeight || window.innerHeight);
      //var nHeight = $('#north').is(':visible') ? $('#north').outerHeight() : 0;
      //var fHeight = $('#funcbar').is(':visible') ? $('#funcbar').outerHeight() : 0;
      //var cHeight = wHeight - nHeight - fHeight - $('#south').outerHeight() - $('#hero_bar').outerHeight() - $('#taskbar').outerHeight();
      //$('#center').height(cHeight);
      
      //$("#center iframe").css({height: cHeight});

      //一级标签宽度
//      var width = wWidth - $('#menu_left').outerWidth()- $('#menu_right').outerWidth();
//      $('#tabs_container').width(width - $('#tabs_left_scroll').outerWidth() - $('#tabs_right_scroll').outerWidth() - 2);
//      $('#menu_center').width(width-1);   //-1是为了兼容iPad
//      $('#tabs_container').triggerHandler('_resize');

	  //alert(wWidth+","+$('#left').width()+","+$('#bar').width());
	  var width = 0;//主操作区域宽度
      var height = 0;//主操作区域高度
	  if($("#left").is(":hidden")){
		  width = wWidth - $('#bar').width();
	  }else{
		  width = wWidth - $('#left').width() - $('#bar').width();
	  }
      height = wHeight - $('#top').height() - $('#menu').height()- $('#bottom').height();
	  //alert("w:"+wHeight+"top:"+$('#top').height()+"menu:"+$('#menu').height()+"bottom:"+$('#bottom').height());
	  $('#portal_iframe').width(width);
      $('#mainContent').height(height-51); //top padding:50;

      $('#portal_iframe').triggerHandler('_resize');
   };

	$(window).resize(function(){resizeLayout();});

	$(document).ready(function($){
        
		init();
        //菜单点击后字体变粗
       var a_all= $("#firstpane a");
       a_all.each(function(index){
                 $(this).bind("click", function(){
                 a_all.each(function(index2){
                 $(this).removeAttr("style");
                 
                 });
                 $(this).attr("class","newa");
                                    // alert( $(this).text() );
                              });
                 });


     //  alert(a_all.length);
        
	});

})(jQuery);


   function IframeLoaded(treeNode)
    {
    alert("123");
        alert(treeNode.name);
        
       //var iframe = window.frames['tabs_' + id + '_iframe'];
//       if(iframe && $('tabs_link_' + id) && $('tabs_link_' + id).innerText == '')
//       {
//          $('tabs_link_' + id).innerText = !iframe.document.title ?  td_lang.inc.msg_27: iframe.document.title;//"无标题"
//       }
        //var iframe = window.frames['tabs_' + id + '_iframe'];
       //if(iframe)// && $('tabs_link_' + id) && $('tabs_link_' + id).innerText == '')
       //{
       //   $("#tag").html("12345667");// ?  td_lang.inc.msg_27: iframe.document.title;//"无标题"
       //}
       /*
       if(isTouchDevice())
       {
          jQuery(window).triggerHandler('orientationchange');
       }
       */
    }