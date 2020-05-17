package com.jl.material.service;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Purchase;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.sys.pojo.UserInfo;

public interface PurchaseService {
	/**
	 * 保存采购单信息
	 * @Title savePurchase
	 * @param purchase
	 * @param u
	 * @return
	 * @author zpj
	 * @time 2016-5-24 上午10:10:24
	 */
	public String savePurchase(Purchase purchase,UserInfo u);
	
	/**
	 * 审核修改状态
	 * @Title examinePurchase
	 * @param purchase
	 * @param u
	 * @return
	 * @author zpj
	 * @time 2016-5-24 下午3:09:59
	 */
	public void saveExaminePurchase(String id,String state,UserInfo u);
	
	
	/**
	 * 保存采购单详细信息
	 * @Title savePurchaseDetail
	 * @param id
	 * @param data
	 * @author zpj
	 * @time 2016-5-24 上午10:10:08
	 */
	public void savePurchaseDetail(String id,String data);
	
	/**
	 * 采购单列表
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-5-24 上午10:09:59
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 采购单详细查询
	 * @Title findDetailList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:49:23
	 */
	public Map findDetailList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 根据主键查询采购单信息
	 * @Title findPurchaseById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-5-24 下午3:03:16
	 */
	public Purchase findPurchaseById(String id);
	
	/**
	 * 根据采购单id查询采购单详细信息
	 * @Title findPurchaseDetailByPurchaseId
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:49:39
	 */
	public List<PurchaseDetail> findPurchaseDetailByPurchaseId(String id);
	
}
