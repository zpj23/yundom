package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.InStoreDao;
import com.jl.material.pojo.InStore;
import com.jl.sys.pojo.UserInfo;

@Repository
public class InStoreDaoImpl extends BaseDao<InStore> implements InStoreDao {
	public void saveInStore(InStore is){
		this.saveOrUpdate(is);
	}

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select u.*,g.name as goodsname,s.name as suppliername,p.chargename from jl_material_instore_info u left join jl_material_goods_info g on u.goodsid=g.id left join  jl_material_supplier_info s on u.supplierid=s.id left join jl_material_purchase_info p on p.id=u.purchaseid   where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and u.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and u.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( p.chargename like ").append("'%"+param.get("username")+"%' or g.name like'%"+param.get("username")+"%' or s.name like'%"+param.get("username")+"%'  ) ");
		}
		sql.append(" order by u.createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*) from jl_material_instore_info u left join jl_material_goods_info g on u.goodsid=g.id left join  jl_material_supplier_info s on u.supplierid=s.id left join jl_material_purchase_info p on p.id=u.purchaseid   where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and u.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and u.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( p.chargename like ").append("'%"+param.get("username")+"%' or g.name like'%"+param.get("username")+"%' or s.name like'%"+param.get("username")+"%'  ) ");
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
}
