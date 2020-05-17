package com.jl.sys.dao;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.LocationInfo;

public interface LocationDao {
	
	void updateLocation(LocationInfo l);
	public List findJson(Map param);

}
