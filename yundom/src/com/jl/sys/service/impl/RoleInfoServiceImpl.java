package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.sys.dao.DepartmentInfoDao;
import com.jl.sys.dao.RoleDepartmentDao;
import com.jl.sys.dao.RoleInfoDao;
import com.jl.sys.dao.RoleMenuDao;
import com.jl.sys.dao.RoleUserDao;
import com.jl.sys.dao.UserInfoDao;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.DepartmentRoleInfo;
import com.jl.sys.pojo.MenuRoleInfo;
import com.jl.sys.pojo.RoleInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.pojo.UserRoleInfo;
import com.jl.sys.service.RoleInfoService;
@Service
@Component("jlRoleInfoService")
public class RoleInfoServiceImpl implements RoleInfoService {

	@Autowired
	private RoleInfoDao roleInfoDao;
	@Autowired
	private RoleMenuDao roleMenuDao;
	@Autowired
	private RoleUserDao roleUserDao;
	@Autowired
	private RoleDepartmentDao roleDepartmentDao;
	@Autowired
	private DepartmentInfoDao departmentDao;
	@Autowired
	private UserInfoDao userDao;
	
	@Override
	public RoleInfo findById(int id) {
		
		return roleInfoDao.findById(id);
	}

	@MethodLog2(remark="保存角色信息",type="新增/编辑")
	public int saveRole(RoleInfo ri) {
		return roleInfoDao.saveRole(ri);
	}

	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List list=roleInfoDao.findList(user,page,rows,param);
		int count=roleInfoDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}

	@MethodLog2(remark="保存角色_菜单信息",type="新增/编辑")
	public void saveRoleMenu(int rid,String mids){
		if(mids==null||mids.equalsIgnoreCase("")){
			//删除所有该角色关联的菜单在存入
			roleMenuDao.delMenuRoleByRoleId(rid);
			return;
		}
		String[] mid= mids.split(",");
		//先删除所有该角色关联的菜单在存入
		roleMenuDao.delMenuRoleByRoleId(rid);
		for(int m=0;m<mid.length;m++){
			int menuid=Integer.parseInt(mid[m]);
			MenuRoleInfo mri=new MenuRoleInfo(0,menuid,rid);
			roleMenuDao.saveMenuRole(mri);
		}
	}
	
	public String findRoleMenuByRoleId(int rid){
		List<Object[]> list=roleMenuDao.findMenuRoleByRoleId(rid);
		StringBuffer retStr=new StringBuffer(50);
		for(int i=0;i<list.size();i++){
			if(i>0){
				retStr.append(",");
			}
			retStr.append(list.get(i)[0]);
		}
		return retStr.toString();
	}
	@MethodLog2(remark="删除角色信息",type="删除")
	public void delRole(int id){
		roleMenuDao.delMenuRoleByRoleId(id);//删除角色对应菜单关联信息
		roleUserDao.delUserRoleByRoleId(id);//删除角色对应用户的关联信息
		roleDepartmentDao.delDepartmentRoleByRoleId(id);//删除角色对应部门的关联信息
		roleInfoDao.delRoleByRoleId(id);//删除角色对应信息
	}
	@MethodLog2(remark="用户管理中保存角色_用户信息",type="新增/编辑")
	public void saveRoleUser(String rids,int userid){
		//先删除该用户在用户角色关联表中的所有数据
		roleUserDao.deleteRoleUserByUserid(String.valueOf(userid));
		String[] mid= rids.split(",");
		for(int m=0;m<mid.length;m++){
			int rid=Integer.parseInt(mid[m]);
			UserRoleInfo mri=new UserRoleInfo(0,userid,rid);
			roleUserDao.saveUserRole(mri);
		}
	}
	
	@MethodLog2(remark="角色管理中保存角色_用户信息",type="新增/编辑")
	public void saveRoleUser(int rid, String users) {
		if(users==null||users.equalsIgnoreCase("")){
			//删除所有该角色关联的用户在存入
			roleUserDao.delUserRoleByRoleId(rid);
			return;
		}
		String[] mid= users.split(",");
		//先删除所有该角色关联的用户在存入
		roleUserDao.delUserRoleByRoleId(rid);
		for(int m=0;m<mid.length;m++){
			int menuid=Integer.parseInt(mid[m]);
			UserRoleInfo mri=new UserRoleInfo(0,menuid,rid);
			roleUserDao.saveUserRole(mri);
		}
	}

	@MethodLog2(remark="保存角色_部门信息",type="新增/编辑")
	public void saveRoleDepartment(int rid, String departments) {
		if(departments==null||"".equalsIgnoreCase(departments)){
			//删除所有该角色关联的部门在存入
			roleDepartmentDao.delDepartmentRoleByRoleId(rid);
			return;
		}
		String[] mid= departments.split(",");
		//先删除所有该角色关联的部门在存入
		roleDepartmentDao.delDepartmentRoleByRoleId(rid);
		for(int m=0;m<mid.length;m++){
			int menuid=Integer.parseInt(mid[m]);
			DepartmentRoleInfo mri=new DepartmentRoleInfo(0,menuid,rid);
			roleDepartmentDao.saveDepartmentRole(mri);
		}
	}

	@Override
	public String findRoleUserByRoleId(int rid) {
		List<Object[]> list=roleUserDao.findUserRoleByRoleId(rid);
		StringBuffer retStr=new StringBuffer("");
		StringBuffer rename=new StringBuffer("");
		for(int i=0;i<list.size();i++){
			if(i>0){
				retStr.append(",");
				rename.append(",");
			}
			retStr.append(list.get(i)[0]+"");
			UserInfo ui = userDao.findById((Integer)list.get(i)[0]);
			rename.append(ui.getUsername());
		}
		if(retStr.toString().equalsIgnoreCase("")){
			retStr.append("null");
			rename.append("null");
		}
		return retStr.toString()+"*"+rename.toString();
	}

	@Override
	public String findRoleDepartmentByRoleId(int rid) {
		List<Object[]> list=roleDepartmentDao.findDepartmentRoleByRoleId(rid);
		StringBuffer retStr=new StringBuffer("");
		StringBuffer rename=new StringBuffer("");
		for(int i=0;i<list.size();i++){
			if(i>0){
				retStr.append(",");
				rename.append(",");
			}
			retStr.append(list.get(i)[0]+"");
			DepartmentInfo dp= departmentDao.findById((Integer)list.get(i)[0]);
			rename.append(dp.getName());
		}
		if(retStr.toString().equalsIgnoreCase("")){
			retStr.append("null");
			rename.append("null");
		}
		return retStr.toString()+"*"+rename.toString();
	}
	
	public List<Object[]> findRoleIdByUserId(int userid){
		return roleUserDao.findRoleIdByUserId(userid);
	}
	
	public void deleteRoleUserByUserid(String userid){
		roleUserDao.deleteRoleUserByUserid(userid);
		
	}
	
	public List<Object[]> findRoleIdByDepartmentId(int deparmentid){
		return roleDepartmentDao.findRoleIdByDepartmentId(deparmentid);
	}
}
