package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.UserRoleInfo;

public interface RoleUserDao {
	public void delUserRoleByRoleId(int roleid);
	
	public void saveUserRole(UserRoleInfo u);
	
	public List<Object[]> findUserRoleByRoleId(int roleid);
	
	
	List<Object[]> findRoleIdByUserId(int userid);
	
	public void deleteRoleUserByUserid(String userid);
	
}
