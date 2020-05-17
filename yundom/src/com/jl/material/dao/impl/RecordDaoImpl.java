package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.RecordDao;
import com.jl.material.pojo.RecordInfo;
import com.jl.sys.pojo.UserInfo;
@Repository
public class RecordDaoImpl extends BaseDao<RecordInfo> implements RecordDao {
	@Override
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append("select * from jl_material_record_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  lyr like ").append("'%"+param.get("username")+"%'  ");
		}
		sql.append(" order by createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	@Override
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from RecordInfo where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and  lyr like ").append("'%"+param.get("username")+"%'  ");
		}
		int count=this.findListCount(sql.toString(), null);
		return count;
		
	}
	
	
	public RecordInfo findById(String id){
		return this.get(id);
	}
	
	public int delRecord(String id){
		RecordInfo record=findById(id);
		if(null!=record){
			this.delete(record);
			return 1;
		}else{
			return 0;
		}
	}
	
	public int saveRecord(RecordInfo record) {
		try{
			RecordInfo ui=this.get(record.getId());
			if(ui!=null){
				this.merge(record, record.getId());
			}else{
				this.save(record);
			}
			return 1;
		}catch (Exception e) {
			return 0;
		}
	}
	
}
