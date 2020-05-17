package com.jl.material.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.jl.common.BaseService.MethodLog2;
import com.jl.material.dao.SupplierDao;
import com.jl.material.pojo.Supplier;
import com.jl.material.service.SupplierService;
import com.jl.sys.pojo.UserInfo;
@Service
@Component("jlSupplierInfoService")
public class SupplierServiceImpl implements SupplierService{
	
	@Autowired
	public SupplierDao supplierDao;
	
	@MethodLog2(remark="保存供应商信息",type="新增/编辑")
	public int save(Supplier supper) {
		return supplierDao.saveSupplier(supper);
	}
	
	public Map findList(UserInfo user,int page,int rows,Map<String,String> param){
		List list=supplierDao.findList(user,page,rows,param);
		int count=supplierDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		return map;
	}
	
	public Supplier findById(int id){
		return supplierDao.findById(id);
	}
	@MethodLog2(remark="删除供应商信息",type="删除")
	public int delSupplier(int id){
		return supplierDao.delSupplier(id);
	}
}
