package com.thread;

public class MyThread extends Thread{
	private User user;
	private int y;
	MyThread(String name,User u,int y){
		super(name);
		this.user=u;
		this.y=y;
	}
	@Override
	public void run() {
		user.oper(y);
	}
}
