package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseDao;
import com.jl.common.BaseService.MethodLog2;
import com.jl.sys.pojo.SysResourceItem;
import com.jl.sys.pojo.SysResourceType;
import com.jl.sys.service.ResourceService;

import groovy.util.logging.Log;



@Service
@Component("resourceService")
public class ResourceServiceImpl  implements ResourceService{
	@Autowired
	private BaseDao<SysResourceType> srtDao;
	@Autowired
	private BaseDao<SysResourceItem> sriDao;
	
////	public void findResourceListLvOne(HttpServletRequest request,
////			String selectName, String selectCode, String page,
////			int pageSize) {
////		
////		
////		StringBuffer hql = new StringBuffer();
////		hql.append("select type.id,type.typeName,type.typeCode "
////				+ "  from SysResourceType type where type.parentTypeid =0 ");
////		if (null != selectName && !"".equals(selectName.trim())) {
////			hql.append(" and type.typeName like '%" + selectName.trim() + "%'");
////		}
////		if (null != selectCode && !"".equals(selectCode.trim())) {
////			hql.append(" and type.typeCode like '%" + selectCode.trim() + "%'");
////		}		
////		srtDao.findData(hql, page, rows, param)
////		// 传递分页数据
////		resourceDao.setPageData(request, hql.toString(), null, page, pageSize);
////	}
//	

