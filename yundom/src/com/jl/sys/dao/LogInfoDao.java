package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;

public interface LogInfoDao {
	void saveLog(LogInfo log);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public void delLog(String id);
	
	public List findTopFive(UserInfo user, int page, int rows,
			Map<String, String> param);
}
