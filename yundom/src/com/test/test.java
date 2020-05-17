package com.test;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class test {
	public static void main(String[] args) {
		ApplicationContext appCtx = new ClassPathXmlApplicationContext("spring/applicationContext.xml");
		Sleepable human= (Sleepable)appCtx.getBean("human");
		human.sleep();
	}

}
