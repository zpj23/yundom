package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.PurchaseDetail;
import com.jl.sys.pojo.UserInfo;

public interface PurchaseDetailDao {
	void savePurchaseDetail(PurchaseDetail pd);
	
	public List findDetailList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findDetailCount(UserInfo user,Map<String,String> param);
	
	public List<PurchaseDetail> findPurchaseDetailByPurchaseId(String id);
}
