package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.OutStoreDao;
import com.jl.material.pojo.OutStore;
import com.jl.sys.pojo.UserInfo;
@Repository
public class OutStoreImpl extends BaseDao<OutStore> implements OutStoreDao{
	public int saveOutStore(OutStore o){
		try{
			this.saveOrUpdate(o);
		}catch (Exception e) {
			return 0;
		}
		return 1;
	}

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select u.*,g.name as goodsname,g.suppliername as suppliername,d.name as departmentname from jl_material_outstore_info u left join jl_material_goods_info g on u.goodsid=g.id left join jl_department_info d on d.id=u.departmentid    where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and u.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and u.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( u.chargename like ").append("'%"+param.get("username")+"%' or g.name like'%"+param.get("username")+"%' or s.name like'%"+param.get("username")+"%'  ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state"))){
			sql.append(" and departmentid="+param.get("state"));
		}
		sql.append(" order by u.createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*) from jl_material_outstore_info u left join jl_material_goods_info g on u.goodsid=g.id    where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and u.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and u.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( u.chargename like ").append("'%"+param.get("username")+"%' or g.name like'%"+param.get("username")+"%' or s.name like'%"+param.get("username")+"%'  ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state"))){
			sql.append(" and departmentid="+param.get("state"));
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
}
