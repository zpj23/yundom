package com.jl.common;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts2.interceptor.ServletRequestAware;
import org.apache.struts2.interceptor.ServletResponseAware;
import org.apache.struts2.interceptor.SessionAware;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.opensymphony.xwork2.ActionSupport;

public class IAction extends ActionSupport implements ServletRequestAware,ServletResponseAware,SessionAware{
	private static final long serialVersionUID = 1L;
	public HttpServletRequest request;
	public HttpServletResponse response;	
	public Map session;
	// 实例GSON
	public Gson gson = new GsonBuilder().setDateFormat(Constant.TOFULLFORMAT).create();
	
//	private  SysUserinfo CurrentUser;//当前session用户
	// = (SysUserinfo) request.getSession().getAttribute("iuserinfo");
	
	public Integer page = 1; // 当前页数
	 
	public Integer rows = 10; // 行数
	  
	public String jsonData; // json返回的数据
	 
	public String columnName; // 列名
		
	public String Jorder; // 排序
	
	public Map getSession() {
		return session;
	}
	@Override
	public void setSession(Map session) {
		this.session = session;
	}
	@Override
	public void setServletResponse(HttpServletResponse response) {
		this.response=response;
	}
	@Override
	public void setServletRequest(HttpServletRequest request) {
		this.request=request;
	}
	public HttpServletRequest getRequest() {
		return request;
	}
	public void setRequest(HttpServletRequest request) {
		this.request = request;
	}
	public HttpServletResponse getResponse() {
		return response;
	}
	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}	
	public Integer getRows() {
		return rows;
	}
	public void setRows(Integer rows) {
		this.rows = rows;
	}
	public String getJsonData() {
		return jsonData;
	}
	public void setJsonData(String jsonData) {
		this.jsonData = jsonData;
	}
	public String getColumnName() {
		return columnName;
	}
	public void setColumnName(String columnName) {
		this.columnName = columnName;
	}
	public String getJorder() {
		return Jorder;
	}
	public void setJorder(String jorder) {
		Jorder = jorder;
	}
//	public SysUserinfo getCurrentUser() {
//		CurrentUser= (SysUserinfo) request.getSession().getAttribute("iuserinfo");
//		return CurrentUser;
//	}
	/*public void setCurrentUser(SysUserinfo currentUser) {
		CurrentUser = currentUser;
	}*/
	/**
	 * @Description TODO(action输出JSON数据)
	 * @Title jsonWrite
	 * @param json_
	 * @throws IOException
	 * @author Lee
	 * @time 2014-2-25 上午08:50:55
	 */
	public void jsonWrite(String json_) throws IOException{
		response.setCharacterEncoding("utf-8");
		response.setContentType("text/html;charset=UTF-8");
		response.getWriter().write(json_);
	}
	
	public void jsonWrite(Object obj) throws IOException{
		Gson gson = new Gson();
		response.setCharacterEncoding("utf-8");
		response.getWriter().write(gson.toJson(obj));
	}
	
	String ipagesize = ArgsUtil.getPageSize();
	String ipagelist = ArgsUtil.getPageList();

	public String getIpagesize() {
		return ipagesize;
	}
	public void setIpagesize(String ipagesize) {
		this.ipagesize = ipagesize;
	}
	public String getIpagelist() {
		return ipagelist;
	}
	public void setIpagelist(String ipagelist) {
		this.ipagelist = ipagelist;
	}

	
	
	
}
