package com.jl.sys.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.sys.dao.MenuInfoDao;
import com.jl.sys.pojo.MenuInfo;
import com.jl.sys.service.MenuInfoService;
@Service
@Component("jlMenuInfoService")
public class MenuInfoServiceImpl implements MenuInfoService{
	@Autowired
	private MenuInfoDao jlMenuInfoDao;
	
	public MenuInfoDao getJlMenuInfoDao() {
		return jlMenuInfoDao;
	}

	public void setJlMenuInfoDao(MenuInfoDao jlMenuInfoDao) {
		this.jlMenuInfoDao = jlMenuInfoDao;
	}

	@Override
	public MenuInfo findById(int id) {
		return jlMenuInfoDao.findById(id);
	}

	@MethodLog2(remark="保存菜单信息",type="新增/编辑")
	public int saveMenu(MenuInfo men) {
		return jlMenuInfoDao.saveMenu(men);
	}

	@MethodLog2(remark="删除菜单信息",type="删除")
	public int remove(MenuInfo men) {
		return jlMenuInfoDao.remove(men);
	}

	@Override
	public String findJson(Map<String, String> params) {
		StringBuffer s=new StringBuffer();
//		s.append("[{\"id\":1,\"text\":\"My Documents\",\"children\":[{\"id\":11,\"text\":\"Photos\",\"state\":\"closed\",\"children\":[{\"id\":111,\"text\":\"Friend\"},{\"id\":112,\"text\":\"Wife\"},{\"id\":113,\"text\":\"Company\"}]},{\"id\":12,\"text\":\"Program Files\",\"children\":[{\"id\":121,\"text\":\"Intel\"},{\"id\":122,\"text\":\"Java\",\"attributes\":{\"p1\":\"Custom Attribute1\",\"p2\":\"Custom Attribute2\"}},{\"id\":123,\"text\":\"Microsoft Office\"},{\"id\":124,\"text\":\"Games\",\"checked\":true}]},{\"id\":13,\"text\":\"index.html\"},{\"id\":14,\"text\":\"about.html\"},{\"id\":15,\"text\":\"welcome.html\"}]}]");
		List<Map> list= jlMenuInfoDao.findChildMenuByPId(params);
		if(list!=null&&list.size()>0){
			s.append("[");
			for(int i=0;i<list.size();i++){
				if(i>0){
					s.append(",");
				}
				s.append("{\"id\":\""+list.get(i).get("id")+"\",\"text\":\""+list.get(i).get("name")+"\",\"attributes\":{\"pk\":\""+list.get(i).get("id")+"\"},");
				String id=String.valueOf((list.get(i).get("id")));
				Map temp= new HashMap();
				temp.put("id", id);
				List tlist=jlMenuInfoDao.findChildMenuByPId(temp);
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

	@Override
	public String findTopJson() {
		StringBuffer s=new StringBuffer();
		//s.append("[{\"id\":1,\"text\":\"My Documents\",\"children\":[{\"id\":11,\"text\":\"Photos\",\"state\":\"closed\",\"children\":[{\"id\":111,\"text\":\"Friend\"},{\"id\":112,\"text\":\"Wife\"},{\"id\":113,\"text\":\"Company\"}]},{\"id\":12,\"text\":\"Program Files\",\"children\":[{\"id\":121,\"text\":\"Intel\"},{\"id\":122,\"text\":\"Java\",\"attributes\":{\"p1\":\"Custom Attribute1\",\"p2\":\"Custom Attribute2\"}},{\"id\":123,\"text\":\"Microsoft Office\"},{\"id\":124,\"text\":\"Games\",\"checked\":true}]},{\"id\":13,\"text\":\"index.html\"},{\"id\":14,\"text\":\"about.html\"},{\"id\":15,\"text\":\"welcome.html\"}]}]");
		List<Map> list=jlMenuInfoDao.findTopJson();	
		s.append("[");
		for(int i=0;i<list.size();i++){
			if(i>0){
				s.append(",");
			}
			s.append("{\"id\":\""+list.get(i).get("id")+"\",\"text\":\""+list.get(i).get("name")+"\",\"attributes\":{\"pk\":\""+list.get(i).get("id")+"\"},\"state\":\"closed\"}");
		}
		s.append("]");
		return s.toString();
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
		List<Map> list=jlMenuInfoDao.findAllJson();	
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
			sb.append("{\"id\":\""+map.get("id")+"\",\"text\":\""+map.get("name")+"\",\"attributes\":{\"pk\":\""+map.get("id")+"\"},\"pid\":\""+map.get("parentid")+"\",\"checked\":\"true\"}");
		}else{
			sb.append("{\"id\":\""+map.get("id")+"\",\"text\":\""+map.get("name")+"\",\"attributes\":{\"pk\":\""+map.get("id")+"\"},\"pid\":\""+map.get("parentid")+"\"}");
		}
		return sb.toString();
	}
	
	public List<Map> findMenuByIds(String menuids){
		List<Map> list=new ArrayList<Map>();
		if(null!=menuids&&!menuids.equalsIgnoreCase("")){
			list=jlMenuInfoDao.findMenuByIds(menuids);
		}
		return list;
	}

}
