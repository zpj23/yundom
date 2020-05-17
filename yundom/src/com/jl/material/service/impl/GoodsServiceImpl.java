package com.jl.material.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.GoodsDao;
import com.jl.material.pojo.Goods;
import com.jl.material.service.GoodsService;
import com.jl.sys.pojo.UserInfo;
@Service
@Component("jlGoodsInfoService")
public class GoodsServiceImpl implements GoodsService{
	@Autowired
	public GoodsDao goodsDao;
	
	@MethodLog2(remark="保存物资信息",type="新增/编辑")
	public int save(Goods supper) {
		return goodsDao.saveGoods(supper);
	}
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=goodsDao.findList(user,page,rows,param);
		int count=goodsDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	public Goods findById(int id){
		return goodsDao.findById(id);
	}
	@MethodLog2(remark="删除物资信息",type="删除")
	public int delGoods(int id) {
		return goodsDao.delGoods(id);
	}
}
