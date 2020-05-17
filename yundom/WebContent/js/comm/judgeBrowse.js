function judgeWeb(){
	var WEBCATEGORY=0;//0是IE，1是GOOGLE
// 	if ((navigator.userAgent.indexOf('MSIE') >= 0) && (navigator.userAgent.indexOf('Opera') < 0)){
// 		WEBCATEGORY=0;
// 	}else if (navigator.userAgent.indexOf('Firefox') >= 0){
// 		WEBCATEGORY=1;
// 	}else if (navigator.userAgent.indexOf('Opera') >= 0){
// 		//alert('你是使用Opera');
// 	}else{
// 		//alert('你是使用其他的浏览器浏览网页！');
// 	}
	  var Sys = {};

      var ua = navigator.userAgent.toLowerCase();

      if (window.ActiveXObject)

          Sys.ie = ua.match(/msie ([\d.]+)/)[1]

      else if (document.getBoxObjectFor)

          Sys.firefox = ua.match(/firefox\/([\d.]+)/)[1]

      else if (window.MessageEvent && !document.getBoxObjectFor)

          Sys.chrome = ua.match(/chrome\/([\d.]+)/)[1]

      else if (window.opera)

          Sys.opera = ua.match(/opera.([\d.]+)/)[1]

      else if (window.openDatabase)

          Sys.safari = ua.match(/version\/([\d.]+)/)[1];

      //以下进行测试

      if(Sys.ie){
    	  
    	  WEBCATEGORY=0;
      }else

      if(Sys.firefox){
    	  WEBCATEGORY=1;
      } else

      if(Sys.chrome){
    	  WEBCATEGORY=2;
      }else{
    	  WEBCATEGORY=3;
      }

	return WEBCATEGORY;
}