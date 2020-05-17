package com.jl.material.service;

import java.util.Map;

import com.jl.material.pojo.OutStore;
import com.jl.sys.pojo.UserInfo;

public interface OutStoreService {

	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	/**
	 * 保存出库
	 * @Title saveOutStore
	 * @param o
	 * @return
	 * @author zpj
	 * @time 2016-5-30 下午4:18:33
	 */
	public int saveOutStore(OutStore o);
}
