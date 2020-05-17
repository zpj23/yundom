package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.SgxmInfo;

public interface SgxmDao {
	public List findList(int page,int rows,Map<String,String> param);
	
	public Map findCount(Map<String,String> param);
	
	/**
	 * 查询一个月的所有数据根据人员姓名，部门，施工项目
	 * @Title invokeCall
	 * @param startime
	 * @param endtime
	 * @return
	 * @author zpj
	 * @time 2019年6月24日 下午2:57:22
	 */
	public List<Map> invokeCall(String startime,String endtime,String staffname);
	
	

	/**
	 * 更新用户对应月份的信息
	 * @Title updateMultiInfo
	 * @param pi
	 * @param yuefen
	 * @param username
	 * @param sgxm
	 * @param departmentname
	 * @author zpj
	 * @time 2019年6月25日 下午4:05:53
	 */
	public void updateMultiInfo(PayrollInfo pi);
	
	
	public SgxmInfo findById(String id);
	
	public void delInfo(String id);
	
	public void saveInfo(SgxmInfo pi);
	
}
