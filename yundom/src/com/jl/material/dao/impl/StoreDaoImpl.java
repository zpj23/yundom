package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.StoreDao;
import com.jl.material.pojo.Store;
import com.jl.sys.pojo.UserInfo;

@Repository
public class StoreDaoImpl  extends BaseDao<Store> implements StoreDao{

	@Override
	public Store findByGoodsId(int goodsid) {
		StringBuilder sql=new StringBuilder(200);
		sql.append(" from Store where goodsid="+goodsid);
		List<Store> list=this.findObjectByHql(sql.toString());
		if(list.size()==1){
			return list.get(0);
		}else{
			return null;
		}
	}

	@Override
	public void updateStoreInfo(Store store) {
		if(store.getId()==0){
			this.saveOrUpdate(store);
		}else{
			this.merge(store,String.valueOf(store.getId()));
		}
	}

	@Override
	public List<Map> findAllStore() {
		StringBuilder sql = new StringBuilder(200);
		sql.append(" select s.goodsid  ,s.price,s.num, g.name as goodsname,g.suppliername as suppliername,g.supplierid as supplierid from jl_material_store_info s left join jl_material_goods_info g on s.goodsid=g.id ");
		return this.findMapObjBySql(sql.toString(), null, 1, 100);
	}
	
	
	public List findInOutDetail(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append("select s.*, g.name as goodsname,g.suppliername,g.type as type1 from inoutStore s left join jl_material_goods_info g on g.id=s.goodsid where 1=1 and  ");
		if(null!=param.get("goodsid")&&!"".equalsIgnoreCase(param.get("goodsid").toString())){
			sql.append(" goodsid='"+param.get("goodsid")+"' ");
		}
		sql.append(" order by createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select s.*,g.name as goodsname,g.suppliername,g.unit from jl_material_store_info s left join jl_material_goods_info g on s.goodsid=g.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and s.updatetime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and s.updatetime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( g.name like ").append("'%"+param.get("username")+"%' or g.suppliername like'%"+param.get("username")+"%' ) ");
		}
		sql.append(" order by s.updatetime desc");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*) from jl_material_store_info s left join jl_material_goods_info g on s.goodsid=g.id where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and s.updatetime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and s.updatetime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( g.name like ").append("'%"+param.get("username")+"%' or g.suppliername like'%"+param.get("username")+"%' ) ");
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
	
	
	public void clearAllTable(){
		this.executeSql("delete from jl_material_goods_info");
		this.executeSql("delete from jl_material_goods_info");
		this.executeSql("delete from jl_material_instore_info");
		this.executeSql("delete from jl_material_maintain_info");
		this.executeSql("delete from jl_material_outstore_info");
		this.executeSql("delete from jl_material_purchase_detail_info");
		this.executeSql("delete from jl_material_purchase_info");
		this.executeSql("delete from jl_material_store_info");
		this.executeSql("delete from jl_material_supplier_info");
		
	}
	
}
