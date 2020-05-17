package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService;
import com.jl.common.MD5;
import com.jl.sys.dao.UserInfoDao;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.RoleInfoService;
import com.jl.sys.service.UserInfoService;

@Service
@Component("jlUserInfoService")
public class UserInfoServiceImpl extends BaseService<UserInfo> implements UserInfoService{
	@Autowired
	private UserInfoDao jlUserInfoDao;
	
	@Autowired
	private RoleInfoService jlRoleInfoService;
	
	public UserInfo findLogin(UserInfo user,boolean flag) {		
		try {
//			if(user.getLoginname().equalsIgnoreCase("admin")){
//				return jlUserInfoDao.findById(1);
//			}
			List<Object[]> list = jlUserInfoDao.findLogin(user.getLoginname().trim(),user.getPassword(),flag);
			if(list!=null&&list.size()>0){
				int id=Integer.parseInt(list.get(0)[0].toString());
				UserInfo ui=jlUserInfoDao.findById(id);
				if(ui.getIsdel()==0){//判断是否启用0默认启用，否则停用，不让登陆
					return ui;
				}else{
					return null;
				}
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
//	@MethodLog2(remark="查询用户列表",type="查询")
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=jlUserInfoDao.findList(user,page,rows,param);
		int count=jlUserInfoDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	@MethodLog2(remark="保存用户信息",type="新增/编辑")
	public int saveUser(UserInfo ui){
		return jlUserInfoDao.saveUser(ui);
	}
//	@MethodLog2(remark="保存当前登陆时间和IP信息",type="编辑")
	public int baocunUserCurrentInfo(UserInfo user){
		return jlUserInfoDao.saveUser(user);
	}
	
	@MethodLog2(remark="修改用户密码",type="编辑")
	public void saveUserPw(UserInfo user){
		jlUserInfoDao.saveUserPw(user);
	}
	@MethodLog2(remark="删除用户信息",type="删除")
	public void delUser(int id){
		try{
			jlUserInfoDao.delUser(id);
			//删除用户的同时删除对应用户角色关联表信息
			jlRoleInfoService.deleteRoleUserByUserid(String.valueOf(id));
		}catch (Exception e) {
			e.printStackTrace();
			throw new RuntimeException();
		}
	}
	
	@Override
	public UserInfo findById(int id){
		return jlUserInfoDao.findById(id);
	}
	
	public List<Map> findUserByDepCode(String code){
		return jlUserInfoDao.findUserByDepCode(code);
	}
	@MethodLog2(remark="批量导入用户信息",type="新增")
	public void importExcel(List list,String table,UserInfo user ){
		StringBuffer insertsql = new StringBuffer(1000);
		StringBuffer sql=new StringBuffer(1000);
		StringBuffer cols = new StringBuffer();
		Map<String, String> columnmap = (Map<String, String>) list.get(0);
		String dictionary="sex";
		String[] dictionaryColoumn=dictionary.split(",");
		//获取字段名称
		String colname="";
		for(int v=0;v<columnmap.size();v++){
			colname = columnmap.get(String.valueOf(v));
			cols.append(colname.split("\\*")[1]).append(",");
		}
		cols.append("createtime,createuserid,updatetime,updateuserid,isdel");
		//获取列名，比较列名去转换字典值
		String[] arr_name=cols.toString().split(",");
		//获取登陆名方便密码加密
		int loginIndex=0;
		for(int x=0;x<=arr_name.length;x++){
			if(arr_name[x].equalsIgnoreCase("loginname")){
				loginIndex=x;
				break;
			}
		}
		insertsql.append(" insert into "+table+" (").append(cols.toString()).append(") values ");
		for(int i=1;i<list.size();i++){
			Map<String, String> map = (Map<String, String>) list.get(i);
				
				for(int j=1;j<=map.size();j++){
			    String data = map.get(String.valueOf(j));
			    data= data.substring(1,data.length()-1);
			    String arr [] = data.split(",");
			    insertsql.append(" ( ");
				    for(int s=0;s<arr.length;s++){
				    	boolean flag=false;
				    	for(int n=0;n<dictionaryColoumn.length;n++){
				    		if(dictionaryColoumn[n].equalsIgnoreCase(arr_name[s])){
				    			flag=true;
				    			break;
				    		}
				    	}
				    	String value=arr[s].toString().replace(" ", "");
				    	
				    	if(flag){
				    		if(value.equalsIgnoreCase("")){
				    			value="";
				    		}else{
				    			value=value.split("\\*")[1];
				    			
				    		}
				    	}
				    	if(arr_name[s].equalsIgnoreCase("password")){
				    		String loginname=arr[loginIndex].toString().replace(" ", "");
		    				value = MD5.md5s(loginname+"{"+value+"}");//加密 规则 :  登陆名{密码}
		    			}
				    	insertsql.append("'").append(value).append("',");
				    	
				    }
				    insertsql.append("now(),"+user.getId()).append(",now(),"+user.getId()+",0 ) ,");
				}
		}
		sql.append(insertsql.substring(0, insertsql.length()-1));
		try{
			jlUserInfoDao.importData(sql.toString());
		}catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public List<Map> findUserCountByDep(){
		return jlUserInfoDao.findUserCountByDep();
	}
	
	public void updateOpenId(String id,String openId){
		jlUserInfoDao.updateOpenId( id, openId);
	}
}
