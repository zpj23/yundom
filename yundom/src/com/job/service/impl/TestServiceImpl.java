package com.job.service.impl;

import org.springframework.stereotype.Service;

import com.job.service.TestService;

@Service("testService")
public class TestServiceImpl implements TestService{

	@Override
	public void add(){  
        System.out.println("注入测试----");  
    }  
	
}
