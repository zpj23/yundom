package com.jl.common;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.Id;
import javax.servlet.http.HttpServletRequest;

import org.hibernate.Criteria;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.Example;
import org.hibernate.transform.Transformers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import com.jl.util.MyPage;




/**
 * 基于hibernate的BaseDao
 * Spring3对Hibernate4已经没有了HibernateDaoSupport和HibernateTemplate的支持，使用了原生态的API
 * 
 *
 * @param <T>
 */
public class BaseDao<T extends Serializable>{
	@Autowired
	public SessionFactory sessionFactory;
	//当前泛型类
	@SuppressWarnings("rawtypes")
	private Class entityClass;
	//当前主键名称
	private String pkname;
	private final String HQL_LIST_ALL;
	private final String HQL_COUNT_ALL;
	@SuppressWarnings("rawtypes")
	public Class getEntityClass() {
		return entityClass;
	}
	@SuppressWarnings("rawtypes")
	public void setEntityClass(Class entityClass) {
		this.entityClass = entityClass;
	}

	@SuppressWarnings("rawtypes")
	public BaseDao() {
		//获取当前泛型类
		Type type = this.getClass().getGenericSuperclass();
		if (type.toString().indexOf("BaseDao") != -1) {
			ParameterizedType type1 = (ParameterizedType) type;
			Type[] types = type1.getActualTypeArguments();
			setEntityClass((Class) types[0]);
		}else{
			type = ((Class)type).getGenericSuperclass();
			ParameterizedType type1 = (ParameterizedType) type;
			Type[] types = type1.getActualTypeArguments();
			setEntityClass((Class) types[0]);
		}
		getPkname();
		HQL_LIST_ALL="from "+this.entityClass.getSimpleName()+" order by "+pkname+" desc";
		HQL_COUNT_ALL="select count(*) from "+this.entityClass.getSimpleName();
	}


	/**
	 * 获取主键名称
	 * @return
	 */
	public String getPkname() {
		Field[] fields = this.entityClass.getDeclaredFields();//反射类字段
		for (Field field : fields) {
			field.isAnnotationPresent(Id.class);
			this.pkname=field.getName();
			break;
		}
		return pkname;
	}


	/**
	 * 保存实例
	 * 
	 * @param t
	 * @throws HibernateException
	 */
	public void save(T t) throws HibernateException{
		Session session=null;
		/*try {
			session=sessionFactory.openSession();
			session.beginTransaction();
			session.save(t);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}finally{
			session.close();
		}*/
		try {
			session=sessionFactory.getCurrentSession();  
			session.save(t);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}

	}


	/**
	 * 保存/编辑
	 * @param t
	 * @throws HibernateException
	 */
	public void saveOrUpdate(T t) throws HibernateException{
		Session session=null;		
		try {
			session=sessionFactory.getCurrentSession(); 
			session.saveOrUpdate(t);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}

	}


	/**
	 * 修改实例
	 * 
	 * @param t
	 * @throws HibernateException
	 */
	public void update(T t) throws HibernateException{
		Session session=null;
		/*try {
			session=sessionFactory.openSession();
			session.beginTransaction();
			session.update(t);
			session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}finally{
			session.close();
		}*/
		try {
			session=sessionFactory.getCurrentSession();  
			session.update(t);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}
	}


	/**
	 * 修改
	 * @param t
	 * @param id
	 * @throws HibernateException
	 */
	public void merge(T t,String id) throws HibernateException{
		Session session=null;		
		try {
			session=sessionFactory.getCurrentSession();  
			session.merge(id, t);
		} catch (Exception e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}
	}


	/**
	 * 删除实例
	 * 
	 * @param t
	 * @throws HibernateException
	 */
	public void delete(T t) throws HibernateException{
		Session session=null;
		try {
			//session=sessionFactory.openSession();
			session=sessionFactory.getCurrentSession();
			//session.beginTransaction();
			session.delete(t);
			//session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}finally{
			//session.close();
		}
	}


