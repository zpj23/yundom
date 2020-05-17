package com.jl.material.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.StoreDao;
import com.jl.material.pojo.Store;
import com.jl.material.service.StoreService;
import com.jl.sys.pojo.UserInfo;
/**
 * @Description: 库存
 * @ClassName: StoreServiceImpl
 * @author zpj 
 * @date 2016-5-27 下午2:21:45
 *
 */
@Service
@Component("jlStoreInfoService")
public class StoreServiceImpl implements StoreService {
	@Autowired
	public StoreDao storeDao;
	
	@MethodLog2(remark="更新库存信息",type="新增")
	public void updateStoreInfo(Store store) {
		Store s=findByGoodsId(store.getGoodsid());
		if(s==null){
			storeDao.updateStoreInfo(store);
		}else{
			double bnum=s.getNum();//之前数量
			bnum+=store.getNum();
			s.setNum(bnum);
			s.setUpdatetime(new Date());
			storeDao.updateStoreInfo(s);
		}
	}
	
	@MethodLog2(remark="更新库存信息",type="删除")
	public void reduceStore(Store store){
		Store s=findByGoodsId(store.getGoodsid());
		double bnum=s.getNum();//之前数量
		bnum-=store.getNum();
		s.setNum(bnum);
		s.setUpdatetime(new Date());
		storeDao.updateStoreInfo(s);
	}
	public Store findByGoodsId(int goodsid){
		return storeDao.findByGoodsId(goodsid);
	}

	@Override
	public List<Map> findAllStore() {
		return storeDao.findAllStore();
	}
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=storeDao.findList(user,page,rows,param);
		int count=storeDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	public Map findInOutDetail(UserInfo user,int page,int rows,Map<String,String> param){
		List list=storeDao.findInOutDetail(user,page,rows,param);
		Map map=new HashMap();
		map.put("list", list);
		if(null!=list){
			map.put("count", list.size());
		}else{
			map.put("count", 0);
		}
		return map;
	}


	@MethodLog2(remark="清空所有物资关联信息表",type="删除")
	public void delAllTable() {
		storeDao.clearAllTable();
	}
	
}
