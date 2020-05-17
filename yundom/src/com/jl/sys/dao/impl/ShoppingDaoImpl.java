package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.ShoppingDao;
import com.jl.sys.pojo.ShoppingInfo;
import com.jl.sys.pojo.UserInfo;
@Repository
public class ShoppingDaoImpl extends  BaseDao<ShoppingInfo> implements ShoppingDao {
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.*,u.username as username from jl_check_info a left join jl_user_info u on a.createuserid=u.id where 1=1  ");
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
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  a.createuserid="+user.getId());
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
		//判断是否是管理员用户
		if(!user.getIsAdmin().equalsIgnoreCase("1")){
			//不是管理员
			sql.append(" and  a.createuserid="+user.getId());
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
		
	}
}
