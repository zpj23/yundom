package com.jl.material.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.material.pojo.OutStore;
import com.jl.material.service.OutStoreService;
import com.jl.sys.pojo.UserInfo;

@Namespace("/")
@Scope("prototype")
@Component("jlOutStoreAction")
@ParentPackage("json-default")
public class OutStoreAction extends IAction{
	public UserInfo user;
	
	public UserInfo getUser() {
		return user;
	}


	public void setUser(UserInfo user) {
		this.user = user;
	}
	public OutStore oStore;
	@Autowired
	public OutStoreService jlOutService;
	
	public OutStore getoStore() {
		return oStore;
	}


	public void setoStore(OutStore oStore) {
		this.oStore = oStore;
	}


	@Action(value="jlOutStoreAction_toAdd",results={
			@Result(name="success",location="material/outstore/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		oStore=new OutStore();
		return "success";
	}
	
	@Action(value="jlOutStoreAction_toList",results={
			@Result(name="success",location="material/outstore/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	@Action(value="jlOutStoreAction_saveOutStore",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void jlOutStoreAction_saveOutStore(){
		int m=jlOutService.saveOutStore(oStore);
		try {
			JSONObject job=new JSONObject();
			job.put("status",m);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	
	@Action(value="jlOutStoreAction_toiframe",results={
			@Result(name="success",location="material/outstore/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	@Action(value="jlOutStoreAction_getOutStoreListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
			public void jlOutStoreAction_getOutStoreListJson(){
				user = (UserInfo)request.getSession().getAttribute("jluserinfo");
				String datemin=request.getParameter("datemin");//开始时间
				String datemax=request.getParameter("datemax");//结束时间
				String username=request.getParameter("username");//
				String state=request.getParameter("state");//部门
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
				
				Map map=jlOutService.findList(user,page,rows,param);
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
