package com.jl.material.action;

import java.io.IOException;
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

import com.jl.common.IAction;
import com.jl.material.pojo.RecordInfo;
import com.jl.material.pojo.RecordInfoDetail;
import com.jl.material.service.RecordService;
import com.jl.sys.pojo.UserInfo;

import net.sf.json.JSONArray;

@Namespace("/")
@Scope("prototype")
@Component("jlRecordInfoAction")
@ParentPackage("json-default")
public class RecordAction extends IAction{
	
	public UserInfo user;
	
	public RecordInfo recordInfo;
	
	
	public RecordInfo getRecordInfo() {
		return recordInfo;
	}


	public void setRecordInfo(RecordInfo recordInfo) {
		this.recordInfo = recordInfo;
	}

	@Autowired
	public RecordService recordService;
	
	@Action(value="jlRecordInfoAction_toListRecord",results={
			@Result(name="success",location="material/receiveRecord/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toListRecord(){
		return "success";
	}
	
	/**
	 * 新增时 页面 的datagrid
	 * @Title toListRecordDetail
	 * @return
	 * @author zpj
	 * @time 2018年8月30日 下午4:14:29
	 */
	@Action(value="jlRecordInfoAction_toListRecordDetail",results={
			@Result(name="success",location="material/receiveRecord/detail.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toListRecordDetail(){
		request.setAttribute("rid", request.getParameter("rid"));
		return "success";
	}
	
	
	@Action(value="jlRecordInfoAction_toiframe",results={
			@Result(name="success",location="material/receiveRecord/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	
	
	/**
	 * 查询每单的详细信息
	 * @Title getRecordsDetailListJson
	 * @author zpj
	 * @time 2018年8月30日 下午3:30:55
	 */
	@Action(value="jlRecordInfoAction_getRecordsDetailListJson",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void getRecordsDetailListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("rid", request.getParameter("rid"));
		
		Map map=recordService.findRecordsDetailList(user,page,100,param);
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
	 * datagrid列表
	 * @Title getSupplierListJson
	 * @author zpj
	 * @time 2016-4-8 下午2:54:25
	 */
	@Action(value="jlRecordInfoAction_getRecordsListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getSupplierListJson(){
		user = (UserInfo)request.getSession().getAttribute("jluserinfo");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String username=request.getParameter("username");//领用人名称
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
		
		Map map=recordService.findList(user,page,rows,param);
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
	
	
	
	@Action(value="jlRecordAction_toAddRecord",results={
			@Result(name="success",location="material/receiveRecord/add.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAddRecord(){
		String id=request.getParameter("id");
		recordInfo=null;
		if(null!=id&&!"".equalsIgnoreCase(id)){
			recordInfo=recordService.findById(id);
		}
		if(recordInfo==null){
			recordInfo=new RecordInfo();
			recordInfo.setId(UUID.randomUUID().toString());
		}
		return "success";
	}
	
	@Action(value="jlRecordAction_saveRecord",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveRecord(){
		int m=recordService.saveRecord(recordInfo);
		String detailfields=request.getParameter("detailfileds");
		try {
			
			//不管编辑还是新增，之前都先删一遍关联表对应的关联信息
			recordService.delRecordDetailByRecordId(recordInfo.getId());
			
			JSONArray jsonArr = JSONArray.fromObject(detailfields);
			RecordInfoDetail rid=null;
			net.sf.json.JSONObject temp=null;
			for(int n=0;n<jsonArr.size();n++){
				temp=(net.sf.json.JSONObject)jsonArr.get(n);
				rid=new RecordInfoDetail();
				rid.setId(UUID.randomUUID().toString());
				rid.setgName(temp.getString("gName"));
				rid.setgNumber(temp.getString("gNumber"));
				rid.setRecordId(recordInfo.getId());
				recordService.saveDetail(rid);
			}
			temp=null;
			rid=null;
			JSONObject job=new JSONObject();
			if(m==1){
				job.put("status","y");
				job.put("statusText", "保存成功");
				job.put("readyState", "true");
				job.put("responseText", "true");
			}else{
				job.put("status","n");
				job.put("statusText", "保存出错");
				job.put("readyState", "false");
				job.put("responseText", "false");
			}
			this.jsonWrite(job);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	@Action(value="jlRecordAction_delRecord",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delRecord(){
		String id=request.getParameter("id");
		int m=0;
		if(null!=id&&!id.equalsIgnoreCase("")){
			m=recordService.delRecord(id);
			recordService.delRecordDetailByRecordId(id);
		}
		try {
			this.jsonWrite(m);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
