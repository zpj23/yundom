package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.SalaryInfo;
import com.jl.sys.pojo.UserInfo;

public interface SalaryService {
	
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public void importExcel(List list,String table,UserInfo user );
	
	/**
	 * 根据主键查询对象
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2019年1月22日 下午1:42:20
	 */
	public SalaryInfo findById(String id);
	
	public void saveInfo(SalaryInfo sInfo);
	
	public void delInfo(String id);
}
