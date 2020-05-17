package com.jl.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.HistoryStaffNameDao;
import com.jl.sys.pojo.HistoryStaffname;
@Repository
public class HistoryStaffNameDaoImpl extends BaseDao<HistoryStaffname> implements HistoryStaffNameDao {

	@Override
	public void saveHistoryStaffName(HistoryStaffname hs) {
//		List<Object[]> list=this.findBySql2("select id,'' from jl_history_staffname where userid='"+hs.getUserId()+"' and staffname like '"+hs.getStaffName()+"%' ");
//		if(null==list||list.size()==0){
//			this.save(hs);
//		}else{
			this.executeSql(" delete from jl_history_staffname where userid='"+hs.getUserId()+"' and staffname like '"+hs.getStaffName()+"%' ");
			this.save(hs);
//		}
	}
	
	public List findStaffNameList(int userId){
		List list=this.findMapObjBySql("select staffname from jl_history_staffname where userid='"+userId+"' order by createtime asc ", null, 1, 100);
		return list;
	}

}
