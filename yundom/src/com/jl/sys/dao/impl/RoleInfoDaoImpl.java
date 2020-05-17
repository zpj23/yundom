package com.jl.sys.dao.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import org.hibernate.Session;
import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.RoleInfoDao;
import com.jl.sys.pojo.RoleInfo;
import com.jl.sys.pojo.UserInfo;

@Repository
public class RoleInfoDaoImpl extends BaseDao<RoleInfo> implements RoleInfoDao {

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_role_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( rolename like ").append("'%"+param.get("username")+"%'   or remark like'%"+param.get("username")+"%' ) ");
		}
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from RoleInfo where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( rolename like ").append("'%"+param.get("username")+"%'  or remark like'%"+param.get("username")+"%' ) ");
		}
		int count=this.findListCount(sql.toString(), null);
		return count;
	}
	
	public int saveRole(RoleInfo ri){
		RoleInfo r=this.get(ri.getId());
		if(r!=null){
			this.merge(ri, String.valueOf(ri.getId()));
			return ri.getId();
		}else{
			Session session =null;
			try {
				session=sessionFactory.getCurrentSession();
				Serializable id = session.save(ri);
				return (Integer) id;
			} catch (Exception e) {
				e.printStackTrace();			
			}
		}
		return 0;
	}
	
	public RoleInfo findById(int id){
		return this.get(id);
	}
	
	public void delRoleByRoleId(int id){
		RoleInfo ri=this.get(id);
		this.delete(ri);
	}
}
