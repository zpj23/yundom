package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService;
import com.jl.common.BaseService.MethodLog2;
import com.jl.common.NewBaseDao;
import com.jl.sys.dao.DepartmentInfoDao;
import com.jl.sys.dao.UserInfoDao;
import com.jl.sys.pojo.DepartmentInfo;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.DepartmentInfoService;
import com.jl.sys.service.UserInfoService;
@Service
@Component("jlDepartmentInfoService")
public class DepartmentInfoServiceImpl extends BaseService<DepartmentInfo> implements DepartmentInfoService {
	
	@Autowired
	private DepartmentInfoDao jlDepartmentInfoDao;
	
	public DepartmentInfoDao getJlDepartmentInfoDao() {
		return jlDepartmentInfoDao;
	}

	public void setJlDepartmentInfoDao(DepartmentInfoDao jlDepartmentInfoDao) {
		this.jlDepartmentInfoDao = jlDepartmentInfoDao;
	}

	public UserInfoDao getJlUserInfoDao() {
		return jlUserInfoDao;
	}

	public void setJlUserInfoDao(UserInfoDao jlUserInfoDao) {
		this.jlUserInfoDao = jlUserInfoDao;
	}

	@Autowired
	private NewBaseDao<DepartmentInfo> dpDao;
	
