package com.jl.material.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.InStoreDao;
import com.jl.material.pojo.InStore;
import com.jl.material.pojo.Purchase;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.material.pojo.Store;
import com.jl.material.service.InStoreService;
import com.jl.material.service.StoreService;
import com.jl.sys.pojo.UserInfo;
@Service
@Component("jlInStoreInfoService")
public class InStoreServiceImpl implements InStoreService{
	@Autowired
	public InStoreDao inStoreDao;
	@Autowired
	public StoreService jlStoreInfoService;
	
	@MethodLog2(remark="保存入库信息",type="新增")
	public void saveInStore(Purchase p ,List<PurchaseDetail> pdList){
		for(int i=0;i<pdList.size();i++){
			InStore is=new InStore();
			is.setGoodsid(pdList.get(i).getGoodsid());
			is.setCreatetime(new Date());
			is.setDepartmentid(p.getDepartmentid());
			is.setNum(pdList.get(i).getNum());
			is.setPrice(pdList.get(i).getGoodsprice());
			is.setSupplierid(pdList.get(i).getSupplierid());
			is.setPurchaseid(p.getId());
			inStoreDao.saveInStore(is);
			//入库时，进行库存更新
			Store store=new Store();
			store.setGoodsid(pdList.get(i).getGoodsid());
			store.setNum(pdList.get(i).getNum());
			store.setPrice(pdList.get(i).getGoodsprice());
			store.setSupplierid(pdList.get(i).getSupplierid());
			store.setUpdatetime(new Date());
			jlStoreInfoService.updateStoreInfo(store);
		}
	}
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=inStoreDao.findList(user,page,rows,param);
		int count=inStoreDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
}
