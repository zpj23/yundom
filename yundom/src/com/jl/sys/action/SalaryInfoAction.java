package com.jl.sys.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.SalaryInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.SalaryService;

@Namespace("/")
@Scope("prototype")
@Component("jlSalaryInfoAction")
@ParentPackage("json-default")
public class SalaryInfoAction extends IAction{
	
	private static final long serialVersionUID = 1L;

	private UserInfo user;
	
	private SalaryInfo sInfo;
	
	
	
	public SalaryInfo getsInfo() {
		return sInfo;
	}

	public void setsInfo(SalaryInfo sInfo) {
		this.sInfo = sInfo;
	}

	@Autowired
	private SalaryService salaryService;
	
	@Action(value="jlSalaryInfoAction_toList",results={
			@Result(name="success",location="sys/salary/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	
	@Action(value="jlSalaryInfoAction_toiframe",results={
			@Result(name="success",location="sys/salary/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	private File file;
	
	
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	@Action(value="jlSalaryInfoAction_importExcel",results={
			@Result(name="success",location="sys/salary/list.jsp"),
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
//				inputStream = new FileInputStream("D://预付工资表2019-1月份.xls");
				List list = ExcelUtils.getInstance().readExcel(inputStream);
				salaryService.importExcel(list,"jl_salary_info",user);
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
	
	@Action(value="jlSalaryInfoAction_getListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getUserListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String username=request.getParameter("username");//用户名称
		String year=request.getParameter("year");//年月
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("year", year);
		param.put("username", username);
		Map map=salaryService.findList(user,page,rows,param);
		List<UserInfo> list=(List<UserInfo>)map.get("list");
		int countNumber=(Integer)map.get("count");
//		request.setAttribute("zgs", (Double)map.get("zgs"));
		if(list!=null&&list.size()>0){
			  StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"").append(countNumber).append("\",\"rows\":");
//			  JSONArray jsonArray = JSONArray.fromObject(list);
			  String lstr=gson.toJson(list);
			  str.append(lstr);
			  str.append(",\"footer\":[{\"id\":\"1\",\"userName\":\"\",\"bankName\":\"\",\"bankCard\":\"合计：\",\"advance\":\""+(Double)map.get("wzgs")+"\",\"remark\":\"\",\"year\":\"\"}]");
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
	
	@Action(value="jlSalaryInfoAction_toAdd",results={
			@Result(name="success",location="sys/salary/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String id=request.getParameter("id");
		if(id!=null&&!id.equalsIgnoreCase("")){
			sInfo=salaryService.findById(id);
		}else{
			sInfo=new SalaryInfo();
			sInfo.setId(UUID.randomUUID().toString());
		}
		return "success";
	}
	
	@Action(value="jlSalaryInfoAction_doAdd",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void doSave(){
		
		try {
			sInfo.setCreateTime(new Date());
			salaryService.saveInfo(sInfo);     
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
	
	@Action(value="jlSalaryInfoAction_doDel",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void doDel(){
		String id=request.getParameter("id");
		if(null!=id&&!id.equalsIgnoreCase("")){
			salaryService.delInfo(id);
			try {
				this.jsonWrite(1);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
}
