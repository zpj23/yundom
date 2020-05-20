package com.jl.sys.dao.impl;

import java.util.List;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.ResourceHibernate;
import com.jl.sys.pojo.SysResourceType;


@Repository
public class ResourceHibernateDao extends BaseDao<SysResourceType> implements ResourceHibernate{

	@Autowired
	private SessionFactory sessionFactory;

	public SessionFactory getSessionFactory() {
		return sessionFactory;
	}
	public void setSessionFactory(SessionFactory sessionFactory) {
		this.sessionFactory = sessionFactory;
	}
	/************************************************************************/
	
	
	/**
	 * 查询一级数据字典
	 */
	public List<Object []> findTypeLevelOne(String selectName,String selectCode,int parentid) {
		try {
			StringBuffer str = new StringBuffer();
			str.append("select id,type_name,type_code,parent_typeid from sys_resource_type where parent_typeid= ").append(parentid);

			if(selectName!=null&&!"".equals(selectName)){
				str.append(" and type_name = '").append(selectName.trim()).append("' ");
			}
			if(selectCode!=null&&!"".equals(selectCode)){
				str.append(" and type_code = '").append(selectCode.trim()).append("' ");
			}
			
			List<Object []> list = this.findListBySql(str.toString());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
		
	/**
	 * 依据2级code查询内容
	 * @param string
	 * @return
	 */
	public List<Object[]> findContentByCode(String code) {
		try {
			String sql = " select a.id,a.item_name from sys_resource_item a " +
			"left join sys_resource_type b on a.typeid=b.id where "+
			"  a.parent_itemid is null and b.type_code=? ";
			List<Object[]> list = this.findBySql(sql, code);
			return list;					
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	
	/**
	 * 查询所有的字典数据
	 * @return
	 */
	public List<Object []> findItemAll(){
		try {					
			String sql = " select * from (SELECT item_code,ITEM_NAME,(case when parent_itemid = typeid then f_gettypecodebyid(typeid) else " +
			" f_getitemcodebyid(PARENT_ITEMID) end) PARENT_ITEMID,id,(case when parent_itemid is null then typeid else parent_itemid end) pid,item_order num,'data' kind,typeid,isable  FROM SYS_RESOURCE_ITEM union " +
			" select type_code,type_name,f_gettypecodebyid(PARENT_TYPEID),id,id,null,'type',null,1 from SYS_RESOURCE_TYPE where PARENT_TYPEID >0 ) t order by  t.typeid,t.num";
			List<Object[]> list = this.findBySql2(sql);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	/**
	 * check code 
	 * @param typeid
	 * @param typecode
	 * @return
	 */
	public List<Object[]> checkTypeCode(String typeid, String typecode) {
		List<Object[]> list=null;
		try {
			if(typeid==null||"".equals(typeid)){
				//新增时
				String sql = " Select Id From Sys_Resource_Type Where Type_Code=?  union " +
				" select id from sys_resource_item where item_code=?";
				list = this.findBySql(sql, typecode,typecode);
			}else{
				//修改时
				String sql = " Select Id From Sys_Resource_Type Where Type_Code=? and id <> ? union  " +
				" select id from sys_resource_item where item_code=? and id <> ?";
				list = this.findBySql(sql, typecode,typeid,typecode,typeid);
			}				
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


	/**
	 * 检查是否有下级数据，有就不能删除
	 * 
	 */
	public List<Object[]> checkChildData(String id) {
		try{
			SysResourceType type = this.get(Integer.parseInt(id));
			List<Object[]> list;
			if(type.getParentTypeid()==0){
				//1级
				String sql = "select id from sys_resource_type where parent_typeid = ?";
				list = this.findBySql(sql, id);
			}else{
				//2级
				String sql = "select id from sys_resource_item where typeid = ?";
				list = this.findBySql(sql, id);
			}
			return list;
		}catch (Exception e) {
			return null;
		}
	}
	
	
	 /**
     * 查询节点下的配置信息
     * @return
     */
	public List<Object[]> findNodeUsers() {
		String sql = "select nodeid ,choosetype,userids,roleids,orgids from workflow_nodeusers";
		return  this.findBySql2(sql);
	}
	public SysResourceType getEntity(int id) {
		return get2(id);
	}
	
	
	public void saveOrUpdateResource(SysResourceType restype){
		saveOrUpdate(restype);
	}
	
	public void deleteData(String id){
		String sql = "delete from sys_resource_type where id = "+id;
		executeUpdateOrDelete(sql);
	}
		
	public List<SysResourceType> findResourceLvOne(String pid) {
		String hql = " from SysResourceType";
		List<SysResourceType> list = this.find(hql, null);
		return list;
	}
	
	public List<SysResourceType> findResourceType() {
		String hql = " from SysResourceType";
		List<SysResourceType> list = this.find(hql, null);
		return list;
	}
	
	public List<Object[]> findItemByParentid(String id) {
		String hql =" from SysResourceItem where parentItemid = ?";
		return this.findByHql(hql, Integer.parseInt(id));
	}
	
	public void delItem(String id) {
		String sql = "delete from sys_resource_item where id ="+id;
		this.executeUpdateOrDelete(sql);		
	}
	
	
	public List<Object[]> findSomeUser(String rolecode,String orgcode) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select a.id,a.username from sys_userinfo a ")
		.append(" inner join sys_userrole b on a.id=b.userid  ")
		.append(" inner join sys_role c on b.roleid = c.id ")
		.append(" inner join sys_organization d on a.main_orgid=d.id ")
		.append(" where ',").append(rolecode).append(",' like  concat('%,',c.rolecode,',%') ");
		if(orgcode!=null){
			sql.append(" and d.item_code = '").append(orgcode).append("' ");	
		}			
		return this.findBySql2(sql.toString());
	}
	
	
}
