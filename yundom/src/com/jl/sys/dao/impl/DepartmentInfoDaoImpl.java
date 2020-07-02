package com.jl.sys.dao.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.jl.common.BaseDao;
import com.jl.sys.dao.DepartmentInfoDao;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.util.PingyinTool;

@Repository
public class DepartmentInfoDaoImpl extends BaseDao<DepartmentInfo> implements DepartmentInfoDao{
	@Override
	public List findList(UserInfo user,int page,int rows,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_department_info a where 1=1  ");
		
		if(null!=param.get("name")&&!"".equalsIgnoreCase(param.get("name").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("name")+"%' or parentname like'%"+param.get("username")+"%'  ");
		}
		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	
	@Override
	public int findCount(UserInfo user,Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select count(id) from jl_department_info where 1=1  ");
		if(null!=param.get("name")&&!"".equalsIgnoreCase(param.get("name").toString())){
			sql.append(" and ( name like ").append("'%"+param.get("name")+"%' or parentname like'%"+param.get("username")+"%'  ");
		}
		int count=this.findListCountBySql(sql.toString(), null);
		return count;
		
	}
	
	public DepartmentInfo findById(int id){
		DepartmentInfo d=get(id);
		if(d!=null){
			return d;
		}else{
			return new DepartmentInfo();
		}
	}
	
	public int saveDepartment(DepartmentInfo dep){
		try{
			int id=dep.getId();
			
			if(id!=0){//编辑
				this.merge(dep, String.valueOf(id));
			}else{//新增
//				StringBuffer sql=new StringBuffer();
//				sql.append("select * from (select substring(code,3,LENGTH(CODE)) as n ,code,name from jl_department_info ) t1 ORDER BY CAST(n as SIGNED) DESC ");
//				List<Object[]> list=this.findBySql2(sql.toString());
//				if(list.size()>0){
//					String str=(String)list.get(0)[0];
//					int m=Integer.parseInt(str);
//					dep.setCode("bm"+(m+1));
//				}
				//编码改成部门文字首字母，编辑时不改变
				dep.setCode(PingyinTool.cn2FirstSpell(dep.getName()));
				this.save(dep);
			}
			return 1;
		}catch (Exception e) {
			return 0;
		}
	}
	
	public List findTopDepartList(){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_department_info a where  parent_code =''  ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
	public List findDepartListByPId(Map<String,String> param){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_department_info a where  parent_code ='"+(String)param.get("code")+"'  ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
	public List<Map> findDepartListByPCode(String code){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_department_info a where  parent_code ='"+code+"'  ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
	
	
	public List<DepartmentInfo> findAllDepartList(Map<String,String> param){
//		StringBuffer sql = new StringBuffer();
//		sql.append(" select * from jl_department_info a where 1=1  ");
//		
//		if(null!=param.get("name")&&!"".equalsIgnoreCase(param.get("name").toString())){
//			sql.append(" and ( name like ").append("'%"+param.get("name")+"%' or parentname like'%"+param.get("username")+"%'  ");
//		}
		List<DepartmentInfo> list=this.findAll();
//		List list=this.findMapObjBySql(sql.toString(), null, page, rows);
		return list;
	}
	public int remove(DepartmentInfo t){
		this.delete(t);
		return 1;
	}
	
	public DepartmentInfo findDeptByDeptCode(String code){
		List<Object[]> list=this.findListBySql("select id,code,name from jl_department_info a where code='"+code+"'");
		DepartmentInfo di =new DepartmentInfo(); 
		if(list.size()>0){
			int id=Integer.parseInt(list.get(0)[0].toString());
			di=this.get(id);
		}
		return di;
	}
	
	public List<Map> findAllJson(){
		StringBuffer sql = new StringBuffer();
		sql.append(" select * from jl_department_info a where  parent_code <>''  ");
		List list=this.findMapObjBySql(sql.toString(), null, 1, 100);
		return list;
	}
}
