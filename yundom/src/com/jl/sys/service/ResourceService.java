package com.jl.sys.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import com.jl.sys.pojo.SysResourceItem;
import com.jl.sys.pojo.SysResourceType;


public interface ResourceService {

//	//分页显示一级数据
////	public void findResourceListLvOne(HttpServletRequest request,
////			String selectName, String selectCode, String page,
////			int pageSize);
//	
//	//保存数据字典信息	
	public int saveResourceType(SysResourceType restype);
//	
//	//查询一级数据字典
	public List<Object []> findTypeLevelOne(String selectName,String selectCode,int parentid);
//	
//	//查询某个数据字典类型
	public SysResourceType findOneResById(int id);
	/**
	 * 删除resourcetype
	 * @Title delRescource
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2020年5月23日 下午4:05:27
	 */
	public int delRescource(String id);
	/**
	 * 某个2级数据下的item树
	 * @Title findResourceItemJson
	 * @param id
	 * @return
	 * @author zpj
	 * @time 2020年5月23日 下午4:08:50
	 */
	public String findResourceItemJson(String id);
	

	/**
	 * 根据type表中type_code编码查询item表中列表项数据
	 * @Title findResourceItemByResourceTypeCode
	 * @param code
	 * @author zpj
	 * @time 2020年6月11日 下午3:14:04
	 */
	public List findResourceItemByResourceTypeCode(String code);
	
//	//显示一个项的信息
//	public SysResourceItem showOneItem(int id);
//	
//	//保存/编辑
//	public Object saveItem(List<SysResourceItem> list);
//	
//	//删除
//	public String delItem(int id);
//	
	/**
	 * 分页显示2级数据菜单
	 * @Title findResourceListLvTwo
	 * @param request
	 * @param selectName
	 * @param selectCode
	 * @param pid
	 * @param page
	 * @param pageSize
	 * @author zpj
	 * @time 2020年5月23日 下午4:06:29
	 */
	public void findResourceListLvTwo(HttpServletRequest request,
			String selectName, String selectCode,String pid, String page,
			int pageSize);
//	
//	//依据2级code查询内容
//	public List<Object[]> findContentByCode(String code);
//	
//	//查询所有的字典数据
//	public List<Object []> findItemAll();
//	
//	//刷新字典数据
//	public void refreshResourceData(String id,String flag,HttpServletRequest request);
//	
//	//刷新字典数据
//	public void refreshResourceData2(SysResourceItem item);
//	
	/**
	 * 依据父级id查询子类
	 * @Title findAreaInfoByParentitemid
	 * @param code
	 * @return
	 * @author zpj
	 * @time 2020年5月23日 下午4:27:24
	 */
	public String findAreaInfoByParentitemid(String code);
//	
	/**
	 * check code 验证编码的唯一性
	 * @Title checkTypeCode
	 * @param typeid
	 * @param typecode
	 * @return
	 * @author zpj
	 * @time 2020年5月23日 下午4:23:14
	 */
	public List<Object[]> checkTypeCode(String typeid, String typecode);
//	
//	//检查是否有下级数据，有就不能删除
	public List<Object[]> checkChildData(String id);
//	
//	//查询节点下的配置信息
//	public List<Object[]> findNodeUsers();
//
	/**
	 * 列表展示item
	 * @Title showResourceItemJson
	 * @param pid
	 * @return
	 * @author zpj
	 * @time 2020年5月23日 下午3:58:35
	 */
	public String showResourceItemJson(String pid);
//
	public String findTypeJson();
//
//	//保存item数据
	public int saveItem(SysResourceItem resitem);
//
//	//查看数据item表的数据
	public List<Object[]> checkChildItemData(String id);
//
//	//删除item表数据
	public void delItem(String id);
//
	public String showItemTreeJson(String pid);
//
//	public List<Object[]> findSomeUser(String rolecode, String deptcode);
//
//	public List<Object[]> findSomeUsersHn(String string, String procinsid);
	
}
