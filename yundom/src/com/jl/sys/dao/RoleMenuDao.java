package com.jl.sys.dao;

import java.util.List;

import com.jl.sys.pojo.MenuRoleInfo;

public interface RoleMenuDao {
	/**
	 * 保存权限菜单关联表
	 * @Title saveMenuRole
	 * @param mri
	 * @author zpj
	 * @time 2016-5-3 下午1:47:16
	 */
	public void saveMenuRole(MenuRoleInfo mri);
	
	
	/**
	 * 根据角色id删除角色菜单关联表中数据
	 * @Title delMenuRoleByRoleId
	 * @param rid
	 * @author zpj
	 * @time 2016-5-3 下午2:18:19
	 */
	public void delMenuRoleByRoleId(int rid);
	
	
	/**
	 *  根据角色id查询角色菜单关联表中数据
	 * @Title findMenuRoleByRoleId
	 * @param rid
	 * @return
	 * @author zpj
	 * @time 2016-5-3 下午2:18:17
	 */
	public List<Object[]> findMenuRoleByRoleId(int rid);
}
