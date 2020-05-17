package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jl.sys.dao.SgxmDao;
import com.jl.sys.pojo.SgxmInfo;
import com.jl.sys.service.SgxmService;
@Service
public class SgxmServiceImpl implements SgxmService {
	@Autowired
	private SgxmDao sgxmDao;
	
	public Map findList(int page,int rows,Map<String,String> param){
		List<Map> list=sgxmDao.findList(page,rows,param);
		Map countMap=sgxmDao.findCount(param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", countMap.get("zs"));//总数
		map.put("chuqin", countMap.get("cq"));//出勤和
		map.put("jiaban", countMap.get("jb"));//加班和
		map.put("zonggongshi", countMap.get("zgs"));//总工时和
		map.put("total_zgz", countMap.get("zgz"));//总工资
		map.put("total_yfgzy", countMap.get("yfgzy"));//预发工资
		map.put("total_sygz", countMap.get("sygz"));//剩余工资
		map.put("total_yfgz", countMap.get("yfgz"));//应发工资
		return map;
	}
	
	public SgxmInfo findById(String id){
		return sgxmDao.findById(id);
	}
	public void delInfo(String id){
		sgxmDao.delInfo(id);
	}
	public void saveInfo(SgxmInfo pi){
		sgxmDao.saveInfo(pi);
	}
}