	/**
	 * 获取实例
	 * 
	 * @param id
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public T get(Serializable id){
		Session session=null;
		T t=null;
		try {
			session=sessionFactory.getCurrentSession();
//			session.beginTransaction();
			t=(T) session.get(getEntityClass(), id);
//			session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}finally{
//			session.close();
		}
		return t;
	}
	
	
	@SuppressWarnings("unchecked")
	public T get2(Serializable id){
		Session session=null;
		T t=null;
		try {
			session=sessionFactory.getCurrentSession();
			t=(T) session.get(getEntityClass(), id);
		} catch (HibernateException e) {
			e.printStackTrace();
			throw new HibernateException(e);
		}
		return t;
	}


	/**
	 * 查询全部
	 * 
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<T> findAll(){
		List<T> list=null;
		Session session=null;
		try {
			session = sessionFactory.getCurrentSession();
			//session.beginTransaction();
			Query query = session.createQuery(HQL_LIST_ALL);
			list = query.list();
			//session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		}finally{
//			session.close();
		}
		return list;
	}


	/**
	 * sql查询，带参数
	 * @param sql
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public List<Object []> findListBySql(String sql) {
		List<Object []> list=null;
		Session session=null;
		try {
			session = sessionFactory.getCurrentSession();			
			Query query = session.createSQLQuery(sql);
			list = query.list();			
		} catch (HibernateException e) {
			e.printStackTrace();
		}finally{
//			session.close();
		}
		return list;
	}


	/**
	 * 查询总数
	 * 
	 * @throws HibernateException
	 */
	public Integer findAllCount()  {
		Session session=null;
		Integer count=0;
		try {
			session = sessionFactory.getCurrentSession();
			session.beginTransaction();
			Query query = session.createQuery(HQL_COUNT_ALL);
			List<?> list = query.list();
			session.getTransaction().commit();
			if(list!=null&&!list.isEmpty()){
				count=((Integer) list.get(0)).intValue();
			}
		} catch (HibernateException e) {
			e.printStackTrace();
		}finally{
//			session.close();
		}
		return count;
	}


	/**
	 * QBC查询
	 * 
	 * @param criteria
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByCriteria(Criteria criteria)  {
		List<T> list=null;
		Session session=null;
		try {
			session = sessionFactory.getCurrentSession();
			session.beginTransaction();
			Criteria criteria1 = session.createCriteria(getEntityClass());
			criteria1=criteria;
			list = criteria1.list();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		}finally{
//			session.close();
		}
		return list;
	}


	/**
	 * QBE查询
	 * 
	 * @param t
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<T> findByExample(T t)  {
		List<T> list=null;
		Session session=null;
		Example example = Example.create(t);
		try {
			session = sessionFactory.getCurrentSession();
			session.beginTransaction();
			Criteria criteria = session.createCriteria(getEntityClass());
			criteria.add(example);
			list = criteria.list();
			session.getTransaction().commit();
		} catch (HibernateException e) {
			e.printStackTrace();
		}finally{
//			session.close();
		}
		return list;
	}


	/**
	 * HQL查询
	 * 
	 * @param hql
	 * @param objects
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<Object[]> findByHql(String hql,final Object...objects) {
		List<Object[]> list=null;
		Session session=null;
		try {
			session= sessionFactory.getCurrentSession();
			//session.beginTransaction();
			Query query = session.createQuery(hql);
			for (int i = 0; i < objects.length; i++) {
				query.setParameter(i, objects[i]);
			}
			list = query.list();
			//session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//session.close();
		}
		return list;
	}


	/**
	 * SQL查询
	 * 
	 * @param hql
	 * @param objects
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<Object[]> findBySql(String sql,final Object...objects){
		List<Object[]> list=null;
		Session session=null;
		try {
			session=sessionFactory.getCurrentSession();
			//session.beginTransaction();
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			for (int i = 0; i < objects.length; i++) {
				query.setParameter(i, objects[i]);
			}
			list = query.list();
			//session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//session.close();
		}
		if(list!=null&&list.size()>0){
			return list;
		}else{
			return null;
		}

	}


	/**
	 * SQL查询(不带参数)
	 * 
	 * @param hql
	 * @param objects
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<Object[]> findBySql2(String sql){
		List<Object[]> list=null;
		Session session=null;
		try {
			session=sessionFactory.getCurrentSession();			
			//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);	
			Query query = session.createSQLQuery(sql);
			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
		}
		return list;
	}


	/**
	 * HQL查询
	 * 
	 * @param hql
	 * @param objects
	 * @throws HibernateException
	 */
	@SuppressWarnings("unchecked")
	public List<Object[]> findByHql2(String hql){
		List<Object[]> list=null;
		Session session=null;
		try {
			session= sessionFactory.getCurrentSession(); 
			//session.beginTransaction();
			Query query = session.createQuery(hql);

			list = query.list();
			//session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//session.close();
		}
		return list;
	}


