package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.MenuInfo;

public interface MenuInfoService {
	/**
	 * 根据主键查询具体菜单信息
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:15:07
	 */
	public abstract MenuInfo findById(int id);
	
	
	/**
	 * 保存
	 * @Title saveMenu
	 * @param men
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:23:52
	 */
	public int saveMenu(MenuInfo men);
	
	/**
	 * 删除
	 * @Title remove
	 * @param men
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:24:01
	 */
	public int remove(MenuInfo men);
	
	/**
	 * 根据父菜单id查询子菜单
	 * @Title findJson
	 * @param params
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:30:45
	 */
	public String findJson(Map<String,String> params);
	
	/**
	 * 查询顶层菜单
	 * @Title findTopJson
	 * @return
	 * @author zpj
	 * @time 2016-4-22 下午2:30:32
	 */
	public String findTopJson();
	
	
	/**
	 * 查询带checkbox的树所有节点
	 * @Title findAllJson
	 * @return
	 * @author zpj
	 * @time 2016-5-3 上午9:53:17
	 */
	public String findAllJson(String checkids);
	
	/**
	 * 根据menuid获取对应的菜单
	 * @Title findMenuByIds
	 * @param menuids
	 * @return
	 * @author zpj
	 * @time 2016-5-11 下午3:27:28
	 */
	public List<Map> findMenuByIds(String menuids);
}
