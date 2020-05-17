package com.jl.sys.dao.impl;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.LogInfoDao;
import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.util.DateHelper;
@Repository
public class LogInfoDaoImpl extends BaseDao<LogInfo> implements LogInfoDao {

	@Override
	public void saveLog(LogInfo log) {
		this.saveOrUpdate(log);
	}

	@Override
	public List findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_log_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( username like ").append("'%"+param.get("username")+"%'   or description like'%"+param.get("username")+"%' ) ");
		}
		if(null!=param.get("type")&&!"".equalsIgnoreCase(param.get("type").toString())){
			String type=(String)param.get("type");
			if(type.contains("或")){
				String[] arr=type.split("或");
				sql.append(" and (type like '%"+arr[0]+"%' or type like '%"+arr[1]+"%'");
			}else{
				sql.append(" and type = ").append("'"+param.get("type")+"'");
			}
		}
		sql.append(" order by createtime desc ");
		
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}

	@Override
	public int findCount(UserInfo user, Map<String, String> param) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(*) from jl_log_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("username")&&!"".equalsIgnoreCase(param.get("username").toString())){
			sql.append(" and ( username like ").append("'%"+param.get("username")+"%'   or description like'%"+param.get("username")+"%' ) ");
		}
		if(null!=param.get("type")&&!"".equalsIgnoreCase(param.get("type").toString())){
			String type=(String)param.get("type");
			if(type.contains("或")){
				String[] arr=type.split("或");
				sql.append(" and (type like '%"+arr[0]+"%' or type like '%"+arr[1]+"%'");
			}else{
				sql.append(" and type = ").append("'"+param.get("type")+"'");
			}
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
	}
		
	public void delLog(String id){
		Date dNow = new Date(); //当前时间
		Calendar calendar = Calendar.getInstance(); //得到日历
		calendar.setTime(dNow);//把当前时间赋给日历
		calendar.add(calendar.MONTH, -3); //设置为前3月
		Date dBefore = calendar.getTime(); //得到前3月的时间
		SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd"); //设置时间格式
		String defaultStartDate = sdf.format(dBefore); //格式化前3月的时间
		StringBuffer sql =new StringBuffer();
		sql.append(" delete from jl_log_info where createtime<='"+defaultStartDate+"'");
		this.executeUpdateOrDelete(sql.toString());
		
	}
	
	public List findTopFive(UserInfo user, int page, int rows,
			Map<String, String> param){
		StringBuffer sql = new StringBuffer();
		sql.append("  select count(*) as total ,username as name,userid as uid from jl_log_info a where 1=1  ");
		if(null!=param.get("datemin")&&!"".equalsIgnoreCase(param.get("datemin").toString())){
			sql.append(" and createtime >= ").append("'"+param.get("datemin")+"'");
		}
		if(null!=param.get("datemax")&&!"".equalsIgnoreCase(param.get("datemax").toString())){
			sql.append(" and createtime <= ").append("'"+param.get("datemax")+"'");
		}
		if(null!=param.get("type")&&!"".equalsIgnoreCase(param.get("type").toString())){
			String type=(String)param.get("type");
			if(type.contains("或")){
				String[] arr=type.split("或");
				sql.append(" and (type like '%"+arr[0]+"%' or type like '%"+arr[1]+"%'");
			}else{
				sql.append(" and type = ").append("'"+param.get("type")+"'");
			}
		}
		sql.append(" group by userid ORDER BY total desc ");
		
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		
		return list;
	}

}
