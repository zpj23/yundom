package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Maintain;
import com.jl.sys.pojo.UserInfo;

public interface MaintainDao {
	public int saveMaintain(Maintain m);
	
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public Maintain findById(String id);
}
