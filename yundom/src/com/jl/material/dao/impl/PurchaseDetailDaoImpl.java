package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.PurchaseDetailDao;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.sys.pojo.UserInfo;
@Repository
public class PurchaseDetailDaoImpl extends BaseDao<PurchaseDetail> implements PurchaseDetailDao {
	public void savePurchaseDetail(PurchaseDetail pd){
		this.save(pd);
	}

	@Override
	public List findDetailList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select p.*,m.name as goodsname,m.suppliername as suppliername  from jl_material_purchase_detail_info p left join jl_material_goods_info m on m.id=p.goodsid where 1=1  ");
		if(null!=param.get("purchaseid")&&!"".equalsIgnoreCase(param.get("purchaseid").toString())){
			sql.append(" and p.purchaseid = ").append("'"+param.get("purchaseid")+"'");
		}
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findDetailCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(*)  from jl_material_purchase_detail_info p where 1=1  ");
		if(null!=param.get("purchaseid")&&!"".equalsIgnoreCase(param.get("purchaseid").toString())){
			sql.append(" and p.purchaseid = ").append("'"+param.get("purchaseid")+"'");
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
	
	public List<PurchaseDetail> findPurchaseDetailByPurchaseId(String id){
		String hql=" from PurchaseDetail where purchaseid='"+id+"'";
		List<PurchaseDetail> list=this.findObjectByHql(hql);
		return list;
	}
}
