package com.jl.material.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.RecordDao;
import com.jl.material.dao.RecordDetailDao;
import com.jl.material.pojo.RecordInfo;
import com.jl.material.pojo.RecordInfoDetail;
import com.jl.material.service.RecordService;
import com.jl.sys.pojo.UserInfo;
@Service
@Component("recordService")
public class RecordServiceImpl implements RecordService {
	@Autowired
	public RecordDao recordDao;
	@Autowired
	public RecordDetailDao recordDetailDao;
	
	public Map findRecordsDetailList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=recordDetailDao.findList(user,page,rows,param);
		int count=recordDetailDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List list=recordDao.findList(user,page,rows,param);
		int count=recordDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	public RecordInfo findById(String id){
		return recordDao.findById(id);
	}
	@MethodLog2(remark="删除领用记录信息",type="删除")
	public int delRecord(String id) {
		return recordDao.delRecord(id);
	}
	
	@MethodLog2(remark="保存领用记录信息",type="新增/编辑")
	public int saveRecord(RecordInfo supper) {
		return recordDao.saveRecord(supper);
	}
	
	public int saveDetail(RecordInfoDetail rid){
		return recordDetailDao.saveDetail(rid);
	}
	
	public void delRecordDetailByRecordId(String recordId){
		recordDetailDao.delRecordDetailByRecordId(recordId);
	}
	
}
