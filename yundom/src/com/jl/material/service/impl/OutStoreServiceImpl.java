package com.jl.material.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.OutStoreDao;
import com.jl.material.pojo.OutStore;
import com.jl.material.pojo.Store;
import com.jl.material.service.OutStoreService;
import com.jl.material.service.StoreService;
import com.jl.sys.pojo.UserInfo;

@Service
@Component("jlOutService")
public class OutStoreServiceImpl implements OutStoreService {
	@Autowired
	public OutStoreDao oDao;
	@Autowired
	public StoreService jlStoreInfoService;
	
	@MethodLog2(remark="保存出库信息",type="新增")
	public int saveOutStore(OutStore o) {
		o.setCreatetime(new Date());
		int r=oDao.saveOutStore(o);
		Store store=new Store();
		store.setGoodsid(o.getGoodsid());
		store.setNum(o.getNum());
		jlStoreInfoService.reduceStore(store);
		return r;
	}
	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List list=oDao.findList(user,page,rows,param);
		int count=oDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
}
