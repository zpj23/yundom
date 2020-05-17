package com.jl.material.action;


import java.io.IOException;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.material.service.StoreService;

@Namespace("/")
@Scope("prototype")
@Component("jlMaterialInfoAction")
@ParentPackage("json-default")
public class MaterialAction  extends IAction{
	
	@Autowired
	public StoreService jlStoreInfoService;
	
	
	@Action(value="jlMaterialInfoAction_toDeal",results={
			@Result(name="success",location="material/deal.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toAdd(){
		return "success";
	}
	@Action(value="jlMaterialInfoAction_clearTable",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlMaterialInfoAction_clearTable(){
		jlStoreInfoService.delAllTable();
		try {
			this.jsonWrite(1);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
}
