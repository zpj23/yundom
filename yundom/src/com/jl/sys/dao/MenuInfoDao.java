package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.MenuInfo;

public interface MenuInfoDao {
	public MenuInfo findById(int id);
	
    public int saveMenu(MenuInfo men);
    
    public int remove(MenuInfo men);
    
    List<Map> findChildMenuByPId(Map params);
    
    List<Map> findTopJson();
    
    /**
     * 查询所有的菜单
     * @Title findAllJson
     * @return
     * @author zpj
     * @time 2016-5-3 上午10:36:11
     */
    List<Map> findAllJson();
    
    public List<Map> findMenuByIds(String menuids);
}
