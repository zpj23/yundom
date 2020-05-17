package com.test.thread;

import java.util.LinkedList;
import java.util.Queue;

public class Shop {
	
	public static void main(String[] args) {
		Queue<Integer> queue=new LinkedList<Integer>();
		int max=20;
		Producer p=new Producer(queue, max);
		Comsumer c=new Comsumer(queue, max);
		
		Thread a= new Thread(p);
		Thread b=new Thread(c);
		a.start();
		b.start();
		
	}

}
