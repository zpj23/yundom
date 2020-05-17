package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.UserInfo;

public interface ManualInfoDao {
	/**
	 * 保存
	 * @Title saveInfo
	 * @param cInfo
	 * @author zpj
	 * @time 2017-6-17 下午3:50:13
	 */
	public void saveInfo(CheckInfo cInfo) throws Exception;
	
	public int saveShenhe(String ids);
	/**
	 * 列表查询
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2017-6-17 下午3:50:23
	 */
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 查询出勤，加班，总工时 3个字段的和
	 * @Title findThreeSum
	 * @param user
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2019年9月2日 下午5:22:18
	 */
	public List findThreeSum(UserInfo user,Map<String,String> param,int page,int rows);
	
	
	/**
	 * 查询重复的数据
	 * @Title findRepeatList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2019年4月11日 下午5:24:53
	 */
	public List findRepeatList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 当前页数据工时求和，原来是循环数组，这样会慢，直接交给数据库查询总和
	 * @Title findListSum
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2017-7-15 上午9:22:49
	 */
//	public double findListSum(UserInfo user,int page,int rows,Map<String,String> param);
	/**
	 * 根据条件查询返回object[]
	 * @Title findListObjectArray
	 * @param user
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2017-6-23 下午3:19:01
	 */
	public List findListObjectArray(UserInfo user,Map<String,String> param);
	
	
	/**
	 * 查询总数
	 * @Title findCount
	 * @param user
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2017-6-17 下午4:04:29
	 */
	public int findCount(UserInfo user,Map<String,String> param);
	/**
	 * 查询重复数据的总数
	 * @Title findRepeatCount
	 * @param user
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2019年4月11日 下午5:25:19
	 */
	public int findRepeatCount(UserInfo user,Map<String,String> param);
	
	/**
	 * 根据id查询对象
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2017-6-19 下午3:43:54
	 */
	public CheckInfo findById(String id);
	
	public void delInfo(String id) throws Exception;
	
	
	public List findChartByUser(Map param);
	
	/**
	 * 根据月份查图表
	 * @Title findChartByDay
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2018-2-5 下午4:26:07
	 */
	public List findChartByDay(Map param);
	
	
	public int getWshNum(UserInfo user);
	
	public List findListByIds(String id);
	
}
