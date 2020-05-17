package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.RoleInfo;
import com.jl.sys.pojo.UserInfo;

public interface RoleInfoDao {
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public int saveRole(RoleInfo ri);
	
	public RoleInfo findById(int id);
	
	public void delRoleByRoleId(int id);
}
