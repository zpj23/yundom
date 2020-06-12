package com.jl.sys.action;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.util.EntityUtils;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;
import com.google.gson.Gson;
import com.jl.common.FileHelper;
import com.jl.common.IAction;
import com.jl.material.service.PurchaseService;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.DepartmentInfoService;
import com.jl.sys.service.LogInfoService;
import com.jl.sys.service.MenuInfoService;
import com.jl.sys.service.RoleInfoService;
import com.jl.sys.service.UserInfoService;
import com.jl.util.ClientTool;
import com.jl.util.DateHelper;
import com.jl.util.Role;
import com.jl.util.StringFormat;
import com.jl.util.WxUtil;

/**
 * @Description: 登陆后台功能
 * @ClassName: LoginAction
 * @author zpj 
 * @date 2016-3-30 上午10:08:55
 *
 */
@Namespace("/")
@Scope("prototype")
@Component("jlLoginAction")
@ParentPackage("json-default")
public class LoginAction extends IAction{

	@Autowired
	public UserInfoService jlUserInfoService;
	@Autowired
	public DepartmentInfoService jlDepartmentInfoService;
	@Autowired
	public RoleInfoService jlRoleInfoService; 

	@Autowired
	public PurchaseService jlPurchaseInfoService; 
	@Autowired
	public MenuInfoService jlMenuInfoService;
	@Autowired
	public LogInfoService jlLogInfoService;
	
