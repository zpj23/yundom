package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.UserInfo;

public interface UserInfoService {
	/**
	 * 检查用户是否存在，登陆方法
	 * @Title findLogin
	 * @param user
	 * @return
	 * @author zpj
	 * @time 2016-1-22 下午1:35:58
	 */
	public UserInfo findLogin(UserInfo user,boolean flag);
	
	/**
	 * 初始化查询用户列表
	 * @Title findList
	 * @param user
	 * @return
	 * @author zpj
	 * @time 2016-1-27 下午3:01:29
	 */
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param);
	
	
	
	/**
	 * 保存用户
	 * @Title saveUser
	 * @param user
	 * @author zpj
	 * @time 2016-1-28 下午1:37:45
	 */
	public int saveUser(UserInfo user);
	
	/**
	 * 保存当前登陆ip和时间
	 * @Title saveUserCurrentInfo
	 * @param user
	 * @return
	 * @author zpj
	 * @time 2016-6-4 下午3:20:45
	 */
	public int baocunUserCurrentInfo(UserInfo user);
	/**
	 * 删除对象
	 * @Title delUser
	 * @param user
	 * @return
	 * @author zpj
	 * @time 2016-2-19 下午3:35:21
	 */
	public void delUser(int id);
	/**
	 * 根据id查询用户信息
	 * @Title findById
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2016-1-28 下午3:21:06
	 */
	public UserInfo findById(int id);
	
	
	/**
	 * 根据组织机构code查询下面用户
	 * @Title findUserByDepCode
	 * @param code
	 * @return
	 * @author zpj
	 * @time 2016-3-31 下午3:08:39
	 */
	public List<Map> findUserByDepCode(String code);
	
	/**
	 *  excel导入人员
	 * @Title importExcel
	 * @param list
	 * @param table
	 * @param user
	 * @author zpj
	 * @time 2016-4-18 下午2:06:15
	 */
	public void importExcel(List list,String table,UserInfo user );
	
	/**
	 * 修改密码
	 * @Title saveUserPw
	 * @param user
	 * @author zpj
	 * @time 2016-6-3 下午2:57:11
	 */
	public void saveUserPw(UserInfo user);
	
	/**
	 * 根本部门统计人员总数
	 * @Title findUserCountByDep
	 * @return
	 * @author zpj
	 * @time 2016-6-16 上午11:47:32
	 */
	public List<Map> findUserCountByDep();
	
	
	/**
	 * 更新openid
	 * @Title updateOpenId
	 * @param id
	 * @param openId
	 * @author zpj
	 * @time 2019年7月22日 下午4:06:07
	 */
	public void updateOpenId(String id,String openId);
	
	
}
