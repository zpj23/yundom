package com.jl.common;

import java.io.Serializable;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.List;



public class BaseService<T extends Serializable> {
	@Target({ElementType.METHOD,ElementType.TYPE})  
	@Retention(RetentionPolicy.RUNTIME)
	public @interface MethodLog2 {  
	    String remark() default "";  
	    
	    String type() default "";
	}
	protected BaseDao<T> baseDao;
	
	public void save(T t) throws Exception{
		baseDao.save(t);
	}
	public void update(T t) throws Exception{
		baseDao.update(t);
	}
	public void delete(T t) throws Exception{
		baseDao.delete(t);
	}
	public T get(Serializable id) throws Exception{
		return baseDao.get(id);
	}
	public List<T> findAll() throws Exception{
		return baseDao.findAll();
	}
	public List<T> findByExample(T t) throws Exception{
		return baseDao.findByExample(t);
	}
	public BaseDao<T> getBaseDao() {
		return baseDao;
	}
	public void setBaseDao(BaseDao<T> baseDao) {
		this.baseDao = baseDao;
	}
}
