package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.OutStore;
import com.jl.sys.pojo.UserInfo;

public interface OutStoreDao {
	public int saveOutStore(OutStore o);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
}
