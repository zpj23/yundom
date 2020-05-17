package com.jl.sys.dao;

import java.util.List;

import com.jl.sys.pojo.DepartmentRoleInfo;

public interface RoleDepartmentDao {
	public  void delDepartmentRoleByRoleId(int id);
	
	public void saveDepartmentRole(DepartmentRoleInfo d);
	
	public List<Object[]> findDepartmentRoleByRoleId(int roleid);
	
	public List<Object[]> findRoleIdByDepartmentId(int departmentid);
}
