package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.RecordInfo;
import com.jl.sys.pojo.UserInfo;

public interface RecordDao {

	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public int delRecord(String id);
	
	public RecordInfo findById(String id);
	
	public int saveRecord(RecordInfo goods);
}
