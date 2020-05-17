package com.jl.material.service.impl;

import java.lang.reflect.Type;
import java.text.DecimalFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.PurchaseDao;
import com.jl.material.dao.PurchaseDetailDao;
import com.jl.material.pojo.Purchase;
import com.jl.material.pojo.PurchaseDetail;
import com.jl.material.service.PurchaseService;
import com.jl.sys.pojo.UserInfo;
@Service
@Component("jlPurchaseInfoService")
public class PurchaseServiceImpl implements PurchaseService {
	@Autowired
	public PurchaseDao pDao;
	@Autowired
	public PurchaseDetailDao purchaseDetailDao;
	@MethodLog2(remark="保存采购单信息",type="新增")
	public String savePurchase(Purchase purchase,UserInfo user){
		String cgdid="CGD"+System.currentTimeMillis();
		purchase.setId(cgdid);
		purchase.setCreatetime(new Date());
		purchase.setLoginid(user.getId());
		purchase.setState("1");//采购中
		pDao.savePurchase(purchase);
		return cgdid;
	}
	@MethodLog2(remark="保存采购单详细信息",type="新增")
	public void savePurchaseDetail(String id,String data){
		List<Map<String,String>> list = JsonListTransfer(data);
		Map temp=new HashMap();
		for(int i=0;i<list.size();i++){
			temp=list.get(i);
			PurchaseDetail pd = new PurchaseDetail();
			pd.setGoodsid(Integer.parseInt((String)temp.get("id")));
			String price=(String)temp.get("price");
			pd.setGoodsprice(Double.parseDouble(price.split("元/")[0]));
			pd.setNum(Integer.parseInt(((String)temp.get("num")).replace(price.split("元/")[1], "")));
			pd.setSupplierid(Integer.parseInt((String)temp.get("supplierid")));
			pd.setPurchaseid(id);
			purchaseDetailDao.savePurchaseDetail(pd);
		}
	}
	/**
	 *json数组转换list
	 * @Title JsonListTransfer
	 * @param str
	 * @return
	 * @author zpj
	 * @time 2016-3-22 下午1:18:16
	 */
	public List<Map<String,String>> JsonListTransfer(String str){
		Gson gson = new Gson();
		Type listType = new TypeToken<List<Map<String,String>>>() {}.getType();
		List<Map<String,String>> target2 = gson.fromJson(str,  listType);
		return target2;
	}

	@Override
	public Map findList(UserInfo user, int page, int rows, Map<String,String> param) {
		List list=pDao.findList(user,page,rows,param);
		int count=pDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	public Map findDetailList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=purchaseDetailDao.findDetailList(user,page,rows,param);
		int count=purchaseDetailDao.findDetailCount(user,param);
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	
	public Purchase findPurchaseById(String id){
		return pDao.findPurchaseById(id);
	}
	@MethodLog2(remark="保存采购单审核信息",type="编辑")
	public void saveExaminePurchase(String id,String state,UserInfo u){
		pDao.examinePurchase(id,state,u);
	}
	
	public List<PurchaseDetail> findPurchaseDetailByPurchaseId(String id){
		return purchaseDetailDao.findPurchaseDetailByPurchaseId(id);
	}
}
