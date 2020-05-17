package com.jl.material.service;

import java.util.Map;

import com.jl.material.pojo.Goods;
import com.jl.material.pojo.Supplier;
import com.jl.sys.pojo.UserInfo;

public interface GoodsService {
	/**
	 * 保存物资
	 * @Title save
	 * @param goods
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午3:46:51
	 */
	public int save(Goods goods);
	
	
	/**
	 * 根据主键找goods
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午3:50:20
	 */
	public Goods findById(int id);
	
	/**
	 * 列表查询
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午3:52:01
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 *根据主键删除
	 * @Title delGoods
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午3:54:04
	 */
	public int delGoods(int id);
	
}
