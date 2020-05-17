package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.LocationDao;
import com.jl.sys.pojo.LocationInfo;
@Repository
public class LocationDaoImpl extends BaseDao<LocationInfo> implements LocationDao {

	@Override
	public void updateLocation(LocationInfo l) {
		this.save(l);
	}
	
	public List findJson(Map param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.*,u.username from jl_location_info a left join jl_user_info u where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and updatetime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and updatetime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and u.username like '%"+param.get("username")+"%' ");
		}
		sql.append(" order by updatetime desc");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 10);
		return list;
	}

}
