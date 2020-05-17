package com.jl.sys.action;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Namespace;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.jl.common.IAction;
import com.jl.sys.pojo.LocationInfo;
import com.jl.sys.service.LocationService;

@Namespace("/")
@Scope("prototype")
@Component("jlLocationAction")
@ParentPackage("json-default")
public class LoactionAction extends IAction{
	@Autowired
	private LocationService locationService;
	/**
	 * 更新位置信息
	 * @Title jlLocationAction_updateLocationByPhone
	 * @author zpj
	 * @time 2017-9-29 下午1:38:17
	 */
	@Action(value="jlLocationAction_updateLocationByPhone",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void jlLocationAction_updateLocationByPhone(){
		String id=request.getParameter("id");
		String longitude=request.getParameter("longitude");
		String latitude=request.getParameter("latitude");
		String address=request.getParameter("address");
		
		
		LocationInfo locationInfo=new LocationInfo();
		locationInfo.setId(UUID.randomUUID().toString());
		locationInfo.setUserid(Integer.parseInt(id));
		locationInfo.setUpdatetime(new Date());
		locationInfo.setZuobiao(longitude+","+latitude);
		locationInfo.setAddress(address);
		locationService.updateLocation(locationInfo);
		try {
			jsonWrite("success");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	@Action(value="jlLocationAction_showByName",
			results={
			@Result(type="json", params={"root","jsonData"})})
	public void showByName(){
		String datemin=request.getParameter("datemin");
		String datemax=request.getParameter("datemax");
		String username=request.getParameter("username");
		Map param=new HashMap();
		param.put("datemin", datemin);
		param.put("datemax", datemax);
		param.put("username", username);
		List list=locationService.findJson(param);
		try {
			jsonWrite(list);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
}
