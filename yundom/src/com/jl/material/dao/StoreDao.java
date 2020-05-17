package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Store;
import com.jl.sys.pojo.UserInfo;

public interface StoreDao {
	public Store findByGoodsId(int goodsid);
	
	public void updateStoreInfo(Store store);
	
	public List<Map> findAllStore();
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public List findInOutDetail(UserInfo user,int page,int rows,Map<String,String> param);
	
	public void clearAllTable();
	
}
