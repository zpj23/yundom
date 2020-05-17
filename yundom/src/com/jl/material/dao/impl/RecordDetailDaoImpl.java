package com.jl.material.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.material.dao.RecordDetailDao;
import com.jl.material.pojo.RecordInfo;
import com.jl.material.pojo.RecordInfoDetail;
import com.jl.sys.pojo.UserInfo;
@Repository
public class RecordDetailDaoImpl extends BaseDao<RecordInfoDetail> implements RecordDetailDao {

	@Override
	public List findList(UserInfo user, int page, int rows, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append("select * from jl_material_record_info_detail a where 1=1  ");
//		if(null!=param.get("rid")&&!"".equalsIgnoreCase(param.get("rid").toString())){
		sql.append(" and recordId =").append("'"+param.get("rid")+"'");
//		}
//		sql.append(" order by createtime desc ");
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	@Override
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from RecordInfoDetail where 1=1  ");
//		if(null!=param.get("rid")&&!"".equalsIgnoreCase(param.get("rid").toString())){
		sql.append(" and recordId =").append("'"+param.get("rid")+"'");
//		}
		int count=this.findListCount(sql.toString(), null);
		return count;
		
	}
	
	public int saveDetail(RecordInfoDetail rid){
		try{
			RecordInfoDetail ui=this.get(rid.getId());
			if(ui!=null){
				this.merge(rid, rid.getId());
			}else{
				this.save(rid);
			}
			return 1;
		}catch (Exception e) {
			return 0;
		}
	}
	
	public void delRecordDetailByRecordId(String rid){
		this.executeSql("delete from jl_material_record_info_detail where recordId='"+rid+"'");
	}

}
