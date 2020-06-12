package com.jl.sys.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.text.ParseException;
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

import com.jl.common.ExcelUtils;
import com.jl.common.IAction;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.DepartmentInfoService;
import com.jl.sys.service.RoleInfoService;
import com.jl.sys.service.UserInfoService;

/**
 * @Description: 用户后台功能
 * @ClassName: UserInfoAction
 * @author zpj 
 * @date 2016-3-30 上午10:08:05
 *
 */
@Namespace("/")
@Scope("prototype")
@Component("jlUserInfoAction")
@ParentPackage("json-default")
public class UserInfoAction extends IAction{

	@Autowired
	private UserInfoService jlUserInfoService;
	@Autowired
	private RoleInfoService jlRoleInfoService;
	
	private String role_id_list;
	private String role_id_list_name;
	
	
	
	public String getRole_id_list() {
		return role_id_list;
	}

	public void setRole_id_list(String role_id_list) {
		this.role_id_list = role_id_list;
	}

	public String getRole_id_list_name() {
		return role_id_list_name;
	}

	public void setRole_id_list_name(String role_id_list_name) {
		this.role_id_list_name = role_id_list_name;
	}

	public UserInfoService getJlUserInfoService() {
		return jlUserInfoService;
	}

	public void setJlUserInfoService(UserInfoService jlUserInfoService) {
		this.jlUserInfoService = jlUserInfoService;
	}
	@Autowired
	private DepartmentInfoService jlDepartmentInfoService;
	public DepartmentInfoService getJlDepartmentInfoService() {
		return jlDepartmentInfoService;
	}

	public void setJlDepartmentInfoService(
			DepartmentInfoService jlDepartmentInfoService) {
		this.jlDepartmentInfoService = jlDepartmentInfoService;
	}

	
	
	private File file;
	
	private UserInfo user;

	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	/**
	 * 保存用户
	 * @Title saveUser
	 * @author zpj
	 * @time 2016-2-19 上午10:04:12
	 */
	@Action(value="jlUserInfoAction_saveUser",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveUser(){
		
		if(user.getId()!=0){
			user.setUpdatetime(new Date());
//			user.setUpdateuserid(ui.getId());
			UserInfo ui=jlUserInfoService.findById(user.getId());
			user.setCreatetime(ui.getCreatetime());
			user.setCreateuserid(ui.getCreateuserid());
			jlUserInfoService.saveUser(user);
		}else{
			user.setCreatetime(new Date());
//			user.setCreateuserid(ui.getId());
			jlUserInfoService.saveUser(user);
		}
		jlRoleInfoService.saveRoleUser(role_id_list, user.getId());
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
	 * 打开新增页面
	 * @Title jlLoginAction_toAdd
	 * @return
	 * @author zpj
	 * @time 2016-2-19 上午10:04:01
	 */
	@Action(value="jlUserInfoAction_toAdd",results={
			@Result(name="success",location="sys/user/add.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		String id=request.getParameter("id");
		user=null;
		StringBuffer temp1=new StringBuffer(50);
		StringBuffer temp2=new StringBuffer(50);
		if(null!=id&&!"".equalsIgnoreCase(id)){
			user=jlUserInfoService.findById(Integer.parseInt(id));
			List<Object[]> list=jlRoleInfoService.findRoleIdByUserId(user.getId());
			for(int m=0;m<list.size();m++){
				if(m>0){
					temp1.append(",");
					temp2.append(",");
				}
				temp1.append(list.get(m)[0]);
				temp2.append(list.get(m)[2]);
			}
			
		}
		if(user==null){
			user=new UserInfo();
		}
		role_id_list=temp1.toString();
		role_id_list_name=temp2.toString();
		return "success";
	}
	
	/**
	 * 跳转列表页面
	 * @Title toList
	 * @return
	 * @author zpj
	 * @time 2016-2-16 下午4:33:51
	 */
	@Action(value="jlUserInfoAction_toList",results={
			@Result(name="success",location="sys/user/list.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	@Action(value="jlUserInfoAction_toiframe",results={
			@Result(name="success",location="sys/user/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	/**
	 * 选择用户
	 * @Title chooseUser
	 * @return
	 * @author zpj
	 * @time 2016-3-29 上午10:39:09
	 */
	@Action(value="jlUserInfoAction_chooseUser",results={
			@Result(name="success",location="sys/common/choose_user.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String chooseUser(){
		return "success";
	}
	@Action(value="jlUserInfoAction_getUserListJsonByChoose",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlUserInfoAction_getUserListJsonByChoose(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
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
		
		Map map=jlUserInfoService.findList(user,page,rows,param);
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
	
	
	/**
	 * 查询iframe页面列表信息
	 * @Title getUserListJson
	 * @author zpj
	 * @time 2016-2-16 下午4:34:06
	 */
	@Action(value="jlUserInfoAction_getUserListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getUserListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
		String departmentid=request.getParameter("departmentcode");//部门id
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
		param.put("departmentid", departmentid);
		Map map=jlUserInfoService.findList(user,page,rows,param);
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

	/**
	 * 启用和停用用户
	 * @Title ssUser
	 * @author zpj
	 * @time 2016-2-19 上午10:06:00
	 */
	@Action(value="jlUserInfoAction_ssUser",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void ssUser(){
		String id=request.getParameter("id");
		if(null!=id&&!id.equalsIgnoreCase("")){
			UserInfo ui= jlUserInfoService.findById(Integer.parseInt(id));
			if(ui.getIsdel()==0){//启用中
				ui.setIsdel(1);//停用
			}else if(ui.getIsdel()==1){//停用中
				ui.setIsdel(0);//启用
			}
			int fl=jlUserInfoService.saveUser(ui);
			try {
				this.jsonWrite(fl);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@Action(value="jlUserInfoAction_delUser",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delUser(){
		String id=request.getParameter("id");
		if(null!=id&&!id.equalsIgnoreCase("")){
			jlUserInfoService.delUser(Integer.parseInt(id));
			try {
				this.jsonWrite(1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	@Action(value="jlUserInfoAction_importExcel",results={
			@Result(name="success",location="sys/user/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String importExcel(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		InputStream inputStream;
		String retStr="success";
		if(file==null){
			retStr="未选择导入文件";
		}else{
			try {
				inputStream = new FileInputStream(file);
				List list = ExcelUtils.getInstance().readExcel(inputStream);
				jlUserInfoService.importExcel(list,"jl_user_info",user);
			} catch (FileNotFoundException e) {
				e.printStackTrace();
				retStr="未找到文件";
			} catch (Exception e) {
				retStr="数据格式不正确";
				e.printStackTrace();
			}
		}
		return "success";
		
	}
	@Action(value="jlUserInfoAction_changePw",results={
			@Result(name="success",location="sys/user/updatePw.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String jlUserInfoAction_changePw(){
		String id=request.getParameter("id");
		if(id!=null&&!"".equalsIgnoreCase(id)){
			user=jlUserInfoService.findById(Integer.parseInt(id));
		}
		return "success";
	}
	
	@Action(value="jlUserInfoAction_saveUserPw",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveUserPw(){
		jlUserInfoService.saveUserPw(user);
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
}
