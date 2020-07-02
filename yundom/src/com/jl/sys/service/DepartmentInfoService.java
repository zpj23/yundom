package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;

public interface DepartmentInfoService {
	
	/**
	 * datagrid查询部门json数据
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-3-11 下午2:00:37
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 根据主键查询部门对象
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-3-11 下午3:06:39
	 */
	public DepartmentInfo findById(int id);
	
	
	/**
	 * 保存部门信息
	 * @Title saveDepartment
	 * @param di
	 * @return
	 * @author zpj
	 * @time 2016-3-11 下午3:28:08
	 */
	public int saveDepartment(DepartmentInfo di);
	
	/**
	 * 根据name查询部门节点信息
	 * @Title findDeptJson
	 * @param 
	 * @return
	 * @author zpj
	 * @time 2016-3-16 上午9:05:29
	 */
	public String findDeptJson(Map<String,String> param);
	
	/**
	 * 查询树的跟节点
	 * @Title findTopJson
	 * @return
	 * @author zpj
	 * @time 2016-3-17 下午1:51:37
	 */
	public String findTopJson();
	
	
	/**
	 * 根据parentcode 查询列表
	 * @Title findByParentCode
	 * @param code
	 * @return
	 * @author zpj
	 * @time 2020年7月2日 上午10:55:47
	 */
	public List<Map> findByParentCode(String code);
	/**
	 * 删除部门方法
	 * @Title remove
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-3-25 上午10:51:56
	 */
	public int remove(DepartmentInfo t);
	
	/**
	 * 查询部门节点下的信息，和部门下用户的信息
	 * @Title findDeptOrUserJson
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-3-31 下午3:04:43
	 */
	public String findDeptOrUserJson(Map<String,String> param);
	
	/**
	 * 根据组织机构编码查询部门信息
	 * @Title findDeptByDeptCode
	 * @param code
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午4:44:14
	 */
	public DepartmentInfo findDeptByDeptCode(String code);
	
	
	/**
	 * 查询所有部门
	 * @Title findAllJson
	 * @return
	 * @author zpj
	 * @time 2016-5-6 下午2:45:26
	 */
	public String findAllJson(String checkids);
}
