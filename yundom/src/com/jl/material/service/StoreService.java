package com.jl.material.service;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Store;
import com.jl.sys.pojo.UserInfo;

/**
 * @Description: 
 * @ClassName: StoreService
 * @author zpj 
 * @date 2016-5-27 下午2:23:05
 *
 */
public interface StoreService {
	/**
	 * 更新新增库存信息
	 * @Title updateStoreInfo
	 * @author zpj
	 * @time 2016-5-27 下午2:23:09
	 */
	public void updateStoreInfo(Store store);
	
	/**
	 * 减少库存
	 * @Title reduceStore
	 * @param store
	 * @author zpj
	 * @time 2016-5-30 上午10:43:15
	 */
	public void reduceStore(Store store);
	
	
	/**
	 * 根据库存货物id查询库存量
	 * @Title findByGoodsId
	 * @param goodsid
	 * @return
	 * @author zpj
	 * @time 2016-5-27 下午2:32:53
	 */
	public Store findByGoodsId(int goodsid);
	
	/**
	 * 获取所有库存信息
	 * @Title findAllStore
	 * @return
	 * @author zpj
	 * @time 2016-5-27 下午3:26:49
	 */
	public List<Map> findAllStore();
	
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 某一个物资入库出库详细
	 * @Title findInOutDetail
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-5-30 下午3:24:56
	 */
	public Map findInOutDetail(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	/**
	 * 清除所有物资的表 信息
	 * @Title delAllTable
	 * @author zpj
	 * @time 2016-6-16 上午11:50:06
	 */
	public void delAllTable();
	
	
}
