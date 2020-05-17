package com.jl.sys.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jl.sys.dao.ShoppingDao;
import com.jl.sys.pojo.UserInfo;
import com.jl.sys.service.ShoppingService;
@Service
public class ShoppingServiceImpl implements ShoppingService {
	@Autowired
	public ShoppingDao shoppingDao;
	
	@Override
	public Map findList(UserInfo user, int page, int rows,
			Map<String, String> param) {
		List<Map> list=shoppingDao.findList(user,page,rows,param);
		double wzgs=0;
		double ozgs=0;
		double workduringtime=0;
		double overtime=0;
		for(int i=0,length=list.size();i<length;i++){
			workduringtime=0;
			overtime=0;
			list.get(i).put("workdate", ((Map)(list.get(i))).get("workdate").toString().substring(0, 10));
			Object str=((Map)(list.get(i))).get("workduringtime");
			workduringtime=Double.valueOf(str.toString());
			overtime=Double.valueOf(((Map)(list.get(i))).get("overtime").toString());
			wzgs+=workduringtime;
			ozgs+=overtime;
		}
//		System.out.println(zgs+">>>>>>>循环数组");
//		System.out.println(System.currentTimeMillis());
		int count=shoppingDao.findCount(user,param); 
		Map map=new HashMap();
		map.put("list", list);
		map.put("count", count);
		map.put("wzgs", wzgs);
		map.put("ozgs", ozgs);
		map.put("zgs", wzgs+ozgs);
		return map;
	}

}
