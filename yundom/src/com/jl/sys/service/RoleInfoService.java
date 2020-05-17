package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.RoleInfo;
import com.jl.sys.pojo.UserInfo;

public interface RoleInfoService {
	/**
	 * 根据主键查询角色信息
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午4:37:31
	 */
	public RoleInfo findById(int id);
	
	/**
	 * 保存角色信息
	 * @Title saveRole
	 * @param ri
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午4:37:43
	 */
	public int saveRole(RoleInfo ri);
	
	
	/**
	 * 角色列表的查询
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-4-29 下午4:03:56
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	
	/**
	 * 保存角色-菜单关系表
	 * @Title saveRoleMenu
	 * @param rid
	 * @param mids
	 * @author zpj
	 * @time 2016-5-3 上午11:55:54
	 */
	public void saveRoleMenu(int rid,String mids);
	
	/**
	 * 保存角色用户关系表
	 * @Title saveRoleUser
	 * @param rid   一个角色多个用户
	 * @param users
	 * @author zpj
	 * @time 2016-5-6 下午3:49:35
	 */
	public void saveRoleUser(int rid,String users);
	
	/**
	 * @Description (保存用户角色关系)
	 * @title saveRoleUser  一个用户多个角色
	 * @param rids
	 * @param userid void
	 * @author zpj
	 * @Date 2020年5月17日 下午7:22:53
	 */
	public void saveRoleUser(String rids,int userid);
	/**
	 * 保存角色部门关系表
	 * @Title saveRoleDepartment
	 * @param rid
	 * @param departments
	 * @author zpj
	 * @time 2016-5-6 下午3:49:48
	 */
	public void saveRoleDepartment(int rid,String departments);
	/**
	 * 根据角色id查询 角色菜单关联表中数据
	 * @Title findRoleMenuByRoleId
	 * @param rid
	 * @author zpj
	 * @time 2016-5-3 下午2:16:13
	 */
	public String findRoleMenuByRoleId(int rid);
	
	/**
	 * 查询用户角色表
	 * @Title findRoleUserByRoleId
	 * @param rid
	 * @return
	 * @author zpj
	 * @time 2016-5-6 下午4:09:03
	 */
	public String findRoleUserByRoleId(int rid);
	
	/**
	 * 部门角色表
	 * @Title findRoleDepartmentByRoleId
	 * @param rid
	 * @return
	 * @author zpj
	 * @time 2016-5-6 下午4:09:16
	 */
	public String findRoleDepartmentByRoleId(int rid);
	/**
	 * 删除角色
	 * @Title delRole
	 * @param id
	 * @author zpj
	 * @time 2016-5-3 下午3:07:10
	 */
	public void delRole(int id);
	
	
	/**
	 * 根据用户id查询角色用户关联表获取角色id
	 * @Title findRoleIdByUserId
	 * @param userid
	 * @return
	 * @author zpj
	 * @time 2016-5-11 上午10:34:50
	 */
	public List<Object[]> findRoleIdByUserId(int userid);
	
	/**
	 * 根据用户id查询部门角色表，获取角色id
	 * @Title findRoleIdByDepartmentId
	 * @param userid
	 * @return
	 * @author zpj
	 * @time 2016-5-11 上午10:35:21
	 */
	public List<Object[]> findRoleIdByDepartmentId(int deparmentid);
	
	
	/**
	 * 删除用户时根据用户id删除对应用户关联角色表的数据
	 * @Title deleteRoleUserByUserid
	 * @param userid
	 * @author zpj
	 * @time 2018-3-27 下午4:04:40
	 */
	public void deleteRoleUserByUserid(String userid);
}
