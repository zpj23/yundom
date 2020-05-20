package com.jl.sys.dao;

import java.io.Serializable;
import java.util.List;

import com.jl.sys.pojo.SysUploadfile;


public interface UploadfileHibernate  {

	//public List<Object[]> findCurFiles(String tableuuid);
	
	public List<SysUploadfile> getFiles(SysUploadfile queryModal);

	public List<Object[]> findUserinfoList(String filename, String modelname,
			Integer page, Integer rows);

	public Long findCountNumber(String filename, String modelname);

	public void save(SysUploadfile fi);

	public SysUploadfile getEntity(Integer id);

	public void delete(SysUploadfile uf);
	
	public List<SysUploadfile> findByHql(String hql,String condition);
}
