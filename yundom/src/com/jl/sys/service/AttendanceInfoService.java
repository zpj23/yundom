package com.jl.sys.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.poi.hssf.usermodel.HSSFRow;

import com.jl.sys.pojo.UserInfo;

public interface AttendanceInfoService {
	/**
	 * 查询考勤信息
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-4-1 下午1:48:50
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	/**
	 * 插入汇总表
	 * @Title insertTotalInfo
	 * @param list
	 * @author zpj
	 * @time 2017-4-13 下午4:05:19
	 */
	public void insertTotalInfo(List<HSSFRow> list);
	
	/**
	 * 打卡记录的插入
	 * @Title insertRegInfo
	 * @param list
	 * @author zpj
	 * @time 2017-5-18 下午3:27:50
	 */
	public void insertRegInfo(List<HSSFRow> list);
	
	/**
	 * 文件解析
	 * @Title fileAnalysis
	 * @param file
	 * @author zpj
	 * @time 2017-5-18 下午4:11:28
	 */
	public void fileAnalysis(File file);
}
