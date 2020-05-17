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
import com.jl.material.pojo.Goods;
import com.jl.material.service.GoodsService;
import com.jl.sys.pojo.UserInfo;


@Namespace("/")
@Scope("prototype")
@Component("jlGoodsInfoAction")
@ParentPackage("json-default")
public class GoodsAction extends IAction {

	public UserInfo user;
	public Goods goods;
	@Autowired
	public GoodsService jlGoodsInfoService; 
	


	public Goods getGoods() {
		return goods;
	}

	public void setGoods(Goods goods) {
		this.goods = goods;
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
	@Action(value="jlGoodsInfoAction_toListGoods",results={
			@Result(name="success",location="material/goods/list.jsp"),
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
	@Action(value="jlGoodsInfoAction_toAddGoods",results={
			@Result(name="success",location="material/goods/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAddGoods(){
		String id=request.getParameter("id");
		goods=null;
		if(null!=id&&!"".equalsIgnoreCase(id)){
			goods=jlGoodsInfoService.findById(Integer.parseInt(id));
		}
		if(goods==null){
			goods=new Goods();
		}
		return "success";
	}
	
	
	/**
	 * 保存供应商信息
	 * @Title saveSupplier
	 * @author zpj
	 * @time 2016-4-8 下午2:02:09
	 */
	@Action(value="jlGoodsInfoAction_saveGoods",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void saveGoods(){
		int m=jlGoodsInfoService.save(goods);
		try {
			JSONObject job=new JSONObject();
			job.put("status",m);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	
	@Action(value="jlGoodsInfoAction_toiframe",results={
			@Result(name="success",location="material/goods/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	/**
	 * datagrid列表
	 * @Title getSupplierListJson
	 * @author zpj
	 * @time 2016-4-8 下午2:54:25
	 */
	@Action(value="jlGoodsInfoAction_getGoodsListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getSupplierListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//物资名称
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
		
		Map map=jlGoodsInfoService.findList(user,page,rows,param);
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
	
	/**
	 * 物资列表下拉框
	 * @Title jlGoodsInfoAction_getGoodsInfo
	 * @author zpj
	 * @time 2016-6-16 上午11:52:23
	 */
	@Action(value="jlGoodsInfoAction_getGoodsInfo",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlGoodsInfoAction_getGoodsInfo(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//物资名称
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
		
		Map map=jlGoodsInfoService.findList(user,1,100,param);
		List list=(List)map.get("list");
		try {
			this.jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 删除物资信息
	 * @Title delGoods
	 * @author zpj
	 * @time 2016-6-16 上午11:52:00
	 */
	@Action(value="jlGoodsInfoAction_delGoods",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delGoods(){
		String id=request.getParameter("id");
		int m=0;
		if(null!=id&&!id.equalsIgnoreCase("")){
			m=jlGoodsInfoService.delGoods(Integer.parseInt(id));
			
		}
		try {
			this.jsonWrite(m);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
}
