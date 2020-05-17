package com.jl.sys.action;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.SgxmInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.LogInfoService;
import com.jl.sys.service.SgxmService;

import net.sf.json.JSONObject;

@Namespace("/")
@Scope("prototype")
@Component("sgxmAction")
@ParentPackage("json-default")
public class SgxmAction extends IAction {
	@Autowired
	private SgxmService sgxmService;
	@Autowired
	public LogInfoService jlLogInfoService;
	
	@Action(value="sgxmAction_toList",results={
			@Result(name="success",location="sys/sgxm/list.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toList(){
		return "success";
	}
	
	@Action(value="sgxmAction_toiframe",results={
			@Result(name="success",location="sys/sgxm/list_iframe.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toiframe(){
		return "success";
	}
	
	@Action(value="sgxmAction_getListJson",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void getListJson(){
		String tpage=request.getParameter("page");
		String trows=request.getParameter("rows");
		String departmentname=request.getParameter("departmentname");
		String yuefen=request.getParameter("yuefen");
		String username=request.getParameter("username");
		String sgxm=request.getParameter("sgxm");
		
		if(null!=tpage&&!"".equalsIgnoreCase(tpage)){
			page=Integer.parseInt(tpage);
		}
		if(null!=trows&&!"".equalsIgnoreCase(trows)){
			rows=Integer.parseInt(trows);
		}
		Map<String,String> param=new HashMap<String,String>();
		param.put("departmentname", departmentname);
		param.put("yuefen", yuefen);
		param.put("username", username);
		param.put("sgxm", sgxm);
		Map map=sgxmService.findList(page,rows,param);
		List list=(List)map.get("list");
//		int countNumber=(Integer)map.get("count");
		if(list!=null&&list.size()>0){
			  StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"").append(map.get("count")).append("\",\"rows\":");
			  String lstr=gson.toJson(list);
			  str.append(lstr);
			  str.append(",\"footer\":[{\"id\":\"1\","
			  		+ "\"zgz\":\""+(Double)map.get("total_zgz")+"\","
			  		+ "\"yfgzy\":\""+(Double)map.get("total_yfgzy")+"\","
			  		+ "\"sygz\":\""+(Double)map.get("total_sygz")+"\","
			  		+ "\"xm\":\"\","
			  		+ "\"yf\":\"\","
			  		+ "\"gd\":\"\","
			  		+ "\"gjby\":\"\","
			  		+ "\"jbgz\":\"\","
			  		+ "\"jbgzhjj\":\"\","
			  		+ "\"yfgz\":\""+map.get("total_yfgz")+"\","
			  		+ "\"lhbt\":\"\","
			  		+ "\"fybt\":\"\","
			  		+ "\"mq\":\"\","
			  		+ "\"qtkk\":\"\","
			  		+ "\"qz\":\"\","
			  		+ "\"bz\":\"\","
			  		+ "\"chuqin\":\""+(Double)map.get("chuqin")+"\","
			  		+ "\"jiaban\":\""+(Double)map.get("jiaban")+"\","
			  		+ "\"zonggongshi\":\""+(Double)map.get("zonggongshi")+"\""
			  		+ "}]");
			  
			  str.append("}");
			  jsonData= str.toString();
		}else{
			//置空原来的数据
			StringBuffer str =new StringBuffer();
			  str.append("{\"total\":\"0\",\"rows\":[]");
			  str.append(",\"footer\":[{\"id\":\"1\",\"zgz\":\"0\",\"yfgzy\":\"0\",\"sygz\":\"0\",\"xm\":\"\","
			  		+ "\"yf\":\"\",\"gd\":\"\",\"gjby\":\"\",\"jbgz\":\"\",\"jbgzhjj\":\"\",\"yfgz\":\"0\","
			  		+ "\"lhbt\":\"\",\"fybt\":\"\",\"mq\":\"\",\"qtkk\":\"\",\"qz\":\"\",\"bz\":\"\","
			  		+ "\"chuqin\":\"0\",\"jiaban\":\"0\",\"zonggongshi\":\"0\"}]");
			  
			  str.append("}");
			  jsonData= str.toString();
		}
		try {
			this.jsonWrite(jsonData);
		} catch (IOException e) {
			e.printStackTrace();
		}
	} 
	
	
	
	/**
	 * 保存数据
	 * @Title saveInfo
	 * @author zpj
	 * @throws IOException 
	 * @time 2019年3月5日 上午9:54:39
	 */
	@Action(value="sgxmAction_saveInfo",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveInfo() throws IOException{
		String data=request.getParameter("data");
		try{
			 JSONObject json = JSONObject.fromObject(data);
			 String id=json.getString("id");//主键
			 String xm=json.getString("xm");//姓名
			 String yf=json.getString("yf");//月份
			 String gd=json.getString("gd");//工地
			 String sgxm=json.getString("sgxm");//施工项目
			 String gjby=String.valueOf(json.getString("gjby"));//工价/包月
			 String jbgz=String.valueOf(json.getDouble("jbgz"));//基本工资
			 String jbgzhjj=String.valueOf(json.getDouble("jbgzhjj"));//加班工资和奖金
			 String yfgz=String.valueOf(json.getDouble("yfgz"));//应发工资
			 String lhbt=String.valueOf(json.getDouble("lhbt"));//劳护补贴
			 String fybt=String.valueOf(json.getDouble("fybt"));//费用补贴
			 String mq=String.valueOf(json.getDouble("mq"));//满勤
			 String qtkk=String.valueOf(json.getDouble("qtkk"));//其他扣款
			 String zgz=String.valueOf(json.getDouble("zgz"));//总工资（元）
			 String yfgzy=String.valueOf(json.getDouble("yfgzy"));//预付工资（元）
			 String sygz=String.valueOf(json.getDouble("sygz"));//剩余工资（元）
			 String qz=json.getString("qz");//签字
			 String bz=json.getString("bz");//备注
			 String chuqin=String.valueOf(json.getDouble("chuqin"));//出勤
			 String jiaban=String.valueOf(json.getDouble("jiaban"));//加班
			 String zonggongshi=String.valueOf(json.getDouble("zonggongshi"));//总工时
			 UserInfo user = (UserInfo)request.getSession().getAttribute("jluserinfo");
			 

			 SgxmInfo pi=new SgxmInfo();
			 pi.setId(id);
			 pi.setXm(xm);
			 pi.setYf(yf);
			 pi.setGd(gd);
			 pi.setSgxm(sgxm);
			 pi.setGjby(gjby);
			 pi.setJbgz(jbgz);
			 pi.setJbgzhjj(jbgzhjj);
			 pi.setYfgz(yfgz);
			 pi.setLhbt(lhbt);
			 pi.setFybt(fybt);
			 pi.setMq(mq);
			 pi.setQtkk(qtkk);
			 pi.setZgz(zgz);
			 pi.setYfgzy(yfgzy);
			 pi.setSygz(sygz);
			 pi.setQz(qz);
			 pi.setBz(bz);
			 pi.setChuqin(chuqin);
			 pi.setJiaban(jiaban);
			 pi.setZonggongshi(zonggongshi);
			 pi.setCreatetime(new Date());
			 
			 SgxmInfo temp=sgxmService.findById(pi.getId());
			 if(null!=temp){
				insertLog(user,"修改项目管理单信息","修改前的数据："+temp.toString()+"修改后的数据："+pi.toString());
			 }else{
				insertLog(user,"新增项目管理单信息",pi.toString());
			 }
			 
			 sgxmService.saveInfo(pi);
			 this.jsonWrite(true);
		 }catch (Exception e) {
			e.printStackTrace();
			this.jsonWrite(false);
		}
	}
	
	public void insertLog(UserInfo user,String type,String description){
		LogInfo loginfo=new LogInfo();
		loginfo.setId(UUID.randomUUID().toString());
		loginfo.setCreatetime(new Date());
		loginfo.setType(type);
		loginfo.setDescription(description);
		loginfo.setUserid(user.getId());
		loginfo.setUsername(user.getUsername());
		jlLogInfoService.logInfo(loginfo);
	}
	
	/**
	 * 删除数据
	 * @Title delInfo
	 * @throws IOException
	 * @author zpj
	 * @time 2019年3月6日 上午10:40:47
	 */
	@Action(value="sgxmAction_delInfo",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delInfo() throws IOException{
		String id=request.getParameter("id");
		try {
			sgxmService.delInfo(id);
			this.jsonWrite(true);
		} catch (IOException e) {
			e.printStackTrace();
			this.jsonWrite(false);
		}
	}
	
}
