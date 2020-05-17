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
import com.jl.material.pojo.Maintain;
import com.jl.material.service.MaintainService;
import com.jl.sys.pojo.UserInfo;
@Namespace("/")
@Scope("prototype")
@Component("jlMaintainAction")
@ParentPackage("json-default")
public class MaintainAction extends IAction {
	
	public UserInfo user;
	
	public UserInfo getUser() {
		return user;
	}


	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	public Maintain maintain;
	
	
	public Maintain getMaintain() {
		return maintain;
	}

	public void setMaintain(Maintain maintain) {
		this.maintain = maintain;
	}

	@Autowired
	public MaintainService jlMaintainService;
	
	/**
	 * 跳转新增页面
	 * @Title toAdd
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:54:37
	 */
	@Action(value="jlMaintainAction_toAdd",results={
			@Result(name="success",location="material/maintain/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		return "success";
	}
	
	/**
	 * 保存
	 * @Title jlMaintainAction_saveMaintain
	 * @author zpj
	 * @time 2016-6-16 上午11:54:56
	 */
	@Action(value="jlMaintainAction_saveMaintain",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void jlMaintainAction_saveMaintain(){
		int m=jlMaintainService.saveMaintain(maintain);
		try {
			JSONObject job=new JSONObject();
			job.put("status",m);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Action(value="jlMaintainAction_toiframe",results={
			@Result(name="success",location="material/maintain/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlMaintainAction_toiframe(){
		return "success";
	}
	
	/**
	 * 跳转报损审核页面
	 * @Title jlMaintainAction_toList
	 * @return
	 * @author zpj
	 * @time 2016-5-31 上午11:27:24
	 */
	@Action(value="jlMaintainAction_toList",results={
			@Result(name="success",location="material/maintain/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlMaintainAction_toList(){
		return "success";
	}
	
	
	@Action(value="jlMaintainAction_getMaintainListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlMaintainAction_getMaintainListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//
		String state=request.getParameter("state");//部门
		String examinestate=request.getParameter("examinestate");//审核状态
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
		param.put("examinestate", examinestate);
		
		Map map=jlMaintainService.findList(user,page,rows,param);
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
	
	@Action(value="jlMaintainAction_examineMaintain",results={
			@Result(name="success",location="material/maintain/examine.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toExamineMaintain(){
		String id=request.getParameter("id");
		if(null!=id&&!"".equalsIgnoreCase(id)){
			maintain=jlMaintainService.findById(id);
		}
		return "success";
	}
	
	@Action(value="jlMaintainAction_doExamineMaintain",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void doExamineMaintain(){
		String id=request.getParameter("id");
		String state=request.getParameter("state");
		jlMaintainService.saveMaintainState(state,id);
		try {
			this.jsonWrite(true);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
