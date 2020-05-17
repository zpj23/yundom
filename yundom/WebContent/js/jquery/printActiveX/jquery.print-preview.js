/*!
 * jQuery Print Previw Plugin v1.0.1
 *
 * Copyright 2011, Tim Connell
 * Licensed under the GPL Version 2 license
 * http://www.gnu.org/licenses/gpl-2.0.html
 *
 * Date: Wed Jan 25 00:00:00 2012 -000
 */
 
(function($) { 
    
	// Initialization
	$.fn.printPreview = function(mailId,title,content,src,org,time,fileId,printTemplateName) {
		this.each(function() {
			$(this).bind('click', function(e) {
//				$.printPreview.execPrintActiviX();
				if(!src)src = ''; if(!title)title = ''; if(!content)content = '';
				$.ajax({
					url : 'printAction_toPrint',
					data : {mailId:mailId,title:title,content:content,src:src,time:time,org:org,printTemplateName:printTemplateName,fileId:fileId },
					type : 'post',
					success : function(data){
							$("#printArea").html(data);
							$.printPreview.loadPrintPreview();
					}
				});
			});
		});
		return this;
	};
	$.printPreviewSelf = function(mailId,title,content,src,org,time,fileId,printTemplateName) {
		if(!src)src = ''; if(!title)title = ''; if(!content)content = '';
		$.ajax({
			url : 'printAction_toPrint',
			data : {mailId:mailId,title:title,content:content,src:src,time:time,org:org,printTemplateName:printTemplateName,fileId:fileId},
			type : 'post',
			success : function(data){
					$("#printArea").html(data);
					$.printPreview.loadPrintPreview();
			}
		});
	};
    // Private functions
    var mask, size, print_modal, print_controls;
    $.printPreview = {
        loadPrintPreview: function() {
            // Declare DOM objects
            print_modal = $('<div id="print-modal"></div>');
            print_controls = $('<div id="print-modal-controls">' + 
                                    '<a href="#" class="print" title="打印">打印</a>' +
                                    '<a href="#" class="close" title="关闭">关闭</a>').hide();
            var print_frame = $('<iframe id="print-modal-content" scrolling="no" border="0" frameborder="0" name="print-frame" />');

            // Raise print preview window from the dead, zooooooombies
            print_modal
                .hide()
                .append(print_controls)
                .append(print_frame)
                .appendTo('body');

            // The frame lives
            for (var i=0; i < window.frames.length; i++) {
                if (window.frames[i].name == "print-frame") {    
                    var print_frame_ref = window.frames[i].document;
                    break;
                }
            }
            print_frame_ref.open();
            print_frame_ref.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">' + 
                '<head><title>' + document.title + '</title></head>' +
                '<body></body>' +
                '</html>');
            print_frame_ref.close();
            
            // Grab contents and apply stylesheet
            var $iframe_head = $('head link[media*=print], head link[media=all]').clone(),
                $iframe_body = $('#printArea').clone();
            $iframe_head.each(function() {
                $(this).attr('media', 'all');
            });
            if (!$.browser.msie && !($.browser.version < 7) ) {
                $('head', print_frame_ref).append($iframe_head);
                $('body', print_frame_ref).append($iframe_body);
            }
            else {
                $('#printArea').clone().each(function() {
                    $('body', print_frame_ref).append(this.outerHTML);
                });
                $('head link[media*=print], head link[media=all]').each(function() {
                    $('head', print_frame_ref).append($(this).clone().attr('media', 'all')[0].outerHTML);
                });
            }
            
            // Disable all links
            $('a', print_frame_ref).bind('click.printPreview', function(e) {
                e.preventDefault();
            });
            
            // Introduce print styles
            $('head').append('<style type="text/css">' +
                '@media print {' +
                    '/* -- Print Preview --*/' +
                    '#print-modal-mask,' +
                    '#print-modal {' +
                        'display: none !important;' +
                    '}' +
                '}' +
                '</style>'
            );

            // Load mask
            $.printPreview.loadMask();

            // Disable scrolling
            $('body').css({overflowY: 'hidden', height: '100%'});
            $('img', print_frame_ref).load(function() {
                print_frame.height($('body', print_frame.contents())[0].scrollHeight);
            });
            
            // Position modal            
            starting_position = $(window).height() + $(window).scrollTop();
            var css = {
                    top:         starting_position,
                    height:      '100%',
                    overflowY:   'auto',
                    zIndex:      10000,
                    display:     'block'
                }
            print_modal
                .css(css)
                .animate({ top: $(window).scrollTop()}, 400, 'linear', function() {
                    print_controls.fadeIn('slow').focus();
                });
            print_frame.height($('body', print_frame.contents())[0].scrollHeight);
            
            // Bind closure
            $('a', print_controls).bind('click', function(e) {
                e.preventDefault();
                if ($(this).hasClass('print')) {
                	//$.printPreview.pagesetup_null(); 
                	$("#printArea").jqprint({printContainer: true}); }
                else { $.printPreview.distroyPrintPreview(); }
            });
    	},
    	PageSetup_Default : function() { 
    	try{
    		var hkey_root,hkey_path,hkey_key;
	    	var Wsh=new ActiveXObject("WScript.Shell"); 
	    	HKEY_Key="header"; 
	    	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"&w&b页码,&p/&P"); 
	    	HKEY_Key="footer"; 
	    	Wsh.RegWrite(HKEY_Root+HKEY_Path+HKEY_Key,"&u&b&d"); 
    	} 
    	catch(e){} 

    	},

    	pagesetup_null : function(){
    		var hkey_root,hkey_path,hkey_key;
    		hkey_root="HKEY_CURRENT_USER";
    		hkey_path="\\Software\\Microsoft\\Internet Explorer\\PageSetup\\";
    		try{
    		var RegWsh = new ActiveXObject("WScript.Shell");
    		hkey_key="header"; 
    		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
    		hkey_key="footer";
    		RegWsh.RegWrite(hkey_root+hkey_path+hkey_key,"");
    		}catch(e){}
    	},
    	distroyPrintPreview: function() {
    		$("#printArea").html("");
    	    print_controls.fadeOut(100);
    	    print_modal.animate({ top: $(window).scrollTop() - $(window).height(), opacity: 1}, 400, 'linear', function(){
    	        print_modal.remove();
    	        $('body').css({overflowY: 'auto', height: 'auto'});
    	    });
    	    mask.fadeOut('slow', function()  {
    			mask.remove();
    		});				
    		$(document).unbind("keydown.printPreview.mask");
    		mask.unbind("click.printPreview.mask");
    		$(window).unbind("resize.printPreview.mask");
	    },
	    
    	/* -- Mask Functions --*/
	    loadMask: function() {
	        size = $.printPreview.sizeUpMask();
            mask = $('<div id="print-modal-mask" />').appendTo($('body'));
    	    mask.css({				
    			position:           'absolute', 
    			top:                0, 
    			left:               0,
    			width:              size[0],
    			height:             size[1],
    			display:            'none',
    			opacity:            0,					 		
    			zIndex:             9999,
    			backgroundColor:    '#000'
    		});
	
    		mask.css({display: 'block'}).fadeTo('400', 1);
    		
            $(window).bind("resize..printPreview.mask", function() {
				$.printPreview.updateMaskSize();
			});
			
			mask.bind("click.printPreview.mask", function(e)  {
				$.printPreview.distroyPrintPreview();
			});
			
			$(document).bind("keydown.printPreview.mask", function(e) {
			    if (e.keyCode == 27) {  $.printPreview.distroyPrintPreview(); }
			});
        },
    
        sizeUpMask: function() {
            if ($.browser.msie) {
            	// if there are no scrollbars then use window.height
            	var d = $(document).height(), w = $(window).height();
            	return [
            		window.innerWidth || 						// ie7+
            		document.documentElement.clientWidth || 	// ie6  
            		document.body.clientWidth, 					// ie6 quirks mode
            		d - w < 20 ? w : d
            	];
            } else { return [$(document).width(), $(document).height()]; }
        },
    
        updateMaskSize: function() {
    		var size = $.printPreview.sizeUpMask();
    		mask.css({width: size[0], height: size[1]});
        },
        execPrintActiviX : function(){
        	var objShell;
        	objShell=new ActiveXObject("WScript.Shell");
        	var iReturnCode=objShell.Run("/printActiviX.bat",0,true);
    	}
    }
})(jQuery);