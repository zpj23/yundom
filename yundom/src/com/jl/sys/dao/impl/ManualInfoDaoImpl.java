package com.jl.sys.dao.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.ManualInfoDao;
import com.jl.sys.dao.PayrollDao;
import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.util.Role;
@Repository
public class ManualInfoDaoImpl extends BaseDao<CheckInfo> implements ManualInfoDao {
	
	
	public void saveInfo(CheckInfo cInfo) throws Exception{
		CheckInfo temp =this.get(cInfo.getId());
			if(temp!=null){
				//编辑
				this.merge(cInfo, cInfo.getId());
			}else{
				//新增
				this.save(cInfo);
			}
	}
	
	public List findThreeSum(UserInfo user,Map<String,String> param,int page,int rows){
		StringBuffer sql = new StringBuffer();
		//sum(a.workduringtime) as wdt,sum(a.overtime) as ot 
		sql.append(" select ifnull(sum(a.workduringtime),0) as wdt,ifnull(sum(a.overtime),0) as ot from jl_check_info a left join jl_user_info u on a.createuserid=u.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and a.workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and a.workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.staffname like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  a.sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  a.workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and a.departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		
		if(null!=param.get("lrrname")&&!"".equalsIgnoreCase(param.get("lrrname").toString())){
			sql.append(" and  u.username like ").append("'"+param.get("lrrname")+"%'  ");
		}
		
		if(null!=param.get("shenhe")&&!"".equalsIgnoreCase(param.get("shenhe").toString())){
			sql.append(" and  a.shenhe =").append("'"+param.get("shenhe")+"'  ");
		}
		
		if(user.getIsAdmin().equalsIgnoreCase(Role.ZUZHANG.toString())){
			//组长
			sql.append(" and  a.createuserid="+user.getId());
		}else if(user.getIsAdmin().equalsIgnoreCase(Role.CHEJIANZHUREN.toString())){
			//车间主任 
		}else if(user.getIsAdmin().equalsIgnoreCase(Role.RENSHI.toString())){
			//人事
		}
		
		//判断是否是管理员用户
//		if(!user.getIsAdmin().equalsIgnoreCase("1")){
//			//不是管理员
//			sql.append(" and  a.createuserid="+user.getId());
//		}
		
		
		List list=this.findMapObjBySql(sql.toString(), null, 1, 2);
		return list;
	}
	
	
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.id,a.departmentcode,a.departmentname,a.staffname,a.workcontent,DATE_FORMAT(a.workdate, '%Y-%m-%d') as workdate,a.workduringtime,a.overtime,a.remark,a.createuserid,a.shenhe,a.sgqy,a.sgxm,u.username as username from jl_check_info a left join jl_user_info u on a.createuserid=u.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and a.workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and a.workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.staffname like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  a.sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  a.workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and a.departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("shenhe")&&!"".equalsIgnoreCase(param.get("shenhe").toString())){
			sql.append(" and  a.shenhe =").append("'"+param.get("shenhe")+"'  ");
		}
		if(null!=param.get("lrrname")&&!"".equalsIgnoreCase(param.get("lrrname").toString())){
			sql.append(" and  u.username like ").append("'"+param.get("lrrname")+"%'  ");
		}
		
		if(user.getIsAdmin().contains(Role.ZUZHANG.toString())){
			sql.append(" and  a.createuserid="+user.getId());
		}else if(user.getIsAdmin().contains(Role.CHEJIANZHUREN.toString())){
			sql.append(" and  a.reportcjzrid="+user.getId());
		}
		
		sql.append(" order by workdate desc,adddate desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(a.id) from jl_check_info a left join jl_user_info u on a.createuserid=u.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and a.workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and a.workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.staffname like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  a.sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  a.workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and a.departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("shenhe")&&!"".equalsIgnoreCase(param.get("shenhe").toString())){
			sql.append(" and  a.shenhe =").append("'"+param.get("shenhe")+"'  ");
		}
		if(null!=param.get("lrrname")&&!"".equalsIgnoreCase(param.get("lrrname").toString())){
			sql.append(" and  u.username like ").append("'"+param.get("lrrname")+"%'  ");
		}
		
		if(user.getIsAdmin().contains(Role.ZUZHANG.toString())){
			sql.append(" and  a.createuserid="+user.getId());
		}else if(user.getIsAdmin().contains(Role.CHEJIANZHUREN.toString())){
			sql.append(" and  a.reportcjzrid="+user.getId());
		}
		
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
		
	}
	
	/******查询重复数据*********/
	
	public List findRepeatList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.id,a.departmentcode,a.departmentname,a.staffname,a.workcontent,DATE_FORMAT(a.workdate, '%Y-%m-%d') as workdate,a.workduringtime,a.overtime,a.remark,a.createuserid,a.shenhe,a.sgqy,a.sgxm from listallrepeat a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and a.workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and a.workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.staffname like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  a.sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  a.workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and a.departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("shenhe")&&!"".equalsIgnoreCase(param.get("shenhe").toString())){
			sql.append(" and  a.shenhe =").append("'"+param.get("shenhe")+"'  ");
		}
		if(null!=param.get("lrrname")&&!"".equalsIgnoreCase(param.get("lrrname").toString())){
			sql.append(" and  a.username like ").append("'"+param.get("lrrname")+"%'  ");
		}
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  a.createuserid="+user.getId());
		}
