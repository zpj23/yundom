package com.jl.sys.dao.impl;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.RoleDepartmentDao;
import com.jl.sys.pojo.DepartmentRoleInfo;
@Repository
public class RoleDepartmentDaoImpl  extends BaseDao<DepartmentRoleInfo> implements RoleDepartmentDao {

	@Override
	public void delDepartmentRoleByRoleId(int id) {
		String sql="delete from jl_department_role_info where roleid="+id;
		this.executeUpdateOrDelete(sql);
	}

	@Override
	public void saveDepartmentRole(DepartmentRoleInfo d) {
		this.saveOrUpdate(d);
	}

	@Override
	public List<Object[]> findDepartmentRoleByRoleId(int roleid) {
		String sql="select departmentid,roleid,id from jl_department_role_info where roleid="+roleid ;
		return this.findBySql2(sql);
	}
	
	public List<Object[]> findRoleIdByDepartmentId(int departmentid){
		String sql="select ro.id,ro.rolecode,ro.rolename from jl_department_role_info dr left join jl_role_info ro on dr.roleid=ro.id  where dr.departmentid="+departmentid ;
		return this.findBySql2(sql);
	}

}
