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
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.ShoppingService;


@Namespace("/")
@Scope("prototype")
@Component("jlShoppingAction")
@ParentPackage("json-default")
public class ShoppingAction extends IAction{
	
	private UserInfo user;
	@Autowired
	private ShoppingService shoppingService;
	
	/**
	 * 跳转列表页面
	 * @Title toList
	 * @return
	 * @author zpj
	 * @time 2018-3-22 下午2:56:48
	 */
	@Action(value="jlShoppingAction_toList",results={
			@Result(name="success",location="sys/shopping/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	
	
	@Action(value="jlShoppingAction_toiframe",results={
			@Result(name="success",location="sys/shopping/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	@Action(value="jlShoppingAction_managerIframe",results={
			@Result(name="success",location="sys/shopping/manager_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String managerIframe(){
		return "success";
	}
	@Action(value="jlShoppingAction_toManagerAdd",results={
			@Result(name="success",location="sys/shopping/manager_add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toManagerAdd(){
		return "success";
	}
	
	
	
	
	@Action(value="jlShoppingAction_getListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getUserListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
		String departmentid=request.getParameter("departmentid");//部门id
		String sgxm = request.getParameter("sgxm");//施工项目
		String sgqy=request.getParameter("sgqy");//施工区域
		String workcontent =request.getParameter("workcontent");//工作内容
		String shenhe=request.getParameter("shenhe");//审核状态
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		String lrrname=request.getParameter("lrrname");//录入人
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
		param.put("departmentid", departmentid);
		param.put("sgxm", sgxm);
		param.put("sgqy", sgqy);
		param.put("workcontent", workcontent);
		param.put("shenhe", shenhe);
		param.put("lrrname", lrrname);
		Map map=shoppingService.findList(user,page,rows,param);
		List<UserInfo> list=(List<UserInfo>)map.get("list");
		int countNumber=(Integer)map.get("count");
		request.setAttribute("zgs", (Double)map.get("zgs"));
		if(list!=null&&list.size()>0){
			  StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"").append(countNumber).append("\",\"rows\":");
//			  JSONArray jsonArray = JSONArray.fromObject(list);
			  String lstr=gson.toJson(list);
			  str.append(lstr);
//			  if(user.getIsAdmin().equalsIgnoreCase("1")){
			  str.append(",\"footer\":[{\"id\":\"1\",\"departmentname\":\""+(Double)map.get("zgs")+"\",\"workdate\":\"\",\"workduringtime\":\""+(Double)map.get("wzgs")+"\",\"workcontent\":\"合计\",\"overtime\":\""+(Double)map.get("ozgs")+"\",\"staffname\":\"\"}]");
//			  }
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
