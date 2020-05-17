package com.jl.sys.filter;

import java.io.IOException;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;

import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.context.support.WebApplicationContextUtils;

import com.jl.common.ArgsUtil;
import com.jl.common.SpringContext;
import com.jl.sys.pojo.UserInfo;



/**
 *
 * 需要在web.xml中加入filter配置
 *
 */
public class SetCharacterFilter implements Filter{

	protected String endcoding = null;
	protected FilterConfig filterConfig = null;

	@Override
	public void destroy() {		
		this.endcoding = null;
		this.filterConfig = null;
	}


	@Override
	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse,
			FilterChain chain) throws IOException, ServletException {
		//设置字符集  
		servletRequest.setCharacterEncoding(endcoding);
		HttpServletRequest req = (HttpServletRequest) servletRequest;
		HttpServletResponse resp=(HttpServletResponse)servletResponse;
		resp.setHeader("Access-Control-Allow-Origin", "*"); //解决跨域问题
		String str_href = this.getCurrentURL(req); 
		
		try{
			
			boolean isLogin = false;
//			System.out.println("tomcat "+req.getSession().getId());
//			System.out.println("执行时间："+System.currentTimeMillis());
			// 获取session中用户信息jluserinfo
			UserInfo user = (UserInfo) req.getSession().getAttribute("jluserinfo");		
			if (user != null) {
				isLogin = true;
			}
			if(isLogin){
				if(str_href.indexOf("Action_")!=-1){
					// 判断是否有访问权限
					boolean b = true;//this.checkLimit(str_href);
					if (b == true) {
						chain.doFilter(servletRequest, servletResponse);
					} else {
						req.setAttribute("msg", "您没有权限访问该URL链接地址!");
						req.getRequestDispatcher("/error.jsp").forward(req, servletResponse);
					}
				}else{
					chain.doFilter(req, servletResponse);
				}
			}else if(str_href.indexOf("/yundom")>-1){
				req.getRequestDispatcher("/login.jsp").forward(req, servletResponse);
			}else if(str_href.indexOf("/jlLoginAction_checkLogin")>-1){//第一次登录
				chain.doFilter(servletRequest, servletResponse);
			}else if(str_href.indexOf("ByPhone")>-1){//手机上的请求
				chain.doFilter(servletRequest, servletResponse);
			}else if(str_href.indexOf("ByWx")>-1){//微信上的请求
				chain.doFilter(servletRequest, servletResponse);
			}else if(str_href.indexOf("jlDepartmentInfoAction_getDep")>-1){//请求部门信息
				chain.doFilter(servletRequest, servletResponse);
			}else if(str_href.indexOf("loginAction_downloadPrintActive")>-1){
				chain.doFilter(servletRequest, servletResponse);
			}else if(str_href.indexOf("Action_")>-1){
				req.getRequestDispatcher("/login.jsp").forward(req, servletResponse);
			}else if(str_href.indexOf("druid")!=-1){
				chain.doFilter(servletRequest, servletResponse);
			}else{
				chain.doFilter(servletRequest, servletResponse);
			}
		}catch (Exception e) {
			System.out.println("错误请求链接："+str_href);
			throw e;
		}
		
	}


	@Override
	public void init(FilterConfig config) throws ServletException {		
		ApplicationContext ac = WebApplicationContextUtils
		.getWebApplicationContext(config.getServletContext());
		SpringContext.jdbcTemplate = (JdbcTemplate) ac.getBean("jdbcTemplate");
		//初始化数据字典
		//CoderUtil.initCode(null);
        //初始化properties
		ArgsUtil.init();
		//初始化组织机构信息
//		OrginfoCache.init();
		
//		ResourceCodeUtil.initCode();

		this.filterConfig=config;
		this.endcoding = filterConfig.getInitParameter("endcoding"); 
	}


	// 获取访问全路径
	private String getCurrentURL(HttpServletRequest request) {
		StringBuffer sb = new StringBuffer();
		sb.append(request.getServletPath());
		String queryString = request.getQueryString();
		if (queryString != null && !queryString.equals("")) {
			sb.append("?");
			sb.append(queryString);
		}
		return sb.toString();
	}


}
