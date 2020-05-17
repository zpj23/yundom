package com.jl.material.service;

import java.util.Map;

import com.jl.material.pojo.Supplier;
import com.jl.sys.pojo.UserInfo;

public interface SupplierService {
	
	
	/**
	 * 保存供应商信息
	 * @Title save
	 * @param supper
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午1:45:23
	 */
	public int save(Supplier supper);
	
	
	/**
	 * 供应商列表加载
	 * @Title findList
	 * @param user
	 * @param page
	 * @param rows
	 * @param param
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午2:21:04
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	/**
	 * 根据id查询供应商
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午2:34:21
	 */
	public Supplier findById(int id);
	
	/**
	 * 删除供应商
	 * @Title delSupplier
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-8 下午2:58:24
	 */
	public int delSupplier(int id);

}
