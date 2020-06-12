/******************************************************************

 *    Package:     com.jl.sys.action
 *
 *    Filename:    ManualCheckPhoneAction.java
 *
 *    Description: TODO(用一句话描述该文件做什么)
 *
 *    Copyright:   Copyright (c) 2001-2014
 *
 *    Company:     Digital Telemedia Co.,Ltd
 *
 *    @author:     zpj
 *
 *    @version:    1.0.0
 *
 *    Create at:   2017-11-22 下午6:14:29
 *
 *    Revision:
 *
 *    2017-11-22 下午6:14:29
 *        - first revision
 *
 *****************************************************************/
package com.jl.sys.action;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.LogInfoService;
import com.jl.sys.service.ManualInfoService;
import com.jl.sys.service.UserInfoService;
import com.jl.util.DateHelper;
import com.jl.util.Role;

import net.sf.json.JSONArray;


/**
 * @ClassName ManualCheckPhoneAction
 * @Description TODO(手机的mui后台action)
 * @author zpj
 * @Date 2017-11-22 下午6:14:29
 * @version 1.0.0
 */
@Namespace("/")
@Scope("prototype")
@Component("jlManualCheckPhoneAction")
@ParentPackage("json-default")
public class ManualCheckPhoneAction extends IAction {
	Logger logger=Logger.getLogger(ManualCheckPhoneAction.class);
	
	@Autowired
	public LogInfoService jlLogInfoService;
	
	@Autowired
	private UserInfoService jlUserInfoService;
	
	@Autowired
	private ManualInfoService mService;
	
	private CheckInfo cinfo;
	
	private UserInfo user;
	
	
	public CheckInfo getCinfo() {
		return cinfo;
	}
	public void setCinfo(CheckInfo cinfo) {
		this.cinfo = cinfo;
	}
	
