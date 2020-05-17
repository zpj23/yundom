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
import com.jl.material.service.StoreService;
import com.jl.sys.pojo.UserInfo;

@Namespace("/")
@Scope("prototype")
@Component("jlStoreAction")
@ParentPackage("json-default")
public class StoreAction extends IAction {
	@Autowired
	public StoreService jlStoreInfoService;
	
	public UserInfo user;
	
	
	
	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	@Action(value="jlStoreAction_getStoreInfo",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlStoreAction_getStoreInfo(){
		List<Map> list=jlStoreInfoService.findAllStore();
		try {
			this.jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	@Action(value="jlStoreAction_getDetail",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void jlStoreAction_getDetail(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String goodsid=request.getParameter("goodsid");//
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
		param.put("goodsid", goodsid);
		
		Map map=jlStoreInfoService.findInOutDetail(user,page,rows,param);
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
	
	
	@Action(value="jlStoreAction_getStoreListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlStoreAction_getStoreListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//
		String state=request.getParameter("state");//
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
		
		Map map=jlStoreInfoService.findList(user,page,rows,param);
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
	@Action(value="jlStoreAction_toiframe",results={
			@Result(name="success",location="material/store/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	@Action(value="jlStoreAction_toList",results={
			@Result(name="success",location="material/store/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	/**
	 *	库存查询详细
	 * @Title jlStoreAction_getDetailBygoodsid
	 * @return
	 * @author zpj
	 * @time 2018-3-24 上午9:23:21
	 */
	@Action(value="jlStoreAction_getDetailBygoodsid",results={
			@Result(name="success",location="material/store/detail.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlStoreAction_getDetailBygoodsid(){
		String goodsid=request.getParameter("goodsid");
		request.setAttribute("goodsid", goodsid);
		return "success";
	}
	
}
