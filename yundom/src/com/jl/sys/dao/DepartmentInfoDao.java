package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;

public interface DepartmentInfoDao {
	
	/**
	 * 查询数据
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-3-11 下午2:01:04
	 */
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 查询总数
	 * @Title findCount
	 * @param user
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-3-11 下午2:01:14
	 */
	public int findCount(UserInfo user,Map<String,String> param);
	
	public DepartmentInfo findById(int id);
	
	
	public int saveDepartment(DepartmentInfo di);
	
	/**
	 * 查询节点下的所有
	 * @Title findAllDepartList
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-3-21 上午9:00:21
	 */
	public List<DepartmentInfo> findAllDepartList(Map<String,String> param);
	
	
	/**
	 * 查询树顶层节点
	 * @Title findTopDepartList
	 * @return
	 * @author zpj
	 * @time 2016-3-21 上午9:00:04
	 */
	public List findTopDepartList();
	
	public List<Map> findDepartListByPId(Map<String,String> param);
	
	
	public int remove(DepartmentInfo t);
	
	public DepartmentInfo findDeptByDeptCode(String code);
	
	
	public List<Map> findAllJson();
	
}