	public UserInfo user;

	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	@Action(value="jlLoginAction_toMain",results={
			@Result(name="success",location="home1/main.jsp"),//fashionHome.jsp
			@Result(name="success1",location="home1/main_db.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlLoginAction_toMain(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		if(user.getIsAdmin().equalsIgnoreCase("1")){
			return "success";
		}else{
			return "success1";
		}
	}
	
	@Action(value="jlLoginAction_toMainIframe",results={
			@Result(name="success",location="home1/index.html"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toMainIframe(){
		return "success";
	}
	
	@Action(value="jlLoginAction_loginOut",results={
			@Result(name="success",location="/login.jsp"),
			@Result(name="error",location="/error.jsp")
	})
	public String loginOut(){
		try {
			request.getSession().removeAttribute("jluserinfo");
			request.getSession().removeAttribute("jlroleids");
			request.getSession().removeAttribute("jlrolecodes");
			request.getSession().removeAttribute("jlMenuList");
			return "success";
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	/**
	 * 获取用户的openid
	 * @Title jlLoginAction_getUserOpenIdByWx
	 * @author zpj
	 * @time 2019年7月22日 下午3:13:21
	 */
	@Action(value="jlLoginAction_getUserOpenIdByWx",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlLoginAction_getUserOpenIdByWx(){
		String js_code=request.getParameter("js_code");
		String user_id=request.getParameter("user_id");
		
		CloseableHttpClient  httpClient=ClientTool.getHttpClient();
	    HttpClientContext localContext= HttpClientContext.create();
	    try {
			String result= httpGetContent("https://api.weixin.qq.com/sns/jscode2session?appid="+WxUtil.AppID+"&secret="+WxUtil.AppSecret+"&js_code="+js_code+"&grant_type=authorization_code",httpClient,localContext);
			System.out.println(result);
			Gson gson = new Gson();
			Map resultMap=gson.fromJson(result, Map.class);
			//{"session_key":"xVW70veOHdZs9SwHx8aWdg==","expires_in":7200,"openid":"oKhAE0a3OqRqQymVFchr9q3a6uw0"}
			jlUserInfoService.updateOpenId(user_id,(String)resultMap.get("openid"));
			jsonWrite(result);
	    } catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	
	/**
	 * 手机登陆
	 * @Title jlLoginAction_phoneLogin
	 * @author zpj
	 * @time 2019年7月22日 下午2:12:52
	 */
	@Action(value="jlLoginAction_loginByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlLoginAction_phoneLogin(){
		String username=request.getParameter("username");
		String password=request.getParameter("password");
		UserInfo tempUser=new UserInfo();
		tempUser.setLoginname(username);
		tempUser.setPassword(password);
		UserInfo luser=jlUserInfoService.findLogin(tempUser,false);
		
		Map retMap =new HashMap();
		retMap.put("msg",false);
		retMap.put("info","");
		if(luser!=null){
//				luser.setPassword(password);
				//根据登陆用户信息查询 根据user id信息查询用户所有的角色和部门所有的角色查询关联表对应角色
				//如果用户角色和部门角色相同，则取一个，再以及角色对应的菜单信息，以及菜单对应的操作信息
				// role的 id、rolecode、rolename   
				//用户的授权角色
				List<Object[]> ulist =jlRoleInfoService.findRoleIdByUserId(luser.getId());
				//部门的授权角色
				DepartmentInfo dp=jlDepartmentInfoService.findDeptByDeptCode(luser.getDepartmentcode());
				// role的 id、rolecode、rolename   
				List<Object[]> dlist=jlRoleInfoService.findRoleIdByDepartmentId(dp.getId());
				Set roleidSet=new HashSet();
				Set rolecodeSet=new HashSet();
				for(int i=0;i<ulist.size();i++){
					roleidSet.add(ulist.get(i)[0]);
					rolecodeSet.add(ulist.get(i)[1]);
				}
				for(int j=0;j<dlist.size();j++){
					if(roleidSet.contains(dlist.get(j)[0])){
						continue;
					}else{
						roleidSet.add(dlist.get(j)[0]);
						rolecodeSet.add(dlist.get(j)[1]);
					}
				}
				if(rolecodeSet.isEmpty()){
					retMap.put("info", "该用户未授权,无法登陆！");
					retMap.put("msg",false);
				}else{
					if(rolecodeSet.contains(Role.ZUZHANG.toString())){
						luser.setIsAdmin(Role.ZUZHANG.toString());
					}else if(rolecodeSet.contains(Role.CHEJIANZHUREN.toString())){
						luser.setIsAdmin(Role.CHEJIANZHUREN.toString());
					}else if(rolecodeSet.contains(Role.RENSHI.toString())){
						luser.setIsAdmin(Role.RENSHI.toString());
					}else if(rolecodeSet.contains(Role.ADMIN.toString())){
						luser.setIsAdmin(Role.ADMIN.toString());
					}
					retMap.put("info", "登陆成功！");
					retMap.put("msg",true);
					
					request.getSession().setAttribute("jluserinfo",luser);
					
					String loginIP=getIp2(request);
					LogInfo loginfo=new LogInfo();
					loginfo.setId(UUID.randomUUID().toString());
					loginfo.setCreatetime(new Date());
					loginfo.setType("登陆");
					loginfo.setDescription(DateHelper.getToday("yyyy-MM-dd HH:mm:ss")+"   "+luser.getUsername()+"  成功登陆系统"+",IP地址"+loginIP);
					loginfo.setUserid(luser.getId());
					loginfo.setUsername(luser.getUsername());
					jlLogInfoService.logInfo(loginfo);
					UserInfo retInfo=new UserInfo();
					retInfo.setUsername(luser.getUsername());
					retInfo.setLoginname(luser.getLoginname());
					retInfo.setDepartmentcode(luser.getDepartmentcode());
					retInfo.setIsAdmin(luser.getIsAdmin());
					retInfo.setId(luser.getId());
					retInfo.setPassword(password);
					retMap.put("data", retInfo);
				}
				
		}else{
			retMap.put("info", "用户名或密码错误!");
			retMap.put("msg",false);
		}
		try {
			jsonWrite(retMap);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	/**
	 * 后台登陆验证
	 */
	@Action(value="jlLoginAction_checkLogin",results={
			@Result(name="success",location="home1/index.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String checkLogin(){
		boolean islogined=false;
		try {
			user = (UserInfo)request.getSession().getAttribute("jluserinfo");
			String loginname,pwd,rember;
			//首次登陆
			 loginname = request.getParameter("username");
			 pwd = request.getParameter("pwd");
			 rember=request.getParameter("rember");
			 if(loginname==null&&user==null){
				 //服务器重启后页面非正常情况访问
				 return "error";
			 }
			 if(loginname==null){
				if(user!=null){
					 //如果session中有用户登陆过的信息，则证明这次不是登陆，而是刷新
					 islogined=true;
					 loginname = user.getLoginname();
					 pwd =user.getPassword();
				}else{
					//没有登陆参数session中也没有缓存用户，那么就直接跳转登陆界面
					 return "error";
				}
			}
			UserInfo luser=new UserInfo();
			luser.setLoginname(loginname);
			luser.setPassword(pwd);
			if(islogined){
				//如果登陆过 则用md5加密过的比较
				luser = jlUserInfoService.findLogin(luser,true);		     
			}else{
				//否则用 传过来的密码加密再比较
				luser = jlUserInfoService.findLogin(luser,false);
			}
			if(luser==null){			
				//不存在该用户，或密码有误
				request.setAttribute("loginDefault","1");
				return "error";
			}else{		
				//记录本次的登陆时间和ip地址供下次使用
				UserInfo us=jlUserInfoService.findById(luser.getId());
				String loginIP=getIp2(request);
				us.setLastloginip(loginIP);
				us.setLastlogintime(new Date());
				jlUserInfoService.baocunUserCurrentInfo(us);
				//根据登陆用户信息查询 根据user id信息查询用户所有的角色和部门所有的角色查询关联表对应角色
				//如果用户角色和部门角色相同，则取一个，再以及角色对应的菜单信息，以及菜单对应的操作信息
				// role的 id、rolecode、rolename   
				//用户的授权角色
				List<Object[]> ulist =jlRoleInfoService.findRoleIdByUserId(luser.getId());
				//部门的授权角色
				DepartmentInfo dp=jlDepartmentInfoService.findDeptByDeptCode(luser.getDepartmentcode());
				// role的 id、rolecode、rolename   
				List<Object[]> dlist=jlRoleInfoService.findRoleIdByDepartmentId(dp.getId());
				Set roleidSet=new HashSet();
				Set rolecodeSet=new HashSet();
				for(int i=0;i<ulist.size();i++){
					roleidSet.add(ulist.get(i)[0]);
					rolecodeSet.add(ulist.get(i)[1]);
				}
				for(int j=0;j<dlist.size();j++){
					if(roleidSet.contains(dlist.get(j)[0])){
						continue;
					}else{
						roleidSet.add(dlist.get(j)[0]);
						rolecodeSet.add(dlist.get(j)[1]);
					}
				}
				if(rolecodeSet.contains(Role.ZUZHANG.toString())){
					luser.setIsAdmin(Role.ZUZHANG.toString());
				}else if(rolecodeSet.contains(Role.CHEJIANZHUREN.toString())){
					luser.setIsAdmin(Role.CHEJIANZHUREN.toString());
				}else if(rolecodeSet.contains(Role.RENSHI.toString())){
					luser.setIsAdmin(Role.RENSHI.toString());
				}else if(rolecodeSet.contains(Role.ADMIN.toString())){
					luser.setIsAdmin(Role.ADMIN.toString());
				}
				request.getSession().setAttribute("jluserinfo",luser);
				request.getSession().setAttribute("jlroleids",roleidSet);
				request.getSession().setAttribute("jlrolecodes",rolecodeSet);
				Set menuSet=new HashSet();
//				List<Integer> menuList= new ArrayList<Integer>();
				for (Object tem: roleidSet) {  
				      if(tem instanceof Integer){  
				            int rid= (Integer)tem;  
				            String menuid=jlRoleInfoService.findRoleMenuByRoleId(rid);
				            if(!menuid.equalsIgnoreCase("")){
				            	for(int x=0;x<menuid.split(",").length;x++){
				            		menuSet.add(menuid.split(",")[x]);
				            	}
				            }
				      }     
				}
				Iterator<String> it = menuSet.iterator();  
				StringBuffer menubuffer=new StringBuffer(50);
				while (it.hasNext()) {  
					  if(!menubuffer.toString().equalsIgnoreCase("")){
						  menubuffer.append(",");
					  }
					  menubuffer.append( it.next());
				}
				List<Map> list = jlMenuInfoService.findMenuByIds(menubuffer.toString());
				Gson gson = new Gson();
				String menulist=gson.toJson(list);
				//System.out.println(menulist+">>>>");
				request.getSession().setAttribute("jlMenuList",menulist);
				//采购单需要审核的数目
				Map param =new HashMap();
				param.put("state", "1");
				Map map=jlPurchaseInfoService.findList(user,page,rows,param);
				int countNumber=(Integer)map.get("count");
				request.setAttribute("count", countNumber);
				//登陆操作插入日志   刷新不进防止重复刷新 
				if(!islogined){
					LogInfo loginfo=new LogInfo();
					loginfo.setId(UUID.randomUUID().toString());
					loginfo.setCreatetime(new Date());
					loginfo.setType("登陆");
					loginfo.setDescription(DateHelper.getToday("yyyy-MM-dd HH:mm:ss")+"   "+luser.getUsername()+"  成功登陆系统"+",IP地址"+loginIP);
					loginfo.setUserid(luser.getId());
					loginfo.setUsername(luser.getUsername());
					jlLogInfoService.logInfo(loginfo);
				}
				//排名查询
//				initRank(luser);
				
				
				if(null!=rember&&rember.equalsIgnoreCase("1")){
					Cookie c1 = new Cookie("username", loginname);  
					Cookie c2 = new Cookie("pwd", pwd);  
					c1.setMaxAge(60*60*24*7);  
					c2.setMaxAge(60*60*24*7);//这里设置保存这条Cookie的时间   一个星期7天
					response.addCookie(c1);//添加Cookie  
					response.addCookie(c2);  
				}
				
				return "success";
			}
		} catch (Exception e) {
			e.printStackTrace();
			return "error";
		}
	}
	public void  initRank(UserInfo luser){
//		Map retMap=new HashMap();
		Map logparam= new HashMap();
		logparam.put("type", "登陆");
		String lstr="";
		//查询总的登陆排行
		List list=jlLogInfoService.findTopFive(luser, 1, 5, logparam);
		lstr=gson.toJson(list);
		request.getSession().setAttribute("total_list",lstr);
		//今天yy-MM-dd HH:mm:ss
		logparam.put("datemin", DateHelper.getToday()+" 00:00:00");
		logparam.put("datemax", DateHelper.getToday()+" 23:59:59");
		list=jlLogInfoService.findTopFive(luser, 1, 5, logparam);
		lstr=gson.toJson(list);
		request.getSession().setAttribute("today_list",lstr);
		//昨天yy-MM-dd HH:mm:ss
		logparam.put("datemin", DateHelper.getYesterday()+" 00:00:00");
		logparam.put("datemax", DateHelper.getYesterday()+" 23:59:59");
		list=jlLogInfoService.findTopFive(luser, 1, 5, logparam);
		lstr=gson.toJson(list);
		request.getSession().setAttribute("yesterday_list",lstr);
		//本周
		logparam.put("datemin", getWeekDay().get("mon")+" 00:00:00");
		logparam.put("datemax", getWeekDay().get("sun")+" 23:59:59");
		list=jlLogInfoService.findTopFive(luser, 1, 5, logparam);
		lstr=gson.toJson(list);
		request.getSession().setAttribute("week_list",lstr);
		//本月
		logparam.put("datemin", getMonthDate().get("monthF")+" 00:00:00");
		logparam.put("datemax", getMonthDate().get("monthL")+" 23:59:59");
		list=jlLogInfoService.findTopFive(luser, 1, 5, logparam);
		lstr=gson.toJson(list);
		request.getSession().setAttribute("month_list",lstr);
		
	}
	public static Map getWeekDay() {
		  Map<String,String> map = new HashMap<String,String>();
		  Calendar cal =Calendar.getInstance();
		        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd 00:00:00");
		        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY); //获取本周一的日期
		        map.put("mon", df.format(cal.getTime()));
//		  System.out.println("********得到本周一的日期*******"+df.format(cal.getTime()));
		  //这种输出的是上个星期周日的日期，因为老外那边把周日当成第一天
		  cal.set(Calendar.DAY_OF_WEEK, Calendar.SUNDAY);
		  //增加一个星期，才是我们中国人理解的本周日的日期
		  cal.add(Calendar.WEEK_OF_YEAR, 1);
		  map.put("sun", df.format(cal.getTime()));
//		  System.out.println("********得到本周天的日期*******"+df.format(cal.getTime()));
		  return map;
	}
	 public static Map getMonthDate(){
		  Map<String,String> map = new HashMap<String,String>();
		  // 获取Calendar  
		  Calendar calendar = Calendar.getInstance(); 
		   DateFormat format = new SimpleDateFormat("yyyy-MM-dd 00:00:00");  
		  // 设置时间,当前时间不用设置  
		  // calendar.setTime(new Date());  
		   calendar.set(Calendar.DATE, calendar.getActualMinimum(Calendar.DATE));
		   map.put("monthF", format.format(calendar.getTime()));
//		   System.out.println("*********得到本月的最小日期**********"+format.format(calendar.getTime()));
		 // 设置日期为本月最大日期  
		   calendar.set(Calendar.DATE, calendar.getActualMaximum(Calendar.DATE));  
		 // 打印  
		   map.put("monthL", format.format(calendar.getTime()));
//		   System.out.println("*********得到本月的最大日期**********"+format.format(calendar.getTime()));
		   return map;
	}
	 
//	 public static void main(String[] args) {
//		 String temp=null;
//		 try{
//			 if(temp!=null){
//				 System.out.println("111");
//			 }else if(temp==null){
//				 System.out.println("222");
//			 }
//		 }catch (Exception e) {
//			e.printStackTrace();
//		}
//	}
		 
	 public String  findWeather(List<String> list, String address){
			
			CloseableHttpClient  httpClient=ClientTool.getHttpClient();
		    HttpClientContext localContext= HttpClientContext.create();
		    String temp="";
		    String cityname="南通";
		    if(!temp.equalsIgnoreCase("")){
		    	cityname=temp;
		    }else{
		    	if(address!=null&&!address.equalsIgnoreCase("")){
		    		cityname=address;
		    	}
		    }
		    try {
				String result= httpGetContent("http://api.avatardata.cn/Weather/Query?key=3207af0008c9409cbb35402f9df86c02&cityname="+cityname,httpClient,localContext);
				System.out.println(result);
				return result;
		    } catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		     
		}
		
		public String httpGetContent(String url,CloseableHttpClient httpClient ,HttpClientContext localContext ) throws Exception{
			HttpGet httpGet = new HttpGet(url);
			CloseableHttpResponse response = httpClient.execute(httpGet,localContext);
	        String postResult = EntityUtils.toString(response.getEntity(), "UTF-8");
	        response.close();
			return postResult;  
		}
	
	public  String getIp2(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            //多次反向代理后会有多个ip值，第一个ip才是真实ip
            int index = ip.indexOf(",");
            if(index != -1){
                return ip.substring(0,index);
            }else{
                return ip;
            }
        }
        ip = request.getHeader("X-Real-IP");
        if(StringUtils.isNotEmpty(ip) && !"unKnown".equalsIgnoreCase(ip)){
            return ip;
        }
        return request.getRemoteAddr();
    }
	
	
	@Action(value="jlLoginAction_downloadByPhone",results={
			@Result(type="json", params={"root","jsonData"})
       })
	public void  downloadApp() throws Exception {
		LogInfo loginfo=new LogInfo();
		loginfo.setId(UUID.randomUUID().toString());
		loginfo.setCreatetime(new Date());
		loginfo.setType("download");
		String path = ServletActionContext.getServletContext().getRealPath("/download") + 
				"/考勤管理.apk";
		try{
			boolean flag= FileHelper.downloadFile(path, "考勤管理.apk", response);
			if(flag){
				loginfo.setDescription("下载app成功");
			}else{
				loginfo.setDescription("下载app失败");
			}
		}catch (Exception e) {
			e.printStackTrace();
			loginfo.setDescription("下载app失败");
		}finally {
			jlLogInfoService.logInfo(loginfo);
		}
		jsonData=path;
	}
	/**
	 * 查看是否更新
	 * @Title checkUpdate
	 * @author zpj
	 * @time 2018-2-23 上午10:00:01
	 */
	@Action(value="jlLoginAction_checkUpdateByPhone",results={
			@Result(type="json", params={"root","jsonData"})
       })
	public void  checkUpdate(){
		Map retMap =new HashMap();
		String current_version=request.getParameter("ver");
//		user =getCurrentUser(request);
		double latestVersion=StringFormat.getVersion();
		try{
			double ov=StringFormat.toDouble(current_version);
			if(latestVersion>ov){
				//有更新
				retMap.put("msg",true);
				retMap.put("url","jlLoginAction_downloadByPhone");
				retMap.put("filename", "考勤管理.apk");
				
			}else{
				retMap.put("msg",false);
				retMap.put("url", "");
			}
		}catch (Exception e) {
			retMap.put("msg",false);
			retMap.put("url", "");
		}
		LogInfo loginfo=new LogInfo();
		loginfo.setId(UUID.randomUUID().toString());
		loginfo.setCreatetime(new Date());
		loginfo.setType("check");
		loginfo.setDescription("操作类型：检查更新,当前app版本："+current_version+",最新版本："+latestVersion);
//		if(null!=user){
//			loginfo.setUserid(user.getId());
//			loginfo.setUsername(user.getUsername());
//		}
		jlLogInfoService.logInfo(loginfo);
		
		try {
			jsonWrite(retMap);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
//	public UserInfo getCurrentUser(HttpServletRequest request){
//		UserInfo user = (UserInfo)request.getSession().getAttribute("jluserinfo");
////		Enumeration enumeration =request.getSession().getAttributeNames();//获取session中所有的键值对
////		while(enumeration.hasMoreElements()){
////            String AddFileName=enumeration.nextElement().toString();//获取session中的键值
////            UserInfo value=(UserInfo)request.getSession().getAttribute(AddFileName);//根据键值取出session中的值
////            System.out.println(AddFileName);
////            System.out.println(value.getLoginname());
////            //String FileName= (String)session.getAttribute("AddFileName");
////        }
//		if(user==null){
//			String id= request.getParameter("loginId");
//			user=jlUserInfoService.findById(Integer.parseInt(id));
//			String isAdmin=request.getParameter("isAdmin");
//			user.setIsAdmin(isAdmin);
//			request.getSession().setAttribute("jluserinfo",user);
//		}
//		return user;
//	}
}
