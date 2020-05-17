package com.jl.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.RoleMenuDao;
import com.jl.sys.pojo.MenuRoleInfo;

@Repository
public class RoleMenuDaoImpl extends BaseDao<MenuRoleInfo> implements RoleMenuDao {

	@Override
	public void saveMenuRole(MenuRoleInfo mri) {
		this.saveOrUpdate(mri);
	}

	@Override
	public void delMenuRoleByRoleId(int rid) {
		String sql="delete from jl_menu_role_info where roleid="+rid;
		this.executeUpdateOrDelete(sql);
	}
	
	public List<Object[]> findMenuRoleByRoleId(int rid){
		String sql="select menuid,roleid,id from jl_menu_role_info where roleid="+rid ;
		return this.findBySql2(sql);
	}
}