	/**
	 * 分页
	 * @param request
	 * @param sql
	 * @param conditions
	 * @param page
	 * @param pageSize
	 */
	public void setPageData(HttpServletRequest request, String sql,
			List<String> conditions, String page, int pageSize) {
		try {
			// 信息总条数
			String tempSql = "";
			if (sql.lastIndexOf("order") != -1) {
				tempSql = sql.substring(sql.indexOf(" from "), sql
						.lastIndexOf("order"));
			} else {
				tempSql = sql.substring(sql.indexOf(" from "));
			}
			int infoCount = this.findListCount("select count(*) " + tempSql,
					conditions);
			request.setAttribute("infoCount", infoCount);

			// 总页数
			int pageNum = 1;
			if (infoCount != 0) {
				if (infoCount % pageSize == 0) {
					pageNum = infoCount / pageSize;
				} else {
					pageNum = infoCount / pageSize + 1;
				}
			}
			request.setAttribute("pageNum", pageNum);

			// 每页信息列表
			if (page == null || page.equals("")) {
				page = "1";
			}
			List<Object[]> list = this.findListToPageByHql(sql, conditions,
					Integer.parseInt(page), pageSize);
			request.setAttribute("listData", list);

			// 传递至页面数据
			request.setAttribute("page", page);
			request.setAttribute("pageSize", pageSize);
			// 当前信息条数范围
			if (Integer.parseInt(page) == pageNum) {
				request.setAttribute("infoNum", infoCount);
			} else {
				request.setAttribute("infoNum", Integer.parseInt(page)
						* pageSize);
			}

		} catch (RuntimeException e) {
			e.printStackTrace();
		}

	}


	/**
	 * 返回记录总个数
	 * 
	 * @Desc 基于HQL语句查询
	 * @param sql
	 * @param conditions
	 * @return INT
	 */
	public int findListCount(final String sql, final List<String> conditions) {
		Session session=null;		
		session= sessionFactory.getCurrentSession(); 
		Query query = session.createQuery(sql);
		if (conditions != null && conditions.size() > 0) {
			for (int i = 0; i < conditions.size(); i++) {
				if (conditions.get(i) != null
						&& !conditions.get(i).equals("")) {
					query.setString(i, conditions.get(i));
				}
			}
		}
		List list =   query.list();
		if (list != null && list.size() > 0) {
			return Integer.parseInt(list.get(0).toString());
		} else {
			return 0;
		}
	}


	/**
	 * 分页查询,可带条件、页码
	 * 
	 * @Desc 基于HQL语句查询
	 * @param sql
	 * @param conditions
	 * @param page
	 * @param pageSize
	 * @return List<Object[]>
	 */
	public List<Object[]> findListToPageByHql(final String sql,
			final List<String> conditions, final int page, final int pageSize) {
		Session session=null;			
		session= sessionFactory.getCurrentSession();
		Query query = session.createQuery(sql);
		if (conditions != null && conditions.size() > 0) {
			for (int i = 0; i < conditions.size(); i++) {
				if (conditions.get(i) != null
						&& !conditions.get(i).equals("")) {
					query.setString(i, conditions.get(i));
				}
			}
		}
		query.setFirstResult((page - 1) * pageSize);
		query.setMaxResults(pageSize);
		List list= query.list();
		return list;
	}


	/**
	 * 很据SQL语句执行修改或删除
	 * 
	 * @param sql
	 * @return INT 执行SQL语句影响的行数
	 */
	public int executeUpdateOrDelete(String sql) {
		try {
			// return jdbcTemplate.update(sql);			
			Session session = sessionFactory.getCurrentSession();
			session.createSQLQuery(sql).executeUpdate();
			return 0;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return 1;
		}
	}


