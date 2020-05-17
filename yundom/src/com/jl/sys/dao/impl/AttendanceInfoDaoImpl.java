package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.AttendanceInfoDao;
import com.jl.sys.pojo.AttendanceTotalInfo;
import com.jl.sys.pojo.UserInfo;

@Repository
public class AttendanceInfoDaoImpl extends BaseDao<AttendanceTotalInfo> implements AttendanceInfoDao {

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_attendance_total_info a where 1=1  ");
//		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
//			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
//		}
//		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
//			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
//		}
//		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
//			sql.append(" and ( username like ").append("'%"+param.get("username")+"%' or loginname like'%"+param.get("username")+"%' or address like'%"+param.get("username")+"%' or remark like'%"+param.get("username")+"%' ) ");
//		}
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from AttendanceTotalInfo where 1=1  ");
//		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
//			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
//		}
//		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
//			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
//		}
//		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
//			sql.append(" and ( username like ").append("'%"+param.get("username")+"%' or loginname like'%"+param.get("username")+"%' or address like'%"+param.get("username")+"%' or remark like'%"+param.get("username")+"%' ) ");
//		}
		int count=this.findListCount(sql.toString(), null);
		return count;
	}
	
	public void insertDatas(String sql){
		this.executeSql(sql);
	}

}
