//var browser={    
//		versions:function(){            
//				var u = navigator.userAgent, app = navigator.appVersion;            
//				return {                
//				trident: u.indexOf('Trident') > -1, //IE内核                
//				presto: u.indexOf('Presto') > -1, //opera内核                
//				webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核                
//				gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                
//				mobile: !!u.match(/AppleWebKit.*Mobile.*/),//||!!u.match(/AppleWebKit/), //是否为移动终端                
//				ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                
//				android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                
//				iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                
//				iPad: u.indexOf('iPad') > -1, //是否iPad                
//				webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部            
//				};
//		}()
//}; 
//console.log(" 是否为移动终端: "+browser.versions.mobile);
//console.log(" ios终端: "+browser.versions.ios);
//console.log(" android终端: "+browser.versions.android);
//console.log(" 是否为iPhone: "+browser.versions.iPhone);
//console.log(" 是否iPad: "+browser.versions.iPad);

//默认是pc 否则是  手机
var ISPHONE=false;

function browserRedirect() {
            var sUserAgent = navigator.userAgent.toLowerCase();
            var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
            var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
            var bIsMidp = sUserAgent.match(/midp/i) == "midp";
            var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
            var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
            var bIsAndroid = sUserAgent.match(/android/i) == "android";
            var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
            var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
            console.log("您的浏览设备为：");
            if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            	ISPHONE=true;
            } else {
            	ISPHONE=false;
            }
        }

browserRedirect();
console.log(navigator.userAgent); 

//判断是否是微信打开
//function is_weixn(){  
//    var ua = navigator.userAgent.toLowerCase();  
//    if(ua.match(/MicroMessenger/i)=="micromessenger") {  
//        return true;  
//    } else {  
//        return false;  
//    }  
//}  