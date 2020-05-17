package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jl.sys.pojo.CheckInfo;
import com.jl.sys.pojo.UserInfo;

public interface ManualInfoService {
	public void saveInfo(CheckInfo cInfo);
	
	/**
	 * 列表查询
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2017-6-17 下午4:09:44
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	/**
	 * 查询历史人员列表
	 * @Title findStaffNameList
	 * @return
	 * @author zpj
	 * @time 2018年12月21日 下午1:34:51
	 */
	public List findStaffNameList(UserInfo user);
	
	/**
	 * 根据id查询考勤对象
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2017-6-19 下午3:42:46
	 */
	public CheckInfo findById(String id);
	
	/**
	 * 删除信息
	 * @Title delInfo
	 * @param id
	 * @author zpj
	 * @time 2017-6-19 下午5:01:37
	 */
	public void delInfo(String id);
	
	
	/**
	 * 导出
	 * @Title exportExcel
	 * @param param
	 * @param request
	 * @param response
	 * @param user
	 * @author zpj
	 * @time 2017-6-22 下午2:51:12
	 */
	public void exportExcel(Map<String,String> param,HttpServletRequest request, HttpServletResponse response,UserInfo user);
	
	/**
	 * 根据用户分类查询每个月的工时
	 * @Title findChartByUser
	 * @param username
	 * @author zpj
	 * @time 2017-7-10 下午4:35:45
	 */
	public List findChartByUser(Map username);
	
	
	/**
	 * 获取待审核数量
	 * @Title getWshNum
	 * @param user
	 * @return
	 * @author zpj
	 * @time 2018-2-10 上午10:16:09
	 */
	public int getWshNum(UserInfo user);
	
	/**
	 * 批量审核
	 * @Title saveShenhe
	 * @param ids
	 * @return
	 * @author zpj
	 * @time 2018-1-30 上午9:21:07
	 */
	public int saveShenhe(String ids,UserInfo user);
}
