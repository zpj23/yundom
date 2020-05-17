package com.test;

public class Human implements Sleepable{

	@Override
	public void sleep() {
		System.out.println("睡觉了！人睡觉");
	}
	
}
