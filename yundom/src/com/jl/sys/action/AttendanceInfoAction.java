package com.jl.sys.action;


import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.AttendanceInfoService;
import com.jl.util.ExcelUtil;

/**
 * @Description: 考勤功能后台
 * @ClassName: AttendenceInfoAction
 * @author zpj 
 * @date 2016-3-30 上午10:09:28
 *
 */
@Namespace("/")
@Scope("prototype")
@Component("jlAttendanceInfoAction")
@ParentPackage("json-default")
public class AttendanceInfoAction extends IAction {
	public UserInfo user;
	@Autowired
	public AttendanceInfoService jlAttendanceInfoService;
	private File file;
	
	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}
	
	public UserInfo getUser() {
		return user;
	}

	public void setUser(UserInfo user) {
		this.user = user;
	}
	
	/**
	 * 跳转考勤列表
	 * @Title toAttandance
	 * @return
	 * @author zpj
	 * @time 2016-3-30 上午10:11:57
	 */
	@Action(value="jlAttendanceInfoAction_toList",results={
			@Result(name="success",location="sys/attandance/list.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toAttandance(){
		return "success";
	}
	
	@Action(value="jlAttendanceInfoAction_toiframe",results={
			@Result(name="success",location="sys/attandance/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	/**
	 * 跳转考勤导入页面
	 * @Title toImportAttendance
	 * @return
	 * @author zpj
	 * @time 2017-3-25 下午3:38:55
	 */
	@Action(value="jlAttendanceInfoAction_toImportAttendance",results={
			@Result(name="success",location="sys/attandance/deal.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toImportAttendance(){
		return "success";
	}
	
	/**
	 * 跳转 考勤汇总信息列表
	 * @Title toListTotalInfo
	 * @return
	 * @author zpj
	 * @time 2017-3-25 下午2:27:33
	 */
	@Action(value="jlAttendanceInfoAction_toListTotalInfo",results={
			@Result(name="success",location="sys/attandance_total/list.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toListTotalInfo(){
		return "success";
	}
	
	
	/**
	 *  考勤汇总信息页面中嵌入的iframe页面跳转
	 * @Title toListTotalInfoIframe
	 * @return
	 * @author zpj
	 * @time 2017-3-25 下午2:28:23
	 */
	@Action(value="jlAttendanceInfoAction_toListTotalInfoIframe",results={
			@Result(name="success",location="sys/attandance_total/list_iframe.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String toListTotalInfoIframe(){
		return "success";
	}
	/**
	 * 考勤汇总列表datagrid初始化
	 * @Title totalInfoDatagrid
	 * @author zpj
	 * @time 2017-3-25 下午2:22:55
	 */
	@Action(value="jlAttendanceInfoAction_ATIDatagrid",results={
			@Result(type="json", params={"root","jsonData"})
	})
	public void totalInfoDatagrid(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		String id=request.getParameter("id");
		String type=request.getParameter("type");
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
		
		Map map=jlAttendanceInfoService.findList(user,page,rows,param);
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
	 * 双击部门，列出部门下面所有的人员的考勤信息，双击人员，列出某个人员所有的考勤信息
	 * @Title jlAttendanceInfoAction_toListOne
	 * @return
	 * @author zpj
	 * @time 2016-4-6 下午4:47:02
	 */
	@Action(value="jlAttendanceInfoAction_toListOne",results={
			@Result(name="success",location="sys/attandance/list_attandance.jsp"),//fashionHome.jsp
			@Result(name="error",location="/login.jsp")
	})
	public String jlAttendanceInfoAction_toListOne(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//用户名称
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		String id=request.getParameter("id");
		String type=request.getParameter("type");
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
		
		Map map=jlAttendanceInfoService.findList(user,page,rows,param);
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
		return "success";
	}
	
	/**
	 * 考勤导入文件的处理
	 * @Title jlAttendanceInfoAction_importExcel
	 * @return
	 * @author zpj
	 * @time 2017-3-25 下午3:43:13
	 */
	@Action(value="jlAttendanceInfoAction_importExcel",results={
			@Result(name="success",location="sys/attandance_total/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String importExcel(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String retStr="success";
		if(file==null){
			retStr="未选择导入文件";
		}else{
			try {
				jlAttendanceInfoService.fileAnalysis(file);
				
			}catch (Exception e) {
				retStr="数据格式不正确";
				e.printStackTrace();
			}
		}
		return "success";
		
	}
	
//	public static void main(String[] args) {
//		testRead();
//	}
//	
//	public static void testRead() {  
//	    try {  
//	          
//	         	ExcelUtil eu = new ExcelUtil();  
//		        eu.setExcelPath("d:\\11月份汇总表-南通.xls");
//		        eu = eu.RestoreSettings();//还原设定  
////		        eu.setExcelPath("d:\\人员导入文件.xls");  
////		        eu.setExcelPath("d:\\汇总表.xls");  
//		        System.out.println("\n=======测试Excel 读取一个sheet==汇总表======");  
//		        eu.setSelectedSheetIdx(0);
//		        List<HSSFRow> list=eu.readExcel();  
//		        System.out.println("\n=======测试Excel 读取二个sheet==打卡记录======");  
//		        eu.setSelectedSheetIdx(1);  
//		        eu.readExcel();  
//		        System.out.println("\n=======测试Excel 读取三个sheet==异常表======");  
//		        eu.setSelectedSheetIdx(2);  
//		        eu.readExcel();  
//	          
//	    } catch (IOException e) {  
//	        e.printStackTrace();  
//	    }  
//	}  
}