	/**
	 * 很据SQL语句执行查询并分页
	 * 
	 * @param sql
	 * @return INT 执行SQL语句影响的行数
	 */
	public List<Object[]> executeQueryFroList(HttpServletRequest request,
			String sql, int fieldCount, int page, int pageSize) {
		try {
			List<Map<String, Object>> listMap = jdbcTemplate.queryForList(sql);
			// 总个数
			int infoCount = 0;
			// 总页数
			int pageNum = 0;

			if (listMap != null && listMap.size() > 0) {
				infoCount = listMap.size();
				if (page != 0) {
					if (page * pageSize > listMap.size()) {
						listMap = listMap.subList((page - 1) * pageSize,
								listMap.size());
					} else {
						listMap = listMap.subList((page - 1) * pageSize, page
								* pageSize);
					}
				}

				List<Object[]> list = new ArrayList<Object[]>();
				for (int i = 0; i < listMap.size(); i++) {
					Map<String, Object> m = listMap.get(i);
					Object[] obj = new Object[fieldCount];
					for (int j = 0; j < fieldCount; j++) {
						obj[j]=m.get("c"+(j+1));		   
					}
					list.add(obj);
				}

				if (infoCount != 0) {
					if (infoCount % pageSize == 0) {
						pageNum = infoCount / pageSize;
					} else {
						pageNum = infoCount / pageSize + 1;
					}
				}
				// 当前信息条数范围
				if (page == pageNum) {
					request.setAttribute("infoNum", infoCount);
				} else {
					request.setAttribute("infoNum", page * pageSize);
				}
				request.setAttribute("page", page);
				request.setAttribute("pageSize", pageSize);
				request.setAttribute("pageNum", pageNum);
				request.setAttribute("infoCount", infoCount);

				return list;
			}
			request.setAttribute("page", page);
			request.setAttribute("pageSize", pageSize);
			request.setAttribute("pageNum", pageNum);
			request.setAttribute("infoCount", infoCount);
			return null;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	

    /**
     * jdbcTemplate的执行sql
     * @param sql
     */
	public void executeSql(String sql) {
		try {    		
			// jdbcTemplate.execute(sql);
			Session session = sessionFactory.getCurrentSession();
			session.createSQLQuery(sql).executeUpdate();
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
	}
	

    /**
     * 新增数据，插入的数据存在于map
     * @param sql
     * @param map
     */
	/*public void executeSqlArgs(String sql,Map map) {
		try {    		
			int i =namedParameterJdbcTemplate.update(sql,map);
		} catch (RuntimeException e) {
			e.printStackTrace();
		}
	}*/


	@Resource
	private JdbcTemplate jdbcTemplate;
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}
	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
	/*@Resource
	private  NamedParameterJdbcTemplate namedParameterJdbcTemplate;

	public NamedParameterJdbcTemplate getNamedParameterJdbcTemplate() {
		return namedParameterJdbcTemplate;
	}
	public void setNamedParameterJdbcTemplate(
			NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
		this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
	}*/
	
	
	
	public List<T> findData(String hql, int page, int rows, Object... param) {
		Query q = sessionFactory.getCurrentSession().createQuery(hql);
		/*if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				q.setParameter(i, param[i]);
			}
		}*/
		return q.setFirstResult((page - 1) * rows).setMaxResults(rows).list();
	}
	
	
	public Long countData(String hql, List<Object> param) {
		Query q = sessionFactory.getCurrentSession().createQuery(hql);
		if (param != null && param.size() > 0) {
			for (int i = 0; i < param.size(); i++) {
				q.setParameter(i, param.get(i));
			}
		}
		return (Long) q.uniqueResult();
	}
	
	
	public List<T> find(String hql, Object... param) {
		Query q = sessionFactory.getCurrentSession().createQuery(hql);
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				q.setParameter(i, param[i]);
			}
		}
		return q.list();
	}
		
