package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.InStore;
import com.jl.sys.pojo.UserInfo;

public interface InStoreDao {
	/**
	 * 保存入库信息
	 * @Title saveInStore
	 * @param is
	 * @author zpj
	 * @time 2016-5-25 下午4:54:09
	 */
	public void saveInStore(InStore is);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
}
