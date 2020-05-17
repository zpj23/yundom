package com.jl.sys.dao.impl;

import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.PayrollDao;
import com.jl.sys.pojo.PayrollInfo;
import com.jl.util.DateHelper;

@Repository
public class PayrollDaoImpl extends BaseDao<PayrollInfo> implements PayrollDao{
	public void saveInfo(PayrollInfo pi){
		PayrollInfo temp=this.get(pi.getId());
		if(null!=temp){
			this.merge(pi, pi.getId());
		}else{
			this.save(pi);
		}
	}
	public PayrollInfo findById(String id){
		return this.get(id);
	}
	
	public void delInfo(String id){
		this.delete(findById(id));
	}
	
	public List findList(int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.* from jl_payroll_info a  where 1=1  ");
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.xm like ").append("'%"+param.get("username")+"%'  ");
		}
//		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
//			sql.append(" and  a.yf = ").append("'"+param.get("yuefen").toString()+"'  ");
//		}
		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
			//说明查询的是1月份
			if(param.get("yuefen").toString().length()==6&&param.get("yuefen").toString().indexOf("-1")>0){
				sql.append(" and  a.yf = ").append("'"+param.get("yuefen").toString()+"'  ");
			}else{
				sql.append(" and  a.yf like ").append("'"+param.get("yuefen").toString()+"%'  ");
			}
		}
		if(null!=param.get("departmentname")&&!"".equalsIgnoreCase(param.get("departmentname").toString())){
			sql.append(" and  a.gd like ").append("'%"+param.get("departmentname")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
//		sql.append(" order by yf desc ");
		sql.append(" order by str_to_date(yf, '%Y-%c') desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	public List findList(Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select xm,yf,gd,chuqin,jiaban,zonggongshi,gjby,jbgz,jbgzhjj,yfgz,lhbt,fybt,mq,qtkk,zgz,yfgzy,sygz,qz,bz from jl_payroll_info a  where 1=1  ");
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.xm like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
			//说明查询的是1月份
			if(param.get("yuefen").toString().length()==6&&param.get("yuefen").toString().indexOf("-1")>0){
				sql.append(" and  a.yf = ").append("'"+param.get("yuefen").toString()+"'  ");
			}else{
				sql.append(" and  a.yf like ").append("'"+param.get("yuefen").toString()+"%'  ");
			}
		}
		if(null!=param.get("departmentname")&&!"".equalsIgnoreCase(param.get("departmentname").toString())){
			sql.append(" and  a.gd like ").append("'%"+param.get("departmentname")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		sql.append(" order by str_to_date(yf, '%Y-%c') desc ");
		List list = this.findBySql2(sql.toString());
//		List list=this.findMapObjBySql(sql.toString());
		return list;
	}
	
	public Map findCount(Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(a.id) zs ,SUM(chuqin) cq,SUM(jiaban) jb,SUM(zonggongshi) zgs,convert(SUM(zgz),decimal(15,1)) zgz,convert(SUM(yfgzy),decimal(15,1)) yfgzy,convert(SUM(yfgz),decimal(15,1)) as yfgz,convert(SUM(sygz),decimal(15,1)) sygz from jl_payroll_info a  where 1=1  ");
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  a.xm like ").append("'%"+param.get("username")+"%'  ");
		}
		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
			//说明查询的是1月份
			if(param.get("yuefen").toString().length()==6&&param.get("yuefen").toString().indexOf("-1")>0){
				sql.append(" and  a.yf = ").append("'"+param.get("yuefen").toString()+"'  ");
			}else{
				sql.append(" and  a.yf like ").append("'"+param.get("yuefen").toString()+"%'  ");
			}
		}
//		if(null!=param.get("yuefen")&&!"".equalsIgnoreCase(param.get("yuefen").toString())){
//			sql.append(" and  a.yf = ").append("'"+param.get("yuefen").toString()+"'  ");
//		}
		if(null!=param.get("departmentname")&&!"".equalsIgnoreCase(param.get("departmentname").toString())){
			sql.append(" and  a.gd like ").append("'%"+param.get("departmentname")+"%'  ");
		}
		if(null!=param.get("sgxm")&&!"".equalsIgnoreCase(param.get("sgxm").toString())){
			sql.append(" and  a.sgxm like ").append("'%"+param.get("sgxm")+"%'  ");
		}
		List<Map> list=this.findMapObjBySql(sql.toString());
		
		if(null!=list&&list.size()>0){
			return list.get(0);
		}else{
			return null;
		}
		
	}
	
	
	public List<PayrollInfo> findByYFAndXM(String yuefen,String xm){
		List<PayrollInfo> list=this.find("from PayrollInfo where yf=? and xm=?", yuefen,xm);
		if(null!=list){
			return list;
		}
		return new ArrayList<PayrollInfo>();
	}
	
	
	public void insertPayrollData(String yuefen,String xm){
		//SELECT UUID(),t1,'"+yuefen+"',t2,t3,t4,t5,'0','0','0','0',t6,'0','0','0','0','0','0' from yuefen"+view_id+" where t1='"+xm+"'
		String firstDay=DateHelper.getFirstdayOfMonth(yuefen, "yyyy-MM");
		String lastDay=DateHelper.getLastdayOfMonth(yuefen, "yyyy-MM");
		
		StringBuffer sb=new StringBuffer(100).append(" call yuefen('"+firstDay+"','"+lastDay+"','"+xm+"')  ");
		List list=this.findMapObjBySql(sb.toString());
		if(null!=list&&list.size()>0){
			Map map=(Map)list.get(0);
			StringBuffer sql=new StringBuffer("insert into jl_payroll_info (id,xm,yf,gd,chuqin,jiaban,zonggongshi,gjby,jbgz,jbgzhjj,yfgz,lhbt,fybt,mq,qtkk,zgz,yfgzy,sygz) values (UUID(),'"+map.get("t1")+"','"+yuefen+"','"+map.get("t2")+"','"+map.get("t3")+"','"+map.get("t4")+"','"+map.get("t5")+"','0','0','0','0','"+map.get("t6")+"','0','0','0','0','0','0' ) ");
			this.executeSql(sql.toString());
		}else{
			System.out.println(xm+"没有"+yuefen+"的考勤数据");
		}
		
	}
	
	public void updatePayrollData(String yuefen,String xm){
		String firstDay=DateHelper.getFirstdayOfMonth(yuefen, "yyyy-MM");
		String lastDay=DateHelper.getLastdayOfMonth(yuefen, "yyyy-MM");
		
		List list=this.findMapObjBySql(" call yuefen('"+firstDay+"','"+lastDay+"','"+xm+"') ");
		if(null!=list&&list.size()>0){
			Map map=(Map)list.get(0);
			StringBuffer sql=new StringBuffer("update jl_payroll_info set chuqin='"+map.get("t3")+"',jiaban='"+map.get("t4")+"',zonggongshi='"+map.get("t5")+"' ,lhbt='"+map.get("t6")+"' where xm='"+xm+"' and yf='"+yuefen+"'");
			this.executeSql(sql.toString());
			double zonggongshi=(double)map.get("t5");
			double lhbt=(double)map.get("t6");
			//计算工资单中各个值
			calculatePayroll(yuefen,xm,String.valueOf(zonggongshi),String.valueOf(lhbt));
		}
	}
	/**
	 * 计算工资单各个计算值
	 * @Title calculatePayroll
	 * @param yuefen
	 * @param xm
	 * @param zonggongshi
	 * @param lhbt
	 * @author zpj
	 * @time 2019年9月2日 上午9:54:13
	 */
	public void calculatePayroll(String yuefen,String xm,String zonggongshi,String lhbt){
		List list=this.findMapObjBySql("select * from jl_payroll_info where xm='"+xm+"' and yf='"+yuefen+"'", null, 1, 1);
		Map map=(Map)list.get(0);
		DecimalFormat format=new DecimalFormat("0.00");//构造方法的字符格式这里如果小数不足1位,会以0补足.
		
		//应发工资,通过工价包月*总工时得到
		float yfgz=Float.parseFloat(zonggongshi)*Float.parseFloat((String)map.get("gjby"));
        //加班工资和奖金,通过应发工资-基本工资
		float jbgzhjj=yfgz-Float.parseFloat((String)map.get("jbgz"));
		//总工资，通过应发工资+劳护补贴+费用补贴+满勤-其他扣款
		float zgz=yfgz+Float.parseFloat(lhbt)+Float.parseFloat((String)map.get("fybt"))+Float.parseFloat((String)map.get("mq"))-Float.parseFloat((String)map.get("qtkk"));
		//剩余工资,通过总工资-预发工资
		float sygz=zgz-Float.parseFloat((String)map.get("yfgzy"));
		
		StringBuffer sql=new StringBuffer("update jl_payroll_info set yfgz='"+format.format(yfgz)+"',jbgzhjj='"+format.format(jbgzhjj)+"',zgz='"+format.format(zgz)+"',sygz='"+format.format(sygz)+"'  where xm='"+xm+"' and yf='"+yuefen+"'");
		this.executeSql(sql.toString());
	}
	
	public List<PayrollInfo> findListByYf(String yf){
		List<PayrollInfo> list=this.find(" from PayrollInfo where yf='"+yf+"'", null);
		return list;
	}
	
	
	public List findListByGroupUser(String nianfen){
		StringBuilder sql=new StringBuilder(100);
		sql.append("select xm,SUM(chuqin) as chuqin, SUM(jiaban) as jiaban,SUM(zonggongshi) as zgs,convert(SUM(yfgz),decimal(15,1)) as yfgz,convert(SUM(zgz),decimal(15,1)) as zgz,convert(SUM(yfgzy),decimal(15,1)) as yfgzy,convert(SUM(sygz),decimal(15,1)) as sygz  from jl_payroll_info where 1=1 ");
		if(null!=nianfen&&!nianfen.equalsIgnoreCase("")){
			sql.append(" and yf like '"+nianfen+"%' ");
		}
		sql.append(" GROUP BY xm order by xm asc ");
		List list = this.findBySql2(sql.toString());
		return list;
	}
	
	
	
}