	@Autowired
	private UserInfoDao jlUserInfoDao;
	
	
	
	
	public List<Map> findByParentCode(String code){
		return jlDepartmentInfoDao.findDepartListByPCode(code);
	}
	
	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List list=jlDepartmentInfoDao.findList(user,page,rows,param);
		int count=jlDepartmentInfoDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}

	@Override
	public DepartmentInfo findById(int id) {
		return jlDepartmentInfoDao.findById(id);
	}

	@MethodLog2(remark="保存部门信息",type="新增/编辑")
	public int saveDepartment(DepartmentInfo di){
		return jlDepartmentInfoDao.saveDepartment(di);
	}
	public String findTopJson(){
		StringBuffer s=new StringBuffer();
		//s.append("[{\"id\":1,\"text\":\"My Documents\",\"children\":[{\"id\":11,\"text\":\"Photos\",\"state\":\"closed\",\"children\":[{\"id\":111,\"text\":\"Friend\"},{\"id\":112,\"text\":\"Wife\"},{\"id\":113,\"text\":\"Company\"}]},{\"id\":12,\"text\":\"Program Files\",\"children\":[{\"id\":121,\"text\":\"Intel\"},{\"id\":122,\"text\":\"Java\",\"attributes\":{\"p1\":\"Custom Attribute1\",\"p2\":\"Custom Attribute2\"}},{\"id\":123,\"text\":\"Microsoft Office\"},{\"id\":124,\"text\":\"Games\",\"checked\":true}]},{\"id\":13,\"text\":\"index.html\"},{\"id\":14,\"text\":\"about.html\"},{\"id\":15,\"text\":\"welcome.html\"}]}]");
		List<Map> list=jlDepartmentInfoDao.findTopDepartList();	
		s.append("[");
		for(int i=0;i<list.size();i++){
			if(i>0){
				s.append(",");
			}
			s.append("{\"id\":\""+list.get(i).get("code")+"\",\"text\":\""+list.get(i).get("name")+"\",\"attributes\":{\"pk\":\""+list.get(i).get("id")+"\"},\"state\":\"closed\"}");
		}
		s.append("]");
		return s.toString();
	}
	public String findDeptJson(Map<String,String> param){
		StringBuffer s=new StringBuffer();
//		s.append("[{\"id\":1,\"text\":\"My Documents\",\"children\":[{\"id\":11,\"text\":\"Photos\",\"state\":\"closed\",\"children\":[{\"id\":111,\"text\":\"Friend\"},{\"id\":112,\"text\":\"Wife\"},{\"id\":113,\"text\":\"Company\"}]},{\"id\":12,\"text\":\"Program Files\",\"children\":[{\"id\":121,\"text\":\"Intel\"},{\"id\":122,\"text\":\"Java\",\"attributes\":{\"p1\":\"Custom Attribute1\",\"p2\":\"Custom Attribute2\"}},{\"id\":123,\"text\":\"Microsoft Office\"},{\"id\":124,\"text\":\"Games\",\"checked\":true}]},{\"id\":13,\"text\":\"index.html\"},{\"id\":14,\"text\":\"about.html\"},{\"id\":15,\"text\":\"welcome.html\"}]}]");
		List<Map> list= jlDepartmentInfoDao.findDepartListByPId(param);
		if(list!=null&&list.size()>0){
			s.append("[");
			for(int i=0;i<list.size();i++){
				if(i>0){
					s.append(",");
				}
				s.append("{\"id\":\""+list.get(i).get("code")+"\",\"text\":\""+list.get(i).get("name")+"\",\"attributes\":{\"pk\":\""+list.get(i).get("id")+"\"},");
				List tlist=jlDepartmentInfoDao.findDepartListByPId((Map<String,String>)list.get(i));
				if(tlist.size()>0){
					s.append("\"state\":\"closed\"}");
				}else{
					s.append("\"state\":\"open\"}");
				}
			}
			s.append("]");
			return s.toString();
		}else{
		  return "[]";
		}
	}
	
	public String findDeptOrUserJson(Map<String,String> param){
		StringBuffer s=new StringBuffer();
		List<Map> list= jlDepartmentInfoDao.findDepartListByPId(param);//根据编码查询下面是否还有只机构
		if(list!=null&&list.size()>0){
			s.append("[");
			for(int i=0;i<list.size();i++){
				if(i>0){
					s.append(",");
				}
				s.append("{\"id\":\""+list.get(i).get("code")+"\",\"text\":\""+list.get(i).get("name")+"\",\"attributes\":{\"pk\":\""+list.get(i).get("id")+"\",\"type\":\"people\"},");
				List tlist=jlDepartmentInfoDao.findDepartListByPId((Map<String,String>)list.get(i));
				if(tlist.size()>0){
					s.append("\"state\":\"closed\"}");
				}else{
					s.append("\"state\":\"closed\"}");
				}
			}
			s.append("]");
			return s.toString();
		}else{
			List<Map> list_user=jlUserInfoDao.findUserByDepCode(param.get("code"));
			s.append("[");
			for(int m=0;m<list_user.size();m++){
				if(m>0){
					s.append(",");
				}
				s.append("{\"id\":\""+list_user.get(m).get("id")+"\",\"text\":\""+list_user.get(m).get("username")+"\",\"attributes\":{\"pk\":\""+list_user.get(m).get("id")+"\",\"type\":\"people\"},");
				s.append("\"state\":\"open\"}");
			}
			s.append("]");
			return s.toString();
		}
	}
	@MethodLog2(remark="删除部门信息",type="删除")
	public int remove(DepartmentInfo t){
		return jlDepartmentInfoDao.remove(t);
	}
	
	public DepartmentInfo findDeptByDeptCode(String code){
		return jlDepartmentInfoDao.findDeptByDeptCode(code);
	}
	
	public String findAllJson(String checkids){
		StringBuffer s=new StringBuffer();
//		s.append("[{\"id\":1,\"text\":\"My Documents\",\"children\":[{\"id\":11,\"text\":\"Photos\",\"state\":\"closed\",\"children\":[{\"id\":111,\"text\":\"Friend\"},{\"id\":112,\"text\":\"Wife\"},{\"id\":113,\"text\":\"Company\"}]},{\"id\":12,\"text\":\"Program Files\",\"children\":[{\"id\":121,\"text\":\"Intel\"},{\"id\":122,\"text\":\"Java\",\"attributes\":{\"p1\":\"Custom Attribute1\",\"p2\":\"Custom Attribute2\"}},{\"id\":123,\"text\":\"Microsoft Office\"},{\"id\":124,\"text\":\"Games\",\"checked\":true}]},{\"id\":13,\"text\":\"index.html\"},{\"id\":14,\"text\":\"about.html\"},{\"id\":15,\"text\":\"welcome.html\"}]}]");
		Set<String> st=new HashSet<String>();
		if(null!=checkids&&!"".equalsIgnoreCase(checkids)){
			String[] str=checkids.split(",");
			for(int m=0;m<str.length;m++){
				st.add(str[m]);
			}
		}
		List<Map> list=jlDepartmentInfoDao.findAllJson();	
		s.append("[");
		for(int i=0;i<list.size();i++){
			if(i>0){
				s.append(",");
			}
			s.append(composeStr(list.get(i),st));
			
		}
		s.append("]");
		return s.toString();
	}
	
	public String composeStr(Map map,Set<String> st){
		StringBuffer sb= new StringBuffer(100);
		if(st.contains(map.get("id")+"")){
			sb.append("{\"id\":\""+map.get("id")+"\",\"text\":\""+map.get("name")+"\",\"attributes\":{\"code\":\""+map.get("code")+"\"},\"pid\":\""+map.get("parent_id")+"\",\"checked\":\"true\"}");
		}else{
			sb.append("{\"id\":\""+map.get("id")+"\",\"text\":\""+map.get("name")+"\",\"attributes\":{\"code\":\""+map.get("code")+"\"},\"pid\":\""+map.get("parent_id")+"\"}");
		}
		return sb.toString();
	}
}
