package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.jl.sys.pojo.PayrollInfo;
import com.jl.sys.pojo.UserInfo;

public interface PayrollService {

	
	/**
	 * 保存数据
	 * @Title saveInfo
	 * @param pi
	 * @author zpj
	 * @time 2019年3月5日 上午10:05:32
	 */
	public void saveInfo(PayrollInfo pi);
	
	/**
	 * 删除数据
	 * @Title delInfo
	 * @param id
	 * @author zpj
	 * @time 2019年3月5日 下午3:06:28
	 */
	public void delInfo(String id);
	
	/**
	 * 列表查询数据
	 * @Title findList
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2019年3月5日 上午11:30:05
	 */
	public Map findList(int page,int rows,Map<String,String> param);
	
	/**
	 * 根据主键查询对象
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2019年3月5日 下午2:22:39
	 */
	public PayrollInfo findById(String id);
	
	/**
	 * 审核时计算（统计）当某月某人的考勤信息
	 * @Title calculateInfo
	 * @param yuefen
	 * @param username
	 * @author zpj
	 * @time 2019年3月18日 下午3:12:17
	 */
	public Map calculateInfo(String yuefen,String username,UserInfo user);
	
	
	public boolean updateSgxmListByYf(String yf);
	
	public List findListByYf(String yf);
	
	/**
	 * 导出工资单汇总信息 根据人来汇总
	 * @Title exportExcel
	 * @param request
	 * @param response
	 * @author zpj
	 * @time 2019年9月18日 上午11:44:41
	 */
	public void exportExcel(Map<String,String> param,HttpServletRequest request, HttpServletResponse response);
}
