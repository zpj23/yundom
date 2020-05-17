package com.jl.material.service;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Purchase;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.sys.pojo.UserInfo;

public interface InStoreService {
	/**
	 * 采购单入库
	 * @Title saveInStore
	 * @param p
	 * @param pd
	 * @author zpj
	 * @time 2016-5-25 下午4:49:53
	 */
	public void saveInStore(Purchase p ,List<PurchaseDetail> pdList);
	
	
	/**
	 * 查询入库列表信息
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @author zpj
	 * @time 2016-5-27 上午10:20:50
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
}
