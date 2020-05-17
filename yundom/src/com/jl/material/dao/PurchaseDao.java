package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Purchase;
import com.jl.sys.pojo.UserInfo;

public interface PurchaseDao {
	void savePurchase(Purchase purchase);
	public List findList(UserInfo user, int page, int rows, Map<String,String> param);
	public int findCount(UserInfo user,  Map<String,String> param);
	
	public Purchase findPurchaseById(String id);
	
	public void examinePurchase(String id,String state,UserInfo u);
}
