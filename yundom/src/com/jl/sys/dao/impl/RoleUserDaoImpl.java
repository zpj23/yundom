package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.RoleUserDao;
import com.jl.sys.pojo.UserRoleInfo;
@Repository
public class RoleUserDaoImpl extends  BaseDao<UserRoleInfo> implements RoleUserDao {

	@Override
	public void delUserRoleByRoleId(int roleid) {
		String sql="delete from jl_user_role_info where roleid="+roleid;
		this.executeUpdateOrDelete(sql);
	}

	@Override
	public void saveUserRole(UserRoleInfo u) {
		this.saveOrUpdate(u);
	}

	@Override
	public List<Object[]> findUserRoleByRoleId(int roleid) {
		String sql="select userid,roleid,id from jl_user_role_info where roleid="+roleid ;
		return this.findBySql2(sql);
	}

	public List<Object[]> findRoleIdByUserId(int userid){
		String sql="select ro.id,ro.rolecode,ro.rolename from jl_user_role_info ur left join jl_role_info ro on ur.roleid=ro.id where  ur.userid="+userid ;
		return this.findBySql2(sql);
	}
	
	
	public void deleteRoleUserByUserid(String userid){
		String sql="select * from jl_user_role_info where userid='"+userid+"'";
		List<Object[]> list=this.findBySql2(sql);
		if(null!=list&&list.size()>0){
			this.executeSql(" delete from jl_user_role_info where userid='"+userid+"'");
		}
	}
}
