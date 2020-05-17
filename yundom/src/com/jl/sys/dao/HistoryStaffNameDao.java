package com.jl.sys.dao;

import java.util.List;

import com.jl.sys.pojo.HistoryStaffname;

public interface HistoryStaffNameDao {
	/**
	 * 保存历史信息
	 * @Title saveHistoryStaffName
	 * @author zpj
	 * @time 2018年12月21日 上午10:57:03
	 */
	public void saveHistoryStaffName(HistoryStaffname hs);
	
	/**
	 * 查询带班曾经输过的人员姓名历史列表
	 * @Title findStaffNameList
	 * @param userId
	 * @return
	 * @author zpj
	 * @time 2018年12月21日 下午1:37:12
	 */
	public List findStaffNameList(int userId);
}
