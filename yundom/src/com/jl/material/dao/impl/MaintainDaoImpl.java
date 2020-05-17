package com.jl.material.dao.impl;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.MaintainDao;
import com.jl.material.pojo.Maintain;
import com.jl.sys.pojo.UserInfo;

@Repository
public class MaintainDaoImpl extends BaseDao<Maintain> implements MaintainDao{
	public int saveMaintain(Maintain m){
		try{
			if(m.getId()==0){
				this.saveOrUpdate(m);
			}else{
				this.merge(m, String.valueOf(m.getId()));
			}
		}catch (Exception e) {
			return 0;
		}
		return 1;
	}

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select m.*,g.name as goodsname,s.name as maintainname,d.name as departmentname from jl_material_maintain_info m left join jl_material_goods_info g on g.id=m.goodsid left join jl_material_supplier_info s on s.id= m.maintainid left join jl_department_info d on d.id=m.departmentid  where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and m.createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and m.createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( m.chargename like ").append("'%"+param.get("username")+"%'   ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state"))){
			sql.append(" and m.departmentid="+param.get("state"));
		}
		if(null!=param.get("examinestate")&&!"".equalsIgnoreCase(param.get("examinestate"))){
			sql.append(" and m.examinestate="+param.get("examinestate"));
		}
		sql.append(" order by m.createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select count(*) from jl_material_maintain_info   where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( chargename like ").append("'%"+param.get("username")+"%'   ) ");
		}
		if(null!=param.get("state")&&!"".equalsIgnoreCase(param.get("state"))){
			sql.append(" and departmentid="+param.get("state"));
		}
		if(null!=param.get("examinestate")&&!"".equalsIgnoreCase(param.get("examinestate"))){
			sql.append(" and examinestate="+param.get("examinestate"));
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
	public Maintain findById(String id){
		return this.get(Integer.parseInt(id));
	}
}
