package com.test;

import java.lang.reflect.Method;

import org.aspectj.lang.annotation.AfterReturning;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;

@Aspect
public class SleepHelper{

	public SleepHelper() {
		// TODO Auto-generated constructor stub
	}
	
	@Pointcut("execution(* *.sleep())")
	public void sleeppoint(){
		
	}
	@AfterReturning("sleeppoint()")
	public void afterReturning(Object arg0, Method arg1, Object[] arg2,
			Object arg3) throws Throwable {
		System.out.println("通常情况下睡觉之前要脱衣服！");
	}
	@Before("sleeppoint()")
	public void before(Method arg0, Object[] arg1, Object arg2)
			throws Throwable {
		System.out.println("起床后要先穿衣服！");
	}

}
