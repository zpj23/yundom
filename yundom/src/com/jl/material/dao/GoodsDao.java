package com.jl.material.dao;

import java.util.List;
import java.util.Map;

import com.jl.material.pojo.Goods;
import com.jl.sys.pojo.UserInfo;

public interface GoodsDao {
	
	public int saveGoods(Goods goods);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public Goods findById(int id);
	
	public int delGoods(int id);
}