//		sql.append(" order by workdate desc,adddate desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	public int findRepeatCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(a.id) from listallrepeat a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and a.workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and a.workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.staffname like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  a.sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  a.workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and a.departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("shenhe")&&!"".equalsIgnoreCase(param.get("shenhe").toString())){
			sql.append(" and  a.shenhe =").append("'"+param.get("shenhe")+"'  ");
		}
		if(null!=param.get("lrrname")&&!"".equalsIgnoreCase(param.get("lrrname").toString())){
			sql.append(" and  a.username like ").append("'"+param.get("lrrname")+"%'  ");
		}
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  a.createuserid="+user.getId());
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
	
	
	
	public int getWshNum(UserInfo user){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from CheckInfo where shenhe='0' ");
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  createuserid="+user.getId());
		}
		int count=this.findListCount(sql.toString(), null);
		return count;
	}
	public List findListObjectArray(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		String str="施工日期,施工人员,所属区域,施工项目,施工区域,工作内容,出勤时间,加班时间,备注";
		
		sql.append(" select DATE_FORMAT(a.workdate, '%Y-%m-%d') as workdate,a.staffname,a.departmentname,a.sgxm,a.sgqy,a.workcontent,a.workduringtime,a.overtime,a.remark from jl_check_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and workdate >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and workdate <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  staffname like ").append("'%"+param.get("username")+"%'  ");
		}
//		if(null!=param.get("address")&&!"".equalsIgnoreCase(param.get("address").toString())){
//			sql.append(" and  address like ").append("'%"+param.get("address")+"%'  ");
//		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  createuserid="+user.getId());
		}
		sql.append(" order by workdate desc,adddate desc");
		List list=this.findBySql2(sql.toString());
		return list;
	}
	
	
	public CheckInfo findById(String id){
		return this.get(id);
	}
	
	public void delInfo(String id) throws Exception{
		CheckInfo c=this.get(id);
		if(c!=null)
			this.delete(c);
	}
	public List findChartByDay(Map param){
		StringBuffer sql=new  StringBuffer(1000);
		//sql.append("SELECT DATE_FORMAT(workdate, '%Y-%m-%d') AS yuefen,workduringtime wdt, overtime ot FROM jl_check_info where shenhe ='1' ");
		sql.append("SELECT DATE_FORMAT(workdate, '%Y-%m-%d') AS yuefen,SUM(workduringtime) as wdt , SUM(overtime) ot FROM jl_check_info where shenhe ='1' ");
		
		
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and workdate like ").append("'"+param.get("datemin")+"-"+param.get("yuefen")+"%'");
		}
		if(param.get("username")!=null&&!((String)param.get("username")).equalsIgnoreCase("")){
			sql.append(" and staffname ='"+(String)param.get("username")+"' ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		sql.append(" GROUP BY DATE_FORMAT( workdate, '%Y-%m-%d' ) ORDER BY yuefen asc ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
	
	public List findChartByUser(Map param){
		StringBuffer sql=new  StringBuffer(1000);
		sql.append("SELECT DATE_FORMAT( workdate, '%Y-%m' ) as yuefen , SUM(workduringtime) as wdt , SUM(overtime) ot FROM jl_check_info where shenhe ='1' ");
		sql.append("  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and workdate like ").append("'"+param.get("datemin")+"%'");
		}
//		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
//			sql.append(" and workdate <= ").append("'"+param.get("datemax")+"'");
//		}
		if(param.get("username")!=null&&!((String)param.get("username")).equalsIgnoreCase("")){
			sql.append(" and staffname ='"+(String)param.get("username")+"' ");
		}
//		if(null!=param.get("address")&&!"".equalsIgnoreCase(param.get("address").toString())){
//			sql.append(" and  address like ").append("'%"+param.get("address")+"%'  ");
//		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		if(null!=param.get("sgqy")&&!"".equalsIgnoreCase(param.get("sgqy").toString())){
			sql.append(" and  sgqy like ").append("'%"+param.get("sgqy")+"%'  ");
		}
		if(null!=param.get("workcontent")&&!"".equalsIgnoreCase(param.get("workcontent").toString())){
			sql.append(" and  workcontent like ").append("'%"+param.get("workcontent")+"%'  ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and departmentcode = ").append("'"+param.get("departmentid")+"'");
		}
		sql.append(" GROUP BY DATE_FORMAT( workdate, '%Y-%m' ) ORDER BY yuefen asc ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 20);
		return list;
	}
	
	public int saveShenhe(String str){
		try{
			this.executeSql("update jl_check_info set shenhe='1' where id in ("+str+")");
			return 1;
		}catch (Exception e) {
			return 0;
		}
		
	}
	
	public List findListByIds(String id){
		List list=this.findMapObjBySql("select staffname as xm ,CONCAT(YEAR(workdate),'-',MONTH(workdate)) as yf,sgxm,departmentname from jl_check_info where id in ("+id+")", null, 1, 1000);
		return list;
	}
}
