package com.jl.common;

import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.SQLFeatureNotSupportedException;
import java.util.logging.Logger;

import javax.sql.DataSource;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;


/**
 * @Description: TODO(这里用一句话描述这个类的作用)
 * @author Lee 
 * @date 2014-2-12 上午10:07:36
 */
public class MultiDataSource implements DataSource,ApplicationContextAware {

	private static final Log log = LogFactory.getLog(MultiDataSource.class);
	private ApplicationContext applicationContext = null;
	private DataSource dataSource = null;
	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getConnection()
	 */
	@Override
	public Connection getConnection() throws SQLException {
		return getDataSource().getConnection();
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getConnection(java.lang.String, java.lang.String)
	 */
	@Override
	public Connection getConnection(String arg0, String arg1)
			throws SQLException {
		return getDataSource().getConnection(arg0, arg1);
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getLogWriter()
	 */
	@Override
	public PrintWriter getLogWriter() throws SQLException {
		return getDataSource().getLogWriter();
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#getLoginTimeout()
	 */
	@Override
	public int getLoginTimeout() throws SQLException {
		return getDataSource().getLoginTimeout();
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#setLogWriter(java.io.PrintWriter)
	 */
	@Override
	public void setLogWriter(PrintWriter arg0) throws SQLException {
		getDataSource().setLogWriter(arg0);
	}

	/* (non-Javadoc)
	 * @see javax.sql.DataSource#setLoginTimeout(int)
	 */
	@Override
	public void setLoginTimeout(int arg0) throws SQLException {
		getDataSource().setLoginTimeout(arg0);
	}

	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		this.applicationContext = applicationContext;
	}
	
	public DataSource getDataSource(String dataSourceName){
		//log.debug("dataSourceName:"+dataSourceName);
		try{
			if(dataSourceName==null||dataSourceName.equals("")){
				return this.dataSource;
			}
			return (DataSource)this.applicationContext.getBean(dataSourceName);
		}catch(NoSuchBeanDefinitionException ex){
			ex.printStackTrace();
			return null;
		}
	}
	
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}

	public DataSource getDataSource(){
		String sp = SpObserver.getSp();
		return getDataSource(sp);
	}

	public <T> T unwrap(Class<T> iface) throws SQLException {
		return null;
	}

	public boolean isWrapperFor(Class<?> iface) throws SQLException {
		return false;
	}

	public Logger getParentLogger() throws SQLFeatureNotSupportedException {
		// TODO Auto-generated method stub
		return null;
	}
}
