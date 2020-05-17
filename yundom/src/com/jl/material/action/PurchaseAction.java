package com.jl.material.action;

import java.io.IOException;
import java.util.ArrayList;
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
import com.jl.material.pojo.Purchase;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.material.service.GoodsService;
import com.jl.material.service.InStoreService;
import com.jl.material.service.PurchaseService;
import com.jl.sys.pojo.UserInfo;


@Namespace("/")
@Scope("prototype")
@Component("jlPurchaseInfoAction")
@ParentPackage("json-default")
public class PurchaseAction extends IAction{
	public UserInfo user;
	@Autowired
	public PurchaseService jlPurchaseInfoService; 
	
	@Autowired
	public GoodsService jlGoodsInfoService; 
	@Autowired
	public InStoreService jlInStoreInfoService;
	
	@Action(value="jlPurchaseInfoAction_toAddPurchase",results={
			@Result(name="success",location="material/purchase/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAddPurchase(){
		return "success";
	}
	public Purchase purchase;
	
	
	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}

	public Purchase getPurchase() {
		return purchase;
	}

	public void setPurchase(Purchase purchase) {
		this.purchase = purchase;
	}

	/**
	 * 提交的总记金额页面
	 * @Title jlPurchaseInfoAction_totalIframe
	 * @return
	 * @author zpj
	 * @time 2016-5-17 下午5:08:35
	 */
	@Action(value="jlPurchaseInfoAction_totalIframe",results={
			@Result(name="success",location="material/purchase/add_detail.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_totalIframe(){
		return "success";
	}
	
	
	@Action(value="jlPurchaseInfoAction_toListPurchase",results={
			@Result(name="success",location="material/purchase/purchase_list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_toListPurchase(){
		return "success";
	}
	@Action(value="jlPurchaseInfoAction_toListIframe",results={
			@Result(name="success",location="material/purchase/purchase_list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_toListIframe(){
		return "success";
	}
	
	@Action(value="jlPurchaseInfoAction_toListJson",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void jlPurchaseInfoAction_toListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
		String state=request.getParameter("state");//状态
		String departmentid=request.getParameter("departmentid");//状态
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
		param.put("departmentid", departmentid);
		
		
		Map map=jlPurchaseInfoService.findList(user,page,rows,param);
		List<Map> list=(List<Map>)map.get("list");
		int countNumber=(Integer)map.get("count");
		if(list!=null&&list.size()>0){
			  StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"").append(countNumber).append("\",\"rows\":");
//			  JSONArray jsonArray = JSONArray.fromObject(list);
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
	 * 采购单详细列表跳转
	 * @Title jlPurchaseInfoAction_toListDetail
	 * @return
	 * @author zpj
	 * @time 2016-5-24 上午11:22:02
	 */
	@Action(value="jlPurchaseInfoAction_toListDetail",results={
			@Result(name="success",location="material/purchase/purchase_list_detail.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_toListDetail(){
		String purchaseid=request.getParameter("purchaseid");
		request.setAttribute("purchaseid", purchaseid);
		return "success";
	}
	
	/**
	 * 查询采购单详细
	 * @Title jlPurchaseInfoAction_toListDetailJson
	 * @author zpj
	 * @time 2016-5-24 上午11:26:19
	 */
	@Action(value="jlPurchaseInfoAction_toListDetailJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlPurchaseInfoAction_toListDetailJson(){
				user = (UserInfo)request.getSession().getAttribute("jluserinfo");
				String purchaseid=request.getParameter("purchaseid");//开始时间
				String tpage=request.getParameter("page");
				String trows=request.getParameter("rows");
				if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
					page=Integer.parseInt(tpage);
				}
				if(null!=trows&&!"".equalsIgnoreCase(trows)){
					rows=Integer.parseInt(trows);
				}
				Map<String,String> param=new HashMap<String,String>();
				param.put("purchaseid", purchaseid);
				
				Map map=jlPurchaseInfoService.findDetailList(user,page,rows,param);
				List<Map> list=(List<Map>)map.get("list");
				int countNumber=(Integer)map.get("count");
				if(list!=null&&list.size()>0){
					  StringBuffer str =new StringBuffer();
					  str.append("{\"total\":\"").append(countNumber).append("\",\"rows\":");
//					  JSONArray jsonArray = JSONArray.fromObject(list);
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
	 * 跳转整个页面
	 * @Title toiframe
	 * @return
	 * @author zpj
	 * @time 2016-5-17 下午5:09:04
	 */
	@Action(value="jlPurchaseInfoAction_toiframe",results={
			@Result(name="success",location="material/purchase/add_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	@Action(value="jlPurchaseInfoAction_savePurchase",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlPurchaseInfoAction_savePurchase(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String id=jlPurchaseInfoService.savePurchase(purchase,user);
		try {
			JSONObject job=new JSONObject();
			job.put("flag",true);
			job.put("id", id);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	@Action(value="jlPurchaseInfoAction_savePurchaseDetail",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlPurchaseInfoAction_savePurchaseDetail(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String id=request.getParameter("id");//购物单编号
		String data=request.getParameter("data");
		
		jlPurchaseInfoService.savePurchaseDetail(id,data);
		try {
			JSONObject job=new JSONObject();
			job.put("flag",true);
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 跳转采购单审核页面
	 * @Title jlPurchaseInfoAction_toExaminePurchaseDetail
	 * @return
	 * @author zpj
	 * @time 2016-5-24 下午2:48:19
	 */
	@Action(value="jlPurchaseInfoAction_toExaminePurchaseDetail",results={
			@Result(name="success",location="material/purchase/purchase_list_examine.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_toExaminePurchaseDetail(){
		String purchaseid=request.getParameter("purchaseid");
		request.setAttribute("purchaseid", purchaseid);
		return "success";
	}
	/**
	 * 采购单审核下方区域信息
	 * @Title jlPurchaseInfoAction_toExamine
	 * @return
	 * @author zpj
	 * @time 2016-5-24 下午2:56:27
	 */
	@Action(value="jlPurchaseInfoAction_toExamine",results={
			@Result(name="success",location="material/purchase/purchase_list_examine_detail.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlPurchaseInfoAction_toExamine(){
		String purchaseid=request.getParameter("purchaseid");
		if(purchaseid!=null&&!"".equalsIgnoreCase(purchaseid)){
			purchase=jlPurchaseInfoService.findPurchaseById(purchaseid);
		}
		return "success";
	}
	
	
	
	/**
	 * 保存审核同时入库
	 * @Title jlPurchaseInfoAction_examinePurchase
	 * @author zpj
	 * @time 2016-5-25 下午4:33:27
	 */
	@Action(value="jlPurchaseInfoAction_examinePurchase",
		results={
		@Result(type="json", params={"root","jsonData"})})
	public void jlPurchaseInfoAction_examinePurchase(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String state=request.getParameter("state");
		String id=request.getParameter("id");
		jlPurchaseInfoService.saveExaminePurchase(id,state,user);
		if(state.equalsIgnoreCase("2")){//已通过需要入库的
			Purchase p=jlPurchaseInfoService.findPurchaseById(id);
			List<PurchaseDetail> pd=jlPurchaseInfoService.findPurchaseDetailByPurchaseId(id);
			jlInStoreInfoService.saveInStore(p,pd);
		}
		
		try {
			JSONObject job=new JSONObject();
			job.put("flag",true);
		
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
