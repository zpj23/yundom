package com.jl.sys.action;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;


@Namespace("/")
@Scope("prototype")
@Component("jlNiceAction")
@ParentPackage("json-default")
public class NiceAction extends IAction{
	
	@Action(value="jlNiceAction_toShb",results={
			@Result(name="success",location="beautifuldemo/index.jsp"),
			@Result(name="error",location="/login.jsp")
	})
	public String toShb(){
		return "success";
	}
}
