package com.jl.material.action;

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
import com.jl.material.service.InStoreService;
import com.jl.sys.pojo.UserInfo;

@Namespace("/")
@Scope("prototype")
@Component("jlInStoreAction")
@ParentPackage("json-default")
public class InStoreAction extends IAction{
	
	public UserInfo user;
	@Autowired
	public InStoreService jlInStoreInfoService;
	
	/**
	 * 跳转页面
	 * @Title toList
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:53:01
	 */
	@Action(value="jlInStoreAction_toList",results={
			@Result(name="success",location="material/instore/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	@Action(value="jlInStoreAction_toiframe",results={
			@Result(name="success",location="material/instore/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	
	/**
	 * 入库列表datagrid
	 * @Title getInStoreListJson
	 * @author zpj
	 * @time 2016-6-16 上午11:54:06
	 */
	@Action(value="jlInStoreAction_getInStoreListJson",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void getInStoreListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//供应商名称
		String state=request.getParameter("state");//状态 供应商 或者维修商
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("datemin", datemin);
		param.put("datemax", datemax);
		param.put("username", username);
		param.put("state", state);
		
		Map map=jlInStoreInfoService.findList(user,page,rows,param);
		List list=(List)map.get("list");
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
}
