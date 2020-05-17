package com.jl.material.service.impl;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.MaintainDao;
import com.jl.material.pojo.Maintain;
import com.jl.material.service.MaintainService;
import com.jl.sys.pojo.UserInfo;

@Service
@Component("jlMaintainService")
public class MaintainServiceImpl implements MaintainService {
	@Autowired
	public MaintainDao maintainDao;
	@MethodLog2(remark="保存维修报损信息",type="新增")
	public int saveMaintain(Maintain m) {
		m.setCreatetime(new Date());
		m.setExaminestate("1");//审核状态为已申请
		return maintainDao.saveMaintain(m);
	}
	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List list=maintainDao.findList(user,page,rows,param);
		int count=maintainDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}

	public Maintain findById(String id){
		return maintainDao.findById(id);
	}
	@MethodLog2(remark="更新维修报损审核信息",type="编辑")
	public void saveMaintainState(String state,String id){
		Maintain m=maintainDao.findById(id);
		m.setExaminestate(state);
		maintainDao.saveMaintain(m);
	}
}
