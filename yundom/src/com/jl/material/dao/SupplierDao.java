package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Supplier;
import com.jl.sys.pojo.UserInfo;

public interface SupplierDao {
	
	public int saveSupplier(Supplier supper);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public Supplier findById(int id);
	
	public int delSupplier(int id);
}
