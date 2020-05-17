package com.jl.sys.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.LogInfoService;

@Namespace("/")
@Scope("prototype")
@Component("jlLogAction")
@ParentPackage("json-default")
public class LogAction extends IAction{
	@Autowired
	public LogInfoService jlLogInfoService;
	
	public UserInfo user;
	
	
	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	/**
	 * 日志列表展示
	 * @Title toLogList
	 * @return
	 * @author zpj
	 * @time 2016-6-15 下午4:39:29
	 */
	@Action(value="jlLogAction_toLogList",results={
			@Result(name="success",location="sys/log/list.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toLogList(){
		return "success";
	}
	@Action(value="jlLogAction_iframe",results={
			@Result(name="success",location="sys/log/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	
	
	@Action(value="jlLogAction_getLogListJson",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void getLogListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String name=request.getParameter("username");//用户名称
		String type=request.getParameter("type");
		String datemin =request.getParameter("datemin");
		String datemax= request.getParameter("datemax");
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("username", name);
		param.put("type", type);
		param.put("datemin", datemin);
		param.put("datemax", datemax);
		
		Map map=jlLogInfoService.findList(user,page,rows,param);
		List<DepartmentInfo> list=(List<DepartmentInfo>)map.get("list");
		int countNumber=(Integer)map.get("count");
		if(list!=null&&list.size()>0){
			  StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"").append(countNumber).append("\",\"rows\":");
			  String lstr=gson.toJson(list);
			  str.append(lstr);
			  str.append("}");
			  jsonData= str.toString();
		}else{
			jsonData="[]";
		}
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Action(value="jlLogAction_delLog",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlLogAction_delLog(){
//		String id=request.getParameter("id");
//		if(null!=id&&!id.equalsIgnoreCase("")){
			try {
				jlLogInfoService.delLog("");
				this.jsonWrite(1);
			} catch (IOException e) {
				e.printStackTrace();
			}
//		}
	}
}
