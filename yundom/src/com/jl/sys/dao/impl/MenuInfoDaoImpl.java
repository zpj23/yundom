package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.MenuInfoDao;
import com.jl.sys.pojo.MenuInfo;

@Repository
public class MenuInfoDaoImpl extends BaseDao<MenuInfo> implements MenuInfoDao{

	@Override
	public MenuInfo findById(int id) {
		return this.get(id);
	}

	@Override
	public int saveMenu(MenuInfo men) {
		try{
			int id=men.getId();
			MenuInfo mi=this.get(id);
			if(mi!=null){
				this.merge(men, String.valueOf(id));
			}else{
				this.save(men);
			}
		}catch (Exception e) {
			return 0;
		}
		return 1;
	}

	@Override
	public int remove(MenuInfo men) {
		try{
			
			this.delete(men);
		}catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
		return 1;
	}

	@Override
	public List<Map> findChildMenuByPId(Map params) {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_menu_info a where  parentid ='"+params.get("id")+"' order by menuorder asc   ");
		List<Map> list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}

	@Override
	public List<Map> findTopJson() {
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_menu_info a where  parentid =0 order by menuorder asc   ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}

	public List<Map> findAllJson(){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_menu_info a where parentid<>0  order by menuorder asc   ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
	
	public List<Map> findMenuByIds(String menuids){
		StringBuffer sql = new StringBuffer(500);
		sql.append("select * from jl_menu_info where id in ("+menuids+") order by menuorder asc ");
		return findMapObjBySql(sql.toString(), null, 1, 100);
	}
}
