package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.SalaryInfo;
import com.jl.sys.pojo.UserInfo;

public interface SalaryDao {
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public void insertSql(String sql);
	
	public SalaryInfo findById(String id);
	
	public void saveInfo(SalaryInfo sInfo);
	
	public void delInfo(String id);
}
