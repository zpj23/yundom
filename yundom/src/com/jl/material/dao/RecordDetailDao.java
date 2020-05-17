package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.RecordInfoDetail;
import com.jl.sys.pojo.UserInfo;

public interface RecordDetailDao {
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public int saveDetail(RecordInfoDetail rid);
	
	public void delRecordDetailByRecordId(String rid);
}
