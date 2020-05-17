package com.jl.material.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.SupplierDao;
import com.jl.material.pojo.Supplier;
import com.jl.sys.pojo.UserInfo;

@Repository
public class SupplierDaoImpl extends BaseDao<Supplier> implements SupplierDao{
	
	public int saveSupplier(Supplier supper) {
		try{
			int id=supper.getId();
			Supplier ui=this.get(id);
			if(ui!=null){
				this.merge(supper, String.valueOf(id));
			}else{
//				supper.setCreatetime(new Date());
				this.save(supper);
			}
			return 1;
		}catch (Exception e) {
			return 0;
		}
	}
	
	@Override
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from jl_material_supplier_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("username")+"%' or contactname like'%"+param.get("username")+"%' or address like'%"+param.get("username")+"%' or remark like'%"+param.get("username")+"%' ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state").toString())){
			sql.append(" and state = ").append("'"+param.get("state")+"'");
		}
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	@Override
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from Supplier where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("username")+"%' or contactname like'%"+param.get("username")+"%' or address like'%"+param.get("username")+"%' or remark like'%"+param.get("username")+"%' ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state").toString())){
			sql.append(" and state = ").append("'"+param.get("state")+"'");
		}
		int count=this.findListCount(sql.toString(), null);
		return count;
		
	}
	
	public Supplier findById(int id){
		return this.get(id);
	}
	
	public int delSupplier(int id){
		if(id!=0){
			this.delete(findById(id));
			return 1;
		}else{
			return 0;
		}
	}
}
