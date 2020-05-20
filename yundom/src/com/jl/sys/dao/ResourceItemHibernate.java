package com.jl.sys.dao;

import java.util.List;

import com.jl.sys.pojo.SysResourceItem;


public interface ResourceItemHibernate {

	//保存
	public int saveItem(SysResourceItem item);
	
	//依据2级字典id查询下面的数据
	public List<Object []>  findResourceitemByparentid(int id);
	
	//查询具体的数据字典项
	public List<Object []>  findItemsByTypeid(String id);

	public SysResourceItem getEntity(int id);

	public void update(SysResourceItem item);

	public void deleteData(int id);
	
	public List<SysResourceItem> findResourceItem(String typeid);

	public void saveOrUpdateResource(SysResourceItem resitem);
}
