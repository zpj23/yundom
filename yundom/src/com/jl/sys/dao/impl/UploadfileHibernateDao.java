package com.jl.sys.dao.impl;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.UploadfileHibernate;
import com.jl.sys.pojo.SysUploadfile;


@Repository
public class UploadfileHibernateDao extends  BaseDao<SysUploadfile> implements UploadfileHibernate{

	
	@Override
	public List<SysUploadfile> getFiles(SysUploadfile queryModal) {
		List<String> conditions = new ArrayList<String>();
		StringBuffer hql = new StringBuffer(100); hql.append(" from SysUploadfile where 1=1 ");
		if(queryModal.getModuleName()!=null && !queryModal.getModuleName().isEmpty()){
			hql.append(" and moduleName = '"+queryModal.getModuleName()+"' ");
		}
		if(queryModal.getTableUuid()!=null && !queryModal.getTableUuid().isEmpty()){
			hql.append( " and tableUuid = '"+queryModal.getTableUuid()+"'");
		}
		return this.find(hql.toString(), null);
	}

	/**
	 * 附件分页信息
	 */
	@Override
	public List<Object[]> findUserinfoList(String filename, String modelname,
			Integer page, Integer rows) {
		String sql = " select id,originalName,moduleName,uploadTime,fileType from SysUploadfile where 1=1 ";
		if(filename!=null&&!"".equals(filename)){
			sql+=" and originalName like '%"+filename+"%' ";
		}
		if(modelname!=null&&!"".equals(modelname)){
			sql+=" and moduleName ='"+modelname+"'  ";
		}	
		sql+=" order by uploadTime desc  ";
		return this.findListToPageByHql(sql, null, page, rows);
	}


	/**
	 * 附件总条数
	 */
	@Override
	public Long findCountNumber(String filename, String modelname) {
//		String hql = " select count(id) from SysUploadfile where 1=1 ";
//		if(filename!=null&&!"".equals(filename)){
//			hql+=" and originalName like '%"+filename+"%' ";
//		}
//		if(modelname!=null&&!"".equals(modelname)){
//			hql+=" and moduleName ='"+modelname+"'  ";
//		}	
		return null;
	}

	@Override
	public SysUploadfile getEntity(Integer id) {
		return this.get2(id);
	}
	public List<SysUploadfile> findByHql(String hql,String condition){
		return this.find(hql.toString(), null);
	}



	
	
}
