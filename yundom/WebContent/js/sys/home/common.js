/**
 * @description 显示当前时间
 * @param {String} o  html容器
 * @param {String} type 时间类型
 * @return {Null} null null
 */
function showTime(o,title,type){	
	var time=setInterval(
	function(){
		var d=new Date();
		var weekday=new Array(7);
			weekday[0]="星期日";
			weekday[1]="星期一";
			weekday[2]="星期二";
			weekday[3]="星期三";
			weekday[4]="星期四";
			weekday[5]="星期五";
			weekday[6]="星期六";
			var year=testLen(d.getFullYear()) ,month=testLen(d.getMonth()+1) ,day=testLen(d.getDate()) ,hours=testLen(d.getHours()) ,
				minutes=testLen(d.getMinutes()),seconds=testLen(d.getSeconds()),milliseconds=testLen(d.getMilliseconds());
			if(type=='short'){
				$(o).html(title+ year +'年'+ month +'月'+ day +'日');
			}else if(type=='normal'){
				hours=hours<12?"上午好":"下午好";
				$(o).html(hours+","+title+ year +'年'+ month +'月'+ day +'日'+'&nbsp;&nbsp;'+weekday[d.getDay()]);
			}else{
				$(o).html(title+ year +'年'+ month +'月'+ day +'日'+'&nbsp;&nbsp;'+weekday[d.getDay()]+'&nbsp;&nbsp;'+ hours +'&nbsp;:&nbsp;'+ minutes+'&nbsp;:&nbsp;'+ seconds);
			}
		}
		,1000
	);
	function testLen(s){
		return (s.toString().length)<2?('0'+s):s;
	}
}
 
/**
 * @description 获取Cookie
 * @param {String} name  Cookie名称
 * @return {String} Result 返回Cookie值
 */
function getCookie( name ) {
	var start = document.cookie.indexOf( name + "=" );
	var len = start + name.length + 1;
	if ( ( !start ) && ( name != document.cookie.substring( 0, name.length ) ) ) {
		return null;
	}
	if ( start == -1 ) return null;
	var end = document.cookie.indexOf( ";", len );
	if ( end == -1 ) end = document.cookie.length;
	return unescape( document.cookie.substring( len, end ) );
}
/**
 * @description 设置Cookie
 * @param {String} name  Cookie名称
 * @param {String} value  Cookie值
 * @param {Number} expires  生存周期
 * @param {String} path  Cookie地址
 * @param {String} domain  Cookie域
 * @param {Boolen} secure  Cookie安全限制
 * @return {Null} null null
 */
function setCookie( name, value, expires, path, domain, secure ) {
	var today = new Date();
	today.setTime( today.getTime() );
	if ( expires ) {
		expires = expires * 1000 * 60 * 60 * 24;
	}
	var expires_date = new Date( today.getTime() + (expires) );
	document.cookie = name+"="+escape( value ) +
		( ( expires ) ? ";expires="+expires_date.toGMTString() : "" ) + 
		( ( path ) ? ";path=" + path : "" ) +
		( ( domain ) ? ";domain=" + domain : "" ) +
		( ( secure ) ? ";secure" : "" );
}
/**
 * @description 删除Cookie
 * @param {String} name  Cookie名称
 * @param {String} path  Cookie地址
 * @param {String} domain  Cookie域
 * @return {Null} null null
 */
function deleteCookie( name, path, domain ) {
	if ( getCookie( name ) ) document.cookie = name + "=" +
			( ( path ) ? ";path=" + path : "") +
			( ( domain ) ? ";domain=" + domain : "" ) +
			";expires=Thu, 01-Jan-1970 00:00:01 GMT";
}

/**
 * @description 获取指定的js参数
 * @param {String} name 指定的js名称 
 * @return {Array} result 参数值的数组
 */
function getJsSrc(name,paras){
	var scripts=document.getElementsByTagName('script'),i,n,slen=scripts.length,plen=paras.length,returns=[];
	for(i=0;i<slen;i++){
		var src=scripts[i].src;
		if(src.indexOf(name)>-1){
			for(n=0;n<plen;n++){
				returns.push(src.getjsparas(paras[n]))
			}
			return returns;
		}
	}
}

/**
 * @description 获取*.js?后的参数
 * @param {String} name 参数名称 
 * @return {String} result 参数值
 */
String.prototype.getjsparas=function (name){     
	var paraString = this.substring(this.indexOf("?")+1,this.length).split("&");     
	var paraObj = {}     
	for (i=0; j=paraString[i]; i++){     
		paraObj[j.substring(0,j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=")+1,j.length);     
	}     
	var returnValue = paraObj[name.toLowerCase()];     
	if(typeof(returnValue)=="undefined"){     
		return "";     
	}else{     
		return returnValue;     
	}     
}

/**
 * @description 加入收藏
 * @param {Null} 
 * @return {Null} null null
 */
function saveHomepage()
{
 if (document.all)
    {
		window.external.addFavorite(document.location.href,document.title)
    }
    else if (window.sidebar)
    {
       window.sidebar.addPanel(document.title, document.location.href, "");
 }
}
 
/**
 * @description 设置为首页
 * @param {Null} 
 * @return {Null} null null
 */
function setHomepage()
{
 if (document.all)
    {
        document.body.style.behavior='url(#default#homepage)';
  		document.body.setHomePage(document.location.host);
 
    }
    else if (window.sidebar)
    {
		if(window.netscape)
		{
			 try
			{  
				netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");  
			 }  
			 catch (e)  
			 {  
				alert( "该操作被浏览器拒绝，如果想启用该功能，请在地址栏内输入 about:config,然后将项 signed.applets.codebase_principal_support 值该为true" );  
			 }
		} 
		var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components. interfaces.nsIPrefBranch);
		prefs.setCharPref('browser.startup.homepage',document.location.host);
 	}
}
/**
 * @description 设置图片按钮切换效果
 * @param {String} key  元素钩子
 * @return {Null} null null
 */
function bindImgButtonEvents(key){
	$(key).each(function(){
		var src=$(this).attr('src');
		$(this).data('p',src.replace(src.split('/')[src.split('/').length-1],'')).data('i',src.split('/')[src.split('/').length-1]);
		$(this).hover(function(){
			$(this).attr('src',$(this).data('p')+'o.'+$(this).data('i'));
		},function(){
			$(this).attr('src',$(this).data('p')+$(this).data('i'));
		});
	});
}