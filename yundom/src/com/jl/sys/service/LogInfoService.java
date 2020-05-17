package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.LogInfo;
import com.jl.sys.pojo.UserInfo;

public interface LogInfoService {
	/**
	 * 登陆时插入日志
	 * @Title logInfo
	 * @param log
	 * @author zpj
	 * @time 2016-6-6 下午3:39:16
	 */
	void logInfo(LogInfo log);
	
	/**
	 * 日志列表查询
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-6-6 下午3:39:30
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 删除日志
	 * @Title delLog
	 * @param id
	 * @author zpj
	 * @time 2016-6-16 上午11:44:55
	 */
	public void delLog(String id );
	
	/**
	 * 
	 * @Title findTopFive
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-6-8 上午11:40:02
	 */
	public List findTopFive(UserInfo user,int page,int rows,Map<String,String> param);
}
