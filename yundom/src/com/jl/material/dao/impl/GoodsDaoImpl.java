package com.jl.material.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.GoodsDao;
import com.jl.material.pojo.Goods;
import com.jl.sys.pojo.UserInfo;
@Repository
public class GoodsDaoImpl extends BaseDao<Goods> implements GoodsDao{
	public int saveGoods(Goods goods) {
		try{
			int id=goods.getId();
			Goods ui=this.get(id);
			if(ui!=null){
				goods.setCreatetime(ui.getCreatetime());
				this.merge(goods, String.valueOf(id));
			}else{
//				goods.setCreatetime(new Date());
				this.save(goods);
			}
			return 1;
		}catch (Exception e) {
			return 0;
		}
	}
	
	@Override
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from jl_material_goods_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("username")+"%' or suppliername like'%"+param.get("username")+"%'  ) ");
		}
		sql.append(" order by createtime desc");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	@Override
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from Goods where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("username")+"%' or suppliername like'%"+param.get("username")+"%'  ) ");
		}
		int count=this.findListCount(sql.toString(), null);
		return count;
		
	}
	
	public Goods findById(int id){
		return this.get(id);
	}
	
	public int delGoods(int id){
		if(id!=0){
			this.delete(findById(id));
			return 1;
		}else{
			return 0;
		}
	}
}
