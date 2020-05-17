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
import com.jl.material.pojo.Supplier;
import com.jl.material.service.SupplierService;
import com.jl.sys.pojo.UserInfo;

@Namespace("/")
@Scope("prototype")
@Component("jlSupplierInfoAction")
@ParentPackage("json-default")
public class SupplierAction extends IAction {

	public Supplier supper;
	public UserInfo user;

	@Autowired
	public SupplierService jlSupplierInfoService; 
	
	public Supplier getSupper() {
		return supper;
	}

	public void setSupper(Supplier supper) {
		this.supper = supper;
	}


	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	/**
	 * 跳转供应商管理页面
	 * @Title toListSupplier
	 * @return
	 * @author zpj
	 * @time 2016-4-8 上午11:35:58
	 */
	@Action(value="jlSupplierInfoAction_toListSupplier",results={
			@Result(name="success",location="material/supplier/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toListSupplier(){
		return "success";
	}
	
	/**
	 * 跳转新增供应商页面
	 * @Title toAddSupplier
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午2:01:53
	 */
	@Action(value="jlSupplierInfoAction_toAddSupplier",results={
			@Result(name="success",location="material/supplier/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAddSupplier(){
		String id=request.getParameter("id");
		supper=null;
		if(null!=id&&!"".equalsIgnoreCase(id)){
			supper=jlSupplierInfoService.findById(Integer.parseInt(id));
		}
		if(supper==null){
			supper=new Supplier();
		}
		return "success";
	}
	
	
	/**
	 * 保存供应商信息
	 * @Title saveSupplier
	 * @author zpj
	 * @time 2016-4-8 下午2:02:09
	 */
	@Action(value="jlSupplierInfoAction_saveSupplier",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void saveSupplier(){
		int m=jlSupplierInfoService.save(supper);
		try {
			JSONObject job=new JSONObject();
			job.put("status",m);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	@Action(value="jlSupplierInfoAction_toiframe",results={
			@Result(name="success",location="material/supplier/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	/**
	 * 列表
	 * @Title getSupplierListJson
	 * @author zpj
	 * @time 2016-4-8 下午2:54:25
	 */
	@Action(value="jlSupplierInfoAction_getSupplierListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getSupplierListJson(){
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
		
		Map map=jlSupplierInfoService.findList(user,page,rows,param);
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
	@Action(value="jlSupplierInfoAction_getSupplier",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getSupplier(){
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
		rows=100;
		Map<String,String> param=new HashMap<String,String>();
		param.put("datemin", datemin);
		param.put("datemax", datemax);
		param.put("username", username);
		param.put("state", state);
		Map map=jlSupplierInfoService.findList(user,1,100,param);
		List list=(List)map.get("list");
		try {
			this.jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@Action(value="jlSupplierInfoAction_delSupplier",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delSupplier(){
		String id=request.getParameter("id");
		int m=0;
		if(null!=id&&!id.equalsIgnoreCase("")){
			m=jlSupplierInfoService.delSupplier(Integer.parseInt(id));
			
		}
		try {
			this.jsonWrite(m);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
