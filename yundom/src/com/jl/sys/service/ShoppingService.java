package com.jl.sys.service;

import java.util.Map;

import com.jl.sys.pojo.UserInfo;

public interface ShoppingService {

	
	/**
	 * 列表初始化
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2018-3-22 下午3:00:58
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
}
