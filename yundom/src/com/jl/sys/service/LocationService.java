package com.jl.sys.service;

import java.util.List;
import java.util.Map;

import com.jl.sys.pojo.LocationInfo;

public interface LocationService {
	void updateLocation(LocationInfo l);
	
	List findJson(Map param);

}
