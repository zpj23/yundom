package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.SalaryDao;
import com.jl.sys.pojo.SalaryInfo;
import com.jl.sys.pojo.UserInfo;
@Repository
public class SalaryDaoImpl extends BaseDao<SalaryInfo> implements SalaryDao {

	
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from jl_salary_info  where 1=1  ");
		if(null!=param.get("year")&&!"".equalsIgnoreCase(param.get("year").toString())){
			sql.append(" and year like ").append("'%"+param.get("year")+"%'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  userName like ").append("'%"+param.get("username")+"%'  ");
		}
		//判断是否是管理员用户
//		if(!user.getIsAdmin().equalsIgnoreCase("1")){
//			//不是管理员
//			sql.append(" and  a.createuserid="+user.getId());
//		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
		
	}
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_salary_info  where 1=1  ");
		if(null!=param.get("year")&&!"".equalsIgnoreCase(param.get("year").toString())){
			sql.append(" and year like ").append("'%"+param.get("year")+"%'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  userName like ").append("'%"+param.get("username")+"%'  ");
		}
		//判断是否是管理员用户
//		if(!user.getIsAdmin().equalsIgnoreCase("1")){
//			//不是管理员
//			sql.append(" and  a.createuserid="+user.getId());
//		}
		sql.append(" order by year desc,orderNum asc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public void insertSql(String sql) {
		this.executeSql(sql);
	}
	
	public SalaryInfo findById(String id){
		return this.get(id);
	}
	
	public void saveInfo(SalaryInfo sInfo){
		this.saveOrUpdate(sInfo);
	}
	public void delInfo(String id){
		this.executeSql(" delete from jl_salary_info where id='"+id+"' ");
	}
}