	@Action(value="jlManualCheckPhoneAction_findListInfoByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void findListInfoByPhone(){
		user = getCurrentUser(request);
		String staffname=request.getParameter("staffname");
		String datemin=request.getParameter("datemin");//开始时间
		String datemax=request.getParameter("datemax");//结束时间
		String departmentcode=request.getParameter("departmentcode");//部门编码
		String shenhe=request.getParameter("isshenhe");//是否审核
		String cpage=request.getParameter("cpage");
		String pagerow=request.getParameter("pagerow");//分页行数
		Map<String,String> param=new HashMap<String,String>();
		int pr=Integer.parseInt(pagerow);
		param.put("datemin", datemin);
		param.put("datemax", datemax);
		param.put("username", staffname);
		param.put("departmentid", departmentcode);
		param.put("shenhe", shenhe);
		page=Integer.parseInt(cpage);
		Map map=mService.findList(user,page,pr,param);
		int tot=(Integer)map.get("count");
		double totalPage=Math.ceil((float)tot/pr);
		map.put("totalpage",totalPage );
		try {
			this.jsonWrite(map);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 查询选择人员的员工列表历史输入过的人员姓名记录
	 * @Title findStaffNameByPhone
	 * @author zpj
	 * @time 2018年12月21日 下午1:30:27
	 */
	@Action(value="jlManualCheckPhoneAction_findStaffNameByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void findStaffNameByPhone(){
		user = getCurrentUser(request);
		List list=mService.findStaffNameList(user);
		try {
			this.jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	
	/**
	 * 手机复制一条记录
	 * @Title doCopy
	 * @author zpj
	 * @time 2018-2-23 上午8:40:50
	 */
	@Action(value="jlManualCheckPhoneAction_docopy",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void doCopy(){
		user = getCurrentUser(request);
		String id=request.getParameter("id");
		CheckInfo copyInfo=mService.findById(id);
		/************记录数据***开始*******/
		try{
			request.getMethod();
	    	Map map = request.getParameterMap();
	        String reqType=request.getMethod();
	        JSONArray json = JSONArray.fromObject(map);
			LogInfo loginfo=new LogInfo();
			loginfo.setId(UUID.randomUUID().toString());
			loginfo.setCreatetime(new Date());
			loginfo.setType("jlManualCheckPhoneAction_docopy");
			loginfo.setDescription(("操作类型：手机端复制考勤信息, 请求类型："+reqType+", 数据："+json.toString()));
			loginfo.setUserid(user.getId());
			loginfo.setUsername(user.getUsername());
			jlLogInfoService.logInfo(loginfo);
		}catch (Exception e) {
			System.out.println("日志记录失败");
			e.printStackTrace();
		}
		/************记录数据***结束*******/
		Map map =new HashMap();
		try {
			CheckInfo tmpci=new CheckInfo();
			tmpci.setId(UUID.randomUUID().toString());
			tmpci.setStaffname(copyInfo.getStaffname()+"_复制");
			tmpci.setWorkdate(copyInfo.getWorkdate());
			tmpci.setWorkduringtime(copyInfo.getWorkduringtime());
			tmpci.setDepartmentname(copyInfo.getDepartmentname());
			tmpci.setDepartmentcode(copyInfo.getDepartmentcode());
			tmpci.setWorkcontent(copyInfo.getWorkcontent());
			tmpci.setAdddate(new Date());
			tmpci.setOvertime(copyInfo.getOvertime());	
			tmpci.setRemark(copyInfo.getRemark());
			tmpci.setSgxm(copyInfo.getSgxm());
			tmpci.setSgqy(copyInfo.getSgqy());
			tmpci.setCreateuserid(copyInfo.getCreateuserid());
			tmpci.setShenhe("0");
			mService.saveInfo(tmpci);
			map.put("msg", true);
			this.jsonWrite(map);
		} catch (Exception e) {
			map.put("msg", false);
			try {
				this.jsonWrite(map);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
	}
	/**
	 * 手机审核
	 * @Title shenhe
	 * @author zpj
	 * @time 2018-2-10 上午11:04:16
	 */
	@Action(value="jlManualCheckPhoneAction_doshenhe",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void shenhe(){
		user = getCurrentUser(request);
		String id=request.getParameter("id");
		Map map =new HashMap();
		try {
			int r=mService.saveShenhe(id,user);
			if(r==1){
				map.put("msg", true);
			}else{
				map.put("msg", false);
			}
			this.jsonWrite(map);
		} catch (Exception e) {
			map.put("msg", false);
			try {
				this.jsonWrite(map);
			} catch (IOException e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
		
		
	}
	
	/**
	 * 获取待审核数量
	 * @Title getShNum
	 * @author zpj
	 * @time 2018-2-10 上午10:12:43
	 */
	@Action(value="jlManualCheckPhoneAction_getShNum",
	results={
	@Result(type="json", params={"root","jsonData"})})
	public void getShNum(){
		user = getCurrentUser(request);
		int count=mService.getWshNum(user);//获取待审核的数量
		Map map =new HashMap();
		map.put("msg", true);
		map.put("data", count);
		try {
			this.jsonWrite(map);
		} catch (IOException e) {
			e.printStackTrace();
		}
	
	}
	
	
	@Action(value="jlManualCheckPhoneAction_findInfoByIdByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void findInfoByIdByPhone(){
		user = getCurrentUser(request);
		
		String id=request.getParameter("id");//主键id
		CheckInfo c=mService.findById(id);
		Map map =new HashMap();
		if(c!=null){
			map.put("msg", true);
			map.put("data", c);
		}
		try {
			this.jsonWrite(map);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
	}
	@Action(value="jlManualCheckPhoneAction_delInfoByIdByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void delInfoByIdByPhone(){
		user = getCurrentUser(request);
		String id = request.getParameter("delId");
		if(null!=id&&!id.equalsIgnoreCase("")){
			try {
				mService.delInfo(id);
				Map map =new HashMap();
				map.put("msg", true);
				this.jsonWrite(map);
			} catch (IOException e) {
				e.printStackTrace();
				Map map =new HashMap();
				map.put("msg", false);
				try {
					this.jsonWrite(map);
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
	}
	
	
	
	@Action(value="jlManualCheckPhoneAction_saveInfoByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void saveInfoByPhone(){
		user =getCurrentUser(request);
		String id=request.getParameter("id");
		CheckInfo temp=mService.findById(id);
		boolean editFlag=false;
		if(null!=temp){
			//编辑状态
			editFlag=true;
		}
		/************记录数据***开始*******/
		try{
			request.getMethod();
	    	Map map = request.getParameterMap();
	        String reqType=request.getMethod();
	        JSONArray json = JSONArray.fromObject(map);
			LogInfo loginfo=new LogInfo();
			loginfo.setId(UUID.randomUUID().toString());
			loginfo.setCreatetime(new Date());
			loginfo.setType("jlManualCheckPhoneAction_saveInfoByPhone");
			loginfo.setDescription(("操作类型：手机端保存考勤信息，"+editFlag+", 请求类型："+reqType+", 数据："+json.toString()));
			loginfo.setUserid(user.getId());
			loginfo.setUsername(user.getUsername());
			jlLogInfoService.logInfo(loginfo);
		}catch (Exception e) {
			System.out.println("日志记录失败");
			e.printStackTrace();
		}
		/************记录数据***结束*******/
		
		
		String sgxm=request.getParameter("sgxm");
		String sgqy=request.getParameter("sgqy");
		String workdate=request.getParameter("workdate");
		String staffnames=request.getParameter("staffname");
		String workduringtime=request.getParameter("workduringtime");
		String overtime=request.getParameter("overtime");
		if(null==overtime||overtime.equalsIgnoreCase("")||overtime.equalsIgnoreCase("undefined")){
			overtime="0";
		}
		String workcontent=request.getParameter("workcontent");
		String remark=request.getParameter("remark");
		String departmentname=request.getParameter("departmentname");
		String departmentcode=request.getParameter("departmentcode");
		
		try {
			boolean flagcn=staffnames.contains("，");
			boolean flagen=staffnames.contains(",");
			CheckInfo tmpci=null;
			//判断是否是多人同时输入的
			if(flagcn||flagen){
				String[] nameArr=null;
				if(flagcn){
					nameArr=staffnames.split("，");
				}
				if(flagen){
					nameArr=staffnames.split(",");
				}
				for(int i=0;i<nameArr.length;i++){
					tmpci=new CheckInfo();
					tmpci.setId(UUID.randomUUID().toString());
					tmpci.setStaffname(nameArr[i]);
					tmpci.setWorkdate(DateHelper.getDateFromString(workdate, "yyyy-MM-dd"));
					tmpci.setWorkduringtime(Double.valueOf(workduringtime));
					tmpci.setDepartmentname(departmentname);
					tmpci.setDepartmentcode(departmentcode);
					tmpci.setWorkcontent(workcontent);
					tmpci.setAdddate(new Date());
//					tmpci.setAddress(cinfo.getAddress());
					tmpci.setOvertime(Double.valueOf(overtime));	
					tmpci.setRemark(remark);
					tmpci.setSgxm(sgxm);
					tmpci.setSgqy(sgqy);
					if(editFlag){
						tmpci.setCreateuserid(temp.getCreateuserid());
						tmpci.setShenhe(temp.getShenhe());
					}else{
						tmpci.setCreateuserid(user.getId());
						if(user.getIsAdmin().equalsIgnoreCase(Role.ZUZHANG.toString())){
							//组长录入的状态是未审核
							tmpci.setShenhe("0");
						}else if(user.getIsAdmin().equalsIgnoreCase(Role.CHEJIANZHUREN.toString())){
							//车间主任 审核状态改成已审核
							tmpci.setShenhe("1");
							tmpci.setShenheTime(new Date());
							tmpci.setShenherenId(user.getId());
						}else if(user.getIsAdmin().equalsIgnoreCase(Role.RENSHI.toString())){
							//人事审核
							tmpci.setShenhe2("1");
							tmpci.setShenhe2Time(new Date());
							tmpci.setShenheren2Id(user.getId());
						}
//						if(user.getIsAdmin().equalsIgnoreCase("1")){
//							//管理员  审核状态改成已审核
//							tmpci.setShenhe("1");
//						}else{
//							//普通人 录入的状态是未审核
//							tmpci.setShenhe("0");
//						}
					}
					mService.saveInfo(tmpci);
				}
				
				if(editFlag){
					//编辑的时候 如果是有分隔符 说明是需要分割这条数据  ，在分割保存完这些数据以后要删除之前未分割的数据
					mService.delInfo(temp.getId());
				}
			}else{
				tmpci=new CheckInfo();
					
				if(editFlag){
					tmpci.setCreateuserid(temp.getCreateuserid());
					tmpci.setShenhe(temp.getShenhe());
				}else{
					id=UUID.randomUUID().toString();
					tmpci.setCreateuserid(user.getId());
					if(user.getIsAdmin().equalsIgnoreCase(Role.ZUZHANG.toString())){
						//组长录入的状态是未审核
						tmpci.setShenhe("0");
					}else if(user.getIsAdmin().equalsIgnoreCase(Role.CHEJIANZHUREN.toString())){
						//车间主任 审核状态改成已审核
						tmpci.setShenhe("1");
						tmpci.setShenheTime(new Date());
						tmpci.setShenherenId(user.getId());
					}else if(user.getIsAdmin().equalsIgnoreCase(Role.RENSHI.toString())){
						//人事审核
						tmpci.setShenhe2("1");
						tmpci.setShenhe2Time(new Date());
						tmpci.setShenheren2Id(user.getId());
					}
//					if(user.getIsAdmin().equalsIgnoreCase("1")){
//						//管理员  审核状态改成已审核
//						tmpci.setShenhe("1");
//					}else{
//						//普通人 录入的状态是未审核
//						tmpci.setShenhe("0");
//					}
				}
				tmpci.setId(id);
				tmpci.setStaffname(staffnames);
				tmpci.setWorkdate(DateHelper.getDateFromString(workdate, "yyyy-MM-dd"));
				tmpci.setWorkduringtime(Double.valueOf(workduringtime));
				tmpci.setDepartmentname(departmentname);
				tmpci.setDepartmentcode(departmentcode);
				tmpci.setWorkcontent(workcontent);
				tmpci.setAdddate(new Date());
				tmpci.setOvertime(Double.valueOf(overtime));	
				tmpci.setRemark(remark);
				tmpci.setSgxm(sgxm);
				tmpci.setSgqy(sgqy);
				
				mService.saveInfo(tmpci);
			}
			
			Map job=new HashMap();
			job.put("msg",true);
			this.jsonWrite(job);
		} catch (Exception e) {
			Map job=new HashMap();
			try {
				job.put("msg",false);
				this.jsonWrite(job);
			} catch (Exception e1) {
				e1.printStackTrace();
			}
			e.printStackTrace();
		}
	}
	
	/**
	 * 获取手机当前登录对象信息
	 * @Title getCurrentUser
	 * @param request
	 * @return
	 * @author zpj
	 * @time 2017-9-18 下午3:33:38
	 */
	public UserInfo getCurrentUser(HttpServletRequest request){
		UserInfo user = (UserInfo)request.getSession().getAttribute("jluserinfo");
//		Enumeration enumeration =request.getSession().getAttributeNames();//获取session中所有的键值对
//		while(enumeration.hasMoreElements()){
//            String AddFileName=enumeration.nextElement().toString();//获取session中的键值
//            UserInfo value=(UserInfo)request.getSession().getAttribute(AddFileName);//根据键值取出session中的值
//            System.out.println(AddFileName);
//            System.out.println(value.getLoginname());
//            //String FileName= (String)session.getAttribute("AddFileName");
//        }
		if(user==null){
			String id= request.getParameter("loginId");
			String isAdmin=request.getParameter("isAdmin");
			user=jlUserInfoService.findById(Integer.parseInt(id));
			user.setIsAdmin(isAdmin);
			request.getSession().setAttribute("jluserinfo",user);
		}
		return user;
	}
}
