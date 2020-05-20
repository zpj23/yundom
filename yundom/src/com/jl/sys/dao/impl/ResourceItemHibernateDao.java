package com.jl.sys.dao.impl;

import java.io.Serializable;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.ResourceItemHibernate;
import com.jl.sys.pojo.SysResourceItem;


@Repository
public class ResourceItemHibernateDao  extends BaseDao<SysResourceItem> implements ResourceItemHibernate{

	@Autowired
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}


	public int saveItem(SysResourceItem item) {
		Session session =null;
		try {
			session=sessionFactory.getCurrentSession();
			Serializable id = session.save(item);
			return (Integer) id;
		} catch (Exception e) {
			e.printStackTrace();			
		}
		return 0;		
	}


	/**
	 * 依据2级字典id查询下面的数据
	 * @param id
	 * @return
	 */
	public List<Object []>  findResourceitemByparentid(int id){
		String hql = " from SysResourceItem where parentItemid=?";
		List<Object[]> list;
		try {
			list = this.findByHql(hql, id);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}


	public List<Object []>  findItemsByTypeid(String id){
		String sql ="select distinct a.id,a.item_code,a.item_name,(case when a.parent_itemid is null then a.typeid else a.parent_itemid end) parent_itemid,"+
		"(case when a.parent_itemid is null then c.type_code else b.item_code end) from sys_resource_item a ,"+
		"sys_resource_item b,sys_resource_type c where (b.id = a.parent_itemid  or a.typeid = c.id) and a.id = ?";
		List<Object[]> list =  this.findBySql(sql, id);
		return list;
	}
	public SysResourceItem getEntity(int id) {
		return get(id);
	}
	
	public void deleteData(int id){
		String sql = "delete from sys_resource_item where id ="+id;
		executeUpdateOrDelete(sql);
	}
	
	public List<SysResourceItem> findResourceItem(String typeid) {
		String hql = " from SysResourceItem where (parentItemid=?)";
		List<SysResourceItem> list = this.find(hql, Integer.parseInt(typeid));
		return list;
	}
	
	public void saveOrUpdateResource(SysResourceItem resitem) {
		saveOrUpdate(resitem);
	}
}
