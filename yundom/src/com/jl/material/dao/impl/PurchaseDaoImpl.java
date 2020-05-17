package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.PurchaseDao;
import com.jl.material.pojo.Purchase;
import com.jl.sys.pojo.UserInfo;

@Repository
public class PurchaseDaoImpl extends BaseDao<Purchase> implements PurchaseDao {

	public void savePurchase(Purchase purchase) {
		this.save(purchase);
	}

	@Override
	public List findList(UserInfo user, int page, int rows, Map<String,String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select p.*,u.username,u.loginname,d.name as departmentname,p.id as cgdbh from jl_material_purchase_info p left join jl_user_info u on p.loginid=u.id left join jl_department_info d on d.id=p.departmentid where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and p.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and p.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( p.chargename like ").append("'%"+param.get("username")+"%' or u.username like'%"+param.get("username")+"%'  ) ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and p.departmentid = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state").toString())){
			sql.append(" and p.state = ").append("'"+param.get("state")+"'");
		}
		sql.append(" order by p.createtime desc");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String,String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(*) from jl_material_purchase_info p left join jl_user_info u on p.loginid=u.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and p.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and p.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( p.chargename like ").append("'%"+param.get("username")+"%' or u.username like'%"+param.get("username")+"%'  ) ");
		}
		if(null!=param.get("departmentid")&&!"".equalsIgnoreCase(param.get("departmentid").toString())){
			sql.append(" and p.departmentid = ").append("'"+param.get("departmentid")+"'");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state").toString())){
			sql.append(" and p.state = ").append("'"+param.get("state")+"'");
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
	
	public Purchase findPurchaseById(String id){
		return this.get(id);
	}
	
	public void examinePurchase(String id ,String state,UserInfo u){
		Purchase p=findPurchaseById(id);
		if(p!=null){
			p.setState(state);
			this.merge(p, p.getId());
		}
	}
	
}
