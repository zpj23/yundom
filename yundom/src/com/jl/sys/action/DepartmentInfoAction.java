package com.jl.sys.action;

import java.io.IOException;
import java.util.ArrayList;
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
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.DepartmentInfoService;
import com.jl.sys.service.UserInfoService;


/**
 * @Description: 部门后台功能
 * @ClassName: DepartmentInfoAction
 * @author zpj 
 * @date 2016-3-30 上午10:07:36
 *
 */
@Namespace("/")
@Scope("prototype")
@Component("jlDepartmentInfoAction")
@ParentPackage("json-default")
public class DepartmentInfoAction extends IAction{
	@Autowired
	public DepartmentInfoService jlDepartmentInfoService;
	@Autowired
	public UserInfoService jlUserInfoService;
	public UserInfo user;
	public DepartmentInfo dep;
	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	public DepartmentInfo getDep() {
		return dep;
	}

	public void setDep(DepartmentInfo dep) {
		this.dep = dep;
	}

	@Action(value="jlDepartmentInfoAction_toList",results={
			@Result(name="success",location="sys/department/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	
	@Action(value="jlDepartmentInfoAction_toiframe",results={
			@Result(name="success",location="sys/department/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	/**
	 * 获取部门下拉框列表值
	 * @Title jlDepartmentInfoAction_getDep
	 * @author zpj
	 * @time 2016-3-29 下午3:34:59
	 */
	@Action(value="jlDepartmentInfoAction_getDep",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlDepartmentInfoAction_getDep(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String name=request.getParameter("username");//用户名称
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
		param.put("name", name);
		
		Map map=jlDepartmentInfoService.findList(user,page,rows,param);
		List<Map> list=(List<Map>)map.get("list");
		List<Map> temp=new ArrayList<Map>();
		for(int i=0;i<list.size();i++){
			if(list.get(i).get("parent_code")==null||list.get(i).get("parent_code").toString().equalsIgnoreCase("")){
				continue;
			}else{
//				if(list.get(i).get("name").equals("admin")){
//					continue;
//				}
				temp.add(list.get(i));
			}
			
		}
		try {
			this.jsonWrite(temp);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 获取department 列表信息
	 * @Title getDepartmentListJson
	 * @author zpj
	 * @time 2016-3-11 下午1:31:42
	 */
	@Action(value="jlDepartmentInfoAction_getDepartmentListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getDepartmentListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String name=request.getParameter("username");//用户名称
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("name", name);
		
		Map map=jlDepartmentInfoService.findList(user,page,rows,param);
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
	@Action(value="jlDepartmentInfoAction_toAdd",results={
			@Result(name="success",location="sys/department/add.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		String id=request.getParameter("id");//当前节点id
		String pid=request.getParameter("pid");//父节点id
		dep=null;
		if(null!=id&&!"".equalsIgnoreCase(id)){//判断是否是新增还是编辑
			dep=jlDepartmentInfoService.findById(Integer.parseInt(id));
		}
		if(dep==null){//进则是新增
			dep=new DepartmentInfo();
			if(null!=pid&&!"".equalsIgnoreCase(pid)){
				DepartmentInfo d=jlDepartmentInfoService.findById(Integer.parseInt(pid));
				dep.setParent_code(d.getCode());
				dep.setParent_name(d.getName());
			}
		}
		return "success";
	}
	/**
	 * 保存部门信息
	 * @Title saveDepartment
	 * @return
	 * @author zpj
	 * @time 2016-3-29 下午2:03:29
	 */
	@Action(value="jlDepartmentInfoAction_saveDepartment",
			results={
			@Result(type="json", params={"root","jsonData"})
	}
	)
	public void saveDepartment(){
		int t=jlDepartmentInfoService.saveDepartment(dep);
		try {
			this.jsonWrite(t);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	/**
	 * 删除部门
	 * @Title doRemove
	 * @author zpj
	 * @time 2016-6-16 上午11:40:27
	 */
	@Action(value="jlDepartmentInfoAction_doRemove",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void doRemove(){
		String id=request.getParameter("id");
		int t=0;
		if(id!=null){
			DepartmentInfo dp=jlDepartmentInfoService.findById(Integer.parseInt(id));
			if(dp!=null){
				t=jlDepartmentInfoService.remove(dp);
			}
		}
		try {
			this.jsonWrite(t);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	/**
	 * 部门管理菜单中用的
	 * 只查询部门信息，不查询部门下用户的信息
	 * @Title showChildNode
	 * @author zpj
	 * @time 2016-3-31 下午3:02:24
	 */
	@Action(value="jlDepartmentInfoAction_showChildNode",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void showChildNode(){
		String id=request.getParameter("id");
		String name = request.getParameter("name");
		Map<String,String> param=new HashMap<String,String>();
		param.put("name", name);
		param.put("code", id);
		if(id!=null&&!id.equalsIgnoreCase("")){
			this.jsonData = jlDepartmentInfoService.findDeptJson(param);
		}else{
			this.jsonData=jlDepartmentInfoService.findTopJson();
		}
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 查子节点组织机构或者子节点下的用户
	 * @Title showChildNodeOrUser
	 * @author zpj
	 * @time 2016-3-31 下午3:26:39
	 */
	@Action(value="jlDepartmentInfoAction_showChildNodeOrUser",
			results={
			@Result(type="json", params={"root","jsonData"})})
			public void showChildNodeOrUser(){
				String id=request.getParameter("id");
				String name = request.getParameter("name");
				Map<String,String> param=new HashMap<String,String>();
				param.put("name", name);
				param.put("code", id);
				if(id!=null&&!id.equalsIgnoreCase("")){
					this.jsonData = jlDepartmentInfoService.findDeptOrUserJson(param);
				}else{
					this.jsonData=jlDepartmentInfoService.findTopJson();
				}
				try {
					this.jsonWrite(jsonData);
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
	
	@Action(value="jlRoleInfoAction_toAddDepartment",results={
			@Result(name="success",location="sys/common/choose_department.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAddDepartment(){
		return "success";
	}
	
	@Action(value="jlDepartmentInfoAction_showCheckTree",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlDepartmentInfoAction_showCheckTree(){
		String checkids=request.getParameter("checkids");
		this.jsonData=jlDepartmentInfoService.findAllJson(checkids);
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	
	
	/**
	 * 跳转部门用户分布图
	 * @Title toListUserDistribute
	 * @return
	 * @author zpj
	 * @time 2016-6-4 上午9:01:02
	 */
	@Action(value="jlDepartmentInfoAction_toListUserDistribute",results={
			@Result(name="success",location="sys/department/du.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toListUserDistribute(){
		return "success";
	}
	
	
	
	/**
	 * 初始化查询部门用户分布信息
	 * @Title jlDepartmentInfoAction_initDu
	 * @author zpj
	 * @time 2016-6-4 上午9:01:16
	 */
	@Action(value="jlDepartmentInfoAction_initDu",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void jlDepartmentInfoAction_initDu(){
		List<Map> list=jlUserInfoService.findUserCountByDep();
		try {
			this.jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
