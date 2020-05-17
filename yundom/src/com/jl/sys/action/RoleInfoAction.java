package com.jl.sys.action;

import java.io.IOException;
import java.util.Date;
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
import com.jl.sys.pojo.RoleInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.RoleInfoService;


@Namespace("/")
@Scope("prototype")
@Component("jlRoleInfoAction")
@ParentPackage("json-default")
public class RoleInfoAction extends IAction {
	
	private UserInfo user;
	
	public String role_user_list_id;
	public String role_user_list_name;
	public String role_department_list_id;
	public String role_department_list_name;
	
	
	public String getRole_user_list_id() {
		return role_user_list_id;
	}

	public void setRole_user_list_id(String role_user_list_id) {
		this.role_user_list_id = role_user_list_id;
	}

	public String getRole_user_list_name() {
		return role_user_list_name;
	}

	public void setRole_user_list_name(String role_user_list_name) {
		this.role_user_list_name = role_user_list_name;
	}

	public String getRole_department_list_id() {
		return role_department_list_id;
	}

	public void setRole_department_list_id(String role_department_list_id) {
		this.role_department_list_id = role_department_list_id;
	}

	public String getRole_department_list_name() {
		return role_department_list_name;
	}

	public void setRole_department_list_name(String role_department_list_name) {
		this.role_department_list_name = role_department_list_name;
	}

	public RoleInfoService getJlRoleInfoService() {
		return jlRoleInfoService;
	}

	public void setJlRoleInfoService(RoleInfoService jlRoleInfoService) {
		this.jlRoleInfoService = jlRoleInfoService;
	}

	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	public RoleInfo role;
	
	public String menuIds;
	
	public String getMenuIds() {
		return menuIds;
	}

	public void setMenuIds(String menuIds) {
		this.menuIds = menuIds;
	}
	@Autowired
	public RoleInfoService jlRoleInfoService; 
	
	public RoleInfo getRole() {
		return role;
	}

	public void setRole(RoleInfo role) {
		this.role = role;
	}




	/**
	 * 保存角色信息
	 * @Title saveRole
	 * @author zpj
	 * @time 2016-4-22 下午4:41:42
	 */
	@Action(value="jlRoleInfoAction_saveRole",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveRole(){
		menuIds=request.getParameter("menuIds");
		int id=role.getId();
		//根据部门编码获取部门名称
		if(id!=0){//编辑
			RoleInfo ui=jlRoleInfoService.findById(role.getId());
			role.setCreatetime(ui.getCreatetime());
			role.setRolecode(ui.getRolecode());
			jlRoleInfoService.saveRole(role);
		}else{//新增
			role.setCreatetime(new Date());
			role.setRolecode("ROLE_"+System.currentTimeMillis());
			id=jlRoleInfoService.saveRole(role);
		}
		jlRoleInfoService.saveRoleMenu(id,menuIds); 
		jlRoleInfoService.saveRoleUser(id,role_user_list_id);
		jlRoleInfoService.saveRoleDepartment(id,role_department_list_id);
		try {
			JSONObject job=new JSONObject();
			job.put("status","y");
			job.put("statusText", "保存成功");
			job.put("readyState", "true");
			job.put("responseText", "true");
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 这里用一句话描述这个方法的作用
	 * @Title jlLoginAction_toAdd
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午4:44:08
	 */
	@Action(value="jlRoleInfoAction_toAdd",results={
			@Result(name="success",location="sys/role/add.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		String id=request.getParameter("id");
		role=null;
		menuIds="";
		role_user_list_id="";
		role_user_list_name="";
		role_department_list_id="";
		role_department_list_name="";
		if(null!=id&&!"".equalsIgnoreCase(id)){
			role=jlRoleInfoService.findById(Integer.parseInt(id));
			menuIds=jlRoleInfoService.findRoleMenuByRoleId(Integer.parseInt(id));
			String str =jlRoleInfoService.findRoleUserByRoleId(Integer.parseInt(id));
			if(!str.equalsIgnoreCase("null*null")){
				role_user_list_id=str.split("\\*")[0];
				role_user_list_name=str.split("\\*")[1];
			}
			String str1 =jlRoleInfoService.findRoleDepartmentByRoleId(Integer.parseInt(id));
			if(!str1.equalsIgnoreCase("null*null")){
				role_department_list_id=str1.split("\\*")[0];
				role_department_list_name=str1.split("\\*")[1];
			}
		}
		if(role==null){
			role=new RoleInfo();
		}
		return "success";
	}
	
	@Action(value="jlRoleInfoAction_toList",results={
			@Result(name="success",location="sys/role/list.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	@Action(value="jlRoleInfoAction_toiframe",results={
			@Result(name="success",location="sys/role/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	@Action(value="jlRoleInfoAction_getRoleListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getRoleListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//角色名称
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
		
		Map map=jlRoleInfoService.findList(user,page,rows,param);
		List<UserInfo> list=(List<UserInfo>)map.get("list");
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
	
	@Action(value="jlRoleInfoAction_showRoleTree",results={
			@Result(name="success",location="sys/role/menu.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlRoleInfoAction_showRoleTree(){
		return "success";
	}
	
	@Action(value="jlRoleInfoAction_delRole",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delRole(){
		String id=request.getParameter("id");
		if(null!=id&&!id.equalsIgnoreCase("")){
			jlRoleInfoService.delRole(Integer.parseInt(id));
			try {
				this.jsonWrite(1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@Action(value="jlRoleInfoAction_toAddUser",results={
			@Result(name="success",location="sys/common/choose_user_multi.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlRoleInfoAction_toAddUser(){
		return "success";
	}
	
	
	@Action(value="jlRoleInfoAction_toAddRole",results={
			@Result(name="success",location="sys/common/choose_role_multi.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlRoleInfoAction_toAddRole(){
		return "success";
	}
}