	public void updateordelete(String hql, Object... param) {
		Query q = sessionFactory.getCurrentSession().createQuery(hql);
		if (param != null && param.length > 0) {
			for (int i = 0; i < param.length; i++) {
				q.setParameter(i, param[i]);
			}
		}
		q.executeUpdate();
	}
	
	
	
	/**
	 * 很据SQL语句执行查询并分页
	 * 
	 * @param sql
	 * @return INT 执行SQL语句影响的行数
	 */
	public List<Object[]> executeQueryFroList2(
			String sql, int fieldCount, int page, int pageSize) {
		try {			
			//Query query = sessionFactory.getCurrentSession().createSQLQuery(sql);
			List<Map<String, Object>> listMap = jdbcTemplate.queryForList(sql);
			// 总个数
			int infoCount = 0;
			// 总页数
			int pageNum = 0;

			if (listMap != null && listMap.size() > 0) {
				infoCount = listMap.size();
				if (page != 0) {
					if (page * pageSize > listMap.size()) {
						listMap = listMap.subList((page - 1) * pageSize,
								listMap.size());
					} else {
						listMap = listMap.subList((page - 1) * pageSize, page
								* pageSize);
					}
				}

				List<Object[]> list = new ArrayList<Object[]>();
				for (int i = 0; i < listMap.size(); i++) {
					Map<String, Object> m = listMap.get(i);
					Object[] obj = new Object[fieldCount];
					for (int j = 0; j < fieldCount; j++) {
						obj[j]=m.get("c"+(j+1));		   
					}
					list.add(obj);
				}

				return list;
			}
			
			return null;
		} catch (RuntimeException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	public int findListCountBySql(final String sql, final List<String> conditions) {
		Session session=null;		
		session= sessionFactory.getCurrentSession(); 
		Query query = session.createSQLQuery(sql);
		if (conditions != null && conditions.size() > 0) {
			for (int i = 0; i < conditions.size(); i++) {
				if (conditions.get(i) != null
						&& !conditions.get(i).equals("")) {
					query.setString(i, conditions.get(i));
				}
			}
		}
		List list =   query.list();
		if (list != null && list.size() > 0) {
			return Integer.parseInt(list.get(0).toString());
		} else {
			return 0;
		}
	}
	
	/**
	 * 返回对象 
	 * @Title findMapObjBySql
	 * @param sql
	 * @param conditions
	 * @param page
	 * @param pageSize
	 * @return
	 * @author zpj
	 * @time 2016-1-22 下午3:34:45
	 */
	public List findMapObjBySql(final String sql, final List<String> conditions, final int page, final int pageSize){
		
		List list=null;
		Session session=null;
		try {
			session= sessionFactory.getCurrentSession();
			Query query=session.createSQLQuery(sql);
			if (conditions != null && conditions.size() > 0) {
				for (int i = 0; i < conditions.size(); i++) {
					if (conditions.get(i) != null && !conditions.get(i).equals("")) {
						query.setString(i, conditions.get(i));
					}
				}
			}
			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			query.setFirstResult((page - 1) * pageSize);
			query.setMaxResults(pageSize);
			list = query.list();
			//session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//session.close();
		}
		return list;
	}
	
public List findMapObjBySql(final String sql){
		
		List list=null;
		Session session=null;
		try {
			session= sessionFactory.getCurrentSession();
			Query query=session.createSQLQuery(sql);
			query.setResultTransformer(Transformers.ALIAS_TO_ENTITY_MAP);
			list = query.list();
			//session.getTransaction().commit();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
			//session.close();
		}
		return list;
	}
	
	/**
	 * 返回对象list
	 * @Title findObjectByHql
	 * @param hql
	 * @return
	 * @author zpj
	 * @time 2016-3-31 下午3:25:42
	 */
	public List<T> findObjectByHql(final String hql){
		List<T> list=null;
		Session session=null;
		try {
			session= sessionFactory.getCurrentSession();
			Query query = session.createQuery(hql);
//			for (int i = 0; i < objects.length; i++) {
//				query.setParameter(i, objects[i]);
//			}
			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		}finally{
		}
		return list;
	}
	public List<T> findBySqlT(String sql, Class<T> t) {
		List<T> list = null;
		Session session = null;
		try {
			session = sessionFactory.getCurrentSession();
			Query query = sessionFactory.getCurrentSession().createSQLQuery(sql).addEntity(t);
			list = query.list();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
		}
		if (list != null && list.size() > 0) {
			return list;
		} else {
			return null;
		}
	}	
	
	
	/**
	 * 单表查询分页
	 * @Title findPageDateSqlT
	 * @param tablename 表名
	 * @param columns  需要查询的字段名，多个用逗号分割
	 * @param conditions   条件
	 * @param px
	 * @param page
	 * @param pagesize
	 * @param t
	 * @return
	 * @author zpj
	 * @time 2018年3月7日 下午1:09:43
	 */

	public MyPage findPageDateSqlT(String tablename, String columns,Map<String, Object> conditions, Map<String, Object> px,
			Integer page, Integer pagesize, Class<T> t) {
		StringBuffer sql = new StringBuffer(500);
		sql.append("select ");
		if(null!=columns&&!columns.equalsIgnoreCase("")){
			String[] cols=columns.split(",");
			for(int n=0;n<cols.length;n++){
				if(n>0){
					sql.append(",");
				}
				sql.append(cols[n]);
			}
		}else{
			sql.append(" * ");
		}
		
		sql.append(" from ").append(tablename).append(" where 1=1 ");
		String key;
		String value;
		if (conditions != null) {
			for (Map.Entry<String, Object> entry : conditions.entrySet()) {
				key = entry.getKey().toString();
				if (entry.getValue() != null && !"".equals(entry.getValue().toString())) {
					value = entry.getValue().toString();
					if (key.endsWith("-eq")) {
						sql.append(" and ").append(key.replace("-eq", "")).append(" = '").append(value).append("' ");
					} else if (key.endsWith("-like")) {
						sql.append(" and ").append(key.replace("-like", "")).append(" like '%").append(value)
								.append("%' ");
					} else if (key.endsWith("-begin")) {
						sql.append(" and ").append(key.replace("-begin", "")).append(" > '").append(value).append("' ");
					} else if (key.endsWith("-end")) {
						sql.append(" and ").append(key.replace("-end", "")).append(" < '").append(value).append("' ");
					}else if(key.endsWith("-or")){
						//或者的值，用大写OR拼成一个字符串，这边会进行分割
						String[] valus=  value.split("OR");
						String tempkey=key.replace("-or", "");
						sql.append(" and ( ");
						for(int m=0;m<valus.length;m++){
							if(m>0){
								sql.append(" or ");
							}
							if(valus[m].equalsIgnoreCase("null")){
								sql.append(tempkey).append(" is null ");
							}else{
								sql.append(tempkey).append(" = '").append(valus[m]).append("' ");
							}
						}
						sql.append(" ) "); 
					}else if(key.endsWith("-self")){
						//自定义的条件， 单条件传入
						sql.append(" and "+value);						
					}else{
						sql.append(" and ").append(key).append(" = '").append(value).append("' ");
					}
				}
			}
		}
		// 查询出所有符合条件的数量值
		int num = 0;
		String sqlcount = sql.toString().replace("*", " count(*) as num ,1 ");
		List<Object[]> lt = findBySql(sqlcount);
		if (lt != null) {
			num=Integer.parseInt(((BigInteger) lt.get(0)[0]).toString());
		}
		int s=px.size();
		// 结果集
		if(s>0){
			sql.append(" order by ");
			int jsq=0;
			for (Map.Entry<String, Object> entry : px.entrySet()) {
				if(jsq>0){
					sql.append(",");
				}
				sql.append(entry.getKey().toString()).append(" ").append(value = entry.getValue().toString()).append(" ");
				jsq++;
			}
		}
		
//		sql.append("  offset " + (page - 1) * pagesize + " rows fetch next " + pagesize + " rows only");
		sql.append("  limit " + (page - 1) * pagesize + " , " + pagesize + " ");
		List<T> list = findBySqlT(sql.toString(), t);
		if(null==list||list.size()==0){
			list=new ArrayList();
		}
		return new MyPage(list, num);
	}
}
