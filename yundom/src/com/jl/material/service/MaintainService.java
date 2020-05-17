package com.jl.material.service;

import java.util.Map;

import com.jl.material.pojo.Maintain;
import com.jl.sys.pojo.UserInfo;

public interface MaintainService {
	/**
	 * 保存报损申请
	 * @Title saveMaintain
	 * @param m
	 * @return
	 * @author zpj
	 * @time 2016-5-31 上午11:35:57
	 */
	public int saveMaintain(Maintain m);
	
	/**
	 * 审核列表
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-5-31 上午11:36:09
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 根据主键查询维修记录
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:48:16
	 */
	public Maintain findById(String id);
	
	public void saveMaintainState(String state,String id);
	
}