	/**
	 * 保存数据字典信息
	 */
	@MethodLog2(remark="编辑数据字典信息",type="编辑")
	public int  saveResourceType(SysResourceType restype) {
		try {
			if(restype.getParentTypeid()==null){
				restype.setParentTypeid(0);//1级类别
			}
			srtDao.saveOrUpdate(restype);
			return restype.getId();
		} catch (Exception e) {
			e.printStackTrace();
			return -1;
		}
	}
	/**
	 * 查询一级数据字典
	 */
	@Override
	public List<Object []> findTypeLevelOne(String selectName,String selectCode,int parentid) {		
		try {
			StringBuffer str = new StringBuffer();
			str.append("select id,type_name,type_code,parent_typeid from sys_resource_type where parent_typeid= ").append(parentid);

			if(selectName!=null&&!"".equals(selectName)){
				str.append(" and type_name = '").append(selectName.trim()).append("' ");
			}
			if(selectCode!=null&&!"".equals(selectCode)){
				str.append(" and type_code = '").append(selectCode.trim()).append("' ");
			}
			
			List<Object []> list = srtDao.findListBySql(str.toString());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 查询某个数据字典类型
	 * @param id
	 * @return
	 */
	@Override
	public SysResourceType findOneResById(int id) {
		try {
			SysResourceType onetype = srtDao.get2(id); 
			return onetype;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 删除
	 * @param id  
	 */
	@Override
	@MethodLog2(remark="删除数据字典信息",type="删除")
	public int delRescource(String id) {
		try {
			srtDao.executeUpdateOrDelete("delete from sys_resource_type where id='"+id+"'");
			return 1;
		} catch (Exception e) {
			e.printStackTrace();
			return 0;
		}
	}

	public static Map<String,String> getCodeMapByType2(String type) {        
//        List<SysOrganization> itemmap = orgCache.get(type);
//        Map<String,String> result = new LinkedHashMap<String, String>();   
//        if(itemmap == null) {
//            result = new LinkedHashMap<String, String>();
//        }else{
//        	for(int i=0;i<itemmap.size();i++){
//        		result.put(itemmap.get(i).getOrgCode() ,itemmap.get(i).getOrgName());
//        	}
//        }
//        return result;
		return new LinkedHashMap<String,String>();
    }
	/**
	 * 某个2级数据下的item树
	 * @param pid
	 * @return
	 */
	@Override
	public String findResourceItemJson(String id) {
		try{
			//查询2级数据id下的item
			Map<String,String> map =this.getCodeMapByType2(id);	

			StringBuffer str = new StringBuffer("");
			if (map != null && map.size() > 0) {
				str.append("[");
				// 次节点下的隐藏
				String sign = "";
				String ischeck = "";
				for (Map.Entry entry : map.entrySet()){			
					//1
					sign = "click:\"getTypeid('" + (String)entry.getKey() + "')\" ";
					str.append("{id:\"").append(entry.getKey()).append("\", pId:\"")
					.append(id).append("\", name:\"")
					.append(entry.getValue()).append("\" ,").append(sign)
					.append(", open : true },");
					//2
					Map<String,String> map2 =this.getCodeMapByType2((String)entry.getKey());
					if(map2.size()>0){
						for (Map.Entry entry2 : map2.entrySet()){	
							sign = "click:\"getTypeid('" + (String)entry2.getKey() + "')\" ";
							str.append("{id:\"").append(entry2.getKey()).append("\", pId:\"")
							.append((String)entry.getKey()).append("\", name:\"")
							.append(entry2.getValue()).append("\" ,").append(sign)
							.append(", open : false },");

							//3
							Map<String,String> map3 =this.getCodeMapByType2((String)entry2.getKey());
							if(map3.size()>0){
								for (Map.Entry entry3 : map3.entrySet()){	
									sign = "click:\"getTypeid('" + (String)entry3.getKey() + "')\" ";
									str.append("{id:\"").append(entry3.getKey()).append("\", pId:\"")
									.append((String)entry2.getKey()).append("\", name:\"")
									.append(entry3.getValue()).append("\" ,").append(sign)
									.append(", open : false },");


									//4
									Map<String,String> map4 =this.getCodeMapByType2((String)entry3.getKey());
									if(map4.size()>0){
										for (Map.Entry entry4 : map4.entrySet()){	
											sign = "click:\"getTypeid('" + (String)entry4.getKey() + "')\" ";
											str.append("{id:\"").append(entry4.getKey()).append("\", pId:\"")
											.append((String)entry3.getKey()).append("\", name:\"")
											.append(entry4.getValue()).append("\" ,").append(sign)
											.append(", open : false },");
										}
									} 
								}
							}
						}	
					}

				}
			} else {
				return "0";
			}
			String s = str.toString();
			if (!s.equals("")) {
				s = s.substring(0, s.length() - 1) + "]";
			}   
			return s;
		}catch (Exception e) {
			return "[]";
		}
	}
//
//
//
//    /**
//     * 显示一个项的信息
//     * @param id
//     * @return
//     */
//	@Override
//	public SysResourceItem showOneItem(int id){				
//		try {
//			SysResourceItem item = sriDao.get2(id);
//			if(item.getParentItemid()!=null){
//				//获取父节点的名称
//				SysResourceItem sri = sriDao.get2(item.getParentItemid());
//				item.setParentItemname(sri.getItemName());
//			}
//			return item;
//		} catch (Exception e) {
//			e.printStackTrace();
//		}
//		return null;
//	}
//
//
//	/**
//	 * 保存/编辑
//	 * @param list
//	 * @return
//	 */
//	@Override
//	public Object saveItem(List<SysResourceItem> list){
//		try {
//			SysResourceItem item = list.get(0);
//			//检查是否code已存在
//			List<Object[]> codelist=null;
//			if(item.getId()==null){
//				codelist = checkTypeCode(null,item.getItemCode());
//			}else{
//				codelist = checkTypeCode(item.getId().toString(),item.getItemCode());
//			}
//			if(codelist!=null&&codelist.size()>0){
//				//存在重复
//				return "1";
//			}					
//
//			int itemid;
//			String operateFlag="";
//			if(item.getId()==null){
//				//新增
//				sriDao.save(item);
//				itemid = item.getId();
//				operateFlag="add";
//			}else{
//				//修改
//				sriDao.update(item);
//				itemid=item.getId();
//				operateFlag="update";
//			}			
//			refreshResourceData2(item);
//			return itemid+"_"+operateFlag;
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "0";
//		}
//
//	}
//
	public List<Object []>  findResourceitemByparentid(int id){
		String hql = " from SysResourceItem where parentItemid=?";
		List<Object[]> list;
		try {
			list = sriDao.findByHql(hql, id);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	/**
	 * 删除
	 * @param id
	 * @return
	 */
//	public String delItem(int id){
//
//		try {
//			List<Object[]> list = this.findResourceitemByparentid(id);
//			if(list!=null&&list.size()>0){
//				//存在下级，不可删除
//				return "2";
//			}else{				
//				//更新map
////				refreshResourceData(String.valueOf(id), "delete", null);
//
//				//删除数据
//				sriDao.executeUpdateOrDelete("select * from SYS_RESOURCE_ITEM where id='"+id+"'");
//				return "1";
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//			return "0";
//		}
//	}


	/**
	 * 分页显示2级数据菜单
	 * @param request
	 * @param selectName
	 * @param selectCode
	 * @param page
	 * @param pageSize
	 */
	@Override
	public void findResourceListLvTwo(HttpServletRequest request,
			String selectName, String selectCode,String pid, String page,
			int pageSize) {
		StringBuffer hql = new StringBuffer();
		hql.append("select type.id,type.typeName,type.typeCode "
				+ "  from SysResourceType type where type.parentTypeid =").append(pid);
		if (null != selectName && !"".equals(selectName.trim())) {
			hql.append(" and type.typeName like '%" + selectName.trim() + "%'");
		}
		if (null != selectCode && !"".equals(selectCode.trim())) {
			hql.append(" and type.typeCode like '%" + selectCode.trim() + "%'");
		}	
		// 传递分页数据
		srtDao.setPageData(request, hql.toString(), null, page, pageSize);
	}
//
//
//	/**
//	 * 依据2级code查询内容
//	 * @param string
//	 * @return
//	 */
//	@Override
//	public List<Object[]> findContentByCode(String code) {		
//		List<Object[]> list = resourceDao.findContentByCode(code);
//		return list;
//	}
//
//	
//	/**
//	 * 查询所有的字典数据
//	 * @return
//	 */
//	@Override
//	public List<Object []> findItemAll(){		
//		List<Object[]> list = resourceDao.findItemAll();
//		return list;
//	}
//
//
//	/**
//	 * 刷新字典数据
//	 * @param request
//	 */
//	@Override
//	public void refreshResourceData(String id,String flag,HttpServletRequest request){
//		try{			
//			List<Object[]> list =  itemDao.findItemsByTypeid(id);
//
//			String code = (String) list.get(0)[1];
//			String name = (String) list.get(0)[2];
//			String parentid =  String.valueOf(list.get(0)[3]);
//			String parentcode = (String) list.get(0)[4];
//
//			//更新map
//			Map<String,String> map =CoderUtil.getCodeMapByType2(parentid);
//			Map<String,String> map_key =CoderUtil.getCodeMapByType(parentcode);
//
//			if("delete".equals(flag)){
//				map.remove(id);
//				map_key.remove(code);
//			}else{
//				map.put(id, name);
//				map_key.put(code, name);
//			}
//		}catch (Exception e) {
//			e.printStackTrace();					
//		}
//	}
//
//	/**
//	 * 刷新字典数据
//	 * @param request
//	 */
//	@Override
//	public void refreshResourceData2(SysResourceItem item){
//		try{					
//			String id = item.getId().toString();
//			String code = item.getItemCode();
//			String name = item.getItemName();
//			String parentid =  "";
//			if(item.getParentItemid()!=null){
//				parentid = item.getParentItemid().toString();
//			}else{
//				parentid = item.getTypeid().toString();
//			}
//			String parentcode = "";
//			if(item.getParentItemid()!=null){
//				parentcode = itemDao.getEntity(item.getParentItemid()).getItemCode();
//			}else{					
//				parentcode =resourceDao.getEntity(item.getTypeid()).getTypeCode();
//			}
//
//			//更新map
//			Map<String,String> map =CoderUtil.getCodeMapByType2(parentid);
//			Map<String,String> map_key =CoderUtil.getCodeMapByType(parentcode);
//
//			map.put(id, name);
//			map_key.put(code, name);
//
//		}catch (Exception e) {
//			e.printStackTrace();					
//		}
//	}
//
//
	
	public static Map<String,String> getCodeMapByType(String type) {        
//        List<SysOrganization> itemmap = orgCache.get(type);
//        Map<String,String> result = new LinkedHashMap<String, String>();   
//        if(itemmap == null) {
//            result = new LinkedHashMap<String, String>();
//        }else{
//        	for(int i=0;i<itemmap.size();i++){
//        		result.put(itemmap.get(i).getId().toString() ,itemmap.get(i).getOrgName());
//        	}
//        }
//        return result;
		return null;
    }
	/**
	 * 依据父级id查询子类
	 * @param id
	 * @return
	 */
	@Override
	public String findAreaInfoByParentitemid(String code) {
		try{
			//查询2级数据pid下的item
			Map<String,String> codeMap = this.getCodeMapByType(code);
			Set<Entry<String,String>> set = codeMap.entrySet();
			Iterator<Entry<String,String>> iterator = set.iterator();
			Entry<String,String> entry;

			StringBuffer str = new StringBuffer("");
			if (codeMap!=null&&codeMap.size()>0) {
				str.append("[");
				// 次节点下的隐藏
				String sign = "";
				String ischeck = "";
				
				while(iterator.hasNext()) {
					entry = iterator.next();
					str.append("{code:\"").append(entry.getKey()).append("\", name:\"")
					.append(entry.getValue()).append("\" },");				                
				}

			} else {
				return "0";
			}
			String s = str.toString();
			if (!s.equals("")) {
				s = s.substring(0, s.length() - 1) + "]";
			}   
			return s;
		}catch (Exception e) {
			return "[]";
		}
	}


	/**
	 * check code 
	 * @param typeid
	 * @param typecode
	 * @return
	 */
	@Override
	public List<Object[]> checkTypeCode(String typeid, String typecode) {
		List<Object[]> list=null;
		try {
			if(typeid==null||"".equals(typeid)){
				//新增时
				String sql = " Select Id From Sys_Resource_Type Where Type_Code=?  union " +
				" select id from sys_resource_item where item_code=?";
				list = srtDao.findBySql(sql, typecode,typecode);
			}else{
				//修改时
				String sql = " Select Id From Sys_Resource_Type Where Type_Code=? and id <> ? union  " +
				" select id from sys_resource_item where item_code=? and id <> ?";
				list = srtDao.findBySql(sql, typecode,typeid,typecode,typeid);
			}				
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}


	/**
	 * 检查是否有下级数据，有就不能删除
	 * 
	 */
	@Override
	public List<Object[]> checkChildData(String id) {
		try{
			SysResourceType type = srtDao.get2(Integer.parseInt(id));
			List<Object[]> list;
			if(type.getParentTypeid()==0){
				//1级
				String sql = "select id from sys_resource_type where parent_typeid = ?";
				list = srtDao.findBySql(sql, id);
			}else{
				//2级
				String sql = "select id from sys_resource_item where typeid = ?";
				list = srtDao.findBySql(sql, id);
			}
			return list;
		}catch (Exception e) {
			return null;
		}
	}


//    /**
//     * 查询节点下的配置信息
//     * @return
//     */
//	@Override
//	public List<Object[]> findNodeUsers() {
//		return  resourceDao.findNodeUsers();
//	}
//	
//	
//	/**
//	 * 查询所有组织机构信息
//	 * @return
//	 */
//	public List<SysOrganization> findOrgAll() {		
//		return resourceDao.findOrgAll();
//	}
//	
//	
	
	public List<SysResourceItem> getItemByType(String code){
		return sriDao.findBySqlT(" select * from SYS_RESOURCE_ITEM where typeid='"+code+"'", SysResourceItem.class);
	}
	
	@Override
	public String showResourceItemJson(String pid) {
		if(pid==null||"".equals(pid)){
			return "[]";
		}
		//pid ---> code
		String code="";
		SysResourceType itype = srtDao.get2(Integer.parseInt(pid));
		if(itype!=null){
			code = itype.getTypeCode();
		}else{
			SysResourceItem iitem = sriDao.get2(Integer.parseInt(pid));
			code = iitem.getItemCode();
		}
		List<SysResourceItem> list = this.getItemByType(code);
		if(list!=null){		
		StringBuffer str = new StringBuffer();	
		str.append("[");
		for(int i=0;i<list.size();i++){				
			String state = "open";
			List<SysResourceItem> list2 = this.getItemByType(list.get(i).getItemCode());
			if(list2!=null&&list2.size()>0){
				state = "closed";
			}
			str.append("{\"id\":\"").append(list.get(i).getId()).append("\",\"itemName\":\"").append(list.get(i).getItemName());	
			if(list.get(i).getParentItemid()==null){
				str.append("\",\"parentItemid\":\"").append(list.get(i).getTypeid());
			}else{
				str.append("\",\"parentItemid\":\"").append(list.get(i).getParentItemid());
			}
			str.append("\",\"typeid\":\"").append(list.get(i).getTypeid())
			.append("\",\"itemnum\":\"").append(list.get(i).getItemOrder())
			.append("\",\"isable\":\"").append(list.get(i).getIsable())
			.append("\",\"itemCode\":\"").append(list.get(i).getItemCode()).append("\",\"state\":\""+state+"\" },");		
		}
		if(!"[".equals(str.toString())){
			str.delete(str.toString().length()-1, str.toString().length());
		}
			str.append("]");
		return str.toString();
		}else{
			return "[]";
		}
	}
	
	public List<SysResourceType> findResourceType(){
		return srtDao.findBySqlT(" select * from SYS_RESOURCE_TYPE ", SysResourceType.class);
	}
	
	@Override
	public String findTypeJson() {
		List<SysResourceType> list = this.findResourceType();
		if(list!=null&&list.size()>0){
			StringBuffer str = new StringBuffer();	
			str.append("[");
			for(int i=0;i<list.size();i++){
				str.append("{\"id\":").append(list.get(i).getId()).append(",\"name\":\"").append(list.get(i).getTypeName())
				.append("(").append(list.get(i).getTypeCode()).append(")")				
				.append("\",\"pId\":\"").append(list.get(i).getParentTypeid()).append("\",\"open\":true ");
				if(list.get(i).getParentTypeid()!=0){
					//2级类别
					str.append(" ,click:\"showItem(").append(list.get(i).getId()).append(")\"");
				}
				str.append(" },");
			}		
			str.delete(str.toString().length()-1, str.toString().length()).append("]");	
			return str.toString();
		}else{
		  return "[]";
		}
	}
	@Override
	public int saveItem(SysResourceItem resitem) {		
	    //保存数据库
		sriDao.saveOrUpdate(resitem);
		
//		SysResourceItem reitem = sriDao.get2(resitem.getParentItemid());
//		String key="";
//		if(reitem!=null){
//			key = reitem.getItemCode();
//		}else{
//			SysResourceType type = srtDao.get2(resitem.getParentItemid());
//			key = type.getTypeCode();
//		}
//		ResourceCodeUtil.changeList(resitem,key);
		
		return resitem.getId();
	}
	
	public List<Object[]> checkChildItemData(String id) {		
		String hql =" from SysResourceItem where parentItemid = ?";
		return sriDao.findByHql(hql, Integer.parseInt(id));
	}
//	
	@Override
	public void delItem(String id) {		
		//保存缓存
		SysResourceItem item = sriDao.get2(Integer.parseInt(id));	
		sriDao.delete(item);
//		SysResourceItem reitem = itemDao.getEntity(item.getParentItemid());
//		String key="";
//		if(reitem!=null){
//			key = reitem.getItemCode();
//		}else{
//			SysResourceType type = resourceDao.getEntity(item.getParentItemid());
//			key = type.getTypeCode();
//		}
//		ResourceCodeUtil.removeList(item,key);
	}
//	
//	
//	@Override
//	public List<Object[]> findSomeUser(String rolecode,String orgcode) {		
//		return resourceDao.findSomeUser(rolecode,orgcode);
//	}
//	

	
	
	public String showItemTreeJson(String pid) {
		if(pid==null){
			pid = "2465131";
		}
		//pid ---> code
		String code="";
		SysResourceType itype = srtDao.get2(Integer.parseInt(pid));
		if(itype!=null){
			code = itype.getTypeCode();
		}else{
			SysResourceItem iitem = sriDao.get2(Integer.parseInt(pid));
			code = iitem.getItemCode();
		}
		List<SysResourceItem> list = this.getItemByType(code);
		if(list!=null){		
		StringBuffer str = new StringBuffer();	
		str.append("[");
		for(int i=0;i<list.size();i++){				
			String state = "open";
			List<SysResourceItem> list2 = this.getItemByType(list.get(i).getItemCode());
			if(list2!=null&&list2.size()>0){
				state = "closed";
			}
			str.append("{\"id\":\"").append(list.get(i).getId()).append("\",\"text\":\"").append(list.get(i).getItemName());	
			if(list.get(i).getParentItemid()==null){
				str.append("\",\"pId\":\"").append(list.get(i).getTypeid());
			}else{
				str.append("\",\"pId\":\"").append(list.get(i).getParentItemid());
			}
			str.append("\",\"state\":\""+state+"\" },");		
		}
		if(!"[".equals(str.toString())){
			str.delete(str.toString().length()-1, str.toString().length());
		}
			str.append("]");
		return str.toString();
		}else{
			return "[]";
		}
		
	}
	
//	
//	
////	public void addTaskInfo(DelegateTask delegateTask, String userid) {
////		
////		TaskEntity task = new TaskEntity();
////		task.setNameWithoutCascade(delegateTask.getName());// +
////		task.setProcessDefinitionId(delegateTask.getProcessDefinitionId());
////		task.setProcessInstanceId(delegateTask.getProcessInstanceId());
////		task.setParentTaskIdWithoutCascade(delegateTask.getId());
////		task.setTaskDefinitionKeyWithoutCascade(delegateTask.getTaskDefinitionKey());
////		task.setCreateTime(new Date());
////		task.setRevision(1);
////		task.setExecutionId(delegateTask.getExecutionId());
////		String uuid = UUID.randomUUID().toString();
////		task.setId(uuid);
////		
////		
////	}
//	
//	
//	
//	
//	
//	
//	@Override
//	public String showItemTreeLevelJson(String level) {
//		List<Object[]> list = resourceDao.findDeptdataByLevel(level);
//		if(list!=null){		
//			StringBuffer str = new StringBuffer();	
//			str.append("[");
//			
//			str.append("{\"id\":\"").append("").append("\",\"text\":\"").append("全部");
//			str.append("\",\"pId\":\"").append("");
//			str.append("\",\"state\":\"open\" },");	
//			
//			for(int i=0;i<list.size();i++){				
//				String state = "open";
//				List<SysResourceItem> list2 = ResourceCodeUtil.getItemByType(list.get(i)[3].toString());
//				if(list2!=null&&list2.size()>0){
//					state = "closed";
//				}
//				str.append("{\"id\":\"").append(list.get(i)[0]).append("\",\"text\":\"").append(list.get(i)[1]);	
//				if(list.get(i)[2]==null){
//					str.append("\",\"pId\":\"").append("");
//				}else{
//					str.append("\",\"pId\":\"").append(list.get(i)[2]);
//				}
//				str.append("\",\"state\":\""+state+"\" },");		
//			}
//			if(!"[".equals(str.toString())){
//				str.delete(str.toString().length()-1, str.toString().length());
//			}
//				str.append("]");
//			return str.toString();
//			}else{
//				return "[]";
//			}
//	}
//	/* (non-Javadoc)
//	 * @see com.goldenweb.sys.service.ResourceService#getMaxItemCode(java.lang.String)
//	 */
//	@Override
//	public String getMaxItemCode(String itemCode) {
//		return resourceDao.getMaxItemCode(itemCode);
//	}
//	@Override
//	public List<Object[]> findSomeUsersHn(String string, String procinsid) {
//		// TODO Auto-generated method stub
//		return null;
//	}

}
