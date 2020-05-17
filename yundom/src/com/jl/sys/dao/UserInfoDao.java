package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.UserInfo;

public interface UserInfoDao {
	public List<Object[]> findLogin(String loginname,String pwd,boolean flag);
	public UserInfo findById(int id);
	
	public List findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	public int findCount(UserInfo user,Map<String,String> param);
	
	public int saveUser(UserInfo user);
	
	public void delUser(int id);
	
	
	public List<Map> findUserByDepCode(String code);
	
	public void importData(String sql);
	
	public void saveUserPw(UserInfo user);
	
	public List<Map> findUserCountByDep();
	
	public void updateOpenId(String id,String openId);
}
